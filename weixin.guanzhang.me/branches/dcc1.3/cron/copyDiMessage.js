"use strict";

var later = require('later');
var moment = require('moment');
var common = require('../util/common');
var async = require('async');
var log = require('../util/log');
var db = require('../models/db');
var fs = require("fs");

// 数据表
var messageTable = 'di_message';
var messageTable2 = 'di_message2';

// 每次读取的数量
var timesLimit = 100;

// 存储最后id的文件名
var lastFileName = __dirname + '/last_id.txt';

//测试每分钟执行一次
var timeStep = 30; //每隔几秒运行
var sched = later.parse.recur().every(timeStep).second();

later.setInterval(function(){

    var obj = new copyDiMessage();
    obj.run();

}, sched);


/**
 * 拷贝 di_message 表中的数据到 di_message2中
 *
 * message2 表中第一个id为: 1987609
 *
 * @author xiaoyanchun
 */
function copyDiMessage() {
    var _this = this;
    var _endId = 0;

    // 初始化最后id
    this.initEndId = function(){
        // 同步读取
        try {
            var fileData = fs.readFileSync(lastFileName);
        } catch (e) {
            console.log("读取存储最后id文件出错", e.toString());
            return;
        }

        var endId = parseInt(fileData.toString());

        if (isNaN(endId)) {
            console.log(lastFileName + '文件内容不是整数');
            return;
        }

        if (endId <= 0) {
            console.log("endId小于0，已经处理完毕");
            return;
        }

        _endId = endId;
    };

    // 运行
    this.run = function(){
        var startTime = new Date().getTime();

        _this.initEndId(); // 初始化最后id

        if (_endId <= 0) {
            console.log('初始化最后id失败');
            return;
        }

        async.waterfall([

            // 获取消息列表
            function(callback){
                console.log(common.date("Y-m-d H:i:s") + ' 开始处理, endId: ' + _endId);

                _this.getMessageList(_endId, function(err, result){
                    if (err) {
                        log.write('copy_di_message', 0, '获取取message表中数据出错', {err: err}, 'error');
                        callback(err, result);
                    } else {
                        callback(null, result);
                    }
                });
            },

            // 处理消息
            function(msgList, callback){
                console.log('共: ' + msgList.length + ' 条消息');

                if (msgList.length > 0) {
                    _this.handlerMessage(msgList, function(err, result){
                        if (err) {

                        } else {
                            // 写入文件
                            fs.writeFileSync(lastFileName, _endId - timesLimit);
                        }

                        callback(err, result);
                    });
                } else {
                    callback(null, null);
                }
            }

        ], function(err, result){

            if (err) {
                console.log('处理出错: ' + err);
                log.write('copy_di_message', 0, '获取拷贝message数据出错', {err: err}, 'error');
            }

            var execTime = new Date().getTime() - startTime;

            console.log('处理完毕, 处理时间: ' + execTime + '毫秒');
        });
    };

    // 获取消息列表
    this.getMessageList = function(endId, callback){

        var where = ' id <= ' + endId;

        db.getPool('di').getNewAdapter(function (conn) {
            conn.where(where).order_by(' id desc ').limit(timesLimit).get(messageTable, function(err, result){
                if (err) {
                    log.write('copy_di_message', 0, '读取message表中数据出错', {err: err, where: where, sql: conn._last_query()}, 'error');
                    callback(err, []);
                } else {
                    callback(null, result);
                }
            });
        });
    };

    // 处理消息
    this.handlerMessage = function (msgList, callback) {

        // 将数组5个一组并发执行
        async.forEachLimit(msgList, 5, function(item, eachCallback) {
            _this.copyMessage(item, eachCallback);
        }, function(err) {
            if (err) {
                log.write('copy_di_message', 0, 'copyMessage:出错', {err: err}, 'error');
                callback(err, null);
            } else {
                callback(null, null);
            }
        });
    };

    // 拷贝消息
    this.copyMessage = function (item, asyncCallback) {

        async.waterfall([
            // 检测记录是否已经存在
            function(callback){
                db.getPool('di').getNewAdapter(function (conn) {
                    conn.select('id').where("id='" + item.id + "'").limit(1).get(messageTable2, function(err, result){
                        if (err) {
                            callback(err, null);
                        } else {
                            callback(null, result.length);
                        }
                    });
                });
            },

            // 拷贝message记录
            function(msgExist, callback){


                db.getPool('di').getNewAdapter(function (conn) {
                    // 插入或更新的数据
                    var data = {
                        message: item.message,
                        status: 1,
                        app_id: item.app_id,
                        client_time: item.client_time,
                        rs_key: item.rs_key,
                        client_token: item.client_token
                    };

                    if (msgExist > 0) { // 更新
                        console.log('---更新, id: ' + item.id);
                        conn.where({id: item.id}).update(messageTable2, data, callback);
                    } else { // 插入
                        console.log('---插入, id: '+item.id);
                        data.id = item.id;
                        conn.insert(messageTable2, data, callback);
                    }
                });
            }

        ], function(err, result){
            if (err) {
                log.write('copy_di_message', 0, '拷贝message出错了', {err: err}, 'error');
                asyncCallback(err);
            } else {
                asyncCallback(null);
            }
        });

    };

}













