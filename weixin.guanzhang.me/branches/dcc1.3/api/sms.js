var async = require('async');
var request = require('request');
var querystring = require('querystring');
var base = require('./base');
var config = require('../conf/config');
var log = require('../util/log');
var db = require('../models/db');

var sms = {};
var api_domain = config.apiUrl.api || '';

/**
 * 短信验证码
 * @param  {[type]}   params   [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
sms.get_sms_code = function (mobile, callback) {
    var params = {
        phone: mobile,
        action: 'get_sms_code',
        type: 10
    };
    params = base.setPublicParams(params);
    var api_url = api_domain + "app/v2/?" + querystring.stringify(base.addSign(params, base.getApiKey()));

    request(api_url, function (error, response, body) {
        var data = null;
        try {
            data = JSON.parse(body);
        } catch (e) {
            //请求LOG
            log.write('sms.get_sms_code', 0, '请求短信解释出错', {req: api_url, res: body});
        }
        callback(error || data === null || data.status != '0000' , data === null ? '出错' : data.msg || data );
        //请求LOG
        log.write('sms.get_sms_code', 0, '请求短信api', { req: api_url, res: body }, 'info');
    });
};

/**
 *
 * @type {{}}
 */
sms.verify_sms_code= function (mobile,code, callback) {
    var params = {
        phone: mobile,
        sms_code: code,
        action: 'verify_sms_code',
        type: 10
    };
    params = base.setPublicParams(params);
    var api_url = api_domain + "app/v2/?" + querystring.stringify(base.addSign(params, base.getApiKey()));

    request(api_url, function (error, response, body) {
        var data = null;
        try {
            data = JSON.parse(body);
        } catch (e) {
            //请求LOG
            log.write('sms.verify_sms_code', 0, '请求短信解释出错', {req: api_url, res: body});
        }
        callback(error || data === null || data.status != '0000' , data === null ? '出错' : data.msg || data );
        //请求LOG
        log.write('sms.verify_sms_code', 0, '请求api', { req: api_url, res: body }, 'info');
    });
};

module.exports = sms;


