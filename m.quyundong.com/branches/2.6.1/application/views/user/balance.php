<?php $this->display('public/header_202.php');?>
<link href="/themes/qu202/css/recharge.css" type="text/css" rel="stylesheet">
<script type="text/javascript">window.nm_go_index = true</script>
	<div id="loading" data-lock="1" class="loading">
      <div class="loading-icon"></div>
    </div>
    <div class="main hide">
      <div class="header">
        <div class="left"><i class="icon-back" onclick="window.location.href='<?= baf_CHtml::createUrl('/user');?>'"></i></div>
        <div class="center">余额</div>
        <?php if ($userInfo) { ?>
        <div class="right mobile-qq yue">支付密码</div>
      </div>
      <div class="recharge-header">
        <div><img src="/themes/qu202/images/extradpr2x.png" alt=""></div>
        <p>余额</p>
        <p>￥<?php echo isset($userInfo['user_money']) ? $userInfo['user_money'] : 0 ?></p>
      </div>
      <?php } ?>
      <div class="recharge-selects"><span onclick="location.href='<?= baf_CHtml::createUrl('/user/bRule');?>'">使用说明</span><span onclick="location.href='<?= baf_CHtml::createUrl('/user/moneyLog');?>'">历史记录</span></div>
      <div class="recharge-input">
        <div id="recharge-btn">充值</div>
        <div>
          <input id="recharge-czpw" type="text" placeholder="请输入您的储值卡密码">
        </div>
      </div>
      <div class="recharge-password mobile-qq hide">
        <div class="recharge-pwWrap">
          <?php if($userInfo['is_set_paypassword'] == '1') {?>
            <div class="recharge-forgetPw">
              <p id="recharge-modifyPw" data-type="2">修改支付密码</p>
              <p id="recharge-forgetPw" onclick="location.href='<?= baf_CHtml::createUrl('/user/forget');?>'">忘记支付密码</p>
            </div>
          <?php }else{ ?>
            <div class="recharge-setPw">
              <p id="recharge-setPw" data-type="1">设置支付密码</p>
            </div>
          <?php } ?>
          <div class="recharge-cancel">
            <p id="recharge-cancel">取消</p>
          </div>
        </div>
      </div>
      <div class="recharge-inputPw mobile-qq hide">
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
    <div class="nm-cover hide">
      <div class="nm-alert">
        <div class="msg">充值成功!</div>
        <div class="cancel"> 
          <div class="l">确定</div>
        </div>
      </div>
    </div>
    <div class="toast hide">
      <div class="toast-alert">
        <div class="toast-msg">你好啊</div>
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
<script src="/themes/qu202/js/recharge.js?ver=20161111"></script>    
<?php $this->display('public/footer_202.php');?>