<?php
class CouponController extends UserBaseController
{
	/**
	 * 卡券列表
	 */
	public function indexAction()
	{
		$userId = $this->uid;
		$orderId = intval($this->getParam('order_id', 0));
		$status = intval($this->getParam('status', 0));
		$couponList = array();
		$param = array('user_id'=>$userId, 'entry'=>0);
		$param['utm_source'] = $this->getUtmSource();
		if($orderId > 0) $param['order_id'] = $orderId;
	
		try{
			$couponData = api_Coupon::getCouponListNew($param);
			$couponList = (is_array($couponData) && $couponData['status'] == SUCCESS_STATUS && isset($couponData['data']['ticket_list'])) ? $couponData['data']['ticket_list'] : array();
		}catch(Exception $e){
			baf_FileLog::log2File($e->__toString(), 'coupon_api_error');
		}

		//调用获取页面标题、关键字和介绍
        $utm_sources = CHANNEL_SOURCE ? CHANNEL_SOURCE : 'wap';
		$this->setPageTitle(array('utm_source'=>$utm_sources));

		$this->_view->assign(array('couponList'=>$couponList, 'entry'=>0, 'nums'=>0));
	}
	
	/**
	 * 过期卡券
	 */
	public function expireAction(){
		$page = max(1, intval($this->getParam('page', 0)));
		$param = array('user_id'=>$this->uid, 'page'=>$page);
		$couponList = array();
		try{
			$couponData = api_Coupon::expireCouponList($param);
			$couponList = (is_array($couponData) && $couponData['status'] == SUCCESS_STATUS && isset($couponData['data'])) ? $couponData['data'] : array();
		}catch (Exception $e){
			baf_FileLog::log2File($e->__toString(), 'coupon_api_error');
		}

		//调用获取页面标题、关键字和介绍
        $utm_sources = CHANNEL_SOURCE ? CHANNEL_SOURCE : 'wap';
		$this->setPageTitle(array('utm_source'=>$utm_sources));

		$this->_view->assign(array('couponList'=>$couponList));
	}
	
	/**
	 * 选择卡券
	 */
	public function selectCouponAction(){
		//调用获取页面标题、关键字和介绍
        $utm_sources = CHANNEL_SOURCE ? CHANNEL_SOURCE : 'wap';
		$this->setPageTitle(array('utm_source'=>$utm_sources));
		
		if($this->getRequest()->isPost()){
			$goodsIds = $this->getParam('goods_ids');
			$orderType = $this->getParam('order_type');
			$amount = intval($this->getParam('amount'));
			$nums = intval($this->getParam('goods_nums')); //人次商品选择时的商品数 用户优化选券流程
			$param = array(
					'user_id' => $this->uid,
					'entry' => 1,
					'goods_ids' => $goodsIds,
					'order_type' => $orderType
			);
			$couponList = array();
			try {
				$param['utm_source'] = $this->getUtmSource();
				$couponData = api_Coupon::getCouponListNew($param);
				$couponList = (isset($couponData['status']) && $couponData['status'] == SUCCESS_STATUS && isset($couponData['data']['ticket_list'])) ? $couponData['data']['ticket_list'] : array();
				if($amount<=0){
					$couponList = array();
				}else{
					$array  = array();
					$now = CURRENT_TIMESTAMP;
					foreach ($couponList as $v){
						if($v['is_enable']==0) continue;//跳过不可用的券						
						if($amount<$v['min_amount'] || $amount<$v['amount'] || !$v['amount']) continue;//支付使用时跳过不符合条件的代金券
						if($v['use_start_date'] && $v['use_start_date']>$now) continue;//跳过未到开始使用时间的券
						if($v['use_end_date'] && $v['use_end_date']<=$now) continue;//跳过已过期的券
						if($v['ticket_type']!=1 && $v['ticket_type']!=2) continue;//保留代金券和运动卷的显示
						$array[] = $v;
					}
					$couponList = $array;
				}
			} catch (Exception $e) {
				baf_FileLog::log2File($e->__toString(), 'coupon_api_error');
			}
			$this->_view->assign(array('couponList'=>$couponList, 'entry'=>1, 'nums'=>$nums));
			Yaf_Dispatcher::getInstance()->autoRender(FALSE);
			$this->getView()->display('coupon/index.php');
		}
	}
	
	/**
	 * 绑定卡劵
	 */
	public function activateAction(){
		$entry = $this->getParam('entry', 0);
		$nums = intval($this->getParam('nums', 0));
		if(isset($_POST['coupon_sn'])){
			$conponSn = trim($_POST['coupon_sn']);
			try {
				$data = api_Coupon::activateCoupon(array('coupon_sn'=>$conponSn, 'user_id'=>$this->uid,'utm_source'=>$this->getUtmSource(),'client_time'=>time()));
			} catch (Exception $e) {
				baf_FileLog::log2File($e->__toString(), 'coupon_api_error');
				$data = array(
						'status' => '',
						'msg' => '通信失败'
				);
			}
			if(is_array($data) && $data['status'] == SUCCESS_STATUS){
				$this->readJson(baf_ResCode::msg('', $data['msg']));
			}else{
				baf_FileLog::log2File('user_id:'.$this->uid.' coupon_sn:'.$conponSn, 'activate_coupon_error');
				$this->readJson(baf_ResCode::msg(baf_ResCode::OTHER_ERR, $data['msg']));
			}
			exit;
		}

		//调用获取页面标题、关键字和介绍
        $utm_sources = CHANNEL_SOURCE ? CHANNEL_SOURCE : 'wap';
		$this->setPageTitle(array('utm_source'=>$utm_sources));

		$returnUrl = $this->getReturnUrl();		
		$returnUrl = $entry ? $returnUrl.'&click=1' : '';
		if($nums) $returnUrl .= '&nums='.$nums;
		$this->_view->assign(array('returnUrl'=>$returnUrl));
	}

	/**
	 * 卡劵使用说明
	 * @param string $value [description]
	 */
	public function couponRuleAction()
	{
		//代金券使用规则
        $utm_sources = CHANNEL_SOURCE ? CHANNEL_SOURCE : 'wap';
        $this->setPageTitle(array('utm_source'=>$utm_sources));
        $this->_view->assign(array('title'=>''));
	}


}