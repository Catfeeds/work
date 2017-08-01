<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta content="telephone=no" name="format-detection">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no,minimal-ui">
    <title>动Clue月卡介绍</title>
    <link rel="stylesheet" href="/static/appwebview/moncardintroduce/stylesheets/moncardintroduce.css">
    <style type="text/css">
      .hide{
        display: none !important;
      }
      .loading{
        width: 100%;
        height: 100%;
        position: absolute;
        top:0;
        left:0;
        background-color: #fff;
        z-index: 99999;
      }
      .loading-icon{
        width: 60px;
        height: 60px;
        position: absolute;
        top: 50%;
        left:50%;
        margin-top: -30px;
        margin-left: -30px;
        background: url(/static/images/loading.png) no-repeat;
        -webkit-background-size: cover;
        background-size: cover;
        -webkit-animation: rotate360 1s linear 0s infinite;
        animation: rotate360 1s linear 0s infinite;
        -webkit-transform-origin: 50% 50%;
        transform-origin: 50% 50%;
        z-index: 99;
      }
      @keyframes rotate360 {
        from {
          -webkit-transform:rotateZ(0deg);
          transform:rotateZ(0deg);
        }
        to {
          -webkit-transform:rotateZ(360deg);
          transform:rotateZ(360deg);
        }
      }

      @-webkit-keyframes rotate360 {
        from {
          -webkit-transform:rotateZ(0deg);
        }
        to {
          -webkit-transform:rotateZ(360deg);
        }
      }
    </style>
  </head>
  <body>
    <section id="loading" class="loading">
      <div class="loading-icon"></div>
    </section>
    <section class="mci-main hide">
      <p class="mci-info">动Club是趣运动最新推出的一项增值服务，可以为您提供一种更简单、实惠的运动方式。</p>
      <h2 class="mci-h2">动Club特权</h2>
      <div class="line"></div>
      <p class="mci-info">加入动Club，您可以在全国5大城市上千家场馆免费运动，还可以体验各种精品课程。</p>
      <h2 class="mci-h2">使用说明</h2>
      <div class="line"></div>
      <ul class="mci-ul">
        <li class="mci-li">1、在首页点击支持动Club的项目<span class="mci-club">CLUB</span>，选择您想去的场馆或课程。</li>
        <li class="mci-li">2、选好场馆或课程，在提交订单页面选择动Club特权，提交订单并完成支付后，凭消费验证码到场馆消费即可。</li>
        <li class="mci-li">3、如您想体验课程，需提前3个小时预约课程。</li>
      </ul>
      <h2 class="mci-h2">购买前须知</h2>
      <div class="line"></div>
      <ul class="mci-ul">
        <li class="mci-li">1、每天只能消费1次，不区分场馆和课程。</li>
        <li class="mci-li">2、同一间场馆30天内最多消费3次。</li>
        <li class="mci-li">3、30天内旷课3次将冻结您的动Club会员两周。</li>
      </ul>
      <p class="mci-welcome">欢迎您加入动Club  </p>
    </section>
    <script src="/static/js/zeptoWithFx.min.js"></script>
    <script src="/static/js/mobileResponsive.js"></script>
    <script type="text/javascript">
      window.onload = function(){
        setTimeout(function(){
          $(".loading").addClass("hide");
          $(".mci-main").removeClass("hide");   
        },500);
      }
    </script>
  </body>
</html>