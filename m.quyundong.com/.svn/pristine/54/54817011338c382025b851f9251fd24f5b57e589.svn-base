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
            <div class="center">用户余额使用规则</div>
            <div class="right"></div>
        </div>
      <div class="sport">
        <div class="content">
            <div class="title">1、什么是储值卡</div>
            <?php if (CHANNEL_SOURCE == 'liaoning') { ?>
            <div class="detail">储值卡用于余额充值，充值后转化成余额，适用于所有可预订及支付项目，以及各种优惠活动。</div>
            <?php }else{ ?>
            <div class="detail">储值卡用于余额充值，充值后转化成余额，适用于趣运动上所有可预订及支付项目，包含羽毛球、足球、篮球、健身月卡、陪练，以及各种优惠活动。</div>
            <?php } ?>
        </div>
        <div class="content">
            <div class="title">2、储值卡如何使用</div>
            <div class="detail">点击余额充值输入VIP储值卡密码，完成激活后、储值卡的金额即已充入到余额中。</div>
        </div>
        <div class="content">
            <div class="title">3、什么是余额</div>
            <div class="detail">余额可支付场地预订费用，运动套餐购买费用，以及未来更多的运动服务费用。</div>
        </div>
        <div class="content">
            <div class="title">4、余额如何使用</div>
            <div class="detail">选择您要预订的场地或要购买的商品，提交订单后，您的余额会自动抵扣掉您要支付的金额。</div>
        </div>
        <div class="content">
            <div class="title">5、余额能充值或者提现吗</div>
            <div class="detail">余额可以充值，但不能提现，如造成不便，敬请谅解。</div>
        </div>
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