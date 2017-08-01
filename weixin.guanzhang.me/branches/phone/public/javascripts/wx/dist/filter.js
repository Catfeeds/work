define(["app"], function (t) {
    "use strict";
    t.filter("abs", ["$sce", function (t) {
        return function (t) {
            return Math.abs(t)
        }
    }]), t.filter("setWeek", ["$sce", function (t) {
        return function (t) {
            var r = ["日", "一", "二", "三", "四", "五", "六"];
            return r[t]
        }
    }]), t.filter("setToWeek", ["$sce", function (t) {
        return function (t) {
            var r = new Date(t.substr(0, 4), parseInt(t.substr(4, 2)) - 1, t.substr(6, 2)).getDay(), n = ["日", "一", "二", "三", "四", "五", "六"];
            return n[r]
        }
    }]), t.filter("setDay", ["$sce", function (t) {
        return function (t) {
            return t.substr(4, 2) + "/" + t.substr(6, 2)
        }
    }]), t.filter("substr", ["$sce", function (t) {
        return function (t, r, n) {
            return t ? t.substr(r, n) : void 0
        }
    }])
});