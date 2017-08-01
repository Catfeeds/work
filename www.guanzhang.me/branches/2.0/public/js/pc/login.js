gz = window.gz || {}; 
$(document).ready(function() {
	$('.form input').keypress(function(){
		$('.error').empty().fadeOut();
	})
	$('.form input').change(function(){
		$('.error').empty().fadeOut();
	})
	
	if(document.getElementById("codePic")){
		gz.refreshCodePic();
	}
	

});


gz.refreshCodePic = function(){
	//图形验证码
	var codePicUrl = '/randCode/'+ new Date().getTime();	
	document.getElementById("codePic").src = codePicUrl
}


function checkPsw(str){
   var re = /^[a-zA-Z0-9]{6,15}/;
   if(re.test(str)){
	   return true; 
   }else{
	   return false;
   }          
}

function CheckMail(mail) { 
	var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
	if (filter.test(mail)) 
		return true; 
	else { 
		return false;
	}
}

function checkMobile(str) {
   var re = /^1\d{10}$/
   if (re.test(str)) {
	   return true; 
   } else {
	   return false;
   }
}

//提交表单
gz.submitLoginForm = function(){
	var _username = $.trim($('#username').val()),
		_password = $.trim($('#password').val()),
		_code= $.trim($('#code').val());
	
	
	if(_username.length<1){
		$('.error').html('请输入用户名、邮箱或者手机号').fadeIn();
		return false;
	}
	
	if(_password.length<1){
		$('.error').html('请输入密码').fadeIn();
		return  false;
	}
	
	if(_code.length<1){
		$('.error').html('请输入验证码').fadeIn();
		return  false;
	}
	
	$.ajax({
		url: $('.form form').attr('action'),
		type: 'post',
		dataType: 'json',
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify({
			username: _username,
			password: _password,
			code: _code
		}),
		success: function(res){
			if(!res.success){
				$('.error').html(res.errorMsg).fadeIn();
				return;
			}
			$('.error').html('发送成功！ 请打开邮箱根据提示修改密码').fadeIn();
		}
	})
}


//提交表单
gz.submitRegForm = function(){
	var _username = $.trim($('#username').val()),
		_email = $.trim($('#email').val()),
		_password = $.trim($('#password').val()),
		_password2 = $.trim($('#password2').val()),
		_code= $.trim($('#code').val());
	
	if(_username.length<1){
		$('.error').html('请输入邮箱').fadeIn();
		return false;
	}else{
		if(!checkPsw(_username) ){
			$('.error').html('账号长度6-15位').fadeIn();
			return false;
		}		
	}
	
	if(_email.length<1){
		$('.error').html('请输入邮箱').fadeIn();
		return false;
	}else{
		if(!CheckMail(_email) ){
			$('.error').html('请输入正确的邮箱').fadeIn();
			return false;
		}			
	}
	
	if(_password.length<1){
		$('.error').html('请输入密码').fadeIn();
		return false;
	}else{
		if(!checkPsw(_password) ){
			$('.error').html('密码长度6-15位').fadeIn();
			return false;
		}			
	}
	if(_password2.length<1){
		$('.error').html('请确认密码').fadeIn();
		return false;
	}else{
		if(_password!=_password2){
			$('.error').html('密码不一致').fadeIn();
			return false;
		}	
	}
	if(_code.length<1){
		$('.error').html('请输入验证码').fadeIn();
		return false;
	}
	
}


//提交表单
gz.submitSendMailForm = function(){
	var _username = $.trim($('#username').val()),
	_code= $.trim($('#code').val());
	if(_username.length<1){
		$('.error').html('请输入邮箱').fadeIn();
		return;
	}	
	if(_code.length<1){
		$('.error').html('请输入验证码').fadeIn();
		return ;
	}
	$.ajax({
		url: $('.form form').attr('action'),
		type: 'post',
		dataType: 'json',
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify({
			username: _username,
			code: _code
		}),
		success: function(res){
			if(!res.success){
				$('.error').html(res.errorMsg).fadeIn();
				return;
			}
			$('.error').html('发送成功！ 请打开邮箱根据提示修改密码').fadeIn();
		}
	})
}


//提交表单
gz.submitResetForm = function(){
	var _password = $.trim($('#password').val()),
		_password2 = $.trim($('#password2').val()),
		_code= $.trim($('#code').val());
	
	
	if(_password.length<1){
		$('.error').html('请输入密码').fadeIn();
		return false;
	}else{
		if(!checkPsw(_password) ){
			$('.error').html('密码长度6-15位').fadeIn();
			return false;
		}			
	}
	if(_password2.length<1){
		$('.error').html('请确认密码').fadeIn();
		return false;
	}else{
		if(_password!=_password2){
			$('.error').html('密码不一致').fadeIn();
			return false;
		}	
	}
	if(_code.length<1){
		$('.error').html('请输入验证码').fadeIn();
		return false;
	}
	
//	$('#spuser_reset').submit();
}

