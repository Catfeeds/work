var async = require('async');
var moment = require('moment');
var db = require('../models/db');
var log = require('../util/log');
var orders = require('../models/orders');
var CourtOrderDetail = require('../models/CourtOrderDetail');
var CourtLightDetail = require('../models/CourtLightDetail');
var GoodsOrderDetail = require('../models/GoodsOrderDetail');
var GoodsInventory = require('../models/GoodsInventory');
var $redis = require('../util/redis');
var $common = require('../util/common');
var $fs = require('fs');
var $path = require('path');

var _tableName = 'di_message2';
// 存储最后id的文件名
var lastFileName = $path.dirname(__dirname) + '/cron/deal_message_last_id.txt';

var message = function () {
    var self = this;
    //取出消息
    this.init = function (limit, callback) {
        //判断是否查库
        //缓存最后id、设置定时器
        /**
         * 缓存处理对象{定时时长（秒）,基准时间截}
         * {timeout:10,baseTime:1456677777}
         */
        var cacheKey = "di-message-handle-info";
        var handleInfo = {timeout:0,baseTime:0};
        async.waterfall([
                function (asyncCallback) {
                    $redis.getValue(cacheKey, asyncCallback);
                },
                function(cacheValue,asyncCallback){
                    var queryFlag = true;
                    if(cacheValue){
                        handleInfo = cacheValue;
                        var nowTime = $common.timestamp();
                        //在定时保护内,不查库
                        if(nowTime < parseInt(cacheValue.baseTime) + parseInt(cacheValue.timeout)){
                            queryFlag = false;
                        }
                    }
                    asyncCallback(null,queryFlag);
                }
            ],function(err,queryFlag) {
                if(err){
                    log.write('message', 0, '取缓存'+cacheKey+'出错了', {err: err}, 'error');
                }
                if(!err && queryFlag === true){
                    try {
                        var maxId = $fs.readFileSync(lastFileName);
                        maxId = parseInt(maxId);
                    } catch (e) {
                        log.write('message', 0, "读取存储最后id文件出错", {err: e.toString()}, 'error');
                        maxId = 0;
                    }

                    var conn = db.getAdapter('di');
                    conn.select("id,message").where("id>="+maxId+" AND status=1").limit(limit)
                        .get(_tableName, function (err, results) {
                            //console.log(err||results);
                            conn.disconnect();//释放
                            var data = [];
                            if (!err && results.length > 0) {
                                lastItem = results.pop();
                                maxId = lastItem.id;
                                results.push(lastItem);
                                data = results;
                                // 写入文件
                                $fs.writeFileSync(lastFileName, maxId);
                            }
                            //设置缓存
                            if(data.length==0){
                                handleInfo.timeout = 120;//2分钟
                                handleInfo.baseTime = $common.timestamp();//当前时间截
                            }
                            $redis.setValue(cacheKey,handleInfo,7200);
                            //处理消息
                            self.dealAllMsg(data, callback);
                        });
                    return;
                }
                callback(null,"status=1的待处理message为0");
            }
        );
    };
    /**
     * 消息处理
     */
    this.dealAllMsg = function (results, callback) {
        var msg_count = 0, handle_count = 0, log_msg = '';
        if (results.length > 0) {
            msg_count = results.length;
            var messages = [], ids = [];
            var msg = '';
            for (var i = 0; i < results.length; i++) {
                try {
                    msg = JSON.parse(results[i].message);
                    messages.push(msg);
                    ids.push(results[i].id);
                } catch (e) {
                    var order = results[i];
                    log_msg = 'id=' + order.id + '的message的JSON解析出错';
                    var conn = db.getAdapter('di');
                    conn.where({id: order.id}).update(_tableName, {status: 3}, function (err, info) {
                        conn.disconnect();//释放
                    });
                    log.write('message', 0, '更新message的状态为3', {err: e, message: order}, 'info');
                    //callback(e, log_msg);
                }
            }
            msg_count = ids.length;
            if (msg_count > 0) {
                async.eachSeries(messages, function (item, asyncCallback) {
                    self.dealOneMsg(item, asyncCallback)
                }, function (err) {
                    if (!err) {
                        handle_count = msg_count;
                        var conn = db.getAdapter('di');
                        conn.where('id IN(' + ids.join(',') + ')').update(_tableName, {status: 2}, function (error, updateInfo) {
                            conn.disconnect();//释放
                            if (error) {
                                log.write('message', 0, '更新message的状态为2出错', {
                                    err: err,
                                    sql: conn._last_query()
                                }, 'info');
                            }
                        });
                    }
                    log_msg = '取出' + msg_count + '条消息，成功处理' + handle_count + '条消息';
                    callback(err, err ? ids : log_msg);
                    //log.write('message', 0,log_msg, {err: err}, 'info');
                });
            }
        } else {
            log_msg = '取出' + msg_count + '条消息，成功处理' + handle_count + '条消息';
            callback(null, log_msg);
        }
    };

    /**
     * meta.SourceName
     * 110000 普通商品和场地订单
     * 110001 次卡充值订单
     * 110002 会员充值订单
     * 110003 订单明细（不分类型）
     * 110004 场次订单明细
     * 110005 商品订单明细
     * 120000 会员基本资料
     * 120001 会员余额变更
     * 120002 会员挂失
     * 120003 会员次卡信息
     * 120004 注销会员卡
     * 13000 灯控器信息
     * 14000 商品当前库存量
     *
     */
    this.dealOneMsg = function (message, callback) {
        message = message[0];
        //消息头处理
        var meta = message.Metadata;
        var value = message.Value;

        var conn = db.getAdapter('business');
        conn.where({
            app_id: meta.AppId
        }).get('bs_smos', function (err, result) {
            conn.disconnect();//释放
            if (!err && result.length > 0) {
                //基础数据 venue_id supplier_id
                var soms = result[0];
                //处理订单数据
                if (['110000', '110001', '110002'].indexOf(meta.SourceName) > -1) {
                    value.UploadTime = meta.CreateTime;
                    value.SourceName = meta.SourceName;
                    orders.dealMessage(value, soms, callback);
                }
                //处理场次订单详情
                else if (meta.SourceName == '110004') {
                    CourtOrderDetail.dealMessage(value, soms, callback);
                }
                //处理商品订单明细
                else if (meta.SourceName == '110005') {
                    GoodsOrderDetail.dealMessage(value, soms, callback);
                }
                //处理灯控数据
                else if (meta.SourceName == '13000') {
                    CourtLightDetail.dealMessage(value, soms, callback);
                }
                //商品当前库存量
                else if (meta.SourceName == '14000') {
                    value.CreateTime = meta.CreateTime;
                    GoodsInventory.dealMessage(value, soms, callback);
                }
                else {
                    callback(err, result);
                }
                //
            } else {
                callback(err, result);
            }
        });
    };

};


module.exports = new message();
