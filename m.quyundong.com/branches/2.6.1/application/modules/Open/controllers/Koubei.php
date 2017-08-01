<?php 

class KoubeiController extends OpenbaseController
{

	public $koubei_app_id 	= '2016051701408839';//2016051701408841

	//口碑授权回调URL
	protected $qydAuth = 'open/koubei/auth';//Config::get('domain.m')

	const KB_OPEN_TYPE = 'alipay'; 

	protected $alyShopId;	//口碑shop_id
	protected $alyPid;		//口碑商家id
	protected $venuesInfo;
	protected $defaultCatId;
	/**
	 * 初始化
	 */
	protected function init(){
		$this->utmSource = 'koubei';
		$this->openType = 'alipay';
		$this->cancelOpenOrder = 1;//取消订单时通知支付宝取消订单
		parent::init();
		baf_Common::releaseActiveVerifyCode();
		$this->initShop();		
		$this->qydAuth = Config::get('domain.m').$this->qydAuth;//支付宝登录回调地址
		$this->initAliUser();
	}

	/**
	 * 检查联合登录状态
	 */
	protected function checkUnionLogin(){
		$this->checkAliLogin();
		
    	if($this->uid<1 && !$this->isAjax && !in_array($this->getRequest()->getActionName(), array('unionbind'))){
    		$this->unionLogin();
    	}
	}

	/**
	 * 重写确认订单,在提交前验证联合登录
	 */
	public function confirmOrderAction(){
		$this->setReturnUrl($this->redirectUrl());
		$this->checkUnionLogin();
		parent::confirmOrderAction();
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
		if (!$order_id || !is_numeric($order_id)) { $this->redirectMessage('缺少请求参数', 'index');}
		
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
			$this->redirectMessage('订单不存在', 'index');//失败提示
		}
		
		
		// 只有未支付的订单才能进行支付
		if ($order['order_status'] != 0) {
			$msg = '此订单已处理，不能再进行支付';
			switch ($order['order_status']) {
				case 1: $msg = '订单已支付，不能再进行支付'; break;
				case 2: $msg = '订单已取消，不能再进行支付'; break;
			}
			$this->redirectMessage($msg, 'index');
		}
		
		if (($order['add_time'] + $this->orderPayExpire) < CURRENT_TIMESTAMP) {
			$this->redirectMessage('订单已经过期，不能再进行支付', 'index');
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

        //直接发起支付
        $param = array(
				'user_id' => $this->uid, 
				'order_id' => $order['order_id'], 
				'pay_id' => 21,//口碑支付方式
				'koubei_buyer_id' => !empty($this->openUserInfo['open_id']) ? $this->openUserInfo['open_id'] : ''
				);
            
		$res = api_Pay::pay($param);
		if(!empty($res['status']) && $res['status']=='0000' && !empty($res['data'])){
			$this->setPageTitle('订单支付-趣运动');
			$this->_view->assign(array(
				'payInfo' => $res['data'],
				'reflash' => $this->getParam('reflash','')
			));
		}else{
			baf_Common::log('koubei_pay_err', 'EMERG', 'error', array('res'=>$res, 'param'=>$param));

			$msg = '发起支付失败';
			if (isset($res['msg']) && !empty($res['msg'])) { $msg = $res['msg']; }
			$this->redirectMessage($msg, 'index');
		}
	}

	/**
	 * 重写登录为更换支付宝绑定手机号
	 */
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
	            	//登录成功则解绑原支付宝绑定
	            	$unionRemove = $this->unionRemove();

	            	//若解绑失败则中断操作
	            	if(!$unionRemove) throw new Exception(baf_ResCode::getMsg(baf_ResCode::SYSTEM_ERROR));

	            	//绑定新帐号
	            	
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

	/**
	 * 移除第三方绑定
	 */
	protected function unionRemove(){
		$param = array(
				'user_id' => $this->uid,
				'open_type' => $this->openType
			);
		$res = api_User::commonUnionRemove($param);
		if(!$res || empty($res['status']) || $res['status']!=SUCCESS_STATUS){
    		baf_Common::log('commonUnionRemove', 'INFO', 'info', array('res'=>$res));
    		return false;
    	}
	    return true;        	
	}

	public function bookDateAction(){
		$venuesId = intval($this->venuesInfo['venues_id']);
		$data = $this->getBookDate($venuesId);

		$bookDate = [];
		if($data){
			$bookDate  = array_map(function($item){
				$bookLists = !empty($item['book_lists']) ? $item['book_lists'] : array();
				if($bookLists){
					foreach ($bookLists as $arr) {
						$bookItems[] = array(
								'week' => api_CoreHelper::getDateTips($arr['book_date']),
								'title' => date('m-d', $arr['book_date']),
								'tip' =>!empty($arr['num']) ? '剩余'.$arr['num'].'场' : '已订满',
								'price' => intval($arr['price']).'元起',
								'status' => !empty($arr['num']) ? '1' : '0',
								'url' => '/open/koubei/book?cid='.$item['cat_id'].'&t='.$arr['book_date']
							);
					}
				}
				$data = array(
						'cat_id' => $item['cat_id'],
						'cat_name' => $item['cat_name'],
						'items' => $bookItems
					);
				return $data;
			}, $data);
		}
		if(empty($bookDate)){
			$this->log(array(
					'venuesId' => $venuesId,
					'shopId' => $this->shopId,
				), 'no bookDate','ERROR');
			return false;
		}
		$this->_view->assign(array(
	            'data'	=> $bookDate
	        ));
		/**
		 * {
	"staus":"0000",
	"msg":"",
	"data":[
	{
		"cat_name":"羽毛球",
		"items":[
			{
			"title":"今天(04-13)",
			"tip":"剩余8场",
			"price":"9元起",
			"status":"1"
			},
			{
			"title":"周五(04-13)",
			"tip":"剩余8场",
			"price":"10元起",
			"status":"1"
			},
			{
			"title":"周六(04-13)",
			"tip":"剩余8场",
			"price":"9元起",
			"status":"0"
			}
		]
	},
	{
		"cat_name":"篮球",
		"items":[
			{
			"title":"今天(04-13)",
			"tip":"剩余8场",
			"price":"9元起",
			"status":"1"
			},
			{
			"title":"周五(04-13)",
			"tip":"剩余8场",
			"price":"10元起",
			"status":"1"
			},
			{
			"title":"周六(04-13)",
			"tip":"剩余8场",
			"price":"9元起",
			"status":"0"
			},
			{
			"title":"周日(04-13)",
			"tip":"剩余8场",
			"price":"9元起",
			"status":"0"
			}
		]
	}
	]
}
		 */


	}

	private function getBookDate($venuesId){
		$data = api_Venues::getKouBeiVenueBookDate($venuesId);
		return $data;
	}

	/**
	 * 口碑场地预订入口
	 */
	public function indexAction(){
		try{			
			$venuesId = intval($this->venuesInfo['venues_id']);
			$cid = intval($this->getParam('cid'));
			if(!$cid && !empty($this->defaultCatId)) $cid = $this->defaultCatId;
			$book = $this->getParam('book', 0);
			if(!$book){
				/**
				* 订单列表
				*/
				$order_res = api_Order::orderList(array( 'user_id'=>$this->uid, 'type' => 0 ));				
				if(isset($order_res['status']) && $order_res['status']=='0000'){
					$orderList = !empty($order_res['data']) ? $order_res['data'] : array();
					if ( !empty($orderList) ) {
						foreach ($orderList as $value) {
							if ( isset($value['utm_source']) && $value['utm_source'] == 'koubei' && intval($value['business_id']) == $venuesId 
								&& isset($value['order_type']) && $value['order_type'] == '0') {
								$this->redirect('/open/koubei/myOrder');
								exit;
							}
						}
					}
				}	
			}

	        //读取场馆信息
	        $venues_detail = array();
	        $res = api_Court::groundInfo(array(
	        	'category_id' => $cid,
	            'business_id' => $venuesId,
	            'ver' => '1.1',
	        	'user_id' => $this->uid	
	        ));
	        if(!empty($res['status']) && $res['status']=='0000'){
	        	$venues_detail = !empty($res['businesses']) ? $res['businesses'] : array();
	        	if(empty($venues_detail)) 				$this->redirectMessage('场馆不存在');
	        	if($venues_detail['is_delete']==1) 		$this->redirectMessage('场馆已下线');
	        	if($venues_detail['order_type']!=0) 	$this->redirectMessage('当前场馆类型不支持场地预定');
	        }
	        if ( empty($venues_detail) ) {
	        	$this->redirectMessage('场馆不存在');
	        }
	        

	        //获取项目剩余列表
	        $booking_data = array();
	        $booking_res = api_Court::venusApiPut( array( 'action'=>'get_booking_list', 'business_id'=> $venuesId ));
	     	if ( !empty($booking_res) ) {
	     		foreach ($booking_res as $value) {
	     			if ( isset($value['order_type']) && $value['order_type'] == 0 && !empty($value['list'])) {
	     				foreach ($value['list'] as $k => $v) {
	     					$courses_date = date('m-d', $v['book_date']);
	     					if ( date('Ymd', time()) == date('Ymd', $v['book_date']) ){
	     						$courses_date .= '(今天)';
	     					}
	     					else {
	     						$courses_date .= '('.api_CoreHelper::getWeek(date('w', $v['book_date'])).')';
	     					}
	     					$value['list'][$k]['courses_date'] =$courses_date;
	     				}
	     				$booking_data[] = $value;
	     			}
	     		}
	     		//单个项目的场馆,直接跳转到预计页
	     		if ( count($booking_data) == 1 && isset($booking_data[0]['cat_id']) && !empty($booking_data[0]['cat_id']) ){
	     			$this->redirect('book?cid='.intval($booking_data[0]['cat_id']));
	     			exit;
	     		}
	     	}
			$this->_view->assign(array(
	            'booking_data'	=> $booking_data,
	            'venues_detail' => $venues_detail,
	        ));

		}
		catch(Exception $e){
			$this->redirectMessage( $e->getMessage );
		}
	}

	/**
	 * 初始化口碑门店信息
	 */
	protected function initShop(){
		$shopId = 0;
		if($this->getParam('shop_id')){
			$shopId = $this->getParam('shop_id', 0);
			api_CoreHelper::setCookie('shop_id',api_CoreHelper::authcode($shopId,'ENCODE',ENCODE_KEY), LOGIN_TIME_LIMIT);
		}

		$shopIdDes = api_CoreHelper::getCookie('shop_id');
		if($shopIdDes) $shopId = api_CoreHelper::authcode($shopIdDes,'DECODE',ENCODE_KEY);
		$this->shopId = $shopId;
		if($shopId>0){
			try {
				$res = api_OpenApi::getVenuesByKbShopId(array('shop_id'=>$shopId));
				if(!empty($res['status']) && $res['status']=='0000'){
					$vinfo = !empty($res['data']) ? $res['data'] : array();
					if(!empty($vinfo['category'])){
						foreach ($vinfo['category'] as $k => $v) {
							$category[$v['cat_id']] = $v;
						}
						$vinfo['category'] = $category;
					}
					$this->venuesInfo = $vinfo;
					$shopId = !empty($vinfo['shop_id']) ? $vinfo['shop_id'] : 0;
					$aly_cat_id = !empty($vinfo['aly_cat_id']) ? $vinfo['aly_cat_id'] : '';
					$cityId = !empty($vinfo['city_id']) ? $vinfo['city_id'] : 0;
					$venuesId = !empty($vinfo['venues_id']) ? $vinfo['venues_id'] : 0;
					$venuesName = !empty($vinfo['name']) ? $vinfo['name'] : '';

					//设置城市
					$this->initCity($cityId);

					//设置项目
					$this->setCatgory();
				}
			} catch (Exception $e) {
				baf_Common::log('koubei_initshop_err', 'EMERG', 'error', $e->getMessage());
			}
		}else{
			//throw new Exception('门店不存在');
			$message = '门店不存在';
			include APP_PATH.'/application/modules/Open/views/show_message.php';
			exit;
		}
	}

	/**
	 * 设置支付口碑与趣运动项目分类映射
	 */
	protected function setCatgory(){
		$this->defaultCatId = 0;
		$array = array(
			'2015110500080520' => array(40, 16),//'健身中心',
			'2015110500078657' => array(31, 8),//'游泳馆',
			'2015110500078659' => array(41, 17),//'瑜伽',
			'2015110500083341' => array(42, 18),//'舞蹈',
			'2015110500073009' => array(1),//'羽毛球馆',
			'2015110500078658' => array(35, 20),//'桌球馆',
			'2016051600178152' => array(),//'体育场馆',
			'2015110500085004' => array(43, 23),//'武术场馆',
			'2015110500074890' => array(13),//'篮球场',
			'2016051600179926' => array(21),//'保龄球馆',
			'2016051600179925' => array(22),//'高尔夫球场',
			'2015110500075901' => array(11),//'足球场',
			'2015110500077463' => array(12),//'网球场',
			'2015110500077464' => array(6),//'乒乓球馆',
			'2016012900151604' => array(27),//'溜冰场',
			'2016051600181795' => array(0),//'排球场',
			'2016051600183429' => array(25),//'壁球馆'
		);
		$alyCatId = !empty($this->venuesInfo['aly_cat_id']) ? $this->venuesInfo['aly_cat_id'] : '';

		//映射至本地分类
		if($alyCatId && isset($array[$alyCatId])){
			$venuesCat = $array[$alyCatId];
			if($venuesCat){
				foreach ($venuesCat as $key => $value) {
					if(!empty($this->venuesInfo['category']) && in_array($value, $this->venuesInfo['category'])){
						$this->defaultCatId = $value;
						break;
					}
				}
			}
		}
		//否则默认设置为第一个
		if(!$this->defaultCatId && !empty($this->venuesInfo['category'])){
			foreach ($this->venuesInfo['category'] as $key => $value) {
				if($value['order_type']!=0) continue;
				$this->defaultCatId = $value['cat_id'];
			}
			//$defaultCat = current($this->venuesInfo['category']);
			//$this->defaultCatId = !empty($defaultCat['cat_id']) ? $defaultCat['cat_id'] : 0;
		}
	}

	/**
     * 未支付订单 有未支付订单则取消
     */
    public function getOrderDueAction(){
        if($this->uid){
            $param = array('user_id' => $this->uid, 'ver' => '1.1');
            $due = api_Order::orderDueCount($param);
            if (isset($due['status']) && $due['status'] == SUCCESS_STATUS) {
            	//取消未支付订单
            	$due_data = !empty($due['data']) ? $due['data'] : array();
				if(!empty($due_data) && isset($due_data['order']['order_id'])){
					$paramc = array(
							'order_id' => $due_data['order']['order_id'],
							'user_id'  => $this->uid,
					);
					if($this->cancelOpenOrder) $paramc['cancel_open_order'] = $this->cancelOpenOrder;//通知第三方取消订单
					$cancelRes = api_Order::orderCancel($paramc);
					if(!empty($cancelRes['status']) && $cancelRes['status']=='0000'){
						if(!empty($due_data['count'])) $due_data['count']=0;
					}
				}
                $this->readJson(baf_ResCode::msg('', $due_data));
            }else{
                $this->readJson(baf_ResCode::msg(baf_ResCode::SYSTEM_ERROR));
            }
        }
    }


	
    /**
    * 跳转至支付宝用户登录授权
    */
    protected function authorize(){
    	$redirect_uri = "https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?";
    	$redirect_uri.= "app_id=".$this->koubei_app_id."&scope=auth_userinfo";//scope:目前只支持auth_userinfo和auth_base两个值
    	$redirect_uri.= "&state=1&redirect_uri=".urlencode( $this->qydAuth.'?t='.time().mt_rand(10,99) );
    	$this->redirect($redirect_uri);
    	exit;
    }

    /**
    * 支付宝授权登录回调入口
    * 通过用户授权回传的code查询用户信息
    */
    public function authAction(){
    	try {
    		Yaf_Dispatcher::getInstance()->autoRender(FALSE);
			//参数处理
	    	$app_id 	= $this->getParam('app_id');
	    	$auth_code	= $this->getParam('auth_code');
	    	if (empty($app_id) || $app_id != $this->koubei_app_id) {	    		
	    		throw new Exception('非法参数');
	    	}
	    	if (empty($auth_code)) {
	    		throw new Exception('参数缺失');
	    	}

	    	//使用auth_code换取接口access_token及用户userId
	    	$param_code = array();
	    	$param_code['auth_code'] = $auth_code;
	    	$param_code['app_id'] = $this->koubei_app_id;
	    	$api_token = api_OpenApi::oauthToken( $param_code );

	    	if (isset($api_token['status']) && $api_token['status'] == baf_ErrorCode::OK) {
	    		$data_token = $api_token['data'];

	    		//保存参数
	    		$ali_data = array();
	    		$ali_data['access_token'] 	= isset($data_token['access_token']) ? $data_token['access_token'] : '';
	    		$ali_data['open_id'] 		= isset($data_token['user_id']) ? $data_token['user_id'] : '';
	    	
	    		//调用接口获取支付宝用户信息
	    		if (!empty($data_token['access_token'])) {
	    			$param_user = array();
		    		$param_user['auth_token'] = $data_token['access_token'];
		    		$param_user['app_id'] = $this->koubei_app_id;
					$api_userinfo = api_OpenApi::userinfoShare($param_user);
					if (isset($api_userinfo['status']) && $api_userinfo['status'] == baf_ErrorCode::OK) {
						if (!isset($api_userinfo['data']) || empty($api_userinfo['data'])) {
				    		baf_Common::log('koubei_auth_error', 'EMERG', 'error', json_encode(array(
				                'url'       => $this->redirectUrl(),
				                'api_userinfo'   => $api_userinfo,
				                'msg' => '获取口碑用户信息失败'
				            )));
				    		$this->redirectMessage('获取口碑用户信息失败');
				    	}
				    	$data = $api_userinfo['data'];

				    	$ali_data['nick_name'] = isset($data['nick_name']) ? $data['nick_name'] : '';
				    	$ali_data['gender'] = isset($data['gender']) ? $data['gender'] : '';
				    	$ali_data['avatar'] = isset($data['avatar']) ? $data['avatar'] : '';

				    	$this->openUserInfo = $ali_data;
				    	$this->setOpenUserInfo(array('open_user_info'=>$ali_data));//存储第三方用户信息
				    	return $this->unionLogin();//第三方登录
					}
					else {
						baf_Common::log('koubei_auth_error', 'EMERG', 'error', json_encode(array(
			                'url'       => $this->redirectUrl(),
			                'api_userinfo'   => $api_userinfo,
			                'msg' => '获取用户信息失败'
			            )));
						$this->redirectMessage('获取用户信息失败');
					}
	    		}else{
	    			baf_Common::log('koubei_auth_error', 'EMERG', 'error', json_encode(array(
		                'url'       => $this->redirectUrl(),
		                'api_token'   => $api_token,
		                'msg' => '获取token失败'
		            )));
	    			$this->redirectMessage('获取token失败');
	    		}
	    	}
	    	//获取access_token失败
	    	else {
	    		baf_Common::log('koubei_auth_error', 'EMERG', 'error', json_encode(array(
	                'url'       => $this->redirectUrl(),
	                'api_token'   => $api_token,
	                'msg' => '获取授权token失败'
	            )));
	    		$this->redirectMessage('获取授权token失败');
	    	}
		}
		catch (Exception $e){
			baf_Common::log('koubei_auth_error', 'EMERG', 'error', json_encode(array(
	                'url'       => $this->redirectUrl(),
	                'msg' => $e->getMessage()
	            )));
			return $this->redirectMessage($e->getMessage());
		}
		
    }

    protected function initAliUser(){
    	$this->openUserInfo = !empty($_SESSION['open_user_info']) ? $_SESSION['open_user_info'] : array();
    	if(!empty($this->openUserInfo) && !isset($this->openUserInfo['union_id'])) $this->openUserInfo['union_id'] = '';
    }

    /**
     * 检查支付宝用户登录状态
     */
    protected function checkAliLogin(){
    	$exceptAction = array('auth');
    	//跳转至第三方授权
    	if(!$this->isAjax && !in_array($this->getRequest()->getActionName(), $exceptAction)){
    		if(empty($this->openUserInfo)){
    			$this->authorize();
				exit;
    		}else{
    			$status = true;
				//验证用户信息与绑定用户信息是否一致
				$param = array(
					'open_id'		=> $this->openUserInfo['open_id'],
					'access_token'	=> $this->openUserInfo['access_token'],
					'open_type'		=> $this->openType,
					'union_id'		=> '',
					'nick_name'		=> $this->openUserInfo['nick_name'],
					'union_source'	=> 'qydapp',
					'ver'			=> '2.0'
				);
				$res = api_User::unionLogin($param);			
				if(empty($res['status']) || $res['status']!='0000'){				
					$status = false;
				}else{
					//验证登录用户与绑定用户是否一致
					$userId = isset($res['data']['user_id']) ? $res['data']['user_id'] : 0;
					if($userId<1 || $userId!=$this->uid) $status = false;
				}
				if($status==false){
					baf_Common::log('checkAliLogin_error', 'EMERG', 'error', array(
		                'res'       => $res,
		                'param' => $param,
		                'openUserInfo' => $this->openUserInfo,
		                'user_id' => $this->uid
		            ));
					$this->clearLoginCookie();//退出当前用户
					unset($_SESSION['open_user_info']);
					$this->authorize();
					exit;
				}
    		}
    	}
    }

    protected function checkUserLogin(){
    	$exceptAction = array('unionbind');
    	if(!$this->isAjax && $this->uid < 1 && !in_array($this->getRequest()->getActionName(), $exceptAction)){
    		$this->redirect('unionBind');
    		exit;
    	}
    }

    /**
     * 日志
     * @param  [type] $logData [description]
     * @param  string $title   [description]
     * @param  string $level   [description]
     * @return [type]          [description]
     */
    private function log($logData, $title='', $level='INFO'){
    	baf_Common::log('koubei', $level, $title, $logData);
    }
    
}