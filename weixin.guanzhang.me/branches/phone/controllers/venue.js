/*
 venueController
 */
var business = require('../models/business');
var db = require('../models/db');
var async = require('async');
var $log = require('../util/log');
var $weixinPhone = require('../models/weixinPhone');
var $qydBusiness = require('../models/qydBusiness');
var $common = require('../util/common');
var venue = {};

/**
 * 场馆列表页
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
venue.ucenter = function (req, res, next) {
    //从session取openid
    var openId = req.session.openId ? req.session.openId : '';
    async.waterfall([
        function (asyncCallback) {
            //openid取绑定场馆id列表
            var conn = db.getAdapter('business');
            conn.where({
                wx_open_id: openId,
                status: 1
            }).get('bs_wxuser_index', function (err, results) {
                conn.disconnect();//释放
                if (!err && results.length == 0) {
                    err = true;//没有数据
                }
                asyncCallback(err, results);//
            });
        },
        function (list, asyncCallback) {
            //场馆id取数据
            var venue_ids = [];
            for (var i = 0; i < list.length; i++) {
                venue_ids.push(list[i].venue_id);
            }
            var conn = db.getAdapter('business');
            conn.where('id', venue_ids)
                .get('st_venues', function (err, results) {
                    conn.disconnect();//释放
                    asyncCallback(err, results);
                });
        },

        // 检测场馆的馆掌soms是否是新版本
        function (list, callback) {
            var listLen = list.length;
            var venue_ids = [];

            for (var i = 0; i < listLen; i++) {
                list[i].soms_is_new = 0; // 默认设置旧版本
                list[i].upgrade_date = 0; // 版本升级日期
                venue_ids.push(list[i].id);
            }

            if (venue_ids.length > 0) {
                var conn = db.getAdapter('report');
                conn.select('venue_id, is_new, upgrade_date').where('venue_id', venue_ids)
                    .get('soms_version', function (err, result) {
                        conn.disconnect();//释放
                        if (err) { // 出错了
                            $log.write('venues', 0, '获取soms版本号记录出错', {err: err, venuesIds: venue_ids}, 'error');
                        } else if (result.length <= 0) {
                            // 没有版本信息, 默认旧版本
                        } else {
                            var resultLen = result.length;

                            for (var j = 0; j < listLen; j++) {
                                for (var k = 0; k < resultLen; k++) {
                                    // 有查询到记录，并且记录为新版本
                                    if (result[k].venue_id == list[j].id && result[k].is_new == 1) {
                                        list[j].soms_is_new = 1;
                                        list[j].upgrade_date = result[k].upgrade_date; // 版本升级日期
                                        break; // 匹配到了，跳出，进行下一个匹配
                                    }
                                }
                            }
                        }
                        callback(null, list);
                    });
            } else {
                // 没有绑定场馆
                callback(null, list);
            }
        }
    ], function (err, result) {
        //console.$log(err,result);
        //组装数据并返回
        var data = [];
        if (!err && result.length > 0) {
            var venueList = [];

            for (var i = 0; i < result.length; i++) {
                venueList.push({
                    venue_id: result[i].id,
                    soms_is_new: result[i].soms_is_new,
                    upgrade_date: result[i].upgrade_date
                });
                data.push({id: result[i]['id'], name: result[i]['name'], soms_is_new: result[i]['soms_is_new']});
            }

            // 设置已经绑定的场馆到session中
            req.session.venueList = venueList;

            res.send({
                success: true,
                data: data
            });
        } else {
            $log.write('venue', 0, '获取场馆列表页', {err: err}, 'error');
            res.send({
                success: false,
                errorMsg: '没有数据'
            });
        }
    });
};

/**
 * 绑定的场馆列表
 * @param req
 * @param res
 * @param next
 */
venue.venueList= function (req, res, next) {
    var openId = req.session.openId ? req.session.openId : '';

    if(openId.length == 0){
        res.redirect('/index');
        return;
    }

    async.waterfall([
        function(callback){
            //取出绑定的商家列表
            $weixinPhone.getSuppliersIdByOpenId(openId,2, function (err, suppliersIdList) {
                if (err) {
                    $log.write('venue.venueList', 0, '取商家ID出错', {err: err}, 'error');
                    callback('1001', '取商家列表出错！');
                    return;
                }
                if (suppliersIdList.length == 0) {
                    callback('1002', '该微信未开通馆掌服务');
                    return;
                }
                callback(err, suppliersIdList);
            });
        },
        function(suppliersIdList,callback){
            //取app_id列表
            $qydBusiness.getListBySuppliersIds(suppliersIdList,function(err,list){
                if (err) {
                    $log.write('venue.venueList', 0, '取APPID出错', {err: err,suppliersIdList:suppliersIdList}, 'error');
                    callback('2001', '取商家列表出错！');
                    return;
                }
                if (list.length == 0) {
                    callback('2002', '该微信未绑定商家');
                    return;
                }
                var appIdList = [];
                for(var i=0;i<list.length;i++){
                    if(appIdList.indexOf(list[i]['app_id']) == -1){
                        appIdList.push(list[i]['app_id']);
                    }
                }
                callback(err, appIdList);
            });
        },
        function(appIdList,callback){
            //取出场馆列表
            business.getVenueListByAppIds(appIdList,function(err,venueList){
                if (err) {
                    $log.write('venue.venueList', 0, '取venueList出错', {err: err,appIdList:appIdList}, 'error');
                    callback('3001', '取场馆列表出错！');
                    return;
                }
                if (venueList.length == 0) {
                    callback('3002', '该微信未绑定场馆');
                    return;
                }
                callback(err, venueList);
            });
        }
    ],function(err,venueList){
        if(err){
            //出错了
            res.redirect('/binding/login');
            return
        }
        // 设置已经绑定的场馆到session中
        req.session.venueList = venueList;

        res.render('wechatbindlist',{venueList:venueList,today:$common.todayStartTime()});
    });

};

module.exports = venue;