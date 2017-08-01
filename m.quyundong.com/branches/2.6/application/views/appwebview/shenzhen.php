<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <title>深圳1元订场</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no,minimal-ui" />
  <link rel="stylesheet" type="text/css" href="/static/css/reset.css">
  <link rel="stylesheet" type="text/css" href="/static/css/szone.css?ver=1.02">
  <script type="text/javascript" src="/static/js/jweixin-1.0.0.js"></script>
</head>
<body>
  <div class="mian">
    <div class="header"><img src="/static/images/szone/szoneheader2.jpg"></div>
    <div class="nav"><img src="/static/images/szone/szonenav1.jpg"></div>
    <div class="content">
      <div class="cloud cloud0"></div>
      <div class="cloud cloud1"></div>
      <div class="cloud cloud2"></div>
      <div class="cloud cloud4"></div>
      <div class="cloud cloud5"></div>
      <div class="cloud cloud6"></div>
      <div class="mobile mobile1"></div>
      <div class="mobile mobile2"></div>
      <div class="mobile mobile3"></div>
      <div class="mobile mobile4"></div>
      <p>点击下方相应球馆即可1元选场</p>
      <a href="http://m.quyundong.com/court/detail?id=1928&cid=1" target="_blank" class="btn" id="btnHai">海润羽毛球馆</a>
      <a href="http://m.quyundong.com/court/detail?id=16755&cid=1" target="_blank" class="btn" id="btnYu">羽胜羽毛球馆</a>
      <a href="http://m.quyundong.com/court/detail?id=1927&cid=1" target="_blank" class="btn" id="btnLong">龙兴翔羽毛球馆</a>
      <div class="nav"><img src="/static/images/szone/szonenav2.jpg"></div>
      <div class="textbox"><div class="texttitle"></div>
      <a href="http://www.quyundong.com/d" target="_black" class="Downbuttom">下载APP体验</a>
        <ul>友情提示：
          <li>1. 新老用户均可参与</li>
          <li>2. 每个用户仅限使用一个名额</li>
          <li>3. 不可与其他优惠（含代金券）同享</li>
          <li>4. 活动时间：2015年7月20日-7月26日即可抢购</li>
          <li>5. 适用于趣运动APP内下单并指定的三个羽毛球馆，<br>即海润羽毛球馆，羽胜羽毛球馆，龙兴翔羽毛球馆</li>
        </ul>
      </div>
    </div>
  </div>
  <script type="text/javascript" src="/static/js/zeptoWithFx.min.js"></script>
  <script type="text/javascript">
    var myURL = window.location.href.split('#')[0];
    var shareUrl = window.location.href.split('?')[0];
    var shareUrlHost = window.location.host;
    var shareImgUrl = 'http://' + window.location.host + '/static/images/szone/oneyueshare.jpg';
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

    //微信config用
  var enURL = encodeURIComponent(myURL);
  //微信检查并开启微信config 
  if(isWeixin()){
    // alert("在用微信 "+ver);
    wxConfigToken (enURL);
  }else if(isApp(myURL)){
    btnChange();
    // alert("不是微信 "+ver);
    // wxConfigToken (enURL);
  }

  //微信config ok后启用
  wx.ready(function(){

      // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
      wx.onMenuShareTimeline({
          title: '1元包球场，任性这一次，趣运动包场钜惠，我在深圳等你！', // 分享标题
          link: shareUrl, // 分享链接
          imgUrl: shareImgUrl, // 分享图标
          success: function () { 
              // 用户确认分享后执行的回调函数
              // alert("success");
              console.log("success");
          },
          cancel: function () { 
              // 用户取消分享后执行的回调函数
              // alert("cancel");
          }
      });

      wx.onMenuShareAppMessage({
          title: '1元包球场，任性这一次，趣运动包场钜惠，我在深圳等你！', // 分享标题
          desc: '本月7月25.26号，运动订场神器-趣运动就将会在深圳推出1元订场活动，快邀请朋友一起来吧！', // 分享描述
          link: shareUrl, // 分享链接
          imgUrl: shareImgUrl, // 分享图标
          type: 'link', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () { 
              // 用户确认分享后执行的回调函数
              // alert("success");
            console.log("success");
          },
          cancel: function () { 
              // 用户取消分享后执行的回调函数
              // alert("cancel");
          }
      });

  });
  // 微信config
  function wxConfigToken (url){
    var xhr = new XMLHttpRequest();
    var url = url;
    // console.log(url);
    xhr.open('get', '../NmbApi/GetWeixinToken/?url='+url
      );
          
        // xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                result = JSON.parse(xhr.response);
                // console.log(3,result);
                // console.log(result.data.timestamp - 0 ,result.data.noncestr,result.data.sha_sign,result.data.jsapi_ticket);
                wx.config({
                      //debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                      appId: 'wxe37215df86f33faa', // 必填，公众号的唯一标识
                      timestamp: result.data.timestamp - 0 , // 必填，生成签名的时间戳
                      nonceStr: result.data.noncestr, // 必填，生成签名的随机串
                      signature: result.data.sha_sign,// 必填，签名，见附录1
                      jsApiList: [
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareWeibo',
                        'hideMenuItems',
                        'showMenuItems',
                        'hideAllNonBaseMenuItem',
                        'showAllNonBaseMenuItem',
                        'translateVoice',
                        'startRecord',
                        'stopRecord',
                        'onRecordEnd',
                        'playVoice',
                        'pauseVoice',
                        'stopVoice',
                        'uploadVoice',
                        'downloadVoice',
                        'chooseImage',
                        'previewImage',
                        'uploadImage',
                        'downloadImage',
                        'getNetworkType',
                        'openLocation',
                        'getLocation',
                        'hideOptionMenu',
                        'showOptionMenu',
                        'closeWindow',
                        'scanQRCode',
                        'chooseWXPay',
                        'openProductSpecificView',
                        'addCard',
                        'chooseCard',
                        'openCard'
                      ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                  });
                
            }
        }
    xhr.send();
  }
    //微信判别
  function isWeixin (){
    if(window.navigator.userAgent.indexOf("MicroMessenger") === -1 ){
      return false;
    }else{return true}
  }
    //app判别
  function isApp (url){
    if(url.indexOf("gosportapp") === -1 ){
      return false;
    }else{return true}
  }

  function btnChange(){
    console.log("change");
    $("#btnHai").attr({"href":"gosport://business_detail?business_id=1928&category_id=1"});
    $("#btnYu").attr({"href":"gosport://business_detail?business_id=16755&category_id=1"});
    $("#btnLong").attr({"href":"gosport://business_detail?business_id=1927&category_id=1"});
    // $(".Downbuttom").attr({"href":"gosport://business_detail?business_id=16681&category_id=1"});
    $(".Downbuttom").css({"display":"none"});
  }
  </script>
</body>
</html>