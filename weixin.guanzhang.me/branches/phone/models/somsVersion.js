var db = require('../models/db');
var async = require('async');
var log = require('../util/log');
var common = require('../util/common');

var somsVersion = {};
var message_table_name = 'di_message2';

/**
 * 获取昨天上传过消息的场馆列表
 *
 * @param params
 * @param callback
 * @author xiaoyanchun
 */
somsVersion.getYesterdayAllVenue = function (params, callback) {

    if (params.startTime == undefined || params.endTime == undefined) {
        log.write('soms_version', 0, '获取昨天上传过消息的场馆列表:缺少参数', {params: params}, 'error');
        callback('获取昨天上传过消息的场馆列表:缺少参数', []);
        return;
    }

    var where = 'client_time >=' + params.startTime + ' AND client_time<=' + params.endTime;

    var conn = db.getAdapter('di');
    conn.select('app_id').where(where).group_by('app_id ASC').get(message_table_name, function (err, result) {
        if (err) {
            log.write('soms_version', 0, '获取昨天上传过消息的场馆列表:查询出错', {
                err: err,
                params: params,
                where: where,
                sql: conn._last_query()
            }, 'error');
            callback(err, []);
        } else {
            callback(null, result);
        }
        conn.disconnect();//释放
    });
};

/**
 * 获取场馆最后一条消息
 *
 * @param appId
 * @param callback
 * @author xiaoyanchun
 */
somsVersion.getLastMessage = function (params, callback) {

    if (params.startTime == undefined
        || params.endTime == undefined
        || params.app_id == undefined
    ) {
        log.write('soms_version', 0, '获取场馆最后一条消息:缺少参数', {params: params}, 'error');
        callback('获取场馆最后一条消息:缺少参数', []);
        return;
    }

    var where = 'client_time >=' + params.startTime + ' AND client_time<=' + params.endTime + " AND app_id='" + params.app_id + "'";

    var conn = db.getAdapter('di');
    conn.select('message').where(where).order_by('id DESC').limit(1).get(message_table_name, function (err, result) {
        if (err) {
            log.write('soms_version', 0, '获取场馆最后一条消息:查询出错', {
                err: err,
                params: params,
                where: where,
                sql: conn._last_query()
            }, 'error');
            callback(err, []);
        } else {
            callback(null, result);
        }
        conn.disconnect();//释放
    });

};


/**
 * 更新soms版本号
 *
 * @param params
 * @param asyncCallback
 * @author xiaoyanchun
 */
somsVersion.updateSomsVersion = function (params, asyncCallback) {

    if (params.app_id == undefined || params.soms_version == undefined || params.is_new == undefined || params.date == undefined) {
        log.write('soms_version', 0, '更新soms版本号:缺少参数', {params: params}, 'error');
        asyncCallback('更新soms版本号:缺少参数', null);
        return;
    }

    async.waterfall([

        // 通过app_id 获取 venue_id
        function (callback) {
            var conn = db.getAdapter('business');
            conn.where("app_id='" + params.app_id + "'").limit(1).get('bs_smos', function (err, result) {
                if (err) {
                    log.write('soms_version', 0, '更新soms版本号:获取venue_id查询出错', {
                        err: err,
                        params: params,
                        sql: conn._last_query()
                    }, 'error');
                    callback(err, 0);
                } else {
                    if (result.length > 0) {
                        callback(null, result[0].venue_id);
                    } else {
                        callback(null, 0);
                    }
                }
                conn.disconnect();//释放
            });
        },

        // 更新场馆soms版本号,没有记录则插入，有记录则更新
        function (venueId, callback) {
            if (venueId > 0) {
                var conn = db.getAdapter('report');
                conn.select("id, is_new").where('venue_id=' + venueId).limit(1).get('soms_version', function (err, result) {
                    conn.disconnect();//释放

                    if (err) { // 出错了
                        log.write('soms_version', 0, '更新soms版本号:获取venue_id查询出错', {
                            err: err,
                            params: params,
                            sql: conn._last_query()
                        }, 'error');
                        callback(err, result);
                    } else {
                        // 插入或更新的数据
                        var data = {
                            venue_id: venueId,
                            soms_version: params.soms_version,
                            is_new: params.is_new,
                            last_update_time: common.timestamp()
                        };

                        if (result.length > 0) { // 记录存在，进行更新

                            if (result[0].is_new == 0 && data.is_new) { // 数据库是旧版本， 当前是新版本， 填充升级日期
                                data.upgrade_date = params.date;
                            }

                            var conn2 = db.getAdapter('report');
                            conn2.where({id: result[0].id}).update('soms_version', data, function (err, info) {
                                conn2.disconnect();//释放
                                callback(err, info);
                            });
                        } else { // 记录不存在，进行插入
                            data.add_time = common.timestamp();

                            if (data.is_new) { // 是新版本，填充更新日期
                                data.upgrade_date = params.date;
                            }

                            var conn2 = db.getAdapter('report');
                            conn2.insert('soms_version', data, function (err, info) {
                                conn2.disconnect();//释放
                                callback(err, info);
                            });
                        }
                    }
                });
            } else {
                log.write('soms_version', 0, '更新soms版本号:没有查询到venue_id', {params: params}, 'warn');
                callback(null, []);
            }
        }

    ], function (err, result) {

        if (err) {
            log.write('soms_version', 0, '更新soms版本号:出错了', {err: err}, 'error');
            asyncCallback(err, result);
        } else {
            asyncCallback(null, null);
        }

    });
};


//导出
module.exports = somsVersion;