<?php 
	if(isset($order['status']) && $order['status'] == '0000' && $order['order_type'] == 3 && $payIds && in_array(15, $payIds)){
		$this->display('order/cardpay.php');
	}else{
?>
<?php $this->display('public/header_202.php');?>
		<link href="/themes/qu202/css/paylist.css" type="text/css" rel="stylesheet">
		<body data-design-width="750">
		<div id="loading" data-lock="1" class="loading">
			<div class="loading-icon"></div>
		</div>
		<div class="main hide" data-password="<?=$issetPw?>">
			<?php
			$book_date = date('Y-m-d', time());
			if (isset($order['goods_list']) && !empty($order['goods_list'])) {
				foreach ($order['goods_list'] AS $v) {
					$book_date = $v['book_date'];
					break;
				}
			}
			if (!in_array(UTM_SOURCE, Config::$source4Nothing)) {
				?>
				<div class="header">
					<div class="left"><i onClick="history.back(-1);" class="icon-back"></i></div>
					<div class="center">支付</div>
					<div class="right" style="text-align: right;" onClick="window.location.href='<?= baf_CHtml::createUrl('/order/help');?>'">帮助</div>
				</div>
			<?php } ?>

			<?php
			//订单是否读取成功
			if (isset($order['status']) && $order['status'] == '0000') {
				if($order['order_type']==1){
					$goods = $order['goods_list'][0];
				}
				?>
				<ul class="login-header">
					<li>
						<div>订单名称</div>
						<div>
						<?php
						if ($order['order_type']==8){
							echo $order['order_name']. "场拼场";//$order['name'].
						}
						elseif($order['order_type']==1){
							echo $order['name'] . $goods['goods_name'];
						}
						else {
							echo $order['name'] . "场地费用";
						}
						?>
						
						</div>
					</li>
				</ul>
				<ul class="login-header">
                    <?php if(($order['user_balance']>0 || $order['user_money']>0) && !in_array(UTM_SOURCE, Config::$source4Nothing)){ ?>
					<li class="li_balance_pay"<?php if($order['user_money']>0) echo ' status="selected"'?>>
						<div>可用余额 <span class="balance-money" data-amount="<?=$order['user_balance']+$order['user_money']?>"><?= $order['user_balance']?>元</span></div>
						<div>
							<label for="paylist-recharge-pay-i">
							<input id="paylist-recharge-pay-i" type="checkbox" class="balance_pay"><em<?php if($order['user_money']) echo ' class="active"'?>></em>
							<span class="paylist-money" id="payed-money" style="float:right;margin-right:10px"></span></label>
						</div>
					</li>
                    <?php } ?>
					<li>
						<div>支付金额</div>
						<div class="paylist-money" id="paylist-money-i"
							 data-amount="<?= floatval($order['order_amount']+$order['user_money']) ?>"><?= floatval($order['order_amount']+$order['user_money']) ?>
							元
						</div>
					</li>
				</ul>
				<ul class="login-header pay_list">
					<?php if ($payIds && in_array(15, $payIds) && !empty($cardInfo)) { ?>
						<li>
							<div><img src="/themes/qu202/images/paylist-yl.png"
									  style="width:0.32rem;margin-right:0.13rem;"/> 会员卡支付
							</div>
							<div>

								<label for="payType-hyk">
									<input id="payType-hyk" data_type="15" class="pay_check" type="radio" name="paylist"><i></i></label>
							</div>
						</li>
					<?php } ?>
					<?php if (!$cardInfo) { ?>						
						<?php if ($payIds && in_array(5, $payIds) && api_CoreHelper::IsWenXinBrowser()) { ?>
							<li>
								<div><img src="/themes/qu202/images/paylist-wx.png"
										  style="width:0.25rem;margin-left:0.05rem;margin-right:0.18rem;"/>微信支付
								</div>
								<div>
									<label for="payType-wx">
									<input id="payType-wx" data_type="5" class="pay_check" type="radio"
									name="paylist"><i></i></label>
								</div>
							</li>
						<?php } ?>
						<?php if ($payIds && in_array(13, $payIds) && !api_CoreHelper::IsWenXinBrowser()) { ?>
							<!-- 不是微信浏览器才显示支付宝(微信浏览器不能使用支付宝)-->
							<li>
								<div><img src="/themes/qu202/images/paylist-zfb.png" style="width:0.39rem"/>支付宝网页支付</div>
								<div>
									<label for="payType-zfb1">
										<input id="payType-zfb1" data_type="13" class="pay_check" type="radio" name="paylist"><i></i></label>
								</div>
							</li>
						<?php } ?>
						<?php if ($payIds && in_array(16, $payIds) && !in_array($order['order_type'], array(8,10))) { ?>
							<li>
								<div><img src="/themes/qu202/images/paylist-yl.png"
										  style="width:0.32rem;margin-right:0.13rem;"/> 银联支付
								</div>
								<div>
									<label for="payType-yl">
									<input id="payType-yl" data_type="16" class="pay_check" type="radio"
									name="paylist"><i></i></label>
								</div>
							</li>
						<?php } ?>
						<?php if ($payIds && in_array(23, $payIds)) { ?>
							<li>
								<div><img src="/themes/qq/images/QQ.png"
										  style="width:0.22rem;margin-right:0.13rem;"/> QQ支付
								</div>
								<div>
									<label for="payType-qq">
									<input id="payType-qq" data_type="23" class="pay_check" type="radio"
									name="paylist"><i></i></label>
								</div>
							</li>
						<?php } ?>	
					<?php }?>
				</ul>
				<div class="orderinfo-time">请在<span>9分59秒</span>内完成付款，否则订单将自动取消。</div>
				<form action="/order/dopay" method="post" id="order_pay_form">
					<?php
					$hash = md5($order['order_id'] . WAP_HASH_KEY);
					?>
					<input type="hidden" name="pay_type" value="" id="pay_type"/>
					<input type="hidden" name="card_no" value="<?php if (!empty($cardInfo)) {
						echo isset($cardInfo['card_no']) ? $cardInfo['card_no'] : '';
					} ?>" id="J_payOrder_card_no"/>
					<input type="hidden" name="order_id" value="<?php echo $order['order_id']; ?>" id="J_payOrder_id"/>
					<input type="hidden" name="use_wallet" value="<?php echo !empty($order['user_money']) ? '1' : '0'?>" id="J_payOrder_use_wallet"/>
					<input type="hidden" name="openid"
						   value="<?php echo $openid ? $openid : api_CoreHelper::getCookie('wx_openid') ?>" id="J_payOrder_openid"/>
					<input type="hidden" name="hash" value="<?php echo $hash; ?>" id="J_payOrder_hash"/>
					<input type="hidden" name="wpk" value="" id="J_payOrder_wpk"/>
					<?php echo baf_CHtml::createHidden();?>
				</form>
				<input type="hidden" name="order_sn" value="<?php echo $order['order_no']; ?>" id="J_payOrder_sn"/>
				<ul class="login-in">
					<li id="login-common">
						<div id="pay_sub_btn">支付</div>
					</li>
				</ul>


				<div class="recharge-inputPw mobile-qq hide">
					<div class="recharge-btnGroup"><span></span>
						<p>请输入支付密码</p>
						<ul>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<input id="recharge-pw" type="tel" autocomplete="off">
						</ul>
					</div>
				</div>
				<div class="recharge-password hide">
					<div class="recharge-pwWrap">
						<div class="recharge-forgetPw">
							<p>支付密码错误!</p>
							<p id="paylist-tryAgain">重试</p>
							<p><a href="<?= baf_CHtml::createUrl('/user/forget?orderid='.$order['order_id']);?>">忘记密码</a></p>
						</div>
						<div class="recharge-cancel">
							<p id="recharge-cancel">返回</p>
						</div>
					</div>
				</div>
			<?php } else {
				echo '<div class="order-bd"><p>订单出错，请返回重新下单</p></div>';
			} ?>
		</div>
		<div class="toast hide">
	      	<div class="toast-alert">
	       		<div class="toast-msg"> </div>
	      	</div>
	    </div>
		<div class="nm-cover hide">
	        <div class="nm-alert">
	            <div class="msg">您还没有设置支付密码，请设置支付密码！</div>
		        <div class="cancel"> 
		            <div class="l">取消</div>
		            <div class="r">确定</div>
		        </div>
	      	</div>
	    </div>
	  <p class='hide decathlon decathlon-info-msg'>趣运动提供场馆预订的售前售后及收费服务，由趣运动承担后续相关服务，如有任何疑问，请拨打趣运动热线电话咨询：4000-410-480</p>
		<script>
		$(document).ready(function () {
			var postData = {'add_time':<?php echo intval($order['add_time']);?>}
			    postData = typeof objMerge == 'function' ? objMerge(postData) : postData
			$.ajax({
				url:"/order/getpaytimeout",
				type:'POST',
				data:postData,
				dataType:'json',
				success:function (ret) {
					var countDown = ret.pay_timeout,//600
						countTimer = null,
						leftsecond, _m, _s;
					leftsecond = parseInt(countDown);

					function showTime() {
						_m = parseInt(leftsecond / 60);
						_s = parseInt(leftsecond % 60);
						$(".orderinfo-time span").text(_m + "分" + _s + "秒");
					}

					if (leftsecond > 1) {
						showTime();
						clearInterval(countTimer);
						countTimer = setInterval(function () {
							leftsecond--;
							if (leftsecond >= 0) {
								showTime();
							} else {
								clearInterval(countTimer);
							}
						}, 1000);
					} else {
						$(".orderinfo-time span").text("0分0秒");
					}
				}
			});
		})
			
		</script>

		<?php if (api_CoreHelper::IsWenXinBrowser()) { ?>
			<script type="text/javascript">
				var _wxPayParam = {};
				function jsApiCall() {
					WeixinJSBridge.invoke(
						'getBrandWCPayRequest',
						_wxPayParam,
						function (res) {
							WeixinJSBridge.log(res.err_msg);
							//alert(res.err_msg);
							if (res.err_msg == "get_brand_wcpay_request:ok") {
								window.location.href = "<?= baf_CHtml::createUrl('/order/payOk?id='.$order['order_id']);?>"; //跳转支付成功页面
							}
							else if (res.err_msg == "get_brand_wcpay_request:fail") {
								alert('微信服务器繁忙，请稍后重试！');
							}
							//alert(res.err_code+res.err_desc+res.err_msg);
						}
					);
				}

				function callpay() {
					if (typeof WeixinJSBridge == "undefined") {
						if (document.addEventListener) {
							document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
						} else if (document.attachEvent) {
							document.attachEvent('WeixinJSBridgeReady', jsApiCall);
							document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
						}
					} else {
						jsApiCall();
					}
				}

			</script>
		<?php } ?>
		<?php 
		$tplPath = baf_Common::isChannel('gagc') ? 'gagc' : 'qu';
		 ?>
		<script type="text/javascript" src="<?php echo TEMPLATE.$tplPath; ?>/js/orderPay.js?ver=201612151025"></script>

		<?php $this->display('public/footer.php');} ?>