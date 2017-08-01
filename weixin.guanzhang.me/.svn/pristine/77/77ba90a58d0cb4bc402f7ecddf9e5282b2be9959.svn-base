var later = require('later');
var moment = require('moment');
var IncomeReport = require('../models/IncomeReport');
var CourtLigthReport = require('../models/CourtLightReport');
var GoodsSalesReport = require('../models/GoodsSalesReport');
var common = require('../util/common');
var async = require('async');

var date_time = 0;

//手动统计
var argvs = process.argv.slice(2);

if (argvs.length > 0) {
    var val = argvs[0].split('=');

    if (val.length < 2) {
        console.log('缺少统计日期,参数date=2016-04-25');
        return;
    }

    date_time = moment(val[1]).unix();

    if (val[0] != 'date' || !val[1] || isNaN(date_time) || date_time < 0 ||  date_time > common.todayStartTime()) {
        console.log('只能统计'+moment().format('YYYY-MM-DD')+'之前的数据');
        return;
    }

    // 生成数据
    generateData(date_time, function(){
        // 退出进程
        process.exit(1);
    });

    return;
}


// 凌晨4:00执行
var cronSched = later.parse.recur().on('04:00:00').time();

later.date.localTime();

// 只执行一次
later.setTimeout(function() {
    var dateArr = [];

    // 1461081600 (2016/4/20)  1440000000 (2015/8/20)
    for (var i = 1461081600; i >= 1440000000 ; i -= 86400) {
        dateArr.push(i);
    }

    var loopStartTime = new Date().getTime();

    // 循环同步执行
    async.forEachSeries(dateArr, function(item, callback){

            console.log('------日期: ' + common.date("Y-m-d", item));

            // 生成数据
            generateData(item, function(){
                callback(null);
            });
        },
        function(err){
            if (err) {
                console.log("循环出错");
                console.log(err);
            }

            var execTime = new Date().getTime() - startTime;

            console.log('循环结束, 总共执行: ' + execTime + 'ms');
            // 退出进程
            process.exit(1);
        });

}, cronSched);


// 生成报表数据
function generateData(date_time, asyncCallback) {

    async.parallel([
        // 生成收入数据
        function(callback){
            var startTime = new Date().getTime();

            IncomeReport.dealReport(date_time, function (err, result) {
                var execTime = new Date().getTime() - startTime;

                console.log({
                    'title': '生成收入数据',
                    'time': moment().format('YYYY-MM-DD HH:mm:ss'),
                    'err': err,
                    'result': result,
                    'execTime': execTime + ' ms'
                });

                callback(null, null);
            });
        },

        // 生成灯光数据
        function(callback){
            var startTime = new Date().getTime();

            CourtLigthReport.dealReport(date_time, function (err, result) {
                var execTime = new Date().getTime() - startTime;

                console.log({
                    'title': '生成灯光数据',
                    'time': moment().format('YYYY-MM-DD HH:mm:ss'),
                    'err': err,
                    'result': result,
                    'execTime': execTime + ' ms'
                });

                callback(null, null);
            });
        },

        // 生成商品销售数据
        function(callback){
            var startTime = new Date().getTime();

            GoodsSalesReport.dealReport(date_time, function(err, result){
                var execTime = new Date().getTime() - startTime;
                console.log({
                    'title': '生成商品数据',
                    'time': moment().format('YYYY-MM-DD HH:mm:ss'),
                    'err': err,
                    'result': result,
                    'execTime': execTime + ' ms'
                });

                callback(null, null);
            });
        }

    ], function(err, result){

        if (err) {
            console.log(err);
        }

        asyncCallback(null);
    });
}