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
	        'id' => $id
	    ));
	}

	public function getGoodsDataAction(){
		$id = intval($this->getParam('id'));
		if($id<1){
			$this->errorOutput('1001','缺少参数');
		}
		$res = api_Venues::getEquipmentDetail($id);
		if(!empty($res['status']) || $res['status']=='0000'){
			$this->renderJson($res);
		}else{
			$msg = isset($res['msg']) ? $res['msg'] : '系统错误';
			$status = isset($res['status']) ? $res['status'] : '1001';
			$this->errorOutput($status, $msg);
		}
	}
}