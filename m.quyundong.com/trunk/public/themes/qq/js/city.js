var currentCityId = getCookie('city_id');
var hasSetCity = getCookie('set_city');
mqq.sensor.getLocation(function(retCode, lat, lon){
	getCityName(lon,lat);
});

function getCityName(longitude,latitude){
	var myGeo = new BMap.Geocoder();  
	myGeo.getLocation(new BMap.Point(longitude, latitude), function(result){
	    if (result){      
	        var addComp = result.addressComponents;
	        setLocationCity(addComp.city);   
	    }      
	});  	
}
 
var setLocationCity = function(cityName){
    var city_id;
    var city_name;
    var errno = false;
    //需配置更多城市
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
    if(!hasSetCity && city_id && city_id!=currentCityId){
    	if(confirm('当前所选城市不在'+cityName+'是否立即切换')){
            var url = '/?city_id='+city_id;
            // window.location.href = '/?city_id='+city_id;
    		window.location.href = typeof urlAddParams == 'function' ? urlAddParams(url) : url;
    	}else{
    		setCookie('set_city','1', 86400);
    	}    	
    }    
}