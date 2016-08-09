/**
 * Created by Lix on 2016-7-1.
 */
$(document).ready(function(){

    $.ajax({
        type	:	"POST",

        url		:	g.ContextPath + "school/selectSchool",
        async	:	false,
        success	:	function(res){
            if(res){
                g_schoolInit(res);
            }
        },
        error:function(e) {
            console.log(e);
            return;
        }
    });


    $(".g-schools").change(function(){
        var schoolId = $(this).val();
        if(schoolId){
            $.ajax({
                type	:	"POST",
                data    :   {
                    "schoolNum":schoolId
                },
                url		:	g.ContextPath + "campusInfo/selectCampus",
                async	:	false,
                success	:	function(res){
                    if(res){
                        g_campusInit(res);
                    }
                },
                error:function(e) {
                    console.log(e);
                    return;
                }
            });
        }
    });

    $(".g-login").click(function(){

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

/**
 * 校区
 * @param arg
 */
function g_campusInit(arg){
    if(arg){

        if(arg.success){
            var g_schools = $(".g-campus");
            if(g_schools.length > 0){
                var lists = arg.lists;
                g_schools.html("");
                for(var a = 0 ; a < lists.length ; a++){
                    g_schools.append("<option value=\""+lists[a].campusId+"\"> "+lists[a].campusName+"</option>")
                }
            }
        }
    }
}