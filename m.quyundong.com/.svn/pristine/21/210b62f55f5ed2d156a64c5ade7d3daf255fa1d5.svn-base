<?php $this->display('public/header_202.php');?>
<link href="/themes/qu202/css/setpassword.css" type="text/css" rel="stylesheet">
<style type="text/css">
    #setpassword-tel{
        text-align: left;
        color:#222;
    }
</style>
<div id="loading" data-lock="1" class="loading">
      <div class="loading-icon"></div>
    </div>
    <div class="main hide">
      <div class="header">
        <div class="left"><i class="icon-back" onclick="history.go(-1)"></i></div>
        <div class="center">设置密码</div>
        <div class="right hide"></div>
      </div>
      <ul class="login-header wechat-form">
        <li> 
          <div>手机号</div>
            <div id="setpassword-tel">
                <?= isset($phone) ? $phone : '' ?>
          </div>
        </li>
        <li>
          <div>新密码</div>
          <div> 
            <input type="password" placeholder="请输入登录密码" class="wechat-pw J_pwd">
          </div>
        </li>
        <li>
          <div>确认新密码</div>
          <div> 
            <input type="password" placeholder="请再次输入密码以确认" class="wechat-pw J_pwd2">
          </div>
        </li>
      </ul>
      <ul class="login-in">
        <li id="login-common" class="disable J_submit">
          <div>提交</div>
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
<script type="text/javascript" src="<?php echo TEMPLATE; ?>qu/js/common.js?v=1.9.1"></script>
<script type="text/javascript" src="<?php echo TEMPLATE; ?>qu/js/setPassword.js?ver=20161111"></script>
<?php $this->display('public/footer_202.php');?>