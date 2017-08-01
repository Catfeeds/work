<template>
  <div class="signup-msg-box" v-show='myOrder.show'>
   <div class="signup-msg-content signup-my-order">
    <div class='signup-msg-close' @click='close'>X</div>
    <div class="signup-msg-title">{{myOrder.title}}</div>
    <ul v-if='myOrder.data.length && myOrder.data.length != 0'>
      <li class="signup-my-order-lists" v-for='item in myOrder.data'>
        <div class="signup-my-order-lists-title">
          <div class="signup-myorder-info-left">报名金额：</div>
          <div class="signup-myorder-info-right">¥{{item.amount | fromMoney }}</div>
        </div>
        <ul>
          <li class="signup-my-order-info-lists">
            <div class="signup-myorder-info-left">参与项目：</div>
            <div class="signup-myorder-info-right">{{item.type}}</div>
          </li>
          <li class="signup-my-order-info-lists">
            <div class="signup-myorder-info-left">参与者姓名：</div>
            <div class="signup-myorder-info-right">{{item.name}}</div>
          </li>
          <li class="signup-my-order-info-lists">
            <div class="signup-myorder-info-left">参与者手机号：</div>
            <div class="signup-myorder-info-right">{{item.phone}}</div>
          </li>
          <li class="signup-my-order-info-lists">
            <div class="signup-myorder-info-left">报名状态：</div>
            <div class="signup-myorder-info-right">{{item.order_status}}</div>
          </li>
        </ul>
      </li>
    </ul>
    <ul v-else>
      <div style="padding-top:0.2rem">暂时没有订单～ </div>
    </ul>
   </div>
  </div>
</template>

<script>

export default {

  name: 'SignupMyOrder',

  props:{
    myOrder:Object
  },
  methods:{
    close(){
      this.myOrder.show = false
    }
  }
}

</script>

<style lang="sass">
@import '../sass/base';
@import '../sass/signupMsgBox';
.signup-msg-content.signup-my-order{
  padding-left: 0;
  padding-right: 0;
  font-size: pxToRem(28px);
}
.signup-my-order-lists{
  margin-top: pxToRem(20px);
  margin-bottom: pxToRem(60px);
}
.signup-my-order-lists-title{
  border-top:1px dotted #000;
  border-bottom:1px dotted #000;
  line-height: pxToRem(80px);
  height: pxToRem(80px);
  font-size: pxToRem(40px);
  margin-bottom: pxToRem(10px);
}
.signup-my-order-info-lists{
  line-height:pxToRem(70px);
  /* height:pxToRem(70px); */
  .signup-myorder-info-right{
    text-align: left;
  }
}
.signup-my-order-info-lists,.signup-my-order-lists-title{
  width: 100%;
  box-sizing:border-box;
  padding-left: 50%;
  padding-right: pxToRem(50px);
  position: relative;
}
.signup-myorder-info-left{
  position: absolute;
  top:0;
  left:0;
  padding-left: pxToRem(50px);
  width: 50%;
  box-sizing:border-box;
  text-align: left;
}

</style>
