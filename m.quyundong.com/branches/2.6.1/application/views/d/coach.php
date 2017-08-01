<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta content="telephone=no" name="format-detection">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no,minimal-ui">
    <title>趣运动教练端</title>
    <link rel="stylesheet" href="/static/coach_down_m/stylesheets/coach_down_m.css">
    <script src="/static/js/jweixin-1.0.0.js"></script><script type="text/javascript" src="/static/js/jgosport-1.0.js?ver=201611180"></script>
  </head>
  <body>
    <section id="loading" data-lock="0" class="loading">
      <div class="loading-icon"></div>
      <div id="wxtitle" class="hide">趣运动教练端</div>
      <div id="wxdesc" class="hide">加入趣运动约练，卡路里能赚钱！</div>
      <div id="wximgUrl" class="hide">/static/coach_down_m/images/coach_down_logo.png</div>
    </section>
    <script src="/static/js/weixinshareurl.js"></script>
    <section class="coach-down-m-main">
      <div class="coach-down-m-page1">
        <div class="coach-down-m-logo"><img src="/static/coach_down_m/images/coach_down_logo_new.png"/></div>
        <p class="coach-down-m-page1-p1">趣运动 教练版</p>
        <p class="coach-down-m-page1-p2">运动就这么简单</p><a href="http://www.quyundong.com/d/coach" class="coach-down-m-page1-download">立即下载</a>
      </div>
      <div class="coach-down-m-page2">
        <div class="coach-down-m-page2-p1">兼职陪练，运动挣钱</div>
        <div class="coach-down-m-page2-p2">与同一爱好的学员一起锻炼，还能赚取收入</div>
        <div class="coach-down-m-page2-iphone"><img src="/static/coach_down_m/images/coach_down_iphone2.png"/></div>
      </div>
      <div class="coach-down-m-page3">
        <p class="coach-down-m-page3-p1">更多项目，任你发挥</p>
        <p class="coach-down-m-page3-p2">羽毛球、游泳、乒乓球、网球、跑步……<br />更多项目，可自行添加</p>
        <div class="coach-down-m-page3-icons">
          <div class="coach-down-m-page3-icon-01 coach-down-m-page3-icon"><img src="/static/coach_down_m/images/coach_down_icon_01.jpg"/></div>
          <div class="coach-down-m-page3-icon-02 coach-down-m-page3-icon"><img src="/static/coach_down_m/images/coach_down_icon_02.jpg"/></div>
          <div class="coach-down-m-page3-icon-03 coach-down-m-page3-icon"><img src="/static/coach_down_m/images/coach_down_icon_03.jpg"/></div>
          <div class="coach-down-m-page3-icon-04 coach-down-m-page3-icon"><img src="/static/coach_down_m/images/coach_down_icon_04.jpg"/></div>
          <div class="coach-down-m-page3-icon-05 coach-down-m-page3-icon"><img src="/static/coach_down_m/images/coach_down_icon_05.jpg"/></div>
          <div class="coach-down-m-page3-icon-06 coach-down-m-page3-icon"><img src="/static/coach_down_m/images/coach_down_icon_06.jpg"/></div>
        </div>
      </div>
      <div class="coach-down-m-page4">
        <p class="coach-down-m-page4-p1">灵活自由，趣味无限</p>
        <p class="coach-down-m-page4-p2">时间自定、场地自选、专业配备<br />运动交友、锻炼身心、轻松交流</p>
        <div class="coach-down-m-page4-iphone"><img src="/static/coach_down_m/images/coach_down_iphone3.png"/></div>
      </div>
      <div class="coach-down-m-page5">粤ICP备14021879号-2 &copy; 2015 趣运动 </div>
    </section>
    <script src="/static/js/zeptoWithFx.min.js"></script>
    <script src="/static/js/mobileResponsive.js"></script>
    <script>
      window.onload = function(){
        
        var loadInterval = setInterval(function() {
          if($(".loading").attr("data-lock") == 1){
             $(".loading").addClass("hide");
             $(".coach-down-m-main").removeClass("hide");
             clearInterval(loadInterval);
          }
        },500);
      }
    </script>
  </body>
</html>