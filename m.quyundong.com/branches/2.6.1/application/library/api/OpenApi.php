<?php 

class api_OpenApi extends api_Base {
	const LOGTITLE = 'Open_api';

	protected static function apiUrl(){		
		if(getenv('PAY_HOST')){
			$url = 'http://openapi.qydw.net/';
		}else{
			$url = 'http://openapi.quyundong.com/';
		}
		return $url;
	}
	/**
	 * 通过口碑shop_id查询场馆信息 
	 */
	public static function getVenuesByKbShopId($param){
		try {
			if (!isset($param['shop_id'])) throw new Exception("param missing");
					
			$data = array();
			$param['action'] = 'get_venuesinfo_by_kbshopid';
			$param = self::addPublicParam($param);
			$url = self::apiUrl().'index?'.http_build_query($param);
			$res = self::request($url, self::LOGTITLE);
			
			return $res;
		}
		catch (Exception $e){
			throw new Exception( $e->getMessage() );
		}
	}

	/**
	 * 通过口碑shop_id查询场馆信息 
	 */
	public static function oauthToken($param){
		try {
			if (!isset($param['auth_code'])) throw new Exception("param missing");
					
			$data = array();
			$param['action'] = 'kb_oauth_token';
			$param = self::addPublicParam($param);
			$url = self::apiUrl().'index?'.http_build_query($param);
			$res = self::request($url, self::LOGTITLE);
			
			return $res;
		}
		catch (Exception $e){
			throw new Exception( $e->getMessage() );
		}
	}


	/**
	 * 通过口碑shop_id查询场馆信息 
	 */
	public static function userinfoShare($param){
		try {
			if (!isset($param['auth_token'])) throw new Exception("param missing");
					
			$data = array();
			$param['action']= 'kb_userinfo_share';
			$param 			= self::addPublicParam($param);
			$url = self::apiUrl().'index?'.http_build_query($param);
			$res = self::request($url, self::LOGTITLE);
			return $res;
		}
		catch (Exception $e){
			throw new Exception( $e->getMessage() );
		}
	}

}