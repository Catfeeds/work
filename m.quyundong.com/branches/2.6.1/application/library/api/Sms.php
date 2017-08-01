<?php
/**
 * 短信api
 * 
 * @author xiaosibo
 * @date 2015-04-22
 */
class api_Sms extends api_Base
{
    /**
     * 日志标题
     * 
     * @var string
     */
	const LOGTITLE = 'sms_api';
	
	/**
	 * 发送各类型的短信验证码
	 * 
	 * @param array $param 参数数组
	 * @return string|array
	 */
	public static function sendSmsCode(array $param)
	{
		$hashCookie = api_CoreHelper::getCookie('hash');
		if(!$hashCookie){
			baf_FileLog::log2File('no hashCookie IP:'.api_CoreHelper::getClientIp(),'smscode_get');
		}
	    if (!$param['phone'] || !$param['type']) {
	        return '0024';
	    }
	    
	    if (!api_CoreHelper::isMobile($param['phone'])) {
	        return '0024';
	    }
	    
		$param['action']	= 'get_sms_code';
		$param = self::addPublicParam($param);	

		return self::request(self::QydApiUrl.http_build_query($param), self::LOGTITLE);
	}
	
	/**
	 * 验证手机验证码
	 * 
	 * @param array $param 参数数组
	 * @return string|array
	 * @author xiaosibo
	 */
	public static function verifySmsCode(array $param)
	{

	    if (!$param['phone'] || !$param['sms_code'] || !$param['type']) {
	        return '0024';
	    }
	    
	    if (!api_CoreHelper::isMobile($param['phone'])) {
	        return '0024';
	    }
	    
	    $param['action']	= 'verify_sms_code';
	    $param = self::addPublicParam($param);
	    
	    return self::request(self::QydApiUrl.http_build_query($param), self::LOGTITLE);
	}
}

	
	

