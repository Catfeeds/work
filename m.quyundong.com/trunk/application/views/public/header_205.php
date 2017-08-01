<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <?php $this->display('public/title.php'); ?>
  <!-- <link href="favicon.ico" type="image/x-icon" rel="icon" /> -->
  <script type="text/javascript" src="/themes/qu/js/common.js?v=1.9.1"></script>
  <script type="text/javascript" src="<?php echo TEMPLATE; ?>qu/js/zepto.min.js"></script>
  <script src='/themes/cash/js/common_tool.js'></script>
  <script type="text/javascript" src="/static/js/jgosport-1.0.js?ver=201611180"></script>
  <style>#loading{position: fixed;top:0;left:0;bottom:0;left:0;} </style>
  <?php 
    if(CHANNEL_SOURCE=='qqwallet'){
     ?>  
  <link href="/themes/qq/stylesheets/mobile-qq.css?ver=20161015" type="text/css" rel="stylesheet">
  <script type="text/javascript" src="//open.mobile.qq.com/sdk/qqapi.js?_bid=152"></script>
  <script type="text/javascript" src="/themes/qq/js/mobile-qq-menu.js?ver=20161111"></script> 
  <?php } ?>    
  <script type="text/javascript">
    var utmSource = '<?php echo UTM_SOURCE; //来源?>';
  </script>
</head>
<body data-design-width="750">