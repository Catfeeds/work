<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>趣运动-订场神器_订场就这么简单_网上预订_手机订场_羽毛球订场_羽毛球馆_足球场_游泳馆查询预订_去运动</title>
    <meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1, user-scalable=no">
    <meta name="keywords" content="趣运动,在线预订,手机订场,订场优惠,羽毛球订场,足球场,游泳馆查询预订,去运动,订场神器">
    <meta name="description" content="趣运动专注球场在线预订,羽毛球馆,足球场,网球场,球场在线预订,游泳馆查询预订,手机在线预订,运动场馆价格表,运动场馆优惠信息,去运动就上趣运动.">
    <link href="/themes/qu202/css/paylist.css" type="text/css" rel="stylesheet">
    <link href="/themes/koubei/order/payok/stylesheets/payok.css" type="text/css" rel="stylesheet">
    <script src="/static/js/jquery-1.12.0.min.js"></script>
    <script src="/static/js/alipayJSBridge.js"></script>
  </head>
  <body data-design-width="750">
    <div class="main">
      <div class="order-payok-banner borderBottom1px">
        <h2 id="show_html">正在发起支付...</h2>
        <a id="repay" href="javascript:window.location.reload()" style="font-size: 16px; display: none;">重新支付</a>
      </div>      
    </div>

<!--口碑支付-->

<script>
var reflash = '<?php echo $reflash;?>';
var id = '<?php echo isset($payInfo['order_info']['order_id']) ? $payInfo['order_info']['order_id'] : 0;?>';
var resultCode = {
        '9000' : '订单支付成功',
        '8000' : '正在处理中',
        '4000' : '订单支付失败',
        '6001' : '用户中途取消',
        '6002' : '网络连接出错',
        '99' : '用户点击忘记密码快捷界面退出',
  };
var trade_no = '<?php  echo isset($payInfo['trade_no']) ? $payInfo['trade_no'] : '';?>';
var payed = false;
  // var AlipayJSBridge = {
  //   call:function(d,a,cb){
  //     cb({resultCode:'99'});
  //   }
  // }
$(document).ready(function(){
  if(AlipayJSBridge){
    window.setTimeout(function(){
      if (trade_no == '') {
          $('#show_html').html('下单失败！');
        }
        else {
            /**
            * 调用口碑插件接口
            */
            var url = "payOk?id="+id;
            AlipayJSBridge.call("tradePay",{ tradeNO: trade_no }, function(result){  
              payed = true;          
              if(resultCode[result.resultCode]){
                $('#show_html').html(resultCode[result.resultCode]);
              }
              window.location.href = url;
            });
        }
    }, 2000);

  //非口碑环境
  }else {
      $('#show_html').html('非支付宝环境，无法启动支付');
  }  
});


onerror = function(){
    setRetry();
}

function setRetry(){
    $('#repay').css('display','block');
}

window.setTimeout(function(){
    if(payed==false) setRetry();
}, 5000);

</script>
<!--END 口碑支付-->

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