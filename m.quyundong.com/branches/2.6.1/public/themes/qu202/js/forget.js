var g = {};
    g.prevContent = "";
    g.passwordStatus = 0;
    g.passwordTip = ["请输入支付密码","请再次输入支付密码以确认","两次输入密码不一致，请重新输入"];
    g.password = "";
    g.bLowerUC = false;
var HASH = getCookie('wx_hash');
$(function(){
    var loadInterval = setInterval(function() {
        if ($(".loading").attr("data-lock") == "1") {
            $(".loading").addClass("hide");
            $(".main").removeClass("hide");
            clearInterval(loadInterval);
        }
    }, 500);

    if (navigator.userAgent.indexOf('UCBrowser') > -1 && navigator.userAgent.indexOf('Android') > -1 ) {
        g.bLowerUC = true;
        $("#recharge-pw").css("fontSize","10px");
    }   
   
    //兼容低版本iphone
    var ip = /OS\s*(\d)/gi;
    if(ip.test(navigator.userAgent) && navigator.userAgent.indexOf("iPhone") > -1){
        var ip2 = /OS\s*(\d)/gi;
        var ipmatch = ip2.exec(navigator.userAgent);
        if(ipmatch[1] < 8){
            $("#recharge-pw").css({"fontSize":"1px"});
        }
    }

    //兼容华为手机
    if((navigator.userAgent.indexOf('HW-HUAWEI') > -1 && navigator.userAgent.indexOf('Version/4.0') > -1) || navigator.userAgent.indexOf('NX511J') > -1){
        $(".recharge-btnGroup").css("top","20%")
    }
    // 兼容低版本UC浏览器
    if(navigator.userAgent.indexOf('UCBrowser/9.4') > -1 ){
        $(".recharge-btnGroup ul").css({"height":"0.4rem"});
        $(".recharge-btnGroup li").css({"float":"left"})
    }
    $(".wechat-form input").on("propertychange input", function() {
        var val = $(this).val();
        
        if (val) {
            $(".wechat-bind").addClass("wechat-bind-canClick");
        } else {
            $(".wechat-bind").removeClass("wechat-bind-canClick");
        }
    })

    // 设置/取消支付密码事件监听
    $("#recharge-pw").on("input propertychange", function() {
        var reg = new RegExp("^\\d{1,6}$", "g");
        var val = $(this).val();
        if (reg.test(val)) {
            g.prevContent = $(this).val();
        } else {
            if (!val) {
                g.prevContent = "";
            }
            $(this).val(g.prevContent);
        }
        updatePasswordShow(g.prevContent.length);
        if (g.prevContent.length == 6) {
            keyInputComplete();
        }
    })

    $("#recharge-pw").on("blur",function(){
        g.prevContent = "";
        $("#recharge-pw").val("");
        updatePasswordShow(0);
    })

    $("#wechat-getCode").click(function() {
        var _this = $(this);
        if(_this.attr('disable')=='1') return;

        var tel = $("#forget-tel").text().trim();

        if(!tel || !/1[2345678]{1}\d{9}$/.test(tel)){ 
            showToast('请输入正确的手机号');     
            return;
        }

        var callback = function(res) {
            if (res.code == 1) {
                showToast('验证码已经发送，60秒内无需重复获取');
                $(".wechat-form li:first-child").css("border-bottom","1px solid #e6e6e6");
                $(".forget-form li:nth-of-type(2)").css("display","block");
                $(".wechat-bind").removeClass("hide");
                setCodeTimer(_this);
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
        }
        var errback = errCallback;
        ajaxGetCode(callback, errback);
           
    })
    
    $(".recharge-btnGroup").on("click touchstart","ul",function(){
        $("#recharge-pw").val("");
        $("#recharge-pw")[0].focus();
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


    // 点击密码验证框的“x”
    $(".recharge-btnGroup span").click(function(){
        $(".recharge-inputPw").addClass("hide");
    })

    $(".nm-cover span").click(function() {
        $(".nm-cover").addClass('hide');
    });

    $(".wechat-bind").click(function() {
        var tel = $("#forget-tel").text().trim();
        var code = $(".wechat-code").val().trim();

        if(!tel || !/1[2345678]{1}\d{9}$/.test(tel)){
            showToast('请输入正确的手机号');     
            return;
        }

        if(!code){
            showToast('请输入验证码');
            return;
        }
        
        var callback = function(res) {
            if (res && res.code == 1) {
                $(".recharge-inputPw").removeClass("hide");
                updatePasswordInput(0,1);
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
        }
        var errback = errCallback;
        ajaxBindWechat(callback, errback);
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

function keyInputComplete(){
    var tip = "";
    switch(g.passwordStatus){
        case 1:
            //设置支付密码---请输入密码
            g.password = g.prevContent;
            updatePasswordInput(1,2);
        break;
        case 2:
            if(g.password ==  g.prevContent){
                var callback = function(res){
                    g.password = g.prevContent = "";
                    updatePasswordShow(0);
                    if(res.status == "0000" ){
                        showToast("设置成功");
                        var orderid = $('.loading').attr('data-orderid');
                        if(orderid!='0'){
                            setTimeout(function(){
                                var url = '/order/pay?id='+orderid;
                                // window.location.href = '/order/pay?id='+orderid;
                                window.location.href = typeof urlAddParams == 'function' ? urlAddParams(url) : url;
                            },2000);
                        }else {
                            setTimeout(function(){
                                var url = '/user/balance';
                                // window.location.href = '/user/balance';
                                window.location.href = typeof urlAddParams == 'function' ? urlAddParams(url) : url;
                            },2000);
                        }
                    }else{
                        showToast(res.msg);
                    }
                }
                ajaxForgetPayPw(callback,errCallback);
            }else{
                updatePasswordInput(2,1);
            }
        break;
    }
}

//更新设置/取消支付密码框提示和输入框状态
function updatePasswordInput(tipInd,status){
    $(".recharge-btnGroup p").text(g.passwordTip[tipInd]);
    $("#recharge-pw").val("");
    $("#recharge-pw")[0].focus();
    g.prevContent = "";
    updatePasswordShow(0);
    g.passwordStatus = status;
}

function updatePasswordShow(showNum){
    var aLi = $(".recharge-btnGroup li");
    aLi.removeClass('active');
    aLi.each(function(i,item){
        if(i<showNum){
            $(item).addClass("active");
        }
    })
}

function ajaxGetCode(callback, errCallback) {
    var tel = $("#forget-tel").text().trim();
    var postData = {
            phone: tel,
            hash:HASH
        }
        postData = typeof objMerge == 'function' ? objMerge(postData) : postData
    $.ajax({
        url: '/user/getsmscode',
        type: 'POST',
        dataType: 'json',
        cache: false,
        data: postData,
        success: function(res) {
			if(res.code == '4004'){
				showToast(res.msg);
			}
			if(res.hash) HASH = res.hash;
            callback(res);
        },
        error: function(res) {
            errCallback(res);
        }
    })
}

// 点击确定时验证手机号和验证码
function ajaxBindWechat(callback, errCallback) {
    var tel = $("#forget-tel").text().trim();
    var code = $(".wechat-code").val();
    var postData = {
            phone: tel,
            sms_code: code,
        }
        postData = typeof objMerge == 'function' ? objMerge(postData) : postData
    $.ajax({
        url: '/user/checksmscode',
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
    })
}

// 设置密码
function ajaxForgetPayPw(callback, errCallback){
    var tel = $("#forget-tel").text().trim();
    var code = $(".wechat-code").val();
    var pw = $("#recharge-pw").val();
    var postData = {
            phone: tel,
            sms_code: code,
            pay_new_password:pw
        }
        postData = typeof objMerge == 'function' ? objMerge(postData) : postData
    $.ajax({
        url: '/user/resetPaypassword',
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
    })
}

function errCallback(res) {
    showToast("网络出错，请稍后再试");
}
