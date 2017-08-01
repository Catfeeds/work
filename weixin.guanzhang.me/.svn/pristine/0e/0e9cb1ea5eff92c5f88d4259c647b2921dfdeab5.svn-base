define(['app', 'controller'], function(wx){
    wx.config(['$routeProvider', function($routeProvider) {
		//默认
		$routeProvider.when('/', { 
			templateUrl : root + 'wx/ucenter.html?ver=' + ver,
			controller  : 'ucenterCtrl',
	        resolve: {
	            data: ['$q', function($q){
	                var defer = $q.defer();
	                setTimeout(function(){
	                    defer.resolve('test1');
	                }, 1000);
	                return defer.promise;
	            }]
	        }
		});
		//用户中心
		$routeProvider.when('/ucenter', { 
			templateUrl : root + 'wx/ucenter.html?ver=' + ver,
			controller  : 'ucenterCtrl',
	        resolve: {
	            data: ['$q', function($q){
	                var defer = $q.defer();
	                setTimeout(function(){
	                    defer.resolve('test1');
	                }, 1000);
	                return defer.promise;
	            }]
	        }
		});
		//登录
		$routeProvider.when('/mobile_login', {
			templateUrl : root + 'wx/mobile_login.html?ver=' + ver,
			controller  : 'mobileLoginCtrl',
			resolve: {
				data: ['$q', function($q){
					var defer = $q.defer();
					setTimeout(function(){
						defer.resolve('test1');
					}, 1000);
					return defer.promise;
				}]
			}
		});
		//登录
		$routeProvider.when('/login', { 
			templateUrl : root + 'wx/login.html?ver=' + ver,
			controller  : 'loginCtrl',
	        resolve: {
	            data: ['$q', function($q){
	                var defer = $q.defer();
	                setTimeout(function(){
	                    defer.resolve('test1');
	                }, 1000);
	                return defer.promise;
	            }]
	        }
		});
		//首页
		$routeProvider.when('/home/:id', { 
			templateUrl : root + 'wx/home.html?ver=' + ver,
			controller  : 'homeCtrl',
	        resolve: {
	            data: ['$q', function($q){
	                var defer = $q.defer();
	                setTimeout(function(){
	                    defer.resolve('test1');
	                }, 1000);
	                return defer.promise;
	            }]
	        }
		});
		//首页
		$routeProvider.when('/home/:id/:date', { 
			templateUrl : root + 'wx/home.html?ver=' + ver,
			controller  : 'homeCtrl',
	        resolve: {
	            data: ['$q', function($q){
	                var defer = $q.defer();
	                setTimeout(function(){
	                    defer.resolve('test1');
	                }, 1000);
	                return defer.promise;
	            }]
	        }
		});
		//收入
		$routeProvider.when('/income/:id', { 
			templateUrl : root + 'wx/income.html?ver=' + ver,
			controller  : 'incomeCtrl',
	        resolve: {
	            data: ['$q', function($q){
	                var defer = $q.defer();
	                setTimeout(function(){
	                    defer.resolve('test1');
	                }, 1000);
	                return defer.promise;
	            }]
	        }
		});
		//订单
		$routeProvider.when('/order/:id', { 
			templateUrl : root + 'wx/order.html?ver=' + ver,
			controller  : 'orderCtrl',
	        resolve: {
	            data: ['$q', function($q){
	                var defer = $q.defer();
	                setTimeout(function(){
	                    defer.resolve('test1');
	                }, 1000);
	                return defer.promise;
	            }]
	        }
		});
		//会员
		$routeProvider.when('/member/:id', { 
			templateUrl : root + 'wx/member.html?ver=' + ver,
			controller  : 'memberCtrl',
	        resolve: {
	            data: ['$q', function($q){
	                var defer = $q.defer();
	                setTimeout(function(){
	                    defer.resolve('test1');
	                }, 1000);
	                return defer.promise;
	            }]
	        }
		});
		//404
        $routeProvider.otherwise({
            redirectTo: '/'
        });
	}]);
})