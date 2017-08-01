<template>
    <div class="cbd">
        <div class="char-container" v-show="bCharData">
                <ul class="char-grid" id="char-container">
                    <li><span>{{parseInt(maxCharY*2/3)}}</span></li>
                    <li><span>{{parseInt(maxCharY/3)}}</span></li>
                    <li><span>0</span></li>
                    <canvas id="charLine"></canvas>
                </ul>
                <div class="char-week">
                   <span v-for="key in charDataLength7">周{{ key.data  | checkDate 'week'}}</span>
               </div> 
               <div class="char-period">
                   <span><i :style="bgColor1"></i>{{ charDataStartAndEnd[0] | checkDate 'day' }}至{{ charDataStartAndEnd[1] | checkDate 'day' }}趋势</span><span><i :style="bgColor2"></i>{{ charDataStartAndEnd[2] | checkDate 'day' }}至{{charDataStartAndEnd[3] | checkDate 'day' }}趋势</span>
               </div>   
        </div>
        <div class="char-nodata" v-else>
            暂无数据
        </div>  
    </div>
</template>
<script>
export default {

  name: 'ComponentBusinessData',
  props:{
    businessCharData:Array
  },
  data(){
    return {
        oContainer:null,oCharLine:null,lineCtx:null,charScaleWid:0,maxCharY:0,
        colorArr:["#ffba49","#3c89d7"],
        bgColor1:null,
        bgColor2:null,
        dayStart1:0,
        dayStart2:0,
        dayEnd1:0,
        dayEnd2:0,
        dayMonthStart1:0,
        dayMonthStart2:0,
        dayMonthEnd1:0,
        dayMonthEnd2:0,
        dataStr1:"",
        dataStr2:"",
        bCharData:true
    }
  },
  computed:{
    charDataStartAndEnd(){
        if(!this.businessCharData.length) return [0,0,0,0]
        var arr1 = this.businessCharData.slice(0,7)
        var arr2 = this.businessCharData.slice(7,this.businessCharData.length)
        var arr = []
        arr.push(arr1[0].data,arr1[arr1.length - 1].data,arr2[0].data,arr2[arr2.length - 1].data)
        return arr
    },
    charDataLength7(){
        if(!this.businessCharData.length) return []
        return this.businessCharData.slice(0,7)
    }
  },
  watch:{
    'businessCharData':{
        handler:function  () {
            this.init()
        },
        deep:true
    }
  },
  filters:{
    checkDate(date,type){
        let s = String(date).indexOf('-') == -1 ? date * 1000 : date
        return this.$commonTool.formatDate(s,type)
    }
  },
  methods:{
    init(){
        this.bgColor1 = {"background-color":this.colorArr[0]};
        this.bgColor2 = {"background-color":this.colorArr[1]};
        this.oContainer = document.getElementById("char-container");
        this.oCharLine = document.getElementById("charLine");
        this.lineCtx = this.oCharLine.getContext("2d");
        var wid = document.body.clientWidth - this.remToPx(0.15*2);
        this.oCharLine.width = wid;
        this.charScaleWid = wid/7;
        this.oCharLine.height = this.remToPx(0.45*3)+3;
        this.maxCharY = this.getMinParseintNum(this.getMaxCharY());
        
        this.lineCtx.clearRect(0, 0, this.oCharLine.width, this.oCharLine.height)

        if(this.businessCharData.length > 0){
            var point1 = this.businessCharData.slice(0,7);
            var point2 = this.businessCharData.slice(7,this.businessCharData.length);
            for(var i=0,count=0;i<this.businessCharData.length;i++){
                count += Number(this.businessCharData[i].value);
            }
            if( 0 == count){
                this.bCharData = false;
            }else{
                this.bCharData = true;
            }
            
            this.drawChar(point1,0);
            this.drawChar(point2,1);
        }
    },
    remToPx : function(rem){
        var wid = document.body.clientWidth;
        return rem*200*(wid/750);
    },
    drawChar : function(pointArr,type){
        this.lineCtx.beginPath();
        this.lineCtx.lineWidth = 1;
        this.lineCtx.strokeStyle = this.colorArr[type];
        this.lineCtx.fillStyle = this.colorArr[type];
        for(var i=0;i<pointArr.length-1;i++){
            var x1 = this.charScaleWid/2+i*this.charScaleWid;
            var x2 = this.charScaleWid/2+(i+1)*this.charScaleWid;
            var y1 = ((this.maxCharY - pointArr[i].value)/this.maxCharY)*this.oCharLine.height;
            var y2 = ((this.maxCharY - pointArr[i+1].value)/this.maxCharY)*this.oCharLine.height;
            this.lineCtx.moveTo(x1, y1);
            this.lineCtx.lineTo(x2,y2);
            this.lineCtx.stroke();
            this.lineCtx.beginPath();
            if(pointArr.length-2 == i){
                this.lineCtx.arc(x2,y2,2,0,2*Math.PI);
            }
            this.lineCtx.arc(x1,y1,2,0,2*Math.PI);
            this.lineCtx.fill();
        }
    },
    getMaxCharY : function(){
        var max = 0;
        for (var i = 0; i < this.businessCharData.length; i++) {
            if(this.businessCharData[i].value > max){
                max = this.businessCharData[i].value;
            }
        };
        return max;
    },
    getMinParseintNum : function(max){
        return Math.ceil((max/3)/10)*10*3;
    }
  }
}
</script>

<style lang="sass">
   .cbd{
        .char-container{
            height:2.1rem;
            margin-top:0.3rem;
            color:#555555;
            .char-grid{
                border-top:1px solid #ddd;
                border-bottom:1px solid #ddd;
                padding:0 0.15rem;
                position: relative;
                li{
                    height:0.45rem;
                    border-bottom:1px solid #ddd;
                    text-align:left;
                    position: relative;
                    span{
                        position: absolute;
                        bottom:0.02rem;
                    }
                    &:last-of-type{
                        border-bottom: none;
                    }
                }
            }
            .char-week{
                padding:0 0.15rem;
                span{
                    float: left;
                    width:(100%/7);
                    padding:0.2rem 0;
                }
            }
            canvas{
                position: absolute;
                top:0;
                left:0.15rem;
            }
            .char-period{
                span{
                    margin:0 0.15rem;
                    i{
                        display: inline-block;
                        vertical-align: middle;
                        width:0.06rem;
                        height:0.06rem;
                        border-radius: 50%;
                        margin-right:0.03rem;
                    }
                }
            }
        }
        .char-nodata{
            padding:0.15rem 0;
        }
   }
</style>
