<?php
/**
 * 装备商品
 */
class EquimentController extends DefaultController{
	public function indexAction(){
		$id = intval($this->getParam('id'));
		if($id<1){
			throw new Exception("商品不存在", 4001);
		}
		$res = api_Venues::getEquipmentDetail($id);
		$data = array();
		if(!empty($res['status']) || $res['status']=='0000'){
			$data = !empty($res['data']) ? $res['data'] : array();
		}

		$this->_view->assign(array(
	        'data' => $data
	    ));
	}
}