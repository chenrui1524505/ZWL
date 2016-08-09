/**
 * Created by Lix on 2016-7-7.
 */
var g_count , g_h , g_w;
var SeatRandomApp = angular.module("App",[]);

SeatRandomApp.controller("SeatRandomCtrl",function($scope,SeatRandomService){

    var rsi = SeatRandomService.rsi;

    if(rsi) {
        $scope.optionalSpace = rsi.buildingName + "-" + rsi.classroomNum;
        $scope.optionalSeatNum = rsi.seatNum;
    }

});


SeatRandomApp.controller("seatsSubmitCtrl",function($scope,SeatRandomService){

    $scope.seatsSubmit = function(){

        var SeatDataID = $("#SeatDataID").val();
        if(!SeatDataID){
            alert("请选择座位！");
            return null;
        }

        var apire = Api.changeSeatBychoose(SeatRandomService.rsi.reservationId,SeatDataID);

        if(apire.success){
            $.cookie("muiFlag",2,{path:"/"});
            window.location = "index.html";
        }else{
            alert(apire.message);
        }
    }



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
     * 初始化座位列表
     * @returns {string}
     */
    factory.initSeatInfo = function(){

        var checkSeatInfo = g.toJson($.cookie("changeSeatInfo"));

        factory.rsi = checkSeatInfo;
        if(!checkSeatInfo){
            window.location = "index.html";
        }

        var seatNum = checkSeatInfo.seatNum;

        var _html = "<div class=\"seat-wrap\" id=\"seat\" style='margin:50px 50px;transform:translateX("+g.getCountWidth(seatNum)+"px);'>";

        if(checkSeatInfo){
            var SeatInfo = Api.SeatsInfo(checkSeatInfo.classroomId,checkSeatInfo.sreservationBeginTime,checkSeatInfo.sreservationEndTime);
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
                    for(var s = 0 ; s < Seats .length ; s++){
                        if(Seats[s].columnNum == array[a].num   ){
                            g_count++;
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
                            if(seatNum == Seats[s].seatNum && state != 0){
                                g_h = g_count;//计算出随机座位的真实行
                                g_w = a+1;//计算出随机座位的真实列
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


$(document).ready(function(){
    var target = document.getElementById("seat");

    $(target).css('-webkit-transform',"matrix(1,0,0,1,"+ parseInt(g.getCountWidth(g_w)) +","+ parseInt(g.getCountHeight(g_h)) +")");

});