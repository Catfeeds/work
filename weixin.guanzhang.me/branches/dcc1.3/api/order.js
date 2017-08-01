var async = require('async');
var request = require('request');
var querystring = require('querystring');
var base = require('./base');
var config = require('../conf/config');
var log = require('../util/log');
var db = require('../models/db');
var moment = require('moment');
var order = {};
var order_api = config.apiUrl.order ? config.apiUrl.order : '';
var order_key = "orderapi4a33b88e37e2e2934f493458";

/**
 * 请求order的api
 * @param  int   start_date    开始时间
 * @param  int   end_date  	   结束时间
 * @param  int   venues_id     场地ID（商户中心）
 * @return 
 * 
 */
order.GetTotalSettlePrice = function (parm, callback) {
	 
	async.waterfall([
         function (callback) {
	    	//根据venues_id取app_id
	    	 var conn = db.getAdapter('business');
	         conn.select('qyd_venue_id')
	             .where('venue_id=' + parm.venues_id)
	             .get('bs_smos', function (err, results) {
	                 conn.disconnect();//释放
	                 var res = {
	                		 start_date: parm.start_date,
	                		 end_date: parm.end_date
	                 };
	                 if (!err && results.length > 0) {
	                     if (results[0].qyd_venue_id != null) {
	                         res.venues_id = results[0].qyd_venue_id;
	                     }
	                 } else { // 查询出错
	                     log.write('order.GetTotalSettlePrice', 0, '取qyd_venue_id时出错', {err: err}, 'error');
	                 }
	                
	                 callback(err, res);
	             });
         },
         function (data, callback) {

	    	params = {
	    				action: "getTotalSettlePrice",
	    				start_time: data.start_date,
	    				end_time: data.end_date,
	    				venues_id: data.venues_id
	    		    };

	    	params = base.setPublicParams(params);
	    
		    //请求接口
		    var api = order_api + "shangjia/guanzhang/get_total_settle_price?" + querystring.stringify(base.addSign(params, order_key));
		    log.write('GetTotalSettlePrice', 0, '请求order.api:Url', api, 'info');
		    request(api, function (error, response, body) {
		        if (!error && response.statusCode == 200 && (obj = JSON.parse(body)) && obj.status == '0000') {
		            callback(null, obj.data);
		            //请求LOG
		            log.write('GetTotalSettlePrice', 0, '请求order.api成功', {
		                req: params,
		                res: obj
		            }, 'info');
		        } else {
		            //请求出错
		            callback(error, null);
		            log.write('GetTotalSettlePrice', 0, '请求order.api出错', {
		                req: params,
		                res: body
		            }, 'error');
		        }
		    });
         }
     ], function (err, result) {
         callback(err, result);
     });
 
};


// 将对象导出
module.exports = order;