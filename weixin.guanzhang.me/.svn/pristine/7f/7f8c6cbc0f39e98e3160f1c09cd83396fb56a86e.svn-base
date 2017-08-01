//场馆商品分类
var async = require('async');
var db = require('../models/db');
var log = require('../util/log');
var moment = require('moment');

var _tableName = 'venues_goods_category';


//初始化
var venues_category = function () {
    this.initData = function (category, soms) {
        var data = {
            supplier_id: soms.supplier_id,
            venues_id: soms.venue_id,
            code: category.Id || '',
            name: category.Name || '',
            display_sort: category.DisplaySort || -1,
            remark: category.Remark || '',
            last_modify_by: category.LastModifyBy || '',
            create_user: category.CreateBy || '', 
			parent_id : category.ParentId || 0,
			is_active : category.IsActive || 0,
			last_modify_time:  moment(category.LastModifyTime).unix() || 0,
            create_time: moment(category.CreateTime).unix() || 0
        };

        return data;
    };

    //insert
    this.dealMessage = function (category, soms, callback) {
        category = this.initData(category, soms);
        var where = {
            supplier_id: category.supplier_id,
            venues_id: category.venues_id,
            code: category.code
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
							log.write('message', 0, 'venues_goods_category_update',  {err: err, message: conn2._last_query()}, 'info');
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
						log.write('message', 0, 'venues_goods_category_insert',  {err: err, message: conn2._last_query()}, 'info');
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
            code: category.SourceId
        }).get(_tableName, function (err, result) {
            conn.disconnect();//释放			
            if (!err && result.length > 0) {
				var conn2 = db.getAdapter('report');
				var detail = {
						is_delete: 1
					};
				conn2.where({id: result[0]['id']}).update(_tableName, detail, function (err, info) {															
																						
					if (err) {
						log.write('message', 0, '删除商品分类：',  {err: err, message: conn2._last_query()}, 'info');
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

module.exports = new venues_category();