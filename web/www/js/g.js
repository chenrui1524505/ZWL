
/**
 * Created by Lix on 2016-7-1.
 */

/**
 * IE兼容consol
 * @author lixiang
 */

window.console = window.console || (function(){
    var c = {};
    c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir =  c.peofile = c.clear = c.exception = c.trace = c.assert =  function(){};
    return c;
})();



window["g"] = {};

Date.prototype.Format = function(formatStr){
    var str = formatStr;
    var Week = ['日','一','二','三','四','五','六'];

    str=str.replace(/yyyy|YYYY/,this.getFullYear());
    str=str.replace(/yy|YY/,(this.getYear() % 100)>9?(this.getYear() % 100).toString():'0' + (this.getYear() % 100));

    str=str.replace(/MM/,this.getMonth()>9?this.getMonth().toString():'0' + this.getMonth());
    str=str.replace(/M/g,this.getMonth());

    str=str.replace(/w|W/g,Week[this.getDay()]);

    str=str.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());
    str=str.replace(/d|D/g,this.getDate());

    str=str.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());
    str=str.replace(/h|H/g,this.getHours());
    str=str.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());
    str=str.replace(/m/g,this.getMinutes());

    str=str.replace(/ss|SS/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());
    str=str.replace(/s|S/g,this.getSeconds());

    return str;
}

window["g"]["prompt"] = function (btnArray,message,placeholder,title,e) {

    btnArray = btnArray ? btnArray : ['确定', '取消'];
    title = title ? title : "提示";
    message = message ? message : "";
    placeholder = placeholder ? placeholder : "";

    mui.prompt(message, placeholder, title, btnArray, function(e) {
        if (e.index == 0) {
            return e.value;
        } else {
            return null;
        }
    })
    
}



window["g"]["openmodal2"] = function(msg){
    var op = $("#open-modal2 p");
    op.html(msg);
    op.css("color","red");
    window.location = "#open-modal2";
}
window["g"]["openmodal"] = function(msg){
    var op = $("#open-modal2 p");
    $("#open-modal2 h2").html("提示");
    op.html(msg);
    window.location = "#open-modal2";
}


/**
 * 获取路径后面的参数
 */
window["g"]["getUrlParam"] = function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

/**
 *正式接口地址
 */
window["g"]["ContextPath"] = "http://www.jzwz88.com:9901/";//"http://123.57.222.123:9901/";

/**
 * 测试地址
 * @type {string}
 */
window["g"]["researchPath"] = "http://119.10.30.52:9901/";

/**
 * json字符串转成json对象
 * @author Lix
 */
window['g']['toJson'] = function toJson(arg){
    return eval('(' + arg + ')');
};

window['g']['getCountWidth'] = function getCountWidth(arg){
    if(arg) {
        var seat_ul = $("#seat ul");
        var seat_ul_width = seat_ul.width();
        var _width = (seat_ul.parent().parent().width()- seat_ul_width) / 2 ;//保证随机座位显示在正中间
        var countHeight;
        g.dx = countHeight = 0 - seat_ul_width * parseInt(arg) +_width;
        console.log(countHeight)
        return countHeight;
    }
}
window['g']['getCountHeight'] = function getCountWidth(arg){
    if(arg) {

        var seat_ul = $("#seat ul li");
        var seat_ul_height = seat_ul.height();
        var _height = (seat_ul.parent().parent().parent().height()- seat_ul_height) / 3 ;//保证随机座位显示在正中间
        var countHeight;
        g.dy = countHeight = 0 - seat_ul_height * parseInt(arg)+_height;
        console.log(_height)
        return countHeight;
    }
}

window['g']['Trim']  = function (str,is_global)
{
    var result;
    result = str.replace(/(^\s+)|(\s+$)/g,"");
    if(is_global.toLowerCase()=="g")
    {
        result = result.replace(/\s/g,"");
    }
    return result;
}


window['g']['mathRandom'] = function(n){
    n = n > 20 ? 20 : n;
    var p = Math.pow(10,n+1)
    return parseInt(p*Math.random());
}

window["g"]["userInfo"] = function () {
    var _userInfo =   $.cookie("userInfo");
    if(typeof _userInfo == "undefined") {
        console.log("没有登录信息");
        window.location = "login.html";//判断登录跳转
    }else {
        return g.toJson(_userInfo);
    }
}
window["g"]["Trim"]  = function (str,is_global)
{
    var result;
    result = str.replace(/(^\s+)|(\s+$)/g,"");
    if(is_global.toLowerCase()=="g")
    {
        result = result.replace(/\s/g,"");
    }
    return result;
}
$(document).ready(function(){

    var appFooter = $(".app-footer");
    var a,b,c,d;
    if(appFooter.length > 0){
        var wlUrl = window.location.href;

        if(wlUrl.indexOf("index.html") > -1){
            a = "active"
        }
        if(wlUrl.indexOf("subscribe.html") > -1){
            b = "active"
        }
        if(wlUrl.indexOf("record.html") > -1){
            c = "active"
        }
        if(wlUrl.indexOf("settings.html") > -1){
            d = "active"
        }


    }

    var footerHtml = "<div class=\"nav row\">";
    footerHtml += "<a class=\"col "+a+"\" href=\"index.html\">首页</a>";
    footerHtml += "<a class=\"col "+b+"\" href=\"subscribe.html\">预约</a>";
    footerHtml += "<a class=\"col "+c+"\" href=\"record.html\">记录</a>";
    footerHtml += "<a class=\"col "+d+"\" href=\"settings.html\">设置</a>";
    footerHtml += "</div>";
    appFooter.html(footerHtml);

});



(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var pluses = /\+/g;

    function encode(s) {
        return config.raw ? s : encodeURIComponent(s);
    }

    function decode(s) {
        return config.raw ? s : decodeURIComponent(s);
    }

    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value));
    }

    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape...
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }

        try {
            // Replace server-side written pluses with spaces.
            // If we can't decode the cookie, ignore it, it's unusable.
            // If we can't parse the cookie, ignore it, it's unusable.
            s = decodeURIComponent(s.replace(pluses, ' '));
            return config.json ? JSON.parse(s) : s;
        } catch(e) {}
    }

    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value;
    }

    var config = $.cookie = function (key, value, options) {

        // Write

        if (value !== undefined && !$.isFunction(value)) {
            options = $.extend({}, config.defaults, options);

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setTime(+t + days * 864e+5);
            }

            return (document.cookie = [
                encode(key), '=', stringifyCookieValue(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // Read

        var result = key ? undefined : {};

        // To prevent the for loop in the first place assign an empty array
        // in case there are no cookies at all. Also prevents odd result when
        // calling $.cookie().
        var cookies = document.cookie ? document.cookie.split('; ') : [];

        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = parts.join('=');

            if (key && key === name) {
                // If second argument (value) is a function it's a converter...
                result = read(cookie, value);
                break;
            }

            // Prevent storing a cookie that we couldn't decode.
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie;
            }
        }

        return result;
    };

    config.defaults = {};

    $.removeCookie = function (key, options) {
        if ($.cookie(key) === undefined) {
            return false;
        }

        // Must not alter options, thus extending a fresh object...
        $.cookie(key, '', $.extend({}, options, { expires: -1 }));
        return !$.cookie(key);
    };

}));


window["g"]["localData"] = {

    hname:location.hostname?location.hostname:'localStatus',
    isLocalStorage:window.localStorage?true:false,
    dataDom:null,

    initDom:function(){ //初始化userData
        if(!this.dataDom){
            try{
                this.dataDom = document.createElement('input');//这里使用hidden的input元素
                this.dataDom.type = 'hidden';
                this.dataDom.style.display = "none";
                this.dataDom.addBehavior('#default#userData');//这是userData的语法
                document.body.appendChild(this.dataDom);
                var exDate = new Date();
                exDate = exDate.getDate()+30;
                this.dataDom.expires = exDate.toUTCString();//设定过期时间
            }catch(ex){
                return false;
            }
        }
        return true;
    },
    set:function(key,value){
        if(this.isLocalStorage){
            window.localStorage.setItem(key,value);
        }else{
            if(this.initDom()){
                this.dataDom.load(this.hname);
                this.dataDom.setAttribute(key,value);
                this.dataDom.save(this.hname)
            }
        }
    },
    get:function(key){
        if(this.isLocalStorage){
            return window.localStorage.getItem(key);
        }else{
            if(this.initDom()){
                this.dataDom.load(this.hname);
                return this.dataDom.getAttribute(key);
            }
        }
    },
    remove:function(key){
        if(this.isLocalStorage){
            localStorage.removeItem(key);
        }else{
            if(this.initDom()){
                this.dataDom.load(this.hname);
                this.dataDom.removeAttribute(key);
                this.dataDom.save(this.hname)
            }
        }
    }
}


document.write("<link rel=\"shortcut icon\" href=\"../www/img/app-logo.png\">");

if(window.location.href.indexOf("www/") > -1 || window.location.href.indexOf("client/") > -1){
    document.write("<script src=\"../www/js/Api.js\" charset=\"utf-8\"></script>");
}



