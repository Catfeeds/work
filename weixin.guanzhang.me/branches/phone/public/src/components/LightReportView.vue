<template>
  <div class="light-report-view">
    <Header-View :item="item" ></Header-View>
    <component-light-report :light-report-data='lightReportData'></component-light-report>
  </div>
</template>

<script>
import HeaderView from './HeaderView.vue';
import ComponentLightReport from './ComponentLightReport.vue';

export default {

  name: 'LightReportView',

  components: {
    HeaderView,
    ComponentLightReport
  },

  data () {
    return {
      item: {title:"开灯纪录报表",rightVal: ''},
      lightReportData:{
        businessHours:null,
        chartData:null,
        style:null,
        styleHeight:null,
        hours:null,
        lightLists:null
      },
      cache:null
    }
  },
  route:{
    data({ to }){
      var baseUrl = this.$root.baseFetchUrl
      var venueId = this.$root.venueId
      this.$fetchLoading({
        url: baseUrl + '/lightreport?time=' + to.params.time + '&venueId=' + venueId + '&_=' + Date.now(), method: 'GET'
      },(response) =>{
        let res = response.data
        let resData = response.data.data
        if(res.status === "0000"){
          this.$set('cache' , this.findMaxTime(resData.business_hours.start , resData.business_hours.end))
          this.$set('lightReportData' , {
            businessHours:resData.business_hours,
            chartData:resData.data_list,
            style:this.computedCourtWidth(~~(resData.business_hours.end - resData.business_hours.start)/60 + 1 ),
            styleHeight:{ height : this.$commonTool.pxToRem(resData.data_list.length * 100)},
            hours:this.cache.hours,
            lightLists:this.dataTolLightLists(resData.data_list,resData.business_hours.start/60)
          })
        }else if (res.status === "0001") {
          window.location.href = window.location.origin + '/wx'
        }else{
          this.$root.showErrorShow(res.status + '_' + res.msg)
        }
      },(response) => {
          if(!this.cache){
            this.$root.showErrorShow('网络不给力，请稍后重试')
          }
      },()=> {
        this.$root.loadingHide = false
      },()=> {
        this.$root.loadingHide = true
      })
    }
  },
  methods: {
    dataTolLightLists(data,minTime){
      if(!data.forEach) return false;
      let lists = [];
      let that = this;
      data.forEach(function(value, index, array) {
        let firstIndex = index;
        value.userTime.forEach(function(value, index, array) {
          let obj = {
            width:that.$commonTool.pxToRem((value.endTime - value.startTime) * 2 ),
            top:that.$commonTool.pxToRem(firstIndex * 100),
            left:that.$commonTool.pxToRem(value.startTime * 2 - ( minTime * 120 ) ),
            backgroundColor:"#3c89d7"
          }
          lists.push(obj)
        });

        value.lightTime.forEach(function(value, index, array) {
          let obj = {
            width:that.$commonTool.pxToRem((value.endTime - value.startTime) * 2 ),
            top:that.$commonTool.pxToRem(firstIndex * 100 + 30),
            left:that.$commonTool.pxToRem(value.startTime * 2 - ( minTime * 120 ) ),
            backgroundColor:"#ffba49"
          }
          lists.push(obj)
        });

      });
      return lists;
    },
    computedCourtWidth(court){
      return {
          width:this.$commonTool.pxToRem( court* 120 )
        }
    },
    minuteFormat(minute){
      let hour = ~~(minute/60)
      let min = minute % 60
      if(min < 10 ) min = '0' + min
      if(hour < 10 ) hour = '0' + hour
      return hour + ':' + min
    },
    findMaxTime (start,end) {

      let hours = []
      
      let court = (end - start)/60 

      for(let i = 0 ; i < court + 1 ; i ++ ){
        let m = this.minuteFormat(start + i * 60 )
        hours.push(m)
      }

      return {

        hours:hours

      }
    }
  }
}

</script>

<style lang="sass">

</style>
