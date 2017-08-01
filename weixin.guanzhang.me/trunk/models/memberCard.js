var db = require('../models/db');
var async = require('async');
var log = require('../util/log');
var redis = require('../util/redis');
var common = require('../util/common');

var memberCard = {};


/**
 * 会员卡某一天的充值金额统计(包含赠送金额)
 *
 * @params {venues_id: 3, date: 1460131200}
 * @params callback(err, res)
 * @author xiaoyanchun
 */
memberCard.todayRechargeTotal = function (params, callback) {

    if (params.venues_id == undefined || params.date == undefined) {
        log.write('member_card', 0, 'todayRechargeTotal:缺少参数', {params: params}, 'error');
        callback("todayRechargeTotal:缺少参数");
        return;
    }

    var conn = db.getAdapter('report');
    conn.select('SUM(amount) AS amount, SUM(gift_amount) AS gift_amount')
        .where('income_type=3 AND venue_id=' + params.venues_id + ' AND date=' + params.date)
        .get('income_report', function (err, results) {
            conn.disconnect();//释放
            var res = {};
            res.amount = 0; // 余额
            res.gift_amount = 0; // 赠送余额

            if (!err && results.length > 0) {
                if (results[0].amount != null) {
                    res.amount = results[0].amount;
                }
                if (results[0].gift_amount != null) {
                    res.gift_amount = results[0].gift_amount;
                }
            } else { // 查询出错
                log.write('member_card', 0, '会员卡当天充值金额统计', {err: err}, 'error');
            }

            callback(err, res);
        });
};

/**
 * 会员卡某一天的充值金额统计(包含赠送金额) (优先读取缓存, 当天的数据不缓存)
 *
 * @params {venues_id: 3, date: 1460131200}
 * @params callback(err, res)
 * @author xiaoyanchun
 */
memberCard.todayRechargeTotalFromCache = function(params, callback){

    if (params.venues_id == undefined || params.date == undefined) {
        log.write('member_card', 0, 'todayRechargeTotalFromCache:缺少参数', {params: params}, 'error');
        callback("todayRechargeTotalFromCache:缺少参数");
        return;
    }

    var cacheKey = 'memberCard:todayRechargeTotal:' + params.venues_id + '_' + params.date;

    redis.getValue(cacheKey, function (err, reply) {

        if (!err && reply) { // 有缓存，直接读取缓存
            callback(null, reply);
        } else {
            if (err) { // 获取redis缓存出错, 只记录错误
                log.write('member_card', 0, 'todayRechargeTotalFromCache:获取redis缓存失败', {err: err, params: params}, 'error');
            }

            memberCard.todayRechargeTotal(params, function(err, result){
                if (err) {
                    log.write('member_card', 0, 'todayRechargeTotalFromCache:获取某一天充值金额统计(包含赠送金额)失败', {err: err, params: params}, 'error');
                    callback(err, result);
                } else {

                    if (params.date < common.todayStartTime()) { // 小于今天的数据才缓存(当天的数据不缓存)
                        redis.setValue(cacheKey, result, 600); //存入缓存
                    }

                    callback(null, result);
                }
            });
        }
    });

};



/**
 * 会员卡某一天场地费用统计(包含赠送金额)
 *
 * @params {venues_id: 3, date: 1460131200}
 * @params callback(err, res)
 * @author xiaoyanchun
 */
memberCard.todayFieldDeductTotal = function (params, callback) {

    if (params.venues_id == undefined || params.date == undefined) {
        log.write('member_card', 0, 'todayFieldDeductTotal:缺少参数', {params: params}, 'error');
        callback("todayFieldDeductTotal:缺少参数");
        return;
    }

    var conn = db.getAdapter('report');
    conn.select('SUM(amount-gift_amount) AS amount, SUM(gift_amount) AS gift_amount')
        .where('income_type=1 AND pay_type=1 AND venue_id=' + params.venues_id + ' AND date=' + params.date)
        .get('income_report', function (err, results) {
            conn.disconnect();//释放
            var res = {};
            res.amount = 0; // 余额
            res.gift_amount = 0; // 赠送余额

            if (!err && results.length > 0) {
                if (results[0].amount != null) {
                    res.amount = results[0].amount;
                }
                if (results[0].gift_amount != null) {
                    res.gift_amount = results[0].gift_amount;
                }
            } else { // 查询出错
                log.write('member_card', 0, '会员卡当天场地费用统计', {err: err}, 'error');
            }

            callback(err, res);
        });
};

/**
 * 会员卡某一天场地费用统计(包含赠送金额) (优先读取缓存, 当天的数据不缓存)
 *
 * @params {venues_id: 3, date: 1460131200}
 * @params callback(err, res)
 * @author xiaoyanchun
 */
memberCard.todayFieldDeductTotalFromCache = function(params, callback){

    if (params.venues_id == undefined || params.date == undefined) {
        log.write('member_card', 0, 'todayFieldDeductTotalFromCache:缺少参数', {params: params}, 'error');
        callback("todayFieldDeductTotalFromCache:缺少参数");
        return;
    }

    var cacheKey = 'memberCard:todayFieldDeductTotal:' + params.venues_id + '_' + params.date;

    redis.getValue(cacheKey, function (err, reply) {

        if (!err && reply) { // 有缓存，直接读取缓存
            callback(null, reply);
        } else {
            if (err) { // 获取redis缓存出错, 只记录错误
                log.write('member_card', 0, 'todayFieldDeductTotalFromCache:获取redis缓存失败', {err: err, params: params}, 'error');
            }

            memberCard.todayFieldDeductTotal(params, function(err, result){
                if (err) {
                    log.write('member_card', 0, 'todayFieldDeductTotalFromCache:获取某一天场地费用统计(包含赠送金额)失败', {err: err, params: params}, 'error');
                    callback(err, result);
                } else {

                    if (params.date < common.todayStartTime()) { // 小于今天的数据才缓存(当天的数据不缓存)
                        redis.setValue(cacheKey, result, 600); //存入缓存
                    }

                    callback(null, result);
                }
            });
        }
    });
};


/**
 * 会员卡某一天商品费用统计(包含赠送金额)
 *
 * @params {venues_id: 3, date: 1460131200}
 * @params callback(err, res)
 * @author xiaoyanchun
 */
memberCard.todayGoodsDeductTotal = function (params, callback) {
    var conn = db.getAdapter('report');
    conn.select('SUM(amount-gift_amount) AS amount, SUM(gift_amount) AS gift_amount')
        .where('income_type=2 AND pay_type=1 AND venue_id=' + params.venues_id + ' AND date=' + params.date)
        .get('income_report', function (err, results) {
            conn.disconnect();//释放
            var res = {};
            res.amount = 0; // 余额
            res.gift_amount = 0; // 赠送余额

            if (!err && results.length > 0) {
                if (results[0].amount != null) {
                    res.amount = results[0].amount;
                }
                if (results[0].gift_amount != null) {
                    res.gift_amount = results[0].gift_amount;
                }
            } else { // 查询出错
                log.write('member_card', 0, '会员卡当天商品费用统计', {err: err}, 'error');
            }

            callback(err, res);
        });
};

/**
 * 会员卡某一天商品费用统计(包含赠送金额) (优先读取缓存, 当天的数据不缓存)
 *
 * @params {venues_id: 3, date: 1460131200}
 * @params callback(err, res)
 * @author xiaoyanchun
 */
memberCard.todayGoodsDeductTotalFromCache = function(params, callback){

    if (params.venues_id == undefined || params.date == undefined) {
        log.write('member_card', 0, 'todayGoodsDeductTotalFromCache:缺少参数', {params: params}, 'error');
        callback("todayGoodsDeductTotalFromCache:缺少参数");
        return;
    }

    var cacheKey = 'memberCard:todayGoodsDeductTotal:' + params.venues_id + '_' + params.date;

    redis.getValue(cacheKey, function (err, reply) {

        if (!err && reply) { // 有缓存，直接读取缓存
            callback(null, reply);
        } else {
            if (err) { // 获取redis缓存出错, 只记录错误
                log.write('member_card', 0, 'todayGoodsDeductTotalFromCache:获取redis缓存失败', {err: err, params: params}, 'error');
            }

            memberCard.todayGoodsDeductTotal(params, function(err, result){
                if (err) {
                    log.write('member_card', 0, 'todayGoodsDeductTotalFromCache:获取某一天商品费用统计(包含赠送金额)失败', {err: err, params: params}, 'error');
                    callback(err, result);
                } else {

                    if (params.date < common.todayStartTime()) { // 小于今天的数据才缓存(当天的数据不缓存)
                        redis.setValue(cacheKey, result, 600); //存入缓存
                    }

                    callback(null, result);
                }
            });
        }
    });
};



/**
 * 会员卡充值金额统计(包含赠送金额)
 *
 * @params {venues_id: 3}
 * @params callback(err, res)
 * @author xiaoyanchun
 */
memberCard.rechargeTotal = function (params, callback) {
    var conn = db.getAdapter('qyd_business');
    conn.select('SUM(balance) AS balance, SUM(gift_balance) AS gift_balance')
        .where('venues_id=' + params.venues_id)
        .get('gs_user_card', function (err, results) {
            conn.disconnect();//释放
            var res = {};
            res.balance = 0; // 余额
            res.gift_balance = 0; // 赠送余额

            if (!err && results.length > 0) {
                if (results[0].balance != null) {
                    res.balance = results[0].balance;
                }
                if (results[0].gift_balance != null) {
                    res.gift_balance = results[0].gift_balance;
                }
            } else { // 查询出错
                log.write('member_card', 0, '会员卡充值金额统计', {err: err}, 'error');
            }

            callback(err, res);
        });
};



//导出
module.exports = memberCard;