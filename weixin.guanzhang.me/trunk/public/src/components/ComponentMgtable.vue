<template>
    <div class="mg">
        <ul>
            <li v-for="key in mData">
            <a :onclick='key.tongji ? key.tongji :"javascript:void(0)" ' :href="key.url ? key.url : 'javascript:void(0)'">
            <div>{{key.type}}<small v-show="key.tip">{{key.tip ? "(" +key.tip+ ")" : ""}}</small></div>
                <div>{{key.value | fromMoney }}</div></a>
            </li>
        </ul>
    </div>
</template>
<script>

export default {
  name: 'ComponentTablen4',
  props:{
    moneydata:Object
  },
  computed:{
    mData(){
        if(!this.moneydata) return false;
        var totalIncome = this.moneydata.moneyGetDataBase.totalIncome 
        var vipCharge = this.moneydata.moneyGetDataBase.vipCharge 
        var fieldIncome = this.moneydata.moneyGetDataBase.fieldIncome 
        var goodsIncome = this.moneydata.moneyGetDataBase.goodsIncome
        var time = this.moneydata.date
        var vueHost =  this.$commonTool.vueHost
      return [
        { type: "总收款",tip:"",value:totalIncome},
        { type: "会员充值",tip:"",value:vipCharge,url: vueHost + 'StoreCardView/' + time ,tongji:"_hmt.push(['_trackEvent', '微信报表', '报表使用点击', '首页-会员充值-点击']);"},
        { type: "场地",tip:"不包含会员卡扣费",value:fieldIncome,url:vueHost + 'CourtView/' + time ,tongji:"_hmt.push(['_trackEvent', '微信报表', '报表使用点击', '首页-场地-点击']);"},
        { type: "商品消费",tip:"不包含会员卡扣费",value:goodsIncome,url:vueHost + 'SaleitemView/' + time ,tongji:"_hmt.push(['_trackEvent', '微信报表', '报表使用点击', '首页-商品消费-点击']);"}
      ]
    }
  },
  methods:{

  }
}
</script>

<style lang="sass">
%clearfix{
    &:after{
        content: "\0020";
        display: block;
        height: 0;
        clear: both;
        overflow: hidden;
        visibility: hidden;
    }
}
.mg{
    ul{
        li{
            border-bottom: 1px solid #ddd;
            padding: 0.18rem 0 0.1rem;
            font-size:0.15rem;
            position: relative;
            min-height: 0.2rem;
            &:first-of-type{
                div:last-of-type{
                    font-size: 0.21rem;
                    margin-right:0;
                    &:after{
                        content:"";
                        display: none;
                    }
                }
            }
            div{
                &:first-of-type{
                    float:left;
                    color:#555555;
                }
                &:last-of-type{
                    float:right;
                    color:#111;
                    margin-right:0.2rem;
                    &:after{
                        content:"";
                        display: block;
                        position: absolute;
                        right:0;
                        bottom:0.15rem;
                        width:0.08rem;
                        height: 0.08rem;
                        border-top:1px solid #555555;
                        border-right:1px solid #555555;
                        border-left:1px solid transparent;
                        border-bottom:1px solid transparent;
                        transform:rotate(45deg);
                        -webkit-transform:rotate(45deg);
                    }
                }
            }
            a{
                @extend %clearfix;
            }
        }
    }
}
</style>
