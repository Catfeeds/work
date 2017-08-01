<?php $this->display('public/header_202.php');?>
    <link href="/themes/qu202/css/help.css" type="text/css" rel="stylesheet">
    <style>
      html{
        -webkit-tap-highlight-color: transparent;
      }
  
      .sport{
          display: inline-block;
          text-align: left; 
          margin-left: 5px; 
          margin-bottom: 10px;
          font-size: 13px;
          line-height: 150%;
          width: 100%;
          font-family:"Microsoft YaHei",微软雅黑;
      }
      .content{
          border-radius: 3px;
          -moz-border-radius: 3px;
          -webkit-border-radius: 3px;
          background: #fff;
          width: 96%;
      }
      .title{
          margin: 13px auto 5px;
          border: 1px solid #e1e1e1;
          color: #636363;
          background: #f9f9f9;
          height: 40px;
          line-height: 40px;
          font-size: 17px;
          padding-left: 15px;
          border-top-right-radius: 3px;
          border-top-left-radius: 3px;
          width: 95%;
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
          border-bottom: 1px solid #e1e1e1;
          height: 40px;
          line-height: 40px;
          width: 99%;
      } 
      .di{
          height: 10px;
          background: #f0efed;
      }

    </style>
    <div id="loading" data-lock="1" class="loading">
      <div class="loading-icon"></div>
    </div>
    <div class="help-main">
      <div class="header">
        <div class="left"><i onclick="history.back(-1);" class="icon-back"></i></div>
        <div class="center">帮助</div>
        <div class="right hide"></div>
      </div>
      <div class="iframe">
        <!-- <iframe src="http://api.7yundong.cn/help/detail/?id=40"> </iframe> -->
        <div class="sport">
                <div class="content">
            <div class="title">一、订单问题</div>
            <div class="detail">
                您提交的订单我们会为您保存10分钟， 请尽快完成支付，如果10分钟之内没有完成支付，系统将自动取消该订单。
            </div>
        </div>
        <div class="content">
            <div class="title">二、支付问题</div>
            <div class="detail">
                1、如果支付宝客户端支付失败，请使用支付宝网页支付或微信支付。为保证顺利支付，请在网络良好的状态下操作<br>
                2、如果支付后订单仍显示“未支付”，请确认您的支付宝账户是否被扣取相应的费用，如果没有，请您在“我的订单”里重新支付未支付的订单<br>
                3、如果支付后订单显示“已取消”，请确认您的支付宝账户是否已经被扣取相关费用，如果已扣，请拨打我们的客服电话。我们会尽快为您处理。
            </div>
        </div>
        <div class="content">
            <div class="title">三、代金券说明</div>
            <?php if(CHANNEL_SOURCE=='liaoning'){ ?>
            <div class="detail">
                1、参与优惠活动有机会获得代金券<br>
                2、请在代金券的有效日期内使用，逾期无效<br>
                3、每个订单只能使用一张代金券，不累加使用<br>
                4、每个代金券兑换码只能兑换一次，在兑换之前请妥善保管您的兑换码以保证正常使用。<br><br>
                如果以上解答没有解决您的问题，可致电客服电话。感谢您的支持，您的反馈是我们的宝贵财富。
            </div>
            <?php }else{ ?>
            <div class="detail">
                1、参与趣运动优惠活动有机会获得代金券<br>
                2、请在代金券的有效日期内使用，逾期无效<br>
                3、每个订单只能使用一张代金券，不累加使用<br>
                4、每个代金券兑换码只能兑换一次，在兑换之前请妥善保管您的兑换码以保证正常使用。<br><br>
                如果以上解答没有解决您的问题，可致电客服电话。感谢您对趣运动的支持，您的反馈是我们的宝贵财富。
            </div>
            <?php } ?>
        </div>
            </div>
      </div>
      <div class="foot user-telephone">点击拨打客服电话：<span>4000-410-480<span></div>
    </div>
    <div class="nm-cover hide">
      <div class="nm-phone-alert">
        <div class="top">
          <div class="massage borderBottom1px">
            <p>客服在线时间：周一至周六 10:00-20:00</p>
            <p><span style="visibility: hidden;">客服在线时间：周日至</span>周日 10:00-18:00</p>
            <p class="phoneNumber">4000-410-480</p>
          </div><a href="tel:4000410480" class="call">拨打</a>
        </div>
        <div class="cancel">取消</div>
      </div>
    </div>
    <script>
      window.onload = function  () {
        var loadInterval = setInterval(function() {
          if($(".loading").attr("data-lock") == 1){
             $(".loading").addClass("hide");
             $(".help-main").removeClass("hide");
             clearInterval(loadInterval);
          }
        },500);
        $(".user-telephone").click(function(){
            $(".nm-cover").removeClass("hide");
        });
      
        $(".cancel").click(function(){
            $(".nm-cover").addClass("hide");
        });
        var ua = window.navigator.userAgent;
        if( ua.indexOf("UC") != -1){
          setTimeout(function(){
            var style = document.createElement("style");
            style.innerHTML = "UCBUG{}";
            document.head.appendChild(style);
          },1000);
        }
        if( ua.indexOf("iPhone") != -1 && ua.indexOf("UC") != -1){
          // $("iframe").css("margin-bottom","0.8rem");
        }
      }
    </script>
<?php $this->display('public/footer_202.php');?>