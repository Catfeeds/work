<?php $this->display('public/header_202.php');?>
<link href="/themes/qu202/css/user.css" type="text/css" rel="stylesheet">
	<div id="loading" data-lock="1" class="loading">
      <div class="loading-icon"></div>
    </div>
    <div class="user-main" style="min-height:90vh;">
      <!-- 顶部栏 -->
      <div class="header">
         <?php if(!in_array(CHANNEL_SOURCE,ExtendConfig::$noHomeLink)){ ?>
          <div onclick="window.location.href='<?= baf_CHtml::createUrl('/');?>'" class="left"><i class="icon-back"></i></div>
          <?php } ?>
        <div class="center">我的</div>
        <?php if(!in_array(CHANNEL_SOURCE,ExtendConfig::$noHomeLink)){ ?>
        <div onclick="window.location.href = '<?= baf_CHtml::createUrl('/');?>'" class="right">首页 </div>
        <?php } ?>
      </div>
      <!-- 顶部栏end -->
      <!-- 头像和余额卡券 -->
      <div class="face borderBottom1px" style="height: auto;">
		<?php if( !in_array(CHANNEL_SOURCE, ExtendConfig::$noUserAvatar) ){ ?> 
        <div class="user borderBottom1px" onclick="window.location.href='<?= baf_CHtml::createUrl('/user/account');?>'">
          <div class="user-avatar">
          <?php 
                $head = api_CoreHelper::getCookie('avatar');
                $head = $head? $head:api_WxUser::$avatar;
                if (empty($head)){
                    $head = '/themes/qu/images/single/p2.jpg';
                }
                echo '<img class="head-ico" src="'.$head.'" style="width:0.6rem"/>';
            ?>  
          </div>
          <div class="user-name"><?php echo isset($homeInfo['nick_name']) ? $homeInfo['nick_name'] : ''?></div>
          <div class="icon-right"><img data-src="/themes/qu202/images/user/icon-right.png"></div>
        </div>
		<?php } ?>
        <div class="info">
          <div style='width:33%;' class="user-card" onclick="window.location.href='<?= baf_CHtml::createUrl('/cash/index');?>'"> <span>返现</span><br><span class="sp"><?php echo isset($homeInfo['cash_amount']) ? $homeInfo['cash_amount'] : 0?> 元</span></div>
          <div style='width:33%;border-left:1px dashed #e6e6e6' class="user-money" onclick="window.location.href='<?= baf_CHtml::createUrl('/user/balance');?>'"> <span>余额</span><br><span class="sp"><?php echo isset($homeInfo['money']) ? $homeInfo['money'] : 0?> 元</span></div>
          <div style='width:33%;' class="user-card" onclick="window.location.href='<?= baf_CHtml::createUrl('/Coupon/Index');?>'"> <span>卡券</span><br><span class="sp"><?php echo isset($homeInfo['coupon_number']) ? $homeInfo['coupon_number'] : 0?> 张可用</span></div>
        </div>
      </div>
      <!-- 头像和余额卡券end -->
      <!-- 其他信息 -->
      <div class="user-more borderTop1px">
        <!-- 我的订单 -->
  <?php if (isset($msgCount[2]) && $msgCount[2])  { ?>
    <div class="user-order borderBottom1px" onclick="window.location.href='<?= baf_CHtml::createUrl('/myorder/index?type=0');?>'">
    <?php }else if (isset($msgCount[9]) && $msgCount[9]) { ?>
    <div class="user-order borderBottom1px" onclick="window.location.href='<?= baf_CHtml::createUrl('/myorder');?>'">
      <?php } else {?>
        <div class="user-order borderBottom1px" onclick="window.location.href='<?= baf_CHtml::createUrl('/myorder/index?type=0');?>'">
        <?php } ?>
          <div class="icon-right"><img data-src="/themes/qu202/images/user/icon-right.png"></div>
          <div class="icon-order"><img data-src="/themes/qu202/images/user/icon-order.png"></div><span>我的订单</span><span class="right hide">待开始<i style="color:#ff6e6e">(2)</i></span>
          <span class="right"><?php if (isset($msgCount[2]) && $msgCount[2]) { ?><i>未支付</i>
              <i class="pay"><?php echo $msgCount[2]; ?></i>
            <?php } elseif (isset($msgCount[9]) && $msgCount[9]) { ?>
              <i>待开始</i>
              <i style="color:#ff6e6e">（<?php echo $msgCount[9]; ?>）</i>
            <?php } ?>
          </span>
        </div>
        <!-- 我的订单end -->
      </div>

      <?php 
      if(isset($homeInfo['order_notify']) && $homeInfo['order_notify']){
      ?>
      <!-- 今日订单 -->
      <div class="user-order-today borderBottom1px borderTop1px">
        <p>今日预订</p>
        <?php 
        foreach ($homeInfo['order_notify'] as $v){
        ?>
          <div class="user-order-today-card"
               onclick="window.location.href='<?= baf_CHtml::createUrl('/myorder/detail?id='.$v['order_id']);?>'">
          <div class="top borderBottom1px">
            <div data-type="" data-src="url('<?php echo $v['icon'] ; ?>')" class="icon-type use-background"> </div><span><?php echo $v['name'];?></span>
          </div>
          <div class="bottom">
            <div class="l"><span class="time">开始时间:</span><span class="date"><?php echo $v['start_time'] ? date('m/d H:i',$v['start_time']) : ''?></span></div>
            <div class="r">
              <span class="ckeck">验证码:</span><span class="number">
                <?php
                if ($v['order_type'] != '3'){
                echo $v['verification_code'] ?></span>
              <?php } else {
                echo '会员卡';
              } ?>
            </div>
          </div>
        </div>
        <?php }?>
      </div>
      <!-- 今日订单end -->
      <?php }?>
      <!-- 会员卡和我的收藏 -->
      <?php if (!in_array(CHANNEL_SOURCE,Config::$hideItem)) { ?>
      <div style="margin-top:0;" class="user-more borderBottom1px">
        <a href="<?= baf_CHtml::createUrl('/userCard');?>" class="user-vip-card borderBottom1px">
          <div class="icon-right"><img data-src="/themes/qu202/images/user/icon-right.png"></div>
          <div class="icon-vip-card"><img data-src="/themes/qu202/images/user/icon-vip-card.png"></div><span>场馆会员卡</span>
        </a>
        <a href="<?= baf_CHtml::createUrl('/user/favoriteList');?>" class="user-favourite">
          <div class="icon-right"><img data-src="/themes/qu202/images/user/icon-right.png"></div>
          <div class="icon-favourite"><img data-src="/themes/qu202/images/user/icon-favourite.png"></div><span>我的收藏</span>
        </a>
      </div>
      <?php } ?>
      <!-- 会员卡和我的收藏end -->
      <!-- 联系客服 -->
      <div class="user-telephone borderBottom1px borderTop1px">
        <div class="user-400">
          <div class="icon-right"><img data-src="/themes/qu202/images/user/icon-right.png"></div>
          <div class="icon-telephone"><img data-src="/themes/qu202/images/user/icon-telephone.png"></div><span>联系客服</span>
        </div>
      </div>
      <div class="nm-cover hide">
        <div class="nm-phone-alert">
          <div class="top">
            <div class="massage borderBottom1px">
              <p>客服在线时间：周一至周六 10:00-20:00</p>
              <p><span style="visibility: hidden;">客服在线时间：周日至</span>周日 10:00-18:00</p>
              <p class="phoneNumber">4000-410-480</p>
            </div><a href="tel:4000410480" class="call">拨打</a>
          </div>
          <div class="cancel">取消</div>
        </div>
      </div>
    <!-- 联系客服end -->
    </div>
    <script src="/static/js/zeptoWithFx.min.js"></script>
    <script src="/static/js/mobileResponsive.js"></script>
    <script src="/themes/qu202/js/user_es5.js"></script>
    
    <div style="display: none;">
      <script>
        $(document).ready(function(){
          var ua = window.navigator.userAgent;
          if( ua.indexOf("Android") != -1 && ua.indexOf("UC") != -1){
            setTimeout(function(){
              var style = document.createElement("style");
              style.innerHTML = "UCBUG{}";
              document.head.appendChild(style);
            },1000);
          }
        });
      </script>
    </div>
<?php $this->display('public/footer_202.php');?>