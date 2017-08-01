
//添加收藏
function addFavorite(o){
    var postData = {
            business_id: o.business_id,
            cat_id: o.cat_id
        }
        postData = typeof objMerge == 'function' ? objMerge(postData) : postData
	$.ajax({
        url: '/user/addFavorite',
        type: 'POST',
        dataType: 'json',
        cache: false,
        data: postData,
        success: function(res) {
            if(res.code == 1){
            	$('#favourite_img').attr('src', '/themes/qu201/images/qu_detail/fullstar.png');
            	$('#j_favourite').attr('collect', '1');
            	showToast('收藏成功');
            }else{
            	showToast('请先登录');
            }
        },
        error: function(res) {
            //
        }
    });
}

function removeFavorite(o){
    var postData = {
            business_id: o.business_id,
            cat_id:o.cat_id
        }
        postData = typeof objMerge == 'function' ? objMerge(postData) : postData
	$.ajax({
        url: '/user/removeFavorite',
        type: 'POST',
        dataType: 'json',
        cache: false,
        data: postData,
        success: function(res) {
            if(res.code == 1){
            	$('#favourite_img').attr('src', '/themes/qu201/images/qu_detail/icon-favourite.png');
            	$('#j_favourite').attr('collect', '0');
            	showToast('取消收藏');
            }else{
            	//
            }
        },
        error: function(res) {
            //
        }
    });
}


$('#j_favourite').click(function(){
	var business_id = $(this).attr('business_id');
	var cat_id = $(this).attr('cat_id');
	var collect  = $(this).attr('collect');
	var o = {"business_id":business_id, "cat_id":cat_id};
	if(collect==1){
		removeFavorite(o);
	}else{
		addFavorite(o);
	}
});	

//显示toast
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