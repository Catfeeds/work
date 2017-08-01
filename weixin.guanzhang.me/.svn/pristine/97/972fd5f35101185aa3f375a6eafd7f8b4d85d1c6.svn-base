/**
 * 微信绑定号码
 * author zhuangsheng
 * date 2016-08-23
 * @type {db|exports|module.exports}
 */
var $db = require('../models/db');
var $async = require('async');
var $log = require('../util/log');
var $qydBusiness = require('../models/qydBusiness');
var $business = require('../models/business');
var $weixinApi = require('../api/weixin');

var $weixinPhone = {};

const TABLE_NAME = 'gs_suppliers_weixin_phone';

/**
 * 取手机号对应的商家id
 * 返回suppliers_id数组
 * @type {{}}
 */
$weixinPhone.getSuppliersIdByPhone = function (phone, type, callback) {
    var conn = $db.getAdapter('qyd_7yundong');
    conn.select('suppliers_id')
        .where({phone: phone,type:type})
        .get(TABLE_NAME, function (err, list) {
            conn.disconnect();//释放

            suppliersIdList = [];
            if (err) { // 查询出错
                $log.write('getSuppliersIdByPhone', 0, '通过phone取suppliers_id出错', {err: err}, 'error');
            }

            if (!err && list.length > 0) {
                for (var i = 0; i < list.length; i++) {
                    if (suppliersIdList.indexOf(list[i]['suppliers_id']) == -1) {
                        suppliersIdList.push(list[i]['suppliers_id']);
                    }
                }
            }
            callback(err, suppliersIdList);
        });
};
/**
 * 更新绑定的手机号状态
 * @type {{}}
 */
$weixinPhone.updateBindStatusByPhone = function (phone, type, bind_status, wechat_id, open_id, callback) {
    if (!phone || bind_status > 1 || bind_status < 0 || [1,2].indexOf(type) == -1) {
        callback(true, '参数错误');
        return;
    }
    var updateData = {
        bind_status: bind_status,
        wechat_id: wechat_id,
        open_id: open_id
    };
    var conn = $db.getAdapter('qyd_7yundong');
    conn.where({phone: phone,type:type}).update(TABLE_NAME, updateData, function (err, info) {
        callback(err, info);
    });
};
/**
 * 更新绑定的openId状态
 * @type {{}}
 */
$weixinPhone.updateBindStatusByOpenId = function (open_id,type, bind_status, wechat_id, callback) {
    if (!open_id || bind_status > 1 || bind_status < 0) {
        callback(true, '参数错误');
        return;
    }
    var updateData = {
        bind_status: bind_status,
        wechat_id: wechat_id
    };
    var conn = $db.getAdapter('qyd_7yundong');
    conn.where({open_id: open_id,type: type}).update(TABLE_NAME, updateData, function (err, info) {
        callback(err, info);
    });
};

/**
 * 取OpenId取绑定的商家id
 * 返回suppliers_id数组
 * @type {{}}
 */
$weixinPhone.getSuppliersIdByOpenId = function (openId,type, callback) {
    var conn = $db.getAdapter('qyd_7yundong');
    conn.select('suppliers_id')
        .where({type:type, open_id: openId, bind_status: 1})
        .get(TABLE_NAME, function (err, list) {
            conn.disconnect();//释放

            suppliersIdList = [];
            if (err) { // 查询出错
                $log.write('getSuppliersIdByOpenId', 0, '通过openid取suppliers_id出错', {err: err}, 'error');
            }

            if (!err && list.length > 0) {
                for (var i = 0; i < list.length; i++) {
                    if (suppliersIdList.indexOf(list[i]['suppliers_id']) == -1) {
                        suppliersIdList.push(list[i]['suppliers_id']);
                    }
                }
            }
            callback(err, suppliersIdList);
        });
};

/**
 * 取所有绑定的商家Id
 * @type {{}}
 */
$weixinPhone.getSupplierBindingList = function (where,callback) {
    var query = {bind_status: 1};
    if(where !== null && typeof where === 'object'){
        for( key in where){
            query[key] = where[key];
        }
    }
    var conn = $db.getAdapter('qyd_7yundong');
    conn.select('suppliers_id,open_id')
        .where(query)
        .where("open_id != ''")
        .get(TABLE_NAME, function (err, list) {
            conn.disconnect();//释放
            if (err) {
                $log.write('getSupplierBindingList', 0, '取商家绑定列表出错', {err: err}, 'error');
                list = [];
            }
            callback(err, list);
        });
};

/**
 * where只能是对象
 * 取where绑定的open_id对应场馆id
 * 返回venue_id open_id wechat_id列表
 * @type {{}}
 */
$weixinPhone.getVenueBindingList = function (where, callback) {
    var openIdList = [];
    if(typeof where !== 'object'){
        callback('$weixinPhone.getVenueBindingList的where参数只能是对象',openIdList);
        return
    }
    $async.waterfall([
            function (callback) {
                //取出商家id对应open_id
                $weixinPhone.getSupplierBindingList(where, function (err, supplierList) {
                    if (err) {
                        $log.write('getVenueBindingList', 0, '取商家绑定列表出错', {err: err}, 'error');
                        callback(err, '取商家绑定列表出错');
                        return;
                    }
                    if (supplierList.length == 0) {
                        callback(true, '绑定商家列表为空');
                        return;
                    }
                    openIdList = supplierList;//保存
                    var supplierIds = [];
                    for (var i = 0; i < supplierList.length; i++) {
                        if (supplierIds.indexOf(supplierList[i]['suppliers_id']) == -1) {
                            supplierIds.push(supplierList[i]['suppliers_id']);
                        }
                    }
                    callback(err, supplierIds);
                });
            },
            function (supplierIds, callback) {
                $qydBusiness.getListBySuppliersIds(supplierIds, function (err, appList) {
                    if (err) {
                        $log.write('getVenueBindingList', 0, '取商家APPId列表出错', {
                            err: err,
                            supplierIds: supplierIds
                        }, 'error');
                        callback(err, '取商家APPId列表出错');
                        return;
                    }
                    if (appList.length == 0) {
                        callback(true, 'appId列表为空');
                        return;
                    }
                    var tempList = {};
                    var appIds = [];
                    for (var j = 0; j < appList.length; j++) {
                        tempList[appList[j]['suppliers_id']] = appList[j]['app_id'];
                        if (appIds.indexOf(appList[j]['app_id']) == -1) {
                            appIds.push(appList[j]['app_id']);
                        }
                    }
                    for (var i = 0; i < openIdList.length; i++) {
                        if (tempList[openIdList[i]['suppliers_id']]) {
                            openIdList[i]['app_id'] = tempList[openIdList[i]['suppliers_id']];
                        }
                    }
                    callback(err, appIds);
                });
            },
            function (appIds, callback) {
                $business.getVenueListByAppIds(appIds, function (err, venueList) {
                    if (err) {
                        $log.write('getVenueBindingList', 0, '取商家venueList列表出错', {
                            err: err,
                            appIds: appIds
                        }, 'error');
                        callback(err, '取商家venueList列表出错');
                        return;
                    }
                    if (venueList.length == 0) {
                        callback(true, 'venueList列表为空');
                        return;
                    }
                    var tempList = {};
                    for (var i = 0; i < venueList.length; i++) {
                        tempList[venueList[i]['app_id']] = {venue_id:venueList[i]['venue_id'],name:venueList[i]['name']};
                    }
                    for (var i = 0; i < openIdList.length; i++) {
                        if (tempList[openIdList[i]['app_id']]) {
                            openIdList[i]['wechat_id'] = $weixinApi.getNewWechatId(true);
                            openIdList[i]['venue_id'] = tempList[openIdList[i]['app_id']]['venue_id'];
                            openIdList[i]['name'] = tempList[openIdList[i]['app_id']]['name'];
                        }else{
                            openIdList.splice(i,1);
                            i--;
                        }
                    }
                    callback(err, openIdList);
                });
            }

        ],
        function (err, result) {
            if (err) {
                $log.write('getVenueBindingList', 0, '取商家openIdList出错', {err: err, result: result}, 'error');
                openIdList = [];
            }
            if(err === true){
                err = null
            }
            callback(err, openIdList);
        });
};

/**
 * 取绑定的趣运动场馆列表
 * @type {{}}
 */
$weixinPhone.getQydBindingList = function(where,callback){
    var supplierList = [];
    if(typeof where !== 'object'){
        callback('$weixinPhone.getSupplierBindingList的where参数只能是对象',supplierList);
        return
    }
    var query = {bind_status: 1};
    if(where !== null && typeof where === 'object'){
        for( key in where){
            query[key] = where[key];
        }
    }
    var conn = $db.getAdapter('qyd_7yundong');
    conn.select('gs_suppliers.suppliers_id,gs_suppliers.suppliers_name,'+TABLE_NAME+'.open_id')
        .where(query)
        .where("open_id != ''")
        .join('gs_suppliers','gs_suppliers.suppliers_id='+TABLE_NAME+'.suppliers_id','LEFT')
        .get(TABLE_NAME, function (err, list) {
            conn.disconnect();//释放
            if (err) {
                $log.write('getSupplierBindingList', 0, '取商家绑定列表出错', {err: err}, 'error');
                list = [];
            }
            callback(err, list);
        });
};

//导出
module.exports = $weixinPhone;

