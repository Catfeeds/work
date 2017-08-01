var $moreList = $(".yue-rei-more");
var $main = $(".yue-rei-main");
var $alert = $(".yue-alert");

if($(".yue-rei-timeline-li").length >= 20){
  $moreList.removeClass("hide");
}
$moreList.click(function() {
  $alert.removeClass("hide");
  $(".info span").html("请稍候！");
  var callback = function(res){
    console.log(res);
    if(res.code == "1"){

      var timeArray = [];
      for( x in res.data){
        timeArray[timeArray.length] = x.replace(/s_/,"");
      }

      for(var i = 0 ; i < timeArray.length ; i ++){
        if($(".yue-rei-timeline-data").eq($(".yue-rei-timeline-data").length - 1).attr("data-time") == timeArray[i]){
          domAppendList(i);
        }else{
          $('<div data-time="'+ timeArray[i] +'" class="yue-rei-timeline-data">'+new Date(timeArray[i]*1000).getFullYear()+'年'+(new Date(timeArray[i]*1000).getMonth() - 0 + 1) +'月'+new Date(timeArray[i]*1000).getDate()+'日</div>'+'<ul data-time="'+ timeArray[i]+'" class="yue-rei-timeline-ul"></ul>').appendTo(".yue-rei-timeline");
          domAppendList(i);
        }
      }

      function domAppendList(i){
        var $lastUl = $(".yue-rei-timeline-ul").eq($(".yue-rei-timeline-ul").length - 1);
        for(var j = 0 ; j < res.data["s_" + timeArray[i]].length ; j ++){
          var cur10 = "";
          var cur20 = "";
          if(res.data["s_" + timeArray[i]][j].reward_status == 2){
            cur10 = "cur";
            cur20 = "cur";
          }else if(res.data["s_" + timeArray[i]][j].reward_status == 1){
            cur10 = "cur";
            cur20 = "";
          }else{
            cur10 = "";
            cur20 = "";
          }
          console.log(cur10,cur10);
          $('<li class="yue-rei-timeline-li">'+'<div class="yue-rei-timeline-li-name"><span>'+res.data["s_" + timeArray[i]][j].coach_name +'</span></div>'+'<div class="yue-rei-timeline-li-10 '+ cur10 +'"><span>&nbsp;奖励10元&nbsp;</span></div>'+'<div class="yue-rei-timeline-li-20 '+ cur20 +'"><span>&nbsp;奖励20元&nbsp;</span></div>'+'</li>').appendTo($lastUl);
        }
      }
      console.log(timeArray);

      if(timeArray.length == 0){
        $(".info span").html("全部趣友加载完毕！");
        $(".close").removeClass("hide");
      }else{
        $main.attr("data-page",$main.attr("data-page") - 0 + 1);
        $alert.addClass("hide");
      }
    }else{
      $(".info span").html(res.msg);
      $(".close").removeClass("hide");
    }
  }

  getMoreList(callback,$main.attr("data-page"));

});

$(".close").click(function(){
  $alert.addClass("hide");
});

function getMoreList(callback,page){
  $.ajax({
    type:"get",
    url:"/coachReward/getReward?coach_id="+getURLInformation().coach_id +"&page="+ (page - 0 + 1) +"&count=20"+ "&client_time=" + newDate(),
    success: function(data){
      var res = JSON.parse(data);
      callback(res);
    },
    error: function(xhr, type){
      alert('网络错误');
      $alert.addClass("hide");
    }
  });
  // setTimeout(function(){
  //   var data = '{"code": "1","msg": "操作成功","data": {"s_1439654400": [{"id": "2","coach_name": "欢喜","status": "4","reward_status": "1","add_time": "1439975538"},{"id": "2","coach_name": "欢喜","status": "4","reward_status": "2","add_time": "1439975538"},{"id": "2","coach_name": "欢喜","status": "4","reward_status": "0","add_time": "1439975538"}],"s_1449913600": [{"id": "2","coach_name": "欢喜","status": "4","reward_status": "1","add_time": "1439975538"},{"id": "2","coach_name": "欢喜","status": "4","reward_status": "1","add_time": "1439975538"},{"id": "2","coach_name": "欢喜","status": "4","reward_status": "1","add_time": "1439975538"}]}}'; 
  //   var res = JSON.parse(data);
  //   callback(res);
  // },500);
}

function newDate (){
  return parseInt(new Date().getTime()/1000);
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