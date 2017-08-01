<template>
    <div class="sc">
        <ul class="info">
            <li v-for="val in info">
                    <div class="info-l" :style="infoL">
                        <img v-bind:src="val.src" alt="">
                    </div>
                    <div class="info-r">
                        <div>
                            <span>{{val.type}}</span><span>{{val.chargeMoney | fromMoney}}</span>
                        </div>
                        <div>
                            <span>{{val.type2}}</span><span>{{val.giveMoney | fromMoney}}</span>
                        </div>
                    </div>
                </li>
        </ul>
        <div class="table-wrap">
            <table class="table2-4">
                <thead>
                    <tr>
                        <th v-for="key in table24">{{key}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="items in table24data">
                        <td>{{items.type}}</td>
                        <td>{{items.field | fromMoney}}</td>
                        <td>{{items.goods | fromMoney}}</td>
                        <td>{{items.total | fromMoney}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="column-wrap">
            <div class="column-2">
                <div>
                    <p>{{column2[0]}}</p>
                    <p>{{column2data.total | fromMoney}}</p>
                </div>
                <div>
                    <p>{{column2[1]}}</p>
                    <p>{{column2data.give | fromMoney}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
  name: 'ComponentStorecard',
  props:{
    info:Array,
    table24:Array,
    table24data:Array,
    column2:Array,
    column2data:Object
  },
  data(){
    return{
        infoL:{"height":this.$commonTool.pxToRem(90*2),"lineHeight":this.$commonTool.pxToRem(90*2)},
    }
  }
}
</script>

<style lang="sass">
@import '../sass/base';
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
.sc{
    .info{
        padding:0 0.15rem;
        font-size: 0.15rem;
        color:#111;
        text-align: left;
        border-bottom: 1px solid #ddd;
        img{
            width:0.35rem;
            vertical-align: middle;
        }
        span{
            &:last-of-type{
                float:right;
            }
        }
        li{
            border-bottom: 1px solid #ddd;
            &:last-of-type{
                border-bottom: none;
            }
            .info-l{
                float: left;
                width:0.5rem;
            }
            .info-r{
                overflow: hidden;
                >div{
                    height:0.45rem;
                    line-height: 3;
                    &:first-of-type{
                        border-bottom:1px solid #ddd;
                    }
                }
            }
            @extend %clearfix;
        }
    }
    .table-wrap{
        padding:0 15px;
        margin-top:0.2rem;
        border-bottom:1px solid #ddd;
    }
    .table2-4{
        /*background: #f00;*/
        width:100%;
        table-layout: fixed;
        th,td{
            border-bottom:1px solid #ddd;
            line-height: 3;
            font-size: 0.12rem;
            text-align: center;
        }
        th{
            color:#777;
            &:first-of-type{
                width:1.3rem;
            }
        }
        td{
            padding-top: 0.1rem;
            &:first-of-type{
                text-align: left;
                color:#555;
            }
        }
        tbody tr{
            padding:0 15px;
            &:last-of-type{
                td{
                    border-bottom: none;
                }
            }
        }
    }
    .column-wrap{
        padding:0.2rem 0;
        border-bottom:1px solid #ddd;
    }
    .column-2{
        @extend %clearfix;
        background: url(/static/images/point.jpg) center top repeat-y;
        >div{
            float: left;
            width:50%;
        }
        p{
            &:nth-of-type(1){
                font-size:0.15rem;
                color:#111;
                margin-bottom:0.05rem;
            }
            &:nth-of-type(2){
                font-size:0.18rem;
                color:#3c89d7;
            }
        }
    }
}

</style>
