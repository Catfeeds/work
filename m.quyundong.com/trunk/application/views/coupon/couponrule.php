<?php $this->display('public/header_202.php');?>
<style>
html{
  font-size: 16px!important;
}
body{
  background: #f0efed;
}
.hide{
    display: none !important;
}
ul,li{
    list-style: none;
}
*{margin:0;padding:0;}
.header {
    width: 100%;
    height: 44px;
    background-color: #009ff0;
    text-align: center;
    line-height: 44px;
    position: relative;
    font-family: "Microsoft YaHei", "Helvetica Neue", Helvetica, STHeiTi, sans-serif;
}
.header .left, .header .right {
    width: 50px;
    height: 44px;
    position: absolute;
    top: 0;
    z-index: 99;
    font-size: 0;
}
.header .left {
    left: 0;
}
.header .center {
    width: 100%;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 50px;
    position: relative;
    font-size: 18px;
    color: #fff;
}
.header .right {
    right: 0;
    font-size: 15px;
    color: #fff;
}
.header .icon-back {
    display: inline-block;
    width: 15px;
    height: 15px;
    border-bottom: 2px solid #fff;
    border-left: 2px solid #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -7.5px;
    margin-top: -7.5px;
    -moz-transform: rotateZ(45deg);
    -ms-transform: rotateZ(45deg);
    -webkit-transform: rotateZ(45deg);
    transform: rotateZ(45deg);
}
.sport{
    margin-bottom: 10px;
    font-size: 13px;
    line-height: 150%;
    font-family:"Microsoft YaHei",微软雅黑;
}
.content{
    border-radius: 3px;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    background: #fff;
    margin:0 10px;
}
.title{
    margin: 0.8125rem auto 0.3125rem;
    border: 0.0625rem solid #e1e1e1;
    color: #636363;
    background: #f9f9f9;
    height: 40px;
    line-height: 40px;
    font-size: 17px;
    padding-left: 15px;
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
}
.detail{
    color: #939393;
    font-size: 14px;
    width: 95%;
    margin: 0 auto;
    line-height: 150%;
    padding-top: 3px;
    padding-bottom: 5px;
    text-align: left;
}
.detail div{
    border-bottom: 0.0625rem solid #e1e1e1;
    height: 40px;
    line-height: 40px;
    width: 99%;
} 
.di{
    height: 10px;
    background: #f0efed;
}
a, input, lable, button, div {
    -webkit-tap-highlight-color: transparent;
    outline: 0;
}
</style>
	<div id="loading" data-lock="1" class="loading">
      <div class="loading-icon"></div>
    </div>
    <div class="main hide">
        <div class="header">
            <div class="left"><i class="icon-back" onclick="history.go(-1)"></i></div>
            <div class="center">使用说明</div>
            <div class="right"></div>
        </div>
      <div class="sport">
        <div class="content">
            <?php if (in_array(CHANNEL_SOURCE,Config::$hideItem)) { ?>
            <div class="title">1、什么是运动券</div>
                <div class="detail">运动券可兑换预订相应运动种类任意场馆任意时间的一个场次。</div>
            </div>
            <div class="content">
                <div class="title">2、如何使用运动券</div>
                <div class="detail">将票券绑定至我的账户、选择场次确认、提交订单页面使用绑定票券或直接输入票券密码，提交订单、确认完成，手机收到提示短信，到场馆使用。</div>
            </div>
            <div class="content">
                <div class="title">3、什么是代金券</div>
                <div class="detail">代金券时在预订中使用的现金抵用券，可以在消费付款时抵扣相应面值的金额。</div>
            </div>
            <div class="content">
                <div class="title">4、如何获取代金券</div>
                <div class="detail">在不定期推出的优惠活动中会发放代金券，享受超低折扣订场优惠。</div>
            </div>
            <div class="content">
                <div class="title">5、如何使用代金券</div>
                <div class="detail">提交订单支付时，添加使用代金券，根据代金券金额，将在支付金额里抵扣相应的金额。</div>
            </div>
            <div class="content">
                <div class="title">6、代金券找零兑现吗</div>
                <div class="detail">代金券不找零，不兑换，每个订单仅限使用一张代金券。</div>
            </div>
            <div class="content">
                <div class="title">7、卡券使用限制</div>
                <div class="detail">预订同一场馆、同一项目中同一天的场地时，最多只能使用1张卡券（包括代金券和运动券）。</div>
            </div>
            <?php }else{ ?>
            <div class="title">1、什么是运动券</div>
                <div class="detail">运动券可在趣运动APP和官网上兑换预订相应运动种类任意场馆任意时间一个场次</div>
            </div>
            <div class="content">
                <div class="title">2、如何使用运动券</div>
                <div class="detail">将票券绑定至我的账户、选择场次确认、提交订单页面使用绑定票券或直接输入票券密码，提交订单、确认完成，手机收到提示短信，到场馆使用。</div>
            </div>
            <div class="content">
                <div class="title">3、什么是代金券</div>
                <div class="detail">代金券是在趣运动客户端或网站交易中使用的现金抵用券，可以在消费付款时抵扣相应面值的金额。</div>
            </div>
            <div class="content">
                <div class="title">4、如何获取代金券</div>
                <div class="detail">可通过邀请好友注册并下单获取代金券，此外，趣运动不定期推出优惠活动，可享受超低折扣订场优惠。</div>
            </div>
            <div class="content">
                <div class="title">5、如何使用代金券</div>
                <div class="detail">提交订单支付时，添加使用代金券，根据代金券金额，将在支付金额里抵扣相应的金额。</div>
            </div>
            <div class="content">
                <div class="title">6、代金券找零兑现吗</div>
                <div class="detail">代金券不找零，不兑现，每个订单仅限使用一张代金券。</div>
            </div>
            <div class="content">
                <div class="title">7、卡券使用限制</div>
                <div class="detail">预订同一场馆、同一项目中同一天的场地时，最多只能使用1张卡券（包括代金券和运动券）。</div>
            </div>
            <?php } ?>
      </div>
    </div>
    <script>
      window.onload = function() {
        var loadInterval = setInterval(function() {
            if ($(".loading").attr("data-lock") == "1") {
                $(".loading").addClass("hide");
                $(".main").removeClass("hide");
                clearInterval(loadInterval);
            }
        }, 500);
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
<?php $this->display('public/footer_202.php');?>