var bTelChecked = false,
    bCodeChecked = false;

window.onload = function() {
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

    $(".login-header input").on("propertychange input", function() {
        var val = $(this).val();
        if ($(this).hasClass("login-tel")) {
        	console.log(1);
            if (checkTel(val)) {
                bTelChecked = true;
            } else {
                bTelChecked = false;
            }
        } else {
        	console.log(2);
            if (checkCode(val)) {
                bCodeChecked = true;
            } else {
                bCodeChecked = false;
            }
        }
        if (bTelChecked && bCodeChecked) {
            $("#login-common").removeClass('disable');
        } else {
            $("#login-common").addClass("disable");
        }
    })
}

function checkTel(tel) {
    if (!tel || !/1[2345678]{1}\d{9}$/.test(tel)) {
        return false;
    }
    return true;
}

function checkCode(code) {
    if (!code || !/^\d{3,20}$/.test(code)) {
        return false;
    }
    return true;
}