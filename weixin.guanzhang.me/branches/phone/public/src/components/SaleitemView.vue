<template>
    <div class="container">
        <Header-view  :item="item"></Header-view>
        <Component-tablen4 :items=items :head=head></Component-tablen4>
    </div>
</template>

<script>
    import HeaderView from './HeaderView.vue'
    import ComponentTablen4 from './ComponentTablen4.vue'

  export default {
    name: 'SaleitemView',
    components: {
        HeaderView,
        ComponentTablen4
      },
    data () {
      return {
        item:{title:"商品报表",rightVal: '',url:""},
        head:["类型","名称","销量","库存"],
        items:null
      }
    },
    route:{
      data({ to }){
        var baseUrl = this.$root.baseFetchUrl
        var venueId = this.$root.venueId
        this.$fetchLoading({url: baseUrl + '/salereport?time=' + to.params.time + '&venueId=' + venueId + '&_=' + Date.now(), method: 'GET'}, (response) => {
            let res = response.data
            let resData = response.data.data
            if(res.status === "0000"){
              this.$set('items' , resData)
            }else if (res.status === "0001") {
              window.location.href = window.location.origin + '/wx'
            }else{
              this.$root.showErrorShow(res.status +'_' +res.msg)
            }
          }, (response) => {
            if(!this.items){
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