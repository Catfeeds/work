<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta content="telephone=no" name="format-detection">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no,minimal-ui">
    <title>趣运动</title>
    <link rel="stylesheet" href="/static/appwebview/commissionreport/welcome/stylesheets/welcome.css">
</head>

<body>
    <section id="loading" data-lock="1" class="loading">
        <div class="loading-icon"></div>
    </section>
    <section class="main hide">
        <div class="cr-head"><img src="/static/appwebview/commissionreport/welcome/images/people.png" alt="">
            <div><img src="/static/appwebview/commissionreport/welcome/images/title.png" alt=""></div>
        </div>
        <div class="cr-btnGroup">
            <a class="click_count" data-name="app_down_click" data-href="http://www.quyundong.com/d" >
                <div>下载趣运动一元订场</div>
            </a>
            <a class="click_count" data-name="h5_jump_click" data-href="<?php echo $court_url;?>" >
                <div>我是土豪直接订</div>
            </a>
        </div>
        <input type="hidden" id="log_id" value="<?php echo $log_id;?>">
        <div class="cr-logo"><img src="/static/appwebview/commissionreport/welcome/images/logo.png" alt=""></div>
    </section>
    <script src="/static/js/zeptoWithFx.min.js"></script>
    <script src="/static/js/mobileResponsive.js"></script>
    <script>
    window.onload = function() {
        var loadInterval = setInterval(function() {
            if ($(".loading").attr("data-lock") == 1) {
                $(".loading").addClass("hide");
                $(".main").removeClass("hide");
                clearInterval(loadInterval);
            }
        }, 500);
    }
    
    $(".click_count").click(function(){
      if(!$(this).hasClass("disable")){
        $(this).addClass("disable");
        click_count($(this).attr("data-name"),this);
      }
    });

    function click_count(value,ctx){
        var log_id = $('#log_id').val();
        if(log_id && (value == "app_down_click" || value == "h5_jump_click")){
            var callback = function(res){
              console.log("success");
              windowHref(ctx);
            }
            var errorCallback = function(res){
              console.log("error");
              windowHref(ctx);
            }
            var value = value;
            ajaxSend(callback,errorCallback,log_id,value);
        }

        setTimeout(function(){
          windowHref(ctx);
        },2000);

    }
    
    function windowHref(ctx){
        $(ctx).removeClass("disable");
        if($(ctx).attr("data-href")){
            var url = $(ctx).attr("data-href");
            // window.location.href = $(ctx).attr("data-href");
            window.location.href = typeof urlAddParams == 'function' ? urlAddParams(url) : url;
        }
    }
    // Ajax请求
    function ajaxSend(callback,errorCallback,log_id,value){
        $.ajax({
          type:"get",
          url:"/s/c/?log_id="+log_id+"&value="+value+"&client_time="+newDate(),
          success: function(data){
            try{
              var res = data;
              callback(res);
            }catch(e){
              console.log(e);
              var res = JSON.parse(data);
              callback(res);
            }
          },
          error: function(xhr, type){
            errorCallback(type);
          }
        });
    }

    function newDate (){
        return parseInt(new Date().getTime()/1000);
    }
    </script>
    <script>
      var _hmt = _hmt || [];
      (function() {
      var hm = document.createElement("script");
      hm.src = "//hm.baidu.com/hm.js?faab40fbb816cf9bb1c5c940b05b0b98";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
      })();
    </script>
</body>

</html>
