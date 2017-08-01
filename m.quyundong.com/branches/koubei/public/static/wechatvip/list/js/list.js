var vipUnbindLock = false;

window.onload = function() {
    var loadInterval = setInterval(function() {
        if ($(".loading").attr("data-lock") == "1") {
            $(".loading").addClass("hide").css("background-color","transparent");
            $(".main").removeClass("hide");
            clearInterval(loadInterval);
        }
    }, 500);

    $(".list-unbind").click(function() {
        $(".nm-cover").removeClass("hide");
        $("body").css("overflow-y","hidden");
    })

    $(".nm-cover").on("touchstart", ".r,.l", function() {
        $(this).addClass("active");
    })

    $(".nm-cover").on("touchend", ".r,.l", function() {
        $(this).removeClass("active");
    })

    $(".list-sure").click(function(){
        if(vipUnbindLock) return;
        vipUnbindLock= true;
        $("#loading").removeClass('hide');

        $(".nm-cover").addClass("hide");

        var callback = function(res){
            if(res.status == "0000"){
                location.href = res.data.redirect_url;
            }else{
                alert(res.msg);
            }
        }
        ajaxUnbindWx(callback, errCallback);
    })

    $(".list-cancel").click(function(){
        $(".nm-cover").addClass("hide");
        $("body").removeAttr('style');
    })

    dprImagesFixed();
    // loadMoreElement();
}

function dprImagesFixed() {
    $("img").each(function() {
        var dpr;
        if ($("html").attr("data-dpr") > 2) {
            dpr = "dpr3x";
        } else {
            dpr = "dpr2x";
        }

        if (this.getAttribute("data-src")) {
            var src = this.getAttribute("data-src").replace(/dpr2x/, dpr);
            this.src = src;
        }

    });
    $(".use-background").each(function() {
        var dpr;
        if ($("html").attr("data-dpr") > 2) {
            dpr = "dpr3x";
        } else {
            dpr = "dpr2x";
        }
        if (this.getAttribute("data-src") && this.getAttribute("data-src") != "url()") {
            var src = this.getAttribute("data-src").replace(/dpr2x/, dpr);
            this.style.backgroundImage = src;
        }
    });
}


// 接口请求
function ajaxUnbindWx(callback, errorCallback) {
    var url = '/user/unbindApi?client_time='+newDate()
        url = typeof urlAddParams == 'function' ? urlAddParams(url) : url
    $.ajax({
        type: 'get',
        url: url,
        success: function(data) {
            var res = JSON.parse(data);
            callback(res);
            vipUnbindLock= false;
            $("#loading").addClass('hide');
        },
        error: function(xhr, type) {
            errorCallback(type);
            vipUnbindLock= false;
            $("#loading").addClass('hide');
            alert('网络错误');
        }
    })
}



function errCallback(res) {
    alert(res.msg);
}

function newDate() {
    return parseInt(new Date().getTime() / 1000);
}
