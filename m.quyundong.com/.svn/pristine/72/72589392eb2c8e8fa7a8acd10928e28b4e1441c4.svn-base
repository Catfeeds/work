var HASH = getCookie('wx_hash');
$(function(){

  var decathlonInfo = $('#decathlonInfo')[0];
  function checkDecathlonInfo(cb) {
    if (decathlonInfo) {
      if (!decathlonInfo.checked) {
        if (typeof cb === 'function') {
          cb();
        }
        return false;
      }
    }
    return true;
  }

  var lock = false;

  var touchType = ('createTouch' in document) ? 'tap' : 'click';
  
  var showError = function(msg) {
    $('.J_err').html(msg);
    $('.J_err').show();
  };

  $('.J_submit').on(touchType, function() {
    
    var tel = $('.J_tel').val();
    var code = $('.J_code').val();

    if(!tel || !/1[2345678]{1}\d{9}$/.test(tel)){
      showToast('请输入正确的手机号');   
      return;
    }

    if(!code){
      showToast('请输入验证码');
      return;
    }

    var cb = function(){
      showToast('请勾选条款');
    }
    if (!checkDecathlonInfo(cb)) {
      return false;
    }
    
    if(lock) return;

    lock = true;
    $("#loading").removeClass('hide');


    $('.J_submit').html('<div>登录中...</div>');

    var postData = {
        username: tel,
        code: code
      }
        postData = typeof objMerge == 'function' ? objMerge(postData) : postData
    
    $.ajax({
      url: '/login/doqucklogin',
      type: 'POST',
      dataType: 'json',
      cache: false,
      data: postData,
      success: function(res){
        if(res && res.code == 1){
          location.href = res.data.url;
        } else{
          lock = false;
          $("#loading").addClass('hide');
          showToast(res.msg);
          $('.J_submit').html('<div>确定</div>');
        }
      },
      error: function(res){
        lock = false;
        $("#loading").addClass('hide');
        showToast('网络出错，请稍后再试');
        $('.J_submit').html('<div>确定</div>');
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

    $.ajax({
      url: '/login/getSmsCodeLogin',
      type: 'post',
      dataType: 'json',
      cache: false,
      data: {
        'phone':tel,
        'hash':HASH
      },
      success: function(res){
        if(res.hash) HASH = res.hash;
        if(res.code == 1){
          showToast('验证码已经发送，60秒内无需重复获取');
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
            $(".loading").addClass("hide").css("background-color","transparent");
            $(".main").removeClass("hide");
            clearInterval(loadInterval);
        }
    }, 500);
  
  $(".wechat-form input").on("propertychange input change", function() {
    var tel = $('.J_tel').val().trim();
    var code = $('.J_code').val().trim();
    if(tel && code && checkDecathlonInfo()){
            $("#login-common").removeClass('disable');
    }else{
            $("#login-common").addClass("disable");
    }
    })
  $(".wechat-form").on("focus","input",function(){
      $(".main-protocol").css("display","none");
    })

    $(".wechat-form").on("blur","input",function(){
      $(".main-protocol").css("display","block");
    })
})
