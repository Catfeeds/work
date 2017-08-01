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

var finish = false;
var errorTimer = null;
var ajaxCommentPage = 1;
var pageSize = 10;
var myScroll;
var urlMsg = getURLInformation();
// 下拉加载更多元素
function loadMoreElement() {
  if(finish){
    nomore();
    return false;
  } 
    var callback = function(res) {
      $("#loading").attr("data-lock","1");
      if(res.code == "1"){
        if(res.data.length < pageSize ) {
          nomore();
          finish = true;
          if(res.data.length == 0 && ajaxCommentPage == 1){
            $(".sr-noItem").removeClass("hide");
            $("#wrapper").addClass("hide");
          }
        }
        var lis = [];
        for(var i = 0 ; i < res.data.length ; i ++){
          
          var li = document.createElement("li");
          var url = '/court/detail?id='+res.data[i].business_id+'&cid='+res.data[i].category_id
          url = typeof urlAddParams == 'function' ? urlAddParams(url) : url;
          li.setAttribute("onclick", 'window.location.href='+'"'+url+'"');
          var reg = res.data[i].sub_region ? "["+res.data[i].sub_region+"]" : "";
          li.innerHTML = '<div>'+'<span>'+res.data[i].name+'</span>'+'</div>'+
                         '<div>'+reg+'</div>'+
                         '<div>地址：'+res.data[i].address+'</div>';
          lis.push(li);
        }
        //console.log(lis);
        for(var j = 0 ; j < lis.length ; j++ ){
          $(".sr-list")[0].appendChild(lis[j]);
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

function nomore(){
  setTimeout(function(){
    $("#pullUp span").addClass("hide");
    $("#pullUp div").removeClass("hide");
  },1000);
}

function ajaxTranslist(callback, errorCallback) {
  var url = "/user/favoriteList?ajax=1&page="+ajaxCommentPage
            url = typeof urlAddParams == 'function' ? urlAddParams(url) : url
	$.ajax({
        type: 'get',
        url: url,
        success: function(data) { 
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
    });
}

function errCallback(res) {
  $("#loading").attr("data-lock","1");
  showErrorMsg(res);
    myScroll.resize();
}

function newDate() {
    return parseInt(new Date().getTime() / 1000);
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