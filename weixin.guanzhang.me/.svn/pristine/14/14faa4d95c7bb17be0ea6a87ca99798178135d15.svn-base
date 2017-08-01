var async = require('async');
var db = require('../models/db');
var log = require('../util/log');
var moment = require('moment');

var _tableName = 'goods_inventory';

var GoodsInventory = function () {
    var self = this;
    this.initData = function (order, soms) {
        var data = {
            venue_id: soms.venue_id,
            supplier_id: soms.supplier_id,
            catalog_id: order.CatalogId || '',
            catalog_name: order.CatalogName || '',
            goods_id: order.GoodsId || '',
            goods_name: order.GoodsName || '',
           // create_time: order.CreateTime || 0,
            stock_count: order.StockCount || 0,
			//新增部分
			unit_price: order.UnitPrice || 0,
			cost_price: order.CostPrice || 0,
			create_time: moment(order.CreateTime).unix() || 0
        };
        return data;
    };
    //插入或更新
    this.dealMessage = function (order, soms, callback) {
        var detail = self.initData(order, soms);
        var conn = db.getAdapter('report');
        conn.where({
            venue_id: detail.venue_id,
            supplier_id: detail.supplier_id,
            goods_id: detail.goods_id
        }).get(_tableName, function (err, result) {
            conn.disconnect();//释放
            if (!err && result.length > 0) {
                if (detail.create_time > result[0].create_time) {
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
                    callback(err, result);
                }
            } else {
                detail.last_update_time = moment().unix();
				detail.add_time = moment().unix();
                var conn2 = db.getAdapter('report');
                conn2.insert(_tableName, detail, function (err, info) {
                    if (err) {
                        info = {last_query: conn2._last_query()};
                    }
                    conn2.disconnect();//释放
                    callback(err, info)
                });
            }
        });

    };
	
	this.deleteInfo = function (order, soms, callback) {
        var conn = db.getAdapter('report');
        conn.where({
            venue_id: soms.venue_id,
            supplier_id: soms.supplier_id,
            goods_id: order.SourceId
        }).get(_tableName, function (err, result) {
            conn.disconnect();//释放			
            if (!err && result.length > 0) {
				var conn2 = db.getAdapter('report');
				var detail = {
						is_delete: 1
					};
				conn2.where({id: result[0]['id']}).update(_tableName, detail, function (err, info) {																
																						
					if (err) {
						log.write('message', 0, '删除库存：', conn2._last_query(), 'info');
					}
					conn2.disconnect();//释放
					callback(err, info);
				});         
            } 
			else {
                   callback(err, result);  
            }
        });

    };
};
module.exports = new GoodsInventory();