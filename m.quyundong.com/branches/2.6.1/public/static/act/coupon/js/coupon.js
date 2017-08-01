var $phoneNumber = $(".phoneNumber");
var lock = 1;

$phoneNumber.blur(function(){
  if(!isPhoneNumber()){
    $(".tip").html("请填写正确的手机号码！");
  }else{
    $(".tip").html("");
  }
});

$(".btn4").click(function () {
  $(".tip").html("");
  console.log($(".phoneNumber").val());
  if($(".phoneNumber").val() == ""){
    $(".tip").html("不能为空");
    return true;
  }else if(!isPhoneNumber()){
    $(".tip").html("请填写正确的手机号码！");
     return true;
  }
  if(isPhoneNumber() && lock){
    lock = 0;
   
    var callback = function(res){
      console.log(res);
      if(res.code == "0000"){
        overTime();
        $(".tip").html(res.msg);
      }else{
        lock = 1;
        $(".tip").html(res.msg);
      }
    }
    var num = $(".phoneNumber").val();
    ajaxGetSmsCode(callback,num);
  }
});

$(".btn1").click(function () {
  $(".tip2").html("");
  if($(".checkCode").val() == ""){
     $(".tip2").html("不能为空");
     return true;
  }
  if(isCode() && isPhoneNumber()){
    $(".alert").removeClass("hide");
    $(".info span").html("请稍候！");
    var callback = function(res){
      console.log(res);
      if(res.code == "0000"){
        $(".info span").html(res.msg);
        $(".close").removeClass("hide");
      }else{
        $(".info span").html(res.msg);
        $(".close").removeClass("hide");
      }
    }
    var num = $(".phoneNumber").val();
    var checkCode = $(".checkCode").val();
    ajaxCash(callback,num,checkCode);
  }else{
    $(".tip2").html("请完善信息");
  }
});

if(isWeixin()){
  $(".btn2").removeClass("hide");
  $(".btn2").click(function(){
    $(".share").removeClass("hide");
  });
}

$(".share").click(function(){
  $(".share").addClass("hide");
});

$(".close").click(function(){
  $(".alert").addClass("hide");
  $(".close").addClass("hide");
});

function ajaxGetSmsCode(callback,num){
    $.ajax({
      type:"get",
      url:"/activityCoupon/getSmsCode/?phone="+num+"&client_time=" + newDate(),
      success: function(data){
        var res = JSON.parse(data);
        callback(res);
      },
      error: function(xhr, type){
        alert('网络错误');
      }
    });
  }

function ajaxCash(callback,num,checkCode){
  $.ajax({
    type:"get",
    url:"/activityCoupon/cash/?phone="+num+"&sms_code="+checkCode+"&client_time=" + newDate(),
    success: function(data){
      var res = JSON.parse(data);
      callback(res);
    },
    error: function(xhr, type){
      alert('网络错误');
      $(".alert").addClass("hide");
    }
  });
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

function overTime(){
  var t = 60;
  $(".btn4 span").html(t+"秒后重获");
  var s = setInterval(function(){
    t--;
    $(".btn4 span").html(t+"秒后重获");
    if(t == 0){
      $(".btn4 span").html("重新获取");
      lock = 1;
      clearInterval(s);
    }
  },1000);
}

function isCode(){
  if($(".checkCode").val()){
    return true;
  }else{return false;}
}

//微信判别
function isWeixin (){
  if(window.navigator.userAgent.indexOf("MicroMessenger") === -1 ){
    return false;
  }else{return true}
}