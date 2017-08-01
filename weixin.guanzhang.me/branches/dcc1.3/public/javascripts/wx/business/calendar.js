define([], function() {
    'use strict';
    return function($rootScope, $scope, $timeout){
	    $scope.showDate = function(val){
			var arr = [],
				i = 0,
				_lastDate,
				_lastWeek,
				_curDate = new Date(val.substr(0,4), (val.substr(4,2)-1), val.substr(6,2)),
				_curWeek = _curDate.getDay(),
				_today = new Date(),
				_todayWeek = new Date().getDay();
			if(_curWeek>_todayWeek){
				_lastDate = getNextDate(val,7 - _curWeek + _todayWeek);
				_lastWeek = _lastDate.getDay();
				_lastDate = format(_lastDate,'yyyyMMdd');
			}else{
				_lastDate = getNextDate(val,_todayWeek - _curWeek);
				_lastWeek = _lastDate.getDay();
				_lastDate = format(_lastDate,'yyyyMMdd');
			}
			arr.push({
				week: _lastWeek,
				day: _lastDate
			});
			for(i=0;i<6;i++){
				var _date,
					_week,
					_day;
				_date = getPrevDate(_lastDate,i+1);
				_week = new Date(_date).getDay();
				_day = format(new Date(_date),'yyyyMMdd');
				arr.push({
					week: _week,
					day: _day
				});
			}
			$scope.dateList = arr.reverse();
			$scope.lastDate = _lastDate;
			if((_today-new Date(val.substr(0,4), (val.substr(4,2)-1), val.substr(6,2)))/3600000>7*24){
				$scope.nextDateShow = true;
			}else{
				$scope.nextDateShow = false;
			}
		}
	    function getPrevDate(_date,num){
	    	var _month,
	    		_year,
	    		_day;
			_year = _date.substr(0,4);
			_month = _date.substr(4,2);
			_day = _date.substr(6,2);
			_year = parseInt(_year);
			_month = parseInt(_month);
			_day = parseInt(_day);
			return new Date(_year,_month-1,_day-num);
	    }
	    function getNextDate(_date,num){
	    	var _month,
	    		_year,
	    		_day;
			_year = _date.substr(0,4);
			_month = _date.substr(4,2);
			_day = _date.substr(6,2);
			_year = parseInt(_year);
			_month = parseInt(_month);
			_day = parseInt(_day);
			return new Date(_year,_month-1,_day+num);
	    }
	    $scope.prevDate = function(){
	    	var _lastDate = $scope.lastDate || format(new Date(_lastDate),'yyyyMMdd');
	    	_lastDate = getPrevDate(_lastDate,7);
			$scope.showDate(format(new Date(_lastDate),'yyyyMMdd'));
	    }
	    $scope.nextDate = function(){
	    	if(!$scope.nextDateShow ){
	    		return;
	    	}
	    	var _lastDate = $scope.lastDate || format(new Date(_lastDate),'yyyyMMdd');
	    	_lastDate = getNextDate(_lastDate,7);
			$scope.showDate(format(new Date(_lastDate),'yyyyMMdd'));
	    }
		if(!$scope.lastDate){
		    $scope.showDate($scope.selectDate || $rootScope.today);
		}
	}
});