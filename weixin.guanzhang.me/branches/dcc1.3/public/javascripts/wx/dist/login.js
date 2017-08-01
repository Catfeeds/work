define(["base64"], function () {
    "use strict";
    return function ($rootScope, $scope, $http, $timeout, $routeParams, $location) {
        function o() {
            $http.get(root + "spuser/pwdkey", {params: {time: (new Date).getTime()}}).success(function (o) {
                o.success && ($scope.key = o.data)
            }).error(function () {
                $rootScope.showTips("网络不给力，请稍后重试...", 1e3)
            })
        }

        $rootScope.calendarShow = !1, $rootScope.footerShow = !1, $scope.loginCss = {height: window.innerHeight + "px"}, $scope.loginFun = function () {
            $scope.loginShow = !0;
            var n = $scope.account, e = $scope.password;
            return n ? e ? e.length < 6 ? ($rootScope.showTips("请填写正确的登录密码", 1e3, function () {
                $scope.loginShow = !1
            }), void($scope.loginShow = !1)) : (console.log($scope.key), $scope.key ? ($rootScope.loadingShow = !0, void $http.post(root + "spuser/login", {
                username: n,
                password: (new Base64).encode(e + "_gz_" + $scope.key),
                time: (new Date).getTime()
            }, {timeout: 0}).success(function (o) {
                return $scope.loginShow = !1, $rootScope.loadingShow = !1, o.success ? ($rootScope.isLogin = !0, void $location.path("/mobile_login")) : ($rootScope.showTips(o.errorMsg, 1e3), void("-1000" == o.code && $timeout(function () {
                    window.location.href = window.location.origin + tmpRoot + "wx/getOpenid.html"
                }, 1e3)))
            }).error(function (o) {
                $rootScope.loadingShow = !1, $scope.loginShow = !1, $rootScope.showTips("登录失败，请稍后重试...", 1e3)
            })) : (o(), void $rootScope.showTips("网络不给力，请稍后重试...", 1e3))) : void $rootScope.showTips("请填写登录密码", 1e3, function () {
                $scope.loginShow = !1
            }) : void $rootScope.showTips("请填写馆掌商户账号", 1e3, function () {
                $scope.loginShow = !1
            })
        }, o()
    }
});