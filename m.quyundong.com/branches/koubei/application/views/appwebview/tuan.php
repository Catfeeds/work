<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <meta content="telephone=no" name="format-detection">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no,minimal-ui" />
  <title>团体购票</title>
  <link rel="stylesheet" type="text/css" href="/static/teamticket/web/style/nm.base.css">
  <link rel="stylesheet" type="text/css" href="/static/teamticket/web/style/tticon.style.css">
  <link rel="stylesheet" type="text/css" href="/static/teamticket/web/style/teamticket.base.css?ver=1.01">
</head>
<body>
  <section class="loading">
    <div class="loading-icon"></div>
  </section>
  <section class="main hide">
    <div class="team-vip card">
      <h2 class="team-title icon-vip">VIP储值卡</h2>
      <div class="team-show"></div>
      <p class="team-desc">适用于趣运动上所有可预订以及支付项目，包含有：羽毛球、足球、篮球、健身月卡、陪练，以及各种优惠活动。</p>
    </div>
    <div class="team-ticket card">
      <h2 class="team-title icon-ticket">运动券</h2>
      <div class="team-show2"></div>
      <div class="team-Carousel"><i class="icon-left opacity0"></i><i class="icon-right"></i>
        <ul>
          <li><div class="team-card team-yu"></div></li>
          <li><div class="team-card team-basketball"></div></li>
          <li><div class="team-card team-football"></div></li>
        </ul>
      </div>
      <p class="team-desc">可在趣运动网页版和手机端上进行在线兑换无需排队，节省兑换时间。</p>
    </div>
    <div class="team-recommend">
      <ul>
        <li><i>1</i><span class="icon-cover">覆盖全国近万家场馆</span></li>
        <li><i>2</i><span class="icon-sell">在线预订，尊享7折优惠</span></li>
        <li><i>3</i><span class="icon-serve">企业个性定制服务</span></li>
      </ul>
    </div>
    <h2 class="team-title team-title-1">团体采购联系方式</h2>
    <div class="team-recommend">
      <ul>
        <li><i>4</i><a class="icon-tel">020-29896606</a></li>
        <li><i>5</i><a class="icon-mail">sale@ningmi.net</a></li>
      </ul>
    </div>
  </section>
  <script type="text/javascript" src="/static/js/zeptoWithFx.min.js"></script>
  <script type="text/javascript" src="/static/js/mobileResponsive.js"></script>
  <script type="text/javascript" src="/static/teamticket/web/js/teamticket.js"></script>
  <script type="text/javascript">
    window.onload = function(){
      $(".loading").addClass("hide");
      $(".main").removeClass("hide");
    }
  </script>
</body>
</html>