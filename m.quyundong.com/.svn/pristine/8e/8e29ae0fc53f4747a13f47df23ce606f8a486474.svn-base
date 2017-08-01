<?php
/**
 * 场馆api
 */
class api_Venues extends api_Base
{
	const LOGTITLE = 'api_venues';

	/**
	 * 获取场馆微信群二维码
	 * @param  [type]
	 * @return [type]
	 */
	public static function getVenuesQrcode($venuesId){
		$venuesId = intval($venuesId);
		$data = array();
		$param = array(
				'venues_id'=>$venuesId,
				'action' => 'weixin_group_qrcode'
			);
		try {
			$param = self::addPublicParam($param);
			$url = self::VenueApiUrl.http_build_query($param);
			$res = self::request($url, self::LOGTITLE);
			if(isset($res['status']) && $res['status']=='0000'){
				$data = isset($res['data']) ? $res['data'] : array();
			}else{
				baf_FileLog::requestLog(array('param'=>$param, 'res'=>$res,'apiurl'=>$url));
			}
		} catch (Exception $e) {
			$logData = array('error'=>baf_Common::formatExceptionData($e),'venues_id'=>$venuesId);
			baf_FileLog::requestLog($logData);
		}
		return $data;
	}

	/**
	 * 查询装备详情
	 * @param  [type] $goodsId [description]
	 * @return [type]          [description]
	 */
	public static function getEquipmentDetail($goodsId){
		$goodsId = intval($goodsId);
		try {
			$param = self::addPublicParam(array('goods_id'=>$goodsId));
			$url = Config::get('api.venue').'/equipment/goods/getDetail?'.http_build_query($param);
			$res = self::request($url, self::LOGTITLE);
		} catch (Exception $e) {
			$logData = array('error'=>baf_Common::formatExceptionData($e),'goods_id'=>$venuesId);
			baf_FileLog::requestLog($logData);
		}
		return $res;
	}
	
	/**
	 * 获取口碑场馆预订日历
	 * @param  [type] $venuesId [description]
	 * @return [type]           [description]
	 */
	public static function getKouBeiVenueBookDate($venuesId){
		$data = array();
		$param = array('venues_id'=>$venuesId);
		try {
			$param = self::addPublicParam($param);
			$url = Config::get('api.venue').'open/koubei/getBookDate?'.http_build_query($param);

			$res = self::request($url, self::LOGTITLE);
			if(isset($res['status']) && $res['status']=='0000'){
				$data = isset($res['data']) ? $res['data'] : array();
			}else{
				baf_FileLog::requestLog(array('param'=>$param, 'res'=>$res,'apiurl'=>$url));
			}
		} catch (Exception $e) {
			$logData = array('action'=>'getKouBeiVenueBookDate','error'=>baf_Common::formatExceptionData($e),'venues_id'=>$venuesId);
			baf_FileLog::requestLog($logData);
		}
		return $data;
	}
}