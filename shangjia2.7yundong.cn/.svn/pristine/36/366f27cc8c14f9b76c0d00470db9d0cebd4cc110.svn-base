<?php
/**
 * 订单验证预订控制器
 *
 * @author bumtime
 * @date 2016-06-29
 */
class OrderController extends BaseController
{

	/**
	 * 订单验证
	 */
	public function orderCheckAction()
	{
		//取值
		$code = trim($this->getParam("verification_code"));//442898
		//商家ID
		$suppliers_id	= helper_LoginHelper::getCurrentSuppliersId();
		//场馆ID
		$business_id	= helper_VenuesHelper::getCurrentVenuesId();
		//项目ID
		$category_id	= helper_VenuesHelper::getVenuesCatID();
		
		if(!$code || !$suppliers_id) {
			$data = [
			    "status"	=>	baf_ErrorCode::ERR_VERIFICATION,
			    "msg"		=>	baf_ErrorCode::msg(baf_ErrorCode::ERR_VERIFICATION),	
				"data"		=>	[]
			];
			echo json_encode($data );
			exit;
		}
		
		//调用接口
    	$param = [
    			'suppliers_id'	=>	$suppliers_id,
    			'code'			=>	$code,
    			'business_id'	=>	$business_id,
    			//'category_id'	=>	$category_id
    	];
		
    	helper_CoreHelper::addAdminLog("订单验证", $param);
    	
		//$this->renderJSON(Loader::api('Business')->checkCode($param));
		$list = Loader::api('Business')->checkCode($param);
		
		if(isset($list['data']['goods_list']) && !empty($list['data']['goods_list']))
		{
			foreach ($list['data']['goods_list'] as $key=>$value)
			{
				$list['data']['goods_list'][$key]['start_time'] = date("H:i", $value['start_time']);
				$list['data']['goods_list'][$key]['end_time']   = date("H:i", $value['end_time']);
			}
		}
		
		echo json_encode($list);
	}
	
	/**
	 * 订单提醒
	 */
	public function checkNewOrderAction()
	{
		//商家ID
		$suppliers_id	= helper_LoginHelper::getCurrentSuppliersId();
		
		if(!$suppliers_id) {
			$this->errorOutput(baf_ErrorCode::ERR_PARAM);
		}
		
		//调用接口
		$param = [
				'suppliers_id'	=>	$suppliers_id,
				'request_time'	=>	time()
		];

		//写入日志
		//helper_CoreHelper::addAdminLog('新订单提醒', $param);
		
		//项目分类
		$catList = helper_VenuesHelper::getCurrentCatList();
		$orderPayNew = $orderRefundNew = [];
		$orderPayList	=	$this->apiReturnInfo(Loader::api('Orders')->getOrderPayListByTime($param));

		if(!empty($orderPayList) && is_array($orderPayList)){
			foreach ($orderPayList as $value)
			{
				if($value['goods_list']){
					foreach ($value['goods_list'] as $value_goods )
					{
						
						$orderPayNew[] = [
								"order_id"		=>	$value['order_id'],
								"order_sn"		=>	$value['order_sn'],
								"order_status"	=>	$value['order_status'],
								"order_type"	=>	$value['order_type'],
								"book_date"		=>	date('Y-m-d H:i:s', $value['book_date']),
								"cat_name"		=>	isset($catList[$value['cat_id']]) ? $catList[$value['cat_id']] : "" ,
								"course_name"	=>	$value_goods['course_name'],
								"start_time"	=>	date("m-d H:i", $value_goods['start_time']),
								"hour"			=>	$value_goods['hour']				
						];
					}
				}
				
			}
		}
		
		//写入日志
		//helper_CoreHelper::addAdminLog('退款单提醒', $param);
		$orderRefundList	=	$this->apiReturnInfo(Loader::api('Orders')->getOrderRefundListByTime($param));
		
		if(!empty($orderRefundList)  && is_array($orderRefundList)){
			foreach ($orderRefundList as $value)
			{
				if(isset($value['goods_list'])){
					foreach ($value['goods_list'] as $value_goods )
					{
						$orderRefundNew[] = [
							"order_id"		=>	$value['order_id'],
							"order_sn"		=>	$value['order_sn'],
							"book_date"		=>	date('Y-m-d H:i:s', $value['book_date']),
							"cat_name"		=>	isset($catList[$value['cat_id']]) ? $catList[$value['cat_id']] : "",
							"course_name"	=>	isset($value_goods['course_name']) ? $value_goods['course_name'] : "" ,
							"start_time"	=>	isset($value_goods['start_time']) ? date("m-d H:i", $value_goods['start_time']) : "" ,
							"hour"			=>	isset($value_goods['hour']) ? $value_goods['hour'] : "" ,
					];
					}
					
				}
			
			}
		}
		
		/*  $orderPayNew[] = [
				"order_id"		=>	123456,
				"order_sn"		=>	'test123456',
				"order_status"	=>	1,
				"order_type"	=>	1,
				"book_date"		=>	'2016-07-15',
				"cat_name"		=>	'羽毛珠',
				"course_name"	=>	'VIP场',
				"start_time"	=>	'07-15 15:00:00',
		 		"end_time"		=>	'16:00:00',
				"hour"			=>	8
		];  */
		
	
		$return = [
				"status"	=>	"0000",
				"msg"		=>	"success",
				"data"		=>	[
									'pay_list'		=>	$orderPayNew,
									'refund_list'	=>	$orderRefundNew
							]			
		];
		
		header('Content-type: application/json');
        echo json_encode($return);
        exit;
	}

	/**
	 * 订单卖品验证
	 */
	public function saleGoodsCheckAction()
	{
		$order_id = trim($this->getParam('order_id'));

		$res = Loader::api('Orders')->verifySaleGoods($order_id);

		$params = [
				'order_id' => $order_id
		];
		//写入日志
		helper_CoreHelper::addAdminLog('订单卖品验证', $params);
		die(json_encode($res));
	}
	
	/**
	 * 预留下单
	 */
	public function reserveOrdersAction()
	{
		$goods_id = $this->getParam('goods_id');
		$phone    = trim($this->getParam('phone'));
		$name	  = trim($this->getParam('name'));
		$user_id  = 0;
		
		if(empty($goods_id)){
			$data = [
					"status"	=>	baf_ErrorCode::ERR_PARAM,
					"msg"		=>	"请先选择场地信息",
					"data"		=>	[]
			];
			echo json_encode($data);
			exit;
		}
		if(empty($phone)){
			$message = "请输入手机号";
			if(!baf_Common::isMobile($phone)){
				$message = "请输入正确的手机号";
			}
			$data = [
					"status"	=>	baf_ErrorCode::ERR_PARAM,
					"msg"		=>	$message,
					"data"		=>	[]
			];
			echo json_encode($data);
			exit;
		}
		//相关标识
		$utm_medium = helper_VenuesHelper::getutmMedium();
		$utm_source = helper_VenuesHelper::getutmSource();
		
		//检测并取得用户信息
		$params = [
				'phone'			=> $phone,
				'utm_medium'	=> $utm_medium,
				'utm_source'	=> $utm_source
		];
		//写入日志
		helper_CoreHelper::addAdminLog('检测用户并返回用户信息', $params);
		$userInfo = $this->apiReturnInfo(Loader::api('Users')->checkMobileRegistered($params));

		if(!empty($userInfo) && is_array($userInfo)){
			$user_id = $userInfo['user_id'];
		}
		else{
			$data = [
					"status"	=>	baf_ErrorCode::ERR_PARAM,
					"msg"		=>	"该手机号由于账号原因，无法进行预订",
					"data"		=>	[]
			];
			echo json_encode($data);
			exit;
		}	
		
		$params = [
				'goods_ids'		=> implode(",", $goods_id),
				'goods_number'	=> 1,
				'user_id'		=> $user_id,
				'phone_encode'	=> baf_Des::encrypt($phone),
				'utm_medium'	=> $utm_medium,
				'utm_source'	=> $utm_source,
				'user_name'		=> $name
		];
		
		$res = Loader::api('Orders')->InsertOrder($params);

		//写入日志
		helper_CoreHelper::addAdminLog('预留下单', $params);
		
		if(!empty($res) && is_array($res)){
			$order_id = $res['status'];
			
			$data = [
					"status"	=>	$res['status'],
					"msg"		=>	$res['msg'],
					"data"		=>	[]
			];
			die(json_encode($data));
		}
		else{
			$data = [
					"status"	=>	baf_ErrorCode::ERR_PARAM,
					"msg"		=>	"下单失败，请联系管理员",
					"data"		=>	[]
			];
			echo json_encode($data);
			exit;
		}	
	}
	
	/**
	 * 取消订单
	 */
	public function cancelOrdersAction()
	{
		$order_id = trim($this->getParam('order_id'));
		$user_id  = trim($this->getParam('user_id'));
	
		if(empty($order_id)){
			$data = [
					"status"	=>	baf_ErrorCode::ERR_PARAM,
					"msg"		=>	"该订单数据不正确",
					"data"		=>	[]
			];
			echo json_encode($data);
			exit;
		}
		if(empty($user_id)){
			$data = [
					"status"	=>	baf_ErrorCode::ERR_PARAM,
					"msg"		=>	"该用户信息不正确",
					"data"		=>	[]
			];
			echo json_encode($data);
			exit;
		}
		
		$params = [	
				'user_id'		=> $user_id,
				'order_id'		=> $order_id
		];
		$res = Loader::api('Orders')->cancelOrder($params);
	
		//写入日志
		helper_CoreHelper::addAdminLog('取消订单', $params);
		
		die(json_encode($res));
	}
	
	
	
	/**
	 * 重发短信
	 */
	public function resendSmsOrdersAction()
	{
		$order_id = trim($this->getParam('order_id'));
	
		if(empty($order_id)){
			$data = [
					"status"	=>	baf_ErrorCode::ERR_PARAM,
					"msg"		=>	"该订单数据不正确",
					"data"		=>	[]
			];
			echo json_encode($data);
			exit;
		}
		
		$params = [
				'order_id'	=> $order_id
		];
		
		$res = Loader::api('Orders')->orderResendSms($params);
		
		//写入日志
		helper_CoreHelper::addAdminLog('重发短信', $params);
		
		die(json_encode($res));
	}
	
}
	