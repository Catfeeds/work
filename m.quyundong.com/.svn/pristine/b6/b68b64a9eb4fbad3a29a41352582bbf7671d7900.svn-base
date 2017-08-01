<template>
  <div class="book-noPaySprite">
    <ul id="book-container">
      <li>您尚有未支付的订单</li>
      <li v-if="noPayOrderData.changci">
        <p>{{noPayOrderData.changci.order.name}}</p>
        <p>
          <span>日期：</span>
          <span>{{new Date(noPayOrderData.changci.time * 1000).format('yyyy年MM月dd日')}} (周{{getWeek(new Date(noPayOrderData.changci.time * 1000).getDay())}})</span>
        </p>
        <p>
          <span>场地：</span>
          <span>
            <em v-for="item in noPayOrderData.changci.order.goods_list">
            {{new Date(item.start_time * 1000).format("hh:mm")}}-{{new Date(item.end_time * 1000).format("hh:mm")}} {{item.course_name}} <i :class='{hide:noPayOrderData.changci.order.order_type == 3}'>{{getMoney(item.shop_price)}}元</i>
            </em>
          </span>
        </p>
        <p :class='{hide:noPayOrderData.changci.order.order_type == 3}'>
          <span>共计：</span>
          <span>{{getMoney(noPayOrderData.changci.order.order_amount)}}元</span>
        </p>
      </li>
      <li v-if="noPayOrderData.renci">
        <p>{{noPayOrderData.renci.order.name}}</p>
        <p>
          <span>套餐：</span>
          <span>{{noPayOrderData.renci.order.goods_list[0].goods_name}}</span>
        </p>
        <p><span>数量：</span><span>{{noPayOrderData.renci.order.goods_list[0].goods_number}}</span></p>
        <p><span>共计：</span><span>{{getMoney(noPayOrderData.renci.order.order_amount)}}元</span></p>
      </li>
      <li>
          <div id="book-Cancel" @click="cancelOrderHandel">取消订单</div>
          <a id="book-href" @click="payNopayorderHandel"><div id="book-pay">立即支付</div></a>
      </li>
    </ul>
  </div>
</template>

<script>

export default {

  name: 'SignupInput',
  props:{
    noPayOrderData:Object
  },
  data(){
    return {
      order_id:"",
      order_url:""
    }
  },
  ready(){
    this.order_id = this.noPayOrderData.changci ? this.noPayOrderData.changci.order.order_id : this.noPayOrderData.renci.order.order_id;
    this.order_url= "/order/pay?id=" + this.order_id;
  },
  methods:{
    cancelOrderHandel(e){
      this.$fetchLoading({url:'/order/Cancel?id='+this.order_id,method:"GET"},(response)=>{
        let res = response.data;
        if(res && res.code == 1){
          this.$root.showErrorShow("订单已取消");
          this.$dispatch("Signup-nopayorder",false);
        } else {
            this.$root.showErrorShow(res.msg);
        }
      },(response)=>{
        this.$root.showErrorShow('网络不给力，请稍后重试')
      },()=> {
        this.$root.loadingHide = false
      },()=> {
        this.$root.loadingHide = true
      })
    },
    payNopayorderHandel(e){
      this.$fetchLoading({url:'/order/beforepay?id='+this.order_id,method:"GET"},(response)=>{
        let res = response.data;
        if(res && res.code == 1){
          location.href = this.order_url;  
        } else {
          this.$root.showErrorShow(res.data);
          setTimeout(function () {
              location.reload();
          }, 1000);
        }
      },(response)=>{
        this.$root.showErrorShow('网络不给力，请稍后重试')
      },()=> {
        // this.$root.loadingHide = false
      },()=> {
        // this.$root.loadingHide = true
      })
    },
    getWeek(dd){
      var weeks = ["日","一","二","三","四","五","六"];
      return weeks[dd];
    },
    getMoney(mon){
      if(mon){
          if(mon == parseInt(mon)){
              return parseInt(mon);
          }else{
              return mon;
          }
      }else{
          return parseInt(mon);
      }
    }
  },
}

  Date.prototype.format = function(format) {
     var date = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            "S+": this.getMilliseconds()
     };
     if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
     }
     for (var k in date) {
            if (new RegExp("(" + k + ")").test(format)) {
                   format = format.replace(RegExp.$1, RegExp.$1.length == 1
                          ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
            }
     }
     return format;
  }

</script>

<style lang="sass">

.book-noPaySprite {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  font-size: 15px;
  color: #666;
  background-color: rgba(0, 0, 0, 0.5);
}
.book-noPaySprite ul {
  width:275px;
  position: relative;
  top: 50%;
  margin: 0 auto;
  line-height: 1;
  text-align: left;
  overflow: hidden;
  background-color: #fff;
  border-radius: 5px;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  font-family: "Microsoft YaHei", "Helvetica Neue", Helvetica, STHeiTi, sans-serif;
}
.book-noPaySprite ul li:nth-of-type(1) {
  padding: 0 15px;
  line-height: 40px;
  border-bottom: 1px solid #e6e6e6;
  text-align:center;
}
.book-noPaySprite ul li:nth-of-type(2) {
  padding: 10px 15px;
  line-height: 1.6;
}
.book-noPaySprite ul li:nth-of-type(2) p span:nth-of-type(1) {
  float: left;
  margin-right: 0;
}
.book-noPaySprite ul li:nth-of-type(2) p span:nth-of-type(2) {
  color: #222;
  display: block;
  overflow: hidden;
}
.book-noPaySprite ul li:nth-of-type(2) p span:nth-of-type(2) em {
  display: block;
}
.book-noPaySprite ul li:nth-of-type(3) {
  text-align: center;
  border-top: 1px solid #e6e6e6;
}
.book-noPaySprite ul li:nth-of-type(3):after {
  content: "\0020";
  display: block;
  height: 0;
  clear: both;
  overflow: hidden;
  visibility: hidden;
}
.book-noPaySprite ul li:nth-of-type(3) div {
  float: left;
  width: 50%;
  line-height: 40px;
  background-color: #f9f9f9;
}
.book-noPaySprite ul li:nth-of-type(3) #book-Cancel {
  background-image: url(/static/vue-h5-badminton-signup/images/border-r.jpg);
  background-position: right top;
  background-repeat: repeat-y;
}
.book-noPaySprite ul li:nth-of-type(3) a div {
  color: #009ff0;
}
.book-noPaySprite a, .book-noPaySprite a:hover, .book-noPaySprite a:visited {
  color: #666;
}  
</style>
