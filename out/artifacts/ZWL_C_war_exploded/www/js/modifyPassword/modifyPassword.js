/**
 * Created by Lix on 2016-7-11.
 */


$(document).ready(function () {
    $(".edit-pwd a").click(function () {
        var oldPassword = $(".oldPassword").val();

        var newPassword = $(".newPassword").val();

        var newPasswordAgain = $(".newPasswordAgain").val();
        if(newPasswordAgain != newPassword){
            g.openmodal2("两次密码输入错误");
            return;
        }
        var apire = Api.password(oldPassword,newPassword);
        if(apire.success){
            g.openmodal(apire.message);
            $(".modal-close").click(function(){
                window.location = "settings.html"
            })
        }else{
            g.openmodal2(apire.message);
        }



    });
})