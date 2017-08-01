<template>
  <div class="court-view-header">
    <h2>总时长统计(分钟):</h2>
    <div class="court-view-header-msgbar">
      <div class="court-view-header-msgbar-left">
        <i class="court-view-header-msgbar-icon"><img src='/static/images/icon-light.png'></i>
        <table>
          <tr><td>开灯</td></tr>
          <tr><td>{{lightTimeData!==null?lightTimeData.totalLightTime:''}}</td></tr>
        </table>
      </div>
      <div class="court-view-header-msgbar-right">
        <i class="court-view-header-msgbar-icon"><img src='/static/images/icon-court.png'></i>
        <table>
          <tr><td>场次</td></tr>
          <tr><td>{{lightTimeData!==null?lightTimeData.totalOrderTime:''}}</td></tr>
        </table>
      </div>
    </div>
    <div class="court-view-header-tips">Tips：若开灯时长和场次时长差距过大，则可能出现只开灯不收费的情况。</div>
    <div class="court-view-header-selectbar">
      <span class="court-view-header-selectbar-1" :class='{ "cur" : showTime }'  @click='clickSomeone("time")'>按时段</span>
      <span class="court-view-header-selectbar-2" :class='{ "cur" : showCourt }' @click='clickSomeone("court")'>按场地</span>
      <span class="court-view-header-selectbar-3" @click='goToUrl("url")'>灯光场次明细图></span>
      <i :class='{ "cur" : showCourt }'></i>
    </div>
    <Component-court :items='courtData' v-if='showCourt'></Component-court>
    <Component-light-time :data='lightTimeData' v-if='showTime'></Component-light-time>
  </div>
</template>
<script>
import ComponentCourt from './ComponentCourt.vue'
import ComponentLightTime from './ComponentLightTime.vue'
export default {
  name: 'CourtViewHeader',
  components: {
      ComponentCourt,
      ComponentLightTime
  },
  props:{
    courtData:Array,
    lightTimeData:Object
  },
  data(){
    return{
      showTime:true
    }
  },
  computed:{
    showCourt(){
      return !this.showTime
    }
  },
  methods:{
    goToUrl(url){
      _hmt.push(['_trackEvent', '微信报表', '报表使用点击', '灯控报表-灯光场次明细图-点击'])
      this.$route.router.go({
        name:'LightReport',
        params:{
          time:this.$route.params.time
        }
      })
    },
    clickSomeone(type){
      if(type === 'time'){
        this.showTime = true
      }else if(type === 'court'){
        _hmt.push(['_trackEvent', '微信报表', '报表使用点击', '灯控报表-按场地-点击'])
        this.showTime = false
      }
    }
  }
}
</script>

<style lang="sass">
  @import '../sass/base';
  .court-view-header{
    text-align: left;
    h2{
      font-size: pxToRem(30px);
      color:#111;
      padding:pxToRem(40px) pxToRem(30px);
    }
  }
  .court-view-header-msgbar{
    font-size: pxToRem(30px);
    color:#111;
    width:100%;
    height: pxToRem(90px);
    box-sizing:border-box;
    padding:0 pxToRem(60px);
  }
  .court-view-header-msgbar-left,.court-view-header-msgbar-right{
    width: 48%;
    display: inline-block;
    box-sizing:border-box;
    position: relative;
    table{
      position: relative;
    }
    td{
        height: pxToRem(45px);
      }
    .court-view-header-msgbar-icon{
      position: absolute;
      width: pxToRem(90px);
      height: pxToRem(90px);
      display: block;
      font-size: 0;
      img{width: 100%;}
    }
  }
  .court-view-header-msgbar-left{
    padding-left: pxToRem(130px);
    text-align: left;
    border-right:1px dashed #e0e0e0;
    .court-view-header-msgbar-icon{
      top:0;
      left:0;
    }
  }
  .court-view-header-msgbar-right{
    text-align: right;
    table{
      margin-left: auto;

    }
    .court-view-header-msgbar-icon{
      top:0;
      left:pxToRem(90px);
    }
  }
  .court-view-header-tips{
    font-size:pxToRem(30px);
    color:#777;
    padding:pxToRem(60px) pxToRem(30px) pxToRem(120px);
  }
  .court-view-header-selectbar{
    position: relative;
    i{
      width: pxToRem(30px);
      height: pxToRem(4px);
      background-color: #3c89d7;
      position: absolute;
      left:pxToRem(60px);
      bottom: 0;
      &.cur{
        left:pxToRem(240px);
      }
    }
    font-size: pxToRem(30px);
    color:#555;
    border-bottom: 1px solid #e0e0e0;
    span{display:inline-block;padding:pxToRem(30px);}
    span.cur{color:#3c89d7}
    .court-view-header-selectbar-1{margin-left: pxToRem(0px);}
    .court-view-header-selectbar-2{margin-left: pxToRem(20px);}
    .court-view-header-selectbar-3{margin-left: pxToRem(100px);}
  }
</style>
