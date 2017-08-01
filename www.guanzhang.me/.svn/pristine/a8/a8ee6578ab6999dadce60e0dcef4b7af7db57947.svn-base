'use strict';
let  ERROR_TIME  = 0;
const ERROR_TIME_MAX = 10
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
const db         = require('../base/db');
const mysql      = require('mysql');
/*var connection;
var db_config = {  
		 host     : db.host,
		 user     : db.user,
		 password : db.password,
		 port : db.port,
		 database : db.database,
    }; */

var pool = mysql.createPool({
    connectionLimit:2,//连接池最多可以创建连接数
    host     : db.host,
	user     : db.user,
	password : db.password,
	port : db.port,
	database : db.database,
    queueLimit:8 // 队伍中等待连接的最大数量，0为不限制。
});

/*
function handleDisconnect() {  

    connection = mysql.createConnection(db_config); // Recreate the connection, since  
                                                    // the old one cannot be reused.  

    connection.connect(function(err) {  
      log.info('connect');            // The server is either down  
      if(err) {                                     // or restarting (takes a while sometimes).  
        log.error('connection.connect',err.code); 
        setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,  
      }                                     // to avoid a hot loop, and to allow our node script to  
    });                                     // process asynchronous requests in the meantime.  
                                            // If you're also serving http, display a 503 error.  
    connection.on('error', function(err) {  
      log.error('connection_Error', err.code); // 'ER_BAD_DB_ERROR'
      if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually  
        handleDisconnect();                         // lost due to either server restart, or a  
      } else {                                      // connnection idle timeout (the wait_timeout                                  
        log.error('connection_Error', err); // 'ER_BAD_DB_ERROR'
        throw err;   // server variable configures this)  
      }  
    });  
  }  

handleDisconnect();
*/
/*

connection.connect(err => {
  if (err) {
    log.error('connection.connect',err);
    reload();
  }
});

connection.on('error', function(err) {
  log.error('connection_Error',err.code); // 'ER_BAD_DB_ERROR'
  reload();
});

// 数据库操作报错10次抛出错误重启
function reload(){
  ERROR_TIME += 1;
  if (ERROR_TIME >= ERROR_TIME_MAX) {
    log.error('connection_error_ERROR_TIME:',ERROR_TIME);
    throw new Error('MAX_ERROR_TIME: '+ERROR_TIME);
    return false;
  } 
}
*/
module.exports = pool;