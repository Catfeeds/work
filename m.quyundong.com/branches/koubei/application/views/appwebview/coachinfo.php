<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta content="telephone=no" name="format-detection">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no,minimal-ui">
    <meta name="wap-font-scale" content="no">
    <title>趣运动陪练 <?php echo $list['coach_name']?></title>
    <link rel="stylesheet" href="/static/appwebview/yue/detail/stylesheets/detail.css?v=20150909b">
    <!--[if IE]>
      <link href="/static/appwebview/yue/detail/stylesheets/detail_ie.css?v=20151021b" media="screen, projection" rel="stylesheet" type="text/css" />
    <![endif]--> 
    <script type="text/javascript">
    window.onerror = function(errorMessage, scriptURI, lineNumber,columnNumber,errorObj) { 
      return true;
    }
    </script>
    <script src="/static/js/jweixin-1.0.0.js"></script><script type="text/javascript" src="/static/js/jgosport-1.0.js?ver=201611180"></script>
    <style type="text/css">
      .yue-dt-cmt-cnt p{
        width: 100%;
        word-wrap: break-word;
      }
      body{
        max-width: 640px;
        margin: 0 auto;
      }
    </style>
  </head>
  <body style="margin:0 auto;">
    <div id="loading" data-lock="0" class="loading">
      <div class="loading-icon"></div>
      <div id="wxtitle" class="hide">趣运动陪练 <?php echo $list['coach_name']?></div>
      <div id="wxdesc" class="hide"><?php echo $list['introduce']?></div>
      <div id="wximgUrl" class="hide"><?php echo $list['avatar']?></div>
    </div>
    <script src="/static/js/weixinshareurl.js"></script>
    <div class="yue-dt-main hide" style="padding-bottom: .5rem;">
      <div class="yue-dt-info se">
        <div class="yue-dt-info-gallery">
          <ul class="j-silder-imglist">
            <li style="
    background: url(<?php echo $list['avatar']?>) no-repeat;
    -webkit-background-size: cover;
"><img style="opacity:0;height:100%;" data-origin=<?php echo $list['avatar_original']?> src=<?php echo $list['avatar']?>></li>
            <?php foreach ($list['gallery'] as $ksy =>$value) {?>
            <li style="
    background: url(<?php echo $value['thumb_url']?>) no-repeat;
    -webkit-background-size: cover;
"><img style="opacity:0;height:100%;" data-origin=<?php echo $value['image_url']?> src=<?php echo $value['thumb_url']?>></li>
          <?php }?>
          <?php $count=count($list['gallery'])+1?>
          </ul><span>共<?php echo $count;?>张</span>
        </div>
        <div class="yue-dt-info-meta">
          <div class="yue-dt-info-cell"><span><?php echo $list['coach_name']?></span>
         <?php if($list['gender']=='m'){ ?> <img src="/static/appwebview/yue/detail/images/male.png" class="yue-dt-info-icon-sex"><?php }?>
          <?php if($list['gender']=='f'){ ?> <img src="/static/appwebview/yue/detail/images/female.png" class="yue-dt-info-icon-sex"><?php }?>
          <?php if(isset($list['level']) && !empty($list['level']) && $list['level']==3){ ?><img src="/static/appwebview/yue/detail/images/renzheng.png" class="yue-dt-info-icon-rz"><?php }?>
          <br><span><?php echo $list['age']?>岁 / <?php echo $list['height']?>cm / <?php echo $list['weight']?>kg</span></div>
          <div class="yue-dt-info-cell"><img src="/static/appwebview/yue/detail/images/person.png" class="yue-dt-info-icon-person"><br><span><?php echo $list['student_count']?>人约过</span></div>
          <div class="yue-dt-info-cell"><img src="/static/appwebview/yue/detail/images/like.png" class="yue-dt-info-icon-like"><br><span><?php echo $list['collect_number']?>人想约</span></div>
        </div>
        <ul class="yue-dt-items">
          <li>
            <p>运动经历：</p>
             <p>
            <?php if(isset($list['sport_experience']) && !empty($list['sport_experience'])){
                foreach ($list['sport_experience'] as $ksy =>$value) {
                    echo  date('Y/m',$value['start_time']).'-'.date('Y/m',$value['end_time']) . ' '.$value['experience_content'].'</br>';}
            }else{
                echo '未填写';
                }
                ?>
               </p>
          </li>
          <li>
            <p>常驻场馆：</p>
                <p>
               <?php if(isset($list['often_area_list']) && !empty($list['often_area_list'])){
                   foreach ($list['often_area_list'] as $ksy =>$value) {   echo $value['name'] . ' '; }
            }else{
              
                if(empty($list['often_area'])){
                    echo '未填写';
                }else{
                    echo $list['often_area'];
                }
            }
            ?>
             </p>
          </li>
          <li>
            <p>服务区域：</p>
            <p>
            <?php  if(empty($list['service_area_list'])){
                echo '未填写';
            }else{
            foreach ($list['service_area_list'] as $ksy =>$value) {
            echo $value['region_name']. ' ';
               }
               }?>
               </p>
          </li>
          <li>
            <p>个人介绍：</p>
            <p><?php echo $list['introduce']?></p>
          </li>
        </ul>
        <div class="yue-more" isshow="0"><img src="/static/appwebview/yue/detail/images/arrow.png" ></div>
      </div>
     
      <div class="yue-dt-table se">
        <div class="yue-dt-head clearfix">
          <div class="yue-dt-head-l cur">约练项目</div>
          <div class="yue-dt-head-r">约练时间</div>
        </div>
        <div id="yue-dt-1" class="yue-dt-proList">
           <?php if (isset($list['coach_projects']) && !empty($list['coach_projects'])){
               foreach ($list['coach_projects'] as $key =>$value) {
           ?>
          <div class="yue-list">
            <div class="yue-list-title"> 
             <span><?php echo isset($value['project_name']) ? $value['project_name'] : '' ;?></span>
             <?php if(isset($value['role_id']) && $value['role_id']==1){ ?><img src="/static/appwebview/yue/detail/images/jiao.png"><?php }?>
             <?php if(isset($value['role_id']) && $value['role_id']==2){ ?><img src="/static/appwebview/yue/detail/images/pei.png"><?php }?>
             <span><?php echo isset($value['price']) ? (float)$value['price'] : '';?>元</span></div>
            <div class="yue-list-time">时长：<span><?php echo isset($value['minutes']) ? $value['minutes']/60 :'';?>小时</span></div>
          </div>
           <?php }}?>
        </div>
        <div id="yue-dt-2" class="yue-dt-time hide">
          <ul>
         
          <?php foreach ($list['coach_bespeak_time'] as $key =>$value) {?>
           <?php $todate=date('Y-m-d',time());$date=date('Y-m-d',$value['date']);?>
            <li><span><?php if($key==0 && $todate==$date){echo '今天';}else{
                $day=date('w',$value['date']);
                if($day==0){
                    echo '周日';
                }elseif($day==1){
                    echo '周一';
                }elseif($day==2){
                    echo '周二';
                }elseif($day==3){
                    echo '周三';
                }elseif($day==4){
                    echo '周四';
                }elseif($day==5){
                    echo '周五';
                }elseif($day==6){
                    echo '周六';
                }
            }?>
            </span><span data-value=<?php echo $value['morning']?>>上</span><span data-value=<?php echo $value['afternoon']?>>下</span><span data-value=<?php echo $value['night']?>>晚</span></li>
          <?php }?>
          </ul>
            <p><img src="/static/appwebview/yue/detail/images/free.png" class="yue-dt-info-icon-free"><span>可预约</span><img src="/static/appwebview/yue/detail/images/busy.png" class="yue-dt-info-icon-busy"><span>不可预约</span></p>
        </div>
      </div>
      <!-- 评论块（若无评论 则不输出评论块HTML）-->
      <div class="yue-dt-cmt se">
        <h2>评论</h2>
        <ul class="yue-dt-cmt-list">
          <!-- 评论项容器-->
          <?php foreach ($list['comment_credit_list'] as $key => $value){?>
          <li>
            <div class="yue-dt-cmt-info">
              <div class="yue-dt-cmt-avatar">
                <!-- 评论头像--><img src=<?php echo $value['user_avatar']; ?>>
                <!-- 评论头像 end-->
              </div>
              <p> 
                <!-- 昵称--><?php echo $value['user_name']; ?>
                <!-- 昵称 end-->
              </p>
              <p>
                <!-- 评论时间--><?php echo date('Y-m-d H:i:s',$value['add_time']); ?>
                <!-- 评论时间 end-->
              </p>
              <div data-value=<?php echo $value['rank']; ?> class="yue-dt-cmt-score">
                <!-- 评分值（请写入data-value中）-->
              </div>
            </div>
            <div class="yue-dt-cmt-cnt">
              <p> 
                <!-- 评论正文--><?php echo $value['content']; ?>
                <!-- 评论正文 end-->
              </p>
              <ul class="yue-dt-cmt-imglist j-silder-imglist">
                <!-- 评论插图-->
                <?php foreach ($value['image_list'] as $key => $value){?>
                <li><img style="display:block;" data-origin=<?php echo $value['image_url']; ?> src=<?php echo $value['thumb_url']; ?>></li>
                <?php }?>
                <!-- 评论插图 end-->
              </ul>
            </div>
          </li>
          <?php }?>
          <!-- 评论项容器 end-->
        </ul>
      </div>
      <!-- 评论块 end-->
      <div class="yue-down" style="position:fixed;bottom: 0;max-width:640px;width: 100%;">
        <a target="_blank" href="http://www.quyundong.com/d"><img src="/static/images/fxdownload.png" style="display:block;" width="100%"></a>
      </div>
    </div>
    <div class="yue-pop-sprite hide">
      <div class="yue-pop-box"><img src="/static/appwebview/yue/detail/images/close.png" class="yue-pop-close">
        <div class="yue-pop-title"><span>相关认证</span></div>
        <ul class="yue-check-list">
        <?php if (isset($list['level_desc']) && !empty($list['level_desc'])){$Arr=explode('，',$list['level_desc']); foreach ($Arr as $key =>$value) { ?>
          <li><?php echo $value;?></li>
           <?php }}?>
        </ul>
      </div>
    </div>

    <script src="/static/js/jquery-1.12.0.min.js"></script>

    <script src="/static/js/mobileResponsive.js"></script>
    <script src="/static/appwebview/yue/detail/js/slider.js?v=20150909c"></script>
    <script src="/static/appwebview/yue/detail/js/detail.js?v=20151021d"></script>
    <script>
      $(document).ready(function(){
        var loadInterval = setInterval(function() {
          if($(".loading").attr("data-lock") == 1){
             $(".loading").addClass("hide");
             $(".yue-dt-main").removeClass("hide");
             clearInterval(loadInterval);
          }
        },500);
        $(".yue-dt-info-icon-rz").click(function(){
          $(".yue-pop-sprite").removeClass("hide");
          $(".yue-pop-box").css("marginTop",-$(".yue-pop-box").height()/2);
          $("body").css("overflow-y","hidden");
        })
  
        $(".yue-pop-close").click(function(){
          $(".yue-pop-sprite").addClass("hide");
          $("body").css("overflow-y","auto");
        })
        $(".yue-more").on("click",function(){
            var isshow = $(this).attr("isshow");
            if(isshow == '0'){
              $(this).find("img").get(0).className = "yue-arrow-rotate1";
              $(this).attr("isshow",'1');
              $(".yue-dt-items li p:nth-child(2)").css({"overflow-y":"auto","height":"auto","white-space":"normal"});
            }
            else{
              $(this).find("img").get(0).className = "yue-arrow-rotate2";
              $(".yue-dt-items li p:nth-child(2)").css({"overflow-y":"hidden","height":"0.2rem","white-space":"nowrap"});
              $(this).attr("isshow",'0');
            } 
        })
        $(".yue-dt-head").on("click","div",function(e){
          var ind = $(e.target).index() + 1;
          $(".yue-dt-head div").removeClass("cur");
          $(this).addClass("cur");
          $("[id^=yue-dt]").addClass("hide");
          $("#yue-dt-"+ind).removeClass("hide");
        })
      });
    </script>
  </body>
