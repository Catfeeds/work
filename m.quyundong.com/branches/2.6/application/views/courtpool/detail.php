<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta content="telephone=no" name="format-detection">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no,minimal-ui">
    <title>拼场详情</title>
    <link rel="stylesheet" href="/static/appwebview/courtpool2.0/stylesheets/detail2.0.css"><!--[if IE 8]>
    <link rel="stylesheet" href="/static/appwebview/courtpool2.0/stylesheets/detail2.0-ie8.css"><![endif]--> 
    <script type="application/javascript">
	//全局参数
	var court_pool_id = <?php echo intval($venus_data['court_pool_id']);?>;
	var user_id = <?php echo intval($user_id);?>;
	var court_pool_id = <?php echo intval($venus_data['court_pool_id']);?>;
	var join_status = <?php echo intval($venus_data['join_status']);?>;
	
	//分页
	var page_url = '<?php echo $ajax_page['url'];?>';
	var page_current = <?php echo $ajax_page['current_page'];?>;
	var page_total = <?php echo intval($ajax_page['total_page']);?>;
	
	</script>
  </head>
  <body data-design-width="750">
    <div id="loading" data-lock="0" class="loading">
      <div class="loading-icon"></div>
      <div id="wxtitle" class="hide"><?php echo $venus_data['share']['title'];?></div>
      <div id="wxdesc" class="hide"><?php echo $venus_data['share']['content'];?></div>
      <div id="wximgUrl" class="hide"><?php echo $venus_data['share']['logo'];?></div>
    </div>
    <script src="/static/js/jweixin-1.0.0.js"></script><script type="text/javascript" src="/static/js/jgosport-1.0.js?ver=201611180"></script>
    <script src="/static/js/weixinshareurl.js"></script>
    <div class="main hide" data-ajax-lock="false">
      <div class="header">
      
        <div class="left" ><a href="javascript:history.go(-1);"><i class="icon-back"></i></a></div>
        <div class="center">拼场详情</div>
        <a href="/courtpool/help" class="right" style="width:80px;width:0.8rem">玩法说明</a>
      </div>
      <div class="detail">
        <div id="wrapper">
          <div id="scroller">
            <div class="detail-head borderBottom1px">
              <div data-src="url('/static/appwebview/courtpool2.0/images/list2.0/<?php echo $venus_data['day_icon'];?>')" class="od-venues-left use-background"><span><?php echo $venus_data['start_hour'];?><i>点</i></span></div>
              <a class="od-venues-right" style="display:block;color:#222;" href="/court/detail?id=<?php echo $venus_data['business_id'];?>&cid=<?php echo $venus_data['cat_id'];?>">
                <p class="top"> 
                <span><?php echo $venus_data['venues_name'];?></span>
                <span class="goto">
                  <span>查看球馆</span>
                  <span class="icon-right"><img data-src="/themes/qu201/images/qu_detail/icon-right.png"></span>
                </span>
                </p>
                <p class="bottom"><?php echo $venus_data['start_time'];?> － <?php echo $venus_data['end_time'];?></p>
              </a>
            </div>
            <div class="detail-body">
              <div class="detail-info">
                <div class="detail-info-left">
                  <div class="icon"><img data-src="/static/appwebview/courtpool2.0/images/detail2.0/icon-haspin-dpr2x.png"></div>
                  <div class="desc">
                    <p style="color:#666;"><?php echo $venus_data['total'];?>人</p>
                    <p>拼过该场</p>
                  </div>
                </div>
                <div class="detail-info-right">
                  <div class="icon"><img data-src="/static/appwebview/courtpool2.0/images/detail2.0/icon-success-dpr2x.png"></div>
                  <div class="desc">
                    <p style="color:#666;"><?php echo $venus_data['complete'];?>场</p>
                    <p>已拼成功</p>
                  </div>
                </div>
              </div>
              <div class="detail-site">
                <div class="od-site-title borderBottom1px"> 
                  <div class="left">本场球友</div>
                  <?php // <div class="right "><?php echo $venus_data['court_pool_tips'];? ></div> ?>
                  <div class="right "><?php echo $venus_data['court_pool_tips'];?></div>
                </div>
                <div class="od-site-players">
			     <?php
                  //拼场日期
                  if (isset($user_list) && !empty($user_list)){
					  echo '<ul style="padding-bottom:1.2rem;">';
                      foreach($user_list as $u_value){
                  ?>
                    <li>
                      <div class="od-site-players-left"><img data-src="<?php echo $u_value['avatar'];?>"></div>
                      <div class="od-site-players-right">
                        <p class="username"><?php echo $u_value['user_name'];?></p>
                        <p class="hadpin">已拼<?php echo $u_value['join_times'];?>场 <?php if($u_value['with_times'] > 0 && $user_id > 0){?>与我同场<span style="color:#009ff0"><?php echo $u_value['with_times'];?></span>次<?php }?></p>
                      </div>
                    </li>
			     <?php
                      }
					  echo '</ul>';
                  }
				  else {
				?>
					<!-- 没人时候的小人 -->
                  <div class="od-site-placehoder"><img src="/static/appwebview/courtpool2.0/images/orderdetail2.0/icon-placeholder-dpr2x.png"></div>
                  <!-- 小人end -->
                <?php
				  }
              	?>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="detail-fixed">
		<?php
        //是否可以加入
        if (isset($venus_data['join_status']) && $venus_data['join_status']==1 && intval($venus_data['last_num']) > 0){
			
			echo '<div class="detail-fixed-right ">'.$venus_data['price'].'元/人 '.$venus_data['join_tips'].'</div>';
        }
        else {
        ?>
        	<div class="detail-fixed-right disable"><?php echo $venus_data['join_tips'];?></div>
		<?php
        }
        //END 是否可以加入
        ?>
        <div class="detail-fixed-left">邀请好友</div>
      </div>
      <div class="nm-cover hide">
        <img src="/static/appwebview/courtpool2.0/images/detail2.0/icon-box-true-dpr2x.png" class="hide">
        <div class="nm-alert">
          <h3>您是怎么样的选手？</h3>
          <h4>(将会作为场地分配的依据)</h4>
          <div class="radio borderBottom1px">
          
			<?php
            //拼场日期
            if (isset($venus_data['levels']) && !empty($venus_data['levels'])){
              foreach($venus_data['levels'] as $radio){
            ?>
            <label>
              <input type="radio" name="level" id="cp_level_<?php echo $radio['level_id'];?>" value="<?php echo $radio['level_id'];?>" class="hide"><span><?php echo $radio['level_name'];?></span>
              <div class="icon"><img src="/static/appwebview/courtpool2.0/images/detail2.0/icon-box-false-dpr2x.png"></div>
            </label>
            <?php
				}
			}
			?>
            
          </div>
          <div class="tips">
            <div class="t">Tips:</div>
            <p>含每场一筒球</p>
            <p>若拼场不成功，费用将原路退回</p>
          </div><a class="sure" id="joincp_btn"><i><?php echo $venus_data['price'];?></i>元/人 确定</a>
          
        </div>
      </div>
      <div class="nm-toast hide"></div>
      <div class="nm-share hide">
        <div data-src="url('/static/appwebview/courtpool2.0/images/detail2.0/share-dpr2x.png')" class="share use-background"><span>点击右上角的图标分享给朋友</span></div>
        <div data-src="url('/static/appwebview/courtpool2.0/images/detail2.0/msg-dpr2x.png')" class="msg use-background"></div>
      </div>
    </div>
  </body>
  <script src="/static/js/jquery-1.12.0.min.js"></script>
  <script type="text/javascript">
  $(function(){
    var cookie_level = getOrderCookie('cporder_level');
    if( cookie_level==1 || cookie_level== 2 || cookie_level== 3 ){
      $("#cp_level_"+cookie_level).prop("checked",true);  
    }
  })
  </script>
  <script src="/themes/qu202/js/touchScroll.js"></script>
  <script src="/themes/qu/js/confirmCourtPool.js?ver=20161111"></script>
  <script src="/static/appwebview/courtpool2.0/js/detail2.0_es5.js"></script>
  <script>
    var _hmt = _hmt || [];
    (function() {
    var hm = document.createElement("script");
    hm.src = "//hm.baidu.com/hm.js?faab40fbb816cf9bb1c5c940b05b0b98";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
    })();
  </script>
</html>