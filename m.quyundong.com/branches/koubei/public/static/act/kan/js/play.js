function playAndShow(nickname){
  var playmateNumber = 0;
  // 美女图片地址

    var playmateImagesURL = {
      playmate1:["/static/act/kan/images/mm1start.jpg","/static/act/kan/images/mm1after.jpg"],
      playmate2:["/static/act/kan/images/mm2start.jpg","/static/act/kan/images/mm2after.jpg"],
      playmate3:["/static/act/kan/images/mm3start.jpg","/static/act/kan/images/mm3after.jpg"]
    }
  // 热区按钮触发
    $(".hotspace lable").each(function(){
        $(this).click(function() {
          
          // 美女图片加载时的loading和解除loading
          $(".alert").removeClass("hide");
          $(".info span").html("<i class='loading-icon'></i>");
          $(".alert").attr("data-lock","0");

          var alertInterval = setInterval(function(){
            if($(".alert").attr("data-lock") == 2){
              $(".page1").addClass("hide");
              $(".page2").removeClass("hide");
              $(".alert").addClass("hide");
              $(".alert").attr("data-lock","0");
              clearInterval(alertInterval);
            }
          },500);

          // canvas初始化
          playmateNumber = $(this).attr("class").substr(8);

          var windowWidth = $(window).width();
          var windowHeight = $(window).height();
          var canvas = document.getElementById('canvas');
          var context = canvas.getContext('2d');
          var image = new Image();
          var touchLength = 0;
          
          canvas.width = windowWidth;
          canvas.height = windowHeight;

          // 加载canvas图片后绑定touch事件
          image.src = playmateImagesURL[$(this).attr("class")][0];
          image.onload = function  (e) {
            context.drawImage(image,0,0,image.width,image.height,0,0,windowWidth,windowHeight);
            canvas.addEventListener('touchstart', function(event) {
              
              var finger = event.touches[0];  //获得手指
              during = event.timeStamp;
              event.preventDefault();
              console.log(during);
            });
            canvas.addEventListener('touchmove', function(event) {
              var finger = event.touches[0];  //获得手指
              
              console.log('touchmove',finger.pageX,finger.pageY,event);
              event.preventDefault();
              setTimeout(function(){
                clearArc(finger.pageX,finger.pageY,40,context);
              },0);
            });
            canvas.addEventListener('touchend', function(event) {
              var finger = event.touches[0];  //获得手指
              event.preventDefault();
              
              touchLength ++;
              
              if (touchLength >= 6 || checkImageData() >= 0.8) {
                $("#canvas").addClass("hide");
                // 砍价完成，请求砍价接口
                postBargain(playmateNumber);
                // 下一步的按键出现动画
                $(".active").removeClass("hide");
                activeShow(playmateNumber);
              };
            });

            $(".alert").attr("data-lock",$(".alert").attr("data-lock") -0 + 1);
            $(".touchtip").removeClass("hide");
          };
          // 擦除面积的计算
          function checkImageData(){
            try{
              var imgData = context.getImageData(0,0,windowWidth,windowHeight);
                for(var i = 0 ,j = 0; i < imgData.data.length / 4 ; i ++){
                  if(imgData.data[3+4*i] == 0){
                    j++;
                  }
                }
              console.log(imgData,j,windowWidth*windowHeight,j/(windowWidth*windowHeight));
              return j/(windowWidth*windowHeight);
            }catch(e){
              console.log(e);
              return false;
            }
          }
          // canvas清除效果
          function clearArc(x,y,r,ctx){
            try{
              ctx.globalCompositeOperation = 'destination-out';
              ctx.beginPath();
              
              ctx.arc(x,y,r,0,Math.PI*2,false);
              ctx.fill();
            }catch(e){
              console.log(e);
               var x = parseInt(x);
               var y = parseInt(y);
              for(var i = 0 ,a = null; i < 2 * r ; i ++){
                for(var j = 0 ; j < 2 * r ; j ++){
                   a =  (i - r) * (i - r) + (j - r ) * (j - r);
                   
                  if(a <= (r * r) ){
                    
                    ctx.clearRect((x-r+i),(y-r+j),1,1);
                  }
                }
              }
            }
          }

          // 背景图加载
          var myImage = new Image;
          myImage.onload = function(){
            $(".page2").css("background-image","url("+myImage.src+")");
            $(".alert").attr("data-lock",$(".alert").attr("data-lock") - 0 + 1);  
          }
          myImage.src = playmateImagesURL[$(this).attr("class")][1];
      });
    });
  //按键执行的命令
  $(".active").click(function() {
    $(".alert .info span").html("");
    
    // ajax请求时的遮罩
    $(".alert").removeClass("hide");
    $(".alert .info span").html("<i class='loading-icon'></i>");

    // 请求失败时再次请求
    if($(".alert").attr("data-lock") == 2){
      postBargain(playmateNumber);
    }
    // 遮罩解除的时机并显示下一页
    var alertInterval = setInterval(function(){
     
      if($(".alert").attr("data-lock") == 1){
        $(".page2").addClass("hide");
        $(".page3").removeClass("hide");
        $("body").css({"overflow":"auto","height":"auto"});
        $(".alert").addClass("hide");
        $(".alert").attr("data-lock","0");
        clearInterval(alertInterval);
      }else if($(".alert").attr("data-lock") == 2){
        //请求失败时
        $(".alert").addClass("hide");
        clearInterval(alertInterval);
      }
    },500);
  });
}

// 关于约练点击事件
$(".yue").click(function(){
  $(".pages").addClass("hide");
  $(".about").removeClass("hide");
});


// 我也要挑战点击事件
$(".btnJoin").click(iWantCreate);
$(".btnIWant").click(iWantCreate);

$(".back").click(function(){
  $(".about").addClass("hide");
  $(".page3").removeClass("hide");
});

function iWantCreate(){
  $(".alert").attr("data-lock","0");
  // ajax请求时的遮罩
  $(".alert").removeClass("hide");
  $(".alert .info span").html("<i class='loading-icon'></i>");

  // 进行ajax请求

  postCreateActive();

  var alertInterval = setInterval(function(){
     
    if($(".alert").attr("data-lock") == 1){
      $(".pages").addClass("hide");
      $(".create").removeClass("hide");
      $(".alert").attr("data-lock","0");
      clearInterval(alertInterval);
    }else if($(".alert").attr("data-lock") == 2){
      //请求失败时
      $(".alert").addClass("hide");
      clearInterval(alertInterval);
    }
  },500);
  
}

function postCreateActive(){
  var callback = function(res){
    console.log(res);
    if(res.code == "0000"){
      // 请求返回0000,获得数据
      $(".alert").attr("data-lock","1");
      $(".btnPlay").attr("href",res.data.activity_url);
    }else if(res.code == "5006"){
      window.location.href = res.data.activity_url;
    }else if(res.code == "5001"){
      window.location.href = res.data.redirect_url;
    }else{
      $(".alert .info span").html(res.msg);
      setTimeout(function(){
        $(".alert").attr("data-lock","2");
      },2000);
    }
  }

  var errorCallback = function(){
    $(".alert .info span").html("网络错误");
    setTimeout(function(){
      $(".alert").attr("data-lock","2");
    },2000);
  }

  ajaxCreateActive(callback,errorCallback);
}

function postBargain(playmate){
  // 请求成功时执行的方法
  var callback = function(res){
    console.log(res);
    if(res.code == "0000" || res.code == "5004"){
      // 请求返回0000,获得数据
      
      // 请求排名
      setTimeout(function(){
        postRank();
      },0);
    }else if(res.code == "5001"){
      window.location.href = res.data.redirect_url;
    }else{
      //请求返回其他
      $(".alert .info span").html(res.msg);
      setTimeout(function(){
        $(".alert").attr("data-lock","2");
      },2000);
    }
  }

  // 请求失败时的方法
  var errorCallback = function(){
    $(".alert .info span").html("网络错误");
    setTimeout(function(){
      $(".alert").attr("data-lock","2");
    },2000);
  }

  // 发起请求
  ajaxBargain(callback,getURLInformation(),playmate,errorCallback);
}

function postRank(){
  var callback = function(res){
    console.log(res);
    if(res.code == "0000"){
      // 请求返回0000,获得数据
      playmateShow(res.data.player.playmate);
      $(".playmateshow-msg").removeClass("hide");
      $(".playmateshow-msg-money").html(res.data.player.money);
      $(".playmateshow-msg-rank").html(res.data.player.rank);
      btnJoinShow();
      rankCreate(res.data.ranklist);
      $(".yue").removeClass("hide");
    }else if(res.code == "5001"){
      window.location.href = res.data.redirect_url;
    }else{
      $(".alert .info span").html(res.msg);
      $(".alert").removeClass("hide");
      setTimeout(function(){
        $(".alert").attr("data-lock","2");
        $(".alert").addClass("hide");
      },2000);
    }
  };

  var errorCallback = function(){

  };

  ajaxRank(callback,getURLInformation(),errorCallback);
}

function playmateShow(num){
  var image = new Image();
  image.src = playmateShowURL(num).url; 
  image.onload = function(){
    $(".playmateshow").css({"height":playmateShowURL(num).height,"background-image":"url("+image.src+")"});
    $(".playmateshow-msg").css(playmateShowURL(num).css);
  // 解除跳幕
    setTimeout(function(){
      $(".alert").attr("data-lock","1");
    },2000);
  }
}

function btnJoinShow(){
  var pageState = $(".loading").attr("data-page");
  $(".btnJoin-msg").html("");
  if(/600|700/i.test(pageState)){
    $(".btnJoin").removeClass("hide");
    $(".btnJoin-msg").html("我也要挑战");
  }else if(pageState == "200"){
    $(".btnHelps").removeClass("hide");
    $(".btnHelps-msg").html("马上求助");
  }
}

function rankCreate(arr){
  var randomText = [
  '手起刀落，不谢！',
  '江湖人称金牌砍价师',
  '砍价我最强',
  '我为砍价高手带盐',
  '专业砍价20年',
  '砍价不动嘴只刷脸',
  '极速砍价',
  '砍价赢家，为我点赞',
  '哎哟，不错哦。',
  '砍砍砍，砍钱不眨眼。']
  
  $(".rank").removeClass("hide");
  var $rankUl = $(".rank-ul");
  for(var i = 0; i < arr.length ;i++){
    var num = parseInt(Math.random()*randomText.length);
    $('<li class="rank-li">'+'<div class="rank-avatar" style="background-image: url('+ arr[i].headimg_url+');">'+'</div>'+'<div class="rank-text">'+'<div class="rank-text-t">'+arr[i].nickname+'成功砍价'+'</div>'+'<div class="rank-text-b">'+randomText[num]+'</div>'+'</div>'+'<div class="rank-money">'+arr[i].money+'元'+'</div>'+'</li>').appendTo($rankUl);
    // randomText.splice(num,1);
  }
}

function unablePlayButShow(state){
  var errorCallback = function(){
    $(".pages").addClass("hide");
    $(".again").removeClass("hide");
    $(".again").click(function(){
      window.location.reload();
    });
  }

  ajaxRank(createCallback(state),getURLInformation(),errorCallback);

  return false;
}

// 不同状态的callback
function createCallback(state){
  console.log(state);
  if(state == 700){
    return callback700 = function(res){
      console.log(res);
      if(res.code == "0000"){
        // 请求返回0000,获得数据
        $("body").css({"overflow":"auto","height":"auto"});
        playmateShow(res.data.player.playmate);
        $(".playmateshow-msg").removeClass("hide");
        $(".playmateshow-msg-money").html(res.data.player.money);
        $(".playmateshow-msg-rank").html(res.data.player.rank);
        btnJoinShow();
        rankCreate(res.data.ranklist);
        $(".yue").removeClass("hide");
        loadingRemove();
      }else if(res.code == "5001"){
        window.location.href = res.data.redirect_url;
      }else{
        $(".pages").addClass("hide");
        $(".page4").removeClass("hide");
        loadingRemove();
      }
    } 
  }else if(state == 300){
    return callback300 = function(res){
      console.log(res);
      if(res.code == "0000"){
        // 请求返回0000,获得数据
        $("body").css({"overflow":"auto","height":"auto"});
        var playercnt = res.data.owner.playercnt;
        var moneytotal = res.data.moneytotal;
        $(".information").removeClass("hide");
        $(".iconsdouble").removeClass("hide");
        $(".information").html('有'+playercnt+'位小伙伴帮你砍价'+moneytotal+'元，<br />已获得'+ticketMoney(moneytotal).money+'元陪练优惠券。<br />距离'+ticketMoney(moneytotal).nextMoney+'元目标还差'+(ticketMoney(moneytotal).nextMoney * 10 - moneytotal * 10)/10+'元，<br />距离终极目标还差'+(600 - moneytotal*10)/10+'元。');
        $(".money").removeClass("hide");
        if(moneytotal > 0){
          $(".moneybarInner").removeClass("hide");
          setTimeout(function(){
             $(".moneybarInner").animate({"width":moneytotal/60 * 100 +"%"},1000,"ease-out");
          },2000);
        }
        rankCreate(res.data.ranklist);
        $(".yue").removeClass("hide");
        loadingRemove();
      }else if(res.code == "5001"){
        window.location.href = res.data.redirect_url;
      }else{
        $(".pages").addClass("hide");
        $(".page4").removeClass("hide");
        loadingRemove();
      }
    } 
  }else if(state == 500){
    return callback500 = function(res){
      console.log(res);
      if(res.code == "0000"){
        // 请求返回0000,获得数据
        $("body").css({"overflow":"auto","height":"auto"});
        $(".information").html('恭喜！'+res.data.owner.coupon_money+'元的约练优惠券已放入您的<br />趣运动钱包。请通过手机号：<br />'+res.data.owner.phone+'登录趣运动APP查看。');
        var ticketImage = new Image();
        ticketImage.onload = function(){
          $(ticketImage).appendTo(".ticket");
          loadingRemove();
        }
        $(".information").removeClass("hide");
        $(".ticket").removeClass("hide");
        $(".page3 .icons").removeClass("hide");
        $(".page3 .icons .btnUseTicket").removeClass("hide");

        ticketImage.src = getTicketImageURL(res.data.owner.coupon_money);
        rankCreate(res.data.ranklist);
        $(".yue").removeClass("hide");
        
      }else if(res.code == "5001"){
        window.location.href = res.data.redirect_url;
      }else{
        $(".pages").addClass("hide");
        $(".page4").removeClass("hide");
        loadingRemove();
      }
    } 
  }else if(state == 400){
    return callback400 = function(res){
      console.log(res);
      if(res.code == "0000"){
        // 请求返回0000,获得数据
        $("body").css({"overflow":"auto","height":"auto"});
        $(".information").html('恭喜完成挑战！<br /><br />有'+ res.data.owner.playercnt+'位小伙伴帮你砍价60元，<br />已获得60元陪练优惠券。');
        
        $(".information").removeClass("hide");
        $(".money").removeClass("hide");
        $(".btnFinish").removeClass("hide");
        
        $(".moneybarInner").removeClass("hide");
        setTimeout(function(){
           $(".moneybarInner").animate({"width":"100%"},1000,"ease-out");
        },2000);
        
        
        $(".page3 .icons").removeClass("hide");
        $(".page3 .icons btnFinish").removeClass("hide");

        
        rankCreate(res.data.ranklist);
        $(".yue").removeClass("hide");
        loadingRemove();
      }else if(res.code == "5001"){
        window.location.href = res.data.redirect_url;
      }else{
        $(".pages").addClass("hide");
        $(".page4").removeClass("hide");
        loadingRemove();
      }
    } 
  }else if(state == 800){
    return callback800 = function(res){
      console.log(res);
      if(res.code == "0000"){
        // 请求返回0000,获得数据
        $("body").css({"overflow":"auto","height":"auto"});
        $(".information").html( $(".loading").attr("data-name") + '已经完成挑战！<br /><br />一共砍价'+res.data.moneytotal+'元。');
        
        $(".information").removeClass("hide");
        $(".money").removeClass("hide");
        
        $(".moneybarInner").removeClass("hide");
        setTimeout(function(){
           $(".moneybarInner").animate({"width":res.data.moneytotal / 60 * 100 +"%"},1000,"ease-out");
        },2000);
        
        
        $(".page3 .icons").removeClass("hide");
        $(".page3 .icons .btnIWant").removeClass("hide");

        
        rankCreate(res.data.ranklist);
        $(".yue").removeClass("hide");
        loadingRemove();
      }else if(res.code == "5001"){
        window.location.href = res.data.redirect_url;
      }else{
        $(".pages").addClass("hide");
        $(".page4").removeClass("hide");
        loadingRemove();
      }
    } 
  }
  
}
var lock = 1;
// 按钮显示兑换页面
$(".btnGameover").click(function(){
  $(".check").removeClass("hide");
});
$(".btnFinish").click(function(){
  $(".check").removeClass("hide");
});
// 按钮隐藏兑换页面
$(".icon-close").click(function(){
  $(".check").addClass("hide");
});

$(".phoneNumber").blur(function(){
  if(!isPhoneNumber()){
    $(".tip").html("请填写正确的手机号码！");
  }else{
    $(".tip").html("");
  }
});

$(".checkCode").blur(function(){
  if($(this).val() != ""){
    $(".tip2").html("");
  }else{
    $(".tip2").html("请填写验证码");
  }
});

// 按钮点击事件ajax获得验证码
$(".btnGetCode").click(function () {
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
    
    var num = $(".phoneNumber").val();
    postGetSmsCode(num);
  }
});

$(".btnGetTicket").click(function () {
  $(".tip2").html("");
  if($(".checkCode").val() == ""){
     $(".tip2").html("不能为空");
     return true;
  }
  if(isCode() && isPhoneNumber()){
    $(".alert").removeClass("hide");
    $(".info span").html("请稍候！");
    
    var num = $(".phoneNumber").val();
    var checkCode = $(".checkCode").val();
    postCash(num,checkCode);
  }else{
    $(".tip2").html("请完善信息");
  }
});

$(".close").click(function(){
  $(".alert").addClass("hide");
  $(".close").addClass("hide");
});


function postGetSmsCode(num){
  var callback = function(res){
      console.log(res);
      if(res.code === "0000"){
        overTime();
        $(".tip").html(res.msg);
      }else{
        lock = 1;
        $(".tip").html(res.msg);
      }
    }

  var errorCallback = function(){

  }

  ajaxGetSmsCode(callback,num,errorCallback);
}

function postCash(num,checkCode){
  var callback = function(res){
    if(res.code === "0000"){
      $(".information").html('恭喜！'+res.data.money+'元的约练优惠券已放入您的<br />趣运动钱包。请通过手机号：<br />'+num+'登录趣运动APP查看。');
      var ticketImage = new Image();
      ticketImage.onload = function(){
        $(ticketImage).appendTo(".ticket");
        $(".info span").html(res.msg);
        $(".close").removeClass("hide");
      }
      $(".page3 .icons").addClass("hide");
      $(".iconsdouble").removeClass("hide");
      $(".ticket").removeClass("hide");
      $(".money").addClass("hide");
      $(".check").addClass("hide");
      $(".btnGameover").addClass("hide");
      $(".btnHelp").addClass("hide");
      $(".btnUse").removeClass("hide");
      ticketImage.src = getTicketImageURL(res.data.money);
    }else{
      $(".info span").html(res.msg);
      $(".close").removeClass("hide");
    }
  }

  var errorCallback = function(){
    $(".alert").addClass("hide");
  }

  ajaxCash(callback,getURLInformation(),num,checkCode,errorCallback);
}

function ticketMoney(num){
  var ticket = {};
  var num = num * 10;
  if(num < 200){
    ticket.money = 0;
    ticket.nextMoney = 20;
  }else if(num >= 200 && num < 600){
    if(num%100 < 80){
      ticket.money = parseInt(num / 100) * 10;
      ticket.nextMoney = ticket.money + 10;
    }else{
      ticket.money = parseInt(num / 100) * 10 + 10;
      if(ticket.money != 60){
        ticket.nextMoney = ticket.money + 10;
      }else{
        ticket.nextMoney = ticket.money;
      }
    }
  }else if(num == 600){
    ticket.money = 60;
    ticket.nextMoney = 60;
  }
  return ticket;
}

function isPhoneNumber(){
  if(!isNaN($(".phoneNumber").val()-"0") == true && $(".phoneNumber")[0].value.length == 11 && /13|14|15|17|18/i.test($(".phoneNumber")[0].value.substring(0,2)) ){
    return true;
  }else{
    return false;
  }
}

function overTime(){
  var t = 60;
  $(".btnGetCode span").html(t+"秒后重获");
  $(".btnGetCode").addClass("lock");
  var s = setInterval(function(){
    t--;
    $(".btnGetCode span").html(t+"秒后重获");
    if(t == 0){
      $(".btnGetCode span").html("重新获取");
      lock = 1;
      $(".btnGetCode").removeClass("lock");
      clearInterval(s);
    }
  },1000);
}

function isCode(){
  if(!isNaN($(".checkCode").val()-"0") == true){
    return true;
  }else{return false;}
}