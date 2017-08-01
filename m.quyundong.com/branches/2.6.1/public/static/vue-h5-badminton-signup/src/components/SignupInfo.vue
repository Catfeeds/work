<template>
  <div class="signup-info">
    <div class="signup-info-close" @click='gotoUrl("SignupIndex")'></div>
    <div class='signup-info-h1'>活动说明</div>
    <p v-for='item in dataList' :class='item.className' :style='item.style'>{{item.text}}</p>
  </div>
</template>

<script>

export default {

  name: 'SignupIfo',

  props:{
    // msg:Object
  },
  data(){
    return{
      dataList:[
        {className:{'signup-info-title':true},style:'',text:'报名截止时间'},
        {className:{'signup-info-text':true},style:'',text:'6月27日12：00'},
        {className:{'signup-info-title':true},style:'',text:'特训时间'},
        {className:{'signup-info-text':true},style:'',text:'6月27日~7月18日 每周一晚上 20：00-22：00'},
        {className:{'signup-info-title':true},style:'',text:'特训地点'},
        {className:{'signup-info-text':true},style:'',text:'广州名狮羽毛球馆——海珠区赤岗西路20-22号畅流小区2号楼（地铁客村站）'},
        {className:{'signup-info-title':true},style:'',text:'特训内容'},
        {className:{'signup-info-text':true},style:'',text:'06/27第1课时：正反手网前球处理技能'},
        {className:{'signup-info-text':true},style:'',text:'07/04第2课时：后场高远球分节发力技能'},
        {className:{'signup-info-text':true},style:'',text:'07/11第3课时：网前步伐技能'},
        {className:{'signup-info-text':true},style:'',text:'07/18第4课时：后场步伐技能'},
        {className:{'signup-info-title':true},style:'',text:'特训流程（待定）：'},
        {className:{'signup-info-text':true},style:'',text:'1.热身运动'},
        {className:{'signup-info-text':true},style:'',text:'2.培训内容讲解及动作示范'},
        {className:{'signup-info-text':true},style:'',text:'3.分组动作练习'},
        {className:{'signup-info-text':true},style:'',text:'4.一对一练习及动作纠正'},
        {className:{'signup-info-text':true},style:'',text:'5.学员对抗实战练习'},
        {className:{'signup-info-title':true},style:'',text:'报名要求'},
        {className:{'signup-info-text':true},style:'',text:'有较高水平的羽毛球爱好者'},
        {className:{'signup-info-title':true},style:'',text:'报名费用'},
        {className:{'signup-info-text':true},style:'',text:'350元/人'},
        {className:{'signup-info-title':true},style:'',text:'报名须知'},
        {className:{'signup-info-text-number':true},style:'',text:'1.返现优惠规则：2人或以上报名可返现50元/人，优惠金额将于活动截止报名当天返现至报名使用的趣运动账户内，优惠金额不可提现，可用于趣运动任何业务消费；'},
        {className:{'signup-info-text-number':true},style:'',text:'2.成功支付报名费用视为报名成功；'},
        {className:{'signup-info-text-number':true},style:'',text:'3.报名成功并接到特训通知后，请准时到名狮羽毛球馆前台签到参与特训，若特训当天未能如期出席，费用将不予以退还；'},
        {className:{'signup-info-text-number':true},style:'',text:'4.特训球友需要自带装备； '},
        {className:{'signup-info-text-number':true},style:'',text:'5.如有疑问，可咨询4000-410-480'},
        {className:{'signup-info-text-number':true},style:'',text:'6.趣运动有权在法律允许的范围内保留对本次活动的最终解释权'},
        // {className:{'signup-info-last':true},style:'',text:'本活动最终解释权归趣运动所有'},
      ]
    }
    
  },
  methods:{
    gotoUrl(name){
      this.$route.router.go({
        name:name
      })
    },
  }
}

</script>

<style lang="sass">
@import '../sass/base';
.signup-info{
  width: 100%;
  color:#684260;
  text-align:left;
  box-sizing:border-box;
  padding:pxToRem(40px); 
  /* padding:0.35rem 0.58rem; */
  font-size: pxToRem(30px);
  position:relative;
  .signup-info-h1{
    text-align: center;
    font-size:pxToRem(36px);
    margin:pxToRem(20px) auto pxToRem(50px);
  }
  .signup-info-close{
    width:pxToRem(48px);
    height:pxToRem(48px);
    position:absolute;
    top:pxToRem(30px);
    right:pxToRem(30px);
    background:transparent url('/static/vue-h5-badminton-signup/images/close.png') left top / cover no-repeat;
  }
  .signup-info-title{
    display: inline-block;
    border-bottom: 2px solid #684260;
    &:not(:first-of-type){
      padding-top: pxToRem(50px);
    }
  }
  .signup-info-text{
    text-align: left;
    line-height:1.7;
  }
  .signup-info-text-number{
    padding-left:1em;
    text-indent:-0.9em;
    line-height:1.7;
  }
  .signup-info-last{
    padding-top:pxToRem(80px);
    text-align: center;
  }
}

</style>
