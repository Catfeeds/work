var showError = function(msg) {
	$('.J_err').html(msg);
	$('.J_err').show();
};
var hideError = function(){
	$('.J_err').hide();
};
var handleLocationError = function(error){
    // error拥有一个code属性和三个常量属性TIMEOUT、PERMISSION_DENIED、POSITION_UNAVAILABLE
    // 执行失败时，code属性会指向三个常量中的一个，从而指明错误原因
    var myCity = new BMap.LocalCity();
    myCity.get(myFun);
    switch(error.code){
        case error.TIMEOUT:
            console.log('超时');
            break;
        case error.PERMISSION_DENIED:
            console.log('用户拒绝提供地理位置');
            break;
        case error.POSITION_UNAVAILABLE:
            console.log('地理位置不可用');
            break;
        default:
            break;
    }
};
var myFun = function(result){
    setLocationCity(result.name);
}
var setLocationCity = function(cityName){
    var city_id;
    var city_name;
    var errno = false;
    if (cityName == '广州市'){
        city_id = '76';
        city_name = '广州';
    }else if(cityName == '深圳市'){
        city_id = '77';
        city_name = '深圳';
    }else if(cityName == '北京市'){
        city_id = '52';
        city_name = '北京';
    }else if(cityName == '上海市'){
        city_id = '321';
        city_name = '上海';
    }else if(cityName == '天津市'){
        city_id = '343';
        city_name = '天津';
    } else {
        city_id = '76';
        city_name = '广州';
        errno = true;
    }
    $('.J_LocalCity').attr('city_id', city_id);
    $('.J_LocalCity').attr('city_name', city_name);
    $('.LocalCity').html(city_name); 
    //如果定位失败，则显示定位失败，改成默认城市：广州
    if (errno){
        $('.LocalCity').html("定位失败");
        errno = false;
    }
}

//浏览器定位
if (navigator.geolocation){
    var getOptions = {
        //是否使用高精度设备，如GPS。默认是true
        enableHighAccuracy:false,
        //超时时间，单位毫秒，默认为0
        timeout:6000,
        //使用设置时间内的缓存数据，单位毫秒
        //默认为0，即始终请求新数据
        //如设为Infinity，则始终使用缓存数据
        maximumAge:0
    };
    navigator.geolocation.getCurrentPosition(function(position) {  
    //百度API读取城市名称
        var myGeo = new BMap.Geocoder();  
        myGeo.getLocation(new BMap.Point(position.coords.longitude, position.coords.latitude), function(result){      
            if (result){      
                var addComp = result.addressComponents; 
                setLocationCity(addComp.city);   
            }      
        });   
    }, handleLocationError, getOptions); 
}else{
    //不支持，则使用百度IP地址定位
    var myCity = new BMap.LocalCity();
    myCity.get(myFun);
}
//切换城市
$('.J_selectCity').on('click', function() {
    hideError();
    var postData = {
            city_id: $(this).attr('city_id'),
            city_name: $(this).attr('city_name')
        }
        postData = typeof objMerge == 'function' ? objMerge(postData) : postData
    $.ajax({
    		url: '/index/setCity',
    		type: 'GET',
    		dataType: 'JSON',
    		cache: false,
    		data: postData,
    		success: function(res){
                var res=JSON.parse(res);
    			if(res && res.code == 1){
                    var url = '/';
                    if(cid > 0){
                        url = '/court/?cid=' + cid;
                    }
    				location.href = typeof urlAddParams == 'function' ? urlAddParams(url) : url;
    			} else {
    				showError(res.msg);
    			}
    		},
    		error: function(res){
    			showError('网络出错，请稍后再试');
    		}
    });
});