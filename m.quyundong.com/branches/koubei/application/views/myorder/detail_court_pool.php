<?php $this->display('courtpool/header.php');?>
<?php if($courtPoolInfo){?>
<div id="loading" data-lock="1" class="loading">
      <div class="loading-icon"></div>
    </div>
    <div class="main hide">
      <div class="orderdetail-head">
        <div class="orderdetail-statuImg"><?php if(isset($courtPoolInfo['court_pool_status'], $status[$courtPoolInfo['court_pool_status']])){?><img data-src="/static/appwebview/courtpool/images/<?php echo $status[$courtPoolInfo['court_pool_status']]['icon']?>" alt=""><?php }?></div>
        <div class="orderdetail-statuText"> <span><?php echo isset($courtPoolInfo['court_pool_status'], $status[$courtPoolInfo['court_pool_status']]) ? $status[$courtPoolInfo['court_pool_status']]['tip'] : '';?></span></div>
        <div class="orderdetail-rate">
          <ul class="orderdetail-bar orderdetail-struct clearfix">
          	<?php 
	            for($i=1;$i<7;$i++){
	            $class[$i] = $i<=$courtPoolInfo['current_num'] ? '  class="active"' : '';
	            }
            ?>
            <li<?php echo $class[1];?>>
              <div></div>
            </li>
            <li<?php echo $class[2];?>>
              <div></div>
            </li>
            <li<?php echo $class[3];?>>
              <div></div>
            </li>
            <li<?php echo $class[4];?>>
              <div><span class="orderdetail-start">开场</span></div>
            </li>
            <li<?php echo $class[5];?>>
              <div></div>
            </li>
            <li<?php echo $class[6];?>>
              <div><span class="orderdetail-end">满员</span></div>
            </li>
          </ul>
        </div>
        <div class="orderdetail-statuTip">
        <?php 
        if($tips){
        	echo implode('<br />', $tips);
        }
        ?>
        </div>
      </div>
      <ul class="orderdetail-gym">
        <li class="orderdetail-gym-li1" onclick="window.location.href='/courtpool/view?id=<?php echo $courtPoolInfo['court_pool_id'];?>'">
          <p class="orderdetail-gym-p1"><?php if(isset($courtPoolInfo['venues_name'])) echo $courtPoolInfo['venues_name'];?></p>
          <p><?php if(isset($courtPoolInfo['start_time'], $courtPoolInfo['end_time'], $courtPoolInfo['date_time'])) echo date('m月d日', $courtPoolInfo['date_time']).' '.date('H:i', $courtPoolInfo['start_time']).'-'.date('H:i', $courtPoolInfo['end_time'])?></p><span class="pcDetail-arrow"><?php echo $courtPoolInfo['level_name'];?></span>
        
        </li>
        <?php        
        if($detail['order_status'] != '0'){
        ?>
        <li class="orderdetail-gym-li2">
          <p>订单号：<span><?php echo $detail['order_no']?></span></p>
          <p style="margin-bottom: 0.1rem;">金额：<span><?php echo floatval($detail['order_amount']) + floatval($detail['user_money'])?></span>元</p>
          
        </li>
        <?php }?>
      </ul>
      <?php 
        if($detail['order_status'] == '0'){
        ?>
      <div class="detail-join">
        <div class="detail-join-btn" onclick="window.location.href='/order/pay?id=<?php echo $detail['order_id']; ?>'">立即支付</div>
        <div class="orderdetail-time"> <img data-src="/static/appwebview/courtpool/images/detail-1dpr2x.png" alt=""><span>还剩8分23秒</span></div>
      </div>
      <?php }?>
      <p class="orderdetail-friend">本场球友</p>
      <ul class="orderdetail-member orderdetail-struct clearfix">
        <?php 
            	$users = isset($courtPoolInfo['user_list']) ? $courtPoolInfo['user_list'] : array();
            	for($i=0;$i<6;$i++){
					if(isset($users[$i])){
            	?>
                <li>
                    <div data-src="url(/static/appwebview/courtpool/images/pcDetail-5dpr2x.png)" class="orderdetail-member-div1 use-background">
                        <div style="background-image:url(<?php echo $users[$i]['avatar'] ? $users[$i]['avatar'] : '/static/appwebview/courtpool/images/no-avatar@drp2x.png'?>)"></div>
                    </div>
                    <div><?php echo isset($users[$i]['user_name']) ? $users[$i]['user_name'] : '';?></div>
                </li>
                <?php }else{?>
                <li>
                    <div data-src="url(/static/appwebview/courtpool/images/pcDetail-5dpr2x.png)" class="orderdetail-member-div1 use-background">
                        <div></div>
                    </div>
                    <div></div>
                </li>
                <?php }}?>
      </ul>
      <div class="orderdetail-que"> <span><a href="/courtpool/guide">遇到问题</a></span></div>
    </div>
    <script src="/static/js/jquery-1.12.0.min.js"></script>
  <script src="/static/js/mobileResponsive.js"></script>
  <script src="/static/appwebview/courtpool/js/courtpool.js"></script>
  <script>
  	<?php 
  	$lastTime = isset($detail['add_time']) ? ($detail['add_time']+600 - time()) * 1000 : 0;
  	?>
      var countDown = <?php echo $lastTime > 0 ? $lastTime : 0;?>,countTimer=null,leftsecond,_m,_s;
      leftsecond = parseInt(countDown/1000);
      
      function showTime(){
          _m = parseInt((leftsecond / 60) % 60);
          _s = parseInt(leftsecond % 60);
          $(".orderdetail-time span").text("还剩"+_m+"分"+_s+"秒");
      }
      
      if(leftsecond>1){
        showTime();
        clearInterval(countTimer);
        countTimer = setInterval(function(){
          leftsecond--;
          if(leftsecond>=0){
            showTime();
          }else{
            clearInterval(countTimer);
          }
        },1000);
      }

      
    window.onload = function(){
      var myURL = window.location.href.split('#')[0];
      var loadInterval = setInterval(function() {
        if($(".loading").attr("data-lock") == 1){
           $(".loading").addClass("hide");
           $(".main").removeClass("hide");
           clearInterval(loadInterval);
        }
      },500);
    }	
  </script>
<?php }else{?>
<img width="100%" src="<?php echo TEMPLATE?>qu/images/nodata@2x.png" />
<?php }?>
  <script>
    var _hmt = _hmt || [];
    (function() {
    var hm = document.createElement("script");
    hm.src = "//hm.baidu.com/hm.js?faab40fbb816cf9bb1c5c940b05b0b98";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
    })();
  </script>
  
<?php $this->display('courtpool/footer.php');?>