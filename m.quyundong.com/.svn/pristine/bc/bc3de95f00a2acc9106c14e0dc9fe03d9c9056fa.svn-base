<template>
  <div class="signup-index">
    <div class="signup-index-logo">
      <img src="/static/vue-h5-signup/images/logo_new.png" alt="">
    </div>
<!--     <div class="signup-index-2016">
      <img src="/static/vue-h5-signup/images/2016.png" alt="">
    </div>
    <div class="signup-index-prize">
      <img src="/static/vue-h5-signup/images/prize.png" alt="">
      <div class="signup-index-title">
        <img src="/static/vue-h5-signup/images/title.png" alt="">
      </div>
    </div> -->
    <div class="signup-index-title"><img src="/static/vue-h5-signup/images/title_new.png"></div>
    <div class="signup-index-banner"><img src="/static/vue-h5-signup/images/banner_new.png"></div>
    <div class="signup-index-start" @click="gotoUrl('Signup')" v-if='status != 0'>
      参与报名
    </div>
    <div class="signup-index-start" v-else>
      报名已结束
    </div>
    <ul>
      <li class="signup-index-msg">
        报名时间：5月1日－5月12日
      </li>
      <li class="signup-index-msg">
        比赛时间：5月15日
      </li>
      <li class="signup-index-msg">
        比赛场地：北京国家奥林匹克体育中心<br>　　　　　国奥体育馆
      </li>
    </ul>
    <div class="signup-index-nav">
      <div class="signup-index-rule" @click='showMsg'>
        <img src="/static/vue-h5-signup/images/question.png" alt="">
        <br/>
        <span>活动规则</span>
      </div>
      <div class="signup-index-myorder" @click='fetchMyOrderData'>
        <img src="/static/vue-h5-signup/images/order.png" alt="">
        <br/>
        <span>我的订单</span>
      </div>
    </div>
    <signup-msg-box :msg='msg'></signup-msg-box>
    <signup-my-order :my-order='myOrder'></signup-my-order>
  </div>
</template>

<script>
import SignupMsgBox from './SignupMsgBox.vue';
import SignupMyOrder from './SignupMyOrder.vue';

export default {

  name: 'SignupIndex',

  components: {
    SignupMsgBox,
    SignupMyOrder,
  },
  data () {
    return {
      status:document.body.dataset.status,
      msg:{
        show:false,
        title:'活动说明',
        p:['报名时间：4月26日-5月12日',
        '比赛时间：5月15日周日',
        '比赛地点：国家奥林匹克体育中心国奥体育馆',
        '主办单位：趣运动、奥体中心体育馆',
        '承办单位：菩众体育','协办单位：佳备（五棵松）体能训练中心',
        '比赛项目：羽毛球男子单打、女子单打 男子双打',
        '赛制安排：',
        '1.比赛执行中国羽毛球协会最新审定的《羽毛球竞赛规则》和组委会特定规则；',
        '2.比赛采用单淘汰制；',
        '3.为保证赛事公平性，所有参赛选手采用现场抽签方式进行分组；比赛采用一局定输赢制，单局比赛时任何一方比分先到15分时获胜；',
        '4.比赛期间只允许双方各请求1次暂停；',
        '5.比赛开始前，双方选手通过投掷硬币方式确定由哪一方来先发球；',
        '6.每场比赛设主裁一人，比赛双方应当服从裁判判罚；',
        '7.比赛结束后，双方应握手致意，并向裁判致意，在比赛成绩表上签字。',
        '参赛须知：','1．参赛者男、女参赛者年龄不限，总人数不超过300名。',
        '2．各参赛队员必须是报名后纳入参赛名单并接到比赛通知的人员，并在活动现场签到，否则将视为弃权。',
        '3．参赛队员自备比赛服装、球拍。',
        '4．参赛者可通过（微信公众号：趣运动、国奥体育馆、菩众体育、佳备体育）报名，报满为止。',
        '5．申诉',
        '5.1仲裁委员会由趣运动活动负责人和担任比赛的裁判长组成，将处理比赛中的任何申诉和异议。',
        '5.2参赛人员如在比赛中发现问题，可向仲裁委员会申诉，最终解释权归趣运动所有。',
        '6．其他事项',
        '6.1赛场设立医疗点和医护人员，以防止参赛选手受伤。',
        '6.2赛场设立练习区，未参加比赛的人员可在练习区活动。',
        '名次设置：',
        '男子、女子单打冠军各1人',
        '男子、女子单打亚军各1人',
        '男子、女子单打季军各1人',
        '男子双打冠亚季各一组',
        '优胜奖男女单打及男子双打第4-8名共15名',
        '奖品设置：',
        '冠军：2000元现金，价值800元趣运动储值卡',
        '亚军：1500元现金，价值500元趣运动储值卡',
        '季军：1000元现金，价值200元趣运动储值卡',
        '优胜奖：价值200元的趣运动储值卡',
        ]
      },
      myOrder:{
        show:false,
        title:'我的订单',
        data:[]
      }
    }
  },
  methods: {
    gotoUrl(name){
      this.$route.router.go({
        name:name
      })
    },
    showMsg(){
      window.scrollTo(0, 0)
      this.msg.show = true
    },
    showOrder(){
      window.scrollTo(0, 0)
      this.myOrder.show = true
    },
    fetchMyOrderData(){
      var hash = this.$root.hash
      this.$fetchLoading({
        url: '/badminton/getorder?client_time='+ ~~(Date.now()/1000)+'&hash='+ hash , method: 'GET'
      },(response)=>{
        console.log(response.data)
        console.log(typeof response.data)
        let res = response.data
        let resData = response.data.data
        if(res.code == '1'){
          this.showOrder()
          this.$set('myOrder.data',resData)
        }else if(res.code == '5001'){
          window.location.href = res.data.redirect_url
        }else{
          this.$root.showErrorShow( '_' +res.msg)
        }
        
      },(response)=> {
        if(!this.moneyGetData){
          this.$root.showErrorShow('网络不给力，请稍后重试')
        }
      },()=> {
        this.$root.loadingHide = false
      },()=> {
        this.$root.loadingHide = true
      })
    }
  }
}

</script>

<style lang="sass">
@import '../sass/base';
.signup-index{
  width:100%;
  overflow-x:hidden; 
  position: relative;
  min-height:pxToRem(1200px);
  background-color: #ffeb01;
  background-image: url(/static/vue-h5-signup/images/bg.png);
  background-size: cover;
  .signup-index-logo{
    width:pxToRem(135px);
    height:pxToRem(53px);
    margin-left:pxToRem(20px);
    padding-top:pxToRem(20px);
  }
  .signup-index-title{
    width: pxToRem(533px);
    height: pxToRem(368px);
    margin: pxToRem(-60px) auto 0;
    transform: translateX(pxToRem(20px));
  }
  .signup-index-banner{
    width: pxToRem(728px);
    height: pxToRem(473px);
    margin:0 auto;
    position: relative;
    top:0;
    left:50%;
    margin-left: pxToRem(-364px);
    margin-top: pxToRem(-60px);
    transform: translateX(pxToRem(20px));
  }
  // .signup-index-prize{
  //   width: pxToRem(708px);
  //   height: pxToRem(861px);
  //   margin:0 auto;
  //   position: relative;
  //   left:50%;
  //   margin-left: pxToRem(-354px);
  //   margin-top: pxToRem(-20px);
  // } 
  .signup-index-start{
    width: pxToRem(260px);
    height: pxToRem(80px);
    line-height: pxToRem(80px);
    margin:pxToRem(20px) auto pxToRem(20px);
    background-image: url(/static/vue-h5-signup/images/btn-style1.png);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    background-color: #fff;
    border-radius: pxToRem(52px);
    font-size: pxToRem(40px);
  }
  .signup-index-msg{
    width: 100%;
    box-sizing:border-box;
    padding-left:pxToRem(150px);
    text-align: left;
    font-size: 12px;
  }
  .signup-index-nav{
    width: 100%;
    height: pxToRem(120px);
    margin:pxToRem(-120px) auto ;
    text-align: center;
    .signup-index-rule,.signup-index-myorder{
      box-sizing:border-box;
      padding-top: pxToRem(20px);
      width: pxToRem(120px);
      height: pxToRem(120px);
      float: left;
      img{
        width: pxToRem(52px);
        height: pxToRem(52px);
      }
    }
    .signup-index-myorder{
      float: right;
    }
  }
}
</style>
