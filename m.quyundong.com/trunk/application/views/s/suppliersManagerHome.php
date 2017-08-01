<!DOCTYPE html>
<html style="background-color:#2789EA;">
  <head>
    <meta charset="utf-8">
    <meta content="telephone=no" name="format-detection">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no,minimal-ui">
    <title>趣运动</title>
    <link rel="stylesheet" href="/static/appwebview/commissionreport/index/stylesheets/index.css">
  </head>
  <body data-design-width="640">
    <section id="loading" data-lock="1" class="loading">
      <div class="loading-icon"></div>
    </section>
    <section class="main">
      <div class="banner"><img src="/static/appwebview/commissionreport/index/images/banner.png"></div>
      <div class="form">
        <div class="p">
          <input id="phoneNumber" type="text" placeholder="请输入你的手机号码">
        </div>
        <div class="p">
          <input id="checkNumber" type="text" placeholder="短信的验证码">
          <div id="getCheckNumber" class="button">获取短信验证码</div>
        </div>
        <div class="p">
          <div id="send" class="button disable">进入你的专属领域</div>
        </div>
      </div>
      <div class="logo"><img src="/static/appwebview/commissionreport/index/images/logo.png"></div>
    </section>
    <section class="nm-cover hide">
      <div class="nm-alert">
        <p>请稍候!</p>
        <div class="close hide"></div>
      </div>
    </section>
  </body>
  <script src="/static/js/zeptoWithFx.min.js"></script>
  <script src="/static/js/mobileResponsive.js"></script>
  <script src="/static/appwebview/commissionreport/index/js/index.js?ver=20161111"></script>
  <script>
    window.onload = function(){
      var myURL = window.location.href.split('#')[0];
      var loadInterval = setInterval(function() {
        if($(".loading").attr("data-lock") == 1){
           $(".loading").addClass("hide");
           $(".main").removeClass("hide");
           clearInterval(loadInterval);
        }
      },500);
    } 
  </script>
  <script>
    var _hmt = _hmt || [];
    (function() {
    var hm = document.createElement("script");
    hm.src = "//hm.baidu.com/hm.js?faab40fbb816cf9bb1c5c940b05b0b98";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
    })();
  </script>
</html>