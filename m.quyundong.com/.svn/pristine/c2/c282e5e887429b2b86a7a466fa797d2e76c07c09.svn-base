<template>
  <div class="sf-container">
    <div class="sf-selection">
      <div class="sf-selection-title">报名项目</div>
      <Signup-check :Signup-check-data="SignupCheckData"></Signup-check>
      <div class="sf-info">
        <div class="sf-info-title">参与者信息录入</div>
        <Signup-input  :inputinfo="SignupInfo" :b-light-on="bFormEmpty" :value-arr="valueArr"></Signup-input>
        <p class="sf-info-protocol"><label for="sfObey"><input type="checkbox" id="sfObey" name="" value="" v-model="hasRead">我已阅读并接受</label><span style="text-decoration: underline;" @click="toReadprotocolHandel">《报名须知》</span></p>
        <!-- <p class="sf-info-protocol" style="color:red">报名成功后，主办方将在比赛前发送短信通知</p> -->
      </div>
      <div class="sf-money">
        <div class="sf-signupNum clearfix">
          <div>报名人数：</div>
          <div class="sf-signupNumSelect">
            <span :class="{disable:signup.subDisable}" @click='subHandle'></span>
            <span>{{signup.signupNum}}</span>
            <span :class="{disable:signup.addDisable}" @click="addHandle"></span>
          </div>
        </div>
        <div class="clearfix">
          <div>报名金额：</div>
          <div class="sf-money-amount">￥{{signup.signupNum * signup.amount}}</div>
        </div>
      </div>
      <div class="sf-submit"><div @click="applyHandel" :class='{disabled : bFormEmpty || !hasRead }'>提交</div></div>
    </div>
  </div>
  <Signup-confirm-order :b-confirm-order-show="bConfirmOrderShow" :order-info="orderInfo"></Signup-confirm-order>
  <Signup-needknow :needknow="needknow" ></Signup-needknow>
</template>

<script>
import SignupCheck from "./SignupCheck.vue";
import SignupInput from "./SignupInput.vue";
import SignupConfirmOrder from './SignupConfirmOrder.vue'
import SignupNeedknow from "./SignupNeedknow.vue";

export default {

  name: 'SignupForm',

  components: {
    SignupCheck,SignupInput,SignupConfirmOrder,SignupNeedknow
  },
  props:{
    bodyWidth:Number
  },
  data () {
    return {
      SignupCheckData:{
        status:true,
        list:[{id:"type1",type:"羽毛球特训营"}]
      },
      money:0,
      SignupInfo:[{"width":"100%","inputstyle":1,"placeholder":"请输入参赛者的姓名"},
          {"width":"100%","inputstyle":1,"placeholder":"请输入参赛者的手机号"},
          {"width":"1.53rem","inputstyle":2,"placeholder":"请输入手机验证码"}],
      bFormEmpty:true,
      valueArr:[],
      bConfirmOrderShow:false,
      orderInfo:null,
      hasRead:false,
      needknow:{
        bshow:false,
        list:["返现优惠规则：2人或以上报名可返现50元/人，优惠金额将于活动截止报名当天返现至报名使用的趣运动账户内，优惠金额不可提现，可用于趣运动任何业务消费。",
              "成功支付报名费用视为报名成功。",
              "报名成功并接到特训通知后，请准时到名狮羽毛球馆前台签到参与特训，若特训当天未能如期出席，费用将不予以退还。",
              "特训球友需要自带装备。",
              "如有疑问，可咨询4000-410-480"
            ]
      },
      signup:{
        signupNum:1,
        subDisable:true,
        addDisable:document.body.getAttribute("data-surplues") > 1 ? false : true,
        limitNum:document.body.getAttribute("data-surplues"),
        amount:350
      }
    }
  },
  events:{
    "Signup-input"(msg){
      this.$set("bFormEmpty",msg);
    },
    "Signup-confirm-order"(msg){
      if(typeof msg === 'boolean'){
        this.$set("bConfirmOrderShow",msg);
      }else{
        this.signup.limitNum = msg;
        this.signup.signupNum = 1;
        this.clickDisable();
      }
    }
  },
  methods: {
    
    applyHandel(evt){
      // if(evt.target.className === "disabled") return;
      var startind = 1;
      var joinName = "",joinPhone="",smscode="";

      if(!this.$commonTool.checkName(this.valueArr[0])){
          this.$root.showErrorShow("请输入正确的姓名");
          return;
      }
      joinName = this.valueArr[0];

      if(!this.$commonTool.checkPhone(this.valueArr[startind])){
        this.$root.showErrorShow("请输入正确的手机号");
          return;
      }
      joinPhone = this.valueArr[startind++];

      if(!this.$commonTool.checkCode(this.valueArr[startind],5)){
        this.$root.showErrorShow("请输入正确的验证码");
          return;
      }

      if(!this.hasRead){
        this.$root.showErrorShow("请先阅读报名须知");
          return;
      }

      smscode = this.valueArr[startind];

      this.bConfirmOrderShow = true;
      this.orderInfo = {
          money:this.signup.signupNum * this.signup.amount,
          project:"羽毛球特训营",
          name:joinName,
          number:this.signup.signupNum,
          tel:joinPhone,
          smscode:smscode
      };
    },
    toReadprotocolHandel(){
      this.needknow.bshow = true;
    },
    clickDisable(){
      if(this.signup.signupNum == 1){
        this.signup.subDisable = true;
      }else{
        this.signup.subDisable = false;
      }
      if(this.signup.signupNum == this.signup.limitNum){
        this.signup.addDisable = true;
      }else{
        this.signup.addDisable = false;
      }
    },
    subHandle(){
      if(this.signup.signupNum>1){
        this.signup.signupNum--;
        this.clickDisable();
      }
    },
    addHandle(){
      if(this.signup.signupNum < this.signup.limitNum){
        this.signup.signupNum++;
        this.clickDisable();
      }
    }
  }
}

</script>

<style lang="sass">
 .sf-container{
    border:3px solid #000;
    border-radius:0.1rem;
    padding-top:0.12rem;
    margin-bottom: 0.2rem;
    background-color: #fff;
    .sf-selection{
      padding:0.2rem 0.2rem 0;
      .sf-selection-title{
        font-size: 0.15rem;
        text-align: left;
      }
    }
    .sf-info{
      font-size: 0.15rem;
      padding-top:0.2rem;
      .sf-info-title{
        text-align: left;
        margin-bottom:0.2rem;
        color:#000000;
      }
      .sf-info-protocol{
        font-size:0.12rem;
        padding:0.1rem 0 0.2rem;
        input{
          margin-right: 0.03rem;
          position: relative;
          top:1px;
        }
      }
    }
    .sf-money{
      font-size: 0.18rem;
      color:#9fa0a0;
      text-align: left;
      padding:0.1rem 0.3rem;
      margin:0 -0.2rem;
      border-top:1px dashed #000;
      border-bottom:1px dashed #000;
      color:#000;

      >div{
        padding:0.1rem 0;
        div:nth-of-type(1){
          float:left;
          margin-right:0.1rem;
        }
        div:nth-of-type(2){
          span{
            height: 0.2rem;
            line-height: 0.2rem;
            padding:0.02rem 0.05rem;
            color:#000;
            float: left;
            background-repeat: no-repeat;
            background-position: center;
            background-size: 40% auto;
            text-align: center;
            &:nth-of-type(1),&:nth-of-type(3){
              width:0.22rem;
              position: relative;
              &:after{
                content:"";
                position:absolute;
                top:-0.2rem;
                bottom:-0.2rem;
                left:-0.2rem;
                right:-0.2rem;
              }
            }
            &:nth-of-type(1){
              background-image:url(/static/vue-h5-badminton-signup/images/sub.png);
              &.disable{
                background-image:url(/static/vue-h5-badminton-signup/images/sub-disable.png);
              }
            }
            &:nth-of-type(3){
              background-image:url(/static/vue-h5-badminton-signup/images/add.png);
              &.disable{
                background-image:url(/static/vue-h5-badminton-signup/images/add-disable.png);
              }
            }
            &:nth-of-type(2){
              font-size:0.15rem;
              width:0.4rem;
              overflow: hidden;
              border-left:1px solid #000;
              border-right:1px solid #000;
            }
          }
        }
      }
      .sf-signupNumSelect{
        border:1px solid #000;
        float: left;
      }
      .sf-money-amount{
        color:#e60012;
      }
    }
    .sf-submit{
      padding:0.2rem 0;
      div{
        width:1.33rem;
        line-height:0.4rem;
        font-size: 0.22rem;
        color:#000;
        border:0.02rem solid #000;
        background-color:#ffeb01;
        border-radius: 0.2rem;
        margin:0 auto;
        &.disabled{
          background-color:#9fa0a0;
          color:#fff;
        }
      }
    }
 }
</style>
