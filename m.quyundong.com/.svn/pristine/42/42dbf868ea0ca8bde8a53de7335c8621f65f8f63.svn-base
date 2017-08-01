<?php
/**
 * app web view入口
 *  
 * @author bigticket
 */
class SController extends DefaultController {
    
    /**
     * 商家管理员推广主页(sm 为suppliers manager简写)
     */
    public function SAction()
    {
        Yaf_Dispatcher::getInstance()->autoRender(FALSE);  // 关闭自动加载模板
        $log_id = (int)$this->getParam('l');
        $venues_id = (int)$this->getParam('v');
        $cat_id = (int)$this->getParam('c');
        $type = (int)$this->getParam('t');
        $sign = $this->getParam('s');
        if(empty($sign) || empty($log_id) || empty($venues_id) || empty($cat_id) || $sign != substr(md5($log_id.$venues_id.$cat_id.$type.'@spread'),0,6)){
            $this->redirectMessage('打开的方式不对');
        }

        if($type == 1){
            api_Meapi::updateSpreadLogNew(array('id'=>$log_id,'has_click'=>1));
        }

        //http://m.qydw.net/court/detail?id=16617&cid=1&said=1&from=11
        $this->_view->assign(array(
            'log_id' => $log_id,
            'court_url' => Config::getDomain('m').'court/detail?id='.$venues_id.'&cid='.$cat_id.'&from=11',
        ));

        $this->display('suppliersManagerSpread');
    }

    public function CAction()
    {
        $log_id = (int)$this->getParam('log_id');
        $value = $this->getParam('value');

        if(function_exists('fastcgi_finish_request')){
            echo json_encode(array('code'=>"0000",'msg'=>'success'));
            fastcgi_finish_request();
        }
        if(!empty($log_id) && !empty($value)){
            api_Meapi::updateSpreadLogNew(array('id'=>$log_id,$value=>1));
        }
        return false;//不加载模板
    }

    /**
     * 商家管理员二维码主页(sm 为suppliers manager简写)
     */
    public function HAction()
    {
        Yaf_Dispatcher::getInstance()->autoRender(FALSE);  // 关闭自动加载模板

        $vid = (int)$this->getParam('id');
        $cid = (int)$this->getParam('cid');
        $said = (int)$this->getParam('said');
        $sid = (int)$this->getParam('sid');
        $sign = (int)$this->getParam('sign');
        if(empty($vid) || empty($cid) || empty($said) || empty($sid) || $sign != substr(md5($vid.$cid.$said.$sid.'@spread'),0,6) ){
            $this->redirectMessage('打开的方式不对');
        }
        api_CoreHelper::setCookie('vid',$vid);//场馆id
        api_CoreHelper::setCookie('cid',$cid);//分类id
        api_CoreHelper::setCookie('said',$said);//管理员id
        api_CoreHelper::setCookie('sid',$sid);//商家id
        api_CoreHelper::setCookie('time',time());//商家id

        $this->display('suppliersManagerHome');
    }

    /**
     * 商家管理员推广验证码
     */
    public function GAction()
    {
        $phone = $this->getParam('phone');
        $code = $this->getParam('checkNumber');
        $vid = api_CoreHelper::getCookie('vid');
        $cid = api_CoreHelper::getCookie('cid');
        $said = api_CoreHelper::getCookie('said');
        $sid = api_CoreHelper::getCookie('sid');
        $time = api_CoreHelper::getCookie('time');
        $success = false;
        $id = '0';
        if(api_CoreHelper::isMobile($phone) && !empty($code) && !empty($vid) && !empty($cid) && !empty($said) && !empty($sid)){
            $result = api_Sms::verifySmsCode(array('phone'=>$phone,'sms_code'=>$code,'type'=>11));
            if(isset($result['status']) && $result['status'] == SUCCESS_STATUS){
                //验证成功
                $success = true;
                //插入记录
                $verified = $this->cache()->get($phone.$code);
                if(!$verified){
                    //未验证过插入记录
                    $param = array(
                        'suppliers_id' => $sid,
                        'business_id' => $vid,
                        'category_id' => $cid,
                        'admin_id' => $said,
                        'phone' => $phone,
                        'time' => $time,
                        'type' => 2,
                    );
                    $result = api_Meapi::addSpreadLogNew($param);
                    if(isset($result['data']) && !empty($result['data']['id'])){
                        $verified = $result['data']['id'];
                        $this->cache()->set($phone.$code,$verified,1800);//30分钟
                    }else{
                        $success = false;
                    }
                }
                $id = $verified;
            }
        }
        $status = $success ? baf_ResCode::SUCCESS : baf_ResCode::SMS_CODE_NOT_MATCH;
        $s = substr(md5($id.$vid.$cid.'2@spread'),0,6);
        $query = 'l='.$id.'&v='.$vid.'&c='.$cid.'&t=2'.'&s='.$s;
        $this->readJson(baf_ResCode::msg($status,array('url'=>Config::getDomain('m').'s/s/?'.$query)));
    }

}
