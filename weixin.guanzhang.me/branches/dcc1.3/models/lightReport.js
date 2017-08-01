var db = require('../models/db');
var async = require('async');
var log = require('../util/log');
var redis = require('../util/redis');
var common = require('../util/common');

var lightReport = {};


/**
 * 开灯报表-数据列表
 *
 * @params {venues_id: 3, date: 1460131200}
 * @params callback(err, res)
 * @author xiaoyanchun
 */
lightReport.courtLightReportList = function (params, callback) {
    var conn = db.getAdapter('report');

    conn.select('court_name, light_time_total, order_time_total, order_amount, (light_time_total - order_time_total) AS time_diff ')
        .where('venue_id=' + params.venues_id + ' AND date=' + params.date)
        .order_by('time_diff DESC ')
        .get('court_light_report', function (err, result) {
            conn.disconnect();//释放
            var res = [];

            if (!err) {
                res = result;
            } else { // 查询出错
                log.write('light_report', 0, '开灯报表-数据列表', {err: err}, 'error');
            }

            callback(err, res);
        });

};


/**
 * 开灯记录报表-图形展示
 *
 * @params {venues_id: 3, date: 1460131200}
 * @params callback(err, res)
 * @author xiaoyanchun
 */
lightReport.lightReportView = function (params, callback) {
    var conn = db.getAdapter('report');

    conn.select('court_name, light_time_list, order_time_list, date')
        .where('venue_id=' + params.venues_id + ' AND date=' + params.date)
        .order_by('qyd_court_id ASC ')
        .get('court_light_report', function (err, result) {
            conn.disconnect();//释放
            var res = [];

            if (!err) {
                res = result;
            } else { // 查询出错
                log.write('light_report', 0, '开灯记录报表-图形展示', {err: err}, 'error');
            }

            callback(err, res);
        });
};

/**
 * 开灯记录报表-图形展示 (优先读取缓存, 当天的数据不缓存)
 *
 * @params {venues_id: 3, date: 1460131200}
 * @params callback(err, res)
 * @author xiaoyanchun
 */
lightReport.lightReportViewFromCache = function(params, callback){

    if (params.venues_id == undefined || params.date == undefined) {
        log.write('light_report', 0, 'lightReportViewFromCache:缺少参数', {params: params}, 'error');
        callback("lightReportViewFromCache:缺少参数");
        return;
    }

    var cacheKey = 'lightReport:lightReportView:' + params.venues_id + '_' + params.date;

    redis.getValue(cacheKey, function (err, reply) {

        if (!err && reply) { // 有缓存，直接读取缓存
            callback(null, reply);
        } else {
            if (err) { // 获取redis缓存出错, 只记录错误
                log.write('light_report', 0, 'lightReportViewFromCache:获取redis缓存失败', {err: err, params: params}, 'error');
            }

            lightReport.lightReportView(params, function(err, result){
                if (err) {
                    log.write('light_report', 0, 'lightReportViewFromCache:获取开灯记录报表失败', {err: err, params: params}, 'error');
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
 * 获取场馆某一天的开灯时长记录
 *
 * @param params
 * @param callback
 * @return []
 * @author xiaoyanchun
 */
lightReport.getLightTimeList = function(params, callback){

    if (params.venues_id == undefined || params.date == undefined) {
        log.write('light_report', 0, 'getLightTimeList:缺少参数', {params: params}, 'error');
        callback("getLightTimeList:缺少参数");
        return;
    }

    var conn = db.getAdapter('report');

    conn.select('light_time_list')
        .where("light_time_list != '' AND venue_id=" + params.venues_id + ' AND date=' + params.date)
        .get('court_light_report', function (err, result) {
            conn.disconnect();//释放
            var res = [];

            if (!err) {
                var len = result.length;
                if (len > 0) { // 有结果
                    for (var i = 0; i < len; i++) {
                        var light_time_list = result[i].light_time_list;

                        if (light_time_list) { // 数据存不为空，进行解析json字符串
                            try {
                                var lightTimeList = JSON.parse(light_time_list);
                            } catch (e) {
                                log.write('light_report', 0, 'getLightTimeList:解析json出错', {light_time_list: light_time_list, params: params} );
                                continue;
                            }
                            res.push(lightTimeList);
                        }
                    }
                }
            } else { // 查询出错
                log.write('light_report', 0, 'getLightTimeList:result', {err: err, params: params}, 'error');
            }

            callback(err, res);
        });

};

/**
 * 获取场馆某一天的开灯时长记录 (优先读取缓存, 当天的数据不缓存)
 *
 * @param params
 * @param callback
 * @return []
 * @author xiaoyanchun
 */
lightReport.getLightTimeListFromCache = function(params, callback){

    if (params.venues_id == undefined || params.date == undefined) {
        log.write('light_report', 0, 'getLightTimeListFromCache:缺少参数', {params: params}, 'error');
        callback("getLightTimeListFromCache:缺少参数");
        return;
    }

    var cacheKey = 'lightReport:getLightTimeList:' + params.venues_id + '_' + params.date;

    redis.getValue(cacheKey, function (err, reply) {

        if (!err && reply) { // 有缓存，直接读取缓存
            callback(null, reply);
        } else {
            if (err) { // 获取redis缓存出错, 只记录错误
                log.write('light_report', 0, 'getLightTimeListFromCache:获取redis缓存失败', {err: err, params: params}, 'error');
            }

            lightReport.getLightTimeList(params, function(err, result){
                if (err) {
                    log.write('light_report', 0, 'getLightTimeListFromCache:获取时间统计失败', {err: err, params: params}, 'error');
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
 * 获取场馆某一天的场次时长记录
 *
 * @param params
 * @param callback
 * @return []
 * @author xiaoyanchun
 */
lightReport.getOrderTimeList = function(params, callback){

    if (params.venues_id == undefined || params.date == undefined) {
        log.write('light_report', 0, 'getOrderTimeList:缺少参数', {params: params}, 'error');
        callback("getOrderTimeList:缺少参数");
        return;
    }

    var conn = db.getAdapter('report');

    conn.select('order_time_list')
        .where("order_time_list != '' AND venue_id=" + params.venues_id + ' AND date=' + params.date)
        .get('court_light_report', function (err, result) {
            conn.disconnect();//释放
            var res = [];

            if (!err) {
                var len = result.length;
                if (len > 0) { // 有结果
                    for (var i = 0; i < len; i++) {
                        var order_time_list = result[i].order_time_list;

                        if (order_time_list) { // 数据存不为空，进行解析json字符串
                            try {
                                var orderTimeList = JSON.parse(order_time_list);
                            } catch (e) {
                                log.write('light_report', 0, 'getOrderTimeList:解析json出错', {order_time_list: order_time_list, params: params} );
                                continue;
                            }
                            res.push(orderTimeList);
                        }
                    }
                }
            } else { // 查询出错
                log.write('light_report', 0, 'getOrderTimeList:result', {err: err, params: params}, 'error');
            }

            callback(err, res);
        });

};

/**
 * 获取场馆某一天的场次时长记录(优先读取缓存, 当天的数据不缓存)
 *
 * @param params
 * @param callback
 * @return []
 * @author xiaoyanchun
 */
lightReport.getOrderTimeListFromCache = function(params, callback){

    if (params.venues_id == undefined || params.date == undefined) {
        log.write('light_report', 0, 'getOrderTimeListFromCache:缺少参数', {params: params}, 'error');
        callback("getOrderTimeListFromCache:缺少参数");
        return;
    }

    var cacheKey = 'lightReport:getOrderTimeList:' + params.venues_id + '_' + params.date;

    redis.getValue(cacheKey, function (err, reply) {

        if (!err && reply) { // 有缓存，直接读取缓存
            callback(null, reply);
        } else {
            if (err) { // 获取redis缓存出错, 只记录错误
                log.write('light_report', 0, 'getOrderTimeListFromCache:获取redis缓存失败', {err: err, params: params}, 'error');
            }

            lightReport.getOrderTimeList(params, function(err, result){
                if (err) {
                    log.write('light_report', 0, 'getOrderTimeListFromCache:获取时间统计失败', {err: err, params: params}, 'error');
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
 * 获取场馆某一天的场次时长记录
 *
 * @param params
 * @param callback
 * @return []
 * @author xiaoyanchun
 */
lightReport.getTimeCount = function(params, callback){

    if (params.venues_id == undefined || params.date == undefined) {
        log.write('light_report', 0, 'getTimeCount:缺少参数', {params: params}, 'error');
        callback("getTimeCount:缺少参数");
        return;
    }

    var conn = db.getAdapter('report');

    conn.select('SUM(light_time_total) AS lightTotoal, SUM(order_time_total) AS orderTotoal')
        .where(" venue_id=" + params.venues_id + ' AND date=' + params.date)
        .get('court_light_report', function (err, result) {
            conn.disconnect();//释放
            var res = {lightTotoal: 0, orderTotoal: 0};

            if (!err) {
                if (result.length > 0) { // 有结果
                    if (result[0].lightTotoal > 0) {
                        res.lightTotoal = result[0].lightTotoal;
                    }
                    if (result[0].orderTotoal > 0) {
                        res.orderTotoal = result[0].orderTotoal;
                    }
                }
            } else { // 查询出错
                log.write('light_report', 0, 'getTimeCount:result', {err: err, params: params}, 'error');
            }

            callback(err, res);
        });
};

/**
 * 获取场馆某一天的场次时长记录(优先读取缓存, 当天的数据不缓存)
 *
 * @param params
 * @param callback
 * @return []
 * @author xiaoyanchun
 */
lightReport.getTimeCountFromCache = function(params, callback){

    if (params.venues_id == undefined || params.date == undefined) {
        log.write('light_report', 0, 'getTimeCountFromCache:缺少参数', {params: params}, 'error');
        callback("getTimeCountFromCache:缺少参数");
        return;
    }

    var cacheKey = 'lightReport:getTimeCount:' + params.venues_id + '_' + params.date;

    redis.getValue(cacheKey, function (err, reply) {

        if (!err && reply) { // 有缓存，直接读取缓存
            callback(null, reply);
        } else {
            if (err) { // 获取redis缓存出错, 只记录错误
                log.write('light_report', 0, 'getTimeCountFromCache:获取redis缓存失败', {err: err, params: params}, 'error');
            }

            lightReport.getTimeCount(params, function(err, result){
                if (err) {
                    log.write('light_report', 0, 'getTimeCountFromCache:获取时间统计失败', {err: err, params: params}, 'error');
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

//导出
module.exports = lightReport;