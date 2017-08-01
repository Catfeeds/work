$(function(){
    var lock = false;
    var HASH = getCookie('wx_hash');
    var loadInterval = setInterval(function() {
        if ($(".loading").attr("data-lock") == "1") {
            $(".loading").addClass("hide");
            $(".main").removeClass("hide");
            clearInterval(loadInterval);
        }
    }, 500);
    
    $('.J_submit').on('click', function() {
		if(lock){
			return;
		}
		
		var tel = $('.wechat-tel').val();
		var smscode = $('.wechat-msg').val();
        var pw1 = $(".wechat-pw").eq(0).val();
        var pw2 = $(".wechat-pw").eq(1).val();

		if(!tel || !/1[2345678]{1}\d{9}$/.test(tel)){
			showToast('请输入正确的手机号');		
			return;
		}

		if(!smscode){
			showToast('请输入验证码');
			return;
		}

        if(!pw1 || pw1.length < 6){
            showToast('请输入最少6位密码');
            return;
        }

        if(!pw1){
            showToast('请输入密码');
            return;
        }

        if(!pw2){
            showToast('请再次输入密码');
            return;
        }

        if(pw2 != pw1){
            showToast('两次密码不一致');
            return;
        }

        lock = true;
		$('.J_submit').html('提交中...');
        var postData = {
                phone: tel,
                code: smscode,
                pwd:pw1,
                re_pwd:pw2
            }
            postData = typeof objMerge == 'function' ? objMerge(postData) : postData
		$.ajax({
			url: '/user/bindPhone',
			type: 'POST',
			dataType: 'json',
			cache: false,
			data: postData,
			success: function(res){
                lock = false;
				if(res && res.code == 1){
					showToast('绑定成功');
                    setTimeout(function(){
                        var url = '/user/account'
                        // window.location.href='/user/account';
                        window.location.href= typeof urlAddParams == 'function' ? urlAddParams(url) : url;
                    },2000);
				} else{
					showToast(res.msg);
					$('.J_submit').html('确&nbsp;&nbsp;&nbsp;&nbsp;定');
				}
			},
			error: function(res){
                lock = false;
				showToast('网络出错，请稍后再试');
				$('.J_submit').html('绑定');
			}
		});
	});

    $(".wechat-form input").on("propertychange input", function() {
        
        var tel = $('.wechat-tel').val();
        var smscode = $('.wechat-msg').val();
        var pw1 = $(".wechat-pw").eq(0).val();
        var pw2 = $(".wechat-pw").eq(1).val();

        if (tel && smscode && pw1 && pw2) {
            $("#login-common").removeClass('disable');
        } else {
            $("#login-common").addClass("disable");
        }
    })

    $("#wechat-getCode").click(function() {

        var _this = $(this);
        if(_this.attr('disable')=='1') return;

        var tel = $(".wechat-tel").val();

        if(!tel || !/1[2345678]{1}\d{9}$/.test(tel)){ 
            showToast('请输入正确的手机号');     
            return;
        }
        var postData = {
                'phone':tel,
                'type':3,
                'hash':HASH
            }
            postData = typeof objMerge == 'function' ? objMerge(postData) : postData
        $.ajax({
            url: '/index/getPhoneCode',
            type: 'post',
            dataType: 'json',
            cache: false,
            data: postData,
            success: function(res){
                if(res.hash) HASH = res.hash;
                if(res.code == 1){
                    showToast('验证码已经发送，60秒内无需重复获取');
                    $("#wechat-getCode").addClass("countActive");
                    $(".wechat-form li:nth-of-type(1)").siblings("li").css("display","block");
                    $(".J_submit").removeClass("hide");
                    var cb = function () {
                        _this.removeClass('countActive')
                    }
                    setCodeTimer(_this,cb);
                }
                else{
                    showToast(res.msg);
                }
            },
            error: function(res){
                showToast('网络出错，请稍后再试');
            }
        });
    })

    $(".nm-cover span").click(function() {
        $(".nm-cover").addClass('hide');
    });
})
