define([], function(){
	'use strict';
	return function($rootScope, $scope, $http, $timeout, $routeParams, $location){
		if(!$rootScope.isLogin){
    		window.location.href = window.location.origin + tmpRoot + 'wx/getOpenid.html';
    		return;
    	}
		$rootScope.calendarShow = false;
		$rootScope.footerShow = false;
		$scope.ucenterCss = {
			'min-height': window.innerHeight + 'px'
		}
		$rootScope.loadingShow = true;
		//获取场馆列表
		$http.get(root + 'venue/ucenter',{
			params:{
				time: new Date().getTime()
			},
			timeout: 6000
		}).success(function(res){
			$rootScope.loadingShow = false;
			if(!res.success){
				$rootScope.showTips(res.errorMsg, 2000);
				return;
			}
			$scope.itemList = res.data;
			$timeout(function(){
				var _h = document.querySelector('.ucenter').clientHeight,
					winH = window.innerHeight;
				if(winH>_h){
					$scope.titleStyle = {
						paddingTop: (winH-_h-50)/2 + 'px'
					}
				}
			})
		}).error(function(res){
			$rootScope.loadingShow = false;
			$rootScope.showTips('获取信息失败，请稍后重试...');
		})
		//解绑
		$scope.unbind = function(name, id){
			$rootScope.confirmShow = true;
			$rootScope.bgShow = true;
			$rootScope.confirmWord = '您确定要解绑' + name + '吗？';
			$rootScope.confirmOkWord = '确定';
			$rootScope.confirmCancelWord = '取消';
			$rootScope.confirmOkFun = function(){
				$rootScope.confirmShow = false;
				$rootScope.bgShow = false;
				$rootScope.confirmWord = null;
				$rootScope.confirmOkWord = null;
				$rootScope.confirmCancelWord = null;
				$rootScope.confirmOkFun = null;

				$rootScope.loadingShow = true;
				$http.get(root + 'spuser/logout',{
					params:{
						venueId: id,
						time: new Date().getTime()
					},
					timeout: 6000
				}).success(function(res){
					$rootScope.loadingShow = false;
					if(!res.success){
						$rootScope.showTips(res.errorMsg);
						return;
					}
					$scope.itemList = res.data;
					if(res.data.length<1){
						$rootScope.showTips('没有可查看的场馆了，请重新绑定场馆...',1000);
						$timeout(function(){
							$location.path('/login');
						},1000)
						return;
					}
					$timeout(function(){
						var _h = document.querySelector('.ucenter').clientHeight,
							winH = window.innerHeight;
						if(winH>_h){
							$scope.titleStyle = {
								paddingTop: (winH-_h-50)/2 + 'px'
							}
						}
					})
				}).error(function(res){
					$rootScope.loadingShow = false;
					$rootScope.showTips('解绑失败，请稍后重试...');
				})
			}
			$rootScope.confirmCancelFun = function(){
				$rootScope.confirmShow = false;
				$rootScope.bgShow = false;
				$rootScope.confirmWord = null;
				$rootScope.confirmOkWord = null;
				$rootScope.confirmCancelWord = null;
				$rootScope.confirmOkFun = null;
			}
		}
		//设置titile
		$scope.setTitle = function(name, id){
			document.title = name;
			$location.path('/home/' + id);
		}
	}
})
