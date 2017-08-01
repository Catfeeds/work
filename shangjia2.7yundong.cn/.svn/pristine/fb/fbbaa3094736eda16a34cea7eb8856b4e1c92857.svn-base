<?php
include APP_PATH.'/vendor/autoload.php';

use Gregwar\Captcha\CaptchaBuilder;

/**
 * 登陆和退出控制器
 * 
 * @author xiaoyanchun
 * @date 2016-06-24
 */
class LoginController extends BaseController
{
    /**
     * 不需要登陆也可以访问的控制器
     * 
     * @var []
     */
    protected $notLoginAction = [
        'index/login/index',
        'index/login/captcha',
        'index/login/dologin',
    	'index/error/error'
    ];
    
    private $ipLimit = 5;
    private $failLimit = 3;
    const LOGIN_COUNT	= 5; //5分钟登录成功次数达到5次，限制登录15分钟
    
    /**
     * 登陆页面
     */
    public function indexAction() {
        if (helper_LoginHelper::isLogin()) {// 已经登陆了
            $redirectPath = helper_LoginHelper::getRedirectPath();
            $this->redirect($redirectPath);
        }
        $token = $this->createRandomStr(16);
        $_SESSION['hash_token'] = md5(sha1($token));
        
        // 禁用layout
        $this->getView()->disableLayout();
        $this->display('index',array('token'=>$token));
    }
    
    public function createRandomStr($length){    	
    	$str = '0123456789abcdefghijklmnopqrstuvwxyz';//36个字符
    	
    	$strlen = 36;
    	while($length > $strlen){
    		$str .= $str;
    		$strlen += 36;
    	}
    	$str = str_shuffle($str);
    	return substr($str,0,$length);
    }

    /**
     * 获取登录验证码
     */
    public function captchaAction(){
        $builder = new CaptchaBuilder();
        $builder->setIgnoreAllEffects(true);
        $builder->build($width = 120, $height = 60);
        
        $_SESSION['checkCode'] = $builder->getPhrase();
        
        header('Content-type: image/jpeg');
        $builder->output();
        exit;
    }
    
    /**
     * 检查来源
     */
    private function checkReferer(){
    	if(isset($_SERVER['HTTP_REFERER']) && strpos($_SERVER['HTTP_REFERER'],SHANGJIA_DOMAIN) !== false){
    		return true;
    	}    	
    	return false;
    }
     
    /**
     * 登陆操作
     */
    public function dologinAction() {
        $params = [];
        $params['username'] = trim($this->getParam('username', '')); // 用户名
        $params['password'] = trim($this->getParam('password', '')); // 密码

        $ip          = helper_CoreHelper::getClientIp();
        $agent       = !empty($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '';
        $preLogInfo  = __METHOD__ . "错误信息：";
        $baseLogInfo = " ip：{$ip}，agent：{$agent}，username：{$params['username']}，password：{$params['password']}";
    	
    	if($this->checkIpLimit($ip) >= $this->ipLimit){
            baf_Logger::log2File($preLogInfo. "连续失败超过5次请15分钟后重试". $baseLogInfo, 'login_error');
    		$this->errorOutput(baf_ErrorCode::ERR_LIMIT_LOGIN, '连续失败超过5次请15分钟后重试');
    	}
    	
        if (!$this->getRequest()->isPost()) {
        	$this->setIpFailLimit($ip);
            baf_Logger::log2File($preLogInfo. "不是以post方式提交表单". $baseLogInfo, 'login_error');
            $this->errorOutput(baf_ErrorCode::ERR_SYTEM, 'error');
        }
               
        //检查referer
        if($this->checkReferer() === false){
        	$this->setIpFailLimit($ip);
            baf_Logger::log2File($preLogInfo. "referer出错". $baseLogInfo, 'login_error');
        	$this->errorOutput(baf_ErrorCode::ERR_SYTEM, 'error21');
        }
        
        $checkToken = trim($this->getParam('hash_token', '')); // token
        
        if(!isset($_SESSION['hash_token']) || md5(sha1($checkToken)) != $_SESSION['hash_token']){
        	$this->setIpFailLimit($ip);
            baf_Logger::log2File($preLogInfo. "页面过期请刷新后重试". $baseLogInfo, 'login_error');
        	$this->errorOutput(baf_ErrorCode::ERR_LOGIN_EXPIRE, '页面过期请刷新后重试');
        }
    
        //开发期间不校验验证码
        $checkCode = trim($this->getParam('checkCode', '')); // 验证码
        $checkCodeSession = isset($_SESSION['checkCode']) ? $_SESSION['checkCode'] : '';

        if (strtolower($checkCode) !== strtolower($checkCodeSession)) {
        	$this->setIpFailLimit($ip);
            baf_Logger::log2File($preLogInfo. "验证码错误". $baseLogInfo, 'login_error');
            $this->errorOutput(baf_ErrorCode::ERR_INVALID_PARAMETER, '验证码错误');
        }
    
        $validate = Loader::validate('UserLogin');
        if (!$validate->check($params)) { // 验证失败
        	$this->setIpFailLimit($ip);
            baf_Logger::log2File($preLogInfo. "参数验证错误：". $validate->getError(). $baseLogInfo, 'login_error');
            $this->errorOutput(baf_ErrorCode::ERR_INVALID_PARAMETER, $validate->getError());
        }

        if($this->checkFailLimit($params['username']) >= $this->failLimit){
            baf_Logger::log2File($preLogInfo. "连续输错三次密码请5分钟后重试". $baseLogInfo, 'login_error');
        	$this->errorOutput(baf_ErrorCode::ERR_LIMIT_LOGIN, '连续输错三次密码请5分钟后重试');
        }
    
        $userInfo = Loader::modelSlave('User')->login($params['username'], $params['password']);
        if (empty($userInfo)) { // 登陆失败        	
        	$this->setIpFailLimit($ip);
        	$this->setLoginFailLimit($params['username']);
            baf_Logger::log2File($preLogInfo. "用户名或密码错误". $baseLogInfo, 'login_error');
            $this->errorOutput(baf_ErrorCode::ERR_INVALID_PARAMETER, '用户名或密码错误');
        }
        
        if($this->checkLoginCount($params['username']) >= $this::LOGIN_COUNT){
        	baf_Logger::log2File($preLogInfo. "5分钟登录过于频繁，请休息15分钟后再登录". $baseLogInfo, 'login_error');
        	$this->errorOutput(baf_ErrorCode::ERR_LIMIT_LOGIN, '登录过于频繁，请休息15分钟后再登录');
        }

        try{
            // 登陆成功, 设置登录session
            helper_LoginHelper::setLogin($userInfo);
            helper_CoreHelper::addAdminLog('用户登录', $userInfo); // 添加操作日志
            $this->setLoginCount($params['username']);
        }catch (Exception $e){
            //出错了
            helper_LoginHelper::logout();
            baf_Logger::log2File($preLogInfo. "异常：". $e->getMessage() . $baseLogInfo, 'login_error');
            $this->errorOutput(baf_ErrorCode::ERR_SYTEM,$e->getMessage());
        }
        $this->successOutput();
    }
    
    //ip限制
    private function checkIpLimit($ip){
    	if(strlen($ip) < 2) return 0;
    	 
    	$redis = baf_Redis::factory();
    	 
    	$key = 'shangjia:ip_limit:'.$ip;
    	return (int) $redis->get($key);
    }
    
    private function setIpFailLimit($ip){
    	if(strlen($ip) < 2) return 0;
    	 
    	$redis = baf_Redis::factory();
    	 
    	$key = 'shangjia:ip_limit:'.$ip;
    	$count = (int)$redis->get($key);
    	$redis->set($key,++$count,900);
    	return 1;
    }
    
    
    private function checkFailLimit($userName){
    	if(strlen($userName) < 2) return $this->failLimit;
    	
    	$redis = baf_Redis::factory();
    	
    	$key = 'shangjia:login_limit:'.$userName;
    	return (int) $redis->get($key);    	
    }
    
    private function setLoginFailLimit($userName){
    	if(strlen($userName) < 2) return 0;
    	
    	$redis = baf_Redis::factory();
    	
    	$key = 'shangjia:login_limit:'.$userName;
    	$count = (int)$redis->get($key);    	
    	$redis->set($key,++$count,300);
    	return 1;
    }
    
    /**
     * 退出登录
     */
    public function logoutAction() {
    	$userInfo = !empty($_SESSION['user_info']) ? $_SESSION['user_info'] : [] ;
        helper_LoginHelper::logout();
        helper_CoreHelper::addAdminLog('用户退出', $userInfo); // 添加操作日志
        $this->redirect('/login/index');
    }

    /**
     * 超级管理员选择需要登录的商家
     *
     * @author xiaoyanchun
     */
    public function chooseSuppliesAction() {
        if (!helper_LoginHelper::isSuperUser()) { // 不是超级管理员
            $this->redirect('/');
            return;
        }
        //先清掉场馆session
        helper_VenuesHelper::destroyCurrentVenuesInfo();

        $search = [];
        $search['type'] = (int) $this->getParam('type', 0);
        $search['name'] = trim($this->getParam('name', ''));
        
        $suppliersUserList = [];
        
        if ($search['name']) {
            if ($search['type'] == 1) { // 场馆名称     
                // 单店
                $sql = "SELECT u.id, u.username, u.nickname, u.suppliers_id, u.suppliers_headquarters_id, v.name AS venues_name, v.venues_id "
                    . " FROM gs_suppliers_users AS u LEFT JOIN gs_venues AS v ON u.suppliers_id=v.suppliers_id "
                    . " WHERE u.suppliers_id > 0 AND v.name LIKE :name ";
                $one = Loader::modelSlave()->fetchAll($sql, [':name' => "%{$search['name']}%"]);
               
                // 多店
                $sql = "SELECT u.id, u.username, u.nickname, u.suppliers_id, u.suppliers_headquarters_id, v.name AS venues_name, v.venues_id "
                    . " FROM gs_suppliers_users AS u LEFT JOIN gs_suppliers_headquarters_members AS h ON u.suppliers_headquarters_id=h.suppliers_headquarters_id "
                    . " LEFT JOIN gs_venues AS v ON h.suppliers_id=v.suppliers_id "
                    . " WHERE u.suppliers_headquarters_id > 0 AND v.name LIKE :name ";
                $mutil = Loader::modelSlave()->fetchAll($sql, [':name' => "%{$search['name']}%"]);
                
                $suppliersUserList = array_merge($one, $mutil);
                
            } elseif ($search['type'] == 2) { // 商家账号名
                $sql = "SELECT id, username, nickname, suppliers_id, suppliers_headquarters_id "
                     . " FROM gs_suppliers_users WHERE (suppliers_id > 0 OR suppliers_headquarters_id > 0) AND username LIKE :username ";
                $suppliersUserList = Loader::modelSlave()->fetchAll($sql, [':username' => "%{$search['name']}%"]);
                
            } elseif ($search['type'] == 3) { // 连锁商家名称
                $sql = "SELECT u.id, u.username, u.nickname, u.suppliers_id, u.suppliers_headquarters_id, h.name AS headquarter_name "
                     . " FROM gs_suppliers_users AS u LEFT JOIN gs_suppliers_headquarters AS h ON u.suppliers_headquarters_id=h.id "
                     . " WHERE u.suppliers_headquarters_id > 0 AND h.name LIKE :name ";
                $suppliersUserList = Loader::modelSlave()->fetchAll($sql, [':name' => "%{$search['name']}%"]);
            } 
        }
        
        $this->getView()->disableLayout();
        
        $this->display('chooseSupplies', [
            'suppliersUserList' => $suppliersUserList,
            'search' => $search,
        ]);
    }
    
    /**
     * 超级管理员登录商家账号
     * 
     * @author xiaoyanchun
     */
    public function loginSuppliesAction() {
        if (!helper_LoginHelper::isSuperUser()) { // 不是超级管理员
            $this->redirect('/');
            return;
        }
        
        $id = (int) $this->getParam('id', 0);
        if ($id < 1) {
            throw new InvalidArgumentException('id参数不能小于1');
        }

        // 获取商家用户信息
        $userInfo = Loader::modelSlave('User')->getUserInfo($id); 
        if (empty($userInfo)) {
            throw new InvalidArgumentException('账号不存在');
        }
        
        helper_CoreHelper::addAdminLog('超级管理员登录商家', $userInfo); // 添加操作日志

        // 超级管理员帮助商家进行登录
        helper_LoginHelper::setLogin($userInfo);
        
        $this->redirect('/');
    }
    
    /**
     * get登录次数
     *
     */
    private function checkLoginCount($userName){
    	 
    	$redis = baf_Redis::factory();
    	 
    	$key = 'shangjia:login_count:' . $userName;
    	return (int) $redis->get($key);
    }
    
    /**
     * set登录次数
     *
     */
    private function setLoginCount($userName){
 	 
    	$redis = baf_Redis::factory();
    	 
    	$key = 'shangjia:login_count:' . $userName;
    	$count = (int)$redis->get($key);
    	$redis->set($key, ++$count, 900);
    }
    
    
}