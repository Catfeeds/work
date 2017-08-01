var express = require('express');
var router = express.Router();
var moment = require('moment');
var index = require('../controllers/index');
var venue = require('../controllers/venue');
var spuser = require('../controllers/spuser');
var wxreport = require('../controllers/wxreport'); // 报表控制器
var sms = require('../controllers/sms');
var common = require('../util/common');
var test = require('../controllers/test');
var order = require('../controllers/order'); // 旧报表-首页
var apiController = require('../controllers/api');
var $binding = require('../controllers/binding'); //新公众号绑定

router.get('/wechatbind', function(req, res, next) {
  res.render('wechatbind');
});
router.get('/wechatbindlist', function(req, res, next) {
  res.render('wechatbindlist');
});
//不需验证的路径
var is_allowed_path = ['/', '/binding', '/binding/oauth', '/wx', '/spuser/oauth', '/spuser/login', '/spuser/pwdkey'];

// 对外服务的api-不进行验证
var api_allowed_path = ['/api/bind_phone_list'];

//处理所有请求
router.all('*', function (req, res, next) {
    //测试
    if (process.env.NODE_ENV === 'development' && req.path === '/test') {
        next();
        return;
    }

    if (is_allowed_path.indexOf(req.path) !== -1) {
        next();
        return;
    }

    // 对外服务的api-不进行验证
    if (api_allowed_path.indexOf(req.path) !== -1) {
        next();
        return;
    }

    if (['/sms/getSMSCode', '/sms/checkCode'].indexOf(req.path) !== -1 && !req.session.isMobileCheck && req.session.openId && req.session.spuserId) {
        next();
        return;
    }

    //新服务号只需openId
    if (req.session.openId && ((req.session.spuserId && req.session.isMobileCheck) || req.session.newWechatId)) {
        next();
        return;
    }

    //console.log(req.path);
    //angular未登录
    if (req.path == '/venue/ucenter' || req.path == '/wx') {
        res.json({success: true, errorMsg: '未登录', data: []});
        res.end();
        return;
    }
    //ajax未登录
    if (req.xhr) {
        res.json({status: -1, msg: '未登录', data: []});
        res.end();
        return;
    }
    //其他
    res.redirect('/');

});

//测试
router.get('/test', test.test);

//报表首页
router.get('/', index.open);
router.get('/wx', index.wx);

//接口
router.post('/sms/getSMSCode', sms.getSMSCode);//发送验证号短信
router.post('/sms/checkCode', sms.checkCode);//验证短信
router.get('/venue/ucenter', venue.ucenter);

/**
 * 馆长用户login
 */
router.get('/spuser/oauth', spuser.oauth);
router.post('/spuser/login', spuser.login);
router.get('/spuser/pwdkey', spuser.pwdkey);
router.get('/spuser/logout', spuser.logout);


//报表页
router.get('/wxreport-:venueId', wxreport.index);
//报表首页
router.get('/wxreport/getReportIndexData', wxreport.getReportIndexData);

// 储值卡报表
router.get('/wxreport/getstoredata', wxreport.getstoredata);

// 开灯记录
router.get('/wxreport/getcourtdata', wxreport.getcourtdata);


// 开灯记录报表
router.get('/wxreport/lightDuration', wxreport.lightDuration);

// 开灯记录报表-图形展示
router.get('/wxreport/lightreport', wxreport.lightReport);

// 商品报表
router.get('/wxreport/salereport', wxreport.salesReport);



//------------- 下面为旧版报表的路由----------------------

// 报表首页
router.get('/order/dailyRpt', order.dailyReport);

// 收入报表
router.get('/order/incomeRpt', order.incomeReport);

// 订单报表
router.get('/order/orderRpt', order.orderReport);

// 会员报表
router.get('/order/memberRpt', order.memberReport);



//---------------下面是提供对外服务的接口路由---------------------
// 通过馆掌app_id获取绑定的微信用户列表会员报表
router.get('/api/bind_phone_list', apiController.bindPhoneList);

//新服务号首页
router.get('/binding', $binding.index);
router.get('/binding/oauth', $binding.oauth);
router.get('/binding/login', $binding.login);
router.get('/binding/getSMSCode', $binding.getSMSCode);
router.get('/binding/checkSMSCode', $binding.checkSMSCode);
router.get('/binding/unbind', $binding.unbind);
router.get('/binding/bindingInfo', $binding.bindingInfo);
router.get('/venue/venueList', venue.venueList);


module.exports = router;
