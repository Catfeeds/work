;(function () {
  var $teamCarouselUl = $(".team-Carousel ul");
  var $teamCarouselLis = $(".team-Carousel ul li");
  var $teamCarousel = $(".team-Carousel");
  var $iconLeft = $(".icon-left");
  var $iconRight = $(".icon-right");
  var Carousel =
  new Touchwx({
      $myul:$teamCarouselUl,
      $mylis:$teamCarouselLis,
      $photograph:$teamCarousel,
      animateTime:300,
      animateTimeEdge:300
    });

    function Touchwx (obj){

      this.$myul = obj.$myul,
      this.$mylis = obj.$mylis,
      this.$photograph = obj.$photograph,
      this.starX = null,
      this.dX = null,
      this.delta = null,
      this.starXtrue = null,
      this.animateTime = obj.animateTime,
      this.animateTimeEdge = obj.animateTimeEdge,
      this.page = 1;

      var $myul = this.$myul,
        $mylis = this.$mylis,
        $photograph = this.$photograph,
        $page = this.$page,
        starX = this.starX,
        dX = this.dX,
        delta = this.delta,
        starXtrue = this.starXtrue,
        animateTime = this.animateTime,
        animateTimeEdge = this.animateTimeEdge,
        page = this.page;

      $myul.css("width",$mylis.length * 100 + "%");
      $mylis.each(function(){
        $(this).css({"width":100/$mylis.length + "%"});
      });


      // touchstart
      $photograph[0].addEventListener('touchstart', function(event) {
        var finger = event.touches[0];  //获得手指
        // console.log('touchstart',finger.pageX,event);
        event.preventDefault();
        starX = finger.pageX;
        starXtrue = finger.pageX;
      });


      // touchmove
      $photograph[0].addEventListener('touchmove', function(event) {
        var finger = event.touches[0];  //获得手指
        // console.log('touchmove',finger.pageX);
        event.preventDefault();
        if(myulIsNotAnimate()){
          if(dX <= 0 && dX >= ($mylis.eq(0).width() - $myul.width())){
              dX = dX + (finger.pageX - starX) * 1;
            }else{
              // dX = dX;
              dX = dX + (finger.pageX - starX) / 2;
            }
        }
        starX = finger.pageX;
        // console.log("dX=",dX);
        $myul.css({"-webkit-transform":"translate3d("+dX+"px,0,0)","transform":"translate3d("+dX+"px,0,0)"});
      });


      // touchend
      $photograph[0].addEventListener('touchend', function(event) {
        var finger = event.touches[0];  //获得手指
        // console.log('touchend',event);
        event.preventDefault();
        delta = starXtrue - starX ;
        // console.log("delta=",delta,"starXtrue=",starXtrue,"starX=",starX,"dX=",dX);
        if(myulIsNotAnimate()){
          if(dX > 0){
              $myul.animate({"transform":"translate3d(0px,0,0)","-webkit-transform":"translate3d(0px,0,0)"},animateTimeEdge,"ease");
              dX = 0;
            }else if(dX <= -$myul.width() + $mylis.eq(0).width() ){
              // console.log("move",$mylis.eq(0).width() - $myul.width());
              $myul.animate({"transform":"translate3d(" + ($mylis.eq(0).width() - $myul.width()) + "px,0,0)","-webkit-transform":"translate3d(" + ($mylis.eq(0).width() - $myul.width()) + "px,0,0)"},animateTimeEdge,"ease");
              dX = -$myul.width() + $mylis.eq(0).width();
            }else if(delta > 0){
              page = Math.abs(Math.ceil(dX / $mylis.eq(0).width())) + 1;
              $myul.animate({"transform":"translate3d(" + ( - $mylis.eq(0).width()) * page + "px,0,0)","-webkit-transform":"translate3d(" + ( - $mylis.eq(0).width()) * page + "px,0,0)"},animateTime,"ease");
              dX = - $mylis.eq(0).width() * page ;
              // console.log("dX=",dX,"page=",page);
            }else if(delta < 0){
              page = Math.abs(Math.ceil(dX / $mylis.eq(0).width()));
              $myul.animate({"transform":"translate3d(" + ( - $mylis.eq(0).width()) * page + "px,0,0)","-webkit-transform":"translate3d(" + ( - $mylis.eq(0).width()) * page + "px,0,0)"},animateTime,"ease");
              dX = - $mylis.eq(0).width() * page ;
              // console.log("dX=",dX,"page=",page);
            }
        }

        if(page == 0){
          $iconLeft.addClass("opacity0");
        }else if(page == 2){
          $iconRight.addClass("opacity0");
        }else{
          $iconLeft.removeClass("opacity0");
          $iconRight.removeClass("opacity0");
        }
        // console.log('hello',$myul.attr("style").indexOf("transition"),'page:'+page);
      });

      function myulIsNotAnimate (){
        if($myul.attr("style").indexOf("transition") == -1){
          return true;
        }else{return false}
      } 
    }
})()