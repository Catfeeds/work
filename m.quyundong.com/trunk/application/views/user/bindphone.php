<?php $this->display('public/header_202.php'); ?>
<link href="/themes/qu202/css/bindphone.css" type="text/css" rel="stylesheet">
	<div id="loading" data-lock="1" class="loading">
      <div class="loading-icon"></div>
    </div>
    <div class="main hide">
      <div class="header">
        <div class="left"><i class="icon-back" onclick="history.go(-1)"></i></div>
        <div class="center">绑定手机号</div>
        <div class="right hide"></div>
      </div>
      <ul class="wechat-form">
        <li>
          <div id="wechat-getCode">获取验证码</div>
          <div>
            <input type="text" placeholder="请输入手机号码" class="wechat-tel">
          </div>
        </li>
        <li>
          <input type="text" placeholder="请输入短信验证码" class="wechat-msg">
        </li>
        <li>
          <input type="password" placeholder="请输入密码" class="wechat-pw">
        </li>
        <li>
          <input type="password" placeholder="请再次输入密码" class="wechat-pw">
        </li>
      </ul>
      <ul class="login-in">
        <li id="login-common" class="disable">
          <div class="J_submit hide">绑定</div>
        </li>
      </ul>
    </div>
    <div class="toast hide">
      <div class="toast-alert">
        <div class="toast-msg"></div>
      </div>
    </div>
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
<script type="text/javascript" src="/themes/qu/js/common.js?v=1.9.1"></script>
<script src="/themes/qu202/js/bindphone.js?v=20161111"></script>
<?php $this->display('public/footer_202.php'); ?>
