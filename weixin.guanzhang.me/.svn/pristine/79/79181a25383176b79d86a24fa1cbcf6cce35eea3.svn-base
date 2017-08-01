define([], function () {
    "use strict";
    return function ($rootScope, $scope, $timeout) {
        function t(t, e) {
            var a, s, r;
            return s = t.substr(0, 4), a = t.substr(4, 2), r = t.substr(6, 2), s = parseInt(s), a = parseInt(a), r = parseInt(r), new Date(s, a - 1, r - e)
        }

        function e(t, e) {
            var a, s, r;
            return s = t.substr(0, 4), a = t.substr(4, 2), r = t.substr(6, 2), s = parseInt(s), a = parseInt(a), r = parseInt(r), new Date(s, a - 1, r + e)
        }

        $scope.showDate = function (a) {
            var s, r, n = [], y = 0, D = new Date(a.substr(0, 4), a.substr(4, 2) - 1, a.substr(6, 2)), u = D.getDay(), o = new Date, w = (new Date).getDay();
            for (u > w ? (s = e(a, 7 - u + w), r = s.getDay(), s = format(s, "yyyyMMdd")) : (s = e(a, w - u), r = s.getDay(), s = format(s, "yyyyMMdd")), n.push({
                week: r,
                day: s
            }), y = 0; 6 > y; y++) {
                var d, f, M;
                d = t(s, y + 1), f = new Date(d).getDay(), M = format(new Date(d), "yyyyMMdd"), n.push({
                    week: f,
                    day: M
                })
            }
            $scope.dateList = n.reverse(), $scope.lastDate = s, $scope.nextDateShow = (o - new Date(a.substr(0, 4), a.substr(4, 2) - 1, a.substr(6, 2))) / 36e5 > 168 ? !0 : !1
        }, $scope.prevDate = function () {
            var e = $scope.lastDate || format(new Date(e), "yyyyMMdd");
            e = t(e, 7), $scope.showDate(format(new Date(e), "yyyyMMdd"))
        }, $scope.nextDate = function () {
            if ($scope.nextDateShow) {
                var t = $scope.lastDate || format(new Date(t), "yyyyMMdd");
                t = e(t, 7), $scope.showDate(format(new Date(t), "yyyyMMdd"))
            }
        }, $scope.lastDate || $scope.showDate($scope.selectDate || $rootScope.today)
    }
});