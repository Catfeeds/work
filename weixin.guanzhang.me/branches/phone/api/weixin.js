var request = require('request');
var querystring = require('querystring');
var base = require('./base');
var config = require('../conf/config');
var log = require('../util/log');
var des = require('../util/desCrypto');
var redis = require('../util/redis');
var async = require('async');
/**
 * [weixin description]
 * @type {Object}
 */
var weixin = {};
var weixin_api = config.apiUrl.weixin ? config.apiUrl.weixin : '';

weixin.getNewWechatId = function(newKey){
    key = newKey ? 'new_wechat_id' : 'wechat_id';
    return config.weixin[key] ? config.weixin[key] : 0;
};
//取新服务号信息
weixin.getNewWechatInfo = function(callback){
    weixin.getWechatInfoFromApi(weixin.getNewWechatId(true),callback)
};
//取旧服务号信息
weixin.getWechatInfo = function (callback) {
    weixin.getWechatInfoFromApi(weixin.getNewWechatId(false),callback)
};
/**
 * 通过微信接口取appId等信息
 * @param  {[type]}   wechat_id [description]
 * @param  {Function} callback  [description]
 * @return {[type]}             [description]
 */

weixin.getWechatInfoFromApi = function (wechat_id,callback) {
    var cacheKey = 'getWechatInfo:wechatInfo:'+wechat_id;
    var params = {
        wechat_id: wechat_id,
        action: "getWechatInfo"
    };

    async.waterfall([
        function (asyncCallback) {
            //缓存是否存在
            redis.getValue(cacheKey, function (err, reply) {
                if (!err && reply) {
                    asyncCallback(1, reply);
                } else {
                    asyncCallback(err, reply);
                }
            });
        },
        function (data,asyncCallback) {
            params = base.setPublicParams(params);
            var api = weixin_api + "api?" + querystring.stringify(base.addSign(params, base.getApiKey()));
            request(api, function (error, response, body) {
                var data = null;
                if (!error && response.statusCode == 200) {
                    var obj = {};
                    try{
                        obj = JSON.parse(body);
                    }catch(e){
                        log.write('getWechatInfo', 0, '解析wechat.api返回出错', {req: api, res:body}, 'error');
                    }
                    if (typeof obj === 'object' && obj.status == '0000') {
                        data = obj.data;
                        data.app_id = des.deCrypto(data.app_id);
                        data.app_secret = des.deCrypto(data.app_secret);
                        //存入缓存
                        redis.setValue(cacheKey,data,7200);
                    } else {
                        error = obj.msg;
                    }
                }
                asyncCallback(error, data);
                log.write('getWechatInfo', 0, '请求wechat.api', {req: api, error: error}, 'info');
            });
        }
    ], function (err, result) {
        //缓存已有
        if(err === 1){
            err = null;
        }
        callback(err,result);
    });
};

/**
 * 通过code取openId和accessToken
 * @param  {[type]}   code     [description]
 * @param  {[type]}   data     [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
weixin.getOauth2AccessToken = function (code, app_id, app_secret, callback) {
    if (!code || !app_id || !app_secret) {
        callback('参数为空', null);
        return false;
    }
    var api = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + app_id + "&secret=" + app_secret + "&code=" + code + "&grant_type=authorization_code";
    request(api, function (error, response, body) {
        var data = {access_token:"",openid:""};
        if (!error && response.statusCode == 200) {
            body = JSON.parse(body);
            if(body.errcode){
                error = data.errmsg;
            }else{
                data.access_token = body.access_token;
                data.openid = body.openid;
            }
        }
        callback(error, data);
        log.write('getOauth2AccessToken', 0, '请求weixin', {req: api, res: data}, 'info');
    });
};

weixin.getWxUserInfo = function (accessToken, openId, callback) {
    if (!accessToken || !openId) {
        callback('参数为空', null);
        return false;
    }
    var api = "https://api.weixin.qq.com/sns/userinfo?access_token=" + accessToken + "&openid=" + openId + "&lang=zh_CN";
    request(api, function (error, response, body) {
        var data = null;
        if (!error && response.statusCode == 200) {
            data = JSON.parse(body);
            error = data.errcode ? data.errmsg : error;
        }
        callback(error, data);
        log.write('getWxUserInfo', 0, '请求weixin', {req: api, res: data}, 'info');
    });
};

/**
 * 推送模板消息接口
 * @type {Object}
 */
weixin.sendGzTplMsg = function(params,callback){
    params.action = 'sendGzTplMsg';
    params = base.setPublicParams(params);
    var api = weixin_api + "ext?" + querystring.stringify(base.addSign(params, base.getApiKey()));
    request(api, function (error, response, body) {
        var obj = {};
        if (!error && response.statusCode == 200) {
            try{
                obj = JSON.parse(body);
            }catch(e){
                error = '接口返回JSON解析出错';
            }
            if (typeof obj === 'object' && obj.hasOwnProperty('status') && obj.status !== '0000') {
                error = '推送失败'+obj.status+obj.msg;
            }
        }
        callback(error, obj);
        log.write('sendGzTplMsg', 0, '推送馆掌收入', {req: api, error: error,body:body}, error ? 'error' : 'info');
    });

};

// 将对象导出
module.exports = weixin;