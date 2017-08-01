<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta content="telephone=no" name="format-detection">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no,minimal-ui">
    <title>我的等级</title>
    <link rel="stylesheet" href="/static/appwebview/mylevel/stylesheets/mylevel.css">
  </head>
  <body data-design-width="750" data-score="100" data-level="2">
    <script>
      //- document.body.setAttribute("data-level",new Date%4);
      document.body.setAttribute("data-score",new Date%2400);
    </script>
    <section id="loading" data-lock="0" class="loading">
      <div class="loading-icon"></div>
    </section>
    <section class="mylevel-main hide">
      <div class="level-info"><a href="/appwebview/userGradeintro">等级说明&nbsp;<img data-src="/static/appwebview/mylevel/images/icon_question_@3x.png"></a></div>
      <div id="medal"></div>
      <script type="template" id="medalNovice">
        <div data-src="url(/static/appwebview/mylevel/images/medal_novice_bg_@3x.png)" class="medal-novice-bg use-background">
          <div data-src="url(/static/appwebview/mylevel/images/medal_novice_body_@3x.png)" class="medal-novice-body use-background">
            <div data-src="url(/static/appwebview/mylevel/images/medal_novice_wing_left_@3x.png)" class="medal-novice-wing-left use-background"></div>
            <div data-src="url(/static/appwebview/mylevel/images/medal_novice_wing_right_@3x.png)" class="medal-novice-wing-right use-background"></div>
          </div>
        </div>
      </script>
      <script type="template" id="medalExpert">
        <div data-src="url(/static/appwebview/mylevel/images/medal_expert_bg_@3x.png)" class="medal-expert-bg use-background">
          <div data-src="url(/static/appwebview/mylevel/images/medal_expert_hand_left_@3x.png)" class="medal-expert-hand-left use-background"></div>
          <div data-src="url(/static/appwebview/mylevel/images/medal_expert_hand_right_@3x.png)" class="medal-expert-hand-right use-background"></div>
        </div>
      </script>
      <script type="template" id="medalMaster">
        <div style="background-color:#48b49c;" class="medal-master-bg">
          <div data-src="url(/static/appwebview/mylevel/images/medal_master_cloud_@3x.png)" class="medal-master-cloud use-background"></div>
          <div data-src="url(/static/appwebview/mylevel/images/medal_master_bg_@3x.png)" class="medal-master-bg-circle use-background"></div>
          <div data-src="url(/static/appwebview/mylevel/images/medal_master_body_@3x.png)" class="medal-master-body use-background"></div>
          <div data-src="url(/static/appwebview/mylevel/images/medal_master_cape_@3x.png)" class="medal-master-cape use-background"></div>
        </div>
      </script>
      <script type="template" id="medalStar">
        <div data-src="url(/static/appwebview/mylevel/images/medal_star_bg_@3x.png)" class="medal-star-bg use-background">
          <div data-src="url(/static/appwebview/mylevel/images/medal_star_head_@3x.png)" class="medal-star-head use-background"></div>
          <div data-src="url(/static/appwebview/mylevel/images/medal_star_body_@3x.png)" class="medal-star-body use-background"></div>
        </div>
      </script>
      <div class="level-bar">
        <div class="level-bar-inner"></div>
        <div class="level-bar-text"><span class="cur">菜鸟</span><span>达人</span><span>健将</span><span>明星</span></div>
        <div class="level-bar-num"><span class="myscore">0</span><span class="fixedscore">/2400</span></div>
      </div>
      <div class="line"><span>继续保持运动xx个月将解锁新特权</span></div>
      <div class="power">
        <div class="icon fun"><img data-src="/static/appwebview/mylevel/images/icon_fun_@3x.png"></div>
        <div class="icon ticket"><img data-src="/static/appwebview/mylevel/images/icon_ticket_grey_@3x.png"></div>
        <div class="icon tui"><img data-src="/static/appwebview/mylevel/images/icon_tui_grey_@3x.png"></div>
        <div class="icon wait"><img data-src="/static/appwebview/mylevel/images/icon_wait_grey_@3x.png"></div>
      </div>
      <div class="line"><span>近期运动记录</span></div>
      <p class="empty hide">记录空空如也~</p>
      <ul id="historyUl">
        <li><span class="date">2015/10/12</span><span class="desc">玩泡泡卡丁车992小时</span><span class="msg">+999999成长</span></li>
        <li><span class="date">2015/10/12</span><span class="desc">玩泡泡卡丁车992小时</span><span class="msg">+999999成长</span></li>
        <li><span class="date">2015/10/12</span><span class="desc">玩泡泡卡丁车992小时</span><span class="msg cur">-999999成长</span></li>
      </ul>
      <p class="more"><a href="/appwebview/sportrecord">更多记录&gt;</a></p>
    </section>
    <section class="cover hide">
      <div class="fun-info info-box info-box-start hide">
        <div class="info-close"><img data-src="/static/appwebview/mylevel/images/icon_close_green_@3x.png"></div>
        <div class="info-icon"><img data-src="/static/appwebview/mylevel/images/icon_info_fun_@3x.png"></div>
        <p class="info-title color-green">积分光环</p>
        <p>您获得的积分将在原来基础上x<span id="levelEff">1.5</span></p>
        <p class="info-title color-green">获得门槛</p>
        <p><span class="info-inline">菜鸟级别</span><span class="info-inline">1.0倍</span></p>
        <p><span class="info-inline">达人级别</span><span class="info-inline">1.2倍</span></p>
        <p><span class="info-inline">健将级别</span><span class="info-inline">1.5倍</span></p>
        <p><span class="info-inline">明星级别</span><span class="info-inline">2.0倍</span></p>
      </div>
      <div class="ticket-info info-box info-box-start hide">
        <div class="info-close"><img data-src="/static/appwebview/mylevel/images/icon_close_orangered_@3x.png"></div>
        <div class="info-icon"><img data-src="/static/appwebview/mylevel/images/icon_info_ticket_@3x.png"></div>
        <p class="info-title color-orangered">每月一券</p>
        <p>每月月初可以获得一张15元代金劵</p>
        <p class="info-title color-orangered">获得门槛</p>
        <p>成长到达人级别</p>
      </div>
      <div class="tui-info info-box info-box-start hide">
        <div class="info-close"><img data-src="/static/appwebview/mylevel/images/icon_close_orangered_@3x.png"></div>
        <div class="info-icon"><img data-src="/static/appwebview/mylevel/images/icon_info_tui_@3x.png"></div>
        <p class="info-title color-orangered">随意退</p>
        <p>退款不受次数限制（限于可退款的场馆）</p>
        <p class="info-title color-orangered">获得门槛</p>
        <p>成长到健将级别</p>
      </div>
    </section>
    <script src="/static/js/zeptoWithFx.min.js"></script>
    <script src="/static/js/mobileResponsive.js"></script>
    <script src="/static/appwebview/mylevel/js/mylevel.js"></script>
  </body>
</html>