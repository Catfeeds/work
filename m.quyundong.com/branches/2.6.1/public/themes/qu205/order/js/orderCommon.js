$(window).on("load",function(){
	// 获取卡券列表
	$('#use_coupon').click(function(){		
		Coupon.getCouponList();
	});
		
	$("#rem_coupon i").click(function(){
		Coupon.toggleCouponSelect();
	})
	
	// 活动选择
    $("#getPreference").click(function() {
        $(".preference").removeClass("hide");
    })

    $(".preference").on("change", "li", function(e) {
        $(".preference").addClass("hide");
        $("#activityContainer").html("<em>" + this.querySelector("span").innerText + "</em>");
		$("#activityOA").html(this.getAttribute("data_amount") + "元");
        $("#J_payActId").val(this.getAttribute("data_id"));
        $("#J_payActId").attr("amount",this.getAttribute("data_amount"));
        activityOrCoupon(1);
        order.calTotalMoney();
    })

    $(".preference").click(function(e) {
        if (e.target == this) {
            $(".preference").addClass("hide");
        }
    })
	
	// 调用取消订单接口
	var cancelLock = false;
	$('.book-noPaySprite').on("click","#book-Cancel",function() {
	    var order_id = $(this).attr('order_id');
	    if(cancelLock){
	        return;
	    }
	    cancelLock = true;
      var postData = {
              id: order_id,
          }
          postData = typeof objMerge == 'function' ? objMerge(postData) : postData
	    $.ajax({
	        url: '/order/Cancel',
	        type: 'GET',
	        dataType: 'JSON',
	        cache: false,
	        data: postData,
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
      var postData = {
              id: order_id,
          }
          postData = typeof objMerge == 'function' ? objMerge(postData) : postData
	    $.ajax({
	        url: '/order/beforepay',
	        type: 'GET',
	        dataType: 'JSON',
	        cache: false,
	        data: postData,
	        success: function(res){
	            hrefLock = false;
	            var res=JSON.parse(res);
	            if(res && res.code == 1){
                  var url = $('#book-href').attr("data-href");
                  // location.href = $('#book-href').attr("data-href");
	                location.href = typeof urlAddParams == 'function' ? urlAddParams(url) : url;
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

function activityOrCoupon(mode){
	//mode == 1 选择活动
	if(mode == 1){
		$("#coupon_id").val("0").attr('amount','0');
		$('#use_coupon span').html("点击使用卡券");
		$('#rem_coupon i').addClass("hide");
	}else if(mode == 2){
		$("#J_payActId").val("").attr('amount','0');
		$(".preference input").prop("checked",false);
		$("#activityContainer").html("");
		$("#activityOA").html("选择活动");
		$("#rem_coupon i").removeClass("hide");
	}
}

var Coupon = {
	toggleCouponSelect:function(){
		var coupon = $('#coupon_id');
		if(parseInt(coupon.val()) > 0){
			activityOrCoupon(1);
		}else{
			activityOrCoupon(2);
		}
		
		order.calTotalMoney();
	},

	selectCoupon:function(data){
		
		var couponId = parseInt(data.id);
		$('#coupon_id').val(couponId);
		$('#coupon_id').attr('amount', data.amount);
		$('#ticket_type').val(data.ticket_type);
		activityOrCoupon(2);
		order.calTotalMoney();
		$('#use_coupon span').html(data.amount + '元');
		$('#coupon_waper').html('');
		$('#coupon_waper').hide();
      // $(".main").removeClass("hide");
	    $(".main").css("display","block");
	    
	},

	getCouponList:function(){
		var couponId = parseInt($('#coupon_id').val());
		var goodsIds = $('input[name=goods_ids]').val();
		var order_type = parseInt($('input[name=goods_ids]').attr('order_type'));
		var goodsAmount = parseFloat($('#use_coupon').attr('amount'));
		
		if(couponId > 0){
			this.toggleCouponSelect();
		}else{
			$('.loading').removeClass('hide');
      var postData = {
                  goods_ids: goodsIds, order_type: order_type, amount:goodsAmount
          }
          postData = typeof objMerge == 'function' ? objMerge(postData) : postData
			$.ajax({
	    		url: '/Coupon/SelectCoupon',
	    		type: 'POST',
	    		dataType: 'html',
	    		cache: false,
	    		data: postData,
	    		success: function(res){
            // $(".main").addClass("hide");   
	    			$(".main").css("display",'none'); 	
	    			$('.loading').addClass('hide');
	    			$('#coupon_waper').html(res);
	    			$('#coupon_waper div.page').css('min-height',$(document).height());
	    			$('#coupon_waper').css({'min-height':$(window).height(), 'display':'block'});
            /*
              qq钱包setTitleButtons
             */
            if(typeof NM_CHANNEL !='undefined' && NM_CHANNEL == 'qqwallet' && mqq){
                mqq.ui.setTitleButtons({
                'left':{
                  'callback':function () {
                    $('#coupon_waper').html('');$('#coupon_waper').hide();
                    // $('.main').removeClass('hide');
                    $('.main').css('display','block');
                        mqq.ui.setTitleButtons({
                        'left':{
                          'callback':function () {
                            window.history.back()                            
                          }
                        }
                      })
                  }
                }
              })
            }
	    		},
	    		error: function(res){
	    			$('.loading').hide();
		            showToast('网络出错，请返回重试');
	    		}
	    	});
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
// var nopayOrderLock = false;
function ajaxCheckNopayOrder(callback) {
	// if(nopayOrderLock) return;
	// nopayOrderLock = true;
  var url = '/court/getOrderDue'
      url = typeof urlAddParams == 'function' ? urlAddParams(url) : url 
    $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        cache: false,
        success: function(res) {
        	
          var href = "'/order/pay?id=" + res.data.order.order_id + "'"
              href = typeof urlAddParams == 'function' ? urlAddParams(href) : href;
        	// $("#loading").addClass('hide');
        	// nopayOrderLock = false;
            if (res.data.order.order_status == 0 && res.data.count > 0&&res.data.order.pay_expire_left>0) {

            	submitLock = false;
        		$("#loading").addClass('hide');

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
                        d = "<p><span>日期：</span><span>" + new Date(res.data.book_date * 1000).format('yyyy年MM月dd日') + "（周" + getWeek(new Date(res.data.book_date * 1000).getDay()) + "）</span></p>",
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

                str += "<li><div id='book-Cancel' order_id='" + res.data.order.order_id + "'>取消订单</div><a id='book-href' order_id=" + res.data.order.order_id + " data-href="+href+"><div id='book-pay'>立即支付</div></a></li>";
                $(".book-noPaySprite").removeClass("hide").find("ul").html(str);
            } else {
                callback();
            }
        },
        error: function(res) {
        	submitLock = false;
        	$("#loading").addClass('hide');        	
        	// $("#loading").addClass('hide');
        	// nopayOrderLock = false;
        }
    });
}