var log = require('../util/log');
var async = require('async');
var common = require('../util/common');
var wxuserModel = require('../models/wxuser'); // 微信用户模型对象

// 提供对外服务的api
var api = {};


/**
 * 通过馆掌app_id获取绑定的微信用户列表
 *
 * @param req
 * @param res
 * @param next
 * @author xiaoyanchun
 */
api.bindPhoneList = function(req, res, next){
    var app_id = req.query.app_id || ''; // 馆掌app_id
    var jsonRes = common.getApiResInit();

    if (app_id.length == 0) {
        jsonRes.status = '0001';
        jsonRes.msg = '缺少app_id参数';
        res.json(jsonRes);
        return;
    }

    async.waterfall([

        // 获取场馆id
        function(callback){
            var params = {app_id : app_id};

            wxuserModel.getSomsInfoFromCache(params, function(err, result){
                if (err) {
                    callback(err, result);
                } else {
                    if (result.length > 0) {
                        callback(null, result[0].venue_id);
                    } else {
                        callback('获取场馆信息失败');
                    }
                }
            });
        },

        // 获取场馆绑定的微信信息
        function(venueId, callback){

            if (venueId > 0) {
                wxuserModel.getBindUserListFromCache(venueId, function(err, result){
                    if (err) {
                        callback(err, result);
                    } else {
                        callback(null, result);
                    }
                });
            } else {
                log.write('api_controller', 0, 'bindPhoneList:venueId错误', {venueId: venueId}, 'error');
                callback('venueId错误');
            }
        }
    ], function(err, result){

        if (err) {
            jsonRes.status = '0002';
            jsonRes.msg = '获取数据失败';
            res.json(jsonRes);
        } else {
            var resData = [];
            var len = result.length;

            for (var i = 0; i < len; i++) {
                resData.push({
                    open_id: result[i].wx_open_id,
                    mobile: result[i].mobile,
                    nickname: result[i].nickname,
                    status: result[i].status,
                    bind_date : result[i].bind_date
                });
            }

            jsonRes.data = resData;
            res.json(jsonRes);
        }

    });

};


module.exports = api;