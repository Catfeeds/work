//删除日志表
var async = require('async');
var db = require('../models/db');
var log = require('../util/log');
var moment = require('moment');

var _tableName = 'data_delete_log';

//初始化
var data_delete_log = function () {
    this.initData = function (dataLog, soms) {
        var data = {
            supplier_id: soms.supplier_id,
            venues_id: soms.venue_id,
            model_type: parseInt(dataLog.ModelType) || 0,
            source_id: dataLog.SourceId || '',
            delete_by: dataLog.DeleteBy || '',
			delete_time: moment(dataLog.DeleteTime).unix() || 0, 
            remark: dataLog.Remark || ''
        };

        return data;
    };
	
    //insert
    this.dealMessage = function (dataLog, soms, callback) {
        dataLog = this.initData(dataLog, soms);
        var where = {
            supplier_id: dataLog.supplier_id,
            venues_id: dataLog.venues_id,
            source_id: dataLog.source_id,
			model_type: dataLog.model_type,
        };
        //是否已存在
        var conn = db.getAdapter('report');
        conn.where(where).get(_tableName, function (err, result) {
            conn.disconnect();//释放
			
            if (!err && result.length > 0) {          
				//不处理
				 var returnData = {
						err: "",
						info: ""
					};		
				 callback(err, returnData);
              
            } else {
                //入库
                var conn2 = db.getAdapter('report');
				dataLog.add_time = moment().unix();
				var returnData = {
						err: "",
						info: "insert"
					};	
					
                conn2.insert(_tableName, dataLog, function (err, info) {
				   if (err) {
						returnData.err = err;
						log.write('message', 0, 'insert删除日志表', conn2._last_query(), 'info');	
                    }	
                    conn2.disconnect();//释放
				 
                    callback(err, returnData);
                });
            }
        });
    };

};

module.exports = new data_delete_log();