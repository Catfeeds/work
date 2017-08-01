/**
 *  node cron/rebuildReport.js date=2016-04-20 venue_id=1111
 * 重新生成统计报表
 * 支持一天一场馆
 * @type {later|exports|module.exports}
 */
var later = require('later');
var moment = require('moment');
var async = require('async');
var common = require('../util/common');
var venuesModel = require('../models/venues');
var ordersModel = require('../models/orders');
var messageModel = require('../models/message');
var IncomeReport = require('../models/IncomeReport');
var CourtLightReport = require('../models/CourtLightReport');
var GoodsSalesReport = require('../models/GoodsSalesReport');
var db = require('../models/db');

//取时间和场馆app_id
var date_time = 0;
var app_id = '';
var venue_id = 0;
var date = '';

var argvs = process.argv.slice(2);
if (argvs.length < 2) {
    console.log('缺少必要参数，请加上如：date=2016-04-22 venue_id=1111 [app_id=728553586b746cbe]');
    return;
}

for (var i = 0; i < argvs.length; i++) {
    var val = argvs[i].split('=');
    if (val.length < 2 || !val[0] || !val[1]) {
        console.log('缺少必要参数，请加上如：date=2016-04-22 venue_id=1111 [app_id=728553586b746cbe]');
        return;
    }
    if (val[0] == 'date') {
        date = val[1];
        date_time = moment(date).unix();
    }
    if (val[0] == 'app_id') {
        app_id = val[1];
    }
    if (val[0] == 'venue_id') {
        venue_id = val[1];
    }
}

if (!date_time || (!app_id && !venue_id)) {
    console.log('缺少必要参数，请加上如：date=2016-04-22 venue_id=1111 [app_id=728553586b746cbe]');
    return;
}
if (isNaN(date_time) || date_time < 0 || date_time > common.todayStartTime()) {
    console.log('只能统计' + moment().format('YYYY-MM-DD') + '之前的数据');
    return;
}

async.waterfall([
    function (asyncCallback) {
        //取场馆id
        venuesModel.getVenueInfo({app_id: app_id, venue_id: venue_id}, function (err, result) {
            if (!err && typeof result === 'object' && result.venue_id) {
                console.log('重新统计' + date + result.name + '的报表');
                venue_id = result.venue_id;
                app_id = result.app_id;
            } else {
                err = '场馆不存在';
            }
            asyncCallback(err, result);
        });
    },
    function (venueInfo, asyncCallback) {
        async.parallel({
            //删除该场馆当天的orders
            orders: function (callback) {
                var conn = db.getAdapter('report');
                conn.where({venue_id: venueInfo.venue_id, account_date: date_time})
                    .delete('orders', function (err, info) {
                        conn.disconnect();//释放
                        if (!err) {
                            console.log('删除' + date + venueInfo.name + '在orders表的' + info.affectedRows + '条记录');
                        }
                        callback(err);
                    });
            },
            //删除收入统计
            income: function (callback) {
                var conn = db.getAdapter('report');
                conn.where({venue_id: venueInfo.venue_id, date: date_time})
                    .delete('income_report', function (err, info) {
                        conn.disconnect();//释放
                        if (!err) {
                            console.log('删除' + date + venueInfo.name + '在income_report表的' + info.affectedRows + '条记录');
                        }
                        callback(err);
                    });
            },
            //删除时长统计
            courtLight: function (callback) {
                var conn = db.getAdapter('report');
                conn.where({venue_id: venueInfo.venue_id, date: date_time})
                    .delete('court_light_report', function (err, info) {
                        conn.disconnect();//释放
                        if (!err) {
                            console.log('删除' + date + venueInfo.name + '在court_light_report表的' + info.affectedRows + '条记录');
                        }
                        callback(err);
                    });
            },
            //删除商品统计
            goods: function (callback) {
                var conn = db.getAdapter('report');
                conn.where({venue_id: venueInfo.venue_id, date: date_time})
                    .delete('goods_sales_report', function (err, info) {
                        conn.disconnect();//释放
                        if (!err) {
                            console.log('删除' + date + venueInfo.name + '在goods_sales_report表的' + info.affectedRows + '记录');
                        }
                        callback(err);
                    });
            }
        }, function (err, results) {
            asyncCallback(err, venueInfo);
        });
    },
    function (venueInfo, asyncCallback) {
        //更改message2的状态
        var start_time = date_time - 7 * 24 * 60 * 60;
        var end_time = date_time + 24 * 60 * 60;
        var where = "app_id='" + venueInfo.app_id + "' AND client_time >" + start_time + " AND client_time<" + end_time;
        var conn = db.getAdapter('di');
        conn.where(where)
            .update('di_message2', {status: 1}, function (err, info) {
                conn.disconnect();//释放
                if (!err) {
                    console.log('更新di_message2的状态2=>1共' + info.affectedRows + '条记录');
                }
                asyncCallback(err, venueInfo);
            });
    },
    function (venueInfo, asyncCallback) {
        //处理orders
        var start_time = date_time - 7 * 24 * 60 * 60;
        var end_time = date_time + 24 * 60 * 60;
        var where = "app_id='" + app_id + "' AND client_time >" + start_time + " AND client_time<" + end_time;
        var conn = db.getAdapter('di');
        conn.where(where)
            .get('di_message2', function (err, results) {
                conn.disconnect();//释放
                if (!err) {
                    console.log('处理di_message2的消息共' + results.length + '条记录...');
                }
                messageModel.dealAllMsg(results, asyncCallback);
            });

    },
    function (result, asyncCallback) {
        console.log(date + '的报表正在重新统计...');
        //完成统计
        var condition = {venue_id: venue_id, date_time: date_time};
        async.parallel([
            function (callback) {
                IncomeReport.dealReport(condition, callback);
            },
            function (callback) {
                CourtLightReport.dealReport(condition, callback);
            },
            function (callback) {
                GoodsSalesReport.dealReport(condition, callback);
            }
        ], function (err, results) {
            asyncCallback(err, results);
        });

    }
], function (err, result) {
    console.log('重新统计完成');
    console.log(err || result);
    process.exit(1);
});

