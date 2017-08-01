<template>
    <div class="cc">
        <div class="cv-table">
            <table >
                <thead>
                    <tr>
                        <td>场地</td>
                        <td>开灯时长 － </td>
                        <td>场次时长<br>(分钟)</td>
                        <td> ＝ 时间差</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in items">
                        <td>{{item.name}}</td>
                        <td>{{item.lightTime}}</td>
                        <td>{{item.courtTime}}</td>
                        <td>{{item.lightTime-item.courtTime}}</td>
                        <!-- <td>{{item.realGet | fromMoney }}</td> -->
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>

export default {
  name: 'ComponentCourt',
  props:{
    cvBtnText:String,
    cvText:String,
    cvTipsText:String,
    items:Array
  },
  data(){
    return{
        href:this.$commonTool.vueHost + 'LightReport/' 
    }
  },
  computed:{
    goUrl(){
        return this.href + this.$route.params.time
    }
  }
}
</script>

<style lang="sass">
    .cc{
        .cv-header,.cv-tips{
            padding-left:15*0.01rem;
            padding-right:15*0.01rem;
            font-size:15*0.01rem;
            border-bottom: 1*0.01rem solid #dddddd;
        }

        .cv-header{
            padding-top:15*0.01rem;
            padding-bottom:15*0.01rem;
            >div{
                line-height: 30*0.01rem;
            }
            .cv-header-text{
                color:#3c89d7;
                text-align: left;
            }
            .cv-header-btn{
                float: right;
                padding:0 15*0.01rem;
                border-radius: 12*0.01rem;
                background-color: #3c89d7;
                color:#fff;
                display: inline-block;
                line-height: 30*0.01rem;
            }
        }

        .cv-tips{
            .cv-tips-text{
                color:#111;
                font-size:12*0.01rem;
                padding:15*0.01rem 0;
                text-align: left;
            }
            .cv-tips-img{
                img{
                    width:100%;
                }
            }
        }
                    
        .cv-table{
            margin:0 15*0.01rem;
            table{
                width:100%;
                border-collapse: collapse;
                table-layout: fixed;
                tr.hover{
                    td{
                        background-color:#eee;
                    }
                }
                td{
                    color:#111;
                    font-size:15*0.01rem;
                    border-bottom: 1px solid #dddddd;
                    padding:18*0.01rem 0 10*0.01rem;
                    text-align: center;
                    &:first-of-type{
                        text-align:left;
                        color:#555555;
                        width:65*0.01rem;
                    }
                    &:last-of-type{
                        text-align:right;
                    }
                    &:last-of-type{
                        text-align:right;
                    }
                }
            }
        }
    }
</style>
