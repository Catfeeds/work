<!DOCTYPE html>
<html>

<head>
    <?php $this->display('public/title.php'); ?>
    <link rel="stylesheet" href="/static/appwebview/courtjoin/orderConfirm/stylesheets/orderConfirm.css">
    <link href="/themes/qu205/order/confirmOrder/stylesheets/confirmOrder.css" type="text/css" rel="stylesheet">
    <script>
    var utmSource = '';
    </script>
    <style type="text/css">
        .common-menu > li > div:nth-of-type(1){
            width: auto;
            margin-right: 0;
        }
        .common-menu > li > div:nth-of-type(2) p{
            line-height: inherit;
        }
        .common-menu > li > div:nth-of-type(2){
            text-align: left;
        }
        .common-menu.order-money > li > div:nth-of-type(2){
            text-align: right;
            color: #666;
        }
        .cj-oc-foot{
            position: fixed;
            width: 100%;
            bottom: 0;
            background: #fff;
            left: 0;
            margin: 0;
        }
        .cj-oc-foot .cj-oc-buttom{
            width: 92%;
        }
    </style>
</head>

<body data-design-width="750">
    <div id="loading" data-lock="1" class="loading">
        <div class="loading-icon"></div>
    </div>
    <div class="main hide">
        <div class="header">
            <div class="left"><i onclick="history.back(-1);" class="icon-back"></i></div>
            <div class="center">确认订单</div>
            <div class="right"> </div>
        </div>
        <div class="order-header-tips">请认真核对信息</div>
        <ul class="common-menu order-info">
            <li>
                <div>场馆：</div>
                <div><?php if(!empty($order['venues_info']['venues_name'])) echo $order['venues_info']['venues_name'];?></div>
            </li>
            <li>
                <div>项目：</div>
                <div><?php echo !empty($order['venues_info']['cat_name']) ? $order['venues_info']['cat_name'] : '';?></div>
            </li>
            <li>
                <div>日期：</div>
                <div><?php echo !empty($order['court_join_info']['book_date']) ? date('Y年m月d日',$order['court_join_info']['book_date']).'('.api_CoreHelper::getDateTips($order['court_join_info']['book_date']).')' : '';?></div>
            </li>

            <li>
            <div>场地：</div>
            <?php
                $i = 0;
                foreach ($courseInfo as $key=>$row){
            ?>
            
                
                <div>
                    
                    <?php foreach($row as $v){?>
                        <p><span style='padding-right:0.1rem;'><?php echo $key; ?></span><?php echo date('H:s',$v['start_time']); ?> - <?php echo date('H:s',$v['end_time']) ?> </p>
                    <?php }
                    if($i==count($courseInfo)-1){
                    ?><div class="order-info-tips hide"><?php echo !empty($order['court_join_info']['price_tag_msg']) ? $order['court_join_info']['price_tag_msg'] : '';?></div><?php }?>
                </div>
            
            <?php $i++;}?>
            </li>
            <li>
                <div>手机号：</div>
                <div><?php echo baf_Common::mobile_format($phone);?></div>
            </li>
        </ul>
        <ul class="common-menu order-money">
            <li>
                <div style='width:auto;'>球局费用：<span style='color:#000;'><?php echo !empty($order['court_join_info']['price']) ? $order['court_join_info']['price'] : 0;?>元</span></div>
                <div>该费用为发起者设置</div>
            </li>
        </ul>
        <div class="cj-oc-foot">
            <!-- <div class="cj-oc-foot-tips">您的手机号码：</div> -->
            <!-- <div class="cj-oc-foot-tips mt100">每张订单只允许您本人参加该球局，不可携带他人</div> -->
            <div id="orderSubmit" class="cj-oc-buttom">提交订单</div>
            <!-- <div class="cj-oc-foot-tips">该场地预订后暂不支持退换</div> -->
        </div>
    </div>
    <div class="toast hide">
        <div class="toast-alert">
            <div class="toast-msg"></div>
        </div>
    </div>
    <div class="book-noPaySprite hide">
        <ul></ul>
    </div>
    <input type="hidden" id="cj_id" value="<?php echo $order['court_join_info']['cj_order_id']?>">    
    <input type="hidden" value="<?php echo $hash?>" id="J_payHash">
    <script src="/static/js/zeptoWithFx.min.js"></script>
    <script src="/static/js/mobileResponsive.js"></script>
    <script src="/themes/qu/js/common.js?ver=20161111"></script>
    <script src="/static/appwebview/courtjoin/orderConfirm/js/orderCommon.js?ver=20161111"></script>
    <script src="/static/appwebview/courtjoin/orderConfirm/js/confirmOrder.js?ver=20161111"></script>
</body>

</html>
