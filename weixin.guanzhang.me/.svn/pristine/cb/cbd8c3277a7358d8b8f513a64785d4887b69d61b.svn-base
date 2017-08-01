define(["chart"], function() {
    "use strict";
    return function($rootScope, $scope, $http, $timeout, $routeParams, $location) {
        function e(e) {
            for (var t = [], a = {}, o = 0; o < e.date.length; o++) {
                var i = e.date[o],
                    n = ["日", "一", "二", "三", "四", "五", "六"],
                    r = new Date(i.substr(0, 4), i.substr(4, 2) - 1, i.substr(6, 2)).getDay();
                t.push(e.date[o].substr(4, 2) + "/" + e.date[o].substr(6, 2) + "周" + n[r])
            }
            a = {
                labels: t,
                datasets: [{
                    label: "今日总收入",
                    fillColor: "rgba(255,255,255,0)",
                    strokeColor: "#3ae684",
                    pointColor: "#3ae684",
                    pointStrokeColor: "rgb(34, 37, 56)",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "#fff",
                    data: e.amount
                }]
            }; {
                var d = document.querySelector("#canvas-home").getContext("2d");
                new Chart(d).Line(a, {
                    pointDotRadius: 4,
                    pointDotStrokeWidth: 2,
                    scaleLineWidth: 2,
                    scaleFontColor: "rgba(255,255,255,0.6)",
                    bezierCurve: !1,
                    scaleGridLineColor: "rgba(255,255,255,0.1)",
                    scaleLineColor: "rgba(255,255,255,0.2)"
                })
            }
            $timeout(function() {
                _loading.hide()
            }, 500)
        }

        if (!$rootScope.isLogin) return void(window.location.href = window.location.origin + tmpRoot + "wx/getOpenid.html");
        $scope.hasDate = !0, $scope.nodateStyle = {
            "padding-top": window.innerHeight / 2 - 180 + "px",
            "padding-bottom": window.innerHeight / 2 - 200 + "px"
        }, $rootScope.footerShow = !0, $rootScope.title = "东英羽毛球馆";
        var t = [0, "一", "二", "三", "四", "五", "六", "七"];
        $rootScope.id = $routeParams.id,
        $scope.getData = function(a) {
            $rootScope.loadingShow = !0,
            $rootScope.selectDate = a || $rootScope.selectDate || $routeParams.date || $rootScope.today,
            $http.get(root + "order/dailyRpt", {
                params: {
                    venueId: $rootScope.id,
                    date: $rootScope.selectDate,
                    time: (new Date).getTime()
                }
            }, {
                timeout: 6000
            }).success(function(a) {
                if ($rootScope.loadingShow = !1, !a.success)
                    return $timeout(function() {
                            $scope.hasDate = !1
                        }, 1e3),
                        void $rootScope.showTips(a.errorMsg, 2e3);
                $scope.hasDate = !0,
                $scope.income = a.data.income,
                $scope.order = a.data.order,
                $scope.member = a.data.member,
                $scope.withYesterday = a.data.income.today - a.data.income.yesterday,
                $scope.withWeek = a.data.income.today - a.data.income.preweek,
                $scope.curDate = a.data.income.today - a.data.income.preweek,
                $scope.curDate = a.data.income.today - a.data.income.preweek,
                $rootScope.selectDate = a.data.queryDate,
                $scope.updateDate = a.data.updateDate;
                var o = a.data.history.date.length;
                o > 0 ? ($scope.nearDays = t[o], $timeout(function() {
                    e(a.data.history)
                }, 500)) : $scope.nearDays = 0
            }).error(function() {
                $timeout(function() {
                    $scope.hasDate = !1, $rootScope.loadingShow = !1
                }, 1e3), $rootScope.showTips("查询失败，请稍后再试...")
            })
        },
        $scope.getData()
    }
});