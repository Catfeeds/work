<!DOCTYPE html>
<html>
  <head>
    <?php $this->display('public/title.php'); ?>
    <link rel="stylesheet" href="/static/appwebview/courtpool2.0/stylesheets/orderdetail2.0.css"><!--[if IE 8]>
    <link rel="stylesheet" href="/static/appwebview/courtpool2.0/stylesheets/orderdetail2.0-ie8.css"><![endif]--> 
  </head>
  <body data-design-width="750">
    <div id="loading" data-lock="1" class="loading">
      <div class="loading-icon"></div>
    </div>
    <div class="main hide">
      <div class="header">
        <div class="left"><a href="javascript:window.history.go(-1);"><i class="icon-back"></i></a></div>
        <div class="center">订单详情</div>
        <a href="<?php echo $order_data['question'];?>" class="right hide" style="width:80px;width:0.8rem">玩法说明</a>
      </div>
      <div class="od-head borderBottom1px">
        <div data-src="url('/static/appwebview/courtpool2.0/images/list2.0/<?php echo $order_data['day_icon'];?>')" class="od-venues-left use-background"><span><?php echo $order_data['start_hour'];?><i>点</i></span></div>
        <a class="od-venues-right" style="display:block;color:#222;" href="<?= baf_CHtml::createUrl('/courtpool/detail?id='.$order_data['court_pool_id']);?>">
          <p class="top">
           <span><?php echo $order_data['venues_name'];?></span>
           <span class="goto">
              <span class="icon-right"><img data-src="/themes/qu201/images/qu_detail/icon-right.png"></span>
            </span>
          </p>
          <p class="bottom"><?php echo $order_data['start_time'];?> － <?php echo $order_data['end_time'];?></p>
        </a>
      </div>
      <div class="od-body">
        <div class="od-status">
          <div class="od-status-top">
            <div class="od-status-left">
              <div class="inner">
				<?php
                //拼场状态：1:拼场中 2:开场 3:即将开始（已塞人） 4:完成 5:取消
                if ($order_data['court_pool_status'] == 5 ){
					echo '<img data-src="/static/appwebview/courtpool2.0/images/orderdetail2.0/pin-fail-dpr2x.png">';
				}
				//
				elseif ( $order_data['court_pool_status'] == 4 ){
					echo '<img data-src="/static/appwebview/courtpool2.0/images/success2.0/icon-success-dpr2x.png">';
				}
				elseif ( $order_data['court_pool_status'] == 2 || $order_data['court_pool_status'] == 3 ){
					echo '<img data-src="/static/appwebview/courtpool2.0/images/orderdetail2.0/pin-success-dpr2x.png">';
				}
				else {
					echo '<img data-src="/static/appwebview/courtpool2.0/images/orderdetail2.0/pin-dpr2x.png">';	
				}
                ?>
              </div>
            </div>
            <div class="od-status-right">
              <div class="inner borderBottom1px" style="min-height:0.4rem;">
			<?php
				if (isset($order_data['cp_status_title']) && !empty($order_data['cp_status_title'])){
					 echo '<p style="font-weight: bolder;">'.$order_data['cp_status_title'].'</p>'; 
				}
				if (isset($order_data['cp_msg_1']) && !empty($order_data['cp_msg_1'])){
					 echo '<p>'.$order_data['cp_msg_1'].'</p>'; 
				}
				if (isset($order_data['cp_msg_2']) && !empty($order_data['cp_msg_2'])){
					 echo '<p>'.$order_data['cp_msg_2'].'</p>'; 
				}
			?>
              </div>
            </div>
          </div>
          <!-- 订单信息 -->
          <div class="od-status-top">
            <div class="od-status-left">
              <div class="inner"><img data-src="/static/appwebview/courtpool2.0/images/orderdetail2.0/order-msg-dpr2x.png"></div>
            </div>
            <div class="od-status-right">
              <div class="inner">
                <p>订单号：<?php echo $order_data['order_no'];?></p>
                <p>已支付：<?php echo $order_data['order_amount'];?>元</p>
                <p>场地号：<?php echo $order_data['court_no'];?></p>
              </div>
            </div>
          </div>
          <!-- 订单信息end -->
		<?php
		//未支付的订单
        if ($order_data['order_status'] == 0 && $order_data['pay_timeout'] > 0){
        ?>
			<div class="od-status-bottom"><a href="<?= baf_CHtml::createUrl('/order/pay?id='.$order_data['order_id']);?>" data-time="<?php echo intval($order_data['pay_timeout']);?>" class="timeout">立即支付 还剩<i class="minutes">0分0秒</i></a></div>
          
		<?php
        }
		// END 支付倒计时
        ?>
        
        </div>
        
	<?php
		//拼场中,拼场成功显示
        if ($order_data['court_pool_status'] == 1 || $order_data['court_pool_status'] == 2){
	?>
        <div class="od-site ">
          <div class="od-site-title borderBottom1px" style="font-size:0.12rem;"><?php echo $order_data['cp_tips_1'];?></div>
        </div>
	<?php
        }
		// END 拼场中,拼场成功显示
		
		//是否有球友列表
        if (isset($order_data['user_list']) && !empty($order_data['user_list']) 
			&& $order_data['order_status'] != 2 && in_array($order_data['court_pool_status'], array(3,4))
		){
	?>
        <div class="od-site borderBottom1px">
          <div class="od-site-players">
            <h3>本场球友</h3>
            <ul>
		<?php
            //遍历显示球友
            foreach($order_data['user_list'] as $u_value){
        ?>
            <li>
            	<div class="od-site-players-left"><img data-src="<?php echo $u_value['avatar'];?>"></div>
                <div class="od-site-players-right">
                    <p class="username"><?php echo $u_value['user_name'];?></p>
                    <p class="hadpin">已拼<?php echo $u_value['join_times'];?>局 <?php if($u_value['with_times'] > 0 ){?>与我同场<span style="color:#009ff0"><?php echo $u_value['with_times'];?></span>次<?php }?></p>
                </div>
            </li>
        <?php
            }
			//END foreach 遍历显示球友
        ?>
            </ul>
          </div>
        </div>
	<?php
	}
	// END IF
	?>
        
        <div class="od-qusetion"><a href="<?php echo baf_CHtml::createUrl($order_data['question']);?>">遇到问题？</a></div>
      </div>
    </div>
  </body>
  <script src="/static/js/jquery-1.12.0.min.js"></script>
  <script src="/static/appwebview/courtpool2.0/js/orderdetail2.0_es5.js"></script>
  <script src="/themes/qu/js/confirmCourtPool.js?ver=20161111"></script>
</html>