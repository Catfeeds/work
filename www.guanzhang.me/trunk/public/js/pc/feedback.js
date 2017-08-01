gz = window.gz || {}; 
$(document).ready(function() {
	$('.form input').keypress(function(){
		$('.error').empty().fadeOut();
	})
	$('.form input').change(function(){
		$('.error').empty().fadeOut();
	})
});

//提交表单
gz.goSupplier = function(){
	window.location.href = 'http://whales.guanzhang.me/register.html';
}

//提交表单
gz.submitForm = function(){
	var _name = $.trim($('#name').val()),
		_userName = $.trim($('#userName').val()),
		_tel = $.trim($('#tel').val()),
		_province = $.trim($('#province').val()),
		_city = $.trim($('#city').val()),
		_address = $.trim($('#address').val()),
		_reg = /^(\+|00)?((86)?(1[34578])[0-9]{9}|852[965][0-9]{7})$/i;
	if(_name.length<1){
		$('.error').html('请输入场馆名称').fadeIn();
		return;
	}
	if(_userName.length<1){
		$('.error').html('请输入姓名').fadeIn();
		return;
	}
	if(_tel.length<1){
		$('.error').html('请输入联系电话').fadeIn();
		return;
	}
	if(!_reg.test(_tel)){
		$('.error').html('请输入正确的手机号码').fadeIn();
		return;
	}
	if(_province.length<1){
		$('.error').html('请输入所在省份').fadeIn();
		return;
	}
	if(_city.length<1){
		$('.error').html('请输入所在城市').fadeIn();
		return;
	}
	
	$.ajax({
		url: $('.form form').attr('action'),
		type: 'post',
		dataType: 'json',
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify({
			venue: _name,
			link_men: _userName,
			link_phone: _tel,
			province: _province,
			city: _city,
			address: _address
		}),
		success: function(res){
			if(!res.success){
				$('.error').html(res.errorMsg).fadeIn();
				return;
			}
			$('.error').html('发送成功！').fadeIn();
		}
	})
}

