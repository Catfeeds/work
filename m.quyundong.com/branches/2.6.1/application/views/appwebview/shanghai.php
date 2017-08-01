<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no,minimal-ui" />
  <title>上海8元订场</title>
  <link rel="stylesheet" type="text/css" href="/static/onesh/web/style/nm.base.css">
  <link rel="stylesheet" type="text/css" href="/static/onesh/web/style/onesh.base.css?ver=1.02">
  <script type="text/javascript" src="/static/js/jweixin-1.0.0.js"></script>
  <style type="text/css">
    .btn{
      margin: 0.1rem auto;
    }
  </style>
</head>
<body>
  <section id="loading" class="loading" data-lock="0">
    <div class="loading-icon"></div>
    <input id="_title" style="display:none;" type="text" value="8元包场打羽毛球" />
    <input id="_desc" style="display:none;" type="text" value="快邀请小伙伴一起来抢吧！" />
    <input id="_imgUrl" style="display:none;" type="text" value="/static/act/discount/images/share.jpg" />
    <script type="text/javascript" src="/static/js/weixinshare.js"></script>
  </section>
  <section class="main hide">
    <div class="banner"><img src="/static/act/discount/images/banner8yuan.jpg"></div>
    <div class="list"><img src="/static/act/discount/images/list8yuan.png"></div>
    <h3><span class="circle">1</span>选择球馆</h3>
    <div class="choose" style="position: relative;background-image: url(/static/act/discount/images/choosebiglarge.jpg);height: 4.8rem;">
      <a class="btn" data-href="17872" href="http://m.quyundong.com/court/detail?id=17872&cid=1">KT sports</a>
      <a class="btn" data-href="17686" href="http://m.quyundong.com/court/detail?id=17686&cid=1">星空羽毛球馆</a>
      <a class="btn" data-href="17690" href="http://m.quyundong.com/court/detail?id=17690&cid=1">球王羽毛球馆</a>
      <a class="btn" data-href="17766" href="http://m.quyundong.com/court/detail?id=17670&cid=1">鸿飞运动城羽毛球馆</a>
      <a class="btn" data-href="17668" href="http://m.quyundong.com/court/detail?id=17668&cid=1">俪廷羽毛球馆</a>
      <a class="btn" data-href="9017" href="http://m.quyundong.com/court/detail?id=9017&cid=1">辽阳中学羽毛球馆</a>
      <a class="btn" data-href="17873" href="http://m.quyundong.com/court/detail?id=17873&cid=1">骋风羽毛球活动中心</a>
      <a class="btn" data-href="8727" href="http://m.quyundong.com/court/detail?id=8727&cid=1">精羽羽毛球馆（顾村馆）</a>
      <a class="btn" data-href="17860" href="http://m.quyundong.com/court/detail?id=17860&cid=1">千羽千寻羽毛球馆</a>
      <div style="width:0.3rem;height:0.33rem;position:absolute;top:0.4rem;left:2.4rem;"><img src="/static/act/one_beijing/images/touch.png" style="width:100%;"></div>
    </div>
    <h3><span class="circle">2</span>选择日期</h3>
    <div class="iphone iphone1"><img src="/static/act/discount/images/iphone18yuan.png"></div>
    <p class="tips">以名狮羽毛球馆为例</p>
    <h3><span class="circle">3</span>选择场次</h3>
    <div class="iphone iphone2"><img src="/static/act/discount/images/iphone28yuan.png"></div>
    <h3><span class="circle">4</span>8元订场</h3>
    <div class="iphone iphone3"><img src="/static/act/discount/images/iphone38yuan.png"></div>
    <a href="http://www.quyundong.com/d" class="btnDownload">下载APP体验</a>
    <div class="note">
      <ul>
        <li>1. 新老用户均可参与</li>
        <li>2. 每个用户仅限使用一个名额</li>
        <li>3. 不可与其他优惠同享</li>
        <li>4. 活动时间：即日起至8月30日</li>
        <li>5. 适用于趣运动（上海）任何页面内下单并指定的9个球馆：KT sports、星空羽毛球馆、球王羽毛球馆、鸿飞运动城羽毛球馆、俪廷羽毛球馆、辽阳中学羽毛球馆、骋风羽毛球活动中心、精羽羽毛球馆（顾村馆）、千羽千寻羽毛球馆</li>
      </ul>
    </div>
  </section>
  <script type="text/javascript" src="/static/js/zeptoWithFx.min.js"></script>
  <script type="text/javascript" src="/static/js/mobileResponsive.js"></script>
  <script type="text/javascript">
    window.onload = function(){
      var myURL = window.location.href.split('#')[0];
      var loadingTimer = setInterval(function(){
        if($("#loading").attr("data-lock") == 1){
          $("#loading").addClass("hide");
          $(".main").removeClass("hide");
          clearInterval(loadingTimer);
        }
      },500);

      if(isApp(myURL)){
        btnChange("gosportapp");
        $(".btnDownload").addClass("hide");
      }else{
        btnChange();
      }

      //app判别
      function isApp (url){
        if(url.indexOf("gosportapp") === -1 ){
          return false;
        }else{return true}
      }

       function btnChange(str){
        console.log("change");
        if(str == "gosportapp"){
          var head = "gosport://business_detail?business_id=";
          var foot = "&category_id=1";
        }else{
          var head = "http://m.quyundong.com/court/detail?id=";
          var foot = "&cid=1";
        }
        var $hrefs = $(".choose .btn");
        $hrefs.each(function(){
          $(this).attr("href",head + $(this).attr("data-href") + foot);
        });
      }
    }
  </script>
</body>
</html>