<?php
/**
* 教练版邀请活动
* @author bigticket
*/
    
class CoachRewardController extends DefaultController  {
    
    /**
     * 获取奖励页面
     */
    public function IndexAction(){  
        $this->_view->assign(array(
            'content' => 'monCardIndex'
        ));
    }
    
    /**
     * 获取短信验证码
     */
    public function GetSmsCodeAction(){
        $phone = strip_tags($this->getParam('phone', ''));
        $this->checkHash(true);
        if (preg_match('/1[2345678]{1}\d{9}$/', $phone) == 0) {
            $this->readJson(baf_ResCode::msg(baf_ResCode::PHONE_ERROR));
        }
        
        $loginRes = api_Sms::sendSmsCode(array('phone' => $phone, 'type' => '1'));
     
        if (is_array($loginRes) && isset($loginRes['status'])) {
            //发送短信
            if($loginRes['status'] == SUCCESS_STATUS){
                $this->readJson(baf_ResCode::msg());
            }
        
            //已注册
            if($loginRes['status'] == '0903'){
                $this->readJson(baf_ResCode::msg(baf_ResCode::USER_HAD_REGISTER));
            }
        }
        $this->readJson(baf_ResCode::msg(baf_ResCode::GET_SMS_CODE_ERROR));
    }
    
    /**
     * 提交邀请
     */
    public function PostInviteCodeAction(){
        $phone = strip_tags( $this->getParam('phone', ''));
        $sms_code = $this->getParam('sms_code', '');
        $code =  $this->getParam('code', '');
              
        if (preg_match('/1[2345678]{1}\d{9}$/', $phone) == 0) {
            $this->readJson(baf_ResCode::msg(baf_ResCode::PHONE_ERROR));
        }
         
        if (strlen($sms_code) != 5) {
            $this->readJson(baf_ResCode::msg(baf_ResCode::SMSCODE_ERR));
        }
        
        $param = array('phone' => $phone, 'sms_code' => $sms_code,'invite_code'=>$code);

        $registerRes = api_Coach::inviteCodeRegister($param);
        //成功
        if (is_array($registerRes) && isset($registerRes['status'])) {
            if ($registerRes['status'] == '0222') {
                $this->readJson(baf_ResCode::msg(baf_ResCode::SMSCODE_ERR));
            }
            //成功，发送短信
            if ($registerRes['status'] == SUCCESS_STATUS) {
                $this->readJson(baf_ResCode::msg());
            }
            else {
                //出错提示信息
                if (isset($registerRes['msg'])) {
                    $this->readJson(baf_ResCode::msg(baf_ResCode::OTHER_ERR, $registerRes['msg']));
                } else {
                    $this->readJson(baf_ResCode::msg(baf_ResCode::SYSTEM_ERROR));
                }
            }
        }
        else {
            $this->readJson(baf_ResCode::msg(baf_ResCode::SYSTEM_ERROR));
        }
    }
    
    /**
     * 介绍页面
     */
    public function IntroAction(){        
        $this->_view->assign(array(
            'content' => 'monCardIndex'
        ));
    }
    
    /**
     * 列表页面
     */
    public function ListAction(){        
        $list = $this->getRewardList();
        
        $this->_view->assign(array(
            'list' => $list
        ));
    }

    /**
     * 列表页面
     */
    public function GetRewardAction(){        
        $rewardList = $this->getRewardList();
        $this->readJson(baf_ResCode::msg(1,isset($rewardList['rewardList'])?$rewardList['rewardList']:array()));
    }


    private function getRewardList(){
        $page = (int)$this->getParam('page', 1);
        $count = (int)$this->getParam('count', 20);
        $user_id = (int)$this->getParam('coach_id', 0);
        
        $param = array(
            'user_id' => $user_id,
            'page' => $page,
            'count' => $count,
        );
        $res = api_Coach::rewardList($param);
        
        $list = array(
            'invite_amount' => 0,
            'invite_reward' => 0,
            'rewardList' => array()
        );
        
        if (isset($res['status']) && $res['status'] == SUCCESS_STATUS) {
            $list = $res['data'];
        }
        
        $rewardList = array();
        if(!empty($list['rewardList'])){
            foreach ($list['rewardList'] as $row){
                $key = 's_'.strtotime(date("Ymd",$row['add_time']));
                $rewardList[$key][] = $row;
            }
        }
        $list['rewardList'] = $rewardList;
        return $list;
    }
    
    /**
     * 邀请页面
     */
    public function InviteAction(){
        $code = (int)$this->getParam('code', '');
        $this->_view->assign(array(
            'code' => $code
        ));
    }
    
    /**
     * 订单活动介绍页面
     */
    public function OrderIntroAction(){
        $this->_view->assign(array(
            'content' => 'monCardIndex'
        ));
    }
    
    /**
     * 订单奖励页面
     */
    public function OrderAction(){
        $user_id = (int)$this->getParam('coach_id', 0);
        $param = array(
            'coach_id' => $user_id,
        );
        $res = api_Coach::orderRewardInfo($param);
        
        $list = array(
            'content' => '赶快开始约练，148元奖励等你拿！',
            'friends_count' => 0,
            'active_url' => '',
            'is_confirm'=> '',
            'is_new_user' => '',
            'active_date' => '',
        );
        
        if (isset($res['status']) && $res['status'] == SUCCESS_STATUS) {
            if(!empty($res['data'])){                
                $list = $res['data'];   
            }
        }
        
        //活动过期
        if(isset($list['active_date']) && $list['active_date'] < CURRENT_TIMESTAMP){
            $this->redirect('/coachReward/index');
            exit;
        }
        //echo json_encode($list);exit;

        $this->_view->assign(array(
            'list' => $list
        ));
    }
}
