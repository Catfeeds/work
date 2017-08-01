'use strict';
/*
 * 测试环境
 * 帐号： whales
 * 密码：ds83H9dY9djp
 * ip：121.41.112.116
 * 端口：3306
 */

var dbBaseDevelop = {
  user: 'whales',
  host: '121.41.112.116',
  password: 'ds83H9dY9djp',
  port: '3306',
  database: 'whale_business_db',
}

// 正式环境
var dbBaseProduce = {
  user: 'whales',
  host: '121.41.112.116',
  password: 'ds83H9dY9djp',
  port: '3306',
  database: 'whale_business_db',
}

if (process.env.NODE_ENV === 'development') {
  module.exports = dbBaseDevelop;
} else {
  module.exports = dbBaseProduce;
}
  
