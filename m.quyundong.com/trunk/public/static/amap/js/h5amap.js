$(document).ready(function(){
  navigator.geolocation.getCurrentPosition(function(p){
    AMap.convertFrom([p.coords.longitude,p.coords.latitude],"gps",function(status,result){
      // console.log(status,result);
      $("body").attr("data-location-lnglat",result.locations[0].lng+","+result.locations[0].lat);
    });
  });
});

var mapOpt = getURLInformation();
var venueLng = null;
var venueLat = null;
var venueLnglat = [];
var markerName = "";
var setZoom = 16;
var address = "";
var amapKey = $("body").attr("data-amap-key");


if(!!mapOpt.vaddress){
  address = decodeURIComponent(mapOpt.vaddress);
}else{
  address = "地址出错";
}

if(!!mapOpt.vname){
  markerName = decodeURIComponent(mapOpt.vname);
}else{
  markerName = "名称有误";
}

if(!!mapOpt.vlnglat){
  venueLnglat = mapOpt.vlnglat.split(",");
  venueLng =  deal6Decimal(venueLnglat[0]);

  venueLat =  deal6Decimal(venueLnglat[1]);

}else{
  venueLnglat = ["116.231700","39.542700"];
  markerName = "位置出错";
  setZoom = 9;
}

console.log(venueLnglat);
// if(!!mapOpt.clnglat){
//   var cityLnglat = mapOpt.clnglat.split(",");
// }

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

$(".f-center span").html(address);

var map = new AMap.Map($("#container")[0]);  

map.setZoom(setZoom);
map.setCenter(venueLnglat);

var marker = new AMap.Marker({
  position:venueLnglat,
  draggable: false,
  cursor: 'auto',
  content:"<div class='nm-amap-marker'><i class='marker-icon'><img src='http://webapi.amap.com/theme/v1.3/markers/b/mark_bs.png'></i><div class='marker-bar'><b>"+ markerName +"</b></div></div>",
  animation:""
});

marker.setMap(map);

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
  console.log("suc",e);
}

function onError(e){
  console.log("err",e);
}

var clickListener = AMap.event.addListener(map, "click", function(e){
  console.log(e);
});


$(".f-right a").click(function(){
  var startLnglat = [];
  if(!!$("body").attr("data-location-lnglat")){
    startLnglat = $("body").attr("data-location-lnglat").split(",");
    window.location.href = "http://m.amap.com/navi/?start="+startLnglat[0]+","+startLnglat[1]+"&dest="+venueLnglat[0]+","+venueLnglat[1]+"&destName="+ markerName +"&key="+amapKey+"&naviBy=car";
  }else{
    window.location.href = "http://m.amap.com/navi/?&dest="+venueLnglat[0]+","+venueLnglat[1]+"&destName="+ markerName +"&key="+amapKey+"&naviBy=car";
  } 
});

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
