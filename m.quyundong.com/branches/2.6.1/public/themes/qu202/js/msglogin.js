var bTelChecked = false,
    bCodeChecked = false;
    
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
        var val = $(this).val();
        if ($(this).hasClass("wechat-tel")) {
            if (checkTel(val)) {
                bTelChecked = true;
            } else {
                bTelChecked = false;
            }
        } else {
            if (checkCode(val)) {
                bCodeChecked = true;
            } else {
                bCodeChecked = false;
            }
        }
        if (bTelChecked && bCodeChecked) {
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
                        showToast('验证码已经发送，60秒内无需重复获取');
                        $("#wechat-getCode").addClass("countActive");
                        setCodeTimer();
                    }
                    if (res.code == '1007') {
                        showToast('获取手机验证码次数太频繁');
                    }
                    if (res.code == '1020') {
                        showToast('验证码已经发送，60秒内无需重复获取');
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

    $(".wechat-bind").click(function() {
        if (bCodeChecked && bTelChecked) {
            
            $(".wechat-sprite").removeClass("hide");
            var callback = function(res) {
                $(".wechat-sprite").addClass("hide");
                if (res && res.code == 1) {
                    // location.href = res.data.url;
                    // 
                    // 
                    // 
                    // 
                    

                    $(".recharge-inputPw").removeClass("hide");
                    updatePasswordInput(0,1);

                    // 
                    // 
                    // 
                    // 
                    // 
                    // 
                    // 
                }
                if (res.code == '0207') {
                    showToast('该手机已绑定，请输入新的手机号');
                }
                if (res.code == '0222') {
                    showToast('验证码错误，请输入正确的验证码');
                }
                if (res.code == '1001') {
                    showToast('手机号码有误');
                }
                if (res.code == '1010') {
                    showToast('手机验证码有误或已过期');
                }
                if (res.code == '5001') {
                    location.href = res.data.redirect_url;
                }
            }
            var errback = errCallback;
            ajaxBindWechat(callback, errback);
        }
    })

    $(".wechat-bind").on("touchstart mousedown", function() {
        if ($(this).hasClass("wechat-bind-canClick")) {
            $(this).addClass("wechat-bind-clickActive");
        }
    })

    $(".wechat-bind").on("touchend mouseup", function() {
        if ($(this).hasClass("wechat-bind-canClick")) {
            $(this).removeClass("wechat-bind-clickActive");
        }
    })
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

function ajaxBindWechat(callback, errCallback) {
    var tel = $(".wechat-tel").val();
    var code = $(".wechat-code").val();
    var url = $("#url_data").html();
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
    //     url: '/login/wechatbind',
    //     type: 'POST',
    //     dataType: 'json',
    //     cache: false,
    //     data: {
    //         phone: tel,
    //         sms_code: code,
    //         re_url: url
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
