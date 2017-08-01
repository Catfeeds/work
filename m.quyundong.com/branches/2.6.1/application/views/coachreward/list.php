<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta content="telephone=no" name="format-detection">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no,minimal-ui">
    <title>奖励情况</title>
    <link rel="stylesheet" href="/static/appwebview/yue/list/stylesheets/list.css">
    <link rel="stylesheet" href="/static/appwebview/yue/rewardinfo/stylesheets/rewardinfo.css">
  </head>
  <body>  
    <section id="loading" data-lock="0" class="loading">
      <div class="loading-icon"></div>
    </section>
    <section class="yue-rei-main hide" data-page="1">
      <div class="yue-rei-topinfo" style="font-size:0.12rem;">邀请朋友成为陪练奖励10元，30天内满5单奖励20元</div>
      <?php if(!empty($list['rewardList'])) {?>
      <div class="yue-rei-timeline">
        <?php foreach ($list['rewardList'] as $k=>$res) {?>
        <div class="yue-rei-timeline-data" data-time="<?php echo strtotime(date('Ymd',str_replace('s_', '', $k)));?>" ><?php echo date('Y年m月d日',str_replace('s_', '', $k));?></div>
        <ul class="yue-rei-timeline-ul" data-time="<?php echo strtotime(date('Ymd',str_replace('s_', '', $k)));?>" >
          <?php foreach ($res as $l) {?>          
          <li class="yue-rei-timeline-li">
            <div class="yue-rei-timeline-li-name"><span><?php echo $l['coach_name'];?></span></div>
            <div class="yue-rei-timeline-li-10 <?php if($l['reward_status'] > 0){ echo "cur";}?>"><span>&nbsp;奖励10元&nbsp;</span></div>
            <div class="yue-rei-timeline-li-20 <?php if($l['reward_status'] == 2){ echo "cur";}?>"><span>&nbsp;奖励20元&nbsp;</span></div>
          </li>
          <?php }?>
        </ul>
        <?php }?>
        
      </div>
      <?php }?>
      <div class="yue-rei-more hide">点击获取更多</div>
    </section>
    <section class="yue-alert hide">
      <div class="info"><span>请稍候！</span><div class="close hide">关闭</div></div>
    </section>
    <script src="/static/js/zeptoWithFx.min.js"></script>
    <script src="/static/js/mobileResponsive.js"></script>
    <script src="/static/appwebview/yue/rewardinfo/js/getmorelist.js"></script>
    <script type="text/javascript">
      window.onload = function(){
       $(".loading").addClass("hide");
       $(".yue-rei-main").removeClass("hide");
      }
    </script>
  </body>
</html>