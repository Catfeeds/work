<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no,minimal-ui" />
  <title>北京8元订场</title>
  <link rel="stylesheet" type="text/css" href="/static/act/one_beijing/style/nm.base.css?ver=1.01">
  <link rel="stylesheet" type="text/css" href="/static/act/one_beijing/style/onesh.base.css?ver=1.01">
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
    <div class="choose" style="position: relative;background-image: url(/static/act/discount/images/choosebig.jpg);height: 3.88rem;">
      <a class="btn" data-href="17605" href="http://m.quyundong.com/court/detail?id=17605&cid=1">彩虹羽毛球俱乐部</a>
      <a class="btn" data-href="17429" href="http://m.quyundong.com/court/detail?id=17429&cid=1">空的无限羽毛球馆</a>
      <a class="btn" data-href="17438" href="http://m.quyundong.com/court/detail?id=17438&cid=1">名图羽毛球馆</a>
      <a class="btn" data-href="17527" href="http://m.quyundong.com/court/detail?id=17527&cid=1">悦动全民健身中心网羽馆</a>
      <a class="btn" data-href="17503" href="http://m.quyundong.com/court/detail?id=17503&cid=1">联合羽毛球俱乐部</a>
      <a class="btn" data-href="17495" href="http://m.quyundong.com/court/detail?id=17527&cid=1">腾逸羽毛球馆</a>
      <a class="btn" data-href="17502" href="http://m.quyundong.com/court/detail?id=17527&cid=1">绿港飞鸿羽毛球馆</a>
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
        <li>2. 不可与其他优惠同享</li>
        <li>3. 活动时间：即日起至8月30日</li>
        <li>4. 适用于趣运动（北京）任何页面内下单并指定的7个球馆：空的无限羽毛球馆、悦动全民健身中心网羽馆、联合羽毛球俱乐部、名图羽毛球馆、绿港飞鸿羽毛球馆、腾逸羽毛球馆、彩虹羽毛球俱乐部。</li>
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