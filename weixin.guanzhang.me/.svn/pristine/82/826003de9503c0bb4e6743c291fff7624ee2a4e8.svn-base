var async = require('async');
var db = require('../models/db');
var log = require('../util/log');
var common = require('../util/common');
var redis = require('../util/redis');
var $weixin = require('../api/weixin');


var wxuser = {};


/**
 * 通过馆掌app_id获取soms信息
 *
 * @param params
 * @param callback
 * @author xiaoyanchun
 */
wxuser.getSomsInfo = function (params, callback) {

    if (params.app_id == undefined || params.app_id.length == 0) {
        log.write('wxuser', 0, 'getSomsInfo:缺少参数', {params: params}, 'error');
        callback("getSomsInfo:缺少参数");
        return;
    }

    var conn = db.getAdapter('business');

    conn.select('*')
        .where("app_id = '" + params.app_id + "'")
        .limit(1)
        .get('bs_smos', function (err, result) {
            conn.disconnect();//释放

            if (err) { // 查询出错
                log.write('wxuser', 0, '通过馆掌app_id获取soms信息失败', {err: err}, 'error');
                callback(err, result);
            } else {
                callback(null, result);
            }
        });
};

/**
 * 通过馆掌app_id获取soms信息 (优先读取缓存)
 *
 * @param params
 * @param callback
 * @author xiaoyanchun
 */
wxuser.getSomsInfoFromCache = function (params, callback) {

    if (params.app_id == undefined || params.app_id.length == 0) {
        log.write('wxuser', 0, 'getSomsInfoFromCache:缺少参数', {params: params}, 'error');
        callback("getSomsInfoFromCache:缺少参数");
        return;
    }

    var cacheKey = 'wxuser:getSomsInfo:' + params.app_id;

    redis.getValue(cacheKey, function (err, reply) {

        if (!err && reply) { // 有缓存，直接读取缓存
            callback(null, reply);
        } else {
            if (err) { // 获取redis缓存出错, 只记录错误
                log.write('wxuser', 0, 'getSomsInfoFromCache:获取redis缓存失败', {err: err, params: params}, 'error');
            }
            wxuser.getSomsInfo(params, function (err, result) {
                if (err) {
                    log.write('wxuser', 0, 'getSomsInfoFromCache:通过馆掌app_id获取soms信息失败', {
                        err: err,
                        params: params
                    }, 'error');
                    callback(err, result);
                } else {
                    if (result.length > 0) {
                        redis.setValue(cacheKey, result, 3600); //存入缓存
                    }
                    callback(null, result);
                }
            });
        }
    });

};


/**
 * 通过venue_id获取绑定的微信用户列表
 *
 * @param venueId
 * @param callback
 * @author xiaoyanchun
 */
wxuser.getBindUserList = function (venueId, callback) {

    if (typeof venueId == 'undefined' || venueId < 1) {
        log.write('wxuser', 0, 'getBindUserList:缺少参数', {venueId: venueId}, 'error');
        callback('getBindUserList:缺少参数');
        return;
    }

    var conn = db.getAdapter('business');

    var sql = "SELECT i.venue_id, i.wx_open_id, i.spuser_id, i.status, i.bind_date, i.valid_date, i.mobile, u.nickname "
        + " FROM bs_wxuser_index AS i "
        + " LEFT JOIN bs_wxuser AS u ON i.wx_open_id=u.open_id "
        + " WHERE i.venue_id = " + venueId + " ORDER BY  i.bind_date ASC ";

    conn.query(sql, function (err, result) {
        conn.disconnect(); //释放

        if (err) { // 查询出错
            log.write('wxuser', 0, 'getBindUserList:通过venue_id获取绑定的微信用户列表失败', {err: err, venueId: venueId}, 'error');
            callback(err, result);
        } else {
            callback(null, result);
        }
    });
};

/**
 * 通过venue_id获取绑定的微信用户列表 (优化获取缓存)
 *
 * @param venueId
 * @param callback
 * @author xiaoyanchun
 */
wxuser.getBindUserListFromCache = function (venueId, callback) {

    if (typeof venueId == 'undefined' || venueId < 1) {
        log.write('wxuser', 0, 'getBindUserListFromCache:缺少参数', {venueId: venueId}, 'error');
        callback('getBindUserListFromCache:缺少参数');
        return;
    }

    var cacheKey = 'wxuser:getBindUserList:' + venueId;

    redis.getValue(cacheKey, function (err, reply) {

        if (!err && reply) { // 有缓存，直接读取缓存
            callback(null, reply);
        } else {
            if (err) { // 获取redis缓存出错, 只记录错误
                log.write('wxuser', 0, 'getSomsInfoFromCache:获取redis缓存失败', {err: err, venueId: venueId}, 'error');
            }
            wxuser.getBindUserList(venueId, function (err, result) {
                if (err) {
                    log.write('wxuser', 0, 'getSomsInfoFromCache:通过venue_id获取绑定的微信用户列表失败', {
                        err: err,
                        venueId: venueId
                    }, 'error');
                    callback(err, result);
                } else {
                    if (result.length > 0) {
                        redis.setValue(cacheKey, result, 1800); //存入缓存
                    }
                    callback(null, result);
                }
            });
        }
    });
};

//从微信返回信息，保存一份
wxuser.insertWxUser = function (open_id, access_token, callback) {
    async.waterfall([
        //本地是否已保存
        function (callback) {
            var conn = db.getAdapter('business');
            conn.where({open_id: open_id})
                .get('bs_wxuser', function (err, results) {
                    conn.disconnect();//释放
                    if (!err && results.length > 0) {//本地存有，直接跳出
                        err = 1;
                    }
                    callback(err, null);
                });
        },
        //通过openId取用户信息
        function (data, callback) {
            $weixin.getWxUserInfo(access_token, open_id, callback);
        },
        function(wxUserInfo,callback){
            //存一份到本地
            var insertData = {
                open_id: wxUserInfo.openid,
                nickname: wxUserInfo.nickname,
                sex: wxUserInfo.sex,
                headimgurl: wxUserInfo.headimgurl,
                country: wxUserInfo.country,
                province: wxUserInfo.province,
                city: wxUserInfo.city
            };
            var conn = db.getAdapter('business');
            conn.insert('bs_wxuser', insertData, function (err, info) {
                conn.disconnect();
                callback(err,info);
            });
        }
    ], function (err, result) {
        if(err === 1){
            err = null;
        }
        callback(err,result);
    });

};

module.exports = wxuser;

