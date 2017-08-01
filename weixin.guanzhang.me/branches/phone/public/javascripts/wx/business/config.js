//  ==========
//  = 配置路径 =
//  ==========
require.config({
  	//配置路径
    paths: {
    	'domReady': '../../require/domReady.min',
        'angular': '../../angular/angular.all.min',
        'des': '../../des/des.min',
        'base64': '../../base64/base64.min',
        'chart': '../../chart/chart.min'
    },
    //这个配置是你在引入依赖的时候的包名
    shim:{
        'angular':{
            exports: 'angular'
        }
    },
    //默认启动引用
    deps: ['bootstrap'],
    waitSeconds: 0,
    //版本号
    urlArgs: "bust=" +  ver
});
define('bootstrap',['require', 'angular', 'app', 'run', 'filter', 'routes'],function(require, angular){
    'use strict';
    require(['domReady!'], function (document) {
	    angular.bootstrap(document, ['wx']);
	    document.querySelector('#max').style.display = 'block';
	});
})
define('app',['require', 'angular'], function(require, angular){
    return angular.module('wx', ['ngRoute', 'ngMessages', 'ngSanitize', 'ngTouch', 'ngAnimate']);
})
//获取指定名称的cookie的值
function getCookie(objName){
    var arrStr = document.cookie.split("; ");
    for(var i = 0;i < arrStr.length; i++){
        var temp = arrStr[i].split("=");
        if(temp[0] == objName)
            return unescape(temp[1]);
    }
}
function setCookie(name, value, days){
	var _date = new Date();
	_date.setDate(_date.getDate()+days);
	document.cookie = name + '=' + escape(value)+((days==null) ? '' : ';expires='+_date.toGMTString());
}

function format(_date,fmt){
	var o = {
		"M+": _date.getMonth() + 1, //月份
		"d+": _date.getDate(), //日
		"h+": _date.getHours(), //小时
		"m+": _date.getMinutes(), //分
		"s+": _date.getSeconds(), //秒
		"S":  _date.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt)){
		fmt = fmt.replace(RegExp.$1, (_date.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for (var k in o){
		if (new RegExp('(' + k + ')').test(fmt)){
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
}
//校验小于10的月份或日期转为0x的字符串
function checkDate(val){
	if(parseInt(val)<10){
		val = '0' + parseInt(val);
	}
	return val;
}
