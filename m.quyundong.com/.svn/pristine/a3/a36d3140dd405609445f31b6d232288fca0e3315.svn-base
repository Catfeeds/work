(function(){
	var lock = false;

	var touchType = ('createTouch' in document) ? 'tap' : 'click';
	
	var showError = function(msg) {
		$('.J_err').html(msg);
		$('.J_err').show();
	};

	var hideError = function(){
		$('.J_err').hide();
	};

	$('.J_submit').on(touchType, function() {
		if(lock){
			return;
		}
		
		var tel = $('.J_tel').val();
		var code = $('.J_code').val();
		var url = $('#url_data').html();

		if(!tel || !/1[2345678]{1}\d{9}$/.test(tel)){
			showError('请输入正确的手机号');		
			return;
		}

		if(!code){
			showError('请输入验证码');
			return;
		}

		hideError();
		$('.J_submit').html('绑定中...');

		$.ajax({
			url: '/login/wechatbind',
			type: 'POST',
			dataType: 'json',
			cache: false,
			data: {
				phone: tel,
				sms_code: code,
				re_url: url
			},

		success: function(res){
			if(res && res.code == 1){
					location.href = res.data.url;
			}
			if(res.code == '0207'){
				showError('该手机已绑定，请输入新的手机号');
			}
			if(res.code == '0222'){
				showError('验证码错误，请输入正确的验证码');
			}
			if (res.code == '1001') {
				showError('手机号码有误');
			}
			if (res.code == '1010') {
				showError('手机验证码有误或已过期');
			}
			if (res.code == '5001') {
				location.href = res.data.redirect_url;
			}
			else{
				showError(res.msg);
				$('.J_submit').html('绑&nbsp;&nbsp;&nbsp;&nbsp;定');
				}
			},
			error: function(res){
				showError('网络出错，请稍后再试');
				$('.J_submit').html('绑&nbsp;&nbsp;&nbsp;&nbsp;定');
			}
	});
});
var HASH = getCookie('wx_hash');
	$('.J_getCode').on(touchType, function() {
		if($('.J_getCode').attr('disable')=='1') return;
	  var tel = $('.J_tel').val();
	  if(!tel || !/1[2345678]{1}\d{9}$/.test(tel)){	
		showError('请输入正确的手机号');		
		return;
	  }

	  $.ajax({
			url: '/login/wechatSms',
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
					showError('验证码已经发送，请在十分钟内完成绑定');
					setCodeTimer($('.J_getCode'));
				}
				if(res.code == '1007'){
					showError('获取手机验证码次数太频繁');
				}
				if(res.code == '1020'){
					showError('验证码已发送,30秒内无需重复获取');
				}
				if(res.code == '7008'){
					showError('此手机号码己经绑定其他账号');
				}
				if(res.code == '5001'){
					window.location.href = res.data.redirect_url;
				}
				else{
					showError(res.msg);
				}
			},
			error: function(res){
				showError('网络出错，请稍后再试');
			}

		});
	});
	

	$('.J_back').on(touchType, function(){
		window.history.go(-1);
	});
	
})()
