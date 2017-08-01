var finish = false;
var errorTimer = null;
var ajaxCommentPage = 1;
var myScroll;
var urlMsg = getURLInformation();

window.onload = function  () {
  var loadInterval = setInterval(function() {
    if($(".loading").attr("data-lock") == 1){
       $(".loading").addClass("hide");
       $(".main").removeClass("hide");
       clearInterval(loadInterval);
    }
  },500);

  myScroll = new TouchScroll({
      id: 'wrapper',
      'opacity': 0,
      ondrag: function(e, t) {
          if (isBottom()) {
              setTimeout(loadMoreElement, 1000);
          }
      }
  });

  loadMoreElement();
}


// 下拉加载更多元素
function loadMoreElement() {
  if(finish){
    // nomore();
    return false;
  } 
    var callback = function(res) {
      $("#loading").attr("data-lock","1");
      if(res.status == "0000"){
        if(res.data.length < 20 ) {
          // nomore();
          finish = true;
          if(res.data.length == 0 && ajaxCommentPage == 1){
            $(".no-msg").removeClass("hide");
            $(".scroll").addClass("hide");
          }
        }
        var lis = [];
        for(var i = 0 ; i < res.data.length ; i ++){
          var addprice = "price",
              add = "";
          if(res.data[i].money*1 > 0){
            addprice += " add";
            add = "+";
          }else if(res.data[i].money*1 == 0){
            add = "";
          }
          var li = document.createElement("li");
          li.className = "history-list-li borderBottom1px";
          li.innerHTML = '<div class="type">'+res.data[i].description+'</div>'+
                         '<div class="date">'+formatDate(res.data[i].add_time*1000)+'</div>'+
                         '<div class="'+addprice+'">'+add+res.data[i].money+'</div>';
          lis.push(li);
        }
        for(var j = 0 ; j < lis.length ; j++ ){
          $("ul.history-list")[0].appendChild(lis[j]);
        }
        ajaxCommentPage++;
      }else{
        showErrorMsg(res.msg);
      }
      var prevTop = $(".touchscrollelement").position().top;        
      myScroll.resize();
      $(".touchscrollelement").css("top",prevTop);
    }
    var errorBack = errCallback;
    ajaxTranslist(callback, errorBack);
}

function showErrorMsg(str){
  clearTimeout(errorTimer);
  $(".nm-tips").removeClass("hide").html(str);
  setTimeout(function(){
    $(".nm-tips").addClass("opacity0");
  },0);
  errorTimer = setTimeout(function(){
    $(".nm-tips").addClass("hide");
    $(".nm-tips").removeClass("opacity0");
  },2000);

}

// function nomore(){
//   setTimeout(function(){
//     $("#pullUp span").addClass("hide");
//     $("#pullUp div").removeClass("hide");
//   },1000);
// }

function ajaxTranslist(callback, errorCallback) {
    var mobile = $("body").eq(0).attr("data-mobile");
    var url = "/usercard/translistApi?mobile="+mobile+"&card_no="+urlMsg.card_no+"&venue_id="+urlMsg.venue_id+"&page=" + ajaxCommentPage + "&client_time=" + newDate()
        url = typeof urlAddParams == 'function' ? urlAddParams(url) : url
    $.ajax({
        type: 'get',
        url: url,
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

function errCallback(res) {
  $("#loading").attr("data-lock","1");
  showErrorMsg(res);
    myScroll.resize();
}

function newDate() {
    return parseInt(new Date().getTime() / 1000);
}
function formatDate(date){
  var date = new Date(date);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  if(month*1 < 10 ){
    month = "0" + month;
  }
  var day = date.getDate();
  if(day*1 < 10){
    day = "0" + day;
  }
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  if(hours*1 < 10){
    hours = "0" + hours;
  }
  if(minutes*1 < 10){
    minutes = "0" + minutes;
  }
  if(seconds*1 < 10){
    seconds = "0" + seconds;
  }
  return year+"年"+month+"月"+day+"日&nbsp;&nbsp;"+hours+":"+minutes+":"+seconds;

}

function getURLInformation(){
  var urlMsg = {};
  if(window.location.href.split('#')[0].split('?')[1]){
    var urlSearch = window.location.href.split('#')[0].split('?')[1].split('&');
  }

  if(urlSearch){
    for(var i = 0 ; i < urlSearch.length ; i++){
      urlMsg[urlSearch[i].split('=')[0]] = urlSearch[i].split('=')[1] || "";
    }
  }
  return urlMsg;
}

function isBottom() {
    var delta = $(".touchscrollelement").height() - $("#wrapper").height() <= Math.abs($(".touchscrollelement").position().top);
    if (delta)
        return true;
    else
        return false;
}