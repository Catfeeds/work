<ul class="coupon-list">
	<?php 
  	if (!empty($couponList) && is_array($couponList)){  
      	foreach($couponList as $k=>$v){
			//if($v['ticket_type']!=1) continue;//跳过非代金券的显示
      		$now = time();
      		if ($v['use_end_date'] <= $now){
      			$class = 'myCoupons-disable';
      			$enable = false;
      		}elseif($v['use_start_date'] > $now){
      			$class = '
      			';
      			$enable = false;
      		}else{
      			$class = '';
      		}
  	?>

    <li class="<?php echo $class;?>" <?php if(isset($entry) && $entry==1) echo ' onclick="Coupon.selectCoupon(this,{ticket_type:'.(isset($v['ticket_type'])?$v['ticket_type']:1).',id:'.$v['id'].',amount:\''.intval($v['amount']).'\'})"'?> style="background-image:url(/themes/koubei/order/images/djq.png)" >
		<div class="coupon-list-top"></div>
		<div class="coupon-list-body">
            <p><?php echo $v['front_volume_name']; ?></p>
            <p>
	            <?php 
	            if(isset($v['first_instruction']) && $v['first_instruction']) echo $v['first_instruction'];
	            else if(isset($v['second_instruction']) && $v['second_instruction']) echo $v['second_instruction'];
	            else if(isset($v['third_instruction']) && $v['third_instruction']) echo $v['third_instruction'];
	            ?>
            </p>
            <p>有效期至<?php echo date('Y-m-d', $v['use_end_date']); ?></p>
        </div>
		</li>
    <?php }}else{?>
  <div class="coupon-nothing">
    <div>
      <img src="/themes/koubei/order/images/nocoupon.png" alt="">
    </div>
    <div>没有可使用的优惠券～</div>
    <div class="coupon-nothing-back" onclick="Coupon.cancelSelectCoupon();">确定</div>
  </div>
  <?php }?>
</ul>

<?php if(!empty($couponList) && is_array($couponList)){?>
  <div class="coupon-check">
    <label for="couponCheck"><input id="couponCheck" type="checkbox"><em></em><span>不使用优惠券</span></label>
  </div>
<?php }?>