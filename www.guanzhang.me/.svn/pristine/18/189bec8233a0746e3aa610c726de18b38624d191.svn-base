var express = require('express');
var router = express.Router();
var path = require('path');
var MobileDetect = require('mobile-detect');
var multipart = require('connect-multiparty');
var join = Object.create(require('../api/join'));

/* GET home page. */
router.get('/', pageIndex);
/* GET home page. */
router.get('/index(.html)?', pageIndex);

router.get('/help.zip', helpDownload);



function helpDownload(req, res, next) {
  var filename = 'help.zip';
  var downloadPath = path.dirname(__filename).replace("/routes", "") + '/public/help/' + filename;
  res.download(downloadPath);
}

function pageIndex(req, res, next){
  var mobiledetect = new MobileDetect(req.headers['user-agent']);
  if (mobiledetect.mobile()) {
    res.render('mobile', { title: '馆掌' });
  } else {
    res.render('index', { title: '馆掌' ,opt : {indexClass:'cur'} });
  }
}

/* GET join page. */
router.get('/join(.html)?', function(req, res, next) {
  res.render('join', { title: '加入我们' ,opt : {} });
});


/* GET official page. */
router.get('/official(.html)?', function(req, res, next) {
  res.render('official', { title: '公众号' ,opt : {officialClass:'cur'}});
});

/* GET platform page. */
router.get('/platform(.html)?', function(req, res, next) {
  res.render('platform', { title: '平台' ,opt : {platformClass:'cur'}});
});


/* GET report page. */
router.get('/report(.html)?', function(req, res, next) {
  res.render('report', { title: '报表' ,opt : {reportClass:'cur'}});
});

/* GET hardware page. */
router.get('/hardware(.html)?', function(req, res, next) {
  res.render('hardware', { title: '硬件' ,opt : {hardwareClass:'cur'}});
});

/* GET product page. */
router.get('/product(.html)?', function(req, res, next) {
  // res.render('product', { title: '产品' ,opt : {productClass:'cur'}});
  res.render('system', { title: '系统' ,opt : {systemClass:'cur'}});
});

/* GET system page. */
router.get('/system(.html)?', function(req, res, next) {
  res.render('system', { title: '系统' ,opt : {systemClass:'cur'}});
});

/* GET mobile page. */
router.get('/mobile(.html)?', function(req, res, next) {
  res.render('mobile', { title: '馆掌' });
});

/* GET mobile_join page. */
router.get('/mobile_join(.html)?', function(req, res, next) {
  res.render('mobile_join', { title: '馆掌' });
});

/* GET 404 page. */
router.get('/404(.html)?', function(req, res, next) {
  res.render('404', { title: '馆掌' });
});

/* POST /join/add page. */
router.post('/api/join/add', multipart(), join.add);

module.exports = router;
