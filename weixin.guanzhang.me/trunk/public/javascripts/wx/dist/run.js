define(["app"], function (e) {
    "use strict";
    e.run(function ($rootScope, $timeout) {
        $rootScope.title = "馆掌";
        var e = new Date,
            n = ["日", "一", "二", "三", "四", "五", "六"];
        $rootScope.today = format(e, "yyyyMMdd"), $rootScope.todayWeek = n[e.getDay()], $rootScope.yesterdayWeek = e.getDay() > 0 ? n[e.getDay() - 1] : n[n.length - 1], $rootScope.$on("$locationChangeSuccess", function (e, n, t) {
            document.body.scrollTop = 0
        }), $rootScope.$on("$routeChangeStart", function (e, n, t) {
            _loading.show()
        }), $rootScope.$on("$routeChangeSuccess", function (e, n, t) {
            $timeout(function () {
                _loading.hide()
            }, 1e3)
        }), $rootScope.getUserId = function () {
            var e = getCookie("gz_userId");
            $rootScope.isLogin = e && "-1" != e ? !0 : !1
        }, $rootScope.getUserId()
    })
});
