<template>
  <div class="sfail-container" v-if="signupfail.bFailShow">
    <div class="sfail-wrap">
      <div class="sfail-head">
        <img src="/static/vue-h5-badminton-signup/images/fail-img.png" alt="">
        <img @click="closeFailHandel" src="/static/vue-h5-badminton-signup/images/fail-close.png" alt="">
      </div>
      <div class="sfail-text">
        <p>抱歉~</p>
        <p>此手机号码+此姓名已参加报名</p>
        <p>注 : ( 一个手机号码同一个项目只能参加一次报名 )</p>
        <div class="sfail-submit"><div @click="payHandel">返回修改</div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignupFail',
  props:{
    signupfail:Object
  },
  methods:{
    closeFailHandel(){
      this.signupfail.bFailShow = false;
    },
    payHandel(){
      this.signupfail.bFailShow = false;
    }
  },
}
</script>

<style lang="sass">
  .sfail-container{
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color:rgba(0,0,0,.5);
    .sfail-wrap{
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
      .sfail-head{
        margin:0 -0.2rem;
        padding:0 0.2rem;
        border-bottom:1px dashed #000;
        img{
          &:nth-of-type(1){
            width:0.8rem;
          }
          &:nth-of-type(2){
            width:0.3rem;
            float: right;
            margin-top:0.1rem;
          }
        }
      }
      .sfail-text{
        p{
          font-size:0.14rem;
          &:nth-of-type(1){
            font-size:0.15rem;
            padding:0.1rem 0;
          }

          &:nth-of-type(3){
            color:#684260;
            font-size:0.15rem;
          }

        }
      }
    }
  }

.sfail-submit{
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
</style>
