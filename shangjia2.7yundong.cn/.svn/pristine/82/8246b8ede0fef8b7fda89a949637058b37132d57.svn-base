<?php
/*
 * 控制器基类 
 * 
 * @author xiaoyanchun
 * @date 2016-06-23
 */
class BaseController extends Yaf_Controller_Abstract
{
    /**
     * get和post参数合并的数组
     * 
     * @var array
     */
    protected $params = [];
    
    /**
     * 不需要登陆状态也能访问的方法
     * 主要是针对某些控制器中的部分方法不需要登陆也可以访问
     * 
     * 格式: [
     *      '模块/控制器/方法'
     *      'index/login/index',
     *      'index/login/captcha',
     *      'index/login/dologin',
     *   ];
     *   
     * @var array
     */
    protected $notLoginAction = [];
    
    /**
     * 不需要用户登录也能访问的标识
     * 
     * 主要是针对某些控制器整个控制器的方法都不需要登陆也可以访问
     * 
     * @var bool
     */
    protected $notCheckLogin = false;
    
    /**
     * 初始化函数，系统自动执行
     * 
     * @return void
     */
    public function init() {
        $this->params = array_merge($_GET, $_POST); // 合并请求参数
 
        if (!$this->checkLogin()) { // 没有登陆
            $this->redirect('/login/index');
            exit;
        } else { // 已经登陆
            //登录用户信息
            $userInfo = helper_LoginHelper::getUserInfo();
            // 设置登录信息到模板
            $this->getView()->assign('currentVenuesInfo',helper_VenuesHelper::getCurrentVenuesInfo());
            $this->getView()->assign('login_userInfo', $userInfo);
            $this->getView()->assign('active_menu', $this->getActiveMenu());
        }
    }

    /**
     * 取active菜单
     */
    protected function getActiveMenu(){
        return strtolower('/'.$this->getRequest()->getControllerName().'/'.$this->getRequest()->getActionName());
    }
    /**
     * 检测用户是否登陆
     * 
     * @return bool
     */
    protected function checkLogin() {

        if (!empty($this->notLoginAction)) { // 是否有不需要登陆也能访问的控制器
            $request = $this->getRequest();
            $action = strtolower($request->getModuleName().'/'.$request->getControllerName().'/'.$request->getActionName());
            $notLoginAction = array_map('strtolower', $this->notLoginAction);
            if (in_array($action, $notLoginAction)) { // 访问的控制器-方法，在允许不登陆的情况下也可以访问
                return true;
            }
        }
        
        if ($this->notCheckLogin == true) { // 如果当前控制器设置了不需要登陆状态也能访问
           return true;
        }
        
        if (helper_LoginHelper::isLogin()) { // 已经登陆
            return true;
        }
        
        return false;
    }
    
   /**
    * 获取参数
    * 
    * @param string $name         参数名称
    * @param mixed  $defaultValue 参数不存在时的默认值
    * @return mixed
    */
    public function getParam($name, $defaultValue = null) {
        if (isset($this->params[$name])) {
            return $this->params[$name];
        }
        return $defaultValue;
    }
    
    /**
     * 获取所有参数
     * 
     * @return array
     */
    public function getParams() {
        return $this->params;
    }
   
    /**
     * 输出json数据
     * 
     * @param mixed $res
     */
    public function renderJSON($res) {
        header('Content-type: application/json');
        echo json_encode($res);
        exit;
    }

   /**
    * 错误时josn输出
    * 
    * @param int    $code 错误代码
    * @param string $msg  错误信息
    * @return string
    */
    public function errorOutput($code, $msg = '') {
       $res = baf_Common::initRes();
       
       $res->status = $code;
       
       if ($msg) {
           $res->msg = $msg;
       } else {
           $res->msg = baf_ErrorCode::msg($code);
       }

       $this->renderJSON($res);
    }
   
    /**
     * 成功时的返回
     * 
     * @param mixed $data 返回的数据
     * @return string
    */
    public function successOutput($data = array()) {
       $res = baf_Common::initRes();
       
       if (!empty($data)) { //注意： 不为空时不进行覆盖 data字段，因为data字段是对象类型
           $res->data = $data;
       }
       
       $this->renderJSON($res);
    }
    
    /**
     * 返回api处理信息
     *
     * @param mixed $data 返回的数据
     * @return array
     */
    public function apiReturnInfo($data) {
    	 
    	if (empty($data)) {
    		return baf_ErrorCode::msg(baf_ErrorCode::ERR_EMPTY_RESULT);
    	}
    	
    	if(isset($data['status']) && $data['status'] != '0000') {
    		return baf_ErrorCode::msg(baf_ErrorCode::ERR_SYTEM);
    	}
    	
    	return isset($data['data']) ? $data['data'] : [];
    }
    
   
    /**
     * 设置标题title
     *
     * @param string $title
     */
    public function setTitle($title) {
        $this->getView()->assign('title', $title);
    }
    
    
    /**
     * 提示信息页
     *
     * @param mixed $data 返回的数据
     * @return array
     */
    public function showMessage($data)
    {
    	//赋值
    	$dataList = [
    			'title'		=>	$data['title'],
    			'message'	=>	$data['message']
    	];
    	 
    	$this->display('../message/message', $dataList);
    	exit;
    }
    
}