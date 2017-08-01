<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>趣运动-订场神器_订场就这么简单_网上预订_手机订场_羽毛球订场_羽毛球馆_足球场_游泳馆查询预订_去运动</title>
    <meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1, user-scalable=no">
    <meta name="keywords" content="趣运动,在线预订,手机订场,订场优惠,羽毛球订场,足球场,游泳馆查询预订,去运动,订场神器">
    <meta name="description" content="趣运动专注球场在线预订,羽毛球馆,足球场,网球场,球场在线预订,游泳馆查询预订,手机在线预订,运动场馆价格表,运动场馆优惠信息,去运动就上趣运动.">
    <link href="/themes/koubei/order/confirmOrder/stylesheets/confirmOrder.css" type="text/css" rel="stylesheet">
    <link href="/static/myCoupons/stylesheets/myCoupons.css" type="text/css" rel="stylesheet">
    <script src="/static/js/zeptoWithFx.min.js"></script>
    <script src="/static/js/mobileResponsive.js"></script>
    <script src="/themes/qu/js/common.js"></script>
    <script src="/themes/koubei/order/js/orderCommon.js?v=2.0.1"></script>
    <script src="/themes/koubei/order/confirmOrder/js/confirmOrder.js?v=2.0.1"></script>
    <script src="/static/js/alipayJSBridge.js"></script>
    <script>
      var click="",utmSource="";
      if(click==1){
          Coupon.getCouponList();
      }
      var HASH = '';
    </script>
  </head>
  <body data-design-width="750">
    <div id="loading" data-lock="1" class="loading">
      <div class="loading-icon"></div>
    </div>
    <div class="main hide common-noLogin">
      <div class="co-info">
        <div class="co-info-name"><?php echo $court_name; ?></div>
        <ul class="co-info-detail">
          <li>
            <div>项目</div>
            <div><?php echo $category_name; ?></div>
          </li>
          <li>
            <div>日期</div>
            <div><?php echo date('Y年m月d日', $book_date); ?>  <?php echo $weekarray[date("w",$book_date)]; ?></div>
          </li>
          <?php
          $i=0;
          foreach($course AS $k => $v){  
                foreach ($v as $key => $val) {
            ?>
          <li>
            <div><?php if($i==0){ echo '场地信息';}?></div>
            <div><?php echo $val['course_name'].' '.$val['real_time']?></div>            
          </li>
          <?php $i++;}}?>
        </ul>
      </div>
      <ul class="common-money common-menu">
        <li>
          <div>总计</div>
          <div id="totalMoney"><?php echo $goods_amount; ?>元</div>
        </li>
        <li class="common-coupon"> 
          <div><span>卡券</span></div>
          <div id="use_coupon" amount="<?php echo $goods_amount; ?>" class="co-bill-textStyle2 common-link"><span>点击使用卡券</span><img src="/themes/koubei/order/images/arrow-r.png"/></div>
        </li>
        <li>
          <div>支付金额</div>
          <div id="pay_amount"><?php echo $goods_amount; ?>元</div>
        </li>
      </ul>
      <ul class="common-phone common-menu">
        <li>
          <div>手机号</div>
          <div><a href="changeUnion" class="common-link"><?php if(!empty($user['phone'])) echo $user['phone'];?><img src="/themes/koubei/order/images/arrow-r.png" /></a></div>
        </li>
      </ul>
      <?php if(!$is_refund){ ?>
      <div class="common-tip"><img src="/themes/koubei/order/images/co-tip.png"/> 本场馆暂不支持退款</div>
      <?php } ?>
      <div class="common-footer">
        <div id="orderSubmit" class="common-btn disable">立即付款</div>
      </div>
      <div class="orderSubmit-space" style="height:0.5rem;"></div>
      <div class="common-quyundongtips">服务由趣运动提供</div>
      <div class="common-quyundongtipsSpace"></div>
    </div>
    <div class="toast hide">
      <div class="toast-alert">
        <div class="toast-msg"></div>
      </div>
    </div>
    <div class="common-toast hide">
      <div class="common-alert">
        <div class="common-msg">订单金额未能满足使用条件</div>
        <div class="common-sure">确定</div>
      </div>
    </div>
    <div id="coupon_waper" class="coupon-container hide">
    </div>
    <div class="book-noPaySprite hide">
      <ul></ul>
    </div>
    <input type="hidden" id="client_id"  value="<?php if (isset($user['user_id']) && ($user['user_id'] > 0)) { echo $user['user_id']; }?>" />
    <input type="hidden" id="user_has_card"  value="<?php if (!empty($cardInfo)) { echo '1'; } else { echo '0'; }?>" />
    <input type="hidden" value="<?php echo $goods_ids; ?>" name="goods_ids" id="J_payGoodsId" />
    <input type="hidden" value="<?php echo $act_id; ?>" name="act_id" id="J_payActId" />
    <input type="hidden" value="<?php echo $businessId; ?>" name="bid" id="J_payBid" />
    <input type="hidden" value="<?php echo $categoryId; ?>" name="cid" id="J_payCid" />
    <input type="hidden" value="0" name="coupon_id" id="coupon_id"/>
    <input type="hidden" value="1" name="ticket_type" id="ticket_type"/>
    <input type="hidden" value="<?php echo $hash; ?>"  id="J_payHash" />
    
    <form action="dopay" method="post" id="order_pay_form">
      <input type="hidden" name="pay_type" value="13" id="pay_type"/>
      <input type="hidden" name="card_no" value="<?php if (!empty($cardInfo)) {
        echo isset($cardInfo['card_no']) ? $cardInfo['card_no'] : '';
      } ?>" id="J_payOrder_card_no"/>
      <input type="hidden" name="order_id" value="0" id="J_payOrder_id"/>
      <input type="hidden" name="hash" value="<?php echo $hash; ?>" id="J_payOrder_hash"/>
      <input type="hidden" name="wpk" value="" id="J_payOrder_wpk"/>      
    </form>
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
  </body>
</html>