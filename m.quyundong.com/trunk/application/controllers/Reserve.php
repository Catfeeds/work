<?php
/**
 * 预留订单入口
 * @author: bigticket
*/
class ReserveController extends DefaultController{
	
	public function init(){
		parent::init();
		//用户是否登录
		if (!$this->uid) {
			$this->setReturnUrl($this->redirectUrl());
			$this->redirectToLogin();
		}
	}
	
	//处理过期订单
	public function cancelAction($id){		
		$order_id = (int)$id;	
		if($order_id < 1 ){
			baf_FileLog::log2File('order_id:'.$order_id,'reserve_error');
			// 提示---
			$this->redirectMessage('订单不存在(001)');
		}		
		
		//获取订单详情
		$param = array(
				'order_id' => $order_id,
				'user_id' => $this->uid,
				'ver' => '1.3',
		);
		
		$order = array();
		$orderRes = api_Order::orderDetail($param);
		
		if (isset($orderRes['status']) && $orderRes['status'] == '0000') {
			$order = !empty($orderRes['data']) ? $orderRes['data'] : array();			
		} else {
			baf_FileLog::log2File(json_encode($orderRes),'reserve_order');
			$this->redirectMessage('订单不存在');
		}
		
		switch ($order['order_status']){
			case 0:
				$this->redirect('/order/pay?id='.$order_id);
				exit;
				break;
			case 1:
			case 3:
			case 4:
				$this->redirect('/reserve/payok/id/'.$order_id);
				exit;
				break;
		}				
		$this->_view->assign(array('order' => $order));
	}
	
	/**
	 * 支付成功
	 */
	public function payokAction($id){
		$order_id = (int)$id;		
		if($order_id < 1 ){
			baf_FileLog::log2File('order_id:'.$order_id,'reserve_error');
			// 提示---
			$this->redirectMessage('订单不存在(001)');
		}
	
		$param = array();
		$param['order_id'] = $order_id;
		$param['user_id'] = $this->uid;
		$param['ver'] = '1.3';
	
		//读取订单详情
		$order = array();
		$orderRes = api_Order::orderDetail($param);
		if(isset($orderRes['status']) && $orderRes['status']=='0000'){
			$order = !empty($orderRes['data']) ? $orderRes['data'] : array();
			if (!isset($order['order_no'])) {
				$this->redirectMessage('订单记录不存在');
			}			
		}else{
			//失败提示
			$this->redirectMessage('网络繁忙，请稍后重试');
		}	
		
		switch ($order['order_status']){
			case 0:
				$this->redirect('/order/pay?id='.$order_id);
				exit;
				break;
			case 2:
				$this->redirect('/reserve/cancel/id/'.$order_id);
				exit;
				break;
		}
		$this->setPageTitle(array('title'=>'订单成功-趣运动'));
		$this->_view->assign(array('order' => $order));
	}	
}