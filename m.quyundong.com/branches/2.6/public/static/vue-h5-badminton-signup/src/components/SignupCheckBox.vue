<template>
  <!-- <div class="signup-msg-box" v-show='true'> -->
  <div class="signup-msg-box" v-show='myOrder.checkBoxShow'>
   <div class="signup-msg-content signup-check-box signup-my-order">
    <div class='signup-msg-close' @click='close'>X</div>
    <div class="signup-msg-content-head"></div>
    <div class="signup-msg-content-h2">订单查询</div>
    <div class="signup-msg-content-p">
      <input type="text" class="signup-msg-content-input" placeholder='请输入已成功报名的手机号码' v-model='myOrder.checkBoxData.phone' name='phone'>
    </div>
    <div class="signup-msg-content-p">
      <input type="text" class="signup-msg-content-input checked-number" placeholder='请输入手机验证码' v-model='myOrder.checkBoxData.checkNumber' name='checkNumber'>
      <span class="signup-msg-content-get-number" @click='getCode(myOrder)'>{{myOrder.checkBoxData.text}}</span>
    </div>
    <div class="signup-msg-content-p">
      <div class="signup-msg-content-check" @click='checkCheckBox(myOrder)'>查询</div>
    </div>
  </div>
</template>

<script>

export default {

  name: 'SignupCheckBox',

  props:{
    myOrder:Object
  },
  methods:{
    getCode(context){
      let court = 60
      let timer = null
      if(!context.canGetCheckCode) return false
      if(!this.$commonTool.checkPhone((context.checkBoxData.phone))){
        this.$root.showErrorShow('请输入正确的手机号码')
        return false
      }
      context.getCode = true
      context.canGetCheckCode = false
      context.checkBoxData.text = court + 's可再获'
      timer = setInterval(()=>{
        court --
        context.checkBoxData.text = court + 's可再获'
        if(court < 1 ){
          clearInterval(timer)
          context.canGetCheckCode = true
          context.checkBoxData.text = '获取验证码'
        }
      },1000)
    },
    checkCheckBox(context){
      context.check = true
    },
    close(){
      this.myOrder.checkBoxShow = false
      document.body.style.overflowY = 'visible'
    }
  }
}

</script>

<style lang="sass">
@import '../sass/base';
@import '../sass/signupMsgBox';
.signup-msg-content.signup-check-box{
  text-align: left;
  font-size:pxToRem(30px);
  .signup-msg-content-head{
    width:100%;
    height:pxToRem(120px);
    border-bottom: 1px dashed #000;
    background:transparent url('/static/vue-h5-badminton-signup/images/check.png') left 5% bottom   / pxToRem(148px) pxToRem(110px)  no-repeat;
  }
  .signup-msg-content-h2{
    margin-top:pxToRem(30px);
    padding:0 pxToRem(40px);
  }
  input::-webkit-input-placeholder {
    text-align: center;
    color: #aaa;
  }
  .signup-msg-content-input{
    width:100%;
    line-height: pxToRem(70px);
    border:2px solid #000;
    border-radius:6px;
    &.checked-number{
      width:60%;
      margin-right: pxToRem(10px);
    }
  }
  .signup-msg-content-p{
    padding:0 pxToRem(40px);
    width:100%;
    box-sizing:border-box;
    margin:pxToRem(30px) auto;
  }
  .signup-msg-content-get-number{
    text-decoration: underline;
  }
  .signup-msg-content-check{
    width:pxToRem(280px);
    height:pxToRem(80px);
    line-height:pxToRem(80px);
    text-align: center;
    border: 2px solid #000;
    border-radius:pxToRem(42px);
    background-color: #fff;
    margin:pxToRem(50px) auto;
  }
}
</style>
