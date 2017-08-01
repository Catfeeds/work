var lock = false;

var showError = function(msg) {
	$('.J_err').html(msg);
	$('.J_err').show();
};

var hideError = function(){
	$('.J_err').hide();
};

$('.J_submit').on('tap', function() {
	if(lock){
		return;
	}

	hideError();
	lock = true;
	$('.J_submit').html('支付中...');

  $.ajax({
		url: '',
		type: 'POST',
		dataType: 'JSON',
		cache: false,
		data: {

		},
		success: function(res){
			lock = false;
			if(res && res.code == 1){
				location.href = '';
			} else {
				showError(res.msg);
				$('.J_submit').html('微信支付');
			}
		},
		error: function(res){
			lock = false;
			$('.J_submit').html('微信支付');
			showError('网络出错，请稍后再试');
		}
	});
});