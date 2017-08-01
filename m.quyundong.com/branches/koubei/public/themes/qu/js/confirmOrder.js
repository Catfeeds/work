var lock = false;
var selock = false;
var showError = function(msg) {
	$('.J_err').html(msg);
	$('.J_err').show();
};

var hideError = function(){
	$('.J_err').hide();
};

$(".paytype_select").on("change","input",function(){
	if($("input[value='online']").prop("checked")){
		$(".order-tip").removeClass("hide").html("请认真核对场次信息，售出场次不退不换，付款保证100%有场。提交订单请<span>10分钟</span>内完成付款，否则场地不予保留。");
		$(".pay_info2").removeClass("hide");
		$(".pay_info").addClass("hide");
		$(".pay_online_tab").removeClass("hide");
	}else if($("input[value='usercard']").prop("checked")){
		$(".order-tip").removeClass("hide").html("<img src='/themes/qu/images/tip.png' style='width:13px;'>退订规则请以场馆说明为准");
		$(".pay_info").removeClass("hide");
		$(".pay_info2").addClass("hide");
	}
})

$('.J_submit').on('click', function() {
    ajaxCheckNopayOrder(callback);

	function callback(){
		if(lock){
			return;
		}

		if(!$("input[value='online']").prop("checked") && !$("input[value='usercard']").prop("checked")){
			showToast("请先选择支付方式");
			return;
		}

	    var uid = $("#client_id").val();
	    var userHasCard = $("#user_has_card").val();
	    var phone = sms_code = 0;
	 
		hideError();
		lock = true;
		$('.J_submit').html('提交订单中...');
	    var postData = {
			goods_ids: $('#J_payGoodsId').val(),
	        act_id: $('#J_payActId').val(),
	        code: sms_code,
	        bid: $('#J_payBid').val(),
	        cid: $('#J_payCid').val(),
	        coupon_id: $('#coupon_id').val(),
	        utm_source: utmSource,
	        pay_type: $('input[name=paytype]:checked').val(),
	        card_no: $('input[name=usercard]:checked').val() ? $('input[name=usercard]:checked').val() : '',
	        hash: $('#J_payHash').val()	
	    }
          postData = typeof objMerge == 'function' ? objMerge(postData) : postData
	    $.ajax({
			url: '/order/doconfirm',
			type: 'GET',
			dataType: 'JSON',
			cache: false,
			data: postData,
			success: function(res){
				lock = false;
	            var res=JSON.parse(res);
				if(res && res.code == 1){
				    if (res.data > 0){
						$('.J_submit').html('订单已提交');
						var url = '/order/pay?id='+res.data;
						if(utmSource) url += '&utm_source='+utmSource;
						window.location.replace(typeof urlAddParams == 'function' ? urlAddParams(url) : url);
						//location.href = '/order/pay?id='+res.data;
					}else{
						showError('订单提交出错，请后退返回重试！');
						$('.J_submit').html('提交订单');
					}
				} else {
					showError(res.msg);
					$('.J_submit').html('提交订单');
				}
			},
			error: function(res){
				lock = false;
				$('.J_submit').html('提交订单');
				showError('网络出错，请返回重试');
			}
		});
	}
});
$('.J_getCode').on('click', function() {
	sendSms();
});

var HASH = getCookie('wx_hash');
function sendSms(){
    if(selock){
		return;
	}
    var tel = $('.J_phone').val();
    if(!tel || !/1[2345678]{1}\d{9}$/.test(tel)){
	   showError('请输入正确的手机号');		
	   return;
	}

	hideError();
	selock = true;
    var postData = {
        phone: tel,
        type: $('.J_sms_type').val(),
        hash:HASH
     }
        postData = typeof objMerge == 'function' ? objMerge(postData) : postData
    $.ajax({
	   url: '/sms/sendCode',
	   type: 'post',
	   dataType: 'json',
	   cache: false,
	   data: postData,
	   success: function(res){
		   if(res.hash) HASH = res.hash;
	       if(res.code == 1){
                showError('验证码已经发送');
                $("#wait").unbind(); 
                $("#wait").attr("style", "background:#909090");
                var wait = document.getElementById("wait");
                totaltime=59;
                var interval = setInterval(function(){
                	var time = --totaltime;
                        wait.innerHTML="重新获取("+time+"S)";
                	if(time === 0) {
                	    wait.innerHTML="重新获取验证码";   
                		clearInterval(interval);
                        $("#wait").attr("style","background:#74affb");
                        $('#wait').bind("click", function(){  
                          sendSms();  
                        });  
                	};
                }, 1000);
	       }else{
	           showError(res.msg);
	       }
	   },
	   error: function(res){
	       showError('网络出错，请稍后再试');
	   }
	});
}

/**
 * 优惠券选择类
 */
var Coupon = {
	toggleCouponSelect:function(){
		var coupon = $('#coupon_id');
		var cbtn = $('#use_coupon');
		var tips = ['点击使用卡券','<em>取消使用</em>'];
		var orderAmount = parseFloat($('#pay_amount').attr('amount'));
		if(parseInt(coupon.val()) > 0){
			resetCoupon();
		}else{
			cbtn.html(tips[1]);
		}
		resetAmount();
	},
	
	selectCoupon:function(data){
		this.toggleCouponSelect();
		var couponId = parseInt(data.id);
		var orderAmount = parseFloat($('#pay_amount').attr('amount'));
		var payAmount = orderAmount;
		if(orderAmount && data.amount){
			payAmount = orderAmount > data.amount ? orderAmount - data.amount : 0;
		}
		$('#coupon_id').val(couponId);	
		$('#coupon_id').attr('amount', data.amount);
		$('#use_coupon').parent().find('span').html(data.amount + '元');
		$('#coupon_waper').html('');
		$('#coupon_waper').hide();
		resetActivity();
		resetAmount();		
	},
	
	getCouponList:function(){
		var couponId = parseInt($('#coupon_id').val());
		var goodsIds = $('input[name=goods_ids]').val();
		var goodsAmount = parseFloat($('#use_coupon').attr('amount'));
		if(couponId > 0){
			this.toggleCouponSelect();
		}else{
			$('.loading').removeClass('hide');
      var postData = {
                  goods_ids: goodsIds, order_type: 0, amount:goodsAmount
          }
          postData = typeof objMerge == 'function' ? objMerge(postData) : postData
			$.ajax({
	    		url: '/Coupon/SelectCoupon',
	    		type: 'POST',
	    		dataType: 'html',
	    		cache: false,
	    		data: postData,
	    		success: function(res){
	    			$('#coupon_waper').html(res);
	    			$('#coupon_waper div.page').css('min-height',$(document).height());
	    			$('#coupon_waper').css({'min-height':$(window).height(), 'display':'block'}); 	
	    			$('.loading').addClass('hide');
	    		},
	    		error: function(res){
	    			$('.loading').hide();
		            alert('网络出错，请返回重试');
	    		}
	    	});
		}
	}
}


var UserCard = {
	toggle:function(show){
		if(show){
			$('.usercard_tab').show();
		}else{
			$('.usercard_tab').hide();
		}
	},
	
	reset:function(check){
		var card = $('input[name=usercard]');
		card.prop('checked',false);
		if(check){
			card.eq(0).prop('checked', true);
			this.toggle(true);
		}else{
			this.toggle(false);
		} 
	}
}

function resetCoupon(){
	var coupon = $('#coupon_id');
	var cbtn = $('#use_coupon');
	var tips = ['点击使用卡券','<em>取消使用</em>'];
	coupon.val(0);	
	coupon.attr('amount', 0);
	cbtn.parent().find('span').html('');
	cbtn.html(tips[0]);
}

//重置活动选择
function resetActivity(){
	$('#J_payActId').val(0);
	$('.radio_btn_active').removeClass('radio_btn_active');
}

function resetAmount(){
	var actId = $('#J_payActId').val();
	var priceChange = 0;
	var pfix = '元';
	if(actId>0){
		priceChange = $('#actitem_'+actId).attr('data_amount');		
	}else{
		var couponId = $('#coupon_id').val();
		if(couponId>0){
			priceChange = $('#coupon_id').attr('amount');	
		}
	}
	
	var payPrice = Math.round((Math.max(amount - priceChange, 0))*100)/100;
	$('#pay_amount').html(payPrice + pfix);
	$('#promote_price').html(priceChange + pfix);
	//console.log(priceChange);
}

// 显示提示信息

// 调用未支付订单接口
function ajaxCheckNopayOrder(callback){
    var url = '/court/getOrderDue'
        url = typeof urlAddParams == 'function' ? urlAddParams(url) : url
    $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        cache: false,
        success: function(res){
            // console.log(res)
            // lock = false;
            var href = "/order/pay?id="+res.data.order.order_id
                href = typeof urlAddParams == 'function' ? urlAddParams(href) : href;
            if(res.data.order.order_status == 0 && res.data.count > 0){
                var str = "",goods_list="";
                str += "<li>您尚有未支付的订单</li>";

				if (res.data.order.order_type == 0 || res.data.order.order_type == 3) {
                    //场次订单
                    for(var i=0;i<res.data.order.goods_list.length;i++){
                        goods_list += "<em>"+new Date(res.data.order.goods_list[i].start_time*1000).format("hh:mm")+"-"+new Date(res.data.order.goods_list[i].end_time*1000).format("hh:mm")+" "+res.data.order.goods_list[i].course_name+" "+getMoney(res.data.order.goods_list[i].shop_price)+"元</em>";
                    }
                    var n = "<p>"+res.data.order.name+"</p>",
                        d = "<p><span>日期：</span><span>"+new Date(res.data.time*1000).format('yyyy年MM月dd日')+"（周"+getWeek(new Date(res.data.time*1000).getDay())+"）</span></p>",
                        p = "<p><span>场地：</span><span>"+goods_list+"</span></p>",
						t = "<p><span>共计：</span><span>" + getMoney(res.data.order.order_amount) + "元</span></p>";
                    
                    str += "<li>"+n+d+p+t+"</li>";

                }else{
                    var n2 = "<p>"+res.data.order.name+"</p>",
                        tc = "<p><span>套餐：</span><span>"+res.data.order.goods_list[0].goods_name+"</span></p>",
                        num = "<p><span>数量：</span><span>"+res.data.order.goods_list[0].goods_number+"</span></p>",
						tt = "<p><span>共计：</span><span>" + getMoney(res.data.order.order_amount) + "元</span></p>";
                    str += "<li>"+n2+tc+num+tt+"</li>";
                }

                str += "<li><div id='book-Cancel' order_id='"+res.data.order.order_id+"'>取消订单</div><a id='book-href' order_id="+res.data.order.order_id+" data-href='"+href+"' ><div id='book-pay'>立即支付</div></a></li>";
                $(".book-noPaySprite").removeClass("hide").find("ul").html(str);
            }else{
                callback();
            }
        },
        error: function(res){
            // lock = false;
            $('.J_submit').html('<div>普通登录</div>');
            showToast('网络出错，请稍后再试');
        }
    });
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
                 format = format.replace(RegExp.$1, RegExp.$1.length == 1
                        ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
          }
   }
   return format;
}

function getWeek(dd){
    var weeks = ["日","一","二","三","四","五","六"];
    return weeks[dd];
}
function getMoney(mon){
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

//显示toast
function showToast(errMsg) {
    $(".toast .toast-msg").text(errMsg);
    $(".toast").removeClass('hide');
    setTimeout(function(){
        $(".toast").animate({"opacity":0},300,function(){
            $(this).css("opacity",1).addClass("hide");
        })
    },1000);
}

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