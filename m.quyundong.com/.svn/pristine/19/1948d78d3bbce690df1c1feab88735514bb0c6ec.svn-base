<?php
/**
 * 优福利---广汽API
 * @author bigticket
 *
 */
class api_GagcApi extends api_Base {
	/**
	 * api 秘钥
	 *
	 * @var string
	 */
	const GAGC_API_KEY = '9005516040f53ccfde148fbc9ca11f67';
	
	/**
	 * 正式环境的api地址
	 *
	 * @var string
	 */
	protected static $apiProductUrl = 'http://www.bestfuli.com/haofuli/api/3rd/sport/updateCode';
	
	/**
	 * 开发环境的api地址
	 *
	 * @var string
	 */
	protected static $apiDevelopmentUrl = 'http://www.bestfuli.com/haofuli/api/3rd/sport/updateCode';
	
	//http://localhost:8080/haofuli/api/PayApiController/paymentForQYD?
	//consumerId=1&companyId=1&userWealInfo=1&phone=1&total=1&sign=1&partnerId=1&reqTime=1&orderDesc=1
	
	// 更新code
	public static function updateCode($phone,$code) {
		//return $hs = array('resultCode'=> 0);
		
		if(empty($phone) || empty($code)) return array();
		
		$data = array (
				'signType' => 'signType:MD5',
				'ver' => '1.0',
				'reqTime' => CURRENT_TIMESTAMP,
				'partnerId' =>'201612125412',
				'phone' => $phone,
				'code' => $code,
		);
		
		$data = self::makeSign($data);
	
		baf_FileLog::log2File ( 'request:' . json_encode ( $data ), 'gagc_update_code' );		
		
		$url = self::setUrl();
		$hs = self::reqPost($url,$data ,'gagc');
		
		baf_FileLog::log2File ( 'result:' . json_encode ( $hs ), 'gagc_update_code' );
		return $hs;
	}
	
	private static function setUrl(){
		if(IS_PRODUCT_ENVIRONMENT == 1){
			return self::$apiProductUrl;
		}
		return self::$apiDevelopmentUrl;
	}
	
	//签名
	public static function makeSign(array $param)
	{
		
		$param['sign'] = self::sign($param, self::GAGC_API_KEY); // 生成sign
		 
		return $param;
	}
	
	
	
}