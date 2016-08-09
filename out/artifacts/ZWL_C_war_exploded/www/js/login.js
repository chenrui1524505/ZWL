/**
 * Created by Lix on 2016-7-1.
 */
/**
 * login
 */

$(document).ready(function(){

    var _schools = Api.Schools();
    if(_schools){
        g_schoolInit(_schools);
    }
    $(".g-login").click(function(){
        var _userNum = $(".userNum").val();
        var _userPwd = $(".userPwd").val();
        var _schoolNum = $(".schoolNum option:selected").val();

        if(!_schoolNum || _schoolNum == "请选择"){
            mui.toast("请选择学校");
            return null;
        }
        if(!_userNum){
            mui.toast("请输入学号");
            return null;
        }
        if(!_userPwd){
            mui.toast("请输入密码");
            return null;
        }
        if(_userNum && _userPwd && _schoolNum){
            var bean = {};
            var _userInfo = Api.login(_userNum,_userPwd,_schoolNum);


            if(_userInfo.success){
                //_userInfo.object

                bean.token = _userInfo.object.token;
                bean.userSex = _userInfo.object.userSex;
                bean.userName = _userInfo.object.userName;
                bean.schoolName = _userInfo.object.schoolName;
                bean.schoolNum = _userInfo.object.schoolNum;
                bean.campusName = _userInfo.object.campusName;
                bean.credential = _userInfo.object.credential;
                bean.userInfoId = _userInfo.object.userInfoId;
                bean.campusId = _userInfo.object.campusId;
                bean.userNum = _userInfo.object.userNum;
                bean.major = _userInfo.object.major;
                var userPhoto =  _userInfo.object.headPortrait;
                if(userPhoto.length > 0){
                    bean.headPortrait = true;
                    g.localData.set("userPhoto", "data:image/gif;base64," + _userInfo.object.headPortrait);
                }

                //$("#imgtest").attr("src", "data:image/gif;base64," + _userInfo.object.headPortrait);

                var expiresDate= new Date();
                expiresDate.setTime(expiresDate.getTime() + (72000 * 60 * 1000));


                var selectConfig = Api.selectConfig(_userInfo.object.campusId);
                if(typeof selectConfig != "undefined" && selectConfig.success){
                    bean.configId = selectConfig.object.configId;
                    bean.leaveLength = selectConfig.object.leaveLength;
                    bean.leaveTimes = selectConfig.object.leaveTimes;
                    bean.lunchStartTime = selectConfig.object.lunchStartTime;
                    bean.lunchEndTime = selectConfig.object.lunchEndTime;
                    bean.dinnerStartTime = selectConfig.object.dinnerStartTime;
                    bean.dinnerEndTime = selectConfig.object.dinnerEndTime;
                    bean.reservationTime = selectConfig.object.reservationTime;
                    bean.reservationLength = selectConfig.object.reservationLength;
                    bean.arriveTimeOut = selectConfig.object.arriveTimeOut;
                    bean.awayTimeIn = selectConfig.object.awayTimeIn;
                    bean.awayTimeOut = selectConfig.object.awayTimeOut;
                    bean.violationTimes = selectConfig.object.violationTimes;
                    bean.blacklistDuration = selectConfig.object.blacklistDuration;
                    bean.temporaryLeaveLock = selectConfig.object.temporaryLeaveLock;
                    bean.createDate = selectConfig.object.createDate;
                    bean.startGrab = selectConfig.object.startGrab;
                }


                $.cookie("userInfo",JSON.stringify(bean), {  path: '/',expires : expiresDate  });

                window.location="index.html";

            }else{
                mui.toast(_userInfo.message);
            }
        }

    });


});

/**
 * 学校
 * @param arg
 */
function g_schoolInit(arg){
    if(arg){

        if(arg.success){
            var g_schools = $(".g-schools");
            if(g_schools.length > 0){
                var lists = arg.lists;
                for(var a = 0 ; a < lists.length ; a++){
                    g_schools.append("<option value=\""+lists[a].schoolNum+"\"> "+lists[a].name+"</option>")
                }
            }
        }
    }
}

