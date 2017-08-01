<template>
  <div class="sf-info-form">
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
      codeRight:'-6em',
    }
  },
  props:{
    inputinfo:Array,
    bFormEmpty:Boolean,
    valueArr:Array
  },
  watch:{
    'valueArr'(){
      let bol = false;
      if(this.valueArr.length === this.inputinfo.length){
        for(var i=0;i<3;i++){
          if(!(this.valueArr[i] && this.valueArr[i].trim())){
            bol = true;
          }
        }
        if(!bol){
          this.bFormEmpty = false;
        }else{
          this.bFormEmpty = true;
        }
        this.$dispatch('Signup-input',this.bFormEmpty);
      }
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
        this.bFormEmpty = false;
      }else{
        this.bFormEmpty = true;
      }
      this.$dispatch('Signup-input',this.bFormEmpty);
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
          this.codetip = time+"s后可再获";
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
        }else if(res.code == '4004'){
          this.$root.showErrorShow(res.msg)
          setTimeout(()=>{
            window.location.href = window.location.href.split('#')[0].split('?')[0] + '?_=' + Date.now()
          },2000)
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
 
}

</script>

<style lang="sass">
  .si-wrap{
    margin-bottom:0.15rem;
    background-size:100% 100%;
    position: relative;
    border:0.02rem solid #000;
    border-radius: 6px;
    /*background-image:url(/static/vue-h5-badminton-signup/images/btn-style2.png);*/
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
      font-size: 0.15rem;
      height:0.36rem;
      width:100%;
      border:none;
      background: none;
      outline: none;
      text-align: center;
    }
    input::-ms-input-placeholder {
      font-size: 0.15rem;
      text-align: center;
      color: #9fa0a0; }

    input::-webkit-input-placeholder {
      font-size: 0.15rem;
      text-align: center;
      color: #9fa0a0; }
  }
  
</style>
