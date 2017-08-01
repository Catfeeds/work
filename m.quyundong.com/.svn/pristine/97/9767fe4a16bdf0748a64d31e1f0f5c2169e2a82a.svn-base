<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta content="telephone=no" name="format-detection">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no,minimal-ui">
    <title><?php echo $signinInfo['nick_name']; ?> 在趣运动的打卡</title>
    <link rel="stylesheet" href="/static/appwebview/signIn/stylesheets/share.css">
  </head>
  <body data-design-width="750" data-order-id="123">
    <div id="loading" data-lock="1" class="loading">
      <div class="loading-icon"></div>
      <div id="wxtitle" class="hide"><?php echo $signinInfo['nick_name']; ?> 在趣运动的打卡</div>
      <div id="wxdesc" class="hide">快来加入趣运动打卡，有丰富的积分和代金券奖励等着你哦！~</div>
      <div id="wximgUrl" class="hide">/static/appwebview/signIn/images/LOGO.png</div>
      <div id="catId" data-cat_id="114" class="hide"></div>
    </div>
    <script src="/static/js/jweixin-1.0.0.js"></script><script type="text/javascript" src="/static/js/jgosport-1.0.js?ver=201611180"></script>
    <script src="/static/js/weixinshareurl.js"></script>
    <div class="main hide">
      <div class="share_content">
        <div class="share_info">
          <div class="share_person">
            <div class="person_img"><img src="<?php echo $signinInfo['avatar']; ?>"></div>
            <div class="name"> <span><?php echo $signinInfo['nick_name']; ?></span></div>
          </div>
          <div class="share_calendar"><img src="/static/appwebview/signIn/images/share_calendar.png">
            <p> 打卡成功！</p><span><?php echo $signinInfo['sign_in_time']; ?> <?php echo $signinInfo['venues_name']; ?></span>
          </div>
          <div class="share_step">
            <ul>
              <li><img src="/static/appwebview/signIn/images/share_icon1.png" class="w7"></li>
              <li>共打卡<span><?php echo $signinInfo['si_sum']; ?></span>次</li>
            </ul>
            <ul>
              <li><img src="/static/appwebview/signIn/images/share_icon2.png" class="w7"></li>
              <li>连续打卡<span><?php echo $signinInfo['si_cont_week_sum']; ?></span>周</li>
            </ul>
            <ul>
              <li><img src="/static/appwebview/signIn/images/share_icon3.png" class="w7"></li>
              <li> 涉足场馆<span><?php echo $signinInfo['count']; ?></span>所  </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="share_bottom">
        <ul> 
          <li class="logo"> <img src="/static/appwebview/signIn/images/LOGO.png"></li>
          <li class="ml15">
            <p>趣运动</p><span>下载APP，打卡送丰厚积分与订场代金劵！</span>
          </li>
          <li> <a id="download" class="share_btn" style="-webkit-transform: translateY(0.4rem);">立即下载</a></li>
        </ul>
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
        $('#download').click(function(){
          location.href = 'http://www.quyundong.com/d'
        })
      }
    </script>
  </body>
</html>