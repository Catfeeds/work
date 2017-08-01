define(["chart"], function () {
    "use strict";
    return function ($rootScope, $scope, $http, $timeout, $routeParams, $location) {
        function e(e) {
            var o = document.querySelector(".canvas").getContext("2d"), t = [], a = new Chart(o);
            t.push(e.field.real > 0 ? {label: "场地收入", value: e.field.real, color: "#776cff"} : {
                label: "场地收入",
                value: .01,
                color: "rgba(255,255,255,0.2)"
            }), t.push(e.goods.real > 0 ? {label: "商品收入", value: e.goods.real, color: "#f1c40f"} : {
                label: "商品收入",
                value: .01,
                color: "rgba(255,255,255,0.2)"
            }), t.push(e.member.real > 0 ? {label: "会员收入", value: e.member.real, color: "#27ae61"} : {
                label: "会员收入",
                value: .01,
                color: "rgba(255,255,255,0.2)"
            }), a.Doughnut(t, {
                segmentShowStroke: !1,
                percentageInnerCutout: 80,
                onAnimationComplete: function () {
                    $scope.$apply(function () {
                        $scope.canvasComplete = !0
                    })
                },
                customTooltips: !0,
                tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value==0.01?0:value %><%='元'%>"
            }), $timeout(function () {
                _loading.hide()
            }, 500)
        }

        return $rootScope.isLogin ? ($scope.hasDate = !0, $scope.nodateStyle = {
            "padding-top": window.innerHeight / 2 - 180 + "px",
            "padding-bottom": window.innerHeight / 2 - 200 + "px"
        }, $rootScope.footerShow = !0, $rootScope.id = $routeParams.id, $scope.getData = function (o) {
            $rootScope.loadingShow = !0, $rootScope.selectDate = o || $rootScope.selectDate || $rootScope.today, $http.get(root + "order/incomeRpt", {
                params: {
                    venueId: $rootScope.id,
                    date: $rootScope.selectDate,
                    time: (new Date).getTime()
                }
            }).success(function (o) {
                return $rootScope.loadingShow = !1, o.success ? ($scope.hasDate = !0, $scope.income = o.data, void $timeout(function () {
                    e(o.data)
                }, 500)) : ($timeout(function () {
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