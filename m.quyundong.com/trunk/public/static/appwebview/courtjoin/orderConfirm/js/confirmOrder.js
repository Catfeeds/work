$(window).on("load", function() {
    var loadInterval = setInterval(function() {
        if ($(".loading").attr("data-lock") == "1") {
            $(".loading").addClass("hide");
            $(".main").removeClass("hide");
            clearInterval(loadInterval);
        }
    }, 500);

    // 提交订单
    var lock = false;
    $("#orderSubmit").click(function() {
        var _this = $(this);
        function callback() {
            if (lock) {
                return;
            }
            // if (!$("input[value='online']").prop("checked") && !$("input[value='usercard']").prop("checked")) {
            //     showToast("请先选择支付方式");
            //     return;
            // }

            var uid = $("#client_id").val();
            var userHasCard = $("#user_has_card").val();
            var phone = sms_code = 0;

            lock = true;
            _this.html('提交订单中...');
            var postData = {
                id: $('#cj_id').val(),
                hash:$('#J_payHash').val()
            }
            var url = '/order/doConfirmCourtJoin'
                url = typeof urlAddParams == 'function' ? urlAddParams(url) : url
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'JSON',
                cache: false,
                data: postData,
                success: function(res) {
                    lock = false;
                    var res = JSON.parse(res);
                    if (res && res.code == 1) {
                        if (res.data > 0) {
                            _this.html('订单已提交');
                            var url = '/order/pay?id=' + res.data;
                            if (utmSource) url += '&utm_source=' + utmSource;
                            // window.location.replace(url);
                            window.location.replace(typeof urlAddParams == 'function' ? urlAddParams(url) : url);
                            //location.href = '/order/pay?id='+res.data;
                        } else {
                            showToast('订单提交出错，请后退返回重试！');
                            _this.html('提交订单');
                        }
                    } else {
                        showToast(res.msg);
                        _this.html('提交订单');
                    }
                },
                error: function(res) {
                    lock = false;
                    _this.html('提交订单');
                    showToast('网络出错，请返回重试');
                }
            });
        }
        ajaxCheckNopayOrder(callback);
    })
})