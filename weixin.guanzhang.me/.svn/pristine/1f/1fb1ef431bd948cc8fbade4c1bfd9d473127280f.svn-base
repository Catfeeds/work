define(['app'], function(wx) {
    'use strict';
    wx.filter('abs', ['$sce', function ($sce) {
		return function (val) {
			return Math.abs(val);
		};
	}]);
	//设置周
	wx.filter('setWeek', ['$sce', function ($sce) {
		return function (val) {
			var week = ['日','一','二','三','四','五','六'];
			return week[val];
		};
	}]);
	//设置周
	wx.filter('setToWeek', ['$sce', function ($sce) {
		return function (val) {
			var _day = new Date(val.substr(0,4), parseInt(val.substr(4,2))-1, val.substr(6,2)).getDay(),
				week = ['日','一','二','三','四','五','六'];
			return week[_day];
		};
	}]);
	//设置截取字符串
	wx.filter('setDay', ['$sce', function ($sce) {
		return function (val) {
			return val.substr(4,2) + '/' + val.substr(6,2);
		};
	}]);
	//设置截取字符串
	wx.filter('substr', ['$sce', function ($sce) {
		return function (val, start, end) {
			if(!val){
				return;
			}
			return val.substr(start,end);
		};
	}]);
});