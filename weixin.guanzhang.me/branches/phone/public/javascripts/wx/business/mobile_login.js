define(['base64'], function() {
	'use strict';
	return function ($rootScope, $scope, $http, $timeout, $routeParams, $location) {
		$rootScope.calendarShow = false;
		$rootScope.footerShow = false;
		var loginH = document.querySelector('#login').clientHeight,
			winH = document.documentElement.clientHeight;
		document.querySelector('#login').style.height = loginH > winH ? loginH : winH + 'px';
		var msgTime,
			telReg = /^1[34578][0-9]{9}$/;
		$scope.checked = true;
		$scope.msgTime = 0;
		//发送短信
		$scope.sendMsg = function () {
			var tel = $scope.tel,
				checked = $scope.checked;
			if (!tel) {
				$rootScope.showTips('请输入手机号码');
				return;
			}
			if (!telReg.test(tel)) {
				$rootScope.showTips('请输入正确的手机号码');
				return;
			}
			if (!checked) {
				$rootScope.showTips('请阅读并接受馆掌会员服务注册协议');
				return;
			}
			if ($scope.msgTime > 0) {
				return;
			}
			$http.post('/sms/getSMSCode', {
				mobile: $scope.tel,
				time: new Date().getTime()
			}, {
				timeout: 6000
			}).success(function (res) {
				if (!res.success) {
					if (res.code == '-1001') {
						$rootScope.loadShow = false;
						$rootScope.showTips(res.errorMsg, 1000, function () {
							$location.path('/login');
						});
						return;
					}
					if (res.code == '-1002') {
						$rootScope.loadShow = false;
						$rootScope.showTips(res.errorMsg, 1000, function () {
							window.location.href = 'getMemberOpenid.html';
						});
						return;
					}
					$rootScope.showTips(res.errorMsg);
					return;
				}
				$scope.msgTime = 60;
				msgTime = $interval(function () {
					if ($scope.msgTime > 0) {
						$scope.msgTime = $scope.msgTime - 1;
					} else {
						$interval.cancel(msgTime);
					}
				}, 1000);
			}).error(function (res) {
				$rootScope.showTips('网络不给力，请稍后重试...');
			})
		}
		//点击切换选中协议事件
		$scope.changeChecked = function () {
			$scope.checked = $scope.checked ? false : true;
		}
		//提交
		$scope.confirm = function () {
			var tel = $scope.tel,
				codeMsg = $scope.codeMsg,
				checked = $scope.checked;
			if (!tel) {
				$rootScope.showTips('请输入手机号码');
				return;
			}
			if (!telReg.test(tel)) {
				$rootScope.showTips('请输入正确的手机号码');
				return;
			}
			if (!codeMsg) {
				$rootScope.showTips('请输入短信验证码');
				return;
			}
			if (codeMsg.length != 4) {
				$rootScope.showTips('请输入正确的短信验证码');
				return;
			}
			if (!checked) {
				$rootScope.showTips('请阅读并接受馆掌会员服务注册协议');
				return;
			}


			$rootScope.loadShow = true;
			$http.post('/sms/getSMSCode', {
				mobile: tel,
				smsCaptcha: codeMsg,
				time: new Date().getTime()
			}, {
				timeout: 6000
			}).success(function (res) {
				$rootScope.loadShow = false;
				if (!res.success) {
					if (res.code == '-1001') {
						$rootScope.loadShow = false;
						$rootScope.showTips(res.errorMsg, 1000, function () {
							$location.path('/login');
						});
						return;
					}
					if (res.code == '-1002') {
						$rootScope.loadShow = false;
						$rootScope.showTips(res.errorMsg, 1000, function () {
							window.location.href = 'getMemberOpenid.html';
						});
						return;
					}
					$rootScope.showTips(res.errorMsg);
					return;
				}
				$rootScope.showTips('验证成功，正在为您跳转...');
				$timeout(function () {
					if (res.data.cards == 1) {
						$location.path('/detail/' + res.data.id);
					} else {
						$location.path('/ucenter');
					}
				}, 800)
			}).error(function (res) {
				$rootScope.loadShow = false;
				$rootScope.showTips('网络不给力，请稍后重试...');
			})
		}
	}
});

