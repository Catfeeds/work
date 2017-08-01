define(['app'], function(wx) {
    'use strict';
    //提示
    wx.controller('tips', ['$rootScope', '$timeout', function($rootScope, $timeout){
	    $rootScope.showTips = function(word, time, callback){
	    	time = time || 1000;
			$rootScope.tipsShow = true;
			$rootScope.tips = word;
			$timeout(function(){
				$rootScope.tipsShow = false;
				if(callback && typeof callback == 'function'){
					callback();
				}
			},time)
		};
    }])
    //登录
    wx.controller('loginCtrl', ['$rootScope', '$scope', '$http', '$timeout', '$routeParams', '$location', function($rootScope, $scope, $http, $timeout, $routeParams, $location){
    	require(['login' ], function (loginCtrl) {
		    loginCtrl($rootScope, $scope, $http, $timeout, $routeParams, $location);
		});
    }]);
	//手机验证登录
	wx.controller('mobileLoginCtrl', ['$rootScope', '$scope', '$http', '$timeout', '$routeParams', '$location', function($rootScope, $scope, $http, $timeout, $routeParams, $location){
		require(['mobile_login' ], function (loginCtrl) {
			loginCtrl($rootScope, $scope, $http, $timeout, $routeParams, $location);
		});
	}]);
    //用户中心
    wx.controller('ucenterCtrl', ['$rootScope', '$scope', '$http', '$timeout', '$routeParams', '$location', function($rootScope, $scope, $http, $timeout, $routeParams, $location){
    	require(['ucenter'], function (ucenterCtrl) {
		    ucenterCtrl($rootScope, $scope, $http, $timeout, $routeParams, $location);
		});
    }]);
    //日历
    wx.controller('calendarCtrl', ['$rootScope', '$scope', '$http', '$timeout', '$routeParams', '$location', function($rootScope, $scope, $http, $timeout, $routeParams, $location){
    	require(['calendar'], function (calendarCtrl) {
		    calendarCtrl($rootScope, $scope, $http, $timeout, $routeParams, $location);
		});
    }]);
    //主页
    wx.controller('homeCtrl', ['$rootScope', '$scope', '$http', '$timeout', '$routeParams', '$location', function($rootScope, $scope, $http, $timeout, $routeParams, $location){
    	require(['home'], function (homeCtrl) {
		    homeCtrl($rootScope, $scope, $http, $timeout, $routeParams, $location);
		});
    }]);
    //收入
    wx.controller('incomeCtrl', ['$rootScope', '$scope', '$http', '$timeout', '$routeParams', '$location', function($rootScope, $scope, $http, $timeout, $routeParams, $location){
    	require(['income'], function (incomeCtrl) {
		    incomeCtrl($rootScope, $scope, $http, $timeout, $routeParams, $location);
		});
    }]);
    //订单
    wx.controller('orderCtrl', ['$rootScope', '$scope', '$http', '$timeout', '$routeParams', '$location', function($rootScope, $scope, $http, $timeout, $routeParams, $location){
    	require(['order'], function (orderCtrl) {
		    orderCtrl($rootScope, $scope, $http, $timeout, $routeParams, $location);
		});
    }]);
    //会员
    wx.controller('memberCtrl', ['$rootScope', '$scope', '$http', '$timeout', '$routeParams', '$location', function($rootScope, $scope, $http, $timeout, $routeParams, $location){
    	require(['member'], function (memberCtrl) {
		    memberCtrl($rootScope, $scope, $http, $timeout, $routeParams, $location);
		});
    }]);
});