;
(function(d,w) {
  var wxtitle = d.getElementById('wxtitle') && d.getElementById('wxtitle').innerHTML
  var wxdesc = d.getElementById('wxdesc') && d.getElementById('wxdesc').innerHTML
  var wximgUrl = d.getElementById('wximgUrl') && d.getElementById('wximgUrl').innerHTML
  var wxlink = d.getElementById('wxlink') && d.getElementById('wxlink').innerHTML
  
    var myURL = window.location.href.split('#')[0];
    var enURL = encodeURIComponent(myURL);
    var shareImgUrl;
    if (wximgUrl.indexOf("//") === -1) {
        shareImgUrl = window.location.protocol + '//' + window.location.host + wximgUrl;
    } else {
        shareImgUrl = wximgUrl;
    }

    var shareData = {
        'setWxOnMenuShareTimeline': {
            title: wxtitle || '',
            link: wxlink || myURL,
            imgUrl: shareImgUrl,
            success: function() {},
            cancel: function() {}
        },
        'setWxOnMenuShareAppMessage': {
            title: wxtitle || '',
            desc: wxdesc || '',
            link: wxlink || myURL,
            imgUrl: shareImgUrl,
            type: '',
            dataUrl: '',
            success: function() {},
            cancel: function() {}
        }
    }


    var wxShare = {
        shareSetList: ['setWxOnMenuShareTimeline', 'setWxOnMenuShareAppMessage'],
        setShareData: function(obj) {
            for (var name in obj) {
                if (this[name]) {
                    this[name].shareData = obj[name]
                }
            }
        },
        setShareSetList: function(names) {
            names.forEach(function(item) {
                this.shareSetList.push(item)
            })
        },
        setWxOnMenuShareTimeline: function _setWxOnMenuShareTimeline() {
            wx.onMenuShareTimeline(_setWxOnMenuShareTimeline.shareData)
        },
        setWxOnMenuShareAppMessage: function _setWxOnMenuShareAppMessage() {
            wx.onMenuShareAppMessage(_setWxOnMenuShareAppMessage.shareData)
        },
        getToken: function wxConfigToken(url, successCallback) {
            var xhr = new XMLHttpRequest();
            var url = url;
            xhr.open('get', '/activity/GetWeixinToken/?url=' + url);

            // xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    successCallback(xhr.response)
                }
            }
            xhr.send();
        },
        successCallback: wxSuccessCallback,
        setWxReady: function() {
            var _this = this
            wx.ready(function() {
                _this.shareSetList.forEach(function(name) {
                    _this[name]()
                })
            })
        }
    }


    if (isWeixin()) {

        var wxShareNM = Object.create(wxShare)
        wxShareNM.successCallbackNM = function(res) {
            wxShareNM.successCallback(res)
            document.getElementById("loading") && document.getElementById("loading").setAttribute("data-lock", "1")
        }
        wxShareNM.setShareData(shareData)
        wxShareNM.setWxReady()
        wxShareNM.getToken(enURL, wxShareNM.successCallbackNM)

    } else {
        document.getElementById("loading") && document.getElementById("loading").setAttribute("data-lock", "1")
    }

    // function wxConfigToken

    function wxSuccessCallback(res) {
        var result = JSON.parse(res);
        wx.config({
            // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: 'wxe37215df86f33faa', // 必填，公众号的唯一标识
            timestamp: result.data.timestamp - 0, // 必填，生成签名的时间戳
            nonceStr: result.data.noncestr, // 必填，生成签名的随机串
            signature: result.data.sha_sign, // 必填，签名，见附录1
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

    function isWeixin() {
      if (window.navigator.userAgent.indexOf("MicroMessenger") === -1) {
          return false;
      } else {
          return true
      }
    }
  if(!w.wxShare) w.wxShare = wxShare

/*
 * gssdk
 */
var debug = false

    window.logDiv = document.createElement('div')
    window.logDiv.className = 'logDiv'
    window.logStyle = document.createElement('style')
    window.logStyle.innerHTML = ".logDiv{width:100%;height:150px;position:fixed;z-index:999999999;bottom:0;left:0;background-color:rgba(0,0,0,0.4);color:#fff;font-size:14px;overflow:scroll;}"
    if(debug){
        document.body.appendChild(window.logDiv)
        document.body.appendChild(window.logStyle)
    }
    
    window.logDiv.log = function(str){
      window.logDiv.innerHTML = logDiv.innerHTML + '<br>' + str
    }
 
 

var gsShareData = {
        'onMenuShareWxTimeline': {
            title: wxtitle || '趣运动',
            link: wxlink || myURL,
            imgUrl: shareImgUrl,
            success: function(data) {
                // alert('onMenuShareWxTimeline success')
                window.logDiv.log('onMenuShareWxTimeline success')
                window.logDiv.log('data==>'+JSON.stringify(data))
            },
            fail: function(data) {
                // alert('onMenuShareWxTimeline fail')
                window.logDiv.log('onMenuShareWxTimeline fail')
                window.logDiv.log('data==>'+JSON.stringify(data))
            }
        },
        'onMenuShareWxAppMessage': {
            title: wxtitle || '',
            desc: wxdesc || '',
            link: wxlink || myURL,
            imgUrl: shareImgUrl,
            success: function(data) {
                // alert('onMenuShareWxAppMessage success')
                window.logDiv.log('onMenuShareWxAppMessage success')
                window.logDiv.log('data==>'+JSON.stringify(data))
            },
            fail: function(data) {
                // alert('onMenuShareWxAppMessage fail')
                window.logDiv.log('onMenuShareWxAppMessage fail')
                window.logDiv.log('data==>'+JSON.stringify(data))
            }
        },
        'onMenuShareQQ': {
            title: wxtitle || '',
            desc: wxdesc || '',
            link: wxlink || myURL,
            imgUrl: shareImgUrl,
            success: function(data) {
                // alert('onMenuShareQQ success')
                window.logDiv.log('onMenuShareQQ success')
                window.logDiv.log('data==>'+JSON.stringify(data))
                
            },
            fail: function(data) {
                // alert('onMenuShareQQ fail')
                window.logDiv.log('onMenuShareQQ fail')
                window.logDiv.log('data==>'+JSON.stringify(data))
            }
        }
    }
if(window.Gs){
    Gs.ready(function(){
        Gs.setConfig && Gs.setConfig(gsShareData)
        Gs.showRightButton && Gs.showRightButton('true')
    })
    window.logDiv.log(Gs.version)
}


})(document,window)
