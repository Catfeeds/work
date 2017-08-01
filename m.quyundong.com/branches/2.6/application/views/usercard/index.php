<?php $this->display('public/header201.php'); ?>
    <link rel="stylesheet" href="/static/wechatvip/list/stylesheets/list.css">
    <script src="/static/js/zeptoWithFx.min.js"></script>
    <script src="/static/js/mobileResponsive.js"></script>
    <script src="/static/wechatvip//list/js/list.js?v=20161111"></script>
</head>

<body data-design-width="750">
    <div id="loading" data-lock="1" class="loading">
        <div class="loading-icon"></div>
    </div>
    <div class="main hide">
        <div class="header">
            <?php if ((isset($from) && $from == 'wxuc') || (isset($login) && in_array($login, array('wxuc', 'wx')))) { ?>
            <?php } else { ?>
            <div class="left"><i onclick="history.back();" class="icon-back"></i></div>
            <?php } ?>
            <div class="center">场馆会员卡</div>
            <div class="right hide"> </div>
        </div>
        <div class="list-container">
            <?php if(!empty($cardList)){?>
            <ul class="list-content">
                <?php foreach($cardList as $card){ ?>
                <li data-src="url(/static/wechatvip/list/images/vipdpr2x.png)" class="use-background">
                    <p><?php echo baf_CHtml::encode($card['name']);?></p>
                    <p>余额：￥<?php echo baf_CHtml::encode(floatval($card['balance']));?></p>
                    <div> <a data-src="url(/static/wechatvip/list/images/rmbdpr2x.png)" href="<?= baf_CHtml::createUrl('/usercard/translist?venue_id='.$card['venues_id'].'&mobile='.$card['card_mobile_phone'].'&card_no='.$card['card_no']);?>" class="use-background">消费记录＞</a>
                        <?php if(isset($card['card_status']) && $card['card_status']==1){?>
                        <a href="<?= baf_CHtml::createUrl('/court/detail?id='.$card['venues_id'].'&cid='.$card['cat_id']);?>">预订场地</a>
                        <?php }?>
                        </div>
                </li>
                <?php }?>
            </ul>
            <?php }else{ ?>
                <div class="list-onItem ">您没有办理场馆会员卡~</div>
            <?php } ?>
            <?php if ((isset($from) && $from == 'wxuc') || (isset($login) && in_array($login, array('wxuc', 'wx')))) { ?>
            <div class="list-unbind" style="margin-bottom: 2em">解除微信会员绑定＞</div>
            <?php } ?>
        </div>
    </div>
    <div class="nm-cover hide">
        <div class="nm-alert">
            <div class="msg">解除绑定后，将无法享受便捷的微信会员订场服务，确认解绑？</div>
            <div class="l list-sure">确定</div>
            <div class="r list-cancel">取消</div>
        </div>
    </div>
<?php $this->display('public/footer.php'); ?>