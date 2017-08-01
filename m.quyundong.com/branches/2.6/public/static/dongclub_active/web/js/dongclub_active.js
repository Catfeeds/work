window.onload =  function  () {
  var timerLock = setInterval(function(){
    if(lock){
      afterReady ();
      clearInterval(timerLock);
    }
  },1000);
}
var myURL = window.location.href.split('#')[0];

if(isWeixin()){
  $(".btn").attr({"href":"javascript:;"});
  $(".btn").click(function(){
    $(".wxshare").removeClass("hide");
  });
}else if(!isApp(myURL)){
  lock = 1;
  $(".btn").addClass("hide");
}else{
  lock = 1;
}
$(".close").click(function(){
  $(".wxshare").addClass("hide");
});

function afterReady (){
  $(".loading").addClass("hide");
  $(".main").removeClass("hide");
}

//微信判别
function isWeixin (){
  if(window.navigator.userAgent.indexOf("MicroMessenger") === -1 ){
    return false;
  }else{return true}
}
  //app判别
function isApp (url){
  if(url.indexOf("gosportapp") === -1 ){
    return false;
  }else{return true}
}