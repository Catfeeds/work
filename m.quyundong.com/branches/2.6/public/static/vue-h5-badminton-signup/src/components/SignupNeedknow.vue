<template>
  <div class="snk-container" v-if="needknow.bshow">
    <div class="snk-wrap">
      <div class="snk-head">
        <img src="/static/vue-h5-badminton-signup/images/needknow.png" alt="">
        <span>自愿参加责任书</span>
        <img @click="closeFailHandel" src="/static/vue-h5-badminton-signup/images/fail-close.png" alt="">
      </div>
      <div class="snk-text">
        <ul>
          <li v-for="key in needknow.list"><span>{{$index+1}}.</span><div>{{key}}</div></li>
        </ul>
        <div>趣运动有权在法律允许的范围内保留对本次活动的最终解释权</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignNeedknow',
  props:{
    needknow:Object
  },
  methods:{
    closeFailHandel(){
      this.needknow.bshow = false;
    },
    payHandel(){
      this.needknow.bshow = false;
    }
  },
}
</script>

<style lang="sass">
  .snk-container{
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color:rgba(0,0,0,.5);
    .snk-wrap{
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
      .snk-head{
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
        span{
          font-size:0.15rem;
          position: relative;
          top:-0.15rem;
          left:0.05rem;
        }
      }
      .snk-text{
        padding-top:0.1rem;
        font-size:0.14rem;
        p{
         font-size:0.15rem;
         padding:0.1rem 0;
        }
        ul{
          li{
            margin-bottom:0.1rem;
            span{
              float:left;
              margin-right:0.05rem;
            }
            div{
              overflow: hidden;
            }
          }
        }
        >div{
          text-align:center;
          padding:0.2rem 0 0.1rem;
          font-size: 0.15rem;
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
      border:0.02rem solid #000;
      background-color:#fff;
      border-radius: 0.2rem;
      margin:0 auto;
    }
  }
</style>
