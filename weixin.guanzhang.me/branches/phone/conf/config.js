/**
 * 配置
 * @type {[type]}
 */
var config = {};
var env = process.env.NODE_ENV;

if(env === 'production'){
    config = require('./pro');
}else if(env === 'test'){
    config = require('./test');
}else{
    config = require('./dev');
}

/**
 * 取配置
 * @param  {[type]} key [description]
 * @return {[type]}     [description]
 */
config.getConfig = function (key) {
    var keys = key.split('.');
    var obj = config;
    var flag = true;
    if(typeof obj == "object"){
        for(var i=0;i<keys.length;i++){
            obj = obj[keys[i]];
            if(typeof obj != "object"){
                flag = false;
                break;
            }
        }
    }else{
        flag = false;
    }
    return flag ? obj : '';
};


module.exports = config;