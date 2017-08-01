<?php
abstract class OpenbaseController extends Yaf_Controller_Abstract
{
	protected $uid = 0;
	protected $userInfo = array();
	protected $params;
	protected $isAjax;
	protected $_runStartTime;
	protected $utmSource;
	protected $utmMedium = 'wap';
	protected $openType; //第三方类型标识
	protected $openUserInfo; //第三方用户信息array(open_id,access_token,union_id,avatar,nick_name);
	protected $cancelOpenOrder = 0; //取消订单是否通知第三方取消订单
	
	const KOUBER_PAY_TYPE = 21;	//口碑支付类型

	/**
	 * 订单支付的有效期(单位： 秒)	 *
	 * @var int
	 */
	protected $orderPayExpire = 600;

	/**
	 * 订单状态
	 */
	protected $orderStatus = array(
			0 => '未支付',
			1 => '待开始',
			2 => '已取消',
			3 => '已消费',
			4 => '已过期',
			5 => '已退款',
			6 => '会员预订'
	);
	
	/**
	 * 退款状态
	 */
	protected $refound = array(
			0 => '未退款',
			1 => '退款中',
			2 => '已退款'
	);

	/**
	 * 初始化
	 */
	protected function init(){
		$this->initParams();
		$this->initSession();
		$this->getUser();
		$this->setSession(array('open_utm_source'=>$this->utmSource));
	}

	protected function initSession(){
		$sessionHanlder = new baf_SessionRedis();
		session_set_save_handler(
		array($sessionHanlder,'open'),
		array($sessionHanlder,'close'),
		array($sessionHanlder,'read'),
		array($sessionHanlder,'write'),
		array($sessionHanlder,'destroy'),
		array($sessionHanlder,'gc')
		);
		if(!isset($_SESSION)) session_start();
	}

	/**
	 * 设置城市
	 */
	protected function initCity($cityId){
		if(!empty($cityId)){
			$open_city = api_Court::cities(array());
			if($open_city){
				foreach ($open_city as $k => $v) {
					if(!empty($v['city_id']) && !empty($v['city_name'])) $cityids[$v['city_id']] = $v['city_name'];
				}
				if(!empty($cityids[$cityId])){
					api_CoreHelper::setCookie('city_id', $cityId, 30*3600*24); //30天有效
            		api_CoreHelper::setCookie('city_name', $cityids[$cityId], 30*3600*24); //30天有效
				}
			}
		}
	}

	/**
	 * 获取用户信息
	 */
	protected function getUser(){		
		$uid = api_CoreHelper::getCookie('uid');			
		//从cookies获取uid
		if(!empty($uid)){
			$uid 		=  api_CoreHelper::authcode($uid,'DECODE',ENCODE_KEY);
			$phone = api_CoreHelper::getCookie('phone');	
			if($uid > 0){
				$this->uid = $uid;
				$this->userInfo = array(
					'user_id' => $this->uid,
					'phone' => $phone
					);
				$this->setLogin();
			}
		}
	}

	/**
	 * 获取请求参数
	 */
	protected function initParams(){
		$header_x = isset($_SERVER['HTTP_X_REQUESTED_WITH']) ? $_SERVER['HTTP_X_REQUESTED_WITH'] : '';
		$this->isAjax = strtolower($header_x) == 'xmlhttprequest' ? true : false;
		$this->_runStartTime = RUMSTARTTIME; //记录执行时间
		$this->params = array_merge($_GET,$_POST);	
		$this->params = $this->checkRequestParam($this->params);
	}

	/**
	 * 验证请求参数合法性
	 */
	private function checkRequestParam(array $param){
		$fiter = '/\'|<|>|<\s*script\b|\bexec\b|\beval\b|(CREATE|ALTER|DROP|TRUNCATE)\s+(TABLE|DATABASE)\b|(SELECT|DELETE).+?FROM\b|UPDATE\b.*SET\b/is';
		foreach ($param as $key => $value) {
			if(is_array($value)){
				$param[$key] = $this->checkRequestParam($value);
			}else{
				if (preg_match($fiter, $value) == 1){
					baf_FileLog::log2File( json_encode(array(
						'url' => 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'].'?'.$_SERVER['QUERY_STRING'],
						'data' => $this->params
					)), 'web_attack');
					include APP_PATH.'/application/views/error/404.html';
					exit;
				}
			}
		}
		return $param;
	}

	/**
	 * 获取参数
	 *
	 * @param string $name         参数名称
	 * @param mixed  $defaultValue 参数不存在时的默认值
	 * @return mixed
	 */
	protected function getParam($name, $defaultValue = null)
	{		
		if (isset($this->params[$name])) {
			return $this->params[$name];
		}
		return $defaultValue;
	}


	/**
	 * 设置登录的有效时间
	 */
	private function setLogin(){
		api_CoreHelper::setCookie('timeLimit',1,1800);
	}

	public function indexAction(){
		exit;
	}

	/**
	 * 快捷登录
	 */
	public function quickLoginAction(){
		//自动加载视图
		$this->_view->assign(array('uid'=>$this->uid,'phone'=>!empty($this->userInfo['phone']) ? $this->userInfo['phone'] : ''));
	}


	/**
	 * 退出登录
	 */
	public function logoutAction(){
		Yaf_Dispatcher::getInstance()->autoRender(FALSE);
		$this->clearLoginCookie();
		$res = array(
				'code' => 1,
				'msg' => 'success'
			);
		$this->readJson($res);
	}

	/**
	 * 选择卡券
	 */
	public function selectCouponAction(){
		if($this->getRequest()->isPost()){
			$goodsIds = $this->getParam('goods_ids');
			$orderType = $this->getParam('order_type');
			$amount = intval($this->getParam('amount'));
			$nums = intval($this->getParam('goods_nums')); //人次商品选择时的商品数 用于优化选券流程
			$param = array(
					'user_id' => $this->uid,
					'entry' => 1,
					'goods_ids' => $goodsIds,
					'order_type' => $orderType,
					'utm_source' => $this->utmSource //来源渠道
			);
			$couponList = array();
			try {
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
						if($v['ticket_type']!=1 && $v['ticket_type']!=2) continue;//显示代金券、运动券
						$array[] = $v;
					}
					$couponList = $array;
				}
			} catch (Exception $e) {
				baf_FileLog::log2File($e->__toString(), 'coupon_api_error');
			}
			$this->_view->assign(array('couponList'=>$couponList, 'entry'=>1, 'nums'=>$nums));
		}
	}

	public function bookAction(){
		$venuesId = intval($this->venuesInfo['venues_id']);
		$cid = intval($this->getParam('cid'));
		if(!$cid && !empty($this->defaultCatId)) $cid = $this->defaultCatId;
		$dateTime = $this->getParam('t');
		if($dateTime<1) $dateTime = strtotime(date('Y-m-d'));

		$param = array(
            'category_id' => $cid,
            'business_id' => $venuesId,
            'ver' => '1.1',
        	'user_id' => $this->uid	
        );
        //读取场馆信息
        $detail = array();
        $res = api_Court::groundInfo($param);
        if(!empty($res['status']) && $res['status']=='0000'){
        	$detail = !empty($res['businesses']) ? $res['businesses'] : array();
        	if(empty($detail)) $this->redirectMessage('场馆不存在');
        	if($detail['is_delete']==1) $this->redirectMessage('场馆已下线');
        	if($detail['order_type']!=0) $this->redirectMessage('当前场馆类型不支持场地预定');
        }else{
        	$this->redirectMessage('场馆不存在');
        }
        if(isset($res['businesses']['is_relay']) && $res['businesses']['is_relay']==1){
        	$this->redirectMessage('抱歉，该场馆暂时无法提供服务，请预订其他场馆。');
        }
		$date_now = strtotime(date('Y-m-d', time()));//现在日期
        $t = intval(($dateTime - $date_now) / 86400);
        if ($t > 6 || $t < 0) $this->redirectMessage('场馆只开放一周内的场地预定哦');

        //场地列表
        $bookData = array();
        $bookParam = array(
            'category_id' => $cid,
            'business_id' => $venuesId,            
            'book_date' => date('Y-m-d', $dateTime),
            'utm_source' => $this->utmSource,
            'utm_medium' => $this->utmMedium
        );
        if($this->uid) $bookParam['user_id'] = $this->uid;

        $bookRes = api_Court::getVenueBookingDate($bookParam);//新接口
        if(!empty($bookRes['status']) && $bookRes['status']=='0000'){
        	$bookData = !empty($bookRes['data']) ? $bookRes['data'] : array();
        }else{
        	$this->redirectMessage('无可预订场地');
        }
        //统一book_date防止订场日期不一致
        if(!empty($bookData['book_date']) && $dateTime!=$bookData['book_date']){
        	if(!empty($bookData['date_list'])){
        		$this->redirect('book?cid='.$cid.'&t='.$bookData['date_list'][0]);
        		exit;
        	}else{
        		$this->redirectMessage('订场日期有误');
        	}
        }
        
        $due_data = array();
        //获取未支付订单数
        if ($this->uid) {
            $param = array('user_id' => $this->uid, 'ver' => '1.1');
            $due = api_Order::orderDueCount($param);
            if (isset($due['status']) && $due['status'] == SUCCESS_STATUS) {
                $due_data = $due['data'];
            }
        }

        //页面不缓存
        header("Cache-Control:no-cache,must-revalidate,no-store"); //这个no-store加了之后，Firefox下有效
        header("Pragma:no-cache");
        header("Expires:-1");

        $this->_view->assign(array(
            'bookData' => $bookData,
            'venuesId' => $venuesId,
            'catId' => $cid,
            'dateTime' => $dateTime,
            'weekarray' => api_CoreHelper::getWeek(),
            'due_data' => $due_data,
            'detail' => $detail
        ));


	}


	public function personAction(){

	}

	public function personDetailAction(){

	}

	public function myOrderAction(){
		$venuesId = intval($this->venuesInfo['venues_id']);

		$city_category = $this->getCityCategory();//获取分类

		$type = isset($_REQUEST['type']) && in_array(intval($_REQUEST['type']), array(0, 1, 2)) ? intval($_REQUEST['type']) : 0;
		$param = array(
			'user_id'=>$this->uid,
			'type' => $type
		);
		$res = api_Order::orderList($param);
		$orderList = array();
		if(isset($res['status']) && $res['status']=='0000'){
			$orderList = !empty($res['data']) ? $res['data'] : array();
			if ( !empty($orderList) ) {
				foreach ($orderList as $key => $value) {

					if ( isset($value['utm_source']) && $value['utm_source'] != 'koubei' ) {
						unset($orderList[$key]);
						continue;
					}
					//非当前场馆不显示
					if (intval($value['business_id']) != $venuesId) {
						unset($orderList[$key]);
						continue;
					}
					if (isset($value['order_type']) && $value['order_type'] != '0') {
						unset($orderList[$key]);
						continue;
					}

					//分类名称
					$cat_title = '-';
					if ( isset($city_category[ $value['cat_id'] ]) && !empty($city_category[ $value['cat_id'] ]) ) {
						$cat_title = $city_category[ $value['cat_id'] ];
					}
					$orderList[$key]['cat_title'] = $cat_title;


					$start_date = '-';
					if (in_array($value['order_type'], array(0,1))) {
						//人次
						if ($value['order_type'] == 1) {
							$start_date = '不限';
						}
						//场次
						elseif ($value['order_type'] == 0) {
							$start_date = date('Y-m-d', $value['book_date']).' '.api_CoreHelper::getWeek(date('w', $value['book_date']));
						}
					}
					$orderList[$key]['start_date'] = $start_date;

					//场地列表
					$courses_list = array();
					if ($value['order_type'] == 0) {
						if ( isset($value['order_goods_arr']['fields']) && !empty($value['order_goods_arr']['fields']) ) {
							foreach ($value['order_goods_arr']['fields'] as $value) {
								$courses_list[] = "{$value['field_name']} ".date('H:i', $value['start_time'])."～".date('H:i', $value['end_time'])."";
							}
						}
					}
					$orderList[$key]['courses_list'] = $courses_list;

					unset($orderList[$key]['order_goods_arr']);
				}
			}
		}

		$this->_view->assign(array(
				'orderList'=>$orderList,
				'type' => $type,
				'orderStatus' => $this->orderStatus,
				'refound' => $this->refound
		));
	}

	/**
	* 第一步：订单确认页
	*/
	public function confirmOrderAction(){
		//读取场次信息
		$goods_ids = $this->getParam('goods_ids');
		$book_date = $this->getParam('book_date');
		$court_name = $this->getParam('court_name');
		$category_name = $this->getParam('category_name');
		$ccourse_name = $this->getParam('course_name');
		$allCourse_name = $this->getParam('allcourse_name','');
		$hour = $this->getParam('hour');
		$realTime = $this->getParam('real_time');
		$price = $this->getParam('price');
		$businessId = (int) $this->getParam('bid'); // 场馆id
		$categoryId = (int) $this->getParam('cid'); // 分类id
		$orderType = intval($this->getParam('order_type', 0)); //订单类型

		$this->setReturnUrl($this->redirectUrl());//设置回跳url
		if($this->uid < 1){			
			$this->redirect('quickLogin');
			exit;
		}
		asort($hour);//对时间排序

		$course = $courseTmp = array();
		//组合场次的信息
		$goods_amount = 0;
		foreach ($hour AS $key => $v) {
			$arr = array();
			$arr['course_name'] = $ccourse_name[$key];
			$arr['hour'] = $v;
			$arr['price'] = $price[$key];
			$arr['real_time'] = $realTime[$key];
			$courseTmp[$ccourse_name[$key]][] = $arr;
			$goods_amount += floatval($arr['price']);
		}
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
		
		//是否已登录
		$user_id = $this->uid;
		$data = array();
		$user = array();
		if ($user_id > 0){
			$user = $this->userInfo;
			//读取优惠价格, 使用新版本
			$param = array(
				'user_id' => $this->uid, 
				'goods_ids' => $goods_ids, 
				'order_type'=> $orderType,
				'utm_medium' => $this->utmMedium,
				'utm_source' => $this->utmSource
			);
			$res = api_Order::confirmOrder($param);
			if (is_array($res) && isset($res['status']) && $res['status'] == SUCCESS_STATUS) {
				$data = $res['data'];//正确
			}
			else{
				$this->redirectMessage('服务器忙，请稍后重试');
			}
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
				//取消未支付订单
				if(!empty($due_data) && isset($due_data['order']['order_id'])){
					$paramc = array(
						'order_id' => $due_data['order']['order_id'],
						'user_id'  => $this->uid,
					);
					if($this->cancelOpenOrder) $paramc['cancel_open_order'] = $this->cancelOpenOrder;//通知第三方取消订单
					$cancelRes = api_Order::orderCancel($paramc);
					if(!empty($cancelRes['status']) && $cancelRes['status']=='0000'){
						unset($due_data);
					}
				}
			}
		}

		//是否支持退款
		$is_refund = isset($this->venuesInfo['category'][$categoryId]['is_refund']) ? 
						$this->venuesInfo['category'][$categoryId]['is_refund'] : 0;
		$assignData = array(
			'promote' 		=> $data,
			'goods_ids' 	=> $goods_ids,
			'course' 		=> $course,
			'book_date' 	=> $book_date,
			'court_name' 	=> $court_name,
			'user' 			=> $user,
			'goods_amount'	=> $goods_amount,
			'category_name' => $category_name,
			'businessId' 	=> $businessId,
			'categoryId' 	=> $categoryId,
			'orderType' 	=> $orderType,
			'weekarray' 	=> api_CoreHelper::getWeek(),
			'hash' 			=> md5($goods_ids.$businessId.$categoryId.WAP_HASH_KEY),
			'payType' 		=> $payType,
			'due_data' 		=> isset($due_data) ? $due_data : '',	//获取未支付订单数
			'act_id' 		=> 0,
			'is_refund' 	=> $is_refund,	//是否支持退款
		);
		$this->setPageTitle('订单确认-趣运动');
		$this->_view->assign($assignData);
	}

	/**
	* 第二步：提交订单
	*/
	public function doconfirmAction(){
		$orderType = (int) $this->getParam('order_type', 0); // 订单类型
		
		switch ($orderType) {
			case 0 : // 场次商品
				$this->doconfirmGeneral();
				break;
			case 1 : // 人次商品
			case 2 : // 特惠商品
				$this->doconfirmPerson($orderType);
                break;
			case 8:	//拼场订单
				$this->doConfirmCourtPool();	
				break;
		}
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
		$ticket_type= $this->getParam('ticket_type', 0); //代金券类型
		$hash       = $this->getParam('hash');
		$payType	= $this->getParam('pay_type'); //支付方式
		if($payType == 'usercard'){
			$cardNo = $this->getParam('card_no');//会员卡号
		}
		
	
		// 验证数据传输的完整性
		$md5Hash = md5($goods_ids.$businessId.$categoryId.WAP_HASH_KEY);
	
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
		$param = array('user_id' => $user_id, 'goods_ids' => $goods_ids, 'order_type'=> 0);
		$param['utm_source'] = $this->utmSource;//来源渠道
		$res = api_Order::confirmOrder($param);
		if (is_array($res) && isset($res['status']) && $res['status'] == SUCCESS_STATUS) {			
			$isCardUser = $res['data']['is_card_user'];
		}	
	
		//订单提交
		$insertParam = array(
				'goods_ids' => $goods_ids,
				'user_id' => $user_id,
				'open_uid' => !empty($this->openUserInfo['open_id']) ? $this->openUserInfo['open_id'] : '',
				'act_id' => $act_id,
				'phone'=> $phone,
				'from' => $from,
				'order_type' => 0,
				'utm_medium' => $this->utmMedium, //如果是外部来源 则记录外部来源标识
				'utm_source' => $this->utmSource //来源渠道
		);
		if($couponId > 0){ 
			$insertParam['coupon_id'] = $couponId;
			$insertParam['ticket_type']=$ticket_type;
		}
		
		//优惠券使用
		$insertParam['coupon_id'] = $couponId;
		if($isCardUser && isset($cardNo) && $cardNo){
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
				$des = new baf_Des();
				$payIdValue = $des->encrypt($payType);
				api_CoreHelper::setCookie('pay_id', $payIdValue, 1296000); //保存15天
			}
			if ($insert['status'] == SUCCESS_STATUS) {
				$data = array(
						'code' => 1,
						'msg' => 'success',
						'data' => array(
							'order_id' => $insert['data']['order_id'],
							'hash' =>md5($insert['data']['order_id'] . WAP_HASH_KEY)
							)
					);
				$this->readJson($data);
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
     * 未支付订单
     */
    public function getOrderDueAction(){
        if($this->uid){
            $param = array('user_id' => $this->uid, 'ver' => '1.1');
            $due = api_Order::orderDueCount($param);
            if (isset($due['status']) && $due['status'] == SUCCESS_STATUS) {
                $this->readJson(baf_ResCode::msg('', $due['data']));
            }else{
                $this->readJson(baf_ResCode::msg(baf_ResCode::SYSTEM_ERROR));
            }
        }
    }

	public function confirmOrderPersonAction(){

	}

	/**
	 * 订单详情
	 * @return [type] [description]
	 */
	public function orderDetailAction(){
		$orderId = intval($this->getParam('order_id'));
		if($orderId > 0){
			$orderRes = api_Order::getOrderInfo(array('order_id'=>$orderId,'ver'=>'1.4'));
		}
		if($orderId<1 || empty($orderRes['status']) || $orderRes['status']!='0000' || empty($orderRes['data'])){
			$this->redirectMessage('订单不存在');
		}

		$orderInfo = $orderRes['data'];

		//场地列表
		$courses_list = array();
		if ($orderInfo['order_type'] == 0 && !empty($orderInfo['goods_list'])) {
			foreach ($orderInfo['goods_list'] as $value) {
				$courses_list[] = "{$value['course_name']} ".date('H:i', $value['start_time'])."～".date('H:i', $value['end_time'])."";
			}
		}
		$orderInfo['courses_list'] = $courses_list;

		if(!empty($orderInfo['book_date'])){
			$orderInfo['start_date'] = date('Y-m-d', $orderInfo['book_date']).' '.api_CoreHelper::getWeek(date('w',$orderInfo['book_date']));
		}
		
		$this->_view->assign(array(
				'orderInfo'=>$orderInfo,
				'orderStatus' =>$this->orderStatus
		));
	}

	public function paylistAction(){

	}

	/**
	* 第三步：支付
	*/
	public function payAction(){
		//用户是否登录
		if (!$this->uid) {
			$this->setReturnUrl($this->redirectUrl());
			$this->redirect('book');
			exit;
		}
		
		$order_id = $this->getParam('id');
		
		if (!$order_id || !is_numeric($order_id)) {
			$this->redirectMessage('缺少请求参数');
		}
		
		//获取订单详情
		$param = array(
			'order_id' => $order_id,
			'user_id' 	=> $this->uid,
			'ver' 		=> '1.3',
		);
		
		$order = array();
		$orderRes = api_Order::orderDetail($param);
		if(isset($orderRes['status']) && $orderRes['status']=='0000'){
			$order = !empty($orderRes['data']) ? $orderRes['data'] : array();
			$order['status'] = $orderRes['status'];
		}
		else{
			$this->redirectMessage('订单不存在');//失败提示
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
			$this->redirectMessage($msg);
		}
		
		if (($order['add_time'] + $this->orderPayExpire) < CURRENT_TIMESTAMP) {
			$this->redirectMessage('订单已经过期， 自动取消');
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

		$this->setPageTitle('订单支付-趣运动');
		$this->_view->assign(array(
			'order' => $order, 
			'cardInfo' => $cardInfo, 
			'payIds'=>$payIds, 
			'issetPw'=>$issetPw
		));
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

		//兼容app
		$useWallet = $useWallet ? $useWallet : intval($this->getParam('u_w'));
		// 支付类型
		$payTypeArr = array(
			'5',	// 微信支付
			'13',	// 支付宝支付(wap)
			'15',	// 会员卡支付(wap)
			'16',	// 银联在线支付(wap)
			'21',	// 口碑支付(wap)
		);
		if (in_array($payId, array(13, 16))) {
			// 银联支付、支付宝支付不是使用ajax请求
			$this->_doPay();
			exit;
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
		$userId  = $this->uid;
		$useWallet = intval($this->getParam('use_wallet'));		//使用金额支付
		$walletPwdKey = $this->getParam('wpk');		//支付密码
		$md5Hash = md5($orderId.WAP_HASH_KEY);
		$useWallet = $useWallet ? $useWallet : intval($this->getParam('u_w'));
		// 支付类型
		$payTypeArr = array(
			'5',   // 微信支付
			'13',  // 支付宝支付(wap)
			'15',  // 会员卡支付(wap)
			'16',  // 银联在线支付(wap)
		);
	
		if ($userId < 1) {
			//未登录跳回至订场首页
			$this->redirectMessage('请先登录');
			//$this->redirect('book');
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
				$url = 'payOk?id=' . $orderId;
				if($this->utmSource) $url .= '&utm_source='.$this->utmSource;
				// 直接跳转到支付成功页面
				$this->redirect($url);
				exit;
			} else {
				// 支付失败或获取支付参数失败
				$this->redirectMessage((isset($res['msg']) && $res['msg']) ? $res['msg'] : '操作失败，未知错误');
			}
		} else {
			$this->redirectMessage('网络繁忙，请稍后重试');
		}
	}

	public function payokAction(){
		//订单ID
		$order_id = (int) $this->getParam('id', 0);
		
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
			$order['status'] = $orderRes['status'];
		}else{
			//失败提示
			$this->redirectMessage('网络繁忙，请稍后重试');
		}
		//拼场订单
		if ( $order['order_type'] == 8 ){
			//拼场订单详情 
			$order = api_Order::cporder_info($order_id);
			if (empty($order)){$this->redirectMessage('订单记录不存在');}
			
// 			print_r($order);
			$this->_view->assign(array('order' => $order));
			Yaf_Dispatcher::getInstance()->autoRender(FALSE);
			$this->getView()->display('order/payok_cp.php');
		}
		else {
			$this->setSession(array('vip_pay_use'=>''));
		$this->setPageTitle('订单成功-趣运动');
		$this->_view->assign(array('order' => $order));
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
	 * 检查登录
	 */
	public function checkloginAction(){
		if($this->uid > 0){
			$res = array(
				'code' => 1,
				'msg' => 'logined'
			);
		}else{
			$res = array(
				'code' => 0,
				'msg' => 'not login'
			);
		}		
		$this->readJson($res);
	}

	public function loginAction(){
		$phone = trim($this->getParam('phone', ''));
		$code = trim($this->getParam('code', ''));
		try {
			if(!api_CoreHelper::isMobile($phone)) throw new Exception("手机号码不正确");
			if(empty($code)) throw new Exception("验证码不能为空");
			
			$apiParam = array(
				'phone' => $phone, 
				'sms_code' => $code, 
				'utm_medium' => $this->utmMedium,
				'utm_source' => $this->utmSource
				);
	        $loginRes = api_User::phoneQuckLogin($apiParam);
	        
	        //登录成功
	        if (is_array($loginRes) && isset($loginRes['status'])) {
	            if ($loginRes['status'] == '0201') {
	            	throw new Exception(baf_ResCode::getMsg(baf_ResCode::USERNAME_NOT_FOUND));
	            }
	            if ($loginRes['status'] == '0222') {
	            	throw new Exception(baf_ResCode::getMsg(baf_ResCode::SMSCODE_ERR));
	            }

	            if ($loginRes['status'] == SUCCESS_STATUS) {
	                $user = array(
	                    'user_id' => $loginRes['user_id'],
	                    'phone' => $loginRes['phone'],
	                    'nick_name' => $loginRes['nick_name'],
	                    'avatar' => $loginRes['avatar'],
	                );
	                api_WxUser::setLoginCookie($user, LOGIN_TIME_LIMIT);
	                $returnUrl = $this->getReturnUrl();
	                $res = array(
	                		'code'=>1,
	                		'msg' => '登录成功',
	                		'url' => $returnUrl ? $returnUrl : 'index'
	                	);
	            } else {
	                //出错提示信息
	                if (isset($loginRes['msg'])) {
	                	throw new Exception($loginRes['msg']);
	                } else {
	                	throw new Exception(baf_ResCode::getMsg(baf_ResCode::SYSTEM_ERROR));
	                }
	            }
	        } else {
	        	throw new Exception(baf_ResCode::getMsg(baf_ResCode::SYSTEM_ERROR));
	        }
		} catch (Exception $e) {
			$res = array(
				'code' => 0,
				'msg' => $e->getMessage()
			);
		}		
		$this->readJson($res);		
	}

	protected function getCardList(){
		$param = array(
            'user_id' => $this->uid,
            'phone' => api_CoreHelper::getCookie('phone') ? api_CoreHelper::getCookie('phone') : api_WxUser::$phone,
        );
        if(!empty($_SESSION['wechat_id'])){
        	$wechatInfo = api_WxApi::appId();
        	if(!empty($wechatInfo['venues_id'])) $param['venues_id'] = $wechatInfo['venues_id'];
        }
        $cardRes = api_UserCard::getCardList($param);
	}

	/**
	 * 提示信息页面
	 *
	 * @param string $message 提示信息
	 * @return void
	 * @author xiaosibo
	 */
	protected function redirectMessage($message, $url='', $time=3)
	{
		$this->setPageTitle('信息提示_趣运动');
		$this->_view->assign(array('message' => $message, 'url'=>$url, 'time'=>$time));
		Yaf_Dispatcher::getInstance()->autoRender(FALSE);
		$this->getView()->display('show_message.php');
		exit;
	}

	protected function setPageTitle($title=''){
		$this->_view->assign('pageTitle', $title);
	}

	/**
	 * 输出json
	 * @param array $data
	 */
	protected function readJson($data){
		if(!is_array($data) || empty($data)){
			$data = array('code'=>3036,'msg'=>'error');
		}
		echo json_encode($data);
		exit;
	}

	/**
	 * 记录session
	 * @param array $data
	 */
	protected function setSession(array $data){
		foreach ($data as $k=>$v){
			$_SESSION[$k] = $v;
		}
	}
	
	/**
	 * 查询session
	 * @param unknown $key
	 */
	protected function getSession($key){
		return isset($_SESSION[$key]) ? $_SESSION[$key] : '';
	}


	/**
	* 获取城市运动项目列表
	* 
	* 
	*/
	public function getCityCategory(){
		$city_id = api_CoreHelper::getCookie('city_id');
		$courtKey = '7yundong:court_category_list:'.$city_id;
		//获取分类
		$categoryList = array();
        $categoryVal = baf_Redis::factory()->get($courtKey);
        if($categoryVal){
           $categoryList = unserialize($categoryVal);
        }else{
            $res = api_Court::getIndex( array('city_id' => $city_id) );
            if (is_array($res) && isset($res['status']) && $res['status'] == SUCCESS_STATUS) {
                $categoryList = $res['data']['categories'];
                baf_Redis::factory()->set($courtKey,serialize($categoryList),300);
            }
        }
        $data = array();
        if (!empty($categoryList)) {
        	foreach ($categoryList as $value) {
        		$data[ $value['category_id'] ] = $value['category_name'];
        	}
        }
        return $data;
	}

	/**
	 * 查询回跳url
	 */
	protected function getReturnUrl(){
		$key = '__return_url';
		$val = !empty($_SESSION[$key]) ? $_SESSION[$key] : '';
		unset($_SESSION[$key]);
		return $val;
	}
	
	/**
	 * 设置回跳url
	 * @param string $url
	 */
	protected function setReturnUrl($url){
		$key = '__return_url';
		$_SESSION[$key] = $url;//18分钟过期时间
	}

	//跳转的url
	protected function redirectUrl(){
		// 还原url
		$server_name = baf_Base::base_url(); //api_CoreHelper::getOption ( 'www_domain', 'http://m.quyundong.com' );		
		// 还原url
		$requestUrl = "{$server_name}{$_SERVER['REQUEST_URI']}";
		// 解析url
		$parse = parse_url ( $requestUrl );
		$query = array ();
		if (! isset ( $parse ['query'] )) {
			$parse ['query'] = '';
		}
		parse_str ( $parse ['query'], $query );
	
		//删除src参数
		if (isset($query['src'])) {
			unset($query['src']);
		}
		$queryStr = http_build_query ( $query );
		return "{$server_name}{$parse['path']}?{$queryStr}";
	}


	/**
	 * 清楚登录cookie
	 */
	protected function clearLoginCookie(){
		api_CoreHelper::setCookie('timeLimit','',0);
		api_CoreHelper::setCookie('uid','',0);
		api_CoreHelper::setCookie('userToken','',0);
		api_CoreHelper::setCookie('openId','',0);
		api_CoreHelper::setCookie('nick_name','',0);
		api_CoreHelper::setCookie('avatar', '', 0);
		api_CoreHelper::setCookie('phone','',0);
		api_CoreHelper::setCookie('headimgurl', '', 0);
	}



	/**
    * 查询口碑会员数据
    */
    public static function queryKbUser( $field='' ){
    	$kb_auth_user = array();
    	if (isset($_SESSION['kb_auth_user'])) {
    		$kb_auth_user = unserialize($_SESSION['kb_auth_user']);
    	}
    	if (!empty($field)) {
    		if (!empty($kb_auth_user) && isset($kb_auth_user[$field])) {
    			return $kb_auth_user[$field];
    		}
    		return false;
    	}
    	return $kb_auth_user;
    }

    /**
    * 保存口碑会员数据
    * 
    */
    public static function saveKbUser( $ali_data ){
    	$_SESSION['kb_auth_user'] = serialize(array(
    		'access_token' => $ali_data['access_token'],
    		'open_id' 	=> $ali_data['open_id'],
    		'nick_name' => $ali_data['nick_name'],
    		'gender' 	=> $ali_data['gender'],
    		'avatar' 	=> $ali_data['avatar'],
    	));
    	return true;
    }


    
	/**
     * 获取第三方绑定 手机验证码
     */
    public function getOpenSmsCodeAction()
    {

        $username = $this->getParam('phone');
        
        //验证码
        if (preg_match('/1[2345678]{1}\d{9}$/', $username) == 0) {
            $this->readJson(baf_ResCode::msg(baf_ResCode::PHONE_ERROR));
        }

        //begin 一天只能获取固定次数的验证码
        $limitKey = 'sms_code_day_limit_' . $username;
        $dayRes = $this->cache()->get($limitKey);
        if ($dayRes >= 10) {
            $this->readJson(baf_ResCode::msg(baf_ResCode::GET_SMS_CODE_DAYLIMIT));
        }

        if ($this->smscodeGetLimit($username . '_retister_smscode')) {
            $this->readJson(baf_ResCode::msg(baf_ResCode::SMSCODE_TIME_LIMIT));
        }

        $checkParam["type"] = "7";
        $checkParam["phone"] = $username;
        $checkParam["open_type"] = $this->openType;
        $checkParam['union_source'] = 'qydapp';

        $smsRes = api_Sms::sendSmsCode($checkParam);
        if (is_array($smsRes) && isset($smsRes['status']) && $smsRes['status'] == SUCCESS_STATUS) {
            $this->cache()->set($limitKey, $dayRes + 1, 24 * 60 * 60); // 60s
            $this->smscodeGetLimit($username . '_retister_smscode', 1);
            $this->readJson(baf_ResCode::msg());
        }
        elseif(is_array($smsRes) && isset($smsRes['status']) && $smsRes['status'] == '0903'){
            $this->readJson(baf_ResCode::msg(baf_ResCode::ERR_PHONE_HAS_BAND));

        }
        else {
            $this->readJson(baf_ResCode::msg(baf_ResCode::GET_SMS_CODE_ERROR));
        }
        return false;//关闭视图
    }

    /**
     * 更换绑定
     */
    public function changeUnionAction(){
    	$this->_view->assign(array('uid'=>$this->uid,'phone'=>!empty($this->userInfo['phone']) ? $this->userInfo['phone'] : ''));
    }

    /**
     * 解除绑定
     */
    public function removeUnionAction(){
    	if($this->isAjax){
	    	$param = array(
					'user_id' => $this->uid,
					'open_type' => $this->openType
				);
			$res = api_User::commonUnionRemove($param);
			if (isset($res['status']) && $res['status'] == SUCCESS_STATUS) {
				//退出当前用户
				$this->clearLoginCookie();
				$res = array(
					'code' => 1,
					'msg' => 'success'
				);
				$this->readJson($res);
			}else{
				baf_Common::log('removeUnion_error', 'EMERG', 'removeUnionAction', json_encode(array(
		                'param'       => $param,
		                'res'   => $res,
		                'openUserInfo' => $this->openUserInfo
		            )));
				$res = array(
					'code' => 0,
					'msg' => !empty($res['msg']) ? $res['msg'] : baf_ResCode::msg(baf_ResCode::SYSTEM_ERROR)
				);
				$this->readJson($res);
			}			
    	}else{
    		exit;
    	}    	
    }

    /**
     * 第三方帐号绑定
     */
    public function unionBindAction()
    {
    	if($this->isAjax && !empty($_POST)){
	    	//微信授权
	        $phone = $this->getParam('phone', '');
	        $sms_code = $this->getParam('sms_code', '');

	        //若第三方用户信息不存在，则返回失败提示
	        if(empty($this->openUserInfo)){
	        	$this->readJson(baf_ResCode::msg(baf_ResCode::ERR_OPEN_INFO_NOTFOUND));
	        }

	        $bindParam = array(
	            'phone' => $phone,
	            'sms_code' => $sms_code,
	            'open_id' => $this->openUserInfo['open_id'],
	            'access_token' => $this->openUserInfo['access_token'],
	            'open_type' => $this->openType,
	            'union_id' => $this->openUserInfo['union_id'],
	            'avatar' => $this->openUserInfo['avatar'],
	            'ver' => '1.1',
	            'nick_name' =>$this->openUserInfo['nick_name'],
	        );
	        
	        $bindRes = api_User::commonUnionBind($bindParam);

	        if (isset($bindRes['status']) && $bindRes['status'] == SUCCESS_STATUS) {
	            $user = array(
	                'user_id' => $bindRes['user_id'],
	                'phone' => $bindRes['phone'],
	                'nick_name' => $bindRes['nick_name'],
	                'avatar' => $bindRes['avatar'],
	            );

	            api_WxUser::setLoginCookie($user, LOGIN_TIME_LIMIT);
	            //获取跳转地址
	            $url = urldecode($this->getReturnUrl());
	            if(!$url) $url = 'index';//无回调地址则回到首页
	            $this->readJson(baf_ResCode::msg('', array('url' => $url)));

	        } else {
	        	baf_Common::log('open_union_bind_error', 'EMERG', 'unionBindAction commonUnionBind error', json_encode(array(
	                'url'       => $this->redirectUrl(),
	                'api_res'   => $bindRes,
	                'api_param' => $bindParam,
	                'openUserInfo' => $this->openUserInfo
	            )));
	            $this->readJson(array('code'=>!empty($bindRes['status']) ? $bindRes['status'] : baf_ResCode::SYSTEM_ERROR, 'msg'=>!empty($bindRes['msg']) ? $bindRes['msg'] : '系统错误'));
	        }
	        return false;//不加载视图
    	}else{
    		if(empty($this->openUserInfo)){
    			$this->authorize();
    			exit;
    		}
    		$this->_view->assign(array('openUserInfo'=>$this->openUserInfo));
    	}        
    }

    /**
    * 第三方联合登录
    */
    protected function unionLogin(){
    	try{    		
    		$union_user = array();
    		//使用第三方登录
			$union_login = api_User::unionLogin( array(
				'open_id'		=> $this->openUserInfo['open_id'],
				'access_token'	=> $this->openUserInfo['access_token'],
				'open_type'		=> $this->openType,
				'union_id'		=> '',
				'nick_name'		=> $this->openUserInfo['nick_name'],
				'union_source'	=> 'qydapp',
				'ver'			=> '2.0'
			));
			$unionlogined = 0;
			if (isset($union_login['status']) && $union_login['status'] == baf_ErrorCode::OK) {
				$union_user = $union_login['data'];
				//设置登录
				if ( isset($union_user['user_id']) && $union_user['user_id']>0){
					$user = array(
		                'user_id' => $union_user['user_id'],
		                'phone' => $union_user['phone_encode'] ? baf_Des::decrypt($union_user['phone_encode']) : '',
		                'nick_name' => $union_user['nick_name'],
		                'avatar' => $union_user['avatar'],
		            );
		            api_WxUser::setLoginCookie($user, LOGIN_TIME_LIMIT);
		            $unionlogined = 1;
				}
			}else{
				baf_Common::log('unionLogin_err', 'EMERG', 'error', array('url'=>$this->redirectUrl(), 'union_login'=>$union_login));
			}

			if(!$unionlogined){
				$this->redirect('unionbind');
				exit;
			}else{
				$url = $this->getReturnUrl();
				if (empty($url)) { $url = 'index'; }
				$this->redirect($url);
				exit;
			}
    	}
    	catch (Exception $e){
    		baf_Common::log('unionLogin_err', 'EMERG', 'error', array('error'=>$e->getMessage(),'openUserInfo'=>$this->openUserInfo));
    		$this->redirectMessage($e->getMessage());
		}
    }

    /**
	 * 缓存　目前仅支持文件缓存
	 * @return baf_FileCache
	 */
	protected function cache(){
		static $cache;
		if(!$cache){
			$cache = new baf_FileCache();
			$cache->init();
		} 
		return $cache;
	}

	/**
     * 手机验证码获取限制
     * @param string $key
     * @param int $set
     * @return string|bool
     */
    private function smscodeGetLimit($key, $set = 0)
    {
        if ($set) {
            return $this->cache()->set($key, 1, 30);//30秒内同类型的验证码只能获取一次
        } else {
            $data = $this->cache()->get($key);
            return $data;
        }
    }

    /**
     * 设置第三方用户信息
     */
    protected function setOpenUserInfo(array $array){
    	foreach ($array as $key => $value) {
    		$_SESSION[$key] = $value;
    	}
    }

}