$(document).ready(function(){
  navigator.geolocation.getCurrentPosition(function(p){
    AMap.convertFrom([p.coords.longitude,p.coords.latitude],"gps",function(status,result){
      if(status != "error"){
        $("body").attr("data-location-lnglat",result.locations[0].lng+","+result.locations[0].lat);
      }
    });
  });
});

var venueLng = null;
var venueLat = null;
var venueLnglat = [];
var markerName = "";
var setZoom = 16;
var address = "";
var amapKey = $("body").attr("data-amap-key");
var zIndex = 1000;

if(!!stopData[0]){
  var useStopData = stopData;
  $(".footer .venue").addClass("hide");
  $(".footer .stop").removeClass("hide");
}

if(!venueData.vAddress){
  venueData.vAddress = "地址出错";
}

if(!venueData.vName){
  venueData.vName = "名称有误";
}

if(!!venueData.vLnglat){
  venueLnglat = venueData.vLnglat;
  var orilnglat = new AMap.LngLat(venueLnglat[0]-0, venueLnglat[1]-0);
}else{
  venueLnglat = ["116.231700","39.542700"];
  markerName = "位置出错";
  setZoom = 9;
}

$(".venue .f-center span").html(venueData.vName);
$(".venue .f-right a").click(function(){
  gotoSomeWhere(venueData.vLnglat,venueData.vName);
});




function BuildDataAndSlider(dom){
  this.dom = dom;
  this.init();
  // this.bindEvent();
}



BuildDataAndSlider.prototype.init = function() {
  this.ul = document.createElement("ul");
  this.ul.style.width = $(window).width() * stopData.length + "px";
  for( var i = 0 ; i < stopData.length ; i ++){
    this.ul.innerHTML +=  "<li style='width:"+100/stopData.length+"%'><div class='f-left'>"+
                            "<i><img src='/static/amap/images/p-location.png'></i>"+
                          "</div>"+
                          "<div class='f-center'>"+
                            "<span>"+stopData[i].stopName+"</span>"+
                          "</div>"+
                          "<div class='f-right'>"+
                            "<a data-lnglat="+stopData[i].stopLnglat+" onclick=gotoSomeWhere(["+stopData[i].stopLnglat+"],'"+stopData[i].stopName+"')>查看路线 </a>"+
                          "</div></li>";
  }
  this.dom.appendChild(this.ul);
  for( var j = 0 ; j < stopData.length ; j ++){
    $(".circle-bar")[0].innerHTML += "<i></i>";
  }
};

function NMPhotoSlider(dom,index){
  this.dom = dom;
  // this.indexLocation = indexLocation;
  this.index = index || 0;
  this.init();
  this.bindEvent();
}

NMPhotoSlider.prototype.init = function(){
  $(".circle-bar i").eq(this.index).addClass("cur");
  // this.indexLocation.innerHTML = this.index*1 + 1;
  this.width = $(window).width() * stopData.length;
  this.liWidth = $(window).width();
  this.totle = this.dom.childNodes.length;
  this.dom.style.width = this.width + "px";
  this.windowWidth = $(window).width();
  this.lastOffset = (this.index * -1 )* (this.width/this.dom.childNodes.length);;
  this.changeX = 0;
  this.end = false; 
  this.dom.style.webkitTransform = 'translate3d('+ ( this.lastOffset ) +'px, 0, 0)';
  this.dom.style.transform = 'translate3d('+ ( this.lastOffset ) +'px, 0, 0)';
}

NMPhotoSlider.prototype.bindEvent = function() {
  var startEvent = (function startEvent(event){
    event.target.addEventListener("touchmove",moveEvent,false);
    event.target.addEventListener("touchend",endEvent,false);
    //记录刚刚开始按下的时间
    this.startTime = new Date() * 1;
    this.end = false;
    //记录手指按下的坐标
    if(event.touches){
      this.startX = event.touches[0].pageX;
    }else{
      this.startX = event.pageX;
    }
    
  }).bind(this);

  var moveEvent = (function moveEvent(event){
    //计算手指的偏移量
    event.preventDefault();
    if(!!this.end) return false;
    if(event.touches){
      this.offsetX = event.targetTouches[0].pageX - this.startX;
    }else{
      this.offsetX = event.pageX - this.startX;
    }

    this.changeX = this.offsetX + this.lastOffset;
   
    if(this.changeX >= 0){
      this.changeX = 0;
    }else if(this.changeX <= -(this.width-this.windowWidth)){
      this.changeX = -(this.width-this.windowWidth);
    }

    this.dom.style.webkitTransform = 'translate3d('+ ( this.changeX  ) +'px, 0, 0)';
    this.dom.style.transform = 'translate3d('+ ( this.changeX  ) +'px, 0, 0)';

    
  }).bind(this);

  var endEvent = (function endEvent(event){
    var endTime = new Date() * 1;
    this.end = true;
    if(!isAnimation(this.dom) && this.changeX - this.lastOffset != 0){
      if((endTime - this.startTime <= 300 && this.offsetX > 0) || (Math.abs(this.offsetX) >= this.liWidth/6 && this.offsetX > 0)){
        this.index = this.index - 1;
        if(this.index < 0) this.index = 0;
      }else if((endTime - this.startTime <= 300 && this.offsetX < 0) || (Math.abs(this.offsetX) >= this.liWidth/6 && this.offsetX < 0)){
        this.index = this.index*1 + 1;
        if(this.index > this.totle - 1) this.index = this.totle -1;
      }

      // if( endTime - this.startTime <= 300 && this.offsetX > this.liWidth/6){
      //   this.changeX = 0;
      // }else if(endTime - this.startTime <= 300 && this.offsetX < 0){
      //   this.changeX = -this.width+this.windowWidth;
      // }
      this.changeX = this.index * -this.liWidth ;
      // this.indexLocation.innerHTML = (this.index*1 + 1);
      $(this.dom).animate({"transform":"translate3d("+ this.changeX +"px,0,0)","-webkit-transform":"translate3d("+ this.changeX +"px,0,0)"},300,"linear",0);
      map.setCenter(stopData[this.index].stopLnglat);
      $(".circle-bar i").removeClass("cur");
      $(".circle-bar i").eq(this.index).addClass("cur");
      showBar(this.index);
    }

    this.lastOffset = this.changeX;

  }).bind(this);

  this.dom.addEventListener("touchstart",startEvent,false);
  // this.dom.addEventListener("mousedown",startEvent,false);
  // this.dom.addEventListener("touchmove",moveEvent,false);
  // this.dom.addEventListener("mousemove",moveEvent,false);
  // this.dom.addEventListener("touchend",endEvent,false);
  // this.dom.addEventListener("mouseup",endEvent,false);

};

function showBar(index){
  var num = stopData.length  - index;
  $(".marker-bar").addClass("hide");
  $(".marker-bar").eq(num).removeClass("hide").parents(".amap-marker").css({"z-index":zIndex});
  zIndex++;
}
window.onload = function(){
  var loadInterval = setInterval(function() {
       $(".loading").addClass("hide");
       $(".main").removeClass("hide");
       clearInterval(loadInterval);
  },500);
  new BuildDataAndSlider($(".stop")[0]);
  new NMPhotoSlider($(".stop ul")[0],0);

  if(window.navigator.userAgent.indexOf("iPhone") != -1 && window.navigator.userAgent.indexOf("UCBrowser/10.7.1.655") != -1){
    $(".footer").css("bottom","40px");
    $(".amap-zoomcontrol").css("bottom","40px");
  }
}

function isAnimation(dom){
  return !!($(dom).attr("style").indexOf("transition") != -1 || $(dom).attr("style").indexOf("webkitTransition") != -1);
}

function deal6Decimal(str){
  var arr = str.split(".");
  if(!arr[1]){

    return arr[0] + ".000000";

  }else if(arr[1].length >= 6){

    return arr[0] + "." + arr[1].substring(0,6);

  }else if(arr[1].length < 6){
    for(var i = 0 , ans = arr[0] + "." + arr[1]; i < 6 - arr[1].length; i ++){
      ans = ans + "0";
    }
    return ans;
  }
}

$(".header a").click(function(){
  window.history.back();
});


var map = new AMap.Map($("#container")[0]);  

map.setZoom(setZoom);
if(!!stopData[0]){
  map.setCenter(stopData[0].stopLnglat);
}else{
  map.setCenter(venueLnglat);
}

var hide = "";

if(!!stopData[0]){
  hide = "hide";
}

var marker = new AMap.Marker({
  position:venueLnglat,
  draggable: false,
  cursor: 'auto',
  content:"<div class='nm-amap-marker'>"+
            "<i class='marker-icon'><img src='/static/amap/images/v-location.png'></i>"+
            "<div class='marker-bar "+hide+"'>"+
              "<h2>"+venueData.vName+"</h2>"+
              "<h3>"+venueData.vAddress+"</h3>"+
            "</div>"+
          "</div>",
  animation:""
});

marker.setMap(map);


var firstStopDistanceList = [];

$.each(stopData,function(i,value){
  firstStopDistanceList.push(firstStopDistance(value.stopLnglat[0]-0,value.stopLnglat[1]-0));
});
firstStopDistanceList.push(firstStopDistance(venueData.vLnglat[0]-0,venueData.vLnglat[1]-0));
firstStopDistanceList.sort(compare);
if(firstStopDistanceList[0]){
  if(firstStopDistanceList[0]*1 > 6){
    setZoom = 11; 
  }else if(firstStopDistanceList[0]*1 > 4){
    setZoom = 12; 
  }else if(firstStopDistanceList[0]*1 > 2){
    setZoom = 13; 
  }else if(firstStopDistanceList[0]*1 > 0.5){
    setZoom = 14; 
  }
  map.setZoom(setZoom);
}

function compare(value1, value2) {
   if (value1 < value2) {
       return 1;
   } else if (value1 > value2) {
       return -1;
   } else {
       return 0;
   }
}
var markerList = [];
$.each(stopData, function(i, value) {
    var hide = "hide";
    if(i==0){
      hide = "";
    }
    var marker = new AMap.Marker({
        position:value.stopLnglat,
        draggable: false,
        cursor: 'auto',
        content:"<div class='nm-amap-marker'>"+
                  "<i class='marker-icon'><img src='/static/amap/images/p-location.png'></i>"+
                  "<div class='marker-bar "+hide+"'>"+
                    "<h2>"+value.stopName+"</h2>"+
                    "<h3>距场馆"+venueDistance(value.stopLnglat[0]-0,value.stopLnglat[1]-0)+"km</h3>"+
                  "</div>"+
                "</div>",
        animation:""
    });
    markerList.push(marker);
    markerListSetMap();
});
function markerListSetMap(){
  if(markerList.length == stopData.length ){
    for(var i = markerList.length -1 ; i >= 0 ; i --){
      markerList[i].setMap(map);
    }
  }
}



map.plugin('AMap.Geolocation', function () {
    var geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true,        //显示定位按钮，默认：true
        buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
        buttonOffset: new AMap.Pixel(10, 70),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
    });
    map.addControl(geolocation);
    AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
    AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
});

map.plugin(["AMap.ToolBar"],function(){
    //加载工具条
    var tool = new AMap.ToolBar({
        offset : new AMap.Pixel(10,130)
    });
    map.addControl(tool);   
});

function onComplete(e){
}

function onError(e){
}


function venueDistance(x,y){
  var x = x *1;
  var y = y *1;
  if(!orilnglat) return false;
  return (orilnglat.distance([x, y])/1000).toFixed(2);

}

function firstStopDistance(x,y){
  var x = x *1;
  var y = y *1;
  if(!stopData[0]) return false;
  var orilnglat = new AMap.LngLat(stopData[0].stopLnglat[0]-0, stopData[0].stopLnglat[1]-0);
  return (orilnglat.distance([x, y])/1000).toFixed(2);

}


function gotoSomeWhere(venueLnglat,name){
  var venueLnglat = venueLnglat;
  var startLnglat = [];
  var markerName = name;
  if(!!$("body").attr("data-location-lnglat")){
    startLnglat = $("body").attr("data-location-lnglat").split(",");
    window.location.href = "//m.amap.com/navi/?start="+startLnglat[0]+","+startLnglat[1]+"&dest="+venueLnglat[0]+","+venueLnglat[1]+"&destName="+ markerName +"&key="+amapKey+"&naviBy=car";
  }else{
    window.location.href = "//m.amap.com/navi/?&dest="+venueLnglat[0]+","+venueLnglat[1]+"&destName="+ markerName +"&key="+amapKey+"&naviBy=car";
  } 
}

function getURLInformation(){
  var urlMsg = {};
  if(window.location.href.split('#')[0].split('?')[1]){
    var urlSearch = window.location.href.split('#')[0].split('?')[1].split('&');
  }

  if(urlSearch){
    for(var i = 0 ; i < urlSearch.length ; i++){
      urlMsg[urlSearch[i].split('=')[0]] = urlSearch[i].split('=')[1] || "";
    }
  }
  return urlMsg;
}
