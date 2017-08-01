<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta content="telephone=no" name="format-detection">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no,minimal-ui">
    <title></title>
    <link rel="stylesheet" href="/static/appwebview/signIn/stylesheets/rule.css">
  </head>
  <body data-design-width="750" data-order-id="123">
    <div id="loading" data-lock="1" class="loading">
      <div class="loading-icon"></div>
    </div>
    <div class="main hide">
      <div class="rule-title"><span>积分规则</span></div>
      <div class="rule-info">
        <span>1、场地过了消费时间后，将获得积分</span><br/>
        <span>2、规定时间内评价球馆一次可得10点积分</span><br/>
        <span>3、评价中添加图片，一张图可得5点积分</span><br/>
        <span>4、通过打卡可以获得积分</span>
      </div>
    </div>
    <script src="/static/js/zeptoWithFx.min.js"></script>
    <script src="/static/js/mobileResponsive.js"></script>
    <script>
      window.onload = function(){
        var loadInterval = setInterval(function() {
          if($(".loading").attr("data-lock") == 1){
             $(".loading").addClass("hide");
             $(".main").removeClass("hide");
             clearInterval(loadInterval);
          }
        },500);
      }
    </script>
  </body>
</html>