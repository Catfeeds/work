<template>
  <div class="sco-container" v-if="bConfirmOrderShow">
    <div class="sco-wrap">
      <p class="sco-title">名单信息</p>
      <ul class="sco-orderInfo">
        <li class="clearfix">
          <div>报名金额</div>
          <div>￥{{orderInfo.money}}</div>
        </li>
        <li class="clearfix">
          <div>参与项目</div>
          <div>{{orderInfo.project}}</div>
        </li>
        <li class="clearfix">
          <div>报名人数</div>
          <div>{{orderInfo.number}}</div>
        </li>
        <li class="clearfix">
          <div>参与者姓名</div>
          <div>{{orderInfo.name}}</div>
        </li>
        <li class="clearfix">
          <div>参与者手机号</div>
          <div>{{orderInfo.tel}}</div>
        </li>
      </ul>
      <p class="sco-tip">报名成功后在首页点击<img src="/static/vue-h5-badminton-signup/images/order.png" alt="">查看订单</p>
      <div class="sco-submit"><div @click="payHandel">确认支付</div></div>
      <div class="sco-back" @click="backHandel">返回修改</div>
    </div>
  </div>
  <Signup-nopayorder v-if="bNopayShow" :no-pay-order-data="noPayOrderData"></Signup-nopayorder>
  <Signup-fail :signupfail="signupfail"></Signup-fail>
</template>

<script>
import SignupNopayorder from "./SignupNopayorder.vue"
import SignupFail from "./SignupFail.vue"
export default {
  name: 'SignupConfirmOrder',
  props:{
    orderInfo:Object,
    bConfirmOrderShow:Boolean
  },
  data(){
    return {
      bNopayShow:false,
      signupfail:{
        bFailShow:false
      },
      noPayOrderData:{},
    }
  },
  components:{
    SignupNopayorder,SignupFail
  },
  methods:{
    backHandel(){
      this.$dispatch("Signup-confirm-order",false);
    },
    payHandel(){
      var hash = this.$root.hash;
      this.$fetchLoading({url:"/badminton/trainingsignup?client_time="+this.$commonTool.newDate()+"&hash="+hash+"&phone="+this.orderInfo.tel+"&sms_code="+this.orderInfo.smscode+"&name="+this.orderInfo.name+"&number="+this.orderInfo.number,method:"GET"},(response)=>{
          let res = response.data;
          let resData = res.data;
          if(res.code === '1'){
            location.href=res.data.redirect_url;
          }else if(res.code == '4004'){
            this.$root.showErrorShow(res.msg)
            setTimeout(()=>{
              window.location.href = window.location.href.split('#')[0].split('?')[0] + '?_=' + Date.now()
            },2000)
          }else if(res.code === '0501'){
            this.bConfirmOrderShow = false;
            this.bNopayShow = true;
            if (res.data.order.order_status == 0 && res.data.count > 0&&res.data.order.pay_expire_left>0) {
                if (res.data.order.order_type == 0 || res.data.order.order_type == 3) {
                  this.noPayOrderData.changci = res.data;
                } else {
                  this.noPayOrderData.renci = res.data;
                }
            }
          }else if(res.code === '0503'){//已报过名
            this.signupfail.bFailShow = true;
            this.bConfirmOrderShow = false;
            this.$dispatch("Signup-confirm-order",false);
          }else if(res.code === '0507'){//报名超额
            this.$root.showErrorShow("超过现有名额");
            this.$dispatch("Signup-confirm-order",res.data.surplusPlaces);
          }
          else{
            this.$root.showErrorShow(res.msg)
          }
      },(response)=>{
        this.$root.showErrorShow('网络不给力，请稍后重试')
      },()=> {
        // this.$root.loadingHide = false
      },()=> {
        // this.$root.loadingHide = true
      })
    },
     getWeek(dd){
      var weeks = ["日","一","二","三","四","五","六"];
      return weeks[dd];
    },
    getMoney(mon){
      if(isNaN(mon))
        return;
      if(parseInt(mon) !== mon){
        return mon.toFixed(2);
      }else{
        return mon;
      }
    }
  },
  events:{
    'Signup-nopayorder'(msg){
      this.bNopayShow = msg;
      this.bConfirmOrderShow = true;
    }
  }
}
</script>

<style lang="sass">
  .sco-container{
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color:rgba(0,0,0,.5);
    .sco-wrap{
      position: relative;
      top:50%;
      border:3px solid #000;
      border-radius: 0.15rem;
      color:#000;
      text-align: left;
      margin:0 0.22rem;
      padding:0.1rem 0.2rem;
      background-color:#ffeb01;
      transform:translateY(-50%);
      -webkit-transform:translateY(-50%);
      .sco-title{
        font-size: 0.15rem;
      }
      ul{
        margin-top:0.05rem;
        li{
          font-size:0.14rem;
          padding:0.05rem 0;
          &:nth-of-type(1){
            font-size:0.18rem;
          }
          div{
            &:nth-of-type(1){
              float:left;
            }
            &:nth-of-type(2){
              float:right;
              width:50%;
              text-align:left;
              overflow:hidden;white-space:nowrap;text-overflow:ellipsis;
            }
          }
        }
      }
      .sco-tip{
        text-align: center;
        margin-top:0.1rem;
        img{
          vertical-align: top;
          margin:0 0.03rem;
          height: 0.16rem;
          width: auto;
        }
      }
      .sco-submit{
        padding:0.2rem 0 0.1rem;
        text-align: center;
        div{
          width:1.33rem;
          line-height:0.4rem;
          font-size: 0.22rem;
          color:#000;
          /*background:url(/static/vue-h5-badminton-signup/images/btn-style1.png) no-repeat;*/
          /*background-size:100% 100%;*/
          border:0.02rem solid #000;
          background-color:#fff;
          border-radius: 0.2rem;
          margin:0 auto;
        }
      }
      .sco-back{
        font-size: 0.12rem;
        text-decoration: underline;
        text-align: center;
      }
    }
  }


</style>
