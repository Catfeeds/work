var async = require('async');
var request = require('request');
var querystring = require('querystring');
var base = require('./base');
var config = require('../conf/config');
var log = require('../util/log');
var des = require('../util/desCrypto');
var db = require('../models/db');

var court = {};
var court_api = config.apiUrl.court ? config.apiUrl.court : '';

/**
 * 请求court的api
 * @param  {[type]}   params   [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
court.apiRequest = function (params, callback) {
    //参数
    params = base.setPublicParams(params);
    //取api_key
    var conn = db.getAdapter('openplat');
    conn.select('api_id,api_key')
        .where({
            dev_id: 1,
            code: 'qyd_api'
        }).get('td_applications', function (err, results, field) {
            conn.disconnect();//释放
            //请求court接口
            params.api_key = results[0]['api_id'];
            var api = court_api + "?" + querystring.stringify(base.addSign(params, results[0].api_key));
            request(api, function (error, response, body) {
                var data = null;
                try {
                    data = JSON.parse(body);
                } catch (e) {
                    //请求LOG
                    log.write('court.apiRequest', 0, '请求court.api解释出错', {req: api, res: body});
                }
                callback(error || data === null, data);
                //请求LOG
                log.write('court.apiRequest', 0, '请求court.api', {
                    req: api,
                    res: body
                }, 'info');
            });
        });

};

court.GetCourtByUserName = function (username, password, callback) {
    params = {
        action: "GetCourtByUserName",
        username: username,
        password: desCrypto.enCrypto(password)
    };
    params = base.setPublicParams(params);
    async.waterfall([

        function (asyncCallback) {
            //取api_key
            openplat.getApplication({
                dev_id: 1,
                code: 'qyd_api'
            }, asyncCallback);
        },
        function (data, asyncCallback) {
            //请求court接口
            params.api_key = data.api_key;
            var api = court_api + "?" + querystring.stringify(base.addSign(params, params.api_key));
            request(api, function (error, response, body) {
                if (!error && response.statusCode == 200 && (obj = JSON.parse(body)) && obj.status == '0000') {
                    callback(null, obj.data);
                    //请求LOG
                    log.write('GetCourtByUserName', 0, '请求wechat.api成功', {
                        req: params,
                        res: obj
                    }, 'info');
                } else {
                    //请求出错
                    callback(error, null);
                    log.write('GetCourtByUserName', 0, '请求wechat.api出错', {
                        req: params,
                        res: obj
                    }, 'error');
                }
            });
        }
    ], function (err, result) {

    });
};


// 将对象导出
module.exports = court;