<?php if(!isset($entry) || $entry!=1) $this->display('public/header.php');?>
<link rel="stylesheet" href="/static/myCoupons/stylesheets/myCoupons.css?v=1.11">
<style>
body{
  font-size: 12px;
}
.qu {
    height: auto;
  }
.qu .header {
  background: #009ff0;
  height: 44px;
  border-bottom: none;
}

.qu .header h1 {
  color: #fff;
  font-size: 18px;
  text-align: center;
  line-height: 44px;
}

.qu .header .left {
  position: absolute;
  top: 0;
  left: 0;
  overflow: visible;
}

.qu .header .icon-back {
    display: inline-block;
    width: 15px;
    height:15px;
    border-bottom: 2px solid #fff;
    border-left: 2px solid #fff;
    position: absolute;
    top: 11px;
    left: 17px;
    margin:0;
    -moz-transform: rotateZ(45deg);
    -ms-transform: rotateZ(45deg);
    -webkit-transform: rotateZ(45deg);
    transform: rotateZ(45deg);
    background-image: none;
}

.qu .myCoupons-container {
  background: none;
}
.qu .myCoupons-container .nothing {
  text-align: center;
  font-size: 16px;
  color: #666;
  padding-top: 20px;
}
</style>
<script type="text/javascript">window.nm_go_index = true;</script>
<div class="qu fontfamily">
	<div class="page page-order">
		<div class="header mobile-qq-coupon">
			<div class="left"><a href="<?php echo isset($entry) && $entry==1 ? 'javascript:(function(){$(\'#coupon_waper\').html(\'\');$(\'#coupon_waper\').hide();$(\'.main\').css(\'display\',\'block\');})()' : baf_CHtml::createUrl('/user')?>"><i class="icon-back"></i></a></div>
			<div class="center"><h1>卡券</h1></div>
			<div class="right mobile-qq-coupon">
				<?php if(!isset($entry) || $entry!=1){?><a style="margin-right: 10px;" class="pay-ok-right" href="<?= baf_CHtml::createUrl('/Coupon/Expire');?>">失效卡券</a><?php }?>
			</div>
		</div>
		
		<section class="myCoupons-container">
        <div class="myCoupons-wrap">
        	<?php 
	      	if (!empty($couponList) && is_array($couponList)){  
		      	foreach($couponList as $k=>$v){
					//if($v['ticket_type']!=1) continue;//跳过非代金券的显示
		      		$now = time();
		      		if ($v['use_end_date'] <= $now){
		      			$class = 'myCoupons-disable';
		      			$enable = false;
		      		}elseif($v['use_start_date'] > $now){
		      			$class = 'myCoupons-disable';
		      			$enable = false;
		      		}else{
		      			$class = '';
		      		}
	      	?>
            <div class="myCoupons-card <?php echo $class;?>"<?php if(isset($entry) && $entry==1) echo ' onclick="Coupon.selectCoupon({ticket_type:'.(isset($v['ticket_type'])?$v['ticket_type']:1).',id:'.$v['id'].',amount:\''.intval($v['amount']).'\'})"'?>>
                <div class="myCoupons-money"><?php if(isset($v['ticket_type']) && $v['ticket_type'] == '2'){?><span>兑</span><?php }else{?><i>￥</i><span><?php echo intval($v['amount']);?></span><?php }?></div>
				<?php
				if (isset($v['ticket_type']) && $v['ticket_type'] == '2') { ?>
					<div class="myCoupons-name"><?php echo $v['front_volume_name']; ?><span
							style="color:#666;font-size:12px;"></span></div>
				<?php } else { ?>
					<div class="myCoupons-name"><?php echo $v['front_volume_name']; ?></div>
				<?php } ?>
                <ul class="myCoupons-limit">
		            <?php 
		            if(isset($v['first_instruction']) && $v['first_instruction']) echo '<li><p>'.$v['first_instruction'].'</p></li>';
		            if(isset($v['second_instruction']) && $v['second_instruction']) echo '<li><p>'.$v['second_instruction'].'</p></li>';
		            if(isset($v['third_instruction']) && $v['third_instruction']) echo '<li><p style="overflow:auto;white-space: normal;">'.$v['third_instruction'].'</p></li>';
		            ?>
                </ul>
				<div class="myCoupons-deadline">
					<span><?php echo $v['use_time']; ?></span>
					<?php if ($v['end_date'] > 0){ ?>
					<span>（<?php echo $v['end_date'] ? '还剩' . $v['end_date'] . '天' : ''; ?>）</span>
					<?php } ?>
					
					<!-- <span>有效期至：<?php echo date('Y-m-d', $v['use_end_date']); ?></span> <span>（<?php echo $v['end_date'] ? '还剩' . $v['end_date'] . '天' : ''; ?>）</span>-->
				</div>
                <div class="myCoupons-password">密码：<span><?php echo $v['sn'];?></span></div>
            </div>
            <?php }}else{?>
	      <div class="nothing"> 没有可用卡券哦～</div>
	      <?php }?>
        </div>
    </section>
<!-- 自定义部分开始结束-->
	    <div class="qu-fe-CT">
	      <div class="bottombar">
	        <a href="<?= baf_CHtml::createUrl('/Coupon/Activate/'.($entry ? '?entry='.$entry.'&nums='.$nums:''));?>" class="bottombar-left"><i class="icon-add-blue"></i><span>绑定卡券</span></a><a href="<?= baf_CHtml::createUrl('/Coupon/couponRule');?>" class="bottombar-right"><i class="icon-sm-blue"></i><span>卡券说明</span></a>
	      </div>
	    </div>
	    
	</div>
</div>
<script type="text/javascript" src="/static/js/mobileResponsive.js"></script>
<script type="text/javascript" src="<?php echo TEMPLATE; ?>qu/js/confirmOrder.js?ver=1.9.1"></script>
<?php if(!isset($entry) || $entry!=1) $this->display('public/footer.php');?>