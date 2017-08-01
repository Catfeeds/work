<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <title>退改规则</title>
  <link href="/static/css/reset.css" type="text/css" rel="stylesheet">
  <meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1, user-scalable=no"/>
  <meta content="telephone=no" name="format-detection" />
  <style>
    html,body{
      background-color: #f5f5f9;
    }
    .hide{
      display: none !important;
    }
    .header{
      font-size: 0;
      background-color: #fff;
    }
    .header .gai, .header .tui{
      width:49.5%;
      display: inline-block;
      text-align: center;
      font-size: 14px;
      color:#222;
      padding:14px 0;
      position: relative;
    }
    .header .gai.cur:after, .header .tui.cur:after{
      position: absolute;
      content: '';
      width: 100%;
      height: 2px;
      background-color: #666;
      bottom:0;
      left:0;
    }
    #gai_context, #tui_context{
      padding:15px;
      font-size: 14px;
      color:#222;
      line-height: 1.6;
    }
  </style>
  <script type="text/javascript" src="/static/js/zeptoWithFx.min.js"></script>
</head>
<body>
  <div class="header">
    <div class="gai">改签</div><div class="tui cur">退款</div>
  </div>
  <div id="gai_context" class='hide'>
    Q：什么是改签？<br>
    A：改签是指已预订的场地在同一场馆可预定时间内可更换时间、场地；改签后，你将收到新的订场短信，订场信息以新的短信为准。<br>
    <br>
    Q：什么条件下可以改签？<br>
    A：只有开通了改签服务的球馆才能改签，详情可在场馆详情页查看；需在打球前4小时可以改签；已改签的订单无法再次改签和退款。<br>
    <br>
    Q：旧订单支付的费用怎么处理？<br>
    A：改签采用多退少补的原则，多出的部分会原路退回（由于银联和apple pay机制问题，金额无法退回原支付账户，将退至趣运动余额）当您使用余额+第三方支付时，优先退到趣运动余额账户；趣运动余额不支持提现，可订场使用。<br>
    <br>
    Q：旧订单使用的卡券如何处理？<br>
    A：当新订单符合该卡券的使用条件时，在旧订单中使用的卡券会继承至新订单中，若新订单不符合使用条件，则无法继承，但卡券不会退回<br>
    <br>
    Q：旧订单参与的活动如何处理？<br>
    A：旧订单中的活动优惠改签后将无法再使用；改签时也不能参与其他活动优惠。<br>
    <br>
    Q：新订单可以主动选择其他优惠吗？<br>
    A：改签中新订单使用的卡券或活动只能是从旧订单中继承而来，无法主动选择新的卡券或活动<br>
    <br>
    Q：旧订单中购买了商品怎么办？<br>
    A：旧订单购买商品已退款，归入您的已支付金额中，在新订单无法购买商品<br>
    <br>
    Q：旧订单中已经发起了球局怎么办？<br>
    A：旧订单中发起的球局将被取消，在新订单中可以继续发起新的球局<br>
  </div>
  <div id='tui_context'>
    1、通过趣运动预订羽毛球、篮球、足球、乒乓球、网球的场次类订单可支持退款。其他项目不支持退款。<br>
    2.退款需在运动项目开始时间前24小时申请，部分不允许退款的球馆，则不予进行退款（具体可在球馆详情页查询）；<br>
    3、退款支持转入您的趣运动账户余额或原路退回，退至余额时立即到账，余额暂不可以提现；<br>
    4、余额可在『我的』页面上，点击『余额』进行查看，并可在趣运动上进行消费；<br>
    5、30天内仅有一次退款机会；<br>
    6、场地订单退款会同时退掉所购买的商品。<br>
  </div>
  <script>
  $(function () {
    $('.gai').click(function () {
      $(this).addClass('cur');
      $('#tui_context').addClass('hide');
      $('#gai_context').removeClass('hide');
      $('.tui').removeClass('cur');
    });
    $('.tui').click(function () {
      $(this).addClass('cur');
      $('#gai_context').addClass('hide');
      $('#tui_context').removeClass('hide');
      $('.gai').removeClass('cur');
    });
  })
  </script>
</body>
</html>