<?php

//API父类

class api_Base {
	
	public static $code='';
	public static $msg ='';
	public static $writeLog = 1;
	
	const API_KEY = '4b111cc14a33b88e37e2e2934f493458';
	const ORDER_API_KEY = 'orderapi4a33b88e37e2e2934f493458';
	const QydApiUrl = API_7YUNDONG;
	const VenueApiUrl = VENUE_API;
	const CoachApiUrl = API_7YUNDONG_COACH;
	const CourtApiUrl = COURT_API;
	const TicketApiUrl = TICKET_API;
	const UserCardApiUrl = USER_CARD_API;
	const UserApiUrl = USER_API;
	const OrderApiUrl = ORDER_API;
	const ForumApiUrl = FORUM_API;
	const NewpayApiUrl = NEWPAY_API;
	const WeixinApiUrl = WEIXIN_API;
	const OrderOtherApiUrl = ORDER_API_OTHER;
	const OrderCourtJoinApiUrl = ORDER_API_COURTJOIN;
	const OrderApplyRefundApiUrl = ORDER_API_APPLYREFUND;

	/**
	 * 新api
	 */
	public static function getNewApiUrl(){
		if(getenv('PAY_HOST')){
			return 'https://api.qydtest.com/';
		}else{
			return 'https://api.quyundong.com/';
		}
	}

	//加密签名
	public static function sign($param, $api_key=''){
		if(empty($param) || $param == ''){
			return '';
		}
		unset($param['api_sign']);
		ksort($param);
		
		$s = '';
		foreach ($param as $key=>$row){
			if ($key=='login_secret') $row = urlencode($row);
			$s .= $key.'='.$row.'&';
		}
		$api_key = $api_key ? $api_key : self::API_KEY;
		return md5($s.$api_key);		
	}
	
	/**
	 * 设置接口的公共参数
	 * 
	 * @param array $param 参数数组
	 * @return array
	 * @author xiaoyanchun
	 */
	public static function addPublicParam(array $param, $api_key='')
	{
	    if (isset($param['city_id']) && $param['city_id'] > 0) {
	        // 有传入城市id，不获取默认城市
	    } else {
	        // 没有传入城市，获取默认的城市
	        $param['city_id'] = (int) api_CoreHelper::getCookie('city_id');
	    }
   
	    if (isset($param['utm_medium']) && $param['utm_medium']) {
	        // 有传utm_medium
	    } else {
	        $param['utm_medium'] = 'wap'; // 手机网站来源的标识
	    }
	    
	    $param['client_time'] = CURRENT_TIMESTAMP;
	    $param['api_sign'] = self::sign($param, $api_key); // 生成sign
	    
	    return $param;
	}
	
	//发起请求
	public static function request($url,$logTitle){
		$res = baf_Http::httpGet($url);
		$logContent = 'request_url: '.$url.' || request_result: ';
		if($res && is_array($res)){
			$logContent .= json_encode($res);
		}		
		if(self::$writeLog ==1 ){
			self::_tolog($logContent,$logTitle);
		}
		return $res;
	}

	//发起请求
	public static function reqPost($url,$data=array(),$logTitle){
		$res = baf_Http::httpPost($url,$data);
		$logContent = 'request_url: '.$url.' || request_result: ';
		if($res && is_array($res)){
			$logContent .= json_encode($res);
		}		
		if(self::$writeLog ==1 ){
			self::_tolog($logContent,$logTitle);
		}
		return $res;
	}
	
	//写log
	private static function _tolog($logContent,$logTitle){
		baf_FileLog::log2File($logContent,$logTitle);
	}

	//api错误记录
	protected static function errorLog($param, $res, $api, $logFile){
		$data = array('api'=>$api,'param'=>$param, 'res'=>$res);
		baf_FileLog::log2File(json_encode($data), $logFile);
	}

	/**
	 * 获取接口data
	 */
	protected static function getApiData($param, $apiHost, $apiPath='index', $logTitle=''){
		$param = self::addPublicParam($param);

		$action = !empty($param['action']) ? $param['action'] : '';
		$data = array();
		$url = $apiHost.$apiPath.'?'.http_build_query($param);

		$res = self::request($url, $logTitle);
		if(isset($res['status']) && $res['status']=='0000'){
			$data = isset($res['data']) ? $res['data'] : array();
		}else{
			self::errorLog($param, $res, $action, $logTitle);
		}
		return $data;
	}
	
	//返回
	public static function response($res){
		if(empty($res) || !is_array($res)){
			$res = array('code'=>-3,'msg'=>'');
		}
		echo json_encode($res);
		exit;
	}
}
