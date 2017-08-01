$(document).ready(function(){
  $("img").each(function(){
      var dpr;
      // if($("html").attr("data-dpr")>2){
      if(window.devicePixelRatio>2){
        dpr = "dpr3x";
      }else{
        dpr = "dpr2x";
      }
      if(this.getAttribute("data-src")){
        var src = this.getAttribute("data-src").replace(/dpr2x/,dpr);
        this.src = src;
      }
      
  });
  $(".use-background").each(function(){
    var dpr;
    if(window.devicePixelRatio>2){
      dpr = "dpr3x";
    }else{
      dpr = "dpr2x";
    }
    if(this.getAttribute("data-src") && this.getAttribute("data-src") != "url()"){
      var src = this.getAttribute("data-src").replace(/dpr2x/,dpr);
      this.style.backgroundImage = src;
    }
  });
});
var $phoneNumber = $("#phoneNumber");
var $checkNumber = $("#checkNumber");
var $userName = $("#userName");
var $userId = $("#userId");
var $getCheckNumber = $("#getCheckNumber");
var $send = $("#send");
var $alertText = $(".alert-text");
var se = $("body").attr("data-se");

function checkIdNumber (num) {
  var num = num + "";
  if(num.length === 18){
    return !!checkIdNumber18(num);
  }else if(num.length === 15){
    return !!checkIdNumber15(num);
  }else{
    return false;
  }
}

function checkIdNumber15(num){
  if(!isNumber(num)){
    return false;
  }
  
  var newDate =  getDateFromId(num);
  if(!checkDate(newDate)){
    return false;
  }

  return true;
}

function checkIdNumber18(num){
  if(!checkIdLastNumber(num)){
    return false;
  }

  var head = num.slice(0,17);
  if(!isNumber(head)){
    return false;
  }

  var newDate =  getDateFromId(num);
  if(!checkDate(newDate)){
    return false;
  }

  var lastNumber = num[num.length -1];
  var verifyNumber =  idVerify(num);

  if(lastNumber.toLocaleLowerCase() == verifyNumber){
    return true;
  }else{
    return false;
  }
}

function getDateFromId(num){
  var num = num + "";
  var date = null;
  if(num.length == 15){
    date = getDate(num,15);
  }else if(num.length == 18){
    date = getDate(num,18);
  }else{
    return false;
  }
  return date;
  function getDate(num,type){
    var newDate = null;
    if(type == 15){
      var date = "19" + num.slice(6,12);
      var year = date.slice(0,4);
      var mon = date.slice(4,6);
      var day = date.slice(6);
      var newDate =  year + "-" + mon + "-" + day;
      return newDate;
    } 

    if(type == 18){
      var date = num.slice(6,14);
      var year = date.slice(0,4);
      var mon = date.slice(4,6);
      var day = date.slice(6);
      var newDate =  year + "-" + mon + "-" + day;
      return newDate;
    }
  }
}

function getAge(){
  var nowDate = new Date($(".picc-form").attr("data-date")*1000);
  var birthday = getDateFromId($userId.val());
  // console.log(birthday);
  if(!checkDate(birthday)){
    return false;
  }
  birthday = new Date(getDateFromId($userId.val()));
  var nowYear = nowDate.getFullYear();
  var nowMon  = nowDate.getMonth();
  var nowDay  = nowDate.getDate();

  var birthdayYear = birthday.getFullYear();
  var birthdayMon  = birthday.getMonth();
  var birthdayDay  = birthday.getDate();


  var age =  null;

  if(nowMon > birthdayMon){
    age = nowYear - birthdayYear;
  }else if( nowMon == birthdayMon && nowDay >= birthdayDay){
    age = nowYear - birthdayYear;
  }else{
    age = nowYear - birthdayYear - 1;
  }

  return age;
}

function checkAge(){
  var age = getAge();
  if(age >= 16 && age <= 65){
    return true;
  }
  return false;
}

function checkIdLastNumber(num){
  var last = num[num.length - 1];
  return !!(last === "X" || last === "x" || isNumber(last));
}

function isNumber(num){
  return !!(!isNaN(num-"0"));
}

// 正确日期判断 date为2013-01-01之类
function checkDate(date){
  var date = date + "";
  return !!(new Date(date).getDate()==date.substring(date.length-2));
}

function idVerify(num){
  var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  var verifyNumberList = ['1', '0', 'x', '9', '8', '7', '6', '5', '4','3', '2'];
  if(num.length !== 18){
    return false;
  }
  var num = num + "";
  var newNum = num.slice(0,17).split("");

  var checksum = 0;

  var mod = null;

  for(var i = 0 ; i < factor.length ; i ++){
    checksum += factor[i] * (newNum[i] * 1 );
  }

  mod = checksum % 11;

  return verifyNumberList[mod];
}

function isChineseName(str){
  var str = str + "";
  str = str.replace(/\s/g,"");
  str = str.replace(/"　"/g,"");
  if(str.length === 0){
    return false;
  }

  for(var i = 0 ; i < str.length ; i++ ){
    if(isLetterOrNumber(str[i]) || !isReallyChineseName(str[i]) ){
      return false;
    }
  }
  return true;
}

function isReallyChineseName(str){
  var str = str + "";
  var regx = new RegExp("[\\u4E00-\\u9fd0]+","g");
  return !!regx.test(str);
}

function isLetterOrNumber(str){
  var str = str + "";
  var regx = /^[A-Za-z0-9]*$/;
  return !!(str.length === 1 && regx.test(str));
}

function newDate (){
  return parseInt(new Date().getTime()/1000);
}

function isPhoneNumber(num){
  
  return !!(!isNaN(num-"0") == true && num.length == 11 && /13|14|15|17|18/i.test(num.substring(0,2)) )
}

function isCheckNumber(num){

  return !isNaN(num-"0") && num != "";
}


var timer = null;
var time = 60;

function rightPhoneNumber(){
  return !!isPhoneNumber($phoneNumber.val());
}

function alertTextShow(str){
  $alertText.removeClass("hide").html(str);
}

function checkAllMsgRight(){
  return !!(rightPhoneNumber() && checkIdNumber(userId.value) && isChineseName(userName.value) && isCheckNumber(checkNumber.value));
}

function sendAble(){
  // console.log("sendAble");
  if(!!checkAllMsgRight()){
    $alertText.addClass("hide");
    $send.removeClass("disable");
  }else{
    $send.addClass("disable");
  }
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

var urlmsg = getURLInformation();
if(!getCookie("isFirstShowTipSprite"+urlmsg.order_id)){
  $(".picc-share-cover").removeClass("hide");
  setCookie("isFirstShowTipSprite"+urlmsg.order_id,"true");
}

if(urlmsg.status == "2" || urlmsg.status == "1"){
  $("#piccTelephone").attr("href","gosport://phone?phone=4009609980");
}


// $phoneNumber.blur(function(){
//   if($phoneNumber.val() === "") return true;
//   if(!isPhoneNumber($phoneNumber.val())){
//     $send.addClass("disable")
//     alertTextShow("请输入正确的手机号码");
//   }else{
//     $alertText.addClass("hide");
//   }
//   sendAble();
// });

// $checkNumber.on("keyup",function(e){
//   console.log(e);
//   if($checkNumber.val() === "") return true;
//   if(!isCheckNumber($checkNumber.val())){
//     $send.addClass("disable");
//     alertTextShow("请输入正确的验证码");
//   }else{
//     $alertText.addClass("hide");
//   }
//   sendAble();
// });

// $userId.blur(function(){
//   if($userId.val() === "") return true;
//   if(!checkIdNumber($userId.val())){
//     $send.addClass("disable");
//     alertTextShow("请输入正确的身份证号码");
//   }else{
//     $alertText.addClass("hide");
//   }
//   sendAble();
// });

// $userName.blur(function(){
//   if($userName.val() === "") return true;
//   if(!isChineseName($userName.val())){
//     $send.addClass("disable");
//     alertTextShow("请输入中文名");
//   }else{
//     $alertText.addClass("hide");
//   }
//   sendAble();
// });

$(".picc-form-inputs").on("blur","input",function(){
  checkAllMsg(1);
})

$(".picc-form-inputs").on("input","input",function(){
  $send.addClass("disable");
  if($(this).attr("id") == "phoneNumber"){
    if(isPhoneNumber($("#phoneNumber").val())){
      $("#getCheckNumber").removeClass('disable');
    }else{
      $("#getCheckNumber").addClass('disable');
    }
  }
  if($userName.val() === "" || $userId.val() === "" || $phoneNumber.val() === "" ||$checkNumber.val() === "")
    return;
  var bAllRight = checkAllMsg(2);
  if(!!bAllRight){
    $send.removeClass("disable");
  }
})

function checkAllMsg(mode){
  alertTextShow("");
  // 名字
  if($userName.val() === ""){
    if($userName.attr("isCheck")){
      mode == 1 && alertTextShow("请输入中文名");
      $userName.removeAttr("isCheck");
      return false;
    }
  }else{
    if(!$userName.attr("isCheck")){
      $userName.attr("isCheck",true);
    }
    if(!isChineseName($userName.val())){
      mode == 1 && alertTextShow("请输入中文名");
      return false;
    }
  }

  // 身份证
  if($userId.val() === ""){
    if($userId.attr("isCheck")){
      mode == 1 && alertTextShow("请输入正确的身份证号码");
      $userName.removeAttr("isCheck");
      return false;
    }
  }else{
    if(!$userId.attr("isCheck")){
      $userId.attr("isCheck",true);
    }
    if(!checkIdNumber($userId.val())){
      mode == 1 && alertTextShow("请输入正确的身份证号码");
      return false;
    }
  }

  // 手机号
  if($phoneNumber.val() === ""){
    if($phoneNumber.attr("isCheck")){
      mode == 1 && alertTextShow("请输入正确的手机号码");
      $userName.removeAttr("isCheck");
      return false;
    }
  }else{
    if(!$phoneNumber.attr("isCheck")){
      $phoneNumber.attr("isCheck",true);
    }
    if(!isPhoneNumber($phoneNumber.val())){
      mode == 1 && alertTextShow("请输入正确的手机号码");
      return false;
    }
  }

  // 验证码
  if($checkNumber.val() === ""){
    if($checkNumber.attr("isCheck")){
      mode == 1 && alertTextShow("请输入正确的验证码");
      $userName.removeAttr("isCheck");
      return false;
    }
  }else{
    if(!$checkNumber.attr("isCheck")){
      $checkNumber.attr("isCheck",true);
    }
    if(!isCheckNumber($checkNumber.val())){
      mode == 1 && alertTextShow("请输入正确的验证码");
      return false;
    }
  }
  return true;
}

$(".picc-close").click(function(){
  $(".picc-cover").addClass("hide");
});

$(".close").click(function(){
  $(".nm-cover").addClass("hide");
}); 

// $(".picc-success").click(function(){
//   $(".picc-cover").addClass("hide");
// }); 

$(".picc-share-cover").click(function(){
  $(this).addClass("hide");
});

$("#showForm").click(function(){
  if($(this).hasClass("status-disable")){
    return false;
  }else{
    $(".picc-cover").removeClass("hide");
  }
});

// 获取验证码按钮
$getCheckNumber.click(function(){
  if($(this).hasClass("disable")){
    return false;
  }
  if(!rightPhoneNumber()){
    $send.addClass("disable");
    alertTextShow("请输入正确的手机号码");
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

    // 请求成功（code为1状态）
    var callback = function(res){
      // console.log(res);
      if(!res.code){
        res = JSON.parse(res);
      }
      if(res.code == "1"){
        $(".nm-alert p").html("验证码发送成功");
        $(".close").removeClass("hide");
      }else{
        $(".nm-alert p").html(res.msg);
        $(".close").removeClass("hide");
      }
    }

    var errorCallback = function(res){
      $(".nm-alert p").html("网络错误");
      $(".close").removeClass("hide");
    }

    var num = $("#phoneNumber").val();
    
    ajaxGetCheckNumber(callback,errorCallback,num);
  }

});

// 进入你的专属领域按钮
$send.click(function () {

  $(".nm-alert p").html("请稍候！");
  $(".close").addClass("hide");

  if(!isChineseName($userName.val())){
    alertTextShow("请输入中文名");
    $send.addClass("disable");
    return false;
  }

  if(!checkIdNumber($userId.val())){
    alertTextShow("请输入正确的身份证号码");
    $send.addClass("disable");
    return false;
  }

  if(!checkAge()){
    alertTextShow("仅可对16至65岁人群投保");
    $send.addClass("disable");
    return false;
  }

  if(!isPhoneNumber($phoneNumber.val())){
    alertTextShow("请输入正确的手机号码");
    $send.addClass("disable");
    return false;
  }

  if(!isCheckNumber($checkNumber.val())){
    alertTextShow("请输入正确的验证码");
    $send.addClass("disable");
    return false;
  }

  if(isPhoneNumber($phoneNumber.val()) && isCheckNumber($checkNumber.val())){
    $(".nm-cover").removeClass("hide");
    var callback = function(res){
    // console.log(res);
    if(!res.code){
      res = JSON.parse(res);
    }
    // 请求成功
    if(res.code == "1"){
        $(".nm-cover").addClass("hide");
        $(".picc-form").addClass("hide");
        $(".picc-success").removeClass("hide");
        setTimeout(function(){
          var urlmsg = getURLInformation();
          window.location.href = window.location.href.split("?")[0] + "?order_id=" + urlmsg.order_id+"&status="+urlmsg.status;
        },2000);
      }else if(res.code == "6000" || res.code == "6001" || res.code == "6002"){
        var url = "/Insurance/error?message=" + res.msg;
        // window.location.href = url;
        window.location.href = typeof urlAddParams == 'function' ? urlAddParams(url) : url;
      }else{
        // 请求成功（非“0000”状态，显示msg）
        $(".nm-alert p").html(res.msg);
        $(".close").removeClass("hide");
      }
    }
    
    // 请求失败处理
    var errorCallback = function(res){
      $(".nm-alert p").html("网络错误");
      $(".close").removeClass("hide");
    }

    var num = $("#phoneNumber").val();
    var checkNumber = $("#checkNumber").val();
    var userId = $("#userId").val();
    var userName = $("#userName").val();
    var orderId = $("body").attr("data-order-id");
    
    userName = userName.replace(/\s/g,"");
    userName = userName.replace(/"　"/g,"");
    // console.log("num:",num,",checkNumber:",checkNumber,",userId:",userId,",userName:",userName);
    ajaxSend(callback,errorCallback,num,checkNumber,userId,userName,orderId);
  }
});


// Ajax发送手机号码和验证码
function ajaxSend(callback,errorCallback,num,checkNumber,userId,userName,orderId){
  $.ajax({
    type:"get",
    url:"/insurance/userInfo?mobile="+num+"&card="+userId+"&user_name="+userName+"&order_id="+orderId+"&sms_code="+checkNumber+"&client_time="+newDate(),
    success: function(data){
      try{
        var res = data;
        callback(res);
      }catch(e){
        console.log(e);
        var res = JSON.parse(data);
        callback(res);
      }
    },
    error: function(xhr, type){
      errorCallback(type);
      alert('网络错误');
    }
  });

  // setTimeout(function(){
  //     var data = {"code":"1","msg":"\u9886\u53d6\u6b21\u6570\u8d85\u51fa\u9650\u989d","data":[]}; 
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

// Ajax请求验证码
function ajaxGetCheckNumber(callback,errorCallback,num){
  $.ajax({
    type:"get",
    url:"/insurance/getsmscode?phone="+num+"&client_time="+newDate()+"&hash="+se,
    success: function(data){
      
      try{
        var res = data;
        callback(res);
      }catch(e){
        console.log(e);
        var res = JSON.parse(data);
        callback(res);
      }
    },
    error: function(xhr, type){
      errorCallback(type);
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

function setCookie(name,value) 
{ 
  var Days = 1; 
  var exp = new Date(); 
  exp.setTime(exp.getTime() + Days*24*60*60*1000); 
  document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
} 

function getCookie(name) 
{ 
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
 
    if(arr=document.cookie.match(reg))
 
        return unescape(arr[2]); 
    else 
        return null; 
} 


// var userId = document.getElementById('userId');
// var userName = document.getElementById('userName');
// var phoneNumber = document.getElementById('phoneNumber');
// var checkNumber = document.getElementById('checkNumber');

// test();

// userId.addEventListener("change",test);
// userName.addEventListener("change",test);
// phoneNumber.addEventListener("change",test);
// checkNumber.addEventListener("change",test);

// function test(){
//   console.log("++++++++++++++++++++++++");
//   // console.log("checkIdNumber:",checkIdNumber(userId.value));
//   // console.log("birthday:",getDateFromId(userId.value));
//   // console.log("age:",getAge());
//   // console.log("checkAge:",checkAge());
//   console.log("isChineseName:",isChineseName(userName.value));
//   // console.log("isPhoneNumber:",isPhoneNumber(phoneNumber.value));
//   // console.log("isCheckNumber:",isCheckNumber(checkNumber.value));
//   console.log("________________________");
// }

