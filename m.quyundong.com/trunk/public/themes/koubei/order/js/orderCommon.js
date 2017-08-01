var baseUrl = "",ajaxType="POST";

$(window).on("load",function(){
	var loadInterval = setInterval(function() {
        if ($(".loading").attr("data-lock") == "1") {
            $(".loading").addClass("hide");
            if (click != 1) {
                $(".main").removeClass("hide");
            }
            clearInterval(loadInterval);
        }
    }, 500);

	location.href.indexOf("localhost") > -1 ? baseUrl = "/apps" : "";
	ajaxIsLogin(reloadCheckLoginCb);

	// 获取卡券列表
	$('#use_coupon').click(function(){
        Coupon.getCouponList();
	});

    // 是否选择使用卡券  
    $("#coupon_waper").on("change","#couponCheck",function(){
        if(this.checked){
            Coupon.cancelSelectCoupon();
        }
    })
    
    // 支付按钮是否点亮
    $(".common-login").on("input", "input", function() {
        var bClick = checkCanClick($(".common-login"));
        if (bClick) {
            $("#orderSubmit").removeClass("disable")
        } else {
            $("#orderSubmit").addClass("disable")
        }
    })

    // 获取验证码
    $('.J_getCode').on("click", function() {
        if ($('.J_getCode').attr('disable') == '1') return;
        var tel = $('.J_tel').val();
        if (!tel || !/1[2345678]{1}\d{9}$/.test(tel)) {
            showToast('请输入正确的手机号');
            return;
        }
        $.ajax({
            url: '/login/getSmsCodeLogin',
            type: ajaxType,
            dataType: 'json',
            cache: false,
            data: {
                'phone': tel,
                'hash': HASH
            },
            success: function(res) {
                if (res.code == 1) {
                    showToast('验证码已经发送，60秒内无需重复获取');
                    setCodeTimer($('.J_getCode'));
                } else {
                    showToast(res.msg);
                }
            },
            error: function(res) {
                showToast('网络出错，请稍后再试');
            }
        });
    });

    // 点击前往支付
    $("#orderSubmit").click(function() {
        if ($(this).hasClass("disable")) {
            return;
        }
        if(clickLock) return;
        clickLock = true;
        ajaxIsLogin(payCheckLoginCb);
    })    
		
	// 调用取消订单接口
	var cancelLock = false;
	$('.book-noPaySprite').on("click","#book-Cancel",function() {
	    var order_id = $(this).attr('order_id');
	    if(cancelLock){
	        return;
	    }
	    cancelLock = true;
	    $.ajax({
	        url: baseUrl + '/order/Cancel',
	        type: 'GET',
	        dataType: 'JSON',
	        cache: false,
	        data: {
	            id: order_id,
	        },
	        success: function(res){
	            cancelLock = false;
	            var res=JSON.parse(res);
	            if(res && res.code == 1){
	                showToast("订单已取消");
	                setTimeout(function(){
	                    location.reload();
					}, 1000);
	            } else {
	                showToast(res.msg);
	            }
	            $(".book-noPaySprite").addClass("hide");
	        },
	        error: function(res){
	            cancelLock = false;
	            showToast('网络出错，请稍后再试');
	        }
	    });
	 });

	// 判断是否可以支付
	var hrefLock = false;
	$('.book-noPaySprite').on("click","#book-href",function() {
	    var order_id = $(this).attr('order_id');
	    if(hrefLock){
	        return;
	    }
	    hrefLock = true;
	    $.ajax({
	        url: baseUrl +  '/order/beforepay',
	        type: 'GET',
	        dataType: 'JSON',
	        cache: false,
	        data: {
	            id: order_id,
	        },
	        success: function(res){
	            hrefLock = false;
	            var res=JSON.parse(res);
	            if(res && res.code == 1){
	                location.href = $('#book-href').attr("data-href");
	            } else {
	                showToast(res.data);
	                setTimeout(function () {
	                    location.reload();
	                }, 1000);
	            }
	            $(".book-noPaySprite").addClass("hide");
	        },
	        error: function(res){
	            hrefLock = false;
	            showToast('网络出错，请稍后再试');
	        }
	    });
	 });
})

var Coupon = {
	cancelSelectCoupon:function(){
        $('#coupon_id').val(0);
        $('#coupon_id').attr('amount', 0);
        $("#coupon_waper").addClass("hide");
        $(".main").removeClass("hide");
        $("#use_coupon").find("span").text("点击使用卡券");
        calTotalMoney();
	},

	selectCoupon:function(_this,data){
        if($(_this).hasClass('myCoupons-disable')) return;
        $("#coupon_waper").addClass("hide");
        $(".main").removeClass("hide");
		var couponId = parseInt(data.id);
        var ticket_type = parseInt(data.ticket_type);
		$('#coupon_id').val(couponId);
        $('#ticket_type').val(ticket_type);
		$('#coupon_id').attr('amount', data.amount);
		calTotalMoney();
		$('#use_coupon span').html(data.amount + '元');
        $("#use_coupon").addClass("choose");
        $("#couponCheck").prop("checked",false);
	},

	getCouponList:function(){
        
		if($("#coupon_waper .qu").size() < 1){
            var couponId = parseInt($('#coupon_id').val());
            var goodsIds = $('input[name=goods_ids]').val();
            var goodsAmount = parseFloat($('#use_coupon').attr('amount'));
			$.ajax({
                url: baseUrl + 'selectCoupon',
                type: ajaxType,
	    		dataType: 'html',
	    		cache: false,
	    		data: {
	                goods_ids: goodsIds, order_type: 0, amount:goodsAmount
	    		},
	    		success: function(res){
	    			$(".main").addClass("hide");
                    var htmlStr = res + '<div class="coupon-howtouse"><a href="http://api.7yundong.cn/help/detail/?id=38">使用说明</a></div><div class="coupon-space"></div><div class="common-quyundongtips">服务由趣运动提供</div><div class="common-quyundongtipsSpace"></div>'
	    			$('#coupon_waper').html(htmlStr).removeClass('hide');
	    		},
	    		error: function(res){
		            showToast('网络出错，请返回重试');
	    		}
	    	});
		}else{
            $(".main").addClass("hide");
            $("#coupon_waper").removeClass("hide");
        }
	}
}

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
	if(mon){
        if(mon == parseInt(mon)){
            return parseInt(mon);
        }else{
            return mon;
        }
    }else{
        return parseInt(mon);
    }
}


// 调用未支付订单接口
function ajaxCheckNopayOrder(callback) {
    $.ajax({
        url: baseUrl + 'getOrderDue',
        type: ajaxType,
        dataType: 'json',
        cache: false,
        success: function(res) {
            console.log(res);
            if (res.data.order.order_status == 0 && res.data.count > 0&&res.data.order.pay_expire_left>0) {
                var str = "",classStr='',
                    goods_list = "";
                str += "<li>您尚有未支付的订单</li>";
				
                if (res.data.order.order_type == 0 || res.data.order.order_type == 3) {
                    //场次订单
                    if(res.data.order.order_type == 3 ){
						classStr = "hide";
					}
                    for (var i = 0; i < res.data.order.goods_list.length; i++) {
                        goods_list += "<em>" + new Date(res.data.order.goods_list[i].start_time * 1000).format("hh:mm") + "-" + new Date(res.data.order.goods_list[i].end_time * 1000).format("hh:mm") + " " + res.data.order.goods_list[i].course_name + " <i class='"+classStr+"'>" + getMoney(res.data.order.goods_list[i].shop_price) + "元</i></em>";
                    }
                    var n = "<p>" + res.data.order.name + "</p>",
                        d = "<p><span>日期：</span><span>" + new Date(res.data.time * 1000).format('yyyy年MM月dd日') + "（周" + getWeek(new Date(res.data.time * 1000).getDay()) + "）</span></p>",
                        p = "<p><span>场地：</span><span>" + goods_list + "</span></p>",
                        t = "<p class='"+classStr+"'><span>共计：</span><span>" + getMoney(res.data.order.order_amount) + "元</span></p>";

                    str += "<li>" + n + d + p + t + "</li>";

                } else {
                    var n2 = "<p>" + res.data.order.name + "</p>",
                        tc = "<p><span>套餐：</span><span>" + res.data.order.goods_list[0].goods_name + "</span></p>",
                        num = "<p><span>数量：</span><span>" + res.data.order.goods_list[0].goods_number + "</span></p>",
                        tt = "<p><span>共计：</span><span>" + getMoney(res.data.order.order_amount) + "元</span></p>";
                    str += "<li>" + n2 + tc + num + tt + "</li>";
                }

                str += "<li><div id='book-Cancel' order_id='" + res.data.order.order_id + "'>取消订单</div><a id='book-href' order_id=" + res.data.order.order_id + " data-href='pay?id=" + res.data.order.order_id + "'><div id='book-pay'>立即支付</div></a></li>";
                $(".book-noPaySprite").removeClass("hide").find("ul").html(str);
            } else {
            	if(callback && typeof callback === "function"){
	                callback();
            	}
            }
        },
        error: function(res) {
        	showToast(res.msg)
        }
    });
}

// 提交按钮是否点亮
function checkCanClick(form) {
    var bClick = true;
    $("input[data-check]", form).each(function(i, item) {
        if (!item.value.trim()) {
            bClick = false;
        }
    })
    return bClick;
}

// =======================================接口调用==============================

// 检查用户是否登录
function ajaxIsLogin(callback) {
    $.ajax({
        url: baseUrl + "checklogin",
        type: ajaxType,
        dataType: 'json',
        cache: false,
        success: function(res) {
            callback(res)
        },
        error: function() {

        }
    })
}

// =======================================回调==============================

// 进入页面时检查是否登录的回调
var reloadCheckLoginCb = function(res) {
    if (res.code && res.code == "1") {
        // 用户已登录，检查是否有未支付订单
    	ajaxCheckNopayOrder();
    	$(".main").removeClass("common-noLogin");
    	$("#orderSubmit").removeClass("disable");
    }else{
    	$(".main").addClass("common-noLogin");
    	$("#orderSubmit").addClass("disable");
    }
}

// 支付时检查是否登录的回调
var payCheckLoginCb = function(res) {
    if (res.code && res.code == "1") {
        // 用户已登录，检查是否有未支付订单
        $("#orderSubmit").text("提交支付中...");
        var callback = function(){	// 没有未支付订单时的回调
        	// 调用支付接口
        	if($(".cop-numContainer").size() > 0){
        		//调用人次支付回调
        		confirmPersonOrderPayCb();
        	}else{
        		//调用场次支付回调
	        	confirmOrderPayCb();
        	}
    	}
    	ajaxCheckNopayOrder(callback);
    } else {
        location.href = "quicklogin";
    }
}

// 用户登录的回调
var loginCallBack = function(res) {
    if (res.code && res.code === "1") {
        // 登录成功
        location.reload();
    } else {
        showToast(res.msg);
    }
}
