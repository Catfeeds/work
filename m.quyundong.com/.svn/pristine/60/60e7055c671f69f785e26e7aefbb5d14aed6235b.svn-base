<?php $this->display('public/header_202.php');?>
<link href="/themes/qu202/css/msglogin.css?v=2.2" type="text/css" rel="stylesheet">
<style>


</style>
<div id="loading" data-lock="1" class="loading">
      <div class="loading-icon"></div>
    </div>
    <div class="main hide" style="min-height:90vh;">
    	<?php if(in_array(UTM_SOURCE, Config::$source4Nothing)){
			//$this->display('public/out_top.php', array('topTitle'=>'快捷登录')); //外部来源则不显示登录标题
		}else{
      //寻球特殊处理，add by chenchao 2017-01-12
      if(in_array(CHANNEL_SOURCE, ExtendConfig::$xunqiu)){
        $quckTitle = "手机号码验证";
      } else {
        $quckTitle = "短信验证登录";
      }  
			$this->display('public/public_top_202.php', array(
				'topTitle'=>$quckTitle,
				'leftMenu' => '<i class="icon-back" onclick="history.go(-1)"></i>',
				'rightMenu' => ''	
			));
		}?>
      <ul class="wechat-form forget-form">
        <li>
          <div id="wechat-getCode" class="J_getCode">获取验证码</div>
          <div>
            <input type="text" placeholder="请输入手机号码" class="wechat-tel J_tel">
          </div>
        </li>
        <li>
          <input type="text" placeholder="请输入短信验证码" class="wechat-code J_code">
        </li>
      </ul>
      <ul class="login-in">
        <li id="login-common" class="disable J_submit">
          <?php if(in_array(CHANNEL_SOURCE, ExtendConfig::$xunqiu)){ ?>
          <div>确定</div>
          <?php } else { ?>
          <div>登录</div>
          <?php } ?>
        </li>
      </ul>
      <?php if(!in_array(UTM_SOURCE, Config::$source4Nothing) && !in_array(CHANNEL_SOURCE, ExtendConfig::$quickLoginOnly) && api_CoreHelper::getCookie('for_reserve') != 1){?>
      <div class="login-tip">有趣运动账号<a href="<?= baf_CHtml::createUrl('/login');?>">马上登录</a></div>
      <?php }?>
      <?php if(!in_array(CHANNEL_SOURCE, Config::$hideItem)) { ?>
	  <?php if(!in_array(CHANNEL_SOURCE, ExtendConfig::$xunqiu)){ ?>
      <div class="main-protocol">注册登录趣运动即表示您同意<a href="http://api.7yundong.cn/help/detail/?id=41">《趣运动用户协议》</a></div>
	  <?php } ?>
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
<script src="<?php echo TEMPLATE; ?>qu/js/common.js?v=1.9.1"></script>
<script type="text/javascript" src="<?php echo TEMPLATE; ?>qu/js/qucklogin.js?v=20161111"></script>
<?php $this->display('public/footer_202.php');?>