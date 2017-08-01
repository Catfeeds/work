"use strict";

var later = require('later');
var moment = require('moment');
var somsVersion = require('../models/somsVersion');
var common = require('../util/common');
var async = require('async');
var log = require('../util/log');
var extend = require('util')._extend;

//每天03:30执行统计前一天数据
var cronSched = later.parse.recur().on('05:00:00').time();

// 设置本地时间
later.date.localTime();

//测试每分钟执行一次
//cronSched = later.parse.cron('*/5 * * * *');

// soms新版本的界线标识, 大于等于8774都是新版本
var newSomsVersionNew = 8774;

//手动统计
var argvs = process.argv.slice(2);
if (argvs.length > 0) {
    var date_time;
    var val = argvs[0].split('=');
    if (val.length < 2) {
        console.log('缺少统计日期,参数date=2016-04-25');
        return;
    }
    date_time = moment(val[1]).unix();
    var startTime = new Date().getTime();
    if (val[0] != 'date' || !val[1] || isNaN(date_time) || date_time < 0 ||  date_time > common.todayStartTime()) {
        console.log('只能统计'+moment().format('YYYY-MM-DD')+'之前的数据');
        return;
    }
    new handleVersion(date_time).run(function (err, result) {
        var execTime = new Date().getTime() - startTime;
        console.log({
            'time': moment().format('YYYY-MM-DD HH:mm:ss'),
            'err': err,
            'result': result,
            'execTime': execTime + ' ms'
        });
        process.exit(1);
    });
    return;
}//手动统计完

//自动统计
later.setInterval(function(){

    // 处理版本号
    var obj = new handleVersion();
    obj.run();

}, cronSched);

/**
 * 处理版本号
 *
 * @author xiaoyanchun
 */
function handleVersion(date) {
    var date = date || common.todayStartTime();
    var baseParams = {}; // 基础参数
    baseParams.startTime = date - 86400; // 昨天的开始时间
    baseParams.endTime = common.getDayEndTime(baseParams.startTime); // 昨天的最后时间

    var _this = this;
    //并发限制
    const EACH_LIMIT = 5;

    // 运行
    this.run = function(callback){
        var startTime = new Date().getTime();

        async.waterfall([
            function(callback){
                var params = extend({}, baseParams);
                console.log(common.date("Y-m-d H:i:s") + ' 开始处理: ' + JSON.stringify(params));
                somsVersion.getYesterdayAllVenue(params, function(err, result){
                    if (err) {
                        log.write('soms_version', 0, '获取昨天上传过消息的场馆列表出错', {err: err, params: params}, 'error');
                        callback(err, result);
                    } else {
                        callback(null, result);
                    }
                });

            }, function(venueList, callback){

                console.log('共: ' + venueList.length + ' 家场馆');

                if (venueList.length > 0) {
                    // 处理场馆列表
                    _this.handlerVenueList(venueList, callback);
                } else {
                    callback(null, null);
                }
            }
        ], function(err, result){

            if (err) {
                console.log('处理出错: ' + err);
                log.write('soms_version', 0, '获取昨天上传过消息的场馆列表出错', {err: err}, 'error');
            }

            var execTime = new Date().getTime() - startTime;

            console.log('处理完毕, 处理时间: ' + execTime + '毫秒');
            if(typeof callback == 'function'){
                callback(err,result);
            }
        });
    };

    /**
     * 处理场馆列表
     *
     * @param venueList
     * @param callback
     */
    this.handlerVenueList = function (venueList, callback) {

        async.forEachLimit(venueList,EACH_LIMIT, function(item, eachCallback) {
            var params = extend({}, baseParams);
            params.app_id = item.app_id;

            // 获取场馆最后一条消息
            somsVersion.getLastMessage(params, function(eachErr, eachResult){
                if (eachErr) {
                    log.write('soms_version', 0, 'handlerVenueList:查询最后一条消息:出错', {eachErr: eachErr, params: params}, 'error');
                    eachCallback(eachErr);
                } else {
                    if (eachResult.length > 0) { // 有最后一条记录
                        // 处理soms版本
                        _this.handlerSomsVersion(item.app_id, eachResult[0].message, eachCallback);
                    } else {
                        // 如果能统计到场馆， 证明有消息记录， 而此处没有，证明有异常
                        log.write('soms_version', 0, 'handlerVenueList:查询最后一条消息:返回数据异常', {params: params, eachResult: eachResult}, 'warn');
                        eachCallback(null);
                    }
                }
            });
        }, function(err) {
            if (err) {
                log.write('soms_version', 0, 'handlerVenueList:出错', {err: err}, 'error');
                callback(err, null);
            } else {
                callback(null, null);
            }
        });
    }

    /**
     * 处理 soms 版本
     *
     * @param appId
     * @param message
     * @param callback
     */
    this.handlerSomsVersion = function (appId, message, callback) {
        // 从message中获取soms完整版本号
        var somsFullVer = _this.getSomsVersion(message);

        if (somsFullVer) { // 获取版本号成功
            var params = {
                app_id: appId,
                soms_version: somsFullVer,
                is_new : _this.somsVersionIsNew(somsFullVer),
                date: baseParams.startTime
            };

            somsVersion.updateSomsVersion(params, function(err, result){
                if (err) {
                    log.write('soms_version', 0, 'handlerSomsVersion:出错', {err: err, params: params}, 'error');
                    callback(err);
                } else {
                    callback(null);
                }
            });
        }
    }

    /**
     * 从message中获取soms完整版本号
     *
     * @param message
     * @returns {string}
     */
    this.getSomsVersion = function (message) {

        try {
            var msgObj = JSON.parse(message);
        } catch (e) {
            console.log("解析message的json字符串失败");
            log.write('soms_version', 0, '解析message的json字符串失败', {message: message}, 'error');
            return '';
        }

        if (msgObj.length > 0 && msgObj[0].hasOwnProperty('Metadata') && msgObj[0].Metadata.hasOwnProperty('Version')) {
            return msgObj[0].Metadata.Version;
        }

        return '';
    }

    /**
     * 判断版本号是否是新版本
     *
     * @param somsFullVersion
     * @returns {number}
     */
    this.somsVersionIsNew = function (somsFullVersion){
        var tmp = somsFullVersion.split('.');
        var last = parseInt(tmp[tmp.length - 1]);

        if (isNaN(last)) {
            return 0;
        }

        if (last >= newSomsVersionNew) { // 是新版本
            return 1;
        } else {
            return 0;
        }
    }

}













