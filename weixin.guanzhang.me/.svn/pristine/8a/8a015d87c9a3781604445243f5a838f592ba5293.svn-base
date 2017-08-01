<template>
    <div class="cct">
       <table>
           <thead>
               <tr>
                   <th v-for="key in head">{{key}}</th>
               </tr>
           </thead>
           <tbody>
               <tr v-for="key in vdata">
                    <td>{{key.name }}</td>
                    <td>{{key.field | fromMoney }}</td>
                    <td>{{key.goods | fromMoney }}</td>
               </tr>
           </tbody>
       </table>
    </div>
</template>
<script>

export default {
  name: 'ComponentCommontable',
  props:{
    head:Array,
    venuedata:Array
  },
  computed:{
    vdata(){
      if(!this.venuedata) return false
      if(this.venuedata[0] === undefined) return false
      if(!!this.venuedata[0].name) return this.venuedata
      return [{ "name": "现金","field":this.venuedata.cash.field,"goods":this.venuedata.cash.goods},
      { "name": "银行卡","field":this.venuedata.bankCard.field,"goods":this.venuedata.bankCard.goods},
      { "name": "储值卡余额扣费","field":this.venuedata.chargeCard.field,"goods":this.venuedata.chargeCard.goods},
      { "name": "储值卡赠送余额扣费","field":this.venuedata.chargeCardPresent.field,"goods":this.venuedata.chargeCardPresent.goods},
      { "name": "合计","field":this.venuedata.total.field,"goods":this.venuedata.total.goods}]
  }
  }
}
</script>

<style lang="sass">
.cct{
    table{
        width: 100%;
        th,td{
            text-align: center;
            color:#111;
            font-size:0.12rem;
            border-bottom: 1px solid #ddd;
            padding:0.18rem 0 0.1rem;
            &:first-of-type{
                text-align: left;
            }
        }
        td:first-of-type,th{
            color:#777;
        }
    }
}
</style>
