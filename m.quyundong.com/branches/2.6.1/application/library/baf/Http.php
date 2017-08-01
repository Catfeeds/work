<?php
/**
 * Http请求类
 * @author admin
 */
class baf_Http {	

	/**
	 * http get请求
	 *
	 * @param string $url
	 * @param string $method
	 * @param array $postfields
	 * @return string
	 */
	public static function httpGet($url,$log='') {
		$ci = curl_init ();
		curl_setopt ( $ci, CURLOPT_URL, $url );
		curl_setopt ( $ci, CURLOPT_CONNECTTIMEOUT, 30 ); // 连接超时
		curl_setopt ( $ci, CURLOPT_TIMEOUT, 30 ); // 执行超时		 
		curl_setopt ( $ci, CURLOPT_RETURNTRANSFER, true ); // 文件流的形式返回，而不是直接输出
		curl_setopt ( $ci, CURLOPT_HEADER, FALSE );
		curl_setopt($ci, CURLOPT_SSL_VERIFYPEER, false);

		$response = curl_exec( $ci ); 
		curl_close ( $ci );
		return self::response($response,$log);
	}
	
	/**
	 * http get请求
	 *
	 * @param string $url
	 * @param string $method
	 * @param array $postfields
	 * @return string
	 */
	public static function httpPost($url, $postfields,$log='') {
		$ci = curl_init ();
		curl_setopt ( $ci, CURLOPT_URL, $url );
		curl_setopt ( $ci, CURLOPT_CONNECTTIMEOUT, 30 ); // 连接超时
		curl_setopt ( $ci, CURLOPT_TIMEOUT, 30 ); // 执行超时
		curl_setopt ( $ci, CURLOPT_RETURNTRANSFER, true ); // 文件流的形式返回，而不是直接输出
		curl_setopt ( $ci, CURLOPT_HEADER, FALSE );
		curl_setopt($ci, CURLOPT_SSL_VERIFYPEER, false);
		
		curl_setopt ( $ci, CURLOPT_POST, true );			
		curl_setopt ( $ci, CURLOPT_POSTFIELDS, $postfields ); // post数据 可为数组、连接字串
		
		$response = curl_exec( $ci );
		curl_close ( $ci );
	
		return self::response($response,$log);
	}
	
	/**
	 * 统一处理返回和写log
	 * 
	 * @param  $response
	 */
	public static function response($response,$log=''){
		/* 解码返回的json串 */
		$response = trim ( $response );
		if (!empty( $response ) && is_string( $response ) && in_array($response [0], array('[','{'))) {
			$response = json_decode( $response, true );
		}
		if($log != ''){
			//write log			
		}
		return $response;
	}
	
	//获取远程url的header信息  用以保存生成二维码
	public static function httpHeader($url)
	{
		$ch = curl_init($url);
		curl_setopt($ch, CURLOPT_HEADER, 0);
		curl_setopt($ch, CURLOPT_NOBODY, 0);    //只取body头
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		$package = curl_exec($ch);
		$httpinfo = curl_getinfo($ch);
		curl_close($ch);
		return array_merge(array('body' => $package), array('header' => $httpinfo));
	}
	
	//上传多媒体
	public static function httpMedia($url, $requestString, $timeout = 5) {
		$ch = curl_init ( ( string ) $url );
		curl_setopt ( $ch, CURLOPT_HEADER, false );
		curl_setopt ( $ch, CURLOPT_POST, true );
		curl_setopt ( $ch, CURLOPT_POSTFIELDS, $requestString );
		curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, true );
		curl_setopt ( $ch, CURLOPT_TIMEOUT, ( int ) $timeout );
		$result = curl_exec ( $ch );
		$http_code = curl_getinfo ( $ch, CURLINFO_HTTP_CODE );
		if ($http_code !== 200) {
			$log = "get remote api error {$url}-{$requestString}-response code is {$http_code} and result %s";
			Yii::log ( sprintf ( $log, CVarDumper::dumpAsString ( $result ) ), CLogger::LEVEL_ERROR, 'getremoteapi' );
		}
		curl_close ( $ch );
		$result = CJSON::decode ( $result );
		if (isset ( $result ['errcode'] ) || empty ( $result )) {
			Yii::log ( $url . '----' . print_r ( $requestString, true ) . '--result' . print_r ( $result, true ), 'error', 'media' );
		}
		return $result;
	}
    
    /**
	 * http get请求
	 *
	 * @param string $url
	 * @param string $method
	 * @param array $postfields
	 * @return string
	 */
	public static function httpCurlGet($url) {
		$ci = curl_init ();
		curl_setopt ( $ci, CURLOPT_URL, $url );
		curl_setopt ( $ci, CURLOPT_CONNECTTIMEOUT, 30 ); // 连接超时
		curl_setopt ( $ci, CURLOPT_TIMEOUT, 30 ); // 执行超时		 
		curl_setopt ( $ci, CURLOPT_RETURNTRANSFER, true ); // 文件流的形式返回，而不是直接输出
		curl_setopt ( $ci, CURLOPT_HEADER, FALSE );
		curl_setopt($ci, CURLOPT_SSL_VERIFYPEER, false);

		$response = curl_exec( $ci ); 
		curl_close ( $ci );
		return $response;
	}
	
}