<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>趣运动-订场神器_订场就这么简单_网上预订_手机订场_羽毛球订场_羽毛球馆_足球场_游泳馆查询预订_去运动</title>
    <meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1, user-scalable=no">
    <meta name="keywords" content="趣运动,在线预订,手机订场,订场优惠,羽毛球订场,足球场,游泳馆查询预订,去运动,订场神器">
    <meta name="description" content="趣运动专注球场在线预订,羽毛球馆,足球场,网球场,球场在线预订,游泳馆查询预订,手机在线预订,运动场馆价格表,运动场馆优惠信息,去运动就上趣运动.">
    <link href="/themes/koubei/myorder/index/stylesheets/index.css" type="text/css" rel="stylesheet">
    <script src="/static/js/zeptoWithFx.min.js"></script>
    <script src="/static/js/mobileResponsive.js"></script>
    <script src="/static/js/alipayJSBridge.js"></script>
  </head>
  <body data-design-width="750">
    <div id="loading" data-lock="1" class="loading">
      <div class="loading-icon"></div>
    </div>
    <div class="main hide">
      <div class="myorder-index">
        <?php 
          if($orderInfo){
         ?>
        <div class="myorder-index-card borderBottom1px">
          <div class="myorder-index-card-header borderBottom1px"><span><?= !empty($orderInfo['name']) ? $orderInfo['name'] : '';?></span>
            <div class="myorder-index-card-header-right">
			<?php
			if ($orderInfo['order_status'] == 0){
			?>
                <a class="pay" href="pay?id=<?php echo $orderInfo['order_id']?>">立即支付</a>
			<?php
			}
			else {
			?>
                <span class="alert"><?php echo isset($orderStatus[$orderInfo['order_status']]) ? $orderStatus[$orderInfo['order_status']] : '';?></span>
            <?php
			}
			?>
            </div>
          </div>
          <ul class="myorder-index-card-body">
            <li><span class="left">项目</span>&nbsp;<span class="right"><?= !empty($orderInfo['cat_name']) ? $orderInfo['cat_name'] : ''?></span></li>
            <li><span class="left">日期</span>&nbsp;<span class="right"><?php echo $orderInfo['start_date']?></span></li>
			<?php
            if(isset($orderInfo['courses_list']) && !empty($orderInfo['courses_list'])){
				$i = 0;
                foreach($orderInfo['courses_list'] as $courses){
            ?>
            <li><span class="left"><?php if($i == 0){echo '场地信息';}?></span>&nbsp;<span class="right"><?php echo $courses;?></span></li>
			<?php
					$i++;
                }
            }
            ?>
            <!--
            <li><span class="left"></span>&nbsp;<span class="right">SVIP1号场 14:00～15:00</span></li>
            -->
            <li><span class="left">验证码</span>&nbsp;<span class="right"><?php echo !empty($orderInfo['verification_code']) ? $orderInfo['verification_code']: '';?></span></li>
            <li><span class="left">订单号</span>&nbsp;<span class="right"><?php echo $orderInfo['order_sn']?></span></li>
          </ul>
        </div>
        <?php } ?>
      </div>
      <div class="nm-fixed-bottom"><a class="koubei-button-white" href="index?book=1">再来一单</a>
        <div class="common-quyundongtips">服务由趣运动提供</div>
      </div>
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