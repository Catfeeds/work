$(document).ready(function () {
  formInit ()
  
})

function formInit () {
  var alertMsgBoxer = new AlertTextBoxer()

  $('#submit').click(function () {
    if(this.hasAttribute('disabled')) return false
    submitForm(this,alertMsgBoxer)
  })

  $('#form input').focus(function () {
    $(this).removeAttr('alert')
  })
}

function submitForm (dom,AMB) {
  var AMB = AMB
  if(AMB && typeof AMB.msg != 'undefined') AMB.msg = "" 
  if(checkAll(AMB) && checkPhoneAction(AMB)){
    submitFormSuccess(dom)
  }
  if(AMB && AMB.msg) showAlert(AMB.msg)
  
  return false
}

function showSuccessPage(){
  $('.page-form').addClass('hide')
  $('.page-success').removeClass('hide')
}

function submitFormSuccess(dom){
  $(dom).attr('disabled','')
  var successCallback = function(res){
    var data = res
    if(data.status == '0000'){
      showSuccessPage()
    }else{
      $(dom).removeAttr('disabled')
      showAlert(data.msg+'_'+data.status)
    }
  }
  var errorCallback = function(res){
    $(dom).removeAttr('disabled')
    showAlert(res.statusText + "_" + res.status)
  }
  var url = $('#form').attr('action')
  // var data = new FormData($("#form")[0])
  
  var _name = $.trim($('#name').val()),
    _userName = $.trim($('#userName').val()),
    _tel = $.trim($('#tel').val()),
    _province = $.trim($('#province').val()),
    _city = $.trim($('#city').val()),
    _address = $.trim($('#address').val());
    
    var data = {
      venue: _name,
      link_men: _userName,
      link_phone: _tel,
      province: _province,
      city: _city,
      address: _address
    }

  ajaxSubmitForm(url,data,successCallback,errorCallback)
}

function ajaxSubmitForm(url,data,successCallback,errorCallback){
  $.ajax({
    url:url,
    type:'POST',
    data:data,
    dataType:"json",
    async: true,
    cache: false,
    success: function(data){
      successCallback(data);
    },
    error: function(data){
      errorCallback(data);
    }
  })
}

function checkAll (AMB) {
  var alertCount = 0
  $('#form input').each(function (index,item) {
    if($(item).val().trim() == ''){
      $(item).attr('alert','')
      alertCount ++
      if(AMB && typeof AMB.msg != 'undefined') AMB.msg +=  $(item).attr('placeHolder')+'<br/>'
    }
  })
  return !alertCount
}

function checkPhone(tel){
  if(tel && /1[2345678]{1}\d{9}$/.test(tel)){
      return true;
  }else{
      return false;
  }
}

function checkPhoneAction (AMB) {
  var cp = checkPhone($('#tel').val())
  if(!cp){
    if(AMB && typeof AMB.msg != 'undefined') AMB.msg +=  '请输入正确手机号码<br/>'
    $('#tel').attr('alert','')
  }
  return cp
}

function showAlert (text) {
  showToast(text)
}

function AlertTextBoxer(){
  this.msg = ""
}

function showToast(errMsg,fn) {
  $(".toast .toast-msg").html(errMsg);
  $(".toast").removeClass('hide');
  setTimeout(function(){
      $(".toast").animate({"opacity":0},300,function(){
          $(this).css("opacity",1).addClass("hide");
          if(fn){
              fn();
          }
      })
  },1000);
}