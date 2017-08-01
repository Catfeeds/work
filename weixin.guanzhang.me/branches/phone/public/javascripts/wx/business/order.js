define(['chart'], function() {
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
			$http.get(root + 'order/orderRpt',{
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
				$scope.order = res.data;
				//画图
				drawLine(res.data);
			}).error(function(){
				$timeout(function(){
					$scope.hasDate = false;
					$rootScope.loadingShow = false;
				}, 1000)
				$rootScope.showTips('查询失败，请稍后重试...');
			})
		}
		function drawLine(data){
			var ctx = document.querySelector('#order .js-canvas').getContext('2d'),
				valArr = [],
				myLine = new Chart(ctx);
			if(data.other.money>0){
				valArr.push({
					label: '散客订单',
					value: data.other.money,
					color: "#cb5a5e"
				});
			}else{
				valArr.push({
					label: '散客订单',
					value: 0.1,
					color: "rgba(255,255,255,0.2)"
				});
			}
			if(data.internet.money>0){
				valArr.push({
					label: '网络订单',
					value: data.internet.money,
					color: "#0a9dcd"
				});
			}else{
				valArr.push({
					label: '网络订单',
					value: 0.1,
					color: "rgba(255,255,255,0.2)"
				});
			}
			if(data.member.money>0){
				valArr.push({
					label: '会员订单',
					value: data.member.money,
					color: "#27ae61"
				});
			}else{
				valArr.push({
					label: '会员订单',
					value: 0.1,
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
				tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value==0.1?0:value %><%='元'%>"
			});
			$timeout(function(){
				_loading.hide();
			},500);
		}
		//获取数据
		$scope.getData();
	}
})
