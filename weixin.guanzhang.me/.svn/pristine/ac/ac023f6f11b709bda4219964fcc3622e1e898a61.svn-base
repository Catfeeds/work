//场馆次卡商品
var async = require('async');
var db = require('../models/db');
var log = require('../util/log');
var moment = require('moment');

var _tableName = 'venues_card_count_good';
//`code`, `name`, `full_name`, `price`, `count_value`, `sport_catalog`, `venues_id`, `supplier_id`, `status`, `display_sort`, `remark`, `op_time`, `op_user`, `create_user`, `add_time`

//初始化
var venues_card_count = function () {
    this.initData = function (card_count, soms) {
        var data = {
            supplier_id: soms.supplier_id,
            venues_id: soms.venue_id,
            code: card_count.Id || '',
            name: card_count.SimpleName || '',
			full_name: card_count.FullName || '',
            price: card_count.Price || 0,			
			count_value: card_count.CountValue || 0,	
            sport_catalog: parseInt(card_count.SportCatalog) || 0,
			status: card_count.Status || '',
            display_sort: card_count.DisplaySort || -1,
            remark: card_count.Remark || '',
            last_modify_by: card_count.LastModifyBy || '',
            create_user: card_count.CreateBy || '', 
			last_modify_time:  moment(card_count.LastModifyTime).unix() || 0,
            create_time: moment(card_count.CreateTime).unix() || 0
        };

        return data;
    }; 
                    
    //insert
    this.dealMessage = function (card_count, soms, callback) {
        card_count = this.initData(card_count, soms);
        var where = {
            supplier_id: card_count.supplier_id,
            venues_id: card_count.venues_id,
            code: card_count.code
        };
        //是否已存在
        var conn = db.getAdapter('report');
        conn.where(where).get(_tableName, function (err, result) {
        	console.log(conn._last_query());
            conn.disconnect();//释放
            if (!err && result.length > 0) {
                //if (card_count.last_modify_time >= result[0].last_modify_time) {
                    var conn2 = db.getAdapter('report');
                    conn2.where({id: result[0].id}).update(_tableName, card_count, function (err, info) {
                        if (err) {
							log.write('message', 0, 'update会员次卡：', {err: err, message: conn2._last_query()}, 'info');
                        }
                        conn2.disconnect();//释放
                        callback(err, info);
                    });
                /*} else {
                    //旧状态，不处理
                    callback(err, result);
                }*/
            } else {
                //入库
                var conn2 = db.getAdapter('report');
				card_count.add_time = moment().unix();
                conn2.insert(_tableName, card_count, function (err, info) {
                    if (err) {
						log.write('message', 0, 'insert会员次卡：',  {err: err, message: conn2._last_query()}, 'info');
                    }
                    conn2.disconnect();//释放
                    callback(err, info);
                });
            }
        });
    };
	
	this.deleteInfo = function (card_count, soms, callback) {
        var conn = db.getAdapter('report');
        conn.where({
            supplier_id: soms.supplier_id,
            venues_id: soms.venue_id,
            code: card_count.SourceId
        }).get(_tableName, function (err, result) {
            conn.disconnect();//释放			
            if (!err && result.length > 0) {
				var conn2 = db.getAdapter('report');
				var detail = {
						is_delete: 1
					};
				conn2.where({id: result[0]['id']}).update(_tableName, detail, function (err, info) {																																			
					if (err) {
						log.write('message', 0, '删除会员次卡：',  {err: err, message: conn2._last_query()}, 'info');
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

module.exports = new venues_card_count();