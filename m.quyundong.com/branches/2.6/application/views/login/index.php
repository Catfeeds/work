<?php $this->display('public/header_202.php');?>
<link href="/themes/qu202/css/login.css" type="text/css" rel="stylesheet">
<style>
  .login-tip a, .login-tip a:hover,.login-tip a:visited,.main-protocol a, .main-protocol a:hover,.main-protocol a:visited {
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
    <div class="main hide">
      <div class="header">
        <div class="left"><i class="icon-back" onclick="history.go(-1)"></i></div>
        <div class="center">登录</div>
        <div class="right" style="width:5em;"></div>
      </div>
      <ul class="login-header">
        <li> 
          <div>手机号码</div>
          <div> 
            <input type="text" placeholder="请输入手机号码" class="login-tel J_tel">
          </div>
        </li>
        <li>
          <div>登录密码</div>
          <div> 
            <input type="password" placeholder="请输入登录密码" class="J_pwd">
          </div>
        </li>
      </ul>
      <ul class="login-in">
        <li id="login-common" class="disable">
          <div class="J_submit">普通登录</div>
        </li>
          <!-- <?php /*if(api_WxApi::isWeixin()){*/ ?>
        <li>
          <div onclick="window.location.href='/login/index?login=wx'"><img src="/themes/qu202/images/wx.png"> 微信登录</div>
        </li>
        --><?php /*}*/ ?>
      </ul>
      <div class="login-tip"><span><a href="<?= baf_CHtml::createUrl('/login/register');?>" >注册</a></span><span><a href="<?= baf_CHtml::createUrl('/login/resetPassword');?>" style="padding-right:3em;">忘记密码？</a><a href="<?= baf_CHtml::createUrl('/login/qucklogin');?>">短信验证登录</a></span></div>
      <?php if(!in_array(CHANNEL_SOURCE,Config::$hideItem)) { ?>
    	<div class="main-protocol">注册登录趣运动即表示您同意<a href="http://api.7yundong.cn/help/detail/?id=41">《趣运动用户协议》</a></div>
      <?php }?>
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
<script type="text/javascript" src="/themes/qu/js/common.js?v=1.9.1"></script>
<script type="text/javascript" src="/themes/qu/js/login.js?v=20161111"></script>
<?php $this->display('public/footer_202.php');?>