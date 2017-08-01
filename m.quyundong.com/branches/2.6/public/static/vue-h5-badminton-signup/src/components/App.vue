<template>
  <div id="wrapper">
    <!-- header -->
    <section id="loading" class="loading" :class="{ 'hide' : loadingHide }" data-venue-id='{{ venuesId }}'>
      <div class="loading-icon" style="background-image:url(/static/vue-h5-badminton-signup/images/loading.png)"></div>
    </section>
    <!-- main view -->
    <router-view
      class="view"
      keep-alive
      transition
      transition-mode="out-in"
      :body-height='bodyHeight'
      :body-width='bodyWidth'>
    </router-view>
    <!-- error -->
    <section id='errorMsg' class='wxr-error-msg' :class="{ 'hide' : errorHide ,'show' : errorShow}">
      {{ errorMsg }}
    </section>
  </div>
</template>

<script>
export default {

  name: 'App',
  data () {
    return {
      bodyHeight:null,
      isWeChat: window.navigator.userAgent.indexOf("MicroMessenger") === -1 ? false : true,
      hash:document.body.dataset.hash,
      loadingHide:false,
      errorHide:true,
      errorShow:false,
      errorMsg:'',
      bodyWidth:null,
      myURL:window.location.href.split('#')[0],
      shareUrl:window.location.href.split('?')[0],
      shareImgUrl:window.location.origin + '/static/vue-h5-badminton-signup/images/share.jpg',
      wxtitle:"羽毛球特训营第3期招募开始啦！",
      wxdesc:"你离羽毛球高手只差一步，赶紧来报名吧！"
    }
  },
  computed:{
    enURL(){
      return encodeURIComponent(this.myURL)
    }
  },
  ready(){
    this.mobileResponsive()
    this.wxr()
  },
  methods: {
    wxr(){
      if(!this.isWeChat){
        this.loadingHide = true
      }else{
        this.wxConfigToken(this.enURL)
        this.wxShare(this.wxtitle,this.wxdesc,this.myURL,this.shareImgUrl)
      }
    },
    wxConfig(timestamp,nonceStr,signature){
      // console.log(timestamp,nonceStr,signature)
      wx.config({
            // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: 'wxe37215df86f33faa', // 必填，公众号的唯一标识
            timestamp: Number(timestamp), // 必填，生成签名的时间戳
            nonceStr: nonceStr, // 必填，生成签名的随机串
            signature: signature,// 必填，签名，见附录1
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
    },
    wxShare(wxtitle,wxdesc,myURL,shareImgUrl){
      wx.ready(()=>{
          // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
          wx.onMenuShareTimeline({
              title: wxtitle, // 分享标题
              link: myURL, // 分享链接
              imgUrl: shareImgUrl, // 分享图标
              success:  () => { 
                  // 用户确认分享后执行的回调函数
                  // alert("success");
                  // console.log("success");
                  // this.$http({url:'/badminton/share?client_time='+ ~~(Date.now()/1000)+'&hash='+ this.hash,method: 'GET'}).then((res)=>{
                  //   console.log(res.data)
                  // },(res)=>{
                  //   console.log(res.data)
                  // })
                  
              },
              cancel: function () { 
                  // 用户取消分享后执行的回调函数
                  // alert("cancel");
              }
          });

          wx.onMenuShareAppMessage({
              title: wxtitle, // 分享标题
              desc: wxdesc, // 分享描述
              link: myURL, // 分享链接
              imgUrl: shareImgUrl, // 分享图标
              type: 'link', // 分享类型,music、video或link，不填默认为link
              dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
              success: ()=> { 
                  // 用户确认分享后执行的回调函数
                  // alert("success");
                // console.log("success");
                // this.$http({url:'/badminton/share?client_time='+ ~~(Date.now()/1000)+'&hash='+ this.hash,method: 'GET'}).then((res)=>{
                //   console.log(res.data)
                // },(res)=>{
                //   console.log(res.data)
                // })
              },
              cancel: function () { 
                  // 用户取消分享后执行的回调函数
                  // alert("cancel");
              }
          });

      });
    },
    wxConfigToken(url){
      this.$http({url:'/activity/getweixintoken?url='+url,method: 'GET'}).then((res)=>{
        let result = res.data.data
        this.loadingHide = true
        this.wxConfig(result.timestamp,result.noncestr,result.sha_sign)
      },(res)=>{
        this.showErrorShow(res.msg)
      })
    },
    mobileResponsive(){
      
        let windowWidth = document.body.clientWidth;
        let windowHeight = document.body.clientHeight;
        let designWidth = document.body.getAttribute("data-design-width") || 640;
        let designdpr = document.body.getAttribute("data-design-dpr") || 2;
        let setFontSize = () => {
          windowWidth = document.body.clientWidth;
          windowHeight = document.body.clientHeight;
          this.$set('bodyWidth',windowWidth)
          this.$set('bodyHeight',windowHeight)
          if(windowWidth > designWidth){
            windowWidth = designWidth;
          }
          document.getElementsByTagName('html')[0].style.fontSize = (100/(designWidth/designdpr)) * windowWidth + "px";
        }

        
        setTimeout(setFontSize,100);

        window.addEventListener('resize',setFontSize);

        
      },
    showErrorShow(msg){
      this.errorMsg = msg
      this.errorHide = false
      setTimeout(
        ()=>{ 
          this.errorShow = true 
          setTimeout(
            ()=>{ 
              this.errorMsg = ''
              this.errorShow = false 
              setTimeout(
                ()=>{
                  this.errorHide = true
                }
              ,100)
            }
          ,1000)
        }
      ,0)
    }
  }

  ,
  filters:{
    
  }
}

</script>

<style lang="sass">
@import '../sass/normalize';
@import '../sass/common';

  .wxr-error-msg{
    width:2rem;
    font-size: 16px;
    text-align: center;
    top:50%;
    left:50%;
    background-color: #000;
    color:#fff;
    padding:0.2rem;
    opacity: 0;
    transition:all 0.1s linear 0s;
    /* border:1px solid #ccc; */
    box-shadow: 0px 0px 2px 2px rgba(0,0,0,0.1);
    border-radius: 5px;
    transform:translate3d(-50%,-50%,0px) scale(3);
    transform-origin:center center;
    position: fixed;
    z-index:99999;
    &.show{
      opacity: 1;
      transform:translate3d(-50%,-50%,0px) scale(1);
    }
  }
</style>
