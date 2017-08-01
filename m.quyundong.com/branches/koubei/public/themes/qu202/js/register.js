var bTelChecked = false,
    bCodeChecked = false,
    bPwChecked = false;
    
$(function(){
    var loadInterval = setInterval(function() {
        if ($(".loading").attr("data-lock") == "1") {
            $(".loading").addClass("hide");
            $(".main").removeClass("hide");
            clearInterval(loadInterval);
        }
    }, 500);

    $(".login-in").on("touchstart","li",function(){
        var _this = $(this);
        if(!_this.hasClass("disable")){
            _this.addClass('active');
        }   
    })

    $(".login-in").on("touchend","li",function(){
        var _this = $(this);
        if(!_this.hasClass("disable")){
            _this.removeClass('active');
        }   
    })

    $(".wechat-form input").on("propertychange input", function() {
        var _this = $(this);
        var val = _this.val();
        if (_this.hasClass("wechat-tel")) {
            if (checkTel(val)) {
                bTelChecked = true;
            } else {
                bTelChecked = false;
            }
        } else if(_this.hasClass("wechat-msg")){
            if (checkCode(val)) {
                bCodeChecked = true;
            } else {
                bCodeChecked = false;
            }
        }else{
            var pw1 = $(".wechat-pw").eq(0).val();
            var pw2 = $(".wechat-pw").eq(1).val();
            if( pw1 === pw2 && checkPassword(pw1)){
                bPwChecked = true;
            }else{
                bPwChecked = false;
            }
        }
        if (bTelChecked && bCodeChecked && bPwChecked) {
            $("#login-common").removeClass('disable');
        } else {
            $("#login-common").addClass("disable");
        }
    })

    $("#wechat-getCode").click(function() {
        var tel = $(".wechat-tel").val();
        if (!$(this).hasClass("countActive")) {
            if (checkTel(tel)) {
                $(".wechat-sprite").removeClass("hide");
                var callback = function(res) {
                    $(".wechat-sprite").addClass("hide");
                    if (res.code == 1) {
                        showToast('验证码已经发送，请在十分钟内完成绑定');
                        $("#wechat-getCode").addClass("countActive");
                        setCodeTimer();
                    }
                    if (res.code == '1007') {
                        showToast('获取手机验证码次数太频繁');
                    }
                    if (res.code == '1020') {
                        showToast('验证码已发送,30秒内无需重复获取');
                    }
                    if (res.code == '7008') {
                        showToast('此手机号码己经绑定其他账号');
                    }
                    if (res.code == '5001') {
                        window.location.href = res.data.redirect_url;
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

    $("#wechat-getCode").on("touchstart mousedown", function() {
        if (!$(this).hasClass("countActive")) {
            $(this).addClass("active");
        }
    })

    $("#wechat-getCode").on("touchend mouseup", function() {
        if (!$(this).hasClass("countActive")) {
            $(this).removeClass("active");
        }
    })

    $(".nm-cover span").click(function() {
        $(".nm-cover").addClass('hide');
    });

})

function checkTel(tel) {
    if (!tel || !/1[2345678]{1}\d{9}$/.test(tel)) {
        return false;
    }
    return true;
}

function checkCode(code) {
    if (!code || !/^\d{3,20}$/.test(code)) {
        return false;
    }
    return true;
}

function checkPassword(pw) {
    if (!pw || !/^\S{6,20}$/.test(pw)) {
        return false;
    }
    return true;
}

// 显示toast
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
    },1000);
}

function setCodeTimer() {
    var t = 60,
        codeTimer = null;
    clearInterval(codeTimer);
    $("#wechat-getCode").text("重新获取(" + t + "秒)");
    codeTimer = window.setInterval(function() {
        t--;
        $("#wechat-getCode").text("重新获取(" + t + "秒)");
        if (t == 0) {
            window.clearInterval(codeTimer);
            $("#wechat-getCode").text("重新获取").removeClass("countActive");
        }
    }, 1000);
}

function ajaxGetCode(callback, errCallback) {
    var tel = $(".wechat-tel").val();
    setTimeout(function() {
        var data = {
                code: "1",
                data: {
                    redirect_url: "http://www.baidu.com"
                }
            };
            try {
                var res = data;
                callback(res);
            } catch (e) {
                var res = JSON.parse(data);
                callback(res);
            }
    }, 2000);

    // $.ajax({
    //     url: '/login/wechatSms',
    //     type: 'POST',
    //     dataType: 'json',
    //     cache: false,
    //     data: {
    //         phone: tel
    //     },
    //     success: function(res) {
    //         var data = JSON.parse(res);
    //         callback(res);
    //     },
    //     error: function(res) {
    //         errCallback(res);
    //     }
    // })
}

function errCallback(res) {
    showToast("网络出错，请稍后再试");
    $(".wechat-sprite").addClass("hide");
}
