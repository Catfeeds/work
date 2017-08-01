var async = require('async');
var db = require('../models/db');
var log = require('../util/log');
var moment = require('moment');

var _tableName = 'goods_sales_report';
//并发限制
const EACH_LIMIT = 3;

var GoodsSalesReport = function () {
    var self = this;

    this.initData = function (order) {
        return order;
    };
    //插入数据
    this.insertData = function (data, callback) {
        var conn = db.getAdapter('report');
        conn.where({
            venue_id: data.venue_id,
            supplier_id: data.supplier_id,
            goods_id: data.goods_id,
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
    //处理一天
    this.dealReport = function (input, callback) {
        this.dealOrderDay(input, callback);
    };

    //处理一天的商品订单
    this.dealOrderDay = function (input, callback) {
        var where = {
            source_name: '110000',//商品订单
            order_catalog: 1,//商品订单
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
            where.venue_id = venue_id;
        }
        where.account_date = date_time;//统计日期

        var log_pre = '统计' + moment.unix(date_time).format('YYYY-MM-DD') + '的商品销量';
        //取可统计的商品订单
        var conn = db.getAdapter('report');
        conn.select('supplier_id,venue_id,order_id')
            .where(where)
            .get('orders', function (err, results) {
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
                    async.eachOfLimit(orders, EACH_LIMIT, function (item, key, asyncCallback) {
                        self.dealGoodsOrder(item, asyncCallback);
                    }, function (err) {
                        var log_msg = log_pre + '成功统计:' + select_sum + '条订单';
                        callback(err, log_msg);
                    });
                    return;
                }
                callback(err, log_msg);
            });

    };

    //从数据库统计一个场馆一天订单销量
    this.dealGoodsOrder = function (input, callback) {
        var orderIdsArr = input.order_ids;
        //统计订单时长
        var conn = db.getAdapter('report');
        conn.select("supplier_id,venue_id,catalog_id,catalog_name,goods_id,goods_name,SUM(count) AS sales_volume")
            .where(
            "venue_id=" + input.venue_id
            + " AND supplier_id=" + input.supplier_id
            + " AND order_id IN('" + orderIdsArr.join("','") + "')"
            + " AND invalid=0 ")
            .group_by(['venue_id', 'goods_id'])
            .get('goods_order_detail', function (err, results) {
                conn.disconnect();//释放
                var result = {select_sum: 0, insert_sum: 0};
                if (err) {
                    callback(err, result);
                    return;
                }
                if (results.length > 0) {
                    result.select_sum = results.length;
                    var task = [];
                    for (var i = 0; i < results.length; i++) {
                        results[i].date = input.date_time;
                        task.push(results[i]);
                    }
                    async.eachLimit(task, EACH_LIMIT, function (item, asyncCallback) {
                        //取库存
                        var conn = db.getAdapter('report');
                        conn.select("stock_count")
                            .where({venue_id: item.venue_id, goods_id: item.goods_id})
                            .order_by('create_time')
                            .get('goods_inventory', function (error, results) {
                                conn.disconnect();//释放
                                var stock_count = 0;
                                if (!error && results.length > 0) {
                                    stock_count = results[0].stock_count;
                                }
                                item.stock_count = stock_count;
                                //入库
                                self.insertData(item, asyncCallback);
                            });
                    }, function (err) {
                        if (!err) {
                            result.insert_sum = result.select_sum;
                        }
                        callback(err, result);
                    });
                    return;
                }
                callback(err, result);
            });
    };

};
//导出
module.exports = new GoodsSalesReport();