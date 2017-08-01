var later = require('later');
var moment = require('moment');
var IncomeReport = require('../models/IncomeReport');
var common = require('../util/common');

var date_time = 0;
var startTime = new Date().getTime();

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
    IncomeReport.dealReport(date_time, function (err, result) {
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

//每个小执行统计当天数据
var cronSched = later.parse.recur().on(59).minute().on(59).second();

var env = process.env.NODE_ENV;
if(env == 'development'){
    //cronSched = later.parse.recur().every(10).minute();
    cronSched = later.parse.recur().on(59).minute().on(59).second();
}

//测试每分钟执行一次
//cronSched = later.parse.recur().on('10:40:00').time();
//cronSched = later.parse.recur().every(10).minute();

later.date.localTime();
later.setInterval(function () {
    var runTime = moment().format('YYYY-MM-DD HH:mm:ss');
    var startTime = new Date().getTime();
    var date_time = common.todayStartTime();
    IncomeReport.dealReport(date_time, function (err, result) {
        var execTime = new Date().getTime() - startTime;
        console.log({
            'time': runTime,
            'err': err,
            'result': result,
            'execTime': execTime + ' ms'
        });
    });
}, cronSched);