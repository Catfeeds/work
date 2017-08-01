
var formPost = 0;


/**
* 提交拼场订单
* 1.9.7+
*/
function addCourtpoolOrder( cp_level, court_pool_id, user_id )
{
	cp_level = parseInt(cp_level);
	court_pool_id = parseInt(court_pool_id);
	user_id = parseInt(user_id);
	
	if(formPost) return;
	if(IsPC()){ alert('请在手机中打开，继续完成操作'); return; }
	
	//cp_level
	if(cp_level=='' || cp_level==0) { alert('请选择您的水平'); return; }
	if(court_pool_id < 1) { alert('拼场不存在'); return; }
    var url = '/login'
    // if(isNaN(user_id) || user_id <= 0) { window.location.replace('/login'); return; }
    if(isNaN(user_id) || user_id <= 0) { window.location.replace(typeof urlAddParams == 'function' ? urlAddParams(url) : url); return; }
	
	var cpbtn = $('#joincp_btn');
    var btnText = cpbtn.html();
	
    formPost = 1;
    cpbtn.html('正在提交...');
    $.ajax({
        url: '/order/doconfirm',
        type: 'post',
        dataType: 'json',
        cache: false,
        data: {
           'court_pool_id': court_pool_id,
           'order_type': 8,
		   'cp_level' : cp_level
        },
        success: function(res){        	
            if (res.code == 1) {
				setOrderCookie('cporder_level', cp_level);
                var url = '/order/pay?id=' + res.data
                // window.location.replace('/order/pay?id=' + res.data);
                window.location.replace(typeof urlAddParams == 'function' ? urlAddParams(url) : url);
            }
			else {
            	if(res.code == 9002){
                    var url = '/login'
                    // window.location.replace('/login');
            		window.location.replace(typeof urlAddParams == 'function' ? urlAddParams(url) : url);
            	}else{
            		alert(res.msg);
                    formPost = 0;
                    cpbtn.html(btnText);
            	}
            }            
        },
        error: function(res){
        	cpbtn.html(btnText);
        	formPost = 0;
           alert('网络出错，请稍后再试');
        }
    });
}

/**
 * 新增订单
 *
 * @param integer goodsId 商品名称
 * @param integer number  商品数量
 * @param integer actId   活动id
 * @return void
 * @author xiaosibo
 */

function addOrder()
{
	if(IsPC()){
		alert('请在手机中打开，继续完成操作');
		return;
	}
	if(formPost) return;
    var courtPoolId = parseInt($('input[name=court_pool_id]').val());
    var userId = parseInt($('input[name=user_id]').val());
    var btn = $('#join_btn');
    var btnText = btn.html();
    if(courtPoolId<1){
    	alert('拼场不存在');
    	return;
    }
    if(userId<1){
        var url = '/login'
        // window.location.replace('/login');
    	window.location.replace(typeof urlAddParams == 'function' ? urlAddParams(url) : url);
    	return;
    }
    formPost = 1;
    btn.html('正在提交...');
    $.ajax({
        url: '/order/doconfirm',
        type: 'post',
        dataType: 'json',
        cache: false,
        data: {
           'court_pool_id': courtPoolId,
           'order_type': 8
        },
        success: function(res){        	
            if (res.code == 1) {
                var url = '/order/pay?id=' + res.data
                // window.location.replace('/order/pay?id=' + res.data);
                window.location.replace(typeof urlAddParams == 'function' ? urlAddParams(url) : url);
            } else {
            	if(res.code == 9002){
                    var url = '/login'
                    // window.location.replace('/login');
            		window.location.replace(typeof urlAddParams == 'function' ? urlAddParams(url) : url);
            	}else{
            		alert(res.msg);
                    formPost = 0;
                    btn.html(btnText);	
            	}
            }            
        },
        error: function(res){
        	btn.html(btnText);
        	formPost = 0;
           alert('网络出错，请稍后再试');
        }
    });
}

function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}


$(function(){
	$('#join_btn').click(function(){
		addOrder();
	});
})



/**
* 這裡備注
*/
function setOrderCookie(name,value) 
{ 
	var Days = 30; 
	var exp = new Date(); 
	exp.setTime(exp.getTime() + Days*24*60*60*1000); 
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
} 

function getOrderCookie(name) 
{ 
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
		return unescape(arr[2]); 
	else 
		return null; 
} 
