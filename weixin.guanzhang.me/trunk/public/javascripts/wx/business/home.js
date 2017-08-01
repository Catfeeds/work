define(['chart'], function(){
	//严格模式
	'use strict';
	return function($rootScope, $scope, $http, $timeout, $routeParams, $location){
		//判断是否登录状态
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
		$rootScope.title = '东英羽毛球馆';
		var dateWord = [0,'一','二','三','四','五','六','七'];
		$rootScope.id = $routeParams.id; 
		$scope.getData = function(val){
			$rootScope.loadingShow = true;
			$rootScope.selectDate = val || $rootScope.selectDate || $routeParams.date || $rootScope.today;
			$http.get(root + 'order/dailyRpt',{
				params:{
					venueId: $rootScope.id,
					date: $rootScope.selectDate,
					time: new Date().getTime()
				}
			},{
				timeout: 6000
			}
			).success(function(res){
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
				$scope.income = res.data.income;
				$scope.order = res.data.order;
				$scope.member = res.data.member;
				$scope.withYesterday = res.data.income.today - res.data.income.yesterday;
				$scope.withWeek = res.data.income.today - res.data.income.preweek;
				$scope.curDate = res.data.income.today - res.data.income.preweek;
				$scope.curDate = res.data.income.today - res.data.income.preweek;
				$rootScope.selectDate = res.data.queryDate;
				$scope.updateDate = res.data.updateDate;
				var nearDays = res.data.history.date.length;
				if(nearDays>0){
					$scope.nearDays = dateWord[nearDays];
					//画图
					$timeout(function(){
						drawLine(res.data.history);
					},500)
				}else{
					$scope.nearDays = 0;
				}
			}).error(function(){
				$timeout(function(){
					$scope.hasDate = false;
					$rootScope.loadingShow = false;
				}, 1000)
				$rootScope.showTips('查询失败，请稍后再试...');
			})
		}
		function drawLine(data){
			var _label = [],
				lineChartData = {};
			for(var i=0;i<data.date.length;i++){
				var _t = data.date[i],
					week = ['日','一','二','三','四','五','六'],
					_week = new Date(_t.substr(0,4), (_t.substr(4,2)-1), _t.substr(6,2)).getDay();
				_label.push(data.date[i].substr(4,2) + '/' + data.date[i].substr(6,2) + '周' + week[_week]);
			}
			lineChartData = {
				labels : _label,
				datasets : [
					{
						label: '今日总收入',
						fillColor : 'rgba(255,255,255,0)',
						strokeColor : '#3ae684',
						pointColor : '#3ae684',
						pointStrokeColor : 'rgb(34, 37, 56)',
						pointHighlightFill : '#fff',
						pointHighlightStroke : '#fff',
						data : data.amount
					}
				]
			};
			var ctx = document.querySelector('#canvas-home').getContext('2d'),
				myLine = new Chart(ctx).Line(lineChartData,{
					pointDotRadius: 4,
					pointDotStrokeWidth: 2,
					scaleLineWidth : 2,
					scaleFontColor : 'rgba(255,255,255,0.6)',
					bezierCurve : false,
					scaleGridLineColor: 'rgba(255,255,255,0.1)',
					scaleLineColor: 'rgba(255,255,255,0.2)'
				});
			$timeout(function(){
				_loading.hide();
			},500);
		}
		//获取数据
		$scope.getData();
	}
})
