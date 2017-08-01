$(document).ready(function () {
  var ajaxLock  = false
  var myShowWait = new ShowWait(function(fn){
    if(!ajaxLock){
      ajaxLock = true
      var successCallback = function(data){
        var res = JSON.parse(data)
        if(res.code == '0000'){
          window.location.reload()
        }else{
          alert(res.msg)
        }
        ajaxLock = false
        if(typeof fn == 'function') fn()
      }
      var errorCallback = function(data){
        alert('�������')
        ajaxLock = false
        if(typeof fn == 'function') fn()
      }
      $.ajax({
        url:'/Myorder/outCourtJoin',
        type:'get',
        data:{
          'user_id':$('#user_id').val(),
          'order_id':$('#order_id').val(),
          'refund_way':$('#refund_way').val(),
          'refund_cause':$('#refund_cause').val()
        },
        success:successCallback,
        error:errorCallback
      })
    }
    
  },function(fn){
    fn()
  },{
    'title':'<h3>ȷ���˳��������</h3><br><h4 style="padding:0 4px;">�����뷢���߹�ͨ�����˳�,�˳�����ԭ·�˻�,5���������ڵ���</h4>'
  })

  $(".icon-msg,.icon-phone").click(function() {
    $(".js-cover").removeClass('hide');
  })

  $(".icon-info").click(function() {
    $(".js-info-cover").removeClass('hide');
  })

  $('.js-info-cover').click(function(){
    $('.js-info-cover').addClass('hide');
  })


  $(".js-cover .cancel").click(function() {
    $(".js-cover").addClass('hide');
  })

  $('.js-goto-url').click(function(){
     var url = this.dataset.url
    // window.location.href = this.dataset.url
    window.location.href = typeof urlAddParams == 'function' ? urlAddParams(url) : url;
  })

  $('#out').click(function(){
    myShowWait.showCover()
  })

})