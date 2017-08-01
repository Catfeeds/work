<?php
class api_Order extends api_Base
{
	const LOGTITLE = 'order_api';


	/**
	 * 确认订单页面
	 *
	 * 1.读取用户是否有优惠信息，计算订单金额
	 *
	 * @author chenchao
	 */
	public static function confirmOrder($param){
		if($param['user_id'] < 1 || empty($param['goods_ids'])){
			return '0060';
		}
		$param['action']	= 'confirm_order_field';
		$param = self::addPublicParam($param, self::ORDER_API_KEY);
		$url = self::OrderApiUrl.http_build_query($param);
		return self::request($url, self::LOGTITLE);
	}


	/**
	 * 未支付订单接口
	 * @param array $param
	 * @return string
	 */
	public static function orderDueCount($param){
		//检验用户id
		if($param['user_id'] < 1 ){
			return '0060';
		}
		$param['action'] = 'order_due_count';
		$param = self::addPublicParam($param, self::ORDER_API_KEY);
		$url = self::OrderApiUrl . http_build_query($param);
		return self::request($url, self::LOGTITLE);
	}


	/**
	 * 取消订单列表接口
	 * @param array $param
	 * @return string
	 */
	public static function orderCancel($param){
		//检验用户id
		if($param['user_id'] < 1 || $param['order_id'] < 0){
			return '0060';
		}
		$param['action']	= 'cancel_order';
		$param = self::addPublicParam($param, self::ORDER_API_KEY);
		return self::request(self::OrderApiUrl.http_build_query($param),self::LOGTITLE);
	}

	/**
	 * 会员卡订场
	 * @param array $param
	 * @return string
	 */
	public static function insertOrderMember($param){
		//检验必要参数
		if($param['user_id'] < 1 || empty($param['goods_ids']) || empty($param['card_no'])){
			return '0060';
		}
		$param['action']	= 'insert_order_member';
		if(empty($param['ver'])) $param['ver']		= '1.4';
		$param['app_version'] = '1.8';//1.8订单接口有限制app1.8才能提交半点时间的场地
		$param = self::addPublicParam($param, self::ORDER_API_KEY);
		$res = self::request(self::OrderApiUrl.http_build_query($param),self::LOGTITLE);
		return $res;
	}

	/**
	 * 新建订单接口
	 * @param array $param
	 * @return string
	 */
	public static function insertOrder($param){
		//检验用户id
		if($param['user_id'] < 1 || empty($param['goods_ids'])){
			return '0060';
		}
		$param['action']	= 'insert_order_field';
		if(empty($param['ver'])) $param['ver']		= '1.3';
		//$param['app_version'] = '1.8';//1.8订单接口有限制app1.8才能提交半点时间的场地
		$param = self::addPublicParam($param, self::ORDER_API_KEY);
		$res = self::request(self::OrderApiUrl.http_build_query($param),self::LOGTITLE);
		return $res;
	}

	/**
	 * 新建拼场订单
	 * @param array $param
	 * @return string
	 */
	public static function insertCourtPoolOrder($param){
		//检验用户id
		if($param['user_id'] < 1 || empty($param['court_pool_id'])){
			return '0060';
		}
		$param['action']	= 'insert_order_court_pool';
		if(empty($param['ver'])) $param['ver']		= '1.3';
		//$param['app_version'] = '1.8';//1.8订单接口有限制app1.8才能提交半点时间的场地
		$param = self::addPublicParam($param, self::ORDER_API_KEY);
		$res = self::request(self::OrderApiUrl.http_build_query($param),self::LOGTITLE);
		return $res;
	}

	/**
	 * 人次下单
	 * @param unknown $param
	 * @return string
	 */
	public static function insertPersonOrder($param){
		//检验用户id
		if($param['user_id'] < 1 || empty($param['goods_ids'])){
			return '0060';
		}
		$param['action']	= 'insert_order_person';
		if(empty($param['ver'])) $param['ver']		= '1.3';
		$param['app_version'] = '1.8';//1.8订单接口有限制app1.8才能提交半点时间的场地
		$param = self::addPublicParam($param, self::ORDER_API_KEY);
		$res = self::request(self::OrderApiUrl.http_build_query($param),self::LOGTITLE);
		return $res;
	}

	/**
	 * 获取订单详情接口
	 * @param array $param
	 * @return string
	 */
	public static function orderDetail($param){
		//检验用户id
		if($param['user_id'] < 1 || $param['order_id'] < 0){
			return '0060';
		}
		$param['action']	= 'get_order_info';
		if(empty($param['ver'])) $param['ver']		= '1.3';
		$param = self::addPublicParam($param, self::ORDER_API_KEY);
		return self::request(self::OrderApiUrl.http_build_query($param),self::LOGTITLE);
	}

	/**
	 * 获取订单信息
	 *
	 * @param int $orderId 订单id
	 * @return array
	 * @author xiaoyanchun
	 */
	public static function getOrderInfo(array $param)
	{
	    if ($param['order_id'] < 1) {
	        return '0060';
	    }

	    $param['action']   = 'get_order_info';
	    $param = self::addPublicParam($param, self::ORDER_API_KEY);
	    return self::request(self::OrderApiUrl.http_build_query($param),self::LOGTITLE);
	}


	/**
	 * 获取订单列表接口
	 * @param unknown $param
	 * @return string|Ambigous <string, mixed>
	 */
	public static function orderList($param){
		//检验用户id
		if($param['user_id'] < 1 ){
			return '0060';
		}
		$param['action']	= 'get_order_list';
		if(empty($param['ver'])) $param['ver'] = '1.0';
		$param = self::addPublicParam($param, self::ORDER_API_KEY);
		return self::request(self::OrderApiUrl.http_build_query($param),self::LOGTITLE);
	}



	/**
	 * 拼场订单详情
	 *
	 * @param unknown $order_id
	 */
	public static function cporder_info( $order_id ){
		try {

			$param['action'] = 'get_cporder_info';
			$param['order_id'] = intval($order_id);
			$api_data = api_Court::orderApiPut($param);
			$order_data = array();
			if (!empty($api_data) && isset($api_data['status']) && $api_data['status'] == '0000' ){
				$order_data = $api_data['data'];
			}

			if (!empty($order_data)){
				//拼场：小时，图标
				$start_hour = intval(date('H', $order_data['start_time']));
				$day_icon = 'day-dpr2x.png';
				if ( $start_hour > 18 ) {$day_icon = 'night-dpr2x.png';}
				$order_data['start_hour'] = $start_hour;	//小时
				$order_data['day_icon'] = $day_icon;		//图标

				$order_data['date_time'] 	= date('Y-m-d', $order_data['start_time'] );
				$order_data['start_time'] 	= date('m月d日 H:i', $order_data['start_time'] );	//开始时间
				$order_data['end_time'] 	= date('H:i', $order_data['end_time'] );	//结束时间
				//场地名称
				$order_data['court_no'] = !empty($order_data['court_no']) ? $order_data['court_no'] : '-';

				//支付倒计时
				$pay_timeout = 0;
				if ( $order_data['order_status'] == '0' ){
					$pay_timeout = 600 - (time() - $order_data['add_time']);
					$pay_timeout = $pay_timeout > 0 ? $pay_timeout : 0;
				}
				$order_data['pay_timeout'] = $pay_timeout;

				//court_pool_status拼场状态：1:拼场中 2:开场 3:即将开始（已塞人） 4:完成 5:取消
				$order_data['cp_status_title'] = '';
				if ($order_data['court_pool_status'] == '1'){
					$order_data['cp_status_title'] = '拼场中';
				}
				elseif ($order_data['court_pool_status'] == '2'){
					$order_data['cp_status_title'] = '拼场成功';
				}
				elseif ($order_data['court_pool_status'] == '3'){
					$order_data['cp_status_title'] = '即将开始';
				}
				elseif ($order_data['court_pool_status'] == '4'){
					$order_data['cp_status_title'] = '拼场结束';
				}
				elseif ($order_data['court_pool_status'] == '5'){
					$order_data['cp_status_title'] = '拼场失败';
				}

				//
				$order_data['pay_succ'] = 0;
				$order_data['pay_title'] = '支付失败';
				if ($order_data['order_status'] == '1' || $order_data['order_status'] == '3' || $order_data['order_status'] == '6'){
					$order_data['pay_succ'] = 1;
					$order_data['pay_title'] = '支付成功';
				}

				//场馆列表
				if ( isset($order_data['user_list']) && !empty($order_data['user_list']) ){
					foreach ( $order_data['user_list'] as &$value ){
						if (empty($value['avatar'])){
							$value['avatar'] = 'http://api.7yundong.cn/uploads/avatar/avatar.png';
						}
					}
				}

			}
// 			print_r($order_data);
			return $order_data;
		}
		catch (Exception $e){
			throw new Exception( $e->getMessage() );
		}

	}


		/**
	 * 获取状态
	 * @param $param
	 * @return bool|string
	 */
	public static function batchGetStatus($param){
		if(!isset($param['order_ids'])){
			return false;
		}
		$param['action'] = 'batch_get_order_status';
		$param = self::addPublicParam($param,self::ORDER_API_KEY);
		return self::request(self::OrderOtherApiUrl.http_build_query($param),self::LOGTITLE);
	}

	/**
	 * 领取保险页面信息
	 * @param unknown $param
	 * @return string|Ambigous <string, mixed>
	 */
	public static function getInsuranceInfo($param){
	    //检验用户id
	    if($param['order_id'] < 1 ){
	        return '0060';
	    }
	    $param['action']	= 'get_insurance_info';
	    $param = self::addPublicParam($param, self::ORDER_API_KEY);

	    return self::request(self::OrderOtherApiUrl.http_build_query($param),self::LOGTITLE);
	}

	/**
	 * 领取保险页面信息
	 * @param unknown $param
	 * @return string|Ambigous <string, mixed>
	 */
	public static function insertInsuranceUserInfo($param){
	    //检验用户id
	    if($param['order_id'] < 1){
	        return '0060';
	    }
	    $param['action']	= 'insert_insurance_user_info';
	    $param = self::addPublicParam($param, self::ORDER_API_KEY);
	    return self::request(self::OrderOtherApiUrl.http_build_query($param),self::LOGTITLE);
	}

	/*
	* 获取球局详情
	* @param unknown $param
	* @return string|Ambigous <string, mixed>
	*/
	public static function getCourtJoinInfo($param){
	    //检验用户id
	    if($param['cj_order_id'] < 1){
	        return '0060';
	    }
	    $param['action']	= 'get_courtjoin_info';
	    $param = self::addPublicParam($param, self::ORDER_API_KEY);
	    return self::request(self::OrderCourtJoinApiUrl.http_build_query($param),self::LOGTITLE);
	}


	/**
	 * 球局下单
	 */
	public static function insertCourtJoinOrder($param){
		if($param['cj_order_id']<1 || $param['user_id']<1){
			return '0060';
		}
		$param['action']	= 'insert_order_court_join';
		$param['order_type'] = 9;
		$param = self::addPublicParam($param, self::ORDER_API_KEY);
		$res = self::request(self::OrderApiUrl.http_build_query($param),self::LOGTITLE);
		return $res;
	}

	/**
	 * 球局确认订单
	 */
	public static function confirmCourtJoinOrder($param){
		if($param['cj_order_id']<1 || $param['user_id']<1){
			return '0060';
		}
		$param['action']	= 'confirm_order_court_join';
		$param['order_type'] = 9;
		$param = self::addPublicParam($param, self::ORDER_API_KEY);
		$res = self::request(self::OrderApiUrl.http_build_query($param),self::LOGTITLE);
		return $res;
	}

	/**
	 * 获取球局订单详情
	 */
	public static function getCjOrderInfo($param){
		if(empty($param['order_id']) || $param['order_id']<1){
			return false;
		}
		$param['action']	= 'get_court_join_order_info';
		$param = self::addPublicParam($param, self::ORDER_API_KEY);
		$res = self::request(self::OrderCourtJoinApiUrl.http_build_query($param),self::LOGTITLE);
		return $res;
	}

	/**
	 * 获取普通球局的玩法介绍描述
	 */
	public static function getCourtJoinDesc($param){
		$param['action'] = 'get_court_join_desc';
		$param = self::addPublicParam($param, self::ORDER_API_KEY);
		$res = self::request(self::OrderCourtJoinApiUrl.http_build_query($param),self::LOGTITLE);
		return $res;
	}

	/**
	 * 获取球局留言板
	 * @author wuchunhua 2016-09-22
	 * @param  [type] $param [description]
	 * @return [type]        [description]
	 */
	public static function getCourtJoinMessage($param){
	    //检验用户id
	    if($param['cj_order_id'] < 1){
	        return '0060';
	    }
	    $param['action']	= 'get_court_join_message';
	    $param = self::addPublicParam($param, self::ORDER_API_KEY);
	    return self::request(self::OrderCourtJoinApiUrl.http_build_query($param),self::LOGTITLE);
	}

	/**
	 * 退出球局
	 * @author wuchunhua 2016-11-03
	 * @param  [type] $param [description]
	 * @return [type]        [description]
	 */
	public static function applyRefund($param)
	{
	    $param['action']	= 'apply_refund';
	    $param = self::addPublicParam($param, self::ORDER_API_KEY);
	    return self::request(self::OrderApplyRefundApiUrl.http_build_query($param),self::LOGTITLE);
	}

	/**
	 * 统计球局详情浏览次数
	 * @author wuchunhua 2016-11-08
	 */
	public static function courtJoinViewCount($param){
		if(empty($param['cj_order_id']) || $param['cj_order_id']<1){
			return false;
		}
		$param['action']	= 'court_join_view_count';
		$param = self::addPublicParam($param, self::ORDER_API_KEY);
		$res = self::request(self::OrderCourtJoinApiUrl.http_build_query($param),self::LOGTITLE);
		return $res;
	}

}
