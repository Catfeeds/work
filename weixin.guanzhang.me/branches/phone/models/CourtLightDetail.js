var async = require('async');
var db = require('../models/db');
var log = require('../util/log');
var moment = require('moment');

var _tableName = 'court_light_detail';

var CourtLightDetail = function () {

    this.initData = function (order, soms) {
        var data = {
            venue_id: soms.venue_id,
            supplier_id: soms.supplier_id,
            soms_court_id: order.SomsCourtId || '',
            qyd_court_id: order.QydCourtId || '',
            court_name: order.CourtName || '',
            line_codes: order.LineCodes || '',
            light_status: order.LightStatus || 0,
            create_time: order.CreateTime ? moment(order.CreateTime).unix() : 0,
            create_by: order.CreateBy || ''
        };
        return data;
    };
    //插入或更新
    this.dealMessage = function (order, soms, callback) {
        var detail = this.initData(order, soms);
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
                    callback(err, info);
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
                    callback(err, info);
                });
            }
        });
    };
};
module.exports = new CourtLightDetail();