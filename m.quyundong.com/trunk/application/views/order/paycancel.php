<?php $this->display('public/header.php');?>
<div class="qu" style="background: #f0f0f0;">
	<div class="page page-submitOrder page-submitOrder2 fontfamily">
		<div class="header">
			<div class="center"><h1>支付已取消</h1></div>
		</div>

		<div class="order-bd">
            <div class="tips-wrap">
				<div class="color-tips" style="border-bottom:0px;padding-top: 20px;">
				    <img style="width: 25px;height: 25px;" src="<?php echo TEMPLATE; ?>qu/images/norequest.png" />	<span style="color: #939393;font-size: 20px;">用户取消了支付操作</span>
				</div>
			</div>
		</div>
	</div>
</div>
<?php $this->display('public/footer.php');?>