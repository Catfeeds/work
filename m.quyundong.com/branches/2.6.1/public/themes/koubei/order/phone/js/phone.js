var baseUrl = "",ajaxType="POST";
$(window).on("load", function() {
    var loadInterval = setInterval(function() {
        if ($(".loading").attr("data-lock") == "1") {
            $(".loading").addClass("hide");
            $(".main").removeClass("hide");
            clearInterval(loadInterval);
        }
    }, 500);

    if($(".phone-login").attr('uid') > 0){//已存在
        $(".main").removeClass("no-login").addClass("is-login");
    }

    //更换账号
    $("#phoneChange").click(function(){
        $.ajax({
            url: 'logout',
            type: "GET",
            dataType: 'json',
            cache: false,
            success: function(res) {
                if (res.code == 1) {
                    $(".main").removeClass("is-login").addClass("no-login");
                } else {
                    showToast(res.msg);
                }
            },
            error: function(res) {
                showToast('网络出错，请稍后再试');
            }
        });
    })

    // 支付按钮是否点亮
    $(".common-login").on("input", "input", function() {
        var bClick = checkCanClick($(".common-login"));
        if (bClick) {
            $("#phoneSubmit").removeClass("disable")
        } else {
            $("#phoneSubmit").addClass("disable")
        }
    })

    // 获取验证码
    $('.J_getCode').on("click", function() {
        if ($('.J_getCode').attr('disable') == '1') return;
        var tel = $('.J_tel').val();
        if (!tel || !/1[2345678]{1}\d{9}$/.test(tel)) {
            showToast('请输入正确的手机号');
            return;
        }
        $.ajax({
            url: '/login/getSmsCodeLogin',
            type: ajaxType,
            dataType: 'json',
            cache: false,
            data: {
                'phone': tel
            },
            success: function(res) {
                if (res.code == 1) {
                    showToast('验证码已经发送，60秒内无需重复获取');
                    setCodeTimer($('.J_getCode'));
                } else {
                    showToast(res.msg);
                }
            },
            error: function(res) {
                showToast('网络出错，请稍后再试');
            }
        });
    });

    // 点击确认
    var lock = false; 
    $('#phoneSubmit').on("click", function() {
        if(lock){
            return;
        }
        var tel = $('.J_tel').val();
        var code = $('.J_code').val();
        if(!tel || !/1[2345678]{1}\d{9}$/.test(tel)){
            showToast('请输入正确的手机号');     
            return;
        }
        if(!code){
            showToast('请输入验证码');
            return;
        }
        
        lock = true;
        
        $.ajax({
            url: 'login',
            type: 'POST',
            dataType: 'json',
            cache: false,
            data: {
                phone:tel,
                code:code
            },
            success: function(res){
                if(res.code==1 && res.url){
                    window.location.href = res.url;
                }else{
                    var msg = res.msg ? res.msg : '系统繁忙';
                    showToast(msg);
                }
                lock = false;
            },
            error: function(res){
                lock = false;
            }
        });

    })
})


// 提交按钮是否点亮
function checkCanClick(form) {
    var bClick = true;
    $("input[data-check]", form).each(function(i, item) {
        if (!item.value.trim()) {
            bClick = false;
        }
    })
    return bClick;
}