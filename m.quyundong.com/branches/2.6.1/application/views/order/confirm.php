<?php $this->display('public/header.php');?>
    <link href="<?php echo TEMPLATE; ?>qu205/order/confirmOrder/stylesheets/confirmOrder.css" type="text/css" rel="stylesheet">

    <script type="text/javascript">
        var amount = <?php echo $goods_amount?>;
    </script>
<?php 
if(!isset($promote['order_amount'])) $promote['order_amount'] = 0;
?>
<link rel="stylesheet" href="/static/myCoupons/stylesheets/myCoupons.css?v=1.1">
    <style>
    body{
      font-size: 12px;
    }
    .main { height: auto; min-height: 100%;}
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
    <div id="loading" data-lock="1" class="loading">
        <div class="loading-icon"></div>
    </div>
    <div class="main hide">
        <?php if(!in_array(UTM_SOURCE, Config::$source4Nothing)){?>
        <div class="header">
            <div class="left"><a href="javascript:history.go(-1)"><i class="icon-back"></i></a></div>
            <div class="center"><h1>确认订单</h1></div>
            <div class="right"></div>
        </div>
        <?php }?>
        <?php 
        if(!empty($relay)){
         ?>
        <!-- 中继 -->
        <p style='padding:15px;background-color:#f5f5f9;color:#5b73f2;font-size:14px;'><i style='width:14px;display:inline-block;vertical-align: sub;margin-right:5px;'><img src='/static/appwebview/app2.3/images/attention.png'></i>此为场馆特惠价格，支付成功后我们会在30分钟内回复您的预订结果，请耐心等待。</p>
        <!-- 中继end -->
        <?php } ?>
        <ul class="co-info">
            <li>
                <div><?php if (isset($category_name)) { echo $category_name; }  ?></div>
                <div><?php if (isset($court_name)) { echo $court_name; } ?></div>
            </li>
            <?php  $weekarray=array("日","一","二","三","四","五","六"); foreach($course AS $kk => $vv){ ?>
            <li class="co-court">           
                <div><?php echo $kk ?></div>
                <div>
                <?php foreach ($vv as $k => $v): ?>

                    <p><span><?php echo $v['real_time'] ?></span><span class="<?php if(isset($userCardList)&&!empty($userCardList)){echo 'hide';} ?>"><?= $v['price'].'元' ?></span></p>

                <?php endforeach ?>
                </div>
            </li>
            <?php  }  ?>
            <li>
                <div>日期</div>
                <div><?php if(isset($book_date)){ echo date('Y年m月d日', $book_date); }  ?>（周<?php if(isset($book_date)){ echo $weekarray[date("w",$book_date)]; } ?>）</div>
            </li>
        </ul>
         <?php if (isset($user['phone']) && isset($user['user_id']) && ($user['user_id'] > 0)){}
                if(isset($userCardList) && !empty($userCardList)){
            ?>    
        <ul class="co-paySelection">
            <li>
                <label for="paySelection-vip"><span style="background-image:url(/themes/qu205/order/images/vip.png)">场馆会员卡</span><e>(到场凭卡消费，无需预付)</e>
                    <input id="paySelection-vip" type="radio" name="paytype"  <?php if($payType=='usercard'){ echo "checked"; }?> value="usercard"><em></em>
                </label>
            </li>
            <?php  if(isset($userCardList) && !empty($userCardList)){?>
            <ul class="co-cardList <?php if($payType!='usercard'){ echo "hide"; }?> ">
                <?php   foreach($userCardList as $k=>$v){ ?>
                <li class="co-vip-info">
                    <label for="vipcard<?php echo $v['card_no']?>"><span>卡号：<i><?php echo $v['card_no']?></i></span><span>余额：<i><?php echo $v['balance']?>元</i></span>
                        <input id="vipcard<?php echo $v['card_no']?>" type="radio" name="usercard" value="<?php echo $v['card_no']?>" <?php if($k==0) echo ' checked'?>><em> </em>
                    </label>
                </li>
                <?php }?>
            </ul>
            <?php }
            //临时处理方式 add by chenchao 2015-12-23 待会员统一后处理
            $from = api_CoreHelper::getCookie('dfrom');
            if ( ($businessId == '17697' || $businessId == '17769') && $from == '13'){}else{
            ?>
            <li>
                <label for="paySelection-online"><span style="background-image:url(/themes/qu205/order/images/online.png)">在线支付</span><e><?php echo "(预定费用".$goods_amount.'元)';?></e>
                    <input id="paySelection-online" type="radio" name="paytype" <?php if($payType=='online'||isset($_GET['click'])){ echo "checked"; }?> value="online"><em></em>
                </label>
            </li>
            <?php } ?>
        </ul>
        <?php } else { ?>
          <input name="paytype" type="hidden" checked  value="online"/>
        <?php }?>
        <ul class="co-bill <?php if(isset($userCardList) && !empty($userCardList)&&$payType != 'online'){ echo "hide"; }?>">
            <li>
                <div id="totalMoney" class="co-bill-textStyle1"><?php echo $goods_amount; ?>元</div>
                <div> <span>总计：</span></div>
            </li>
             <?php 
            // 活动id
            $act_id = isset($defaultActivity['act_id']) && $defaultActivity['act_id'] ? $defaultActivity['act_id'] : 0;
            $hash = md5($goods_ids.$businessId.$categoryId.$relay.WAP_HASH_KEY);                
            ?>
            <?php 
            if($activityList){
            ?>
            <li id="getPreference">
                <div class="co-bill-textStyle2"><span id="activityOA"><?php if($activityList){ foreach ($activityList as $activity) {
                        if ($activity['status'] == 0 || $activity['type'] == 1) {
                            continue;
                        } ?><?php if($act_id==$activity['act_id']) {echo baf_CHtml::encode($activity['act_amount'].'元');$act_name=baf_CHtml::encode($activity['act_name']);}?><?php } } ?></span><img src="/themes/qu205/order/images/arrow-r.png" /></div>
                <div> <span>活动：</span>                
                    <p id="activityContainer"><?php if(isset($act_name)){ echo '<em>'.$act_name.'</em>';}?></p>
                </div>
            </li>
            <?php }?>
            <?php
                //无优惠，则显示
                if (!in_array(UTM_SOURCE, Config::$source4Nothing) && empty($relay)){
            ?>
            <li>
                <div id="use_coupon" amount="<?php echo $goods_amount ? $goods_amount : 0; ?>" class="co-bill-textStyle2"><span>点击使用卡券</span><img src="/themes/qu205/order/images/arrow-r.png" /></div>
                <div id="rem_coupon"><span>卡券：</span><i class="hide">取消使用</i></div>
            </li>
             <?php }?>
             
             
             <?php
             if(isset($promote['invoice_package_gap_price']) && $promote['invoice_package_gap_price']>0){
             ?>
             <style>
                input[name='cash']{position: absolute;clip: rect(0, 0, 0, 0);}
                input[name='cash'] + label:before {content: '';position: absolute;top: -0.1rem;right: -0.1rem;bottom: -0.1rem;left: -0.5rem;}
                input[name='cash'] + label {display: inline-block;background-size: cover;position: relative;width:0.2rem;height: 0.2rem;background-image: url("/themes/cash/images/common_uncheck_icon.png");}
                input[name='cash']:checked + label {background-image: url("/themes/qu205/order/images/radio-on.png");}
             </style>
             <script>
             function showTips () {
                 var msg = '<p style="text-align:left;margin-top:-0.1rem;"><em style="display: inline-block;border-radius: 3px;padding: 0.01rem 0.05rem;margin-bottom: 0.05rem;margin-right: 0.05rem;border: 1px solid #ff850d;color: #ff850d;">现金红包</em></p>' 
                         + '<p style="text-align:left;margin-top:0.1rem;">1.场地消费后，现金红包（可提现）将在24小时内自动放入趣运动账户，并提供场地报销单；</p>'
                         + '<p style="text-align:left;margin-top:0.1rem;">2.报销凭证在 趣运动APP "我的-开具发票"中申请；</p>'
                         + '<p style="text-align:left;margin-top:0.1rem;">3.报销凭证和返现金额，以实际支付金额为准（不含储值卡支付部分）</p>';
                 $.tipsBox.show(msg);
             }
             </script>
             <li>
                 <div class="co-bill-textStyle3"><input type="radio" name="cash" value="0" id='cash_0' data-value="<?=$goods_amount?>" checked="checked"><label for='cash_0'></label></div>
                 <div><span>原价套餐：<?=$goods_amount?>元</span></div>
             </li>
             <li>
                 <div class="co-bill-textStyle3" style='margin-top: 0.1rem;'><input type="radio" name="cash" value="1" id='cash_1' data-value="<?=!empty($promote['cash_price']) ? $promote['cash_price'] : $promote['order_amount']?>"><label for='cash_1'></label></div>
                 <div><span>报销套餐：<?=!empty($promote['cash_price']) ? $promote['cash_price'] : $promote['order_amount']?>元</span><p><em onclick='showTips()'>10%现金红包</em></p><b class='co-bill-textStyle2'><?= isset($promote['invoice_package_info']['credit_tips']) ? $promote['invoice_package_info']['credit_tips'] : '';?></b></div>
             </li>
             <?php }?>
            <li>
                <div id="payMoney" class="co-bill-textStyle3"><span id="pay_amount" amount="<?php echo $promote['order_amount']; ?>"><?php echo $promote['order_amount']; ?>元</span></div>
                <div><span>支付金额：</span></div>
            </li>
        </ul>
         <?php if(isset($user['phone'])){?>
        <div class="co-tel">您的手机号码：<?php echo baf_Common::mobile_format( $user['phone'],'2.0' ); ?></div>
        <?php }?>  
       
        <div id="orderSubmit" class="co-submit">提交订单</div>
        
        <div style='color:#da5349;' class="co-tip <?php if(!in_array(UTM_SOURCE, Config::$source4Nothing)){ echo 'hide';}?>"><img src="/themes/qu205/order/images/nosupport.png" /> 该场地预订后暂不支持退换</div>
       
        <div class="co-tip-vip  <?php if(in_array(UTM_SOURCE, Config::$source4Nothing)){ echo 'hide';}?>"><img src="/themes/qu205/order/images/vip-tip.png" /> 退款规则请以场馆说明为准</div>
       
    </div>
    <?php if($activityList){ ?>
    <div class="preference hide">
        <div class="preference-selection">
            <div class="preference-selection-title">选择活动优惠</div>
            <ul  id="act_list">
            <?php
                $a= UTM_SOURCE;
                foreach ($activityList as $activity) : 
                    if ($activity['status'] == 0 || $activity['type'] == 1) {
                        continue; 
                    }// 排除不可用的活动                     
            ?>   
                <li id="actitem_<?php echo $activity['act_id']; ?>" data_id="<?php echo $activity['act_id']; ?>" data_amount="<?php echo $activity['act_amount']; ?>">
                    <label for="preference<?php echo $activity['act_id']; ?>"><span><?php echo baf_CHtml::encode($activity['act_name']); ?></span>
                        <input id="preference<?php echo $activity['act_id']; ?>" type="radio" name="preference" <?php if($act_id==$activity['act_id']){ echo 'checked';} ?>><em></em>
                    </label>
                </li>
               <?php endforeach; ?>  
                
            </ul>
        </div>
    </div>
    <?php } ?>
    <input type="hidden" id="client_id"  value="<?php if (isset($user['user_id']) && ($user['user_id'] > 0)) { echo $user['user_id']; }?>" />
    <input type="hidden" id="user_has_card"  value="<?php if (!empty($cardInfo)) { echo '1'; } else { echo '0'; }?>" />
    <input type="hidden" value="<?php echo $goods_ids; ?>" name="goods_ids" order_type="0" id="J_payGoodsId" />
    <input type="hidden" value="<?php echo $act_id; ?>" name="act_id" id="J_payActId" amount="<?=!empty($defaultActivity['act_amount']) ? $defaultActivity['act_amount']:0?>"/>
    <input type="hidden" value="<?php echo $businessId; ?>" name="bid" id="J_payBid" />
    <input type="hidden" value="<?php echo $categoryId; ?>" name="cid" id="J_payCid" />
    <input type="hidden" value="0" name="coupon_id" id="coupon_id"/>
    <input type="hidden" value="1" name="ticket_type"  id="ticket_type" />
    <input type="hidden" value="<?php echo $relay;?>" name="relay" id="relay"/>
    <input type="hidden" value="<?php echo $hash; ?>"  id="J_payHash" />
    <div id="coupon_waper"></div>
<div class="book-noPaySprite hide">
    <ul></ul>
</div>
<div class="toast hide">
    <div class="toast-alert">
        <div class="toast-msg"></div>
    </div>
</div>
<p class='hide decathlon decathlon-info-msg'>趣运动提供场馆预订的售前售后及收费服务，由趣运动承担后续相关服务，如有任何疑问，请拨打趣运动热线电话咨询：4000-410-480</p>
<script src="<?php echo TEMPLATE; ?>qu205/order/js/orderCommon.js?ver=20161111"></script>
<script src="<?php echo TEMPLATE; ?>qu205/order/confirmOrder/js/confirmOrder.js?ver=20170306"></script>
<script type="application/javascript">
    var click="<?php echo isset($_GET['click'])&&$_GET['click']==1; ?>";
    if(click==1){
        Coupon.getCouponList();
    }
</script>
<?php $this->display('public/footer.php');?>
