import { dprImagesFixed } from '../../qu201/js/includes/dprImagesFixed';
// import { iconBackgroundPosition } from './includes/iconBackgroundPosition';

window.onload = function() {

    var loadInterval = setInterval(function() {
        if ($(".loading").attr("data-lock") == 1) {
            $(".loading").addClass("hide");
            $(".user-main").removeClass("hide");
            clearInterval(loadInterval);
        }
    }, 500);

    // $(".icon-type").each(function(){
    //   iconBackgroundPosition(this.dataset.type,this);
    // });

    $(".user-telephone").click(function(){
        $(".nm-cover").removeClass("hide");
    });

    $(".cancel").click(function(){
        $(".nm-cover").addClass("hide");
    });
}

$(document).ready(function(){
  dprImagesFixed();
});
