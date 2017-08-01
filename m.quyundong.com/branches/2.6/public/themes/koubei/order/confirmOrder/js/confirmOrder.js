var clickLock = false;

$(window).on("load", function() {
    calTotalMoney();
})

//调用场次支付回调
function confirmOrderPayCb(){
    var uid = $("#client_id").val();
    var userHasCard = $("#user_has_card").val();
    var phone = sms_code = 0;

    var postData = {
        goods_ids: $('#J_payGoodsId').val(),
        act_id: $('#J_payActId').val(),
        code: sms_code,
        bid: $('#J_payBid').val(),
        cid: $('#J_payCid').val(),
        coupon_id: $('#coupon_id').val(),
        ticket_type: $('#ticket_type').val(),
        pay_type: $('input[name=paytype]:checked').val(),
        card_no: $('input[name=usercard]:checked').val() ? $('input[name=usercard]:checked').val() : '',
        hash: $('#J_payHash').val() 
    }
    $.ajax({
        url: baseUrl + 'doconfirm',
        type: ajaxType,
        dataType: 'JSON',
        cache: false,
        data: postData,
        success: function(res){
            clickLock = false;
            var res=JSON.parse(res);
            if(res && res.code == 1){
                if (res.data.order_id > 0){
                    var url = 'pay?id='+res.data.order_id;
                    // window.location.replace(url);
                    window.location.replace(typeof urlAddParams == 'function' ? urlAddParams(url) : url);
                }else{
                    showToast('订单提交出错，请后退返回重试！');
                }
            } else {
                showToast(res.msg);
            }
            $("#orderSubmit").text("立即付款");
        },
        error: function(res){
            clickLock = false;
            $("#orderSubmit").text("立即付款");
            showToast('网络出错，请返回重试');
        }
    });
}

function doPay(){

    $.ajax({
        url: '/order/dopay',
        type: 'POST',
        data: {
            order_id: orderId,
            card_no: cardNo,
            pay_type: payType,
            openid: openid,
            utm_source: utmSource,
            use_wallet: use_wallet,
            hash: $('#J_payOrder_hash').val(),
            wpk:pw
        },
        dataType: 'JSON',
        cache: false,
        success: function(res){
            lock = false;
           // _this.text('确定');
            res = $.parseJSON(res);
            if (res && res.code == 1) {
                if (payType == _vip_pay) { // 会员卡支付
                    // 直接跳转到成功页面
                    var url = "payOk?id=" + orderId;
                    if(utmSource) url += '&utm_source='+utmSource;
                    window.location.href = url;
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
                var url = "payOk?id=" + orderId;
                if(utmSource) url += '&utm_source='+utmSource;
                window.location.href = url;
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

// 计算价钱
function calTotalMoney() {
    var totalAmount = parseInt($("#totalMoney").text());
    var payAmount = totalAmount;

    var actId = $('#J_payActId').val();
    var priceChange = 0;
    var pfix = '元';
    if (actId > 0) {
        priceChange = $('#J_payActId').attr('amount');
    } else {
        var couponId = $('#coupon_id').val();
        if (couponId > 0) {
            priceChange = $('#coupon_id').attr('amount');
        }
    }
    payAmount = priceChange > 0 ? Math.max(totalAmount - priceChange, 0) : payAmount;
    payAmount = Math.round(payAmount * 100) / 100;

    $("#totalMoney").text(totalAmount + pfix);
    $("#pay_amount").text(payAmount + pfix);
}