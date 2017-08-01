<template>
  <div class="report-index">
    <component-date-select :date-select-data='dateSelectData' :body-width='bodyWidth'></component-date-select>
    <component-money-get :money-get-data='moneyGetData'></component-money-get>
    <component-venue-business :venue-business-data='venueBusinessData'></component-venue-business>
    <component-business-char :business-char-data='businessCharData'></component-business-char>
  </div>
</template>

<script>
import ComponentDateSelect from './ComponentDateSelect_new.vue';
import ComponentMoneyGet from './ComponentMoneyGet.vue';
import ComponentVenueBusiness from './ComponentVenueBusiness.vue';
import ComponentBusinessChar from './ComponentBusinessChar.vue';


export default {

  name: 'ReportIndex',

  components: {
    ComponentDateSelect,
    ComponentMoneyGet,
    ComponentVenueBusiness,
    ComponentBusinessChar
  },
  props:{
    bodyWidth:Number
  },
  data () {
    return {
      dateSelectData:{
        checkDate:null,
        nowDate:null
      },
      moneyGetData:null,
      venueBusinessData:[],
      businessCharData:[]
    }
  },
  route: {
    data ({ to }) {
      // This is the route data hook. It gets called every time the route
      // changes while this component is active.
      // 
      // What we are doing:
      // 
      // 1. Get the `to` route using ES2015 argument destructuring;
      // 2. Get the `page` param and cast it to a Number;
      // 3. Fetch the items from the store, which returns a Promise containing
      //    the fetched items;
      // 4. Chain the Promise and return the final data for the component.
      //    Note we are waiting until the items are resolved before resolving
      //    the entire object, because we don't want to update the page before
      //    the items are fetched.

      this.fetchReportIndexData(to.params.time)
    }
  },
  methods: {
    fetchReportIndexData(time){
      var baseUrl = this.$root.baseFetchUrl
      var venueId = this.$root.venueId
      this.$fetchLoading({
        url: baseUrl +  '/getReportIndexData?time='+time + '&venueId=' + venueId + '&_=' + Date.now(), method: 'GET'
      },(response)=>{
       
        let res = response.data
        let resData = response.data.data
        if(res.status === '0000'){
          let moneyGetData = {
            moneyGetDataBase:resData.moneyGetData,
            date:this.$commonTool.formatStringDate(resData.date.checkDate)
          }
          this.$set('dateSelectData',resData.date)
          this.dateSelectData.checkDate = resData.date.checkDate
          this.dateSelectData.nowDate = resData.date.nowDate
          this.$set('moneyGetData',moneyGetData)
          this.$set('venueBusinessData',resData.venueBusinessData)
          this.$set('businessCharData',resData.businessCharData)
        }else if (res.status === "0001") {
          window.location.href = window.location.origin + '/wx'
        }else{
          this.$root.showErrorShow(res.status +'_' +res.msg)
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
.report-index{
  padding-bottom:0.2rem;
}
</style>
