var async = require('async');
var moment = require('moment');
var db = require('../models/db');
var log = require('../util/log');
var orders = require('../models/orders');
var CourtOrderDetail = require('../models/CourtOrderDetail');
var CourtLightDetail = require('../models/CourtLightDetail');
var GoodsOrderDetail = require('../models/GoodsOrderDetail');
var GoodsInventory = require('../models/GoodsInventory');
var venuesCardType = require('../models/venuesCardType');
var venuesCardCountGood = require('../models/venuesCardCountGood');
var venuesGoodsCategory = require('../models/venuesGoodsCategory');
var membersTradingLog = require('../models/membersTradingLog');
var GoodsInventoryLog = require('../models/GoodsInventoryLog');
var DataDeleteLog = require('../models/DataDeleteLog');
var venuesMembersCard = require('../models/venuesMembersCard');
var venuesMembersCardLoseLog = require('../models/venuesMembersCardLoseLog');
var venuesTimeTicketGoods = require('../models/venuesTimeTicketGoods');
var $redis = require('../util/redis');
var $common = require('../util/common');
var $fs = require('fs');
var $path = require('path');

var _tableName = 'di_message2';
// 存储最后id的文件名
var lastFileName = $path.dirname(__dirname) + '/cron/deal_message_members_last_id.txt';

var messageMember = function () {
    var self = this;
    //取出消息
    this.init = function (limit, callback) {
        //判断是否查库
        //缓存最后id、设置定时器
        /**
         * 缓存处理对象{定时时长（秒）,基准时间截}
         * {timeout:10,baseTime:1456677777}
         */
        var cacheKey = "di-message-handle-info2";
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
                           //queryFlag = false;
                        }
                    }
                    asyncCallback(null,queryFlag);
                }
            ],function(err,queryFlag) {
                if(err){
                    log.write('message', 0, '取缓存'+cacheKey+'出错了', {err: err}, 'error');
                }
                if(!err && queryFlag === true){
                    try {
                        var maxId = $fs.readFileSync(lastFileName);
                        maxId = parseInt(maxId);
                    } catch (e) {
                        log.write('message', 0, "读取存储最后id文件出错", {err: e.toString()}, 'error');
                        maxId = 0;
                    }

                    var conn = db.getAdapter('di');
					//7月份开始的数据
					//conn.select("id,message").where("id= "+maxId).limit(limit)
				    conn.select("id,message").where("id>= "+maxId+"  and  status = 2").limit(limit)
                        .get(_tableName, function (err, results) {
                        	console.log(conn._last_query());
                            conn.disconnect();//释放
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
                    return;
                }
                callback(null,"status=2的待处理message为0");
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
                    var conn = db.getAdapter('di');
                    conn.where({id: order.id}).update(_tableName, {status: 3}, function (err, info) {
                        conn.disconnect();//释放
                    });
                    log.write('message', 0, '更新message的状态为3', {err: e, message: order}, 'info');
                    //callback(e, log_msg);
                }
            }
            msg_count = ids.length;
            if (msg_count > 0) {
                async.eachSeries(messages, function (item, asyncCallback) {
			
                    self.dealOneMsg(item, asyncCallback)
                }, function (err) {
                    if (!err) {
                        handle_count = msg_count;
                        var conn = db.getAdapter('di');
                        conn.where('id IN(' + ids.join(',') + ')').update(_tableName, {status: 4}, function (error, updateInfo) {
                        	console.log(conn._last_query());
                            conn.disconnect();//释放
							
                            if (error) {
                                log.write('message', 0, '更新message的状态为4出错', {
                                    err: err,
                                    sql: conn._last_query()
                                }, 'info');
                            }
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
     * 110000 普通商品和场地订单
     * 110001 次卡充值订单
     * 110002 会员充值订单
     * 110003 订单明细（不分类型）
     * 110004 场次订单明细
     * 110005 商品订单明细
     * 120000 会员基本资料
     * 120001 会员余额变更
     * 120002 会员挂失
     * 120003 会员次卡信息
     * 120004 注销会员卡
     * 13000 灯控器信息
     * 14000 商品当前库存量
     *
     */
    this.dealOneMsg = function (message, callback) {
        message = message[0];
        //消息头处理
        var meta = message.Metadata;
        var value = message.Value;

        var conn = db.getAdapter('business');
        conn.where({
            app_id: meta.AppId
        }).get('bs_smos', function (err, result) {
            conn.disconnect();//释放
			
            if (!err && result.length > 0) {
                //基础数据 venue_id supplier_id
                var soms = result[0];
                //处理订单数据
                
                if (['110000', '110001', '110002'].indexOf(meta.SourceName) > -1) {
                    value.UploadTime = meta.CreateTime;
                    value.SourceName = meta.SourceName;
                   // orders.dealMessage(value, soms, callback);	
					async.parallel([	
						//=================处理会员订单start=================			
						function(callback2){
							var soms2 = result[0];
							orders.dealMessage(value, soms2, callback2);
						},
						//=================处理会员订单end=================	
						
						//==========================================处理会员交易流水start add by bumtime 2016-08-05 ============================
						function(callback2){ 	
							var soms2 = result[0];			
							//只统计会员卡value.MemberCardNo
							if(value.MemberCardNo != "" && value.MemberCardNo != null)
							{
								//会员充值订单
								value.type = 0;
								if ((value.SourceName == '110001' || value.SourceName == '110002') && value.ApayAmount > 0) {
									value.type = 1;
								}
								//提现
								else if((value.SourceName == '110001' || value.SourceName == '110002') && value.ApayAmount < 0) {
									value.type = 2;
								}
								//扣款（场地预订）
								else if(value.SourceName == '110000' && ((value.PayStatus == 0 && value.Status ==2) || (value.PayStatus == 4 && value.Status ==0)) && (value.PayMode ==1 || value.PayMode ==3 || value.PayMode ==4 || value.PayMode ==999)) {
									//OrderCatalog:普通商品：1；场次订单：3；人次票：6
									//type: 1充值(储值卡、次卡)、2退费（充值提现）、3扣款（场次）、4退款（场次），5扣款（商品）、6退款（商品）,7扣款（人次），8退款（人次）
									if(value.OrderCatalog == 3)
									{
										value.type = 3;
									}
									else if(value.OrderCatalog == 6)
									{
										value.type = 7;
									}
									else{			
										value.type = 5;
									}
									
								}
								//退款（场地预订）
								else if(value.SourceName == '110000' && ((value.PayStatus == 3 && value.Status == 2) || (value.PayStatus == 3 && value.Status == 4) || (value.PayStatus == 3 && value.Status == 3)) && (value.PayMode ==1 || value.PayMode ==3 || value.PayMode ==4 || value.PayMode ==999)) {
									if(value.OrderCatalog == 3)
									{
										value.type = 4;
									}
									else if(value.OrderCatalog == 6)
									{
										value.type = 8;
									}
									else{
										value.type = 6;
									}
								}
								if(value.type >0 /*&& (value.Status == 2 || value.Status == 3 || value.Status == 4)*/)
								{	
									//处理会员流水
									membersTradingLog.dealMessage(value, soms2, callback2);			
								}
								else
								{
									callback2(null, '');
								}
							}
							else
							{
								callback2(null, '');
							}
							
						}
						//==========================================处理会员交易流水end add by bumtime 2016-08-05 ===============================
			
					],
					function(err, result){	
						callback(err, result);
					});
					
                }
                //处理场次订单详情
                else if (meta.SourceName == '110004') {
                      CourtOrderDetail.dealMessage(value, soms, callback);
  					
                  }
                  //处理商品订单明细
                else if (meta.SourceName == '110005') {
                     GoodsOrderDetail.dealMessage(value, soms, callback);
  					
                 }
                  //处理灯控数据
                else if (meta.SourceName == '13000') {
                      CourtLightDetail.dealMessage(value, soms, callback);
  					
                  }
                  //商品当前库存量
                 else if (meta.SourceName == '14000') {
                      GoodsInventory.dealMessage(value, soms, callback);
  					
                  }
  			   //商品记录
                else if (meta.SourceName == '14001') {
                      //value.CreateTime = meta.CreateTime;
                      GoodsInventoryLog.dealMessage(value, soms, callback);
  					
                  }	 
                
				//会员卡记录
				//次卡
				else if ( meta.SourceName == '120003') {
					 
					async.waterfall([
						//更新会员卡表card_number
						function (callback2) {
							venuesMembersCard.dealMessage(value, soms, callback2);						
						},
						//更新详情表信息
						function (data, callback2) {	
						
							if(data != null && data.member_id != "" && data.member_id != undefined)
							{
								delete data.account_type;
								venuesMembersCard.dealmessageCountDetail(data, callback2);
							}
							else
							{
								callback2(null, '');
							}
						}
					], function (err, accessInfo) {
							callback(err, accessInfo);
					});
					
                }
				//储值卡
			   else if ( meta.SourceName == '120000') {
					 
					async.waterfall([
						//更新会员卡表card_number
						function (callback2) {
							venuesMembersCard.dealMessage(value, soms, callback2);						
						},
						//更新详情表信息
						function (data, callback2) {	
						
							if(data != null && data.member_id != "" && data.member_id != undefined)
							{
								delete data.account_type;
								venuesMembersCard.dealmessageDetail(data, callback2);	
							}
							else
							{
								callback2(null, '');
							}
						}
					], function (err, accessInfo) {
							callback(err, accessInfo);
					});
					
                }
				//会员卡余额变动
			   else if (meta.SourceName == '120001') {
                    venuesMembersCard.updateInfo(value, soms, callback);
                }
				//会员挂失
			   else if (meta.SourceName == '120002') {	
				   	 
					async.waterfall([
						//更新会员卡表card_number
						function (callback2) {
								venuesMembersCard.loseInfo(value, soms, callback2);  							
						},
						//增加会员卡挂失log记录
						function (data, callback2) {	
							if(data.card_id != "" && data.card_id != undefined)
							{
								venuesMembersCardLoseLog.dealMessage(data, callback2);
							}
							else
							{
								callback2(null, '');
							}
						}
					], function (err, accessInfo) {
							callback(err, accessInfo);
					});
			
                }
				//注销会员卡
			  else if (meta.SourceName == '120004') {
                    venuesMembersCard.cancelInfo(value, soms, callback);
                }
				  //商品记录
              else if (meta.SourceName == '14001') {
                    //value.CreateTime = meta.CreateTime;
                    GoodsInventoryLog.dealMessage(value, soms, callback);
					
                }	 
				//会员卡类型
			  else if (meta.SourceName == '15001') {
                    venuesCardType.dealMessage(value, soms, callback);
                }
				//次卡类型
			   else if (meta.SourceName == '15002') {
					if(value.Code == "" || value.Code == null)
					{
						callback(err, result);
					}
					else
					{
						venuesCardCountGood.dealMessage(value, soms, callback);
					}
					
                }
				//商品类别
			   else if (meta.SourceName == '15003') {
                    venuesGoodsCategory.dealMessage(value, soms, callback);		
                }
				//人次票商品
			   else if (meta.SourceName == '15004') {
                    venuesTimeTicketGoods.dealMessage(value, soms, callback);		
                }				
				
				//删除类别
			   else if (meta.SourceName == '90001') {
				    async.waterfall([
						//保存删除log
						function (callback) {
							DataDeleteLog.dealMessage(value, soms, callback);
						},
						//删除操作，update相关数据为已删除
						function (data, callback) {
							if(data.err == ""  &&  data.info == "insert")
							{
								
								switch(parseInt(value.ModelType))
								{
									//商品
									case 14000:
										GoodsInventory.deleteInfo(value, soms, callback);
									break;
									//储值会员卡类型
									case 15001:
										venuesCardType.deleteInfo(value, soms, callback);
									break;
									//次卡类型
									case 15002:
										venuesCardCountGood.deleteInfo(value, soms, callback);
									break;
									//商品类别
									case 15003:
										venuesGoodsCategory.deleteInfo(value, soms, callback);
									break;	
									//人次票商品
									case 15004:
										venuesTimeTicketGoods.deleteInfo(value, soms, callback);
									break;		
								}
							}
							else
							{
								callback(null, '');
							}
						}
					], function (err, accessInfo) {
							callback(err, accessInfo);
					});

                }
                else {
                    callback(err, result);
					
                }

            } else {
                callback(err, result);
            }
        });
    };

};


module.exports = new messageMember();
