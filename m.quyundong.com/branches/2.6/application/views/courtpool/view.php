<?php $this->display('courtpool/header.php');?>
<div id="loading" data-lock="1" class="loading">
        <div class="loading-icon"></div>
        <div id="wxtitle" class="hide"><?php if(isset($courtPoolInfo['venues_name'])) echo $courtPoolInfo['venues_name'];?> <?php if(isset($courtPoolInfo['date_time'])) echo date('m月d日', $courtPoolInfo['date_time'])?>的<?php echo isset($courtPoolInfo['level_name']) ? $courtPoolInfo['level_name'] : '';?>拼场，还缺人，来吗？</div>
        <div id="wxdesc" class="hide">拼场就在这里！已经为您准备好了球友、球和场地，还在等什么？<?php echo $courtPoolInfo['price']; ?>元立即加入。</div>
        <div id="wximgUrl" class="hide">/static/appwebview/courtpool/images/share.png</div>
    </div>
    <script src="/static/js/jweixin-1.0.0.js"></script>
    <script src="/static/js/weixinshareurl.js"></script>
    <div class="main hide">
    	<?php 
    	if(!empty($courtPoolInfo)){
    	?>
        <div class="detail-head" onclick="window.location.href='/court/detail?id=<?php echo $courtPoolInfo['business_id'];?>'">
            <p class="detail-head-name"><?php if(isset($courtPoolInfo['venues_name'])) echo $courtPoolInfo['venues_name'];?></p>
            <p class="detail-head-time"><?php if(isset($courtPoolInfo['address'])) echo $courtPoolInfo['address'];?></p><span class="pcDetail-arrow"></span>
        </div>
        <ul class="detail-info">
            <li class="detail-info-type"><span><?php echo $courtPoolInfo['level_name'];?></span>
                <div><?php if(isset($courtPoolInfo['start_time'], $courtPoolInfo['end_time'], $courtPoolInfo['date_time'])) echo date('m月d日', $courtPoolInfo['date_time']).' '.date('H:i', $courtPoolInfo['start_time']).'-'.date('H:i', $courtPoolInfo['end_time'])?></div>
            </li>
            <li class="detail-info-money"><span><?php echo isset($courtPoolInfo['price']) ? $courtPoolInfo['price'] : 0;?><em>元/人</em></span>
                <div>
                	<?php 
                	if(isset($courtPoolInfo['description']) && $courtPoolInfo['description']){
						foreach ($courtPoolInfo['description'] as $v){
                	?>
                    <p><?php echo $v['text'];?></p>
                    <?php }}?>
                </div>
            </li>
        </ul>
        <div class="detail-join">
        	<input type="hidden" name="user_id" value="<?php echo $userId;?>"/>	
        	<input type="hidden" name="court_pool_id" value="<?php echo $courtPoolInfo['court_pool_id']?>"/>
            <?php 
            if(in_array($courtPoolInfo['court_pool_status'], array(1,2))){
            ?>
            <div class="detail-join-btn<?php if($courtPoolInfo['join_status']==1) echo ' started';?>"<?php if($courtPoolInfo['join_status']==0) echo ' id="join_btn"';?>><?php echo $joinStatus[$courtPoolInfo['join_status']]?></div>
            <?php }else{?>
            <div class="detail-join-btn started"><?php echo isset($courtPoolStatus[$courtPoolInfo['court_pool_status']]) ? $courtPoolStatus[$courtPoolInfo['court_pool_status']] : ''?></div>
            <?php }?>
            <p class="orderdetail-friend">本场球友</p>
        </div>
        <div class="detail-rate">
            <div class="orderdetail-rate">
                <ul class="orderdetail-bar orderdetail-struct clearfix">
                	<?php 
                	if($courtPoolInfo['current_num']>$courtPoolInfo['max_num']) $courtPoolInfo['current_num'] = $courtPoolInfo['max_num'];
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
                        <div><span class="orderdetail-start<?php if($courtPoolInfo['current_num']>=$courtPoolInfo['min_num']) echo '  detail-full';?>">开场</span></div>
                    </li>
                    <li<?php echo $class[5];?>>
                        <div></div>
                    </li>
                    <li<?php echo $class[6];?>>
                        <div><span class="orderdetail-end<?php if($courtPoolInfo['current_num']>=$courtPoolInfo['max_num']) echo '  detail-full';?>">满员</span></div>
                    </li>
                    <div class="orderdetail-rate-txt left-<?php echo $courtPoolInfo['current_num'];?>"><i<?php if($courtPoolInfo['current_num']>0) echo ' class="i-blue"'?>><?php echo $courtPoolInfo['current_num'];?></i><i>/<?php echo $courtPoolInfo['max_num'];?></i></div>
                </ul>
            </div>
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
        </div>
        	<?php if($courtPoolInfo['court_pool_status']==1){?>
        <div class="detail-tip"><img data-src="/static/appwebview/courtpool/images/detail-1dpr2x.png" alt=""><span><?php echo isset($courtPoolInfo['tips']) ? $courtPoolInfo['tips'] : '';?></span></div>
			<?php }?>
    	<?php }else{?>
    	<p>拼场不存在</p>
    	<?php }?>
        <div class="detail-observe"><img src="/static/appwebview/courtpool/images/observe.png" alt=""></div>
        <div class="detail-space70"></div>
    </div>
    <script src="/static/js/jquery-1.12.0.min.js"></script>
    <script type="text/javascript" src="<?php echo TEMPLATE; ?>qu/js/confirmCourtPool.js?ver=1.0.6"></script>    	
	<script src="/static/js/mobileResponsive.js"></script>
	<script src="/static/appwebview/courtpool/js/courtpool.js"></script>
	<script>
	window.onload = function() {
	    var myURL = window.location.href.split('#')[0];
	    var loadInterval = setInterval(function() {
	        if ($(".loading").attr("data-lock") == 1) {
	            $(".loading").addClass("hide");
	            $(".main").removeClass("hide");
	            clearInterval(loadInterval);
	        }
	    }, 500);
	}
	</script>
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