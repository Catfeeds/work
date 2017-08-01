$(function(){

	var lock = false;

    var loadInterval = setInterval(function() {
        if ($(".loading").attr("data-lock") == "1") {
            $(".loading").addClass("hide");
            $(".main").removeClass("hide");
            clearInterval(loadInterval);
        }
    }, 500);

	var touchType = ('createTouch' in document) ? 'tap' : 'click';

	$('.J_submit').on('click', function () {

		if (lock) {
			return;
		}

		var pwd = $('.J_pwd').val();
		var pwd2 = $('.J_pwd2').val();

		if (!pwd) {
			showToast('请输入密码');
			return;
		}
		if (pwd.length < 6) {
			showToast('密码长度不能小于6位');
			return;
		}
		if (!pwd2) {
			showToast('请再次输入密码');
			return;
		}
		if (pwd2 != pwd) {
			showToast('两次密码不一致');
			return;
		}

		$('.J_submit').html('<div>提交中...</div>');
		lock = true;
    var postData = {
        password: pwd,
        password2: pwd2
      }
        postData = typeof objMerge == 'function' ? objMerge(postData) : postData
		$.ajax({
			url: '/user/setPassword',
			type: 'post',
			dataType: 'json',
			cache: false,
			data: postData,
			success: function (res) {
				lock = false;
				if (res && res.code == 1) {
					location.href = res.data.url;
				}
				if (res && res.code == '7009') {
					showToast('操作有误或者已设置了密码');
				}
				else {
					showToast(res.msg);
					$('.J_submit').html('<div>提交</div>');
				}
			},
			error: function (res) {
				lock = false;
				showToast('网络出错，请稍后再试');
				$('.J_submit').html('<div>提交</div>');
			}
		});
	});

	$('.J_back').on(touchType, function () {
		window.history.go(-1);
	});

	$(".wechat-form input").on("propertychange input", function() {

        var tel = $('#setpassword-tel').text();
        var pwd = $('.J_pwd').val();
        var pwd2 = $('.J_pwd2').val();

        if (tel && pwd && pwd2) {
            $("#login-common").removeClass('disable');
        } else {
            $("#login-common").addClass("disable");
        }
    })

})

