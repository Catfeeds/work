<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta content="telephone=no" name="format-detection">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no,minimal-ui">
    <title>拼场球局</title>
    <link rel="stylesheet" href="/static/appwebview/courtpool2.0/stylesheets/list2.0.css"><!--[if IE 8]>
    <link rel="stylesheet" href="/static/appwebview/courtpool2.0/stylesheets/list2.0-ie8.css"><![endif]--> 
    <script type="application/javascript">
	//全局参数
	var page_url = '<?php echo $ajax_page['url'];?>';
	var page_current = <?php echo $ajax_page['current_page'];?>;
	var page_total = <?php echo $ajax_page['total_page'];?>;
	</script>
  </head>
  <body data-design-width="750">
    <div id="loading" data-lock="1" class="loading">
      <div class="loading-icon"></div>
    </div>
    <div class="main hide" data-ajax-lock="false">
      <div class="header">
        <div onclick="history.back()" class="left"><i class="icon-back"></i></div>
        <div class="center">拼场球局</div>
        <div class="right hide"> </div>
      </div>
      <div class="body">
        <div id="wrapper">
          <div id="scroller">
        <div class="list-day borderBottom1px">
        <ul>
		<?php
		//拼场日期
        if (isset($date_list) && !empty($date_list)){
            foreach($date_list as $d_value){
        ?>
            <li><a href="<?php echo $d_value['go_url'];?>" class="<?php echo $d_value['is_checked'];?>"><h3><?php echo $d_value['date_name'];?></h3><h4><?php echo $d_value['week_name'];?></h4></a></li>
		<?php
            }
        }
        ?>
        </ul>
        </div>
        
        <?php
		//拼场场馆列表
        if (isset($venus_list) && !empty($venus_list)){
            foreach($venus_list as $v_value){
        ?>
        <div class="list-venues">
          <div class="list-venues-name borderBottom1px"><?php echo $v_value['venues_name'];?><span><?php echo $v_value['region_name'];?></span></div>
          <ul>
			<?php
            //场地列表
            if (isset($v_value['court_pools']) && !empty($v_value['court_pools'])){
                foreach($v_value['court_pools'] as $cp_value){
            ?>
            <li><a href="/courtpool/detail?id=<?php echo $cp_value['court_pool_id'];?>">
                <div data-src="url('/static/appwebview/courtpool2.0/images/list2.0/<?php echo $cp_value['day_icon'];?>')" class="list-venues-left use-background"><span><?php echo $cp_value['start_hour'];?><i>点</i></span></div>
                <div class="list-venues-right">
                  <p class="top"><i style="color:#009ff0;"><?php echo $cp_value['price'];?></i><i style="font-size:0.15rem;">元/人</i>&nbsp;<?php echo $cp_value['time_str'];?></p>
                  <p class="bottom">
                  <?php
				  if( isset($cp_value['current_num']) && intval($cp_value['current_num']) > 0 ){
						echo '已有'.$cp_value['current_num'].'人加入';  
				  }
				  ?>
                  </p>
                </div>
                <div class="icon-right"><img data-src="/themes/qu201/images/qu_detail/icon-right.png"></div></a>
			</li>
			<?php
                }
            }//END venus_list
            ?>
          </ul>
          
        </div>
        <?php
            }
        }//END venus_list
        ?>
        </div>
      </div>
      </div>
    </div>
    <div class="nm-toast hide"></div>
  </body>
  <script src="/static/js/jquery-1.12.0.min.js"></script>
  <script src="/themes/qu202/js/touchScroll.js"></script>
  <script src="/static/appwebview/courtpool2.0/js/list2.0_es5.js"></script>
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