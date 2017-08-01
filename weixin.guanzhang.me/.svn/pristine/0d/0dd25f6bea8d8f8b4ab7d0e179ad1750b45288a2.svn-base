/*
 indexController
 */
var business = require('../models/business');
var log = require('../util/log');
var db = require('../models/db');
var async = require('async');
var moment = require('moment');
var weixinApi = require('../api/weixin');
var redis = require('../util/redis');

var test = {};

//≤‚ ‘
test.test = function (req, res, next) {

    async.parallel({
        a: function (asyncCallback) {
            db.getPool('business').getNewAdapter(function (conn) {
                conn.where({id: 294}).get('bs_smos', function (err, info) {
                    asyncCallback(err, info);
                });
            });

        },
        b: function (asyncCallback) {
            db.getPool('di').getNewAdapter(function (conn) {
                conn.where({id: 466280}).get('di_message2', function (err, info) {
                    console.log(conn._last_query());
                    asyncCallback(err, info);
                });
            });

        }
    }, function (err, results) {
        res.send({err: err, results: results});
        res.end();
    });

    /*
     db.getPool('business').where({id:294}).get('bs_smos',function(err,info){
     res.send({err:err,info:info});
     });

     redis.setValue('test',['999','2222']);
     redis.getValue('test',function(err,data){
     console.log(data);
     res.send({err:err,data:data});
     });
     weixinApi.getWechatInfo(function(err,data){
     res.send(err||data);
     });
     */
};


module.exports = test;