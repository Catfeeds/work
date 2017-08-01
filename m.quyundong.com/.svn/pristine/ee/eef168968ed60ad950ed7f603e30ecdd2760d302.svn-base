$(document).ready(function(){
  $("img").each(function(){
      var dpr;
      if($("html").attr("data-dpr")>2){
        dpr = "dpr3x";
      }else{
        dpr = "dpr2x";
      }
      
      if(this.getAttribute("data-src")){
        var src = this.getAttribute("data-src").replace(/dpr2x/,dpr);
        this.src = src;
      }
      
  });
  $(".use-background").each(function(){
    var dpr;
    if($("html").attr("data-dpr")>2){
      dpr = "dpr3x";
    }else{
      dpr = "dpr2x";
    }
    if(this.getAttribute("data-src") && this.getAttribute("data-src") != "url()"){
      var src = this.getAttribute("data-src").replace(/dpr2x/,dpr);
      this.style.backgroundImage = src;
    }
  });

  $(".guide-list").on("click",".guide-question",function(){
    var _thisQue = $(this);
    var _thisLi  = _thisQue.parent("li");
    var _thisArrow = _thisQue.find(".guide-arrow");
    var _thisAns = _thisLi.find(".guide-answer");
    var otherLi = _thisLi.siblings();
    if(!_thisArrow.hasClass('arrowAniCss')){
      $(".guide-arrow",otherLi).removeClass('arrowAniCss');
      // $(".guide-answer",otherLi).slideUp(300);
      $(".guide-answer",otherLi).css("display","none");
      _thisArrow.addClass('arrowAniCss');
      // _thisAns.slideDown(300);
      _thisAns.css("display","block");
    }else{
      _thisArrow.removeClass('arrowAniCss');
      _thisAns.css("display","none");
      // _thisAns.slideUp(300);
    }
  })

  $(".firstSpriteBtn").click(function(){
    $(".list-firstSprite").addClass("hide");
  })
});