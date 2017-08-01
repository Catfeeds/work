<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta content="telephone=no" name="format-detection">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no,minimal-ui">
    <title>领取保险</title>
    <link rel="stylesheet" href="/static/appwebview/insurance/stylesheets/getinsurance.css?ver=1.1">
  </head>
  <body data-design-width="750" data-order-id="<?php echo $list["order_id"];?>" data-se="<?php echo $list["hash"];?>">
    <div id="loading" data-lock="0" class="loading">
      <div class="loading-icon"></div>
      <div id="wxtitle" class="hide"><?php echo $list["title"];?></div>
      <div id="wxdesc" class="hide"><?php echo $list["description"];?></div>
      <div id="wximgUrl" class="hide">/static/appwebview/insurance/images/xys_logo.jpg</div>
      <script src="/static/js/jweixin-1.0.0.js"></script><script type="text/javascript" src="/static/js/jgosport-1.0.js?ver=201611180"></script>
      <script src="/static/js/weixinshareurl.js"></script>
    </div>
    <div class="main hide">
      <div class="status-info">
        <div class="status-title">趣味运动险</div>
        <table class="status-table"> 
          <tr>
            <td>保费（元）</td>
            <td>意外医疗（元）</td>
            <td>突发急性病身故（元）</td>
            <td>意外医疗（元）</td>
          </tr>
          <tr>
            <td>1</td>
            <td>1000</td>
            <td>1000</td>
            <td>2000</td>
          </tr>
        </table>
        <div class="status-more"><a href="/insurance/insurancedes">进一步了解></a></div>
      </div>
      <div class="status-detail">
        <?php if($list["success_total"] < $list["total"]){?>
            <div class="status-time">还有<span>06</span> 天 <span>06</span> 时 <span>23</span> 分来领取保险</div>
             <?php }?>
        <ul class="status-tip">
          <li>· 投保成功后会收到小雨伞短信发送的保单信息</li>
          <li>· 可持保单号和身份证号至小雨伞官网查询保单具体信息</li>
        </ul>
        <div class="status-hasBuy">
          <div class="status-member">
          <?php if($list["end_time"] <= 0){ ?>
            <div>成功投保<span><?php echo count($list["success_total"]); ?></span>名队员</div>
            <p class="status-th">成功投保姓名及保单号:</p>
            <ul>
            <?php foreach ($list["user_success"] as $v){?>
           <li><span><?php echo $v["user_name"];?></span> <?php echo $v["insurance_deal_id"];?> </li>
            <?php }?>
            </ul>
          </div>
        
        <?php }elseif ($list["num"] >= 0){
        if($list["success_total"] < $list["total"]){?>
        <div>已有<span><?php echo $list["success_total"]; ?></span>名队友领取，还剩<span><?php echo $list["total"] - $list["success_total"]; ?></span>人未领取成功</div>
       <?php if($list["success_total"] > 0){?>
          <p class="status-th">成功投保姓名及保单号:</p>
         <?php }?>
    
         <?php }elseif($list["success_total"] >= $list["total"]){ ?>
         <div>全部保险已投保成功</div>
         <p class="status-th">成功投保姓名及保单号:</p>
        <?php }?>
        <ul>
            <?php foreach ($list["user_success"] as $v){?>
              <li><span><?php echo $v["user_name"];?></span> <?php echo $v["insurance_deal_id"];?> </li>
            <?php }?>
        </ul>
       
         <?php }?>
        </div>
      
      </div>
    </div>
      <div class="status-space60"></div>
      <div class="status-tel"> 
       <?php if($list["end_time"] <=0 || $list["success_total"] >= $list["total"]){?><a id="piccTelephone" href="tel:4009609980"><div>咨询及报险：拨打400-960-9980</div></a><?php }else{?>
        <?php if($list["success_total"] < $list["total"]){ ?>
        <div id="showForm">点击领取</div>
        <?php }?>
      
      <?php }?>
      </div>
    
    <div class="picc-cover hide">
      <div data-date="<?php echo time();?>" class="picc-form">
        <div class="picc-close"><img src="/static/appwebview/insurance/images/picc-form-close-dpr2x.png"></div>
        <div class="picc-form-head">
          <div class="picc-form-pen"><img src="/static/appwebview/insurance/images/picc-form-head-dpr2x.png"></div>
          <h2>完善保险信息</h2>
          <p>(资料仅作为投保使用，趣运动不会保存任何<br />您的个人信息)</p>
        </div>
        <div class="picc-form-inputs">
          <div class="p"><span>　姓名</span>
            <input id="userName" type="text" maxlength="20" value="">
          </div>
          <div class="p"><span>身份证</span>
            <input id="userId" type="text" maxlength="20" value="">
          </div>
          <div class="p"><span>手机号</span>
            <input id="phoneNumber" type="text" maxlength="20" value="">
            <div id="getCheckNumber" class="disable">发送验证码</div>
          </div>
          <div class="p"><span>验证码</span>
            <input id="checkNumber" type="text" maxlength="10" value="">
          </div>
          <div class="p margin-top-sp">
            <div id="send" class="disable">提交</div>
            <div class="tips">Tips:提交后无法更改，请确保信息正确</div>
            <div class="alert-text"></div>
          </div>
        </div>
      </div>
      <div class="picc-success hide"><img src="/static/appwebview/insurance/images/picc-success-dpr2x.png"></div>
    </div>
    <div class="nm-cover hide">
      <div class="nm-alert">
        <p>请稍候!</p>
        <div class="close hide">关闭</div>
      </div>
    </div>
        <div class="picc-share-cover hide">
      <div class="picc-share"><img data-src="/static/appwebview/insurance/images/picc-share-dpr2x.png"></div>
      <div class="picc-share-p">如有给队员买保险，记得点击这里分享给好友哦！</div>
    </div>
    <script src="/static/js/zeptoWithFx.min.js"></script>
    <script src="/static/js/mobileResponsive.js"></script>
    <script src="/static/appwebview/insurance/js/piccform.js?ver=20160426"></script>
    <script>
      window.onload = function(){
        var loadInterval = setInterval(function() {
          if($(".loading").attr("data-lock") == 1){
             $(".loading").addClass("hide");
             $(".main").removeClass("hide");
             clearInterval(loadInterval);
          }
        },500);
      
        var countDown = <?php echo $list["end_time"]; ?>,countTimer=null,leftsecond,_d,_h,_m;
            leftsecond = parseInt(countDown);
      
        function showTime(){
            _d = (_d = parseInt(leftsecond / 3600 / 24)) < 10 ? "0" + _d : _d;
            _h = (_h = parseInt((leftsecond / 3600) % 24)) < 10 ? "0" + _h : _h;
            _m = (_m = parseInt((leftsecond / 60) % 60)) < 10 ? "0" + _m : _m;
            var str =　"";
            if(_d>0){
              str = "<span>"+_d+"</span>天"+"<span>"+_h+"</span>小时"+"<span>"+_m+"</span>分";
            }else{
              str = "<span>"+_h+"</span>小时"+"<span>"+_m+"</span>分";
            }
            $(".status-time").html("还有"+str+"来领取保险");
        }
      
        if(leftsecond>1){
          showTime();
          clearInterval(countTimer);
          countTimer = setInterval(function(){
            leftsecond--;
            if(leftsecond>=0){
              showTime();
            }else{
              clearInterval(countTimer);
            }
          },1000);
        }else{
//           var str = "<span>00</span>小时<span>00</span>分";
//           $(".status-time").html("还有"+str+"来领取保险");
      	  $(".status-time").html("");
        }
      }
    </script>
  </body>
</html>