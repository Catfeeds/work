<?php $this->display('public/header.php');?>
<style>
.qu{
	overflow-x: hidden;
}
.bd img{width:100%;}
.bd ol{
    margin-bottom: 10px;
}
.bd ol:after{
    content:"";
    display:block;
    clear:both;
}
.buy_now a {
	background: #ff850d;
}
.header {
    width: 100%;
    height: 44px;
    background-color: #009ff0;
    text-align: center;
    line-height: 44px;
    position: relative;
}
.header .left {
    left: 0;
}
.header .left,  .header .right {
    width: 50px;
    height: 44px;
    position: absolute;
    top: 0;
    z-index: 99;
}
.icon-back {
    display: inline-block;
    width: 15px;
    height: 15px;
    border-bottom: 2px solid #fff;
    border-left: 2px solid #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -7.5px;
    margin-top: -7.5px;
    -moz-transform: rotateZ(45deg);
    -ms-transform: rotateZ(45deg);
    -webkit-transform: rotateZ(45deg);
    transform: rotateZ(45deg);
}
.header .center {
    width: 100%;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 50px;
    position: relative;
    font-size: 18px;
    color: #fff;
}
.header .right {
    right: 0;
}
.buy_now .disable{
    background:#999;
}
</style>
<?php if (isset($from) && $from == 1) { ?>
<div class="header">
    <div class="left"><i class="icon-back" onclick="window.history.back();"></i></div>
    <div class="center">套餐详情</div>
    <div class="right hide"></div>
</div>
<?php } ?>
<div class="qu">
	<div class="page page-court" style="background: #f0f0f0;">
        <?php if (isset($detail['goods_id']) && !empty($detail['goods_id'])){ ?>
		<div class="slide">
			<div class="image-wrap">
                <img
                    src="<?php echo !empty($detail['image_url']) ? $detail['image_url'] : '/themes/qu/images/default.jpg'; ?>"
                    style="height:300px;width:100%;"/>
			</div>
			<div class="pages clearfix">
				<p class="txt"><?php echo isset($detail['goods_name']) ? $detail['goods_name'] : '';?></p>
			</div>
		</div>
		<div class="court-detail">
            <?php if (!empty($detail['description'])){ ?>
            <div class="detailbg">
            <div class="detail-item d-feature" style="padding-top: 0px;padding-left: 0px;">
				<div class="hd" style="padding-left: 15px;color:#636363;background: #f9f9f9;padding-top:10px;border-top:0.0625rem solid ##e1e1e1;">套餐说明</div>
				<div class="bd" style="margin-left: 15px;margin-right: 10px;">
                    <p style="line-height: 150%;font-size: 12px;"><?php echo isset($detail['description']) ? nl2br($detail['description']) : ''; ?></p>
				</div>
			</div>
            </div>
            <?php }  ?>
        
            <?php if (!empty($detail['content'])){ ?>
            <div class="detailbg">
            <div class="detail-item d-service" style="padding-top:0px;">
				<div class="hd" style="padding-left: 15px;color:#636363;background: #f9f9f9;padding-top:10px;border-top:0.0625rem solid ##e1e1e1;">套餐详情</div>
				<div class="bd" style="margin-left: 15px;margin-right: 10px;font-size: 14px;line-height: 130%;word-wrap: break-word;">					
					<?php echo $detail['content']; ?>
				</div>
			</div>
            </div>
            <?php }  ?>
            			
		</div>
        <?php } else {
            echo '<img width="100%" src="' . NODATAIMG . '" />';
        } ?>
	</div>

    <!--    /只有首页网页才显示购买按钮-->

    <?php if (isset($detail['goods_id']) && !empty($detail['goods_id']) && $from == 1 && $detail['goods_number'] > 0) { ?>
	<div class="buy_now">
        <?php
	    $price = floatval($detail['promote_price']>0 ? $detail['promote_price'] : $detail['price']);
	    
	    $hac = md5(CURRENT_TIMESTAMP.$detail['goods_id'].$detail['goods_name'].$price.$detail['goods_number'].$courtName.ENCODE_KEY);
	    $params = array(
                'id' => $detail['goods_id'],
                'name' => $detail['goods_name'],
                'num'  => $detail['goods_number'],
                'price' => $price,
	            'court_name' => $courtName,
                't' => CURRENT_TIMESTAMP,
	            'h' => $hac
	    );
	    ?>
        <a href="<?= baf_CHtml::createUrl('/order/ConfirmPerson?'.http_build_query($params));?>">
            <?php echo(floatval($detail['promote_price'] > 0) ? floatval($detail['promote_price']) : floatval($detail['price'])); ?>
            元 立即购买
        </a>
    </div>
    <?php } else if (!isset($detail['goods_number']) || $detail['goods_number'] <= 0 || $detail['goods_number'] == '') { ?>
            <div class="buy_now">
            <a class="disable">暂时售完</a>
            </div>
    <?php } ?>
</div>
<?php $this->display('public/footer.php'); ?>