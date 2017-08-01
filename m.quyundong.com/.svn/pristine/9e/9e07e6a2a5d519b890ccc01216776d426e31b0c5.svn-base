<?php $this->display('public/header.php');?>
 <link href="<?php echo TEMPLATE; ?>qu205/order/confirmOrderperson/stylesheets/confirmOrderperson.css?ver=201609181800" type="text/css" rel="stylesheet">

<div id="loading" data-lock="1" class="loading">
        <div class="loading-icon"></div>
    </div>
    <div class="main hide" style="height: auto; min-height: 100%;">
        <div class="header">
            <div class="left"><i onclick="history.back(-1);" class="icon-back"></i></div>
            <div class="center">确认订单</div>
            <div class="right"></div>
        </div>
        <div class="cop-info">
            <div class="cop-courtname"><?php echo baf_CHtml::encode($courtName); ?></div>
            <div class="cop-courtsale"> <span><?php echo baf_CHtml::encode($goodsName); ?> <em id="unit_price"><?php echo baf_CHtml::encode($goodsPrice); ?></em>元</span>
                <div class="cop-numContainer">
                    <ul class="quantity-component">
                        <li class="n_minus  <?php echo isset($nums) && $nums>1 ? '' : 'disable';?>"></li>
                        <li class="n_num"><?php echo isset($nums) && $nums ? $nums : 1;?></li>
                        <li class="n_plus <?php echo (isset($nums) && $nums==$limitNum) || $limitNum==1 ? 'disable' : '';?>"></li>
                    </ul>
                </div>                
            </div>
        </div>
        <?php if(CHANNEL_SOURCE=='qqwallet' && !empty($limitNum) && $limitNum<100){?><p class='' style="margin-top: 0.05rem;text-align: right;padding-right: 0.05rem;">该商品单次限购<i style='color:red;'><?php echo $limitNum;?></i>张</p><?php }?>
        <ul class="co-bill">
            <li>
                <div id="totalMoney" class="co-bill-textStyle1"><?php echo isset($nums) && $nums ? baf_CHtml::encode($goodsPrice * $nums) : baf_CHtml::encode($goodsPrice); ?>元</div>
                <div> <span>总计：</span></div>
            </li>
            <li id="getPreference">
                <div class="co-bill-textStyle2"><span id="activityOA">选择活动</span><img src="/themes/qu205/order/images/arrow-r.png" /></div>
                <div> <span>活动：</span>
                    <p id="activityContainer"><em></em></p>
                </div>
            </li>
            <?php if(!in_array(UTM_SOURCE, Config::$source4Nothing)){?>
            <li>
                <div id="use_coupon" amount="<?php echo $goodsPrice ? $goodsPrice : 0; ?>" class="co-bill-textStyle2"><span>点击使用卡券</span><img src="/themes/qu205/order/images/arrow-r.png" /></div>
                <div  id="rem_coupon"><span>卡券：</span><i class="hide">取消使用</i></div>
            </li>
            <?php }?>
            <li>
                <div id="payMoney" class="co-bill-textStyle3"><?php echo baf_CHtml::encode($goodsPrice); ?>元</div>
                <div><span>支付金额：</span></div>
            </li>
        </ul>
        <div class="co-tel">您的手机号码：<?php echo baf_Common::mobile_format( baf_CHtml::encode($mobile) ); ?></div>
        <div id="orderSubmit" class="co-submit">提交订单</div>
        <div style='color:#da5349;' class="co-tip"><img src="/themes/qu205/order/images/nosupport.png" /> 该场地预订后暂不支持退换</div>
    </div>
    <!-- 优惠活动选择-->
    <div class="preference hide">
        <div class="preference-selection">
            <div class="preference-selection-title">选择活动优惠</div>
            <ul>

            </ul>
        </div>
    </div>

    <div class="quantity hide">
        <div class="quantity-box">
            <div class="quantity-box-operate">
                <ul class="quantity-component">
                    <li id="n_minus" data-value="-1" class="n_minus <?php echo isset($nums) && $nums>1 ? '' : 'disable';?>"></li>
                    <li>
                        <input id="n_input" type="text" max="<?php echo $limitNum;?>" min="1" value="<?php echo isset($nums) && $nums ? $nums : 1;?>">
                    </li>
                    <li id="n_plus" data-value="1" class="n_plus <?php echo (isset($nums) && $nums==$limitNum) || $limitNum==1 ? 'disable' : '';?>"></li>
                </ul>
            </div>
            <div class="quantity-box-close">
                <div class="quantity-cancel">取消</div>
                <div class="quantity-sure">确定</div>
            </div>
        </div>
    </div>
   
    <input type="hidden" value="<?php echo $goodsId; ?>" order_type="1" name="goods_ids" id="J_payGoodsId" /> 
	<input type="hidden" value="0" name="act_id" amount="0" id="J_payActId" /> 
	<input type="hidden" value="0" name="coupon_id" amount="0" id="coupon_id" />
    <input type="hidden" value="1" name="ticket_type"  id="ticket_type" />

<div id="coupon_waper"></div>

<div class="book-noPaySprite hide">
    <ul></ul>
</div>
<div class="toast hide">
    <div class="toast-alert">
        <div class="toast-msg">请先选择支付方式</div>
    </div>
</div>

<link rel="stylesheet" type="text/css"
	href="<?php echo TEMPLATE; ?>qu/css/zepto.alert.css" />
<script type="text/javascript"
	src="<?php echo TEMPLATE; ?>qu/js/zepto.alert.js"></script>
	    <script src="/static/js/mobileResponsive.js"></script>
	    <script src="<?php echo TEMPLATE; ?>qu/js/common.js"></script>
        <script src="<?php echo TEMPLATE; ?>qu205/order/js/orderCommon.js?ver=20161111"></script>
	    <script src="<?php echo TEMPLATE; ?>qu205/order/confirmOrderperson/js/confirmOrderperson.js?ver=20161111"></script>
<script type="text/javascript">
var load_img = '<?php echo TEMPLATE; ?>qu/images/loading.gif';
var limit_num = <?php echo $limitNum;?>;
$(function(){
    // 获取优惠活动
    getActivityList(<?php echo $goodsId; ?>, 1);
});
</script>
<script type="application/javascript">
    var click="<?php echo isset($_GET['click'])&&$_GET['click']==1; ?>";
    if(click==1){
        Coupon.getCouponList();
    }
</script>
<?php $this->display('public/footer.php');?>