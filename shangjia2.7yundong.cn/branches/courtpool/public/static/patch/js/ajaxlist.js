'use static';
$(function () {

var DEV = false;

var ajax = {
  url:{
    bindUser:'/Activity/bindUser', // 绑定用户信息
    sendSms:'/Activity/sendSms', // 发送手机验证码
    user:'/Activity/user', // 获取关联用户信息
    courtJoinList:'/Activity/courtJoinList', // 活动列表
    addCourtJoin:'/Activity/addCourtJoin', // 活动发起
    courtJoinInfo:'/Activity/courtJoinInfo', // 活动详情
    editCourtJoin:'/Activity/editCourtJoin', // 活动修改
    cancelCourtJoin:'/Activity/cancelCourtJoin', // 活动删除
    editFixedCourtJoin:'/Activity/editFixedCourtJoin', // 修改固定活动
    exportAmountList:'/Activity/exportAmountList', // 活动结算列表导出
  },
  exportAmountList:function(data, success, error){ // 活动结算列表导出
    $.ajax({
      url:ajax.url.exportAmountList,
      type:'get',
      data:data,
      success:success,
      error:error,
    });
  },
  editFixedCourtJoin:function(data, success, error){ // 修改固定活动
    $.ajax({
      url:ajax.url.editFixedCourtJoin,
      type:'post',
      data:data,
      success:success,
      error:error,
    });
  },
  cancelCourtJoin:function(data, success, error){ // 活动删除
    $.ajax({
      url:ajax.url.cancelCourtJoin,
      type:'post',
      data:data,
      success:success,
      error:error,
    });
  },
  editCourtJoin:function(data, success, error){ // 活动修改
    $.ajax({
      url:ajax.url.editCourtJoin,
      type:'post',
      data:data,
      success:success,
      error:error,
    });
  },
  courtJoinInfo:function(data, success, error){ // 活动详情
    $.ajax({
      url:ajax.url.courtJoinInfo,
      type:'get',
      data:data,
      success:success,
      error:error,
    });
  },
  bindUser:function(data, success, error){ // 绑定用户信息
    $.ajax({
      url:ajax.url.bindUser,
      type:'post',
      data:data,
      success:success,
      error:error,
    });
  },
  sendSms:function(data, success, error){ // 发送手机验证码
    $.ajax({
      url:ajax.url.sendSms,
      type:'post',
      data:data,
      success:success,
      error:error, 
    });
  },
  user:function(data, success, error){ // 获取关联用户信息
    $.ajax({
      url:ajax.url.user,
      type:'get',
      data:data,
      success:success,
      error:error,
    });
  },
  courtJoinList:function(data, success, error){ // 获取活动列表
    $.ajax({
      url:ajax.url.courtJoinList,
      type:'get',
      data:data,
      success:success,
      error:error,
    });
  },
  getAddCourtJoin:function(data, success, error){ // 获取场地信息
    $.ajax({
      url:ajax.url.addCourtJoin,
      type:'get',
      data:data,
      success:success,
      error:error,
    });
  },
  postAddCourtJoin:function(data, success, error){ // 提交活动
    $.ajax({
      url:ajax.url.addCourtJoin,
      type:'post',
      data:data,
      success:success,
      error:error,
    });
  },
  checkFormat:function(res){
    var data = false;
    console.log('ajax_res_format:',typeof res);
    if ( typeof res == 'object' ) {
      data = res;
    } else if ( typeof res == 'string' ) {
      try{
        data = JSON.parse(res);
      } catch(e) {
        tipsBox.show(e);
        data = false;
      }
    } else {
      data = false
    }
    return data;
  }
}


window.$ajaxlist = ajax;

});