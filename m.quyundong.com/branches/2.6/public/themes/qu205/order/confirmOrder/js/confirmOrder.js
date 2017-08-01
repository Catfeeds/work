var order = {};
var submitLock = false;
$(window).on("load", function() {
    var loadInterval = setInterval(function() {
        if ($(".loading").attr("data-lock") == "1") {
            $(".loading").addClass("hide").css("background-color","transparent");
            if (click != 1) {
                $(".main").removeClass("hide");
            }
            clearInterval(loadInterval);
        }
    }, 500);

    order.payTypeSwitch();
    $(".co-paySelection").on("change", "#paySelection-vip,#paySelection-online", function() {
        order.payTypeSwitch();
    })

    // 提交订单
    $("#orderSubmit").click(function() {
        var _this = $(this);
        if(submitLock) return;
        submitLock = true;
        $("#loading").removeClass('hide');
        // var lock = false;
        function callback() {
            // $("#loading").addClass('hide');
            // if (lock) {
            //     return;
            // }
            if (!$("input[value='online']").prop("checked") && !$("input[value='usercard']").prop("checked")) {
                showToast("请先选择支付方式");
                return;
            }

            var uid = $("#client_id").val();
            var userHasCard = $("#user_has_card").val();
            var phone = sms_code = 0;
            // lock = true;
            _this.html('提交订单中...');
            var postData = {
                goods_ids: $('#J_payGoodsId').val(),
                act_id: $('#J_payActId').val(),
                code: sms_code,
                bid: $('#J_payBid').val(),
                cid: $('#J_payCid').val(),
                coupon_id: $('#coupon_id').val(),                
                ticket_type: $('#ticket_type').val(),
                utm_source: utmSource,
                pay_type: $('input[name=paytype]:checked').val(),
                card_no: $('input[name=usercard]:checked').val() ? $('input[name=usercard]:checked').val() : '',
                relay:$('input[name=relay]').val(),
                package_type:$('input[name=cash]:checked').val()>0 ? 1 : 0 ,
                hash: $('#J_payHash').val()
            }
                postData = typeof objMerge == 'function' ? objMerge(postData) : postData;
            $.ajax({
                url: '/order/doconfirm',
                type: 'GET',
                dataType: 'JSON',
                cache: false,
                data: postData,
                success: function(res) {
                    // lock = false;
                    var res = JSON.parse(res);
                    if (res && res.code == 1) {
                        if (res.data > 0) {
                            _this.html('订单已提交');
                            var url = '/order/pay?id=' + res.data;
                            if (utmSource) url += '&utm_source=' + utmSource;
                            window.location.replace(typeof urlAddParams == 'function' ? urlAddParams(url) : url);
                            //location.href = '/order/pay?id='+res.data;

                        } else {
                            submitLock = false;
                            $("#loading").addClass('hide');
                            showToast('订单提交出错，请后退返回重试！');
                            _this.html('提交订单');
                        }
                    } else {
                        submitLock = false;
                        $("#loading").addClass('hide');
                        showToast(res.msg);
                        _this.html('提交订单');
                    }

                },
                error: function(res) {
                    submitLock = false;
                    $("#loading").addClass('hide');
                    // lock = false;
                    _this.html('提交订单');
                    showToast('网络出错，请返回重试');
                }
            });
        }
        ajaxCheckNopayOrder(callback);
    })

    $('input[name=cash]').click(function(){
        order.calTotalMoney();
    })
})

// 支付方式切换
order.payTypeSwitch = function() {
    if ($("#paySelection-vip").prop("checked") || $("#paySelection-online").prop("checked")) $(".co-bill").removeClass("hide");
    $(".co-tip").removeClass("hide");
    $(".co-tip-vip").addClass("hide");
    if ($("#paySelection-vip").prop("checked") || $("#paySelection-online").prop("checked")) $(".co-court").find("span:nth-of-type(2)").removeClass('hide');
    $(".co-cardList").addClass("hide");
    if ($("#paySelection-vip").prop("checked")) {
        order.payType = 1;
        $(".co-bill").addClass("hide");
        $(".co-tip").addClass("hide");
        $(".co-tip-vip").removeClass("hide");
        $(".co-court").find("span:nth-of-type(2)").addClass('hide');
        $(".co-cardList").removeClass("hide");
    } else if ($("#paySelection-online").prop("checked")) {
        order.payType = 2;
    }
}

// 计算价钱
order.calTotalMoney = function() {
    // var totalAmount = parseInt($("#totalMoney").text());
    var totalAmount = parseFloat($('input[name=cash]:checked').attr('data-value'));
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
    $("#payMoney").text(payAmount + pfix);
}
