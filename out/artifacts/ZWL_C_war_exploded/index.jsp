<%--
  Created by IntelliJ IDEA.
  User: Lix
  Date: 2016-7-1
  Time: 10:23 上午
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
  <meta charset="UTF-8">
  <title>欢迎页</title>
  <link rel="stylesheet" href="www/css/main.css" />
  <script src="www/js/jquery-1.7.1.min.js"></script>
  <script src="www/js/g.js" charset="utf-8"></script>
  <style>
    *{margin:0;}
    html,body{height:100%;}
    #wel,#wel .tempWrap,#wel .tempWrap ul,#wel .tempWrap ul li{height:100%;}
    #wel .tempWrap ul li{display:table !important;float:left;}
    #wel .tempWrap ul li span{display:table-cell;vertical-align:middle;text-align:center;position:relative;}
    #wel .tempWrap ul li span .btn{position:absolute;bottom:6rem;width:20rem;height:3.5rem;line-height:3.5rem;border:1px solid #fff;border-radius:1rem;font-size:1.4rem;text-align:center;display:block;left:50%;margin-left:-10rem;}
    #wel .tempWrap ul li span .btn:active{background:rgba(0,0,0,0.05);}
    .focus .bd li img{width:100%;}
    #wel .hd{bottom:2rem;position:absolute;left:0;z-index:10;}
    #wel .hd{width:100%;}
    #wel .hd ul{text-align: center;}
    #wel .hd ul li{background:#49B5FA;display:inline-block;width:0.4rem;height:0.4rem;font-size:0;border-radius:50%;margin:0 0.2rem;}
    #wel .hd ul li.on{background:#fff;}
    #wel .tempWrap ul li span b{display:block;text-align:center;font-size:3rem;color:#fff;padding-top:3rem;font-weight:normal;}
    .go{position:fixed;top:1rem;right:1rem;display:inline-block;padding:0 1rem;background:rgba(0,0,0,0.3);color:#fff;font-size:1.2rem;z-index:11;height:2rem;line-height:2rem;border-radius:0.3rem;}
    .go:active{background:rgba(0,0,0,0.2);}
    #wel .bd{height:100%;}
    .enter{position:fixed;right:2rem;bottom:4rem;}
    .enter img{width:6rem !important;height:6rem;}
  </style>
</head>
<body>
<div id="wel" class="focus">
  <div class="hd">
    <ul></ul>
  </div>
  <div class="bd">
    <ul>
      <li><span href="#"><img src="www/img/wel1.jpg"/></span></li>
      <li><span href="#"><img src="www/img/wel2.jpg"/></span></li>
      <li><span href="#"><img src="www/img/wel3.jpg"/><a class="enter" href="www/welcome.html"><img src="www/img/bnt.png"/></a></span></li>
    </ul>
  </div>
</div>
<script src="www/js/TouchSlide.1.1.js"></script>
<script>
  TouchSlide({
    slideCell:"#wel",
    titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
    mainCell:".bd ul",
    effect:"left",
    autoPlay:false,//自动播放
    autoPage:true, //自动分页
    switchLoad:"_src" //切换加载，真实图片路径为"_src"
  });
</script>
</body>
</html>