'use strict';

const checkPhone = require('../tool/checkPhone');
const mail       = require('../base/mail');
const bunyan     = require('bunyan');
const log        = bunyan.createLogger({
  name: 'www.guanzhang.com',
  streams: [
    {
      level: 'info',
      stream: process.stdout            // log INFO and above to stdout
    },
    {
      level: 'error',
      path: '/home/logs/www.guanzhang.me/error.log'  // log ERROR and above to a file
    }
  ]
});
var pool = require('./db');
//const reload = require('./db').reload;


/*
 * venue: 场馆名
 * link_men: 用户名
 * link_phone: 手机号码
 * province: 省份
 * city: 城市
 * address: 地址
 * 
 */

const _error = {
  venue:{
    msg:'请输入正确的场馆名',
    status:'1000',
    checkFn:checkEmpty,
  },
  link_men:{
    msg:'请输入正确的名字',
    status:'1001',
    checkFn:checkEmpty,
  },
  province:{
    msg:'请输入正确的省份',
    status:'1002',
    checkFn:checkEmpty,
  },
  link_phone:{
    msg:'请输入正确的手机号码',
    status:'1003',
    checkFn:checkPhone,
  },
  city:{
    msg:'请输入正确的城市',
    status:'1004',
    checkFn:checkEmpty,
  },
  address:{
    msg:'请输入正确的地址',
    status:'1005',
    checkFn:checkEmpty,
  },
  dbError:{
    // 数据库错误
    msg:'操作错误',
    status:'1006',
  },
}

const join = {
  formDataArray:[],
  status: '0000',
  msg: 'success',
  reset: function reset(){
    join.status = '0000';
    join.msg = 'success';
  },
  add: function add (req, res, next) {
    log.info(req.body);
    log.info(join.status);
    const body = req.body || {};

    let venue = body.venue || '';
    let link_men = body.link_men || '';
    let link_phone = body.link_phone || '';
    let province = body.province || '';
    let city = body.city || '';
    let address = body.address || '';

    join.formDataArray = [ 
      { name:'venue', value:venue, error:_error.venue }, 
      { name:'link_men', value:link_men, error:_error.link_men }, 
      { name:'province', value:province, error:_error.province }, 
      { name:'city', value:city, error:_error.city }, 
      { name:'address', value:address, error:_error.address }, 
      { name:'link_phone', value:link_phone, error:_error.link_phone }, 
    ];

    // 字符串去前后空格
    join.formDataArray.forEach(item => {
      item.value = String(item.value).trim();
    });

    // 格式校验
    join.formDataArray.forEach(item => {
      if(!item.error.checkFn(item.value)){
        join.status = item.error.status;
        join.msg = item.error.msg;
      }
    });

    if (join.status === '0000') {
      join.searchDB(req, res, next);

    } else {
      res.json({status:join.status,msg:join.msg,data:{}});
      join.reset();
    }
  },
  searchDB: function searchDB(req, res, next){
    // 数据库操作
    // 
    // 插入数据
    const dateNow = ~~(Date.now() / 1000);
    const signsAddSql = 'INSERT INTO bs_signs(venue,link_men,province,city,address,link_phone,create_time,followup_content,followup_status,req_date,spuser_id) VALUES(?,?,?,?,?,?,?,?,?,?,?)';
    const signsAddSql_Params = [
      join.formDataArray[0].value,
      join.formDataArray[1].value,
      join.formDataArray[2].value,
      join.formDataArray[3].value,
      join.formDataArray[4].value,
      join.formDataArray[5].value,
      dateNow ,
      null,
      '已申请',
      dateNow,
      dateNow,
    ];
      
    pool.getConnection(function (err, conn) {
        if (err) {
        	log.error('connection.POOL',err);
        	throw err;
        }
        
        
        conn.query(signsAddSql, signsAddSql_Params, (err, result) => {
            if (err) {
              log.error('connection.query',err);
              //reload();
              join.status = _error.dbError.status;
              join.msg = _error.dbError.msg;
            }

            // 发邮件
            if (join.status === '0000') {
              mail.sendMail(join.formDataArray);
            }

            res.json({status:join.status,msg:join.msg,data:{}});
            join.reset();

          });
    });
    
    
    // 查表
    // const signsGetSql = 'SELECT * FROM bs_signs';
    // connection.query(signsGetSql, function(err, result) {
    //   if (err) {
    //     log.error('connection.query',err);
    //   }
    //   log.info('connection.query',result);
    // });
  },
}

function checkEmpty(str){
  if (str === '')
    return false;
  else
    return true;
}

module.exports = join;