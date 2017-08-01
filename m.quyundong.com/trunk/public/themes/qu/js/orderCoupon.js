var lock = false;

var showError = function(msg) {
	$('.J_err').html(msg);
	$('.J_err').show();
};

var hideError = function(){
	$('.J_err').hide();
};

$('.J_activateCoupon').on('click', function() {
	if(lock){
	   alert("正在处理中");
	   return;
	}

	hideError();
	lock = true;
	$('.J_activateCoupon').html('处理中...');

  $.ajax({
		url: '/order/ActivateCoupon',
		type: 'POST',
		dataType: 'JSON',
		cache: false,
		data: {
			'sn':$('.J_couponSn').val()
		},
		success: function(res){
            var res=JSON.parse(res);
			if(res && res.code == 1){
			    order_id = $('#order_id').val();      
				location.href = '/order/pay?id='+order_id+'&coupon_id='+res.data.coupon_id+'&coupon_aumont='+res.data.coupon_amount;
			} else {
			    lock = false;
				showError(res.msg);
				$('.J_activateCoupon').html('使用');
			}
		},
		error: function(res){
			lock = false;
			$('.J_activateCoupon').html('使用');
			showError('网络出错，请稍后再试');
		}
	});
});