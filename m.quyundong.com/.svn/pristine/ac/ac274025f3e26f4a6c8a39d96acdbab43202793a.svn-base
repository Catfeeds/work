<?php

//常用

class baf_Common {
	
	/**
     * 获取db连接
     * 
     * @param string $className
     * @param string $dbServer  master|slave
     * @return object
     */
    public static function dbModel($className, $dbServer = 'master')
    {
        static $instance = array();

        $className = ucfirst($className) . 'Model';
        
        $cacheKey = $className . '-' . $dbServer;
       
        if (empty($instance[$cacheKey])) {            
            $pdo = baf_Mysql::factory($dbServer);            
            $instance[$cacheKey] = new $className($pdo);            
        }
        
        return $instance[$cacheKey];
    }

    /**
     * 获取7yundong数据库连接
     *
     * @param string $className
     * @param string $dbServer
     * @throws Exception
     * @return object
     */
    public static function db7YundongModel($className = '', $dbServer = 'master')
    {
        static $instance = array();

        if (!$className) { // 如果没有传具体的模型类名，则返回一个空的模型(没有指定数据表的数据库连接)
            $className = 'empty';
        }

        $className = ucfirst($className) . 'Model';

        $cacheKey = $className . '-' . $dbServer;

        if (empty($instance[$cacheKey])) {

            $dbName = '7yundong';

            $dbConfig = self::getConfig('database', $dbName);

            if (empty($dbConfig)) {
                throw new Exception("数据库配置未找到: {$dbName}");
            }

            $pdo = baf_Mysql::factory($dbName);
            $instance[$cacheKey] = new $className($pdo);
        }

        return $instance[$cacheKey];
    }

    /**
     * 获取yaf配置信息
     *
     * @param string $key  配置键名
     * @param string $deep 更深一层的配置
     *
     * @return mixed
     * @author xiaoyanchun
     */
    public static function getConfig($key, $deep = null)
    {
        $config = Yaf_Application::app()->getConfig(); // 把配置保存起来

        $value = $config->$key;

        if ($value instanceof Yaf_Config_Ini) {
            $arr = $value->toArray();

            if (!$deep) { // 没有更深一层
                return $arr;
            }

            if (isset($arr[$deep])) {
                return $arr[$deep];
            }
        }

        return null;
    }
    /**
     * 日志
     *
     * @param string $file
     * @param string $priority
     *       EMERG       紧急:系统无法使用  数据库连不上、redis连不上等
     *       ALERT       警告:必须采取行动
     *       CRIT        关键:关键条件
     *       ERR         错误:错误条件
     *       WARN        警告:警告条件
     *       NOTICE      注意:正常的但重要的条件
     *       INFO        信息:信息消息
     *       DEBUG       调试:调试消息
     * @param string $title  标题
     * @param mixed  $logArr  可以是字符串、数组（推荐数组）
     * @example baf_Common::log('file', 'DEBUG', '测试标题', '测试内容');
     * @return boolean
     */
    public static function log($file, $priority, $title, $logArr = '')
    {
        static $logSwitch = null;
        
        $priorities = array('DEBUG', 'INFO', 'WARN', 'ERR', 'CRIT', 'ALERT', 'EMERG');
        
        // 日志分隔符
        $split = ' || ';
    
        $priority = strtoupper($priority);
        if (!in_array($priority, $priorities)) {
            $priority = 'ERR';
        }
        
        // 可在后台控制开关 后台设置的为关闭的
        if (in_array($priority, array('DEBUG', 'INFO', 'WARN'))) {
            
            if ($logSwitch === null) {
                $logSwitch = '';
            }

            if (!empty($logSwitch) && !empty($logSwitch[0]) && in_array($priority, $logSwitch)) {
                return false;
            }
            
        }
    
        if (strpos($file, '/') !== false) { // 有包含路径的
            $dir = dirname($file);
            $file = basename($file);
        } else {
            $dir = '/home/logs/m.quyundong.com/' . date('Ymd');
        }
    
        if (!is_dir($dir)) {
            mkdir($dir, 0777, true);
        }
    
        // 获取IP
        if (php_sapi_name() == 'cli') {
            $ip = '127.0.0.1';  // 脚本模式，也记录一下占个位置
        } else {
            $ip = baf_Base::Clientip();
        }
    
        // 完整路劲
        $fullFile = $dir . '/' . $file . '.log';
    
        // 获取到上一级执行的类名::方法 或者 文件名::行号
        $arr = debug_backtrace();
        
        if (isset($arr[1])) { // 是在类的方法中执行
            if (isset($arr[1]['class'])) {
                $backtrace1 = $arr[1]['class'];
                $backtrace2 = $arr[1]['function'];
            } else {
                $backtrace1 = basename($arr[1]['file']);
                $backtrace2 = $arr[1]['line'];
            }
        } else { // 取文件名和行号
            $backtrace1 = basename($arr[0]['file']);
            $backtrace2 = $arr[0]['line'];
        }
    
        $backtrace = $backtrace1 . '::' . $backtrace2;
        // 日志内容-数组自动处理
        if (is_array($logArr)) {
            $arr = array();
            foreach ($logArr as $k => $v) {
                $v = is_array($v) ? json_encode($v) : $v;
                $arr[] = is_numeric($k) ? $v : ($k . ':' . $v);
            }
            $content = implode($split, $arr);
        } else {
            $content = $logArr;
        }
        
        // 去除换行，确保每条日志是一行
        $content = preg_replace('/(\r\n)|\r|\n/', ' ', $content);
    
        // 完整日志
        $str = date('Y-m-d H:i:s') . ' [' . $priority . '] trace:' . self::getTraceId() . ' ' . $backtrace . ' ' .  $ip . ' [' . $title . ']';

        if ($content) {
            $str .= ' == ' . $content;
        }      
        
        $fp = fopen($fullFile, "a");
        flock($fp, LOCK_EX);
        fwrite($fp, $str . "\r\n");
        flock($fp, LOCK_UN);
        fclose($fp);

        return true;
    }
	
	/**
	 * 
	 * @return String
	 */
	public static function getTraceId(){
		return CURRENT_TIMESTAMP . rand(10000,99999);
	}
	
	//获取系统信息
	public static function sysInfo(){
		$info['server_ip'] = baf_Base::getServerIp();
		$info['cliet_ip']  = baf_Base::Clientip();
		$info['os'] = php_uname();
		$info['php'] = phpversion();
		$info['sapi'] = $_SERVER['SERVER_SOFTWARE'];
		$info['sapi'] = $info['sapi'] ? $info['sapi'] : php_sapi_name();
		return $info;
	}
	
	private static function parse_size($str) {
		if(strtolower($str[strlen($str) -1]) == 'k') {
			return floatval($str) * 1024;
		}
		if(strtolower($str[strlen($str) -1]) == 'm') {
			return floatval($str) * 1048576;
		}
		if(strtolower($str[strlen($str) -1]) == 'g') {
			return floatval($str) * 1073741824;
		}
	}
	
	/**
	 * 处理逗号分隔的数据
	 *
	 * @param string $commaData 格式: 1,6,8
	 * @return string
	 */
	public static function handleCommaData($commaData){
	    $commaData = trim($commaData);
	    if (!$commaData) {
	        return '';
	    }
	
	    $tmpArr = explode(',', $commaData);
	    $tmpArr = array_filter($tmpArr); // 去掉空字段
	    $tmpArr = array_unique($tmpArr); // 去掉重复值
	
	    return implode(',', $tmpArr);
	}

    /**
     * 处理一周内
     *
     * @param
     * @return array
     */
    public static function getWithin(){
        $cur=array();
        $curtime=CURRENT_TIMESTAMP;
        $curweekday = date('w');
        $curweekday = $curweekday?$curweekday:7;

        $curmon = $curtime - ($curweekday-1)*86400;
        $cursun = $curtime + (7 - $curweekday)*86400;

        $cur['mon'] = $curmon;
        $cur['sun'] = $cursun;
        return $cur;
    }

    public static function getCoachImToken($user_id,$type,$refresh){
        $param["type"] = $type;
        $param["refresh"] = $refresh;
        $param['user_id']	= $user_id;
        $param['action']	= 'get_im_token';
        $param = api_Base::setPublicParam($param);
        $param['api_sign']  = api_Base::sign($param);

        $res = baf_Http::httpGet(api_Base::getApiImUrl().http_build_query($param));

        if(isset($res['status']) && $res['status']=='0000'){
            //输出数据
            return $res;
        }else{
            //输出错误数据
            return $res;
        }
    }

    public static function httpReferer(){
        $referer = !empty($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '';
        return $referer;
    }


    public static function CoachImToken($user_id){
        $imToken = '';
        $res = self::getCoachImToken($user_id,$type=1,$refresh=0);

        if (isset($res['status']) && $res['status'] == '0000') {

            $imToken = $res['data']['token'];
        }
        return $imToken;
    }


    public static function DeleteHtml($str)
    {
        $str = trim($str); //清除字符串两边的空格
        $str = strip_tags($str,""); //利用php自带的函数清除html格式
        $str = preg_replace("/\t/","",$str); //使用正则表达式替换内容，如：空格，换行，并将替换为空。
        $str = preg_replace("/\r\n/","",$str);
        $str = preg_replace("/\r/","",$str);
        $str = preg_replace("/\n/","",$str);
        $str = preg_replace("/ /","",$str);
        $str = preg_replace("/  /","",$str);  //匹配html中的空格
        return trim($str); //返回字符串
    }

    /**
     * 通过教练用户id获取融云用户id
     *
     * @param int $coachId 教练用户id
     * @return string
     */
    public static function getCoachRongyunUserId($coachId)
    {
        // 生成规则： c_教练用户id
        return 'c_'.$coachId;
    }

    /**
     * @param $key
     * @param null $default
     * @return string
     */
    public static function getOption($key, $default = null) {
        static $option = null;
        if (isset ( $option [$key] ) && $option [$key]) {
            return $option [$key];
        }
        $data = baf_Common::dbModel('Config')->getOneByKey($key);
        return $data ? $data : $default;
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
     * 手机号码格式化
     * 
     * @param unknown $mobile
     * @return string|unknown
     */
    public static function mobile_format( $mobile, $ver='2.0' ){
        $mobile = trim($mobile);
        if ( !empty($mobile) && self::containApiVer( $ver, '2.0' )){
            $mobile = substr($mobile, 0,3).'****'.substr($mobile, -4);
        }
        return $mobile;
    }


    /**
    * 当前版本号>=指定版本
    */
    public static function containApiVer( $ver, $target_ver ){
        $ver = intval( round($ver, 2) * 100 );
        $target_ver = intval( round($target_ver, 2) * 100 );
        if ( $ver >= $target_ver ) {
            return true;
        }
        return false;
    }
	public static function tranTime($time) {
		$nowTime = time ();
        $message = '';
        //一年前
        if (idate ( 'Y', $nowTime ) != idate ( 'Y', $time )) {
          $message = date ( 'Y年m月d日', $time );
         }
        else {
	        //同一年
	        $days = idate ( 'z', $nowTime ) - idate ( 'z', $time );
	        switch(true){
	             //一天内
	            case (0 == $days):
					$message = '今天 '.date('H:i', $time );
	                break;
	                //昨天
	            case (1 == $days):
	             	$message = '昨天' . date ( 'H:i', $time );
	                break;
	                 //前天
	            case (2 == $days):
	                $message = '前天 ' . date ( 'H:i', $time );
	                break;
	                 //超过2天
	            default:
	                $message = date ( 'n月j日 H:i', $time );
	                break;
	        }
    	}
     return $message;
	}

    /**
     * 输出性别
     */
    public static function getGender($gender){
        $array = array('m'=>'男', 'f'=>'女');
        return isset($array[$gender]) ? $array[$gender] : '';
    }

    /**
     * 拼接缩略图
     */
    public static function thumbImage($imgUrl, $type=0){
        return $imgUrl;
        //新图片地址已不适用以下规则
        $thumbs = array(0=>'_thumb_180', 1=>'_thumb_242');
        $index = strrpos($imgUrl,'.');        
        if($index !== false && isset($thumbs[$type])){
            $fileExt = strtolower(substr($imgUrl, $index));
            $newUrl = str_ireplace($fileExt, '', $imgUrl);
            $newUrl .= $thumbs[$type].$fileExt;
            return $newUrl;
        }else{
            return $imgUrl;
        }        
    }

    /**
     * 初始化接口返回结构
     * 
     * @param string $isObject
     * @return object stdClass
     */
    public static function initRes($isObject = true)
    {
        $res = new stdClass();
        $res->status = baf_ErrorCode::OK;
        $res->msg = 'success';
    
        if ($isObject) {
            $res->data = new stdClass();
        } else {
            $res->data = array();
        }
    
        return $res;
    }

    /**
     * 判断渠道
     */
    public static function isChannel($utmSource){
        $channel = '';
        if(!empty($_REQUEST['utm_source'])){
            $channel = $_REQUEST['utm_source'];
        }elseif(!empty($_REQUEST['f'])){
            $channel = $_REQUEST['f'];
        }
        return ($channel && $channel==$utmSource) ? true : false;
    }

    /**
     * 设置系统消息
     */
    public static function setMessage($message){
        if(empty($message) || !is_string($message)) return false;
        $_SESSION['_wapmsg_'] = $message;
        return true;
    }

    /**
     * 获取系统消息，获取后移除消息
     */
    public static function getMessage(){
        $msgKey = '_wapmsg_';
        if(!isset($_SESSION[$msgKey])) return false;
        $msg = $_SESSION[$msgKey];
        unset($_SESSION[$msgKey]);
        return $msg;
    }

    /**
     * 格式化异常数据
     */
    public static function formatExceptionData($e){
        return array(
                'error_msg' => $e->getMessage(),
                'error_code' => $e->getCode(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString()
            );
    }

    /**
     * 异常log
     */
    public static function exceptionLog(Exception $e, $logFile, $logTitle=''){
        $logData = self::formatExceptionData($e);
        if($logTitle) $logData['title'] = $logTitle;
        baf_FileLog::log2File(json_encode($logData), $logFile);
    }

    /**
     * 获取请求的唯一标识 (22位 = 12+6+4)
     *
     * @return string
     * @author xiaoyanchun
     */
    public static function getRequestIdentifier() {
        list($usec, $sec) = explode(' ', microtime());
        return date('ymdHis', $sec).substr($usec, 2, 6).mt_rand(1000, 9999);
    }
}
