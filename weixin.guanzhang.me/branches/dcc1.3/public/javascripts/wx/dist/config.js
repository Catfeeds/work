function getCookie(objName){
    var arrStr = document.cookie.split("; ");
    for(var i = 0;i < arrStr.length; i++){
        var temp = arrStr[i].split("=");
        if(temp[0] == objName)
            return unescape(temp[1]);
    }
}

function setCookie(e, t, n) {
    var r = new Date;
    r.setDate(r.getDate() + n), document.cookie = e + "=" + escape(t) + (null == n ? "" : ";expires=" + r.toGMTString())
}

function format(e, t) {
    var n = {
        "M+": e.getMonth() + 1,
        "d+": e.getDate(),
        "h+": e.getHours(),
        "m+": e.getMinutes(),
        "s+": e.getSeconds(),
        S: e.getMilliseconds()
    };
    /(y+)/.test(t) && (t = t.replace(RegExp.$1, (e.getFullYear() + "").substr(4 - RegExp.$1.length)));
    for (var r in n) new RegExp("(" + r + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? n[r] : ("00" + n[r]).substr(("" + n[r]).length)));
    return t
}

function checkDate(e) {
    return parseInt(e) < 10 && (e = "0" + parseInt(e)), e
}
require.config({
    paths: {
        domReady: "../../require/domReady.min",
        angular: "../../angular/angular.all.min",
        des: "../../des/des.min",
        base64: "../../base64/base64.min",
        chart: "../../chart/chart.min"
    },
    shim: {
        angular: {
            exports: "angular"
        }
    },
    deps: ["bootstrap"],
    waitSeconds: 0,
    urlArgs: "bust=" + ver
}), define("bootstrap", ["require", "angular", "app", "run", "filter", "routes"], function(require, angular) {
    "use strict";
    require(["domReady!"], function(e) {
        angular.bootstrap(e, ["wx"]), e.querySelector("#max").style.display = "block"
    })
}), define("app", ["require", "angular"], function(require, angular) {
    return angular.module("wx", ["ngRoute", "ngMessages", "ngSanitize", "ngTouch", "ngAnimate"])
});