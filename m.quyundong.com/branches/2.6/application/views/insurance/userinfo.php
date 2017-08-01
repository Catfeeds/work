<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no,minimal-ui" />
  <title>趣运动·动club</title>
  <link rel="stylesheet" type="text/css" href="/static/dongclub_active/web/style/nm.base.css">
  <link rel="stylesheet" type="text/css" href="/static/dongclub_active/web/style/dongclub_active.base.css">
  <script type="text/javascript">var lock = 0;</script>
  <script type="text/javascript" src="/static/js/jweixin-1.0.0.js"></script>
  <script type="text/javascript" src="/static/js/wxshare.js?ver=1.03"></script>
  <style type="text/css">
    .loading{
      width: 100%;
      height: 100%;
      position: relative;
      background-color: rgba(255,255,255,1);
    }
    .loadingIcon{
      width: 0.6rem;
      height: 0.6rem;
      position: absolute;
      top: 50%;
      left:50%;
      margin-top: -0.3rem;
      margin-left: -0.3rem;
      background: url(//m.quyundong.com/static/images/loading.png) no-repeat;
      -webkit-background-size: cover;
      background-size: cover;
      -webkit-animation: rotate360 1s linear 0s infinite;
      -moz-animation: rotate360 1s linear 0s infinite;
      animation: rotate360 1s linear 0s infinite;
      -webkit-transform-origin: 50% 50%;
      -moz-transform-origin: 50% 50%;
      -ms-transform-origin: 50% 50%;
      -o-transform-origin: 50% 50%;
      transform-origin: 50% 50%;
      z-index: 99;
    }
    @-moz-keyframes rotate360 {
        from {
            transform:rotateZ(0deg);
        }
        to {
            transform:rotateZ(360deg);
        }
    }
    @keyframes rotate360 {
      from {
        -webkit-transform:rotateZ(0deg);
        transform:rotateZ(0deg);
      }
      to {
        -webkit-transform:rotateZ(360deg);
        transform:rotateZ(360deg);
      }
    }

    @-webkit-keyframes rotate360 {
      from {
        -webkit-transform:rotateZ(0deg);
      }
      to {
        -webkit-transform:rotateZ(360deg);
      }
    }
  </style>
</head>
<body>
  <section class="loading">
    <div class="loadingIcon"></div>
  </section>
  <section class="main hide">
    <div class="dongclub"><img src="/static/dongclub_active/web/images/banner.png"></div>
    <div class="title88"><img src="/static/dongclub_active/web/images/title88.png"></div>
    <div class="image1"><img src="/static/dongclub_active/web/images/image1.png"></div>
    <div class="text1"><img src="/static/dongclub_active/web/images/text1.png"></div>
    <div class="image2"><img src="/static/dongclub_active/web/images/image2.png"></div>
    <div class="text2"><img src="/static/dongclub_active/web/images/text2.png"></div>
    <div class="image3"><img src="/static/dongclub_active/web/images/image3.png"></div>
    <div class="morechose"><img src="/static/dongclub_active/web/images/morechose.png"></div>
    <div class="howto"><img src="/static/dongclub_active/web/images/howto.png"></div>
    <a class="btn" href="gosport://share_info?url=http%3A%2F%2Fm.quyundong.com%2Fappwebview%2Fclub&img_url=http%3A%2F%2Fm.quyundong.com%2Fstatic%2Fdongclub_active%2Fweb%2Fimages%2Fdongclub_share.jpg&thumb_url=http%3A%2F%2Fm.quyundong.com%2Fstatic%2Fdongclub_active%2Fweb%2Fimages%2Fdongclub_share.jpg&title=广深人民的福利！一张卡游遍全城游泳馆！&description=仅88元，公司旁，家附近，心仪游泳馆随便去~这个夏天浪个够！"><img src="/static/dongclub_active/web/images/btn.png"></a>
    <div class="end"><img src="/static/dongclub_active/web/images/end.png"></div>
  </section>
  <section class="wxshare hide">
    <div class="alert"><i class="close"></i>
      <p class="color33">运动不孤单，快约小伙伴</p>
      <p class="color63"><span class="color93">分享步骤：</span><br />1、点击右上角图标 <br />2、选择分享给朋友或者朋友圈</p>
      <div class="sharepic"></div>
    </div>
  </section>
  <script type="text/javascript" src="/static/js/zeptoWithFx.min.js"></script>
  <script type="text/javascript" src="/static/js/mobileResponsive.js"></script>
  <script type="text/javascript" src="/static/dongclub_active/web/js/dongclub_active.js?ver=1.05"></script>
</body>
</html>