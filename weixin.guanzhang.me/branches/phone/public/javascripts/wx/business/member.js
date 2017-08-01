define(['chart'], function(wx) {
	'use strict';
	return function($rootScope, $scope, $http, $timeout, $routeParams, $location){
		if(!$rootScope.isLogin){
    		window.location.href = window.location.origin + root + 'wx/getOpenid.html';
    		return;
    	}
		$scope.hasDate = true;
		$scope.nodateStyle = {
			'padding-top': (window.innerHeight/2-180) + 'px',
			'padding-bottom': (window.innerHeight/2-200) + 'px'
		}
		$rootScope.footerShow = true;
		//获取日期
		$rootScope.id = $routeParams.id;
		$scope.getData = function(val){
			$rootScope.loadingShow = true;
			$rootScope.selectDate = val || $rootScope.selectDate || $rootScope.today;
			$http.get(root + 'order/memberRpt',{
				params:{
					venueId: $rootScope.id,
					date: $rootScope.selectDate,
					time: new Date().getTime()
				}
			}).success(function(res){
				$rootScope.loadingShow = false;
				//请求失败
				if(!res.success){
					$timeout(function(){
						$scope.hasDate = false;
					}, 1000)
					$rootScope.showTips(res.errorMsg, 2000);
					return;
				}
				$scope.hasDate = true;
				$scope.member = res.data;
				//画图
				drawLine(res.data);
				$timeout(function(){
					$rootScope.updateShow = false;
					$rootScope.updateWord = null;
				},1000);
			}).error(function(){
				$timeout(function(){
					$scope.hasDate = false;
					$rootScope.loadingShow = false;
				}, 1000)
				$rootScope.showTips('查询失败，请稍后重试...');
			})
		}
		function drawLine(data){
			var ctx = document.querySelector('#member .js-canvas').getContext('2d'),
				valArr = [],
				myLine = new Chart(ctx);
			if(data.recharge>0){
				valArr.push({
					label: '充值',
					value: data.recharge,
					color: "#e77e23"
				});
			}else{
				valArr.push({
					label: '充值',
					value: 0.01,
					color: "rgba(255,255,255,0.2)"
				});
			}
			if(data.consume>0){
				valArr.push({
					label: '消费',
					value: data.consume,
					color: "#8f44ad"
				});
			}else{
				valArr.push({
					label: '消费',
					value: 0.01,
					color: "rgba(255,255,255,0.2)"
				});
			}
			myLine.Doughnut(valArr,{
				segmentShowStroke: false,
				percentageInnerCutout: 80,
				onAnimationComplete: function(){
					$scope.$apply(function(){
						$scope.canvasComplete = true;
					})
				},
				customTooltips: true,
				tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value==0.01?0:value %><%='元'%>"
			});
			$timeout(function(){
				_loading.hide();
			},500);
		}
		//获取数据
		$scope.getData();
	}
})
