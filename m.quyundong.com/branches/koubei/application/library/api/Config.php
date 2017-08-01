<?php

class api_Config extends api_Base {

	//获取配置
	public static function getConfigByKey($option_key,$defaultValue,$cacheKey='coach_api:config:'){
		if(empty($option_key))return false;
		if(empty($defaultValue)) return false;
		$cacheKey .= $option_key;
		$redis = baf_Redis::factory();
		$value = $redis->get($cacheKey);

		if($value){
		    return $value;
		}

		$param['option_key'] = $option_key;
		$param['action']	= 'get_config_bykey';
		$param = self::addPublicParam($param);
		$param['api_sign']	= self::sign($param);
		$res = baf_Http::httpGet(self::getApiUrl().http_build_query($param));

		$value = '';
		if (isset($res['status']) && $res['status'] == '0000') {
		    $value = isset($res['data']['option_value']) ? $res['data']['option_value'] : '';
		}

		if(empty($value)){
		    $value = $defaultValue;
		}
	    $redis->set($cacheKey, $value);
	    $redis->expire($cacheKey, 300);
		return $value;



	}
	public static function getApiUrl($urlPath = ''){
	if($urlPath == '') $urlPath = 'app/v2';

	$config = baf_Common::getConfig('api', '7yundong');

	//return Config::$apiUrl['7yundong'].$urlPath.'?';

	if (empty($config)) {
		return $urlPath;
	}

	return $config.$urlPath.'?';
}
}
