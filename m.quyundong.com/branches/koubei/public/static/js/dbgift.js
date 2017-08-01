	
		var tipText = [
			'领取成功',
			'老朋友，把优惠留给新朋友吧～',
			'验证码错误!请重新输入',
			'表伤心，明天再来抢吗!',
			'请输入正确的手机号码！',
			'验证码已经发送，<br/>请注意查收！'
		]

		var lock = 0;
		var myURL = window.location.href.split('#')[0];
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

		var yourPhoneNumber = document.getElementById('yourPhoneNumber');

		//手机号码输入框聚焦逻辑
		yourPhoneNumber.onfocus = function () {
			yourPhoneNumber.value = "";
			yourPhoneNumber.style.color = "#000";
		}
		//手机号码输入框失焦逻辑
		yourPhoneNumber.onblur = function () {
			if(yourPhoneNumber.value === ""){
				yourPhoneNumber.value = "请输入您的手机号码";
				yourPhoneNumber.style.color = "#cdcdcd";
			}
			console.log(yourPhoneNumber.value);
			//数字，11位，首数字为13||14||15||17||18
			if (yourPhoneNumber.value === "请输入您的手机号码"){
				$(".phoneNumber").html('&nbsp;');
				lock = 0;
			}else if(!isNaN(yourPhoneNumber.value-"0") == true && yourPhoneNumber.value.length == 11 && /13|14|15|17|18/i.test(yourPhoneNumber.value.substring(0,2)) ){
				lock = 1;
				$(".phoneNumber").html('&nbsp;');
			}else{
				lock = 0;
				$(".phoneNumber").html(tipText[4]);
			}
		}

		var checkMassage = document.getElementById('checkMassage');
		//验证码输入框聚焦逻辑
		checkMassage.onfocus = function () {
			checkMassage.value = "";
			checkMassage.style.color = "#000";
		}
		//验证码输入框失焦逻辑
		checkMassage.onblur = function () {
			if(checkMassage.value === ""){
				checkMassage.value = "请输入验证码";
				checkMassage.style.color = "#cdcdcd";
			}
		}

		
		 var httpheader = '../';
		// var httpheader = 'http://m.qydw.net/';
		// var httpheader = 'http://m.quyundong.com/';
		var catchCheckNumber = document.getElementById('catchCheckNumber');
		var catchCheckNumberlock = 1 ;
		var catchCheckNumberInner = document.getElementById('catchCheckNumberInner');

		var loading60 = 1;
		var timer60;
		var overtimers;

		//获取键的请求
		catchCheckNumber.onclick = function(){
			if(catchCheckNumberlock && lock){
				
				console.log("start");

				var xhr = new XMLHttpRequest();

				xhr.open('get', httpheader + 'uberapi/getsmscode?phone='+yourPhoneNumber.value + '&getime=' + newDate() );
				// xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
				xhr.onreadystatechange = function () {
				    if (xhr.readyState === 4 && xhr.status === 200) {
						var result = JSON.parse(xhr.response);
				        console.log(result);
				        if(result.code == 1){
				        	loading60 = 0;
				        	overtimers = 60;
				        	catchCheckNumberInner.style.backgroundColor = "#cdcdcd";
				        	catchCheckNumberInner.innerHTML = "重新获取(" + overtimers + "s)";
				        	catchCheckNumberlock = 0 ;

				        	clearInterval(timer60);

				        	timer60 = setInterval(function(){
				        		overtimers--;
				        		catchCheckNumberInner.innerHTML = "重新获取(" + overtimers + "s)";
				        	},1000);

				        	setTimeout(function(){
				        		clearInterval(timer60);
				        		loading60 = 1 ;
				        		catchCheckNumberlock = 1;
				        		catchCheckNumberInner.style.backgroundColor = "#76b0f8";
				        		catchCheckNumberInner.innerHTML = "重新获取";
				        	},60000);
				        	$(".cover").css("display","block");
							$(".tipText").html(tipText[5]);	
				        }else if(result.code == 3001){
				        	$(".cover").css("display","block");
							$(".tipText").html(tipText[1]);
				        }else{
				        	$(".cover").css("display","block");
							$(".tipText").html(result.msg);
				        }
				     }else if(xhr.status >= 400){
				     	$(".cover").css("display","block").find(".tipText").html(xhr.status + "服务器繁忙，请稍候再试");
				     }
				};
				
				xhr.send();

			}else if(loading60 == 1){
				$(".cover").css("display","block").find(".tipText").html(tipText[4]);
			}
		}

		//确认键的请求
		var submitBtn = document.getElementById('submitBtn');

		submitBtn.onclick = function(){
			if(!isNaN(checkMassage.value-"0") == true && lock){
				var xhr = new XMLHttpRequest();
				xhr.open('get', httpheader + 'uberapi/getuberactivecode?phone='+ yourPhoneNumber.value +'&sms_code=' + checkMassage.value);
				// xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
				xhr.onreadystatechange = function () {
				    if (xhr.readyState === 4 && xhr.status === 200) {
						var result = JSON.parse(xhr.response);
				        console.log(result);
				        if(result.code == 1){
				        	$(".cover").css("display","block").find(".tipText").html(tipText[0]);
				        }else if(result.code == 3002 ){
				        	$(".cover").css("display","block").find(".tipText").html(tipText[3]);
				        }else{
				        	$(".cover").css("display","block").find(".tipText").html(result.msg);
				        }
				     }else if(xhr.status >= 400 ){
				     	$(".cover").css("display","block").find(".tipText").html(xhr.status + "服务器繁忙，请稍候再试");
				     }
				};
				
				xhr.send();
			}else{
				$(".cover").css("display","block").find(".tipText").html(tipText[2]);
			}
		}
		//响应式设置
		$(document).ready(function(){
			var $windowWidth = $(window).width();
			setTimeout(function(){
				$windowWidth = $(window).width();
				if($windowWidth > 640){
					$windowWidth = 640;
				}
				$("html").css("font-size",(100/320) * $windowWidth + "px");
			},100);
			

			$(window).resize(function(){
				$windowWidth = $(window).width();
				if($windowWidth > 640){
					$windowWidth = 640;
				}
				$("html").css("font-size",(100/320) * $windowWidth + "px");
			});
		});

		$(".tip").click(function(){

			$(".cover").css("display","none");
		});

		//微信config ok后启用
		wx.ready(function(){

		    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
		    wx.onMenuShareTimeline({
		        title: '端午大放价，新用户专享', // 分享标题
		        link: myURL, // 分享链接
		        imgUrl: 'http://m.quyundong.com/static/images/db/dbgiftshare.jpg', // 分享图标
		        success: function () { 
		            // 用户确认分享后执行的回调函数
		            // alert("success");
		            console.log("success");
		            return true;
		        },
		        cancel: function () { 
		            // 用户取消分享后执行的回调函数
		            // alert("cancel");
		            return true;
		        }
		    });

		    wx.onMenuShareAppMessage({
		        title: '端午大放价，新用户专享', // 分享标题
		        desc: '吃放粽子趣运动，20元订场优惠券大放送，速领!', // 分享描述
		        link: myURL, // 分享链接
		        imgUrl: 'http://m.quyundong.com/static/images/db/dbgiftshare.jpg', // 分享图标
		        type: 'link', // 分享类型,music、video或link，不填默认为link
		        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
		        success: function () { 
		            // 用户确认分享后执行的回调函数
		            // alert("success");
		 	        console.log("success");
		 	        return true;
		        },
		        cancel: function () { 
		            // 用户取消分享后执行的回调函数
		            // alert("cancel");
		            return true;
		        }
		    });

		});
		// 微信config
		function wxConfigToken (url){
			var xhr = new XMLHttpRequest();
			var url = url;
			console.log(url);
			xhr.open('get', 'http://m.quyundong.com/activity/GetWeixinToken/?url='+url
				);
		   			
					// xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
					xhr.onreadystatechange = function () {
					    if (xhr.readyState === 4 && xhr.status === 200) {
					        result = JSON.parse(xhr.response);
					        console.log(3,result);
					        console.log(result.data.timestamp - 0 ,result.data.noncestr,result.data.sha_sign,result.data.jsapi_ticket);
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