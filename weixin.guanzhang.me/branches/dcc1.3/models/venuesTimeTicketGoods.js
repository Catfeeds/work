//场馆人次票 商品
var async = require('async');
var db = require('../models/db');
var log = require('../util/log');
var moment = require('moment');

var _tableName = 'venues_time_ticket_goods';


//初始化
var venues_time_ticket_goods = function () {
    this.initData = function (category, soms) {
        var data = {
            supplier_id: soms.supplier_id,
            venues_id: soms.venue_id,
            goods_id: category.GoodsId || '',
			sport_catalog: parseInt(category.SportCatalogCode) || 0,
			code: category.Code || '',
            full_name: category.FullName || '',
			simple_name: category.SimpleName || '',
			price: category.Price || 0,
			status: category.Status || 0,
			goods_catalog: category.GoodsCatalog || 0,
            remark: category.Remark || '',
            create_user: category.CreateBy || '', 
			create_time: moment(category.CreateTime).unix() || 0,
            last_modify_by: category.LastModifyBy || '',
			last_modify_time:  moment(category.LastModifyTime).unix() || 0
        };

        return data;
    };

    //insert
    this.dealMessage = function (category, soms, callback) {
        category = this.initData(category, soms);
        var where = {
            supplier_id: category.supplier_id,
            venues_id: category.venues_id,
            goods_id: category.goods_id
        };
        //是否已存在
        var conn = db.getAdapter('report');
        conn.where(where).get(_tableName, function (err, result) {
            conn.disconnect();//释放
			
            if (!err && result.length > 0) {
                if (category.last_modify_time >= result[0].last_modify_time) {
                    var conn2 = db.getAdapter('report');
                    conn2.where({id: result[0].id}).update(_tableName, category, function (err, info) {
                        if (err) {
							log.write('message', 0, 'venues_time_ticket_goods_update',  {err: err, message: conn2._last_query()}, 'info');
                        }
                        conn2.disconnect();//释放
                        callback(err, info)
                    });
                } else {
                    //旧状态，不处理
                    callback(err, result);
                }
            } else {
                //入库
                var conn2 = db.getAdapter('report');
				category.add_time = moment().unix();
                conn2.insert(_tableName, category, function (err, info) {
                    if (err) {
						log.write('message', 0, 'venues_time_ticket_goods_insert',  {err: err, message: conn2._last_query()}, 'info');
                    }
                    conn2.disconnect();//释放
                    callback(err, info);
                });
            }
        });
    };
	
	this.deleteInfo = function (category, soms, callback) {
        var conn = db.getAdapter('report');
        conn.where({
            supplier_id: soms.supplier_id,
            venues_id: soms.venue_id,
            goods_id: category.goods_id
        }).get(_tableName, function (err, result) {
            conn.disconnect();//释放			
            if (!err && result.length > 0) {
				var conn2 = db.getAdapter('report');
				var detail = {
						is_delete: 1
					};
				conn2.where({id: result[0]['id']}).update(_tableName, detail, function (err, info) {															
																						
					if (err) {
						log.write('message', 0, '删除人次票商品：',  {err: err, message: conn2._last_query()}, 'info');
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

module.exports = new venues_time_ticket_goods();