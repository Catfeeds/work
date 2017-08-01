var async = require('async');
var moment = require('moment');
var db = require('../models/db');
var log = require('../util/log');
var orders = require('../models/orders');
var CourtOrderDetail = require('../models/CourtOrderDetail');
var GoodsOrderDetail = require('../models/GoodsOrderDetail');
var $redis = require('../util/redis');
var $common = require('../util/common');
var $fs = require('fs');
var $path = require('path');

var _tableName = 'di_message2';
// 存储最后id的文件名
var lastFileName = $path.dirname(__dirname) + '/cron/deal_message_old_data_last_id.txt';
const DEAL_STATUS = 5;//处理前
const DEAL_STATUS_FAILED = 3;//处理失败
const DEAL_STATUS_LATER = 6;//处理后

var message = function () {
    var self = this;
    //取出消息
    this.init = function (limit, callback) {
        //判断是否查库
        //缓存最后id、设置定时器
        /**
         * 缓存处理对象{定时时长（秒）,基准时间截}
         * {timeout:10,baseTime:1456677777}
         */
        var cacheKey = "di-message-old-data-handle-info";
        var handleInfo = {timeout:0,baseTime:0};
        async.waterfall([
                function (asyncCallback) {
                    $redis.getValue(cacheKey, asyncCallback);
                },
                function(cacheValue,asyncCallback){
                    var queryFlag = true;
                    if(cacheValue){
                        handleInfo = cacheValue;
                        var nowTime = $common.timestamp();
                        //在定时保护内,不查库
                        if(nowTime < parseInt(cacheValue.baseTime) + parseInt(cacheValue.timeout)){
                            queryFlag = false;
                        }
                    }
                    asyncCallback(null,queryFlag);
                }
            ],function(err,queryFlag) {
                if(err){
                    log.write('message_old_data', 0, '取缓存'+cacheKey+'出错了', {err: err}, 'error');
                }
                if(!err && queryFlag === true){
                    try {
                        var maxId = $fs.readFileSync(lastFileName);
                        maxId = parseInt(maxId);
                    } catch (e) {
                        log.write('message_old_data', 0, "读取存储最后id文件出错", {err: e.toString()}, 'error');
                        maxId = 0;
                    }
 
                    db.getPool('di').getNewAdapter(function (conn) {
	                    conn.select("id,message").where("id>="+maxId+" AND status=" + DEAL_STATUS).limit(limit)
	                    //conn.select("id,message").where("id=1289600 AND status="+DEAL_STATUS).limit(limit)
	                        .get(_tableName, function (err, results) {
	                        	console.log(conn._last_query());
	                            var data = [];
	                            if (!err && results.length > 0) {
	                                lastItem = results.pop();
	                                maxId = lastItem.id;
	                                results.push(lastItem);
	                                data = results;
	                                // 写入文件
	                                $fs.writeFileSync(lastFileName, maxId);
	                            }
	                            //设置缓存
	                            if(data.length==0){
	                                handleInfo.timeout = 120;//2分钟
	                                handleInfo.baseTime = $common.timestamp();//当前时间截
	                            }
	                            $redis.setValue(cacheKey,handleInfo,7200);
	                            //处理消息
	                            self.dealAllMsg(data, callback);
	                        });
                    });
                    return;
                }
                callback(null,"status="+ DEAL_STATUS +"的待处理message为0");
            }
        );
    };
    /**
     * 消息处理
     */
    this.dealAllMsg = function (results, callback) {
        var msg_count = 0, handle_count = 0, log_msg = '';
        if (results.length > 0) {
            msg_count = results.length;
            var messages = [], ids = [];
            var msg = '';
            for (var i = 0; i < results.length; i++) {
                try {
                    msg = JSON.parse(results[i].message);
                    messages.push(msg);
                    ids.push(results[i].id);
                } catch (e) {
                    var order = results[i];
                    log_msg = 'id=' + order.id + '的message的JSON解析出错';
                    db.getPool('di').getNewAdapter(function (conn) {
	                    conn.where({id: order.id}).update(_tableName, {status: DEAL_STATUS_FAILED}, function (err, info) {
	                    });
                    });    
                    log.write('message_old_data', 0, '更新message的状态为' + DEAL_STATUS_FAILED , {err: e, message: order}, 'info');
                }
            }
			
            msg_count = ids.length;
            if (msg_count > 0) {
                async.eachSeries(messages, function (item, asyncCallback) {						 	
                    self.dealOneMsg(item, asyncCallback)
                }, function (err) {
				
                    if (!err) {
                        handle_count = msg_count;
                        db.getPool('di').getNewAdapter(function (conn) {
	                        conn.where('id IN(' + ids.join(',') + ')').update(_tableName, {status: DEAL_STATUS_LATER}, function (error, updateInfo) {
							    console.log(conn._last_query());																			
	                            if (error) {
	                                log.write('message_old_data', 0, '更新message的状态为' + DEAL_STATUS_LATER + '出错', {
	                                    err: err,
	                                    sql: conn._last_query()
	                                }, 'info');
	                            }
	                        });
                        });    
                    }
                    log_msg = '取出' + msg_count + '条消息，成功处理' + handle_count + '条消息';
                    callback(err, err ? ids : log_msg);
                    //log.write('message', 0,log_msg, {err: err}, 'info');
                });
            }
        } else {
            log_msg = '取出' + msg_count + '条消息，成功处理' + handle_count + '条消息';
            callback(null, log_msg);
        }
    };

    /**
     * meta.SourceName
     * 90002 处理旧数据
     *
     */
    this.dealOneMsg = function (message, callback) {
    	
        message = message[0]; 
        //消息头处理
        var meta = message.Metadata;
        
        if (meta.SourceName == '90002') {
        	
        	var value_list = JSON.parse(message.Value);
   	        var value_count = value_list.length;
   	        
	   	     db.getPool('business').getNewAdapter(function (conn) {  	 
	    	        conn.where({
	    	            app_id: meta.AppId
	    	        }).get('bs_smos', function (err, result) {
	    	        	
	    	            if (!err && result.length > 0 && value_count > 0) {
	    	                //基础数据 venue_id supplier_id
	    	                var soms = result[0];
	    	                var orders_list = [];
	    	                var orders_detail_list = [];
		                 	for (var i = 0; i < value_count; i++) {  		
		                 		orders_list.push(value_list[i]);
		                 		if(value_list[i].t == 6){
		                 			orders_detail_list.push(value_list[i]);
		                 		}
		                 		
		                 	}
		                 	if(orders_list.length > 0){
		                 		async.each(orders_list, function (detail, asyncCallback) {
			                 		self.dealOrderInfo(detail, asyncCallback);
			                 	}, function (err) {
			     		            callback(err);
			     		        });
		                 	}
		                 	
		                 	if(orders_detail_list.length > 0){
		                 		async.each(orders_detail_list, function (detail2, asyncCallback) {
			                 		self.dealOrderDetail(detail2, soms, asyncCallback);
			                 	}, function (err) {
			     		            callback(err);
			     		        });
		                 	}
	                 	
	    	            } else {
	    	                callback(null, result);
	    	            }
	    	        });
	         });
	    }
        else{
	    	callback(null, null);
	    }
        
    };
    
    /**
     *  
     *  处理订单数据
     *
     */
    this.dealOrderInfo = function (value, callback) {
		var order_info = {
			pay_time: moment(value.p).unix(),
			member_card_catalog: value.m || '',
			count_card_catalog: value.c || '',
			consume_category: value.s || ''						
			};
		
		 db.getPool('report').getNewAdapter(function (conn) {  
			 conn.where({order_code: value.o}).update('orders', order_info, function (err, info) {
				 console.log(conn._last_query());
				if (err) {
					log.write('message_old_data', 0, 'update(orders)出错', {err: err, message: conn._last_query()}, 'info');
				}
				callback(err, info);
			});
		 });
    }
    
    /**
     *  
     *  处理订单明细
     *
     */
    this.dealOrderDetail = function (value, soms, callback) {
    	
    	if(value.d != '' && value.d != null){
			var info = JSON.parse(value.d);
			var task = [];
			if(info.length > 0 ){
				for (var i = 0; i < info.length; i++) {
	     			var data = {
	     		            venue_id: soms.venue_id,
	     		            supplier_id: soms.supplier_id,
	     		            order_id: info[i].OrderId || '',
	     		            catalog_id: info[i].CatalogId || '',
	     		            catalog_name: info[i].CatalogName || '',
	     		            goods_id: info[i].GoodsId || '',
	     		            goods_code: info[i].GoodsCode || '',
	     		            goods_name: info[i].GoodsName || '',
	     		            price: info[i].Price || 0,
	     		            count: info[i].Count || 0,
	     		            consume_category: info[i].ConsumeCategory || '',
	     		        };
	     			
	     			 task.push(data); 
				}
				async.each(task, function (detail, asyncCallback) {
		            db.getPool('report').getNewAdapter(function (conn) {
		            	var where ={
		            			order_id: detail.order_id,
		            			goods_id: detail.goods_id
		            			
		            	};
		            	conn.where(where).get('goods_order_detail', function (err, result) {
		       
			                if (!err && result.length > 0) {
			                    detail.last_update_time = moment().unix();	

			                    db.getPool('report').getNewAdapter(function (conn) {
			                    	conn.where({id: result[0].id}).update('goods_order_detail', detail, function (err, info) {
				                    	 
				                        if (err) {
				                            info = {last_query: conn._last_query()};
				                            log.write('message_old_data', 0, 'update(goods_order_detail)出错', {err: err, message: conn._last_query()}, 'info');
				                        }
				                       
				                    });
			                    });    
			                } else {
			                    detail.add_time = moment().unix();
			                    detail.last_update_time = moment().unix();
			                    db.getPool('report').getNewAdapter(function (conn) {
			                    	conn.insert('goods_order_detail', detail, function (err, info) {
				                   
				                        if (err) {
				                            info = {last_query: conn._last_query()};
				                            log.write('message_old_data', 0, 'insert(goods_order_detail)出错', {err: err, message: conn._last_query()}, 'info');
				                        }
				                       
				                    });
			                    });    
			                }
			            });
		            });
		            
		        }, function (err) {
		            callback(err, null);
		        });
			}

		} 
    	else{
    		 callback(err, info);
    	}
    }

};


module.exports = new message();
