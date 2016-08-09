/**
 * Created by Lix on 2016-7-1.
 */
window["Api"] = {};

/**
 * 查询学校
 * @returns {string}
 * @constructor
 */
window["Api"]["Schools"] = function(){
    var arg = "" ;

    $.ajax({
        type	:	"POST",

        url		:	g.ContextPath + "school/selectSchool",
        async	:	false,
        success	:	function(res){
            if(res){
               arg = res;
            }
        },
        error:function(e) {
            console.log(e);
            return null;
        }
    });

    return arg;
};


/**
 * 登录
 * @param userNum
 * @param userPwd
 * @param schoolNum
 * @returns {string}
 */
window["Api"]["login"] = function (userNum,userPwd,schoolNum){
    var arg = "" ;

    $.ajax({
        type	:	"POST",
        data    :   {
            "userNum":userNum,
            "userPwd":userPwd,
            "schoolNum":schoolNum
        },
        url		:	g.ContextPath + "userInfo/login",
        async	:	false,
        success	:	function(res){
            if(res){
                arg = res;
            }
        },
        error:function(e) {
            console.log(e);
            return null;
        }
    });

    return arg;
};


/**
 * 查询校区和图书馆信息
 * @returns {string}
 */
window["Api"]["selectCampusAndBuildingInfomation"] = function (){
    var arg = "" ;

    var _ui = g.userInfo();

    $.ajax({
        type	:	"POST",
        data    :   {
            "userInfoId":_ui.userInfoId
        },
        url		:	g.ContextPath + "selectInfo/selectCampusAndBuildingInfomation",
        async	:	false,
        success	:	function(res){
            if(res){
                arg = res;
            }
        },
        error:function(e) {
            console.log(e);
            return null;
        }
    });

    return arg;
};

/**
 * 查询每间教室总座位数和剩余座位数
 * @param buildingId 楼房id
 * @param reservationBeginTime 起始时间
 * @param reservationEndTime  截止时间
 * @returns {string}
 */
window["Api"]["selectEachClassroom"] = function (buildingId,reservationBeginTime,reservationEndTime){
    var arg = "" ;

    $.ajax({
        type	:	"POST",
        data    :   {
            "buildingId":buildingId,
            "reservationBeginTime":reservationBeginTime,
            "reservationEndTime":reservationEndTime
        },
        url		:	g.ContextPath + "selectInfo/selectEachClassroom_TotalSeatsAndRemainSeats",
        async	:	false,
        success	:	function(res){
            if(res){
                arg = res;
            }
        },
        error:function(e) {
            console.log(e);
            return null;
        }
    });

    return arg;
};

/**
 * 查询包含研修室的图书馆列表
 * @param userId
 * @returns {string}
 */
window["Api"]["selectBuildingContainResearchRoom"] = function (token,userId){
    var arg = "" ;

    $.ajax({
        type	:	"POST",
        data    :   {
            "userId":userId
        },
        url		:	g.ContextPath + "selectInfo/selectBuildingContainResearchRoom",

       // Authorization:token,
        async	:	false,

        success	:	function(res){
            if(res){
                arg = res;
            }
        },
        error:function(e) {
            console.log(e);
            return null;
        }

    });

    return arg;
};

/**
 * 查询研修室信息（根据buildingId和userId得到满足权限的研修室）
 * @param buildingId
 * @param userId
 * @returns {string}
 */
window["Api"]["selectResearchRoom"] = function (buildingId,userId){
    var arg = "" ;

    $.ajax({
        type	:	"POST",
        data    :   {
            "userId":userId
        },
        url		:	g.ContextPath + "researchRoom/selectResearchRoom",
        async	:	false,
        success	:	function(res){
            if(res){
                arg = res;
            }
        },
        error:function(e) {
            console.log(e);
            return null;
        }
    });

    return arg;
};


/**
 * 查询某教室匹配的座位
 * @param classroomId
 * @param reservationBeginTime
 * @param reservationEndTime
 * @returns {string}
 * @constructor
 */
window["Api"]["SeatsInfo"] = function (classroomId,reservationBeginTime,reservationEndTime){
    var arg = "" ;

    $.ajax({
        type	:	"POST",
        data    :   {
            "classroomId":classroomId,
            "reservationBeginTime":reservationBeginTime,
            "reservationEndTime":reservationEndTime
        },
        url		:	g.ContextPath + "selectInfo/selectEachClassroom_SeatsInfo",
        async	:	false,
        success	:	function(res){
            if(res){
                arg = res;
            }
        },
        error:function(e) {
            console.log(e);
            return null;
        }
    });

    return arg;
};

/**
 * 预约（自己选座）
 * @param userInfoId
 * @param seatId
 * @param reservationBeginTime
 * @param reservationEndTime
 * @param notArrive
 * @returns {string}
 * @constructor
 * headers: {
            "Authorization":userInfo.token
        },
 */
window["Api"]["addReservation"] = function (userInfoId,seatId,reservationBeginTime,reservationEndTime,notArrive){
    var arg = "" ;
    notArrive = notArrive != null ? notArrive : "1";
    seatId = seatId ? seatId : $("#SeatDataID").val();
    var userInfo = g.userInfo();

    var Authorization = userInfo.token;
    var dataS = {
        "url":g.ContextPath + "reservation/addReservationBychoose",
        "userInfoId":userInfoId,
        "seatId":seatId,
        "reservationBeginTime":reservationBeginTime,
        "reservationEndTime":reservationEndTime,
        "notArrive":notArrive,
        "Authorization":Authorization
    };

    $.ajax({
        type: "post",
        url		:	 "../WebAction/Api/requestApi",
        async	:	false,
        dataType : "json",
        data    : {
            "data" : JSON.stringify(dataS)
        } ,


        success	:	function(res){
            if(res){
                arg = res;
                console.log(arg);
            }
        },
        error:function(e) {
            console.log(e);
            return null;
        }

    });

    return arg;
};

/**
 * 查询该用户签到或未签到的预约记录和授权记录(首页)
 * @returns {string}
 */
window["Api"]["selectReservationByUser"] = function (){
    var arg = "" ;
    var userInfo = g.userInfo();
    var dataS = {
        "url":g.ContextPath + "reservation/selectReservationByUser",
        "userInfoId":userInfo.userInfoId,
        "Authorization":userInfo.token
    };

    $.ajax({

        type: "post",
        url		:	 "../WebAction/Api/requestApi",
        async	:	false,
        dataType : "json",
        data    : {
            "data" : JSON.stringify(dataS)
        } ,


        success	:	function(res){
            if(res){
                arg = res;
            }
        },
        error:function(e) {
            console.log(e);
            return null;
        }

    });

    return arg;
};

/**
 * 查询该用户记录状态正常或异常的预约记录
 * @param state
 * @param nowPage
 * @param pageSize
 * @returns {string}
 */
window["Api"]["selectReservation"] = function (state,nowPage,pageSize){
    var arg = "" ;
    var userInfo = g.userInfo();
    var dataS = {
        "url":g.ContextPath + "reservation/selectReservation",
        "userInfoId":userInfo.userInfoId,
        "state":state,
        "nowPage":nowPage,
        "pageSize":pageSize,
        "Authorization":userInfo.token
    };

    $.ajax({

        type: "post",
        url		:	 "../WebAction/Api/requestApi",
        async	:	false,
        dataType : "json",
        data    : {
            "data" : JSON.stringify(dataS)
        } ,


        success	:	function(res){
            if(res){
                arg = res;
            }
        },
        error:function(e) {
            console.log(e);
            return null;
        }

    });

    return arg;
};


window["Api"]["cancelReservation"] = function (reservationId ){
    var arg = "" ;
    var userInfo = g.userInfo();
    var dataS = {
        "url":g.ContextPath + "reservation/cancelReservation",
        "reservationId":reservationId,
        "Authorization":userInfo.token
    };

    $.ajax({

        type: "post",
        url		:	 "../WebAction/Api/requestApi",
        async	:	false,
        dataType : "json",
        data    : {
            "data" : JSON.stringify(dataS)
        } ,


        success	:	function(res){
            if(res){
                arg = res;
            }
        },
        error:function(e) {
            console.log(e);
            return null;
        }

    });

    return arg;
};

window["Api"]["password"] = function (oldPassword,newPassword){
    var arg = "" ;
    var userInfo = g.userInfo();
    $.ajax({
        type	:	"POST",
        data    :   {
            "userInfoId":userInfo.userInfoId,
            "oldPassword":oldPassword,
            "newPassword":newPassword
        },
        url		:	g.ContextPath + "userInfo/current/password",
        async	:	false,
        success	:	function(res){
            if(res){
                arg = res;
            }
        },
        error:function(e) {
            console.log(e);
            return null;
        }
    });

    return arg;
};



//version/android
/**
 * 获取最新版本号和下载地址
 * @returns {string}
 */
window["Api"]["android"] = function (){
    var arg = "" ;
    $.ajax({
        type	:	"POST",
        url		:	g.ContextPath + "version/android",
        async	:	false,
        success	:	function(res){
            if(res){
                arg = res;
            }
        },
        error:function(e) {
            console.log(e);
            return null;
        }
    });

    return arg;
};

//version/ios
/**
 * 获取最新版本号和下载地址
 * @returns {string}
 */
window["Api"]["ios"] = function (){
    var arg = "" ;
    $.ajax({
        type	:	"POST",
        url		:	g.ContextPath + "version/ios",
        async	:	false,
        success	:	function(res){
            if(res){
                arg = res;
            }
        },
        error:function(e) {
            console.log(e);
            return null;
        }
    });

    return arg;
};

/**
 * 查询包含研修室的图书馆列表
 * @returns {string}
 * @constructor
 */
window["Api"]["BuildingResearchRoom"] = function (){
    var arg = "" ;
    var userInfo = g.userInfo();
    var dataS = {
        "url":g.ContextPath + "selectInfo/selectBuildingContainResearchRoom",
        "userId":userInfo.userInfoId,
        "Authorization":userInfo.token
    };

    $.ajax({

        type: "post",
        url		:	 "../WebAction/Api/requestApi",
        async	:	false,
        dataType : "json",
        data    : {
            "data" : JSON.stringify(dataS)
        } ,


        success	:	function(res){
            if(res){
                arg = res;
            }
        },
        error:function(e) {
            console.log(e);
            return null;
        }

    });

    return arg;
};

/**
 * 查询研修室信息（根据buildingId和userId得到满足权限的研修室）
 * @param buildingId
 * @returns {string}
 * @constructor
 */
window["Api"]["ResearchRoom"] = function (buildingId){
    var arg = "" ;
    var userInfo = g.userInfo();
    var dataS = {
        "url":g.ContextPath + "researchRoom/selectResearchRoom",
        "buildingId":buildingId,
        "userId":userInfo.userInfoId,
        "Authorization":userInfo.token
    };
    $.ajax({

        type: "post",
        url		:	 "../WebAction/Api/requestApi",
        async	:	false,
        dataType : "json",
        data    : {
            "data" : JSON.stringify(dataS)
        } ,
        success	:	function(res){
            if(res){
                arg = res;
            }
        },
        error:function(e) {
            console.log(e);
            return null;
        }

    });

    return arg;
};

/**
 * 预约研修室
 * @param roomed
 * @param totalPeople
 * @param reservationDate
 * @param beginTime
 * @param endTime
 * @returns {string}
 */
window["Api"]["addReservationResearch"] = function (roomed,totalPeople,reservationDate,beginTime,endTime){
    var arg = "" ;
    var userInfo = g.userInfo();

    var dataS = {
        "url":g.ContextPath + "researchRoomReservation/addReservation",
        "userId":userInfo.userInfoId,
        "roomId":roomed,
        "totalPeople":totalPeople,
        "reservationDate":reservationDate,
        "beginTime":beginTime,
        "endTime":endTime,
        "Authorization":userInfo.token
    };
    $.ajax({

        type: "post",
        url		:	 "../WebAction/Api/requestApi",
        async	:	false,
        dataType : "json",
        data    : {
            "data" : JSON.stringify(dataS)
        } ,
        success	:	function(res){
            if(res){
                arg = res;
            }
        },
        error:function(e) {
            console.log(e);
            return null;
        }

    });

    return arg;
};

//getTime/getSystemTime

window["Api"]["getSystemTime"] = function(){
    var arg = "" ;
    $.ajax({
        type: "get",
        url		:	 g.ContextPath + "getTime/getSystemTime",
        async	:	false,
        success	:	function(res){
            if(res){
                arg = res;
            }
        },
        error:function(e) {
            console.log(e);
            return null;
        }

    });

    return arg;
};


/**
 *
 * @param nowPage
 * @param pageSize
 * @returns {string}
 */
window["Api"]["selectRoomReservation"] = function (nowPage,pageSize){
    var arg = "" ;
    var userInfo = g.userInfo();
    nowPage = nowPage ? nowPage : 1;
    pageSize = pageSize ? pageSize : 1;
    var dataS = {
        "url":g.ContextPath + "researchRoomReservation/selectRoomReservation",
        "userId":userInfo.userInfoId,
        "nowPage":nowPage,
        "pageSize":pageSize,
        "Authorization":userInfo.token
    };
    $.ajax({

        type: "post",
        url		:	 "../WebAction/Api/requestApi",
        async	:	false,
        dataType : "json",
        data    : {
            "data" : JSON.stringify(dataS)
        } ,
        success	:	function(res){
            if(res){
                arg = res;
            }
        },
        error:function(e) {
            console.log(e);
            return null;
        }

    });

    return arg;
};

/**
 * 预约座位（随机分配：在校区和楼名）
 * @param buildingId
 * @param reservationBeginTime
 * @param reservationEndTime
 * @returns {string}
 */
window["Api"]["addSeatByrandom"] = function (buildingId,reservationBeginTime,reservationEndTime){
    var arg = "" ;
    var userInfo = g.userInfo();
    var dataS = {
        "url":g.ContextPath + "reservation/addSeatByrandom",
        "userInfoId":userInfo.userInfoId,
        "buildingId":buildingId,
        "reservationBeginTime":reservationBeginTime,
        "reservationEndTime":reservationEndTime,
        "campusId":userInfo.campusId,
        "Authorization":userInfo.token
    };
    $.ajax({

        type: "post",
        url		:	 "../WebAction/Api/requestApi",
        async	:	false,
        dataType : "json",
        data    : {
            "data" : JSON.stringify(dataS)
        },
        success	:	function(res){
            if(res){
                arg = res;
            }
        },
        error:function(e) {
            console.log(e);
            return null;
        }

    });

    return arg;
};

/**
 * 随机分配：在层数
 * @param buildingId
 * @param reservationBeginTime
 * @param reservationEndTime
 * @returns {string}
 */
window["Api"]["addSeatRandomByFloor"] = function (buildingId,floor,reservationBeginTime,reservationEndTime){
    var arg = "" ;
    var userInfo = g.userInfo();
    var dataS = {
        "url":g.ContextPath + "reservation/addSeatByrandom",
        "userInfoId":userInfo.userInfoId,
        "buildingId":buildingId,
        "floor":floor,
        "reservationBeginTime":reservationBeginTime,
        "reservationEndTime":reservationEndTime,
        "campusId":userInfo.campusId,
        "Authorization":userInfo.token
    };
    $.ajax({

        type: "post",
        url		:	 "../WebAction/Api/requestApi",
        async	:	false,
        dataType : "json",
        data    : {
            "data" : JSON.stringify(dataS)
        },
        success	:	function(res){
            if(res){
                arg = res;
            }
        },
        error:function(e) {
            console.log(e);
            return null;
        }

    });

    return arg;
};

/**
 * 更换座位
 * @param reservationId
 * @param seatId
 * @returns {string}
 */
window["Api"]["changeSeatBychoose"] = function (reservationId,seatId){
    var arg = "" ;
    var userInfo = g.userInfo();
    var dataS = {
        "url":g.ContextPath + "reservation/changeSeatBychoose",
        "userInfoId":userInfo.userInfoId,
        "reservationId":reservationId,
        "seatId":seatId,
        "Authorization":userInfo.token
    };
    $.ajax({

        type: "post",
        url		:	 "../WebAction/Api/requestApi",
        async	:	false,
        dataType : "json",
        data    : {
            "data" : JSON.stringify(dataS)
        },
        success	:	function(res){
            if(res){
                arg = res;
            }
        },
        error:function(e) {
            console.log(e);
            return null;
        }

    });

    return arg;
};

//seat/getRecommendReservationTime
/**
 * 得到推荐的可预约时间段
 * @param seatId
 * @param reservationBeginTime
 * @returns {string}
 */
window["Api"]["getRecommendReservationTime"] = function (seatId,reservationBeginTime){
    var arg = "" ;
    var userInfo = g.userInfo();
    var dataS = {
        "url":g.ContextPath + "seat/getRecommendReservationTime",
        "userInfoId":userInfo.userInfoId,
        "seatId":seatId,
        "reservationBeginTime":reservationBeginTime,
        "Authorization":userInfo.token
    };
    $.ajax({

        type: "post",
        url		:	 "../WebAction/Api/requestApi",
        async	:	false,
        dataType : "json",
        data    : {
            "data" : JSON.stringify(dataS)
        },
        success	:	function(res){
            if(res){
                arg = res;
            }
        },
        error:function(e) {
            console.log(e);
            return null;
        }

    });

    return arg;
};


/**
 * 取消预约
 * @param id
 * @returns {string}
 */
window["Api"]["cancleReservation"] = function (id){
    var arg = "" ;
    var userInfo = g.userInfo();
    var dataS = {
        "url":g.ContextPath + "researchRoomReservation/cancleReservation",
        "id":id,
        "Authorization":userInfo.token
    };
    $.ajax({

        type: "post",
        url		:	 "../WebAction/Api/requestApi",
        async	:	false,
        dataType : "json",
        data    : {
            "data" : JSON.stringify(dataS)
        },
        success	:	function(res){
            if(res){
                arg = res;
            }
        },
        error:function(e) {
            console.log(e);
            return null;
        }

    });

    return arg;
};


//reservation/ extendSeatTime
window["Api"]["extendSeatTime"] = function (reservationId,reservationEndTime){
    var arg = "" ;
    var userInfo = g.userInfo();
    var dataS = {
        "url":g.ContextPath + "reservation/extendSeatTime",
        "userInfoId":userInfo.userInfoId,
        "reservationId":reservationId,
        "reservationEndTime":reservationEndTime,
        "Authorization":userInfo.token
    };
    $.ajax({

        type: "post",
        url		:	 "../WebAction/Api/requestApi",
        async	:	false,
        dataType : "json",
        data    : {
            "data" : JSON.stringify(dataS)
        },
        success	:	function(res){
            if(res){
                arg = res;
            }
        },
        error:function(e) {
            console.log(e);
            return null;
        }

    });

    return arg;
};


/**
 * 获取access_token
 * @param appid
 * @param secret
 * @returns {string}
 */
    window["Api"]["getToken"] = function(appid,secret){
        var arg = "" ;
        appid = appid ? appid : "wxc13823a96ab80a9b";
        secret = secret ? secret : "b6319aa98e47ac78871da7231041bd3b";
        $.ajax({
            type: "get",
            url		:	 "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+appid+"&secret="+secret,
            async	:	false,
            success	:	function(res){
                if(res){
                    arg = res;
                }
            },
            error:function(e) {
                console.log(e);
                return null;
            }

        });

        return arg;
    };


/**
 * 签到
 * @param seatId
 * @returns {string}
 */
window["Api"]["checkInSeat"] = function(seatId){
    var arg = "" ;
    var userInfo = g.userInfo();
    $.ajax({
        type: "get",
        url		:	 g.ContextPath + "scan/scanQrCode",
        async	:	false,
        data    :{
            "userInfoId":userInfo.userInfoId,
            "seatId":seatId
        },
        success	:	function(res){
            if(res){
                arg = res;
            }
        },
        error:function(e) {
            console.log(e);
            return null;
        }

    });

    return arg;
};





/**
 * 按校区Id查询配置信息
 * @returns {string}
 */
window["Api"]["selectConfig"] = function(campusId){
    var arg = "" ;

    $.ajax({
        type: "get",
        url		:	 g.ContextPath + "configuration/selectConfig",
        async	:	false,
        data    :{
            "campusId":campusId
        },
        success	:	function(res){
            if(res){
                arg = res;
            }
        },
        error:function(e) {
            console.log(e);
            return null;
        }

    });

    return arg;
};

/**
 * 临时离开、午饭、晚饭、彻底离席
 * @param reservationId
 * @param flag
 * @returns {string}
 */
window["Api"]["leave"] = function(reservationId,flag){
    var arg = "" ;
    var userInfo = g.userInfo();
    $.ajax({
        type: "get",
        url		:	 g.ContextPath + "scan/leave",
        async	:	false,
        data    :{
            "reservationId":reservationId,
            "configId":userInfo.configId,
            "flag":flag
        },
        success	:	function(res){
            if(res){
                arg = res;
            }
        },
        error:function(e) {
            console.log(e);
            return null;
        }

    });

    return arg;
};

/**
 * 读取文件信息
 * @param fileName
 */
window["Api"]["getFileInfo"] = function(fileName){

    fileName = fileName ? fileName : "WeChatAccess_token.json";
    var dataS = {};
    dataS.fileName = fileName;

    var arg = "";
    $.ajax({

        type: "post",
        url		:	 "../WebAction/Api/ReaderFile",
        async	:	false,
        dataType : "json",
        data    : {
            "data" : JSON.stringify(dataS)
        },
        success	:	function(res){
            if(res){
                arg = res;
            }else{
                return null;
            }
        },
        error:function(e) {
            console.log(e);
            return null;
        }

    });
    return arg;
}

/**
 * 更新微信配置
 * @param fileName
 */
window["Api"]["ApplyWeChatConfig"] = function(fileName){

    fileName = fileName ? fileName : "WeChatAccess_token.json";
    var dataS = {};
    dataS.fileName = fileName;
    dataS.configUrl = window.location.href;

    var arg = "";
    $.ajax({

        type: "post",
        url		:	 "../WebAction/Api/ApplyWeChatConfig",
        async	:	false,
        dataType : "json",
        data    : {
            "data" : JSON.stringify(dataS)
        },
        success	:	function(res){
            if(res){
                arg = res;
            }else{
                return null;
            }
        },
        error:function(e) {
            console.log(e);
            return null;
        }

    });
    return arg;
}

//researchRoomReservation/signIn
/**
 * 研修室签到
 * @param identifyCode
 * @param roomId
 * @returns {string}
 */
window["Api"]["signIn"] = function (identifyCode,roomId){
    var arg = "" ;
    var userInfo = g.userInfo();
    var dataS = {
        "url":g.ContextPath + "researchRoomReservation/signIn",
        "userId":userInfo.userInfoId,
        "identifyCode":identifyCode,
        "roomId":roomId,
        "Authorization":userInfo.token
    };
    $.ajax({

        type: "post",
        url		:	 "../WebAction/Api/requestApi",
        async	:	false,
        dataType : "json",
        data    : {
            "data" : JSON.stringify(dataS)
        },
        success	:	function(res){
            if(res){
                arg = res;
            }
        },
        error:function(e) {
            console.log(e);
            return null;
        }

    });

    return arg;
};

//scan/scanQrCode

window["Api"]["scanQrCode"] = function (seatId){
    var arg = "" ;
    var userInfo = g.userInfo();
    var dataS = {
        "url":g.ContextPath + "scan/scanQrCode",
        "userInfoId":userInfo.userInfoId,
        "seatId":seatId,
        "Authorization":userInfo.token
    };
    $.ajax({

        type: "post",
        url		:	 "../WebAction/Api/requestApi",
        async	:	false,
        dataType : "json",
        data    : {
            "data" : JSON.stringify(dataS)
        },
        success	:	function(res){
            if(res){
                arg = res;
            }
        },
        error:function(e) {
            console.log(e);
            return null;
        }

    });

    return arg;
};

//researchRoomReservation/signOut


/**
 * 研修室离席
 * @param id
 * @returns {string}
 */
window["Api"]["signOutYXS"] = function (id){
    var arg = "" ;
    var userInfo = g.userInfo();
    var dataS = {
        "url":g.ContextPath + "researchRoomReservation/signOut",
        "id":id,
        "Authorization":userInfo.token
    };
    $.ajax({

        type: "post",
        url		:	 "../WebAction/Api/requestApi",
        async	:	false,
        dataType : "json",
        data    : {
            "data" : JSON.stringify(dataS)
        },
        success	:	function(res){
            if(res){
                arg = res;
            }
        },
        error:function(e) {
            console.log(e);
            return null;
        }

    });

    return arg;
};

/**
 * 互换时，扫码查看当前预约记录
 * @param seatId
 * @param reservationId
 * @returns {string}
 */
window["Api"]["seatInfo"] = function (seatId,reservationId){
    var arg = "" ;
    var userInfo = g.userInfo();
    var dataS = {
        "url":g.ContextPath + "scan/seatInfo",
        "seatId":seatId,
        "reservationId":reservationId,
        "Authorization":userInfo.token
    };
    $.ajax({

        type: "post",
        url		:	 "../WebAction/Api/requestApi",
        async	:	false,
        dataType : "json",
        data    : {
            "data" : JSON.stringify(dataS)
        },
        success	:	function(res){
            if(res){
                arg = res;
            }
        },
        error:function(e) {
            console.log(e);
            return null;
        }

    });

    return arg;
};

/**
 * 互换座位
 * @param receiveReservationId
 * @param reservationId
 * @returns {string}
 */
window["Api"]["exchangeSeat"] = function (receiveReservationId,reservationId){
    var arg = "" ;
    var userInfo = g.userInfo();
    var dataS = {
        "url":g.ContextPath + "reservation/exchangeSeat",
        "userInfoId":userInfo.userInfoId,
        "receiveReservationId":receiveReservationId,
        "reservationId":reservationId,
        "Authorization":userInfo.token
    };
    $.ajax({

        type: "post",
        url		:	 "../WebAction/Api/requestApi",
        async	:	false,
        dataType : "json",
        data    : {
            "data" : JSON.stringify(dataS)
        },
        success	:	function(res){
            if(res){
                arg = res;
            }
        },
        error:function(e) {
            console.log(e);
            return null;
        }

    });

    return arg;
};