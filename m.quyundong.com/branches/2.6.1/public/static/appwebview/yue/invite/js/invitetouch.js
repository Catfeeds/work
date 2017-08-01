var starY = null;
var starYtrue = null;
var dY = null;
var $main = $(".yue-c5-main");
var $pages = $(".yue-c5-page");
var delta = null;
var animateTimeEdge = 600;
var animateTime = 600;
var page = 1;

$main.css("width","100%");

document.addEventListener('touchstart', function(event) {
    var finger = event.touches[0];  //获得手指
    console.log('touchstart',finger.pageY,event);
    // event.preventDefault();
    starY = finger.pageY;
    starYtrue = finger.pageY;
  });

// touchmove
document.addEventListener('touchmove', function(event) {
  var finger = event.touches[0];  //获得手指
  console.log('touchmove',finger.pageY);
  event.preventDefault();
  if(myulIsNotAnimate()){
    if(dY <= 0 && dY >= ($pages.eq(0).height() - $main.height()*$pages.length)){
        dY = dY + (finger.pageY - starY) * 1;
      }else{
        // dY = dY;
        dY = dY + (finger.pageY - starY) / 2;
      }
  }
  starY = finger.pageY;
  console.log("dY=",dY);
  $main.css({"-webkit-transform":"translate3d(0,"+dY+"px,0)","transform":"translate3d(0,"+dY+"px,0)"});
});

// touchend
document.addEventListener('touchend', function(event) {
  if(page >= $pages.length - 1){
    
    fixedPageShow();
  }else{
    $("#icon-down").removeClass("hide");
  }
  var finger = event.touches[0];  //获得手指
  console.log('touchend',event);
  // event.preventDefault();
  delta = starYtrue - starY ;
  console.log("delta=",delta,"starYtrue=",starYtrue,"starY=",starY,"dY=",dY);
  if(myulIsNotAnimate()){
    if(dY > 0){
        $main.animate({"transform":"translate3d(0,0,0)","-webkit-transform":"translate3d(0,0,0)"},animateTimeEdge,"ease");
        dY = 0;
      }else if(dY <= -$main.height()*$pages.length + $pages.eq(0).height() ){
        console.log("move",$pages.eq(0).height() - $main.height()*$pages.length);
        $main.animate({"transform":"translate3d(0," + ($pages.eq(0).height() - $main.height()*$pages.length) + "px,0)","-webkit-transform":"translate3d(0," + ($pages.eq(0).height() - $main.height()*$pages.length) + "px,0)"},animateTimeEdge,"ease");
        dY = -$main.height()*$pages.length + $pages.eq(0).height();
      }else if(delta > 0){
        page = Math.abs(Math.ceil(dY / $pages.eq(0).height())) + 1;
        
        $main.animate({"transform":"translate3d(0," + ( - $pages.eq(0).height()) * page + "px,0)","-webkit-transform":"translate3d(0," + ( - $pages.eq(0).height()) * page + "px,0)"},animateTime,"ease");
        dY = - $pages.eq(0).height() * page ;
        console.log("dY=",dY,"page=",page);
      }else if(delta < 0){
        page = Math.abs(Math.ceil(dY / $pages.eq(0).height()));
        
        $main.animate({"transform":"translate3d(0," + ( - $pages.eq(0).height()) * page + "px,0)","-webkit-transform":"translate3d(0," + ( - $pages.eq(0).height()) * page + "px,0)"},animateTime,"ease");
        dY = - $pages.eq(0).height() * page ;
        console.log("dY=",dY,"page=",page);
      }
  }
  // console.log('hello',$main.attr("style").indexOf("transition"));
  console.log(-$main.height()*$pages.length + $pages.eq(0).height(),$pages.length,page);
  
});

$("#icon-down").click(function(){
  if(page == $pages.length - 1){
    
     fixedPageShow();
  }else{
    $("#icon-down").removeClass("hide");
  }
  if(myulIsNotAnimate()){
    page = Math.abs(Math.ceil(dY / $pages.eq(0).height())) + 1;
    $main.animate({"transform":"translate3d(0," + ( - $pages.eq(0).height()) * page + "px,0)","-webkit-transform":"translate3d(0," + ( - $pages.eq(0).height()) * page + "px,0)"},animateTime,"ease");
    dY = - $pages.eq(0).height() * page ;
    console.log("dY=",dY,"page=",page);
  }
  
});

function myulIsNotAnimate (){
  if($main.attr("style").indexOf("transition") == -1){
    return true;
  }else{return false}
} 

document.querySelector(".Join").addEventListener('touchend', function(event) {

   fixedPageShow();
});

function fixedPageShow(){
  $("#icon-down").css("display","none");
  $(".yue-c5-page-fixed").removeClass("hide");
  $(".yue-c5-page-fixed").animate({"top":"0"},600,"ease-out");
}