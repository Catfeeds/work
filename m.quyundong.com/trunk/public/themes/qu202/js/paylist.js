window.onload = function() {
    var loadInterval = setInterval(function() {
        if ($(".loading").attr("data-lock") == 1) {
            $(".loading").addClass("hide");
            $(".main").removeClass("hide");
            clearInterval(loadInterval);
        }
    }, 500);

    $(".login-in").on("touchstart", "li", function() {
        var _this = $(this);
        if (!_this.hasClass("disable")) {
            _this.addClass('active');
        }
    })

    $(".login-in").on("touchend", "li", function() {
        var _this = $(this);
        if (!_this.hasClass("disable")) {
            _this.removeClass('active');
        }
    })

    $(".login-in").on("click", "li", function() {
        showPayBox();
    })

    var prevContent = '';

    $("#recharge-pw").on("input propertychange", function() {
        var reg = new RegExp("^\\d{1,6}$", "g");
        var val = $(this).val();
        if (reg.test(val)) {
            prevContent = $(this).val();
        } else {
            if (!val) {
                prevContent = "";
            }
            $(this).val(prevContent);
        }
        updatePasswordShow(prevContent.length);
    })

    // 点击密码验证框的“x”
    $(".recharge-btnGroup span").click(function() {
        $(".recharge-inputPw").addClass("hide");
    })

    $("#paylist-tryAgain").click(function() {
        $(".recharge-password").addClass("hide");
        showPayBox();
    })
}

function updatePasswordShow(showNum) {
    var aLi = $(".recharge-btnGroup li");
    aLi.removeClass('active');
    aLi.each(function(i, item) {
        if (i < showNum) {
            $(item).addClass("active");
        }
    })
}

function showPayBox() {
    $(".recharge-inputPw").removeClass("hide");
    $(".recharge-btnGroup p").text("请输入趣运动支付密码");
    $("#recharge-pw").val("").focus();
}
