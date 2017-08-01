// 创建活动接口

function ajaxCreateActive(callback,errorCallback){
    $.ajax({
      type:"get",
      url:"/coachActivity/create?client_time=" + newDate(),
      success: function(data){
        var res = JSON.parse(data);
        callback(res);
      },
      error: function(xhr, type){
        errorCallback();
        // alert('Ajax error!');
      }
    });
    // setTimeout(function(){
    //   var data ='{"code":"5008","msg": "表示活动已下线","data": {"activity_url":"index.html"}}';
    //   var res = JSON.parse(data);
    //   callback(res);
    // },2000);
  }



// 兑换优惠券接口

 function ajaxCash (callback,urlMsg,num,checkCode,errorCallback){
    $.ajax({
      type:"get",
      url:"/coachActivity/cash/?activity_id="+urlMsg.activity_id+"&open_id="+urlMsg.open_id+"&phone="+num+"&sms_code="+checkCode+"&client_time="+ newDate(),
      success: function(data){
        var res = JSON.parse(data);
        callback(res);
      },
      error: function(xhr, type){
      errorCallback();
        // alert('Ajax error!')
      }
    });
    // setTimeout(function(){
    //   var data ='{"code":"0000","msg": "获取成功","data": {"money":"20"}}';
    //   var res = JSON.parse(data);
    //   callback(res);
    // },2000);
    
  }

// 砍价接口

 function ajaxBargain(callback,urlMsg,playmate,errorCallback){
    $.ajax({
      type:"get",
      url:"/coachActivity/bargain/?activity_id="+urlMsg.activity_id+"&open_id="+urlMsg.open_id+"&client_time="+ newDate() + "&playmate=" + playmate,
      success: function(data){
        var res = JSON.parse(data);
        callback(res);
      },
      error: function(xhr, type){
        errorCallback();
        // alert('Ajax error!')
      }
    });
    // console.log(callback,urlMsg,playmate);
    // var data ='{"code":"0000","msg":"不存在","data":{"money":"1.2"}}';
    // var res = JSON.parse(data);
    // callback(res);
  }

// 排名接口

function ajaxRank(callback,urlMsg,errorCallback){
    $.ajax({
      type:"get",
      url:"/coachActivity/rank/?activity_id="+urlMsg.activity_id+"&open_id="+urlMsg.open_id+"&client_time="+ newDate(),
      success: function(data){
        var res = JSON.parse(data);
        callback(res);
      },
      error: function(xhr, type){
      errorCallback();
        // alert('Ajax error!')
      }
    });
    // console.log(callback,urlMsg);
    // var data ='{"code":"0000","msg":"成功","data":{"ranklist":[{"nickname":"某某","headimg_url":"http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/46","money": "2.2","isplayer":"0"},{"nickname":"AA","headimg_url":"http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/46","money": "2.5","isplayer":"0"},{"nickname":"AA","headimg_url":"http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/46","money": "2.5","isplayer":"0"},{"nickname":"AA","headimg_url":"http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/46","money": "2.5","isplayer":"0"},{"nickname":"AA","headimg_url":"http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/46","money": "2.5","isplayer":"0"},{"nickname":"AA","headimg_url":"http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/46","money": "2.5","isplayer":"0"},{"nickname":"AA","headimg_url":"http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/46","money": "2.5","isplayer":"0"},{"nickname":"AA","headimg_url":"http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/46","money": "2.5","isplayer":"0"},{"nickname":"AA","headimg_url":"http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/46","money": "2.5","isplayer":"0"},{"nickname":"BB","headimg_url":"http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/46","money": "1.2","isplayer":"0"}],"player":{"money":"9.2","rank":"9","playmate":"1"},"owner":{"playcnt":"15","coupon_money":"20","phone":"15654389876"},"moneytotal":"50.2"}}';
    // var res = JSON.parse(data);
    // callback(res);
  }

  // 预热活动获取短信验证码

function ajaxGetSmsCode(callback,num,errorCallback){
    $.ajax({
      type:"get",
      url:"/coachActivity/getSmsCode/?phone="+num+"&client_time="+ newDate(),
      success: function(data){
        var res = JSON.parse(data);
        callback(res);
      },
      error: function(xhr, type){
      errorCallback();
        // alert('Ajax error!')
      }
    });

    // console.log(callback);
    // setTimeout(function(){
    //   var data ='{"code":"0000","msg":"发送成功","data":""}';
    //   var res = JSON.parse(data);
    //   callback(res);
    // },500);
    
  }

  function newDate (){
    return parseInt(new Date().getTime()/1000)
  }
