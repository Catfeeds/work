var async = require('async');
var db = require('../models/db');
var log = require('../util/log');
var moment = require('moment');

var orders = {};

/**
 * 获取场馆某一段时间的收入统计
 *
 * params=
 * {
 *  startTime: 1459440000,
 *  endTime: 1459526399,
 *  venueId: 941
 * }
 *
 * @param params
 * @param callback
 * @author xiaoyanchun
 */
orders.getIncomeCount = function (params, callback) {

    if (params.startTime == undefined
        || params.endTime == undefined
        || params.venueId == undefined
    ) {
        log.write('orders_old', 0, '获取场馆某一段时间的收入统计:缺少参数', {params: params}, 'error');
        callback('获取场馆某一段时间的收入统计:缺少参数', {});
        return;
    }

    var where = 'date>=' + params.startTime + ' AND date<=' + params.endTime + '  AND venue_id=' + params.venueId;

    var conn = db.getAdapter('order');
    conn.select(' SUM(amount) AS total_amount, max(date) AS last_time ').where(where).get('sm_income_report', function (err, result) {
        conn.disconnect();//释放
        var resData = {};
        resData.totalAmount = 0; // 总计
        resData.lastTime = 0; // 最后时间

        if (err) {
            log.write('orders_old', 0, '获取场馆某一段时间的收入统计', {err: err, params: params, where: where}, 'error');
            callback(err, resData);
        } else {
            if (result.length > 0) {
                if (result[0].total_amount > 0) {
                    resData.totalAmount = result[0].total_amount;
                }
                if (result[0].last_time > 0) {
                    resData.lastTime = result[0].last_time;
                }
            }
            callback(null, resData);
        }
    });

};


/**
 * 获取场馆某一段时间的收入统计(排除会员卡充值)
 *
 * params=
 * {
 *  startTime: 1459440000,
 *  endTime: 1459526399,
 *  venueId: 941
 * }
 *
 * @param params
 * @param callback
 * @author xiaoyanchun
 */
orders.getIncomeCountExcludeMember = function (params, callback) {

    if (params.startTime == undefined
        || params.endTime == undefined
        || params.venueId == undefined
    ) {
        log.write('orders_old', 0, '获取场馆某一段时间的收入统计:缺少参数', {params: params}, 'error');
        callback('获取场馆某一段时间的收入统计:缺少参数', {});
        return;
    }

    var where = ' rec_type !=3 AND date>=' + params.startTime + ' AND date<=' + params.endTime + '  AND venue_id=' + params.venueId;

    var conn = db.getAdapter('order');
    conn.select(' SUM(amount) AS total_amount, max(date) AS last_time ').where(where).get('sm_income_report', function (err, result) {
        conn.disconnect();//释放
        var resData = {};
        resData.totalAmount = 0; // 总计
        resData.lastTime = 0; // 最后时间

        if (err) {
            log.write('orders_old', 0, '获取场馆某一段时间的收入统计', {err: err, params: params, where: where}, 'error');
            callback(err, resData);
        } else {
            if (result.length > 0) {
                if (result[0].total_amount > 0) {
                    resData.totalAmount = result[0].total_amount;
                }
                if (result[0].last_time > 0) {
                    resData.lastTime = result[0].last_time;
                }
            }
            callback(null, resData);
        }
    });

};


/**
 * 获取场馆某一段时间的收入金额统计
 *
 * @param where
 * @param callback
 * @author xiaoyanchun
 */
orders.getIncomeTotalAmount = function (where, callback) {
    var resData = 0;

    if (!where) {
        log.write('orders_old', 0, '获取收入金额统计', {err: '缺少参数', where: where}, 'error');
        callback('getIncomeTotalAmount:缺少参数', resData);
        return;
    }

    var conn = db.getAdapter('order');
    conn.select(' SUM(amount) AS total_amount ').where(where).get('sm_income_report', function (err, result) {
        conn.disconnect();//释放
        if (err) {
            log.write('orders_old', 0, '获取收入金额统计', {err: err, where: where}, 'error');
            callback(err, resData);
        } else {
            if (result.length > 0 && result[0].total_amount > 0) {
                resData = result[0].total_amount;
            }
            callback(null, resData);
        }
    });

};


/**
 * 获取场馆某一段时间的统计
 *
 * params=
 * {
 *  startTime: 1459440000,
 *  endTime: 1459526399,
 *  venueId: 941,
 *  bill_type: 1
 * }
 *
 * @param params
 * @param callback
 * @author xiaoyanchun
 */
orders.getOrderCount = function (params, callback) {

    if (params.startTime == undefined
        || params.endTime == undefined
        || params.venueId == undefined
    ) {
        log.write('orders_old', 0, '获取场馆某一段时间的统计:缺少参数', {params: params}, 'error');
        callback('获取场馆某一段时间的统计:缺少参数', {});
        return;
    }

    var where = 'date>=' + params.startTime + ' AND date<=' + params.endTime + '  AND venue_id=' + params.venueId;

    if (params.hasOwnProperty('bill_type') && params.bill_type) { // 有bill_type条件
        where += ' AND bill_type=' + params.bill_type;
    }

    if (params.hasOwnProperty('add_where') && params.add_where) { // 有额外条件
        where += params.add_where;
    }

    var conn = db.getAdapter('order');
    conn.select(" SUM(qty) AS num ").where(where).get('sm_order_report', function (err, result) {
        conn.disconnect();//释放
        var resNum = 0;

        if (err) {
            log.write('orders_old', 0, '获取场馆某一段时间的统计', {err: err, params: params, where: where}, 'error');
            callback(err, resNum);
        } else {
            if (result.length > 0 && result[0].num > 0) {
                resNum = result[0].num;
            }
            callback(null, resNum);
        }
    });
};


/**
 * 获取场馆某一段时间的订单金额统计
 *
 * @param where
 * @param callback
 * @author xiaoyanchun
 */
orders.getOrderTotalAmount = function (where, callback) {
    var resData = {};
    resData.totalAmount = 0;
    resData.totalQty = 0;

    if (!where) {
        log.write('orders_old', 0, '获取订单金额统计', {err: '缺少参数', where: where}, 'error');
        callback('getOrderTotalAmount:缺少参数', resData);
        return;
    }

    var conn = db.getAdapter('order');
    conn.select(' SUM(amount) AS total_amount, SUM(qty) AS total_qty ').where(where).get('sm_order_report', function (err, result) {
        conn.disconnect();//释放
        if (err) {
            log.write('orders_old', 0, '获取订单金额统计', {err: err, where: where}, 'error');
            callback(err, resData);
        } else {
            if (result.length > 0) {
                if (result[0].total_amount > 0) {
                    resData.totalAmount = result[0].total_amount;
                }
                if (result[0].total_qty > 0) {
                    resData.totalQty = result[0].total_qty;
                }
            }
            callback(null, resData);
        }
    });

};


/**
 * 获取场馆某一段时间最后一条记录的时间
 *
 * @param params
 * @param callback
 * @author xiaoyanchun
 */
orders.getIncomReportLastTime = function (params, callback) {

    if (params.startTime == undefined
        || params.endTime == undefined
        || params.venueId == undefined
    ) {
        log.write('orders_old', 0, '获取场馆某一段时间最后一条记录的时间:缺少参数', {params: params}, 'error');
        callback('获取场馆某一段时间最后一条记录的时间:缺少参数', {});
        return;
    }

    var where = 'date>=' + params.startTime + ' AND date<=' + params.endTime + '  AND venue_id=' + params.venueId;

    var conn = db.getAdapter('order');
    conn.select(' date ').where(where).get('sm_income_report', function (err, result) {
        conn.disconnect();//释放
        var lastTime = 0;

        if (err) {
            log.write('orders_old', 0, '获取场馆某一段时间最后一条记录的时间', {err: err, params: params, where: where}, 'error');
            callback(err, lastTime);
        } else {
            if (result.length > 0 && result[0].date > 0) {
                lastTime = result[0].date;
            }
            callback(null, lastTime);
        }
    });

};


module.exports = orders;