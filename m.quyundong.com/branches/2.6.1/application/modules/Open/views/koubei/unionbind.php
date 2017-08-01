<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>趣运动-订场神器_订场就这么简单_网上预订_手机订场_羽毛球订场_羽毛球馆_足球场_游泳馆查询预订_去运动</title>
    <meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1, user-scalable=no">
    <meta name="keywords" content="趣运动,在线预订,手机订场,订场优惠,羽毛球订场,足球场,游泳馆查询预订,去运动,订场神器">
    <meta name="description" content="趣运动专注球场在线预订,羽毛球馆,足球场,网球场,球场在线预订,游泳馆查询预订,手机在线预订,运动场馆价格表,运动场馆优惠信息,去运动就上趣运动.">
    <script src="/static/js/zeptoWithFx.min.js"></script>
    <script src="/static/js/mobileResponsive.js"></script>
    <script src="/themes/qu/js/common.js"></script>
    <script src="/themes/koubei/js/unionbind.js"></script>
    <link href="/themes/qu201/css/bindwechat_sec.css" type="text/css" rel="stylesheet">
    <script src="/static/js/alipayJSBridge.js"></script>
  </head>

    
    
  <body data-design-width="750">
    <div id="loading" data-lock="1" class="loading">
      <div class="loading-icon"></div>
    </div>
    <div class="main hide">
      <!-- <div class="header">
        <div class="left hide"><i class="icon-back"></i></div>
        <div class="center">绑定帐号</div>
        <div class="right hide"> </div>
      </div> -->
      <div class="wechat-header">
        <div class="wechat-avatar">
          <div style="background-image:url(<?php
          echo !empty($openUserInfo['avatar']) ? $openUserInfo['avatar'] : DefaultController::$avatar;
          ?>);" class="wechat-userAvatar"></div>
          <h2><?php echo !empty($openUserInfo['nick_name']) ? $openUserInfo['nick_name'] : ''?></h2>
        </div>
      </div>
      <ul class="wechat-form">
        <li>
          <div id="wechat-getCode">获取验证码</div>
          <div>
            <input type="text" placeholder="请填写您注册趣运动的手机号码" class="wechat-tel">
          </div>
        </li>
        <li>
          <input type="text" placeholder="请输入验证码" class="wechat-code">
        </li>
      </ul>
      <span id="url_data" style="display: none"><?php echo isset($from_url)? $from_url: '';?></span>
      <span id="login_data" style="display: none"><?php echo isset($from)? $from: '';?></span>
                <?php
                if( isset($from) && !empty($from) ){
                ?>
                <p class="wechat-tip"></p>
                <?php
                } else {

                  ?>
             <p class="wechat-tip">Tips:若未注册趣运动，可绑定其他手机号码</p>
                  <?php
                }
                ?>
      <div class="wechat-bind">绑定</div>
      <!-- <div class="wechat-law">注册登录趣运动即表示您同意<a href="/login/detail">《趣运动用户协议》</a></div> -->
    </div>
    <div class="nm-cover hide">
      <div class="nm-alert">
        <div class="msg"> </div>
      </div>
    </div>
    <div class="wechat-sprite hide"></div>
  </body>
</html>