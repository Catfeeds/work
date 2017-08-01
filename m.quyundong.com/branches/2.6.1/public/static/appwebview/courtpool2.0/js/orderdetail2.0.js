import { dprImagesFixed } from '../../../../themes/qu201/js/includes/dprImagesFixed';
import { TimestampToMinutesComponent } from '../../../../js-lib/time';

window.onload = function() {
    var $designWidth = $("body").attr("data-design-width");
    var $designdpr = $("body").attr("data-design-dpr");
    $("html").attr("data-dpr",window.devicePixelRatio);
    if(!$designWidth){
      $designWidth = 640;
    }
    if(!$designdpr){
      $designdpr = 2;
    }
    // console.log($windowWidth,$designWidth,$designdpr);
      $(window).resize(function(){
         var $windowWidth = $(window).width();
        if($windowWidth > $designWidth){
          $windowWidth = $designWidth;
        }
        $("html").css("font-size",(100/($designWidth/$designdpr)) * $windowWidth + "px");
      });
    var loadInterval = setInterval(function() {
        if ($(".loading").attr("data-lock") == "1") {
            $(".loading").addClass("hide");
            $(".main").removeClass("hide");
            clearInterval(loadInterval);
            setTimeout(function(){
                var $windowWidth = $(window).width();
                if($windowWidth > $designWidth){
                  $windowWidth = $designWidth;
                }
                $("html").css("font-size",(100/($designWidth/$designdpr)) * $windowWidth + "px");
            },100);

        }
    }, 500);
}

$(document).ready(function(){

  dprImagesFixed();
  $(".timeout").each(function(){
    var callback = function(){
        // console.log("finish");
        window.location.reload();
    }
    new TimestampToMinutesComponent(this,callback)
  });

});
