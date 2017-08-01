/**
 * 趣运动app_id对应表
 * author zhuangsheng
 * date 2016-08-24
 * @type {db|exports|module.exports}
 */
var $db = require('../models/db');
var $async = require('async');
var $log = require('../util/log');

var $qydBusiness = {};

const TABLE_NAME = 'gs_business';

/**
 * 取商家suppliers_id数组对应的app_id数组
 * 返回app_id数组
 * @type {{}}
 */
$qydBusiness.getListBySuppliersIds = function(supplierIds,callback){
    var conn = $db.getAdapter('qyd_business');
    conn.select('app_id,suppliers_id')
        .where("suppliers_id IN(" + supplierIds.join(',')+ ")")
        .get(TABLE_NAME, function (err, list) {
            conn.disconnect();//释放

            if (err) { // 查询出错
                $log.write('getAppIdBySuppliersIds', 0, '取商家suppliers_id数组对应的app_id数组', {err: err}, 'error');
                list = [];
            }

            callback(err, list);
        });
};



module.exports = $qydBusiness;

