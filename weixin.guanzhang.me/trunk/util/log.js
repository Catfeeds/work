var fs = require('fs');
var crypto = require('crypto');
var log4js = require('log4js');
var common = require('./common');
function UtilLoger(){
	this.initPath = {};//存储配置好的loger对象

	this.init = function(logFile){	
		var loger;			
		var dir = this.setLogPath(logFile);
		var file = dir+logFile+'.log';
		
		var md5 = crypto.createHash('md5');
		var key = md5.update(file).digest("hex");
		//同路径loger只能初始化一次，否则会打开多个文件无法关闭
		if(!this.initPath[key]){
			log4js.configure({
			  appenders: [
			    { type: 'console' },
			    { 
			    	type: 'file', 
			    	filename: file, 
			    	category: 'normal' 
				}
			  ]
			});						
			loger = log4js.getLogger('normal');
			loger.setLevel('debug');
			this.initPath[key] = common.clone(loger);
		}else{
			loger = this.initPath[key];
		}
		return loger;
	}

	this.write = function(logFile,userId, title, res, level){
		var loger = this.init(logFile);
		if(userId != 0){		// 有传userId记录
			title =' ('+ userId + ')' +  title;
		}
		title = title + ' >';
	    switch(level){
	        case 'info':
	            loger.info(title, res);
	        break;
	        case 'warn':
	            loger.warn(title, res);
	        break;
	        case 'debug':
	            loger.debug(title, res);
	        break;
	        case 'error':
	        default:
	            loger.error(title, res);
	    }
	}

	this.devWrite = function(logFile, title, res, level){
		if(process.env.NODE_ENV == 'development'){
			this.write(logFile, title, {'dev':res}, level);
		}
	}

	//检查日志目录是否存在
	this.setLogPath = function(logFile){
		var datePath = ''; 
	    var date = new Date();
	    var m = new String(date.getMonth() + 1);
	    var d = new String(date.getDate());
	    if(m.length ==1) m = '0' + m;
	    if(d.length ==1) d = '0' + d;
	    datePath = date.getFullYear() + m + d;
	    var timeNow = datePath+ ' ' +date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()+'.'+date.getMilliseconds();
	    var dir = '/home/logs/weixin.guanzhang.me/'+ datePath+'/';
	    if(!fs.existsSync(dir)){
	        fs.mkdirSync(dir, 0777);
	        //生成日志文件
	        fs.writeFileSync(dir+logFile+'.log', 'create on '+timeNow +'\r\n', {'mode':0777});
	    }
	    return dir; 
	}
	
	this.release = function(){
		this.log4js = null;
		this.logPath = '';
		this.loger = null;
	};
}

  
module.exports = new UtilLoger();