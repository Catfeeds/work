<template>
  <div class="sf-container">
    <div class="sf-selection">
      <div class="sf-selection-title">选择比赛项目</div>
      <Signup-check :Signup-check-data="SignupCheckData"></Signup-check>
      <div class="sf-info">
        <div class="sf-info-title">参赛者信息录入</div>
        <Signup-input  :inputinfo="SignupInfo[selected==3?1:0]" :b-light-on="bLightOn" :value-arr="valueArr"></Signup-input>
        <p class="sf-info-protocol"><label for="sfObey"><input type="checkbox" id="sfObey" name="" value="" v-model="hasRead">我已阅读并接受</label><span style="text-decoration: underline;" @click="toReadprotocolHandel">《自愿参加责任书》</span></p>
      </div>
      <div class="sf-money"><span>报名费用</span><span>￥{{money}}</span></div>
      <div class="sf-submit"><div @click="applyHandel" :class='{disabled : bLightOn || !hasRead}'>提交</div></div>
    </div>
  </div>
  <Signup-confirm-order :b-confirm-order-show="bConfirmOrderShow" :order-info="orderInfo"></Signup-confirm-order>
  <Signup-msg-box :msg='msg'></Signup-msg-box>
</template>

<script>
import SignupCheck from "./SignupCheck.vue";
import SignupInput from "./SignupInput.vue";
import SignupConfirmOrder from './SignupConfirmOrder.vue'
import SignupMsgBox from "./SignupMsgBox.vue";

export default {

  name: 'SignupForm',

  components: {
    SignupCheck,SignupInput,SignupConfirmOrder,SignupMsgBox
  },
  props:{
    bodyWidth:Number
  },
  data () {
    return {
      SignupCheckData:{status:null,
        list:[{id:"nvdan",type:"女子单打",bFull:(window.typeStatus.women_single == 0 ? true : false),bSelected:false},
                             {id:"nandan",type:"男子单打",bFull:(window.typeStatus.men_single == 0 ? true : false),bSelected:false},
                             {id:"nanshuang",type:"男子双打",bFull:(window.typeStatus.men_double == 0 ? true : false),bSelected:false}]},
      money:0,
      SignupInfo:[
        [{"width":"100%","inputstyle":1,"placeholder":"请输入参赛者的姓名"},
          {"width":"100%","inputstyle":1,"placeholder":"请输入参赛者的手机号"},
          {"width":"1.53rem","inputstyle":2,"placeholder":"请输入手机验证码"}],
        [ {"width":"100%","inputstyle":1,"placeholder":"请输入参赛者1的姓名"},
          {"width":"100%","inputstyle":1,"placeholder":"请输入参赛者2的姓名"},
          {"width":"100%","inputstyle":1,"placeholder":"请输入参赛者的手机号"},
          {"width":"1.53rem","inputstyle":2,"placeholder":"请输入手机验证码"}],
      ],
      selected:0,
      bLightOn:true,
      valueArr:[],
      bConfirmOrderShow:false,
      orderInfo:null,
      hasRead:false,
      msg:{
        show:false,
        title:'自愿责任书',
        p:['1、我完全了解自己的身体状况，确认自己的健康状况良好；没有任何身体不适或疾病（包括先天性心脏病、风湿性心脏病、高血压、脑血管疾病、心肌炎、其他心脏病、冠状动脉病、严重心律不齐、血糖过高或过低的糖尿病、以及其它不适合相关运动的疾病），因此我郑重声明，可以正常参加菩众体育文化发展有限公司组织的秦皇岛国际马拉松比赛期间的一系列活动。',
        '2、我充分了解本次活动期间的训练和比赛有潜在的危险，以及可能由此而导致的受伤或事故，我会竭尽所能，以对自己的安全负责任的态度参加此次活动。',
        '3、我本人愿意遵守本次比赛活动的所有规则规定；如果本人在参赛过程中发现或注意到任何风险和潜在风险，本人将立刻终止参加活动或告之活动组织者。',
        '4、我本人以及我的继承人、代理人、个人代表或亲属将放弃追究所有导致伤残、损失或死亡的权利。',
        '5、我同意接受主办方在活动或比赛期间提供的现场急救性质的医务治疗，但在医院救治等发生的相关费用由本人负担。',
        '6、本人已认真阅读全面理解以上内容，且对上述所有内容予以确认并承担相应的法律责任，本人签署此责任书纯属自愿。'
        ]
      }
    }
  },
  events:{
    "Signup-check"(msg){
      if(msg == "nvdan"){
        this.$set('selected',1);
        this.$set('money',50);
      }else if(msg == "nandan"){
        this.$set('selected',2);
        this.$set('money',50);
      }else if(msg == "nanshuang"){
        this.$set('selected',3);
        this.$set('money',100);
      }
      this.$set("valueArr",[]);
      this.$set("bLightOn",true);
    },
    "Signup-input"(msg){
      this.$set("bLightOn",msg);
    },
    "Signup-confirm-order"(msg){
      this.$set("bConfirmOrderShow",msg);
    }
  },
  ready(){
    if(this.selected==0){
      for(var i in this.SignupCheckData.list){
        if(!this.SignupCheckData.list[i].bFull){
          this.$set("selected",~~i+1);
          this.SignupCheckData.list[i].bSelected=true;
          this.money = (~~i+1==3) ? 100 : 50;
          break;
        }
      }
    }
  },
  methods: {
    
    applyHandel(evt){
      // if(evt.target.className === "disabled") return;
      var startind = this.selected == 3 ? 2 : 1;
      var joinName = "",joinPhone="",smscode="";
      if(this.selected == 3){
        if(!this.$commonTool.checkName(this.valueArr[0]) || !this.$commonTool.checkName(this.valueArr[1])){
            this.$root.showErrorShow("请输入正确的姓名");
            return;
        }
        joinName = this.valueArr[0] + "," + this.valueArr[1];
      }else{
        if(!this.$commonTool.checkName(this.valueArr[0])){
            this.$root.showErrorShow("请输入正确的姓名");
            return;
        }
        joinName = this.valueArr[0];
      }            
      if(!this.$commonTool.checkPhone(this.valueArr[startind])){
        this.$root.showErrorShow("请输入正确的手机号");
          return;
      }
      joinPhone = this.valueArr[startind++];

      if(!this.$commonTool.checkCode(this.valueArr[startind])){
        this.$root.showErrorShow("请输入正确的验证码");
          return;
      }

      if(!this.hasRead){
        this.$root.showErrorShow("请先阅读责任书");
          return;
      }

      smscode = this.valueArr[startind];

      this.bConfirmOrderShow = true;
      this.orderInfo = {
          money:this.money,
          project:"羽毛球"+this.SignupCheckData.list[this.selected - 1].type,
          type: this.selected == 3 ? 3 : this.selected == 2 ? 1 : 2,
          name:joinName,
          tel:joinPhone,
          smscode:smscode
      };
    },
    toReadprotocolHandel(){
      this.msg.show = true;
    }
  }
}

</script>

<style lang="sass">
 .sf-container{
    border:3px solid #000;
    border-radius:0.05rem;
    padding-top:0.12rem;
    margin-bottom: 0.2rem;
    background-color: #fff;
    .sf-selection{
      padding:0 0.2rem;
      .sf-selection-title{
        font-size: 0.14rem;
        text-align: left;
      }
    }
    .sf-info{
      font-size: 0.13rem;
      padding-top:0.2rem;
      .sf-info-title{
        text-align: left;
        margin-bottom:0.16rem;
        color:#9fa0a0;
      }
      .sf-info-protocol{
        font-size:0.12rem;
        padding:0.1rem 0 0.2rem;
        input{
          margin-right: 0.03rem;
          position: relative;
          top:1px;
        }
        /*em{
          display: inline-block;
          margin-right: 0.03rem;
          width:0.07rem;
          height:0.07rem;
          border-radius: 2px;
          border:1px solid #000;
        }*/
      }
    }
    .sf-money{
      font-size: 0.13rem;
      color:#9fa0a0;
      text-align: left;
      padding:0.1rem 0.3rem;
      margin:0 -0.2rem;
      border-top:1px dashed #000;
      border-bottom:1px dashed #000;
      color:#f00;
      span{
        &:nth-of-type(2){
          float:right;
        }
      }
    }
    .sf-submit{
      padding:0.2rem 0;
      div{
        width:1.33rem;
        line-height:0.4rem;
        font-size: 0.22rem;
        color:#000;
        background:url(/static/vue-h5-signup/images/btn-style1.png) no-repeat;
        background-size:100% 100%;
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
