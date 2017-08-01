"use strict";

$(document).ready(function(){
  
  $(window).scroll(function () {
    console.log($(window).scrollTop(),$(document).height() - $(window).height());
    if($(window).scrollTop() == $(document).height() - $(window).height()){
      $(".load-ajax").removeClass("hide");
      if($("body").attr("data-ajax") == 1){
        $("body").attr("data-ajax","0");
        var ajaxCallback = callback;
        var errorCallback = null;
        var page = parseInt($("body").attr("data-page")) + 1;
        var user_id = parseInt($("body").attr("data-user-id"));
        var count = 20;
        ajaxGetList(ajaxCallback,errorCallback,user_id,page,count);
      }
    }
  });
});

function callback(res){
  if(res.code == "1" ){

    console.log(res);
    
    for( var i = 0 ; i < res.data.lists.length ; i ++ ){
      var li = document.createElement("li");
      li.innerHTML = "<span class='date'>"+res.data.lists[i].add_date+"</span>"
                    +"<span class='desc'>"+res.data.lists[i].remark+"</span>"
                    +"<span class='msg "+ returnClassName(res.data.lists[i].type,"cur") +"'>"+ returnAdd(res.data.lists[i].type) +res.data.lists[i].growth+"</span>"
      $(li).appendTo($("#historyUl"));
    }
    var page = parseInt($("body").attr("data-page")) + 1;
    $("body").attr("data-page",page);

    if(res.data.page == res.data.total_page){
      $("body").attr("data-ajax","0");
      $(".load-ajax").addClass("finish");
      $(".last").removeClass("hide");
    }else{
      $("body").attr("data-ajax","1");
    }

  }else{
    console.log(res);
    alert(res.msg);

  }

  function returnClassName(bol,className){
    if(bol == 1){
      return className;
    }else{
      return "";
    }
  }

  function returnAdd(bol){
    if(bol == 1){
      return "-";
    }else{
      return "+";
    }
  }

}

function ajaxGetList(callback,errorCallback,user_id,page,count){
  $.ajax({
    type:"get",
    url:"/usergrade/record?user_id="+ user_id +"&page="+ page +"&count="+ count +"&client_time="+newDate(),
    success: function(data){
      try{
        
        var res = JSON.parse(data);
        callback(res);
      }catch(e){
        console.log(e);
        var res = data;
        callback(res);
      }
    },
    error: function(xhr, type){
     
      alert('网络错误');
    }
  });
}

function newDate(){
  return parseInt(new Date().getTime()/1000);
}