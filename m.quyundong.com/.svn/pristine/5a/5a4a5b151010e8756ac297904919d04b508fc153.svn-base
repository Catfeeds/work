<?php
class MyorderController extends UserBaseController
{
	protected $orderStatus = array(
			0 => "未支付",
			1 => "待开始",
			2 => "已取消",
			3 => "已消费",
			4 => "已过期",
			5 => "退款",
			6 => "会员预订",
			7 => "已换场",
			8 => "待确认",
			9 => "已改签",
			11 => "已发货",
			12 => "已完成"
	);

	/**
	 * 商品订单状态
	 * @var array
	 */
	protected $goodsOrderStatus = array(
			0 => '待支付',
			1 => '待发货',
			2 => '已取消',
			5 => '已退款',
			11 => '已发货',
			12 => '已完成'
		);
	
	protected $refound = array(
			0 => '未退款',
			1 => '退款中',
			2 => '已退款'
	);
	
	/**
	 * 订单列表
	 *
	 * @author chenchao
	 */
	public function indexAction(){
		$type = isset($_REQUEST['type']) && in_array(intval($_REQUEST['type']), array(0, 1, 2)) ? intval($_REQUEST['type']) : 1;
		$param = array(
				'user_id'=>$this->uid,
				'type' => $type
		);
		$res = api_Order::orderList($param);
		$orderList = array();
		if(isset($res['status']) && $res['status']=='0000'){
			$orderList = $res['data'];
		}

		//调用获取页面标题、关键字和介绍
        $utm_sources = CHANNEL_SOURCE ? CHANNEL_SOURCE : 'wap';
		$this->setPageTitle(array('utm_source'=>$utm_sources));		
		
		$this->_view->assign(array(
				'orderList'=>$orderList,
				'type' => $type,
				'orderStatus' => $this->orderStatus,
				'refound' => $this->refound,
				'goodsOrderStatus' => $this->goodsOrderStatus
		));
	}
	
	/**
	 * 订单详情页
	 *
	 * @author chenchao
	 */
	public function detailAction(){
		$id = $this->getParam('id');
		$param = array('user_id'=>$this->uid,'order_id'=>$id);
		$orderDetail = array();
		$orderRes = api_Order::orderDetail($param);
		if(isset($orderRes['status']) && $orderRes['status']=='0000'){
			$orderDetail = !empty($orderRes['data']) ? $orderRes['data'] : array();
		}

		//调用获取页面标题、关键字和介绍
        $utm_sources = CHANNEL_SOURCE ? CHANNEL_SOURCE : 'wap';
		$this->setPageTitle(array('utm_source'=>$utm_sources));
		
		$this->_view->assign(array('detail'=>$orderDetail));
		if(empty($orderDetail)){
			$this->redirectMessage('未找到订单');
			exit;
		} 

		//订单id与登陆者id不一致的，不允许查看订单详情 add by wuchunhua 2016-11-03
		if ($orderDetail['user_id'] != $this->uid) {
			$this->redirectMessage('未找到订单');
			exit;
		}
		if($orderDetail['order_type']==14){
			$this->goodsOrderDetail($orderDetail);
		}elseif($orderDetail['order_type']==8){
			//拼场订单
			return $this->cporder_detail( $id );
			
		}elseif($orderDetail['order_type']==9){
			$joinorderRes  = api_Order::getCjOrderInfo(array('order_id'=>$id));
			if(!empty($joinorderRes) && $joinorderRes['status']=='0000'){
				$joinOrderDetail = !empty($joinorderRes['data']) ? $joinorderRes['data'] : array();
				if (!empty($joinOrderDetail)) {
					//订单时间
					$joinOrderDetail['book_date_tile'] = !empty($joinOrderDetail['court_join_info']['book_date']) ? date('Y年m月d日', $joinOrderDetail['court_join_info']['book_date']) : '';
					$joinOrderDetail['book_date_tile'] .= !empty($joinOrderDetail['court_join_info']['book_date']) ? "(".api_CoreHelper::getWeek( date('w', $joinOrderDetail['court_join_info']['book_date']) ).")" : '';
					//拼场订单状态
					$joinOrderDetail['order_status_title'] = !empty($joinOrderDetail['order_info']['order_status_msg']) ? $joinOrderDetail['order_info']['order_status_msg'] : '';
					/*if ( $joinOrderDetail['order_info']['order_status'] == 5 && !empty($joinOrderDetail['order_info']['refund_status_msg']) ) {
						$joinOrderDetail['order_status_title'] = $joinOrderDetail['order_info']['refund_status_msg'];
					}*/
					//登陆用户的id
					$joinOrderDetail['user_id'] = $this->uid;
				}
				$this->_view->assign(array('joinOrderDetail'=>$joinOrderDetail));
				Yaf_Dispatcher::getInstance()->autoRender(FALSE);
				$this->getView()->display('myorder/order_detail_court_join.php');
			}else{
				baf_Common::log('order_detail_err','ERR','error', array('param'=>$param, 'res'=>$orderRes, 'url'=>$this->redirectUrl()));
				$this->redirectMessage(!empty($orderRes['msg']) ? $orderRes['msg'] : '系统忙,请稍后再试');
			}
			return false;
		}
		else {
			//自动加载默认模版：myorder/detail.php

			//场馆微信二维码
			$wxGroupQrCode = !empty($orderDetail['venues_id']) ? api_Venues::getVenuesQrcode($orderDetail['venues_id']) : array();
			$this->_view->assign(array('wxGroupQrCode'=>$wxGroupQrCode));
		}
	}

	/**
	 * 订单列表
	 *
	 * @author dengxiaowu
	 */
	public function orderListAction()
	{
		$page = (int)$this->getParam('page', 1);
		$count = (int)$this->getParam('count', 20);
		$type = isset($_REQUEST['type']) && in_array(intval($_REQUEST['type']), array(0, 1, 2)) ? intval($_REQUEST['type']) : 1;
		$param = array(
			'user_id' => $this->uid,
			'type' => $type,
			'page' => $page,
			'count' => $count
		);
		$res = api_Order::orderList($param);
		if (isset($res['status']) && $res['status'] == '0000') {
			$this->readJson($res);
		}

	}
	
	/**
	 * 装备商品详情
	 * @param  [type] $data [description]
	 * @return [type]       [description]
	 */
	public function goodsOrderDetail($data){
		$this->_view->assign(array('data'=>$data));
		Yaf_Dispatcher::getInstance()->autoRender(FALSE);
		$this->getView()->display('myorder/goods_order_detail.php');
	}

	/**
	 * 拼场订单详情
	 *
	 * @param unknown $order_id
	 */
	public function cporder_detail( $order_id ){
		try {
			$order_data = api_Order::cporder_info($order_id);
			if (empty($order_data)){ $this->redirectMessage('订单记录不存在'); }
			$this->_view->assign( array( 'order_data' => $order_data, ));
				
			Yaf_Dispatcher::getInstance()->autoRender(FALSE);
			$this->getView()->display('myorder/order_detail_cp.php');
		}
		catch (Exception $e){
			$this->redirectMessage( $e->getMessage() );
		}
	
	}
	
	/**
	 * 拼场订单状态
	 *
	 * @return multitype:string
	 */
	public function cporder_status(){
		return array(
				0 => '未开始',
				1 => '拼场中',
				2 => '开场但未满',
				3 => '满员',
				4 => '完成',
				5 => '取消',
		);
	}

	/**
	 * 退出球局
	 * add by wuchunhua 2016-11-03
	 * @param string $value [description]
	 */
	public function outCourtJoinAction()
	{
		$param = array();
		$param['user_id'] 		= (int) $this->getParam('user_id', 0);
		$param['order_id'] 		= (int) $this->getParam('order_id', 0);
		$param['refund_way'] 	= (int) $this->getParam('refund_way', 2);
		$param['refund_cause'] 	= (int) $this->getParam('refund_cause', 0);
		$param['description'] 	= $this->getParam('description', '');
		
		$data = array();
		//校验用户id和球局订单id
		if ($param['user_id'] < 1 || $param['order_id'] < 1) {
			$this->readJson(array('code'=>3036,'msg'=>'缺少球局参数！'));
		}

		//请求退出球局的接口
		$refundRes = api_Order::applyRefund($param);
		if(isset($refundRes['status']) && $refundRes['status']=='0000'){
			$data['code'] = '0000';
 			$data['msg'] = 'success';
 			$data['data'] = $refundRes['data'];
		}else{
 			//失败记录Log
	    	baf_Common::log('outCourtJoin','ERR','outCourtJoin error', array('param'=>$param, 'res'=>$refundRes, 'url'=>$this->redirectUrl()));
	    	$this->readJson(array('code'=>3036,'msg'=>$refundRes['msg']));
 		}

		$this->readJson($data);
	}


}