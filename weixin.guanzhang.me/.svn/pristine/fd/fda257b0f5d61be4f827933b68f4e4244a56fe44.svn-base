var async = require('async');
var db = require('../models/db');
var log = require('../util/log');
var moment = require('moment');
var IncomeReport = require('../models/IncomeReport');
var CourtLigthReport = require('../models/CourtLightReport');
var GoodsSalesReport = require('../models/GoodsSalesReport');
var Common = require('../util/common');

var _tableName = 'orders';

var orders = function () {
    var self = this;
    this.initData = function (order, soms) {
        var data = {
            supplier_id: soms.supplier_id,
            venue_id: soms.venue_id,
            order_id: order.Id || '',
            order_code: order.Code || '',
            qyd_order_code: order.QydOrderCode || '',
            order_status: order.Status || 0,//0	预订1消费中2已完成3	已取消
            order_source: order.Source || -1,
            order_type: order.OrderType || -1,
            order_catalog: order.OrderCatalog || -1,
            order_source_detail: order.OrderSourceDetail || -1,
            pay_status: order.PayStatus || 0,//0已支付1支付中2未支付
            pay_mode: order.PayMode || 0,
            payable_amount: order.PayableAmount || 0,
            apay_amount: order.ApayAmount || 0,
            gift_remain_pay_amount: order.GiftRemainPayAmount || 0,
            dingjin: order.Dingjin || 0,
            yajin: order.Yajin || 0,
            customer_id: order.CustomerId || '',
            member_card_no: order.MemberCardNo || '',
            customer_mobile: order.CustomerMobile || '',
            customer_name: order.CustomerName || '',
            remark: order.Remark || '',
            is_printed: order.IsPrinted || 0,
            is_delete: order.IsLogicDel || 0,
            is_read: order.HasReadOrder ? 1 : 0,
            check_code: order.CheckCode || '',
            is_valid_check_code: order.IsValidCheckCode || -1,
            serial_number: order.SerialNumber || '',
            account_date: moment((order.PlanConsumeBeginTime || order.LastModifyTime || '2015-01-01').slice(0, 10)).unix(),
            extra_fee: order.ExtraFee || 0,
            extra_fee_remark: order.ExtraFeeRemark || '',
            create_by: order.CreateBy || '',
            create_time: moment(order.CreateTime).unix() || 0,
            last_modify_by: order.LastModifyBy || '',
            last_modify_time: moment(order.LastModifyTime).unix() || 0,
            plan_consume_begin_time: moment(order.PlanConsumeBeginTime).unix() || 0,
            plan_consume_time: moment(order.PlanConsumeTime).unix() || 0,
            upload_time: order.UploadTime || 0,//上传日期，就是创建商务中心单据的日期
            source_name: order.SourceName || 0, //上传订单分类对应meta.SourceName
            pay_catalog_detail: JSON.stringify(order.PayCatalogDetail || ''),
			//新增部分
			pay_time: moment(order.PayTime).unix() || 0,
			operate_area_id: order.OperateAreaId || 0,			
			operate_area_name: order.OperateAreaName || '',			
			member_card_catalog: order.MemberCardCatalog || '',	
			count_card_catalog: order.CountCardCatalog || '',	
			consume_category: order.ConsumeCategory || '',
			//add 20170221 bumtime 增加版本判断
			card_id :  order.card_id  || ''

        };
        //处理时间转换
        data.account_date = data.account_date > 0 ? data.account_date : 0; //记账日期
        data.create_time = data.create_time > 0 ? data.create_time : 0;
        data.last_modify_time = data.last_modify_time > 0 ? data.last_modify_time : 0;
        data.plan_consume_begin_time = data.plan_consume_begin_time > 0 ? data.plan_consume_begin_time : 0;
        data.plan_consume_time = data.plan_consume_time > 0 ? data.plan_consume_time : 0;
        data.upload_time = data.upload_time > 0 ? data.upload_time : 0;
		
        return data;
    };

    //insertOrder
    this.dealMessage = function (order, soms, callback) {

        order = this.initData(order, soms);

        var where = {
            supplier_id: order.supplier_id,
            venue_id: order.venue_id,
            order_id: order.order_id
        };
        //趣运动订单
        if (order.qyd_order_code) {
            //用趣运动code判断重复
            delete where.order_id;
            where.qyd_order_code = order.qyd_order_code;
        }
        //是否已存在
        var conn = db.getAdapter('report');
        conn.where(where).get(_tableName, function (err, result) {
            conn.disconnect();//释放
            if (!err && result.length > 0) {
                if (order.last_modify_time >= result[0].last_modify_time || order.upload_time >= result[0].upload_time) {
                    order.last_update_time = moment().unix();
                    var conn2 = db.getAdapter('report');
                    conn2.where({id: result[0].id}).update(_tableName, order, function (err, info) {
						var returnData = {
							err: "",
							info: "true" 
						};																		
                        if (err) {
							log.write('message', 0, 'update订单出错', {err: err, message: conn2._last_query()}, 'info');
							returnData.err = err;
                        }
                        conn2.disconnect();//释放
                        //如果消费时间小于当天重新统计报表
                        /*if(!err && order.account_date < Common.todayStartTime()){
                            self.recalculateReport(order.venue_id,order.account_date,function (err,recalculateResult) {
                                log.write('orders_recalculateReport', 0, '重新统计收入报表', {order_id:order.order_id, err: err, result: recalculateResult}, 'info');
                                callback(err, returnData);
                            });
                            return;
                        }*/
                        callback(err, returnData);
                    });
                } else {
                    //旧状态，不处理
					var returnData = {
							err: "",
							info: "true" 
						};		
                    callback(err, returnData);
                }
            } else {
                //入库
				var returnData = {
							err: "",
							info: "true" 
						};		
                order.add_time = moment().unix();
                order.last_update_time = moment().unix();
                var conn2 = db.getAdapter('report');
                conn2.insert(_tableName, order, function (err, info) {
                    if (err) {
						log.write('message', 0, 'insert订单出错', {err: err, message: conn2._last_query()}, 'info');
						returnData.err = err;
                    }
                    conn2.disconnect();//释放
                    //如果消费时间小于当天重新统计报表
                    /*if(!err && order.account_date < Common.todayStartTime()){
                        self.recalculateReport(order.venue_id,order.account_date,function (err,recalculateResult) {
                            log.write('orders_recalculateReport', 0, '重新统计收入报表', {order_id:order.order_id, err: err, result: recalculateResult}, 'info');
                            callback(err, returnData);
                        });
                        return;
                    }*/
                    callback(err, returnData);
                });
            }
			
        });
    };

    /**
     * 重新统计报表
     * @param date_time
     */
    this.recalculateReport = function(venue_id,date_time,callback){
        var input = {venue_id:venue_id,date_time:date_time};
        async.parallel([
            function (callback) {
                //重新统计收入报表
                IncomeReport.dealReport(input, function (err, result) {
                    callback(err,result);
                });
            },
            function (callback) {
                //重新统计灯光报表
                CourtLigthReport.dealReport(input, function (err, result) {
                    callback(err,result);
                });
            },
            function (callback) {
                //重新统计商品报表
                GoodsSalesReport.dealReport(input, function (err, result) {
                    callback(err,result);
                });
            }
        ],function (err,parallelResult) {
            callback(err,parallelResult);
        });
    };

	//new order
    this.dealMessageNew = function (order, soms) {
        order = this.initData(order, soms);
        var where = {
            supplier_id: order.supplier_id,
            venue_id: order.venue_id,
            order_id: order.order_id
        };
        //趣运动订单
        if (order.qyd_order_code) {
            //用趣运动code判断重复
            delete where.order_id;
            where.qyd_order_code = order.qyd_order_code;
        }
        //是否已存在
        var conn = db.getAdapter('report');
        conn.where(where).get(_tableName, function (err, result) {
            conn.disconnect();//释放
            if (!err && result.length > 0) {
                if (order.last_modify_time >= result[0].last_modify_time || order.upload_time >= result[0].upload_time) {
                    order.last_update_time = moment().unix();
                    var conn2 = db.getAdapter('report');
                    conn2.where({id: result[0].id}).update(_tableName, order, function (err, info) {
						var data = {
							err: "",
							info: info 
						};															
                        if (err) {
							log.write('message', 0, 'update订单出错', {err: e, message: conn2._last_query()}, 'info');
							data.err =  'update订单出错' + conn2._last_query();
                        }
                        conn2.disconnect();//释放
		
						return data;
                   
                    });
                } else {
                    //旧状态，不处理
					log.write('message', 0, 'update旧状态不更新', order.order_code, 'info');
                }
            } else {
                //入库
                order.add_time = moment().unix();
                order.last_update_time = moment().unix();
                var conn2 = db.getAdapter('report');	

                conn2.insert(_tableName, order, function (err, info) {
					var data = {
							err: "",
							info: info 
						};		
                    if (err) {
						log.write('message', 0, 'insert订单出错', {err: e, message: conn2._last_query()}, 'info');
						data.err =  'insert订单出错' + conn2._last_query();
                    }
                    conn2.disconnect();//释放
					return data;
					
                });
            }

			
        });
    };
	

    //取出所有可统计的订单
};

module.exports = new orders();