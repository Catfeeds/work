<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <title>半价订场</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no,minimal-ui" />
  <link rel="stylesheet" type="text/css" href="/static/css/reset.css">
  <style type="text/css">
    html{
      -ms-text-size-adjust: 100%; 
      -webkit-text-size-adjust: 100%;
       font-family:"Microsoft YaHei", "Helvetica Neue", Helvetica, STHeiTi, sans-serif; 
      width: 100%;
      height: 100%;
      font-size: 100px;
      overflow: auto;
      background-color:#fff;
    }
    button{
      border:0px;
      padding: 0.02rem 0.05rem ;
    }
    body{
      margin: 0 auto;
      width: 3.2rem;
      height: 12.5rem;
      max-width: 640px;
      overflow: hidden;
      background-color:#18a6f6;
      font-size: 0.24rem;
      text-align: center;
    }
    .main{
      width: 100%;
      background-color: pink;
      margin: 0 auto;
    }
    .header{
      width: 100%;
      height: 1.27rem;
      font-size: 0;
    }
    .nav{
      width: 100%;
      height: 0.22rem;
      font-size: 0;
    }
    .content{
      width: 100%;
      height: 11.01rem;
      background-color: #fff;
      background:-webkit-linear-gradient(top,#24db98,#18a6f6);
      background:-moz-linear-gradient(top,#24db98,#18a6f6);
      background:-o-linear-gradient(top,#24db98,#18a6f6);
      position: relative;
    }
    .cloud{position: absolute;}
    .cloud1{width: 1.51rem;height: 0.97rem;background: url(/static/images/webone/cloud1.png) no-repeat;-webkit-background-size: cover;background-size: cover;right: 0;top:0.34rem;}
    .cloud2{width: 1.21rem;height: 0.73rem;background: url(/static/images/webone/cloud2.png) no-repeat;-webkit-background-size: cover;background-size: cover;left: 0;top:2.12rem;}
    .cloud4{width: 3.25rem;height: 1.65rem;background: url(/static/images/webone/cloud4.png) no-repeat;-webkit-background-size: cover;background-size: cover;right: 1.6rem;top:6.2rem;}
    .cloud5{width: 7.00rem;height: 2.87rem;background: url(/static/images/webone/cloud5.png) no-repeat;-webkit-background-size: cover;background-size: cover;left: 0.3rem;top:8.4rem;}
    .cloud6{width: 2.22rem;height: 1.18rem;background: url(/static/images/webone/cloud6.png) no-repeat;-webkit-background-size: cover;background-size: cover;right: 0;top:4.2rem;}
    
    .mobile{position: absolute;}
    .mobile1{width: 1.92rem;height: 7.46rem;background: url(/static/images/banjia/mobile1.png) no-repeat;-webkit-background-size: cover;background-size: cover;left: 0.12rem;top:0.12rem;}
    .mobile2{width: 1.89rem;height: 2.65rem;background: url(/static/images/webone/mobile2.png) no-repeat;-webkit-background-size: cover;background-size: cover;right: 0.16rem;top:2.2rem;}
    .mobile3{width: 1.92rem;height: 2.65rem;background: url(/static/images/banjia/mobile3.png) no-repeat;-webkit-background-size: cover;background-size: cover;left: 0.12rem;top:4rem;}
    .mobile4{width: 1.94rem;height: 2.65rem;background: url(/static/images/banjia/mobile4.png) no-repeat;-webkit-background-size: cover;background-size: cover;right: 0.16rem;top:6.2rem;}
    .textbox{
      width: 3.03rem;
      height: 1.53rem;
      padding-top: 0.32rem;
      padding-left: 0.15rem;
      -webkit-box-sizing:border-box;
      box-sizing:border-box;
      position: absolute;
      bottom:0rem;
      left:0.1rem;
      background: url(/static/images/webone/textbox.png) no-repeat;
      -webkit-background-size: cover;
      background-size: cover;
      font-size: 0.12rem;
      text-align: left;
      color:#fff;
    }
    .texttitle{
      width: 2.01rem;
      height: 0.14rem;
      position: absolute;
      top:0.1rem;
      left:0.5rem;
      background: url(/static/images/webone/titletext.png) no-repeat;
      -webkit-background-size: cover;
      background-size: cover;
    }
    .Downbuttom{
      position: absolute;
      top:-0.45rem;
      left:50%;
      margin-left: -0.5rem;
      width: 1rem;
      height: 0.3rem;
      font-size: 0.14rem;
      line-height: 0.3rem;
      text-align: center;
      color: #fff;
      -webkit-box-sizing:border-box;
      box-sizing:border-box;
      border:1px solid #fff;
      background-color:rgba(125,0,34,0.2);
      text-decoration: none;
    }
    .Downbuttom:active,.Downbuttom:visited{
      color:#fff;
    }
    img{
      width: 100%;

    }
  </style>
</head>
<body>
  <div class="mian">
    <div class="header"><img src="/static/images/banjia/banjiaheader.png"></div>
    <div class="nav"><img src="/static/images/banjia/banjianav.png"></div>
    <div class="content">
      <div class="cloud cloud1"></div>
      <div class="cloud cloud2"></div>
      <div class="cloud cloud4"></div>
      <div class="cloud cloud5"></div>
      <div class="cloud cloud6"></div>
      <div class="mobile mobile1"></div>
      <div class="mobile mobile2"></div>
      <div class="mobile mobile3"></div>
      <div class="mobile mobile4"></div>
      <div class="textbox"><div class="texttitle"></div>
      <a href="http://www.quyundong.com/d" target="_black" class="Downbuttom">下载APP体验</a>
        <ul>友情提示：
          <li>1. 仅限新用户参加</li>
          <li>2. 每个用户仅限使用一个名额</li>
          <li>3. 不可与其他优惠（含代金券）同享</li>
          <li>4. 名额有限,抢完即止</li>
        </ul>
      </div>
    </div>
  </div>
  <script type="text/javascript" src="/static/js/zeptoWithFx.min.js"></script>
  <script type="text/javascript">
    $(document).ready(function(){
      var $windowWidth = $(window).width();
      setTimeout(function(){
        $windowWidth = $(window).width();
        if($windowWidth > 640){
          $windowWidth = 640;
        }
        $("html").css("font-size",(100/320) * $windowWidth + "px");
      },100);
      

      $(window).resize(function(){
        $windowWidth = $(window).width();
        if($windowWidth > 640){
          $windowWidth = 640;
        }
        $("html").css("font-size",(100/320) * $windowWidth + "px");
      });
    });
  </script>
</body>
</html>