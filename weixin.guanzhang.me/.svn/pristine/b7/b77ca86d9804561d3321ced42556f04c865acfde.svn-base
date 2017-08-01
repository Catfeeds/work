var async = require('async');
var moment = require('moment');
var common = require('../util/common');
var memberCard = require('../models/memberCard'); // 会员卡模型对象
var venuesModel = require('../models/venues'); // 场馆模型对象
var lightReport = require('../models/lightReport'); // 灯光报表模型对象
var GoodsSalesReport = require('../models/GoodsSalesReport'); // 商品报表模型对象
var IncomeReport = require('../models/IncomeReport'); // 收入报表模型对象
var salesReport = require('../models/salesReport'); // 商品报表模型对象
var db = require('../models/db');
var log = require('../util/log');

var ordersOld = require('../models/ordersOld'); // 订单报表模型对象


//现在所有支付
const PAY_TYPE = ['现金', '会员卡', '银行卡', '次卡', '积分卡', '白条', '储值卡', '趣运动', '微信支付', '团购卷', '支付宝', '代金卷', '支票'];
var show_pay_type = [
    {type: 0, name: '现金'},
    {type: 2, name: '银行卡'},
    {type: 8, name: '微信支付'},
    {type: 10, name: '支付宝'},
    {type: 12, name: '支票'},
    {type: 9, name: '团购券'},
    {type: 11, name: '代金券'},
    {type: 1, name: '储值卡余额'},
    {type: 100, name: '储值卡赠送余额'},//自定义
    {type: 7, name: '趣运动'}];
//导出对象
var wxreport = {};

wxreport.index = function (req, res, next) {
    var venueId = req.params.venueId || 0;
    res.render('wxreport', {date: common.todayStartTime(), id: venueId});
};
/**
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
wxreport.getReportIndexData = function (req, res, next) {
    var venueId = getVenuesIdParam(req, res); // 商户中心的场馆id
    var date = getDateParam(req, res); // 日期

    if (venueId <= 0 || date <= 0) { // 参数获取出错
        return;
    }

    var params = {venues_id: venueId, date: date,upDate:common.getUpgradeDate(req,venueId)};
    var dates = [];
    for (var i = 0; i < 14; i++) {
        dates.unshift(date - 86400 * i);
    }
    //旧版本从拿旧数据
    if (common.isOldDate(req,venueId,date)) {
        getOldIndexData(params, res);
        return;
    }
    //取总收款
    async.parallel({
        //会员收入
        getCardIncome: function (asyncCallback) {
            memberCard.todayRechargeTotalFromCache(params, asyncCallback);
        },
        //场馆收入
        getCourtIncome: function (asyncCallback) {
            IncomeReport.getCourtIncome(params, asyncCallback);
        },
        //商品收入
        getGoodsIncome: function (asyncCallback) {
            IncomeReport.getGoodsIncome(params, asyncCallback);
        },
        //场地各类收入
        getCourtTypeIncomes: function (asyncCallback) {
            params.income_type = 1;
            IncomeReport.getPayTypeIncomes(params, asyncCallback);
        },
        //商品各类收入
        getGoodsTypeIncomes: function (asyncCallback) {
            params.income_type = 2;
            IncomeReport.getPayTypeIncomes(params, asyncCallback);
        },
        getChart: function (asyncCallback) {
            params.dates = dates;
            IncomeReport.getTotalIncome(params, asyncCallback)
        }
    }, function (err, results) {
        var jsonRes = common.getApiResInit();
        //运营数据初始化
        var data = initIndexData(date);

        if (err) {
            log.write('getReportIndexData', 0, '获取报表首页失败', {err: err}, 'error');
            jsonRes.data = data;
            res.json(jsonRes);
            return;
        }
        //收入统计
        if (typeof results.getCardIncome === 'object') {
            data.moneyGetData.vipCharge = results.getCardIncome.amount || 0;
        }
        if (typeof results.getCourtIncome === 'object') {
            data.moneyGetData.fieldIncome = results.getCourtIncome.amount || 0;
        }
        if (typeof results.getGoodsIncome === 'object') {
            data.moneyGetData.goodsIncome = results.getGoodsIncome.amount || 0;
        }
        data.moneyGetData.totalIncome = data.moneyGetData.vipCharge + data.moneyGetData.fieldIncome + data.moneyGetData.goodsIncome;
        //运营数据
        if (typeof results.getCourtTypeIncomes === 'object') {
            var gift_amount = 0;
            var court_total = 0;
            for (var i = 0; i < show_pay_type.length; i++) {
                var pay_type = show_pay_type[i].type;
                if (results.getCourtTypeIncomes[pay_type] !== undefined && results.getCourtTypeIncomes[pay_type]) {
                    //该支付方式存在
                    data.venueBusinessData[i].field = results.getCourtTypeIncomes[pay_type].amount;
                    gift_amount += results.getCourtTypeIncomes[pay_type].gift_amount;
                    court_total += data.venueBusinessData[i].field;
                }
            }
            data.venueBusinessData[show_pay_type.length].field += court_total;
            data.venueBusinessData[show_pay_type.length - 2].field += gift_amount;//赠送余额
            data.venueBusinessData[show_pay_type.length - 3].field -= gift_amount;//余额
        }
        if (typeof results.getGoodsTypeIncomes === 'object') {
            var gift_amount = 0;
            var court_total = 0;
            for (var i = 0; i < show_pay_type.length; i++) {
                var pay_type = show_pay_type[i].type;
                if (results.getGoodsTypeIncomes[pay_type] != undefined) {
                    //该支付方式存在
                    data.venueBusinessData[i].goods = results.getGoodsTypeIncomes[pay_type].amount;
                    gift_amount += results.getGoodsTypeIncomes[pay_type].gift_amount;
                    court_total += data.venueBusinessData[i].goods;
                }
            }
            data.venueBusinessData[show_pay_type.length].goods += court_total;
            data.venueBusinessData[show_pay_type.length - 2].goods += gift_amount;//赠送余额
            data.venueBusinessData[show_pay_type.length - 3].goods -= gift_amount;//余额
        }
        //表格数据
        data.businessCharData = results.getChart || data.businessCharData;

        jsonRes.data = data;
        res.json(jsonRes);
    });
};

//首页数据初始化
function initIndexData(date) {
    var dates = [];
    for (var i = 0; i < 14; i++) {
        dates.unshift(date - 86400 * i);
    }
    var data = {
        date: {
            nowDate: moment.unix(common.todayStartTime()).format('YYYY-MM-DD'),
            checkDate: moment.unix(date).format('YYYY-MM-DD')
        },
        moneyGetData: {
            vipCharge: 0,
            fieldIncome: 0,
            goodsIncome: 0,
            totalIncome: 0
        },
        venueBusinessData: [],
        businessCharData: []
    };
    for (var i = 0; i < show_pay_type.length; i++) {
        data.venueBusinessData.push({name: show_pay_type[i].name, field: 0, goods: 0});
    }
    data.venueBusinessData.push({name: '合计', field: 0, goods: 0});

    for (var i = 0; i < dates.length; i++) {
        data.businessCharData.push({data: moment.unix(dates[i]).format('YYYY-MM-DD'), value: 0});
    }
    return data;
}

//首页返回旧数据
function getOldIndexData(params, res) {
    var jsonRes = common.getApiResInit();
    var data = initIndexData(params.date);
    var dates = [];
    for (var i = 0; i < 14; i++) {
        dates.unshift(params.date - 86400 * i);
    }
    jsonRes.data = data;
    // 基础条件
    var baseWhere = ' date>=' + params.date + ' AND date<=' + common.getDayEndTime(params.date) + ' AND venue_id=' + params.venues_id;

    async.parallel({
        //会员收入
        getCardIncome: function (asyncCallback) {
            var where = baseWhere + ' AND rec_type=3 ';
            ordersOld.getIncomeTotalAmount(where, function (err, result) {
                if (err) {
                    log.write('wxreport', 0, '获取会员收入合计出错', {err: err, where: where}, 'error');
                    asyncCallback("获取会员收入合计出错", 0);
                } else {
                    asyncCallback(null, result);
                }
            });
        },
        //场馆收入
        getCourtIncome: function (asyncCallback) {
            var where = baseWhere + ' AND rec_type=1 AND pay_catalog != 2 ';
            ordersOld.getIncomeTotalAmount(where, function (err, result) {
                if (err) {
                    log.write('wxreport', 0, '获取场地实际收入出错', {err: err, where: where}, 'error');
                    asyncCallback("获取场地实际收入出错", 0);
                } else {
                    asyncCallback(null, result);
                }
            });
        },
        //商品收入
        getGoodsIncome: function (asyncCallback) {
            var where = baseWhere + ' AND rec_type=2 AND pay_catalog != 2 ';
            ordersOld.getIncomeTotalAmount(where, function (err, result) {
                if (err) {
                    log.write('wxreport', 0, '获取商品实际收入出错', {err: err, where: where}, 'error');
                    asyncCallback("获取商品实际收入出错", 0);
                } else {
                    asyncCallback(null, result);
                }
            });
        },
        //场地各类收入
        getCourtTypeIncomes: function (asyncCallback) {
            getOldCourtIncome(params,function(err,result){
                if (err) {
                    log.write('wxreport', 0, '获取场地各类收入出错', {err: err, where: params}, 'error');
                    asyncCallback('获取场地各类收入出错', 0);
                } else {
                    asyncCallback(null, result);
                }
            });
        },
        //商品各类收入
        getGoodsTypeIncomes: function (asyncCallback) {
            getOldCardIncome(params,function(err,result){
                    if (err) {
                        log.write('wxreport', 0, '获取商品各类收入出错', {err: err, where: params}, 'error');
                        asyncCallback('获取商品各类收入出错', 0);
                    } else {
                        asyncCallback(null, result);
                    }
            });
        },
        getChart: function (asyncCallback) {
            params.dates = dates;
            IncomeReport.getTotalIncome(params, asyncCallback)
        }
    }, function (err, results) {
        //出错处理
        if (err) {
            log.write('getOldIndexData', 0, '获取报表首页失败', {err: err}, 'error');
            jsonRes.data = data;
            res.json(jsonRes);
            return;
        }
        //收入统计
        data.moneyGetData.vipCharge = results.getCardIncome || 0;
        data.moneyGetData.fieldIncome = results.getCourtIncome || 0;
        data.moneyGetData.goodsIncome = results.getGoodsIncome || 0;
        data.moneyGetData.totalIncome = data.moneyGetData.vipCharge + data.moneyGetData.fieldIncome + data.moneyGetData.goodsIncome;
        //分类收入
        data.venueBusinessData[0].field= results.getCourtTypeIncomes.fieldCash || 0;
        data.venueBusinessData[0].goods = results.getGoodsTypeIncomes.goodsCash || 0;
        data.venueBusinessData[7].field= results.getCourtTypeIncomes.fieldCard || 0;
        data.venueBusinessData[7].goods = results.getGoodsTypeIncomes.goodsCard || 0;
        data.venueBusinessData[9].field= results.getCourtTypeIncomes.fieldWeb || 0;
        for(var i=0;i<data.venueBusinessData.length-1;i++){
            data.venueBusinessData[10].field += data.venueBusinessData[i].field;
            data.venueBusinessData[10].goods += data.venueBusinessData[i].goods;
        }
        //表格数据
        data.businessCharData = results.getChart || data.businessCharData;

        jsonRes.data = data;
        //
        res.json(jsonRes);
    });

}

function getOldCourtIncome(params, callback) {
    // 基础条件
    var baseWhere = ' date>=' + params.date + ' AND date<=' + common.getDayEndTime(params.date) + ' AND venue_id=' + params.venues_id;
    async.parallel({
        // 场地收入-现金/银行卡
        'fieldCash': function (callback) {
            var where = baseWhere + ' AND rec_type=1 AND pay_catalog=1 ';

            ordersOld.getIncomeTotalAmount(where, function (err, result) {
                if (err) {
                    log.write('wxreport', 0, '获取场地收入-(现金/银行卡)出错', {err: err, where: where}, 'error');
                    callback("获取场地收入-(现金/银行卡)出错", 0);
                } else {
                    callback(null, result);
                }
            });
        },

        // 场地收入-会员储值卡
        'fieldCard': function (callback) {
            var where = baseWhere + ' AND rec_type=1 AND pay_catalog=2 ';

            ordersOld.getIncomeTotalAmount(where, function (err, result) {
                if (err) {
                    log.write('wxreport', 0, '获取场地收入-会员储值卡出错', {err: err, where: where}, 'error');
                    callback("获取场地收入-会员储值卡出错", 0);
                } else {
                    callback(null, result);
                }
            });
        },

        // 场地收入-趣运动消费
        'fieldWeb': function (callback) {
            var where = baseWhere + ' AND rec_type=1 AND pay_catalog=3 ';

            ordersOld.getIncomeTotalAmount(where, function (err, result) {
                if (err) {
                    log.write('wxreport', 0, '获取场地收入-趣运动消费出错', {err: err, where: where}, 'error');
                    callback("获取场地收入-趣运动消费出错", 0);
                } else {
                    callback(null, result);
                }
            });
        }
    }, function (err, result) {
        callback(err,result);
    });
}

//取各类收入
function getOldCardIncome(params, callback) {
    // 基础条件
    var baseWhere = ' date>=' + params.date + ' AND date<=' + common.getDayEndTime(params.date) + ' AND venue_id=' + params.venues_id;
    async.parallel({
        // 商品收入-(现金/银行卡)
        'goodsCash': function(callback){
            var where = baseWhere + ' AND rec_type=2 AND pay_catalog=1 ';

            ordersOld.getIncomeTotalAmount(where, function(err, result){
                if (err) {
                    log.write('wxreport', 0, '获取商品收入-(现金/银行卡)出错', {err: err, where: where}, 'error');
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
                    log.write('wxreport', 0, '获取商品收入-会员储值卡出错', {err: err, where: where}, 'error');
                    callback("获取商品收入-会员储值卡出错", 0);
                } else {
                    callback(null, result);
                }
            });
        }
    }, function (err, result) {
        callback(err,result);
    });
}

/**
 * 储值卡报表
 *
 * @xiaoyanchun
 */
wxreport.getstoredata = function (req, res, next) {
    var venuesId = getVenuesIdParam(req, res); // 商户中心的场馆id
    var date = getDateParam(req, res); // 日期

    if (venuesId <= 0 || date <= 0) { // 参数获取出错
        return;
    }

    var params = {};
    params.venues_id = venuesId;
    params.date = date;

    if (common.isOldDate(req, venuesId, date)) { // 是升级以前的日期(包含升级日期)

        // 基础条件
        var baseWhere = ' date>=' + date + ' AND date<=' + common.getDayEndTime(date) + ' AND venue_id=' + venuesId;

        // pay_catalog - 1现金/银行卡 2会员储值卡 3 趣运动消费
        // rec_type - 1 场地收入 2 商品收入 3 会员收入
        async.parallel({
                // 会员卡当天充值金额统计(包含赠送金额)
                todayRechargeTotal: function (callback) {
                    var where = baseWhere + ' AND rec_type=3 ';

                    ordersOld.getIncomeTotalAmount(where, function(err, result){
                        if (err) {
                            log.write('wxreport', 0, '获取会员卡-会员充值出错', {err: err, where: where}, 'error');
                            callback("获取会员卡-会员充值出错", 0);
                        } else {
                            var resData = {
                                amount : result,
                                gift_amount : 0
                            };
                            callback(null, resData);
                        }
                    });
                },

                // 会员卡当天场地费用统计(包含赠送金额)
                todayFieldDeductTotal: function (callback) {
                    var where = baseWhere + ' AND rec_type=1 AND pay_catalog=2 ';

                    ordersOld.getIncomeTotalAmount(where, function(err, result){
                        if (err) {
                            log.write('wxreport', 0, '获取场地收入-会员储值卡出错', {err: err, where: where}, 'error');
                            callback("获取场地收入-会员储值卡出错", 0);
                        } else {
                            var resData = {
                                amount: result,
                                gift_amount: 0
                            };
                            callback(null, resData);
                        }
                    });
                },

                // 会员卡当天商品费用统计(包含赠送金额)
                todayGoodsDeductTotal: function (callback) {
                    var where = baseWhere + ' AND rec_type=2 AND pay_catalog=2 ';

                    ordersOld.getIncomeTotalAmount(where, function(err, result){
                        if (err) {
                            log.write('wxreport', 0, '获取商品收入-会员储值卡出错', {err: err, where: where}, 'error');
                            callback("获取商品收入-会员储值卡出错", 0);
                        } else {
                            var resData = {
                                amount: result,
                                gift_amount: 0
                            };
                            callback(null, resData);
                        }
                    });
                },

                // 会员卡充值金额统计(包含赠送金额)
                rechargeTotal: function (callback) {
                    // 通过商户venues_id查询到趣运动的venues_id
                    venuesModel.getQydVenuesIdFromCache({venues_id: venuesId}, function (err, qydVenuesId) {
                        if (!err) {
                            var params = {};
                            params.venues_id = qydVenuesId; // 趣运动场馆id
                            memberCard.rechargeTotal(params, function (err, result) {
                                if (!err) {
                                    callback(null, result);
                                } else {
                                    callback(err, result);
                                }
                            });
                        } else { // 查询不到对应的趣运动venues_id, 不报错，返回初始值0
                            callback(err, {balance: 0, gift_balance: 0});
                        }
                    });
                }
            },
            function (err, result) {
                renderStoreDataJsonResult(res, err, result);
            });

    } else {
        async.parallel({
                // 会员卡当天充值金额统计(包含赠送金额)
                todayRechargeTotal: function (callback) {
                    memberCard.todayRechargeTotalFromCache(params, function (err, result) {
                        if (!err) {
                            callback(null, result);
                        } else {
                            callback(err, result);
                        }
                    });
                },

                // 会员卡当天场地费用统计(包含赠送金额)
                todayFieldDeductTotal: function (callback) {
                    memberCard.todayFieldDeductTotalFromCache(params, function (err, result) {
                        if (!err) {
                            callback(null, result);
                        } else {
                            callback(err, result);
                        }
                    });
                },

                // 会员卡当天商品费用统计(包含赠送金额)
                todayGoodsDeductTotal: function (callback) {
                    memberCard.todayGoodsDeductTotalFromCache(params, function (err, result) {
                        if (!err) {
                            callback(null, result);
                        } else {
                            callback(err, result);
                        }
                    });
                },

                // 会员卡充值金额统计(包含赠送金额)
                rechargeTotal: function (callback) {
                    // 通过商户venues_id查询到趣运动的venues_id
                    venuesModel.getQydVenuesIdFromCache({venues_id: venuesId}, function (err, qydVenuesId) {
                        if (!err) {
                            var params = {};
                            params.venues_id = qydVenuesId; // 趣运动场馆id
                            memberCard.rechargeTotal(params, function (err, result) {
                                if (!err) {
                                    callback(null, result);
                                } else {
                                    callback(err, result);
                                }
                            });
                        } else { // 查询不到对应的趣运动venues_id, 不报错，返回初始值0
                            callback(err, {balance: 0, gift_balance: 0});
                        }
                    });
                }
            },
            function (err, result) {
                renderStoreDataJsonResult(res, err, result);
            });

    }
};

/**
 * 开灯记录
 *
 * @xiaoyanchun
 */
wxreport.getcourtdata = function (req, res, next) {
    var venuesId = getVenuesIdParam(req, res); // 商户中心的场馆id
    var date = getDateParam(req, res); // 日期

    if (venuesId <= 0 || date <= 0) { // 参数获取出错
        return;
    }

    var params = {};
    params.venues_id = venuesId;
    params.date = date;

    lightReport.courtLightReportList(params, function (err, result) {
        var resArr = [];
        if (!err) {
            var length = result.length;
            for (var i = 0; i < length; i++) {
                var tmp = {};
                tmp.name = result[i].court_name;
                tmp.lightTime = result[i].light_time_total;
                tmp.courtTime = result[i].order_time_total;
                tmp.realGet = result[i].order_amount;
                resArr[i] = tmp;
            }
        } else {
            log.write('wxreport', 0, '获取开灯记录出错', {err: err}, 'error');
        }

        var jsonRes = common.getApiResInit();
        jsonRes.data = resArr;

        res.json(jsonRes);
    });
};

/**
 * 开灯记录报表-图形展示
 *
 * @author xiaoyanchun
 */
wxreport.lightReport = function (req, res, next) {
    var venuesId = getVenuesIdParam(req, res); // 商户中心的场馆id
    var date = getDateParam(req, res); // 日期

    if (venuesId <= 0 || date <= 0) { // 参数获取出错
        return;
    }

    var params = {};
    params.venues_id = venuesId;
    params.date = date;

    async.parallel({
            // 灯光报表记录
            lightReportView: function (callback) {
                lightReport.lightReportViewFromCache(params, function (err, result) {
                    var resArr = [];
                    /*
                     resArr 格式:
                     [
                     { "name": "一号场", "userTime": [{ "startTime": 360, "endTime": 540}], "lightTime": [{ "startTime": 480, "endTime": 590}] },
                     { "name": "二号场", "userTime": [{ "startTime": 280, "endTime": 540}], "lightTime": [{ "startTime": 480, "endTime": 590}] }
                     ]
                     */
                    if (!err) {
                        var length = result.length;
                        for (var i = 0; i < length; i++) {
                            var tmp = {};
                            tmp.name = result[i].court_name;
                            tmp.userTime = [];
                            tmp.lightTime = [];

                            if (result[i].order_time_list) { // 不为空
                                tmp.userTime = parseTimeList(result[i].order_time_list);
                            }
                            if (result[i].light_time_list) { // 不为空
                                tmp.lightTime = parseTimeList(result[i].light_time_list);
                            }
                            resArr[i] = tmp;
                        }
                    } else {
                        log.write('light_report', 0, '获取报表记录失败', {err: err}, 'error');
                    }

                    // 不返回错误，只记录log
                    callback(null, resArr);
                });
            },

            // 获取场馆营业时间
            getBusinessHours: function (callback) {
                venuesModel.getBusinessHoursFromCache(venuesId, function (err, result) {
                    if (err) {
                        callback(err, result);
                    } else {
                        if (result.start > 0 && result.end > 0) { // 营业时间存在
                            callback(null, result);
                        } else {
                            log.write('wxreport', 0, 'lightReport:没有获取到场馆的营业时间', {params: params}, 'warn');
                            callback(null, getDefaultBusinessHours()); // 获取默认的营业时间
                        }
                    }
                });
            }
        },
        function (err, result) {
            var jsonRes = common.getApiResInit();

            if (!err) {
                //先返回固定时间
                //jsonRes.data.business_hours = result.getBusinessHours;
                jsonRes.data.business_hours = {start: result.getBusinessHours.start, end: 1440};
                jsonRes.data.data_list = result.lightReportView;
            } else {
                log.write('wxreport', 0, '获取开灯记录-图形数据出错', {err: err}, 'error');
                jsonRes.data = {
                    business_hours: getDefaultBusinessHours(),
                    data_list: []
                };
            }

            res.json(jsonRes);
        });
};

/**
 * 开灯记录-按时长计算
 *
 * @author xiaoyanchun
 */
wxreport.lightDuration = function(req, res, next){
    var venuesId = getVenuesIdParam(req, res); // 商户中心的场馆id
    var date = getDateParam(req, res); // 日期

    if (venuesId <= 0 || date <= 0) { // 参数获取出错
        return;
    }

    var params = {};
    params.venues_id = venuesId;
    params.date = date;


    async.parallel({
        // 获取营业时间
        businessHours: function(callback){
            venuesModel.getBusinessHoursFromCache(venuesId, function (err, result) {
                if (err) {
                    callback(err, result);
                } else {
                    if (result.start > 0 && result.end > 0) { // 营业时间存在
                        callback(null, result);
                    } else {
                        log.write('wxreport', 0, 'lightDuration:没有获取到场馆的营业时间', {venuesId: venuesId}, 'warn');
                        callback(null, getDefaultBusinessHours()); // 获取默认的营业时间
                    }
                }
            });
        },

        // 获取开灯时长数据
        lightTimeList: function(callback) {

            lightReport.getLightTimeListFromCache(params, function(err, result){
                if (err) {
                    callback(err, result);
                } else {
                    callback(null, result);
                }
            });
        },

        // 获取场次时长数据
        orderTimeList: function(callback) {

            lightReport.getOrderTimeListFromCache(params, function(err, result){
                if (err) {
                    callback(err, result);
                } else {
                    callback(null, result);
                }
            });
        },

        // 获取场次时长统计和开灯时长统计
        timeCount: function(callback) {

            lightReport.getTimeCountFromCache(params, function(err, result){
                if (err) {
                    callback(err, result);
                } else {
                    callback(null, result);
                }
            });
        }

    }, function(err, result){

        var jsonRes = common.getApiResInit();

        if (err) {
            log.write('wxreport', 0, 'lightDuration:result', {err: err, venuesId: venuesId}, 'err');
            jsonRes.status = '0001';
            jsonRes.msg = '获取数据失败';
        } else {
            // result.businessHours; // 营业时间 格式: { start: 540, end: 1380 }
            var businessHoursArr = [];
            var list = [];

            for (var i = result.businessHours.start; i < result.businessHours.end; i += 60) {
                businessHoursArr.push({start: i, end: i + 60});
            }

            // 对数据进行排序
            common.sortTimeList(result.lightTimeList);
            common.sortTimeList(result.orderTimeList);

            async.map(businessHoursArr, function(item, callback){
                callback(null, {
                        time: parseFloat(common.date("H", common.todayStartTime() + item.start * 60)) + ':00',
                        lightTime: countTimeTotal(result.lightTimeList, item.start, item.end),
                        orderTime: countTimeTotal(result.orderTimeList, item.start, item.end),
                    });
            }, function(err, result){
                if (err) {
                    log.write('wxreport', 0, 'lightDuration:计算开灯和场地时长出错', {err: err, venuesId: venuesId, businessHoursArr: businessHoursArr}, 'err');
                } else {
                    list = result;
                }
            });

            jsonRes.data = {
                totalLightTime : result.timeCount.lightTotoal,
                totalOrderTime : result.timeCount.orderTotoal,
                businessEndTime : parseFloat(common.date("H", common.todayStartTime() + result.businessHours.end * 60)) + ':00',
                list: list
            };
        }

        res.json(jsonRes);
    });

};


/**
 * 按时间区间计算总时长
 *
 * @param timeList
 * @param start
 * @param end
 * @returns {number}
 * @author xiaoyanchun
 */
function countTimeTotal(timeList, start, end) {
    var len = timeList.length;
    var total = 0; // 总开灯时间

    for (var i = 0; i < len; i++) {
        var row = timeList[i];
        var rowLen = row.length;

        // 计算一个场地的开灯时间
        for (var j = 0; j < rowLen; j++) {
            var tmp = row[j];

            if (tmp.length != 2) {
                continue;
            }

            if (tmp[0] >= end) {
                // 开灯的时间 大于或等于 区间结束时间
                // 因为时间是排行顺序的， 下一个的开灯时间肯定会大于 区间结束时间
                // 不可能会在有交叉， 所以跳出循环
                break;
            }

            if (tmp[1] <= start) {
                // 区间开始时间 大于或等于 关灯时间
                // 证明当前组的开灯和关灯时间和区间时间没有交叉, 继续查找下一组
                continue;
            }

            if (tmp[0] <= start) { // 开灯时间小于传入的时间
                // 开始时间以 start 为准

                if (tmp[1] >= end) {
                    total = total + (end - start);
                    break; // 结束时间到点了
                } else if (tmp[1] < end) {
                    total = total + (tmp[1] - start);
                    continue; // 继续查找下一个
                }
            } else if (tmp[0] > start) { // 开灯时间大于传入的时间
                // 开始时间以 tmp[0] 为准

                if (tmp[1] >= end) {
                    total = total + (end - tmp[0]);
                    break; // 结束时间到点了
                } else if (tmp[1] < end) {
                    total = total + (tmp[1] - tmp[0]); // 继续查找下一个
                    continue; // 继续查找下一个
                }
            }
        }
    }

    return total;
}


/**
 * 商品报表
 *
 * @param req
 * @param res
 * @param next
 */
wxreport.salesReport = function (req, res, next) {
    var venuesId = getVenuesIdParam(req, res); // 商户中心的场馆id
    var date = getDateParam(req, res); // 日期

    if (venuesId <= 0 || date <= 0) { // 参数获取出错
        return;
    }

    var params = {};
    params.venues_id = venuesId;
    params.date = date;

    salesReport.reportListFromCache(params, function (err, result) {
        var resArr = [];
        /*
         格式:
         [
         { "type": "饮料", "name": "可乐", "sales": 120,"store" : 140},
         { "type": "体育用品", "name": "YY羽毛球", "sales": 126,"store" : 140},
         ]
         */

        if (!err) {
            var length = result.length;
            for (var i = 0; i < length; i++) {
                var tmp = {};
                tmp.type = result[i].catalog_name;
                tmp.name = result[i].goods_name;
                tmp.sales = result[i].sales_volume;
                tmp.store = result[i].stock_count;
                resArr[i] = tmp;
            }
        } else {
            log.write('wxreport', 0, '获取商品报表数据出错', {err: err}, 'error');
        }

        var jsonRes = common.getApiResInit();
        jsonRes.data = resArr;
        res.json(jsonRes);
    });
};

/**
 * 获取默认的营业时间
 *
 * @returns {{start: number, end: number}}
 * @author xiaoyanchun
 */
function getDefaultBusinessHours() {
    // 默认8点到23点
    return {start: 480, end: 1320};
}

/**
 * 获取venue_id参数
 *
 * 获取失败会在res中输出json数据
 *
 * @param req
 * @param res
 * @returns {number}
 * @author xiaoyanchun
 */
function getVenuesIdParam(req, res) {
    var venuesId = 0;
    var jsonRes = common.getApiResInit();

    if (typeof req.query.venueId == 'undefined') {
        jsonRes.status = '0001';
        jsonRes.msg = '缺少venueId参数';
        res.json(jsonRes);
        return venuesId;
    }

    var venuesIdParam = parseInt(req.query.venueId);

    if (isNaN(venuesIdParam) || venuesIdParam < 0) { // 转换成整数失败
        jsonRes.status = '0001';
        jsonRes.msg = '参数venueId错误';
        res.json(jsonRes);
        return venuesId;
    }

    venuesId = venuesIdParam;
    if (!common.inBindVenueList(req, venuesId)) { // 不在绑定的场馆内
        jsonRes.status = '0001';
        jsonRes.msg = '参数venueId错误';
        res.json(jsonRes);
        return venuesId;
    }

    return venuesId;
}

/**
 * 获取time参数
 *
 * 获取失败会在res中输出json数据
 *
 * @param req
 * @param res
 * @returns {number}
 * @author xiaoyanchun
 */
function getDateParam(req, res) {
    var date = 0;
    var jsonRes = common.getApiResInit();

    if (typeof req.query.time == 'undefined') {
        jsonRes.status = '0001';
        jsonRes.msg = '缺少time参数';
        res.json(jsonRes);
        return date;
    }

    var dateParam = moment(req.query.time).unix();
    dateParam = isNaN(dateParam) || dateParam < 0 ? parseInt(req.query.time) : dateParam;

    if (isNaN(dateParam) || dateParam < 0) { // 转换成整数失败
        jsonRes.status = '0001';
        jsonRes.msg = '参数time错误';
        res.json(jsonRes);
        return date;
    }

    date = common.toStartDayTime(dateParam);
    return date;
}

// 解析返回数据格式
function parseTimeList(timeList) {
    var res = [];
    var lightTime = [];

    try {
        lightTime = JSON.parse(timeList); // 解析json字符串
    } catch (e) {
        log.write('light_report', 0, '解析timeList字符串出错', {err: e, timeList: timeList}, 'error');
        return res;
    }

    var lightTimeLen = lightTime.length; // 获取数组长度

    if (lightTimeLen > 0) {
        for (var i = 0; i < lightTimeLen; i++) {
            var lightTimeTmp = {};
            lightTimeTmp.startTime = lightTime[i][0];
            lightTimeTmp.endTime = lightTime[i][1];
            res.push(lightTimeTmp);
        }
    }

    return res;
}

// 返回json结果
function renderStoreDataJsonResult(res, err, result) {
    var resData = common.getApiResInit();

    if (!err) {

        resData.data = {
            column2data: {
                "total": result.rechargeTotal.balance,
                "give": result.rechargeTotal.gift_balance
            },
            table24data: {
                balancePay: {
                    "field": result.todayFieldDeductTotal.amount,
                    "goods": result.todayGoodsDeductTotal.amount,
                    "total": result.todayFieldDeductTotal.amount + result.todayGoodsDeductTotal.amount
                },
                presentBalancePay: {
                    "field": result.todayFieldDeductTotal.gift_amount,
                    "goods": result.todayGoodsDeductTotal.gift_amount,
                    "total": result.todayFieldDeductTotal.gift_amount + result.todayGoodsDeductTotal.gift_amount
                }
            },
            infodata: {
                "vipCharge": result.todayRechargeTotal.amount,
                "presentBalanceCharge": result.todayRechargeTotal.gift_amount,
                "vipPay": result.todayFieldDeductTotal.amount + result.todayGoodsDeductTotal.amount,
                "presentBalancePay": result.todayFieldDeductTotal.gift_amount + result.todayGoodsDeductTotal.gift_amount
            }
        };
    } else {
        log.write('wxreport', 0, '获取储值卡报表出错', {err: err}, 'error');

        // 出错全部返回初始值0
        resData.data =
        {
            column2data: {
                "total": "0.00",
                "give": "0.00"
            },
            table24data: {
                balancePay: {
                    "field": "0.00",
                    "goods": "0.00",
                    "total": "0.00"
                },
                presentBalancePay: {
                    "field": "0.00",
                    "goods": "0.00",
                    "total": "0.00"
                }
            },
            infodata: {
                "vipCharge": "0.00",
                "presentBalanceCharge": "0.00",
                "vipPay": "0.00",
                "presentBalancePay": "0.00"
            }
        };
    }

    res.json(resData);
}

module.exports = wxreport;