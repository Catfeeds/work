function msg(_hintMsg,_time) {
    var body = document.body;
    var _div = document.createElement("div");
    _div.id = "_hint_msg";
    _div.innerHTML = _hintMsg?_hintMsg:'请输入';
    _div.style = "font-size: 14px;padding: 10px; position: absolute;top:50%;left: 50%;background: rgba(10,10,10,0.7);z-index: 1005;color: white;transform: translate(-50%,50%);";
    var _show_time = _time?_time:1000;
    body.appendChild(_div);
    setTimeout(function(){
        body.removeChild(document.getElementById("_hint_msg"));
    },_show_time);
}

function loading(status){
    var html = document.getElementsByTagName('html')[0];
    var body = document.body;
    if (status==true||status=='show') {
        if (document.getElementById("_loading_123")) {
        document.getElementById("_loading_123").style.display = 'block';
        }else{
            var _loading_bg = document.createElement("div");
            var _loading = document.createElement("div");
                _loading_bg.id = '_loading_123';
            _loading_bg.style = "width: 100%;height: 100%;background: white;position: fixed;top:0;left: 0;z-index: 1004;"
            var loadStyle = "width: 0.6rem;height: 60px;width: 60px;position: absolute;top: 50%;left: 50%;";
                loadStyle = loadStyle+"margin-top: -0.3rem;margin-left: -0.3rem;";
                loadStyle = loadStyle+"background: url(/static/images/loading.png) no-repeat;"
                loadStyle = loadStyle+"-webkit-background-size: cover;background-size: cover;";
                loadStyle = loadStyle+"-webkit-animation: rotate360 1s linear 0s infinite;";
                loadStyle = loadStyle+"-moz-animation: rotate360 1s linear 0s infinite;";
                loadStyle = loadStyle+"animation: rotate360 1s linear 0s infinite;";
                loadStyle = loadStyle+"margin-top:-30px;margin-left:-30px;";
                loadStyle = loadStyle+"-moz-transform: translate(50%,50%);";
                loadStyle = loadStyle+"-ms-transform: translate(50%,50%);";
                loadStyle = loadStyle+"-o-transform: translate(50%,50%);";
                loadStyle = loadStyle+"transform: translate(50%,50%);"
            _loading.style= loadStyle;
            _loading_bg.appendChild(_loading);
            html.appendChild(_loading_bg);

            var src = "@-moz-keyframes rotate360 {from {transform: rotateZ(0deg) }to {transform: rotateZ(360deg)}}";
                src = src+"@keyframes rotate360 {from {-webkit-transform: rotateZ(0deg);transform: rotateZ(0deg)}";
                src = src+"to { -webkit-transform: rotateZ(360deg);transform: rotateZ(360deg)}}";
                src = src+"@-webkit-keyframes rotate360 {from {-webkit-transform: rotateZ(0deg)}to {-webkit-transform: rotateZ(360deg)}}";

            var styleNode=document.createElement("style");  
                styleNode.type="text/css";  
                if( styleNode.styleSheet){         //  
                    styleNode.styleSheet.cssText= src;       //ie下要通过 styleSheet.cssText写入.   
                }else{  
                    styleNode.innerHTML= src ;       //在ff中， innerHTML是可读写的，但在ie中，它是只读的.   
                }  
                document.getElementsByTagName("head")[0].appendChild( styleNode );  
        }
    }else if(status==false||status=="hide"){
        if (document.getElementById("_loading_123")) {
            document.getElementById("_loading_123").style.display = 'none';
        }
    }   
}