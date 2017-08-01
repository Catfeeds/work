<!DOCTYPE html>
<html>
  <head>
    <?php $this->display('public/title.php'); ?>
    <link rel="stylesheet" href="/static/appwebview/courtjoin/payOk/stylesheets/payok.css">
  </head>
  <body data-design-width="750" data-order-id="123">
    <div id="loading" data-lock="1" class="loading">
      <div class="loading-icon"></div>
    </div>
    <div class="main hide">
      <div class="header court-header">
        <div class="left"><i onclick="history.back(-1);" class="icon-back"></i></div>
        <div class="center">支付成功</div>
        <div class="right"> <a href="#">帮助</a></div>
      </div>
      <div class="payok-logo"><img src="/static/appwebview/courtjoin/images/payok_coin.png"></div>
      <div class="tc"><span class="fcb">支付成功！</span></div>
      <div class="pay-info">
        <ul> 
          <li>项目：</li>
          <li><?php echo !empty($order['category_name']) ? $order['category_name'] : '';?></li>
        </ul>
        <ul> 
          <li>场馆：</li>
          <li><?php echo !empty($order['name']) ? $order['name'] : '';?></li>
        </ul>
        <ul> 
          <li>日期：</li>
          <li><?php echo !empty($order['goods_list'][0]['book_date']) ? $order['goods_list'][0]['book_date'] : '';?></li>
        </ul>
        <ul> 
          <li>场次：</li>
          <li>
          <?php
          if(!empty($order['goods_list'])){
            foreach ($order['goods_list'] as $key => $value) {
          ?>
              <p><?php echo $key>0 ? '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;':'';?><?php echo date('H:i', $value['start_time']).'-'.date('H:i', $value['end_time']).' '.$value['course_name']?></p>
          <?php }} ?>    
          </li>
        </ul>
      </div>
      <div class="payok-txt"><span><?php echo !empty($order['court_join_remind_tips']) ? $order['court_join_remind_tips'] : '';?></span></div><a href="#">
        <div class="detail-btn fcb" onclick="window.location.href='<?= baf_CHtml::createUrl('/myorder/detail?id='.$order['order_id']);?>'"><span>查看订单详情</span></div></a>
    </div>
    <script src="/static/js/zeptoWithFx.min.js"></script>
    <script src="/static/js/mobileResponsive.js"></script>
    <script>
      window.onload = function(){
        var loadInterval = setInterval(function() {
          if($(".loading").attr("data-lock") == 1){
             $(".loading").addClass("hide");
             $(".main").removeClass("hide");
             clearInterval(loadInterval);
          }
        },500);
      }
    </script>
  </body>
</html>