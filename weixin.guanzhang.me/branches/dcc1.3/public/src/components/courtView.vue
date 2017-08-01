<template>
    <div class="container">
        <Header-view  :item="item"></Header-view>
        <court-view-header :court-data='courtData' :light-time-data='lightTimeData'></court-view-header>
        
    </div>
</template>

<script>
    import HeaderView from './HeaderView.vue'
    
    import CourtViewHeader from './CourtViewHeader.vue'

  export default {
      name: 'CourtView',
        components: {
            HeaderView,
            CourtViewHeader
        },
      data () {
        return {
          item:{title:"灯控报表",rightVal: '',url:""},
          cvTipsText:null,
          courtData:null,
          lightTimeData:null
        }
    },
    route:{
      data({ to }){
        var baseUrl = this.$root.baseFetchUrl
        var venueId = this.$root.venueId
        this.$fetchLoading({
          url: baseUrl + '/getcourtdata?time=' + to.params.time + '&venueId=' + venueId + '&_=' + Date.now(), method: 'GET'
        }, (response) => {
          let res = response.data
          let resData = response.data.data

          if(res.status === "0000"){
            this.$set('courtData' , resData)
          }else if (res.status === "0001") {
            window.location.href = window.location.origin + '/wx'
          }else{
            this.$root.showErrorShow(res.status +'_' + res.msg)
          }
        }, (response) => {
          if(!this.courtData){
            this.$root.showErrorShow('网络不给力，请稍后重试')
          }
        },()=> {
          // this.$root.loadingHide = false
        },()=> {
          // this.$root.loadingHide = true
        });

        this.$fetchLoading({
          url: baseUrl + '/lightDuration?time=' + to.params.time + '&venueId=' + venueId + '&_=' + Date.now(), method: 'GET'
        }, (response) => {
          let res = response.data
          let resData = response.data.data

          if(res.status === "0000"){
            this.$set('lightTimeData' , resData)
          }else if (res.status === "0001") {
            window.location.href = window.location.origin + '/wx'
          }else{
            this.$root.showErrorShow(res.status +'_' + res.msg)
          }
        }, (response) => {
          if(!this.lightTimeData){
            this.$root.showErrorShow('网络不给力，请稍后重试')
          }
        },()=> {
          this.$root.loadingHide = false
        },()=> {
          this.$root.loadingHide = true
        });
      }
    }
  }
</script>