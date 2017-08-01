<?php $this->display('public/header.php');?>
<link rel="stylesheet" href="/static/myCoupons/stylesheets/myCoupons.css?v=1.1">
<style type="text/css">
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
<div class="qu fontfamily">
	<div class="page page-order">
		<div class="header">
			<div class="left"><a href="javascript:history.go(-1)"><i class="icon-back"></i></a></div>
			<div class="center"><h1>失效卡券</h1></div>
			<div class="right">
				<a style="margin-right: 10px;" class="pay-ok-right" href="<?= baf_CHtml::createUrl('/Coupon/Index');?>">卡券</a>
			</div>
		</div>
		<!-- 自定义部分开始-->
	    <section class="myCoupons-container">
        <div class="myCoupons-wrap">
        	<?php 
	      	if (!empty($couponList) && is_array($couponList)){      	
		      	foreach($couponList as $k=>$v){
		      		$now = time();
		      		$status = array(
		      			0=>'未激活',
						1=>'已激活',
						2=>'已使用',
						3=>'已过期',
						4=>'已邦定'
		      		);
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
            <div class="myCoupons-card myCoupons-disable">
                <div class="myCoupons-money"><i>￥</i><span><?php echo intval($v['amount']);?></span></div>
                <div class="myCoupons-name"><?php echo $v['name'];?></div>
                <ul class="myCoupons-limit">               
		            <?php 
		            if(isset($v['first_instruction']) && $v['first_instruction']) echo '<li><p>'.$v['first_instruction'].'</p></li>';
		            if(isset($v['second_instruction']) && $v['second_instruction']) echo '<li><p>'.$v['second_instruction'].'</p></li>';
		            if(isset($v['third_instruction']) && $v['third_instruction']) echo '<li><p style="overflow:auto;white-space: normal;">'.$v['third_instruction'].'</p></li>';
		            ?>
                </ul>
                <div class="myCoupons-deadline"><span>状态：<?php echo isset($status[$v['status']]) ? $status[$v['status']] : '';?></span></div>
                <div class="myCoupons-password">密码：<span><?php echo $v['sn'];?></span></div>
            </div>
            <?php }}else{?>
	      <div class="nothing"> 没有卡券哦～</div>
	      <?php }?>
        </div>
    </section>
	    <!-- 自定义部分开始结束-->
	</div>
</div>
<script type="text/javascript" src="/static/js/mobileResponsive.js"></script>
<script type="text/javascript" src="<?php echo TEMPLATE; ?>qu/js/confirmOrder.js?ver=1.9.1"></script>
<?php $this->display('public/footer.php');?>