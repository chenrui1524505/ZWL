/**
 * Created by Lix on 2016-7-7.
 */

var g_count , g_h , g_w;

var SeatRandomApp = angular.module("App",[]);

SeatRandomApp.controller("SeatRandomCtrl",function($scope,SeatRandomService){

    var rsi = SeatRandomService.rsi;

    if(rsi.success){
        var rsiData = rsi.object;
    }

    $scope.optionalSpace = rsiData.buildingName + "-" + rsiData.classroomNum;
    $scope.optionalSeatNum = rsiData.seatNum;

});


SeatRandomApp.controller("seatsSubmitCtrl",function($scope,SeatRandomService){

    $scope.seatsSubmit = function(){



        var seatId = SeatRandomService.rsi.object.seatId;
        var reservationBeginTime = SeatRandomService.reservationBeginTime ;
        var reservationEndTime = SeatRandomService.reservationEndTime ;
        var seatNum = SeatRandomService.rsi.object.seatNum;
        var userInfo = $.cookie("userInfo");
        userInfo = g.toJson(userInfo);
        var userInfoId = userInfo.userInfoId;
        /*
        var apire = Api.addReservation(userInfoId,seatId,reservationBeginTime,reservationEndTime,null);
        if(apire.success){
            window.location = "index.html";
        }*/

        var srs = {};
        srs.seatId = seatId;
        srs.seatNum = seatNum;
        srs.reservationBeginTime = reservationBeginTime;
        srs.reservationEndTime = reservationEndTime;
        srs.userInfoId = userInfoId;
        srs.type = "srs";
        srs.backHtml = "randomSeat";

        $.cookie("SubmitInfo",JSON.stringify(srs),{path : "/"});

        window.location = "subscribeConfirm.html";


    };

    $scope.seatsRandom = function () {
        //$("body").html("asdfasdfasdf");//等待提示
        window.location = window.location.href;
    };

});


SeatRandomApp.directive("seats",function (SeatRandomService) {
    return {
        priority: 10,
        restrict: 'E',
        template: SeatRandomService.initSeatInfo(),
        replace: true
    };

});

SeatRandomApp.factory("SeatRandomService",function(){
    var factory = {};

    /**
     * 获取随机座位信息
     */
    factory.getRandomSeatInfo = function(){
        var subscribeDate = g.toJson($.cookie("subscribeDate"));
        factory.reservationBeginTime = subscribeDate.reservationBeginTime;
        factory.reservationEndTime = subscribeDate.reservationEndTime;
        
        //return Api.addSeatByrandom(subscribeDate.LibraryVal,factory.reservationBeginTime,factory.reservationEndTime);
        var _floor = 0;
        if(subscribeDate.studyLoungeFloor){
            _floor = subscribeDate.studyLoungeFloor;
        }
        return Api.addSeatRandomByFloor(subscribeDate.LibraryVal,_floor,factory.reservationBeginTime,factory.reservationEndTime);

    };

    /**
     * 初始化座位列表
     * @returns {string}
     */
    factory.initSeatInfo = function(){

        factory.rsi = factory.getRandomSeatInfo();
        var rsi = factory.rsi;
        if(!rsi.success){
            alert(rsi.message);
            window.location = "subscribe.html";
        }

        var subscribeDate = $.cookie("subscribeDate");
        var SeatForm = g.toJson(subscribeDate);

        var seatNum = rsi.object.seatNum;
        var SubmitInfo = g.toJson($.cookie("SubmitInfo"));

        var _html = "<div class=\"seat-wrap\" id=\"seat\" style='margin:50px 50px;'>";

        if(SeatForm){
            var SeatInfo = Api.SeatsInfo(rsi.object.classroomId,SeatForm.reservationBeginTime,SeatForm.reservationEndTime);
            if(SeatInfo.success){
                var Seats = SeatInfo.list;
                factory.Seats = Seats;
                factory.seatsNum =  Seats.length;
                factory.seatColumns =  Seats[0].seatColumns;
                factory.seatRows =  Seats[0].seatRows;

                var array = new Array(factory.seatColumns);

                for (var k = 0 ; k < array.length  ; k++){
                    var temp = {};
                    temp.num = k + 1;
                    array[k] = temp;
                }



                factory.tempArray = array;

                for(var a = 0 ; a < array.length ; a++ ){
                    _html += "<ul>";
                    g_count = 0;
                    for( var s = 0 ; s < Seats.length ; s++){

                        if(Seats[s].columnNum == array[a].num   ){
                            g_count++;
                            var state = Seats[s].state;
                            var stateClass;

                            var sex_type = "";

                            if(Seats[s].userSex == 1){
                                sex_type =" boy-";
                            }
                            if(Seats[s].userSex == 2){
                                sex_type =" girl-";
                            }

                            var leaveFlag_css = "";
                            if(Seats[s].leaveFlag == 1){
                                leaveFlag_css = "-hold";

                            }

                            if(state == 0){
                                stateClass = "unseat null";

                            }
                            if(state == 1){
                                stateClass = "random_css seat_yes";
                            }
                            if(state == 2){
                                stateClass = "random_css seat_yes "+sex_type+"half"+leaveFlag_css;
                            }
                            if(state == 3){
                                stateClass = "random_css seat_yes unOptional selected "+sex_type+"full"+leaveFlag_css;
                            }

                            if(seatNum == Seats[s].seatNum && state != 0){
                                g_h = g_count;//计算出随机座位的真实行
                                g_w = a+1;//计算出随机座位的真实列
                                stateClass = "active";
                            }
                            _html += "<LI class='"+stateClass+"' data='"+Seats[s].seatNum+" ' dataID="+Seats[s].seatId+"></LI>";
                        }


                    }
                    _html +="</ul>";
                }





            }
        }

        return _html + "</div>";

    }


    return factory;
});

$(document).ready(function(){
    var target = document.getElementById("seat");

    $(target).css('-webkit-transform',"matrix(1,0,0,1,"+ parseInt(g.getCountWidth(g_w)) +","+ parseInt(g.getCountHeight(g_h)) +")");

});

