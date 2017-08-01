<?php $this->display('public/header_202.php');?>
    <script src="/themes/qu/js/common.js?v=1.9.1"></script>
    <script src="/themes/qu202/js/forget.js?v=20161111"></script>
    <link href="/themes/qu202/css/forget.css" type="text/css" rel="stylesheet">
    <style>
      #forget-tel {
        overflow: hidden;
        font-size: 0.14rem;
        text-align: left;
        color: #666;
    }
    .wechat-form li:first-child{
       border-bottom: none;
    }
    .forget-form li:nth-of-type(2){
       display: none;
    }
    </style>
    <div id="loading" data-lock="1" class="loading" data-orderid="<?=$orderid?>">
      <div class="loading-icon"></div>
    </div>
    <div class="main hide">
      <div class="header">
        <div class="left"><i class="icon-back" onclick="history.go(-1)"></i></div>
        <div class="center">忘记支付密码</div>
        <div class="right"></div>
      </div>
      <ul class="wechat-form forget-form">
        <li>
          <div id="wechat-getCode">获取验证码</div>
          <div id="forget-tel">
            <?php
            $phone = api_CoreHelper::getCookie('phone');
            $phone = $phone ? $phone : api_WxUser::$phone;
            if ($phone) {
              echo $phone;
            }
            ?>
          </div>
        </li>
        <li>
          <input type="text" placeholder="请输入短信验证码" class="wechat-code">
        </li>
      </ul>
      <div class="wechat-bind hide">确定</div>
      <div class="recharge-inputPw hide mobile-qq">
        <div class="recharge-btnGroup"><span></span>
          <p>请输入旧的支付密码验证身份</p>
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <input id="recharge-pw" type="tel" autocomplete="off">
          </ul>
        </div>
      </div>
    </div>
    <div class="toast hide">
      <div class="toast-alert">
        <div class="toast-msg"></div>
      </div>
    </div>
    <div class="wechat-sprite hide"></div>
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
<?php $this->display('public/footer_202.php');?>