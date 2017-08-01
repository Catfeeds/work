/**
 * 显示增加和减少数量的弹出层
 * 
 * @return void
 * @author xiaosibo
 */
function showMinusPlusDialog()
{
	var template = '';
    template +='<div class="info-ul dialog_num_select">';
    template +='<button type="button" class="n_minus" id="n_minus">&nbsp;</button>';
    template +='<input type="text" class="n_input" id="n_input" value="1" max="'+$('#goods_number').attr('max')+'" min="1" onkeyup="checkInputNmuValue(this)"/>';
    template +='<button type="button" class="n_plus n_plus_active" id="n_plus">&nbsp;</button>';
    template +='</div>';
    
	// 显示弹出层
	$.dialog({
        content : template,
        title : null,
        ok : function() {
            var num = $('#n_input').val();
            // 设置商品的数量
        	$('#goods_number').val(num);
        	checkInputNmuValue(document.getElementById('goods_number'));        	
            resetActivity();//重置活动
            resetCoupon();//重置活动
            resetAmount();//计算价格
            getActivityList($('input[name=goods_ids]').val(), num); //重新获取活动
        },
        cancel : function() {
        	checkInputNmuValue(document.getElementById('goods_number'));
        }
    });

	// 设置商品数量并获取焦点
	$('#n_input').val($('#goods_number').val()).focus().blur(function(){
        var _this = $(this);
        // 输入空时自动设置为1
        if(!_this.val()){
            _this.val(1);
        }
        // 当数量超过商品最大数量时， 自动设置为商品的最大数量
        if (parseInt(_this.val()) > parseInt(_this.attr('max'))) {
            _this.val(_this.attr('max'));
        }
    });
	
	// 减少订单商品的数量
    $('#n_minus').on('click', function(){
        var n = parseInt($('#n_input').val());
        if (n > 1) {
            if (n == 2) {
            	$(this).removeClass('n_minus_active');
            }
        	$('#n_input').val(n - 1);
        	$('#n_plus').addClass('n_plus_active');
        } else {
            $(this).removeClass('n_minus_active');
        }
        checkInputNmuValue(document.getElementById('n_input'));
    });
    
    // 增加订单商品的数量
    $('#n_plus').on('click', function(){
    	var n = parseInt($('#n_input').val());
        if (n > 0) {
        	$('#n_minus').addClass('n_minus_active');
        }
        // 获取商品的数量
        var maxNum = parseInt($('#n_input').attr('max'));
        maxNum = maxNum>0 ? maxNum : 999;
        n += 1;
        // 超出商品的数量了
        if (n > maxNum) {
        	$('#n_input').val(maxNum);
            $(this).removeClass('n_plus_active');
        } else {
            if (n == maxNum) {
                $(this).removeClass('n_plus_active');
            }
            $('#n_input').val(n);
        }
        
        checkInputNmuValue(document.getElementById('n_input'));
    });
    checkInputNmuValue(document.getElementById('goods_number'));
}

/**
 * 输入数值限制
 * @param o
 */
function checkInputNmuValue(o){
	var maxNum = parseInt($('#n_input').attr('max'));
    maxNum = maxNum>0 ? maxNum : 999;
	o.value=o.value.replace(/[^0-9]/g,'');
	if(o.value>=maxNum){
		o.value = maxNum;
		$('#n_plus').removeClass('n_plus_active');
		$('.n_plus').removeClass('n_plus_active');
		$('#n_minus').addClass('n_minus_active');
		
	}else{
		$('#n_plus').addClass('n_plus_active');
		$('.n_plus').addClass('n_plus_active');
		$('.n_minus').addClass('n_minus_active');
	}
	if(o.value<=1){
		o.value = 1;
		$('#n_plus').addClass('n_plus_active');
		$('#n_minus').removeClass('n_minus_active');
		$('.n_minus').removeClass('n_minus_active');
	}
	
}

/**
 * 获取优惠活动列表并设置默认活动
 * 
 * @param integer goodsId 商品id
 * @param integer num     商品数量
 * @return void
 * @author xiaosibo
 */
function getActivityList(goodsId, num)
{
    // 显示加载等待
    var load = $.dialog({
        content : getLoadImg(),
        title : null,
        lock: false
    });

    $.ajax({
       url: '/order/confirmOrder',
       type: 'get',
       dataType: 'json',
       cache: false,
       data: {
           'number': num,
           'type': 1,
           'goods_ids': goodsId
       },
       success: function(res){
           load.close(); // 关闭加载等待
           if(res.code == 1){
                var actList = res.data.activity_list; // 活动列表
                var defaultActId = res.data.act_id; // 默认选中的活动id
                var actLength = actList.length; // 活动总数
                
                if (defaultActId > 0 && actLength > 0) {
                    var defaultAct = {}; // 默认活动
                    $('.activity_ul').empty(); // 清空所以活动
                    
                    for (var i = 0; i < actLength; i++) {
                        // 只显示可用的活动
                        if (actList[i].status == 1) {
                            // 默认活动
                            if (actList[i].act_id == defaultActId) {
                                defaultAct = actList[i];
                            }
                            var _li = '';
                            
                            // 如果是最后一个li，则添加last类。 如果是默认的那一个活动，则选中
                            _li += '<li><span class="left act_name">' + actList[i].act_name + '</span>';
                            _li += '<span class="radio right ' + ((actList[i].act_id == defaultActId) ? 'radio_active': '') + '" dataId="' + actList[i].act_id + '" dataName="' + actList[i].act_name + '" dataAmount="' + actList[i].act_amount + '">&nbsp;</span>';
                            _li += '</li>';
                            
                            $('.activity_ul').append(_li);
                        }
                    }

                    // 设置默认优惠活动
                    setActivity(defaultActId, defaultAct.act_name, defaultAct.act_amount);
                    $('.act_select').show();
                } else {
                    // 清除优惠活动信息
                    setActivity(0, '', 0);
                    $('.act_select').hide(); 
                }
           }else{
               alert(res.msg);
           }
        },
        error: function(res){
           load.close(); // 关闭加载等待
           alert('网络出错，请稍后再试');
        }
    });
}

/**
 * 显示优惠活动选择层
 * 
 * @return void
 * @author xiaosibo
 */
function showActivityDialog()
{
	// 显示弹出层
	/*var act_layer = $.dialog({
        content : $('.act_radio_container').html(),
        title : '选择优惠'
    });*/

	// 选择优惠活动
    $('.activity_ul').on('click', 'li', function(){
        var _li = $(this);
        var _radio = _li.find('.radio');
        var _li_index = _li.index();
        
        // 修改弹出层 radio 选项的焦点
        _li.siblings().find('.radio').removeClass('radio_active');
    	_radio.addClass('radio_active');
        
        // 修改模板中的 radio 选项的焦点
        $('.act_radio_container .activity_ul li').each(function(i, n){
            var originalRadio = $(n).find('.radio');
            if (_li_index == i) {
                originalRadio.addClass('radio_active');
            } else {
                originalRadio.removeClass('radio_active');
            }
        });

    	// 设置优惠活动
        setActivity(_radio.attr('dataId'), _radio.attr('dataName'), _radio.attr('dataAmount'));

        // 关闭弹出层
    	act_layer.close();
    });
}

/**
 * 设置优惠活动并修改对应的价格
 * 
 * @param integer id     活动id
 * @param string  name   活动名称
 * @param float   amount 活动优惠的金额
 * @return void
 * @author xiaosibo
 */
function setActivity(id, name, amount)
{
	$('#act_name').text(name).show();
    $('#act_price').text(amount + '元').show();
    $('#act_price').siblings('.btn').hide();
    $('#J_payActId').val(id);
    $('#J_payActId').attr('amount', amount);
    // 计算订单总金额
    //calculateOrderAmount();
    resetCoupon();
    resetAmount();
}

/**
 * 计算订单总金额
 *
 * @return void
 * @author xiaosibo
 */
function calculateOrderAmount()
{
	var n = parseInt($('#goods_number').val()); // 数量
	var price = Number($('#unit_price').text()); // 单价
	var totoalAmount = price * n; // 总计金额
	var actPrice = Number($('#act_price').text()); // 活动金额
    var orderAmount = parseFloat((totoalAmount - actPrice).toFixed(2)); // 订单金额
    
	// 订单总金额
	$('#totoal_amount').text(parseFloat(totoalAmount.toFixed(2)));
    // 订单金额
	$('#order_amount').text(orderAmount);
}

/**
 * 新增订单
 *
 * @param integer goodsId 商品名称
 * @param integer number  商品数量
 * @param integer actId   活动id
 * @return void
 * @author xiaosibo
 */
function addOrder(goodsId, number, actId, couponId)
{
    ajaxCheckNopayOrder(callback);

    function callback(){
        // 显示加载等待
        var load = $.dialog({
            content : getLoadImg(),
            title : null,
            lock: false
        });
        
        $.ajax({
            url: '/order/Doconfirm',
            type: 'post',
            dataType: 'json',
            cache: false,
            data: {
               'number': number,
               'order_type': 1,
               'act_id': actId,
               'goods_ids': goodsId,
               'coupon_id':couponId
            },
            success: function(res){
                load.close(); // 关闭加载等待
                if (res.code == 1) {
                    window.location.replace('/order/pay?id=' + res.data);
                } else {
                   alert(res.data);
                }
            },
            error: function(res){
               load.close(); // 关闭加载等待
               alert('网络出错，请稍后再试');
            }
        });
    }
}

/**
 * 获取加载等待的图片
 *
 * @return string
 * @author xiaosibo
 */
function getLoadImg()
{
    return (typeof load_img != 'undefined') ? '<img src="' + load_img + '"/>' : '<span style="color: #999">加载中...</span>';
}


/**
 * 优惠券选择类
 */
var Coupon = {
	toggleCouponSelect:function(){
		var coupon = $('#coupon_id');
		var cbtn = $('#use_coupon');
		var tips = ['点击使用卡券','<em>取消使用</em>'];
		var totalAmount = parseInt($('#totoal_amount').html());
		if(parseInt(coupon.val()) > 0){
			resetCoupon();
			resetAmount();
		}else{
			cbtn.html(tips[1]);
		}
	},
	
	selectCoupon:function(data){
		this.toggleCouponSelect();
		var couponId = parseInt(data.id);		
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
		var goodsAmount = parseFloat($('#totoal_amount').html());
		var nums = parseInt($('#goods_number').val());
		if(couponId > 0){
			this.toggleCouponSelect();
		}else{
			$('.loading').removeClass('hide');
			$.ajax({
	    		url: '/Coupon/SelectCoupon',
	    		type: 'POST',
	    		dataType: 'html',
	    		cache: false,
	    		data: {
	                goods_ids: goodsIds, order_type: 1, amount:goodsAmount, goods_nums:nums
	    		},
	    		success: function(res){
	    			$('#coupon_waper').html(res);
	    			$('#coupon_waper div.page').css('min-height',$(window).height());
	    			$('#coupon_waper').css({'min-height':$(document).height(), 'display':'block'}); 	
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
    $('#J_payActId').attr('amount', 0);
    $('#act_name, #act_price').html('').hide();
    $('#act_price').text('点击选择活动').show()
}

function resetAmount(){
	var n = parseInt($('#goods_number').val()); // 数量
	var price = Number($('#unit_price').text()); // 单价
	var totalAmount = price * n; // 总计金额
	
	var payAmount = totalAmount;
	var actId = $('#J_payActId').val();
	var priceChange = 0;
	var pfix = '元';
	if(actId>0){
		priceChange = $('#J_payActId').attr('amount');		
	}else{
		var couponId = $('#coupon_id').val();
		if(couponId>0){
			priceChange = $('#coupon_id').attr('amount');	
		}
	}
	
	payAmount = priceChange > 0 ? Math.max(totalAmount - priceChange, 0) : payAmount;
	payAmount = Math.round(payAmount*100)/100;
	$('#totoal_amount').html(totalAmount + pfix);
	$('#order_amount').html(payAmount + pfix);
	$('#promote_price').html(priceChange + pfix);
	//console.log(priceChange);
}

// 调用未支付订单接口
function ajaxCheckNopayOrder(callback){
    $.ajax({
        url: '/court/getOrderDue',
        type: 'get',
        dataType: 'json',
        cache: false,
        success: function(res){
            console.log(res)
            // lock = false;
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

                str += "<li><div id='book-Cancel' order_id='"+res.data.order.order_id+"'>取消订单</div><a id='book-href' order_id="+res.data.order.order_id+" data-href='/order/pay?id="+res.data.order.order_id+"'><div id='book-pay'>立即支付</div></a></li>";
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
    $.ajax({
        url: '/order/Cancel',
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
        url: '/order/beforepay',
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