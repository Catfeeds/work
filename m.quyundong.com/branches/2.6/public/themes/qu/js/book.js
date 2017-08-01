(function(){

	var touchType = ('createTouch' in document) ? 'tap' : 'click';

	var page = 1, isLocked = false;

	var listTmpl = template.compile(
		'<% for(var i = 0; i < list.length; i++) { %>' +
        '<div class="court J_court" onclick="jumpDetail(this)" bid="<%=list[i].business_id%>" cid="<%=list[i].category_id%>">' +
        '	<div class="txt">' +
		'		<p class="name"><a style="color: #333;text-decoration: none;font-size:16px;" href="/court/detail?id=<%=list[i].business_id%>&cid=<%=list[i].category_id%>"><%=list[i].name%></a></p>' +
        '<% if ( list[i].sub_region != ""){ %>'+
		'		<p class="addr">【<%=list[i].sub_region%>】</p>' +
        '<% } else {%>'+
        '		<p class="addr"></p>' +    
        '<% } %>'+
		'	</div>' +
        '<% if ( list[i].promote_list != "" ){ %>'+
		'	<div class="num" style="margin-right: 6px;">' +
        '<% } else {%>'+
        '	<div class="num" style="margin-right: 6px;height: 50px;line-height: 50px;">' +   
        '<% } %>'+
		'		<p class="price">' +
        '<% if (list[i].promote_price > 0){ %>' +
            '<em class="org_price">￥<%=list[i].price%></em>'+
            '<em class="pro_price">￥<i><%=list[i].promote_price%></i><em>起</em></em>'+
        '<% } else { %>' +
        '<%    if (list[i].price > 0){%>' +
                '<em class="pro_price">￥<i><%=list[i].price%></i><em>起</em></em>'+
        '<%    }else{%>'+
                '<em class="no_price">暂无报价</em>'+
        '<%    } %>'+
        '<% } %>'+
		'	    </p>' +
        '<% if (list[i].promote_list != "" ){ %>'+
            '<p class="list-act">'+
            '<span><i class="list-act-i"><%=list[i].promote_list[0]%></i></span>'+
            '</p>'+
        '<% } %>'+
		'	</div>' +
		//'<div class="court J_court" cid="<%=list[i].business_id%>">' +
		//'	<a href="/court/detail?id=<%=list[i].business_id%>"><div class="img">' +
		//'		<img src="<%=list[i].image_url%>" />' +
		//'	</div></a>' +
		//'	<div class="txt">' +
		//'		<p class="name"><a href="/court/detail?id=<%=list[i].business_id%>"><%=list[i].name%></a></p>' +
		//'		<p class="addr"><%=list[i].address%></p>' +
		//'	</div>' +
		//'	<div class="num">' +
		//'		<p class="price">&yen;<%=list[i].price%></p>' +
		//'		<p class="dis"><i class="icon-location"></i><%=list[i].distance%></p>' +
		//'	</div>' +
		'</div>' +
		'<% } %>');


	var bindDOM = function(){
		/*$('.J_district').on(touchType, function(){
			$('.J_districtLayer').show();
		});

		$('.J_selectDistrict').on(touchType, function(){
			var did = $(this).attr('did');
			renderCourt(did);
			$('.J_districtLayer').hide();

			$('.J_districtLayer .active').removeClass('active');
			$(this).addClass('active');
			$('.J_district span').html($(this).html());
		});*/

		$('.J_court').on(touchType, function(){
			window.location.href = '/court/detail?id=' + $(this).attr('bid') + '&cid='+ $(this).attr('cid');
		});

		$('.J_getMore').on(touchType, function(){
			if(isLocked){
				return;
			}

			isLocked = true;
		  $.ajax({
				url: '/court/getnext',
				type: 'get',
				dataType: 'json',
				cache: false,
				data: {
					page: page + 1,
                    cid: $('.J_categoryId').val(),
				},
				success: function(res){
					isLocked = false;
					if(res && res.code == 1){
						page++;
						//console.log(listTmpl({
						//	list: res.data
						//}))
                        //返回数据小于20时，不显示加载更多按钮
                        if (res.data.length < 20){
                            $('.J_getMore').hide();
                        }
                        //console.log(res.data.length);
						$('.J_courtList').append(listTmpl({
							list: res.data
						}));
					}
				},
				error: function(res){
					isLocked = false;
				}
			});
		});
	};

	//renderCourt(0);
	bindDOM();

})()

function jumpDetail(obj){
   window.location.href = '/court/detail?id=' + $(obj).attr('bid') + '&cid='+ $(obj).attr('cid'); 
}