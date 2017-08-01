var async = require('async');
var db = require('../models/db');
var log = require('../util/log');
var moment = require('moment');
var common = require('../util/common');
var extend = require('util')._extend;
var redis = require('../util/redis');
var ordersOld = require('../models/ordersOld'); // 订单报表模型对象
var orderApi = require('../api/order');

/**
 * 可以统计的订单条件
 * @type {{order_status: number, pay_status: number, is_delete: number}}
 */
//收入表名
var _tableName = 'income_report';
var _condition = {
    pay_status: 0, //已支付
    is_delete: 0 //未删除
};
//订单状态
const ORDER_OVER = 2;//已完成订单
const ORDER_CANCEL = 3;//取消订单
//支付方式
const PAY_CARD = 1;//会员卡支付
const PAY_GIFT = 4;//赠送余额支付方式
const PAY_MULTI = 999;//多种混合的支付方式
//场地订单和商品订单
const VENUE_SOURCE = '110000';//
const VENUE_CATALOG = 3;//场地订单分类
const TIMES_CATALOG = 6;//人次订单分类
const GOODS_CATALOG = 1;//商品订单分类
//收入分类
const VENUE_INCOME = 1;//场地收入
const GOODS_INCOME = 2;//商品收入
const CARD_INCOME = 3;//会员收入
//会员卡充值订单
const CARD_SOURCE = '110002';
//并发限制
const EACH_LIMIT = 3;


var incomeReport = function () {
    var self = this;
    //处理数据
    this.initData = function (input) {
        var data = {
            venue_id: input.venue_id,
            supplier_id: input.supplier_id,
            income_type: input.income_type,
            date: input.account_date,
            pay_type: input.pay_mode,
            amount: input.amount,
            gift_amount: input.gift_amount
        };
        return data;
    };
    //插入数据
    this.insertData = function (input, callback) {
        input = self.initData(input);
        var conn = db.getAdapter('report');
        conn.where({
            venue_id: input.venue_id,
            date: input.date,
            income_type: input.income_type,
            pay_type: input.pay_type
        }).get(_tableName, function (err, result) {
            conn.disconnect();//释放
            if (!err && result.length > 0) {
                var conn2 = db.getAdapter('report');
                conn2.where({id: result[0].id}).update(_tableName, input, function (err, info) {
                    if (err) {
                        info = {last_query: conn2._last_query()};
                    }
                    conn2.disconnect();//释放
                    callback(err, info);
                });
            } else {
                //入库
                var conn2 = db.getAdapter('report');
                conn2.insert(_tableName, input, function (err, info) {
                    if (err) {
                        info = {last_query: conn2._last_query()};
                    }
                    conn2.disconnect();//释放
                    callback(err, info);
                });
            }
        });
    };
    //统计
    this.dealReport = function (input, callback) {
        async.parallel({
            court: function (asyncCallback) {
                //场地订单统计
                self.dealCourtOneDay(input, asyncCallback);
            },
            goods: function (asyncCallback) {
                //商品订单统计
                self.dealGoodsOneDay(input, asyncCallback);
            },
            card: function (asyncCallback) {
                //会员卡订单统计
                self.dealCardOneDay(input, asyncCallback);
            }
        }, function (err, results) {
            callback(err, results);
        });
    };

    //某一天的场地订单
    this.dealCourtOneDay = function (input, callback) {
        var condition = extend({}, _condition);
        var date_time = 0, venue_id = 0;
        if (typeof input === 'object') {
            date_time = input.date_time;
            venue_id = input.venue_id;
        } else {
            date_time = input;
        }
        if (venue_id) {
            condition.venue_id = venue_id;//统计日期
        }
        condition.source_name = VENUE_SOURCE;
        condition.order_catalog = [VENUE_CATALOG,TIMES_CATALOG];//订单分类加上人次订单
        condition.order_status = [ORDER_CANCEL,ORDER_OVER];//订单状态加上取消
        condition.account_date = date_time;

        var log_pre = '统计' + moment.unix(date_time).format('YYYY-MM-DD') + '的场地订单';
        var last_query = "";
        async.parallel({
            onePay: function (asyncCallback) {
                var conn = db.getAdapter('report');
                conn.select('supplier_id,venue_id,SUM(apay_amount) AS amount,SUM(gift_remain_pay_amount) AS gift_amount,pay_mode,account_date')
                    .where(condition)
                    .where("pay_mode!=" + PAY_MULTI)
                    .group_by(['venue_id', 'pay_mode'])
                    .get('orders', function (err, results) {
                        last_query = err ? conn._last_query() : '';
                        conn.disconnect();//释放
                        var task = {};
                        if (!err && results.length > 0) {
                            for (var i = 0; i < results.length; i++) {
                                var key = results[i].venue_id + '&' + results[i].pay_mode;
                                results[i].income_type = VENUE_INCOME;
                                task[key] = results[i]
                            }
                        }
                        asyncCallback(err, task);
                    });
            },
            multiPay: function (asyncCallback) {
                //处理多种支付方式
                var conn = db.getAdapter('report');
                conn.select('supplier_id,venue_id,account_date,pay_catalog_detail')
                    .where(condition)
                    .where("pay_mode=" + PAY_MULTI)
                    .get('orders', function (err, results) {
                        last_query = err ? conn._last_query() : '';
                        conn.disconnect();//释放
                        var task = {};
                        if (!err && results.length > 0) {
                            for (var i = 0; i < results.length; i++) {
                                results[i].income_type = VENUE_INCOME;
                                var oneTask = pay_catalog_detail(results[i]);
                                for (var key in oneTask) {
                                    if (!task.hasOwnProperty(key)) {
                                        task[key] = oneTask[key];
                                        continue;//跳出当前循环
                                    }
                                    task[key].amount += oneTask[key].amount;
                                    task[key].gift_amount += oneTask[key].gift_amount;
                                }
                            }
                        }
                        asyncCallback(err, task);
                    });
            }
        }, function (err, results) {
            var select_sum = 0, insert_sum = 0;
            if (err) {
                callback(err, log_pre + '入库失败:统计结果' + select_sum + '条，失败SQL:' + last_query);
                return;
            }
            var task = [];
            for (var key in results.onePay) {
                if (results.multiPay.hasOwnProperty(key)) {
                    results.onePay[key].amount += results.multiPay[key].amount;
                    results.onePay[key].gift_amount += results.multiPay[key].gift_amount;
                }
                task.push(results.onePay[key]);
            }
            for (var key in results.multiPay) {
                if (!results.onePay.hasOwnProperty(key)) {
                    task.push(results.multiPay[key]);
                }
            }
            select_sum = task.length;
            if (task.length == 0) {
                callback(err, log_pre + '入库成功:统计结果' + select_sum + '条，入库成功' + insert_sum + '条');
                return;
            }
            async.eachLimit(task, EACH_LIMIT, function (item, asyncCallback) {
                self.insertData(item, function (err, info) {
                    if (err) last_query = info.last_query;
                    else insert_sum++;
                    asyncCallback(err, info);
                });
            }, function (err) {
                if (err) {
                    callback(err, log_pre + '入库失败:统计结果' + select_sum + '条，失败SQL' + last_query);
                    return;
                }
                callback(err, log_pre + '入库成功:统计结果' + select_sum + '条，入库成功' + insert_sum + '条')
            });
        });
    };
    /**
     * 处理多种支付
     */
    function pay_catalog_detail(input) {
        try {
        	var result = {};
        	//if(input.pay_catalog_detail != "" && input.pay_catalog_detail != null)
            var detail = JSON.parse(input.pay_catalog_detail);
            
            var gift_amount = 0;
            var pay_mode = 0;
            for (var i = 0; i < detail.length; i++) {
                pay_mode = detail[i].c;
                if (pay_mode == PAY_GIFT) {
                    //赠送余额支付存入会员卡支付
                    pay_mode = PAY_CARD;
                    gift_amount = detail[i].m;
                }
                var key = input.venue_id + '&' + pay_mode;
                if (result[key] == undefined) {
                    result[key] = {
                        account_date: input.account_date,
                        income_type: input.income_type,
                        supplier_id: input.supplier_id,
                        venue_id: input.venue_id,
                        pay_mode: pay_mode,
                        amount: detail[i].m,
                        gift_amount: gift_amount
                    };
                    continue;//跳过循环
                }
                result[key].amount += detail[i].m;
                result[key].gift_amount += gift_amount;
            }
            return result;
        } catch (e) {
            log.write('incomeReport', 0, 'pay_catalog_detail格式有误', {err: e}, 'error');
            return {};
        }
    }

    //商品订单
    this.dealGoodsOneDay = function (input, callback) {
        var condition = extend({}, _condition);
        var date_time = 0, venue_id = 0;
        if (typeof input === 'object') {
            date_time = input.date_time;
            venue_id = input.venue_id;
        } else {
            date_time = input;
        }
        if (venue_id) {
            condition.venue_id = venue_id;//统计日期
        }
        condition.source_name = VENUE_SOURCE;
        condition.order_catalog = GOODS_CATALOG;
        condition.account_date = date_time;
        condition.order_status = ORDER_OVER;//已完成订单
        var log_pre = '统计' + moment.unix(date_time).format('YYYY-MM-DD') + '的商品订单';

        var conn = db.getAdapter('report');
        conn.select('supplier_id,venue_id,SUM(apay_amount) AS amount,SUM(gift_remain_pay_amount) AS gift_amount,pay_mode,account_date')
            .where(condition)
            .group_by(['venue_id', 'pay_mode'])
            .get('orders', function (err, results) {
                var err_msg = err ? log_pre + '最后查询SQL:' + conn._last_query() : '无商品订单';
                conn.disconnect();//释放
                var select_sum = 0, insert_sum = 0;
                if (!err && results.length > 0) {
                    var task = [];
                    for (var i = 0; i < results.length; i++) {
                        results[i].income_type = GOODS_INCOME;
                        task.push(results[i]);
                        select_sum++;
                    }
                    async.eachLimit(task, EACH_LIMIT, function (item, asyncCallback) {
                        self.insertData(item, function (err, info) {
                            if (err) err_msg = info.last_query;
                            asyncCallback(err, info);
                        });
                    }, function (err) {
                        if (err) {
                            callback(err, log_pre + '入库失败:统计结果' + select_sum + '条，失败SQL' + err_msg);
                            return;
                        }
                        insert_sum = select_sum;
                        callback(err, log_pre + '入库成功:统计结果' + select_sum + '条，成功' + insert_sum + '条');
                    });
                    return;
                }
                callback(err, err_msg);
            });
    };

    //会员充值订单
    this.dealCardOneDay = function (input, callback) {
        var condition = extend({}, _condition);
        var date_time = 0, venue_id = 0;
        if (typeof input === 'object') {
            date_time = input.date_time;
            venue_id = input.venue_id;
        } else {
            date_time = input;
        }
        if (venue_id) {
            condition.venue_id = venue_id;//统计日期
        }
        condition.source_name = CARD_SOURCE;
        condition.account_date = date_time;
        condition.order_status = ORDER_OVER;//已完成订单
        var log_pre = '统计' + moment.unix(date_time).format('YYYY-MM-DD') + '的会员充值订单';

        var conn = db.getAdapter('report');
        conn.select('supplier_id,venue_id,SUM(apay_amount) AS amount,SUM(extra_fee) AS gift_amount,pay_mode,account_date')
            .where(condition)
            .group_by(['venue_id', 'pay_mode'])
            .get('orders', function (err, results) {
                var err_msg = err ? log_pre + '最后查询SQL:' + conn._last_query() : '';
                conn.disconnect();//释放
                var select_sum = 0, insert_sum = 0;
                if (!err && results.length > 0) {
                    var task = [];
                    for (var i = 0; i < results.length; i++) {
                        results[i].income_type = CARD_INCOME;
                        task.push(results[i]);
                        select_sum++;
                    }

                    async.eachLimit(task, EACH_LIMIT, function (item, asyncCallback) {
                        self.insertData(item, function (err, info) {
                            if (err) err_msg = info.last_query;
                            asyncCallback(err, info);
                        });
                    }, function (err) {
                        if (err) {
                            callback(err, log_pre + '入库失败:统计结果' + select_sum + '条，失败SQL' + err_msg);
                            return;
                        }
                        insert_sum = select_sum;
                        callback(err, log_pre + '入库成功:统计结果' + select_sum + '条，成功' + insert_sum + '条');
                    });
                    return;
                }
                callback(err, log_pre + '统计成功:统计结果' + select_sum + '条');
            });
    };

    /**
     * 场地收入总额(取报表)
     * 不包括会员卡收入和次卡
     */
    this.getCourtIncome = function (params, callback) {
        var cacheKey = 'income:getCourtIncome-' + params.venues_id + '-' + params.date;
        async.waterfall([
            function (callback) {
                //缓存
                redis.getValue(cacheKey, callback);
            },
            function (data, callback) {
                if (data) {
                    callback(null, data);
                    return;
                }
                var conn = db.getAdapter('report');
                //过滤掉趣运动总价(pay_type=7)
                conn.select('SUM(amount) AS amount, SUM(gift_amount) AS gift_amount')
                    .where('income_type=1 AND pay_type !=1 AND pay_type != 3 AND pay_type != 7 AND venue_id=' + params.venues_id + ' AND date=' + params.date)
                    .get('income_report', function (err, results) {
                        conn.disconnect();//释放
                        var res = {};
                        res.amount = 0; // 余额
                        if (!err && results.length > 0) {
                            if (results[0].amount != null) {
                                res.amount = results[0].amount;
                            }
                        } else { // 查询出错
                            log.write('incomeReport', 0, '按场地收入统计', {err: err}, 'error');
                        }
                        //缓存
                        if(params.date != common.todayStartTime()){
                            redis.setValue(cacheKey, res, 3600);
                        }
                        callback(err, res);
                    });
            }
        ], function (err, result) {
            callback(err, result);
        });
    };

    /**
     * 场地收入总额(不取报表，直接取订单结算价)
     * add by bumtime 20170321 
     */
    this.getCourtIncomeByDate = function (params, callback) {
        var cacheKey = 'income:getCourtIncomeByDate-' + params.venues_id + '-' + params.date ;
        async.waterfall([
            function (callback) {
                //缓存
                redis.getValue(cacheKey, callback);
            },
            function (data, callback) {
               /* if (data) {
                    callback(null, data);
                    return;
                }*/
            	var	param = {
            			 start_date: params.date,
                		 end_date: params.date,
                		 venues_id : params.venues_id
            	};

                //从接口取值
            	orderApi.GetTotalSettlePrice(param, function (err, result) {
                	 var res = {
                		amount: 0	 
                	 };
                	 if (!err && typeof(result) === "object"  && parseFloat(result.total_settle_price) > 0) {
                		 res.amount = parseFloat(result.total_settle_price); 
                		 redis.setValue(cacheKey, res, 3600);
                     }
                	 
                	 //缓存
                     if(params.date != common.todayStartTime()){
                         redis.setValue(cacheKey, res, 3600);
                     }
                     
                	callback(err, res);
                });

            }
        ], function (err, result) {
            callback(err, result);
        });
    };
    
    
    /**
     * 商品收入总额
     * 不包括会员卡收入
     */
    this.getGoodsIncome = function (params, callback) {
        var cacheKey = 'income:getGoodsIncome-' + params.venues_id + '-' +   params.date;
        async.waterfall([
            function (callback) {
                //缓存
                redis.getValue(cacheKey, callback);
            },
            function (data, callback) {
                if (data) {
                    callback(null, data);
                    return;
                }
                var conn = db.getAdapter('report');
                conn.select('SUM(amount) AS amount, SUM(gift_amount) AS gift_amount')
                    .where('income_type=2 AND pay_type !=1 AND pay_type != 3 AND venue_id=' + params.venues_id + ' AND date=' + params.date)
                    .get('income_report', function (err, results) {
                        conn.disconnect();//释放
                        var res = {};
                        res.amount = 0; // 余额
                        if (!err && results.length > 0) {
                            if (results[0].amount != null) {
                                res.amount = results[0].amount;
                            }
                        } else { // 查询出错
                            log.write('incomeReport', 0, '按商品收入统计', {err: err}, 'error');
                        }

                        //缓存
                        if(params.date != common.todayStartTime()){
                            redis.setValue(cacheKey, res, 3600);
                        }
                        callback(err, res);
                    });
            }
        ], function (err, result) {
            callback(err, result);
        });
    };
    
    /**
     * 场地收入分类
     * 商品收入
     */
    this.getPayTypeIncomes = function (params, callback) {
        var income_type = params.income_type || 1;
        var cacheKey = 'income:getPayTypeIncome-' + income_type + '-' + params.venues_id + '-' + params.date;
        async.waterfall([
            function (callback) {
                //缓存
                redis.getValue(cacheKey, callback);
            },
            function (data, callback) {
                if (data) {
                    callback(null, data);
                    return;
                }
                var conn = db.getAdapter('report');
                conn.select('SUM(amount) AS amount,SUM(gift_amount) AS gift_amount,pay_type')
                    .where('income_type=' + income_type + ' AND venue_id=' + params.venues_id + ' AND date=' + params.date)
                    .group_by(['pay_type'])
                    .get('income_report', function (err, results) {
                        conn.disconnect();//释放
                        var res = [];
                        if (!err && results.length > 0) {
                            for (var i = 0; i < results.length; i++) {
                                res[results[i]['pay_type']] = results[i];
                            }
                        }
                        //缓存
                        if(params.date != common.todayStartTime()){
                            redis.setValue(cacheKey, res, 3600);
                        }
                        callback(err, res);
                    });
            }
        ], function (err, result) {
            callback(err, result);
        });
    };
    
    /**
     * 取多天的数据
     */
    this.getTotalIncome = function (params, callback) {

        var oldDates = [], newDates = [], res = [];
        for (var i = 0; i < params.dates.length; i++) {
            var date = params.dates[i];
            if (date > params.upDate) {
                newDates.push(date);
            } else {
                oldDates.push(date);
            }
            //res.push({data: moment.unix(date).format('YYYY-MM-DD'), value: 0});
        }

        async.parallel({
            new: function (asyncCallback) {
                if (newDates.length > 0) {
                    self.getNewTotalIncome({venues_id: params.venues_id, dates: newDates}, asyncCallback);
                    return;
                }
                asyncCallback(null, []);
            },
            old: function (asyncCallback) {
                if (oldDates.length > 0) {
                    self.getOldTotalIncome({venues_id: params.venues_id, dates: oldDates}, asyncCallback);
                    return;
                }
                asyncCallback(null, []);
            },
            //取这二周的趣运动价add by bumtime  20170322
            qyd:function (asyncCallback) {
                if (newDates.length > 0) {
                    self.getQydTotalIncome({venues_id: params.venues_id, date: newDates[params.dates.length-1]}, asyncCallback);
                    return;
                }
                asyncCallback(null, []);
            }
        }, function (err, results) {
            if (err) {
                log.write('IncomeReport', 0, '获取数据出错', {err: err, params: params}, 'error');
            }else{	
                res = results.old.concat(results.new);
                //加上趣运动场地结算价 add by bumtime 20170322
                if(results.qyd.length >0){
                	for (var i = 0; i < results.qyd.length; i++) {
                        res[i].value = results.qyd[i].value
                    }
                }
            }
            callback(err, res);
        });
    };

    this.getNewTotalIncome = function (params, callback) {
        //取所有收入
        var conn = db.getAdapter('report');
        conn.select('date,SUM(amount) AS total')
            //.where('venue_id=' + params.venues_id + ' AND date IN(' + params.dates.join(',') + ')')
        	//不包括场地趣运动价 edit by bumtime 20170322
            .where('venue_id=' + params.venues_id + " AND income_type !='3' AND pay_type != '3' AND pay_type != '7' AND date IN(" + params.dates.join(',') + ')')
            .group_by('date')
            .order_by('date')
            .get('income_report', function (err, results) {
                conn.disconnect();//释放
                var data = {};
                var res = [];
                if (!err && results.length > 0) {
                    for (var i = 0; i < results.length; i++) {
                        data[results[i].date] = results[i].total;
                    }
                }
                for (var i = 0; i < params.dates.length; i++) {
                    var date = params.dates[i];
                    res.push({data: moment.unix(date).format('YYYY-MM-DD'), value: data[date] || 0});
                }
                callback(err, res);
            });
    };
    /**
     * 取旧收入数据
     */
    this.getOldTotalIncome = function (params, callback) {

        var dates = [];
        for (var i = 0; i < params.dates.length; i++) {
            var date = params.dates[i];
            dates.push({
                startTime: date,
                endTime: date + 86400,
                venueId: params.venues_id
            });
        }
        async.map(dates, function (item, callbackMap) {
            ordersOld.getIncomeCountExcludeMember(item, function (err, result) {
                if (err) {
                    log.write('orders_controller', 0, '获取历史数据出错', {err: err, params: item}, 'error');
                    callbackMap("获取历史数据出错", {});
                } else {
                    callbackMap(null, {
                        data: moment.unix(item.startTime).format('YYYY-MM-DD'),
                        value: result.totalAmount
                    });
                }
            });
        }, function (err, result) {
            var callbacKErr = null;

            if (err) {
                log.write('orders_controller', 0, '获取历史数据出错', {err: err}, 'error');
                callbacKErr = '获取历史数据出错';
            }

            callback(callbacKErr, result);
        });
    };
    
    
    /**
     * 取趣运动两周前的数据 
     * add by bumtime 20170322 
     */
    this.getQydTotalIncome = function (params, callback) {
    	
    	 var cacheKey = 'income:getQydTotalIncome-' + params.venues_id + '-' + params.date;
         async.waterfall([
             function (callback) {
                 //缓存
                 redis.getValue(cacheKey, callback);
             },
             function (data, callback) {
                 /*if (data) {
                     callback(null, data);
                     return;
                 }*/
            	var param = {
            			 start_date: params.date - 13*86400,
            	   		 end_date: params.date,
            	   		 venues_id : params.venues_id
            		};
        		orderApi.GetTotalSettlePrice(param, function (err, result) {
        	     	var data = {};
        	        var res = [];
        	        if (!err && typeof(result.list) === "object") {
        	        	var obj = result.list;
        	        	for(var i in obj){
        	        		res.push({data: obj[i].date_time, value: obj[i].total_settle_price || 0});
        	        	}
        	        }
        	        
        	        //缓存
                    if(params.start_date != common.todayStartTime()){
                        redis.setValue(cacheKey, res, 3600);
                    }
                    
        	     	callback(err, res);
        	     });

             }
         ], function (err, result) {
             callback(err, result);
         });

    };

};

module.exports = new incomeReport();

