<?php
class InsuranceController extends DefaultController
{
    
    /**
     * 领取的保险信息
     *
     * @author lishiyuan
     */
	public function InsuranceInfoAction()
	{
	 
	   
	    $order_id = (int) $this->getParam('order_id',0);
	    $status = (int) $this->getParam('status',0);
	    $param =array(
	        "order_id" =>$order_id,
	        "ver" =>'1.4'
	    );
	    $res = api_Order::getInsuranceInfo($param); 
	   
	    if (isset($res['status']) && $res['status'] == SUCCESS_STATUS) {
	        if(!empty($res['data'])){
	            
	            $list = $res['data'];
	            $list["status"] = $status;   //区别下单者,第一次弹出
	            $order = api_Order::getOrderInfo($param);
	       		if(isset($order['data']) && $order['data']["order_status"] == '0'){
    	               $this->_view->assign(array('message' => '订单未支付'));
    	               Yaf_Dispatcher::getInstance()->autoRender(FALSE);
    	               $this->getView()->display('insurance/error.php');    //错误跳转页面
    	               exit;
    	        }
	            $title ="";
	            $description ="";
	            if (isset($order['status']) && $order['status'] == SUCCESS_STATUS){
	                $list["hash"] = $this->getHash(true);
	                $list["title"] = $order["data"]["insurance_share_info"]["title"];
	                $list["description"] = $order["data"]["insurance_share_info"]["description"];
	            }
	        }
	    }else{
	        $this->_view->assign(array('message' => $res['msg']));
	        Yaf_Dispatcher::getInstance()->autoRender(FALSE);
	        $this->getView()->display('insurance/error.php');    //错误跳转页面
	        exit;
	    }
	 
	    $this->_view->assign(array(
	        'list' => $list
	    ));
	 
	}
	
	/**
	 * 保险用户信息
	 *
	 * @author lishiyuan
	 */
	public function UserInfoAction()
	{
	    $params['order_id'] = (int) $this->getParam('order_id', 0); // 订单ID
	    $params['user_name'] = $this->getParam('user_name', ''); // 用户姓名
	    $params['card'] =    $this->getParam('card',''); // 身份证号码
	    $params['mobile'] =  $this->getParam('mobile', ''); // 手机号码
	    $params['sms_code'] =  $this->getParam('sms_code', ''); // 验证码
	    
	    //begin---检查手机验证码
	    $param=array(
	        "phone" => $params['mobile'],
	        "sms_code" => $params['sms_code'],
	        "type" => 1,
	    );
	    $smsRes = api_Sms::verifySmsCode($param);
	    
	    if (isset($smsRes['status']) && $smsRes['status'] != SUCCESS_STATUS) {
	        $this->readJson(baf_ResCode::msg(baf_ResCode::SMS_CODE_NOT_MATCH));
	    }else{
	        $res = api_Order::insertInsuranceUserInfo($params);     
	       
	        if (isset($res['status']) && $res['status'] == SUCCESS_STATUS) {
	            $this->readJson(baf_ResCode::msg());
	        }else{
	            $data =array('code' => $res['status'],'msg' =>$res['msg'] ,'data'=>$res['data']);
	          	$this->readJson($data);
	        }
	    }
	   
	}
	
	public function errorAction(){
	    $params['message'] =  $this->getParam('message', ''); // 错误信息
	    $this->_view->assign(array('message' => $params['message']));
	}
	
	
	public function getSmsCodeAction(){
	    $username = $this->getParam('phone');
	    $this->InsuranceCheckHash(true);
	    //验证码
	    if (preg_match('/1[2345678]{1}\d{9}$/', $username) == 0) {
	        $this->readJson(baf_ResCode::msg(baf_ResCode::PHONE_ERROR));
	    }
	    
	    //begin 一天只能获取固定次数的验证码
	    $limitKey = 'sms_code_login_limit_' . $username;
	    $dayRes = $this->cache()->get($limitKey);
	    if ($dayRes >= 30) {
	        $this->readJson(baf_ResCode::msg(baf_ResCode::GET_SMS_CODE_DAYLIMIT));
	    }
	    //end;
	    
	    if ($this->smscodeGetLimit($username . '_1_smscode')) {
	        $this->readJson(baf_ResCode::msg(baf_ResCode::SMSCODE_TIME_LIMIT));
	    }
	     
	    $loginRes = api_Sms::sendSmsCode(array('phone' => $username, 'type' => '1'));
	   
	    if (is_array($loginRes) && isset($loginRes['status']) && $loginRes['status'] == SUCCESS_STATUS) {
	        $this->cache()->set($limitKey, $dayRes + 1, 6 * 60 * 60); // 6小时
	        $this->smscodeGetLimit($username . '_1_smscode', 1);
	        $this->readJson(baf_ResCode::msg());
	    
	    } else {
	    
	        $this->readJson(baf_ResCode::msg(baf_ResCode::GET_SMS_CODE_ERROR));
	    }
	}
	
	/**
	 * 手机验证码获取限制
	 * @param unknown $key
	 * @param number $set
	 * @return boolean|Ambigous <mixed, boolean, string>
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
	 * 投保描述页
	 *
	 * @author wgx
	 */
	public function insuranceDesAction()
	{
	   $this->render('insurancedes');
	}

	/**
	 * 投保法案
	 *
	 * @author wgx
	 */
	public function insuranceLawAction()
	{
	   $this->render('insurancelaw');
	}
	
	/**验证hash
	 * @param bool $rendHash
	 * @param bool $return
	 * @return bool
	 */
	protected function InsuranceCheckHash($rendHash=false, $return = false){
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
}