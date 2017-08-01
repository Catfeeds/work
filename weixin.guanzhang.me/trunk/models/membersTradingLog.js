//会员交易流水
var async = require('async');
var db = require('../models/db');
var log = require('../util/log');
var moment = require('moment');
var _tableName = 'members_trading_log';

var membersLog = function () {
    this.initData = function (order, soms) {
        var data = {
            supplier_id: soms.supplier_id,
            venues_id: soms.venue_id,
            order_id: order.Id || '',
            order_code: order.Code || '',
            qyd_order_code: order.QydOrderCode || '',	
            type: order.type || 0,//type: 1充值(储值卡、次卡)、2退费（充值提现）、3扣款（场次）、4退款（场次），5扣款（商品）、6退款（商品）,7扣款（人次），8退款（人次）
			order_catalog: order.OrderCatalog || 0,//订单类型 OrderCatalog:普通商品：1；场次订单：3；人次票：6
            card_no: order.MemberCardNo || '',
            mebmer_name: order.CustomerName || '',
           // member_type_id: order.MemberCardCatalog || '',//会员卡类型
            qyd_customer_id: order.QydCustomerId || 0,//暂时为空，订单表没保存
           // amount: order.PayableAmount || 0,
			amount: order.ApayAmount || 0,
            amount_gift: order.ExtraFee || 0,
            create_by: order.LastModifyBy || 0,
            create_time: moment(order.PayTime || order.LastModifyTime || order.CreateTime).unix(),//消费时间
            last_modify_time: moment(order.LastModifyTime).unix(),//修改时间
            add_time: moment(order.CreateTime).unix(),//下单时间
            pay_mode : order.PayMode || 0,
            pay_catalog_detail:  JSON.stringify(order.PayCatalogDetail || ''),
            gift_remain_pay_amount: order.GiftRemainPayAmount || 0,
            account_date: moment((order.PlanConsumeBeginTime || order.LastModifyTime || '20150101').slice(0, 10)).unix(),
            card_id: order.card_id || ''
        };
        //储值卡
        if(order.MemberCardCatalog != "" && order.MemberCardCatalog != null)
        {
        	data.member_type_id = order.MemberCardCatalog
        }
        //次卡
        if(order.CountCardCatalog != "" && order.CountCardCatalog != null)
        {
        	data.member_type_id = order.CountCardCatalog
        }       
        
        return data;
    };
	
	 //insertOrder
    this.dealMessage = function (order_old, soms, callback) {
       var order = this.initData(order_old, soms);
	   console.log(order);
        //次卡支付，实付金额改为0，由次卡次数抵消金额
        if(order_old.PayMode == 3){
        	order.amount = 0;
        } 
        //处理多种支付中的会员卡去付金额
        else if(order_old.PayMode == 999){
        	var info = order_old.PayCatalogDetail;
        	var amount_new = 0;
        	var gift_remain_pay_amount_new = 0;
        	var other_pay_amount = 0;
        	for( i = 0, l = info.length; i < l; i++){ 
        		if(info[i].c == 1 || info[i].c == 3 ){
        			amount_new +=  parseFloat(info[i].m);
        		}
        		else if(info[i].c == 4){
        			gift_remain_pay_amount_new +=  parseFloat(info[i].m);
        		}else{
        			other_pay_amount  += parseFloat(info[i].m);
        		}
		
        	}
        	
        	//退款时，如果全退到非会员卡方式，也不添加记录
        	if ((order.type == 4 || order.type == 6 || order.type == 8) && (other_pay_amount + amount_new) == 0 ){
        		amount_new = 0;
        	}

        	//多种支付，是否合有会员卡相关交易，如没有就直接回调，不插件流水表
        	if(amount_new > 0){
        		order.amount = amount_new;
        		order.gift_remain_pay_amount = gift_remain_pay_amount_new;
        	}
        	else{
        		var data = {
						err: "",
						info: "" 
						};	
        		callback(null, data);
        		return;
        	}
        }

        var where = {
            supplier_id: order.supplier_id,
            venues_id: order.venues_id,
            order_code: order.order_code,
            type: order.type
        };
        //趣运动订单
       /* if (order.qyd_order_code) {
            //用趣运动code判断重复
            delete where.order_id;
            where.qyd_order_code = order.qyd_order_code;
        }*/

        //是否已存在
        var conn = db.getAdapter('report');
        conn.where(where).get(_tableName, function (err, result) {
        	console.log(conn._last_query());
            conn.disconnect();//释放
            if (!err && result.length > 0) {                 
            	 
                //if (order.create_time >= result[0].create_time) {
                    var conn2 = db.getAdapter('report');         	
                    conn2.where({id: result[0].id}).update(_tableName, order, function (err, info) {
						var data = {
							err: '',
							info: "" 
							};
                        if (err) {
							log.write('message', 0, 'update会员交易流水出错', {err: err, message: conn2._last_query()}, 'info');
							data.err = 'update会员交易流水出错' + conn2._last_query();
                        }
                        conn2.disconnect();//释放
					   callback(err, data);
                    });
               /* } else {
                    //旧状态，不处理
					callback(err, null);
                }*/
           
            } else {
                //入库
				//order.add_time  = moment().unix();
                var conn2 = db.getAdapter('report');
                conn2.insert(_tableName, order, function (err, info) {
					var data = {
							err: "",
							info: "" 
							};									  
                    if (err) {
						log.write('message', 0, 'insert会员交易流水出错', conn2._last_query(), 'info');
						data.err = 'insert会员交易流水出错' + conn2._last_query();
                    }
                    conn2.disconnect();//释放
					callback(err, data);
                });
            }
        });
    };
    //取出所有可统计的订单
    
    //处理会员流水（换场需要删除原来的会员流水）
    this.deleteInfo = function (order_old, soms) {
        var conn = db.getAdapter('report');
        conn.where({
            supplier_id: soms.supplier_id,
            venues_id: soms.venue_id,
            order_code:order_old.Code
        }).get(_tableName, function (err, result) {
            conn.disconnect();//释放			
            if (!err && result.length > 0) {
				var conn2 = db.getAdapter('report');
				conn2.where({id: result[0]['id']}).delete(_tableName, function (err, info) {																		
					if (err) {
						log.write('message', 0, 'deleteInfo:删除会员交易流水出错：', conn2._last_query(), 'info');
					}
					conn2.disconnect();//释放
					//callback(err, info);
				});         
            } 
			else {
                  // callback(err, result); 
            }
        });

    };
    
};

module.exports = new membersLog();