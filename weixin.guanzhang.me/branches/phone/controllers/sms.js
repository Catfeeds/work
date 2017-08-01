/*
 venueController
 */
var request = require('request');
var base = require('../api/base');
var querystring = require('querystring');
var business = require('../models/business');
var log = require('../util/log');
var smsApi = require('../api/sms');
var async = require('async');
var sms_controllers = {};


/**
 * 发送验证码短信
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
sms_controllers.getSMSCode = function (req, res, next) {
    var mobile = req.body.mobile || 0;
    //取允许号码
    var venueId = req.session.venueId || 0;
    if (venueId === 0 || mobile === 0) {
        res.send({
            success: false,
            errorMsg: '参数错误'
        });
    } else {
        async.waterfall([
            function(asyncCallback) {
                business.getAllowedMobile(venueId, asyncCallback);
            },
            function(data,asyncCallback){
                if(data && data.weixin_phone.replace(/[\s+\r\n]/g,"").split(',').indexOf(mobile) > -1){
                    //发送验证码
                    smsApi.get_sms_code(mobile,asyncCallback);
                }else{
                    log.write('sms', 0, '手机号不存在', {data: data,mobile:mobile,venueId:venueId}, 'info');
                    asyncCallback(true,'该手机号未允许查看报表');
                }
            }
        ],function(err,result){
            if(err && err !== true){
                log.write('sms', 0, '手机号验证', {err: err}, 'error');
            }
            res.send({
                success: !err,
                errorMsg: result
            });
        });

    }
};

/**
 * 验证短信验证码
 *
 */
sms_controllers.checkCode = function (req,res,next) {
    var mobile = req.body.mobile || 0;
    var code = req.body.smsCaptcha || 0;
    //取允许号码
    var venueId = req.session.venueId || 0;
    if (venueId === 0 || mobile === 0 || code === 0) {
        res.send({
            success: false,
            errorMsg: '参数错误'
        });
    } else {
        //发送验证码
        smsApi.verify_sms_code(mobile,code,function(err,result){
            //测试
            //err = false;

            if(!err){
                //经过短信验证
                req.session.isMobileCheck = true;
                //微信绑定
                business.spuerWxBinding({
                    spuser_id:req.session.spuserId,
                    venue_id:req.session.venueId,
                    open_id:req.session.openId,
                    mobile:mobile
                });
            }
            res.send({
                success: !err,
                errorMsg: result
            });
        });
    }

};


module.exports = sms_controllers;