var db = require('../models/db');
var async = require('async');
var log = require('../util/log');
var courtApi = require('../api/court');

var wxmember = {};

/**
 * 查询是否存在
 *
 *
 */
wxmember.getBindExist = function (openid, mobile, callback) {

    if (!openid && !mobile) {
        callback(null, null);
        return;
    }

    var where_obj = new Object;
    if (openid && openid != '') {
        where_obj.open_id = openid;
    }
    if (mobile && mobile != '') {
        where_obj.mobile = mobile;
    }
    var conn = db.getAdapter('member');
    conn.where(where_obj).get('mb_wxmember', function (err, results, fields) {
        conn.disconnect();//释放
        var data = null;

        if (results && results.length > 0) {
            data = results[0];
        }
        callback(err, data);
    });
};

/**
 * 取绑微信会员
 * @type {[type]}
 */
wxmember.wxUnBinding = function (open_id) {
    var now = new Date().getTime() / 1000;
    var conn = db.getAdapter('member');
    conn.where({
        open_id: open_id
    }).update('mb_wxmember', {status: 0, bind_date: now, valid_date: 0}, function (err, info) {
        conn.disconnect();//释放
        //插入LOG
        log.write('wxmember.wxUnBinding', 0, 'mb_wxmember更新', {err: err, info: results}
        );
    });
};

/**
 * 微信绑定会员卡
 */
wxmember.wxBinding = function (wxdata, callback) {

    if (typeof(wxdata.open_id) == "undefined" || wxdata.open_id == '') {
        return callback('openid不能为空', null);
    }
    if (typeof(wxdata.mobile) == "undefined" || wxdata.mobile == '') {
        return callback('手机号码不能为空', null);
    }


    var now = new Date().getTime() / 1000;
    var where_in = {
        open_id: wxdata.open_id,
        //mobile: 1,
    };
    var conn = db.getAdapter('member');
    conn.where(where_in).get('mb_wxmember', function (err, results) {
        if (!err && results.length > 0) {
            //if(results[0]['status'] == 0){ }
            //插入
            var data = {};
            data.mobile = wxdata.mobile;
            data.status = 1;
            data.bind_date = now;
            data.valid_date = now + 365 * 24 * 60 * 60;
            conn.where({
                id: results[0]['id']
            }).update('mb_wxmember', data, function (err, info) {
                conn.disconnect();//释放
                if (err) {
                    //插入LOG
                    log.write('wxmember.wxBinding', 0, 'mb_wxmember更新', {err: err, info: results});
                }
                return callback(err, data);
            });
        }
        else {
            //插入
            var data = {};
            data.open_id = wxdata.open_id;
            data.mobile = wxdata.mobile;
            data.status = 1;
            data.bind_date = now;
            data.valid_date = now + 365 * 24 * 60 * 60;

            data.nickname = typeof(wxdata.nickname) != "undefined" ? wxdata.nickname : '';
            data.sex = typeof(wxdata.sex) != "undefined" ? wxdata.sex : '';
            data.province = typeof(wxdata.province) != "undefined" ? wxdata.province : '';
            data.city = typeof(wxdata.city) != "undefined" ? wxdata.city : '';
            data.headimgurl = typeof(wxdata.headimgurl) != "undefined" ? wxdata.headimgurl : '';
            data.country = typeof(wxdata.country) != "undefined" ? wxdata.country : '';

            conn.insert('mb_wxmember', data, function (err, info) {
                conn.disconnect();//释放
                if (err) {
                    //插入LOG
                    log.write('wxmember.wxBinding', 0, 'mb_wxmember添加', {err: err, info: info});
                }
                return callback(err, data);
            });
        }
    });
};


/**
 * 插入商家和场馆
 * @type {{}}
 */
wxmember.createSoms = function (app_id, callback) {
    //公用数据
    var apiData = null;
    var now = (new Date()).getTime() / 1000;
    async.waterfall([
        function (asyncCallback) {
            //请求场地信息
            courtApi.apiRequest({
                action: 'GetCourtInfoList',
                app_id: app_id
            }, function (err, results) {
                console.log(results);
                if (!err && results.status == '0000') {
                    apiData = results['data'];
                    asyncCallback(err, apiData);//
                } else {
                    //请求接口出错,跳出
                    asyncCallback(2, null);
                }
            });
        },
        function (data, asyncCallback) {
            //能否查到
            var conn = db.getAdapter('business');
            conn.where({qyd_court_code: apiData.venues_id})
                .get('st_venues', function (err, results, fields) {
                    conn.disconnect();//释放
                    if (!err && results.length > 0) {
                        //跳出并传递venue_id和supplier_id
                        asyncCallback(1, {venue_id: results[0]['id'], supplier_id: results[0]['supplier_id']});
                    } else {
                        //查不到进入下轮
                        asyncCallback(err, null);
                    }
                });
        },
        function (data, asyncCallback) {
            //入库
            var conn = db.getAdapter('business');
            conn.insert('st_suppliers', {
                org_address: apiData.address,
                city: apiData.city_name,
                mobile: apiData.telephone,
                simple_name: apiData.name,
                start_date: now,
                is_active: 1,
                source_type: 1,
                source_id: apiData.venues_id
            }, function (err, info) {
                conn.disconnect();//释放
                //插入spuserLOG
                log.write('business.createSoms', 0, 'st_suppliers入库', {err: err, info: info});
                asyncCallback(err, info);
            });
        },
        function (info, asyncCallback) {
            //入库
            var supplier_id = info.insertId;
            var conn = db.getAdapter('business');
            conn.insert('st_venues', {
                name: apiData.name,
                tel: apiData.telephone,
                address: apiData.address,
                city: apiData.city_name,
                supplier_id: supplier_id,
                qyd_court_code: apiData.venues_id,
                active_date: now,
                register_date: now,
                status: 1
            }, function (err, info) {
                conn.disconnect();//释放
                //插入LOG
                log.write('business.createSoms', 0, 'st_venues入库', {err: err, info: info});
                var send = null;
                if (!err && typeof info === 'object') {
                    send = {
                        supplier_id: supplier_id,
                        venue_id: info.insertId
                    }
                    //入库soms和categories
                }
                asyncCallback(err, send);
            });
        }
    ], function (err, result) {
        //调用回调
        callback(err, result);
        if (typeof result === 'object' && result !== null) {
            var conn = db.getAdapter('business');
            conn.where({supplier_id: result.supplier_id, venue_id: result.venue_id})
                .get('bs_smos', function (err, results) {
                    if (!err && results.length == 0) {
                        conn.insert('bs_smos', {
                            app_id: apiData.app_id,
                            app_key: apiData.app_key,
                            supplier_id: result.supplier_id,
                            venue_id: result.venue_id,
                            status: 1,
                            create_time: now,
                            qyd_venue_id: apiData.venues_id,
                            telephone: apiData.telephone
                        }, function (err, info) {
                            conn.disconnect();//释放
                            //插入LOG
                            log.write('business.createSoms', 0, 'bs_soms入库', {err: err, info: info});
                        });
                        //
                        if (apiData.categories && apiData.categories.length > 0) {
                            var catData = [];
                            for (var i = 0; i < apiData.categories.length; i++) {
                                catData.push({
                                    supplier_id: result.supplier_id,
                                    venue_id: result.venue_id,
                                    cat_id: apiData.categories[i]['cat_id'],
                                    characteristic: apiData.categories[i].cat_name,
                                    create_time: now,
                                    is_delete: 0,
                                    is_order: 1
                                });
                            }
                            conn.insert('st_categorys', catData, function (err, info) {
                                conn.disconnect();//释放
                                //插入LOG
                                log.write('business.createSoms', 0, 'st_categorys入库', {err: err, info: info});
                            });
                        }

                    }
                });
        }
    });
};


//导出
module.exports = wxmember;