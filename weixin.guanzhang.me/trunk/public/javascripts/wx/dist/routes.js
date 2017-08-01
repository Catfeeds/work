define(["app", "controller"], function (e) {
    e.config(["$routeProvider", function (e) {
        e.when("/", {
            templateUrl: tmpRoot + "wx/ucenter.html?ver=" + ver,
            controller: "ucenterCtrl",
            resolve: {
                data: ["$q", function (e) {
                    var r = e.defer();
                    return setTimeout(function () {
                        r.resolve("test1")
                    }, 1e3), r.promise
                }]
            }
        }), e.when("/ucenter", {
            templateUrl: tmpRoot + "wx/ucenter.html?ver=" + ver,
            controller: "ucenterCtrl",
            resolve: {
                data: ["$q", function (e) {
                    var r = e.defer();
                    return setTimeout(function () {
                        r.resolve("test1")
                    }, 1e3), r.promise
                }]
            }
        }), e.when("/login", {
            templateUrl: tmpRoot + "wx/login.html?ver=" + ver,
            controller: "loginCtrl",
            resolve: {
                data: ["$q", function (e) {
                    var r = e.defer();
                    return setTimeout(function () {
                        r.resolve("test1")
                    }, 1e3), r.promise
                }]
            }
        }), e.when("/mobile_login", {
            templateUrl: tmpRoot + "wx/mobile_login.html?ver=" + ver,
            controller: "mobileLoginCtrl",
            resolve: {
                data: ["$q", function (e) {
                    var r = e.defer();
                    return setTimeout(function () {
                        r.resolve("test1")
                    }, 1e3), r.promise
                }]
            }
        }), e.when("/home/:id", {
            templateUrl: tmpRoot + "wx/home.html?ver=" + ver,
            controller: "homeCtrl",
            resolve: {
                data: ["$q", function (e) {
                    var r = e.defer();
                    return setTimeout(function () {
                        r.resolve("test1")
                    }, 1e3), r.promise
                }]
            }
        }), e.when("/home/:id/:date", {
            templateUrl: tmpRoot + "wx/home.html?ver=" + ver,
            controller: "homeCtrl",
            resolve: {
                data: ["$q", function (e) {
                    var r = e.defer();
                    return setTimeout(function () {
                        r.resolve("test1")
                    }, 1e3), r.promise
                }]
            }
        }), e.when("/income/:id", {
            templateUrl: tmpRoot + "wx/income.html?ver=" + ver,
            controller: "incomeCtrl",
            resolve: {
                data: ["$q", function (e) {
                    var r = e.defer();
                    return setTimeout(function () {
                        r.resolve("test1")
                    }, 1e3), r.promise
                }]
            }
        }), e.when("/order/:id", {
            templateUrl: tmpRoot + "wx/order.html?ver=" + ver,
            controller: "orderCtrl",
            resolve: {
                data: ["$q", function (e) {
                    var r = e.defer();
                    return setTimeout(function () {
                        r.resolve("test1")
                    }, 1e3), r.promise
                }]
            }
        }), e.when("/member/:id", {
            templateUrl: tmpRoot + "wx/member.html?ver=" + ver,
            controller: "memberCtrl",
            resolve: {
                data: ["$q", function (e) {
                    var r = e.defer();
                    return setTimeout(function () {
                        r.resolve("test1")
                    }, 1e3), r.promise
                }]
            }
        }), e.otherwise({redirectTo: "/"})
    }])
});