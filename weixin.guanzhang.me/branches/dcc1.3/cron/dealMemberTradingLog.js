//单独处理会员交易日志
var later = require('later');
var message = require('../models/messageMember');
var limit = 100;//每次取消息数

var timeStep = 10; //每隔几秒运行
var sched = later.parse.recur().every(timeStep).second();
later.setInterval(function(){
    var startTime = new Date().getTime();
    message.init(limit, function(err, data){
        var execTime = new Date().getTime() - startTime;
        console.log({'time':Date(), 'err':err, 'data':data, 'execTime':execTime + ' ms'});
    });
}, sched);