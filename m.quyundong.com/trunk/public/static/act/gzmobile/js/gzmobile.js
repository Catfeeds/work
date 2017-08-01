$phoneNumber = $("#phoneNumber");

$phoneNumber.blur(function(){
  if(!isPhoneNumber()){
    $(".tip").html("请填写正确的手机号码！");
  }else{
    $(".tip").html("");
  }
});

$(".gzm-info span").click(function(){
  $(".gzm-info").css({"height":"0","margin-top":"-10px","font-size":"0"});
  $(".checkCode-box").addClass("hide");
  $(".gzm-information").removeClass("hide");
  $(".gzm-hill").css("top","-6px");
});

$(".close").click(function(){
  $(".gzm-alert").addClass("hide");
}); 

$(".btnBack").click(function(){
  $(".gzm-info").attr("style","");
  $(".checkCode-box").removeClass("hide");
  $(".gzm-information").addClass("hide");
  $(".gzm-hill").attr("style","");
});

$(".btnShare").click(function(){
  $(".gzm-share").removeClass("hide");
});
$(".gzm-share").click(function(){
  $(this).addClass("hide");
});

$(".btnJoin").click(function () {
  $(".tip").html("");
  $(".info span").html("请稍候！");
  $(".close").addClass("hide");
  if(isPhoneNumber()){
    $(".gzm-alert").removeClass("hide");
    var callback = function(res){
      console.log(res);
      if(res.code == "0000"){
        $(window).scrollTop(0);
        $(".gzm-info span").addClass("hide");
        $(".gzm-info").css({"position":"fixed","bottom":"0","left":"0"});
        $(".gzm-success").removeClass("hide");
        $(".gzm-main").addClass("hide");
        $(".gzm-alert").addClass("hide");
        $(".gzm-people").removeClass("hide");
        $(".gzm-information").removeClass("hide");
      }else if(res.code == "7002"){
        window.location.href = res.data.redirect_url;
      }else if(res.code == "5004"){
        $(window).scrollTop(0);
        $(".gzm-info span").addClass("hide");
        $(".gzm-info").css({"position":"fixed","bottom":"0","left":"0"});
        $(".gzm-success").removeClass("hide");
        $(".gzm-main").addClass("hide");
        $(".gzm-alert").addClass("hide");
        $(".gzm-people").removeClass("hide");
        $(".gzm-information").removeClass("hide");
        $(".gzm-success p").html("你已经领取过优惠券！马上下载APP使用优惠吧！")
      }else{
        $(".info span").html(res.msg);
        $(".close").removeClass("hide");
      }
    }

    var errorCallback = function(res){
      $(".info span").html(res);
      $(".close").removeClass("hide");
    }

    var num = $("#phoneNumber").val();
    ajaxGetCoupon(callback,errorCallback,num);
  }else{
    $(".tip").html("请填写正确的手机号码！");
  } 
});

function ajaxGetCoupon(callback,errorCallback,num){
  $.ajax({
    type:"get",
    url:"/chinaMobileActivity/getCoupon/?phone="+num+"&client_time="+newDate(),
    success: function(data){
      var res = JSON.parse(data);
      callback(res);
    },
    error: function(xhr, type){
      errorCallback(type);
      alert('网络错误');
    }
  });
  // var data = '{"code":"0000","msg": "获取成功","data": {"redirect_url":"http://www.baidu.com"}}'; 
  // var res = JSON.parse(data);
  // callback(res);
}

function newDate (){
  return parseInt(new Date().getTime()/1000);
}

function isPhoneNumber(){
  if(!isNaN($phoneNumber[0].value-"0") == true && $phoneNumber[0].value.length == 11 && /13|14|15|17|18/i.test($phoneNumber[0].value.substring(0,2)) ){
    return true;
  }else{
    return false;
  }
}