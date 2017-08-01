var async = require('async');
var db = require('../models/db');
var log = require('../util/log');
var moment = require('moment');

var _tableName = 'court_order_detail';

var CourtOrderDetail = function () {

    this.initData = function (order, soms) {
        var data = {
            venue_id: soms.venue_id,
            supplier_id: soms.supplier_id,
            order_id: order.OrderId || '',
            soms_court_id: order.SomsCourtId || '',
            qyd_court_id: order.QydCourtId || '',
            court_name: order.CourtName || '',
            price: order.Price || 0,
            begin_time: order.TimeBegin ? moment(order.TimeBegin).unix() : 0,
            end_time: order.TimeEnd ? moment(order.TimeEnd).unix() : 0
        };
        return data;
    };
    //插入或更新
    this.dealMessage = function (order, soms, callback) {
        var task = [];
        if (order.length > 0) {
            for (var i = 0; i < order.length; i++) {
                task.push(this.initData(order[i], soms));
            }
        }
        async.each(task, function (detail, asyncCallback) {
            var conn = db.getAdapter('report');
            conn.where(detail).get(_tableName, function (err, result) {
                conn.disconnect();//释放
                if (!err && result.length > 0) {
                    detail.last_update_time = moment().unix();
                    var conn2 = db.getAdapter('report');
                    conn2.where({id: result[0]['id']}).update(_tableName, detail, function (err, info) {
                        if (err) {
                            info = {last_query: conn2._last_query()};
                        }
                        conn2.disconnect();//释放
                        asyncCallback(err, info);
                    });
                } else {
                    detail.add_time = moment().unix();
                    detail.last_update_time = moment().unix();
                    var conn2 = db.getAdapter('report');
                    conn2.insert(_tableName, detail, function (err, info) {
                        if (err) {
                            info = {last_query: conn2._last_query()};
                        }
                        conn2.disconnect();//释放
                        asyncCallback(err, info);
                    });
                }
                //console.log(db._last_query());
            });
        }, function (err) {
            callback(err);
        });
    };
};
module.exports = new CourtOrderDetail();