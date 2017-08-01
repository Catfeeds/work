var async = require('async');
var db = require('../models/db');
var log = require('../util/log');
var moment = require('moment');
var common = require('../util/common');

var _tableName = 'court_light_report';

//开灯状态
const LIGHT_OPEN = 1;
//关灯状态
const LIGHT_CLOSE = 0;
//并发限制
const EACH_LIMIT = 3;

var CourtLightReport = function () {
    var self = this;

    this.initData = function (order) {
        var data = {
            venue_id: order.venue_id,
            supplier_id: order.supplier_id,
            soms_court_id: order.soms_court_id,
            qyd_court_id: order.qyd_court_id,
            court_name: order.court_name
        };
        return data;

    };
    //插入数据
    this.insertData = function (data, callback) {
        var conn = db.getAdapter('report');
        conn.where({
            venue_id: data.venue_id,
            supplier_id: data.supplier_id,
            soms_court_id: data.soms_court_id,
            date: data.date
        }).get(_tableName, function (err, result) {
            conn.disconnect();//释放
            if (!err && result.length > 0) {
                data.last_update_time = moment().unix();
                var conn2 = db.getAdapter('report');
                conn2.where({id: result[0]['id']}).update(_tableName, data, function (err, info) {
                    if (err) {
                        info = {last_query: conn2._last_query()};
                    }
                    conn2.disconnect();//释放
                    callback(err, info);
                });
            } else {
                data.add_time = moment().unix();
                data.last_update_time = moment().unix();
                var conn2 = db.getAdapter('report');
                conn2.insert(_tableName, data, function (err, info) {
                    if (err) {
                        info = {last_query: conn2._last_query()};
                    }
                    conn2.disconnect();//释放
                    callback(err, info);
                });
            }
        });
    };
    //处理一天的订单时长和开灯时长
    this.dealReport = function (input, callback) {
        async.series([
            //先清掉报表
            function (asyncCallback) {
                self.clearReport(input, asyncCallback);
            },
            function (asyncCallback) {
                self.dealOrderDay(input, asyncCallback);
            },
            function (asyncCallback) {
                self.dealLightDay(input, asyncCallback);
            }
        ], function (err, results) {
            callback(err, results);
        });
    };
    //清掉当天的统计
    this.clearReport = function(input,callback){
        var date_time = 0, venue_id = 0;
        if (typeof input === 'object') {
            date_time = input.date_time;
            venue_id = input.venue_id;
        } else {
            date_time = input;
        }
        if(date_time == 0){
            callback('params error','参数错误');
        }
        var where = {date:date_time};
        if (venue_id) {
            where.venue_id = venue_id;//统计日期
        }
        var conn = db.getAdapter('report');
        conn.where(where)
            .delete(_tableName,function(err,info){
                conn.disconnect();//释放
                if(!err){
                    info = '清除'+common.date('Y-m-d',date_time)+'的court_light_report表数据'+info.affectedRows+'条';
                }
                callback(err,info);
            });
    };

    //处理一天的场馆订单
    this.dealOrderDay = function (input, callback) {
        //取可统计的场地订单
        var where = {
            source_name: '110000',//场地订单
            order_catalog: [3,6],//场地订单+人次订单
            order_status: 2,//已完成订单
            pay_status: 0, //已支付
            is_delete: 0 //未删除
        };

        var date_time = 0, venue_id = 0;
        if (typeof input === 'object') {
            date_time = input.date_time;
            venue_id = input.venue_id;
        } else {
            date_time = input;
        }
        if (venue_id) {
            where.venue_id = venue_id;//统计日期
        }
        where.account_date = date_time;//统计日期

        var log_pre = '统计' + moment.unix(date_time).format('YYYY-MM-DD') + '的场馆订单时长;';
        var conn = db.getAdapter('report');
        conn.select('supplier_id,venue_id,order_id')
            .where(where)
            .get('orders', function (err, results) {
                var err_msg = err ? log_pre + '最后查询SQL:' + conn._last_query() : '';
                conn.disconnect();//释放
                var select_sum = 0;
                var log_msg = log_pre + '成功统计:' + select_sum + '条订单';
                if (!err && results.length > 0) {
                    var orders = {};
                    for (var i = 0; i < results.length; i++) {
                        select_sum++;
                        if (orders[results[i].venue_id] === undefined) {
                            orders[results[i].venue_id] = {
                                venue_id: results[i].venue_id,
                                supplier_id: results[i].supplier_id,
                                date_time: date_time,
                                order_ids: [results[i].order_id]
                            }
                        } else {
                            orders[results[i].venue_id].order_ids.push(results[i].order_id);
                        }
                    }
                    async.forEachOfLimit(orders, EACH_LIMIT, function (item, key, asyncCallback) {
                        self.dealCourtOrder(item, asyncCallback);
                    }, function (err) {
                        if (err) {
                            callback(err, log_msg + '，失败SQL' + err_msg);
                            return;
                        }
                        log_msg = log_pre + '成功统计:' + select_sum + '条订单';
                        callback(err, log_msg);
                    });
                    return;
                }
                callback(err, log_msg);
            });
    };

    //从数据库统计一个场馆一个场地一天订单时长
    this.dealCourtOrder = function (input, callback) {
        //一条一条订单处理
        var task = [];
        for (var i = 0; i < input.order_ids.length; i++) {
            task.push({
                venue_id: input.venue_id,
                supplier_id: input.supplier_id,
                order_id: input.order_ids[i],
                invalid: 0
            });
        }
        //一条一条订单顺序处理
        async.eachSeries(task, function (item, asyncCallback) {
            //查出单个订单的场地时长
            var conn = db.getAdapter('report');
            conn.select("supplier_id,venue_id,soms_court_id,qyd_court_id,court_name,SUM(price) AS order_amount, SUM(FLOOR((end_time-begin_time)/60)) AS order_time_total,"
                + "GROUP_CONCAT('[',FLOOR((begin_time-" + input.date_time + ")/60),',',FLOOR((end_time-" + input.date_time + ")/60),']') AS order_time_list")
                .where(item)
                .group_by(['soms_court_id'])
                .get('court_order_detail', function (err, results) {
                    conn.disconnect();//释放
                    var courtTask = [];
                    if (!err && results.length > 0) {
                        for (var i = 0; i < results.length; i++) {
                            if(results[i].soms_court_id){
                                results[i].date = input.date_time;
                                courtTask.push(results[i]);
                            }
                        }
                    }
                    //一条订单中按场地数并发处理
                    async.each(courtTask, function (item, callback) {
                        updateOneCourtOrder(item, callback);
                    }, function (err) {
                        asyncCallback(err);
                    });
                });
        }, function (err) {
            callback(err);
        });
    };
    //处理单个场地的订单时长和列表
    function updateOneCourtOrder(item, callback) {
        var log_msg = 'updateOneCourtOrder:SQL-';
        async.waterfall([
            function (callback) {
                //是否有统计记录
                var conn = db.getAdapter('report');
                conn.where({
                    venue_id: item.venue_id,
                    supplier_id: item.supplier_id,
                    soms_court_id: item.soms_court_id,
                    date: item.date
                }).get(_tableName, function (err, result) {
                    log_msg = err ? conn._last_query() : log_msg;
                    conn.disconnect();//释放
                    var reportData = null;
                    if (!err && result.length > 0) {
                        reportData = result[0];
                    }
                    console.log(err);
                    callback(err, reportData);
                });
            },
            function (reportData, callback) {
                if (reportData === null) {
                    //新记录,直接插入
                    item.add_time = moment().unix();
                    item.last_update_time = moment().unix();
                    item.order_time_list = '[' + item.order_time_list + ']';
                    var conn = db.getAdapter('report');
                    conn.insert(_tableName, item, function (err, info) {
                        log_msg = err ? conn._last_query() : log_msg;
                        conn.disconnect();//释放
                        console.log(err);
                        callback(err, info);
                    });
                    return;
                }
                //旧记录，更新处理
                //重新统计时未统计过的就处理
                reportData.order_time_list = reportData.order_time_list ? reportData.order_time_list : '';
                if (reportData.order_time_list && reportData.order_time_list.indexOf(item.order_time_list) == -1) {
                    item.order_time_total = parseInt(item.order_time_total) + parseInt(reportData.order_time_total);
                    item.order_time_list = reportData.order_time_list.slice(0, -1) + ',' + item.order_time_list + ']';
                    item.last_update_time = moment().unix();
                    var conn = db.getAdapter('report');
                    conn.where({id: reportData['id']}).update(_tableName, item, function (err, info) {
                        log_msg = err ? conn._last_query() : log_msg;
                        conn.disconnect();//释放
                        console.log(err);
                        callback(err, info);
                    });
                    return;
                }
                //处理完毕
                callback(null, log_msg);
            }
        ], function (err, result) {
            if (err) {
                log.write('CourtLightReport', 0, '更新订单时长出错', {err: err, result: result, log_msg: log_msg}, 'error');
            }
            callback(err, log_msg);
        });
    }

    //处理一天的开灯时长
    this.dealLightDay = function (input, callback) {
        var date_time = 0, venue_id = 0;
        if (typeof input === 'object') {
            date_time = input.date_time;
            venue_id = input.venue_id;
        } else {
            date_time = input;
        }
        var end_time = parseInt(date_time) + 24 * 60 * 60;

        var log_pre = '统计' + moment.unix(date_time).format('YYYY-MM-DD') + '的场馆开灯时长;';
        var where = 'invalid=0 AND create_time>=' + date_time + ' AND create_time<' + end_time;
        where = venue_id == 0 ? where : where + ' AND venue_id=' + venue_id;

        var conn = db.getAdapter('report');
        conn.select('supplier_id,venue_id,soms_court_id,qyd_court_id')
            .where(where)
            .group_by(['supplier_id', 'venue_id', 'soms_court_id'])
            .get('court_light_detail', function (err, results) {
                var last_query = err ? conn._last_query() : '';
                conn.disconnect();//释放
                var origin_sum = 0;
                var log_msg = log_pre + '入库成功:处理灯控数据' + origin_sum + '条';
                if (!err && results.length > 0) {
                    var task = [];
                    for (var i = 0; i < results.length; i++) {
                        origin_sum++;
                        results[i].date_time = date_time;
                        task.push(results[i]);
                    }
                    async.eachLimit(task, EACH_LIMIT, function (item, asyncCallback) {
                        self.dealCourtLight(item, asyncCallback);
                    }, function (err) {
                        log_msg = log_pre + '入库成功:处理灯控数据' + origin_sum + '条';
                        callback(err, log_msg);
                    });
                    return;
                }
                callback(err, log_msg);
            });
    };

    //从数据库统计一个场馆一个场地一天开灯时长
    this.dealCourtLight = function (input, callback) {
        var day_end_time = parseInt(input.date_time) + 24 * 60 * 60;
        //统计当天的就用统计时作结束
        if (input.date_time == common.todayStartTime()) {
            day_end_time = moment().unix();
        }
        //统计订单时长
        var conn = db.getAdapter('report');
        conn.where(
            "venue_id='" + input.venue_id
            + "' AND supplier_id='" + input.supplier_id
            + "' AND soms_court_id='" + input.soms_court_id
            + "' AND invalid=0 "
            + " AND create_time>=" + input.date_time
            + " AND create_time<" + day_end_time
        ).order_by(['create_time ASC'])
            .get('court_light_detail', function (err, results) {
                var last_query = err ? conn._last_query() : '';
                conn.disconnect();//释放
                var result = {origin_sum: 0, select_sum: 0, insert_sum: 0};
                if (err) {
                    callback(err, result);
                    return;
                }
                var one_sum = 0;
                if (!err && results.length > 0) {
                    result.origin_sum = results.length;
                    var time_sum = 0;
                    var time_list = [], open_time = null, close_time = null, light_status = null;
                    for (var i = 0; i < results.length; i++) {
                        //暂存开灯状态
                        if (results[i].light_status == LIGHT_OPEN) {
                            light_status = results[i].light_status;
                            //转成分钟
                            open_time = parseInt((results[i].create_time - input.date_time) / 60);
                        }
                        //关灯且上一状态为开灯
                        if (results[i].light_status == LIGHT_CLOSE && light_status !== null) {
                            close_time = parseInt((results[i].create_time - input.date_time) / 60)
                            one_sum = close_time - open_time;
                            if (one_sum >= 1) {//只取大于1分钟
                                time_sum += one_sum;
                                time_list.push([open_time, close_time]);
                            }
                            //清掉状态
                            light_status = null;
                        }
                    }
                    //最后一个状态是开，以当天24点为结束时间
                    if (light_status !== null) {
                        close_time = parseInt((day_end_time - input.date_time) / 60);
                        one_sum = close_time - open_time;
                        if (one_sum >= 1) {//只取大于1分钟
                            time_sum += one_sum;
                            time_list.push([open_time, close_time]);
                        }
                    }
                    //只保存正常的数据
                    if (time_sum > 0) {
                        result.select_sum = 1;
                        var init_data = self.initData(results[0]);
                        init_data.date = input.date_time;
                        init_data.light_time_list = JSON.stringify(time_list);
                        init_data.light_time_total = time_sum;
                        //入库
                        self.insertData(init_data, function (err) {
                            if (!err) {
                                result.insert_sum = 1;
                            }
                            callback(err, result);
                        });
                        return;
                    }
                    callback(err, result);
                    return;
                }
                callback(err, result);
            });
    };
//CourtLightReport
};
//导出
module.exports = new CourtLightReport();