define(['base64'], function() {
	'use strict';
	return function($rootScope, $scope, $http, $timeout, $routeParams, $location){
		$rootScope.calendarShow = false;
		$rootScope.footerShow = false;
		$scope.loginCss = {
			height: window.innerHeight + 'px'
		}
		//登录
		$scope.loginFun = function(){
			$scope.loginShow = true;
			var _account = $scope.account,
				_password = $scope.password;
			if(!_account){
				$rootScope.showTips('请填写馆掌商户账号', 1000, function(){
					$scope.loginShow = false;
				});
				return;
			}
			if(!_password){
				$rootScope.showTips('请填写登录密码', 1000, function(){
					$scope.loginShow = false;
				});
				return;
			}
			if(_password.length<6){
				$rootScope.showTips('请填写正确的登录密码', 1000, function(){
					$scope.loginShow = false;
				});
				$scope.loginShow = false;
				return;
			}
			console.log($scope.key);
			if(!$scope.key){
				getKey();
				$rootScope.showTips('网络不给力，请稍后重试...', 1000);
				return;
			}
			$rootScope.loadingShow = true;
			$http.post(root + 'spuser/login',{
				username : _account,
				password : new Base64().encode(_password + '_gz_' + $scope.key),
				time: new Date().getTime()
			},{
				timeout: 0
			}).success(function(res){
				$scope.loginShow = false;
				$rootScope.loadingShow = false;
				if(!res.success){
					$rootScope.showTips(res.errorMsg, 1000);
					if(res.code == '-1000'){
						//缺少openID
						$timeout(function(){
							window.location.href = window.location.origin + tmpRoot + 'wx/getOpenid.html';
						},1000)
					}
					return;
				}
				$rootScope.isLogin = true;
				$location.path('/ucenter');
			}).error(function(res){
				$rootScope.loadingShow = false;
				$scope.loginShow = false;
				$rootScope.showTips('登录失败，请稍后重试...', 1000);
			})
		}
		//获取公共密钥
		function getKey(){
			$http.get(root + 'spuser/pwdkey',{
				params:{
					time: new Date().getTime()
				}
			}).success(function(res){
				if(!res.success){
					return;
				}
				$scope.key = res.data;
			}).error(function(){
				$rootScope.showTips('网络不给力，请稍后重试...', 1000);
			})
		}
		//获取公共密钥
		getKey();
	}
})
