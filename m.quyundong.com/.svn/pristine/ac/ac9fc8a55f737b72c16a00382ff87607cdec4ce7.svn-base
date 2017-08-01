<?php $this->display('public/header_202.php');?>
<link href="/themes/qu202/css/account.css" type="text/css" rel="stylesheet">
    <div id="loading" data-lock="1" class="loading">
      <div class="loading-icon"></div>
    </div>
    <div class="main hide">
      <div class="header">
        <div class="left"><i class="icon-back" onclick="window.location.href='<?= baf_CHtml::createUrl('/user');?>'"></i></div>
        <div class="center">账户管理</div>
        <div class="right hide"></div>
      </div>
      <ul class="login-header mobile-qq-user-account">
        <li onclick="window.location.href='<?= baf_CHtml::createUrl('/user/info');?>'">
          <div>我的资料</div>
          <div></div>
        </li>
        <li onclick="bindPhone()"> 
          <div>手机号码</div>
          <div id="mobile" data="<?php echo $mobile;?>"><?php echo $mobile;?></div>
        </li>
        <?php if (!in_array(CHANNEL_SOURCE,ExtendConfig::$noChangePwd)) { ?>
        <li class='loginPassword' onclick="window.location.href='<?= $isSetPw==1 ? baf_CHtml::createUrl('/user/changePassword') : baf_CHtml::createUrl('/user/setPassword');?>'">
          <div>登录密码</div>
          <div><?php if($isSetPw==1){ echo '修改'; }else{ echo '未设置'; }?></div>
        </li>        
        <li id="bind_wx" onclick="bindWx()" status="<?php echo api_WxApi::isWeixin() ? 1 : 0; ?>"
            data="<?php echo isset($openInfo['open_nick_name']) ? $openInfo['open_nick_name'] : ''; ?>">
          <div>绑定微信</div>
          <div class="nick"><?php echo isset($openInfo['open_nick_name']) ? $openInfo['open_nick_name'] : ''; ?></div>
        </li>
        <?php } ?>
      </ul>
      <ul class="login-in mobile-qq-user-account">
        <li id="login-common">
          <div id="logOut">退出登录</div>
        </li>
      </ul>
    </div>
    <div class="toast hide">
      <div class="toast-alert">
        <div class="toast-msg"></div>
      </div>
    </div>
    <div class="nm-cover hide" id="confirm" data="">
      <div class="nm-alert">
        <div class="msg">您已经绑定了手机号，确定要绑定新的手机号?</div>
        <div class="cancel"> 
          <div class="l" data="0">取消</div>
          <div class="r" data="1">确定</div>
        </div>
      </div>
    </div>
  <div style="display: none;" id="bindwx">
    <?php
    if (isset($from) && !empty($from)) {
      echo urldecode($from);
    }
    echo "";
    ?>
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
    <script src="/static/js/gslogout.js?ver=20161121"></script>
    <script src="/themes/qu202/js/account.js?v=20161118"></script>
<?php $this->display('public/footer_202.php');?>