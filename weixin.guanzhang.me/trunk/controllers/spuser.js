/**
 * user controller
 */
var async = require('async');
var common = require('../util/common');
var moment = require('moment');
var weixin = require('../api/weixin');
var log = require('../util/log');
var business = require('../models/business');
var courtApi = require('../api/court');
var desCrypto = require('../util/desCrypto');
var db = require('../models/db');
//导出对象
var spuser = {};

/**
 * 微信菜单（营业报表）回调请求处理
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
spuser.oauth = function (req, res, next) {
    //返回code参数
    var code = req.query.code || '';
    //从模板消息进入
    var venueId = req.query.venueId || '';
    var date = req.query.date || '';
    var templateMsgId = req.query.templateMsgId || '';

    if (!code) {
        //参数错误
        res.redirect('/');
        return;
    }
    //获取openid
    async.waterfall([
        //取appId等
        function (callback) {
            weixin.getWechatInfo(callback);
        },
        //获取网页授权access_token
        function (data, callback) {
            var app_id = null;
            var app_secret = null;
            if (typeof data == 'object' && data) {
                app_id = data.app_id;
                app_secret = data.app_secret;
            }
            weixin.getOauth2AccessToken(code, app_id, app_secret, callback);
        },
        //本地是否已保存
        function (data, callback) {
            var conn = db.getAdapter('business');
            conn.where({open_id: data.openid})
                .get('bs_wxuser', function (err, results) {
                    conn.disconnect();//释放
                    var result = null;
                    if (!err && results.length > 0) {//本地存有，直接跳出
                        err = 1;
                        result = results[0];
                        result.openid = results[0].open_id;
                    } else {
                        result = data;
                    }
                    callback(err, result);
                });
        },
        //通过openId取用户信息
        function (data, callback) {
            var access_token = null;
            var openid = null;
            if (typeof data == 'object' && data) {
                access_token = data.access_token;
                openid = data.openid;
            }
            weixin.getWxUserInfo(access_token, openid, function (err, result) {
                if (!err) {
                    //存一份到本地
                    var insertData = {
                        open_id : result.openid,
                        nickname : result.nickname,
                        sex: result.sex,
                        headimgurl:result.headimgurl,
                        country:result.country,
                        province:result.province,
                        city:result.city
                    };
                    var conn = db.getAdapter('business');
                    conn.insert('bs_wxuser', insertData, function (err, info) {
                        conn.disconnect();
                    });
                }
                callback(err, result);
            });
        }
    ], function (err, result) {

        log.write('spuser.oauth', 0, 'start', {err:err,reslut:result}, 'info');
        /*
         err = null;
         result = {
         openid: "odBmbuI3miE3u5ydP_Jwa96sqejU",
         nickname: 'vikey5210000',
         sex: 1,
         country: '中国',
         province: '广东',
         city: '深圳'
         };
         */

        //以上为测试
        //console.log(err,result);
        if (err && err != 1) {
            //请求授权出错了
            log.write('spuser.oauth', 0, '请求授权出错', err, 'error');
            //跳转
            res.redirect('/');
            return;
        }

        //设置session
        req.session.openId = result.openid;
        req.session.wxUserInfo = result;
        req.session.isMobileCheck = true;

        log.write('spuser.oauth', 0, 'start-session', {session:req.session}, 'info');
        async.waterfall([
            function (callback) {
                //取绑定场馆列表whale_business_db.bs_wxuser_index
                var conn = db.getAdapter('business');
                conn.where({wx_open_id: result.openid, status: 1}).get('bs_wxuser_index', function (err, list) {
                    conn.disconnect();//释放
                    if (err) {
                        callback(err, []);
                    } else {
                        if (list.length > 0) {
                            callback(null, list);
                        } else {
                            callback(1, []); // 没有绑定场馆
                        }
                    }
                });
            },

            // 检测场馆的馆掌soms是否是新版本
            function (list, callback) {
                var listLen = list.length;
                var venue_ids = [];

                for (var i = 0; i < listLen; i++) {
                    list[i].soms_is_new = 0; // 默认设置旧版本
                    list[i].upgrade_date = 0; // 版本升级日期
                    venue_ids.push(list[i].venue_id);
                }

                if (venue_ids.length > 0) {
                    var conn = db.getAdapter('report');
                    conn.select('venue_id, is_new, upgrade_date').where('venue_id', venue_ids)
                        .get('soms_version', function (err, result) {
                            conn.disconnect();//释放
                            if (err) { // 出错了
                                log.write('spuser', 0, '获取soms版本号记录出错', {err: err, venuesIds: venue_ids}, 'error');
                            } else if (result.length <= 0) {
                                // 没有版本信息, 默认旧版本
                            } else {
                                var resultLen = result.length;

                                for (var j = 0; j < listLen; j++) {
                                    for (var k = 0; k < resultLen; k++) {
                                        // 有查询到记录，并且记录为新版本
                                        if (result[k].venue_id == list[j].venue_id && result[k].is_new == 1) {
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

        ], function (err, resultList) {

            log.write('spuser.oauth', 0, 'start-venue', {err:err,resultlist:resultList}, 'info');
            if (err) {
                if (err == 1) { // 没有绑定场馆
                    //跳转登录绑定
                    res.redirect('/wx#/login');
                } else {
                    log.write('spuser', 0, '获取场馆列表信息出错', {err: err, result: result}, 'error');
                    res.redirect('/');
                }
                return;
            } else {
                var venueList = [];

                for (var i = 0; i < resultList.length; i++) {
                    venueList.push({
                        venue_id: resultList[i].venue_id,
                        soms_is_new: resultList[i].soms_is_new,
                        upgrade_date: resultList[i].upgrade_date
                    });
                }

                // 设置已经绑定的场馆到session中
                req.session.venueList = venueList;

                res.cookie('gz_userId', resultList[0]['spuser_id']);
                //设置登录成功
                req.session.spuserId = resultList[0]['spuser_id'];
                req.session.isMobileCheck = true;

                //从模板消息进入
                if (venueId && date && templateMsgId) {
                    //是否可跳转
                    var is_direct = false;
                    var soms_version_is_new = false;

                    for (var i = 0; i < venueList.length; i++) {
                        if (venueList[i].venue_id == venueId) {
                            is_direct = true; //跳转报表首页
                        }

                        if (venueList[i].venue_id == venueId && venueList[i].soms_is_new == 1) {
                            soms_version_is_new = true;
                        }
                    }

                    log.write('spuser.oauth', 0, 'start-temp', {venueId:venueId,venueList:venueList}, 'info');
                    if (is_direct === false) {
                        res.redirect('/wx#/login');
                        return;
                    }

                    if (soms_version_is_new == true) {
                        //进入新报表
                        date = moment(date).unix();
                        res.redirect('/wxreport-' + venueId + '#!/ReportIndex/' + date);
                        return;
                    } else {
                        //进入旧报表
                        res.redirect('/wx#/home/' + venueId + '/' + date);
                        return;
                    }
                }

                res.redirect('/wx#/ucenter');
            }

        });

    });
};

/**
 * 馆长账号绑定
 * post
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
spuser.login = function (req, res, next) {
    //
    var user_key = req.session.user_key || '';
    var username = req.body.username || '';
    var password = req.body.password || '';

    if (!user_key || !username || !password) {
        res.send({
            success: false,
            errorMsg: '请输入正确用户名和密码'
        });
        return;
    }
    //验证用户是否存在
    pwds = (new Buffer(password, 'base64')).toString().split('_gz_');
    password = common.sha1(username + common.md5(pwds[0])).toLowerCase();
    if (pwds.length != 2 || pwds[1] != user_key) {
        res.send({
            success: false,
            errorMsg: '用户名或密码有误'
        });
        return;
    }
    //入库spuser数据
    var spuserData = {
        username: username,
        password: password,
        role: 2,
        status: 1,
        source: 1,
        created: new Date().getTime() / 1000
    };
    //处理流程
    async.waterfall([
        //本地数据库验证
        function (asyncCallback) {
            //验证用户,本地不存在再请求趣运动
            var conn = db.getAdapter('business');
            conn.where({
                username: username,
                password: password
            }).get('bs_spuser', function (err, results) {
                conn.disconnect();//释放
                var data = null;
                if (!err) {
                    err = results.length > 0 ? 1 : err;//查得到
                    data = results.length > 0 ? results[0] : null;
                }
                asyncCallback(err, data);//
            });
        },
        //本地不存在，趣运动接口取app_id和app_key
        function (spuser, asyncCallback) {
            //不存在
            courtApi.apiRequest({
                action: 'GetCourtByUserName',
                user_name: username,
                password: desCrypto.enCrypto(pwds[0])
            }, function (err, results) {
                var data = null;
                if (!err) {
                    err = results.status == '0000' ? null : results.msg;
                    data = results.status == '0000' ? results['data'][0] : null;
                }
                asyncCallback(err, data);//
            });
        },
        //查bs_soms表是否存在
        function (apiData, asyncCallback) {
            var conn = db.getAdapter('business');
            conn.where({
                app_id: apiData.app_id,
                app_key: apiData.app_key
            }).get('bs_smos', function (err, results) {
                if (!err && results.length > 0) {
                    //表里有的
                    spuserData.supplier_id = results[0]['supplier_id'];
                    spuserData.venue_id = results[0]['venue_id'];
                    //异步插入
                    conn.insert('bs_spuser', spuserData, function (err, info) {
                        conn.disconnect();//释放
                        spuserData.id = info.insertId;
                        //插入spuserLOG
                        log.write('spuser.login', 0, 'spuser入库', {err: err, info: info});
                    });
                    //可以跳出
                    asyncCallback(1, spuserData);
                } else {
                    conn.disconnect();//释放
                    business.createSoms(apiData.app_id, function (err, result) {
                        //返回supplier_id和venue_id
                        if (!err && typeof result === 'object') {
                            spuserData.supplier_id = result.supplier_id;
                            spuserData.venue_id = result.venue_id;
                            //异步插入
                            var conn = db.getAdapter('business');
                            conn.insert('bs_spuser', spuserData, function (err, info) {
                                conn.disconnect();//释放
                                spuserData.id = info.insertId;
                                //插入spuserLOG
                                log.write('spuser.login', 0, 'spuser入库', {err: err, info: info});
                            });
                        }
                        asyncCallback(err, spuserData);
                    });
                }
            });
        }
    ], function (err, result) {
        //专门跳出或成功
        if (err === 1 || !err) {
            //设置cookie
            req.cookies.gz_userId = result.id;
            //设置session
            req.session.venueId = result.venue_id;
            req.session.spuserId = result.id;

            //微信绑定
            var openId = typeof req.session === 'object' ? req.session.openId : null;
            if (!openId) {
                //错误返回
                res.send({
                    success: false,
                    errorMsg: 'openId有误',
                    code: -1000
                });
            } else {
                result.openId = openId;
                //成功返回
                res.send({
                    success: true,
                    errorMsg: null,
                    data: {date: moment().format('YYYY-MM-DD')}
                });
            }

        } else {
            //错误返回
            res.send({
                success: false,
                errorMsg: err
            });
        }
    });
};

spuser.pwdkey = function (req, res, next) {
    var user_key = common.md5(moment().format('YYYY/MM-DD%HH|mm|ss|Z'));
    req.session.user_key = user_key;
    res.send({
        success: true,
        errorMsg: null,
        data: user_key
    });
};
/**
 * 场馆解绑
 * @param req
 * @param res
 * @param next
 */
spuser.logout = function (req, res, next) {
    var venueId = req.query.venueId || 0;
    var openId = typeof req.session === 'object' ? req.session.openId : null;

    if (!venueId || !openId) {
        res.send({
            success: false,
            code: -1000,
            errorMsg: '参数错误'
        });
    } else {
        async.waterfall([
            function (asyncCallback) {
                var conn = db.getAdapter('business');
                conn.where({venue_id: venueId, wx_open_id: openId})
                    .update('bs_wxuser_index', {status: 0}, function (err, info) {
                        conn.disconnect();//释放
                        asyncCallback(err, info);
                    });
            },
            function (data, asyncCallback) {
                var conn = db.getAdapter('business');
                conn.where({
                    wx_open_id: openId,
                    status: 1
                }).get('bs_wxuser_index', function (err, results) {
                    conn.disconnect();//释放
                    if (!err && results.length == 0) {
                        err = 1;//没有数据
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
            }
        ], function (err, result) {
            //组装数据并返回
            var data = [];
            if (!err && result.length > 0) {
                for (var i = 0; i < result.length; i++) {
                    data.push({id: result[i]['id'], name: result[i]['name']});
                }
            }
            res.send({
                success: err === 1 || !err,
                data: data
            });
        });
    }
};

module.exports = spuser;