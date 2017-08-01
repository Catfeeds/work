/**
 * 旧报表首页
 *
 * @author xiaoyanchun
 * @date 2016-04-21
 */
var async = require('async');
var moment = require('moment');
var common = require('../util/common');
var log = require('../util/log');
var ordersOld = require('../models/ordersOld'); // 订单报表模型对象

var order = {};

/**
 * 获取最近7天的数据
 *
 * @param date
 * @param venueId
 * @param callback
 * @author xiaoyanchun
 */
function getSevenDayHistory(date, venueId, callback) {
    var sevenDay = []; // 最近7天

    for (var i = 6; i >= 0; i--) {
        var params = {
            startTime: date - 86400 * i,
            endTime: date - 86400 * i + 86400 - 1,
            venueId: venueId,
        };
        sevenDay.push(params);
    }

    async.map(sevenDay, function(item, callbackMap) {
        ordersOld.getIncomeCount(item, function(err, result){
            if (err) {
                log.write('orders_controller', 0, '获取历史数据出错', {err: err, params: item}, 'error');
                callbackMap("获取历史数据出错", {});
            } else {
                callbackMap(null, {
                    date: item.startTime,
                    amount: result.totalAmount
                });
            }
        });
    }, function(err, result) {
        var dateArr = [];
        var amountArr = [];
        var callbacKErr = null;

        if (err) {
            log.write('orders_controller', 0, '获取历史数据出错', {err: err}, 'error');
            callbacKErr = '获取历史数据出错';
        } else {
            var len = result.length;

            for (var i = 0; i < len; i++) {
                dateArr.push(moment.unix(result[i].date).format('YYYYMMDD'));
                amountArr.push(result[i].amount);
            }
        }

        callback(callbacKErr, {
            date: dateArr,
            amount: amountArr
        });
    });
}

/**
 * 检测venueId和date参数是否合法
 *
 * @param req
 * @param res
 * @param venueId
 * @param date
 * @returns {boolean}
 * @author xiaoyanchun
 */
function checkParams(req, res, venueId, date) {
    if (isNaN(venueId) || venueId < 0) { // 转换成整数失败
        res.json({
            success: false,
            errorMsg: '参数venueId错误',
            data: {}
        });
        return false;
    }

    if (isNaN(date)) { // 转换时间出错
        res.json({
            success: false,
            errorMsg: '参数date错误',
            data: {}
        });
        return false;
    }

    if (date < 1) {
        res.json({
            success: false,
            errorMsg: '参数 date 错误',
            data: {}
        });
        return false;
    }

    if (!common.inBindVenueList(req, venueId)) { // 不在绑定的场馆内
        res.json({
            success: false,
            errorMsg: '参数 venueId 错误',
            data: {}
        });
        return false;
    }

    return true;
}


/**
 * 日报表概要
 *
 * @param req
 * @param res
 * @param next
 * @author xiaoyanchun
 */
order.dailyReport = function(req, res, next){
    var venueId = parseInt(req.query.venueId); // 场馆id
    var date    = moment(req.query.date, "YYYYMMDD").unix(); // 当天的0点时间

    if (!checkParams(req, res, venueId, date)) { // 在checkParams函数内已经输入错误了，此处直接返回即可
        return;
    }

    async.parallel({
        // 今天的收入
        'todayIncome': function (callback) {
            var params = {
                startTime: date,
                endTime: common.getDayEndTime(date),
                venueId: venueId
            };
            ordersOld.getIncomeCount(params, function(err, result){
                if (err) {
                    log.write('orders_controller', 0, '获取今天的收入失败', {err: err, params: params}, 'error');
                    callback("获取今天的收入失败", []);
                } else {
                    if (result.lastTime == 0) { // 没有记录
                        if (date == common.todayStartTime()) { // 是当天，截止时间为 当前时间
                            result.lastTime = common.timestamp();
                        } else { // 不是当天，到23:59:59
                            result.lastTime = common.getDayEndTime(date);
                        }
                    }
                    callback(null, result);
                }
            });
        },

        // 昨天的收入
        'yesterdayIncome': function (callback) {
            var params = {
                startTime: date - 86400,
                endTime: date - 1,
                venueId: venueId
            };
            ordersOld.getIncomeCount(params, function(err, result){
                if (err) {
                    log.write('orders_controller', 0, '获取昨天的收入失败', {err: err, params: params}, 'error');
                    callback("获取昨天的收入失败", []);
                } else {
                    callback(null, result);
                }
            });
        },

        // 上周今天的收入
        'preweekIncome': function (callback) {
            var params = {
                startTime: date - 86400 * 7,
                endTime: date - 86400 * 6 - 1,
                venueId: venueId
            };
            ordersOld.getIncomeCount(params, function(err, result){
                if (err) {
                    log.write('orders_controller', 0, '获取上周今天的收入出错', {err: err, params: params}, 'error');
                    callback("获取上周今天的收入出错", []);
                } else {
                    callback(null, result);
                }
            });
        },

        // 今天订单数量
        'todayOrderQty': function (callback) {
            var params = {
                startTime: date,
                endTime: common.getDayEndTime(date),
                venueId: venueId,
                bill_type: 1, // 订单,
                add_where: ' AND cus_type !=4 ' // 排除次卡
            };
            ordersOld.getOrderCount(params, function(err, result){
                if (err) {
                    log.write('orders_controller', 0, '获取今天订单数量出错', {err: err, params: params}, 'error');
                    callback("获取今天订单数量出错", []);
                } else {
                    callback(null, result);
                }
            });
        },

        // 今天会员数量
        'todayMemberQty': function (callback) {
            var params = {
                startTime: date,
                endTime: common.getDayEndTime(date),
                venueId: venueId,
                bill_type: 2 // 会员
            };
            ordersOld.getOrderCount(params, function(err, result){
                if (err) {
                    log.write('orders_controller', 0, '获取今天会员数量出错', {err: err, params: params}, 'error');
                    callback("获取今天会员数量出错", []);
                } else {
                    callback(null, result);
                }
            });
        },

        // 本周累计定单
        'weekOrder': function (callback) {
            var params = {
                startTime: common.getWeekStartTime(date),
                endTime: common.getDayEndTime(date),
                venueId: venueId,
                bill_type: 1, // 订单
                add_where: ' AND cus_type !=4 ' // 排除次卡
            };
            ordersOld.getOrderCount(params, function(err, result){
                if (err) {
                    log.write('orders_controller', 0, '获取本周累计定单出错', {err: err, params: params}, 'error');
                    callback("获取本周累计定单出错", []);
                } else {
                    callback(null, result);
                }
            });
        },

        // 本周累计会员
        'weekMember': function (callback) {
            var params = {
                startTime: common.getWeekStartTime(date),
                endTime: common.getDayEndTime(date),
                venueId: venueId,
                bill_type: 2 // 会员
            };
            ordersOld.getOrderCount(params, function(err, result){
                if (err) {
                    log.write('orders_controller', 0, '获取本周累计会员出错', {err: err, params: params}, 'error');
                    callback("获取本周累计会员出错", []);
                } else {
                    callback(null, result);
                }
            });
        },

        // 最近7天历史信息
        'history': function(callback) {
            getSevenDayHistory(date, venueId, function(err, result){
                callback(err, result);
            });
        }
    }, function(err, result){

        if (err) { // 出错
            log.write('orders_controller', 0, '获取场馆某一天的报表信息出错', {err: err}, 'error');
            var resData = {
                success: false,
                errorMsg: '获取数据失败',
                data: {}
            };
        } else {
            var resData = {
                success: true,   // 成功提示
                errorMsg: null,   // 错误消息
                data: {
                    queryDate: moment.unix(date).format('YYYYMMDD'),   // 查询那天就是那天的日期
                    updateDate: moment.unix(result.todayIncome.lastTime).format('MM/DD HH:mm'), // 查询那一天数据最后更新时间
                    income: {
                        today: result.todayIncome.totalAmount,        // 总收入
                        yesterday: result.yesterdayIncome.totalAmount,   // 昨日收入
                        preweek: result.preweekIncome.totalAmount     // 上周今日收入
                    },
                    order: {
                        today: result.todayOrderQty,      // 今日完成定单量
                        week: result.weekOrder      // 本周完成定单量
                    },
                    member: {
                        today: result.todayMemberQty,      // 新增会员量
                        week: result.weekMember      // 本周总会员量
                    },
                    history:{
                        date: result.history.date,  // 最近7天日期所在月日
                        amount: result.history.amount // 最近7天收入
                    }
                }
            };
        }

        res.json(resData);
    });

};

/**
 * 收入报表概要
 *
 * @param req
 * @param res
 * @param next
 * @author xiaoyanchun
 */
order.incomeReport = function(req, res, next){
    var venueId = parseInt(req.query.venueId); // 场馆id
    var date    = moment(req.query.date, "YYYYMMDD").unix(); // 当天的0点时间

    if (!checkParams(req, res, venueId, date)) { // 在checkParams函数内已经输入错误了，此处直接返回即可
        return;
    }

    // 基础条件
    var baseWhere = ' date>=' + date + ' AND date<=' + common.getDayEndTime(date) + ' AND venue_id=' + venueId;

    async.parallel({
        // 场地收费合计
        'fieldTotal': function(callback){
            var where = baseWhere + ' AND rec_type=1 ';

            ordersOld.getIncomeTotalAmount(where, function(err, result){
                if (err) {
                    log.write('orders_controller', 0, '获取场地收费合计出错', {err: err, where: where}, 'error');
                    callback("获取场地收费合计出错", 0);
                } else {
                    callback(null, result);
                }
            });
        },

        // 场地实际收入
        'fieldReal': function(callback){
            var where = baseWhere + ' AND rec_type=1 AND pay_catalog != 2 ';

            ordersOld.getIncomeTotalAmount(where, function(err, result){
                if (err) {
                    log.write('orders_controller', 0, '获取场地实际收入出错', {err: err, where: where}, 'error');
                    callback("获取场地实际收入出错", 0);
                } else {
                    callback(null, result);
                }
            });
        },

        // 场地收入-现金/银行卡
        'fieldCash': function(callback){
            var where = baseWhere + ' AND rec_type=1 AND pay_catalog=1 ';

            ordersOld.getIncomeTotalAmount(where, function(err, result){
                if (err) {
                    log.write('orders_controller', 0, '获取场地收入-(现金/银行卡)出错', {err: err, where: where}, 'error');
                    callback("获取场地收入-(现金/银行卡)出错", 0);
                } else {
                    callback(null, result);
                }
            });
        },

        // 场地收入-会员储值卡
        'fieldCard': function(callback){
            var where = baseWhere + ' AND rec_type=1 AND pay_catalog=2 ';

            ordersOld.getIncomeTotalAmount(where, function(err, result){
                if (err) {
                    log.write('orders_controller', 0, '获取场地收入-会员储值卡出错', {err: err, where: where}, 'error');
                    callback("获取场地收入-会员储值卡出错", 0);
                } else {
                    callback(null, result);
                }
            });
        },

        // 场地收入-趣运动消费
        'fieldWeb': function(callback){
            var where = baseWhere + ' AND rec_type=1 AND pay_catalog=3 ';

            ordersOld.getIncomeTotalAmount(where, function(err, result){
                if (err) {
                    log.write('orders_controller', 0, '获取场地收入-趣运动消费出错', {err: err, where: where}, 'error');
                    callback("获取场地收入-趣运动消费出错", 0);
                } else {
                    callback(null, result);
                }
            });
        },

        // 商品收入合计
        'goodsTotal': function(callback){
            var where = baseWhere + ' AND rec_type=2 ';

            ordersOld.getIncomeTotalAmount(where, function(err, result){
                if (err) {
                    log.write('orders_controller', 0, '获取商品收入合计出错', {err: err, where: where}, 'error');
                    callback("获取商品收入合计出错", 0);
                } else {
                    callback(null, result);
                }
            });
        },

        // 商品实际收入
        'goodsReal': function(callback){
            var where = baseWhere + ' AND rec_type=2 AND pay_catalog != 2 ';

            ordersOld.getIncomeTotalAmount(where, function(err, result){
                if (err) {
                    log.write('orders_controller', 0, '获取商品实际收入出错', {err: err, where: where}, 'error');
                    callback("获取商品实际收入出错", 0);
                } else {
                    callback(null, result);
                }
            });
        },

        // 商品收入-(现金/银行卡)
        'goodsCash': function(callback){
            var where = baseWhere + ' AND rec_type=2 AND pay_catalog=1 ';

            ordersOld.getIncomeTotalAmount(where, function(err, result){
                if (err) {
                    log.write('orders_controller', 0, '获取商品收入-(现金/银行卡)出错', {err: err, where: where}, 'error');
                    callback("获取商品收入-(现金/银行卡)出错", 0);
                } else {
                    callback(null, result);
                }
            });
        },

        // 商品收入-会员储值卡
        'goodsCard': function(callback){
            var where = baseWhere + ' AND rec_type=2 AND pay_catalog=2 ';

            ordersOld.getIncomeTotalAmount(where, function(err, result){
                if (err) {
                    log.write('orders_controller', 0, '获取商品收入-会员储值卡出错', {err: err, where: where}, 'error');
                    callback("获取商品收入-会员储值卡出错", 0);
                } else {
                    callback(null, result);
                }
            });
        },

        // 会员收入合计
        'memberTotal': function(callback){
            var where = baseWhere + ' AND rec_type=3 ';

            ordersOld.getIncomeTotalAmount(where, function(err, result){
                if (err) {
                    log.write('orders_controller', 0, '获取会员收入合计出错', {err: err, where: where}, 'error');
                    callback("获取会员收入合计出错", 0);
                } else {
                    callback(null, result);
                }
            });
        },

        // 查询指定日期最后一条记录的时间
        /*
        'lastTime': function(callback){
            var params = {
                startTime: date,
                endTime: date + 86400 - 1,
                venueId: venueId
            };
            ordersOld.getIncomReportLastTime(params, function(err, result){
                if (err) {
                    log.write('orders_controller', 0, '获取查询指定日期最后一条记录的时间出错', {err: err, params: params}, 'error');
                    callback("获取查询指定日期最后一条记录的时间出错", 0);
                } else {
                    callback(null, result);
                }
            });
        }
        */
    }, function(err, result){
        if (err) {
            log.write('orders_controller', 0, '获取场馆收入报表信息出错', {err: err}, 'error');
            var resData = {
                success: false,
                errorMsg: '获取数据失败',
                data: {}
            };
        } else {
            // 最后更新时间
            var lastUpdateTIme = (result.lastTime > 0 ) ? result.lastTime : (date + 86400 - 1);

            var sumTotal = result.fieldTotal + result.goodsTotal + result.memberTotal;
            var sumReal = result.fieldReal + result.goodsReal + result.memberTotal;

            var resData = {
                success: true,   // 成功提示
                errorMsg: null,   // 错误消息
                data: {
                    // querydate: moment.unix(date).format('YYYYMMDD'),   // 查询时间
                    // update: moment.unix(lastUpdateTIme).format('MMDD HH:mm'),     // 查询那一天数据更新时间
                    sum: {
                        total: sumTotal.toFixed(2),   // 收入合计
                        real: sumReal.toFixed(2)  //实际收入（不含会员储蓄卡收入）
                    },
                    field: {
                        total: result.fieldTotal,    // 场地收费合计
                        real: result.fieldReal,      // 场地实际收入
                        price1: result.fieldCash,    // 场地收入-现金/银行卡
                        price2:  result.fieldCard,   // 场地收入-会员储值卡
                        price3: result.fieldWeb      // 场地收入-趣运动消费
                    },
                    goods: {
                        total: result.goodsTotal,    // 商品收入合计
                        real: result.goodsReal,      // 商品实际收入
                        price1: result.goodsCash,    // 商品收入-(现金/银行卡)
                        price2: result.goodsCard     // 商品收入-会员储值卡
                    },
                    member: {
                        total: result.memberTotal,   // 会员收入合计
                        real: result.memberTotal,    // 会员实际收入
                        price1: result.memberTotal,  // 会员收入，现金/银行卡
                        price2: 0                    // 会员收入，会员储值卡
                    }
                }
            };
        }

        res.json(resData);
    });

};

/**
 * 订单报表概要
 *
 * @param req
 * @param res
 * @param next
 * @author xiaoyanchun
 */
order.orderReport = function(req, res, next){
    var venueId = parseInt(req.query.venueId); // 场馆id
    var date    = moment(req.query.date, "YYYYMMDD").unix(); // 当天的0点时间

    if (!checkParams(req, res, venueId, date)) { // 在checkParams函数内已经输入错误了，此处直接返回即可
        return;
    }

    // 基础条件 (bill_type=1 订单)
    var baseWhere = 'bill_type = 1 AND date>=' + date + ' AND date<=' + common.getDayEndTime(date) + ' AND venue_id=' + venueId;

    async.parallel({

        // 会员订单数量和金额
        'member': function(callback){
            var where = baseWhere + ' AND cus_type=1 ';

            ordersOld.getOrderTotalAmount(where, function(err, result){
                if (err) {
                    log.write('orders_controller', 0, '获取会员订单数量和金额出错', {err: err, where: where}, 'error');
                    callback("获取会员订单数量和金额出错", {});
                } else {
                    callback(null, result);
                }
            });
        },

        // 散客订单和金额
        'others': function(callback){
            var where = baseWhere + ' AND cus_type=2 ';

            ordersOld.getOrderTotalAmount(where, function(err, result){
                if (err) {
                    log.write('orders_controller', 0, '获取散客订单和金额出错', {err: err, where: where}, 'error');
                    callback("获取散客订单和金额出错", {});
                } else {
                    callback(null, result);
                }
            });
        },

        // 趣运动订单数量和金额
        'internet': function(callback){
            var where = baseWhere + ' AND cus_type=3 ';

            ordersOld.getOrderTotalAmount(where, function(err, result){
                if (err) {
                    log.write('orders_controller', 0, '获取趣运动订单数量和金额出错', {err: err, where: where}, 'error');
                    callback("获取趣运动订单数量和金额出错", {});
                } else {
                    callback(null, result);
                }
            });
        }

    }, function(err, result){

        if (err) { // 出错了
            log.write('orders_controller', 0, '获取订单报表概要出错', {err: err}, 'error');
            var resData = {
                success: false,
                errorMsg: '获取数据失败',
                data: {}
            };
        } else {

            var sumMoney = result.member.totalAmount + result.others.totalAmount + result.internet.totalAmount;

            var resData = {
                success: true,
                errorMsg:null,   // 错误消息
                data:{
                    //"querydate": "20150707",   // 查询时间
                    //"update": "0707 21:35",     // 数据更新时间
                    sum: {
                        number: result.member.totalQty + result.others.totalQty + result.internet.totalQty, // 订单合计
                        money: sumMoney.toFixed(2) // 总收入
                    },
                    member: {
                        number: result.member.totalQty, //会员订单
                        money: result.member.totalAmount //会员订单收入
                    },
                    internet: {
                        number: result.internet.totalQty, //趣运动订单
                        money: result.internet.totalAmount //趣运动订单收入
                    },
                    other: {
                        number: result.others.totalQty, //散客订单
                        money: result.others.totalAmount  //散客订单收入
                    }
                }
            }
        }

        res.json(resData);
    });

};

/**
 * 会员报表概要
 *
 * @param req
 * @param res
 * @param next
 * @author xiaoyanchun
 */
order.memberReport = function(req, res, next){
    var venueId = parseInt(req.query.venueId); // 场馆id
    var date    = moment(req.query.date, "YYYYMMDD").unix(); // 当天的0点时间

    if (!checkParams(req, res, venueId, date)) { // 在checkParams函数内已经输入错误了，此处直接返回即可
        return;
    }

    // 基础条件
    var baseWhere = ' date>=' + date + ' AND date<=' + common.getDayEndTime(date) + ' AND venue_id=' + venueId;

    // pay_catalog - 1现金/银行卡 2会员储值卡 3 趣运动消费
    // rec_type - 1 场地收入 2 商品收入 3 会员收入

    async.parallel({

        // 累计会员
        'qty': function(callback){
            var where = baseWhere + ' AND bill_type=2 ';

            ordersOld.getOrderTotalAmount(where, function(err, result){
                if (err) {
                    log.write('orders_controller', 0, '获取累计会员出错', {err: err, where: where}, 'error');
                    callback("获取累计会员出错", 0);
                } else {
                    callback(null, result.totalQty);
                }
            });
        },

        // 会员卡-会员充值
        'recharge': function(callback){
            var where = baseWhere + ' AND pay_catalog=2 AND rec_type=3 ';

            ordersOld.getIncomeTotalAmount(where, function(err, result){
                if (err) {
                    log.write('orders_controller', 0, '获取会员卡-会员充值出错', {err: err, where: where}, 'error');
                    callback("获取会员卡-会员充值出错", 0);
                } else {
                    callback(null, result);
                }
            });
        },

        // 会员卡-场地和商品收入
        'consume': function(callback){
            var where = baseWhere + ' AND pay_catalog=2 AND rec_type IN (1, 2) ';

            ordersOld.getIncomeTotalAmount(where, function(err, result){
                if (err) {
                    log.write('orders_controller', 0, '获取会员卡-场地收入出错', {err: err, where: where}, 'error');
                    callback("获取会员卡-场地收入出错", 0);
                } else {
                    callback(null, result);
                }
            });
        }

    }, function(err, result){

        if (err) { // 出错啦
            log.write('orders_controller', 0, '获取会员报表概要出错', {err: err}, 'error');
            var resData = {
                success: false,
                errorMsg: '获取数据失败',
                data: {}
            };
        } else {

            var balance = result.recharge - result.consume;

            var resData = {
                success: true,
                errorMsg: null,   //错误消息
                data:{
                    //"querydate": "20150707",   //查询时间
                    //"update": "20150707 21:35",     //数据更新时间
                    qty: result.qty, // 会员累计
                    balance: balance.toFixed(2), // 累计余额
                    recharge: result.recharge, // 充值
                    consume: result.consume //  刷卡
                }
            }
        }

        res.json(resData);
    });
};


module.exports = order;