<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta content="telephone=no" name="format-detection">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no,minimal-ui">
    <title>跟我一起约练</title>
    <link rel="stylesheet" href="/static/appwebview/yue/invite/stylesheets/invite.css">
    <script src="/static/js/jweixin-1.0.0.js"></script><script type="text/javascript" src="/static/js/jgosport-1.0.js?ver=201611180"></script>
    <style type="text/css">
      input{
        -webkit-box-sizing:border-box;
      }
      #icon-down{
        display:block;
        font-size: 0;
        width:0.3rem;
        height:0.3rem;
        position: fixed;
        bottom:0.2rem;
        left: 50%;
        z-index: 999;
        -webkit-transform: translateX(-50%);
        -webkit-animation: opacity 1s linear 0s infinite alternate;
      }
      #icon-down img{
        width: 100%;
      }
      .yue-c5-page8-in .btn.btnJohn.cur{
        color:#939393;
        background-color: #cdcdcd;
        -webkit-box-shadow:0 0 0 2px #c5c5c5, 0 0 0 4px #acacac, 0 0 0 6px #939393;
      }
      @-webkit-keyframes opacity {
        from {
          opacity: 1;
        }
        to {
          opacity: 0.5;
        }
      }
    </style>
  </head>
  <body> <i id="icon-down" style="display:block;width:0.3rem;height:0.3rem;position: fixed;bottom:0.2rem;left: 50%;z-index: 999;-webkit-transform: translateX(-50%);"><img src="/static/appwebview/yue/invite/images/icon_down.png"/></i>
    <section id="loading" data-lock="0" class="loading">
      <div class="loading-icon"></div>
      <div id="wxtitle" class="hide">加入趣运动约练，运动能赚钱</div>
      <div id="wxdesc" class="hide">我现在是趣运动的专业陪练啦，和好友一起运动就能赚钱，感觉真好，推荐你来试试。</div>
      <div id="wximgUrl" class="hide">/static/appwebview/yue/invite/images/share.min.jpg</div>
    </section>
    <script src="/static/js/weixinshareurl.js"></script>
    <section class="yue-c5-main hide">
      <div class="yue-c5-page yue-c5-page1">
        <div class="yue-c5-logo"><img src="/static/appwebview/yue/invite/images/logo.png" /> </div>
        <div class="yue-c5-title"><img src="/static/appwebview/yue/invite/images/title.png" /> </div>
      </div>
      <div class="yue-c5-page yue-c5-page2"><img src="/static/appwebview/yue/invite/images/coach5main.jpg" /> </div>
      <div class="yue-c5-page yue-c5-page3"><img src="/static/appwebview/yue/invite/images/coach5avatar.jpg" /> <img src="/static/appwebview/yue/invite/images/coach5cash.jpg" /> </div>
      <div class="yue-c5-page yue-c5-page4">
        <div class="yue-c5-page4-in">
          <div class="playmate"><img src="/static/appwebview/yue/invite/images/playmate1.png" /></div>
          <div class="note">
            <h2>Shirley</h2>
            <h3>24岁/国企职员</h3><br>
            <p><span class="orange">学员人数：</span>36人</p>
            <p><span class="orange">陪练时长：</span>62小时</p>
            <p><span class="orange">总计收入：</span>5860元</p>
          </div>
        </div>
      </div>
      <div class="yue-c5-page yue-c5-page5">
        <div class="yue-c5-page5-in">
          <div class="playmate"><img src="/static/appwebview/yue/invite/images/playmate2.png" /></div>
          <div class="note">
            <h2>朵拉/Dora</h2>
            <h3>23岁/设计师</h3><br>
            <p><span class="orange">学员人数：</span>30人</p>
            <p><span class="orange">陪练时长：</span>62小时</p>
            <p><span class="orange">总计收入：</span>5280元</p>
          </div>
        </div>
      </div>
      <div class="yue-c5-page yue-c5-page6">
        <div class="yue-c5-page6-in">
          <div class="playmate"><img src="/static/appwebview/yue/invite/images/playmate3.png" /></div>
          <div class="note">
            <h2>小樱/Cherry</h2>
            <h3>20岁/在校学生</h3><br>
            <p><span class="orange">学员人数：</span>22人</p>
            <p><span class="orange">陪练时长：</span>52小时</p>
            <p><span class="orange">总计收入：</span>4620元</p>
          </div>
        </div>
      </div>
      <div class="yue-c5-page yue-c5-page7">
        <div class="iphone"><img src="/static/appwebview/yue/invite/images/iphone.png" />
          <p>活动项目应有尽有!</p><a class="btn Join">马上加入约练</a>
        </div>
      </div>
    </section>
    <div class="yue-c5-page-fixed hide"> 
        <div class="yue-c5-page8-in">
           
          <input id="phoneNumber" type="text" placeholder="请输入手机号码" />
          <h3 class="tip" style="height:auto;min-height:0.05rem;"></h3>
          <p style="height: 0.4rem;"><input id="checkCode" type="text" placeholder="请输入验证码" /><a class="btn checkCode" style="right:6px;">获取验证码</a></p>
          <h3 class="tip2" style="height:auto;min-height:0.1rem;"></h3><a class="btn btnJohn cur" style="width:2.9rem;">加入约练</a>
          <div class="download">
            <div class="download-l"><img src="/static/appwebview/yue/invite/images/coach.png" /></div>
            <div class="download-r"> 
              <h3>猛戳下方按钮下载</h3><a href="http://www.quyundong.com/d/coach" style="height:0.4rem;line-height:0.4rem;">趣运动教练版</a>
            </div>
          </div>
        </div>
      </div>
    <section class="yue-alert hide">
      <div class="info"><span>请稍候！</span><div class="close hide">关闭</div></div>
    </section>
    <section class="yue-share hide">
      <div class="shareweixin"><img src="/static/appwebview/yue/invite/images/share.png" /></div>
    </section>
    <script type="text/javascript" src="/themes/qu/js/common.js?v=1.9.1"></script>
    <script src="/static/js/zeptoWithFx.min.js"></script>
    <script src="/static/js/mobileResponsive.js"></script>
    <script src="/static/appwebview/yue/invite/js/invite.js?ver=1.01"></script>
    <script src="/static/appwebview/yue/invite/js/invitetouch.js?ver=1.01"></script>
    <script>
      window.onload = function(){
        
        var loadInterval = setInterval(function() {
          if($(".loading").attr("data-lock") == 1){
             $(".loading").addClass("hide");
             $(".yue-c5-main").removeClass("hide");
             clearInterval(loadInterval);
          }
        },500);
      }
    </script>
  </body>
</html>