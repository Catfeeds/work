var fs = require('fs');
var log4js = require('log4js');

function log(){
	this.log4js = null;
	this.logPath = '';
	this.loger = null;

	this.init = function(logFile){
		this.setLogPath();
		this.log4js = log4js;
		this.log4js.configure({
		  appenders: [
		    { type: 'console' },//暂不输出console
		    {
		    	type: 'file',
		    	filename: this.logPath+logFile+'.log',
		    	category: 'normal'
			}
		  ]
		});
		this.loger = this.log4js.getLogger('normal');
		this.loger.setLevel('debug');
	};

	this.write = function(logFile, userId, title, res, level){
		this.init(logFile);
		if(userId != 0){		// 有传userId记录
			title =' ('+ userId + ')' +  title;
		}
		title = title + ' >';
	    switch(level){
	        case 'info':
	            this.loger.info(title, res);
	        break;
	        case 'warn':
	            this.loger.warn(title, res);
	        break;
	        case 'debug':
	            this.loger.debug(title, res);
	        break;
	        case 'error':
	        default:
	            this.loger.error(title, res);
	    }
	    this.release();
	};

	this.devWrite = function(logFile, title, res, level){
		if(process.env.NODE_ENV == 'development'){
			this.write(logFile, title, {'dev':res}, level);
		}
	};

	//检查日志目录是否存在
	this.setLogPath = function(){
		var path='/home/logs/weixin.guanzhang.me/';     //设置Log目录路径
		var datePath = '';
	    var date = new Date();
	    var m = new String(date.getMonth() + 1);
	    var d = new String(date.getDate());
	    if(m.length ==1) m = '0' + m;
	    if(d.length ==1) d = '0' + d;
	    datePath = date.getFullYear() + m + d;
		var dir = path + datePath+'/';
	    if(!fs.existsSync(dir)){
	        fs.mkdirSync(dir);
	    }
	    this.logPath = dir;
	    return dir;
	};

	this.release = function(){
		this.log4js = null;
		this.logPath = '';
		this.loger = null;
	};
}

module.exports = new log();