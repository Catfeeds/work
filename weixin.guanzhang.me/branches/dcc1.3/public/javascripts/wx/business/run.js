define(['app'], function(wx) {
    'use strict';
    wx.run(function($rootScope, $timeout){
    	$rootScope.title = '馆掌';
		//设置今天日期
		var today = new Date(),
			week = ['日','一','二','三','四','五','六'];
		$rootScope.today = format(today,'yyyyMMdd');
		$rootScope.todayWeek = week[today.getDay()];
		if(today.getDay()>0){
			$rootScope.yesterdayWeek = week[today.getDay()-1];
		}else{
			$rootScope.yesterdayWeek = week[week.length-1];
		}
		//改变hash时检测用户信息 
	    $rootScope.$on('$locationChangeSuccess', function (event, next, current) {
	    	document.body.scrollTop = 0;
	    });
	    $rootScope.$on('$routeChangeStart', function (event, next, current) {
	    	_loading.show();
	    });
	    $rootScope.$on('$routeChangeSuccess', function (event, next, current) {
    		$timeout(function(){
	    		_loading.hide();
    		},1000)
	    });
	    $rootScope.getUserId = function(){
	    	var userId = getCookie('gz_userId');
	    	if(userId && userId!='-1'){
	    		$rootScope.isLogin = true;
	    	}else{
	    		$rootScope.isLogin = false;
	    	}
	    }
	    //获取用户信息
	    $rootScope.getUserId();
	});
});