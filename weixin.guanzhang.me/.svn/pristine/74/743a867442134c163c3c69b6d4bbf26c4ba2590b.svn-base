var later = require('later');
var $sendReport = require('../models/sendReport');
var $common = require('../util/common');
var moment = require('moment');
var limit = 100;//每次取消息数

var date_time = $common.todayStartTime();
var startTime = new Date().getTime();

//手动推送
var argvs = process.argv.slice(2);
if (argvs.length > 0) {
    var venueId = 0;
    var openId = '';
    var val = argvs[0].split('=');
    if (val.length < 2) {
        console.log('缺少推送场馆id或open_id,参数venue_id=323 [open_id=xxxxxxx]');
        return;
    }
    if(val[0] == 'open_id'){
        openId = val[1];
    }
    if(val[0] == 'venue_id'){
        venueId = val[1];
    }
    if(venueId){
        $sendReport.sendOneVenue(venueId,date_time, function (err, result) {
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
    }
    if(openId){
        $sendReport.sendOneOpenId(openId,date_time, function (err, result) {
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
    }
}//手动推送完

//每天22:30推送
var cronSched = later.parse.recur().on('22:30:00').time();
//测试环境30分钟执行
var env = process.env.NODE_ENV;
if(env == 'development'){
    cronSched = later.parse.recur().every(30).minute();
}
//cronSched = later.parse.recur().every(1).second();
later.date.localTime();
later.setInterval(function(){
    var startTime = new Date().getTime();
    var date_time = $common.todayStartTime();
    $sendReport.sendAll(date_time, function(err, data){
        var execTime = new Date().getTime() - startTime;
        console.log({'time':Date(), 'err':err, 'data':data, 'execTime':execTime + ' ms'});
    });
}, cronSched);
