//场馆会员卡类型
var async = require('async');
var db = require('../models/db');
var log = require('../util/log');
var moment = require('moment');

var _tableName = 'venues_card_type';
//`code`, `name`, `display_sort`, `venues_id`, `supplier_id`, `remark`, `op_time`, `op_user`, `create_user`, `add_time`

//初始化
var venues_card_type = function () {
    this.initData = function (card, soms) {
        var data = {
            supplier_id: soms.supplier_id,
            venues_id: soms.venue_id,
            code: card.Id || '',
            name: card.Name || '',
            display_sort: card.DisplaySort || -1,
            remark: card.Remark || '',
            last_modify_by: card.LastModifyBy || '',
            create_user: card.CreateBy || '', 
			last_modify_time:  moment(card.LastModifyTime).unix() || 0,
            create_time: moment(card.CreateTime).unix() || 0
        };
        return data;
    };

	/*this.getCardCode = function (card_name, soms) {
		 var where = {
            name: card_name
        };
		 var conn = db.getAdapter('report');
         conn.select('code').where(where).get(_tableName, function (err, result) {
            conn.disconnect();//释放
            var res = [];
            if (!err && result.length > 0) {
                res = result[0].code;
            } else { // 查询出错
                log.write('venuesCardType', 0, '取会员卡类型出错', {err: err}, 'error');
            }

            //callback(err, result);
        });
	};*/
    //insert
    this.dealMessage = function (card, soms, callback) {
        card = this.initData(card, soms);
        var where = {
            supplier_id: card.supplier_id,
            venues_id: card.venues_id,
            code: card.code
        };
        //是否已存在
        var conn = db.getAdapter('report');
        conn.where(where).get(_tableName, function (err, result) {
            conn.disconnect();//释放
            if (!err && result.length > 0) {
                if (card.last_modify_time >= result[0].last_modify_time) {
                    var conn2 = db.getAdapter('report');
                    conn2.where({id: result[0].id}).update(_tableName, card, function (err, info) {
                        if (err) {
							log.write('message', 0, 'update会员卡类型：', {err: err, message: conn2._last_query()} , 'info');
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
				card.add_time = moment().unix();
                conn2.insert(_tableName, card, function (err, info) {
                    if (err) {
						log.write('message', 0, 'insert会员卡类型：', {err: err, message: conn2._last_query()}, 'info');
                    }
                    conn2.disconnect();//释放
                    callback(err, info);
                });
            }
        });
    };
	
	this.deleteInfo = function (card, soms, callback) {
        var conn = db.getAdapter('report');
        conn.where({
            supplier_id: soms.supplier_id,
            venues_id: soms.venue_id,
            code: card.SourceId
        }).get(_tableName, function (err, result) {
            conn.disconnect();//释放			
            if (!err && result.length > 0) {
				var conn2 = db.getAdapter('report');
				var detail = {
						is_delete: 1
					};
				conn2.where({id: result[0]['id']}).update(_tableName, detail, function (err, info) {																		
					if (err) {
						log.write('message', 0, '删除会员卡：', {err: err, message: conn2._last_query()}, 'info');
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

module.exports = new venues_card_type();