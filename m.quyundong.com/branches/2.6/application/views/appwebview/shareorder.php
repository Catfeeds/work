<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta content="telephone=no" name="format-detection">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no,minimal-ui">
    <title>场地搞定，就等你了！</title>
    <link rel="stylesheet" href="/static/css/reset.css">
    <script type="text/javascript" src="/static/js/jweixin-1.0.0.js"></script>
    <style type="text/css" media="screen">
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
        body{
          margin: 0 auto;
          height: 100%;
          max-width: 640px;
          background-color:#fff;
          font-size: 0.24rem;
          text-align: center;
        }
        .loading {
          width: 100%;
          height: 100%;
          position: relative;
          background-color: white;
        }

        .loading-icon {
          width: 0.6rem;
          height: 0.6rem;
          position: absolute;
          top: 50%;
          left: 50%;
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
            transform: rotateZ(0deg);
          }
          to {
            transform: rotateZ(360deg);
          }
        }
        @keyframes rotate360 {
          from {
            -webkit-transform: rotateZ(0deg);
            transform: rotateZ(0deg);
          }
          to {
            -webkit-transform: rotateZ(360deg);
            transform: rotateZ(360deg);
          }
        }
        @-webkit-keyframes rotate360 {
          from {
            -webkit-transform: rotateZ(0deg);
          }
          to {
            -webkit-transform: rotateZ(360deg);
          }
        }
        .hide {
          display: none;
        }
        p em{color:#666;}
        .shareOrder-1{margin:80px 0 20px;margin:0.4rem 0 0.1rem;}
        .shareOrder-1 img{width:112px;width:0.56rem;}
        .shareOrder-2{font-size: 36px;font-size: 0.18rem;color:#0093f0;}
        .shareOrder-3{font-size: 24px;font-size: 0.12rem;color:#999;margin:30px 0 80px;margin:0.15rem 0 0.4rem;}
        .shareOrder-4{font-size: 28px;font-size: 0.14rem;color:#222;text-align: left;margin:0 50px;margin:0 0.25rem;line-height: 52px;line-height: 0.26rem;}
        .shareOrder-4 p span{display: block;}
        .shareOrder-4-1{float:left;}
        .shareOrder-4-2{margin-left:114px;margin-left:0.57rem; }
        .shareOrder-5{text-decoration: none;}
        .shareOrder-5-1{margin:150px 50px 40px;margin:0.75rem 0.25rem 0.2rem;height: 88px;height: 0.44rem;line-height: 88px;line-height: 0.44rem;background-color: #009ff0;font-size: 28px;font-size: 0.14rem;color:#fff;border-radius: 5px;}
    </style>
  </head>
  <body>
    <section id="loading" class="loading" data-lock="0">
      <div class="loading-icon"></div>
      <div  class="hide" id="wxtitle">场地搞掂，就等你了！</div>
      <div  class="hide" id="wxdesc">含订单信息，注意信息安全</div>
      <div  class="hide" id="wximgUrl">http://act.quyundong.com/attachment/discount2/images/logo.jpg</div>
      <script type="text/javascript" src="/static/js/weixinshareurl.js"></script>
    </section>
    <section class="main hide">
        <div class="shareOrder-1"><img src="/static/appwebview/shareorder/images/nm_pic1.png" alt=""></div>
        <h1 class="shareOrder-2">趣运动集结号</h1>
        <p class="shareOrder-3">队长已经选好场了！小伙伴们要按时到场哦！</p>
        <div class="shareOrder-4">
            <?php if (!empty($orderInfo) && isset($orderInfo['goods_list']) && !empty($orderInfo['goods_list'])) {?>
                <p><em>场　馆：</em><?php echo baf_CHtml::encode($orderInfo['name']); ?></p>
                <p><em>项　目：</em><?php echo baf_CHtml::encode($orderInfo['category_name']); ?></p>
                <p><em>日　期：</em><?php echo date('m月d日', $orderInfo['goods_list'][0]['start_time']); ?></p>
                <p> <span class="shareOrder-4-1"><em>场　次：</em></span>
                    <span class="shareOrder-4-2">
                        <?php foreach ($orderInfo['goods_list'] as $goods) { 
                            ?>
                            <span>
                                <?php echo baf_CHtml::encode($goods['course_name']); ?>
                                <?php echo '('.date('H:i', $goods['start_time']).'-'.date('H:i', $goods['end_time']).')'; ?>
                            </span>
                        <?php } ?>
                    </span>
                </p>
                <?php if (!in_array($orderInfo['order_type'], array('3', '6'))) {  // 会员卡订场， 约练订单 没有验证码  ?>
                <p><em>验证码：</em><?php echo baf_CHtml::encode($orderInfo['verification_code']); ?></p>
                <?php } ?>
                
            <?php } ?>
        </div>
        <a href="http://www.quyundong.com/d" class="shareOrder-5"><div class="shareOrder-5-1">下载趣运动，我也来当队长！</div></a>
    </section>
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
        window.onload = function(){
          var loadInterval = setInterval(function() {
            if($("#loading").attr("data-lock") == 1){
              $(".loading").addClass("hide");
              $(".main").removeClass("hide");
              clearInterval(loadInterval);
            }
          },500);
        }
    </script>
  </body>
</html>