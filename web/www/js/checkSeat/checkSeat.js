/**
 * Created by Lix on 2016-7-9.
 */
//checkSeatCtrl
var g_count , g_h , g_w;
var checkSeatApp = angular.module("App",[]);

checkSeatApp.controller("checkSeatCtrl",function ($scope) {

    var checkSeatInfo = g.toJson($.cookie("checkSeatInfo"));

    if(typeof checkSeatInfo == "undefined"){
        window.location = history.go(-1);
    }
    $scope.info = checkSeatInfo.info;
    $scope.time = checkSeatInfo.time;
    $scope.seatNum = checkSeatInfo.seatNum;

});

checkSeatApp.directive("seats",function (checkSeatService) {
    return {
        restrict: 'E',
        template: checkSeatService.initSeatInfo(),
        replace: true
    };
});

checkSeatApp.factory("checkSeatService",function(){

    var factory = {};

    factory.initSeatInfo = function() {
        var checkSeatInfo = g.toJson($.cookie("checkSeatInfo"));
        var seatNum = checkSeatInfo.seatNum;
        var ss = 150; //style='transform:translateX("+ss+"px);'

        var _html = "<div class=\"seat-wrap\" style='padding-top: 50px' id=\"seat\">";

        if (checkSeatInfo) {
            var SeatInfo = Api.SeatsInfo(checkSeatInfo.classroomId, checkSeatInfo.sreservationBeginTime, checkSeatInfo.sreservationEndTime);
            if (SeatInfo.success) {
                var Seats = SeatInfo.list;
                factory.Seats = Seats;
                factory.seatsNum = Seats.length;
                factory.seatColumns = Seats[0].seatColumns;
                factory.seatRows = Seats[0].seatRows;

                var array = new Array(factory.seatColumns);

                for (var k = 0; k < array.length; k++) {
                    var temp = {};
                    temp.num = k + 1;
                    array[k] = temp;
                }

                factory.tempArray = array;

                for (var a = 0; a < array.length; a++) {
                    _html += "<ul>";
                    g_count = 0;
                    for (var s = 0; s < Seats.length; s++) {
                        if (Seats[s].columnNum == array[a].num) {
                            g_count++;

                            var span = "";
                            var spanClass = "";

                            var state = Seats[s].state;

                            if(state != 0 && seatNum == Seats[s].seatNum){
                                span = "<span><img src=\""+g.localData.get("userPhoto")+"\"/></span>";//seatNum
                                spanClass = " active";

                            }

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
                            if(seatNum == Seats[s].seatNum && state != 0){
                                g_h = g_count;//计算出随机座位的真实行
                                g_w = a+1;//计算出随机座位的真实列
                            }


                            _html += "<LI class='" + state_css + spanClass +"' data='" + Seats[s].seatNum + " ' dataID=" + Seats[s].seatId + ">"+span+"</LI>";
                        }
                    }
                    _html += "</ul>";
                }


            }
        }
        return _html + "</div>";
    };
    return factory;
});

$(document).ready(function(){
    var target = document.getElementById("seat");
    if(target){
        $(target).css('-webkit-transform',"matrix(1,0,0,1,"+ parseInt(g.getCountWidth(g_w)) +","+ parseInt(g.getCountHeight(g_h)) +")");
    }
});