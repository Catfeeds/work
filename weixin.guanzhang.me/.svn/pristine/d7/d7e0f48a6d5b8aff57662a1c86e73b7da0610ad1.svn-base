//场馆会员卡挂失记录表
var async = require('async');
var db = require('../models/db');
var log = require('../util/log');
var moment = require('moment');

var _tableName = 'members_card_lose_log';

//初始化
var venuesMembersCardLoseLog = function () {
	
   //会员卡挂失log初始化
	this.initData = function (card) {
        var data = {
			card_id: 0,
            card_no: card.MemberCardNumber || '',
            card_no_old: card.OldCardNumber || '',			
            create_time: moment(card.LastModifyTime).unix() || 0,
            create_By: card.LastModifyBy || ''		
        };
        return data;
    };

    //insert
    this.dealMessage = function (card, callback) {
        var where = {
            card_id: card.card_id,
            card_no: card.card_no,
            card_no_old: card.card_no_old
        };
		 
        //是否已存在
        var conn = db.getAdapter('report');
        conn.where(where).get(_tableName, function (err, result) {
        	
            if (!err && result.length > 0) {
				conn.where({id: result[0].id}).update(_tableName, card, function (err, info) {
					if (err) {
						log.write('message', 0, 'error:update会员卡挂失记录表：',  {err: err, message: conn._last_query()}, 'info');
					}
					conn.disconnect();//释放
					callback(err, info)
				});
                
            } else {
                //入库
                conn.insert(_tableName, card, function (err, info) {
                    if (err) {
						log.write('message', 0, 'error:insert会员卡挂失记录表：',  {err: err, message: conn._last_query()}, 'info');
                    }
                    conn.disconnect();//释放
                    callback(err, info);
                });
            }
        });
    };

};

module.exports = new venuesMembersCardLoseLog();