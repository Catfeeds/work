//场馆会员卡
var async = require('async');
var db = require('../models/db');
var log = require('../util/log');
var moment = require('moment');

var _tableName = 'members_card';
var _tableName_card_detail = 'members_card_detail';
var _tableName_card_count_detail = 'members_card_count_detail';
var _tableName_card_lose_log = 'members_card_lose_log';


var venues_members_card = function () {
	//基本表初始化
    this.initData = function (card, soms) {
        var data = {
            supplier_id: soms.supplier_id,
            venues_id: soms.venue_id,
			qyd_customer_id: card.QydCustomerId || 0,
            username: card.Username || '',
            mobile: card.Mobile || '',
            card_number: card.MemberCardNumber || '',
            id_card: card.IdCard || '',
            account_type: card.AccountType || 0,
            card_catalog: card.Level || '',
            is_active: card.IsActive || 0,
            create_by: card.CreateBy || '',			
			create_time: moment(card.CreateTime).unix() || 0,
            last_modify_by: card.LastModifyBy || '',
			last_modify_time:  moment(card.LastModifyTime).unix() || 0
        };
        return data;
    };
	//储值卡详情初始化
	this.initDataDetail = function (card, soms) {
        var data = {
            avail_remain: card.AvailRemain || 0,
            lock_remain: card.LockRemain || 0,
            gift_remain: card.GiftRemain || 0
        };
        return data;
    };
    //次卡详情初始化
	this.initDataCountDetail = function (card, soms) {
        var data = {
            stand_count: card.StandCount || 0,
            remain_count: card.RemainCount || 0
        };
        return data;
    };
	
	//会员卡储值卡详情
	this.dealmessageDetail = function (card, callback) {
        var where = {
            member_id: card.member_id
        };
	   //是否已存在
        var conn = db.getAdapter('report');
		
        conn.where(where).get(_tableName_card_detail, function (err, result) {
            conn.disconnect();//释放
            if (!err && result.length > 0) {   
				var conn2 = db.getAdapter('report');
				conn2.where({id: result[0].id}).update(_tableName_card_detail, card, function (err, info) {
					if (err) {
						log.write('message', 0, 'error:update会员卡储值卡详情表：',  {err: err, message: conn2._last_query()}, 'info');
					}						
					conn2.disconnect();//释放
					callback(err, info);
					
				});
                
            } else {
                //入库
                var conn2 = db.getAdapter('report');
                conn2.insert(_tableName_card_detail, card, function (err, info) {
                    if (err) {
						log.write('message', 0, 'error:insert会员卡储值卡详情表：',  {err: err, message: conn2._last_query()}, 'info');
                    }	 
                    conn2.disconnect();//释放
                    callback(err, info);
                });
            }
		});
    };
	
	//会员卡次卡详情
	this.dealmessageCountDetail = function (card, callback) {
        var where = {
            member_id: card.member_id
        };
	   //是否已存在
        var conn = db.getAdapter('report');

        conn.where(where).get(_tableName_card_count_detail, function (err, result) {
            conn.disconnect();//释放
            if (!err && result.length > 0) {   
				var conn2 = db.getAdapter('report');
				conn2.where({id: result[0].id}).update(_tableName_card_count_detail, card, function (err, info) {
					if (err) {
						log.write('message', 0, 'error:update会员卡次卡详情表：',  {err: err, message: conn2._last_query()}, 'info');
					}		
					
					conn2.disconnect();//释放
					callback(err, info);
				});
                
            }else{
                //入库
                var conn2 = db.getAdapter('report');
                conn2.insert(_tableName_card_count_detail, card, function (err, info) {
                    if (err) {
						log.write('message', 0, 'error:insert会员卡次卡详情表：',  {err: err, message: conn2._last_query()}, 'info');
                    }
					
                    conn2.disconnect();//释放
                    callback(err, info);
                });
            }
		});
    };
	
    //insert
    this.dealMessage = function (card_old, soms, callback) {
        var card = this.initData(card_old, soms);
		var card_detail = this.initDataDetail(card_old, soms);
		var card_count_detail = this.initDataCountDetail(card_old, soms);
		
        var where = {
            supplier_id: card.supplier_id,
            venues_id: card.venues_id,
            card_number: card.card_number		
        };
		/*if(card.qyd_customer_id > 0){
			delete where.card_number
			where.qyd_customer_id = card.qyd_customer_id;
		}*/
		
        //是否已存在
        var conn = db.getAdapter('report');
        conn.where(where).get(_tableName, function (err, result) {
            conn.disconnect();//释放
            console.log(conn._last_query());
            if (!err && result.length > 0) {
                if (card.last_modify_time >= result[0].last_modify_time) {
                    var conn2 = db.getAdapter('report');
                    conn2.where({id: result[0].id}).update(_tableName, card, function (err, info) {
																				   
                        if (err) {
							log.write('message', 0, 'error:update会员卡：',  {err: err, message: conn2._last_query()}, 'info');
							conn2.disconnect();//释放
                        }
						//成功，则处理会员卡详情表数据
						else{
							conn2.disconnect();//释放
							if(card.account_type == 1){
								card_detail.member_id = result[0].id;
								card_detail.account_type = result[0].account_type;
								callback(err, card_detail);
							}
							else if(card.account_type == 2){
								card_count_detail.member_id = result[0].id;
								card_count_detail.account_type = result[0].account_type;
								callback(err, card_count_detail);
							}
							else{
								callback(err, null);
							}
						}
                    });
                } else {
                    //旧状态，不处理
                    callback(err, null);
                }
            } else {
                //入库
                var conn2 = db.getAdapter('report');
				card.add_time = moment().unix();
                conn2.insert(_tableName, card, function (err, info) {
				    
                    if (err) {					
						log.write('message', 0, 'error:insert会员卡：',  {err: err, message: conn2._last_query()}, 'info');
						conn2.disconnect();//释放   
                    }
					//成功，则处理会员卡详情表数据
					else{	
						conn2.disconnect();//释放   
						if(card.account_type == 1){
								card_detail.member_id = info.insertId;
								card_detail.account_type = card.account_type;
								callback(err, card_detail);
						}
						else if(card.account_type == 2){
								card_count_detail.member_id = info.insertId;
								card_count_detail.account_type = card.account_type;
								callback(err, card_count_detail);
						}
						else{
							callback(err, null);
						}
						
					}	
                    
                });
            }
        });
    };	
	
	
	//更新会员余额变更
	this.updateInfo = function (card_old, soms, callback) {
		
       var card = this.initData(card_old, soms);
       var card_detail = this.initDataDetail(card_old, soms);
       var card_count_detail = this.initDataCountDetail(card_old, soms);
		
        var conn = db.getAdapter('report');
		var where = {
            supplier_id: soms.supplier_id,
            venues_id: soms.venue_id,
            card_number: card_old.MemberCardNumber
        };
		
		/*if(card_old.QydCustomerId){
			delete where.card_number
			where.qyd_customer_id = card_old.QydCustomerId;
		}*/
		
        conn.where(where).get(_tableName, function (err, result) {	
			conn.disconnect();//释放										
            if (!err && result.length > 0) {
				if(card.account_type == 1){
					var conn2 = db.getAdapter('report');
					card_detail.member_id = result[0].id;
					var where_detail={
						member_id : result[0].id
						};
					conn2.where(where_detail).get(_tableName_card_detail, function (err, result) {
						conn2.disconnect();//释放													
						if (!err && result.length > 0) {   	
							var conn3 = db.getAdapter('report');
							conn3.where({id: result[0].id}).update(_tableName_card_detail, card_detail, function (err, info) {
								if (err) {
									log.write('message', 0, 'error:update会员卡储值卡余额：', conn3._last_query(), 'info');
								}						
								conn3.disconnect();//释放
								callback(err, info);
								
							});
							
						} else {
							//入库
							var conn3 = db.getAdapter('report');
							conn3.insert(_tableName_card_detail, card_detail, function (err, info) {
								if (err) {
									log.write('message', 0, 'error:insert会员卡储值卡余额：',  {err: err, message: conn3._last_query()}, 'info');
								}	 
								conn3.disconnect();//释放
								callback(err, info);
							});
						}
					});
							
				}
				else if(card.account_type == 2){
					var conn2 = db.getAdapter('report');
					card_count_detail.member_id = result[0].id;
					var where_detail={
						member_id : result[0].id
						};
					conn2.where(where_detail).get(_tableName_card_count_detail, function (err, result) {
						conn2.disconnect();//释放
						if (!err && result.length > 0) {   
							var conn3 = db.getAdapter('report');
							conn3.where({id: result[0].id}).update(_tableName_card_count_detail, card_count_detail, function (err, info) {
								if (err) {
									log.write('message', 0, 'error:update会员卡次数：',  {err: err, message: conn3._last_query()}, 'info');
								}		
								
								conn3.disconnect();//释放
								callback(err, info);
							});
							
						} else {
							//入库
							var conn3 = db.getAdapter('report');
							conn3.insert(_tableName_card_count_detail, card_count_detail, function (err, info) {
								if (err) {
									log.write('message', 0, 'error:insert会员卡次数：',  {err: err, message: conn3._last_query()}, 'info');
								}
								
								conn3.disconnect();//释放
								callback(err, info);
							});
						}
					});
					
				} 

            } 
			else {
				log.write('message', 0, 'error:updateInfo找不到会员卡信息：', {err: err, card_number: card_old.MemberCardNumber, venues_id: soms.venue_id, supplier_id: soms.supplier_id}, 'info');
                callback(err, result); 
            }
        });

    };

	
	//会员卡挂失
	this.loseInfo = function (card_old, soms, callback) {

		dataInfo = {
			card_id: 0,
            card_no: card_old.MemberCardNumber || '',
            card_no_old: card_old.OldCardNumber || '',			
            create_time:  moment(card_old.LastModifyTime).unix() || 0,
            create_By: card_old.LastModifyBy || ''		
        };
		
        var conn = db.getAdapter('report');
		var where = {
            supplier_id: soms.supplier_id,
            venues_id: soms.venue_id,
            card_number: card_old.OldCardNumber
        };
		
		/*if(card_old.QydCustomerId){
			delete where.card_number
			where.qyd_customer_id = card_old.QydCustomerId;
		}*/
		
        conn.where(where).get(_tableName, function (err, result) {	
			conn.disconnect();//释放	
			
            if (!err && result.length > 0) {	
			 	var conn2 = db.getAdapter('report');
				var detail = {
						card_number: card_old.MemberCardNumber,
						last_modify_by: card_old.LastModifyBy,
						last_modify_time:  moment(card_old.LastModifyTime).unix()
					};
				conn2.where({id: result[0]['id']}).update(_tableName, detail, function (err, info) {																		
					if (err) {
						log.write('message', 0, 'loseInfo更新会员卡card_number：',  {err: err, message: conn2._last_query()}, 'info');
					}
					
					dataInfo.card_id  = result[0]['id'];
					conn2.disconnect();//释放
					
					callback(err, dataInfo);
				});         
            } 
			else {
				log.write('message', 0, 'loseInfo找不到会员卡信息：', {err: err, card_number: card_old.MemberCardNumber, venues_id: soms.venue_id, supplier_id: soms.supplier_id}, 'info');
                callback(err, result); 
            }
        });

    };

	//会员卡注销
	this.cancelInfo = function (card_old, soms, callback) {
		
        var conn = db.getAdapter('report');
		var where = {
            supplier_id: soms.supplier_id,
            venues_id: soms.venue_id,
            card_number: card_old.MemberCardNumber
        };
		
		/*if(card_old.QydCustomerId){
			delete where.card_number
			where.qyd_customer_id = card_old.QydCustomerId;
		}*/
		
        conn.where(where).get(_tableName, function (err, result) {
													
			conn.disconnect();//释放
            if (!err && result.length > 0) {
				var conn2 = db.getAdapter('report');
				var detail = {
						is_active: 0,
						last_modify_by: card_old.LastModifyBy,
						last_modify_time: moment(card_old.LastModifyTime).unix()
					};
				conn2.where({id: result[0]['id']}).update(_tableName, detail, function (err, info) {																		
					if (err) {
						log.write('message', 0, 'cancelInfo注销会员卡：',  {err: err, message: conn2._last_query()}, 'info');
					}
					conn2.disconnect();//释放
					callback(err, info);
				});     
			} 
			else {

					log.write('message', 0, 'cancelInfo,趣运动找不到会员卡信息：', {err: err, card_number: card_old.MemberCardNumber, venues_id: soms.venue_id, supplier_id: soms.supplier_id}, 'info');
					callback(err, result); 																 
            }	    

        });

    };
	
};

module.exports = new venues_members_card();