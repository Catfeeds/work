'use strict';

$(function () {
  // $.tipsBox.show('111');
  // $.loadingBox.show();
  // $.commonDialogBox.show();
  // 
  // 
  // 
  //
  //  
  function error(res){
    $.loadingBox.hide();
    alert('网络错误');
  }

  var transferSure = function(){
    var success = function(res){
      // console.log(res);
      $.loadingBox.hide();
      var res = $.ajaxList.checkFormat(res);
      if ( !res ) return $.tipsBox.show('格式错误，请刷新重试');
      if ( res.status == '0000' ) {
        $.tipsBox.show('转移到余额成功');
        setTimeout(function(){
          window.location.reload();
        },1000);
      } else {
        $.tipsBox.show(res.msg);
      }
    };
    var error = error;
    var data = {
      type : 0 ,
    };
    $.ajaxList.withdrawCash(data, success, error);
  }

  $('#transfer').click(function(){
    if ( Number($('.big-title em b').html()) == 0 ) return $.tipsBox.show('你的返现账户没有金额');
    $.commonDialogBox.show({
      title:'确认转至余额？',
      sureTxt:'确认',
      cancelTxt:'取消',
    },transferSure,function(){
      
    });
  });
})