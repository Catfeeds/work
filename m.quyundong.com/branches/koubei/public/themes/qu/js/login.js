$(function(){

	var lock = false;

	var touchType = ('createTouch' in document) ? 'tap' : 'click';
	
	$('.J_submit').on(touchType, function() {
		
		var tel = $('.J_tel').val();
		var pwd = $('.J_pwd').val();

		if(!tel || !/1[2345678]{1}\d{9}$/.test(tel)){
			showToast('请输入正确的手机号');		
			return;
		}

		if(!pwd || pwd.length < 6){
			showToast('请输入最少6位密码');
			return;
		}

		if(lock) return;

		lock = true;
		$("#loading").removeClass('hide');

		$('.J_submit').html('<div>登录中...</div>');
    var postData = {
        username: tel,
        password: pwd
      }
        postData = typeof objMerge == 'function' ? objMerge(postData) : postData
		$.ajax({
			url: '/login/dologin',
			type: 'post',
			dataType: 'json',
			cache: false,
			data: postData,
			success: function(res){
				if(res && res.code == 1){
					$('.J_submit').html('<div>普通登录</div>');
					location.href = res.data.url;
				} else{
					lock = false;
					$("#loading").addClass('hide');
					showToast(res.msg);
					$('.J_submit').html('<div>普通登录</div>');
				}
			},
			error: function(res){
				lock = false;
				$("#loading").addClass('hide');
				$('.J_submit').html('<div>普通登录</div>');
				showToast('网络出错，请稍后再试');
			}
		});
	});

	$('.J_back').on(touchType, function(){
		window.history.go(-1);
	});
	
	var loadInterval = setInterval(function() {
        if ($(".loading").attr("data-lock") == "1") {
            $(".loading").addClass("hide").css("background-color","transparent");
            $(".main").removeClass("hide");
            clearInterval(loadInterval);
        }
    }, 500);
	
	$(".login-header input").on("propertychange input", checkBtn);
    
    $(".login-header").on("focus","input",function(){
   		$(".main-protocol").css("display","none");
    })

    $(".login-header").on("blur","input",function(){
   		$(".main-protocol").css("display","block");
    })
    
})

function checkBtn(){
	var tel = $('.login-header input.J_tel').val().trim();
    var pwd = $('.login-header input.J_pwd').val().trim();

    if(tel && pwd){
		$("#login-common").removeClass('disable');
    }else{
        $("#login-common").addClass("disable");
    }
}
