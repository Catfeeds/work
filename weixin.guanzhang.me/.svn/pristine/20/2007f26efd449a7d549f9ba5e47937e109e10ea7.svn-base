define([], function() {
    "use strict";
    return function($rootScope, $scope, $http, $timeout, $routeParams, $location) {
        return ($rootScope.calendarShow = !1, $rootScope.footerShow = !1, $scope.ucenterCss = {
            "min-height": window.innerHeight + "px"
        }, $rootScope.loadingShow = !0, $http.get(root + "venue/ucenter", {
            params: {
                time: (new Date).getTime()
            },
            timeout: 6e3
        }).success(function(n) {
            return $rootScope.loadingShow = !1, n.success ? ($scope.itemList = n.data, n.data.length < 1 ?($rootScope.showTips("没有可查看的场馆了，请重新绑定场馆...", 1e3), void $timeout(function() {
                $location.path("/login")
            }, 1e3)) : void $timeout(function() {
                void $timeout(function() {
                    var n = document.querySelector(".ucenter").clientHeight,
                        o = window.innerHeight;
                    o > n && ($scope.titleStyle = {
                        paddingTop: (o - n - 50) / 2 + "px"
                    })
                })
            })) : void $rootScope.showTips(n.errorMsg, 2e3)
        }).error(function(n) {
            $rootScope.loadingShow = !1, $rootScope.showTips("获取信息失败，请稍后重试...")
        }),
        $scope.unbind = function(n, o) {
            $rootScope.confirmShow = !0,
            $rootScope.bgShow = !0,
            $rootScope.confirmWord = "您确定要解绑" + n + "吗？",
            $rootScope.confirmOkWord = "确定",
            $rootScope.confirmCancelWord = "取消",
            $rootScope.confirmOkFun = function() {
                $rootScope.confirmShow = !1,
                $rootScope.bgShow = !1,
                $rootScope.confirmWord = null,
                $rootScope.confirmOkWord = null,
                $rootScope.confirmCancelWord = null,
                $rootScope.confirmOkFun = null,
                $rootScope.loadingShow = !0,
                $http.get(root + "spuser/logout", {
                    params: {
                        venueId: o,
                        time: (new Date).getTime()
                    },
                    timeout: 6e3
                }).success(function(n) {
                    return $rootScope.loadingShow = !1, n.success ? ($scope.itemList = n.data, n.data.length < 1 ? ($rootScope.showTips("没有可查看的场馆了，请重新绑定场馆...", 1e3), void $timeout(function() {
                        $location.path("/login")
                    }, 1e3)) : void $timeout(function() {
                        var n = document.querySelector(".ucenter").clientHeight,
                            o = window.innerHeight;
                        o > n && ($scope.titleStyle = {
                            paddingTop: (o - n - 50) / 2 + "px"
                        })
                    })) : void $rootScope.showTips(n.errorMsg)
                }).error(function(n) {
                    $rootScope.loadingShow = !1, $rootScope.showTips("解绑失败，请稍后重试...")
                })
            }, $rootScope.confirmCancelFun = function() {
                $rootScope.confirmShow = !1, $rootScope.bgShow = !1, $rootScope.confirmWord = null, $rootScope.confirmOkWord = null, $rootScope.confirmCancelWord = null, $rootScope.confirmOkFun = null
            }
        }, void($scope.setTitle = function(n, o, somsIsNew) {
            document.title = n,
                //$location.path("/home/" + o)

            (somsIsNew == 1) ? (window.location.href =  window.location.origin + "/wxreport-"+o) : $location.path("/home/" + o)
        }))
    }
});