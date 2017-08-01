<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
	<title>订单详情</title>
	<link rel="stylesheet" type="text/css" href="/static/equiment/plugin/bootstrap/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="/static/equiment/css/ensure.css">
    <script type="text/javascript" src="/static/equiment/plugin/jquery-2.1.1.min.js"></script>
    <script>
        var offWidth = window.screen.width/30;
        document.getElementsByTagName("html")[0].style.fontSize = offWidth + 'px';
    </script>
    <style type="text/css">
    	.show{display: block;}
    	.hide{display: none;}
		.chg-address{position: absolute;top:0;left: 0;width: 100%;height: 100%;z-index: 1000;background: #F4F4F8;}
    </style>
</head>
<body>
	<div class="ensure" id="ensure">
		<!-- head -->
	    <div class="head">
	        <div class="glyphicon glyphicon-menu-left" onclick="javascript:history.go(-1);"></div>
	        <div >订单详情</div>
	        <div><img src="" style="display: none;"></div>
	    </div>
	    <div class="goods-mount" style="margin-top: 60px;">
			<div>订单编号</div>
			<div><?=$data['order_sn']?></div>
		</div>
	    <?php
		if(!empty($data['goods_list'])){
			foreach($data['goods_list'] as $value){
	    ?>
		<div class="sel-goods-property" style="margin-top: 1px;">
			<div><img id="img" src="<?=!empty($value['goods_img']) ? $value['goods_img'] : ''?>"></div>
			<div class="have-sel">
				<div class="goods-name"><?=!empty($value['goods_name']) ? $value['goods_name'] : ''?></div>
				<div class="goods-color">
					<?php
					if(!empty($value['spec_list'])){
						foreach($value['spec_list'] as $v){
						echo $v['spec_value_name'].' ';
					}}
					?>
				</div>
				<div class="goods-price">
					<span class="groud"></span>
					<span class="price group-price"><?=$value['shop_price']?></span>
					<span class="origin-price">原价 <span style="text-decoration: line-through;"><?=$value['market_price']?></span></span>
				</div>
			</div>
		</div>
		<div class="goods-mount">
			<div>购买数量</div>
			<div><?=$value['goods_number']?></div>
		</div>
		<?php }}?>
		
			<div class="default-address" id="default">
				<div class="address-title">收货地址</div>
				<?php
				if(!empty($data['delivery_info'])){
				?>
				<div class="send-address">
					<div>
						<div id="address_mobile"><?= $data['delivery_info']['consignee'].' '.$data['delivery_info']['mobile'];?></div>
						<div id="address_detail"><?= $data['delivery_info']['address'];?></div>
					</div>

				</div>
				<?php }?>
			</div>
			<input type="hidden" name="delivery_id" id="delivery_id" value="<?=!empty($address['delivery_id']) ? $address['delivery_id'] : ''?>">
			<?php
			if($data['order_status']==0){
			?>
		<div class="fooster">
			<div class="all-price price"><?php echo floatval($data['order_amount']) + floatval($data['user_money']); ?></div>
			<div class="buy-now" onclick="window.location.href='<?= baf_CHtml::createUrl('/order/pay?id='.$data['order_id']);?>">立即支付</div>
		</div>
		<?php }?>
		<!-- <iframe src="/UserAddress/index" v-bind:class="{'chg-address':true,hide:hideChg}">
		  <p>您的浏览器不支持  iframe 标签。</p>
		</iframe> -->
		<div id="sel_address"  class="chg-address hide"></div>
	</div>
</body>
</html>