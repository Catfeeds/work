<template>
    <div class="container">
        <Header-view  :item="item"></Header-view>
        <Component-storecard :info=info :table24=table24 :table24data=table24data :column2=column2 :column2data=column2data></Component-storecard>
    </div>
</template>

<script>
    import HeaderView from './HeaderView.vue'
    import ComponentStorecard from './ComponentStorecard.vue'
  export default {
      name: 'SaleitemView',
        components: {
            HeaderView,
            ComponentStorecard
        },
      data () {
        return {
         item:{title:"储值卡报表",rightVal: '',url:""},
         table24:["","场地","商品","合计"],
         table24data:[],
         column2:["总余额","总赠送余额"],
         column2data:{total:'',give:''},
         info:[]
        }
    },
    route:{
      data({ to }){
        var baseUrl = this.$root.baseFetchUrl
        var venueId = this.$root.venueId
        this.$fetchLoading({url: baseUrl + '/getstoredata?time=' + to.params.time + '&venueId=' + venueId + '&_=' + Date.now(), method: 'GET'}, (response) => {
          let res = response.data
          let resData = response.data.data
          if(res.status === "0000"){
            let balancePay = resData.table24data.balancePay
            let presentBalancePay = resData.table24data.presentBalancePay
            let column2data = resData.column2data
            let infodata = resData.infodata
            this.$set('info' , 
              [
                { "src": "/static/images/info-add.png","type":"会员充值", "chargeMoney":infodata.vipCharge, "type2":"赠送余额充值","giveMoney":infodata.presentBalanceCharge},
                { "src": "/static/images/info-sub.png","type":"会员扣费", "chargeMoney":infodata.vipPay, "type2":"赠送余额扣费","giveMoney":infodata.presentBalancePay}
              ])
            this.$set('table24data',
              [
                { "type": "余额扣费","field":balancePay.field, "goods":balancePay.goods, "total":balancePay.total},
                { "type": "赠送余额扣费","field":presentBalancePay.field, "goods":presentBalancePay.goods, "total":presentBalancePay.total}
              ])
            this.$set('column2data',column2data)
          }else if (res.status === "0001") {
            window.location.href = window.location.origin + '/wx'
          }else{
            this.$root.showErrorShow(res.status +'_' + res.msg)
          }
        }, (response) => {
          if(!this.column2data){
            this.$root.showErrorShow( '网络不给力，请稍后重试' )
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