/**
 * Created by Lix on 2016-7-8.
 */
var moreData = {};
var  pageSize = 10;
var  pageNum = 1;

var recordApp = angular.module("App",[]);

recordApp.controller("recordCtrl",function ($scope , recordService) {

    var zxsState = 0;

    $scope.recordList = zxs(zxsState);

    var getout = selectReservation(2,1,1 );

    if(getout.success) {

        //违规记录
        $scope.getout = getout.sumReservation;

    }

    $scope.zxs = function () {
        $("#zxs").addClass("c-b") .removeClass("c-gray");
        $("#yxs").addClass("c-gray") .removeClass("c-b");
        $(".temp").remove();
        mui('#pullRefresh').pullRefresh().scrollTo(0,0,100);
        mui('#pullRefresh').pullRefresh().refresh(true);
        $scope.recordList = zxs(zxsState);


        var getout = selectReservation(2,1,1 );

        if(getout.success) {
            //违规记录
            $scope.getout = getout.sumReservation;

        }

    }

    $scope.yxs = function () {

        $("#zxs").addClass("c-gray") .removeClass("c-b");
        $("#yxs").addClass("c-b") .removeClass("c-gray");





        var RoomReservation = Api.selectRoomReservation(pageNum,pageSize);
        if(RoomReservation.success){
            moreData.flag = true;
            moreData.type = 2;//yxs
            moreData.pageSize = pageSize;
            moreData.pageNum = pageNum;
            moreData.pageCount = 1000;
            $(".temp").remove();
            mui('#pullRefresh').pullRefresh().scrollTo(0,0,100);
            mui('#pullRefresh').pullRefresh().refresh(true);
            $scope.recordList = RoomReservation.lists;

        }else{
            $scope.recordList = null;
        }
    }

    $.cookie("zxsState",zxsState,{path:"/"});
});

recordApp.factory("recordService",function () {

    var factory = {}



    return factory;

});

function zxs(state){

    var Reservation = selectReservation(state,pageNum,pageSize );

    if(Reservation.success){
        moreData.type = 1;//zxs
        moreData.flag = true;
        moreData.pageSize = pageSize;
        moreData.pageNum = pageNum;
        moreData.pageCount = Reservation.sumReservation;


        var list = Reservation.list;
        if(list){
            for(var l = 0 ; l < list.length ; l++){

                switch (parseInt(list[l].state)){
                    case 1:
                        list[l].stateClass = "right";
                        break
                    case 2:
                        list[l].stateClass = "after";
                        list[l].stateInfo = "超时未签到";
                        break
                    case 3:
                        list[l].stateClass = "before";
                        list[l].stateInfo = "临时离开超时未归";
                        break
                    case 4:
                        list[l].stateClass = "before";
                        list[l].stateInfo = "午饭离开超时未归";
                        break
                    case 4:
                        list[l].stateClass = "before";
                        list[l].stateInfo = "晚饭离开超时未归";
                        break

                    default : list[l].stateClass = "right";
                }


            }
        }
        return Reservation.list;
    }
};


function selectReservation(state,nowPage,pageSize){

    state = state == null ? 1 : state;
    nowPage = nowPage == null ? 1 : nowPage;
    pageSize = pageSize == null ? 1 : pageSize;

    var Reservation = Api.selectReservation(state,nowPage,pageSize);

    return Reservation;
}

