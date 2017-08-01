<template>
  <div class="component-date-select">
    <div class="component-date-select-left" :class="{ 'disable' : selectLeftDisable }" @click='leftClick'>&lt;</div>
    <div class="component-date-select-center">
      <div class="component-date-select-center-main" :class="{ 'transition' : setTransition }" :style="setTransform">
        <ul>
          <li v-for='item in resetDateSelectData[0]' :style='liStyle' :class="{ 'visibility' : item.visibility === 'hidden'}">
            <a @click='goToUrl(item.data)' class="component-date-select-data" :class="{ 'cur' : item.isShow }" >
              <span>{{ item.data | formatDate 'day' }} <br> {{ item.data | formatDate 'week' }}</span>
            </a>
          </li>
        </ul>
        <ul>
          <li v-for='item in resetDateSelectData[1]' :style='liStyle' :class="{ 'visibility' : item.visibility === 'hidden'}">
            <a @click='goToUrl(item.data)' class="component-date-select-data" :class="{ 'cur' : item.isShow }" >
              <span>{{ item.data | formatDate 'day' }} <br> {{ item.data | formatDate 'week' }}</span>
            </a>
          </li>
        </ul>
        <ul>
          <li v-for='item in resetDateSelectData[2]' :style='liStyle' :class="{ 'visibility' : item.visibility === 'hidden'}">
            <a @click='goToUrl(item.data)' class="component-date-select-data" :class="{ 'cur' : item.isShow }" >
              <span>{{ item.data | formatDate 'day' }} <br> {{ item.data | formatDate 'week' }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="component-date-select-right" :class="{ 'disable' : selectRightDisable }" @click='rightClick'>&gt;</div>
  </div>
</template>

<script>

export default {

  name: 'ComponentDateSelect',
  data(){
    return{
      setTransition:false,
      setTransform:{transform:'translate3d(0,0,0)'},
      page:0,
      selectLeftDisable:false,
      
      oneDayTime:24*60*60,
      list:[
        [
          {data:'',visibility:'visible',isShow:false,isChange:false},
          {data:'',visibility:'visible',isShow:false,isChange:false},
          {data:'',visibility:'visible',isShow:false,isChange:false},
          {data:'',visibility:'visible',isShow:false,isChange:false}
        ],
        [
          {data:'',visibility:'visible',isShow:false,isChange:false},
          {data:'',visibility:'visible',isShow:false,isChange:false},
          {data:'',visibility:'visible',isShow:false,isChange:false},
          {data:'',visibility:'visible',isShow:false,isChange:false}
        ],
        [
          {data:'',visibility:'visible',isShow:false,isChange:false},
          {data:'',visibility:'visible',isShow:false,isChange:false},
          {data:'',visibility:'visible',isShow:false,isChange:false},
          {data:'',visibility:'visible',isShow:false,isChange:false}
        ]
      ]
    }
  },
  props:{
    dateSelectData:Object,
    bodyWidth:Number
  },
  watch:{
   'dateSelectData':{
    handler: function() {
      if(!this.dateSelectData) return this.list
      let today = this.dateFormat(this.dateSelectData.nowDate)
      
      let checkDate = this.dateFormat(this.dateSelectData.checkDate)
      this.list[1][3-(today-checkDate)%4].data = new Date(this.dateSelectData.checkDate).getTime()
      
      this.setData(3-(today-checkDate)%4)

      },
    deep:true
    }
  },
  computed:{
    selectRightDisable(){
      if(this.list[2].filter((item)=>{
        return item.visibility === 'hidden'
      }).length === 4){
        return true
      }else{
        return false
      }
    },
    
    resetDateSelectData(){
      
      this.list.map((item)=>{
        item.map((item)=>{
          if(item.data === new Date(this.dateSelectData.checkDate).getTime()){
            item.isShow = true
          }else{
            item.isShow = false
          }
        })
      })

      this.list.map((item)=>{
        item.map((item)=>{
          if(item.data > new Date(this.dateSelectData.nowDate).getTime()){
            item.visibility = 'hidden'
          }else{
            item.visibility = 'visible'
          }
        })
      })


      return this.list
    },

    liStyle(){
      return {width:this.bodyWidth * 0.2 + 'px'}
    }
  },
  methods: {
    setData(ind){
      // debugger
      this.list[1].map((item,index,array)=>{
        if(index !== ind){
          item.data = array[ind].data + this.oneDayTime*1000 * (index - ind)
        }
      })

      this.list[0].map((item,index)=>{
        item.data = this.list[1][0].data - this.oneDayTime*1000 * ( Math.abs(index-3) + 1 )
      })

      this.list[2].map((item,index)=>{
        item.data = this.list[1][3].data + this.oneDayTime*1000 * ( index + 1 )
      })


    },
    dateFormat(time){
      
      return ~~(this.$commonTool.formatStringDate(time)/this.oneDayTime)
    },
    
    
    goToUrl(n){
      this.$route.router.go({
        name:'ReportIndex',
        params:{time:~~(n/1000)}
      })
    },
    leftClick(){
      if(this.selectLeftDisable === true ) return false
      if(this.setTransition === true) return false
      this.selectLeftDisable = true
      this.setTransition = true
      setTimeout(()=>{
        this.setTransform = {transform:'translate3d('+ this.bodyWidth * 0.8  +'px,0,0)'}
        setTimeout(()=>{

          this.list.map((item,index,array)=>{
            item.map((item)=>{
              item.data = item.data - this.oneDayTime*4*1000
            })
          })
          
          this.selectLeftDisable = false
          this.setTransition = false
          this.setTransform = {transform:'translate3d(0,0,0)'}
        },300)
      },0)

    },
    rightClick(){
      if(this.selectRightDisable === true ) return false
      if(this.setTransition === true) return false
      this.selectRightDisable = true
      this.setTransition = true
      setTimeout(()=>{
        this.setTransform = {transform:'translate3d(-'+ this.bodyWidth * 0.8  +'px,0,0)'}
        setTimeout(()=>{
          this.list.map((item,index,array)=>{
            item.map((it)=>{
              it.data = it.data + this.oneDayTime*4*1000
            })
          })
          this.selectRightDisable = false
          this.setTransition = false
          this.setTransform = {transform:'translate3d(0,0,0)'}
        },350)
      },0)
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
    .component-date-select-center-main{
      width:pxToRem(1800px);
      height: 100%;
      /* transition:transform 0.3s linear 0s; */
      position: absolute;
      top:0;
      left:pxToRem(-600px);
      &.transition{
        transition:transform 0.3s linear 0s;
      }
    }
    ul{
      width:pxToRem(600px);
      height: 100%;
      display: block;
      float: left;

    }
    li{
      width: pxToRem(150px);
      height:100%;
      display: block;
      float: left;
      text-align: center;
      visibility:visible;
      &.hidden{
        visibility:hidden;
      }
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
