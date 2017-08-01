<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>趣运动-订场神器_订场就这么简单_网上预订_手机订场_羽毛球订场_羽毛球馆_足球场_游泳馆查询预订_去运动</title>
    <meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1, user-scalable=no">
    <meta name="keywords" content="趣运动,在线预订,手机订场,订场优惠,羽毛球订场,足球场,游泳馆查询预订,去运动,订场神器">
    <meta name="description" content="趣运动专注球场在线预订,羽毛球馆,足球场,网球场,球场在线预订,游泳馆查询预订,手机在线预订,运动场馆价格表,运动场馆优惠信息,去运动就上趣运动.">
    <link href="/themes/qu202/css/paylist.css" type="text/css" rel="stylesheet">
    <script src="/static/js/zeptoWithFx.min.js"></script>
    <script src="/static/js/mobileResponsive.js"></script>
    <script src="/themes/qu202/js/paylist.js"></script>
    <script src="/static/js/alipayJSBridge.js"></script>
  </head>
  <body data-design-width="750">
    <div id="loading" data-lock="1" class="loading">
      <div class="loading-icon"></div>
    </div>
    <div data-password="0" class="main hide">
      <div class="header">
        <div class="left"><i class="icon-back"></i></div>
        <div class="center">支付</div>
        <div class="right">帮助</div>
      </div>
      <ul class="login-header">
        <li> 
          <div>订单名称</div>
          <div>江东汇羽毛球馆 88元  </div>
        </li>
      </ul>
      <ul class="login-header">
        <li> 
          <div>可用余额 <span>952560024元</span></div>
          <div>
            <label for="paylist-recharge-pay1">
              <input id="paylist-recharge-pay1" type="checkbox"><em></em>
            </label>
          </div>
        </li>
        <li>
          <div>支付金额</div>
          <div class="paylist-money">18元</div>
        </li>
      </ul>
      <ul class="login-header">
        <li> 
          <div><img src="/themes/qu202/images/paylist-yl.png" style="width:0.32rem;margin-right:0.13rem;"/> 银联支付</div>
          <div> 
            <label for="paylist-recharge-pay2">
              <input id="paylist-recharge-pay2" type="radio" name="paylist"><i></i>
            </label>
          </div>
        </li>
        <li>
          <div><img src="/themes/qu202/images/paylist-wx.png" style="width:0.25rem;margin-left:0.05rem;margin-right:0.18rem;"/>微信支付</div>
          <div> 
            <label for="paylist-recharge-pay3">
              <input id="paylist-recharge-pay3" type="radio" name="paylist"><i></i>
            </label>
          </div>
        </li>
        <li>
          <div><img src="/themes/qu202/images/paylist-zfb.png" style="width:0.39rem"/>支付宝客户端支付</div>
          <div> 
            <label for="paylist-recharge-pay4">
              <input id="paylist-recharge-pay4" type="radio" name="paylist"><i></i>
            </label>
          </div>
        </li>
        <li>
          <div><img src="/themes/qu202/images/paylist-zfb.png" style="width:0.39rem"/>支付宝网页支付</div>
          <div> 
            <label for="paylist-recharge-pay5">
              <input id="paylist-recharge-pay5" type="radio" name="paylist"><i></i>
            </label>
          </div>
        </li>
      </ul>
      <div class="orderinfo-time">请在<span>9分59秒</span>内完成付款，否则订单讲自动取消。</div>
      <ul class="login-in">
        <li id="login-common">
          <div>支付</div>
        </li>
      </ul>
      <div class="recharge-inputPw hide">
        <div class="recharge-btnGroup"><span></span>
          <p>请输入趣运动支付密码</p>
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <form id="recharge-form" action="http://www.baidu.com">
            <input id="recharge-pw" type="tel">
          </form>
        </div>
      </div>
      <div class="recharge-password hide">
        <div class="recharge-pwWrap">
          <div class="recharge-forgetPw">
            <p>支付密码错误!</p>
            <p id="paylist-tryAgain">重试</p>
            <p> <a href="../recharge/forget">忘记密码</a></p>
          </div>
          <div class="recharge-cancel">
            <p id="recharge-cancel">返回</p>
          </div>
        </div>
      </div>
    </div>
    <div class="toast hide">
      <div class="toast-alert">
        <div class="toast-msg"> </div>
      </div>
    </div>
    <div class="nm-cover hide">
      <div class="nm-alert">
        <div class="msg">您还没有设置趣运动支付密码，请设置趣运动支付密码！</div>
        <div class="cancel"> 
          <div class="l">取消</div>
          <div class="r">确定</div>
        </div>
      </div>
    </div>
    <script>
      var countDown = 600,
          countTimer = null,
          leftsecond,_m,_s;
      leftsecond = parseInt(countDown);
      
      function showTime() {
          _m = parseInt(leftsecond/60);
          _s = parseInt(leftsecond%60);
          $(".orderinfo-time span").text(_m+"分"+_s+"秒");
      }
      
      if (leftsecond > 1) {
          showTime();
          clearInterval(countTimer);
          countTimer = setInterval(function() {
              leftsecond--;
              if (leftsecond >= 0) {
                  showTime();
              } else {
                  clearInterval(countTimer);
              }
          }, 1000);
      } else {
          $(".orderinfo-time span").text("0分0秒");
      }
    </script>
    <div style="display: none;">
      <script>
        var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "//hm.baidu.com/hm.js?faab40fbb816cf9bb1c5c940b05b0b98";
          var s = document.getElementsByTagName("script")[0];
          s.parentNode.insertBefore(hm, s);
        })();
      </script>
    </div>
  </body>
</html>