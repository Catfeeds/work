$phoneNumber = $("#phoneNumber");
$checkNumber = $("#checkNumber");
$getCheckNumber = $("#getCheckNumber");
// $getCheckNumber.addClass("disable");
$send = $("#send");
var timerBack = null;
var timerAlert = null;
var timer = null;
var time = 60;

$phoneNumber.keyup(function(){
  // if(isPhoneNumber($phoneNumber.val())){
  //   $getCheckNumber.removeClass("disable");
  // }else{
  //   $getCheckNumber.addClass("disable");
  // }
  if($phoneNumber.val() === "" || $phoneNumber.val().length < 11) return true;
  console.log($phoneNumber.val().length);
  if(!isPhoneNumber($phoneNumber.val())){
    $send.addClass("disable error").html("请输入正确的手机号码");
    backToNormal();
  }else if($checkNumber.val() == ""){
    $send.removeClass("disable error").html("进入你的专属领域");
    $send.addClass("disable");
  }else if(!isCheckNumber($checkNumber.val())){
    $send.addClass("disable error").html("请输入正确的验证码");
    backToNormal();
  }else{
    $send.removeClass("disable error").html("进入你的专属领域");
    backToNormal();
  }


});

$checkNumber.keyup(function(){
  if($checkNumber.val() == ""){
    $send.addClass("disable");
  }else if(!isCheckNumber($checkNumber.val())){
    $send.addClass("disable error").html("请输入正确的验证码");
    backToNormal();
  }else if(isPhoneNumber($phoneNumber.val())){
    $send.removeClass("disable error").html("进入你的专属领域");
    backToNormal();
  }
});

$(".close").click(function(){
  $(".nm-cover").addClass("hide");
}); 

// 获取验证码按钮
$getCheckNumber.click(function(){
  // if($(this).hasClass("lock")) return false;
  if($(this).hasClass("disable")) return false;
  if(!isPhoneNumber($phoneNumber.val())){
    $send.addClass("disable error").html("请输入正确的手机号码");
    backToNormal();
    return false;
  }else{

    $(this).addClass("disable").html(time + "秒后获取");

    timer = setInterval(function(){
      if(time <= 0 ){
        clearInterval(timer);
        $getCheckNumber.removeClass("disable").html("重新获取");
        time = 60;
        
      }else{
        time --;
        $getCheckNumber.html(time + "秒后再获取");
      }
    },1000);

    $(".nm-cover").removeClass("hide");
    $(".close").addClass("hide");
    $(".nm-alert p").html("请稍候！");

    // 请求成功（“0000”状态）
    var callback = function(res){
      if(res.code == "1"){
        $(".nm-alert p").html("验证码发送成功");
        $(".close").removeClass("hide");
        timerAlertFn();
      }else{
        $(".nm-alert p").html(res.msg);
        $(".close").removeClass("hide");
        timerAlertFn();
      }
    }

    var errorCallback = function(res){
      $(".nm-alert p").html(res);
      $(".close").removeClass("hide");
    }

    var num = $("#phoneNumber").val();
    
    ajaxGetCheckNumber(callback,errorCallback,num);
  }

});

// 进入你的专属领域按钮
$send.click(function () {
  if($(this).hasClass("disable")) return false;
  $(".nm-alert p").html("请稍候！");
  $(".close").addClass("hide");

  if(!isPhoneNumber($phoneNumber.val())){
    $send.html("请输入正确的手机号码");
    return false;
  }

  if(!isCheckNumber($checkNumber.val())){
    $send.html("请输入正确的验证码");
    return false;
  }

  if(isPhoneNumber($phoneNumber.val()) && isCheckNumber($checkNumber.val())){
    $(".nm-cover").removeClass("hide");
    var callback = function(res){
    // 请求成功（“0000”状态）跳转
    if(res.code== "0000"){
      // 跳转链接
      $(".nm-cover").addClass("hide");
      setTimeout(function(){
        window.location.href = res.data.url;
      },100);
        
      }else{
        // 请求成功（非“0000”状态，显示msg）

        $(".nm-alert p").html(res.msg);
        $(".close").removeClass("hide");
        timerAlertFn();
      }
    }
    
    // 请求失败处理
    var errorCallback = function(res){
      $(".nm-alert p").html("error");
      $(".close").removeClass("hide");
      timerAlertFn();
    }

    var num = $("#phoneNumber").val();
    var checkNumber = $("#checkNumber").val();
    
    ajaxSend(callback,errorCallback,num,checkNumber);
  }
});

// Ajax发送手机号码和验证码
function ajaxSend(callback,errorCallback,num,checkNumber){
  var url = "/s/g/?phone="+num+"&checkNumber="+checkNumber+"&client_time="+newDate()
      url = typeof urlAddParams == 'function' ? urlAddParams(url) : url
  $.ajax({
    type:"get",
    url:url,
    success: function(data){
      console.log(data);
      // try{
      //   var res = data;
      //   callback(res);
      // }catch(e){
      //   console.log(e);
        var res = JSON.parse(data);
        callback(res);
      // }
    },
    error: function(xhr, type){
      errorCallback(type);
      timerAlertFn();
      alert('网络错误');
    }
  });

  // setTimeout(function(){
  //     var data = {"status":"0000","msg":"\u9886\u53d6\u6b21\u6570\u8d85\u51fa\u9650\u989d","data":[]}; 
  //     try{
  //       var res = data;
  //       callback(res);
  //     }catch(e){
  //       console.log(e);
  //       var res = JSON.parse(data);
  //       callback(res);
  //     }  
  // },2000);

}

// Ajax请求验证码
function ajaxGetCheckNumber(callback,errorCallback,num){
  var url = "/Sms/sendCode/?phone="+num+"&type=11&client_time="+newDate()
      url = typeof urlAddParams == 'function' ? urlAddParams(url) : url
  $.ajax({
    type:"get",
    url:url,
    success: function(data){
      console.log(data);
      // try{
      //   var res = data;
      //   callback(res);
      // }catch(e){
      //   console.log(e);
        var res = JSON.parse(data);
        callback(res);
      // }
    },
    error: function(xhr, type){
      errorCallback(type);
      timerAlertFn();
      alert('网络错误');
    }
  });

  // setTimeout(function(){
  //     var data = {"status":"0000","msg":"\u9886\u53d6\u6b21\u6570\u8d85\u51fa\u9650\u989d","data":[]}; 
  //     try{
  //       var res = data;
  //       callback(res);
  //     }catch(e){
  //       console.log(e);
  //       var res = JSON.parse(data);;
  //       callback(res);
  //     }  
  // },2000);

}

function timerAlertFn(){
   clearTimeout(timerAlert);
    timerAlert = setTimeout(function(){
    $(".nm-cover").addClass("hide");
  },1500);

}

function backToNormal(){
  clearTimeout(timerBack);
  timerBack = setTimeout(function(){
    $send.removeClass("error").html("进入你的专属领域");
  },3000);
}

function newDate (){
  return parseInt(new Date().getTime()/1000);
}

function isPhoneNumber(num){
  
  return !!(!isNaN(num-"0") == true && num.length == 11 && /13|14|15|17|18/i.test(num.substring(0,2)) )
}

function isCheckNumber(num){

  if(num == "") return "empty";

  return !isNaN(num-"0") ;
}