var $phoneNumber = $("#phoneNumber");
var coach5lock = 1;
var keylong = 0;
$phoneNumber.focus(function(){
  keylong = -100000;
});
$phoneNumber.blur(function(){
  keylong = $("#checkCode").val().length;
  if(!isPhoneNumber()){
    $(".tip").html("请填写正确的手机号码！");
  }else{
    $(".tip").html("");
  }
});
document.onkeydown = function(){
  console.log(keylong);
  keylong++;
  if(keylong>4 && isPhoneNumber()){
    $(".btnJohn").removeClass("cur");
  }
};

$("#checkCode").focus(function(){
  keylong = $("#checkCode").val().length;
});

$("#checkCode").blur(function(){
   keylong = 0;
  $(".tip2").html("");
  if($("#checkCode").val().length >4 && isPhoneNumber()){
    $(".btnJohn").removeClass("cur");
  }
  if($("#checkCode").val() == ""){
     $(".tip2").html("不能为空");
     $(".btnJohn").addClass("cur");
  }
});


$(".checkCode").click(function () {
  $(".tip").html("");
  console.log($("#phoneNumber").val());
  if($("#phoneNumber").val() == ""){
    $(".tip").html("不能为空");
    return true;
  }else if(!isPhoneNumber()){
    $(".tip").html("请填写正确的手机号码！");
     return true;
  }
  if(isPhoneNumber() && coach5lock){
    coach5lock = 0;
   
    var callback = function(res){
      console.log(res);
      if(res.code == "1"){
        overTime();
        
        $(".tip").html(res.msg);
      }else{
        coach5lock = 1;
        $(".tip").html(res.msg);
      }
    }
    var num = $("#phoneNumber").val();
    ajaxGetSmsCode(callback,num);
  }
});

$(".btnJohn").click(function () {
  $(".tip2").html("");
  if($("#checkCode").val() == ""){
     $(".tip2").html("不能为空");
     $(".btnJohn").addClass("cur");
     return true;
  }
  if(isCode() && isPhoneNumber()){
    $(".yue-alert").removeClass("hide");
    $(".info span").html("请稍候！");
    $(".btnJohn").removeClass("cur");
    var callback = function(res){
      console.log(res);
      if(res.code == "1"){
        $(".info span").html("您已经成功注册趣运动教练版并绑定邀请码！");
        $(".close").removeClass("hide");
      }else{
        $(".info span").html(res.msg);
        $(".close").removeClass("hide");
      }
    }
    var num = $("#phoneNumber").val();
    var checkCode = $("#checkCode").val();
    ajaxCash(callback,num,checkCode);
  }else{
    $(".tip2").html("请完善信息");
    $(".btnJohn").addClass("cur");
  }
});


$(".yue-share").click(function(){
  $(".yue-share").addClass("hide");
});

$(".close").click(function(){
  $(".yue-alert").addClass("hide");
  $(".close").addClass("hide");
});

var HASH = getCookie('wx_hash');
function ajaxGetSmsCode(callback,num){
    $.ajax({
      type:"get",
      url:"/coachReward/getsmscode?phone="+num+"&client_time=" + newDate()+'&hash='+HASH,
      success: function(data){
        var res = JSON.parse(data);
		if(res.hash) HASH = res.hash;
        callback(res);
      },
      error: function(xhr, type){
        alert('网络错误');
      }
    });
    // var data = '{"code":"0000","msg": "获取成功","data": {"money":"20"}}'; 
    // var res = JSON.parse(data);
    // callback(res);
  }

function ajaxCash(callback,num,checkCode){
  $.ajax({
    type:"get",
    url:"/coachReward/postInviteCode?phone="+num+"&sms_code="+checkCode+"&client_time=" + newDate() +"&code=" +getURLInformation().code,
    success: function(data){
      var res = JSON.parse(data);
      callback(res);
    },
    error: function(xhr, type){
      alert('网络错误');
      $(".yue-alert").addClass("hide");
    }
  });
  // var data = '{"code":"0000","msg": "获取成功","data": {"money":"20"}}'; 
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

function overTime(){
  var t = 60;
  $(".checkCode").html(t+"秒后重获");
  $(".checkCode").addClass("cur");
  var s = setInterval(function(){
    t--;
    $(".checkCode").html(t+"秒后重获");
    if(t == 0){
      $(".checkCode").html("重新获取");
      coach5lock = 1;
      $(".checkCode").removeClass("cur");
      clearInterval(s);
    }
  },1000);
}

function isCode(){
  if($("#checkCode").val()){
    return true;
  }else{return false;}
}

//微信判别
function isWeixin (){
  if(window.navigator.userAgent.indexOf("MicroMessenger") === -1 ){
    return false;
  }else{return true}
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