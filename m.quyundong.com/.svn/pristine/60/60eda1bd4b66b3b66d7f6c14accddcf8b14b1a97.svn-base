<?php
class OrderController extends DefaultController
{
	/**
	 * 订单支付的有效期(单位： 秒)
	 *
	 * @var int
	 * @author xiaosibo
	 */
	protected $orderPayExpire = 600;

	/**
	 * help页面
	 */
	public function helpAction(){
		//调用获取页面标题、关键字和介绍
        $utm_sources = CHANNEL_SOURCE ? CHANNEL_SOURCE : 'wap';
		$this->setPageTitle(array('utm_source'=>$utm_sources));
	}
	/**
	 * 确认订单页面
	 *
	 * 1.选择场次信息，由选场次页面POST过来
	 * 2.获取优惠金额，何时读取优惠金额，待处理！
	 *
	 * @author chenchao
	 */
	public function confirmAction(){
		$this->setReturnUrl($this->redirectUrl());//设置当前地址为referer
		
		if($this->uid<1){
			$this->redirectToLogin();
		}
		//读取场次信息
		$goods_ids = $this->getParam('goods_ids', '');
		$book_date = intval($this->getParam('book_date', 0));
		$court_name = $this->getParam('court_name', '');
		$category_name = $this->getParam('category_name', '');
		$ccourse_name = $this->getParam('course_name',array());
		$allCourse_name = $this->getParam('allcourse_name','');
		$hour 		= $this->getParam('hour');
		$realTime 	= $this->getParam('real_time',array());
		$price 		= $this->getParam('price',array());
		$businessId = (int) $this->getParam('bid'); // 场馆id
		$categoryId = (int) $this->getParam('cid'); // 分类id
		$orderType 	= intval($this->getParam('order_type', 0)); //订单类型
		$usecard 	= $this->getParam('card'); //标识从会员卡进入
		$relay		= intval($this->getParam('relay'), 0);
		//参数判断，add by wuchunhua 2016-09-20
		if (empty($goods_ids) || $book_date<1 || empty($court_name) || empty($category_name) || $businessId<1 || $categoryId<1) {
			$this->redirectMessage('参数错误！');
		}

		$cno = $this->getCourtMemberNumber($businessId, $categoryId); // 获取当前场馆的会员卡号
		$goods_amount = 0;
		$course = $courseTmp = array();
		if(is_array($hour)&&!empty($hour)&&is_array($ccourse_name)&&!empty($ccourse_name)&&is_array($realTime)&&!empty($realTime)&&is_array($price)&&!empty($price)){
		//对时间排序
		asort($hour);
		//组合场次的信息
		foreach ($hour AS $key => $v) {
			if(!isset($realTime[$key]) || !isset($ccourse_name[$key]) || !isset($price[$key])){
				continue;
			}
			$arr = array();
			$arr['course_name'] = $ccourse_name[$key];
			$arr['hour'] = $v;
			$arr['price'] = $price[$key];
			$arr['real_time'] = $realTime[$key];
			$courseTmp[$ccourse_name[$key]][] = $arr;
			$goods_amount += floatval($arr['price']);
		}
		}
		if(is_array($ccourse_name)&&!empty($ccourse_name)){
			//对场次排序
			$ccourse_name=array_unique($ccourse_name);
			if($allCourse_name){
				$allCourse_name=explode(',',$allCourse_name);
				foreach ($allCourse_name as $v){
					if(in_array($v,$ccourse_name)){
						$course[$v]=$courseTmp[$v];
					}
				}
			}
		}
		
		
		//是否已登录
		$user_id = $this->uid;
		$data = array();
		$user = array();
		if ($user_id > 0){
			$user['user_id'] = $user_id;
			$user['phone']   = api_CoreHelper::getCookie('phone');
			//读取优惠价格, 使用新版本
			$param = array('user_id' => $this->uid, 'goods_ids' => $goods_ids, 'order_type'=> 0);
			if(UTM_SOURCE){
				$param['utm_medium'] = UTM_SOURCE; //来源
			}
			$param['utm_source'] = $this->getUtmSource() ;//来源渠道
			$res = api_Order::confirmOrder($param);
			if (is_array($res) && isset($res['status']) && $res['status'] == SUCCESS_STATUS) {
				//正确
				$data = $res['data'];
			}else{
				baf_Common::log('confirmOrder_error','INFO','confirm',array('url'=>$this->redirectUrl(),'param'=>$param,'res'=>$res));
				$this->redirectMessage('服务器忙，请稍后重试');
			}
		}
		
		// 场馆会员卡信息
		$cardInfo = array();
		
		if ($cno) {
			$cardParam = array(
			    'card_no' => $cno,
                'venues_id' => $businessId,
                'user_id' => $this->uid,
                'phone' => api_CoreHelper::getCookie('phone')				    
			);
			// 读取会员卡详情
			$cardRes = api_UserCard::getCardDetail($cardParam);
			if (is_array($cardRes) && isset($cardRes['status']) && $cardRes['status'] == SUCCESS_STATUS) {
				$cardInfo = $cardRes['data'];
			}
		}
		// 活动列表
		$activityList = isset($data['activity_list']) && !empty($data['activity_list']) ? $data['activity_list'] : array();
		
		// 默认活动
		$defaultActivity = array();
		
		
		foreach ($activityList as $k=>$value) {
			if($value['status']==0){
				unset($activityList[$k]);
				continue;//过滤不可用的活动
			} 
			if ($value['act_id'] == $data['act_id']) {
				$defaultActivity = $value;
				break;
			}
		}
		
		//用户会员卡列表
		$userCardList = isset($data['user_card_list']) ? $data['user_card_list'] : array();
		
		//外部来源不支持会员卡支付
		if(in_array(UTM_SOURCE, Config::$source4Nothing) || CHANNEL_SOURCE=='qqwallet'){
			$cardInfo = array();
			$userCardList = array();
		}
		
		//获取用户支付方式
		$des = new baf_Des();		
		$payType = api_CoreHelper::getCookie('pay_id');
		if($payType) $payType = $des->decrypt($payType);

		//获取未支付订单数
		if ($this->uid) {
			$param = array('user_id' => $this->uid, 'ver' => '2.0');
			$due = api_Order::orderDueCount($param);
			if (isset($due['status']) && $due['status'] == SUCCESS_STATUS) {
				$due_data = $due['data'];
			}
		}

		if(!empty($data['invoice_package_gap_price'])){
			$data['cash_price'] = $data['invoice_package_gap_price'] + $goods_amount;
		}
		$assignData = array(
				'promote' => $data,
				'goods_ids' => $goods_ids,
				'course' => $course,
				'book_date' => $book_date,
				'court_name' => $court_name,
				'user' => $user,
				'goods_amount'=>$goods_amount,
				'category_name' => $category_name,
				'businessId' => $businessId,
				'categoryId' => $categoryId,
				'cardInfo' => $cardInfo,
				'orderType' => $orderType,
				'activityList' => $activityList,
				'defaultActivity' => $defaultActivity,
				'userCardList' => $userCardList,
				'relay'			=> $relay,
				'payType' 	=> $payType,
				'due_data' 	=> isset($due_data) ? $due_data : '',
		);
		if($usecard){
			$assignData['card'] = 1; //标记从会员卡进入
		}

		//调用获取页面标题、关键字和介绍
        $utm_sources = CHANNEL_SOURCE ? CHANNEL_SOURCE : 'wap';
		$this->setPageTitle(array('utm_source'=>$utm_sources));
		$this->_view->assign($assignData);
	}
	
	
	/**
	 * 人次商品订单确认页面
	 *
	 * @return void
	 * @author xiaosibo
	 */
	public function confirmPersonAction(){
		$goodsId    = intval($this->getParam('id')); // 商品id
		$goodsName  = $this->getParam('name'); // 商品名称
		$goodsPrice = $this->getParam('price'); // 商品价格
		$goodsNum   = $this->getParam('num'); // 商品数量
		$courtName  = $this->getParam('court_name'); // 场馆名称
		$t          = $this->getParam('t'); // 时间戳 用于验证
		$h          = $this->getParam('h'); // 验证安全性的加密串
		$nums		= $this->getParam('nums');//默认商品数
		
		// 验证数据是否一致(即来源是否正确)
		$hac = md5($t.$goodsId.$goodsName.$goodsPrice.$goodsNum.$courtName.ENCODE_KEY);
		
		if ($hac != $h) {
			// 数据验证失败
			$this->redirectMessage('数据验证失败');
		}

		// 是否已登录---屏蔽处理未支付订单
		$userId = $this->uid;

		if ($userId < 1) {
			// 登陆后的回调地址
			$this->setReturnUrl($this->redirectUrl());
			// 没有登陆跳转到登陆页面
			$this->redirectToLogin();
		}
		$this->setReturnUrl($this->redirectUrl());//设置当前地址为referer
		/*
		// 读取未支付订单
		$paramd = array(
				'user_id' => $userId,
				'ver' => '1.1'
		);
		$due = api_Order::orderDueCount($paramd);

		if (isset($due['status'])
				&& ($due['status'] == SUCCESS_STATUS)
				&& isset($due['data']['count'])
				&& ($due['data']['count'] > 0)
				&& isset($due['data']['order']['order_id'])
				&& ($due['data']['order']['order_id'] > 0)
		) {
			//取消订单
			$paramc = array(
					'order_id' => $due['data']['order']['order_id'],
					'user_id'  => $userId,
			);
			api_Order::orderCancel($paramc);
		}*/
		// 获取人次商品信息
		$response = api_Court::getPersonInfo(array('goods_id' => $goodsId));
		$venuesId = !empty($response['data']['venues_id']) ? $response['data']['venues_id'] : 0; 
		$_SESSION['current_venuesid'] = $venuesId;//存储最新操作的场馆venues_id
		
		//调用获取页面标题、关键字和介绍
        $utm_sources = CHANNEL_SOURCE ? CHANNEL_SOURCE : 'wap';
		$this->setPageTitle(array('utm_source'=>$utm_sources));
		
		$this->_view->assign(array(
				'goodsId' => $goodsId,
				'goodsName' => $goodsName,
				'goodsPrice' => $goodsPrice,
				'goodsNum' => $goodsNum,
				'courtName' => $courtName,
				'nums' => $nums,
				'mobile' => api_CoreHelper::getCookie('phone'),
				'limitNum' => isset($response['data']['limit_number']) ? $response['data']['limit_number'] : 0
		));
	}
	
	
	
	/**
	 * 确认订单
	 *
	 * @return string json字符串
	 * @author xiaosibo
	 */
	public function confirmOrderAction(){
		$goodsIds  = intval($this->getParam('goods_ids')); // 商品id
		$orderType = $this->getParam('type'); // 订单类型
		$number    = $this->getParam('number'); // 商品数量
		$userId    = $this->uid;
		
		$param = array('user_id' => $userId, 'goods_ids' => $goodsIds,  'order_type' => $orderType, 'goods_number' => $number);
		$param['utm_source'] = $this->getUtmSource() ;//来源渠道
		$res = api_Order::confirmOrder($param);
		
		if (is_array($res) && isset($res['status']) && $res['status'] == SUCCESS_STATUS) {
			$this->readJson(baf_ResCode::msg(1, $res['data']));
		}
		
		$this->readJson(baf_ResCode::msg(baf_ResCode::SYSTEM_ERROR));
	}
	
	
	/**
	 * 订单提交
	 *
	 * 1.由JS ajax请求
	 * 2.调用接口，InsertOder
	 * 3.是否微信用户，From区别，4微信用户、5手机网页用户
	 *
	 * @param goods_ids 场次GoodsID
	 * @param act_id 活动ID，无活动时传0
	 *
	 * @author chenchao
	 */
	public function doconfirmAction(){
		$orderType = (int) $this->getParam('order_type', 0); // 订单类型
		
		switch ($orderType) {
			case 0: // 场次商品
				$this->doconfirmGeneral();
				break;
			case 1 : // 人次商品
			case 2 : // 特惠商品
				$this->doconfirmPerson($orderType);
                break;
			case 8:	//拼场订单
				$this->doConfirmCourtPool();	
				break;
			case 10: // 中继订单
				$this->doconfirmGeneral();
				break;
		}
	}

	/**
	 * 订单支付页--支付前判断
	 *
	 */
	public function beforepayAction()
	{
		//用户是否登录
		if (!$this->uid) {
			$this->setReturnUrl($this->redirectUrl());
			$this->redirectToLogin();
		}

		$order_id = $this->getParam('id');

		if (!$order_id || !is_numeric($order_id)) {
			//$this->redirectMessage('缺少请求参数');
			$this->readJson(baf_ResCode::msg(baf_ResCode::OTHER_ERR, '缺少请求参数'));
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
			$order['status'] = $orderRes['status'];
		} else {
			//失败提示
			//$this->redirectMessage('订单不存在');
			$this->readJson(baf_ResCode::msg(baf_ResCode::OTHER_ERR, '订单不存在'));
		}


		// 只有未支付的订单才能进行支付
		if ($order['order_status'] != 0) {
			$msg = '此订单已处理， 不能再进行支付';
			switch ($order['order_status']) {
				case 1:
					$msg = '订单已支付， 不能再进行支付';
					break;
				case 2:
					$msg = '订单已取消， 不能再进行支付';
					break;
				case 3:
					$msg = '订单已消费， 不能再进行支付';
					break;
				case 4:
					$msg = '订单已过期， 自动取消';
					break;
			}
			//$this->redirectMessage($msg);
			$this->readJson(baf_ResCode::msg(baf_ResCode::OTHER_ERR, $msg));

		}

		if (($order['add_time'] + $this->orderPayExpire) < CURRENT_TIMESTAMP) {
			//$this->redirectMessage('订单已经过期， 不能再进行支付');
			$this->readJson(baf_ResCode::msg(baf_ResCode::OTHER_ERR, '订单已经过期， 自动取消'));
		}

		$this->readJson(baf_ResCode::msg());

	}
	/**
	 * 订单支付页
	 *
	 * 1.由JS ajax请求提交订单后，JS跳转此页面，然后读取订单详情
	 * 2.是否插入订单信息后，把相关信息传过面，不再次读取接口，待处理
	 *
	 * @param id 订单ID
	 * @param coupon_id 代金券ID
	 * @param coupon_aumont 代金券金额
	 *
	 * @author chenchao
	 */
	public function payAction(){
		//用户是否登录
		if ($this->uid < 1) {
			$this->setReturnUrl($this->redirectUrl());
			$this->redirectToLogin();
		}

		$order_id = $this->getParam('id');
		
		if (!$order_id || !is_numeric($order_id)) {
			$this->redirectMessage('缺少请求参数');
		}
		
		//获取订单详情
		$param = array(
				'order_id' => $order_id,
				'user_id' => $this->uid,
				'ver' => '1.3',
		);
		
		$utm_medium = '';
		$order = array();
		$orderRes = api_Order::orderDetail($param);

		if(isset($orderRes['status']) && $orderRes['status']=='0000'){
			//不可支付他人订单
			if(isset($orderRes['data']['user_id']) && $orderRes['data']['user_id'] != $this->uid){				
				//针对预留订单，特殊处理
				if(api_CoreHelper::getCookie('for_reserve') == 1){
					//检查是否有未支付的订单
					$dueParam = array('user_id' => $this->uid, 'ver' => '2.0');
					$dueRes = api_Order::orderDueCount($dueParam);
					
					if (isset($dueRes['data']['count']) && $dueRes['data']['count'] > 0) {
						$order_due_id = isset($dueRes['data']['order']['order_id'])?$dueRes['data']['order']['order_id']:0;
						if($order_due_id > 0){
							$this->redirect('/order/pay/?id='.$order_due_id);
							exit;
						}		
						else{
							$this->redirectMessage('你没有待支付的订单');
						}
					}
					else{
						$this->redirectMessage('你没有待支付的订单');
					}
				}
				else{
					$this->redirectMessage('你没有待支付的订单');
				}
			}
			//begin---预留订单---reserve
			$utm_medium = isset($orderRes['data']['utm_medium']) ? strtolower($orderRes['data']['utm_medium']) : '';
			//end;
			/**符合条件跳转至第三方合作支付成功页**/
			$redirectUrls = array(
				'koubei' => '/open/koubei/payOk?back=1&id='.$order_id
			);
			$redirect_open_url = '';			
			if(isset($orderRes['data']['utm_source']) && isset($redirectUrls[$orderRes['data']['utm_source']])){
				$redirect_open_url = $redirectUrls[$orderRes['data']['utm_source']];
			}
			
			if(!empty($redirect_open_url)){
				$this->redirect($redirect_open_url);
				exit;
			}
			/**符合条件跳转至第三方合作支付成功页 end**/
			
			$order = !empty($orderRes['data']) ? $orderRes['data'] : array();
			$order['status'] = $orderRes['status'];
		}else{
			//失败提示
			$this->redirectMessage('订单不存在');
		}		
		
		// 只有未支付的订单才能进行支付
		if ($order['order_status'] != 0) {
			$msg = '此订单已处理， 不能再进行支付';
			switch ($order['order_status']) {
				case 1:
					$msg = '订单已支付， 不能再进行支付';
					break;
				case 2:
					$msg = '订单已取消， 不能再进行支付';
					break;
			}
			if($utm_medium == 'reserve'){
				$this->redirect('/reserve/cancel/id/'.$order_id);
				exit;
			}
			$this->redirectMessage($msg);
		}
		
		if (($order['add_time'] + $this->orderPayExpire) < CURRENT_TIMESTAMP) {
			if($utm_medium == 'reserve'){
				$this->redirect('/reserve/cancel/id/'.$order_id);
				exit;
			}
			$this->redirectMessage('订单已经过期， 自动取消');
		}
		
		$wxOpenid = '';
		//获取微信用户openid
		
		if (!getenv('PAY_HOST') && api_CoreHelper::IsWenXinBrowser()) { //测试环境关闭微信支付
		// if (api_CoreHelper::IsWenXinBrowser()) { //开启微信支付
			$redirectUrl = $this->redirectUrl();
			//$wxOpenid = api_CoreHelper::getCookie('wx_openid');
			if(!$wxOpenid){
				try {
					$wxConfig = array(
							'appid' => 'wxe37215df86f33faa',
							'secret' => '3b5c6fcc4923e7397eecc832226a89dc'
					);
					//FileLog::log2File('微信获取openid_发起请求:','weixin_api');
					$wxOpenid = api_WxApi::getOpenid($wxConfig, $redirectUrl);
					api_CoreHelper::setCookie('wx_openid', $wxOpenid, 1800);
					baf_Common::log('weixin_api','INFO','wechat openid',$wxOpenid);
				} catch (Exception $e) {
					baf_Common::log('weixin_api','ERR','wechat openid error',json_encode($e->getMessage()));
				}
			}
		}
		
		// 获取当前场馆的会员卡号
		$cardInfo = isset($order['user_card_info']) && $order['user_card_info'] ? $order['user_card_info'] : array();
		//获取支付方式配置
		$paySetting = api_CoreHelper::getOption('pay_ids');
		$payIds = array();
		if($paySetting){
			$payIds = explode(',', $paySetting);
		}
        $checkParam['user_id'] = $this->uid;
        $issetPw = 0;
        $res = api_Pay::checkPayPassword($checkParam);
        if(isset($res['status'])&&$res['status']==SUCCESS_STATUS){
            $issetPw = $res['data']['is_set'];
        }

        //手Q环境第三方支付只支持QQ支付
		if(CHANNEL_SOURCE=='qqwallet'){
			//使用会员卡下单的，直接提示“会员卡订单无法在本渠道中支付，请返回重新选择”
			if ($order['order_type']==3) {
				$this->redirectMessage('会员卡订单无法在本渠道中支付，请取消或使用APP支付');
			}

			$payIds = array(23);
			$cardInfo = array();
		}
		//中继订单不支持会员卡
		if($order['order_type']==10){
			$cardInfo = array();
		}

		//调用获取页面标题、关键字和介绍
        $utm_sources = CHANNEL_SOURCE ? CHANNEL_SOURCE : 'wap';
		$this->setPageTitle(array('utm_source'=>$utm_sources));
		
		$this->_view->assign(array('order' => $order, 'cardInfo' => $cardInfo, 'payIds'=>$payIds, 'openid'=>$wxOpenid, 'issetPw'=>$issetPw));
	}

	public function getpaytimeoutAction()
	{
		if($this->isAjax){
			$addTime=$this->getParam('add_time');
			if(!$addTime) $this->readJson(array('pay_timeout'=>0));
			//支付倒计时
			$pay_timeout = 600 - (time() - $addTime);
			$pay_timeout = $pay_timeout > 0 ? $pay_timeout : 0;
			$ret['pay_timeout'] = $pay_timeout;
			$this->readJson($ret);
		}
	}
    public function checkpwAction(){
        $password = $this->getParam('wpk','');
        $des = new baf_Des();
        $verifyParam['password'] = $des->encrypt($password);
        $verifyParam['user_id'] = $this->uid;
        $verifyRes = api_User::verifyPaypassword($verifyParam);
        if(isset($verifyRes['status'])&&$verifyRes['status']==SUCCESS_STATUS){
            $this->readJson(baf_ResCode::msg());
        }else{
            $this->readJson(baf_ResCode::msg(baf_ResCode::USER_PASSWORD_ERROR,'支付密码错误'));
        }
    }
	
	/**
	 * 支付成功页
	 *
	 * 订单状态（order_status）为：1时，表示支付成功
	 *
	 * @param id int 订单ID
	 * @author chenchao
	 */
	public function payOkAction(){
		//订单ID
		$order_id = (int) $this->getParam('id');
		
		$param = array();
		$param['order_id'] = $order_id;
		$param['user_id'] = $this->uid;
		$param['ver'] = '1.3';
		
		//读取订单详情
		$order = array();
		$orderRes = api_Order::orderDetail($param);
		if(isset($orderRes['status']) && $orderRes['status']=='0000'){		
			//暂通过跳转方式解决支付回调无法传递来源参数问题
			if(isset($orderRes['data']['utm_source']) && $orderRes['data']['utm_source']==CHANNEL_SOURCE && !isset($_REQUEST['utm_source'])){
				Config::$preserveParams['utm_source'] = $orderRes['data']['utm_source'];
				$this->redirect('/order/payOk?id='.$order_id);
				exit;
			}

			//begin---预留订单---reserve
			$utm_medium = isset($orderRes['data']['utm_medium']) ? strtolower($orderRes['data']['utm_medium']) : '';			
			if($utm_medium == 'reserve'){
				$this->redirect('/reserve/payok/id/'.$order_id);
			}
			//end;
			
			/**活动订单**/
			$is_need_comment=false;
			$actId=isset($orderRes['data']['utm_source'])?explode('_',$orderRes['data']['utm_source']):array(0=>false);
			if ($actId[0]=='activity'){
				$act_id = isset($actId[1])?intval($actId[1]):0;
				$act = baf_Common::dbModel('ActivityCommon','quyundong')->getOne(array('act_id'=>$act_id,'is_online'=>1,'is_need_comment'=>1,'is_need_comment_intime'=>1));
				if(!empty($act)){
					$is_need_comment=true;
				}
			}	
			/**符合条件跳转至第三方合作支付成功页**/
			$redirectUrls = array(
				'koubei' => '/open/koubei/payOk?back=1&id='.$order_id
			);
			$redirect_open_url = '';			
			if(isset($orderRes['data']['utm_source']) && isset($redirectUrls[$orderRes['data']['utm_source']])){
				$redirect_open_url = $redirectUrls[$orderRes['data']['utm_source']];
			}
			
			if(!empty($redirect_open_url)){
				$this->redirect($redirect_open_url);
				exit;
			}
			/**符合条件跳转至第三方合作支付成功页 end**/

			$order = !empty($orderRes['data']) ? $orderRes['data'] : array();			
			if (!isset($order['order_no'])) {
				$this->redirectMessage('订单记录不存在');
			}
			$order['status'] = $orderRes['status'];
		}else{
			//失败提示
			$this->redirectMessage('网络繁忙，请稍后重试');
		}
		
		//场馆微信二维码
		$wxGroupQrCode = !empty($order['venues_id']) ? api_Venues::getVenuesQrcode($order['venues_id']) : array();

		//拼场订单
		if ( $order['order_type'] == 8 ){
			//拼场订单详情 
			$order = api_Order::cporder_info($order_id);
			if (empty($order)){$this->redirectMessage('订单记录不存在');}
			
// 			print_r($order);
			$this->_view->assign(array('order' => $order));
			Yaf_Dispatcher::getInstance()->autoRender(FALSE);
			$this->getView()->display('order/payok_cp.php');
		}elseif($order['order_type']==9){
			$this->_view->assign(array('order' => $order));
			Yaf_Dispatcher::getInstance()->autoRender(FALSE);
			$this->getView()->display('order/courtjoin_payok.php');
		}
		else {
			$this->setSession(array('vip_pay_use'=>''));

			//调用获取页面标题、关键字和介绍
	        $utm_sources = CHANNEL_SOURCE ? CHANNEL_SOURCE : 'wap';
			$this->setPageTitle(array('utm_source'=>$utm_sources));
			
			$this->_view->assign(array('order' => $order,'wxGroupQrCode'=>$wxGroupQrCode,'is_need_comment'=>$is_need_comment));
		}
	}
	
	
	public function paySuccessAction(){
		//订单ID
		$order_id = (int) $this->getParam('id');
		
		$param = array(
				'order_id' => $order_id,
				'user_id' => $this->uid ? $this->uid : $this->getParam('user_id'),
				'ver' => '1.3',
		);
		
		//读取订单详情
		$order = array();
		$orderRes = api_Order::orderDetail($param);

		if(isset($orderRes['status']) && $orderRes['status']=='0000'){
			//暂通过跳转方式解决支付回调无法传递来源参数问题
			if(isset($orderRes['data']['utm_source']) && $orderRes['data']['utm_source']==CHANNEL_SOURCE && !isset($_REQUEST['utm_source'])){
				Config::$preserveParams['utm_source'] = $orderRes['data']['utm_source'];
				$this->redirect('/order/paySuccess?id='.$order_id);
				exit;
			}

			//begin---预留订单---reserve
			$utm_medium = isset($orderRes['data']['utm_medium']) ? strtolower($orderRes['data']['utm_medium']) : '';
			if($utm_medium == 'reserve'){
				$this->redirect('/reserve/payok/id/'.$order_id);
			}
			//end;
			
			/**活动订单**/
			$is_need_comment=false;
			$actId=isset($orderRes['data']['utm_source'])?explode('_',$orderRes['data']['utm_source']):array(0=>false);
			if ($actId[0]=='activity'){
				$act_id = isset($actId[1])?intval($actId[1]):0;
				$act = baf_Common::dbModel('ActivityCommon','quyundong')->getOne(array('act_id'=>$act_id,'is_online'=>1,'is_need_comment'=>1,'is_need_comment_intime'=>1));
				if(!empty($act)){
					$is_need_comment=true;
				}
			}	
			/**符合条件跳转至第三方合作支付成功页**/
			$redirectUrls = array(
				'koubei' => '/open/koubei/payOk?back=1&id='.$order_id
			);
			$redirect_open_url = '';			
			if(isset($orderRes['data']['utm_source']) && isset($redirectUrls[$orderRes['data']['utm_source']])){
				$redirect_open_url = $redirectUrls[$orderRes['data']['utm_source']];
			}
			
			if(!empty($redirect_open_url)){
				$this->redirect($redirect_open_url);
				exit;
			}
			/**符合条件跳转至第三方合作支付成功页 end**/
			
			$order = !empty($orderRes['data']) ? $orderRes['data'] : array();			
			if (!isset($order['order_no'])) {
				$this->redirectMessage('订单记录不存在');
			}
			$order['status'] = $orderRes['status'];
		}else{
			//失败提示
			$this->redirectMessage('网络繁忙，请稍后重试');
		}
		
		$this->setSession(array('vip_pay_use'=>''));
		//场馆微信二维码
		$wxGroupQrCode = !empty($order['venues_id']) ? api_Venues::getVenuesQrcode($order['venues_id']) : array();

		//拼场订单
		if ( $order['order_type'] == 8 ){
			//拼场订单详情
			$cporder = api_Order::cporder_info($order_id);
			$this->_view->assign(array('order' => $cporder));
			Yaf_Dispatcher::getInstance()->autoRender(FALSE);
			$this->getView()->display('order/paysuccess_cp.php');
		}elseif($order['order_type']==9){
			$this->_view->assign(array('order' => $order));
			Yaf_Dispatcher::getInstance()->autoRender(FALSE);
			$this->getView()->display('order/courtjoin_payok.php');
		}
		else {
			$this->setSession(array('vip_pay_use'=>''));
			
			//调用获取页面标题、关键字和介绍
			$utm_sources = CHANNEL_SOURCE ? CHANNEL_SOURCE : 'wap';
			$this->setPageTitle(array('utm_source'=>$utm_sources));
			$this->_view->assign(array('order' => $order,'wxGroupQrCode'=>$wxGroupQrCode,'is_need_comment'=>$is_need_comment));
		}
		
	}
	
	
	/**
	 * 支付取消页	 
	 * 
	 */
	public function payCancelAction(){
		//这不是一个空方法，自动加载视图
	}
	
	
	/**
	 * 支付操作
	 *
	 * @return string
	 * @author xiaosibo
	 */
	public function dopayAction(){
		$payId   = (int) $this->getParam('pay_type'); 	// 支付方式
		$orderId = $this->getParam('order_id'); 		// 订单id
		$cardNo  = $this->getParam('card_no'); 			// 会员卡号
		$hash    = $this->getParam('hash'); 			// 验证数据
		$openid  = $this->getParam('openid'); 			// openid
        $useWallet = $this->getParam('use_wallet');     //余额支付
		$walletPwdKey = $this->getParam('wpk');
        $userId  = $this->uid;

        //调用获取页面标题、关键字和介绍
        $utm_sources = CHANNEL_SOURCE ? CHANNEL_SOURCE : 'wap';
		$this->setPageTitle(array('utm_source'=>$utm_sources));

		//兼容app
		$useWallet = $useWallet?$useWallet:intval($this->getParam('u_w'));
		// 支付类型
		$payTypeArr = array(
				'5',   // 微信支付
				'13',  // 支付宝支付(wap)
				'15',  // 会员卡支付(wap)
				'16',  // 银联在线支付(wap)
				'23',  // QQ
		);
		if (in_array($payId, array(13, 16, 23))) {
			// 银联支付、支付宝支付不是使用ajax请求, 后续的其他支付方式也会统一修改为直接post请求
			$this->_doPay();
			exit();
		}
		
		if ($userId < 1) {
			$this->readJson(baf_ResCode::msg(baf_ResCode::OTHER_ERR, '非法请求'));
		}
		if (!$orderId) {
			$this->readJson(baf_ResCode::msg(baf_ResCode::OTHER_ERR, '非法请求'));
		}
		if (!$payId) {
			$this->readJson(baf_ResCode::msg(baf_ResCode::OTHER_ERR, '请选择支付方式'));
		}
		if (!in_array($payId, $payTypeArr)) {
			$this->readJson(baf_ResCode::msg(baf_ResCode::OTHER_ERR, '支付方式不存在'));
		}
		
		if ($payId == 15) { // 手机网站会员卡支付
			if (!$cardNo) {
				$this->readJson(baf_ResCode::msg(baf_ResCode::OTHER_ERR, '缺少会员卡号'));
			}
		
			if ($orderId && $cardNo) {
				$payParam = array(
						'user_id'  => $this->uid,
						'order_id' => $orderId,
						'pay_id'   => $payId,
						'card_no'  => $cardNo
				);
				// 会员卡支付
				$res = api_Pay::vipPay($payParam);
				if (is_array($res) && isset($res['status'])) {
					if ($res['status'] == SUCCESS_STATUS) {
						$this->readJson(baf_ResCode::msg());
					} else {
						$this->readJson(baf_ResCode::msg(baf_ResCode::OTHER_ERR, (isset($res['msg']) && $res['msg']) ? $res['msg'] :'操作失败，未知错误'));
					}
				} else {
					$this->readJson(baf_ResCode::msg(baf_ResCode::SYSTEM_ERROR));
				}
			} else {
				$this->readJson(baf_ResCode::msg(baf_ResCode::OTHER_ERR, '支付参数丢失'));
			}
		} else { // 其他的支付方式
			$param = array('user_id' => $userId, 'order_id' => $orderId, 'pay_id' => $payId);
            if($useWallet){
                $param['use_wallet'] = 1;
				//兼容app
				if($this->getParam('u_w')) {
					$param['wpk'] = $walletPwdKey;
				}
                $des = new baf_Des();
                $param['password'] = $des->encrypt($walletPwdKey);
            }
			if($openid) $param['openid'] = $openid;

			//将需支付回传的参数传入
			if(!empty(Config::$preserveParams)){
				$param['return_param'] = json_encode(Config::$preserveParams);			
			}
			if(CHANNEL_SOURCE) $param['utm_source'] = CHANNEL_SOURCE;
			$res = api_Pay::pay($param);
		
			if (is_array($res) && isset($res['status'])) {
				if ($res['status'] == SUCCESS_STATUS) {
					$this->readJson(baf_ResCode::msg('', $res['data']));
				} elseif ($res['status'] == '1302') { // 余额足额支付，交易结束
					$this->readJson(array('code'=> '1302', 'msg'=> '余额支付成功'));
				} else {
					$this->readJson(baf_ResCode::msg(baf_ResCode::OTHER_ERR, (isset($res['msg']) && $res['msg']) ? $res['msg'] :'操作失败，未知错误'));
				}
			} else {
				$this->readJson(baf_ResCode::msg(baf_ResCode::SYSTEM_ERROR));
			}
		}
	}


	/**
	 * 验证支付密码
	 */
	public function paypassAction(){
		$password = $this->getParam("password");
		$verifyParam = array(
			'user_id'=>$this->uid,
			'password'=>$password,
		);
		$verifyRes = api_User::verifyPaypassword($verifyParam);
		if(isset($verifyRes['status'])&&$verifyRes['status']=='0000'){

		}else{

		}
	}
	
	/**
	 * 取消订单，由Ajax处理
	 *
	 * @param id int 订单ID
	 * @author chenchao
	 */
	public function cancelAction()
	{
		//用户是否登录
		if (!$this->uid) {
			$this->setReturnUrl($this->redirectUrl());
			$this->redirectToLogin();
		}
		$order_id = $this->getParam('id');
		$param = array(
				'order_id' => $order_id,
				'user_id' => $this->uid, //$this->uid
		);
		$order = api_Order::orderCancel($param);
		//提交成功
		if (is_array($order) && isset($order['status'])) {
			if ($order['status'] == SUCCESS_STATUS) {
				$this->readJson(baf_ResCode::msg('取消成功！'));
			}
			if ($order['status'] == '1504') {
				$this->readJson(baf_ResCode::msg(baf_ResCode::ERR_ORDER_ERROR));
			}

		} else {
			$this->readJson(baf_ResCode::msg(baf_ResCode::SYSTEM_ERROR));
		}
		return false;//关闭视图渲染
	}
	
	
	/**
	 * 银联在线支付
	 *
	 * 现在只有银联在线支付是post直接提交的，后续其他支付方式也会修改为此种提交方式
	 *
	 * @author xiaosibo
	 */
	protected function _doPay()
	{
		$payId   = (int) $this->getParam('pay_type'); // 支付方式
		$orderId = $this->getParam('order_id'); // 订单id
		$hash    = $this->getParam('hash'); // 验证数据
		$userId  = $this->uid ? $this->uid : $this->getParam('user_id');
		$useWallet = intval($this->getParam('use_wallet'));		//使用金额支付
		$walletPwdKey = $this->getParam('wpk');		//支付密码
		$md5Hash = md5($orderId.WAP_HASH_KEY);
		$useWallet = $useWallet?$useWallet:intval($this->getParam('u_w'));
		// 支付类型
		$payTypeArr = array(
				'5',   // 微信支付
				'13',  // 支付宝支付(wap)
				'15',  // 会员卡支付(wap)
				'16',  // 银联在线支付(wap)
				'23',  // QQ
		);
	
		if ($userId < 1) {
			$this->setReturnUrl('/order/pay?id=' . $orderId);
			$this->redirectToLogin();
		}
		if ($hash != $md5Hash) {
			$this->redirectMessage('非法请求');
		}
		if (!$payId) {
			$this->redirectMessage('请选择支付方式');
		}
		if (!in_array($payId, $payTypeArr)) {
			$this->redirectMessage('支付方式不存在');
		}
			
		$param = array('user_id' => $userId, 'order_id' => $orderId, 'pay_id' => $payId);
		$param['in_mb'] = 1;//设置手机端标识给接口
		if($this->getParam('is_app')){
			$param['is_app'] = 1;//设置app标识
		}else{
			$this->setSession(array('is_wap'=>1)); //设置wap端标识
		}
		if($useWallet) $param['use_wallet'] = $useWallet; //标识使用余额
		if($this->getParam('u_w')) {
			$param['wpk'] = $walletPwdKey;
		}
		$des = new baf_Des();
		if($walletPwdKey) $param['password'] = $des->encrypt($walletPwdKey); //支付密码key

		//手Q钱包支付
		if(CHANNEL_SOURCE=='qqwallet' && $payId==23){			
			$this->walletPay($param);
			exit;
		}
		//将需支付回传的参数传入
		if(!empty(Config::$preserveParams)){
			$param['return_param'] = json_encode(Config::$preserveParams);			
		}
		if(CHANNEL_SOURCE) $param['utm_source'] = CHANNEL_SOURCE;
		$res = api_Pay::pay($param);
	
		if (is_array($res) && isset($res['status'])) {
			if ($res['status'] == SUCCESS_STATUS && isset($res['data']) && !empty($res['data'])) {
				// 创建form表单
				if($payId == 13){
					echo $this->createAlipayForm($res['data']); //生成支付宝支付表单
				}else{
					echo $this->createPayForm($res['data']);
				}
				exit;
			} elseif ($res['status'] == '1302') { // 余额足额支付，交易结束
				$url = '/order/payOk?id=' . $orderId;
				if(UTM_SOURCE) $url .= '&utm_source='.UTM_SOURCE;
				// 直接跳转到支付成功页面
				$this->redirect($url);
			} else {
				// 支付失败或获取支付参数失败
				$this->redirectMessage((isset($res['msg']) && $res['msg']) ? $res['msg'] : '操作失败，未知错误');
			}
		} else {
			$this->redirectMessage('网络繁忙，请稍后重试');
		}
	}
	
	/**
	 * 构造支付宝支付表单
	 */
	protected function createAlipayForm(array $data){
		$param = $data['form_param'];
		if(!$param) return;
		$aliPayHelper = new ext_AlipayHelper();
		$html = $aliPayHelper->buildRequestForm($param, 'get', 'submit');
		return $html;
	}
	
	
	/**
	 * 构造自动提交表单
	 *
	 * @param array  $params 参数数组
	 * @return string
	 * @author xiaosibo
	 */
	protected function createPayForm(array $params)
	{
		$action = '';
		// 获取表单提交的地址
		if (isset($params['form_action'])) {
			$action = $params['form_action'];
			unset($params['form_action']);
		}
	
		$inputList = '';
		foreach ($params as $key => $value) {
			$inputList .= "<input type=\"hidden\" name=\"{$key}\" id=\"{$key}\" value=\"{$value}\" />\n";
		}
	
		$html = '<html>
                    <head>
                         <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                    </head>
                    <body  onload="javascript:document.pay_form.submit();">
                        <form id="pay_form" name="pay_form" action="' . $action . '" method="post">
                            ' . $inputList . '
                        <input type="submit" type="hidden">
                        </form>
                    </body>
                 </html>';
	
		return $html;
	}
	
	
	/**
	 * 场次商品提交订单
	 *
	 * @return string json字符串
	 * @author xiaosibo
	 */
	protected function doconfirmGeneral()
	{
		$goods_ids  = $this->getParam('goods_ids'); // 商品id
		$act_id     = (int) $this->getParam('act_id'); // 活动id
		$businessId = (int) $this->getParam('bid'); // 场馆id
		$categoryId = (int) $this->getParam('cid'); // 分类id
		$code       = $this->getParam('code', '');
		$couponId	= $this->getParam('coupon_id', 0); //代金券id
		$ticket_type	= $this->getParam('ticket_type', 1); //代金券类型
		$hash       = $this->getParam('hash');
		$payType	= $this->getParam('pay_type'); //支付方式
		$relay		= intval($this->getParam('relay', 0)); //是否中继订单
		$package_type = intval($this->getParam('package_type', 0));//套餐类型

		$orderType 	= $relay>0 ? 10 : 0;
		if($payType == 'usercard'){
			$cardNo = $this->getParam('card_no');//会员卡号
		}
		$relay		= intval($this->getParam('relay', 0));//是否中继订单
	
		// 验证数据传输的完整性
		$md5Hash = md5($goods_ids.$businessId.$categoryId.$relay.WAP_HASH_KEY);
	
		if ($hash != $md5Hash) {
			$this->readJson(baf_ResCode::msg(baf_ResCode::OTHER_ERR, '非法请求'));
		}
	
		// 注意: 手机号和验证码有两种用途
		// 1. 如果用户未登陆，则作为登陆验证(没有注册则进行自动注册)
		// 2. 如果用户已登陆，则作为手机号码验证(因手机网站会员卡支付不需要支付密码，固此多一步验证)
	
		// 验证码的四种情况
		// 1. 有会员卡，有登陆，会有验证码（验证码用于验证）
		// 2. 有会员卡，没有登陆，会有验证码（验证码用于登陆注册）
		// 3. 没有会员卡，有登陆，不会有验证码
		// 4. 没有会员卡，没有登陆，会有验证码（验证码用于登陆注册）
	
		
		// 会员卡信息

		$phone      = api_CoreHelper::getCookie('phone');
		$cardInfo = array();
	
		if ($this->uid > 0 && empty($cardInfo)) {
			// 用户已登陆， 但是没有会员卡，则不验证
		} else {
			if (empty($phone) || empty($code)) {
				$this->readJson(baf_ResCode::msg(baf_ResCode::SMS_CODE_NOT_EXIT));
			}
		}
	
		//是否登录
		$user_id = '';
		if ($this->uid > 0) {
			$smsCodeType = 5;
			$user_id = $this->uid;
			$tel = api_CoreHelper::getCookie('phone');
			if (!empty($tel)){
				$phone = $tel;
			}
		} else {
			$smsCodeType = 1;
	
			//记录推广信息
			$said = api_CoreHelper::getCookie('said');
			if ($said > 0){
				$param['supplier_admin_id'] = $said;
				$param['category_id'] = api_CoreHelper::getCookie('category_id');
				$param['business_id'] = api_CoreHelper::getCookie('business_id');
				$param['phone'] = $phone;
				$log_res = api_Court::addSpreadLog($param);
				//清空Cookie，暂不处理失败信息
				api_CoreHelper::setCookie('said','',0);
				api_CoreHelper::setCookie('category_id','',0);
				api_CoreHelper::setCookie('business_id','',0);
			}
	
			$loginRes = api_User::phoneQuckLogin(array('phone'=>$phone, 'sms_code'=>$code));
			//登录成功
			if(is_array($loginRes) && isset($loginRes['status'])){
				if($loginRes['status'] == '0201'){
					$this->readJson(baf_ResCode::msg(baf_ResCode::USERNAME_NOT_FOUND));
				}
				if ($loginRes['status'] == '0222'){
					$this->readJson(baf_ResCode::msg(baf_ResCode::SMSCODE_ERR));
				}
				if($loginRes['status'] == SUCCESS_STATUS){
					$user = array(
							'user_id'=>$loginRes['user_id'],
							'phone'=>$loginRes['phone'],
							'nick_name'=>$loginRes['nick_name'],
							'avatar'=>$loginRes['avatar'],
					);
					api_WxUser::setLoginCookie($user,LOGIN_TIME_LIMIT);
					$user_id = $loginRes['user_id'];
					$phone   = $loginRes['phone'];
				} else {
					//出错提示信息
					if (isset($loginRes['msg'])){
						$this->readJson(baf_ResCode::msg(baf_ResCode::OTHER_ERR, $loginRes['msg']));
					}else{
						$this->readJson(baf_ResCode::msg(baf_ResCode::SYSTEM_ERROR));
					}
				}
			} else {
				$this->readJson(baf_ResCode::msg(baf_ResCode::SYSTEM_ERROR));
			}
		}
	
		// 4微信用户   5手机网站用户
		if (api_CoreHelper::IsWenXinBrowser()) {
			$from = 4; // 4微信用户
			$utm_medium = 'weixin';
		} else {
			$from = 5;
			$utm_medium = 'wap';
		}
		
		$isCardUser = 0; // 是否是会员卡支付的标识
	
		//是否有优惠活动 add by chenchao 2015-03-05
		$param = array('user_id' => $user_id, 'goods_ids' => $goods_ids, 'order_type'=> $orderType);
		$param['utm_source'] = $this->getUtmSource();//来源渠道
		$res = api_Order::confirmOrder($param);
		if (is_array($res) && isset($res['status']) && $res['status'] == SUCCESS_STATUS) {			
			$isCardUser = !empty($res['data']['is_card_user']) ? $res['data']['is_card_user'] : false;
		}
		//是否有优惠活动 add by chenchao 2015-03-05
	
		// 取消用户未支付的订单
		//$this->cancelUnpayOrder($user_id);
	
		$des = new baf_Des();
	
		//订单提交
		$insertParam = array(
				'goods_ids' => $goods_ids,
				'user_id' => $user_id,
				'act_id' => $act_id,
				'phone'=> $phone,
				'from' => $from,
				'order_type' => $orderType,  
				'utm_medium' => UTM_SOURCE ? UTM_SOURCE : $utm_medium, //如果是外部来源 则记录外部来源标识
				'utm_source' => $this->getUtmSource() //来源渠道
		);
		if($couponId > 0){ 
			$insertParam['coupon_id'] = $couponId;
			$insertParam['ticket_type'] = $ticket_type;
		}
		
		//外部入口则取消所有优惠
		if(in_array(UTM_SOURCE, Config::$source4Nothing)){
			$insertParam['coupon_id'] = 0;
		} 
		$insertParam['ver'] = '2.1';
		if($package_type) $insertParam['package_type'] = $package_type;
		$insertParam['phone_encode'] = $des->encrypt($phone);
		if($isCardUser && isset($cardNo) && $cardNo && !$relay){
			$insertParam['card_no'] = $cardNo;
			$insertParam['order_type'] = 3;
			$insert = api_Order::insertOrderMember($insertParam);
		}else{
			$insert = api_Order::insertOrder($insertParam);
		}
		
		//提交成功
		if (is_array($insert) && isset($insert['status'])) {
			//记录用户支付方式
			if($isCardUser) {
				
				$payIdValue = $des->encrypt($payType);
				api_CoreHelper::setCookie('pay_id', $payIdValue, 1296000); //保存15天
			}
			if ($insert['status'] == SUCCESS_STATUS) {
				$this->readJson(baf_ResCode::msg('', $insert['data']['order_id']));
			}
			if ($insert['status'] == '0308' || $insert['status'] == '1201') {
				$this->readJson(baf_ResCode::msg(baf_ResCode::COURT_ORDERED));
			} else {
				$this->readJson(baf_ResCode::msg(baf_ResCode::OTHER_ERR, isset($insert['msg']) && $insert['msg'] ? $insert['msg'] : '提交订单失败，未知错误。'));
			}
		} else {
			$this->readJson(baf_ResCode::msg(baf_ResCode::SYSTEM_ERROR));
		}
	}

	/**
	 * 人次商品提交订单
	 * @param $orderType
	 * @author xiaosibo
	 */
	protected function doconfirmPerson($orderType)
	{
		$goods_ids = $this->getParam('goods_ids');
		$act_id    = $this->getParam('act_id', '0');
		$goodsNum  = (int) $this->getParam('number'); // 商品数量
		$couponId	= $this->getParam('coupon_id', 0); //代金券id
		$ticket_type	= $this->getParam('ticket_type', 1); //代金券类型
		if ($this->uid < 1) {
			$this->readJson(baf_ResCode::msg(baf_ResCode::OTHER_ERR, '请先登录'));
		}
		if (!$goods_ids) {
			$this->readJson(baf_ResCode::msg(baf_ResCode::OTHER_ERR, '非法请求'));
		}
		if ($goodsNum < 1) {
			$this->readJson(baf_ResCode::msg(baf_ResCode::OTHER_ERR, '非法请求'));
		}
	
		// 4微信用户   5手机网站用户
		$from = api_CoreHelper::IsWenXinBrowser() ? 4 : 5;
	
		// 取消用户未支付的订单
		//$this->cancelUnpayOrder($this->uid);
		$des = new baf_Des();
		$phone = api_CoreHelper::getCookie('phone');
		$param = array(
				'goods_ids' => $goods_ids,
				'user_id' => $this->uid,
				'act_id' => $act_id,
				'phone' => $phone,
				'from' => $from,
				'order_type' => $orderType,
				'goods_number' => $goodsNum,
				'utm_source' => $this->getUtmSource() //来源渠道
		);
		$param['ver'] = '2.1';
		$param['phone_encode'] = $des->encrypt($phone);
		if($couponId > 0){
			$param['coupon_id'] = $couponId;
			$param['ticket_type'] = $ticket_type;
		}
		$insert = api_Order::insertOrder($param);
	
		// 提交成功
		if (is_array($insert) && isset($insert['status'])) {
			if ($insert['status'] == SUCCESS_STATUS) {
				$this->readJson(baf_ResCode::msg('', $insert['data']['order_id']));
			}
			if ($insert['status'] == '0308') {
				$this->readJson(baf_ResCode::msg(baf_ResCode::COURT_ORDERED));
			} else {
				$msg = isset($insert['msg']) && $insert['msg'] ? $insert['msg'] : '下单失败';
				$this->readJson(baf_ResCode::msg(baf_ResCode::OTHER_ERR, $msg));
			}
		} else {
			$this->readJson(baf_ResCode::msg(baf_ResCode::SYSTEM_ERROR));
		}
	}
	
	
	/**
	 * 拼场订单
	 */
	protected function doConfirmCourtPool(){
		$courtPoolId = intval($this->getParam('court_pool_id'));
		$cp_level = intval($this->getParam('cp_level'));
		$orderType = 8;
		$userId = $this->uid;
		$phone = api_CoreHelper::getCookie('phone');
		
		$handler = new ext_MobileDetect();
		if(!$handler->isMobile()){
			$this->readJson(baf_ResCode::msg(baf_ResCode::OTHER_ERR, '请在手机中打开，继续完成操作'));
		}
		
		if ($userId < 1) {
			$this->readJson(baf_ResCode::msg(baf_ResCode::NEED_LOGIN, '请先登录'));
		}
		if (!$courtPoolId) {
			$this->readJson(baf_ResCode::msg(baf_ResCode::OTHER_ERR, '非法请求'));
		}
		
		
		// 4微信用户   5手机网站用户
		if (api_CoreHelper::IsWenXinBrowser()) {
			$from = 4; // 4微信用户
			$utm_medium = 'weixin';
		} else {
			$from = 5;
			$utm_medium = 'wap';
		}
		
		$param = array(
			'court_pool_id' => $courtPoolId,
			'cp_level' => $cp_level,
			'user_id' => $userId,
			'phone' => $phone,
			'order_type' => $orderType,
			'from' => $from,
			'utm_medium' => $utm_medium,
			'utm_source' => $this->getUtmSource() //来源渠道
		);
		
		$insert = api_Order::insertCourtPoolOrder($param);
		
		//提交成功
		if (is_array($insert) && isset($insert['status'])) {
			if ($insert['status'] == SUCCESS_STATUS) {
				$this->readJson(baf_ResCode::msg('', $insert['data']['order_id']));
			}
			if ($insert['status'] == '0308') {
				$this->readJson(baf_ResCode::msg(baf_ResCode::COURT_ORDERED));
			} else {
				$this->readJson(baf_ResCode::msg(baf_ResCode::OTHER_ERR, isset($insert['msg']) && $insert['msg'] ? $insert['msg'] : '提交订单失败，未知错误。'));
			}
		} else {
			$this->readJson(baf_ResCode::msg(baf_ResCode::SYSTEM_ERROR));
		}
	}
	
	
	/**
	 * 绑定会员卡
	 *
	 * 如果第四个参数传入了会员卡信息，将不会从数据库中趣读取会员卡信息
	 *
	 * @param int    $userId   用户id
	 * @param string $phone    手机号
	 * @param string $cno      会员卡号
	 * @param array  $cardInfo 会员卡信息
	 * @return boolean
	 */
	protected function cardBind($userId, $phone, $cno, array $cardInfo = array())
	{
		if ($userId < 1 || !$phone || !$cno) {
			return false;
		}
	
		if (empty($cardInfo)) { // 没有传入会员卡信息
			// 读取会员卡信息
			$res = api_UserCard::getCardDetail(array('card_no' => $cno, 'user_id' => $userId, 'phone' => $phone));
			if (is_array($res) && isset($res['status']) && $res['status'] == SUCCESS_STATUS) {
				$cardInfo = $res['data'];
			}
		}
	
		if (!empty($cardInfo)) {
			// 注意: 暂时只做 趣运动账号只能绑定与会员卡中预留手机号码一致的会员卡
	
			if ($phone == $cardInfo['card_mobile_phone']) { // 预留的手机号码是当前登陆用户的
				if ($cardInfo['card_status'] == 1) { // 已绑定
					return true;
				} elseif ($cardInfo['card_status'] == 0) { // 未绑定
					// 绑定会员卡
					$bindParam = array('user_id' => $userId, 'card_no' => $cno, 'phone' => $phone);
					$bindRes = api_UserCard::cardBind($bindParam);
					if (is_array($bindRes) && isset($bindRes['status']) && $bindRes['status'] == SUCCESS_STATUS) {
						// 绑定会员卡成功
						return true;
					}
					// 绑定会员卡失败
				}
			} else { // 预留的手机号码不是当前登陆用户的
				// 暂时不处理这种情况，待后续增加...
			}
		}
		return false;
	}
	
	
	
	/**
	 * 取消用户未支付的订单
	 *
	 * @param int $userId 用户id
	 * @return false|int  取消成功返回被取消的订单id
	 */
	protected function cancelUnpayOrder($userId)
	{
		// 读取未支付订单
		$param = array('user_id' => $userId, 'ver' => '2.0');
		$due = api_Order::orderDueCount($param);
	
		if (isset($due['status'])
				&& ($due['status'] == SUCCESS_STATUS)
				&& isset($due['data']['count'])
				&& ($due['data']['count'] > 0)
				&& isset($due['data']['order']['order_id'])
				&& ($due['data']['order']['order_id'] > 0)
		){
			// 取消订单
			$paramc = array(
					'order_id' => $due['data']['order']['order_id'],
					'user_id'  => $userId,
			);
			$res = api_Order::orderCancel($paramc);
			if (is_array($res) && isset($res['status']) && $res['status'] == SUCCESS_STATUS) {
				return isset($res['order_id']) ? $res['order_id'] : true;
			}
		}
	
		return false;
	}

	/**
	 * 球局确认订单
	 */
	public function confirmCourtJoinAction(){
		$this->setReturnUrl($this->redirectUrl());//设置当前地址为referer		
		if($this->uid<1){
			if(api_CoreHelper::IsWenXinBrowser()){
				$this->redirect($this->redirectUrl().'&login=wx');
			}else{
				$this->redirectToLogin();
			}
		}

		$id = (int) $this->getParam('id', 0); // 球局id
        if($id<1) $this->redirectMessage('缺少球局参数');
        $info = api_Order::getCourtJoinInfo(array('cj_order_id'=>$id, 'user_id'=>$this->uid,'ver'=>'2.1'));
	    
	    if (!empty($info['status']) && $info['status'] == SUCCESS_STATUS && !empty($info['data'])){	        
	        $data = $info['data'];
	        if(isset($data['court_join_info']['court_join_available'])){
	        	if($data['court_join_info']['court_join_available']==0){
					$msg = !empty($data['court_join_info']['court_join_disable_msg']) ? $data['court_join_info']['court_join_disable_msg'] : '不可加入';
		        	$this->redirectMessage($msg, '/courtJoin/detail?id='.$id);
		        	exit;
	        	}elseif($data['court_join_info']['court_join_available']==1 && $data['court_join_info']['is_restric_gender']==1){
	        		$msg = '请先设置性别';
	        		$this->redirectMessage($msg, '/user/info');
		        	exit;
	        	}	        	
	        }
	    }else{
	       //失败提示
	    	baf_Common::log('court_join_err','ERR','getCourtJoinInfo error', array('param'=>$params, 'res'=>$info, 'url'=>$this->redirectUrl()));
			$this->redirectMessage('未找到球局');
	    }

        $params = array(
        	'user_id' => $this->uid,
        	'cj_order_id' => $id
        	);
	    $info = api_Order::confirmCourtJoinOrder($params);
	    
	    $courseInfo = array();
	    $order = array();
	    if (!empty($info['status']) && $info['status'] == SUCCESS_STATUS && !empty($info['data'])){	        
	        //合并场地
	        $order = $info['data'];
	        if(!empty($order['court_join_info']['court_join_goods_list'])){
	        	foreach ($order['court_join_info']['court_join_goods_list'] as $key => $value) {
	        		$subCourse[$value['court_name']][] = $value;
	        		$courseInfo[$value['court_name']] = $subCourse[$value['court_name']];
	        	}
	        }
	    }else{
	       //失败提示
			$this->redirectMessage(!empty($info['msg']) ? $info['msg'] : '网络繁忙，请稍后重试');
	    }
	    $this->_view->assign(array(
	        'order' => $order,
	        'courseInfo' => $courseInfo,
	        'courtJoinInfo' => !empty($list['court_join_info']) ? $list['court_join_info'] : array(),
	        'phone' =>  api_CoreHelper::getCookie('phone'),
	        'hash' => md5($id.$this->uid)
	    ));
		return true;
	}


	/**
	 * 球局下单
	 */
	public function doConfirmCourtJoinAction(){
		if($this->uid<1){
			$this->readJson(baf_ResCode::msg(baf_ResCode::NOT_LOGIN));
			exit;
		}
		$id = (int) $this->getParam('id', 0); // 球局id
		$hash = $this->getParam('hash');
        if($id<1){
        	$this->readJson(baf_ResCode::msg(baf_ResCode::OTHER_ERR, '缺少球局参数'));
			exit;
        }
        if($hash != md5($id.$this->uid)){
        	baf_Common::log('court_join_err','ERR','hash error', array('hash'=>$hash, 'local_hash'=>md5($id.$this->uid), 'url'=>$this->redirectUrl()));
        	$this->readJson(baf_ResCode::msg(baf_ResCode::SYSTEM_ERROR, '参数错误'));
			exit;
        }
        $insertParam = array(
			'cj_order_id' => $id,
			'phone' => api_CoreHelper::getCookie('phone'),
			'user_id' => $this->uid,
			'utm_source' => CHANNEL_SOURCE ? CHANNEL_SOURCE : '' //来源渠道
		);
		$insert = api_Order::insertCourtJoinOrder($insertParam);
		//提交成功
		if (!empty($insert['status']) && $insert['status']=='0000') {
			$this->readJson(baf_ResCode::msg('', $insert['data']['order_id']));
		} else {
			baf_Common::log('court_join_err','ERR','insertCourtJoinOrder error', array('param'=>$insertParam, 'res'=>$insert, 'url'=>$this->redirectUrl()));
			$this->readJson(baf_ResCode::msg(baf_ResCode::OTHER_ERR, isset($insert['msg']) && $insert['msg'] ? $insert['msg'] : '提交订单失败，未知错误。'));
		}
		
		return false;
	}

	/**
	 * 手机钱包支付
	 */
	public function walletPay($param){
		$orderId = $param['order_id'];
		//发起支付
		$param['openid'] = !empty($_SESSION['qqwallet_openid']) ? $_SESSION['qqwallet_openid'] : '';
		$res = api_Pay::pay($param);
		
		if(!empty($res['status']) && $res['status']=='0000' && !empty($res['data'])){
			if(empty($res['data']['token_id'])){
				baf_Common::log('wallet_pay_err', 'EMERG', 'error', array('res'=>$res, 'param'=>$param));
				$this->redirectMessage('获取支付信息失败', '/index');
			}else{
				$this->_view->assign(array(
					'payInfo' => $res['data']
				));	
			}			
		}elseif ($res['status'] == '1302') { // 余额足额支付，交易结束
				$url = '/order/payOk?id=' . $orderId;
				// 直接跳转到支付成功页面
				$this->redirect($url);
		}else{
			baf_Common::log('wallet_pay_err', 'EMERG', 'error', array('res'=>$res, 'param'=>$param));

			$msg = '发起支付失败';
			if (isset($res['msg']) && !empty($res['msg'])) { $msg = $res['msg']; }
			$this->redirectMessage($msg, '/index');
		}
		$this->getView()->display('order/walletpay.php');
		return;
	}

	/**
	 * 装备商品订单确认
	 * @return [type] [description]
	 */
	public function confirmGoodsOrderAction(){
		$this->setReturnUrl($this->redirectUrl());//设置当前地址为referer
		
		if($this->uid<1){
			$this->redirectToLogin();
		}
		$goodsId = intval($this->getParam('goods_id'));
		$groupId = intval($this->getParam('group_id'));
		$proId = intval($this->getParam('pro_id'));
		$number = intval($this->getParam('number'));
		if(empty($goodsId) || $number<1){
			$this->redirectMessage('缺少参数');
		}
		$param = array(
				'goods_ids' => $goodsId,
				'user_id' => $this->uid,
				'goods_number' => $number,
				'group_id' => $groupId,
				'pro_id' => $proId
			);
		$res = api_Order::confirmGoodsOrder($param);
		if(!isset($res['status']) || $res['status']!='0000'){
			$msg = !empty($res['msg']) ? $res['msg'] : '系统繁忙';
			$this->redirectMessage($msg);
		}
		$address = !empty($res['data']['default_delivery']) ? $res['data']['default_delivery'] : array();
		// $this->renderJson($res);
		$this->_view->assign(array(
					'address' => $address,
					'number' => $number
				));	
	}


	/**
	 * 商品下单
	 * @return [type] [description]
	 */
	public function doConfirmGoodsAction(){
		$goodsId = intval($this->getParam('goods_id'));
		$groupId = intval($this->getParam('group_id'));
		$proId = intval($this->getParam('pro_id'));
		$number = intval($this->getParam('number'));
		$deliveryId = intval($this->getParam('delivery_id'));
		if(empty($goodsId) || $number<1){
			$this->errorOutput('4001','缺少参数');
		}

		$param = array(
				'goods_ids' => $goodsId,
				'user_id' => $this->uid,
				'goods_number' => $number,
				'group_id' => $groupId,
				'pro_id' => $proId,
				'phone_encode' => baf_Des::encrypt(api_CoreHelper::getCookie('phone')),
				'delivery_id' => $deliveryId
			);
		$res = api_Order::insertGoodsOrder($param);
		$this->renderJson($res);
	}
	
}