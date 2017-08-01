<?php $this->display('public/header.php');?>
<style>
body{
    font-size: 12px;
}
li p { line-height:25px;display: inline-block;}
.bdline p{display: block;}
a:link, a:hover, a:visited {text-decoration:none; }
.qu .page-order .order-bd .info-list .t { width:4rem;}
.info-list { border:none !important;}
.info-list li { height:25px;}
.order_status { float:right; padding-right:10px;color:#666;}
.qu .page-order .order-bd .info-list .t {margin-right:0;}
.qu .page-order .order-bd .info-list img {margin:3px 10px 0 10px;vertical-align: sub;}
.flw { float:left; width:40%: overflow:hidden; font-size:12px;}
.frw { float:right; width:40%; font-size:12px;}
.frw .c { text-align:left;}
.btn-wrap a{margin:0 3px;}
.sr-content {
    position: absolute;
    top: 100px;
    bottom: 0;
    left: 0;
    right: 0;
    background: #f5f5f9;
}

#wrapper {
    position: absolute;
    left: 0;
    overflow: hidden;
    width: 100%;
    height: 100%;
}

#scroller {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    width: 100%;
}

#scroller ul:after {
    content: "";
    clear: both;
    display: block;
}
.qu .page-order .order-bd .info-list li:nth-of-type(3) .flw .c{
    width:8em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
text-align:left;
  }
  .qu .page-order .order-bd .info-list .t{
    margin-left:0;
  }
.qu .page-order{background-color: rgb(245,245,249);}


.loading {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #f5f5f9;
    z-index: 99999
}

.loading-icon {
    width: 60px;
    height: 60px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -30px;
    margin-left: -30px;
    background: url(/themes/qu201/images/loading.png) no-repeat;
    -webkit-background-size: cover;
    background-size: cover;
    -webkit-animation: rotate360 1s linear 0s infinite;
    -moz-animation: rotate360 1s linear 0s infinite;
    animation: rotate360 1s linear 0s infinite;
    -webkit-transform-origin: 50% 50%;
    -moz-transform-origin: 50% 50%;
    -ms-transform-origin: 50% 50%;
    -o-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    z-index: 99
}

@-moz-keyframes rotate360 {
    from {
        transform: rotateZ(0deg)
    }
    to {
        transform: rotateZ(360deg)
    }
}

@keyframes rotate360 {
    from {
        -webkit-transform: rotateZ(0deg);
        transform: rotateZ(0deg)
    }
    to {
        -webkit-transform: rotateZ(360deg);
        transform: rotateZ(360deg)
    }
}

@-webkit-keyframes rotate360 {
    from {
        -webkit-transform: rotateZ(0deg)
    }
    to {
        -webkit-transform: rotateZ(360deg)
    }
}

</style>
<script>window.nm_go_index=true</script>
<div id="loading" data-lock="1" class="loading">
    <div class="loading-icon"></div>
</div>
<div class="qu">
	<div class="page page-order page-orderList">
		<?php 
		$this->display('public/public_top.php', array(
				'topTitle'=>'我的订单',
				'leftMenu' => !in_array(CHANNEL_SOURCE,Config::$hideItem) ? '<a href="javascript:history.go(-1);" class="J_back"><i class="icon-back"></i></a>' : '<a href="'.baf_CHtml::createUrl('/user/index').'" class="J_back"><i class="icon-back"></i></a>',
				'rightMenu' => !in_array(CHANNEL_SOURCE,Config::$hideItem) ? '<a class="pay-ok-right" href="'.baf_CHtml::createUrl('/').'">首页</a>' : ''
		));
		?>
		<div class="order-hd">
			<ul>
				<li<?php if($type==1) echo ' class="cur"'?>><a href="<?= baf_CHtml::createUrl('/myorder/index?type=1');?>">待开始</a></li>
				<li<?php if($type==0) echo ' class="cur"'?>><a href="<?= baf_CHtml::createUrl('/myorder/index?type=0');?>">全部</a></li>
			</ul>
		</div>
		<div class="sr-content mobile-qq-myorder">
        	<div id="wrapper">
          		<div id="scroller">        
			        <div class="order-bd" id="no_pay_list" style="text-align: center;">
			        </div>
	    		</div>
			</div>
		</div>
        <div class="err">
			<p class="J_err"></p>
        </div>
	</div>
</div>
<script type="text/javascript" src="<?php echo TEMPLATE; ?>qu202/js/touchScroll.js"></script>
<script>
    var loadInterval = setInterval(function() {
        if ($(".loading").attr("data-lock") == "1") {
            $(".loading").addClass("hide").css("background-color","transparent");
            clearInterval(loadInterval);
        }
    }, 500);

	var myScroll,loadLock = false,ajaxPage=1,urlArr={};
	var orderStatus = <?php echo json_encode($orderStatus);?>;
	var refund = ['未退款','退款中','已退款'];
	myScroll = new TouchScroll({
        id: 'wrapper',
        'opacity': 0,
        ondrag: function(e, t) {
            if (isBottom()) {
                setTimeout(loadMoreElement, 1000);
            }
        }
    });

    
    urlArr = getURLInformation();
    
	loadMoreElement();
	// 上拉加载更多元素
	function loadMoreElement() {
	    if(!loadLock){
	        var callback = function(res) {
	            if(res.data.length<20){
	                loadLock = true;
	            }
	            var str = "";
	            for (var i = 0; i < res.data.length; i++) {
                    var code = '', amount = '',oStatus = '';

                    //验证码
                    if(res.data[i].order_type == 3){
                    	code = "会员卡";
                    	amount = "-";
                    }else{
                    	if(res.data[i].verification_code){
                    		code = res.data[i].verification_code;
                    	}else{
                    		code = "-";
                    	}
                    }

                    // 金额
                    if(res.data[i].order_type != 3){
                    	var a = res.data[i].order_amount;
                    	var b = Math.floor(a);
                    	if(a-b > 0){
                    		amount = a+"元";
                    	}else if(a-b == 0){
                    		amount = b+"元";
                    	}
                    }

                    // 订单状态
                    if(res.data[i].order_status == 5){
						oStatus = refund[parseInt(res.data[i].refund_status)];
                    }
                    else{
	                    oStatus =orderStatus[parseInt(res.data[i].order_status)];
                    }

                    // 开始时间+预约场号
                    var t = new Date();
                    t.setTime(res.data[i].start_time * 1000);
                    var t1 = t.format('MM/dd hh:mm');
                    var fileNo = res.data[i].field_no;

                    if(res.data[i].order_type == 1){
                    	t1 = "不限";
                    	fileNo = "-";
                    }

                    var cancelPay = '';
                    if(res.data[i].order_status == "0"){
                        cancelPay = '<div class="btn-wrap">'+ '<a href="javascript:void(0);" order_id='+res.data[i].order_id+' class="btn-gray btn-gray-s J_payCancel">取消</a>'+ '<a href="javascript:void(0);" order_id='+res.data[i].order_id+' class="btn-blue btn-blue-s J_payOrder">支付</a></div>';
                    }
                    var href = '/myorder/detail?id=' + res.data[i].order_id 
                        href = typeof urlAddParams == 'function' ? urlAddParams(href) : href; 
                        
	                str = str + '<div class="order-item">' + '<a href='+href+'>' + '<ul class="info-list">' + '<li class="bdline">' + '<span class="order_status">' + oStatus + '</span>' + '<p style="text-align:left;color:#636363;height:20px;overflow:hidden;"><img src="' + res.data[i].order_icon + '" width="16">' + res.data[i].order_title + '</p>' + '</li>' + '<li>' + '<div class="flw">' + '<p class="t">开始时间:</p>' + '<p class="c">' + t1 + '</p>' + '</div>' + '<div class="frw">' + '<p class="t">验证码:</p>' + '<p class="c">' + code + '</p>' + '</div>' + '</li>' + '<li>' + '<div class="flw">' + '<p class="t">预约场号:</p>' + '<p class="c">' + fileNo + '</p>' + '</div>' + '<div class="frw">' + '<p class="t">金额:</p>' + '<p class="c">' + amount + '</p>' + '</div>' + '</li>' + '</ul>' + '</a>'+cancelPay+ '</div>';
	            };
	            $("#no_pay_list").append(str);
	            if (ajaxPage == 1 && !res.data.length) {
	            	$("#no_pay_list").html('<img width="100%" src="/themes/qu/images/nodata@2x.png">');
	            }
	            ajaxPage++;
                var prevTop = $(".touchscrollelement").position().top;        
	            myScroll.resize();
                $(".touchscrollelement").css("top",prevTop);
	        };
	        var errorBack = errCallback;
	        ajaxLoadOrder(callback, errorBack);
	    }
	}

    $('.J_payList').click(function(){
            $(this).addClass('cur');
            $('.J_noPay').removeClass('cur');
            $('.J_cancelPay').removeClass('cur');
            $("#pay_list").show();
            $("#no_pay_list").hide();
            $("#cancel_list").hide();
        }
    );
    $('.J_noPay').click(function(){
            $(this).addClass('cur');
            $('.J_payList').removeClass('cur');
            $('.J_cancelPay').removeClass('cur');
            $("#pay_list").hide();
            $("#no_pay_list").show();
            $("#cancel_list").hide();
        }
    );
    $('.J_cancelPay').click(function(){
            $(this).addClass('cur');
            $('.J_noPay').removeClass('cur');
            $('.J_payList').removeClass('cur');
            $("#pay_list").hide();
            $("#no_pay_list").hide();
            $("#cancel_list").show();
        }
    );
    var cancelLock = false;
    $('#no_pay_list').on('tap', ".J_payCancel",function() {
        if(cancelLock) return;
        cancelLock = true;
        $("#loading").removeClass('hide');
        var url = '/order/Cancel?id='+ $(this).attr('order_id')
        url = typeof urlAddParams == 'function' ? urlAddParams(url) : url
        $.ajax({
    		url: url,
    		type: 'GET',
    		dataType: 'JSON',
    		cache: false,
    		success: function(res){
                var res=JSON.parse(res);
    			if(!(res && res.code == 1)){
                    cancelLock = false;  
                    $("#loading").addClass('hide');
                    showError(res.msg);    				   
                    setTimeout(function(){
                        location.reload();
                    },2000);
    			}else{
                    location.reload();
                }                
    		},
    		error: function(res){
    			cancelLock = false;
                $("#loading").addClass('hide');
    			$('.J_payCancel').html('取消中');
    			showError('网络出错，请稍后再试');
    		}
    	});
     });

    var payLock = false;
    $('#no_pay_list').on('tap', ".J_payOrder",function() {
        if(payLock) return;
        payLock = true;
        $("#loading").removeClass('hide');
        var url = '/order/pay?id=' + $(this).attr('order_id')
        // location.href = '/order/pay?id=' + $(this).attr('order_id');
        location.href = typeof urlAddParams == 'function' ? urlAddParams(url) : url;
        setTimeout(function(){
            payLock = false;
            $("#loading").addClass('hide');
        },3000)
     });

    function showError(msg) {
        $('.J_err').html(msg);
        $('.J_err').show();   
    }
	function hideError(){
	   $('.J_err').hide();
	}

	function isBottom() {
	    var delta = $(".touchscrollelement").height() - $("#wrapper").height() <= Math.abs($(".touchscrollelement").position().top);
	    if (delta)
	        return true;
	    else
	        return false;
	}

	// 链接转码
	function getURLInformation() {
	    var urlMsg = {};
	    if (window.location.href.split('#')[0].split('?')[1]) {
	        var urlSearch = window.location.href.split('#')[0].split('?')[1].split('&');
	    }

	    if (urlSearch) {
	        for (var i = 0; i < urlSearch.length; i++) {
	            urlMsg[urlSearch[i].split('=')[0]] = urlSearch[i].split('=')[1] || "";
	        }
	    }
	    return urlMsg;
	}

	// 接口请求
	function ajaxLoadOrder(callback, errorCallback) {
		var orderType = 0;
		<?php
		echo "orderType =".$type.";";
		?>
		if(urlArr.type){
			orderType = urlArr.type
		}
        var url = '/myorder/orderList?action=order_get_order_list' + "&page=" + ajaxPage + "&client_time=" + newDate() + "&type=" +orderType
            url = typeof urlAddParams == 'function' ? urlAddParams(url) : url
	    $.ajax({
	        type: 'get',
	        url: url,
	        success: function(data) {
	            try {
	                var res = data;
	                callback(res);
	            } catch (e) {
	                console.log(e);
	                var res = JSON.parse(data);
	                callback(res);
	            }
	        },
	        error: function(xhr, type) {
	            errorCallback(type);
	            alert('网络错误');
	        }
	    })
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

	function errCallback(res) {
	    myScroll.resize();
	}

	function newDate() {
	    return parseInt(new Date().getTime() / 1000);
	}
</script>
<?php $this->display('public/footer.php');?>