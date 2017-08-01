var config = require('../conf/config').apiUrl;
var common = require('../util/common');
// api基础对象
var base = {};

var apiKey = '4b111cc14a33b88e37e2e2934f493458';
var orderApiKey = 'orderapi4a33b88e37e2e2934f493458';

base.getOrderApiKey = function(){
  return orderApiKey;
};

base.getApiKey = function() {
  return apiKey;
};

base.getApiUrl = function(name) {
  return config[name];
};

base.setPublicParams= function(params){
  params.client_time = parseInt(new Date().getTime()/1000) + '';
  params.utm_source = 'whales';
  params.utm_medium = 'whales';
  return params;
};
// 给对象添加 api_sign
base.addSign= function(object, apiKey) {
  object = common.sort(object);
  object.api_sign = this.makeSign(object, apiKey);
  return object;
};
// 生成api sign
base.makeSign = function(object, apiKey) {
  var string = "";
  for (var i in object) {
    string += i +"="+object[i]+"&";
  }
  //var sign = this.md5(querystring.stringify(object) + '&' + apiKey);
  var sign = common.md5(string + apiKey);
  return sign;
};

// 将对象导出
module.exports = base;