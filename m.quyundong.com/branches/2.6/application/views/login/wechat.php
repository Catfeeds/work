<?php $this->display('public/header201.php');?>
    <link href="/themes/qu201/css/bindwechat.css" type="text/css" rel="stylesheet">
    <script src="/static/js/zeptoWithFx.min.js"></script>
    <script src="/static/js/mobileResponsive.js"></script>
    <script src="/themes/qu201/js/bindwechat.js?v=20170610"></script>

  </head>
  <body data-design-width="750">
    <div id="loading" data-lock="1" class="loading">
      <div class="loading-icon"></div>
    </div>
    <div class="main hide">
      <div class="header">
        <div class="left hide"><i class="icon-back"></i></div>
        <div class="center">绑定微信</div>
        <div class="right hide"> </div>
      </div>
      <div class="wechat-header">
        <div class="wechat-avatar">
          <div style="background-image:url(<?php
          echo !empty($userInfo['headimgurl']) ? $userInfo['headimgurl'] : DefaultController::$avatar;
          ?>);" class="wechat-userAvatar"></div>
        </div>
      </div>
      <ul class="wechat-form">
        <li>
          <div id="wechat-getCode">获取验证码</div>
          <div>
          <?php

          if(isset($from) && $from == 'wxuc'){

          ?>
            <input type="text" placeholder="填写您在场馆注册会员的手机号码" class="wechat-tel">
          <?php
          }else{

          ?>
            <input type="text" placeholder="请填写您注册趣运动的手机号码" class="wechat-tel">
            <?php
            }
            ?>
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
      <div class="wechat-law">注册登录趣运动即表示您同意<a href="<?= baf_CHtml::createUrl('/login/detail');?>">《趣运动用户协议》</a></div>
    </div>
    <div class="nm-cover hide">
      <div class="nm-alert">
        <div class="msg"> </div>
      </div>
    </div>
    <div class="wechat-sprite hide"></div>
<?php $this->display('public/footer.php'); ?>