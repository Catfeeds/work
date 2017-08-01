<?php $this->display('public/header.php');?>
<style>
	.verificationCode{
		overflow: hidden;
    	color: #6a6a6a;
	}
  .verificationCode.sp img{
    display: none;
  }
  .verificationCode.sp .verificationCode-show{
    border-bottom: 0px;
  }
	.verificationCode ul{
		display:none;
	}

	.verificationCode.expand ul{
		display:block;
	}
	.verificationCode.expand img{
		transform:rotate(180deg);
		-webkit-transform:rotate(180deg);
	}
	.verificationCode.expand div{
		/* border-bottom:1px solid #ccc; */
	}
	.verificationCode small{
		margin-left:5px;
		font-size: smaller;
	}
	.verificationCode div{
		padding-bottom:5px;
	}
	.verificationCode div img{
		width:18px;
		margin-top:3px;
		margin-right:10px;
	}
	.verificationCode ul{
		padding-bottom:5px;
	}
	.verificationCode li{
		margin-bottom:3px;
	}
	.verificationCode li.outofuse{
    	color: #6a6a6a;
	}
  p em{
    display: inline-block;border-radius: 3px;padding: 1px 5px;margin-bottom: 5px;margin-right: 5px;border: 1px solid #ff850d;color: #ff850d;
  }
  #rightShow{
    -webkit-transition:all 0.3s ease 0s;transition:all 0.3s ease 0s;
  }
  .rotate180{
    -webkit-transform: rotate(180deg);transform: rotate(180deg);
  }
</style>
<script>
function showTips () {
    var msg = '<p style="text-align:left;margin-top:-10px;"><em style="display: inline-block;border-radius: 3px;padding: 1px 5px;margin-bottom: 5px;margin-right: 5px;border: 1px solid #ff850d;color: #ff850d;">现金红包</em></p>' 
            + '<p style="text-align:left;margin-top:10px;">1.场地消费后，现金红包（可提现）将在24小时内自动放入趣运动账户，并提供场地报销单；</p>'
            + '<p style="text-align:left;margin-top:10px;">2.报销凭证在 趣运动APP "我的-开具发票"中申请；</p>'
            + '<p style="text-align:left;margin-top:10px;">3.报销凭证和返现金额，以实际支付金额为准（不含储值卡支付部分）</p>';
    $.tipsBox.show(msg,'确定','px');
}
</script>
<div class="qu">
	<div class="page page-order">

		<div class="header">
			<div class="left"><a href="javascript:window.history.go(-1);"><i class="icon-back"></i></a></div>
			<div class="center"><h1>订单详情</h1></div>
			<div class="right"></div>
		</div>
		<?php if(!empty($detail)){?>
		<div class="order-bd">
            <div class="order-item">
				<ul class="info-list" style="border-bottom: 0px;">
					<li class="bdline">
						<p style="margin-left: 20px;color:#636363;font-size: 15px;height:20px;overflow:hidden;"><?php echo isset($detail['name']) ? $detail['name'] : ''; ?></p>
					</li>
					<li>
						<p style="margin-left: 20px;color:#636363;font-size: 12px;"><?php echo isset($detail['address']) ? $detail['address'] : ''; ?></p>
					</li>
                </ul>
            </div>
        
			<div class="order-item">
				<ul class="info-list">
					<li>
						<p class="t">项目</p>
						<p class="c"><?php echo isset($detail['category_name']) ? $detail['category_name'] : ''; ?></p>
					</li>
                    <?php if ($detail['order_type'] == 1) {?>
                        <li>
                            <p class="t">套餐</p>
                            <p class="c"><?php echo baf_CHtml::encode($detail['goods_list'][0]['goods_name']); ?></p>
                        </li>
                        <li>
                            <p class="t">数量</p>
                            <p class="c"><?php echo baf_CHtml::encode($detail['goods_list'][0]['goods_number']); ?></p>
                        </li>
                    <?php } else {?>
                        <li>
                            <p class="t">日期</p>
                            <p class="c"><?php echo isset($detail['goods_list'][0]['book_date']) ? $detail['goods_list'][0]['book_date'] : ''; ?></p>
                        </li>
                        <li>
                            <p class="t">场地信息</p>
                            <p class="c">
                                <?php
                                if(isset($detail['goods_list']) && is_array($detail['goods_list'])){
	                                foreach($detail['goods_list'] AS $v){
										$time = isset($v['start_time']) && isset($v['end_time']) && $v['start_time'] && $v['end_time'] ? date('G:i', $v['start_time']).'-'.date('G:i', $v['end_time']) : $v['hour'].":00-".($v['hour']+1).":00";
										echo $time."  &nbsp;".$v['course_name']." &nbsp;". ($detail['order_type'] == 3 ? '' : $v['shop_price']."元").'<br \>';
									}	
                                }                                
                                ?>
                            </p>
                        </li>
                    <?php } ?>
                    <?php if ($detail['order_type'] != 3) { ?>
					<li>
						<p class="t">支付金额</p>
						<p class="c" style="font-size: 18px;color:#f28f4c;"><?php echo floatval($detail['order_amount']) + floatval($detail['user_money']); ?>元 <?php if(!empty($detail['package_type'])){?><em onclick='showTips()'>10%现金红包</em><?php }?><img id='rightShow' data-show='0' class='right' style='margin-right:5px;' src="/themes/qu205/order/images/arrow-d.png" alt=""></p>
            <ul class="info-list hide" id='showDetail'>
              <li><p class="t"><?=!empty($detail['package_type']) ? '套餐' : ''?>总额</p><p class="c"><?=!empty($detail['total_amount']) ? $detail['total_amount']:0;?>元</p></li>
              <li><p class="t">卡券</p><p class="c"><?=!empty($detail['coupon_amount']) ? $detail['coupon_amount'] : 0?>元</p></li>
              <li><p class="t">活动</p><p class="c">-<?=!empty($detail['order_promote_original']) ? $detail['order_promote_original'] : 0?>元</p></li>
              <li><p class="t"><?=!empty($detail['format_pay_name']) ? $detail['format_pay_name'] : '支付'?></p><p class="c" style='color:#f28f4c;'><?php echo floatval($detail['order_amount']) + floatval($detail['user_money']); ?>元</p></li>
            </ul>
					</li>
					<?php } ?>
				</ul>

				<ul class="info-list">
					<?php if($detail['order_status']!=8){ ?>
					<li>
						<p class="t">验证码</p>
						<?php 	
							if(empty($detail['qr_code_list'])){
						 ?>
						<p class="c"><?php if($detail['order_type']==3){ echo '会员卡';}elseif(!empty($detail['verification_code'])){ echo $detail['verification_code'];}  ?></p>
						<?php 	}else{ ?>	
						<div class="verificationCode">
							<?php 
								$qrStatus = array(0=>'未验证', 1=>'已验证',2=>'退款中',3=>'已退款');	
								if(isset($detail['qr_code_list'][0])){
							?>
							<div class="verificationCode-show">
								<span><?php echo isset($detail['qr_code_list'][0]['qr_code']) ? $detail['qr_code_list'][0]['qr_code'] : '';?><small></small></span>
								<img class='right' src="/themes/qu205/order/images/arrow-d.png" alt="">
							</div>
							<?php }	
								if(isset($detail['qr_code_list']) && count($detail['qr_code_list'])>1){
							?>
							<ul>
								<?php 	
									foreach ($detail['qr_code_list'] as $k => $v) {
										if($k==0) continue;
										$qrTips = '';
										if(!empty($v['qr_time']) && $v['qr_time']>0) $qrTips .= date('m月d日', $v['qr_time']);
										if(isset($v['qr_status'],$qrStatus[$v['qr_status']]) && $v['qr_status']!=0) $qrTips .= $qrStatus[$v['qr_status']];
								 ?>	
								<li class='outofuse'>
									<span><?php echo isset($v['qr_code']) ? $v['qr_code'] : '';?><small><?php if(!empty($qrTips)) echo ' ('.$qrTips.')';?></small></span>
								</li>
								<?php 	} ?>
							</ul>
							<?php 	} ?>
						</div>
						<?php 	} ?>
					</li>
					<?php } ?>
					<li>
						<p class="t">订单号</p>
						<p class="c"><?php echo $detail['order_no']; ?></p>
					</li>
					<li>
						<p class="t">下单时间</p>
						<p class="c"><?php echo date('Y-m-d', $detail['add_time']); ?></p>
					</li>
				</ul>
                <?php
                if ($detail['order_status'] == '0'){
                ?>
				<div class="btn-wrap">
					<a href="<?= baf_CHtml::createUrl('/order/pay?id='.$detail['order_id']);?>" class="btn-blue btn-blue-s">立即支付</a>
				</div>
                <?php 
                }
                ?>
                <?php if($detail['order_status']==8){?>
                <div class="btn-wrap">
					<!-- 中继 -->
					<p style="font-size:0.18rem;color:#5b73f2;margin-bottom:0.05rem;">场地确认中...</p>
					<p style="font-size:0.14rem;color:#5b73f2;margin-bottom:0.05rem;">预订结果将在30分钟内以短信形式发送给您</p>
			        <!-- 中继end -->
		        </div>
		        <?php } ?>
			</div>
			<?php $this->display('public/wxgroup_qrcode.php', array('wxGroupQrCode'=>$wxGroupQrCode)); ?>
		</div>
		<?php }else{?>
			<img width="100%" src="/themes/qu/images/nodata@2x.png" />
		<?php }?>
	</div>
</div>
<script>
  $('#rightShow').on('click',function () {
    if ( this.dataset.show === '0' ) {
      this.dataset.show = '1';
      $(this).addClass('rotate180');
      $('#showDetail').removeClass('hide');
    } else {
      this.dataset.show = '0';
      $(this).removeClass('rotate180');
      $('#showDetail').addClass('hide');
    }
  });
	var oCode = document.querySelector('.verificationCode');
	var oCodeShow = oCode ? oCode.querySelector('.verificationCode-show') : undefined;
	var bExpand = false;
  if(oCode){
    if(oCode.querySelectorAll('li').length == 0){
      oCode.className = 'verificationCode sp'
    }else{
      oCodeShow.onclick = function(){
        if(!bExpand){
          oCode.className = 'verificationCode expand';
        }else{
          oCode.className = 'verificationCode';
        }
        bExpand = !bExpand;
      }
    }
  }
</script>
<?php $this->display('public/footer.php');?>