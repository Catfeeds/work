<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta content="telephone=no" name="format-detection">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no,minimal-ui">
    <title>球局详情</title>
    <link rel="stylesheet" href="/static/appwebview/courtjoin/stylesheets/courtjoin.css?ver=20161011">
    <style>
        .court-comment-answer-msg,.court-comment-user-msg{
            word-break: break-all;
        }
    </style>
    <script type="text/javascript">
        var launch_user_id = '<?php echo $list['court_join_info']['launch_user_id']; ?>';
    </script>
</head>

<body data-design-width="750">
    <div id="loading" data-lock="1" class="loading">
        <div class="loading-icon"></div>
        <div id="wxtitle" class="hide"><?php echo !empty($list['court_join_share_info']['title']) ? $list['court_join_share_info']['title'] : '';?></div>
        <div id="wximgUrl" class="hide"><?php echo !empty($list['court_join_share_info']['logo']) ? $list['court_join_share_info']['logo'] : '';?></div>
        <div id="wxdesc" class="hide"><?php echo !empty($list['court_join_share_info']['content']) ? $list['court_join_share_info']['content'] : '';?></div>
        <script src="/static/js/jweixin-1.0.0.js"></script><script type="text/javascript" src="/static/js/jgosport-1.0.js?ver=201611180"></script>
        <script src="/static/js/weixinshareurl.js"></script>
    </div>
    <div class="main hide" id='main'>
        <p style="text-align:right;margin:0.2rem 0.2rem 0.1rem;" class="court-title"> <a href="<?php echo isset($list['court_join_rule_url']) ? baf_CHtml::createUrl($list['court_join_rule_url']) : ''?>">什么是球局？</a></p>
        <div class="court-user">
            <div class="court-user-l">
                <div style="background-image:url(<?php echo !empty($courtJoinInfo['launch_avatar']) ? $courtJoinInfo['launch_avatar'] : 'http://api.7yundong.cn/uploads/avatar/avatar.png';?>);" class="court-user-avator"></div>
            </div>
            <div class="court-user-r">
                <div class="court-user-name"><span><?php echo !empty($courtJoinInfo['launch_nick_name']) ? $courtJoinInfo['launch_nick_name'] : '';?></span> <img class="court-user-sex" src="/static/appwebview/courtjoin/images/<?php echo $courtJoinInfo['gender']=='m' ? 'man.png' : 'women.png';?>" , alt="" />  <em id="court-sengMsg" class="court-user-msg">发私信</em></div>
                <div class="court-user-des"><?php echo !empty($courtJoinInfo['court_join_description']) ? $courtJoinInfo['court_join_description'] : '';?></div>
            </div>
        </div>
        <p class="court-title">场地详情</p>
        <div class="court-detail">
            <ul class="common-menu">
                <li>
                    <div>费用:</div>
                    <div><?php echo !empty($courtJoinInfo['price']) ? (int)$courtJoinInfo['price'] : '';?>元</div>
                </li>
                <li>
                    <div>日期:</div>
                    <div><?php echo !empty($courtJoinInfo['book_date']) ? date('Y年m月d日',$courtJoinInfo['book_date']).'('.api_CoreHelper::getDateTips($courtJoinInfo['book_date']).')' : '';?></div>
                </li>
                <li>
                    <div>时间:</div>
                    <div>
                    <?php
                    foreach ($courtJoinInfo['court_join_goods_list'] as $key=>$row){
                        ?>
                        <p><?php echo $row['court_name']; ?> <span style="margin-left:0.1rem;"><?php echo date('H:s',$row['start_time']); ?> - <?php echo date('H:s',$row['end_time']); ?></span></p>
                    <?php };?>
                    </div>
                </li>
                <li>
                    <div>项目:</div>
                    <div><?php echo $venuesInfo['cat_name']; ?></div>
                </li>
                <li>
                    <div>场馆:</div>
                    <div> <a href="<?= baf_CHtml::createUrl('/court/detail?id='.$list['venues_info']['venues_id'].'&cid='.$list['venues_info']['cat_id']);?>"><?php echo $list['venues_info']['venues_name'];?> <img src="/static/appwebview/courtjoin/images/arrow.png"></a></div>
                </li>
                <li><a href="<?= baf_CHtml::createUrl('/court/map?id='.$list['venues_info']['venues_id'].'&cid='.$list['venues_info']['cat_id'].'&is_park=0');?>"><?php echo $list['venues_info']['venues_address'];?> <img src="/static/appwebview/courtjoin/images/arrow.png"></a></li>
            </ul>
        </div>
        <p class="court-title">
        <?php
        echo !empty($courtJoinInfo['already_join_num']) ? '已加入'.$courtJoinInfo['already_join_num'].'人' : '暂时无人加入';
        ?>        
        <!--
        <em>还可加入< ?php echo !empty($courtJoinInfo['left_join_num']) ? $courtJoinInfo['left_join_num'] : 0;?>人</em>
        -->
        <em><?php if(isset($courtJoinInfo['left_join_num_msg'])){echo $courtJoinInfo['left_join_num_msg'];}?></em>
        </p>
        <div class="court-list">
            <div class="court-arrow-l"><img src="/static/appwebview/courtjoin/images/arrow.png"></div>
            <div class="court-arrow-r"><img src="/static/appwebview/courtjoin/images/arrow.png"></div>
            <ul>
                <?php foreach ($courtJoinInfo['participant_info'] as $key=>$row) { ?>
                <li>
                    <a href="javascript:void(0)">
                        <div style="background-image:url(<?php echo $row['avatar'];?>);"> </div>
                        <div><?php echo $row['nick_name'];?></div>
                    </a>
                </li>
                <?php }?>  
            </ul>
        </div>
        <!-- 评论 -->
        <div class="court-comment">
          <div class="court-head">留言板<span><i><img src="/static/appwebview/courtjoin/images/icon-write.png"></i>发表留言</span></div>
          <div class="court-body">
            <ul id='srList'>
                <li id='alMore'></li>
            </ul>
            </div>
        </div>
        <!-- 评论end -->
        <div class="court-footer" style="text-align:center;">
            
<?php
//是否可以加入
$is_join_click = 0;
if ( isset($courtJoinInfo['court_join_available']) && $courtJoinInfo['court_join_available']=='1' ) {
    $is_join_click = 1;
}
//按钮文字
$join_title = !empty($courtJoinInfo['court_join_disable_msg']) ? $courtJoinInfo['court_join_disable_msg'] : '立即加入';

//不是手机访问的，alert提示
$handler = new ext_MobileDetect();
if(!$handler->isMobile() ){//非手机
?>
    <a href="javascript:void(0);">
    <div class="court-join<?php  if ($is_join_click == 0) {echo ' disable';}?>" id="wapweb-sengMsg" ><?php echo $join_title;?></div>
    </a>
<?php
}
else {
    $redirectUrl = isset($courtJoinInfo['is_restric_gender']) && $courtJoinInfo['is_restric_gender'] == 1 ? baf_CHtml::createUrl('/user/info?src='.urlencode('/courtJoin/detail?id='.$courtJoinInfo['cj_order_id'])) : baf_CHtml::createUrl('/order/confirmCourtJoin?id='.$courtJoinInfo['cj_order_id']);
?>
    <a href="<?php if ($is_join_click == 1) {echo $redirectUrl;}else{echo 'javascript:void(0);';} ?>">
        <div class="court-join<?php  if ($is_join_click == 0) {echo ' disable';}?>" id="go-court-join" ><?php echo $join_title;?></div>
    </a>
<?php
}
?>

            
        </div>
        <!-- <div class="nm-cover hide">
            <div class="nm-alert">
                <div class="msg">下载趣运动APP,体验更多好玩的功能！</div>
                <div class="opeator">
                    <div class="sure"> <a href="http://www.quyundong.com/d">立即下载</a></div>
                    <div class="cancel">取消</div>
                </div>
            </div>
        </div> -->

        <div class="nm-wapweb hide"  style="
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.5);
">
            <div class="nm-alert" style="
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2.4rem;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    background-color: #fff;
    color: #222;
    font-size: 0.15rem;
    border-radius: 0.03rem;
    padding: 0.2rem;
">
                <div class="msg">请在手机上打开，再继续完成操作！</div>
                <div class="opeator">
                    <div class="sure"></div>
                    <div class="cancel" style="
    padding: 0.1rem 0;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    cursor:pointer;
">取消</div>
                </div>
            </div>
        </div>
    </div>
    <script src="/static/js/zeptoWithFx.min.js"></script>
    <script src="/static/js/mobileResponsive.js"></script>
    <script src="/static/appwebview/courtjoin/js/courtjoin.js?ver=20161111"></script>
    <script src="/static/appwebview/courtjoin/js/showWait.js"></script>
    <script>
      var okCallback = function(cb){
        window.location.href = '<?= baf_CHtml::createUrl('http://www.quyundong.com/d');?>'
        if(typeof cb == 'function') cb()
      }
      var cancelCallback = function(cb){
        if(typeof cb == 'function') cb()
      }
      
      var showWait = new ShowWait(okCallback,cancelCallback,{title:'<br/>下载趣运动，体验更多好玩的功能<br/><br/>',rightBtnText:'立即下载'})
      
      $('.court-comment-user-talk').click(function(){
        showWait.showCover()
      })
      
      $('.court-head span').click(function(){
        showWait.showCover()
      })

      $('#court-sengMsg').click(function  (argument) {
          showWait.showCover()
      })
    </script>
</body>
</html>
