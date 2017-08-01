define(["app"], function(o) {
    "use strict";
    o.controller("tips", ["$rootScope", "$timeout",
        function($rootScope, $timeout) {
            $rootScope.showTips = function(o, t, e) {
                t = t || 1e3, $rootScope.tipsShow = !0, $rootScope.tips = o, $timeout(function() {
                    $rootScope.tipsShow = !1, e && "function" == typeof e && e()
                }, t)
            }
        }
    ]), o.controller("mobileLoginCtrl", ["$rootScope", "$scope", "$http","$interval","$timeout", "$routeParams", "$location",
        function($rootScope, $scope, $http, $interval, $timeout, $routeParams, $location) {
            require(["mobile_login"], function(o) {
                o($rootScope, $scope, $http, $interval, $timeout, $routeParams, $location)
            })
        }
    ]), o.controller("loginCtrl", ["$rootScope", "$scope", "$http", "$timeout", "$routeParams", "$location",
        function($rootScope, $scope, $http, $timeout, $routeParams, $location) {
            require(["login"], function(o) {
                o($rootScope, $scope, $http, $timeout, $routeParams, $location)
            })
        }
    ]), o.controller("ucenterCtrl", ["$rootScope", "$scope", "$http", "$timeout", "$routeParams", "$location",
        function($rootScope, $scope, $http, $timeout, $routeParams, $location) {
            require(["ucenter"], function(o) {
                o($rootScope, $scope, $http, $timeout, $routeParams, $location)
            })
        }
    ]), o.controller("calendarCtrl", ["$rootScope", "$scope", "$http", "$timeout", "$routeParams", "$location",
        function($rootScope, $scope, $http, $timeout, $routeParams, $location) {
            require(["calendar"], function(o) {
                o($rootScope, $scope, $http, $timeout, $routeParams, $location)
            })
        }
    ]), o.controller("homeCtrl", ["$rootScope", "$scope", "$http", "$timeout", "$routeParams", "$location",
        function($rootScope, $scope, $http, $timeout, $routeParams, $location) {
            require(["home"], function(o) {
                o($rootScope, $scope, $http, $timeout, $routeParams, $location)
            })
        }
    ]), o.controller("incomeCtrl", ["$rootScope", "$scope", "$http", "$timeout", "$routeParams", "$location",
        function($rootScope, $scope, $http, $timeout, $routeParams, $location) {
            require(["income"], function(o) {
                o($rootScope, $scope, $http, $timeout, $routeParams, $location)
            })
        }
    ]), o.controller("orderCtrl", ["$rootScope", "$scope", "$http", "$timeout", "$routeParams", "$location",
        function($rootScope, $scope, $http, $timeout, $routeParams, $location) {
            require(["order"], function(o) {
                o($rootScope, $scope, $http, $timeout, $routeParams, $location)
            })
        }
    ]), o.controller("memberCtrl", ["$rootScope", "$scope", "$http", "$timeout", "$routeParams", "$location",
        function($rootScope, $scope, $http, $timeout, $routeParams, $location) {
            require(["member"], function(o) {
                o($rootScope, $scope, $http, $timeout, $routeParams, $location)
            })
        }
    ])
});