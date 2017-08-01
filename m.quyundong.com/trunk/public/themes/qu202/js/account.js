var unBindLock = false;
$(function(){
    var loadInterval = setInterval(function() {
        if ($(".loading").attr("data-lock") == "1") {
            $(".loading").addClass("hide").css("background-color","transparent");
            $(".main").removeClass("hide");
            clearInterval(loadInterval);
        }
    }, 500);
    
    $("#confirm .cancel div").click(function(){
    	var data = $('#confirm').attr('data').split(':');
    	$('#confirm').addClass('hide');
    	if($(this).attr('data')=='0'){
    		
    	}else{
    		switch(data[0]){
    			case 'url':
            var url =  data[1];
            // window.location.href = data[1];
    				window.location.href = typeof urlAddParams == 'function' ? urlAddParams(url) : url;
    			break;
    			case 'callback':
    				callbacks[data[1]]();
    			break;
    		}
    		
    	}
    });
    
    $('#bind_wx').click(function(){
    	
    });

    var logOutLock = false;
    $("#logOut").click(function(){
    	
    	if(logOutLock) return;
    	$("#loading").removeClass('hide');
		  logOutLock = true;

    	
      // gssdk退出登录
      if(window.Gs && window.Gs.logout && window.Gs.canUse){
        window.Gs.logout(function(data){
          $("#loading").addClass('hide');
          logOutLock = false;

          var url ='/';
        location.href=typeof urlAddParams == 'function' ? urlAddParams(url) : url;
          
        })
      }else{
        var url ='/user/logOut';
        location.href=typeof urlAddParams == 'function' ? urlAddParams(url) : url;
      }

    	setTimeout(function(){
    		$("#loading").addClass('hide');
    		logOutLock = false;
    	},2000)
    })
})

var callbacks = {
	'unBindWx':function(){

		 if(unBindLock)  return;
		 $("#loading").removeClass('hide');
		 unBindLock = true;
     var postData = {
               'op':1
           }
         postData = typeof objMerge == 'function' ? objMerge(postData) : postData
		 $.ajax({
	         url: '/user/unionWxRemove',
	         type: 'POST',
	         dataType: 'json',
	         cache: false,
	         data: postData,
	         success: function(res) {
    			 $("#loading").addClass('hide');
		 		 unBindLock = false;

	             if(res.code==1){
	            	 showToast('解绑成功', function(){
	            		 window.location.reload();
	            	 });
	             }else{
	            	 showToast(res.msg);
	             }
	         },
	         error: function(res) {
    			 $("#loading").addClass('hide');
		 		 unBindLock = false;
				 showToast('系统繁忙');
	         }
	     })
	}
}

function bindWx(){
	var wx = $('#bind_wx').attr('data');
	var status = $('#bind_wx').attr('status');
	if(wx){
		$('#confirm .msg').html('您已经绑定了微信，确定要解除绑定吗?');
		$('#confirm').removeClass('hide');
		$('#confirm').attr('data', 'callback:unBindWx');
	}else{
		if (status == 0) {
			showToast('请在微信客户端使用');
			return;
		}
    var url = '/user/bindWx'
    // window.location.href = '/user/bindWx';
		window.location.href = typeof urlAddParams == 'function' ? urlAddParams(url) : url;
	}
}


function bindPhone(){
	var mobile = $('#mobile').attr('data');
	if(mobile){
		$('#confirm .msg').html('您已经绑定了手机号，确定要绑定新的手机号?');
		$('#confirm').removeClass('hide');
		$('#confirm').attr('data', 'url:/user/bindPhone');
	}else{
    var url = '/user/bindPhone';
    // window.location.href = '/user/bindPhone';
		window.location.href = typeof urlAddParams == 'function' ? urlAddParams(url) : url;
	}
}

$(function () {
	var status = $('#bindwx').text().trim();
	if (status) {
		showToast(status);
		$("#bindwx").remove();
		setTimeout(function () {
      var url = '/user/account';
      // location.href = '/user/account';
			location.href = typeof urlAddParams == 'function' ? urlAddParams(url) : url;
		}, 2000);
		return false;
	}
});
//显示toast
function showToast(errMsg,fn) {
    $(".toast .toast-msg").text(errMsg);
    $(".toast").removeClass('hide');
    setTimeout(function(){
        $(".toast").animate({"opacity":0},300,function(){
            $(this).css("opacity",1).addClass("hide");
            if(fn){
                fn();
            }
        })
	}, 2000);
}