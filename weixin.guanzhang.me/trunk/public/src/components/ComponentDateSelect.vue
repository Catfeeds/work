<template>
  <div class="component-date-select">
    <div class="component-date-select-left" :class="{ 'disable' : selectLeftDisable }" @click='selectLeft'>&lt;</div>
    <div class="component-date-select-center">
      <ul :style='ulStyle' >
        <li v-for='item in resetDateSelectData' :style='liStyle'>
          <a @click='goToUrl(item.data)' class="component-date-select-data" :class="{ 'cur' : item.isShow }" >
            <span>{{ item.data | formatDate 'day' }} <br> {{ item.data | formatDate 'week' }}</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="component-date-select-right" :class="{ 'disable' : selectRightDisable }" @click='selectRight'>&gt;</div>
  </div>
</template>

<script>


// ========================== old code =====================
import ComponentCommonTitle from './ComponentCommonTitle.vue';

export default {

  name: 'ComponentDateSelect',
  data(){
    return{
      ulTransform:'translate3d(0,0,0)',
      page:0,
      selectLeftDisable:false,
      selectRightDisable:false,
      oneDayTime:24*60*60,
      list:[
        [
          {data:"",visibility:'visible',isShow:false},
          {data:"",visibility:'visible',isShow:false},
          {data:"",visibility:'visible',isShow:false},
          {data:"",visibility:'visible',isShow:false}
        ],
        [
          {data:"",visibility:'visible',isShow:false},
          {data:"",visibility:'visible',isShow:false},
          {data:"",visibility:'visible',isShow:false},
          {data:"",visibility:'visible',isShow:true}
        ],
        [
          {data:"",visibility:'visible',isShow:false},
          {data:"",visibility:'visible',isShow:false},
          {data:"",visibility:'visible',isShow:false},
          {data:"",visibility:'visible',isShow:false}
        ]
      ]
    }
  },
  components: {
    ComponentCommonTitle
  },
  props:{
    dateSelectData:Object,
    bodyWidth:Number
  },
  watch:{
    'dateSelectData':{
      handler:function () {
        if(!this.dateSelectData) return false

        let today = this.dateFormat(this.dateSelectData.nowDate)
        let checkDate = this.dateFormat(this.dateSelectData.checkDate)
        let dayLength = today - checkDate

        this.$set('page',~~(dayLength/4))
        this.checkRight(this.page)
        this.checkLeft(this.page)
      },
      deep:true
    },
    'page':{
      handler:function () {
        this.checkRight(this.page)
        this.checkLeft(this.page)
      },
      deep:true
    }
  },
  computed:{
    resetDateSelectData(){
      if(!this.dateSelectData) return false
      let today = this.dateFormat(this.dateSelectData.nowDate)
      let trueToday = this.dateSelectData.nowDateStart || document.body.dataset.defaultDate
      let checkDate = this.dateFormat(this.dateSelectData.checkDate)
      let dayLength = today - checkDate

      if(dayLength < 0 ) return false
      // if(dayLength < 30*2 ) dayLength = 30*2
      dayLength = dayLength + 32 - dayLength%4
      let array = []
      for ( let i = 0 ; i < dayLength ; i ++ ){
        let data = {
          data:(trueToday - i * 24*60*60 )*1000,
          isShow: (today - i) === checkDate ? true : false
        }
        array.unshift(data)
      }
      return array
    },
    ulStyle(){
      return {width:(this.resetDateSelectData.length * this.bodyWidth * 0.2 + 'px'),transform:this.setTransform(this.page)}
    },
    liStyle(){
      return {width:this.bodyWidth * 0.2 + 'px'}
    }
  },
  methods: {
    dateFormat(time){
      
      return ~~(this.$commonTool.formatStringDate(time)/this.oneDayTime)
    },
    selectRight(){
      this.page--
      if(this.page < 0 ) this.page = 0;
      this.move(this.page);
    },
    checkRight(page){
      if(page === 0) {
        this.selectRightDisable = true
      }else{
        this.selectRightDisable = false
      }
    },
    checkLeft(page){
      if(page >= (this.resetDateSelectData.length/4) - 1 ) {
        this.selectLeftDisable = true
      }else{
        this.selectLeftDisable = false
      }
    },
    selectLeft(){
      this.page++
      if( this.page > (this.resetDateSelectData.length/4) - 1 && this.resetDateSelectData.length%4 == 0){
        this.page = ~~(this.resetDateSelectData.length/4) - 1
      }else if(this.page > (this.resetDateSelectData.length/4) - 1 ){
        this.page = ~~(this.resetDateSelectData.length/4)
      }   
      this.move(this.page);
      
    },
    goToUrl(n){
      this.$route.router.go({
        name:'ReportIndex',
        params:{time:~~(n/1000)}
      })
    },
    move(page){
      this.ulTransform = this.setTransform(page)
    },
    setTransform(page){
      return 'translate3d('+ page * this.bodyWidth * 0.8 + 'px' +',0,0)'
    }
  }
}

</script>

<style lang="sass">
@import '../sass/base';
.component-date-select{
  color:#3c89d7;
  width: 100%;
  height: pxToRem(150px);
  padding:0 pxToRem(75px);
  box-sizing:border-box;
  position: relative;
  text-align: center;
  line-height:pxToRem(150px);
  .component-date-select-left,.component-date-select-right{
    width: pxToRem(75px);
    height: 100%;
    position: absolute;
    top:0;
    &.disable{
      color:#BDC5CE;
    }
  }
  .component-date-select-left{
    left:0;
  }
  .component-date-select-right{
    right:0;
  }
  .component-date-select-center{
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    ul{
      height: 100%;
      transition:transform 0.3s linear 0s;
      position: absolute;
      top:0;
      right:0;
    }
    li{
      width: pxToRem(150px);
      height:100%;
      display: block;
      float: left;
      text-align: center;
    }
  }
  .component-date-select-data{
    width: pxToRem(120px);
    height: pxToRem(120px);
    border-radius: 50%;
    line-height: 1.8;
    color:#3c89d7;
    &.cur{
      color:#fff;
      background-color: #3c89d7;
    }
    display: inline-block;
    position: relative;
    top:50%;
    transform: translateY(-50%);
    span{
      padding-top: pxToRem(12px);
      display: inline-block;
    }
  }
}
</style>
