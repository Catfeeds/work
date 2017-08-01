<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta content="telephone=no" name="format-detection">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no,minimal-ui">
    <title>支付</title>
    <link rel="stylesheet" href="/static/appwebview/courtpool2.0/stylesheets/success2.0.css"><!--[if IE 8]>
    <link rel="stylesheet" href="/static/appwebview/courtpool2.0/stylesheets/success2.0-ie8.css"><![endif]--> 
  </head>
  <body data-design-width="750">
    <div id="loading" data-lock="1" class="loading">
      <div class="loading-icon"></div>
    </div>
    <div class="main hide">
      <div class="header">
        <div onclick="javascript:history.go(-2);" class="left"><i class="icon-back"></i></div>
        <div class="center">支付</div><a href="<?= baf_CHtml::createUrl('/courtpool/help');?>" class="right">帮助</a>
      </div>
<?php
//支付成功
if ( $order['order_status'] == '0'  ){
?>
<div class="body">
    <div class="icon-success"><img data-src="/static/appwebview/courtpool2.0/images/success2.0/icon-pay-falid-dpr2x.png"></div>
    <p class="text">暂时未收到支付结果</p>
    <div class="msg">
      <ul>
        <li><span>场馆：</span><?php if (isset($order['venues_name'])){echo $order['venues_name'];} ?></li>
        <li><span>项目：</span><?php if (isset($order['cat_name'])){echo $order['cat_name'];}else {echo '-';} ?></li>
        <li><span>场地：</span>开场前30分钟分配</li>
        <li><span>日期：</span><?php echo $order['start_time'];?> － <?php echo $order['end_time'];?></li>
      </ul>
    </div>
    <div class="tips">支付结果可能有几分钟延迟，您可以点击刷新按钮获取最新的支付结果。如需帮助请致电：4000-410-480</div>
    <div class="order-bottom">
    <div class="btn-wrap2">
        <a href="javascript:location.reload();" class="check">刷新支付结果</a>
    </div>
    </div>
</div>
	
<?php	
}
else {
?>
<div class="body">
	<?php
      //提示图标
      if ($order['pay_succ'] == 1 ){
    ?>
      <div class="icon-success"><img data-src="/static/appwebview/courtpool2.0/images/success2.0/icon-success-dpr2x.png"></div>
    <?php
		}
		else {
    ?>
        <div class="icon-success"><img data-src="/static/appwebview/courtpool2.0/images/success2.0/icon-pay-falid-dpr2x.png"></div>
    <?php
    	}
    ?>
  <p class="text"><?php if (isset($order['pay_title'])){echo $order['pay_title'];} ?></p>
  <div class="msg">
    <ul>
      <li><span>场馆：</span><?php if (isset($order['venues_name'])){echo $order['venues_name'];} ?></li>
      <li><span>项目：</span><?php if (isset($order['cat_name'])){echo $order['cat_name'];}else {echo '-';} ?></li>
      <li><span>场地：</span>开场前30分钟分配</li>
      <li><span>日期：</span><?php echo $order['start_time'];?> － <?php echo $order['end_time'];?></li>
    </ul>
  </div>
  <?php
    if ($order['current_num'] >= 4 || $order['court_pool_status'] == 3 || $order['court_pool_status'] == 4 ){
        echo '<div class="tips">拼场已成功，将在开场前30分钟短信通知您场地和球友信息，届时也可在我的订单中查看</div>';
    }
    elseif($order['court_pool_status'] == 1 || $order['court_pool_status'] == 2) {
        echo '<div class="tips">等待其他球友加入，拼场成功后回短信通知，也可以在我的订单中查看拼场进度及球友。</div>';  
    }
    ?>
  <a href="<?= baf_CHtml::createUrl('/myorder/detail?id='.$order['order_id']);?>" class="check">查看拼场订单</a><a href="<?= baf_CHtml::createUrl('/');?>" class="back">回到首页</a>
</div>
<?php
}
?>

      
    </div>
  </body>
  <script src="/static/js/jquery-1.12.0.min.js"></script>
  <script src="/static/appwebview/courtpool2.0/js/success2.0_es5.js"></script>
</html>