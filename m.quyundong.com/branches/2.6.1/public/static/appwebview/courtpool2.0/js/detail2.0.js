import { dprImagesFixed } from '../../../../themes/qu201/js/includes/dprImagesFixed';
import { ShowErrorMsg } from '../../../../js-lib/showErrorMsg';
import { isWeixin , isMQQ } from '../../../../js-lib/uatest';
// import { testData } from '../../../../js-lib/testData';

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
        myScroll.resize();
    }, 500);
    document.addEventListener("touchmove",function(e){
      e.preventDefault();
    });
}

$(document).ready(function(){

  dprImagesFixed();

  var nmToast = new ShowErrorMsg($(".nm-toast")[0]);

  $(".radio label").each(function(){
    check(this);
  });

  $(".radio label").on("touchstart",function(e){
    
    $(this).find("input").prop("checked","checked");
    // console.log($(".radio input").eq(0).prop("checked"));
    // console.log($(".radio input").eq(1).prop("checked"));
    // console.log($(".radio input").eq(2).prop("checked"));
    $(".radio label").each(function(){
      check(this);
    });
  });

  $(".radio label").on("click",function(e){
    e.preventDefault();
  });

  // $(".radio input").on("change",function(){
  //   console.log("change");
  //   $(".radio label").each(function(){
  //     check(this);
  //   });
  // });

  function check(dom){
    if($(dom).find("input").prop("checked") === true){
      $(dom).find("img").eq(0)[0].src = "/static/appwebview/courtpool2.0/images/detail2.0/icon-box-true-dpr2x.png";
    }else{
      $(dom).find("img").eq(0)[0].src = "/static/appwebview/courtpool2.0/images/detail2.0/icon-box-false-dpr2x.png";
    }
  }

  function checkInputValue(){
    var val = false;
    $(".radio input").each(function(){
      if($(this).prop("checked") === true){
        val =  this.value;
      }
    });
    return val;
  }

  $(".detail-fixed-right").click(function(){

    //不可加入
    var j_status = parseInt( window.join_status );
    if( j_status != 1 ) { return false; }
    //是否登录
    var u_id = parseInt( window.user_id );
    var url = '/login'
    // if(isNaN(u_id) || u_id <= 0) { window.location.replace('/login'); return; }
    if(isNaN(u_id) || u_id <= 0) { window.location.replace(typeof urlAddParams == 'function' ? urlAddParams(url) : url); return; }
    
    if($(this).hasClass("disable")) return false;
    $(".nm-cover").removeClass("hide");
  });

  $(".nm-cover").click(function(e){
    if(e.target.className.indexOf("nm-cover") !== -1){
      $(this).addClass("hide");
    }
  });

  $(".sure").click(function(){
    if($(this).hasClass("disable")) return false;
    var value = checkInputValue();
    // console.log(value);
    if(!value){
      $(this).addClass("disable");
      var that = this;
      var callback = function(){
        $(that).removeClass("disable");
      }
      nmToast.show("请选择您的水平",callback);
      return false;
    }
    var cp_level = value;
    window.addCourtpoolOrder( cp_level, window.court_pool_id, window.user_id );
  });

  $(".detail-fixed-left").click(function(){
    if($(this).hasClass("disable")) return false;
    $(".nm-share").removeClass("hide");
  });

  $(".nm-share").click(function(){
    $(".nm-share").addClass("hide");
  });

  var ajaxCallback = function(res){
    $(".main").attr("data-ajax-lock","false");
    if(res.status == "0000"){
      window.page_current ++;
      if(window.page_current*1 >= window.page_total*1){
        $(".players-list-tips").addClass("hide");
      }
      var lists = [];
      for(let i = 0 ; i < res.data.length ; i ++){
        var li = document.createElement("li");
        li.innerHTML = `
          <li>
            <div class="od-site-players-left"><img src="${res.data[i].avatar}"></div>
            <div class="od-site-players-right"><p class="username">${res.data[i].user_name}</p><p class="hadpin">已拼${res.data[i].join_times}场 与我同场${res.data[i].with_times}次</p></div>
          </li>
        `;
        lists.push(li);
      }
      for(let i = 0 ; i < lists.length ; i++){
        $(".od-site-players ul")[0].appendChild(lists[i]);
      }
      var prevTop = $(".touchscrollelement").position().top;        
      myScroll.resize();
      $(".touchscrollelement").css("top",prevTop);
    }else{
      nmToast.show(res.msg);
    }
  };



  function ajaxTranslist(callback, errorCallback) {
      // setTimeout(function() {
      //     var data = testData;
      //     callback(data);
      // }, 2000);
      var page = window.page_current*1 + 1
      $.ajax({
          type: 'get',
          url: page_url+"&page="+page,
          success: function(data) {
            console.log(data);
              try {
                  var res = JSON.parse(data);
                  callback(res);
              } catch (e) {
                  console.log(e);
              }
          },
          error: function(xhr, type) {
              errorCallback(xhr.status);
              // alert('网络错误');
          }
      })
  }

  function loadMoreElement(){
    if(window.page_current*1 < window.page_total*1 && $(".main").attr("data-ajax-lock") == "false"){
      $(".main").attr("data-ajax-lock","true");
      ajaxTranslist(ajaxCallback, errCallback);
    }
  }

  function errCallback(res) {
    $(".main").attr("data-ajax-lock","false");
    nmToast.show(res);
  }

  if(!![].forEach){
    window.myScroll = new TouchScroll({
        id: 'wrapper',
        'opacity': 0,
        ondrag: function(e, t) {
          // console.log(t);
            if (isBottom()) {
                setTimeout(loadMoreElement, 0);
            }
        }
    });
  }else{
    window.myScroll = {};
    window.myScroll.resize = function(){};
  }


  function isBottom() {
    var delta = $(".touchscrollelement").height() - $("#wrapper").height() <= Math.abs($(".touchscrollelement").position().top);
    if (delta)
        return true;
    else
        return false;
  }

  ;(function(){
    if(window.page_current*1 >= window.page_total*1){
      $(".players-list-tips").addClass("hide");
    }
  })();

  console.log("isWeixin=====",isWeixin(window.navigator.userAgent));
  var ua = window.navigator.userAgent;
  if( isWeixin(ua) || isMQQ(ua) ){
    $(".nm-share .share").removeClass("hide");
    $(".nm-share .msg").addClass("hide");
  }else{
    $(".nm-share .share").addClass("hide");
    $(".nm-share .msg").removeClass("hide");
  }
});
