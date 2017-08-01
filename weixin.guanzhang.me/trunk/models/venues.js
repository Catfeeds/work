var db = require('../models/db');
var async = require('async');
var log = require('../util/log');
var redis = require('../util/redis');

var venues = {};


/**
 * 通过商户场馆id获取趣运动场馆id
 *
 * @params {venues_id: 3, date: 1460131200}
 * @params callback(err, res)
 * @author xiaoyanchun
 */
venues.getQydVenuesId = function (params, callback) {
    var conn = db.getAdapter('business');
    conn.select('qyd_venue_id')
        .where('venue_id=' + params.venues_id)
        .get('bs_smos', function (err, result) {
            conn.disconnect();//释放
            var qydVenueId = 0;

            if (!err && result.length > 0) {
                if (result[0].qyd_venue_id != null) {
                    qydVenueId = result[0].qyd_venue_id;
                }
            } else { // 查询出错
                log.write('venues', 0, '通过商户场馆id获取趣运动场馆id', {err: err, params: params}, 'error');
            }

            callback(err, qydVenueId);
        });
};

/**
 * 通过商户场馆id获取趣运动场馆id (优先读取缓存)
 *
 * @params {venues_id: 3, date: 1460131200}
 * @params callback(err, res)
 * @author xiaoyanchun
 */
venues.getQydVenuesIdFromCache = function (params, callback) {

    if (params.venues_id == undefined || params.venues_id < 1) {
        log.write('venues_model', 0, 'getQydVenuesIdFromCache:缺少参数', {params: params}, 'error');
        callback("getQydVenuesIdFromCache:缺少参数");
        return;
    }

    var cacheKey = 'venues:getQydVenuesId:' + params.venues_id;

    redis.getValue(cacheKey, function (err, reply) {

        if (!err && reply) { // 有缓存，直接读取缓存
            callback(null, reply);
        } else {
            if (err) { // 获取redis缓存出错, 只记录错误
                log.write('venues_model', 0, 'getQydVenuesIdFromCache:获取redis缓存失败', {err: err, params: params}, 'error');
            }
            venues.getQydVenuesId(params, function(err, result){
                if (err) {
                    log.write('venues_model', 0, 'getQydVenuesIdFromCache:获取趣运动场馆id失败', {err: err, params: params}, 'error');
                    callback(err, result);
                } else {
                    redis.setValue(cacheKey, result, 7200); //存入缓存
                    callback(null, result);
                }
            });
        }
    });

};


/**
 * 通过app_id或venue_id取场地详情
 * 返回场馆信息和app_id
 * @type {{}}
 */
venues.getVenueInfo = function (param, callback) {
    param = typeof param === 'object' ? param : {};
    async.waterfall([
            function (asyncCallback) {
                if (!param.venue_id || !param.app_id) {
                    //通过app_id取venue_id
                    var where = {};
                    if (param.venue_id) where.venue_id = param.venue_id;
                    if (param.app_id) where.app_id = param.app_id;

                    var conn = db.getAdapter('business');
                    conn.where(where)
                        .get('bs_smos', function (err, result) {
                            conn.disconnect();//释放
                            if (!err && result.length > 0) {
                                param.venue_id = result[0].venue_id || 0;
                                param.app_id = result[0].app_id || 0;
                            }
                            asyncCallback(err, param);
                        });
                    return;
                }
                asyncCallback(null, param)
            },
            function (param, asyncCallback) {
                //取场馆信息
                var conn = db.getAdapter('business');
                conn.where({id: param.venue_id})
                    .get('st_venues', function (err, result) {
                        conn.disconnect();//释放
                        var data = {};
                        if (!err && result.length > 0) {
                            data = result[0];
                            data.app_id = param.app_id;
                            data.venue_id = param.venue_id;
                        }
                        asyncCallback(err, data);
                    });
            }
        ],
        function (err, result) {
            //返回数据
            if (err) {
                log.write('venues', 0, '取场馆详情', {err: err, param: param}, 'error');
            }
            callback(err, result);
        }
    );
};


/**
 * 获取场馆的营业时间
 *
 * @param venueId
 * @param asyncCallback
 * @return {start: 0, end: 0}; 单位: 分钟
 * @author xiaoyanchun
 */
venues.getBusinessHours = function (venueId, asyncCallback) {
    var resData = {start: 0, end: 0};

    if (typeof venueId == 'undefined' || venueId < 1) {
        log.write('venues_model', 0, 'getBusinessHours:缺少参数', {venueId: venueId}, 'error');
        asyncCallback('getBusinessHours:缺少参数', resData);
        return;
    }

    async.waterfall([

        // 通过venueId 获取趣运动 venueId
        function (callback) {
            venues.getQydVenuesIdFromCache({venues_id: venueId}, function (err, result) {
                if (err) {
                    callback(err, result);
                } else {
                    callback(null, result);
                }
            });
        },

        // 获取营业时间
        function (qydVenuesId, callback) {
            var conn = db.getAdapter('qyd_7yundong');
            // 获取场馆营业时间 (默认为羽毛球分类)
            conn.select('cat_id, start_hour, end_hour').where({
                venues_id: qydVenuesId
            }).get('gs_venues_category', function (err, result) {
                conn.disconnect();//释放
                if (result && result.length > 0) {
                    for(var i=0;i<result.length;i++){
                        resData.start = result[i].start_hour * 60;
                        resData.end = result[i].end_hour * 60;
                        //优先使用羽毛球的开始结束时间
                        if(result[i].cat_id == 1){
                            break;
                        }
                    }
                    // 不返回错误，只记录log
                    callback(null, resData);
                } else {
                    log.write('venues_model', 0, '获取场馆的营业时间失败', {err: err, qydVenuesId: qydVenuesId}, 'error');
                    // 不返回错误，只记录log
                    callback('获取场馆的营业时间失败, qydVenuesId: ' + qydVenuesId, resData);
                }
            });

        }
    ], function (err, result) {
        if (err) {
            log.write('venues_model', 0, 'getBusinessTime:result', {err: err, venueId: venueId}, 'error');
            asyncCallback(err, resData);
        } else {
            asyncCallback(null, result);
        }
    });
};

/**
 * 获取场馆的营业时间 (优先读取缓存)
 *
 * @param venueId
 * @param asyncCallback
 * @return {start: 0, end: 0}; 单位: 分钟
 * @author xiaoyanchun
 */
venues.getBusinessHoursFromCache = function(venueId, callback) {

    if (typeof venueId == 'undefined' || venueId < 1) {
        log.write('venues_model', 0, 'getBusinessHoursFromCache:缺少参数', {venueId: venueId}, 'error');
        callback('getBusinessHoursFromCache:缺少参数');
        return;
    }

    var cacheKey = 'venues:getBusinessHours:' + venueId;

    redis.getValue(cacheKey, function (err, reply) {

        if (!err && reply) { // 有缓存，直接读取缓存
            callback(null, reply);
        } else {
            if (err) { // 获取redis缓存出错, 只记录错误
                log.write('venues_model', 0, 'getBusinessHoursFromCache:获取redis缓存失败', {err: err, venueId: venueId}, 'error');
            }

            venues.getBusinessHours(venueId, function(err, result){
                if (err) {
                    log.write('venues_model', 0, 'getBusinessHoursFromCache:获取场馆的营业时间失败', {err: err, venueId: venueId}, 'error');
                    callback(err, result);
                } else {
                    redis.setValue(cacheKey, result, 7200); //存入缓存
                    callback(null, result);
                }
            });
        }
    });

};


//导出
module.exports = venues;