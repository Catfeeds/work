$(window).on("load", function() {
    // 调用取消订单接口
    var cancelLock = false;
    $('.book-noPaySprite').on("click", "#book-Cancel", function() {
        var order_id = $(this).attr('order_id');
        if (cancelLock) {
            return;
        }
        cancelLock = true;
        var url = '/order/Cancel'
            url = typeof urlAddParams == 'function' ? urlAddParams(url) : url
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'JSON',
            cache: false,
            data: {
                id: order_id,
            },
            success: function(res) {
                cancelLock = false;
                var res = JSON.parse(res);
                if (res && res.code == 1) {
                    showToast("订单已取消");
                    setTimeout(function() {
                        location.reload();
                    }, 1000);
                } else {
                    showToast(res.msg);
                }
                $(".book-noPaySprite").addClass("hide");
            },
            error: function(res) {
                cancelLock = false;
                showToast('网络出错，请稍后再试');
            }
        });
    });

    // 判断是否可以支付
    var hrefLock = false;
    $('.book-noPaySprite').on("click", "#book-href", function() {
        var order_id = $(this).attr('order_id');
        if (hrefLock) {
            return;
        }
        hrefLock = true;
        var url = '/order/beforepay'
            url = typeof urlAddParams == 'function' ? urlAddParams(url) : url
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'JSON',
            cache: false,
            data: {
                id: order_id,
            },
            success: function(res) {
                hrefLock = false;
                var res = JSON.parse(res);
                if (res && res.code == 1) {
                    var url = $('#book-href').attr("data-href");
                    // location.href = $('#book-href').attr("data-href");
                    location.href = typeof urlAddParams == 'function' ? urlAddParams(url) : url;
                } else {
                    showToast(res.data);
                    setTimeout(function() {
                        location.reload();
                    }, 1000);
                }
                $(".book-noPaySprite").addClass("hide");
            },
            error: function(res) {
                hrefLock = false;
                showToast('网络出错，请稍后再试');
            }
        });
    });

})

Date.prototype.format = function(format) {
    var date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
}

function getWeek(dd) {
    var weeks = ["日", "一", "二", "三", "四", "五", "六"];
    return weeks[dd];
}

function getMoney(mon) {
    if (mon) {
        if (mon == parseInt(mon)) {
            return parseInt(mon);
        } else {
            return mon;
        }
    } else {
        return parseInt(mon);
    }
}


// 调用未支付订单接口
function ajaxCheckNopayOrder(callback) {
    var url = '/court/getOrderDue'
        url = typeof urlAddParams == 'function' ? urlAddParams(url) : url
    $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        cache: false,
        success: function(res) {
            if (res.data.order.order_status == 0 && res.data.count > 0 && res.data.order.pay_expire_left > 0) {
                var href = "/order/pay?id=" + res.data.order.order_id 
                href = typeof urlAddParams == 'function' ? urlAddParams(href) : href;
                var str = "",
                    classStr = '',
                    goods_list = "";
                str += "<li>您尚有未支付的订单</li>";

                if (res.data.order.order_type == 0 || res.data.order.order_type == 3) {
                    //场次订单
                    if (res.data.order.order_type == 3) {
                        classStr = "hide";
                    }
                    for (var i = 0; i < res.data.order.goods_list.length; i++) {
                        goods_list += "<em>" + new Date(res.data.order.goods_list[i].start_time * 1000).format("hh:mm") + "-" + new Date(res.data.order.goods_list[i].end_time * 1000).format("hh:mm") + " " + res.data.order.goods_list[i].course_name + " <i class='" + classStr + "'>" + getMoney(res.data.order.goods_list[i].shop_price) + "元</i></em>";
                    }
                    var n = "<p>" + res.data.order.name + "</p>",
                        d = "<p><span>日期：</span><span>" + new Date(res.data.time * 1000).format('yyyy年MM月dd日') + "（周" + getWeek(new Date(res.data.time * 1000).getDay()) + "）</span></p>",
                        p = "<p><span>场地：</span><span>" + goods_list + "</span></p>",
                        t = "<p class='" + classStr + "'><span>共计：</span><span>" + getMoney(res.data.order.order_amount) + "元</span></p>";

                    str += "<li>" + n + d + p + t + "</li>";

                } else {
                    var n2 = "<p>" + res.data.order.name + "</p>",
                        tc = "<p><span>套餐：</span><span>" + res.data.order.goods_list[0].goods_name + "</span></p>",
                        num = "<p><span>数量：</span><span>" + res.data.order.goods_list[0].goods_number + "</span></p>",
                        tt = "<p><span>共计：</span><span>" + getMoney(res.data.order.order_amount) + "元</span></p>";
                    str += "<li>" + n2 + tc + num + tt + "</li>";
                }

                str += "<li><div id='book-Cancel' order_id='" + res.data.order.order_id + "'>取消订单</div><a id='book-href' order_id=" + res.data.order.order_id + " data-href='"+href+"'><div id='book-pay'>立即支付</div></a></li>";
                $(".book-noPaySprite").removeClass("hide").find("ul").html(str);
            } else {
                callback();
            }
        },
        error: function(res) {

        }
    });
}
