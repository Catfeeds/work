"use strict";
var myscore = $("body").attr("data-score");
var scoreStart = $("body").attr("data-score-start");
var scoreEnd = $("body").attr("data-score-end");

var level = $("body").attr("data-level");

$(".info-close").click(function(){
  $(".info-box").addClass("info-box-start");
  setTimeout(function(){
    $(".cover").addClass("hide");
    $(".info-box").addClass("hide");
  },200);
});

$(".icon").click(function() {
  $(".info-box .power-title").text($(this).attr("data-power-title"));
  $(".info-box .explain").text($(this).attr("data-explain"));
  $(".info-box .stint").text($(this).attr("data-stint"));
  $(".info-box .info-icon img").attr("src",$(this).find("img").attr("data-src").replace(/false/,"true"));
  $(".cover").removeClass("hide");
  $(".info-box").removeClass("hide");
  setTimeout(function(){
    $(".info-box").removeClass("info-box-start");
  },10);
});

$(document).ready(function(){
  $("img").each(function(){
      var dpr;
      if($("html").attr("data-dpr")>2){
        dpr = "@3x";
      }else{
        dpr = "@2x";
      }
      
      if(this.getAttribute("data-src")){
        var src = this.getAttribute("data-src").replace(/@3x/,dpr);
        this.src = src;
      }
      
  });
  $(".use-background").each(function(){
    var dpr;
    if($("html").attr("data-dpr")>2){
      dpr = "@3x";
    }else{
      dpr = "@2x";
    }
    if(this.getAttribute("data-src") && this.getAttribute("data-src") != "url()"){
      var src = this.getAttribute("data-src").replace(/@3x/,dpr);
      this.style.backgroundImage = src;
    }
  });
});

function scoreToLong(num,start,end){
  var num = parseInt(num);
  var start = parseInt(start);
  var end = parseInt(end);

  if(end === start){
    return "100%";
  }
  
  num = ( num - start ) / ( end - start );
  if(num < 1){
    return num * 100 + "%";
  }else{
    return "100%";
  }
}

function windowOnloadCallback(){
  var timeout = setTimeout(function(){
    $(".level-bar-inner").css("width",scoreToLong(myscore,scoreStart,scoreEnd));
    $(".level-bar-num").css({"left":scoreToLong(myscore,scoreStart,scoreEnd),
                            "transform":"translateX(-"+scoreToLong(myscore,scoreStart,scoreEnd)+")",
                            "-webkit-transform":"translateX(-"+scoreToLong(myscore,scoreStart,scoreEnd)+")"});
  },0);
  $(".myscore").html(myscore);
  $(".fixedscore").html("/" + scoreEnd);

}

window.onload = function(){
  var loadInterval = setInterval(function() {
    $(".loading").addClass("hide");
    $(".mylevel-main").removeClass("hide");
    clearInterval(loadInterval);
    windowOnloadCallback();
  },500);
}

