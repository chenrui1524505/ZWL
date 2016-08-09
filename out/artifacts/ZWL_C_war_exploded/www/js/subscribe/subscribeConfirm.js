/**
 * Created by Lix on 2016-7-13.
 */

var ConfirmApp = angular.module("App",[]);

ConfirmApp.controller("ConfirmCtrl",function ($scope) {
    var subscribeSpace = g.toJson($.cookie("subscribeSpace"));
    var SubmitInfo = g.toJson($.cookie("SubmitInfo"));
    $scope.name = subscribeSpace.LibraryName + subscribeSpace.studyLoungeName
    $scope.space = SubmitInfo.seatNum;

    $scope.beginTime = SubmitInfo.reservationBeginTime;
    $scope.endTime = SubmitInfo.reservationEndTime;

    var reapi = Api.getRecommendReservationTime(SubmitInfo.seatId,SubmitInfo.reservationBeginTime);


    var recommendBeginTime ="";
    var recommendEndTime = "";

    var isRecommend = false;

    if(reapi.success){
        var recommendList = reapi.recommendList;
        if(recommendList){

            var recommendLast = recommendList[0].lastIndexOf("-");
            var recommendIndex = recommendList[0].indexOf(" ");
            recommendBeginTime = recommendList[0].substring(0,recommendLast-1) + ":00";
            recommendEndTime = recommendList[0].substring(0,recommendIndex) + recommendList[0].substring(recommendLast+1) + ":00";

            $scope.recommendBeginTime = recommendBeginTime;
            $scope.recommendEndTime = recommendEndTime;
        }
    }

    $scope.boy = function(){
        isRecommend = true;
    };

    $scope.backHtml = function(){
        if(SubmitInfo){
            if(SubmitInfo.backHtml){
                window.location = SubmitInfo.backHtml + ".html";
                return null;
            }
        }
        window.location = "subscribe.html";
    };

    $scope.submit = function(){
        var apire;
        if(isRecommend){
            apire = Api.addReservation(SubmitInfo.userInfoId,SubmitInfo.seatId,recommendBeginTime,recommendEndTime,null);
        }else{
            apire = Api.addReservation(SubmitInfo.userInfoId,SubmitInfo.seatId,SubmitInfo.reservationBeginTime,SubmitInfo.reservationEndTime,null);
        }

        if(apire.success){
            $.removeCookie("SubmitInfo",{path : "/"});
            $.removeCookie("subscribeDate",{path : "/"})
            window.location = "index.html";
        }else{
            mui.toast(apire.message);
        }

    }
    /*
     var apire = Api.addReservation(userInfoId,seatId,reservationBeginTime,reservationEndTime,null);
     if(apire.success){
     window.location = "index.html";
     }*/

});