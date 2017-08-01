;
(function(d, w) {
    if (!w.Gs) return false
    var gs = w.Gs
    var version = '1.0.8'
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
        w.logDiv.log('logout-v'+ version + ' gssdk-v' + gs.version)
    }

    gs.setCallback({
        'isGsLogoutSuccess':{
            success:function(data){gs._callback['_isGsLogoutSuccess'] && gs._callback['_isGsLogoutSuccess'](data)},
            fail:function(data){failLogoutApp(data.msg)},
            other:function(data){failLogoutApp(data.msg)}
        }
    })

    function failLogoutApp(msg) {
      if(msg) alert(msg)
      
    }
})(document, window)
