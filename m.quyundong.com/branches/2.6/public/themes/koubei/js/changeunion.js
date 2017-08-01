var HASH = getCookie('wx_hash');
window.onload = function() {
    var loadInterval = setInterval(function() {
        if ($(".loading").attr("data-lock") == "1") {
            $(".loading").addClass("hide");
            $(".main").removeClass("hide");
            clearInterval(loadInterval);
        }
    }, 500);

    if($(".phone-login").attr('uid') > 0){//已存在
        $(".main").removeClass("no-login").addClass("is-login");
    }else{
        $('#phoneSubmit').removeClass('hide');
    }

    //更换账号
    $("#phoneChange").click(function(){
        if(confirm('确认要更换绑定吗?')){
            $.ajax({
                url: 'removeUnion',
                type: "POST",
                dataType: 'json',
                cache: false,
                success: function(res) {
                    console.log(res);
                    if (res.code == 1) {
                        $(".main").removeClass("is-login").addClass("no-login");
                        $('#phoneSubmit').removeClass('hide');
                    } else {
                        showToast(res.msg);
                    }
                },
                error: function(res) {
                    showToast('网络出错，请稍后再试');
                }
            });    
        }        
    })

    $(".wechat-form input").on("propertychange input", function() {
        var tel = $(".wechat-tel").val().trim();
        var code = $(".wechat-code").val().trim();
        if (tel && code) {
            $(".wechat-bind").addClass("wechat-bind-canClick");
        } else {
            $(".wechat-bind").removeClass("wechat-bind-canClick");
        }
    })

    $("#wechat-getCode").click(function() {
        var _this = $(this);
        if(_this.attr('disable')=='1') return;

        var tel = $(".wechat-tel").val();
        if(!tel || !/1[2345678]{1}\d{9}$/.test(tel)){ 
            showMsg('请输入正确的手机号');     
            return;
        }

        var callback = function(res) {
            if (res.code == 1) {
                showMsg('验证码已经发送，60秒内无需重复获取');
                setCodeTimer(_this);
            }
            if (res.code == '1007') {
                showMsg('获取手机验证码次数太频繁');
            }
            if (res.code == '1020') {
                showMsg('验证码已发送,30秒内无需重复获取');
            }
            if (res.code == '7008') {
                showMsg('此手机号码己经绑定其他账号');
            }
            if (res.code == '1005') {
                showMsg(res.msg);
            }
            if (res.code == '5001') {
                window.location.href = res.data.redirect_url;
            } 
        }
        var errback = errCallback;
        ajaxGetCode(callback, errback);
    })


    $(".nm-cover span").click(function() {
        $(".nm-cover").addClass('hide');
    });

    $(".wechat-bind").click(function() {
        var tel = $('.wechat-tel').val();
        var code = $(".wechat-code").val().trim();

        if(!tel || !/1[2345678]{1}\d{9}$/.test(tel)){
            showMsg('请输入正确的手机号');     
            return;
        }

        if(!code){
            showMsg('请输入验证码');
            return;
        }

        var callback = function(res) {
            if (res && res.code == 1) {
                showMsg('绑定成功');
                location.href = res.data.url;
            }
            else if (res.code == '0207') {
                showMsg('该手机已绑定，请输入新的手机号');
            }else if (res.code == '0222') {
                showMsg('验证码错误，请输入正确的验证码');
            }else if (res.code == '1001') {
                showMsg('手机号码有误');
            }else if (res.code == '5008') {
                showMsg('手机验证码有误或已过期');
            }else if (res.code == '5001') {
                location.href = res.data.redirect_url;
            }else if (res.code == '7005') {
                showMsg('绑定手机失败');
            }else if (res.code == '1005') {
                showMsg(res.msg);
            }else{
                showMsg(res.msg);
            }
        }
        var errback = errCallback;
        unionBind(callback, errback);
    })
}

function showMsg(errMsg) {
    $(".nm-cover .msg").text(errMsg);
    $(".nm-cover").removeClass('hide');
    setTimeout(function(){
        $(".nm-cover").animate({"opacity":0},300,function(){
            $(this).css("opacity",1).addClass("hide");
        })
    },1000);
}

function ajaxGetCode(callback, errCallback) {
	var tel = $(".wechat-tel").val();
    $.ajax({
        url: 'getOpenSmsCode',
        type: 'POST',
        dataType: 'json',
        cache: false,
        data: {
            phone: tel
        },
        success: function(res) {
            callback(res);
            if(res.code == '4004'){
                showMsg(res.msg);
            }
        },
        error: function(res) {
            errCallback(res);
        }
    })
}

function unionBind(callback, errCallback) {
	var tel = $(".wechat-tel").val();
    var code = $(".wechat-code").val();
    $.ajax({
        url: 'unionBind',
        type: 'POST',
        dataType: 'json',
        cache: false,
        data: {
            phone: tel,
            sms_code: code
        },
        success: function(res) {
            callback(res);
        },
        error: function(res) {
            errCallback(res);
        }
    })
}

function errCallback(res) {
    showMsg("网络出错，请稍后再试");
}
