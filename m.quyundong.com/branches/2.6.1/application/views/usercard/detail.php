<?php $this->display('public/header.php');?>
<div class="qu" style="background: #f0f0f0;text-align:center;font-family:"Microsoft YaHei",微软雅黑;">
	<div class="page-book" >       
        <div class="header">
			<div class="left"><a href="<?= baf_CHtml::createUrl('/userCard');?>"><i class="icon-back"></i></a></div>
			<div class="center"><h1>会员卡详情</h1></div>
			<div class="right">
				<a style="margin-right: 10px;" class="pay-ok-right" href="<?= baf_CHtml::createUrl('/');?>">首页</a>
			</div>
		</div>
        <div class="container">
            <div class="head">
                <h1><span>VIP</span></h1>
                <h2><?php echo baf_CHtml::encode($cardInfo['name']);?>·会员卡</h2> 
                <?php if (isset($cardInfo['card_mobile_phone']) && $cardInfo['card_mobile_phone']) { ?>
                <div class="mobile">
                    <span>您的手机号码：<?php
                        $mobile = ($this->uid > 0) ? $cardInfo['card_mobile_phone'] : api_CoreHelper::mobileHidden($cardInfo['card_mobile_phone']);
                        echo baf_CHtml::encode($mobile);
                    ?></span>
                    <span class="mobile_tips"></span>
                </div>
                <div id="mobile_tip_content" style="display: none;">
                    <div class="mobile_tip_content">
                        <p>该手机号码是您在场馆办理会员卡时填写的手机号码</p>
                        <p>没有预留，手机号忘记或者已停用，请联系场馆进行处理</p>
                    </div>
                </div>
                <?php } ?>
            </div>
            
            <div class="line"></div>

            <?php if (isset($cardInfo['card_mobile_phone']) && !$cardInfo['card_mobile_phone']) { ?>
                <div class="no_card_mobile">
                    <h1 class="tit">该会员卡没有预留手机号</h1>
                    <div class="content">
                        <p>该手机号码是您在场馆办理会员卡时填写的手机号码</p>
                        <p>没有预留，手机号忘记或者已停用，请联系场馆进行处理</p>
                    </div>
                </div>
            <?php } else { ?>
                <div class="categories">
                    <?php if (!empty($categories)) { ?>
                        <ul
                            <?php 
                            // 只有一个记录
                            if (count($categories) == 1) {?>
                                class="cat_list only_one_child"
                            <?php } else { ?>
                                 class="cat_list"
                            <?php } ?>
                        >
                            <?php foreach ($categories as $key => $cat) {
                            		if(!isset($cat['order_type']) || $cat['order_type']==1) continue;//排除人次馆
                            	?>
                                  <li 
                                      <?php  
                                      // 偶数位置
                                      if (($key + 1) % 2 == 0) {
                                      ?>
                                          class="ml"
                                      <?php } ?>
                                  href="<?= baf_CHtml::createUrl('/court/detail?id='.$cardInfo['venues_id'].'&cid='.$cat['cat_id'].'&card=1');?>">
                                      
                                      <span><?php echo baf_CHtml::encode($cat['cat_name']);?></span>
                                  </li>
                            <?php } ?>
                        </ul>
                    <?php } else { ?>
                        <p>此会员卡没有任何场馆可用</p>
                    <?php } ?>
                </div>
            <?php } ?>
            <div class="qu_logo"><span>趣运动</span></div>
        </div>
	</div>
</div>

<?php if (isset($cardInfo['card_mobile_phone']) && $cardInfo['card_mobile_phone']) { ?>
<script type="text/javascript" src="<?php echo TEMPLATE; ?>qu/js/layer.m.js"></script>
<script type="text/javascript">
$(function(){
	$('.mobile_tips').on('click', function(){
		layer.open({
		    content: $('#mobile_tip_content').html(),
		    btn: ['知道了']
		});
	});

	$('.cat_list li').on('click', function(){
        var url = $(this).attr('href');
        // window.location.href = $(this).attr('href');
	    window.location.href = typeof urlAddParams == 'function' ? urlAddParams(url) : url;
	});
});
</script>
<?php } ?>
<?php $this->display('public/footer.php');?>