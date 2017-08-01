<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>趣运动-订场神器_订场就这么简单_网上预订_手机订场_羽毛球订场_羽毛球馆_足球场_游泳馆查询预订_去运动</title>
    <meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1, user-scalable=no">
    <meta name="keywords" content="趣运动,在线预订,手机订场,订场优惠,羽毛球订场,足球场,游泳馆查询预订,去运动,订场神器">
    <meta name="description" content="趣运动专注球场在线预订,羽毛球馆,足球场,网球场,球场在线预订,游泳馆查询预订,手机在线预订,运动场馆价格表,运动场馆优惠信息,去运动就上趣运动.">
    <link href="/themes/koubei/court/itemChoose/stylesheets/itemChoose.css" type="text/css" rel="stylesheet">
    <script src="/static/js/zeptoWithFx.min.js"></script>
    <script src="/static/js/mobileResponsive.js"></script>
    <script src="/static/js/alipayJSBridge.js"></script>
  </head>
  <body data-design-width="750">
    <div id="loading" data-lock="1" class="loading">
      <div class="loading-icon"></div>
    </div>
    <div class="main hide">
      <div class="ic-vname borderBottom1px"><?php echo $venues_detail['name']?></div>
    
      

<!-- 默认第一项加属性 show -->
<?php

if (isset($booking_data) && !empty($booking_data)) {
  $i = 0;
  foreach ($booking_data as $key => $booking) {
?>
      <div <?php if ( $i == 0 ) { echo 'show'; }?> class="ic-item-card borderTop1px borderBottom1px">
        <div class="ic-item-card-name borderBottom1px"><span><?php echo $booking['cat_name']?></span><b style="display: none;"><strong>¥<?php echo floatval($booking['price']);?></strong>起</b><i></i></div>
        <ul class="ic-item-card-list">
<?php
if (isset($booking['list']) && !empty($booking['list'])) {
  foreach ($booking['list'] as $list) {
    $is_disabled = 'disabled';
    if ( intval($list['surplus_count']) > 0 ) { $is_disabled = ''; }
?>
          <li><a href="book?cid=<?php echo $booking['cat_id']?>&t=<?php echo $list['book_date'];?>" <?php echo $is_disabled;?> class="borderBottom1px"> <span><?php echo $list['courses_date'];?><em></em></span><b style="display: none;"><strong>¥<?php echo floatval($booking['price']);?></strong>起</b><i></i></a></li>
<?php
  }
  echo '<li class="ic-item-card-all">查看全部场次<i></i></li>';
}
else {
  echo '<li><a href="javascript:;" disabled class="borderBottom1px"> 暂无可预约场次</a></li>';
}
?>
        </ul>
      </div>
<?php
    $i++;
  }
}
else {
?>
  <div class="ic-tips">暂时没有可预约的项目</div>
<?php
}
?>

      <div class="common-quyundongtips">服务由趣运动提供</div>
      <div class="common-quyundongtipsSpace"></div>
    </div>
    <script src="/themes/koubei/court/itemChoose/js/itemChoose.js"></script>
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