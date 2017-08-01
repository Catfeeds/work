<!DOCTYPE html>
<html>
  <head>
    <?php $this->display('public/title.php'); ?>
    <link rel="stylesheet" href="/static/appwebview/courtjoin/courtJoinOrderDetail/stylesheets/courtJoinOrderDetail.css">
  </head>
  <body data-design-width="750">
    <div id="loading" data-lock="1" class="loading">
      <div class="loading-icon"></div>
    </div>
    <div class="main hide">
      <div class="header court-header">
        <div class="left"><i onclick="history.back(-1);" class="icon-back"></i></div>
        <div class="center">订单详情</div>
        <div class="right"> 
        </div>
      </div>
      <div class="cj-od-body"> 
        <div class="cj-od-h1">
          <div class="left">球局详情</div><a href="<?= baf_CHtml::createUrl('/courtJoin/detail?id='.$joinOrderDetail['court_join_info']['cj_order_id']);?>" class="right">查看球局详情></a>
        </div>
        <ul class="cj-od-msg">
          <li> 
            <div class="person-info">
              <!-- 头像改第一个url -->
              <div style="background-image:url('<?php echo $joinOrderDetail['court_join_info']['launch_avatar'];?>'),url('http://api.7yundong.cn/uploads/avatar/avatar.png')" class="avatar"></div>
              <!-- 男的是 male 女的是 female -->
              <div <?php if ($joinOrderDetail['court_join_info']['gender']=='m') {echo 'male';}else{echo 'female';}?> class="name"><?php echo $joinOrderDetail['court_join_info']['launch_nick_name'];?></div>
              <div class="icons">
                <div icon class="icon-msg"></div>
                <div icon class="icon-phone"></div>
              </div>
            </div>
          </li>
          <li><span class='sp'>日期：</span><?php echo $joinOrderDetail['book_date_tile'];?></li>
          <!-- dataurl是跳到地图的地址 -->
          <li data-url="/court/map?id=<?php echo $joinOrderDetail['venues_info']['venues_id']?>&cid=<?php echo $joinOrderDetail['venues_info']['cat_id']?>&is_park=0" class="js-goto-url">
            <div class="left"><span class='sp'>场馆：</span><?php echo $joinOrderDetail['venues_info']['venues_name'];?></div>
            <div class="right sp">查看地图></div>
          </li>
        </ul>
        <!-- 未支付要显示下面按钮 -->
        <?php
		if ($detail['order_status'] == '0'){
		?>
        <a class="cj-od-buttom" href="<?= baf_CHtml::createUrl('/order/pay?id='.$detail['order_id']);?>">立即支付</a>
        <?php 
		}
		?>
        <div class="cj-od-h1">消费明细</div>
        <ul class="cj-od-msg">

          <li>
<?php
if(isset($detail['goods_list']) && !empty($detail['goods_list'])){
	$i = 0;
	foreach( $detail['goods_list'] as $goods ){
		if( $i == 0 ){
			echo "<span class='sp'>{$goods['course_name']}：</span>".date('H:i', $goods['start_time'])."-".date('H:i', $goods['end_time'])." ".$goods['shop_price']."元";
		}
		else {
			echo "<br><span class='sp '>{$goods['course_name']}：</span>".date('H:i', $goods['start_time'])."-".date('H:i', $goods['end_time'])." ".$goods['shop_price']."元";
		}
		$i++;
	}
	//<span class='sp'>5号场：</span>18:00-19:00 6元<br>
	//<span class='sp vh'>5号场：</span>19:00-20:00 6元
}
?>
          </li>
          
          <li><span class='sp'>订单金额：</span><?php echo floatval($detail['order_amount']) + floatval($detail['user_money']); ?>元<i class='icon-info' icon></i></li>
        </ul>
        <div class="cj-od-h1">订单信息</div>
        <ul class="cj-od-msg">
          <li>
            <span class='sp'>　订单号：</span><?php echo $detail['order_no']; ?><br>
            <span class='sp'>下单时间：</span><?php echo date('Y年m月d日 H:i:s',$detail['add_time']); ?><br>
            <span class='sp'>支付方式：</span><?php echo $detail['format_pay_name']; ?><br>
            <span class='sp'>订单状态：</span><?php echo $joinOrderDetail['order_status_title']?>
          </li>
        </ul>
        <?php if(isset($joinOrderDetail['court_join_info']['court_join_refund_arr']) && $joinOrderDetail['court_join_info']['court_join_refund_arr']['refund_permission_status'] == 0){ ?>
        <div class="cj-od-tips mt150" style='color:#666;'><?php echo isset($joinOrderDetail['court_join_info']['court_join_refund_arr']['refund_tips']) ? $joinOrderDetail['court_join_info']['court_join_refund_arr']['refund_tips'] : ''; ?></div><a href="tel:4000410480" style='color:#5f6dcf;border-bottom:1px solid #5f6dcf'>趣运动客服</a>
        <?php } elseif (isset($joinOrderDetail['court_join_info']['court_join_refund_arr']) &&  $joinOrderDetail['court_join_info']['court_join_refund_arr']['refund_permission_status'] == 1) { ?>
        <div class="cj-od-tips mt150" style='color:#666;'><?php echo isset($joinOrderDetail['court_join_info']['court_join_refund_arr']['refund_tips']) ? $joinOrderDetail['court_join_info']['court_join_refund_arr']['refund_tips'] : ''; ?></div><a class="cj-od-buttom" style='background-color:#fff;margin-bottom:50px;' id='out'>退出球局</a>
        <?php } elseif (isset($joinOrderDetail['court_join_info']['court_join_refund_arr']) &&  $joinOrderDetail['court_join_info']['court_join_refund_arr']['refund_permission_status'] == 2) { ?>
        <div class="cj-od-tips mt150" style='color:#666;'><?php echo isset($joinOrderDetail['court_join_info']['court_join_refund_arr']['refund_tips']) ? $joinOrderDetail['court_join_info']['court_join_refund_arr']['refund_tips'] : ''; ?></div><a class="cj-od-buttom" style='background-color:#fff;margin-bottom:50px;border-color:#aaa;color:#aaa;'>你已经退出球局</a>
        <?php } ?>
        <input id="user_id" type="hidden" name="user_id" value="<?php echo $joinOrderDetail['user_id']; ?>">
        <input id="order_id" type="hidden" name="order_id" value="<?php echo $joinOrderDetail['order_info']['order_id']; ?>">
        <input id="refund_way" type="hidden" name="refund_way" value="2">
        <input id="refund_cause" type="hidden" name="refund_cause" value="0">
      </div>
      <div class="nm-cover js-cover hide">
        <div class="nm-alert">
          <div class="msg">下载趣运动APP,体验更多好玩的功能！</div>
          <div class="opeator">
            <div class="sure"> <a href="http://www.quyundong.com/d">立即下载</a></div>
            <div class="cancel">取消</div>
          </div>
        </div>
      </div>
      <div class="nm-cover js-info-cover hide">
        <ul class="cj-od-info-show">
          <li>
            <div class="left">总计</div>
            <div class="right"><?php echo $joinOrderDetail['order_info']['total_amount']; ?>元</div>
          </li>
          <li>
            <div class="left">优惠</div>
            <div class="right"><?php echo $joinOrderDetail['order_info']['order_promote']; ?>元</div>
          </li>
          <li>
            <div class="left">余额支付</div>
            <div class="right color-blue"><?php echo $joinOrderDetail['order_info']['user_money']; ?>元</div>
          </li>
          <li>
            <div class="left">支付余额</div>
            <div class="right color-blue"><?php echo $joinOrderDetail['order_info']['order_amount']; ?>元</div>
          </li>
        </ul>
      </div>
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
    <script src="/static/appwebview/courtjoin/js/showWait.js?ver=20161102"></script>
    <script src="/static/appwebview/courtjoin/courtJoinOrderDetail/js/courtJoinOrderDetail.js?ver=20161111"></script>
  </body>
</html>