
$(function(){
    var lock = false;

    var loadInterval = setInterval(function() {
        if ($(".loading").attr("data-lock") == "1") {
            $(".loading").addClass("hide");
            $(".main").removeClass("hide");
            clearInterval(loadInterval);
        }
    }, 500);

    $(".wechat-form input").on("propertychange input", function() {

        var tel = $(".wechat-tel").val().trim();
        var phoneCode = $('.wechat-msg').val().trim();
        var pw1 = $(".wechat-pw").eq(0).val().trim();
        var pw2 = $(".wechat-pw").eq(1).val().trim();

        if(tel && phoneCode && pw1 && pw2){
            $("#login-common").removeClass('disable');
        }else{
            $("#login-common").addClass("disable");
        }
    })

    $("#wechat-getCode").click(function() {
        if($(this).attr('disable')=='1') return;
        var tel = $(".wechat-tel").val();
        if (!$(this).hasClass("countActive")) {
            if (tel && /1[2345678]{1}\d{9}$/.test(tel)) {
                $(".wechat-sprite").removeClass("hide");
                var callback = function(res) {
                    $(".wechat-sprite").addClass("hide");
                    if (res.code == 1) {
                        showToast('验证码已经发送，60秒内无需重复获取');
                        $(".wechat-form li:nth-of-type(1)").siblings("li").css("display","block");
                        $(".j_submit").removeClass("hide");
                        setCodeTimer($('#wechat-getCode'));
                    }else{
                    	var msg = res.msg ? res.msg : '系统繁忙稍后重试';
                    	showToast(msg);
                    }
                }
                var errback = errCallback;
                ajaxGetCode(callback, errback);
            } else {
                var errMsg = "请输入正确的手机号";
                showToast(errMsg);
            }
        }
    })
    
    $('.j_submit').click(function(){
        if(lock){
            return;
        }

    	var tel = $(".wechat-tel").val();
    	var phoneCode = $('.wechat-msg').val();
    	var pw1 = $(".wechat-pw").eq(0).val();
        var pw2 = $(".wechat-pw").eq(1).val();
        
    	if(!tel || !/1[2345678]{1}\d{9}$/.test(tel)){
            showToast('请输入正确的手机号');     
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

        if(!phoneCode){
            showToast('请输入验证码');
            return;
        }
        lock = true;
        var postData = {
                phone: tel,
                code:phoneCode,
                pwd:pw1,
                re_pwd:pw2
            }
            postData = typeof objMerge == 'function' ? objMerge(postData) : postData
		$.ajax({
	        url: '/login/reSetPassword',
	        type: 'POST',
	        dataType: 'json',
	        cache: false,
	        data: postData,
	        success: function(res) {
                lock = false;
	            if(res.code == 1){
	            	showToast('重置密码成功');
                    setTimeout(function(){
                        var url = '/login'
                        // window.location.href = '/login';
                        window.location.href = typeof urlAddParams == 'function' ? urlAddParams(url) : url;
                    },2000);
	            }else{
	            	var msg = res.msg ? res.msg : '系统繁忙稍后重试';
                	showToast(msg);
	            }
	        },
	        error: function(res) {
                lock = false;
	            errCallback(res);
	        }
	    });
    });

    $(".nm-cover span").click(function() {
        $(".nm-cover").addClass('hide');
    });

})
var HASH = getCookie('wx_hash');
function ajaxGetCode(callback, errCallback) {
    var tel = $(".wechat-tel").val();
    var postData = {
            phone: tel,
            type: 2,
            hash:HASH
        }
        postData = typeof objMerge == 'function' ? objMerge(postData) : postData
    $.ajax({
        url: '/login/getPhoneCode',
        type: 'POST',
        dataType: 'json',
        cache: false,
        data: postData,
        success: function(res) {
            callback(res);
        },
        error: function(res) {
            errCallback(res);
        }
    });
}

function errCallback(res) {
    showToast("网络出错，请稍后再试");
    $(".wechat-sprite").addClass("hide");
}
