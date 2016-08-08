/**
 * Created by Lix on 2016-7-12.
 */


var settingsApp = angular.module("App",[]);

settingsApp.controller("settingsCtrl",function ($scope) {
    $scope.out = function(){
        $.removeCookie("userInfo",{  path: '/' });
        window.location = "login.html";
    }
})
