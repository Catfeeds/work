<?php $this->display('public/header_202.php');?>
<link href="/themes/qu202/css/orderinfo.css" type="text/css" rel="stylesheet">

	<div id="loading" data-lock="1" class="loading">
      <div class="loading-icon"></div>
    </div>
    <div class="main hide">
      <div class="header">
        <div class="left" onclick="history.go(-1)"><i class="icon-back"></i></div>
        <div class="center">支付</div>
        <div class="right" style="text-align: right;" onclick="window.location.href='<?= baf_CHtml::createUrl('/order/help');?>'">帮助</div>
      </div>
      <ul class="login-header">
        <li>
          <div>订单名称</div>
          <div><?= $order['order_type']==1 ? $order['name'].$goods['goods_name']:$order['name'] . "场地预订";?></div>
        </li>
      </ul>
      <?php if (!empty($cardInfo)) { ?>
      <ul class="login-header">
        <li> 
          <div>持卡人</div>
          <div><?php echo baf_CHtml::encode($cardInfo['cardholder']); ?></div>
        </li>
        <li>
          <div>会员余额</div>
          <div><?php echo baf_CHtml::encode($cardInfo['balance'])?> 元</div>
        </li>
        <li>
          <div>会员卡号</div>
          <div><?php echo baf_CHtml::encode($cardInfo['card_no'])?></div>
        </li>
        <li>
          <div>手机号</div>
          <div><?php echo baf_CHtml::encode($cardInfo['card_mobile_phone'])?></div>
        </li>
      </ul>
      <?php }?>
      <div class="orderinfo-time">请在<span>9分59秒</span>内完成付款，订场费用将在您消费当天由场馆从会员卡中扣除</div>
      <div class="order-item pay_sub" style="display:none;">
      				<ul class="pay_list">
                    <?php if ($payIds && in_array(15, $payIds) && !empty($cardInfo)) { ?>
                    <li class="line" data_type="15">
						<span class="left img cardPay"></span>
						<span class="left">会员卡预定</span>
                        <span class="right check"></span>
					</li>
					<?php }?>
					</ul>
                <form action="/order/dopay" method="post" id="order_pay_form">
                    <?php 
                        $hash = md5($order['order_id']. WAP_HASH_KEY);
                    ?>
                    <input type="hidden" name="pay_type" value="15" id="pay_type" />
                    <input type="hidden" name="card_no" value="<?php if (!empty($cardInfo)) { echo isset($cardInfo['card_no']) ? $cardInfo['card_no'] : ''; }?>" id="J_payOrder_card_no" />
                    <input type="hidden" name="order_id" value="<?php echo $order['order_id']; ?>" id="J_payOrder_id"/>
                    <input type="hidden" name="openid" value="<?php echo $openid ? $openid : api_CoreHelper::getCookie('wx_openid')?>"/>
                    <input type="hidden" name="hash" value="<?php echo $hash; ?>" id="J_payOrder_hash"/>
                	<?php if(in_array(UTM_SOURCE, Config::$source4Nothing)){?>
            <input type="hidden" value="<?php echo UTM_SOURCE?>" name="utm_source"/>
            <?php }?>
                </form>
                <input type="hidden" name="order_sn" value="<?php echo $order['order_no']; ?>" id="J_payOrder_sn"/>
            </div>

      <ul class="login-in">
        <li id="login-common">
          <div id="pay_sub_btn">确认订场</div>
        </li>
      </ul>
    </div>
    <div class="toast hide">
      <div class="toast-alert">
        <div class="toast-msg"></div>
      </div>
    </div>
    <script>
      var countDown = <?php echo 600- (time() - $order['add_time'])>0 ? 600- (time() - $order['add_time']) : 0;?>,
          countTimer = null,
          leftsecond,_m,_s;
      leftsecond = parseInt(countDown);
      
      function showTime() {
          _m = parseInt(leftsecond/60);
          _s = parseInt(leftsecond%60);
          var min = _m>0 ? _m+'分' : '';
          $(".orderinfo-time span").text(min+_s+"秒");
      }
      
      if (leftsecond > 1) {
          showTime();
          clearInterval(countTimer);
          countTimer = setInterval(function() {
              leftsecond--;
              if (leftsecond >= 0) {
                  showTime();
              } else {
                  clearInterval(countTimer);
                  outofdate();
              }
          }, 1000);
      } else {
          $(".orderinfo-time span").text("0秒");
          outofdate();
      }

      function outofdate(){
    	  showToast('订单已过期，请重新下单', function(){
				history.go(-1);
      		});
      }
    	
      var loadInterval = setInterval(function() {
          if ($(".loading").attr("data-lock") == 1) {
              $(".loading").addClass("hide");
              $(".main").removeClass("hide");
              clearInterval(loadInterval);              
          }
      }, 500);

      // 显示toast
      function showToast(errMsg,fn) {
          $(".toast .toast-msg").text(errMsg);
          $(".toast").removeClass('hide');
          setTimeout(function(){
              $(".toast").animate({"opacity":0},300,function(){
                  $(this).css("opacity",1).addClass("hide");
                  if(fn){
                      fn();
                  }
              })
          },1000);
      }
    </script>
    <div style="display: none;">
      <script>
        var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "//hm.baidu.com/hm.js?faab40fbb816cf9bb1c5c940b05b0b98";
          var s = document.getElementsByTagName("script")[0];
          s.parentNode.insertBefore(hm, s);
        })();
      </script>
    </div>
    
<script type="text/javascript" src="<?php echo TEMPLATE; ?>qu/js/cardPay.js?ver=20161111"></script>
<p class='hide decathlon decathlon-info-msg'>趣运动提供场馆预订的售前售后及收费服务，由趣运动承担后续相关服务，如有任何疑问，请拨打趣运动热线电话咨询：4000-410-480</p>
<?php $this->display('public/footer_202.php');?>
