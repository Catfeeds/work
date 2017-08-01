<?php $this->display('public/header_202.php');?>
<link href="/themes/qu202/css/account.css" type="text/css" rel="stylesheet">
<div id="loading" data-lock="1" class="loading">
  <div class="loading-icon"></div>
</div>
<div class="main hide">
  <div class="header">
    <div class="left"><a href="javascript:window.history.go(-1);"><i class="icon-back"></i></a></div>
    <div class="center">我的资料</div>
    <div class="right hide"></div>
  </div>
  <ul class="login-header sex-select">
    <li class="select-mysex selecter">
      <div>我的性别 </div>
      <div><?php if(!empty($userInfo['gender'])){ echo baf_Common::getGender($userInfo['gender']);} ?></div>
    </li>
    <li class="select-sex hide">
      <input id="male" type="radio" name="sex" value="m" class="hide"<?php if(!empty($userInfo['gender']) && $userInfo['gender']=='m') echo ' checked'?>>
      <label for="male">男</label>
    </li>
    <li class="select-sex hide">
      <input id="female" type="radio" name="sex" value="f" class="hide"<?php if(!empty($userInfo['gender']) && $userInfo['gender']=='f') echo ' checked'?>>
      <label for="female">女</label>
    </li>
  </ul>
  <from id="selectFrom" data-href="<?= baf_CHtml::createUrl('/user/updateInfo');?>">
    <input id="sex" type="hidden" name="gender" value="<?php echo !empty($userInfo['gender']) ? $userInfo['gender'] : '';?>">
    <ul class="login-in">
      <li id="login-common">
        <div id="saveData">保存修改</div>
      </li>
    </ul>
  </from>
</div>
<div class="toast hide">
  <div class="toast-alert">
    <div class="toast-msg"></div>
  </div>
</div>
<script src="/themes/qu202/js/mydata.js?ver=20161111"></script>
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

