import { NMSlider } from './includes/NMSlider';
import { NMStars } from './includes/star';
import { dprImagesFixed } from './includes/dprImagesFixed';
import { NMDataToPhotoAlbum } from './includes/NMDataToPhotoAlbum';
import { NMDetailPhotoAlbum } from './includes/NMDetailPhotoAlbum';


"use strict";
window.onload = function(){
  var $windowWidth = $(window).width();
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
  setTimeout(function(){
    $windowWidth = $(window).width();
    if($windowWidth > $designWidth){
      $windowWidth = $designWidth;
    }
    $("html").css("font-size",(100/($designWidth/$designdpr)) * $windowWidth + "px");

    var $eventBarUl = $(".event-bar ul");
    var $eventBarLis = $(".event-bar li");
    var $bookUl = $(".book ul");
    var $bookLis = $(".book li");
    var $windowWidth = $(window).width();
    var lisWidth = null;

    for(var i = 0 ; i < $eventBarLis.length; i ++ ){
      // console.log($(".event-bar li").eq(i)[0].clientWidth);
      lisWidth += $(".event-bar li").eq(i)[0].clientWidth;
    }

    // $bookUl.css("width",191*$bookLis.length*0.005+"rem;");

    // if($bookUl.width() >= $windowWidth){
    //   $(".book").addClass("NMSlider");
    // }
    $bookLis.each(function(){
      if($(this).index() > 2 &&  $(this).index() < $bookLis.length -1){
        $(this).addClass("hide");
      }
    });

    $(".more-date").click(function(){
      $bookLis.removeClass("hide");
      $(this).addClass("hide");
    });

    $(".location").click(function(){
      window.location.href = this.dataset.href;
    });

    $(".map-stop").click(function(){
      window.location.href = this.dataset.href;
    });

    lisWidth += i;
    // console.log(lisWidth);
    $eventBarUl.width(lisWidth);

    if(lisWidth >= $windowWidth){
      // var eventBar = new NMSlider($(".event-bar")[0]);
      $(".event-bar").addClass("NMSlider");
    }


    // var bookBar = new NMSlider($(".book")[0]);

    $(".header .left").click(function(){
      window.history.back();
    });

    var photoAlbum = new NMDetailPhotoAlbum($(".nm-photo-album")[0]);
    var $userCommentListAlbums = $(".user-comment-li .photo");

    $userCommentListAlbums.each(function(){
      new NMDataToPhotoAlbum(this,$(".nm-photo-album")[0]);
    });
    
    var facePhoto = new NMDataToPhotoAlbum($(".face-photo")[0],$(".nm-photo-album")[0]);
    $(".face-photo").click(function(){
      facePhoto.bindThis();
    });

    // var sportFacilitiesAlbum = new NMDataToPhotoAlbum($(".sport-facilities .album")[0],$(".nm-photo-album")[0]);
    $(".sport-facilities .album").click(function(){
      // sportFacilitiesAlbum.bindThis();
      facePhoto.bindThis($(this).attr("data-index"));
    });

    // var serveFacilitiesAlbum = new NMDataToPhotoAlbum($(".serve-facilities .album")[0],$(".nm-photo-album")[0]);
    $(".serve-facilities .album").click(function(){
      // serveFacilitiesAlbum.bindThis();
      facePhoto.bindThis($(this).attr("data-index"));
    });

    // $(".normassage .phone").click(function(){
    //   $(".nm-cover").removeClass("hide");
    //   $(".nm-alert").addClass("hide");
    //   $(".nm-cover .phone").removeClass("hide");
    // });

    $(".qu-zone").click(function(){
      $(".nm-cover").removeClass("hide");
      $(".nm-alert").addClass("hide");
      $(".nm-cover .download").removeClass("hide");
    });

    // $(".phone .telephone").click(function(){
    //   window.location.href = "tel:" + this.dataset.phone;
    //   $(".nm-cover").addClass("hide");
    // });

    $(".downloadapp").click(function(){
      window.location.href = "http://www.quyundong.com/d";
      $(".nm-cover").addClass("hide");
    });

    $(".nm-cover .cancel").click(function(){
      $(".nm-cover").addClass("hide");
    });

    $(".more-info").click(function(){
      $(this).addClass("hide");
      $(".info-serve").removeClass("hide");
    })

    // $(".nm-alert.phone .msg").html("是否拨打电话<br />"+$(".normassage .phone span").html());


    $(".NMSlider").each(function(){
      var w = new NMSlider(this);
      var li = $(this).find("li");
      li.each(function(i) {
        if ($(this).find("a").hasClass("cur")) {
            // console.log(i);
            w.set(i * -this.clientWidth);
        }
      });
    });

  },100);

  $(window).resize(function(){
    $windowWidth = $(window).width();
    if($windowWidth > $designWidth){
      $windowWidth = $designWidth;
    }
    $("html").css("font-size",(100/($designWidth/$designdpr)) * $windowWidth + "px");
  });

  
  var loadInterval = setInterval(function() {
    if($(".loading").attr("data-lock") == 1){
       $(".loading").addClass("hide");
       $(".detail-main").removeClass("hide");
       clearInterval(loadInterval);
    }
  },500);

}

$(document).ready(function(){

  var detailStarsList = $(".detail-stars");
    $(".detail-stars").each(function(){
    new NMStars(this);
  });

  dprImagesFixed();

  $(".person-card").click(function(e){
    if(!$(e.target).hasClass("buy")){
      if(this.dataset.href){
        window.location.href = this.dataset.href;
      }
    }else{
      if(e.target.dataset.href){
        window.location.href = e.target.dataset.href;
      }
    }
  });
});










