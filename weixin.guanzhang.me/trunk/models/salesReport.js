var db = require('../models/db');
var log = require('../util/log');
var common = require('../util/common');
var redis = require('../util/redis');

var salesReport = {};


/**
 * 商品报表-数据列表
 *
 * @params {venues_id: 3, date: 1460131200}
 * @params callback(err, res)
 * @author xiaoyanchun
 */
salesReport.reportList = function (params, callback) {
    var conn = db.getAdapter('report');
    conn.select('catalog_name, goods_name, sales_volume, stock_count')
        .where('venue_id=' + params.venues_id + ' AND date=' + params.date)
        .order_by('sales_volume DESC ')
        .get('goods_sales_report', function (err, result) {
            conn.disconnect();//释放
            var res = [];

            if (!err) {
                res = result;
            } else { // 查询出错
                log.write('sales_report', 0, '商品报表-数据列表', {err: err}, 'error');
            }

            callback(err, res);
        });
};


/**
 * 商品报表-数据列表 (优先读取缓存, 当天的数据不缓存)
 *
 * @params {venues_id: 3, date: 1460131200}
 * @params callback(err, res)
 * @author xiaoyanchun
 */
salesReport.reportListFromCache = function(params, callback){

    if (params.venues_id == undefined || params.date == undefined) {
        log.write('sales_report', 0, 'reportListFromCache:缺少参数', {params: params}, 'error');
        callback("reportListFromCache:缺少参数");
        return;
    }

    var cacheKey = 'salesReport:reportList:' + params.venues_id + '_' + params.date;

    redis.getValue(cacheKey, function (err, reply) {

        if (!err && reply) { // 有缓存，直接读取缓存
            callback(null, reply);
        } else {
            if (err) { // 获取redis缓存出错, 只记录错误
                log.write('sales_report', 0, 'reportListFromCache:获取redis缓存失败', {err: err, params: params}, 'error');
            }

            salesReport.reportList(params, function(err, result){
                if (err) {
                    log.write('sales_report', 0, 'reportListFromCache:获取商品报表失败', {err: err, params: params}, 'error');
                    callback(err, result);
                } else {

                    if (params.date < common.todayStartTime()) { // 小于今天的数据才缓存(当天的数据不缓存)
                        redis.setValue(cacheKey, result, 600); //存入缓存
                    }

                    callback(null, result);
                }
            });
        }
    });

};

//导出
module.exports = salesReport;