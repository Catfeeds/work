<template>
  <div class='signup-m' :style='signupStyle'>
  <div class="signup-index" :style='indexStyle' @touchstart='touchstartListener($event)' @touchmove='touchmoveListener($event)' @touchend='touchendListener($event)'>
    <div class="signup-index-logo"></div>
    <div class="signup-index-banner"></div>
    <!-- <p class="signup-index-p">
      世界冠军吴迪西助教亲身授教<br>快速提升高远球及后场移动步法技能<br>名额有限，报满即止！　　
    </p> -->
    <div class="signup-index-msg">
      <ul>
        <li><span>报名截止时间：</span>6月27日12:00</li>
        <li><span>特训时间：</span>6月27日～7月18日</li>
        <li><span>特训地点：</span>广州名狮羽毛球馆</li>
      </ul>
    </div>
    <!-- <div v-if='status == 0' style='margin: 0.3rem auto;color: red;'>活动名额已满</div> -->
    <div class="signup-index-nav">
      <div class="signup-index-rule" @click='gotoUrl("SignupInfo")'>活动规则</div>
      <div class="signup-index-myorder" @click='showOrder'>我的订单</div>
    </div>
    <div class="signup-index-tips">下拉底部点击报名</div>
    <div class="signup-index-next"></div>
  </div>
  <div class='page next-page' :style='pageStyle'>
    <div class="signup-next-page-avatar"></div>
    <div class="signup-next-page-name">龚卢平</div>
    <div class="signup-next-page-intro">
      <div class="signup-next-page-intro-head"></div>
      <div class="signup-next-page-intro-body" :style='change.body'>
        <b>教练简介：</b><br>
        江西省羽毛球专业队退役运动员，弘达羽毛球总教练。<br>
        99年加入体校，03年进入江西省专业队，06年加入国家青年队集训，曾受前世界冠军熊国宝、钱平指导训练。<br>
        曾获得2015年广州体育学院“双巴塔杯”羽毛球锦标赛专项组男子单打第三名，<br>
        在广州“市长杯”羽毛球混合团体赛、广东省第五届工作运动会羽毛球比赛、“广汽杯”广州市工会干部羽毛球邀请赛、羽坛英雄榜·奥立弗杯团体总决赛、天河城川崎“商协杯”羽毛球赛中多次获得团体/单打冠、亚军，<br>
        10年开始从事羽毛球教练工作至今。<br>
      </div>
      <div class="signup-next-page-intro-foot" :style='change.button' @click='changeEvent'></div>
    </div>
    <div class="signup-next-page-info">
      <b>特训内容：</b><br>
      06/27第1课时：正反手网前球处理技能<br>
      07/04第2课时：后场高远球分节发力技能<br>
      07/11第3课时：网前步伐技能<br>
      07/18第4课时：后场步伐技能<br>
      每周一 晚上8点-10点<br>
      <br>
      报名要求：羽毛球爱好者<br>
      报名费用：350元/人
    </div>
    <div class="signup-next-page-signup" @click='gotoUrl("Signup")' v-if='status == 1'></div>
    <div class="signup-tips">报名2人以上即可返现</div>
    <div v-if='status == 0' style='margin: 0.3rem auto;color: red;'>活动已经过期</div>
    <div v-if='status == 2' style='margin: 0.3rem auto;color: red;'>活动名额已满</div>
  </div>
 <!--  <signup-msg-box :msg='msg'></signup-msg-box> -->
  <signup-check-box :my-order='duData'></signup-check-box>
  <signup-my-order :my-order='myOrder'></signup-my-order>
  </div>
</template>

<script>
// import SignupMsgBox from './SignupMsgBox.vue';
import SignupMyOrder from './SignupMyOrder.vue';
import SignupCheckBox from './SignupCheckBox.vue';

export default {

  name: 'SignupIndex',

  components: {
    // SignupMsgBox,
    SignupMyOrder,
    SignupCheckBox,
  },
  ready(){
    if(this.firstMeet == true && this.status == '0'){
      this.firstMeet = false 
      alert('活动已经过期')
    }else if(this.firstMeet == true && this.status == '2'){
      this.firstMeet = false 
      alert('活动名额已满')
    }
  },
  props:{
    bodyHeight:Number,
    bodyWidth:Number
  },
  computed:{
    change(){
      if(this.nextState){
        return {
          button:{transform:'rotateZ(180deg)'},
          body:{height:'9em'}
        }
      }else{
        return {
          button:{transform:'rotateZ(0deg)'},
          body:{height:'auto'}
        }
      }
    },
    signupStyle(){
      return {
        width:this.bodyWidth + 'px',
        height:this.bodyHeight + 'px',
      }
    },
    indexStyle(){
      return {
        height:this.bodyHeight + 'px'
      }
    },
    pageStyle(){
      return {
        width:this.bodyWidth + 'px',
        // height:this.bodyHeight*2 + 'px',
        // transform:'translate3d(0,'+ this.bodyHeight +'px,0)'
      }
    },
    dmove(){
      if( this.indexTouchData.movePoint === null ) return 0
      return this.indexTouchData.startPoint - this.indexTouchData.movePoint
    },
    duData(){
      this.myOrder.checkBoxData.phone = this.myOrder.checkBoxData.phone.trim()
      this.myOrder.checkBoxData.checkNumber = this.myOrder.checkBoxData.checkNumber.trim()

      if(this.myOrder.check){
        this.myOrder.check = false
        if(this.checkCheckBoxData()){
          this.fetchMyOrderData()
        }
      }

      if(this.myOrder.getCode){
        
        this.myOrder.getCode = false
        this.getCode()
      }

      return this.myOrder
    },
  },
  data () {
    return {
      firstMeet:true,
      nextState:true,
      indexIsMoving:false,
      indexTouchData:{
        startPoint:null,
        movePoint:null,
        endPoint:null,
      },
      status:document.body.dataset.status,
      
      myOrder:{
        checkBoxShow:false,
        show:false,
        title:'我的订单',
        data:[],
        checkBoxData:{
          phone:"",
          checkNumber:"",
          text:"获取验证码"
        },
        getCode:false,
        canGetCheckCode:true,
        check:false
      }
    }
  },
  methods: {
    getCode(){
      var hash = this.$root.hash
      var phone = this.myOrder.checkBoxData.phone
      this.$fetchLoading({
        url: '/badminton/getsmscode?client_time='+ ~~(Date.now()/1000)+'&hash='+ hash +'&phone=' + phone , method: 'GET'
      },(response)=>{
        // console.log(response.data)
        // console.log(typeof response.data)
        let res = response.data
        let resData = response.data.data
        if(res.code == '1'){
          // this.showOrder()
          // this.$set('myOrder.data',resData)
          this.$root.showErrorShow('验证码已发送，60s内无需再次获取')
        }else{
          this.$root.showErrorShow(res.msg)
        }
        
      },(response)=> {
        if(!this.moneyGetData){
          this.$root.showErrorShow('网络不给力，请稍后重试')
        }
      },()=> {
        this.$root.loadingHide = false
      },()=> {
        this.$root.loadingHide = true
      })
    },
    checkCheckBoxData(){
      // console.log(this.$commonTool.checkPhone((this.myOrder.checkBoxData.phone)))
      if(!this.$commonTool.checkPhone((this.myOrder.checkBoxData.phone))){
        this.$root.showErrorShow('请输入正确的手机号码')
        return false
      }
      if(!this.$commonTool.checkCode((this.myOrder.checkBoxData.checkNumber),5)){
        this.$root.showErrorShow('请输入正确的手机验证码')
        return false
      }

      return true
    },
    changeEvent(){
      this.nextState = !this.nextState
    },
    touchstartListener(event){
      // console.log('s',event.touches[0].pageY)
      this.indexTouchData.startPoint = event.touches[0].pageY

    },
    touchmoveListener(event){
      // console.log('m',event.touches[0].pageY)
      this.indexTouchData.movePoint = event.touches[0].pageY
      // console.log(this.dmove)
      if(this.dmove > 0 && window.scrollY === 0){
        event.preventDefault()
      }
    },
    touchendListener(event){
      if(this.dmove > 0 && this.indexIsMoving === false && window.scrollY === 0 && event.target.className != 'signup-index-rule' && event.target.className != 'signup-index-myorder' ){
        this.changeScrollTo()
      }
      // console.log('e',event.target.className)
    },
    changeScrollTo(){
      this.indexIsMoving = true
      let timer = null
      let start = window.scrollY
      let end = this.bodyHeight
      let dy = end - start
      let time = 300
      let stepTime = ~~(1000/40)
      let step = time / stepTime
      let dstep = dy / step
      let startTime = Date.now()
      timer = setInterval(()=>{
        if(this.indexIsMoving == false) return false
        if(window.scrollY + dstep >= end){
          window.scrollTo(0,end)
          // console.log('time:',Date.now() - startTime)
          this.indexIsMoving = false
          clearInterval(timer)
        }else{
          window.scrollTo(0,window.scrollY + dstep)
        }
        
      },stepTime)
      
    },
    gotoUrl(name){
      this.$route.router.go({
        name:name
      })
    },

    showMsg(){
      document.body.style.overflowY = 'hidden'
      window.scrollTo(0, 0)
      this.msg.show = true
    },
    showOrder(){
      document.body.style.overflowY = 'hidden'
      window.scrollTo(0, 0)
      // this.myOrder.show = true
      this.myOrder.checkBoxShow = true
    },
    showOrderMsg(){
      document.body.style.overflowY = 'hidden'
      window.scrollTo(0, 0)
      this.myOrder.show = true
      // this.myOrder.checkBoxShow = true
    },
    fetchMyOrderData(){
      var hash = this.$root.hash
      var phone = this.myOrder.checkBoxData.phone
      var checkNumber = this.myOrder.checkBoxData.checkNumber
      this.$fetchLoading({
        url: '/badminton/gettrainingorder?client_time='+ ~~(Date.now()/1000)+'&hash='+ hash + '&phone=' + phone + '&sms_code=' + checkNumber, method: 'GET'
      },(response)=>{
        // console.log(response.data)
        // console.log(typeof response.data)
        let res = response.data
        let resData = response.data.data
        if(res.code == '1'){
          this.myOrder.checkBoxShow = false
          this.showOrderMsg()
          this.$set('myOrder.data',resData)
        }else if(res.code == '5001'){
          window.location.href = res.data.redirect_url
        }else{
          this.$root.showErrorShow(res.msg)
        }
        
      },(response)=> {
        if(!this.moneyGetData){
          this.$root.showErrorShow('网络不给力，请稍后重试')
        }
      },()=> {
        this.$root.loadingHide = false
      },()=> {
        this.$root.loadingHide = true
      })
    }
  }
}

</script>

<style lang="sass">
@import '../sass/base';
@keyframes animateA {
    from {
        bottom:0.25rem;
    }
    to {
        bottom:0.3rem;
    }
}
@-webkit-keyframes animateA {
    from {
        bottom:0.25rem;
    }
    to {
        bottom:0.3rem;
    }
}
@keyframes animateB {
    from {
        bottom:0.08rem;
    }
    to {
        bottom:0.12rem;
    }
}
@-webkit-keyframes animateB {
    from {
        bottom:0.08rem;
    }
    to {
        bottom:0.12rem;
    }
}
.next-page{
  width:100%;
  color:#684260;
  font-size: pxToRem(30px);
  padding-bottom:pxToRem(30px);
  .signup-next-page-avatar{
    margin:pxToRem(40px) auto;
    margin-top: pxToRem(80px);
    width: pxToRem(180px);
    height: pxToRem(180px);
    border-radius: 50%;
    background:transparent url('/static/vue-h5-badminton-signup/images/avatar.png') left top / cover no-repeat;
  }
  .signup-next-page-name{
    text-align: center;
  }
  .signup-next-page-intro{
    background-color: #fff;
    width:90%;
    border:1px solid #684260;
    border-radius:10px;
    padding-bottom: pxToRem(80px);
    margin:pxToRem(30px) auto;
    position: relative;
    .signup-next-page-intro-head{
      width:100%;
      height:pxToRem(100px);
      border-bottom: 1px dashed #684260;
      background:transparent url('/static/vue-h5-badminton-signup/images/head.png') left 5% bottom / auto pxToRem(87px)  no-repeat;
    }
    .signup-next-page-intro-body{
      width:100%;
      padding:pxToRem(30px);
      box-sizing:border-box;
      overflow: hidden;
      height: auto;
      text-align: left;
      line-height: 1.7;
    }
    .signup-next-page-intro-foot{
      animation: animateB 0.6s linear 0s infinite alternate;
      -webkit-animation: animateB 0.6s linear 0s infinite alternate;
      width: pxToRem(40px);
      height: pxToRem(40px);
      background:transparent url('/static/vue-h5-badminton-signup/images/foot.png') left top / cover no-repeat;
      position: absolute;
      bottom:pxToRem(20px);
      right:pxToRem(20px);
      transition:all 0.3s linear 0s;
    }
  }
  .signup-next-page-info{
    width:90%;
    border:1px dashed #684260;
    padding:pxToRem(30px);
    box-sizing:border-box;
    background-color: #fff;
    margin:pxToRem(60px) auto;
    border-radius:10px;
    text-align: left;
    line-height: 1.7;
  }
  .signup-next-page-signup{
    margin:pxToRem(60px) auto;
    width:pxToRem(240px);
    height:pxToRem(92px);
    background:transparent url('/static/vue-h5-badminton-signup/images/signup.png') left top / cover no-repeat;
  }
}
.signup-index{
  width:100%;
  overflow-x:hidden; 
  position: relative;
  z-index:9;
  color:#684260;
  font-size: pxToRem(30px);
  min-height:pxToRem(800px);
  .signup-index-tips{
    width:100%;
    display:block;
    position: absolute;
    bottom:pxToRem(30px);
    font-size:0.12rem;
    color:#000;
  }
  .signup-index-next{
    animation: animateA 0.6s linear 0s infinite alternate;
    -webkit-animation: animateA 0.6s linear 0s infinite alternate;
    width:pxToRem(40px);
    height:pxToRem(40px);
    position: absolute;
    bottom:pxToRem(50px);
    left:50%;
    margin-left: pxToRem(-20px);
    background:transparent url('/static/vue-h5-badminton-signup/images/next.png') left top / 100% auto  no-repeat;

  }
  .signup-index-logo{
    width:pxToRem(216px);
    height:pxToRem(84px);
    margin:0 auto;
    margin-top: pxToRem(30px);
    background:transparent url('/static/vue-h5-badminton-signup/images/logo.png') left top / cover  no-repeat;
  }
  .signup-index-banner{
    width:pxToRem(730px);
    height:pxToRem(480px);
    margin:0 auto;
    /*border-top: pxToRem(50px) solid transparent;*/
    background:transparent url('/static/vue-h5-badminton-signup/images/banner2.png') left top / cover  no-repeat;
  }
  .signup-index-p{
    box-sizing:border-box;
    padding:pxToRem(30px) pxToRem(116px);
    color:#fee14f;
    text-align:left;
  }
  .signup-index-msg{
    margin: pxToRem(40px) pxToRem(80px) 0;
    border: 1px solid #000;
    border-radius: 10px;
    padding:pxToRem(30px) 0;
    color:#000;
    li{
      width: 100%;
      padding-left: pxToRem(280px);
      box-sizing:border-box;
      position: relative;
      text-align: left;
      margin:pxToRem(30px) auto;
      span{
        position: absolute;
        top:0;
        left:pxToRem(30px);
      }
    }
  }
  .signup-index-nav{
    margin-top: pxToRem(50px);
    width: 100%;
    color:#000;
    /* position: absolute;
    bottom:pxToRem(120px); */
    .signup-index-rule,.signup-index-myorder{
      width: pxToRem(210px);
      height: pxToRem(79px);
      line-height:pxToRem(65px);
      display: inline-block;
      margin:0 pxToRem(80px);
      background:transparent url('/static/vue-h5-badminton-signup/images/button.png') left top / contain no-repeat;
    }
    /* .signup-index-rule{
      background:transparent url('/static/vue-h5-badminton-signup/images/rule.png') left top / contain no-repeat;
    }
    .signup-index-myorder{
      background:transparent url('/static/vue-h5-badminton-signup/images/order.png') left top / contain no-repeat;
    } */
  }
}
.signup-tips{
  font-size:pxToRem(24px);
  color:#cd0909;
  margin-top: pxToRem(-30px);
}
</style>
