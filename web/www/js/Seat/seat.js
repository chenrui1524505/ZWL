$(function(){
	var col=$("#seat").children().length;
	var colWidth=$("#seat").children().eq(0).width();
	var colHeight=$("#seat").children().eq(0).height();
	var wid=col*colWidth+(col/3)*15;
	$("#seat").width(wid);
	var thumb=$("#seat").children().clone().appendTo("#thumb");
	var viewBl=$(".seat-content").height()/$(".seat-content").width();
	var thumbBl=$(".seat-content").height()/$(".seat-wrap").height();
	var view=$('<div class="seat-view" id="viewHandle"></div>').appendTo("#thumb");
	view.height($("#thumb").children().eq(0).height()*thumbBl)
	.width(view.height()*viewBl)
	touch.on('#seat', 'touchstart', function(ev){
		/*ev.preventDefault();*/
	});
	var target = document.getElementById("seat");
	var dx = g.dx || 0;
	var dy = g.dy || 0;
	var initialScale = 1;
	var currentScale=1;
	var total=$('#seat').find(".seat_yes").length;
	var selected=$('#seat').find(".selected").length;
	$('#total').html(total)
	$('#selected').html(total-selected)
	var seat_head = $(".seat-head .t-r").eq(0);
	var seat_head_width = seat_head.width();

	var _app = $(".app");
	var _app_height = _app.height();
	var _app_width = _app.width();

	var ceil_width = Math.ceil((seat_head_width / _app_width) * 100);

	if(ceil_width > 65){
		var seat_ul = $(".seat-thumb ul").height();
		var seat_thumb = $(".seat-thumb").eq(0);
		seat_thumb.height((seat_ul / 4 / 2) + seat_ul);
		var seat_width = _app_width * 0.5;
		seat_thumb.width(seat_width);

		$(".seat-thumb ul li").width($(".seat-thumb ul").length / seat_width);


	}


	//略缩图设置大小
	var seat_head_height = $(".seat-head").eq(0).height();

	if(seat_head_height > (_app_height * 0.15)){
		var seat_thumb = $(".seat-thumb").eq(0);
		seat_thumb.height(_app_height * 0.14);
		var ul_height = $(".seat-thumb ul").height();
		$(".seat-thumb ul li").height((_app_height * 0.14) / (ul_height / 4 + (ul_height / 4 / 2)));
	}

	//略缩图 红框位置
	fn_viewHandle();

	function fn_viewHandle(ev) {
		var bean = {
			x : 0,
			y : 0
		}
		ev = ev ? ev : bean;
		dx = dx || 0;
		dy = dy || 0;
		/*console.log("当前x值为:" + dx + ", 当前y值为:" + dy +".");*/
		var offx = dx + ev.x + "px";
		var offy = dy + ev.y + "px";
		target.style.webkitTransform = "translate3d(" + offx + "," + offy + ",0) scale("+currentScale+")";
		var moveXbli=parseInt(offx)/wid;
		var moveYbli=parseInt(offy)/colHeight;

		var thumbWid=$("#thumb").width();
		var thumbHt=$("#thumb").height();


		var viewHandle=document.getElementById("viewHandle");
		view.css({left:-moveXbli*thumbWid,top:-moveYbli*thumbHt})
	}



	touch.on('#seat', 'drag', function(ev){
		fn_viewHandle(ev);

	});
	touch.on('#seat', 'dragend', function(ev){
		dx += ev.x;
		dy += ev.y;
		console.log(dx,dy)
	});
	touch.on('#seat', 'pinchend', function(ev){
		currentScale = ev.scale - 1;
		currentScale = initialScale + currentScale;
		/*document.getElementById("title").innerHTML=currentScale;*/
		currentScale = currentScale > 2 ? 2 : currentScale;
		currentScale = currentScale < 0.8 ? 0.8 : currentScale;
		target.style.webkitTransform = 'scale(' + currentScale + ')';
		var view=document.getElementById("viewHandle");
		view.style.webkitTransform="scale("+(1/currentScale )+")"
		initialScale = currentScale;
	});
	$('#seat').find('.seat_yes').click(function(){
		if($(this).hasClass('selected')){
			alert('此时间段不可选');
		}else if($(this).hasClass('unseat')) {
			alert('过道');
		}else if($(this).hasClass('unOptional')) {
			alert('不可预约');
		}else if($(this).hasClass('random_css')){

		}else{
			$(".active").removeClass("active");
			$(this).addClass('active');
			$("#seatId").html($(this).attr("data"));
			$("#SeatDataID").val($(this).attr("dataID"));
		}
	})

	/*var href = window.location.href;

	if(href.indexOf("checkSeat") > -1){
		var seat1 = g.seatNum.split("-")[1];

		var num = Math.ceil(seat1 / 4) * 2;

		var seat2 = parseInt(seat1) + parseInt(num);

		var wd = $("#seat li").width();
		var countNum = parseInt(0-(seat2 * wd - 100));
		var offx = 0;
		var offy = 0;
		var currentScale = 1;

		var _tran = "translate3d(" + offx + "," + offy + ",0) scale("+currentScale+")";

		g.dx = countNum;

		$("#seat").css("transform",_tran);

	}*/

	var linull = $("#thumb .null");
	for(var l = 0 ; l < linull.length ; l++){
		$(linull[l]).css("border","0");
	}

})
