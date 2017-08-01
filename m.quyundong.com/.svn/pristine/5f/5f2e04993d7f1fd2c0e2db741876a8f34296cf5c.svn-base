<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta content="telephone=no" name="format-detection">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no,minimal-ui">
    <title>初试约练</title>
    <link rel="stylesheet" href="/static/appwebview/yue/intro/stylesheets/intro.css">
    <link rel="stylesheet" href="/static/appwebview/yue/list/stylesheets/list.css">
    <style type="text/css">
      span,p{
        -webkit-tap-highlight-color:rgba(0,0,0,0); 
      }
      .yue-fy-top{
       border: none;
       position:relative;
      }
      .yue-fy-top:after{
        background-color: #e1e1e1;
        bottom:0;
        display: block;
        content: "";
        position: absolute;
        width: 100%;
        height: 1px;
        left:0;
        -webkit-transform:scaleY(0.5);
      }
      .yue-fy-info i{
        border:none;
        position:relative;
      }
      .yue-fy-info i::after{
        content:"";
        position:absolute;
        display:inline-block;
        height:8px;
        width:8px;
        border-left:1px solid #939393;
        border-bottom:1px solid #939393;
        top:50%;
        left:50%;
        margin-top:-2px;
        -webkit-transform:rotate(135deg);
        -webkit-transform-origin:32.2% 61.8%;
      }
      .yue-fy-info i.cur::after {
        -webkit-transform:rotate(315deg);
      }
    </style>
  </head>
  <body>
    <div class="hide"><img src="/static/appwebview/yue/list/images/quyoug.png"/></div>
    <section id="loading" data-lock="0" class="loading">
      <div class="loading-icon"></div>
    </section>
    <section class="yue-fy-main hide" data-code="<?php if(isset($list['is_confirm'])){echo $list['is_confirm'];}?>">
      <div class="yue-fy-top" style="line-height: 1.3;padding-left: 0.1rem;padding-right: 0.1rem;-webkit-box-sizing: border-box;font-size: 0.12rem;"><?php if (isset($list['content'])){echo $list['content'];}else{echo '';}?></div>
      
      <div class="yue-fy-quyou" data-friends-count="<?php echo $list['friends_count'];?>">
        <div class="yue-fy-quyou-inner"></div>
        <div class="yue-fy-quyou-talkbox <?php if($list['friends_count']){ echo "cur".$list['friends_count'];} ?>"><span>还没结识好友！</span><i> </i></div>
      </div>
      <div class="yue-fy-bar" style="height: 6px;">
        <div class="yue-fy-bar-inner"> </div>
      </div>
      <p class="yue-fy-info" style="padding-top:0.3rem;"><i> </i><span data-show="0">活动详情</span></p>
      <section class="yue-fy-information" style="-webkit-transition: all 0s ease-out;">
        <div class="yue-ii-card">
          <h2 class="yue-ii-card-title">活动城市</h2>
          <p class="yue-ii-card-p">趣运动约练已开通的城市，目前有：广州</p>
        </div>
        <div class="yue-ii-card">
          <h2 class="yue-ii-card-title">活动时间</h2>
          <p class="yue-ii-card-p">持续时间自陪练审核通过后的30天内有效，9月1日前审核通过的陪练以9月1日为起始时间。</p>
        </div>
        <div class="yue-ii-card">
          <h2 class="yue-ii-card-title">规则说明</h2>
          <ul class="yue-ii-card-ul">
            <li class="yue-ii-card-li">陪练在规定的时间达到相应的趣友数量后会获得奖励。</li>
            <li class="yue-ii-card-li">活动中的每条订单结算后需完成互评。</li>
            <li class="yue-ii-card-li">奖励将以余额的形式发放至【我的钱包】中。</li>
            <li class="yue-ii-card-li">奖励的发放需要经过工作人员审核，审核通过后方可发放奖励；刷单、被投诉、评价过低等行为将会导致审核不通过，奖励活动也会终止。</li>
            <li class="yue-ii-card-li">通过认证的陪练，与1位好友完成订单后奖励<?php echo $list['money_data']['first_money'];?>元；与5位好友完成订单后再奖励<?php echo $list['money_data']['second_money'];?>元；
            与10位好友完成订单后再奖励<?php echo $list['money_data']['third_money'];?>元，共<?php echo ($list['money_data']['first_money']+$list['money_data']['second_money']+$list['money_data']['third_money']);?>元奖励。</li>
            <li class="yue-ii-card-li">本活动的最终解释权归趣运动所有。</li>
          </ul>
        </div>
      </section>
    </section>
    <script src="/static/js/zeptoWithFx.min.js"></script>
    <script src="/static/js/mobileResponsive.js"></script>
    <script src="/static/appwebview/yue/list/js/list.js"></script>
    <script>
      window.onload = function(){
        
        var loadInterval = setInterval(function() {
          if($(".loading").attr("data-lock") == 0){
             $(".loading").addClass("hide");
             $(".yue-fy-main").removeClass("hide");
             clearInterval(loadInterval);
             setTimeout(function(){
                $(".yue-fy-quyou-inner").addClass("cur"+$(".yue-fy-quyou").attr("data-friends-count"));
                $(".yue-fy-bar-inner").addClass("cur"+$(".yue-fy-quyou").attr("data-friends-count"));
              },1000);
          }
        },500);

        if($(".yue-fy-main").attr("data-code") == 3){
          $(".yue-fy-quyou").addClass("hide");
          $(".yue-fy-bar").addClass("hide");
        }

        $(".yue-fy-info span").click(function(){
          if($(this).attr("data-show") == "0"){
            $(".yue-fy-information").css({"height":"5rem","padding":"0.1rem"});
            $(".yue-fy-info i").addClass("cur");
            $(this).attr("data-show","1");
          }else if($(this).attr("data-show") == "1"){
            $(".yue-fy-information").css({"height":"0","padding":"0"});
            $(".yue-fy-info i").removeClass("cur");
            $(this).attr("data-show","0");
          }
        });

        $(".yue-fy-quyou-talkbox span").html(talkBoxText($(".yue-fy-quyou").attr("data-friends-count")));

        function talkBoxText(num){
          first="可获"+<?php echo $list['money_data']['first_money'];?>+"元奖励";
          second="可获"+<?php echo $list['money_data']['second_money'];?>+"元奖励";
          third="可获"+<?php echo $list['money_data']['third_money'];?>+"元奖励";
          var str = ["还没结识好友！",first,"已经结识2位好友","已经结识3位好友","已经结识4位好友",second,"已经结识6位好友","已经结识7位好友","已经结识8位好友","已经结识9位好友",third,"？"];

          if(num >= 0 && num <= 10){
            return str[num];
          }else{
            return str[11];
          }
        }
      }
    </script>
  </body>
</html>