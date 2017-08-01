gz = window.gz || {}; 
gz.support = {};
$(document).ready(function() {
	$.ajax({
		type:'get',
		url:'/newsType/newsType_list.action',
		data:{
			type: 3,
			time: new Date().getTime()
		},
		async: false,
		dataType: 'json',
		timeout: 6000,
		success: function(res){
			if(!res.success){
				alert(res.errorMsg);
				return;
			}
			if(res.data && res.data.length>0){
				gz.support.loadType(res.data);
				var _typeId = $('.support .menu dl:first dd:first a').attr('data-id');
				if(!_typeId){
					return;
				}
				gz.support.getListId = _typeId;
				gz.support.getList(_typeId, 1);
				$('.support .menu dl:first dt').addClass('cur');
				$('.support .menu dl:first dd:first').addClass('cur');
				$('#list .title').html($('.support .menu dl:first dd:first em').html());
			}
		},
		error: function(){
			console.log('请求失败...');
		}
	});
	$('.support .menu dd').on('click', function(){
		$('.support .menu dt').removeClass('cur');
		$('.support .menu dd').removeClass('cur');
		$(this).addClass('cur').siblings('dt').addClass('cur');
		$('#list .title').html($('em', this).html());
	})
	$('#prevPage').click(function(){
		if($(this).hasClass('disable')){
			return;
		}
		var _prev = parseInt($('#pageNum').text()) - 1;
		gz.support.getList(gz.support.getListId, _prev);
	})
	$('#nextPage').click(function(){
		if($(this).hasClass('disable')){
			return;
		}
		var _prev = parseInt($('#pageNum').text()) + 1;
		gz.support.getList(gz.support.getListId, _prev);
	})
	$('#back').click(function(){
		$('#list').show();
		$('#detail').hide();
		$('#detail .title').empty();
		$('#detail .detail').empty();
	})
});
//获取分类
gz.support.loadType = function(data){
	var _dl = [];
	for(var i=0;i<data.length;i++){
		var _dd = [];
		for(var j=0;j<data[i].list.length;j++){
			_dd.push('<dd><a href="#" data-id="' + data[i].list[j].id + '" onclick="gz.support.getList(' + data[i].list[j].id + ', 1)"><span>－</span><em>' + data[i].list[j].name +'</em></a></dd>');
		}
		_dl.push('<dl><dt>' + data[i].name + '</dt>' + _dd.join('') +'</dl>');
	}
	$('.support .menu').html(_dl.join(''));
}
//获取列表
gz.support.getList = function(id, page){
	$('#list .title').empty();
	$('#list .list ul').empty();
	$('#list').show();
	$('#detail').hide();
	$('#detail .title').empty();
	$('#detail .detail').empty();
	gz.support.getListId = id;
	$.ajax({
		type:'get',
		url:'/news/query_byType.action',
		async:true,
		data: {
			type: id,
			pageNum: page,
			pageSize: 20,
			time: new Date().getTime()
		},
		dataType: 'json',
		timeout: 6000,
		success: function(res){
			if(!res.success){
				alert(res.errorMsg);
				return;
			}
			if(!res.data.list || res.data.list.length<1){
				$('#list .page').hide();
				return;
			}
			var _pages = res.data.pages,
				_pageNum = res.data.pageNum,
				_pageCount = res.data.pageCount;
			$('#pages').text(_pages);
			$('#pageNum').text(_pageNum);
			$('#pageCount').text(_pageCount);
			$('#list .page').show();
			if(_pageNum>1){
				$('#prevPage').removeClass('disable');
			}else{
				$('#prevPage').addClass('disable');
			}
			if(_pageNum<_pages){
				$('#nextPage').removeClass('disable');
			}else{
				$('#nextPage').addClass('disable');
			}
			if(res.data && res.data.list && res.data.list.length>0){
				var _html = [];
				for(var i=0;i<res.data.list.length;i++){
					_html.push('<li><a href="javascript:;" onclick="gz.support.loadContent(' + res.data.list[i].id + ')">' + res.data.list[i].title + '</a></li>');
				}
				$('.support .c .list ul').html(_html.join(''));
			}
		},
		error: function(){
			console.log('请求失败...');
		}
	});
}
//获取内容
gz.support.loadContent = function(id){
	$.ajax({
		type:'get',
		url:'/news/news_getById.action',
		data:{
			id: id,
			time: new Date().getTime()
		},
		async:true,
		dataType: 'json',
		timeout: 6000,
		success: function(res){
			if(!res.success){
				alert(res.errorMsg);
				return;
			}
			$('#list').hide();
			$('#detail').show();
			$('#detail .title').html(res.data.title);
			$('#detail .detail').html(res.data.content);
		},
		error: function(){
			console.log('请求失败...');
		}
	});
}
//提交表单
gz.submitForm = function(){
	var _name = $.trim($('#name').val()),
		_userName = $.trim($('#userName').val()),
		_tel = $.trim($('#tel').val()),
		_province = $.trim($('#province').val()),
		_city = $.trim($('#city').val()),
		_address = $.trim($('#address').val()),
		_reg = /^(\+|00)?((86)?(1[34578])[0-9]{9}|852[965][0-9]{7})$/i;
	if(_name.length<1){
		$('.error').html('请输入场馆名称').fadeIn();
		return;
	}
	if(_userName.length<1){
		$('.error').html('请输入姓名').fadeIn();
		return;
	}
	if(_tel.length<1){
		$('.error').html('请输入联系电话').fadeIn();
		return;
	}
	if(!_reg.test(_tel)){
		$('.error').html('请输入正确的手机号码').fadeIn();
		return;
	}
	if(_province.length<1){
		$('.error').html('请输入所在省份').fadeIn();
		return;
	}
	if(_city.length<1){
		$('.error').html('请输入所在城市').fadeIn();
		return;
	}
	$.ajax({
		url: $('.form form').attr('action'),
		type: 'post',
		dataType: 'json',
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify({
			venue: _name,
			link_men: _userName,
			link_phone: _tel,
			province: _province,
			city: _city,
			address: _address
		}),
		success: function(res){
			if(!res.success){
				$('.error').html(res.errorMsg).fadeIn();
				return;
			}
			$('.error').html('发送成功！').fadeIn();
		},
		error: function(){
			console.log('请求失败...');
		}
	})
}
