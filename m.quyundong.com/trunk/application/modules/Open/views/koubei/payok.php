<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>趣运动-订场神器_订场就这么简单_网上预订_手机订场_羽毛球订场_羽毛球馆_足球场_游泳馆查询预订_去运动</title>
    <meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1, user-scalable=no">
    <meta name="keywords" content="趣运动,在线预订,手机订场,订场优惠,羽毛球订场,足球场,游泳馆查询预订,去运动,订场神器">
    <meta name="description" content="趣运动专注球场在线预订,羽毛球馆,足球场,网球场,球场在线预订,游泳馆查询预订,手机在线预订,运动场馆价格表,运动场馆优惠信息,去运动就上趣运动.">
    <link href="/themes/koubei/order/payok/stylesheets/payok.css" type="text/css" rel="stylesheet">
    <script src="/static/js/zeptoWithFx.min.js"></script>
    <script src="/static/js/mobileResponsive.js"></script>
    <script src="/static/js/alipayJSBridge.js"></script>
  </head>
  <body data-design-width="750">
    <div id="loading" data-lock="1" class="loading">
      <div class="loading-icon"></div>
    </div>
    <div class="main hide">
      <div class="order-payok-banner borderBottom1px">
      <?php if (isset($order['status']) && $order['status'] == '0000' && ($order['order_status'] == '1' || $order['order_status'] == '6')) {?>
        <div style="background-image:url('/themes/koubei/order/payok/images/success.png')" class="order-payok-banner-icon"></div>
        <h2>订场成功</h2>        
        <?php }else{?>
        <div style="background-image:url('/themes/koubei/order/payok/images/fail.png')" class="order-payok-banner-icon"></div>
        <h2>暂时未收到支付结果</h2>
        <?php }?>  
        <h3><?php if (isset($order['name'])){echo $order['name'];} ?></h3>
      </div>
      <?php
      $book_date = isset($order['goods_list'][0]['book_date']) ? $order['goods_list'][0]['book_date'] : '';
      if($order['goods_list']){
        $course = array();
        $orderName = isset($order['name']) ? $order['name'] : '';
        $categoryName = isset($order['category_name']) ? $order['category_name'] : '';
        foreach ($order['goods_list'] as $k => $v) {
          $course[] = $v['course_name'].' '.date('H:i', $v['start_time']).'~'.date('H:i', $v['end_time']);
        }
      }
      ?>
      <?php 
      if($order['order_type']==0){
       ?>
      <div class="order-payok-info borderBottom1px">
        <ul>
          <li>
            <div class="left">项目</div>
            <div class="right"><?php echo isset($order['category_name']) ? $order['category_name'] : '';?></div>
          </li>
          <li>
            <div class="left">日期 </div>
            <div class="right"><?php echo $book_date.' '.api_CoreHelper::getDateTips(strtotime($book_date), false);?></div>
          </li>
          <li>
            <div class="left">场地 </div>
            <div class="right">
            <?php echo  !empty($course) ? implode('<br />', array_unique($course)) : ''; ?>
            </div>
          </li>
        </ul>
      </div>
      <div class="order-payok-info borderBottom1px">
        <p>验证码：<?php echo !empty($order['verification_code']) ? $order['verification_code'] : '';?></p>
        <div class="tips">请向场馆工作人员出示此验证码以开场</div>
      </div>
      <?php } ?>
      <?php if(!empty($order['status']) && $order['status']=='0000' && !in_array($order['order_status'], array(1, 6))){?>
      <a class="order-payok-repay common-btn" href="pay?id=<?php echo $order['order_id']?>">重新支付</a>
      <?php
      }
      ?>

      <div class="common-quyundongtips">服务由趣运动提供</div>
      <div class="common-quyundongtipsSpace"></div>
    </div>
    <script>
      $(window).on("load",function(){
        var loadInterval = setInterval(function() {
            if ($(".loading").attr("data-lock") == "1") {
                $(".loading").addClass("hide");
                $(".main").removeClass("hide");
                clearInterval(loadInterval);
            }
        }, 500);
      })
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
  </body>
</html>