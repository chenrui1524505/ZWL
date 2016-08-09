/**
 * Created by Lix on 2016-7-18.
 */

var contractApp = angular.module("App",[]);



contractApp.controller("contractCtrl",function ($scope) {
    var contractInfo = g.toJson($.cookie("contractZXS"));

    /*buildingName
     seatNum
     campusName
     classroomNum
     dayBeginTime
     dayEndTime
     seatNum     */


    $scope.info = contractInfo.campusName + contractInfo.buildingName+ contractInfo.floor + "层" + contractInfo.classroomNum + contractInfo.seatNum + "座";
    var SystemTime = Api.getSystemTime();
    $scope.sreservationBeginTime = SystemTime;
    $scope.sreservationEndTime = SystemTime.substring(0,11) + contractInfo.dayEndTime;

    $scope.submit = function () {
        var _st = $(".span_Time")[0].innerHTML;

        var st = _st.replace("-" , "/").replace("-" , "/");
        var cse = $scope.sreservationEndTime;
        cse = cse.replace("-" , "/").replace("-" , "/");

        if(new Date(st) - new Date(cse) <= 0) {
            var userInfo = g.userInfo();

            var reapi = Api.addReservation(userInfo.userInfoId,contractInfo.seatId,SystemTime,_st,2);
            if (reapi.success) {
                $.cookie("muiFlag",3,{path:"/"});
                window.location = "index.html";

            } else {
                mui.toast(reapi.message ? reapi.message : "未知错误");
            }
        }else{
            mui.toast("结束时间要小于"+cse);
        }
    }

});

/*(function($) {
    $.init();
    //var result = $('#result')[0];
    var btns = $('.btn');
    btns.each(function(i, btn) {
        btn.addEventListener('tap', function() {
            var optionsJson = this.getAttribute('data-options') || '{}';
            var options = JSON.parse(optionsJson);
            var id = this.getAttribute('id');

            var picker = new $.DtPicker(options);
            picker.show(function(rs) {

                //result.innerText = '选择结果: ' + rs.text;
                var stt = $(".span_Time")[0].innerHTML;
                stt = stt.substring(0,11);
                stt = stt + rs.h.value + ":" + rs.i.value + ":" + "00";
                $(".span_Time")[0].innerText = stt;

                picker.dispose();
            });
        }, false);
    });
})(mui);*/