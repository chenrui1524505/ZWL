$(function(){
	var _this = null;
	$(".pickdate").click(function(){

		_this = $(this);
		$(".pick-time h2").text(_this.attr("name"));
		$(".hour").find("span").click(function(){
			$(this).addClass("active").siblings().removeClass("active");
			$("#hour").html($(this).html())
		})
		$(".minute").children().click(function(){
			$(this).addClass("active").siblings().removeClass("active");
			$("#min").html($(this).html())
		})

	})
	$("#confirm").click(function(){
		var hour = $("#hour").text().toString();
		hour = hour.length < 2 ? "0" +hour :hour
		var _url = window.location.href;
		if(_url.indexOf("sweepCode") > -1 || _url.indexOf("contract") > -1){
			var _this_text = _this.text();
			_this.text(_this_text.substring(0,11)+" "+hour +":"+$("#min").text()+":00");
		}else{
			_this.text(hour+":"+$("#min").text()+":00");
		}
		_this = null;
	})

	$(".dateChange").click(function(){
		var _hour = $(".hour span");
		for(var h = 0 ; h < _hour.length ; h++){
			_hour.eq(h).removeClass("active");
		}

		var _hour = $(".minute span");
		for(var h = 0 ; h < _hour.length ; h++){
			_hour.eq(h).removeClass("active");
		}

		var _date = g.Trim($(this).text(),"g");

		if(_date){
			var _dateTime;
			if( _date.indexOf("-") > -1){
				_dateTime = _date.substring(10,16);
			}else{
				_dateTime = _date;
			}

			if(_dateTime.indexOf(":") > -1){
				var _dateTimes = _dateTime.split(":");
				var _m = _dateTimes[1];
				console.log(_m % 10);

				$("#hour").text(_dateTimes[0]);
				$("#min").text(_dateTimes[1]);

				var _hour = $(".hour span");
				if(_hour.length > 0){
					for(var h = 0 ; h < _hour.length ; h++){
						var _hour_This = _hour.eq(h);
						if(_hour_This.text() == _dateTimes[0]){
							_hour_This.addClass("active");
						}
					}
				}

				var _minute = $(".minute span");
				if(_minute.length > 0){
					for(var m = 0 ; m < _minute.length ; m++){
						var _minute_This = _minute.eq(m);
						if(_minute_This.text() == _dateTimes[1]){
							_minute_This.addClass("active");
						}
					}
				}

			}
		}

		window.location = "#open-modal1";
	});
})