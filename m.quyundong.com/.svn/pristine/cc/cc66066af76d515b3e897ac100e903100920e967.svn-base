;(function(wxtitle,wxdesc,wximgUrl){
  // var _title = "广深人民的福利！一张卡游遍全城游泳馆！";
  // var _desc = "仅88元，公司旁，家附近，心仪游泳馆随便去~这个夏天浪个够！";
  // var _imgUrl = "/static/dongclub_active/web/images/dongclub_share.jpg";
  var myURL = window.location.href.split('#')[0];
  var shareUrl = window.location.href.split('?')[0];
  var shareImgUrl = 'http://' + window.location.host + wximgUrl;
  console.log(wxtitle,wxdesc,wximgUrl);
  //微信config用
  var enURL = encodeURIComponent(myURL);
  //微信检查并开启微信config 
  if(isWeixin()){
    // alert("在用微信 "+ver);
    wxConfigToken (enURL);
  }else{
     document.getElementById("loading").setAttribute("data-lock","1");
    // alert("不是微信 "+ver);
    // wxConfigToken (enURL);
  }

  //微信config ok后启用
  wx.ready(function(){
      // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
      wx.onMenuShareTimeline({
          title: wxtitle, // 分享标题
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
          title: wxtitle, // 分享标题
          desc: wxdesc, // 分享描述
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
    xhr.open('get', '../activity/GetWeixinToken/?url='+url
      );
          
        // xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                result = JSON.parse(xhr.response);
                document.getElementById("loading").setAttribute("data-lock","1");
                // console.log(result);
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
  //   //app判别
  // function isApp (url){
  //   if(url.indexOf("gosportapp") === -1 ){
  //     return false;
  //   }else{return true}
  // }
})(document.getElementById('wxtitle').innerHTML,document.getElementById('wxdesc').innerHTML,document.getElementById('wximgUrl').innerHTML)
