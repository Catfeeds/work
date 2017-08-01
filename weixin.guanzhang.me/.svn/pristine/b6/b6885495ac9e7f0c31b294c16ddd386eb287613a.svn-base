var db = require('../models/db');
var async = require('async');
var log = require('../util/log');
var courtApi = require('../api/court');
var $weixinApi = require('../api/weixin');

var business = {};

business.getSpuser = function (name, callback) {
    var conn = db.getAdapter('business');
    conn.where({
        username: name
    }).get('bs_spuser', function (err, results, fields) {
        conn.disconnect();//释放
        var data = null;
        if (results && results.length > 0) {
            data = results[0];
        }
        callback(err, data);
    });
};

/**
 * 插入商家和场馆
 * @type {{}}
 */
business.createSoms = function (app_id, callback) {
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
                //console.log(results);
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
                .get('st_venues', function (err, results) {
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
                    };
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
                    conn.disconnect();//释放
                    if (!err && results.length == 0) {
                        var conn2 = db.getAdapter('business');
                        conn2.insert('bs_smos', {
                            app_id: apiData.app_id,
                            app_key: apiData.app_key,
                            supplier_id: result.supplier_id,
                            venue_id: result.venue_id,
                            status: 1,
                            create_time: now,
                            qyd_venue_id: apiData.venues_id,
                            telephone: apiData.telephone
                        }, function (err, info) {
                            conn2.disconnect();//释放
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
                            var conn3 = db.getAdapter('business');
                            conn3.insert('st_categorys', catData, function (err, info) {
                                conn3.disconnect();//释放
                                //插入LOG
                                log.write('business.createSoms', 0, 'st_categorys入库', {err: err, info: info});
                            });
                        }

                    }
                });
        }
    });
};
/**
 * 绑定场馆管理员
 * @type {{}}
 */
business.spuerWxBinding = function (spuerInfo) {
    var now = new Date().getTime() / 1000;
    var data = {
        venue_id: spuerInfo.venue_id,
        wx_open_id: spuerInfo.open_id,
        spuser_id: spuerInfo.spuser_id
    };
    var conn = db.getAdapter('business');
    conn.where(data).get('bs_wxuser_index', function (err, results) {
        conn.disconnect();//释放
        if (!err && results.length > 0) {
            if (results[0]['status'] == 0) {
                data.mobile = spuerInfo.mobile;
                data.status = 1;
                data.bind_date = now;
                data.valid_date = now + 365 * 24 * 60 * 60;

                var conn2 = db.getAdapter('business');
                conn2.where({
                    id: results[0]['id']
                }).update('bs_wxuser_index', data, function (err, info) {
                    conn2.disconnect();//释放
                    //插入LOG
                    log.write('business.spuserWxBinding', 0, 'bs_wxuser_index更新', {
                        err: err,
                        info: results
                    }, 'info');
                });
            }
        } else {
            //插入
            data.mobile = spuerInfo.mobile;
            data.status = 1;
            data.bind_date = now;
            data.valid_date = now + 365 * 24 * 60 * 60;
            var conn2 = db.getAdapter('business');
            conn2.insert('bs_wxuser_index', data, function (err, info) {
                conn2.disconnect();//释放
                //插入LOG
                log.write('business.spuserWxBinding', 0, 'bs_wxuser_index更新', {err: err, info: info}, 'info');
            });
        }
    });
};
/**
 * 通过场馆id取允许登录的号码
 * @param venueId
 * @param callback
 */
business.getAllowedMobile = function (venueId, callback) {
    async.waterfall([
        //取出app_id
        function (asyncCallback) {
            var conn = db.getAdapter('business');
            conn.where({venue_id: venueId})
                .get('bs_smos', function (err, results) {
                    conn.disconnect();//释放
                    var data = null;
                    if (results && results.length > 0) {
                        data = results[0];
                    }
                    asyncCallback(err || !data, data);
                });
        },
        //取supplier_id
        function (data, asyncCallback) {
            var conn = db.getAdapter('qyd_business');
            conn.where({app_id: data.app_id})
                .get('gs_business', function (err, results) {
                    conn.disconnect();//释放
                    var data = null;
                    if (results && results.length > 0) {
                        data = results[0];
                    }
                    asyncCallback(err || !data, data);
                });
        },
        //取mobile
        function (data, asyncCallback) {
            var conn = db.getAdapter('qyd_7yundong');
            conn.where({suppliers_id: data.suppliers_id})
                .get('gs_suppliers', function (err, results) {
                    conn.disconnect();//释放
                    var data = null;
                    if (results && results.length > 0) {
                        data = results[0];
                    }
                    asyncCallback(err, data);
                });
        }
    ], function (err, result) {

        callback(err, result);
    })
};
/**
 * 由app_id取场馆列表
 * @type {{}}
 */
business.getVenueListByAppIds = function(appIds,callback){
    if(appIds.length == 0){
        callback('参数不能为空',[]);
        return;
    }
    var conn = db.getAdapter('business');
    conn.select("st_venues.id AS venue_id,st_venues.name,app_id")
        .join("st_venues","bs_smos.venue_id=st_venues.id","LEFT")
        .where("app_id IN('" + appIds.join("','")+ "')")
        .get("bs_smos", function (err, venueList) {
            conn.disconnect();//释放

            if(err){
                log.write('business.getVenueListByAppIds ', 0, '由app_id取场馆列表出错', {err: err, appIds: appIds}, 'error');
                callback(err,[]);
                return;
            }
            callback(err,venueList);
    });
};

/**
 * 取绑定场馆id和open_id
 * @type {{}}
 */
business.getBindingList = function(callback){
    //取出所有
    var conn = db.getAdapter('business');
    conn.select("venue_id,wx_open_id AS open_id")
        .where({status:1})
        .order_by("wx_open_id ASC")
        .get('bs_wxuser_index', function (err, results) {
            conn.disconnect();//释放
            var list = [];
            if (!err && results.length > 0) {
                list = results;
            }
            for(var i=0;i<list.length;i++){
                list[i]['wechat_id'] = $weixinApi.getNewWechatId(false);
            }
            callback(err, list);
        });
};

//导出
module.exports = business;