var bPrevPwChecked = false,
    bPwChecked = false;
    
$(function(){
    var loadInterval = setInterval(function() {
        if ($(".loading").attr("data-lock") == "1") {
            $(".loading").addClass("hide");
            $(".main").removeClass("hide");
            clearInterval(loadInterval);
        }
    }, 500);

    $(".login-in").on("touchstart","li",function(){
        var _this = $(this);
        if(!_this.hasClass("disable")){
            _this.addClass('active');
        }   
    })

    $(".login-in").on("touchend","li",function(){
        var _this = $(this);
        if(!_this.hasClass("disable")){
            _this.removeClass('active');
        }   
    })

    $(".wechat-form input").on("propertychange input", function() {
        var _this = $(this);
        var val = _this.val();
        if (_this.hasClass("wechat-tel")) {
            if (checkPassword(val)) {
                bPrevPwChecked = true;
            } else {
                bPrevPwChecked = false;
            }
        }else{
            var pw1 = $(".wechat-pw").eq(0).val();
            var pw2 = $(".wechat-pw").eq(1).val();
            if( pw1 === pw2 && checkPassword(pw1)){
                bPwChecked = true;
            }else{
                bPwChecked = false;
            }
        }
            console.log(bPrevPwChecked+","+bPwChecked);

        if (bPrevPwChecked && bPwChecked) {
            $("#login-common").removeClass('disable');
        } else {
            $("#login-common").addClass("disable");
        }
    })

    $(".nm-cover span").click(function() {
        $(".nm-cover").addClass('hide');
    });

})

function checkPassword(pw) {
    console.log(pw);
    if (!pw || !/^\S{6,20}$/.test(pw)) {
        return false;
    }
    return true;
}

// 显示toast
function showToast(errMsg,fn) {
    $(".toast .toast-msg").text(errMsg);
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

