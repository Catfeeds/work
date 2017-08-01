$(function(){
    var lock = false;
    $('.J_submit').on('click', function() {
        var old_pwd = $('.J_old_pwd').val();
      var pwd = $('.J_pwd').val();
      var pwd2 = $('.J_pwd2').val();

        if (!old_pwd){
        showToast('请输入旧密码');
        return;
      }
        if (old_pwd.length < 6){
            showToast('旧密码长度不能小于6位');
            return;
        }
      if (!pwd) {
        showToast('请输入密码');
        return;
      }
        if (pwd.length < 6 || pwd.length >20) {
            showToast('请输入6--20位新密码');
        return;
        }
      if (!pwd2) {
        showToast('请再次输入新密码');
        return;
      }

      if (pwd2 != pwd) {
        showToast('两次密码不一致');
        return;
      }

        if(lock) return;

        lock = true;
        $("#loading").removeClass('hide');

      $('.J_submit').html('<div>修改中...</div>');

      var postData = {
                old_password : old_pwd,
          password: pwd,
          password2: pwd2
        }
          postData = typeof objMerge == 'function' ? objMerge(postData) : postData

      $.ajax({
        url: '/user/changePassword',
        type: 'post',
        dataType: 'json',
        cache: false,
        data: postData,
        success: function(res){
          if(res && res.code == 1){
            showToast('修改成功');
            window.setTimeout(function(){
              var url = '/user/account'
              // location.href = '/user/account';
              location.href = typeof urlAddParams == 'function' ? urlAddParams(url) : url;
            },2000);        
          } else{
                    lock = false;
                    $("#loading").addClass('hide');
            showToast(res.msg);
            $('.J_submit').html('<div>提交</div>');
          }
        },
        error: function(res){
                lock = false;
                $("#loading").addClass('hide');
          showToast('网络出错，请稍后再试');
          $('.J_submit').html('<div>提交</div>');
        }
      });
    });

    var loadInterval = setInterval(function() {
        if ($(".loading").attr("data-lock") == "1") {
            $(".loading").addClass("hide").css("background-color","transparent");
            $(".main").removeClass("hide");
            clearInterval(loadInterval);
        }
    }, 500);

    $(".wechat-form input").on("propertychange input", function() {

        var old_pwd = $('.J_old_pwd').val();
        var pwd = $('.J_pwd').val();
        var pwd2 = $('.J_pwd2').val();

        if (old_pwd && pwd && pwd2) {
            $("#login-common").removeClass('disable');
        } else {
            $("#login-common").addClass("disable");
        }
    })
})
