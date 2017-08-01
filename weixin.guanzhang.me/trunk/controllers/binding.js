/*
 * bindingController
 * 新服务号绑定
 * author zhuangsheng
 * date 2016-08-23
 */
var $async = require('async');
var $log = require('../util/log');
var $wxuser = require('../models/wxuser');
var $weixin = require('../api/weixin');
var $weixinPhone = require('../models/weixinPhone');
var $smsApi = require('../api/sms');
var $redis = require('../util/redis');
var $moment = require('moment');
var $common = require('../util/common');
var $binding = {};

const SMS_VALID_TIME = 60;
const SMS_MAX_NUM = 5;
const MANAGER_BINDING = 1; //1管理员推送、2微信报表  
const WEIXIN_BINDING = 2;//1管理员推送、2微信报表  

//绑定页
$binding.index = function (req, res, next) {
    var venueId = req.query.venueId || '';
    var date = req.query.date || '';
    var templateMsgId = req.query.templateMsgId || '';
    var type = req.query.type || '';
    $weixin.getNewWechatInfo(function (err, info) {
        var app_id = '';
        if (!err && info) {
            app_id = info.app_id;
        }
        res.render('getOpenidNew', {
            app_id: app_id,
            venueId: venueId,
            date: date,
            templateMsgId: templateMsgId,
            type: type
        });
    });
};
//回调
$binding.oauth = function (req, res, next) {
    //返回code参数
    var code = req.query.code || '';
    var type = parseInt(req.query.type) || 0;
    //从模板消息进入
    var venueId = req.query.venueId || '';
    var date = req.query.date || '';
    var templateMsgId = req.query.templateMsgId || '';

    if (!code || [MANAGER_BINDING, WEIXIN_BINDING].indexOf(type) == -1) {
        //参数错误
        $log.write('$binding.oauth', 0, '回调code错误或type值错误', {
            code: code,
            venueId: venueId,
            date: date,
            templateMsgId: templateMsgId,
            type: type
        }, 'info');
        res.redirect('/binding?type=' + type);
        return;
    }
    //获取openid
    $async.waterfall([
        //取appId等
        function (callback) {
            //记录新服务号的id
            req.session.newWechatId = $weixin.getNewWechatId(true);
            $weixin.getNewWechatInfo(function (err, wechatInfo) {
                if (err) {
                    $log.write('binding.oauth', 0, '请求wechatInfo出错', err, 'error');
                }
                callback(err, wechatInfo);
            });
        },
        //获取网页授权access_token
        function (data, callback) {
            var app_id = null;
            var app_secret = null;
            if (typeof data == 'object' && data) {
                app_id = data.app_id;
                app_secret = data.app_secret;
            }
            $weixin.getOauth2AccessToken(code, app_id, app_secret, function (err, accessInfo) {
                if (err) {
                    $log.write('binding.oauth', 0, '请求weixin的AccessToken出错', err, 'error');
                }
                callback(err, accessInfo);
            });
        },
        function (accessInfo, callback) {
            //---测试
            // accessInfo.openid = 'odBmbuKXSE4pGlWQ-ttVApNYwVis';
            //---测试

            //保存一份数据
            $wxuser.insertWxUser(accessInfo.openid, accessInfo.access_token, function (err, res) {
                //请求授权出错了
                if (err) {
                    $log.write('binding.oauth', 0, '保存微信信息出错', {err: err, res: res}, 'error');
                }
            });
            if (type === MANAGER_BINDING) {
                $weixinPhone.getQydBindingList({open_id: accessInfo.openid, type: type}, function (err, venueList) {
                    if (err) {
                        $log.write('binding.oauth', 0, '取getQydBindingList出错', {err: err, res: res}, 'error');
                    }
                    callback(err, {openId: accessInfo.openid, venueList: venueList});
                });
            } else {
                $weixinPhone.getVenueBindingList({open_id: accessInfo.openid, type: type}, function (err, venueList) {
                    if (err) {
                        $log.write('binding.oauth', 0, '取venueList出错', {err: err, res: res}, 'error');
                    }
                    callback(err, {openId: accessInfo.openid, venueList: venueList});
                });
            }
        }
    ], function (err, bindingInfo) {
        //---测试
        // err = null;
        //---测试

        if (err || !bindingInfo.openId) {
            //请求授权出错了
            $log.write('binding.oauth', 0, '请求授权出错', {err: err, bindingInfo: bindingInfo}, 'error');
            //跳转
            res.redirect('/binding?type=' + type);
            return;
        }
        //设置session
        req.session.openId = bindingInfo.openId;
        //未绑定
        if (bindingInfo.venueList.length === 0) {
            res.redirect('/binding/login?type=' + type);
            return;
        }

        //管理员的话返回
        if (type === MANAGER_BINDING) {
            req.session.managerVenueList = bindingInfo.venueList;
            res.redirect('/binding/bindingInfo?type=' + type);
            return;
        } else {
            // 设置已经绑定的场馆到session中
            req.session.venueList = bindingInfo.venueList;
        }

        //直接进入报表页
        if (venueId && date && templateMsgId) {
            var inList = false;
            for (var i = 0; i < bindingInfo.venueList.length; i++) {
                if (venueId == bindingInfo.venueList[i]['venue_id']) {
                    inList = true;
                    break;
                }
            }
            //未绑定
            if (inList === false) {
                res.redirect('/binding/login?type=' + type);
                return;
            }
            //进入新报表
            date = $moment(date).unix();
            res.redirect('/wxreport-' + venueId + '#!/ReportIndex/' + date);
            return;
        }
        res.redirect('/venue/venueList');
    });
};

$binding.bindingInfo = function (req, res, next) {
    var open_id = req.session.openId;
    var type = parseInt(req.query.type) || 1;
    if(type == 0){
        type = 1;
    }
    $weixinPhone.getQydBindingList({open_id: open_id, type: type}, function (err, venueList) {
        if (err) {
            $log.write('binding.bindingInfo', 0, '取venueList出错', {err: err, res: res}, 'error');
        }
        if (venueList.length == 0) {
            res.redirect('/binding/login?type=' + type);
            return;
        }
        var venueNames = [];
        for (var i = 0; i < venueList.length; i++) {
            venueNames.push(venueList[i]['suppliers_name']);
        }
        res.render('wechatbindInfo', {venueNames: venueNames});
    });
};

/**
 * 进入手机号绑定页面
 * @type {{}}
 */
$binding.login = function (req, res, next) {

    var type = parseInt(req.query.type) || 0;
    if ([MANAGER_BINDING, WEIXIN_BINDING].indexOf(type) == -1) {
        $log.write('$binding.login', 0, 'type值错误', {type: type});
        type = 2;
    }
    var venueList = req.session.venueList || [];
    res.render('wechatbind', {type: type, venueList: venueList});
};

/**
 * 发送短信验证码
 * @type {{}}
 */
$binding.getSMSCode = function (req, res, next) {
    var jsonRes = $common.getApiResInit();
    var phone = req.query.phone || '';
    var type = parseInt(req.query.type) || 0;

    if (!phone.match(/^1\d{10}$/)) {
        jsonRes.status = '0001';
        jsonRes.msg = '请输入正确的手机号';
        res.send(jsonRes);
        return;
    }
    var cacheValue = {send_num: 0, send_time: 0};
    var cacheKey = "binding.getSMSCode:" + phone;
    $async.waterfall([
        function (callback) {
            $redis.getValue(cacheKey, function (err, reply) {
                if (err) {
                    $log.write('binding.getSMSCode', 0, '查redis出错', {err: err, cacheKey: cacheKey}, 'error');
                    callback('1001', '系统错误！');
                    return;
                }
                if (reply === null || typeof reply !== 'object') {
                    reply = cacheValue;
                }
                //1分钟内只能发一次、一天只能两次
                if (reply.send_num >= SMS_MAX_NUM) {
                    callback('1002', '短信发送次数太多！');
                    return;
                }
                if (reply.send_time > 0 && $common.timestamp() - reply.send_time < SMS_VALID_TIME) {
                    callback('1003', '短信发送太频繁！');
                    return;
                }
                cacheValue = reply;
                callback(err, reply);
            });
        },
        function (data, callback) {
            //是否可发送短信
            $weixinPhone.getSuppliersIdByPhone(phone, type, function (err, suppliersIdList) {
                if (err) {
                    $log.write('binding.getSMSCode', 0, '取商家ID出错', {err: err}, 'error');
                    callback('2001', '取商家列表出错！');
                    return;
                }
                if (suppliersIdList.length == 0) {
                    callback('2002', '该手机号未开通馆掌服务');
                    return;
                }
                callback(err, suppliersIdList);
            });

        },
        function (data, callback) {
            $smsApi.get_sms_code(phone, function (err, result) {
                if (err) {
                    $log.write('binding.getSMSCode', 0, '发送短信出错', {err: err}, 'error');
                    callback('3001', '验证码发送失败');
                    return;
                }
                //缓存发送时间和发送次数
                cacheValue.send_num++;
                cacheValue.send_time = $common.timestamp();
                $redis.setValue(cacheKey, cacheValue, 86400);
                callback(err, null);
            });
        }
    ], function (err, result) {
        if (err) {
            jsonRes.status = err;
            jsonRes.msg = result;
        }
        res.send(jsonRes);
    });

};
/**
 * 验证短信验证码
 * @type {{}}
 */
$binding.checkSMSCode = function (req, res, next) {
    var jsonRes = $common.getApiResInit();
    var phone = req.query.phone || '';
    var code = req.query.code || '';
    var type = parseInt(req.query.type) || 0;

    if (!phone.match(/^1\d{10}$/)) {
        jsonRes.status = '0001';
        jsonRes.msg = '请输入正确的手机号';
        res.send(jsonRes);
        return;
    }
    if (!code.match(/^\d{5}$/)) {
        jsonRes.status = '0002';
        jsonRes.msg = '请输入正确的验证码';
        res.send(jsonRes);
        return;
    }
    //验证码
    $smsApi.verify_sms_code(phone, code, function (err, verifyInfo) {
        if (err) {
            $log.write('binding.checkSMSCode', 0, '验证码验证出错', {err: err, phone: phone, code: code}, 'error');
            jsonRes.status = '1001';
            jsonRes.msg = verifyInfo;
            res.send(jsonRes);
            return;
        }
        var wechat_id = $weixin.getNewWechatId(true);
        var open_id = req.session.openId;
        //更新绑定状态
        $weixinPhone.updateBindStatusByPhone(phone, type, 1, wechat_id, open_id, function (err, info) {
            if (err) {
                $log.write('binding.checkSMSCode', 0, '更新weixinPhone绑定openId出错', {
                    err: err,
                    phone: phone,
                    wechat_id: wechat_id,
                    open_id: open_id
                }, 'error');
                jsonRes.status = '1002';
                jsonRes.msg = '系统错误!';
                res.send(jsonRes);
                return;
            }
            res.send(jsonRes);
        });
    });

};

/**
 * 解除绑定
 * @param req
 * @param res
 * @param next
 */
$binding.unbind = function (req, res, next) {
    var jsonRes = $common.getApiResInit();
    var openId = req.session.openId ? req.session.openId : '';

    if (openId.length == 0) {
        jsonRes.status = '0001';
        jsonRes.msg = '无法解除绑定';
        res.send(jsonRes);
        return;
    }

    var wechat_id = $weixin.getNewWechatId(true);
    $weixinPhone.updateBindStatusByOpenId(openId, 2, 0, wechat_id, function (err, info) {
        if (err) {
            $log.write('binding.unbind', 0, '解除绑定出错', {err: err, openId: openId, wechat_id: wechat_id}, 'error');
            jsonRes.status = '1001';
            jsonRes.msg = '系统错误!';
            res.send(jsonRes);
            return;
        }
        res.send(jsonRes);
    });
};

module.exports = $binding;
