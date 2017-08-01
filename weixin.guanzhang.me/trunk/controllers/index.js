/*
 indexController
 */
var business = require('../models/business');
var log = require('../util/log');
var db = require('../models/db');
var async = require('async');
var moment = require('moment');
var weixinApi = require('../api/weixin');

var index = {};

index.wx = function (req, res, next) {
    res.render('wx', {
        title: 'Express'
    });
};
index.open= function (req, res, next) {
    var venueId =  req.query.venueId || '';
    var date =  req.query.date || '';
    var templateMsgId =  req.query.templateMsgId || '';
    weixinApi.getWechatInfo(function(err,info){
        var app_id = '';
        if(!err && info){
           app_id = info.app_id;
        }
        res.render('getOpenid',{
            app_id:app_id,
            venueId:venueId,
            date:date,
            templateMsgId:templateMsgId
        });
    });
};


module.exports = index;