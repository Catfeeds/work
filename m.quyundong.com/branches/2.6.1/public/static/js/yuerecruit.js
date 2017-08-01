(function (){
	var $main = $("#main"),
		$pages = $(".page"),
		$myspans = $(".bar span"),
		$btn = $(".btn"),
		$coach = $(".coach"),
		$begin = $(".begin"),
		$pagecover = $(".pagecover"),
		starX = null,
		starXbegin = null,
		dX = null,
		dXbegin = null,
		delta = null,
		deltabegin = null,
		starXtrue = null,
		starXbegintrue = null,
		starTime = null,
		endTime = null,
		animateTime = 300,
		animateTimeEdge = 1000,
		page = 1,
		httpHead = "../";
	var $beginurl = $(".beginurl");
	var myURL = window.location.href.split('#')[0];
	if(isAndroidwebview() && !isiPhone()){
		$('#gosport').attr({"href":"gosport://upload"});
	}
	$beginurl.click(function(){
		$(".begin").addClass("hide");
		$("#main").removeClass("hide");
		$(".bar").removeClass("hide");
		$(".btn").removeClass("hide");
		// $(document)[0].addEventListener('touchstart', function(event) {event.preventDefault();});
	$(window)[0].addEventListener('touchmove', function(event) {event.preventDefault();});
	// $(document)[0].addEventListener('touchend', function(event) {event.preventDefault();});
	});

	$main.css("width",$pages.length * 100 + "%");
	$begin.css("width","100%");

	// touchstart
	$begin[0].addEventListener('touchstart', function(event) {
		var finger = event.touches[0];	//获得手指
		console.log('touchstartA',finger.pageX,event);
		event.preventDefault();
		
		starXbegin = finger.pageX;
		starXtruebegin = finger.pageX;
	});
	
	// touchmove
	$begin[0].addEventListener('touchmove', function(event) {
		var finger = event.touches[0];	//获得手指
		// console.log('touchmove',finger.pageX);
		event.preventDefault();
		if(finger.pageX < starXtruebegin){
			dXbegin = dXbegin + (finger.pageX - starXbegin) / 2;
			console.log(dXbegin)
			if(beginIsNotAnimate()){
				$begin.css({"-webkit-transform":"translate3d("+dXbegin+"px,0,0)","transform":"translate3d("+dXbegin+"px,0,0)"});
			}
			starXbegin = finger.pageX;
		}
	});


	// touchend
	$begin[0].addEventListener('touchend', function(event) {
		var finger = event.touches[0];	//获得手指
		console.log(event);
		console.log(starXtruebegin - starXbegin);

		deltabegin = starXtruebegin - starXbegin ;
		// console.log("delta=",delta,"starXtrue=",starXtrue,"starX=",starX,"dX=",dX);
		if(beginIsNotAnimate()){
			if(dXbegin < 0){
				console.log(dXbegin)
	    		$begin.animate({"transform":"translate3d("+ (-$begin.width()) +"px,0,0)","-webkit-transform":"translate3d("+ (-$begin.width()) +"px,0,0)"},200,"ease",function(){
	    			$(".begin").addClass("hide");
	    			$(".pagecover").addClass("hide");
					$("#main").removeClass("hide");
					$(".bar").removeClass("hide");
					$(".btn").removeClass("hide");
					// $(document)[0].addEventListener('touchstart', function(event) {event.preventDefault();});
				$(window)[0].addEventListener('touchmove', function(event) {event.preventDefault();});
				// $(document)[0].addEventListener('touchend', function(event) {event.preventDefault();});
	    		});
	 
	    		dXbegin = 0;
	    	}else if(dXbegin > 0){
	    		console.log(dXbegin)
	    		$begin.animate({"transform":"translate3d("+ (-$begin.width()) +"px,0,0)","-webkit-transform":"translate3d("+ (-$begin.width()) +"px,0,0)"},200,"ease",function(){
	    			$(".begin").addClass("hide");
	    			$(".pagecover").addClass("hide");
					$("#main").removeClass("hide");
					$(".bar").removeClass("hide");
					$(".btn").removeClass("hide");
					// $(document)[0].addEventListener('touchstart', function(event) {event.preventDefault();});
				$(window)[0].addEventListener('touchmove', function(event) {event.preventDefault();});
				// $(document)[0].addEventListener('touchend', function(event) {event.preventDefault();});
	    		});
	 
	    		dXbegin = 0;
	    	}
		}
		starXbegin = null;
		starXtruebegin = null;
	});



	// touchstart
	$main[0].addEventListener('touchstart', function(event) {
		var finger = event.touches[0];	//获得手指
		console.log('touchstartB',finger.pageX,event);
		event.preventDefault();
		if(mainIsNotAnimate()){
			starX = finger.pageX;
			starXtrue = finger.pageX;
			starTime = event.timeStamp;
		}
	});
	
	// touchmove
	$main[0].addEventListener('touchmove', function(event) {
		var finger = event.touches[0];	//获得手指
		// console.log('touchmove',finger.pageX);
		event.preventDefault();
		if(mainIsNotAnimate()){
			if(dX <= 0 && dX >= ($pages.eq(0).width() - $main.width())){
	    		dX = dX + (finger.pageX - starX) * 1;
	    	}else{
	    		// dX = dX + (finger.pageX - starX) / 4;
	    		dX = dX;
	    	}
		}
		starX = finger.pageX;
		// console.log("dX=",dX);
		$main.css({"-webkit-transform":"translate3d("+dX+"px,0,0)","transform":"translate3d("+dX+"px,0,0)"});
		$btn.css({"-webkit-transform":"translate3d("+dX+"px,0,0)","transform":"translate3d("+dX+"px,0,0)"});

	});


	// touchend
	$main[0].addEventListener('touchend', function(event) {
		var finger = event.touches[0];	//获得手指
		endTime = event.timeStamp;
		// console.log('touchend',event);
		event.preventDefault();
		delta = starXtrue - starX ;
		// console.log("delta=",delta,"starXtrue=",starXtrue,"starX=",starX,"dX=",dX);
		if(mainIsNotAnimate()){
			if(dX > 0){
	    		$main.animate({"transform":"translate3d(0px,0,0)","-webkit-transform":"translate3d(0px,0,0)"},animateTimeEdge,"ease");
	    		$btn.animate({"transform":"translate3d(0px,0,0)","-webkit-transform":"translate3d(0px,0,0)"},animateTimeEdge,"ease");
	    		dX = 0;
	    	}else if(dX <= -$main.width() + $pages.eq(0).width() ){
	    		console.log("move",$pages.eq(0).width() - $main.width());
	    		$main.animate({"transform":"translate3d(" + ($pages.eq(0).width() - $main.width()) + "px,0,0)","-webkit-transform":"translate3d(" + ($pages.eq(0).width() - $main.width()) + "px,0,0)"},animateTimeEdge,"ease");
	    		$btn.animate({"transform":"translate3d(" + ($pages.eq(0).width() - $main.width()) + "px,0,0)","-webkit-transform":"translate3d(" + ($pages.eq(0).width() - $main.width()) + "px,0,0)"},animateTimeEdge,"ease");
	    		dX = -$main.width() + $pages.eq(0).width();
	    	}else if(delta > 0){
	    		page = Math.abs(Math.ceil(dX / $pages.eq(0).width())) + 1;
	    		moveAll();
	    	}else if(delta < 0){
	    		page = Math.abs(Math.ceil(dX / $pages.eq(0).width()));
	    		moveAll();
	    	}
		}
		// console.log('hello',$main.attr("style").indexOf("transition"));
	});
	
	// 小圆点击事件
    $myspans.each(function(){
    	$(this).click(function(){
    		page = $(this).index();
    		moveAll();
    	});
    });

    function moveAll(){
    	
		// console.log("page:",page);
		$main.animate({"transform":"translate3d(" + ( - $pages.eq(0).width()) * page + "px,0,0)","-webkit-transform":"translate3d(" + ( - $pages.eq(0).width()) * page + "px,0,0)"},animateTime,"ease");
		$btn.animate({"transform":"translate3d(" + ( - $pages.eq(0).width()) * page + "px,0,0)","-webkit-transform":"translate3d(" + ( - $pages.eq(0).width()) * page + "px,0,0)"},animateTime,"ease");
		dX = - $pages.eq(0).width() * page ;
		// console.log("dX=",dX,"page=",page);
		mySpansCur(page);
    }



	
	//微信config用
	var enURL = encodeURIComponent(myURL);
	//微信检查并开启微信config	
	if(isWeixin()){
		// alert("在用微信 "+ver);
		wxConfigToken (enURL);
	}else{
		// alert("不是微信 "+ver);
		// wxConfigToken (enURL);
	}

	//微信config ok后启用
	wx.ready(function(){

	    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
	    wx.onMenuShareTimeline({
	        title: '趣运动陪练招募中，你的卡路里会赚钱', // 分享标题
	        link: myURL, // 分享链接
	        imgUrl: 'http://m.quyundong.com/static/images/touxiang1.png', // 分享图标
	        success: function () { 
	            // 用户确认分享后执行的回调函数
	            // alert("success");
	            console.log("success");
	        },
	        cancel: function () { 
	            // 用户取消分享后执行的回调函数
	            // alert("cancel");
	        }
	    });

	    wx.onMenuShareAppMessage({
	        title: '趣运动陪练招募中，你的卡路里会赚钱', // 分享标题
	        desc: '成为趣运动约练的一员，同时享受卡路里燃烧和获得收入的快乐！', // 分享描述
	        link: myURL, // 分享链接
	        imgUrl: 'http://m.quyundong.com/static/images/touxiang1.png', // 分享图标
	        type: 'link', // 分享类型,music、video或link，不填默认为link
	        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
	        success: function () { 
	            // 用户确认分享后执行的回调函数
	            // alert("success");
	 	        console.log("success");
	        },
	        cancel: function () { 
	            // 用户取消分享后执行的回调函数
	            // alert("cancel");
	        }
	    });

	});
	// 微信config
	function wxConfigToken (url){
		var xhr = new XMLHttpRequest();
		var url = url;
		// console.log(url);
		xhr.open('get', httpHead + 'activity/GetWeixinToken/?url='+url
			);
	   			
				// xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
				xhr.onreadystatechange = function () {
				    if (xhr.readyState === 4 && xhr.status === 200) {
				        result = JSON.parse(xhr.response);
				        // console.log(3,result);
				        // console.log(result.data.timestamp - 0 ,result.data.noncestr,result.data.sha_sign,result.data.jsapi_ticket);
				        wx.config({
				        	    //debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				        	    appId: 'wxe37215df86f33faa', // 必填，公众号的唯一标识
				        	    timestamp: result.data.timestamp - 0 , // 必填，生成签名的时间戳
				        	    nonceStr: result.data.noncestr, // 必填，生成签名的随机串
				        	    signature: result.data.sha_sign,// 必填，签名，见附录1
				        	    jsApiList: [
				                'onMenuShareTimeline',
				                'onMenuShareAppMessage',
				                'onMenuShareQQ',
				                'onMenuShareWeibo',
				                'hideMenuItems',
				                'showMenuItems',
				                'hideAllNonBaseMenuItem',
				                'showAllNonBaseMenuItem',
				                'translateVoice',
				                'startRecord',
				                'stopRecord',
				                'onRecordEnd',
				                'playVoice',
				                'pauseVoice',
				                'stopVoice',
				                'uploadVoice',
				                'downloadVoice',
				                'chooseImage',
				                'previewImage',
				                'uploadImage',
				                'downloadImage',
				                'getNetworkType',
				                'openLocation',
				                'getLocation',
				                'hideOptionMenu',
				                'showOptionMenu',
				                'closeWindow',
				                'scanQRCode',
				                'chooseWXPay',
				                'openProductSpecificView',
				                'addCard',
				                'chooseCard',
				                'openCard'
				              ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				        	});
				        
				    }
				}
		xhr.send();
	}
	// iphone
	function isiPhone (){
		if(window.navigator.userAgent.indexOf("iPhone") === -1 ){
			return false;
		}else{return true}
	}
	//Androidwebview
	function isAndroidwebview (){
		if(window.location.href.indexOf("androidwebview") === -1 ){
			return false;
		}else{return true}
	}
	//MQQ判别
	function isMqq (){
		if(window.navigator.userAgent.indexOf("MQQBrowser") === -1 ){
			return false;
		}else{return true}
	}
	//Uc判别
	function isUc (){
		if(window.navigator.userAgent.indexOf("UCBrowser") === -1 ){
			return false;
		}else{return true}
	}
	//安卓判别
	function isAndroid (){
		if(window.navigator.userAgent.indexOf("Android") === -1 ){
			return false;
		}else{return true}
	}
	//微信判别
	function isWeixin (){
		if(window.navigator.userAgent.indexOf("MicroMessenger") === -1 ){
			return false;
		}else{return true}
	}

	//生成时间挫
	function newDate (){
		return parseInt(new Date().getTime()/1000)
	}
	function mySpansCur(p){
		$myspans.each(function(){
			$(this).removeClass("cur");
		});
		$myspans.eq(p).addClass("cur");
	}
	function mainIsNotAnimate (){
		if($main.attr("style").indexOf("transition") == -1){
			return true;
		}else{return false}
	}

	function beginIsNotAnimate (){
		if($begin.attr("style").indexOf("transition") == -1){
			return true;
		}else{return false}
	}	
})()
