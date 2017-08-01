<?php $this->display('public/header_202.php');?>
<link href="/themes/qu202/css/resetpw.css" type="text/css" rel="stylesheet">
<style>
 .main-protocol a, .main-protocol a:hover,.main-protocol a:visited {
    color: #009ff0
}
 .main-protocol{
    position: absolute;
    bottom: 0.2rem;
    left: 0;
    width: 100%;
    text-align: center;
}

</style>
	<div id="loading" data-lock="1" class="loading">
      <div class="loading-icon"></div>
    </div>
    <div class="main">
    	<?php 
		$this->display('public/public_top_202.php', array(
				'topTitle'=>'注册',
				'leftMenu' => '<i class="icon-back J_back"></i>',
				'rightMenu' => ''
		));
		?>
      <ul class="wechat-form forget-form">
        <li>
          <div id="wechat-getCode" class="J_getCode">获取验证码</div>
          <div>
            <input type="text" placeholder="请输入手机号码" class="wechat-tel J_tel">
          </div>
        </li>
        <li style="display: block; height: 30px;">
          <img src="/Captcha/index" onclick="this.src='/Captcha/index?rnd='+Math.random()" style="width:120px; float: right;" alt="验证码"/>
          <input id="checkCode" type="text" style="width: 50%; float: left; " placeholder="请输入验证码" /> 
          <div style="clear: both;"></div>
        </li>
        <li>
          <input type="text" placeholder="请输入短信验证码" class="wechat-msg J_code">
        </li>
        <li>
          <input type="password" placeholder="请输入密码" class="wechat-pw J_pwd">
        </li>
        <li>
          <input type="password" placeholder="请再次输入密码" class="wechat-pw J_pwd2">
        </li>
      </ul>
      <ul class="login-in">
        <li id="login-common" class="disable J_submit hide">
          <div>注册</div>
        </li>
      </ul>
      <?php if(!in_array(CHANNEL_SOURCE,Config::$hideItem)) { ?>
      <div class="main-protocol">注册登录趣运动即表示您同意<a href="http://api.7yundong.cn/help/detail/?id=41">《趣运动用户协议》</a></div>
      <?php } ?>
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
<script src="/static/js/gslogin.js?v=201611118"></script>
<script type="text/javascript" src="<?php echo TEMPLATE; ?>qu/js/common.js?v=1.9.1"></script>
<script type="text/javascript" src="<?php echo TEMPLATE; ?>qu/js/register.js?v=2017071019"></script>
<?php $this->display('public/footer_202.php');?>