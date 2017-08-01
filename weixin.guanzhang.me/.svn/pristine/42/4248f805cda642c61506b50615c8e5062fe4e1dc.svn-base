var async = require('async');
var db = require('../models/db');
var log = require('../util/log');
var moment = require('moment');
var common = require('../util/common');
var ordersOld = require('../models/ordersOld'); // 订单报表模型对象
var $weixin = require('../api/weixin');
var $config = require('../conf/config');
var $business = require('../models/business');
var $weixinPhone = require('../models/weixinPhone');
var redis = require('../util/redis');
var sendReport = {};


const BINDING = 1;//绑定状态
const TMP_MSG_ID = 39596;//模板消息ID
const EACH_LIMIT = 3;//并发限制
var gz_weixin = $config.apiUrl.gz_weixin || '';

/**
 * 获取单个场馆统计数据
 *
 * @param params
 * @param asyncCallback
 * @author xiaoyanchun
 */
sendReport.getOneVenueData = function(params, asyncCallback){

    if (params.venue_id == undefined || params.date == undefined) {
        log.write('send_report', 0, 'getOneVenueData:缺少参数', {params: params}, 'error');
        asyncCallback("getOneVenueData:缺少参数");
        return;
    }

    async.waterfall([

        // 获取场馆名称
        function(callback){
            sendReport.getVenueInfoFromCache(params.venue_id, function(err, result){
                if (err) {
                    log.write('send_report', 0, 'getOneVenueData:获取场馆名称出错', {err: err, params: params}, 'error');
                    callback(err, result);
                } else {
                    callback(null, {
                        venue_id: params.venue_id,
                        venue_name: result.name
                    });
                }
            });
        },

        // 获取soms是新版本还是旧版本
        function(data, callback){
            sendReport.getSomsIsNewFromCache(data.venue_id, function(err, result){
                if (err) {
                    log.write('send_report', 0, 'getOneVenueData:获取soms是新版本还是旧版本出错', {err: err, data: data}, 'error');
                    callback(err, result);
                } else {
                    data.is_new = result;
                    callback(null, data);
                }
            });
        },

        // 获取场馆的统计信息
        function (data, callback) {
            var tmpParams = {venue_id: data.venue_id, is_new : data.is_new, date: params.date};
            sendReport.countOneVenueFromCache(tmpParams, function(err, result){
                if (err) {
                    log.write('send_report', 0, 'getOneVenueData:获取场馆的统计信息出错', {err: err, data: data, tmpParams: tmpParams}, 'error');
                    callback(err, result);
                } else {
                    var resData = {
                        venue_id: data.venue_id,
                        venue_name: data.venue_name,
                        total: result
                    };
                    callback(null, resData);
                }
            });
        }

    ], function(err, result){
        if (err) {
            log.write('send_report', 0, 'getOneVenueData:result出错', {err: err, params:params}, 'error');
            asyncCallback(err, result);
        } else {
            asyncCallback(null, result);
        }
    });

};

/**
 * 获取单个场的金额统计(优先读取缓存)
 *
 * @param params
 * @param asyncCallback
 * @return number
 * @author xiaoyanchun
 */
sendReport.countOneVenueFromCache = function(params, asyncCallback){

    if (params.venue_id == undefined
        || params.is_new == undefined
        || params.date == undefined
    ) {
        log.write('send_report', 0, 'countOneVenueFromCache:缺少参数', {params: params}, 'error');
        asyncCallback("countOneVenueFromCache:缺少参数");
        return;
    }

    var cacheKey = 'sendReport:countOneVenue:' + params.venue_id + '_' + params.is_new + '_' + params.date;

    redis.getValue(cacheKey, function (err, reply) {

        if (!err && reply) { // 有缓存，直接读取缓存
            asyncCallback(null, reply);
        } else {
            if (err) { // 获取redis缓存出错, 只记录错误
                log.write('send_report', 0, 'countOneVenueFromCache:获取redis缓存失败', {err: err, params: params}, 'error');
            }

            sendReport.countOneVenue(params, function(err, result){
                if (err) {
                    log.write('send_report', 0, 'countOneVenueFromCache:获取场馆信息失败', {err: err, params: params}, 'error');
                    asyncCallback(err, result);
                } else {
                    //存入缓存
                    //redis.setValue(cacheKey, result, 3600);
                    asyncCallback(null, result);
                }
            });
        }
    });

};


/**
 * 获取单个场的金额统计
 *
 * @param params
 * @param asyncCallback
 * @return number
 * @author xiaoyanchun
 */
sendReport.countOneVenue = function(params, asyncCallback){

    if (params.venue_id == undefined
        || params.is_new == undefined
        || params.date == undefined
    ) {
        log.write('send_report', 0, 'countOneVenue:缺少参数', {params: params}, 'error');
        asyncCallback("countOneVenue:缺少参数");
        return;
    }

    if (params.is_new == 1) { // 新版

        var conn = db.getAdapter('report');
        // 获取新版统计数据

        // 收入分类 1场地、2商品、3会员
        var where = 'venue_id=' + params.venue_id + ' AND date=' + params.date
            + ' AND (income_type=3 OR (income_type=1 AND pay_type NOT IN (1, 3)) OR (income_type=2 AND pay_type NOT IN (1, 3)) ) ';

        conn.select('SUM(amount) AS amount')
            .where(where)
            .get('income_report', function (err, result) {
                conn.disconnect();//释放

                var resTotal = 0;
                if (err) {
                    log.write('send_report', 0, 'countVenus:获取场地收费合计出错:新版', {err: err, where: where}, 'error');
                    asyncCallback("获取场地收费合计出错:新版", resTotal);
                } else {
                    if (result.length > 0 && result[0].amount > 0) {
                        resTotal = result[0].amount;
                    }
                    asyncCallback(null, resTotal);
                }
            });


    } else { // 旧版

        // 获取旧版统计数据 (1 场地收入 2 商品收入 3 会员收入)
        var where = ' date>=' + params.date + ' AND date<=' + common.getDayEndTime(params.date)
            + ' AND venue_id=' + params.venue_id + ' AND rec_type IN (1, 2, 3) ';

        /*
        ordersOld.getIncomeTotalAmount(where, function(err, result){
            var resTotal = 0;

            if (err) {
                log.write('send_report', 0, 'countVenus:获取场地收费合计出错:旧版', {err: err, where: where}, 'error');
                asyncCallback("获取场地收费合计出错:旧版", resTotal);
            } else {
                resTotal = result;
                asyncCallback(null, resTotal);
            }
        });
        */

        var conn = db.getAdapter('order');
        conn.select(' SUM(amount) AS total_amount ').where(where).get('sm_income_report', function(err, result){
            conn.disconnect();//释放
            var resTotal = 0;

            if (err) {
                log.write('send_report', 0, '获取收入金额统计错误', {err: err, where: where}, 'error');
                asyncCallback(err, resTotal);
            } else {
                if (result.length > 0 && result[0].total_amount > 0) {
                    resTotal = result[0].total_amount;
                }
                asyncCallback(null, resTotal);
            }
        });

    }
};


/**
 * 获取场馆信息(优先读取缓存)
 *
 * @param venueId
 * @param asyncCallback
 * @return {name: "xxx场馆"}
 * @author xiaoyanchun
 */
sendReport.getVenueInfoFromCache = function(venueId, asyncCallback){
    var cacheKey = 'sendReport:venueInfo:' + venueId;

    redis.getValue(cacheKey, function (err, reply) {

        if (!err && reply) { // 有缓存，直接读取缓存
            asyncCallback(null, reply);
        } else {
            if (err) { // 获取redis缓存出错, 只记录错误
                log.write('send_report', 0, 'getVenueInfoFromCache:获取redis缓存失败', {err: err, venue_id: venueId}, 'error');
            }

            sendReport.getVenueInfo(venueId, function(err, venueInfo){
                if (err) {
                    log.write('send_report', 0, 'getVenueInfoFromCache:获取场馆信息失败', {err: err, venue_id: venueId}, 'error');
                    asyncCallback(err, venueInfo);
                } else {
                    //存入缓存
                    redis.setValue(cacheKey, venueInfo, 3600);
                    asyncCallback(null, venueInfo);
                }
            });
        }
    });
};

/**
 * 获取场馆信息
 *
 * @param venueId
 * @param asyncCallback
 * @return {name: "xxx场馆"}
 * @author xiaoyanchun
 */
sendReport.getVenueInfo = function(venueId, asyncCallback){

    var conn = db.getAdapter('business');
    conn.select('name').where('id=' + venueId).get('st_venues', function(err, result){
        conn.disconnect();//释放
        var resData = {};
        if (err) {
            log.write('send_report', 0, 'getVenueInfo:获取场馆信息失败', {err: err, venue_id: venueId}, 'error');
            asyncCallback("获取场馆信息失败, venue_id:" + venueId, resData);
        } else {

            if (result.length > 0) { // 有记录存在，并且为新版本
                resData = result[0];
                asyncCallback(null, resData);
            } else {
                asyncCallback("获取场馆信息为空, venue_id:" + venueId, resData);
            }
        }
    });

};


/**
 * 场馆soms是否是新版本(优先读取缓存)
 *
 * @param venueId
 * @param asyncCallback
 * @return 1|0
 * @author xiaoyanchun
 */
sendReport.getSomsIsNewFromCache = function(venueId, asyncCallback){
    var cacheKey = 'sendReport:somsIsNew:' + venueId;

    redis.getValue(cacheKey, function (err, reply) {

        if (!err && reply) { // 有缓存，直接读取缓存
            asyncCallback(null, reply);
        } else {
            if (err) { // 获取redis缓存出错, 只记录错误
                log.write('send_report', 0, 'getSomsIsNewFromCache:获取redis缓存失败', {err: err, venue_id: venueId}, 'error');
            }

            sendReport.getSomsIsNew(venueId, function(err, somsIsNew){
                if (err) {
                    log.write('send_report', 0, 'getSomsIsNewFromCache:获取soms版本信息失败', {err: err, venue_id: venueId}, 'error');
                    asyncCallback(err, somsIsNew);
                } else {
                    //存入缓存
                    redis.setValue(cacheKey, somsIsNew, 3600);
                    asyncCallback(null, somsIsNew);
                }
            });
        }
    });
};

/**
 * 场馆soms是否是新版本
 *
 * @param venueId
 * @param asyncCallback
 * @return 1|0
 * @author xiaoyanchun
 */
sendReport.getSomsIsNew = function(venueId, asyncCallback){

    var conn = db.getAdapter('report');
    conn.select('is_new').where('venue_id=' + venueId).get('soms_version', function(err, result){
        conn.disconnect();//释放
        var is_new = 0;
        if (err) {
            log.write('send_report', 0, 'getSomsVersion:获取soms_version失败', {err: err, venue_id: venueId}, 'error');
            asyncCallback("获取soms_version失败, venue_id:" + venueId, is_new);
        } else {
            if (result.length > 0 && result[0].is_new == 1) { // 有记录存在，并且为新版本
                is_new = 1;
            }
            asyncCallback(null, is_new);
        }
    });
};



// 对所有用户发送微信模板消息
sendReport.sendAll = function(date_time,callback){

    async.waterfall([
        function(asyncCallback){
            //并发取所有绑定场馆的open_id列表
            async.parallel([
                function(callback){
                    $business.getBindingList(function(err,list){
                        if(err){
                            log.write('sendReport.sendAll', 0, '取bs_wxuser_index绑定列表出错', {err: err}, 'error');
                        }
                        callback(err,list);
                    });
                },
                function(callback){
                    $weixinPhone.getVenueBindingList({type:2}, function(err,list){
                        if(err){
                            log.write('sendReport.sendAll', 0, '取weixinPhone绑定列表出错', {err: err}, 'error');
                        }
                        callback(err,list);
                    })
                }
            ],function(err,parallelList){
                var bindingList = [];
                if(!err){
                    if(parallelList[0].length > 0){
                        bindingList = parallelList[0];
                    }
                    if(parallelList[1].length > 0){
                        bindingList = bindingList.concat(parallelList[1]);
                    }
                }
                asyncCallback(err,bindingList);
            });
        },
        function(list,asyncCallback){
            var success = 0; // 发送成功数量
            var failed = 0; // 发送失败数量
            async.eachSeries(list,function(item,asyncCallback2){
                sendReport.send(item, date_time, function(err, result){
                    if (err) {
                        failed++;
                    } else {
                        success++;
                    }
                    // 此处不返回错误(返回错误会停止往下执行)， 只记录成功或失败的数量
                    asyncCallback2(null);
                });
                //取数据
            },function(err){
                asyncCallback(err, '总共: ' + list.length +" 记录，发送成功："+success+"条，发送失败："+failed+"条");
            });
        }
    ],function(err,result){
        callback(err,result);
    });

};


sendReport.send = function(item, date, asyncCallback){

    async.waterfall([
        function(callback){
            sendReport.getOneVenueData({venue_id:item.venue_id, date: date}, function(err, result){
                if(!err){
                    result.open_id = item.open_id;
                }
                log.write('send', 0, '发送消息', {item: item, err: err,result:result}, 'info');
                callback(err,result);
            });
        },
        function (venue, callback) {
            var venueData = {
                venue_id: venue.venue_id,
                name: venue.venue_name,
                total: venue.total,
                date: common.date("Y-m-d", date)
            };
            sendOneMsg(item.wechat_id, venue.open_id, venueData, function (err, result) {
                callback(err, result);
            });
        }
    ], function(err, result){
        asyncCallback(err, result);
    });
};

function getOpenIdsByVenueId(venueId,callback){
    async.parallel([
        function(callback){
            var conn = db.getAdapter('business');
            conn.select("wx_open_id AS open_id")
                .where({venue_id:venueId,status:BINDING})
                .get('bs_wxuser_index', function (err, results) {
                    conn.disconnect();//释放
                    var data = [];
                    if(!err && results.length > 0){
                        for(var i=0;i<results.length;i++){
                            data.push({open_id:results[i]['open_id'],wechat_id:$weixin.getNewWechatId(false)});
                        }
                    }
                    callback(err,data);
                });
        },
        function(callback){
            //取新服务号的所绑定open_id
            $weixinPhone.getVenueBindingList({type:2}, function(err,list){
                var venueList = [];
                if(!err && list.length > 0){
                    for(var i=0;i<list.length;i++){
                        if(venueId == list[i]['venue_id']){
                            venueList.push(list[i]);
                        }
                    }
                }
                callback(err,venueList);
            });
        }
    ],function(err,list){
        if(err){
            log.write('getOpenIdsByVenueId', 0, '取绑定open_id列表', {err:err,venueId:venueId}, 'error');
            callback(err,[]);
            return;
        }
        var openIdList = [];
        for(var i=0;i<list.length;i++){
            openIdList = openIdList.concat(list[i]);
        }
        callback(err,openIdList);
    });
}
/**
 * 发送一个场馆的推送
 * @param venueId
 * @param date_time
 * @param callback
 */
sendReport.sendOneVenue= function(venueId,date_time,callback) {
    async.waterfall([
        function(asyncCallback){
            async.parallel([
                function(callback){
                    //openIds列表
                    getOpenIdsByVenueId(venueId,function(err,openIdList){
                        callback(err,openIdList);
                    });
                },
                function(callback){
                    //取场馆数据
                    sendReport.getOneVenueData({venue_id: venueId, date: date_time}, function (err, result) {
                        callback(err,result);
                    });
                }
            ],function(err,parallelList){
                asyncCallback(err,{open_ids:parallelList[0],venue:parallelList[1]});
            });
        },
        function(list, asyncCallback) {
            //并发组装数据发送
            async.each(list.open_ids, function (item, asyncCallback2) {
                var venueData = {
                    venue_id: list.venue.venue_id,
                    name: list.venue.venue_name,
                    total: list.venue.total,
                    date: common.date("Y-m-d", date_time)
                };
                sendOneMsg(item.wechat_id,item.open_id, venueData, function(err,result){
                    asyncCallback2(null,result);
                });
            }, function (err) {
                asyncCallback(err,list.open_ids.length );
            });
        }
    ],function(err,result){
        callback(err,result);
    });
};

/**
 * 推送单个openid
 * @param openId
 * @param callback
 */
//推送API
sendReport.sendOneOpenId = function(openId,date_time,callback){
    async.waterfall([
        function(asyncCallback){
            async.parallel([
                function(callback){
                    //取openId绑定的所有场馆
                    var conn = db.getAdapter('business');
                    conn.select('venue_id')
                        .where({wx_open_id:openId})
                        .get('bs_wxuser_index', function (err, results) {
                            conn.disconnect();//释放
                            var data = [];
                            if (!err && results.length > 0) {
                                for (var i = 0; i < results.length; i++) {
                                    data.push({venue_id:results[i]['venue_id'],wechat_id:$weixin.getNewWechatId(false)});
                                }
                            }
                            callback(err,data);
                        });
                },
                function(callback){
                    //取新服务号的所绑定open_id
                    $weixinPhone.getVenueBindingList({open_id:openId, type:2}, function(err,list){
                        var venueList = [];
                        if(!err && list.length > 0){
                           for(var i=0;i<list.length;i++){
                                venueList.push(list[i]);
                           }
                        }
                        callback(err,venueList);
                    });
                }
            ],function(err,parallelList){
                var venueList = [];
                if(!err){
                    for(var i=0;i<parallelList.length;i++){
                        if(parallelList[i].length > 0){
                            venueList = venueList.concat(parallelList[i]);
                        }
                    }
                }
                asyncCallback(err,venueList);
            });
        },
        function(venueList, asyncCallback){
            //并发组装数据发送
            async.each(venueList, function (item, asynCallback2) {
                sendReport.getOneVenueData({venue_id: item.venue_id, date: date_time}, function (err, result) {
                    var venueData = {
                        venue_id: result.venue_id,
                        name: result.venue_name,
                        total: result.total,
                        date: common.date("Y-m-d", date_time)
                    };
                    sendOneMsg(item.wechat_id, openId, venueData, asynCallback2);
                });
            },function(err){
                asyncCallback(err,venueList.length);
            });
        }
    ],function(err,result){
        callback(err,result);
    });
};
/**
 * 发送单个消息
 * @type {{}}
 */
function sendOneMsg(wechat_id,openId,venueData,callback){
    if (openId.length < 3 || venueData.venue_id == undefined || venueData.date == undefined){
        callback('param_error',null);
    }
    else{
        var base_url = gz_weixin;
        if(parseInt($weixin.getNewWechatId(true)) === parseInt(wechat_id)){
            base_url = gz_weixin + "binding"
        }
        var params = {
            first:"您好，【"+venueData.name+"】营业收入如下：",
            income_type:venueData.name,
            price:venueData.total+"元",
            openid:openId,
            wechat_id:wechat_id,
            //remark:openId,
            remark:"请查阅报表获取详细信息！发自馆掌产品",
            time:venueData.date,
            type:"income",
            url: base_url + "?type=2&venueId="+venueData.venue_id+"&date="+common.date('Ymd',moment(venueData.date).unix())+"&templateMsgId="+TMP_MSG_ID
        };
        $weixin.sendGzTplMsg(params,function(err,data){
            //if(err){
                log.write('sendOneMsg', 0, '发送单个消息', {params: params, err: err}, 'error');
            //}
            callback(err,data);
        });
    }
}

module.exports = sendReport;

