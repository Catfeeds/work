var baseUrl = "",ajaxType="POST";

$(window).on("load",function(){
	var loadInterval = setInterval(function() {
        if ($(".loading").attr("data-lock") == "1") {
            $(".loading").addClass("hide");
             if ($('#coupon_waper').hasClass('hide')) {
                $(".main").removeClass("hide");
                $('.main').css('display',"block");
             }
            clearInterval(loadInterval);
        }
    }, 500);

	location.href.indexOf("localhost") > -1 ? baseUrl = "/activity/" : "";

    // 页面加载完毕调用未支付订单接口
    ajaxCheckNopayOrder();

	// 获取卡券列表
	$('#use_coupon').click(function(){
        if($(this).hasClass('disable')) return;

        var oForm = $(".order-login");
        var oName = $("input[name^='name']",oForm);
        var oPhone = $("input[name^='phone']",oForm);
        var oCard = $("input[name^='card']",oForm);
        var oNum = $("#n_num");

        $.each(oName,function(i,item){
            userInfoStore($(item),'act_user_name'+i);
        })

        $.each(oPhone,function(i,item){
            userInfoStore($(item),'act_user_phone'+i);
        })

        $.each(oCard,function(i,item){
            userInfoStore($(item),'act_user_card'+i);
        })
        userInfoStore(oNum,'act_user_num');

        Coupon.getCouponList();
	});

    // 是否选择使用卡券  
    $("#use_coupon").on('click','i',function(e){
        Coupon.cancelSelectCoupon();
    })
    
	// 调用取消订单接口
	var cancelLock = false;
	$('.book-noPaySprite').on("click","#book-Cancel",function() {
	    var order_id = $(this).attr('order_id');
	    if(cancelLock){
	        return;
	    }
	    cancelLock = true;
        var url = baseUrl + '/order/Cancel'
            url = typeof urlAddParams == 'function' ? urlAddParams(url) : url
	    $.ajax({
	        url: url,
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
        var url = baseUrl +  '/order/beforepay'
            url = typeof urlAddParams == 'function' ? urlAddParams(url) : url
	    $.ajax({
	        url: url,
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

var Coupon = {

	cancelSelectCoupon:function(){
        $('#coupon_id').val(0);
        $('#coupon_id').attr('amount', 0);
        $("#use_coupon").find("span").text("点击使用卡券");
        $('#use_coupon').removeClass('disable');
        $('#use_coupon i').addClass('hide');
        calTotalMoney();
	},

	selectCoupon:function(data){
        var couponId = parseInt(data.id);
        $('#coupon_id').val(couponId);
        $('#ticket_type').val(data.ticket_type);
        $('#coupon_id').attr('amount', data.amount);
        $('#use_coupon').addClass('disable');
        $('#use_coupon span').html(data.amount + '元');
        $('#use_coupon i').removeClass('hide');
        $('#coupon_waper').html('').hide();
        $(".main").css('display',"block");
        calTotalMoney();
	},

	getCouponList:function(){
        var couponId = parseInt($('#coupon_id').val());
        var goodsIds = $('input[name=goods_ids]').val();
        var goodsAmount = parseFloat($('#use_coupon').attr('amount'));
        $('.loading').removeClass('hide');
        var postData = {
                goods_ids: goodsIds, order_type: 1, amount:goodsAmount
            }
            postData = typeof objMerge == 'function' ? objMerge(postData) : postData
        $.ajax({
            url: baseUrl + '/Coupon/SelectCoupon',
            type: 'POST',
            dataType: 'html',
            cache: false,
            data: postData,
            success: function(res){
                $(".main").css('display',"none");
                $('.loading').addClass('hide');
                var htmlStr = res;
                $('#coupon_waper').html(htmlStr).removeClass('hide').show();
            },
            error: function(res){
                $('.loading').addClass('hide');
                showToast('网络出错，请返回重试');
            }
        });
	}
}

// 姓名检查
function checkName(name){
    var reg = new RegExp("^[\\u4E00-\\u9fd0]+$", "g");
    if(name && reg.test(name)){
        return true;
    }else{
        return false;
    }
}

// 手机号检查
function checkPhone(tel){
    if(tel && /1[2345678]{1}\d{9}$/.test(tel)){
        return true;
    }else{
        return false;
    }
}

// 身份证号检查
function checkIdNumber(num) {
    var num = num + "";
    if (num.length === 18) {
        return !!checkIdNumber18(num);
    } else if (num.length === 15) {
        return !!checkIdNumber15(num);
    } else {
        return false;
    }
}

function checkIdNumber15(num) {
    if (!isNumber(num)) {
        return false;
    }
    var newDate = getDateFromId(num);
    if (!checkDate(newDate)) {
        return false;
    }
    return true;
}

function checkIdNumber18(num) {
    if (!checkIdLastNumber(num)) {
        return false;
    }
    var head = num.slice(0, 17);
    if (!isNumber(head)) {
        return false;
    }
    var newDate = getDateFromId(num);
    if (!checkDate(newDate)) {
        return false;
    }
    var lastNumber = num[num.length - 1];
    var verifyNumber = idVerify(num);
    if (lastNumber.toLocaleLowerCase() == verifyNumber) {
        return true;
    } else {
        return false;
    }
}

function checkIdLastNumber(num) {
    var last = num[num.length - 1];
    return !!(last === "X" || last === "x" || isNumber(last));
}

function isNumber(num) {
    return !!(!isNaN(num - "0"));
}

function getDateFromId(num) {
    var num = num + "";
    var date = null;
    if (num.length == 15) {
        date = getDate(num, 15);
    } else if (num.length == 18) {
        date = getDate(num, 18);
    } else {
        return false;
    }
    return date;
    function getDate(num, type) {
        var newDate = null;
        if (type == 15) {
            var date = "19" + num.slice(6, 12);
            var year = date.slice(0, 4);
            var mon = date.slice(4, 6);
            var day = date.slice(6);
            var newDate = year + "-" + mon + "-" + day;
            return newDate;
        }

        if (type == 18) {
            var date = num.slice(6, 14);
            var year = date.slice(0, 4);
            var mon = date.slice(4, 6);
            var day = date.slice(6);
            var newDate = year + "-" + mon + "-" + day;
            return newDate;
        }
    }
}

function checkDate(date) {
    var date = date + "";
    return !!(new Date(date).getDate() == date.substring(date.length - 2));
}

function idVerify(num) {
    var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    var verifyNumberList = ['1', '0', 'x', '9', '8', '7', '6', '5', '4', '3', '2'];
    if (num.length !== 18) {
        return false;
    }
    var num = num + "";
    var newNum = num.slice(0, 17).split("");

    var checksum = 0;

    var mod = null;

    for (var i = 0; i < factor.length; i++) {
        checksum += factor[i] * (newNum[i] * 1);
    }

    mod = checksum % 11;

    return verifyNumberList[mod];
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
    var postData = {}
        postData = typeof objMerge == 'function' ? objMerge(postData) : postData
    $.ajax({
        url: baseUrl + '/court/getOrderDue',
        type: ajaxType,
        data:postData,
        dataType: 'json',
        cache: false,
        success: function(res) {
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

                str += "<li><div id='book-Cancel' order_id='" + res.data.order.order_id + "'>取消订单</div><a id='book-href' order_id=" + res.data.order.order_id + " data-href='/order/pay?id=" + res.data.order.order_id + "'><div id='book-pay'>立即支付</div></a></li>";
                $(".book-noPaySprite").removeClass("hide").find("ul").html(str);
            } else {
            	if(callback && typeof callback === "function"){
	                callback();
            	}
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            showToast(XMLHttpRequest+'_'+textStatus+'_'+errorThrown);
        	// showToast("网络出错，请返回重试");
        }
    });
}

function setCookieOver(c_name,value,expiretime)
{
    var exdate=new Date()
    exdate.setHours(exdate.getHours()+expiretime)
    document.cookie=c_name+ "=" +escape(value)+
        ((expiretime==null) ? "" : ";expires="+exdate.toGMTString())
}

function userInfoStore(dom,key){
    if(dom && dom.length > 0){
        var v;
        if(dom[0].tagName === 'LI'){
            v = dom.text()
        }else{
            v = dom.val()
        }
        if(!getCookie(key)){
            setCookieOver(key,v,2);
        }else{
            setCookieOver(key,v,2);
        }
    }
}

function autoFill(){
    formHtmlFill();

    var oForm = $(".order-login");
    var oName = $("input[name^='name']",oForm);
    var oPhone = $("input[name^='phone']",oForm);
    var oCard = $("input[name^='card']",oForm);
    var oNum = $("#n_num");

    $.each(oName,function(i,item){
        userInfoFill($(item),'act_user_name'+i);
    })

    $.each(oPhone,function(i,item){
        userInfoFill($(item),'act_user_phone'+i);
    })

    $.each(oCard,function(i,item){
        userInfoFill($(item),'act_user_card'+i);
    })
    userInfoFill(oNum,'act_user_num');

    var num = getCookie('act_user_num') || 1;
    setGoodsNum(num);
}

// 根据cookie填充表单结构
function formHtmlFill(){
    var aUl = $("form[name='activity']").find('ul');
    var num = getCookie('act_user_num') || 1;

    if(aUl.size() <= 0 || num <= 1) return;

    var ulHtml = aUl.eq(0).html();
    var str ='';
    for(var i=0;i<num-1;i++){
        str += '<ul class="common-menu order-login joinner_message newJoin">'+ulHtml+'</ul>';
    }
    $("form[name='activity']").append(str);
}

function userInfoFill(dom,key){
    if(dom.length > 0){
        var value = getCookie(key);
        if(value && dom[0].tagName === 'LI'){
            dom.text(value)
        }else if(value){
            dom.val(value)
        }
    }
}
