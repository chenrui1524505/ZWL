/**
 * Created by Lix on 2016-7-18.
 */

var contractApp = angular.module("App",[]);



contractApp.controller("contractCtrl",function ($scope) {
    var contractInfo = g.toJson($.cookie("contractInfo"));

    $scope.info = contractInfo.info;
    $scope.sreservationBeginTime = contractInfo.sreservationBeginTime;
    $scope.sreservationEndTime = contractInfo.sreservationEndTime;

    $scope.submit = function () {
        var _st = $(".span_Time")[0].innerHTML;

        var st = _st.replace("-" , "/").replace("-" , "/");
        var cse = contractInfo.sreservationEndTime;
        cse = cse.replace("-" , "/").replace("-" , "/");

        if(new Date(st) - new Date(cse) > 0) {
            var reapi = Api.extendSeatTime(contractInfo.reservationId, _st);
            if (reapi.success) {
                $.cookie("muiFlag",1,{path:"/"});
                window.location = "index.html";

            } else {
                mui.toast(reapi.message ? reapi.message : "未知错误");
            }
        }else{
            mui.toast("续约时间要大于结束时间");
        }
    }

});

