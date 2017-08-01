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
		$rootScope.id = $routeParams.id; 
		$scope.getData = function(val){
			$rootScope.loadingShow = true;
			$rootScope.selectDate = val || $rootScope.selectDate || $rootScope.today;
			$http.get(root + 'order/incomeRpt',{
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
				$scope.income = res.data;
				$timeout(function(){
					//画图
					drawLine(res.data);
				},500);
			}).error(function(){
				$timeout(function(){
					$scope.hasDate = false;
					$rootScope.loadingShow = false;
				}, 1000)
				$rootScope.showTips('查询失败，请稍后重试...');
			})
		}
		function drawLine(data){
			var ctx = document.querySelector('.canvas').getContext('2d'),
				valArr = [],
				myLine = new Chart(ctx);
			if(data.field.real>0){
				valArr.push({
					label: '场地收入',
					value: data.field.real,
					color: "#776cff"
				});
			}else{
				valArr.push({
					label: '场地收入',
					value: 0.01,
					color: "rgba(255,255,255,0.2)"
				});
			}
			if(data.goods.real>0){
				valArr.push({
					label: '商品收入',
					value: data.goods.real,
					color: "#f1c40f"
				});
			}else{
				valArr.push({
					label: '商品收入',
					value: 0.01,
					color: "rgba(255,255,255,0.2)"
				});
			}
			if(data.member.real>0){
				valArr.push({
					label: '会员收入',
					value: data.member.real,
					color: "#27ae61"
				});
			}else{
				valArr.push({
					label: '会员收入',
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
