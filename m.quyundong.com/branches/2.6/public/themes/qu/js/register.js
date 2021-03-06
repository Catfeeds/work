$(function(){
  var HASH = getCookie('wx_hash');
  var lock = false;

  var touchType = ('createTouch' in document) ? 'tap' : 'click';

  $('.J_submit').on(touchType, function() {
    if(lock){
      return;
    }

    var tel = $('.J_tel').val();
    var pwd = $('.J_pwd').val();
    var pwd2 = $('.J_pwd2').val();
    var code = $('.J_code').val();

    if(!tel || !/1[2345678]{1}\d{9}$/.test(tel)){
      showToast('请输入正确的手机号');   
      return;
    }
    
    if(!code){
      showToast('请输入验证码');
      return;
    }

        
        if(!pwd || pwd.length < 6){
      showToast('请输入最少6位密码');
      return;
    }

    if(!pwd){
      showToast('请输入密码');
      return;
    }

    if(!pwd2){
      showToast('请再次输入密码');
      return;
    }

    if(pwd2 != pwd){
      showToast('两次密码不一致');
      return;
    }


    
    lock = true;
    $('.J_submit').html('<div>注册中...</div>');

    var postData = {
        username: tel,
        password: pwd,
        password2: pwd2,
        code: code
      }
        postData = typeof objMerge == 'function' ? objMerge(postData) : postData
    

    $.ajax({
      url: '/login/doregister',
      type: 'POST',
      dataType: 'json',
      cache: false,
      data: postData,
      success: function(res){
        lock = false;
        if(res && res.code == 1){
          location.href = res.data.url;
        } else{
          showToast(res.msg);
          $('.J_submit').html('<div>注册</div>');
        }
      },
      error: function(res){
        lock = false;
        showToast('网络出错，请稍后再试');
        $('.J_submit').html('<div>注册</div>');
      }
    });
  });

  $('.J_getCode').on(touchType, function() {
    if($('.J_getCode').attr('disable')=='1') return;
    var tel = $('.J_tel').val();
    if(!tel || !/1[2345678]{1}\d{9}$/.test(tel)){ 
    showToast('请输入正确的手机号');   
    return;
    }

    var postData = {
        'phone':tel,
        'hash':HASH
      }
        postData = typeof objMerge == 'function' ? objMerge(postData) : postData

    $.ajax({
      url: '/login/getsmscode',
      type: 'post',
      dataType: 'json',
      cache: false,
      data: postData,
      success: function(res){
        if(res.hash) HASH = res.hash;
        if(res.code == 1){
          showToast('验证码已经发送，60秒内无需重新获取');
          $(".wechat-form li:nth-of-type(1)").siblings("li").css("display","block");
              $(".J_submit").removeClass("hide");
          setCodeTimer($('.J_getCode'));
        }
        else{
          showToast(res.msg);
        }
      },
      error: function(res){
        showToast('网络出错，请稍后再试');
      }
    });
  });

  $('.J_back').on(touchType, function(){
    window.history.go(-1);
  });
  
  
  var loadInterval = setInterval(function() {
        if ($(".loading").attr("data-lock") == "1") {
            $(".loading").addClass("hide");
            $(".main").removeClass("hide");
            clearInterval(loadInterval);
        }
    }, 500);
  
  $(".wechat-form input").on("propertychange input", function() {

    var tel = $('.J_tel').val().trim();
    var pwd = $('.J_pwd').val().trim();
    var pwd2 = $('.J_pwd2').val().trim();
    var code = $('.J_code').val().trim();

    if(tel && pwd && pwd2 && code){
            $("#login-common").removeClass('disable');
    } else {
            $("#login-common").addClass("disable");
        }
    })
})
