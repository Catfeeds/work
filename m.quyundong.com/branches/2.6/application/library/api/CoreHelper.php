<?php
/**
 * 通用核心业务类
 * 
 * @author chenchao
 */
class api_CoreHelper {
	const FLAG_TRUE = '1';
	const FLAG_FALSE = '0';
	const DATE_FORMAT = 'Y-m-d H:i:s';
	static $cookie = array();
	public static function factory() {
		$className = __CLASS__;
		return new $className ();
	}
	
	/**
	 * 获取cookies
	 * @param unknown $key
	 * @param string $prefix
	 * @return boolean|Ambigous <boolean, NULL, unknown>
	 */
	public static function getCookie($key, $prefix=true){
		if ( empty($key)){
			return false;
		}
			
		$value = false;
			
		/* 二维 */
		if (preg_match("/\[.*?\]/", $key))
		{
			$posL = strrpos($key, '[');
			$posR = strrpos($key, ']');
			$oneDim = substr($key, 0, $posL);
			$twoDim = substr($key, $posL + 1, $posR - $posL - 1);


			$static = isset(self::$cookie[$oneDim][$twoDim]) ? self::$cookie[$oneDim][$twoDim]:null;
			$val = isset( $_COOKIE[$oneDim][$twoDim])? $_COOKIE[$oneDim][$twoDim]:null;
			$value = !$static ? $val : $static;
		}
		/* 一维 */
		else //if (!empty($_COOKIE[$key]))
		{
			if($prefix && stristr($key,COOKIE_PREFIX)=== FALSE){
				$key = COOKIE_PREFIX.$key;
			}
			$static = isset(self::$cookie[$key]) ? self::$cookie[$key]:null;
			$val = isset($_COOKIE[$key])?$_COOKIE[$key]:null;
			$value = $static!==null ? $static : $val;
		}
		return $value;
	}
	
	
	/**
	 * @name 记录COOKIE
	 * @param	int		$expire		cookie过期时间，<0为会话cookie
	 */
	public static function setCookie($key='', $value='', $expire=0, $prefix=true)
	{
		if(empty($key))return false;
	
		$now = CURRENT_TIMESTAMP;
	
		if ($expire > 0){
			$time = $now + $expire;
		}
		else
		{
			$time = 0;
		}
			
		if($prefix && !preg_match("/\[.*?\]/", $key) && stristr($key,COOKIE_PREFIX) === FALSE)
		{
			$key = COOKIE_PREFIX . $key;
		}
	
		if ($key && $value)
		{
			self::$cookie[$key] = $value;
			return setcookie($key, $value, $time, COOKIE_PATH, COOKIE_DOMAIN);
		}
		else if ($key)
		{
			self::$cookie[$key] = '';
			return setcookie($key, '', $now - 86400, COOKIE_PATH, COOKIE_DOMAIN);
		}
		else
		{
			return false;
		}
	}
	
	
	/**
	 * discuz authcode，用的是base64加密，分别能加密和解密。
	 * @para string $string 要加/解密的string
	 * @para string $operation 方法 $operation = 'ENCODE'|'DECODE'
	 * @para string $key 用来加密的key
	 *
	 * @return string
	 */
	public static function authcode($string, $operation = 'ENCODE', $key = '') {
		$auth_key = 'passwion_wx_#@x$';
		$key = md5 ( $key ? $key : $auth_key );
		$key_length = strlen ( $key );
		$string = $operation == 'DECODE' ? base64_decode ( $string ) : substr ( md5 ( $string . $key ), 0, 8 ) . $string;
		$string_length = strlen ( $string );
	
		$rndkey = $box = array ();
		$result = '';
	
		for($i = 0; $i <= 255; $i ++) {
			$rndkey [$i] = ord ( $key [$i % $key_length] );
			$box [$i] = $i;
		}
	
		for($j = $i = 0; $i < 256; $i ++) {
			$j = ($j + $box [$i] + $rndkey [$i]) % 256;
			$tmp = $box [$i];
			$box [$i] = $box [$j];
			$box [$j] = $tmp;
		}
	
		for($a = $j = $i = 0; $i < $string_length; $i ++) {
			$a = ($a + 1) % 256;
			$j = ($j + $box [$a]) % 256;
			$tmp = $box [$a];
			$box [$a] = $box [$j];
			$box [$j] = $tmp;
			$result .= chr ( ord ( $string [$i] ) ^ ($box [($box [$a] + $box [$j]) % 256]) );
		}
	
		if ($operation == 'DECODE') {
			if (substr ( $result, 0, 8 ) == substr ( md5 ( substr ( $result, 8 ) . $key ), 0, 8 )) {
				return substr ( $result, 8 );
			} else {
				return '';
			}
		} else {
			return str_replace ( '=', '', base64_encode ( $result ) );
		}
	}
	
	
	/**
	 * ription 获取配置
	 */
	public static function getOption($key, $default = null) {
		static $option = null;
		if (isset ( $option [$key] ) && $option [$key]) {
			return $option [$key];
		}
		$data = array ();
	
		if (empty ( $data )) {
			$data = baf_Common::dbModel('User')->fetchRow('SELECT option_value FROM wx_config WHERE option_key="'.$key.'"');
			if ($data === NULL) {
				return $default;
			}
				
			return $data['option_value'];
		}
		return $data;
	}
	
	
	/**
	 * 检测手机号码格式是否正确
	 *
	 * @param string $mobile 手机号
	 * @return boolean
	 * @author xiaosibo
	 */
	public static function isMobile($mobile)
	{
		if (preg_match('/1[123456789]{1}\d{9}$/', $mobile)) {
			return true;
		}
	
		return false;
	}
	
	
	/**
	 * 判断是否微信浏览器
	 * @return boolean
	 */
	public static function IsWenXinBrowser()
	{
		$useragent = isset($_SERVER["HTTP_USER_AGENT"]) ? strtolower($_SERVER["HTTP_USER_AGENT"]) : '';
		$is_wenxin = strripos($useragent, 'micromessenger');
		return $is_wenxin?true:false;
	}
	
	
	//插入日志
	public static function insertApiLog($data,$type=1,$jsonData=0){
	    if(empty($data)) return false;
	    $model = new ApiLog();
	    $model->attributes = array(
	        'type' => $type,
	        'refer_ip' => self::getClientIp(),
	        'content' => ($jsonData == 1)?$data:json_encode($data),
	        'addtime' => $_SERVER['REQUEST_TIME'],
	    );
	    $model->save();
	}
	
	
	/**
	 * 获取客户端ip
	 */
	public static function getClientIp($flag=false) {
		$ip=false;
		if(!empty($_SERVER["HTTP_CLIENT_IP"])){
			$ip = $_SERVER["HTTP_CLIENT_IP"];
		}
		if (!empty($_SERVER["HTTP_X_FORWARDED_FOR"])) {
			$ips = explode(",", $_SERVER["HTTP_X_FORWARDED_FOR"]);
			if ($ip) { array_unshift($ips, $ip); $ip = FALSE; }
			for ($i = (count($ips)-1); $i >= 0; $i--) {
				if (!preg_match('/^(10|172\.16|192\.168)\./', trim($ips[$i]))) {
					$ip = $ips[$i];
					break;
				}
			}
		}
		$ip = $ip ? $ip : (isset($_SERVER["REMOTE_ADDR"]) ? $_SERVER["REMOTE_ADDR"]:'');


		if ($flag)
			$ip = sprintf("%u",ip2long($ip));

		return $ip;
	}
	
	/**
	 * 判断城市
	 * @return boolean
	 */
	public static function getCityId()
	{
		$city_id = self::getCookie('city_id');
		if (empty($city_id)){
			$city_id = '76';
		}
		return $city_id;
	}
	
	
	/**
	 * 将场馆会员卡信息存储到cookie中
	 *
	 * 格式:
	 *  array(
	 *      17399_1_3332 => 00002001739900769
	 *      场馆id_场馆分类id_uid => 场馆会员卡号
	 *  )
	 *
	 * @param int  $businessId 场馆id
	 * @param int  $categoryId 场馆分类id
	 * @param int  $cno        场馆会员卡号(为空则表示删除)
	 * @param int  $userId     用户id
	 * @return bool
	 * @author xiaosibo
	 */
	public static function setCourtMemberToCookie($businessId, $categoryId, $cno, $userId = 0)
	{
		// 存储在cookie中的信息(格式: 场馆id_场馆分类id_uid => 场馆会员卡号)
		$key =  $businessId . '_' . $categoryId . '_' . $userId;
	
		// 已经存在的cookie信息
		$oldCookie = self::getCourtMemberFromCookie();
		$newCookie = array();
	
		if (!empty($oldCookie) && is_array($oldCookie)) {
			$newCookie = $oldCookie;
		}
	
		// 添加
		$newCookie[$key] = $cno;
	
		// 为空表示删除操作
		if (!$cno && isset($newCookie[$key])) {
			unset($newCookie[$key]);
		}
	
		// 将场馆的会员信息加密
		$securityString = self::authcode(json_encode($newCookie), 'ENCODE', ENCODE_KEY);
		 
		// 设置场馆会员cookie
		return self::setCookie('court_member_list', $securityString,1800);
	}
	
	
	/**
	 * 获取存储在cookie中的场馆会员卡信息
	 *
	 * @return null|array
	 * @author xiaosibo
	 */
	public static function getCourtMemberFromCookie()
	{
		$cookie = self::getCookie('court_member_list');
		if ($cookie) {
			return json_decode(self::authcode($cookie, 'DECODE', ENCODE_KEY), true);
		}
	}
	
	
	/**
	 * 场馆从cookie中获取会员卡信息
	 *
	 * @param int $businessId 场馆id
	 * @param int $categoryId 场馆分类id
	 * @param int $userId     用户id
	 * @return string 存在返回会员卡号, 不存在返回空字符串
	 * @author xiaosibo
	 */
	public static function getCnoFromCookie($businessId, $categoryId, $userId = 0)
	{
		$courtMemberCookie = self::getCourtMemberFromCookie();
	
		if (!empty($courtMemberCookie) && is_array($courtMemberCookie)) {
			// 存储在cookie中的格式: array(场馆id_场馆分类id_uid => 场馆会员卡号)
			$key = $businessId . '_' . $categoryId . '_' . $userId;
	
			// 存在cookie中并且不为空
			if (isset($courtMemberCookie[$key]) && $courtMemberCookie[$key]) {
				return $courtMemberCookie[$key];
			}
		}
		return '';
	}
	
	
	/**
	 * 获取网站根地址
	 * @param string $schema
	 * @return string
	 */
	public static function getHostInfo($schema='')
	{		
		$hostInfo = '';
		$secure = !empty($_SERVER['HTTPS']) && strcasecmp($_SERVER['HTTPS'],'off');
		if($secure)
			$http='http';
		else
			$http='http';
		
		if(isset($_SERVER['HTTP_HOST']))
			$hostInfo = $http.'://'.$_SERVER['HTTP_HOST'];
		else
		{
			$hostInfo = $http.'://'.$_SERVER['SERVER_NAME'];
			if($secure){
				$port = isset($_SERVER['SERVER_PORT']) ? (int)$_SERVER['SERVER_PORT'] : 443;
			}else{
				$post = isset($_SERVER['SERVER_PORT']) ? (int)$_SERVER['SERVER_PORT'] : 80;
			}
			if(($port!==80 && !$secure) || ($port!==443 && $secure))
				$hostInfo .= ':'.$port;
		}
		
		if($schema!=='')
		{
			if($secure && $schema==='https' || !$secure && $schema==='http')
				return $hostInfo;
	
			if($port=$schema==='https'){
				$port = isset($_SERVER['SERVER_PORT']) ? (int)$_SERVER['SERVER_PORT'] : 443;
			}else{
				$post = isset($_SERVER['SERVER_PORT']) ? (int)$_SERVER['SERVER_PORT'] : 80;
			}
			if($port!==80 && $schema==='http' || $port!==443 && $schema==='https')
				$port=':'.$port;
			else
				$port='';
	
			$pos=strpos($hostInfo,':');
			return $schema.substr($hostInfo,$pos,strcspn($hostInfo,':',$pos+1)+1).$port;
		}
		else
			return $hostInfo;
	}
	
	
	/**
	 * 将手机号码加*号
	 *
	 * 例如: CoreHelper::mobileHidden(15920133405); // 返回: 159****3405
	 *
	 * @param string $mobile 手机号
	 * @param int    $start  加*号的起始位置
	 * @param int    $length 加*号的长度
	 * @return string
	 * @author xiaosibo
	 */
	public static function mobileHidden($mobile, $start = 3, $length = 4)
	{
		// 不是手机号码，原始返回
		if (!self:: isMobile($mobile)) {
			return $mobile;
		}
	
		return substr_replace($mobile, str_repeat('*', $length), $start, $length);
	}
	
	
	/**
	 * Stores a flash message.
	 * @param string $value
	 */
	public static function setFlashMsg($key, $value){
		$session = Yaf_Session::getInstance ();
		$key = '__flash_'.$key;
		$session->__set($key, $value);
	}
	
	
	/**
	 * get a flash message.
	 * @return unknown
	 */
	public static function getFlashMsg($key){
		$session = Yaf_Session::getInstance ();
		$key = '__flash_'.$key;
		$msg = $session->__get($key);
		$session->del($key);
		return $msg;
	}
	
	/**
	 * 获取星期
	 * @param string $key
	 * @return Ambigous <multitype:string , string>
	 */
	public static function getWeek($key=null){
		$week = array(
			'周日','周一','周二','周三','周四','周五','周六'
		);
		return $key!==null ? $week[$key] : $week;
	}

	/**
	 * 返回星期描述
	 */
	public static function getDateTips($dateTime, $useToday=true){
		$weekaArr = self::getWeek();
		$todayTime = strtotime(date('Y-m-d'));
		if($dateTime==$todayTime && $useToday){
			return '今天';
		}else{
			$i = date('w', ($dateTime));
			return isset($weekaArr[$i]) ? $weekaArr[$i] : '未知';
		}
	}
}