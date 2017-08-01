var redis = require("redis");
var log = require('../util/log');
var redisConfig = require('../conf/config').redis;

var client = redis.createClient(redisConfig.port, redisConfig.host);
const REDIS_PREFIX = 'guanzhang:';

//验证密码
if (redisConfig.auth.length > 3) {
    client.auth(redisConfig.auth);
}

//支持设置对象和数组
client.setValue = function (key,value,timeout, callback) {
    key = REDIS_PREFIX + key;
    //转成字符串存取
    client.set(key,JSON.stringify(value), callback);
    //设置过期时间
    client.expire(key, timeout || 3600);
};
//支持设置对象和数组
client.getValue = function (key, callback) {
    key = REDIS_PREFIX + key;
    //转成字符串存取
    var value = '';
    client.get(key, function (err, data) {
        if (!err) {
            try {
                value = JSON.parse(data);
            } catch (e) {
                log.write('redis',0,'JSON转换出错',{err:err,data:data},'error');
            }
        }
        callback(err,value);
    });
};

module.exports = client;