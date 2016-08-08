/**
 * Created by Lix on 2016-7-12.
 */

var downloadApp = angular.module("App",[]);

downloadApp.controller("downloadCtrl",function ($scope) {
    $scope.ios = Api.ios();
    var android = Api.android();
    if(android.success){
        $scope.android = android.version;
    }
    var uri = android.url;
    $scope.androidClick = function () {
        window.location = uri;
    }

})
