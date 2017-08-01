<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <?php $this->display('public/title.php'); ?>
  <!-- <link href="favicon.ico" type="image/x-icon" rel="icon" /> -->
  <!-- 
  <script type="text/javascript" name="baidu-tc-cerfication" data-appid="5323267" src="http://apps.bdimg.com/cloudaapi/lightapp.js?ver=123548795"></script>
   -->
  <style>#loading{position: fixed;top:0;left:0;bottom:0;left:0;} </style>
   <script type="text/javascript" src="/themes/qu/js/common.js?v=1.9.1"></script>  
<script type="text/javascript" src="/static/js/jgosport-1.0.js?ver=201611180"></script>
  <script type="text/javascript">
	var utmSource = '<?php echo UTM_SOURCE; //来源?>';
  </script>
  <script type="text/javascript" src="<?php echo TEMPLATE; ?>qu/js/zepto.min.js"></script>
  <?php 
    if(CHANNEL_SOURCE=='qqwallet'){
     ?>    
  <link href="/themes/qq/stylesheets/mobile-qq.css?ver=20161015" type="text/css" rel="stylesheet">
  <script type="text/javascript" src="//open.mobile.qq.com/sdk/qqapi.js?_bid=152"></script>
  <?php 
    //如果是首页，就调用mobile-qq-menu-index.js，否则就调用mobile-qq-menu.js
    if (isset($index_falg) && $index_falg=='index') {
  ?>
  <script type="text/javascript" src="/themes/qq/js/mobile-qq-menu-index.js?ver=20161111"></script>
  <?php }else{?>
  <script type="text/javascript" src="/themes/qq/js/mobile-qq-menu.js?ver=20161111"></script>
  <?php }?>
  
  <?php } ?>
  
  