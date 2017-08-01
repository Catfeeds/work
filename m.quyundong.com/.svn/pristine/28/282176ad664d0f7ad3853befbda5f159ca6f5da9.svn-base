<?php
class DefaultController extends Yaf_Controller_Abstract
{
	public $uid = 0;
	public $openId = '';
	public $userToken = '';
	public $isAjax = 0;
	protected $session;
	public $smsKey = 'sms_key';
	private $utmSources = array(
		'sjbaidu',//百度手机
		'sjhaosou'//360好搜手机
	);
	public static $avatar;
	protected $wechat_id;
	protected $state;
	protected $returnHash = false;
	/**
	 * 控制器初始化
	 */
	protected function init(){
		$this->initParams();
		$this->initSession();
		$this->initWechatId();
		$this->useLoginSecret();//密令登录
		$this->initGagcLogin();//广汽联合登录
		
		$this->getUser();
		$this->initReserve();

		$this->mergeUtmSource();
		$this->initUtmSource();
		$this->initChannelSource();
		$this->initWechatAuth();
		$this->createHash();
		$this->initCity();
		$this->channelInit();
	}

	/**
	 * 获取请求参数
	 */
	protected function initParams(){
		$this->refuseRequest();
		$header_x = isset($_SERVER['HTTP_X_REQUESTED_WITH']) ? $_SERVER['HTTP_X_REQUESTED_WITH'] : '';
		$this->isAjax = strtolower($header_x) == 'xmlhttprequest' ? true : false;

		$this->_runStartTime = RUMSTARTTIME; //记录执行时间
		$this->params = array_merge($_GET,$_POST);
		if(!empty($this->params)){
			$this->params = $this->checkRequestParam($this->params);
		}
		//存储需通过url传递的参数
		if(Config::$preserveParamsKey){
			foreach (Config::$preserveParamsKey as $value) {
				if(isset($this->params[$value])) Config::$preserveParams[$value] = $this->params[$value];
			}
			$data = array('qtimestamp'=>time());
			$data = array_merge($data, Config::$preserveParams);
			if(!empty(Config::$preserveParams)) $this->_view->assign(array('qydUrlParams'=>$data));
		}
		if(isset($this->params['reset_mrt'])) $this->setReturnUrl('');
	}

	private function refuseRequest(){
		$time = time();
		if(isset($_REQUEST['_']) && $_REQUEST['_']=='1499074712741'){
			$logData = array('param'=>$_REQUEST);
			//5分钟记录一次server信息
			if($time % 300 < 5){
				$logData['ser'] = $_SERVER;
			}
			baf_FileLog::log2File(json_encode($logData), 'refuse_log');
			http_response_code(404);
			exit;
		}
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

	protected function initCity($inputCityId=0){
		$cityId = !empty($_GET['city_id']) ? intval($_GET['city_id']) : 0;
		$cityId = $inputCityId>0 ? $inputCityId : $cityId;
		$param = array();
		if (in_array(CHANNEL_SOURCE,Config::$hideItem)){
			$param = array('channel_source' => CHANNEL_SOURCE);
			if($cityId<1) $cityId = api_CoreHelper::getCookie('city_id');
		}
		
		if($cityId < 1 && api_CoreHelper::getCookie('utm_source') == 'gagc'){
			$cityId = 76;
		}
		
		if($cityId>0){			
			$open_city = api_Court::cities($param);
			if($open_city){
				foreach ($open_city as $k => $v) {
					if(!empty($v['city_id']) && !empty($v['city_name'])) $cityids[$v['city_id']] = $v['city_name'];
				}
				if(!empty($cityids[$cityId])){
					api_CoreHelper::setCookie('city_id', $cityId, 30*3600*24); //30天有效
            		api_CoreHelper::setCookie('city_name', $cityids[$cityId], 30*3600*24); //30天有效
				}else{
					$this->resetCity();
				}
			}else{
				$this->resetCity();
			}
		}
	}

	protected function resetCity(){
		api_CoreHelper::setCookie('city_id', '', 0); 
		api_CoreHelper::setCookie('city_name', '', 0); 
	}
	
	protected function initSession(){
		if(!isset($_SESSION)) session_start();
	}
	
	//合并utm_source跟f 来源
	protected function mergeUtmSource(){
		//只有utm_source时移除旧的channelsource
		if(!empty($this->params['utm_source']) && !isset($this->params['f'])){
			api_CoreHelper::setCookie('channel_source', '', 0);
		}
		//只有f时移出旧的utm_source
		if(!empty($this->params['f']) && !isset($this->params['utm_source'])){
			api_CoreHelper::setCookie('utm_source', '', 0);
		}
		//同时拥有utm_source跟f时，优先使用 utm_source
		if(!empty($this->params['utm_source']) && !empty($this->params['f'])){
			unset($_GET['f'],$this->params['f']);
			api_CoreHelper::setCookie('channel_source', '', 0);
		}
	}
	
	/**
	 * 标识用户来源
	 */
	protected function initUtmSource(){
		$utmCookie = api_CoreHelper::getCookie('utm_source');		
		$utmSource = isset($this->params['utm_source']) && $this->params['utm_source'] ? $this->params['utm_source'] : '';

		$utmSource = strtolower($utmSource);
		
		if($utmSource && $utmSource != $utmCookie){
			api_CoreHelper::setCookie('utm_source', $utmSource, 86400);
		}else{
			$utmSource = $utmCookie;
		}
		if(in_array($utmSource,Config::$hideItem)){
			if(!isset($this->params['utm_source'])){
				$utmSource = '';
				api_CoreHelper::setCookie('utm_source', '', 0);				
			}
		}
		if(!defined('UTM_SOURCE')) define('UTM_SOURCE', $utmSource);		
	}
	
	/**
	 * 来源渠道
	 */
	protected function initChannelSource()
	{		
		$channelSourceCookie = api_CoreHelper::getCookie('channel_source');
		$channelSource = isset($_GET['f']) ? strip_tags($_GET['f']) : '';		
		if(isset($_GET['wechat_id'])){
			//将场馆公众号来源存储session中
			$wechatId = intval($_GET['wechat_id']);
			if($wechatId>0){
				$channelSource = 0;
				//记录公众号场馆来源
				$wechatInfo = api_WxApi::appId();
				if(!empty($wechatInfo['venues_id'])){
					$venuesId = intval($wechatInfo['venues_id']);
					if($venuesId>0){
						$_SESSION['channel_source'] = $venuesId;
						$_SESSION['from_wechat'] = 1;
					}
				}
				
			}else{
				if(!empty($_SESSION['channel_source'])) unset($_SESSION['channel_source']);
			}
		}else{
			if($channelSource && $channelSource != $channelSourceCookie){
				api_CoreHelper::setCookie('channel_source', $channelSource, 86400);
			}else{
				$channelSource = $channelSourceCookie;
			}	
		}
		
		if(!defined('CHANNEL_SOURCE')){
			$channelSource = $channelSource ? $channelSource : UTM_SOURCE;//没有f时,设置来源为UTM_SOURCE
			define('CHANNEL_SOURCE', $channelSource);
		}
		if (!empty($wechatInfo['city_id']) && $wechatInfo['city_id']>0) $this->initCity($wechatInfo['city_id']);
	}


	/**
	 * 获取来源标识
	 */
	protected function getUtmSource(){
		$utmDefault = api_CoreHelper::IsWenXinBrowser() ? 'weixin' : 'wap';
		$utmSource = CHANNEL_SOURCE ? CHANNEL_SOURCE : $utmDefault;		
		if(!empty($_SESSION['channel_source'])) $utmSource = $_SESSION['channel_source'];//场馆名片页、场馆公众号来源设置了此来源标识，优先使用这个来源

		if(!empty($_SESSION['from_wechat']) && !empty($_SESSION['current_venuesid']) && is_numeric($utmSource) && $utmSource!=$_SESSION['current_venuesid']){
			$utmSource = $utmDefault;
		}
		return $utmSource;
	}
	
	/**
	 * 设置城市
	 * @param unknown $cityId
	 * @return boolean
	 */
	protected function setCity($cityId){
		return api_CoreHelper::setCookie('city_id', $cityId, 30 * 3600 * 24); //30天有效
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
	 * 
	 * @param string $title
	 */
	protected function getUser(){
		$uid 		= api_CoreHelper::getCookie('uid');
		$userToken = api_CoreHelper::getCookie('userToken');
			
		//从cookies获取uid和userToken
		if(!empty($uid) && !empty($userToken)){
			$uid 		=  api_CoreHelper::authcode($uid,'DECODE',ENCODE_KEY);
			$userToken	= api_CoreHelper::authcode($userToken,'DECODE',ENCODE_KEY);
			$openId		= api_CoreHelper::getCookie('openId');
			
			if($uid > 0 && strlen($userToken) > 10){
				$this->uid 		 = $uid;
				$this->userToken = $userToken;
				//延长登录时效
				$this->setLogin();
				if(!empty($openId)){
					$this->openId = api_CoreHelper::authcode($openId,'DECODE',ENCODE_KEY);
				}
			}
		}
	}
	
	
	/**
	 * 获取场馆的会员卡号
	 *
	 * @param int $businessId 场馆id
	 * @param int $categoryId 场馆分类id
	 * @param int $userId     用户id
	 * @param int $phone      用户手机号
	 * @return string
	 */
	protected function getCourtMemberNumber($businessId, $categoryId, $userId = 0, $phone = '')
	{
		$userId = $userId > 0 ? $userId : $this->uid;
			
		// 如果用户登陆了，优先从用户信息中读取
		if ($userId > 0) {
			// 读取会员卡列表
			$param = array('user_id' => $userId, 'phone' => ($phone ? $phone : api_CoreHelper::getCookie('phone')));
			$cardRes = api_UserCard::getCardList($param);
	
			$cardList = array();
			if (is_array($cardRes) && isset($cardRes['status']) && $cardRes['status'] == SUCCESS_STATUS) {
				$cardList = $cardRes['data'];
			}
	
			foreach ($cardList as $card) {
				//是该场馆的会员
				if ($card['venues_id'] == $businessId && $card['cat_id'] == $categoryId) {
					// 设置到cookie中
					//api_CoreHelper::setCourtMemberToCookie($businessId, $categoryId, $card['card_no'], $userId);
					return $card['card_no'];
				}
			}
		}
			
		// 从cookie中获取
		$cno = api_CoreHelper::getCnoFromCookie($businessId, $categoryId, $userId);
		if ($cno) {
			return $cno;
		}
	
		return '';
	}
	
	
	/**
	 * 获取会员卡详情
	 *
	 * @param string $cno    会员卡
	 * @param int    $userId 用户id
	 * @return array
	 */
	protected function getCourtMemberCardInfo($cno, $businessId,$userId = 0)
	{
		$cardInfo = array();
		$userId = $userId > 0 ? $userId: $this->uid;
			
		if (!$cno || $userId < 1) {
			return $cardInfo;
		}
			
		$cardParam = array(
		    'card_no' => $cno,
            'venues_id' => $businessId,
            'user_id' => $userId,
            'phone' => api_CoreHelper::getCookie('phone')		    
		);
	
		// 读取会员卡详情
		$cardRes = api_UserCard::getCardDetail($cardParam);
		if (is_array($cardRes) && isset($cardRes['status']) && $cardRes['status'] == SUCCESS_STATUS) {
			$cardInfo = $cardRes['data'];
		}
			
		return $cardInfo;
	}
	
	
	/**
	 * 设置登录的有效时间
	 */
	private function setLogin(){
		api_CoreHelper::setCookie('timeLimit',1,1800);
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
		api_CoreHelper::setCookie('court_member_list','',0);
		api_CoreHelper::setCookie('headimgurl', '', 0);
		api_CoreHelper::setCookie('for_reserve', '', 0);
	}
	
	/**
	 * 设置页面标题、关键字和简介
	 * @param string $utm_source  渠道标识
	 * @param string $title       页面标题
	 * @param string $keywords    关键字
	 * @param string $description 简介
	 */
	protected function setPageTitle(array $param = array()){
		$utm_source  = isset($param['utm_source']) ? $param['utm_source'] : 'wap';//渠道标识
		$title 		 = isset($param['title']) ? $param['title'] : '';//页面标题
		$keywords 	 = isset($param['keywords']) ? $param['keywords'] : '';//关键字
		$description = isset($param['description']) ? $param['description'] : '';//简介
		$venuesName  = isset($param['venues_name']) ? $param['venues_name'] : '';//场馆名称
		
		//统一配置页面标题、关键字和介绍
        $request = Yaf_Dispatcher::getInstance()->getRequest();
		$controllerWithAction = strtolower($request->getControllerName().'_'.$request->getActionName());//控制器_方法名
		$pTitle = !empty($title) ? $title : baf_TitleArr::getTitle($controllerWithAction, $utm_source, $venuesName);

		$pageTitle = $pTitle ? $pTitle : '趣运动';
		$keywords = $keywords ? $keywords : '趣运动,在线预订,手机订场,订场优惠,羽毛球订场,足球场,游泳馆查询预订,去运动,订场神器';
		$description = $description ? $description : '趣运动专注球场在线预订,羽毛球馆,足球场,网球场,球场在线预订,游泳馆查询预订,手机在线预订,运动场馆价格表,运动场馆优惠信息,去运动就上趣运动.';

		$this->_view->assign('pageTitle', $pageTitle);
		$this->_view->assign('pageKeywords', $keywords);
		$this->_view->assign('pageDescription', $description);
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
		if (isset($this->params['utm_source']) && isset(baf_TitleArr::$utmTitle[$this->params['utm_source']])) {
			$this->setPageTitle(array('title'=>'信息提示-'.baf_TitleArr::$utmTitle[$this->params['utm_source']]));
		}else{
			$this->setPageTitle(array('title'=>'信息提示-趣运动'));
		}
		
		$this->_view->assign(array('message' => $message, 'url'=>$url, 'time'=>$time));
		Yaf_Dispatcher::getInstance()->autoRender(FALSE);
		$this->getView()->setScriptPath(APP_PATH.'/application/views');//非action中调用时需要设置视图路径
		$this->getView()->display('show_message.php');
		exit;
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
	 * 输出json
	 * @param array $data
	 */
	protected function readJson($data){
		if(!is_array($data) || empty($data)){
			$data = array('code'=>3036,'msg'=>'error');
		}
		if(isset($data['redirect_url'])) $data['redirect_url'] = baf_CHtml::createUrl($data['redirect_url']);
		if(isset($data['url'])) $data['url'] = baf_CHtml::createUrl($data['url']);
		echo json_encode($data);
		exit;
	}

	protected function errorOutput($status, $msg){
		$data = array(
				'status' => $status,
				'msg' => $msg,
				'data' => []
			);
		$this->renderJson($data);
	}

	protected function renderJson($data){
		header("Content-type: application/json");
		print_r(json_encode($data));
		exit;
	}

	protected function successOutput($data){
		$data = array(
				'status' => '0000',
				'msg' => 'success',
				'data' => $data
			);
		$this->renderJson($data);
	}
	
	protected function getSrc(){
		$src = $this->getParam('src');
		if($src) $src = urldecode($src);
		return $src;
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
		//删除for_reserve参数
		if (isset($query['for_reserve'])) {
			unset($query['for_reserve']);
		}
		
		$queryStr = http_build_query ( $query );
		return "{$server_name}{$parse['path']}?{$queryStr}";
	}
	
	/**
	 * 查询回跳url
	 */
	protected function getReturnUrl(){
		$key = '__return_url';
		$val = api_CoreHelper::getCookie($key);
		if(empty($val)){
			$val = !empty($_SESSION[$key]) ? $_SESSION[$key] : '';
		}
		return $val ? $val : '';
	}
	
	/**
	 * 设置回跳url
	 * @param string $url
	 */
	protected function setReturnUrl($url){
		$key = '__return_url';
		$_SESSION[$key] = $url;
		api_CoreHelper::setCookie($key, $url, 1080);//18分钟过期时间
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
	 * 联合密令登录
	 * 
	 * @param unknown $param
	 * @return string
	 */
	public function useLoginSecret(){
		$phone = isset($_GET['phone']) ? trim($_GET['phone']) : '';
		$login_secret = isset($_GET['login_secret']) ? trim($_GET['login_secret']) : '';
		if ( !empty($phone) && !empty($login_secret) ){
			$param = api_Base::addPublicParam( array(
				'action' 		=> 'use_login_secret',
				'phone' 		=> $phone,
				'login_secret' 	=> urlencode($login_secret),
			));
			//user.api判定
			$api_data = api_Base::request( Config::get('api.user').'/auth?'.http_build_query($param), 'user_api');
			if ( !empty($api_data) && isset($api_data['status']) && $api_data['status'] == '0000'  ){
				
				$user = array(
					'user_id' 	=> $api_data['data']['user_id'],
					'phone' 	=> $api_data['data']['phone'],
					'nick_name' => $api_data['data']['nick_name'],
					'avatar' 	=> $api_data['data']['avatar'],
				);
				//写登录cookies
				api_WxUser::setLoginCookie($user, LOGIN_TIME_LIMIT);
			}
			else {
				
				baf_FileLog::log2File( json_encode(array(
					'url' => 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'].'?'.$_SERVER['QUERY_STRING'],
					'api' => Config::get('api.user').'/auth?'.http_build_query($param),
					'data' => $api_data
				)), 'login_secret');
				
			}
		}
		return false;
	}

	//检查用户是否登录
	public function checkLogin(){
		$userState = $this->getLogin();
		//未登录状态，跳转到登录页面
		if($userState != 1 || $this->uid == 0 || $this->userToken == ''){
			//清空登录cookie
			$this->clearLoginCookie();
			$param = array('src'=>$this->getReturnUrl() ? $this->getReturnUrl() : $this->redirectUrl());
			$serverName = baf_Base::base_url();
			//api_CoreHelper::getOption ( 'www_domain', 'http://m.quyundong.com' );
			
			//加参数定位到快捷登录页面
			$ql = (int)$this->getParam('ql','');
			$path = '';
			if($ql == 1 || in_array(CHANNEL_SOURCE,Config::$hideItem)){
			    $path = 'qucklogin';
			}

			//微信浏览器---微信联合登录
			if(api_CoreHelper::IsWenXinBrowser()){
				//$returnUrl = $serverName.'/redirect/'; ---微信联合登录的暂时还没可以使用

				$returnUrl = $serverName.'/login/'.$path;
			}
			//手机端其他浏览器---web登录
			else{
				$returnUrl = $serverName.'/login/'.$path;
			}

			$returnUrl .= empty($param) ? '' : '?'.http_build_query($param);
			if($this->isAjax == 1){
				$this->readJson(array('code'=>'3306','msg'=>'please login','src'=>$returnUrl));
			}
			else{
				$this->redirectToLogin($ql);
			}
		}
	}

	//获取登录的有效时间
	private function  getLogin(){
		$this->state = isset($this->state)&&$this->state ? $this->state : api_CoreHelper::getCookie('timeLimit');
		return $this->state;
	}

	//保存 微信标识wechat_id
	public function initWechatId()
	{
		$wechat_id = $this->getParam('wechat_id', '0');
		$loginParam = strtolower($this->getParam('login',''));

		if (isset($_GET['wechat_id'])) {
			$_SESSION['wechat_id'] = $wechat_id;
			$this->unsetWechatToken();			
		}	

		$this->wechat_id = isset($_GET['wechat_id']) ? $wechat_id : (!empty($_SESSION['wechat_id']) ? $_SESSION['wechat_id'] : "0");;
		
	}

	protected function unsetWechatToken(){
		if (!empty($_SESSION['access_token'])) {
			unset($_SESSION['access_token']);
		}
		if (!empty($_SESSION['auth_openid'])) {
			unset($_SESSION['auth_openid']);
		}
		if (!empty($_SESSION['refresh_token'])) {
			unset($_SESSION['refresh_token']);
		}	
	}

	public function initWechatAuth(){

		$loginParam = strtolower($this->getParam('login',''));

		if (in_array($loginParam,array('wx','wxuc')) && api_WxApi::isWeixin()) {
			
			//微信授权
			$this->clearLoginCookie();
			$this->unsetLoginCookie();

			//获取网页授权token
			$code = $this->getParam("code");
			$token = api_WxApi::checkAuth($code);


			//未授权，发起授权申请
			if (!$token || !empty($token['errcode'])) {
				if(!empty($token['errcode'])) {
					//记录异常
					baf_Common::log('initWechatAuth_error','INFO','token error', json_encode(array(
						'url' => $this->redirectUrl(),
						'session_wechatid' => isset($_SESSION['wechat_id']) ? $_SESSION['wechat_id'] : '',
						'api_WxApi_appId' => api_WxApi::appId(),
						'token' => $token
					)));
				}

				$return_url = baf_Base::base_url() . $_SERVER['REQUEST_URI'];

				$parseUrl = parse_url($return_url);
				$queryArr = array();
				if(!empty($_SERVER['QUERY_STRING'])) parse_str($_SERVER['QUERY_STRING'], $queryArr);
				unset($queryArr['code'],$queryArr['state']);
				$path = !empty($parseUrl['path']) ? $parseUrl['path'] : '/';
				$return_url = baf_Base::base_url().$parseUrl['path'].'?'.http_build_query($queryArr);

				$this->redirect(api_WxApi::createAuthUrl($return_url));
				exit;
			}

			//获取微信用户信息
			$openId = api_WxApi::$token['openid'];			
			$userInfo = api_WxApi::getWeixinUserInfo($token);
			if(empty($userInfo)){
				//获取微信用户信息失败
				baf_Common::log('initWechatAuth_error','INFO','userInfo empty', json_encode(array(
					'url' => $this->redirectUrl(),
					'token' => $token,
					'userInfo' => $userInfo
				)));
				$this->redirect("/index");
				exit;
			}

			if (empty($userInfo['unionid'])) {
				if($this->wechat_id>0){
					$userInfo['unionid'] = 'union_'.$token['openid'];
				}else{					
					if (getenv("PAY_HOST")) {
	                    $userInfo['unionid'] = $token['openid'] . "-123";//兼容旧的unionid设置
	                }else{
	                	$userInfo['unionid'] = 'union_'.$token['openid'];
	                }
				}
			}

			$checkParam = array(
				'open_id' => $token['openid'],
				'access_token' => !empty($token['access_token']) ? $token['access_token'] : 'no_token',
				'open_type' => 'wx',
				'union_id' => !empty($userInfo['unionid']) ? $userInfo['unionid'] : '',
				'nick_name' => !empty($userInfo['nickname']) ? $userInfo['nickname'] : '',
			);
			$checkParam['wechat_id'] = $this->wechat_id;

			//使用第三方登录接口登录
			$checkRes = api_User::unionLogin($checkParam);
			if (!empty($checkRes['user_id'])) {
				$this->uid = $checkRes['user_id'];
				$this->state = 1;
				$this->userToken = baf_Common::authcode($checkRes['phone']);
				$user = array(
					'user_id' => $checkRes['user_id'],
					'phone' => !empty($checkRes['phone']) ? $checkRes['phone'] : '',
					'nick_name' => !empty($checkRes['nick_name']) ? $checkRes['nick_name'] : '',
					'avatar' => !empty($checkRes['avatar']) ? $checkRes['avatar'] : '',
				);

				//设置登录cookie
				api_WxUser::setLoginCookie($user, LOGIN_TIME_LIMIT);
			}else{
				if(!$checkRes){
					baf_Common::log('init_login_wechat','DEBUG','param_error',array('param'=>$checkParam, 'res'=>$checkRes, 'wechat_id'=>$this->wechat_id));
				}
				if ($loginParam == 'wx') {
					$returnUrl = $this->redirectUrl();

					$parseUrl = parse_url($returnUrl);
					$queryArr = array();
					if(!empty($_SERVER['QUERY_STRING'])) parse_str($_SERVER['QUERY_STRING'], $queryArr);
					unset($queryArr['code'],$queryArr['state'],$queryArr['login']);
					$path = !empty($parseUrl['path']) ? $parseUrl['path'] : '/';
					$returnUrl = baf_Base::base_url().$parseUrl['path'].'?'.http_build_query($queryArr);
					
					$returnUrl = urlencode($returnUrl);
					$this->setReturnUrl($returnUrl);
					$redirectUrl = '/login/wechat/';					
				} elseif ($loginParam == 'wxuc') {
					$redirectUrl = '/login/wechat/?from=wxuc';
				}
				$avatar = !empty($userInfo['headimgurl']) ? $userInfo['headimgurl'] : '';
				self::$avatar = $avatar;
				api_CoreHelper::setCookie('headimgurl', $avatar, LOGIN_TIME_LIMIT);
				$this->redirect($redirectUrl);
				exit;
			}
		}
	}

	/**
	 * 清楚登录cookie
	 */
	private function unsetLoginCookie()
	{
		unset($_COOKIE['wx_nick_name']);
		unset($_COOKIE['wx_avatar']);
	}

	/**
	 * 生成hash
	 */
	protected function createHash($reflash=false){
		if($this->isAjax) return false;
		if(isset($this->params['hash']) && !$reflash){
			return false;
		}else{
			//1分钟内不更新hash(暂处理login/wechat两次请求问题)
			if(!empty($_SESSION['hash'])){
				$addTime = !empty($_SESSION['hash']['add']) ? $_SESSION['hash']['add'] : 0;
				if(time()- $addTime < 60) return false;
			}
			$des = new baf_Des();
			$expire = 600;//设置5分钟过期
			//$hash = $des->encrypt(time().mt_rand(10,99));
		    $hash = md5(time().mt_rand(10,99));
			$_SESSION['hash'] = array(
				'time' => time() + $expire,
				'text' => $hash,
				'add' => time()
			);
			api_CoreHelper::setCookie('hash', $hash, $expire);
		}

	}

	/**获取hash
	 * @param bool $returnText
	 * @return null
	 */
	protected function getHash($returnText=false){
		$serverHash = !empty($_SESSION['hash']) ? $_SESSION['hash'] : null;
		if($serverHash && $serverHash['time']>time()){
			return $returnText ? $serverHash['text'] : $serverHash;
		}
		return null;
	}

	/**验证hash
	 * @param bool $rendHash
	 * @param bool $return
	 * @return bool
	 */
	protected function checkHash($rendHash=false, $return = false){
		return true;
		$hash = $this->getParam('hash');
		$referer = baf_Common::httpReferer();
		//if(!$referer) $referer = $this->redirectUrl();
		$refererCheck = strpos($referer,Config::get('domain.m'));

		$serverHash = $this->getHash();
		$status = false;
		if($refererCheck==0 && !empty($serverHash['text']) && $serverHash['text']==$hash){
			$status = true;
		}
		//$this->createHash(true);//不更新
		if($rendHash) $this->returnHash = true;//hash验证通过后则在下面操作中返回更新的hash(供重新获取验证码使用)
		if($return) return $status;
		if($status==false){
			$this->readJson(baf_ResCode::msg(baf_ResCode::ACCESS_DENIED));
		}

	}

	/**
	 * app调H5自动登陆
	 * 
	 * @author Red-Bo
	 * @date 2016-07-25 15:00:32
	 */
	public function appSkipH5Autologin()
	{
		$loginEncode = $this->getParam('login_encode');
		
		if(isset($_GET['login_encode'])) 
		{
			$this->clearLoginCookie();
			if(!empty($loginEncode)) 
			{
				$loginInfo = api_FrontHelper::getDecodeAuthstr($loginEncode);
				if(is_array($loginInfo) && !empty($loginInfo))
				{
					$userId = isset($loginInfo['user_id']) ? $loginInfo['user_id'] : 0;
					$last_update_time = isset($loginInfo['last_update_time']) ? $loginInfo['last_update_time'] : 0;
					if($userId && $last_update_time)
					{
						# 判断登录是否过期
						$expires = LOGIN_TIME_LIMIT;
						if(time() - $last_update_time > $expires) 
							$this->checkLogin(); # 跳转到登录页面登录
						# 初始化用户信息
						if($userId > 0) 
						{
							$data = api_User::getUserInfo(array('user_id' => $userId));
							if (isset($data['status']) && $data['status'] == '0000') 
							{
								$this->uid 		 = $userId;
								$this->userToken = api_CoreHelper::authcode($data['phone'],'ENCODE',ENCODE_KEY);
								api_WxUser::setLoginCookie($data, LOGIN_TIME_LIMIT);
							}
						}
					}
				}
			}
			
		}
	}

	/**
	 * 手Q钱包验证登陆
	 * @author wuchunhua 2016-09-05 16:44:23
	 * @return [type] [description]
	 */
	public function initQqWallet()
	{
		//根据f='qqwallet'来判断是否是从手Q钱包过来的
		if(CHANNEL_SOURCE=='qqwallet'){
			baf_Common::releaseActiveVerifyCode();
			if (!isset($_SESSION['qq_wallet_user'])) {
				$_SESSION['qq_wallet_user'] = '';
			}
			
			//从session中获取openid的值
			$openid = isset($_SESSION['qqwallet_openid']) ? $_SESSION['qqwallet_openid'] : '';
			if (empty($openid)) {
				//获取不到openid，就请求QQ重新获取
				$openid = $this->getqqWalletOpenid();
			}
			
			//获取用户的基本信息
			$userInfo = api_QqWallet::getQqUserInfo();
			if(empty($userInfo)){
				//获取QQ用户信息失败
				baf_Common::log('initQqWallet_error','INFO','userInfo empty', json_encode(array(
					'url' => $this->redirectUrl(),
					'openid' => $openid
				)));
				$this->redirectMessage('获取用户信息失败,请返回重试');
				exit;
			}

			//使用第三方登录接口登录
			if ($this->uid < 1) {
				$checkParam = array(
					'open_id' 		=> $openid,
					'access_token' 	=> !empty($_SESSION['qqwallet_access_token']) ? $_SESSION['qqwallet_access_token'] : 'no_token',
					'open_type' 	=> 'qq',
					'union_id'		=> '',
					'nick_name' 	=> !empty($userInfo['nickname']) ? $userInfo['nickname'] : '',
					'union_source'	=> 'qydapp',
					'ver'			=> '2.0',
					'utm_source'	=> 'qqwallet' //用于验证手Q add by wuchunhua 2016-09-29
				);
				$checkRes = api_User::unionLogin($checkParam);
				
				//数据返回成功，并且data不为空时说明登录成功，否则为失败
				if (isset($checkRes['status']) && $checkRes['status']=='0000' && !empty($checkRes['data'])) {					
					$des = new baf_Des();
					$phone = !empty($checkRes['data']['phone_encode']) ? $des->decrypt($checkRes['data']['phone_encode']) : '';					
					//设置登录cookie
					if($phone){
						$this->uid 			= $checkRes['data']['user_id'];
						$this->state 		= 1;
						$this->userToken 	= baf_Common::authcode($checkRes['data']['phone']);
						$user = array(
							'user_id' 	=> $checkRes['data']['user_id'],
							'phone' 	=> $phone,
							'nick_name' => !empty($checkRes['data']['nick_name']) ? $checkRes['data']['nick_name'] : '',
							'avatar' 	=> !empty($checkRes['data']['avatar']) ? $checkRes['data']['avatar'] : '',
						);
						api_WxUser::setLoginCookie($user, LOGIN_TIME_LIMIT);
					}else{
						$this->clearLoginCookie();
					}
					$_SESSION['qq_wallet_user'] = $openid;
				}else{
					//获取QQ用户信息失败
					baf_Common::log('QqWallet_unionLogin_error','INFO','loginInfo empty', json_encode(array(
						'url' 		=> $this->redirectUrl(),
						'openid' 	=> $openid,
						'loginInfo' => $checkRes
					)));
				}
			}else{
				if (!$_SESSION['qq_wallet_user'] || $_SESSION['qq_wallet_user']!=$openid) {
					//通过userid 查询openid
					$param = array(
						'user_id'		=>$this->uid,
						'open_type' 	=> 'qq',
						'union_source' 	=> 'qqwallet'
						);
					$res = api_User::getOpenidByUserId($param);
					if(!empty($res['status']) && $res['status']=='0000' && !empty($res['data'])){
						if(!empty($res['data']['open_id']) && $res['data']['open_id']==$openid){
							$_SESSION['qq_wallet_user'] = $openid;
						}					
					}
				}
			}

			if(!$_SESSION['qq_wallet_user']){
				$this->clearLoginCookie();
			}

			if(!api_CoreHelper::getCookie('phone')){				
				$this->clearLoginCookie();
			}
		}
	}

	/**
	 * 根据code获取openid
	 * @param string $value [description]
	 */
	public function getqqWalletOpenid()
	{
		//获取QQ授权access_token
		$code = $this->getParam('code');
		$openid = '';
		
		$protocol ='http';
		/*
		if(IS_PRODUCT_ENVIRONMENT){
			$protocol ='https';
		}
		*/		
		
		//若未授权，则发起授权申请
		if(!$code){
			parent::redirect('http://proxy.svip.qq.com/cgi-bin/auth_redirect?appid='.QQ_WALLET_APPID.'&redirect_uri='.$protocol.'%3A%2F%2Fm.quyundong.com');
			exit;
		}else{
			$url = 'https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&client_id='.QQ_WALLET_APPID.'&client_secret=d964a7977bd347ab48904ef19ad91369&code='.$code.'&redirect_uri='.$protocol.'%3A%2F%2Fm.quyundong.com';

			//这里不会跳转回来，只是输出信息，要获取输出的数据
			$res = file_get_contents($url);

			parse_str($res, $resArr);//解析获取到的数据

			if(!empty($resArr['access_token'])){
				//保存access_token
				$_SESSION['qqwallet_access_token'] = $resArr['access_token'];

				$url = 'https://graph.qq.com/oauth2.0/me?access_token='.$resArr['access_token'];
				
				//此处也一样不会跳转，只是输出信息，要获取输出的数据
				$res = file_get_contents($url);

				//callback( {"client_id":"YOUR_APPID","openid":"YOUR_OPENID"} );
				//通过正则截取 {"client_id":"YOUR_APPID","openid":"YOUR_OPENID"}
				preg_match('/callback\((.*)\)/', trim($res), $match);
				$res_json = is_array($match) && isset($match[1]) ? $match[1] : '';

				if (!empty($res_json)) {
					$res_arr = json_decode($res_json, true);
					$openid = is_array($res_arr) && isset($res_arr['openid']) ? $res_arr['openid'] : '';
				}
				//$openid不为空时保存进session中
				if (!empty($openid)) {
					$_SESSION['qqwallet_openid'] = $openid;
				}
			}
		}

		baf_Common::log('qqwallet_openid_log', 'INFO', 'getqqWalletOpenid', $code);
		return $openid;
	}

	/**
	 * 跳转至登录入口
	 */
	protected function redirectToLogin($quickLogin=false){
		if(CHANNEL_SOURCE=='qqwallet'){
			$this->redirect('/login/qqwallet');
		}elseif(baf_Common::isChannel('decathlon')){
			$this->redirect('/login/Qucklogin');
		}else{
			$path = $quickLogin ? '/login/Qucklogin' : '/login/';
			$this->redirect($path);
		}
	}
	
	/*
	 * 预留入口
	 */
	private function initReserve(){
		$reserve = (int)$this->getParam('for_reserve');
		if($reserve == 1){
			$this->clearLoginCookie();
			api_CoreHelper::setCookie('for_reserve', 1, 1080);//18分钟过期时间
			$this->uid = 0;    //暂时强制让用户登录失效，没找到cookie过期失效的问题
		}
	}

	//重写系统redirect方法
	public function redirect($url){
		parent::redirect(baf_CHtml::createUrl($url));
	}

	private function channelInit(){
		$this->initQqWallet();

		if(baf_Common::isChannel('decathlon')){
			ext_Channel::decathlonInit();
		}
	}
	
	//广汽联合登录
	private function initGagcLogin(){
		$phone = $this->getParam('phone');
		//解密手机号
		if(is_string($phone) && strlen($phone) > 3 ){
			$phone = baf_DesGagc::decrypt($phone);
		}
		$gagc_login = isset($_SESSION['gagc_login']) ?  $_SESSION['gagc_login'] : 0;
		//广汽渠道
		if(baf_Common::isChannel('gagc') && !empty($this->params['phone']) && ($gagc_login == 0 || $phone != api_CoreHelper::getCookie('phone') ) ){
			$gagc = ext_Channel::gagcInit($phone);
			
			if(isset($gagc[0])){	
				$this->clearLoginCookie();
				switch ($gagc[0]){					
					//验证通过---自动登录
					case 1:
						//设置登录cookie						
						$user = array(
								'user_id' 	=> $gagc[1]['user_id'],
								'phone' 	=> $gagc[1]['mobile_phone'],
								'nick_name' => $gagc[1]['nick_name'],
								'avatar' 	=> $gagc[1]['avatar'],
						);
						$_SESSION['gagc_login'] = 1;
						api_WxUser::setLoginCookie($user, LOGIN_TIME_LIMIT);						
						break;
					default:
						//parent::redirect('/login/Qucklogin');
						break;
				}
			}
		}
	}
}