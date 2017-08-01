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
          <div>参与者姓名</div>
          <div>{{orderInfo.name}}</div>
        </li>
        <li class="clearfix">
          <div>参与者手机号</div>
          <div>{{orderInfo.tel}}</div>
        </li>
      </ul>
      <p class="sco-tip">报名成功后在首页点击<img src="/static/vue-h5-signup/images/order.png" alt="">查看订单</p>
      <div class="sco-submit"><div @click="payHandel">确认支付</div></div>
      <div class="sco-back" @click="backHandel">返回修改</div>
    </div>
  </div>
  <Signup-nopayorder v-if="bNopayShow" :no-pay-order-data="noPayOrderData"></Signup-nopayorder>
</template>

<script>
import SignupNopayorder from "./SignupNopayorder.vue"
export default {
  name: 'SignupConfirmOrder',
  props:{
    orderInfo:Object,
    bConfirmOrderShow:Boolean
  },
  data(){
    return {
      bNopayShow:false,
      noPayOrderData:"",
    }
  },
  components:{
    SignupNopayorder
  },
  methods:{
    backHandel(){
      this.$dispatch("Signup-confirm-order",false);
    },
    payHandel(){
      var hash = this.$root.hash;
      this.$fetchLoading({url:"/badminton/signup?client_time="+this.$commonTool.newDate()+"&hash="+hash+"&phone="+this.orderInfo.tel+"&type="+this.orderInfo.type+"&sms_code="+this.orderInfo.smscode+"&name="+this.orderInfo.name,method:"GET"},(response)=>{
          let res = response.data;
          let resData = res.data;
          if(res.code === '1'){
            location.href=res.data.redirect_url;
          }else if(res.code === '0501'){
            this.bConfirmOrderShow = false;
            this.bNopayShow = true;
            if(res.data.order.order_status == 0 && res.data.count > 0){
              var str = "",goods_list="";
              str += "<li>您尚有未支付的订单</li>";
              if (res.data.order.order_type == 0 || res.data.order.order_type == 3) { 
                for(var i=0;i<res.data.order.goods_list.length;i++){
                    goods_list += "<em>"+new Date(res.data.order.goods_list[i].start_time*1000).format("hh:mm")+"-"+new Date(res.data.order.goods_list[i].end_time*1000).format("hh:mm")+" "+res.data.order.goods_list[i].course_name+" "+this.getMoney(res.data.order.goods_list[i].shop_price)+"元</em>";
                }
                var n = "<p>"+res.data.order.name+"</p>",
                    d = "<p><span>日期：</span><span>"+new Date(res.data.time*1000).format('yyyy年MM月dd日')+"（周"+this.getWeek(new Date(res.data.time*1000).getDay())+"）</span></p>",
                    p = "<p><span>场地：</span><span>"+goods_list+"</span></p>",
                    t = "<p><span>共计：</span><span>" + this.getMoney(res.data.order.order_amount) + "元</span></p>";
                str += "<li>"+n+d+p+t+"</li>";
              }else{
                  var n2 = "<p>"+res.data.order.name+"</p>",
                      tc = "<p><span>套餐：</span><span>"+res.data.order.goods_list[0].goods_name+"</span></p>",
                      num = "<p><span>数量：</span><span>"+res.data.order.goods_list[0].goods_number+"</span></p>",
                      tt = "<p><span>共计：</span><span>" + this.getMoney(res.data.order.order_amount) + "元</span></p>";
                  str += "<li>"+n2+tc+num+tt+"</li>";
              }
              str += "<li><div id='book-Cancel' order_id='"+res.data.order.order_id+"'>取消订单</div><a id='book-href' order_id="+res.data.order.order_id+" data-href='/order/pay?id="+res.data.order.order_id+"'><div id='book-pay'>立即支付</div></a></li>";
            }

            this.noPayOrderData = str;
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
          font-size:0.13rem;
          padding:0.05rem 0;
          &:nth-of-type(1){
            font-size:0.15rem;
          }
          div{
            &:nth-of-type(1){
              float:left;
            }
            &:nth-of-type(2){
              float:right;
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
          width:0.16rem;
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
          background:url(/static/vue-h5-signup/images/btn-style1.png) no-repeat;
          background-size:100% 100%;
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
