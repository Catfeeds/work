var $mycardis = $(".card .title i");
var $note = $(".note");
var $upload = $(".upload");
var $wxshare = $(".wxshare");
var $close = $(".wxshare .close");
var $wxShareBtn = $("#wxShareBtn");

var inputNumber = document.getElementById('inputNumber');
var inputName = document.getElementById('inputName');
var lock = 0;
var submitlock = 0;
var sp = 1;

var photoFile = document.getElementById('photoFile');
var fromData = {};

if(!isWeixin() && !isUc() && !isMqq() && isAndroid()){
	submitlock = 1;
	sp = 0;
	fromData.imagebase64 = "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";
	fromData.imagebase64Len = "6124";	
}

if(isWeixin()){
	$wxShareBtn.attr({"href":"javascript:;"});
	$wxShareBtn.click(function(){
		$wxshare.removeClass("hide");
	});
}

$close.click(function(){
	$wxshare.addClass("hide");
});

var httpHead = "../";
var shareUrl = "http://m.quyundong.com/static/yuerecruit.html";

	$mycardis.each(function () {
		$(this).click(function(){
			if($(this)[0].className.indexOf("cur") != -1){
				$(this).removeClass("cur").parent().removeClass("cur").parent().find(".content").removeClass("cur");
			}else{
				$(this).addClass("cur").parent().addClass("cur").parent().find(".content").addClass("cur");
			}
		});
	});

	$("#closeCover").click(function(){
		$(".cover").addClass("hide");
	});

	inputNumber.onblur = function () {
			
		//数字，11位，首数字为13||14||15||17||18
		if(!isNaN(inputNumber.value-"0") == true && inputNumber.value.length == 11 && /13|14|15|17|18/i.test(inputNumber.value.substring(0,2)) ){
			(function(){
				console.log("ajax")
				var xhr = new XMLHttpRequest();
				xhr.open('get', httpHead + 'coach/CheckPhone?phone=' + inputNumber.value);
				// xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
				xhr.onreadystatechange = function () {
				    if(xhr.readyState == 4 ){
						if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
							//成功接收
							var result = JSON.parse(xhr.response);
					        console.log(result);
					        if(result.code == 1){
					        	lock = 1;
					        	$note.addClass("hide");
					        }else{
					        	lock = 0;
					        	$note.removeClass("hide").html(result.msg);
					        }
						}else{
							//接收失败
							alert("抱歉，网络异常");
						}
					};
				}
				xhr.send();
			})();
		}else if(inputNumber.value == ""){
			lock = 0;
			$note.addClass("hide");
		}else{
			lock = 0;
			$note.removeClass("hide").html("请输入正确的手机号码");
		}
		// console.log(inputNumber.value,lock);
	}

	//图片上传
	
	photoFile.onchange = function(){
		fromData.imagebase64 = null;
	    if(checkImg(this.files[0])){// 也可以传入图片路径：lrz('../demo.jpg', ...
            lrz(this.files[0], {width: 400}, function (results) {
                // 你需要的数据都在这里，可以以字符串的形式传送base64给服务端转存为图片。
                sp = 1;
                submitlock = 1;
                // fixedpagesubmit.style.backgroundColor = "#74affb";
				// fixedpagesubmit.innerHTML = "提交";
                
                fromData.imagebase64 = results.base64;

                fromData.imagebase64Len = results.base64Len;

                console.log(fromData);

                var img = new Image();
               	
               	var size = fromData.imagebase64.length * 0.8;

                size = (size / 1024).toFixed(2) + 'KB';

                if(size === 'NaNKB') size = '';

                img.src = typeof fromData.imagebase64 === 'string' ? fromData.imagebase64 : URL.createObjectURL(fromData.imagebase64);

                $(".avatar").css("background-image","url("+ img.src +")");
                $(".photoSize").html(size);
            });}
		};
	
	//完善表单

	submit.onclick = function(){
		console.log(isSexIn());
		if (lock === 1 && inputNumber.value != "" && isSexIn() && submitlock === 1) {
			$upload.removeClass("hide");
			fromData.phone = inputNumber.value;
			fromData.name = inputName.value;
			
			setTimeout(function () {
			
			    // 发送到后端
			    if(sp){
			    	fromData.imagebase64Len = (parseInt(fromData.imagebase64Len)-22)+"";
			    	fromData.imagebase64 = fromData.imagebase64.substring(22);
			    }
			    
			  var postData = JSON.stringify(fromData);
			  console.log(postData);
			  
			    $.ajax({
					url: httpHead + 'Coach/SubmitInfo/',
					type: 'POST',
					dataType: 'JSON',
					cache: false,
					data: {fromData:postData},
					success: function(res){
						var result = JSON.parse(res);
						console.log(result);
	                   if(result.code == 1){
	                   		$upload.addClass("hide");
	                   		$(".share").removeClass("hide");
	                   		$(".main").addClass("hide");
	                   }else{
	                   		$upload.addClass("hide");
	                   		$(".cover").removeClass("hide");
	        				$("#alertNote").html(result.msg);
	                   }
					},
					error:function(res){
						$upload.addClass("hide");
						$(".cover").removeClass("hide");
	        			$("#alertNote").html("上传错误");
					}
				});
			}, 100);

		}else{
			$(".cover").removeClass("hide");
	        $("#alertNote").html("请完善信息");
		}
	}
	function isSexIn(){
		var $sex = $(".sex input");
		for(var i = 0 ;i < $sex.length ;i++){
			console.log($sex[i].checked);
			if($sex[i].checked){fromData.sex = $sex[i].value;
				return true;
			}
		}
		return false;
	}
	// 大小和图片类型判定
	function checkImg(file){
		try{
			if(file.type){
				var t = file.type;
			}else{
				var t = "image/png";
			}
		    var s = file.size;
		    if( t === "image/png" || t === "image/jpeg" ){
		        if (s < 4*1024*1024){

		            return true;
		        }else{
		        	$(".cover").removeClass("hide");
		        	$("#alertNote").html("请上传小于4M的JPG或者PNG文件");
		            return false;
		        }
		    }else{ 
		    	$(".cover").removeClass("hide");
		        $("#alertNote").html("请上传小于4M的JPG或者PNG文件");
		        return false;
		    }
		}catch(e){
			
			return true;
		}
	}

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

	//微信config ok后启用
	wx.ready(function(){

	    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
	    wx.onMenuShareTimeline({
	        title: '趣运动陪练招募中，你的卡路里会赚钱', // 分享标题
	        link: shareUrl, // 分享链接
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
	        link: shareUrl, // 分享链接
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
		console.log(url);
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
	function newDate (){
		return parseInt(new Date().getTime()/1000)
	}