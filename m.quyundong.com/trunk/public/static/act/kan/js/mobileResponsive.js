$(document).ready(function(){
  var $windowWidth = $(window).width();
  setTimeout(function(){
    $windowWidth = $(window).width();
    if($windowWidth > 640){
      $windowWidth = 640;
    }
    $("html").css("font-size",(100/320) * $windowWidth + "px");
  },100);
  

  $(window).resize(function(){
    $windowWidth = $(window).width();
    if($windowWidth > 640){
      $windowWidth = 640;
    }
    $("html").css("font-size",(100/320) * $windowWidth + "px");
  });
});