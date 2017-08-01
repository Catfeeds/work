define(["chart"], function () {
    "use strict";
    return function ($rootScope, $scope, $http, $timeout, $routeParams, $location) {
        function e(e) {
            var o = document.querySelector("#order .js-canvas").getContext("2d"), t = [], n = new Chart(o);
            t.push(e.other.money > 0 ? {label: "散客订单", value: e.other.money, color: "#cb5a5e"} : {
                label: "散客订单",
                value: .1,
                color: "rgba(255,255,255,0.2)"
            }), t.push(e.internet.money > 0 ? {
                label: "网络订单",
                value: e.internet.money,
                color: "#0a9dcd"
            } : {
                label: "网络订单",
                value: .1,
                color: "rgba(255,255,255,0.2)"
            }), t.push(e.member.money > 0 ? {label: "会员订单", value: e.member.money, color: "#27ae61"} : {
                label: "会员订单",
                value: .1,
                color: "rgba(255,255,255,0.2)"
            }), n.Doughnut(t, {
                segmentShowStroke: !1, percentageInnerCutout: 80, onAnimationComplete: function () {
                    $scope.$apply(function () {
                        $scope.canvasComplete = !0
                    })
                }, tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value==0.1?0:value %><%='元'%>"
            }), $timeout(function () {
                _loading.hide()
            }, 500)
        }

        return $rootScope.isLogin ? ($scope.hasDate = !0, $scope.nodateStyle = {
            "padding-top": window.innerHeight / 2 - 180 + "px",
            "padding-bottom": window.innerHeight / 2 - 200 + "px"
        }, $rootScope.footerShow = !0, $rootScope.id = $routeParams.id, $scope.getData = function (o) {
            $rootScope.loadingShow = !0, $rootScope.selectDate = o || $rootScope.selectDate || $rootScope.today, $http.get(root + "order/orderRpt", {
                params: {
                    venueId: $rootScope.id,
                    date: $rootScope.selectDate,
                    time: (new Date).getTime()
                }
            }).success(function (o) {
                return $rootScope.loadingShow = !1, o.success ? ($scope.hasDate = !0, $scope.order = o.data, void e(o.data)) : ($timeout(function () {
                    $scope.hasDate = !1
                }, 1e3), void $rootScope.showTips(o.errorMsg, 2e3))
            }).error(function () {
                $timeout(function () {
                    $scope.hasDate = !1, $rootScope.loadingShow = !1
                }, 1e3), $rootScope.showTips("查询失败，请稍后重试...")
            })
        }, void $scope.getData()) : void(window.location.href = window.location.origin + root + "wx/getOpenid.html")
    }
});