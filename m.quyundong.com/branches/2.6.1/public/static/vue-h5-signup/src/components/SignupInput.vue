<template>
  <div class="sf-info-form" @input="inputHandel">
    <div class="si-wrap" v-for="key in inputinfo" :style="{width:key.width}">
      <div class="si-getcode" :style={right:codeRight}  @click="getCodeHandel" :class='{disabled:bDisable}' v-if="key.inputstyle==2" :style="{right:rightStyle}">{{codetip}}</div>
      <input type="text" placeholder="{{key.placeholder}}" v-model='valueArr[$index]' >
    </div>
  </div>

</template>

<script>

export default {

  name: 'SignupInput',
  data(){
    return {
      bDisable:false,
      codetip:"获取验证码",
      codeRight:'-6em'
    }
  },
  methods:{
    inputHandel(evt){
      if(this.valueArr.length == this.$el.children.length){
        for(var i=0;i<this.valueArr.length;i++){
          if(this.valueArr[i] == "" || this.valueArr[i] == null){
            break;
          }
        }
      }
      if(i == this.$el.children.length){
        this.bLightOn = false;
      }else{
        this.bLightOn = true;
      }
      this.$dispatch('Signup-input',this.bLightOn);
    },
    timerCounter(){
      var timer = null,time=60;
      timer = setInterval(()=>{
        if(time <= 0 ){
          clearInterval(timer);
          this.bDisable = false;
          this.codetip = "获取验证码";
          this.codeRight = "-6em";
        }else{
          time --;
          this.codetip = time+"s后重新获取";
          this.codeRight = "-7em";
        }
      },1000);
    },
    getCodeHandel(evt){
      if(evt.target.className.indexOf("disabled") > -1){
        this.$root.showErrorShow("验证码已发送，60s内无需再次获取");
        return false;
      }

      var tel = this.$el.children.length == 4 ? this.valueArr[2] : this.valueArr[1];
      if(!this.$commonTool.checkPhone(tel)) {
        this.$root.showErrorShow('请输入正确的手机号');
        return;
      }
      var hash = this.$root.hash
      this.$fetchLoading({
        url:"/badminton/getsmscode?client_time="+this.$commonTool.newDate()+"&hash="+hash+"&phone="+tel , method: 'GET'
      },(response)=>{
        let res = response.data;
        let resData = res.data;
        if(res.code === '1'){
          this.bDisable = true;
          this.timerCounter();
        }else{
          this.$root.showErrorShow(res.msg)
        }
        
      },(response)=> {
        this.$root.showErrorShow('网络不给力，请稍后重试')
      },()=> {
        this.$root.loadingHide = false
      },()=> {
        this.$root.loadingHide = true
      })


    }
  },
  props:{
    inputinfo:Array,
    bLightOn:Boolean,
    valueArr:Array
  },
}

</script>

<style lang="sass">
  .si-wrap{
    margin-bottom:0.1rem;
    background-size:100% 100%;
    position: relative;
    background-image:url(/static/vue-h5-signup/images/btn-style2.png);
    .si-getcode{
      position: absolute;
      line-height:0.36rem;
      /*width: 6em;*/
      right:-7em;
      color:#000;
      text-decoration: underline;
    }
    input{
      color:#000;
      font-size: 0.13rem;
      height:0.36rem;
      width:100%;
      border:none;
      background: none;
      outline: none;
      text-align: center;
    }
    input::-ms-input-placeholder {
      font-size: 0.13rem;
      text-align: center;
      color: #9fa0a0; }

    input::-webkit-input-placeholder {
      font-size: 0.13rem;
      text-align: center;
      color: #9fa0a0; }
  }
  
</style>
