<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>趣运动球局</title>
    <meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1, user-scalable=no">
    <meta name="keywords" content="趣运动,在线预订,手机订场,订场优惠,羽毛球订场,足球场,游泳馆查询预订,去运动,订场神器">
    <meta name="description" content="趣运动专注球场在线预订,羽毛球馆,足球场,网球场,球场在线预订,游泳馆查询预订,手机在线预订,运动场馆价格表,运动场馆优惠信息,去运动就上趣运动.">
    <script src="/static/js/zeptoWithFx.min.js"></script>
    <script src="/static/js/mobileResponsive.js"></script>
  </head>
  <body data-design-width="750">
    <link href="/static/appwebview/app2.2/h5/stylesheets/h5.css?ver=20161024" type="text/css" rel="stylesheet">
    <div id="loading" data-lock="1" class="loading">
      <div class="loading-icon"></div>
      <div id="wxtitle" class="hide">趣运动球局，找到新的球友</div>
      <div id="wximgUrl" class="hide">/static/images/logo.jpg</div>
      <div id="wxdesc" class="hide">找球友？赚场费？就用趣运动球局，赶快下载趣运动APP一起玩！</div>
      <script src="/static/js/jweixin-1.0.0.js"></script><script type="text/javascript" src="/static/js/jgosport-1.0.js?ver=201611180"></script>
      <script src="/static/js/weixinshareurl.js"></script>
    </div>
    <div class="main hide">
      <div class="payok-download" style="z-index:99999999;position: fixed;top: 0;left: 50%;width: 100%;max-width: 3.75rem;-webkit-transform: translateX(-50%);transform: translateX(-50%);font-size: 0;">
          <a target="_blank" href="<?= baf_CHtml::createUrl('http://www.quyundong.com/d/');?>"><img src="/static/images/download.png" alt=""></a><span style='position: absolute;top: 0;right: 0;width: 15%;height: 40%;' onclick='this.parentNode.style.display="none"'></span>
      </div>
      <script>
          $(document).ready(function () {
            if(getCookie('app_flag') == '1' || getCookie('app_flag') == '2'){
              $('.payok-download').addClass('hide')
            }
            function getCookie(name) {
              var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
                if (arr = document.cookie.match(reg))
              return unescape(arr[2]);
                else
              return null;
            }
          })
      </script>
      <div class="page page-head">
        <div class="dm">
          <ul class="animation-jshook">
            <li class="sp">周六打球！兄弟们，约起！</li>
            <li class="br"></li>
            <li>要陪女票逛街呐<i class="emoji emoji-1"></i>
            </li>
            <li class="br"></li>
            <li class="sp">周六打球！兄弟们，约起！</li>
            <li class="br"></li>
            <li>要陪女票逛街呐<i class="emoji emoji-1"></i>
            </li>
            <li class="br"></li>
          </ul>
          <ul class="animation-jshook">
            <li>感觉身体被掏空，有点累，不去了～</li>
            <li class="br"></li>
            <li>叔叔不约<i class="emoji emoji-2"></i>
            </li>
            <li class="br"></li>
            <li>感觉身体被掏空，有点累，不去了～</li>
            <li class="br"></li>
            <li>叔叔不约<i class="emoji emoji-2"></i>
            </li>
            <li class="br"></li>
          </ul>
          <ul class="animation-jshook">
            <li>不是本人</li>
            <li class="br"></li>
            <li>我爱加班，加班使我快乐</li>
            <li class="br"></li>
            <li>不是本人</li>
            <li class="br"></li>
            <li>我爱加班，加班使我快乐</li>
            <li class="br"></li>
          </ul>
        </div>
        <div class="body">
          <div class="head"></div>
        </div>
        <div class="cloud"></div>
      </div>
      <div class="page page-step1">
        <div class="title"></div>
        <div class="pic"></div>
        <div class="step"><i>Step1</i>订场后发起球局，欢迎新球友加入</div>
      </div>
      <div class="page page-step2">
        <div class="pic"></div>
        <div class="step"><i>Step2</i>自主定价，都是友情价  </div>
      </div>
      <div class="page page-step3"> 
        <div class="pic"></div>
        <div class="step"><i>Step3</i>发起者带球，参与者带好自己装备 </div>
      </div>
      <div class="page page-step4"> 
        <div class="pic"></div>
        <div class="step"><i>Step4</i>球局中认识新朋友，朋友越多越好玩 </div>
      </div>
      <div class="page page-foot"> <a class="btn" href='<?= baf_CHtml::createUrl('/courtjoin/instruction');?>'>详细规则介绍 </a></div>
    </div>
    <script>
      window.onload = function  () {
        var loadInterval = setInterval(function() {
          if($(".loading").attr("data-lock") == 1){
             $(".loading").addClass("hide");
             $(".main").removeClass("hide");
             clearInterval(loadInterval);
             setTimeout(function () {
               $('.head').addClass('animation-2')
               $('.animation-jshook').addClass('animation-1')
             },500)
             
          }
        },500);
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
  </body>
</html>