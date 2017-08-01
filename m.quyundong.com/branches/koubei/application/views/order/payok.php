<?php $this->display('public/header_205.php');?>
<link href="<?php echo TEMPLATE; ?>qu205/order/payok/stylesheets/payok.css" type="text/css" rel="stylesheet">
<style type="text/css">
	.payok-text{
		font-size: 0.16rem;
		color: #666666;
		margin-top: 0.05rem;
	}
</style>
<div id="loading" data-lock="1" class="loading">
	<div class="loading-icon"></div>
</div>
	<div class="main hide">
		<?php if(in_array(UTM_SOURCE, Config::$source4Nothing)){
			$this->display('public/out_top_205.php', array('topTitle'=>'支付成功'));
		}else{
			$this->display('public/public_top_202.php', array(
				'topTitle'=>'支付成功',
				'leftMenu' => '<a href="'.baf_CHtml::createUrl('/').'" class="J_back"><i class="icon-back"></i></a>',
				'rightMenu' => '<a style="margin-right: 10px;color:#FFFFFF;" class="pay-ok-right" href="'.baf_CHtml::createUrl('/order/help').'">帮助</a>'
			));
		 }?>
            <?php if (isset($order['status']) && $order['status'] == '0000' && in_array($order['order_status'], array(1,6,8))) {?>
            <!-- 支付成功 -->
				<div class="payok-logo">
					<div><img src="<?php echo TEMPLATE; ?>qu205/order/images/pay-ok.png" alt=""></div>
				</div>
            	<?php if($order['order_type']==8){?>
					<div class="payok-info-container">
						<ul class="payok-info">
                        <li><span>场馆：</span>
    						<div><p><?php if (isset($order['name'])){echo $order['name'];} ?></p></div>
                        </li>
    					<li><span>项目：</span>
							<div><p><?php if (isset($order['category_name'])){echo $order['category_name'];} ?></p></div>
    					</li>
    					<li><span>级别：</span>
							<div><?php if (isset($order['court_pool_level'])){echo $order['court_pool_level'];} ?></p></div>
    					</li>
    					<li><span>日期：</span>
							<div><p><?php if (isset($order['court_pool_book_date'], $order['start_time'], $order['end_time'])){echo date('m月d日', $order['court_pool_book_date']).' '.date('H:i',$order['start_time']).'-'.date('H:i',$order['end_time']);} ?></p></div>
    					</li>
    				</ul>
                </div>
                <div class="order-bottom">
					<?php
	                if(isset($order['court_pool_status']) && $order['court_pool_status']){
						$tips = '';
	                	switch ($order['court_pool_status']){
	                		case 1:
	                			$tips = '等待其他球友加入，拼场成功后会短信通知，也可以在我的订单中查看拼场进度及球友。';
	                			break;
	                		case 2:
                			case 3:
								$tips = '拼场已成功，请在我的订单中查看场地号和球友信息';
	                			break;
	                	}
	                	echo $tips ? '<p class="color-tips">'.$tips.'</p><br />' : '';
					}?>
					<div class="btn-wrap2">
						<a href="<?= baf_CHtml::createUrl('/myorder/detail?id='.$order['order_id']);?>" class="btn-blue btn-orange-l J_submit">查看拼场订单</a>
					</div>
				</div>
				<?php } else {?>
				<div class="payok-text">
					<p>支付成功!</p>
					<?php if($order['order_status']==8){?>
					<!-- 中继 -->
				<p style="font-size:0.18rem;color:#5b73f2;margin-bottom:0.05rem;">场地确认中...</p>
				<p style="font-size:0.14rem;color:#5b73f2;margin-bottom:0.05rem;">预订结果将在30分钟内以短信形式发送给您</p>
		        <!-- 中继end -->
		        <?php } ?>
				</div>
				<div class="payok-info-container">
					<ul class="payok-info">
	                    <li><span>场馆：</span>
							<div><p><?php if (isset($order['name'])){echo $order['name'];} ?></p></div>
						</li>
						<li><span>项目：</span>
							<div><p><?php if (isset($order['category_name'])){echo $order['category_name'];} ?></p></div>
						</li>
						<?php if($order['order_type']==1){?>
						<li><span>套餐：</span>
							<div><p><?php if (isset($order['goods_list'][0]['goods_name'])){echo $order['goods_list'][0]['goods_name'];} ?></p></div>
						</li>
						<li><span>数量：</span>
							<div><p><?php if (isset($order['goods_list'][0]['goods_number'])){echo $order['goods_list'][0]['goods_number'];} ?></p></div>
						</li>
						<?php }else{ ?>
							<li><span>日期：</span>
								<div><p><?php if (isset($order['goods_list'][0]['book_date'])){echo $order['goods_list'][0]['book_date'];} ?></p></div>
							</li>
							<li ><span>场次：</span>
								<div><?php
									//场次信息
									foreach($order['goods_list'] AS $v){
										echo '<p>'.$v['course_name']." &nbsp;".date('H:i',$v['start_time']).'-'.date('H:i',$v['end_time']) .'</p>';
									}
									?></p>
								</div>
							</li>
						<?php }?>
						<?php
						// 会员卡订场没有消费验证码， 固不显示
						if ($order['order_type']!='10' && !empty($order['verification_code'])) {
	                    ?>
						<li><span>验证码：</span>
							<div><p><?php echo $order['verification_code']; ?></p></div>
						</li>
						<?php }?>
					</ul>
				</div>
				<?php }?>
				<?php $this->display('public/wxgroup_qrcode.php', array('wxGroupQrCode'=>$wxGroupQrCode)); ?>
				<?php 
					if(!in_array(UTM_SOURCE, ExtendConfig::$payokNoDeailView)) { ?>
					<!-- 查看订单详情 -->
					<div>
						<?php if (isset($order['status']) && $order['status'] == '0000' && ($order['order_status'] == '1' || $order['order_status'] == '6')) {?>
							<p>
							</p>
						<?php }?>
						<div class="payok-check"   onclick="location.href='<?= baf_CHtml::createUrl('/myorder/detail?id='.(isset($order['order_id']) ? $order['order_id'] : 0));?>'" >
							查看订单详情
						</div>
					</div>
				<?php }?>
				<?php
				 if(isset($is_need_comment)&&$is_need_comment) { 
						$actid = 0;
						if (isset($order['utm_source'])){$u=explode('_',$order['utm_source']);$actid = isset($u[1]) ? $u[1] : 0;}
						$cmUrl = '/CommonComment/index?id='.$order['order_id'].'&actid='.$actid;
					?>
					<!-- 参与评论 -->
				   <div class="payok-check" style="margin-top:20px;" onclick="location.href='<?= baf_CHtml::createUrl($cmUrl);?>'" >
						参与评论
					</div>
				<?php }?>
				<div onclick="location.href='<?= baf_CHtml::createUrl('/');?>'" class="payok-toIndex mobile-qq-payok">返回首页</div>
            <?php } else {?>
					<!-- 支付失败 -->
					<div class="tips-wrap">
						<div class="color-tips">
							<img src="<?php echo TEMPLATE; ?>qu/images/norequest.png" />	<span>暂时未收到支付结果</span>
						</div>
					</div>
					<div class="order-item">
						<ul class="info-list">
							<li>
								<p><?php if (isset($order['name'])){echo '<a href="'.baf_CHtml::createUrl('/court/detail/?id='.$order['business_id'].'&cid='.$order['category_id']).'" >'.$order['name'].'</a>';} ?></p>
							</li>
							<li>
								<p>订单编号：<?php if (isset($order['order_no'])){echo $order['order_no'];} ?></p>
							</li>
						</ul>
					</div>
					<div class="order-bottom">
						<p class="color-tips">
							支付结果可能有几分钟延迟，您可以点击刷新按钮获取最新的支付结果。如需帮助请致电：4000-410-480
						</p>
					</div>
					<div class="order-bottom">
						<div class="btn-wrap2">
							<a href="javascript:location.reload();" class="btn-blue btn-orange-l J_submit">刷新支付结果</a>
						</div>
					</div>

				<?php if(!in_array(UTM_SOURCE,Config::$source4NotDownload)){?>
					<!-- 下载趣运动 -->
					<div class="order-bottom">
						<?php if (isset($order['status']) && $order['status'] == '0000' && ($order['order_status'] == '1' || $order['order_status'] == '6')) {?>
							<p class="color-tips" >
							</p>
						<?php }?>
						<div class="btn-wrap2 mobile-qq-payok">
							<a href="<?= baf_CHtml::createUrl('http://www.quyundong.com/d');?>" target="_blank" class="btn-orange btn-orange-l J_submit">立即下载趣运动客户端</a>
						</div>
					</div>
				<?php }?>
            <?php }?>

	</div>
</div>
<?php if(!in_array(UTM_SOURCE,Config::$source4NotDownload) && !in_array(CHANNEL_SOURCE,Config::$source4NotDownload)) { ?>
	<div class="payok-download mobile-qq-payok">
		<a target="_blank" href="<?= baf_CHtml::createUrl('http://www.quyundong.com/d/');?>"><img src="/static/images/download.png" alt=""></a><span></span></div>
	<div class="payok-space"> </div>
<?php }?>
<script src="/static/js/zeptoWithFx.min.js"></script>
<script src="/static/js/mobileResponsive.js"></script>

<script>
	$(window).on("load", function() {
		var loadInterval = setInterval(function() {
			if ($(".loading").attr("data-lock") == "1") {
				$(".loading").addClass("hide");
				$(".main").removeClass("hide");
				clearInterval(loadInterval);
			}
		}, 500);

		$(".payok-download span").click(function() {
			$(".payok-download,.payok-space").addClass("hide");
		})
	})
</script>
<?php $this->display('public/footer.php');?>
