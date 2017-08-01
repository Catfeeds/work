;
(function(d, w) {
    if (!w.Gs) return false
    var gs = w.Gs
    var version = '1.0.26'
    var debug = false
    var html = d.querySelector('html')

    if(debug){
       w.logDiv = d.createElement('div')
       w.logDiv.className = 'logDiv'
       w.logStyle = d.createElement('style')
       w.logStyle.innerHTML = ".logDiv{width:100%;height:150px;position:fixed;z-index:999999999;bottom:0;left:0;background-color:rgba(0,0,0,0.4);color:#fff;font-size:14px;overflow:scroll;}"
       html.appendChild(w.logDiv)
       html.appendChild(w.logStyle)
       w.logDiv.log = function(str) {
           w.logDiv.innerHTML = logDiv.innerHTML + '<br>' + str
       }
       w.logDiv.log('login-v'+ version + ' gssdk-v' + gs.version)
    }

    if(!!window.GsJSBridge){
      var body = d.body
      var oldBodyStyleDisplay = (body.style.display == '' ? 'block' : body.style.display)
      var displayNone = 'none'
      body.style.display = displayNone
    }

    
    function changeDisplay(msg) {
      // alert(oldBodyStyleDisplay)
      w.logDiv.log(msg)
      document.body.style.display = oldBodyStyleDisplay
    }

    gs.setCallback({
        'gsLogin':{
            success:function(data){successLoginApp(data)},
            fail:function(data){ changeDisplay(1)},
            other:function(data){changeDisplay(2);failLoginApp(data.msg)}
        },
        'isGsLoginSuccess':{
            success:successLoginApp,
            fail:function(data){ changeDisplay(3);failLoginApp(data.msg)},
            other:function(data){changeDisplay(4);failLoginApp(data.msg)}
        }
    })


    gs.ready(function(){
      try{
        var uid = getCookie('wx_uid');
        // alert(uid)
        if(!uid){
          gs.islogin()
        }else{
          changeDisplay(5)
        }
      }catch(e){
        alert(e);
      }
    })

    function successLoginApp(data) {
        var successCallback = function(res) {
            var res = JSON.parse(res)
            if (res.status == '0000') { 
              setTimeout(function () {
                 window.location.reload();
              },0)               
               
            } else {
              changeDisplay();
                failLoginApp(res.msg)
            }
        }
        var errorCallback = function(res) { alert(res); }
        $.ajax({
            url: '/login/authLogin',
            type: 'post',
            data: {
                user_id: data.data.user_id,
                login_encode: data.data.login_encode
            },
            success: successCallback,
            error: errorCallback
        })
    }

    function failLoginApp(msg) {
      if(msg) alert('failLoginApp: '+msg)
      window.history.back()
      setTimeout(function(){
        gs.closeWebview()
      },1000)
    }

})(document, window)
