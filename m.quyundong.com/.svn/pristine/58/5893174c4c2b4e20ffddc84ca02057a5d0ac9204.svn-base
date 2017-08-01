var lock = false;
var _vip_pay = 15; // 手机网站会员卡支付的编号
var _weixin_pay = 5; //微信公众号支付
var g = {};
g.prevContent = "";
g.passwordStatus = 0;
g.passwordTip = ["请设置趣运动支付密码","请再次输入密码以确认","两次输入密码不一致，请重新输入密码","请输入趣运动支付密码"];
g.bLowerUC = false;

$(function(){
    var touchType = ('createTouch' in document) ? 'tap' : 'click';

    var loadInterval = setInterval(function() {
        if ($(".loading").attr("data-lock") == 1) {
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
    // 选择支付方式
    /*$('.pay_check').on('click', function(){
        setPayType($(this));
    });*/
    $('.pay_list li').on("touchstart", function(){
        var btn = $(this).find('.pay_check');
        setPayType(btn);
    });


    //点击确定或者取消
    $(".nm-cover .l,.nm-cover .r").on("click", function() {
        $(".nm-cover").addClass("hide");
        if($(this).hasClass("r")){
            g.passwordStatus = 1;
            showPayBox();
        }
    })

    $(".recharge-btnGroup").on("click touchstart","ul",function(){
        $("#recharge-pw").val("");
        $("#recharge-pw")[0].focus();
    })


    $(".nm-cover .l,.nm-cover .r").on("touchstart", function() {
        $(this).addClass("nm-cover-active");
    })

    $(".nm-cover .l,.nm-cover .r").on("touchend", function() {
        $(this).removeClass("nm-cover-active");
    })

    $("#paylist-recharge-pay-i").click(function(){
        if($(this).prop("checked")){
            if($(".main").attr("data-password") == "0"){
                // 没有设置支付密码
                //$(".nm-cover").removeClass("hide");
            }
        }
    })

    $('.li_balance_pay').on(touchType,"label",function(e){
        // e.stopPropagation();
        // e.preventDefault();
    //$('.login-header').eq(1).find('li').on('click', function(){
        var li = $(this).parents("li");
        var el = $("#paylist-recharge-pay-i");
        if(li.attr('status') == 'selected'){
            li.attr('status', 'unselected');
            // el.removeAttr('checked');
            li.find("em").removeClass("active");
            var money = $(".balance-money").attr('data-amount');
            var pay = $("#paylist-money-i").attr('data-amount');
            $(".balance-money").text(money+"元");
            $("#paylist-money-i").text(pay+"元");
            $(".pay_list").removeClass("hide");
            $("#J_payOrder_use_wallet").attr('value',0);
            $('#payed-money').text('');
        } else {
            li.find("em").addClass("active");
            li.attr('status', 'selected');
            // el.attr('checked', 'checked');
            checkBalance();
        }

        /*if(el.attr("checked")==true){
            checkBalance();
        }else{
            var money = $(".balance-money").attr('data-amount');
            var pay = $("#paylist-money-i").attr('data-amount');
            $(".balance-money").text(money+"元");
            $("#paylist-money-i").text(pay+"元");
            $(".pay_list").removeClass("hide");
            $("#J_payOrder_use_wallet").attr('value',0);
            $('#payed-money').text('');
        }*/
    });

    // 点击密码验证框的“x”
    $(".recharge-btnGroup span").click(function() {
        lock=false;
        $(".recharge-inputPw").addClass("hide");
    })

    // 默认选中第一个支付方式
    setPayType($('.pay_check').first());
    
    // 提交
    $('#pay_sub_btn').on('click', function(){

        var _this = $(this);
        var payType = $('#pay_type').val();
        var orderId = $('#J_payOrder_id').val();
        var orderSn = $('#J_payOrder_sn').val();
        var cardNo  = $('#J_payOrder_card_no').val();
        var openid =  $('#J_payOrder_openid').val();
        var use_wallet = $('#J_payOrder_use_wallet').val();

        if(payType == _weixin_pay && !openid){
            alert('微信服务忙，请选择其它支付方式');
            return false;
        }
        if (lock) {
            return false;
        }
        if (!payType) {
            alert('请选择支付方式');
            return false;
        }

        var bYuEChecked = $(".pay_list").hasClass("hide");
        if(bYuEChecked || $(".li_balance_pay").attr("status") == "selected"){
            if($(".main").attr("data-password") == "0"){
                // 没有设置支付密码
                ajaxPay(paycallback,errCallback,'');
                return
            }else{
                g.passwordStatus = 0;
                showPayBox();
            }            
        }else{
            showToast("支付中...",true);
            ajaxPay(paycallback,errCallback);
        }

        // hideError();
        lock = true;
        // showToast("支付中...",true);
    });
    
    // 支付密码重试
    $("#paylist-tryAgain").click(function(){
        g.passwordStatus = 0;
        $(".recharge-password").addClass("hide");
        showPayBox();
    })

    // 返回
    $("#recharge-cancel").click(function(){
        $(".recharge-password").addClass("hide");
    })

    $("#recharge-pw").on("input propertychange", function() {
        var reg = new RegExp("^\\d{1,6}$", "g");
        var val = $(this).val();
        if (reg.test(val)) {
            g.prevContent = $(this).val();
            if(g.prevContent.length == 6 && g.passwordStatus==0){

                $(".recharge-inputPw").addClass("hide");
                showToast("支付中...",true);
                var pw = g.prevContent;
                $('#J_payOrder_wpk').attr('value',pw);
                ajaxCheckPw(pw);
                $("#recharge-pw").blur()
            }
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

    //余额支付
    var walletUsed = $('#J_payOrder_use_wallet').val();
    if(walletUsed>0){
        checkBalance();
    }
});

/**
 * 设置支付方式
 *
 * @param object obj 触发点击事件的li对象(zepto对象)
 * @author xiaosibo
 */
function setPayType(obj)
{
    var payType = obj.attr('data_type');
    if (payType == _vip_pay) { // 会员卡支付
        $('.has_card_hidden').hide();
        $('.has_card_show').show();
    } else { // 其他支付方式
        $('.has_card_hidden').show();
        $('.has_card_show').hide();
    }
    // 选择当前点击的支付方式, 去掉其他支付方式
   // obj.siblings().find('.check').removeClass('checked');
    //obj.find('.check').addClass('checked');
   // obj.siblings().find('.check').attr('checked',false);   
    $('.pay_check').removeAttr('checked');
    obj.attr('checked', 'checked');

    // 设置支付方式
    $('#pay_type').val(payType);
}

function checkBalance(){
    var money = parseFloat($(".balance-money").attr('data-amount'));
    var pay = parseFloat($("#paylist-money-i").attr('data-amount'));

    if(money>=pay){
        $("#paylist-money-i").text("0元");
        $(".balance-money").text((money-pay).toFixed(2)+"元");
        $(".pay_list").addClass("hide");
        $('#payed-money').text(pay.toFixed(2)+"元");
    }
    if(money<pay){
        $("#paylist-money-i").text((pay-money).toFixed(2)+"元");
        $('#payed-money').text(money.toFixed(2)+"元");
        $(".balance-money").text("0元");
    }
    $("#J_payOrder_use_wallet").attr('value',1);
}

function showToast(errMsg,bol) {
    $(".toast .toast-msg").text(errMsg);
    $(".toast").removeClass('hide');
    if(!bol){
        setTimeout(function(){
            $(".toast").animate({"opacity":0},300,function(){
                $(this).css("opacity",1).addClass("hide");
            })
        },1000);
    }
}



function showPayBox() {
    $(".recharge-inputPw").removeClass("hide");
    if(g.passwordStatus == 0){
        $(".recharge-btnGroup p").text("请输入支付密码");
    }
    else{
        $(".recharge-btnGroup p").text("请设置支付密码");
    }
    
    $("#recharge-pw").val("");
    $("#recharge-pw")[0].focus();
    updatePasswordShow(0);
}

function updatePasswordShow(showNum) {
    var aLi = $(".recharge-btnGroup li");
    aLi.removeClass('active');
    aLi.each(function(i, item) {
        if (i < showNum) {
            $(item).addClass("active");
        }
    })
}

function ajaxCheckPw(pw){
    $.ajax({
        url:'/order/checkpw',
        type:'POST',
        data:{
            wpk:pw
        },
        dataType:'JSON',
        cache:false,
        success: function (res) {
            res= $.parseJSON(res);
            if(res && res.code==1){
                ajaxPay(paycallback,errCallback,pw);
            } else {
                $(".toast").addClass("hide");
                $(".recharge-password").removeClass("hide");
                // showToast('支付密码错误');
                lock=false;
            }
        },
        error:function(){

        }
    })
}

function ajaxPay(paycallback,errCallback,pw){
    pw= pw ? pw : '';
    var payType = $('#pay_type').val();
    var orderId = $('#J_payOrder_id').val();
    var orderSn = $('#J_payOrder_sn').val();
    var cardNo  = $('#J_payOrder_card_no').val();
    var openid =  $('#J_payOrder_openid').val();
    var use_wallet = $('#J_payOrder_use_wallet').val();

    if (payType == 16 || payType==13 || payType==23) { // 银联在线|支付宝|QQ
        $('#order_pay_form').submit();
        return false;
    }

    var postData = {
            order_id: orderId,
            card_no: cardNo,
            pay_type: payType,
            openid: openid,
            utm_source: utmSource,
            use_wallet: use_wallet,
            hash: $('#J_payOrder_hash').val(),
            wpk:pw
        }
        postData = typeof objMerge == 'function' ? objMerge(postData) : postData

    $.ajax({
        url: '/order/dopay',
        type: 'POST',
        data: postData,
        dataType: 'JSON',
        cache: false,
        success: function(res){
            lock = false;
           // _this.text('确定');
            res = $.parseJSON(res);
            if (res && res.code == 1) {
                if (payType == _vip_pay) { // 会员卡支付
                    // 直接跳转到成功页面
                    var url = "/order/payOk?id=" + orderId;
                    if(utmSource) url += '&utm_source='+utmSource;
                    // window.location.href = url;
                    window.location.href = typeof urlAddParams == 'function' ? urlAddParams(url) : url
                } else if (payType == _weixin_pay){
                    _wxPayParam = res.data;
                    callpay();//调起微信支付
                    $(".toast").addClass("hide");
                } else {
                    if (res.data.redirect_url) {
                        //window.location.href = res.data.redirect_url;
                    } else {
                        showToast('支付方式有误');
                    }
                }
            } else if (res && res.code == 1302) { // 余额全额支付成功
                // 直接跳转到成功页面
                var url = "/order/payOk?id=" + orderId;
                if(utmSource) url += '&utm_source='+utmSource;
                // window.location.href = url;
                window.location.href = typeof urlAddParams == 'function' ? urlAddParams(url) : url
            } else {
                showToast(res.msg);
            }
        },
        error: function(xhr, type){
            lock = false;
            _this.text('确定');
            showToast('网络出错，请稍后再试');
        }
    });
}

// 设置密码
function ajaxSetPayPw(callback, errCallback){
    var tel = $(".wechat-tel").val();
    var code = $(".wechat-code").val();
    var pw = $("#recharge-pw").val();

    var postData = {
            password:pw
        }
        postData = typeof objMerge == 'function' ? objMerge(postData) : postData

    $.ajax({
        url: '/user/setpaypassword',
        type: 'POST',
        dataType: 'json',
        cache: false,
        data: postData,
        success: function(res) {
         //   var data = JSON.parse(res);
            callback(res);
        },
        error: function(res) {
            errCallback(res);
        }
    })
}

//设置支付密码框提示和输入框状态
function updatePasswordInput(tipInd,status){
    $(".recharge-btnGroup p").text(g.passwordTip[tipInd]);
    $("#recharge-pw").val("");
    $("#recharge-pw")[0].focus();
    g.prevContent = "";
    updatePasswordShow(0);
    g.passwordStatus = status;
}

function paycallback(res){
    $(".recharge-inputPw").addClass("hide");
    if(res.status == 0000){
        showToast("支付成功");
    }else{
        showToast("支付失败");
    }
}

function errCallback(res) {
    showToast("网络出错，请稍后再试");
    $(".wechat-sprite").addClass("hide");

    if(g.passwordStatus == 2){
        g.passwordStatus = 1;
        showPayBox();
    }
}

function keyInputComplete(){
    switch(g.passwordStatus){
        case 1:
            //设置支付密码---请输入密码
            g.password = g.prevContent;
            updatePasswordInput(1,2);
        break;
        case 2:
            if(g.password ==  g.prevContent){
                var callback = function(res){
                    var tempPassword = g.password;
                    g.password = g.prevContent = "";
                    updatePasswordShow(0);
                    $(".recharge-inputPw").addClass("hide");
                    if(res.status == '0000'){
                        $(".main").attr('data-password','1');
                        showToast("设置成功");
                        // g.passwordStatus = 0;
                        // showPayBox();
                        // ajaxPay(paycallback,errCallback,tempPassword);
                        $('#J_payOrder_wpk').attr('value',tempPassword);
                        ajaxCheckPw(tempPassword);
                    }else if (res.status=='1204'){
                        showToast(res.msg);
                    }else{
                        showToast(res.msg);
                        if(g.passwordStatus == 2){
                            g.passwordStatus = 1;
                            showPayBox();
                        }
                    }

                }
                ajaxSetPayPw(callback,errCallback);
            }else{
                updatePasswordInput(2,1);
            }
        break;
    }
}