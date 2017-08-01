var g = {};
g.prevContent = "";
g.passwordStatus = 0;
g.passwordTip = ["请输入支付密码","请再次输入支付密码以确认","两次输入密码不一致，请重新输入","请输入旧的支付密码验证身份","请输入新的支付密码"];
g.password = "";
g.oldpassword = "";
g.bLowerUC = false;
window.onload = function() {
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

    // 兼容iphone uc
    var bIphoneUc = navigator.userAgent.indexOf('iPhone') > -1 && navigator.userAgent.indexOf('UCBrowser') > -1;
    var bodyH = 0;
    if(bIphoneUc){
        bodyH = $("body").height();
        $(".recharge-btnGroup").css("top","20%")
    }
    // 兼容低版本UC浏览器
    if(navigator.userAgent.indexOf('UCBrowser/9.4') > -1 ){
        $(".recharge-btnGroup ul").css({"height":"0.4rem"});
        $(".recharge-btnGroup li").css({"float":"left"})
    }
        
    // 右上角支付密码点击
    $(".header .right").click(function(){
        $(".recharge-password").removeClass("hide");
    })

    // 充值按钮点击
    $("#recharge-btn").click(function(){
        var reg = /^\S{6,20}$/g;
        var val = $("#recharge-czpw").val();
        if(!$("#recharge-czpw").val()){
            showToast("请输入储值卡密码");
        }
        if(val){
            if(reg.test(val)){
                //验证密码格式成功，调用充值接口
                var callback = function(res){
                    if(res.status == "0000"){
                        //充值成功
                        showToast("充值成功");
                        setTimeout(function(){
                            location.reload();
                        },2000);
                    }else if(res.status == "-1" || res.status == "1505" || res.status == "1503" || res.status == "1506"){
                        showToast(res.msg);
                    }
                    else{
                        showToast("密码错误，充值失败");
                    }
                }
                ajaxRecharge(callback,errCallback);
            }else{
                showMsg("密码错误，充值失败");
            }
        }
    })

    $(".nm-cover .l").on("click", function() {
        $(".nm-cover").addClass("hide");
    })

    $(".nm-cover .l").on("touchstart", function() {
        $(this).addClass("nm-cover-active");
    })

    $(".nm-cover .l").on("touchend", function() {
        $(this).removeClass("nm-cover-active");
    })

    // 点击密码验证框的“x”
    $(".recharge-btnGroup span").click(function(){
        $(".recharge-inputPw").addClass("hide");
        if(bIphoneUc){
            $("body").css("height",bodyH)
            $(".recharge-password").css("height",bodyH)
            $(document).css("height",bodyH)
        }
    })

    $(".recharge-btnGroup").on("click touchstart","ul",function(){
        $("#recharge-pw").val("");
        $("#recharge-pw")[0].focus();
    })


    // 设置/取消支付密码
    $("#recharge-setPw,#recharge-modifyPw").click(function(){
        $(".recharge-inputPw").removeClass("hide");
        if($(this).attr("data-type") == "1"){
            updatePasswordInput(0,1);

        }else if($(this).attr("data-type") == "2"){
            updatePasswordInput(3,3);
        }
    })

    // 点击取消
    $("#recharge-cancel").click(function() {
        $(".recharge-password").addClass("hide");
    });

    // 设置/取消支付密码事件监听
    $("#recharge-pw").on("input propertychange", function() {
        var _this = $(this);
        var reg = new RegExp("^\\d{1,6}$", "g");
        var val = _this.val();
        if (reg.test(val)) {
            g.prevContent = _this.val();
        } else {
            if (!val) {
                g.prevContent = "";
            }
            _this.val(g.prevContent);
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
}
function keyInputComplete(){
    var tip = "";
    // $("#recharge-form").submit();
    switch(g.passwordStatus){
        case 1:
            //设置支付密码---请输入密码
            g.password = g.prevContent;
            updatePasswordInput(1,2);
        break;
        case 2:
            //设置支付密码---请再次输入支付密码以确认
            // 1：成功---支付密码设置成功（toast）
            if(g.password ==  g.prevContent){
                var callback = function(res){
                    g.password = g.prevContent = "";
                    updatePasswordShow(0);
                    if(res.status == "0000"){
                        //支付密码设置成功
                        showToast("支付密码设置成功");
                        setTimeout(function(){
                            location.reload();
                        },2000);
                    }else if(res.status == "1204"){
                        showToast("您已设置了支付密码");
                    }else{
                        showToast("支付密码设置失败");
                    }
                }
                ajaxSetPayPw(callback,errCallback);
            }else{
                // 2：失败---两次输入密码不一致，请重新输入
                updatePasswordInput(2,1);
            }
        break;
        case 3:
            //修改支付密码---请输入旧的支付密码验证身份
            // 请求验证密码接口
            var callback = function(res){
                if(res.status == "0000"){
                    g.oldpassword = g.prevContent;
                    updatePasswordInput(4,4);
                }else{
                    showToast(res.msg);
                }
            }
            ajaxCheckPw(callback,errCallback);
        break;
        case 4:
            //修改支付密码---请输入新的支付密码
            g.password = g.prevContent;
            updatePasswordInput(1,5);
        break;
        case 5:
            //修改支付密码---请再次输入支付密码以确认
            // 1：成功---支付密码修改成功（toast）
            if(g.password ==  g.prevContent){
                var callback = function(res){
                    g.password = g.prevContent = "";
                    updatePasswordShow(0);
                    if(res.status == 0000){
                        //支付密码修改成功
                        showToast("修改密码成功");
                        $(".recharge-inputPw,.recharge-password").addClass("hide");
                        updatePasswordShow(0);
                    }else{
                        //支付密码修改失败
                        showToast(res.msg);
                    }
                }
                ajaxModifyPayPw(callback,errCallback);
            }else{
                // 2：失败---两次输入密码不一致，请重新输入
                updatePasswordInput(2,4);
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

// 显示toast
function showToast(errMsg) {
    $(".toast .toast-msg").text(errMsg);
    $(".toast").removeClass('hide');
    setTimeout(function(){
        $(".toast").animate({"opacity":0},300,function(){
            $(this).css("opacity",1).addClass("hide");
        })
    },1000);
}

// 显示msg，带确定按钮
function showMsg(msg){
    $(".nm-cover").removeClass("hide").find(".msg").text(msg);
}

// ===================================接口调用部分============================
// 验证旧密码
function ajaxCheckPw(callback, errCallback) {
    var postData = {
            password:$("#recharge-pw").val()
        }
        postData = typeof objMerge == 'function' ? objMerge(postData) : postData
    $.ajax({
        url: '/user/verifyPaypassword',
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

// 设置支付密码
function ajaxSetPayPw(callback, errCallback){
    var postData = {
            password:$("#recharge-pw").val()
        }
        postData = typeof objMerge == 'function' ? objMerge(postData) : postData
    $.ajax({
        url: '/user/setPaypassword',
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

// 修改支付密码
function ajaxModifyPayPw(callback, errCallback){
    var postData = {
            pay_new_password:$("#recharge-pw").val(),
            pay_old_password:g.oldpassword
        }
        postData = typeof objMerge == 'function' ? objMerge(postData) : postData
    $.ajax({
        url: '/user/updatePaypassword',
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

// 充值接口
function ajaxRecharge(callback, errCallback) {
    var postData = {
            password:$("#recharge-czpw").val()
        }
        postData = typeof objMerge == 'function' ? objMerge(postData) : postData
    $.ajax({
        url: '/user/rechargeDebitcard',
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
    $(".wechat-sprite").addClass("hide");
    g.password = g.prevContent = "";
    updatePasswordShow(0);
}
