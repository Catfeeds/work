<template>
    <div class="component-light-time">
      <div class="component-light-time-left">
        <ul>
          <li v-for='item in leftData'>{{ item }}</li>
        </ul>
      </div>
      <div class="component-light-time-right">
        <table>
          <thead>
            <tr>
              <td>灯光时长</td>
              <td>场次时长</td>
              <td>差值</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for='item in rightData'>
              <td>{{ item.lightTime }}</td>
              <td>{{ item.orderTime }}</td>
              <td>{{ item.lightTime - item.orderTime }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>
<script>

export default {
  name: 'ComponentLightTime',
  props:{
    data:Object
  },
  data(){
    return{
       
    }
  },
  computed:{
    leftData(){
      let list = []
      if(!!this.data){
        this.data.list.map((item)=>{
          list.push(item.time)
        })
        list.push(this.data.businessEndTime)
      }
      return list
    },
    rightData(){
      if(!!this.data){
        return this.data.list
      }else{
        return []
      }
    }
  }
}
</script>

<style lang="sass">
@import '../sass/base';
  .component-light-time{
    padding-top: pxToRem(10px);
    width:100%;
    .component-light-time-left{
      width: pxToRem(160px);
      padding-right:pxToRem(30px);
      text-align: right;
      box-sizing:border-box;
      float: left;
      ul{padding-top:pxToRem(60px)}
      li{
        height: pxToRem(81px);
        font-size: pxToRem(30px);
        color:#777;
      }
    }
    .component-light-time-right{
      width: pxToRem(580px);
      float: left;
      text-align: center;
      table{
        font-size: pxToRem(30px);
        color:#111;
        margin-bottom: pxToRem(30px);
        width:100%;
        border-collapse: collapse;
        table-layout: fixed;
        thead{color:#777;}
        td{
          text-align: center;
          height: pxToRem(80px);
        }
        tbody{
          border:2px solid #e0e0e0;
          tr{border:1px solid #e0e0e0}
          td{border: 1px solid #e0e0e0}
          tr:nth-child(2n){background-color: #f1f2f5;}
        }
      }
    }
  }
</style>
