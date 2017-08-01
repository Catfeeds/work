// 短信验证码倒计时
function setCodeTimer(o,cb){		
	var t = 60;
	var tip = ['获取验证码','重新获取'];
	o.addClass('pub_disable');
	o.attr('disable', '1');
	o.html(tip[1]+"("+t+"秒)");
	var codeTimer = window.setInterval(function(){
		t --;
		o.html(tip[1]+"("+t+"秒)");
		if(t==0){
			window.clearInterval(codeTimer);
			o.removeAttr('disable');
			o.removeClass('pub_disable');
			o.html(tip[1]);
			if(typeof cb == 'function'){
				cb()
			}
		}
	}, 1000);
}

//显示toast
function showToast(errMsg) {
    $(".toast .toast-msg").text(errMsg);
    $(".toast").removeClass('hide');
    setTimeout(function(){
        $(".toast").animate({"opacity":0},300,function(){
            $(this).css("opacity",1).addClass("hide");
        })
    },1000);
}

//获取cookie
function getCookie(c_name)
{
	if (document.cookie.length>0)
	{
		c_start=document.cookie.indexOf(c_name + "=")
		if (c_start!=-1)
		{
			c_start=c_start + c_name.length+1
			c_end=document.cookie.indexOf(";",c_start)
			if (c_end==-1) c_end=document.cookie.length
			return unescape(document.cookie.substring(c_start,c_end))
		}
	}
	return ""
}

//设置cookie
function setCookie(c_name,value,expiredays)
{
	var exdate=new Date()
	exdate.setDate(exdate.getDate()+expiredays)
	document.cookie=c_name+ "=" +escape(value)+
		((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}