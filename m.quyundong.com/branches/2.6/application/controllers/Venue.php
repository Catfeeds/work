<?php
/**
 * 第三方接口入口
 * @author Administrator
 *
 */
class VenueController extends  DefaultController
{
	
	/**
	 * 控制器初始化
	 */
	protected function init(){
		parent::init();
		if(in_array(UTM_SOURCE, Config::$source4Nothing)) $this->saveUtmSource();
	}
	
	/**
	 * 点评入口
	 */
	public function dianpingAction(){	
		Yaf_Dispatcher::getInstance()->autoRender(FALSE);
		$venuesId = intval($this->getParam('venuesId', 0));
		$date = $this->getParam('date');
		if(!$venuesId) $this->redirectMessage('缺少场馆标识'); //判断场馆标识
		if(!$date || !preg_match('/\d{4}-\d{1,1}-\d{1,2}/', $date)) $data = date('Y-m-d');	//验证日期		
		$res = api_Court::getVenueCategoryInfo(array('venues_cat_id'=>$venuesId));
		$venueCategory = is_array($res) && $res['status'] == SUCCESS_STATUS && $res['data'] ? $res['data'] : array();
		if(!$venueCategory || !isset($venueCategory['is_delete']) || !isset($venueCategory['order_type'])) $this->redirectMessage('场馆不存在');
		if($venueCategory['is_delete']==1) $this->redirectMessage('场馆已下线');
		if($venueCategory['order_type']!=0) $this->redirectMessage('当前场馆类型不支持场地预定');
		$this->redirect('/court/book?bid='.$venueCategory['venues_id'].'&t='.strtotime($date).'&cid='.$venueCategory['cat_id'].'&utm_source=dianping'); //转至订场页
		exit;
	}

	/**
	 * 微信城市服务
	 */
	public function wxcityAction(){
		$outCityId = intval($this->getParam('cityid'));
		$cityId = 0;
		if($outCityId > 0){
			//调试 待增加接口
			$cityId = baf_Common::dbModel('User','quyundong')->fetchOne('SELECT city_id FROM gs_union_city WHERE type=1 AND out_city_id=:out_city_id', array(':out_city_id'=>$outCityId));			
		}
		if($cityId > 0){
			$this->initCity($cityId);
		}else{
			//清空城市id
			$this->resetCity();
		}	
		$this->redirect('/');
		return false;//不加载视图
	}
	
	
	/**
	 * 存储来源标识
	 */
	private function saveUtmSource(){
		$this->setSession(array('utm_source'=>UTM_SOURCE));
		api_CoreHelper::setCookie('channel_source', '', 86400);
	}
}