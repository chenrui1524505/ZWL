/**
 * Created by Lix on 2016-7-5.
 */

/**
 * 预约座位
 */
var subscribeApp = angular.module("App",[]);


/**
 * 自习室
 */
subscribeApp.controller("CampusAndBuildingCtrl",function($scope,subscribeService){



    //起始时间为当前时间
    var nowTime = Api.getSystemTime();
    nowTime = nowTime.replace("-","/").replace("-","/");
    var date = new Date(nowTime);
    var Minutes = date.getMinutes().toString();
    Minutes = Minutes.length > 1 ? Minutes : "0"+Minutes;
    $("#start").html(date.getHours() + ":" + Minutes  + ":00");

    $("#hour").html(date.getHours());
    $("#min").html(Minutes);

    //自习室  图书馆
    var re_sl = subscribeService.Campuses();
    $scope.subscribeList = re_sl;
    if(re_sl && re_sl.length > 0 && re_sl.length == 1){
        $scope.studyLounge = subscribeService.Classroom();//默认查询第一个自习室
    }else{
        console.log("有多个图书馆！");
    }


    //自习室  图书馆
    $scope.V_change = function(V_change){
        subscribeService.first_Campus = V_change;

        if(V_change){

            var subscribeList = this.subscribeList;
            if(subscribeList){
                for(var ll = 0 ; ll < subscribeList.length ; ll++){
                    if(V_change == subscribeList[ll].buildingId){
                        var tipsfather = $(".tipsfather");
                        tipsfather.html("<p class='tips' >开放时间："+subscribeList[ll].dayBeginTime+"-"+subscribeList[ll].dayEndTime+"</p>");
                        tipsfather.show();
                    }
                }
            }




        }


        $scope.studyLounge = subscribeService.Classroom();
    }

    if(subscribeService.cookie_subscribeDate && subscribeService.cookie_subscribeDate.LibraryVal){
        subscribeService.first_Campus =  subscribeService.cookie_subscribeDate.LibraryVal;
        $scope.studyLounge = subscribeService.Classroom();
    }

    //自习室
    $scope.sT_change = function(sT_change){
        console.log(sT_change);
    }

    //研修室 init
    var RR = subscribeService.BuildingResearchRoom();
    subscribeService.rr_bean = {};
    if(RR) {
        //研修室 图书馆
        $scope.libraryList = RR;

        //研修室 图书馆 事件
        $scope.buildingId_change = function (V_change) {
            subscribeService.first_BuildingResearch = V_change;
            var re_rr = subscribeService.ResearchRoom();
            $scope.ResearchRoom = re_rr;
            if(re_rr && re_rr.length == 1){
                $scope.RR_change(re_rr[0].id);
            }
        };

        //研修室 研修室 事件
        $scope.RR_change = function(arg){
            var tipsfather = $(".tipsfather");
            if(arg){
                var ResearchRoom = this.ResearchRoom;
                for(var r = 0 ; r < ResearchRoom.length ; r++){
                    if(ResearchRoom[r].id == arg){
                        subscribeService.selectedInfo = ResearchRoom[r];
                        /*
                         dayBeginTime: "08:00:00"
                         dayEndTime: "22:00:00"
                         floor: 2
                         id: 2
                         maxPeople: 5
                         minPeople: 1
                         name: "请输入 研修室名研修室4"
                         reservationDayNumber: 3*/
                    }
                }
                subscribeService.day_YXS = subscribeService.y_day =  subscribeService.selectedInfo.reservationDayNumber;
                //根据研修室 更新日期
                $scope.subscribeDate = subscribeService.getDate();


                tipsfather.show();

                var selectedInfo = subscribeService.selectedInfo;

                tipsfather.html("<p class='tips' >" + selectedInfo.minPeople +"人以上才可以预约该教室，最多可容纳" + selectedInfo.maxPeople + "人！</p> <br><p class='tips'>开放时间为：" + selectedInfo.dayBeginTime + "-" + selectedInfo.dayEndTime + "</p>");
                subscribeService.YXS_BZ = "<p class='tips' >" + selectedInfo.minPeople +"人以上才可以预约该教室，最多可容纳" + selectedInfo.maxPeople + "人！</p> <br><p class='tips'>开放时间为：" + selectedInfo.dayBeginTime + "-" + selectedInfo.dayEndTime + "</p>"
                subscribeService.tipsfather = tipsfather;

            }else{
                subscribeService.day_YXS = subscribeService.y_day =  1;
                //根据研修室 更新日期
                $scope.subscribeDate = subscribeService.getDate();
                tipsfather.hide();
            }
            subscribeService.rr_bean.roomed = arg;

        }

        $scope.peopleChange = function(arg){
            subscribeService.rr_bean.totalPeople = arg;
            subscribeService.peopleNum = arg;
        }


    }
    $scope.radioClick = function (arg) {
        $(".tipsfather").hide();


        if(arg == 0){
            subscribeService.y_day = 2;
            subscribeService.radioType = 1;
            $(".tipsfather").show();
            //$("#studyLoungeName option:first").prop("selected", 'selected');

        }else{

            subscribeService.y_day = subscribeService.day_YXS ? subscribeService.day_YXS : 1;
            subscribeService.radioType = 2;
            if(subscribeService.YXS_BZ){
                subscribeService.tipsfather.html(subscribeService.YXS_BZ);
                $(".tipsfather").show();
            }



        }
        $scope.subscribeDate = subscribeService.getDate();

    }
    $scope.subscribeDate = subscribeService.getDate();

    $scope.checkDate = function (arg) {
        subscribeService.checkDate(arg);
    }
});


subscribeApp.controller("ChooseSeatCtrl",function ($scope,subscribeService) {
    $scope.ChooseSeat = function (arg) {

        if(arg){
            var flag = arg;
            var ChooseSeatFlag = subscribeService.ChooseSeat(arg);
            if(ChooseSeatFlag){

                window.location = arg + ".html";
            }
        }

    }
    
    $scope.RRChooseSeat = function () {

        subscribeService.rr_bean.reservationDate = subscribeService.day ;
        subscribeService.rr_bean.beginTime = $(".date #start")[0].innerHTML;
        subscribeService.rr_bean.endTime = $(".date #end")[0].innerHTML;

        var LibraryName = $("#libraryList option:selected").text();
        if(!LibraryName || "请选择图书馆" == LibraryName){
            subscribeService.alertError("请选择图书馆！");
            return false;
        }

        subscribeService.rr_bean.LibraryName = LibraryName;
        var roomed = subscribeService.rr_bean.roomed;



        if(!roomed){
            subscribeService.alertError("请选择研修室！");
            return false;
        }

        var si = subscribeService.selectedInfo;

        subscribeService.rr_bean.roomedName = si.name;

        var totalPeople = subscribeService.rr_bean.totalPeople;
        if(!totalPeople){
            subscribeService.alertError("请填写预约总人数！");
            return false;
        }else{
            if(isNaN(parseInt(totalPeople))){
                subscribeService.alertError("总人数应为数字！");
                return false;
            }
        }

        if(parseInt(totalPeople) > parseInt(si.maxPeople)){
            subscribeService.alertError("预约总人数超过研修室规定人数！<br> <h3>最大人数不能超过"+subscribeService.selectedInfo.maxPeople +"人</h3>");
            return false;
        }
        var dayBeginTime = new Date(subscribeService.rr_bean.reservationDate + " " +si.dayBeginTime);//
        var beginTime = new Date(subscribeService.rr_bean.reservationDate + " " +subscribeService.rr_bean.beginTime);

        if(beginTime < dayBeginTime){
            subscribeService.alertError("预约时间不在研修室开放时间内<br> <h3>研修室开放时间为："+si.dayBeginTime +"-"+si.dayEndTime+"</h3>");
            return false;
        }
        if(subscribeService.rr_bean.reservationDate.length < 7){
            subscribeService.alertError("请至少选择一个日期！");
            return false;
        }

        subscribeService.rr_bean.type = "researchRoom";

        $.cookie("subscribeSubmit",JSON.stringify(subscribeService.rr_bean), {  path: '/' });
        //window.location = "subscribeConfirm.html";

        var serviceArg = subscribeService.rr_bean;
        var apire = Api.addReservationResearch(serviceArg.roomed,serviceArg.totalPeople,serviceArg.reservationDate,serviceArg.beginTime,serviceArg.endTime);//roomed,totalPeople,reservationDate,beginTime,endTime
        if(apire){
            if(apire.success){
                window.location = "index.html";
            }else if(!apire.success){
                alert(apire.message);
            }
        }

    }
})




subscribeApp.factory("subscribeService",function () {

    var factory = {};

    factory.first_Campus = "";
    factory.day = "";

    factory.Campuses = function(){
        var Campus_re = Api.selectCampusAndBuildingInfomation();

        if(Campus_re.success){
            var Campuses = Campus_re.list;

            factory.first_Campus = Campuses[0].buildingId;
            $.cookie("all_Campus",JSON.stringify(Campuses), {  path: '/' });//

            factory.Campus_list = Campus_re.list;
            return Campus_re.list;

        }


    }

    factory.Classroom = function(){

        var TSGID = "";

        if(factory.first_Campus){
            TSGID =  factory.first_Campus;
        }


        if(TSGID){
            var SEC = Api.selectEachClassroom(TSGID,"2016-07-05 08:00:00","9999-08-05 08:00:00");
            if(SEC.success){
                var studyLounge = SEC.list;
               return studyLounge;
            }
        }else{
            var tipsfather = $(".tipsfather");
            tipsfather.hide();
        }
    }

    factory.BuildingResearchRoom = function(){
            var RR = Api.BuildingResearchRoom();
            if(RR.success){
                var lists = RR.lists;
                return lists;
            }
    }

    factory.ResearchRoom = function(){
        if(factory.first_BuildingResearch){
            var RR = Api.ResearchRoom(factory.first_BuildingResearch);
            if(RR.success){
                return RR.lists;
            }
        }
    }

    factory.cookie_subscribeDate = g.toJson($.cookie("subscribeDate"));

    factory.getDate = function(){

        var dateArray = new Array();

        var subscribeDate = new Date();

        var weekday=new Array(7);
        weekday[0]="周日";
        weekday[1]="周一";
        weekday[2]="周二";
        weekday[3]="周三";
        weekday[4]="周四";
        weekday[5]="周五";
        weekday[6]="周六";

        var S_Day = subscribeDate.getDay();

        var y_day = factory.y_day;

        y_day = y_day ? y_day : 2;

        var S_date = subscribeDate.getDate();

        for(var d = 0 ; d < y_day ; d++){

            var D_Date =  subscribeDate.setDate( S_date + d);

            var date = new Date(D_Date);
            var dates = {};
            dates.Weekday = weekday[parseInt(S_Day+d) % 7];
            var Month = date.getMonth()+1  ;
            Month = Month.toString().length == 2 ? Month : "0"+ Month;
            var Day = date.getDate().toString();
            Day = Day.length == 2 ? Day : "0" + Day;
            dates.date = Month + "-" + Day;
            if(d == 0){
                factory.day = dates.date;
            }
            if(typeof factory.radioType == "undefined" || factory.radioType == 1 ){

                if( factory.cookie_subscribeDate &&  factory.cookie_subscribeDate.reservationDay){
                    dates.active = dates.date ==  factory.cookie_subscribeDate.reservationDay ? "active" : "";
                }else{
                    dates.active = d == 0 ? "active" : "";
                }

            }else{
                dates.active = "";
            }


            dateArray[d] = dates;
        }
        return dateArray;

    }

    /**
     * 选择日期
     * @param arg
     */
    factory.checkDate = function (arg) {



        var day_children = $(".day-pick").children().eq(arg);

        if(typeof factory.radioType == "undefined" || factory.radioType == 1 ) {
            var day_span = day_children.find("span");
            factory.day = day_span.eq(1)[0].innerHTML;
            day_children.addClass("active").siblings().removeClass("active");

        }else{
            if(day_children.attr("class").indexOf("active") > -1){
                day_children.removeClass("active");
            }else{
                day_children.addClass("active");
            }

            var li_active = $(".day-pick").find(".active");

            var days = "";

            if(li_active.length > 0){
                for(var l = 0 ; l < li_active.length ; l++){
                    var val = li_active.children().eq(l).find("span").eq(1)[0].innerHTML;
                    val = new Date().getFullYear() + "-" + val;
                    if(l==0){
                        days += val;
                    }else{
                        days += "," + val;
                    }

                }
                factory.day = days;
            }
        }
    }

    /**
     * 预约座位
     * @param arg
     * @returns {boolean}
     * @constructor
     */
    factory.ChooseSeat = function (arg) {
       if(arg != null && ( arg == "optionalSeat" || arg == "randomSeat")){
           var bean = {};
           var Day_year = new Date().getFullYear();


           bean.reservationBeginTime = Day_year + "-" + factory.day + " "+ $(".date #start")[0].innerHTML;
           bean.reservationEndTime = Day_year + "-" + factory.day + " "+ $(".date #end")[0].innerHTML;
           bean.reservationDate = Day_year + "-" + factory.day ;
           bean.reservationDay =  factory.day ;

           var Library = $("#LibraryName option:selected");
           var studyLounge = $("#studyLoungeName option:selected");

           var LibraryName = Library.text();
           var LibraryVal = Library.val();


           if(!LibraryName || !LibraryVal){
               factory.alertError("请选择图书馆！");
               return false;
           }

           var studyLoungeName = studyLounge.text();
           var studyLoungeVal = studyLounge.val();
           var studyLoungeFloor = studyLounge.attr("floor");

           if(arg != "randomSeat") {

               if (!studyLoungeName || !studyLoungeVal) {
                   factory.alertError("请选择自习室！");

                   return false;
               }
           }

           bean.LibraryVal = LibraryVal;
           bean.studyLoungeVal = studyLoungeVal;
           bean.studyLoungeFloor = studyLoungeFloor;

           $.cookie("subscribeDate",JSON.stringify(bean), {  path: '/' });//预约的时间

           var spaceBean = {};

           spaceBean.LibraryName = LibraryName;
           spaceBean.studyLoungeName = studyLoungeName;

           spaceBean.toHref = arg;

           $.cookie("subscribeSpace",JSON.stringify(spaceBean), {  path: '/' });//

           return true;

       }

    }

    /**
     * 弹框
     * @param msg
     */
    factory.alertError = function(msg){
        var op = $("#open-modal2 p");
        op.html(msg);
        op.css("color","red");
        window.location = "#open-modal2";
    }


    return factory;
});

$(document).ready(function(){
    var cookie_subscribeDate = g.toJson($.cookie("subscribeDate"));


        var Library = $("#LibraryName option");
        if(Library.length > 0){
            for(var lb = 0 ; lb < Library.length ; lb++){
                if(cookie_subscribeDate){
                    if(Library[lb].value == cookie_subscribeDate.LibraryVal){
                        $(Library[lb]).prop("selected", 'selected');
                    }
                }else{
                    if(Library.length > 2){
                        $(Library[0]).prop("selected", 'selected');
                    }else if(Library.length == 2){
                        $(Library[1]).prop("selected", 'selected');
                    }


                }

            }
        }

        var studyLounge = $("#studyLoungeName option");
        if(studyLounge.length > 0){
            for(var lb = 0 ; lb < studyLounge.length ; lb++){
                if(cookie_subscribeDate) {
                    if (studyLounge[lb].value == cookie_subscribeDate.studyLoungeVal) {
                        $(studyLounge[lb]).prop("selected", 'selected');
                    }
                }else{
                    if(studyLounge.length > 2){
                        $(studyLounge[0]).prop("selected", 'selected');
                    }else if(studyLounge.length == 2){
                        $(studyLounge[1]).prop("selected", 'selected');
                    }


                }
            }
        }

    var all_Campus = g.toJson($.cookie("all_Campus"));
    if(all_Campus){
        var tipsfather = $(".tipsfather");
        tipsfather.show();
        for(var ac = 0 ; ac < all_Campus.length ; ac++) {

            if (cookie_subscribeDate) {
                if (all_Campus[ac].buildingId == cookie_subscribeDate.LibraryVal) {

                    tipsfather.html("<p class='tips' >开放时间："+all_Campus[ac].dayBeginTime+"-"+all_Campus[ac].dayEndTime+"</p>");
                }
            } else {
                if (ac == 0) {
                    tipsfather.html("<p class='tips' >开放时间："+all_Campus[ac].dayBeginTime+"-"+all_Campus[ac].dayEndTime+"</p>");
                }
            }
        }
    }

    //研修室图书馆
    var libraryList = $("#libraryList option");
    if(libraryList.length > 0){
        if(libraryList.length > 2){
            $(libraryList[0]).prop("selected", 'selected');
        }else if(libraryList.length == 2){
            $(libraryList[1]).prop("selected", 'selected');
        }else{
            $(libraryList[0]).prop("selected", 'selected');
        }
    }

    $("#libraryList").change(function(){
        var select_RR = $('#select_RR option');
        if(select_RR.length > 0){
            if(select_RR.length > 2){
                $(select_RR[0]).prop("selected", 'selected');
            }else if(select_RR.length == 2){
                $(select_RR[1]).prop("selected", 'selected');
            }else{
                $(select_RR[0]).prop("selected", 'selected');
            }
        }
    });


    $("#LibraryName").change(function(){
        var studyLoungeName = $('#studyLoungeName option');
        if(studyLoungeName.length > 0){
            if(studyLoungeName.length > 2){
                $(studyLoungeName[0]).prop("selected", 'selected');
            }else if(studyLoungeName.length == 2){
                $(studyLoungeName[1]).prop("selected", 'selected');
            }else{
                $(studyLoungeName[0]).prop("selected", 'selected');
            }
        }
    });


});

