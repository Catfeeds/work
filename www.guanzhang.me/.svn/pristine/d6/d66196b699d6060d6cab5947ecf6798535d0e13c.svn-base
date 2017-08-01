$(document).ready(function () {
//  $('#submit').click(function () {
//    if(check()){
//      console.log('ssss')
//      $('#form')[0].submit();
//    }
//  })

  $('.input').change(function () {
    if($.trim($(this).val()) !== ''){
      showErrorText(this,'');
    }
  })
})
var submitNText = '立即提交';
var submitingText = '提交中...';

function check () {
  var bool = true;
  $('.input').each(function (index,item) {
    if($.trim($(item).val()) === ''){
      showErrorText(item,'不能为空');
      bool = false;
    }
  })

  if(!bool) return bool;

  if(!checkPhone($('#tel').val())){
    showErrorText($('#tel')[0],'请填写正确的手机号码')
    return false;
  }

  return true;
}

function checkPhone(tel){
  if(tel && /1[2345678]{1}\d{9}$/.test(tel)){
      return true;
  }else{
      return false;
  }
}

function showErrorText (dom,text) {
  $(dom).parent().find('.error-tips').text(text);
}

var error = 0;

function successFn(res){
  if(res.status !== '0000'){
    if ( error >= 5 ) {
      error = 0;
      $('#submit').removeAttr('disabled').text(submitNText);
      $('.error').html(res.msg).fadeIn();
      return;
    } else {
      error ++;
      setTimeout(function(){submitJoin(true);},500);
    }
  } else {
    $('.error').html('发送成功！').fadeIn();
    $('#joinForm').html('<h2 style="padding-top:100px;"></h2><h2 style="height:400px;">申请成功，工作人员会尽快与您联系。<p class="tip" style="font-size:20px;margin-top:20px;">客服热线：4000-410-480</p></h2>');
  }
  // window.location.href = '/joinSuccess.html';
  
}

//提交表单
var submitJoin = function(type){
  if(!check()){
    return;
  }
  if (!type) {
    if($('#submit')[0].hasAttribute('disabled')) return false;
    $('#submit').attr('disabled','').text(submitingText);
  }
  
  
  var _name = $.trim($('#name').val()),
  _userName = $.trim($('#userName').val()),
  _tel = $.trim($('#tel').val()),
  _province = $.trim($('#province').val()),
  _city = $.trim($('#city').val()),
  _address = $.trim($('#address').val());
  
  $.ajax({
    url: $('#joinForm').attr('action'),
    type: 'post',
    dataType: 'json',
    cache: false,
    data: {
      venue: _name,
      link_men: _userName,
      link_phone: _tel,
      province: _province,
      city: _city,
      address: _address
    },
    success: successFn,
    error:function (res) {
      $('#submit').removeAttr('disabled').text(submitNText);
      $('.error').html('提交失败，请稍候重试').fadeIn();
    }
  })
}