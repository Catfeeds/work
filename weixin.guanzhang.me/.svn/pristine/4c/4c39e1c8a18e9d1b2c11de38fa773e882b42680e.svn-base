var async = require('async');
var db = require('../models/db');
var log = require('../util/log');
var moment = require('moment');

var _tableName = 'goods_inventory_log';

var GoodsInventoryLog = function () {
    var self = this;
    this.initData = function (order, soms) {
        var data = {
            venue_id: soms.venue_id,
            supplier_id: soms.supplier_id,
            catalog_code: order.GoodsCatalog || '',	
            goods_id: order.GoodsId || '',	
            goods_name: order.GoodsName || '',			
            stock_count: order.NewStock || 0,
			incr_stock_count: order.StockIn || 0,
			decr_stock_count: order.StockOut || 0,	
			operator: order.CreateBy || '',	
			create_time: moment(order.CreateTime).unix() || 0,
			operate_type : order.OperateType || 0,
			remark: order.Remark || ''
        };
        return data;	
    };
    //插入或更新
    this.dealMessage = function (order, soms, callback) {
        var detail = self.initData(order, soms);
		
        var conn = db.getAdapter('report');
        conn.where(detail).get(_tableName, function (err, result) {
												 
            conn.disconnect();//释放
            if (!err && result.length > 0) {
                if (detail.add_time > result[0].add_time) {
                    var conn2 = db.getAdapter('report');
					detail.add_time = moment().unix();
                    conn2.where({id: result[0]['id']}).update(_tableName, detail, function (err, info) {
                        if (err) {
                            info = {last_query: conn2._last_query()};
							log.write('message', 0, 'update库存流水', {err: err, message: conn2._last_query()}, 'info');	
                        }
                        conn2.disconnect();//释放
                        callback(err, info);
                    });
                } else {
                    callback(err, result);
                }
            } else {
                var conn2 = db.getAdapter('report');
				detail.add_time = moment().unix();
                conn2.insert(_tableName, detail, function (err, info) {
                    if (err) {
                        info = {last_query: conn2._last_query()};
						log.write('message', 0, 'insert库存流水', {err: err, message: conn2._last_query()}, 'info');	
                    }
                    conn2.disconnect();//释放
                    callback(err, info)
                });
            }
            //console.log(db._last_query());
        });

    };
};
module.exports = new GoodsInventoryLog();