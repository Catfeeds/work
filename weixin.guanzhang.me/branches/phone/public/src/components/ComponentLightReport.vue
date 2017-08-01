<template>
<div>
  <div class="light-report-title">
    <i class="blue"></i>
    <span>场次</span>
    <i class="yellow"></i>
    <span>开灯</span>
  </div>
  <div class="light-report-chart">
    <div class="light-report-chart-left">
      <ul>
        <li v-for="item in lightReportData.chartData">{{ item.name }}</li>
      </ul>
    </div>
    <div class="light-report-chart-right">
      <div class="light-report-chart-scroll-box" v-bind:style="lightReportData.style">
        <div class="light-report-chart-right-tltle">
          <ul>
            <li v-for="item in lightReportData.hours">{{ item }}</li>
          </ul>
        </div>
        <div class="light-report-chart-right-main" v-bind:style="lightReportData.styleHeight">
          <ul>
            <li v-for="item in lightReportData.hours"></li>
          </ul>
          <div class="light-report-chart-bar" v-for="item in lightReportData.lightLists" v-bind:style="item"></div>
        </div>
      </div>
    </div>
  </div>
</div>
  
</template>

<script>
export default {

  name: 'CompoentLightReport',

  props:{
    lightReportData:Object
  }

  
}

</script>

<style lang="sass">

@import '../sass/base';
  .light-report-title{
    padding-top:pxToRem(60px);
    padding-bottom:pxToRem(20px);
    text-align: left;
    span{
      padding-left:pxToRem(20px);
    }
    i{
      display: inline-block;
      width: pxToRem(20px);
      height: pxToRem(20px);
      border-radius: 50%;
    }
    .blue{
      background-color: #3c89d7;
      margin-left:pxToRem(30px) ;
    }
    .yellow{
      background-color: #ffba49;
      margin-left:pxToRem(70px) ;
    }
  }
  .light-report-chart{
    width: 100%;
    display: flex;
    overflow: hidden;
    padding-bottom:pxToRem(50px);
    .light-report-chart-left{
      width: pxToRem(130px);
      ul{
        padding-top:pxToRem(50px);
        li{
          height:pxToRem(100px);
        }
      }
    }
    .light-report-chart-right{
      flex:1;
      overflow-x:scroll; 
      .light-report-chart-scroll-box{
        display: flex;
        flex-direction: column;
      }
      .light-report-chart-right-main{
        flex:1;
        position: relative;
        ul{
          width: 100%;
          height: 100%;
          li{
            width: pxToRem(120px);
            height: 100%;
            float: left;
            box-sizing:border-box;
            border-left:1px solid #ddd;
          }
        }
        .light-report-chart-bar{
          height: pxToRem(20px);
          border-radius: 4px;
          position: absolute;
          
        }
      }
      .light-report-chart-right-tltle{
        height: pxToRem(50px);
        text-align: left;
        li{
          width: pxToRem(120px);
          float: left;
        }
      }
    }
  }

</style>
