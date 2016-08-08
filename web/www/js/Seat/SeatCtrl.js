/**
 * Created by Lix on 2016-7-7.
 */

var SeatApp = angular.module("App",[]);

SeatApp.controller("SeatCtrl",function($scope,SeatService){

    $scope.optionalSpace = SeatService.initSpace();


});


SeatApp.controller("seatsSubmitCtrl",function($scope,SeatService){
    $scope.seatsSubmit = function(){
        var seatId = $("#SeatDataID").val();
        var seatNum = $("#seatId").text();
        var userInfo = $.cookie("userInfo");
        userInfo = g.toJson(userInfo);
        var userInfoId = userInfo.userInfoId;

        var reservationBeginTime = SeatService.reservationBeginTime ;
        var reservationEndTime = SeatService.reservationEndTime ;

        var srs = {};
        srs.seatId = seatId;
        srs.seatNum = seatNum;
        srs.reservationBeginTime = reservationBeginTime;
        srs.reservationEndTime = reservationEndTime;
        srs.userInfoId = userInfoId;
        srs.type = "os";

        if(!seatId){
            alert("请选择座位！");
            return null;
        }

        $.cookie("SubmitInfo",JSON.stringify(srs),{path : "/"});

        window.location = "subscribeConfirm.html";

    }

});


SeatApp.directive("seats",function (SeatService) {
    return {
        restrict: 'E',
        template: SeatService.initSeatInfo(),
        replace: true
    };
});

SeatApp.factory("SeatService",function(){
    var factory = {};

    factory.initSpace = function(){
        var subscribeSpace =  $.cookie("subscribeSpace");
        var Space = g.toJson(subscribeSpace);
        return Space.LibraryName + "-" + Space.studyLoungeName;
    }

    factory.initSeatInfo = function(){
        var subscribeDate = $.cookie("subscribeDate");
        var SeatForm = g.toJson(subscribeDate);

        factory.reservationBeginTime = SeatForm.reservationBeginTime;
        factory.reservationEndTime = SeatForm.reservationEndTime;

        var _html = "<div class=\"seat-wrap\" id=\"seat\">";
        if(SeatForm){
            var SeatInfo = Api.SeatsInfo(SeatForm.studyLoungeVal,SeatForm.reservationBeginTime,SeatForm.reservationEndTime);
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
                    for(var s = 0 ; s < Seats .length ; s++){
                        if(Seats[s].columnNum == array[a].num   ){
                            var state = Seats[s].state;



                            var state_css = "";

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
                                state_css = "unseat null";
                            }
                            if(state == 1){
                                state_css = "seat_yes";
                            }
                            if(state == 2){
                                state_css = "seat_yes "+sex_type+"half"+leaveFlag_css;
                            }
                            if(state == 3){
                                state_css = "seat_yes unOptional selected "+sex_type+"full"+leaveFlag_css;
                            }


                            _html += "<LI class='"+state_css+"' data='"+Seats[s].seatNum+" ' dataID="+Seats[s].seatId+"></LI>";
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