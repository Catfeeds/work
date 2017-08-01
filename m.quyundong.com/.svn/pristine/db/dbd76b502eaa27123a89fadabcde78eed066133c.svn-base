<?php

/**
 * Author: SZJ
 * Date: 2016/4/18 17:14
 */
class BadmintonController extends DefaultController
{
    public $lock_name = '';

    /**
     * 首页
     */
    public function IndexAction()
    {
        $code = $this->getParam('code', '');
        if (!api_WxApi::checkAuth($code)) {
            $returnUrl = baf_Base::base_url() . '/badminton/index';
            $returnUrl = api_WxApi::createAuthUrl($returnUrl);
            $this->redirect($returnUrl);
            exit;
        }
        $menSingle = baf_Common::dbModel('BadmintonSignup')->checkCount(1);
        $womenSingle = baf_Common::dbModel('BadmintonSignup')->checkCount(2);
        $menDouble = baf_Common::dbModel('BadmintonSignup')->checkCount(3);
        $typeStatus = array(
            'men_single' => ($menSingle < baf_Common::getOption('badminton_total_1', 100)) ? 1 : 0,
            'women_single' => ($womenSingle < baf_Common::getOption('badminton_total_2', 100)) ? 1 : 0,
            'men_double' => ($menDouble < baf_Common::getOption('badminton_total_3', 100)) ? 1 : 0,
        );
        $this->updateAllOrder();
        $activityStatus = time() < (strtotime(baf_Common::getOption('badminton_end_date', '2016-05-13')) + 86400) ? 1 : 0;
        $this->getView()->assign(array('typeStatus' => $typeStatus, 'activityStatus' => $activityStatus, 'share_total' => baf_Redis::factory()->get('7yundong:badminton:share_total')));
    }

    /**
     * 报名
     */
    public function signupAction()
    {
        $type = (int)$this->getParam('type', 0);
        $phone = $this->getParam('phone', 0);
        $name = $this->getParam('name', false);
        $smsCode = $this->getParam('sms_code');
        $this->checkHash(false);
        baf_Common::log('badminton_singup', 'INFO', 'singupinfo', array('type' => $type, 'phone' => $phone, 'name' => $name, 'smsCode' => $smsCode));
        //检查日期
        if (time() > (strtotime(baf_Common::getOption('badminton_end_date', '2016-05-13')) + 86400)) {
            $this->readJson(baf_ResCode::msg(baf_ResCode::ERR_SIGNUP_FAILED));
        }
        //检查总量
        $totalKey = '7yundong:badminton:signtotal' . $type;
        if (!baf_Base::is_mobile_new($phone)) {
            $this->readJson(baf_ResCode::msg(baf_ResCode::PHONE_ERROR));
        }
        if (strlen($smsCode) != 5) {
            $this->readJson(baf_ResCode::msg(baf_ResCode::SMS_CODE_NOT_MATCH));
        }

        if (!$name) {
            $this->readJson(baf_ResCode::msg(baf_ResCode::ERR_NAME_EMPTY));
        }
        if (!api_WxApi::checkAuth('')) {
            $returnUrl = baf_Base::base_url() . '/badminton/index';
            $returnUrl = api_WxApi::createAuthUrl($returnUrl);
            $this->readJson(baf_ResCode::msg(baf_ResCode::WX_AUTH_FAILED, array('redirect_url' => $returnUrl)));
        }
        $this->lock_name = $phone + $smsCode;
        $this->lock();
        //总量
        $total = baf_Common::dbModel('BadmintonSignup')->checkCount($type);
        if ($total >= baf_Common::getOption("badminton_total_" . $type)) {
            $this->unlockreadJson(baf_ResCode::msg(baf_ResCode::ERR_NO_MORE_SEAT));
        }
        if (baf_Common::dbModel('BadmintonSignup')->checkExists(compact('type', 'phone', 'name'))) {
            $res = baf_ResCode::msg(baf_ResCode::ERR_ALREADY_SIGNUP);
            $res['msg'] = $name . $res['msg'];
            $this->unlockreadJson($res);
        }

        //登录部分
        $loginParam = array(
            'phone' => $phone,
            'sms_code' => $smsCode,
        );
        $userRes = api_User::phoneQuckLogin($loginParam);
        $this->loginProcess($userRes);
        //检查是否有未支付的订单
        $dueParam = array('user_id' => $userRes['user_id'], 'ver' => '1.1');
        $dueRes = api_Order::orderDueCount($dueParam);
        if (isset($dueRes) && $dueRes['status'] == '0000') {
            if ($dueRes['data']['count'] > 0) {
                $this->unlockreadJson(baf_ResCode::msg(baf_ResCode::ORDER_UNPAID, $dueRes['data']));
            }
        } else if (!isset($dueRes)) {
            $this->unlockreadJson(baf_ResCode::msg(baf_ResCode::ORDER_UNPAID_FAILED));
        }
        //下单
        // 4微信用户   5手机网站用户
        $from = api_CoreHelper::IsWenXinBrowser() ? 4 : 5;
        $orderParam = array(
            'goods_ids' => self::goodIds($type),
            'user_id' => $userRes['user_id'],
            'phone' => api_CoreHelper::getCookie('phone'),
            'from' => $from,
            'order_type' => 1,
            'goods_number' => 1,
            'utm_source' => CHANNEL_SOURCE ? CHANNEL_SOURCE : '' //来源渠道
        );
        //确认订单
        $orderRes = api_Order::insertOrder($orderParam);
        if (isset($orderRes['status'])) {
            if ($orderRes['status'] == SUCCESS_STATUS) {
                $insertData = array(
                    'name' => $name,
                    'phone' => $phone,
                    'type' => $type,
                    'user_id' => $userRes['user_id'],
                    'status' => 0,
                    'open_id' => api_WxApi::$token['openid'],
                    'order_id' => $orderRes['data']['order_id'],
                    'add_time' => time(),
                );
                $res = baf_Common::dbModel('BadmintonSignup')->insert($insertData);
                if (!$res) {
                    baf_Common::log('badmintonsignup_failed', 'DEBUG', 'insert_err', $insertData);
                    $param = array(
                        'order_id' => $orderRes['data']['order_id'],
                        'user_id' => $userRes['user_id'],
                    );
                    api_Order::orderCancel($param);
                    $this->unlockreadJson(baf_ResCode::msg(baf_ResCode::ERR_SIGNUP_FAILED));
                } else {
                    baf_Redis::factory()->incr($totalKey);
                    $payUrl = baf_Base::base_url() . '/order/pay/?id=' . $orderRes['data']['order_id'];
                    $this->unlockreadJson(baf_ResCode::msg('', array('redirect_url' => $payUrl)));
                }
            } else {
                baf_Common::log('badmintonsignup_failed', 'DEBUG', 'insert_err', $orderRes);
            }
            if ($orderRes['status'] == '0308') {
                $this->unlockreadJson(baf_ResCode::msg(baf_ResCode::COURT_ORDERED));
            } else {
                $msg = isset($orderRes['msg']) && $orderRes['msg'] ? $orderRes['msg'] : '下单失败';
                $this->unlockreadJson(baf_ResCode::msg(baf_ResCode::OTHER_ERR, $msg));
            }
        } else {
            $this->unlockreadJson(baf_ResCode::msg(baf_ResCode::SYSTEM_ERROR));
        }
    }

    /**
     * 获取快捷登录验证码
     */
    public function getSmsCodeAction()
    {
        $username = $this->getParam('phone');
        $this->checkHash(false);
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
    /***************************************************训练营报名部分****************************************/
    /**
     * 训练报名首页
     */
    public function trainingAction()
    {
        $this->updateAllOrder();
        $activityStatus = time() < (strtotime(baf_Common::getOption('badminton_training_end_date', '2016-05-30')) + 86400) ? 1 : 0;
        /*在这判断名额是否已满，是返回：$activityStatus = 2 add by xyx*/
        $limit=0;$count=0;
        if($activityStatus){
            $limit=baf_Common::getOption('badminton_training_limit', '12');            
            $phase=baf_Common::getOption('badminton_training_phase', 'texunying');
            $count=baf_Common::dbModel('BadmintonSignup')->checkCount(4,$phase);
            $activityStatus = $limit-$count>0 ? 1 : 2 ;
        }
        $this->getView()->assign(array('activityStatus' => $activityStatus,'surplusPlaces'=>$limit-$count));
    }

    /**
     * 训练报名
     */
    public function trainingSignupAction()
    {
        $type = 4;
        $phone = $this->getParam('phone', 0);
        $name = $this->getParam('name', false);
        $smsCode = $this->getParam('sms_code');
        $number=$this->getParam('number',1);
        $this->checkHash(false);
        if (time() > (strtotime(baf_Common::getOption('badminton_training_end_date', '2016-07-18')) + 86400) || $number<1) {
            $this->readJson(baf_ResCode::msg(baf_ResCode::ERR_SIGNUP_FAILED));
        }
        $phase=baf_Common::getOption('badminton_training_phase', 'texunying');
        /*在这判断名额是否已满，是返回：$activityStatus = 2 */
        $surplusPlaces=baf_Common::getOption('badminton_training_limit', '12')-baf_Common::dbModel('BadmintonSignup')->checkCount($type,$phase);
        if ($surplusPlaces<=0) {
            $this->readJson(baf_ResCode::msg(baf_ResCode::ERR_NO_MORE_SEAT));
        }elseif($surplusPlaces<$number){
            $this->readJson(baf_ResCode::msg(baf_ResCode::ERR_OUT_NUMBER_SEAT,array('surplusPlaces'=>$surplusPlaces)));
        }
        if (!baf_Base::is_mobile_new($phone)) {
            $this->readJson(baf_ResCode::msg(baf_ResCode::PHONE_ERROR));
        }
        if (strlen($smsCode) != 5) {
            $this->readJson(baf_ResCode::msg(baf_ResCode::SMS_CODE_NOT_MATCH));
        }
        if (!$name) {
            $this->readJson(baf_ResCode::msg(baf_ResCode::ERR_NAME_EMPTY));
        }
        $this->lock_name = $phone + $smsCode;
        $this->lock();
       
        if (baf_Common::dbModel('BadmintonSignup')->checkExists(compact('type', 'phone', 'name','phase'))) {
            $res = baf_ResCode::msg(baf_ResCode::ERR_ALREADY_SIGNUP);
            $res['msg'] = $name . $res['msg'];
            $this->unlockreadJson($res);
        }
        //登录部分
        $loginParam = array(
            'phone' => $phone,
            'sms_code' => $smsCode,
        );
        $userRes = api_User::phoneQuckLogin($loginParam);
        $this->loginProcess($userRes);
        //检查是否有未支付的订单
        $dueParam = array('user_id' => $userRes['user_id'], 'ver' => '1.1');
        $dueRes = api_Order::orderDueCount($dueParam);
        if (isset($dueRes) && $dueRes['status'] == '0000') {
            if ($dueRes['data']['count'] > 0) {
                $this->unlockreadJson(baf_ResCode::msg(baf_ResCode::ORDER_UNPAID, $dueRes['data']));
            }
        } else if (!isset($dueRes)) {
            $this->unlockreadJson(baf_ResCode::msg(baf_ResCode::ORDER_UNPAID_FAILED));
        }
        //下单
        // 4微信用户   5手机网站用户
        $from = api_CoreHelper::IsWenXinBrowser() ? 4 : 5;
        $orderParam = array(
            'goods_ids' => self::goodIds($type),
            'user_id' => $userRes['user_id'],
            'phone' => api_CoreHelper::getCookie('phone'),
            'from' => $from,
            'order_type' => 1,
            'goods_number' => $number,
            'utm_source' => CHANNEL_SOURCE ? CHANNEL_SOURCE : '' //来源渠道
        );
        //确认订单
        $orderRes = api_Order::insertPersonOrder($orderParam);
        if (isset($orderRes['status'])) {
            if ($orderRes['status'] == SUCCESS_STATUS) {
                $insertData = array(
                    'name'      => $name,
                    'phone'     => $phone,
                    'type'      => $type,
                    'user_id'   => $userRes['user_id'],
                    'status'    => 0,
                    'open_id'   => api_WxApi::$token['openid'],
                    'order_id'  => $orderRes['data']['order_id'],
                    'add_time'  => time(),
                    'phase'     => $phase,
                    'number'    => $number
                );
                $res = baf_Common::dbModel('BadmintonSignup')->insert($insertData);
                if (!$res) {
                    baf_Common::log('badmintonsignup_failed', 'DEBUG', 'sql_err', $insertData);
                    $param = array(
                        'order_id' => $orderRes['data']['order_id'],
                        'user_id' => $userRes['user_id'],
                    );
                    api_Order::orderCancel($param);
                    $this->unlockreadJson(baf_ResCode::msg(baf_ResCode::ERR_SIGNUP_FAILED));
                } else {
                    $payUrl = baf_Base::base_url() . '/order/pay/?id=' . $orderRes['data']['order_id'];
                    $this->unlockreadJson(baf_ResCode::msg('', array('redirect_url' => $payUrl)));
                }
            } else {
                baf_Common::log('badmintonsignup_failed', 'DEBUG', 'insert_err', $orderRes);
            }
            if ($orderRes['status'] == '0308') {
                $this->unlockreadJson(baf_ResCode::msg(baf_ResCode::COURT_ORDERED));
            } else {
                $msg = isset($orderRes['msg']) && $orderRes['msg'] ? $orderRes['msg'] : '下单失败';
                $this->unlockreadJson(baf_ResCode::msg(baf_ResCode::OTHER_ERR, $msg));
            }
        } else {
            $this->unlockreadJson(baf_ResCode::msg(baf_ResCode::SYSTEM_ERROR));
        }
    }
    /************************************************训练营部分结束*************************************/

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
     * 获取订单信息
     */
    public function getorderAction()
    {
        if (!api_WxApi::checkAuth('')) {
            $returnUrl = baf_Base::base_url() . '/badminton/index';
            $returnUrl = api_WxApi::createAuthUrl($returnUrl);
            $this->readJson(baf_ResCode::msg(baf_ResCode::WX_AUTH_FAILED, array('redirect_url' => $returnUrl)));
        }
        $returnOrder = $this->updateOrder();
        $this->readJson(baf_ResCode::msg('', $returnOrder));
    }

    public function getTrainingOrderAction()
    {
        $returnOrder = $this->updateOrder(4);
        $this->readJson(baf_ResCode::msg('', $returnOrder));
    }

    /**
     * 更新订单信息
     * @return array
     */
    private function updateOrder($type = '')
    {
        if ($type == 4) {
            $phone = $this->getParam('phone', '');
            $smsCode = $this->getParam('sms_code', '');
            //登录部分
            $loginParam = array(
                'phone' => $phone,
                'sms_code' => $smsCode,
            );
            $userRes = api_User::phoneQuckLogin($loginParam);
            if (isset($userRes['status']) && $userRes['status'] == '0000') {
                $signupOrder = baf_Common::dbModel('BadmintonSignup')->getByPhone($phone);
            } else if(isset($userRes['status'])) {
                if ($userRes['status'] == '0201') {
                    $this->unlockreadJson(baf_ResCode::msg(baf_ResCode::USERNAME_NOT_FOUND));
                }
                if ($userRes['status'] == '0222') {
                    $this->unlockreadJson(baf_ResCode::msg(baf_ResCode::SMSCODE_ERR));
                }
            }else{
                baf_Common::log('badminton_signup', 'DEBUG', 'loginfailed', $userRes);
                $this->unlockreadJson(baf_ResCode::msg(baf_ResCode::SYSTEM_ERROR));
            }
        } else {
            $signupOrder = baf_Common::dbModel('BadmintonSignup')->getByOpenId(api_WxApi::$token['openid']);
        }
        if (!empty($signupOrder)) {
            $orderIds = array();
            foreach ($signupOrder as $k => $v) {
                if ($v['order_id'] && !$v['status']) {
                    $orderIds[] = $v['order_id'];
                }
            }
            $orderStr = implode(',', $orderIds);
            $orderStatus = array();
            $statusRes = api_Order::batchGetStatus(array('order_ids' => $orderStr));
            if (isset($statusRes['status']) && $statusRes['status'] == '0000') {
                foreach ($statusRes['data'] as $v) {
                    $orderStatus[$v['id']] = $v['status'];
                }
            }

            foreach ($signupOrder as $k => $v) {
                if (!$v['status']) {
                    if ($v['order_id'] && isset($orderStatus[$v['order_id']]) && in_array($orderStatus[$v['order_id']], array(1, 3, 4))) {
                        $v['status'] = 1;
                    } else if ($v['order_id'] && isset($orderStatus[$v['order_id']]) && $orderStatus[$v['order_id']] == 0) {
                        $v['order_status'] = "待支付";
                    } else if (!$v['order_id']) {
                        $v['status'] = 3;
                    } else if ($v['order_id'] && isset($orderStatus[$v['order_id']]) && !in_array($orderStatus[$v['order_id']], array(0, 1, 3, 4))) {
                        $v['status'] = 2;
                    }
                }
                $signupOrder[$k] = $v;
            }

            $orderStatusOptions = array('1' => '报名成功', '2' => '报名失败', '3' => '下单失败', '0' => '待定');
            foreach ($signupOrder as $k => $v) {
                $price=$this->goodsAmount($v['type']);
                $v['amount'] = (isset($price[$v['phase']])?$price[$v['phase']]:50)*$v['number'];
                $v['type'] = $this->goodsName($v['type']);
                $v['order_status'] = isset($v['order_status']) ? $v['order_status'] : $orderStatusOptions[$v['status']];
                $signupOrder[$k] = $v;
            }

            baf_Common::dbModel('BadmintonSignup')->updateStatus($signupOrder);
            return $signupOrder;
        } else {
            return array();
        }
    }

    private function updateAllOrder()
    {
        $allOrder = baf_Common::dbModel('BadmintonSignup')->getByStatusZ();
        if (!empty($allOrder)) {
            $orderIds = array();
            foreach ($allOrder as $v) {
                $orderIds[] = $v['order_id'];
            }
            $orderStr = implode(',', $orderIds);
            //获取状态BEGIN
            if (!empty($orderIds)) {
                $orderStatus = array();
                $statusRes = api_Order::batchGetStatus(array('order_ids' => $orderStr));
                if (isset($statusRes['status']) && $statusRes['status'] == '0000') {
                    foreach ($statusRes['data'] as $v) {
                        $orderStatus[$v['id']] = $v['status'];
                    }
                }
                //更新数据
                if (!empty($orderStatus)) {
                    foreach ($allOrder as $k => $v) {
                        if ($v['order_id'] && isset($orderStatus[$v['order_id']]) && in_array($orderStatus[$v['order_id']], array(1, 3, 4))) {
                            $v['status'] = 1;
                        } else if ($v['order_id'] && isset($orderStatus[$v['order_id']]) && $orderStatus[$v['order_id']] == 0) {
                            $v['order_status'] = "待支付";
                        } else if (!$v['order_id']) {
                            $v['status'] = 3;
                        } else if ($v['order_id'] && isset($orderStatus[$v['order_id']]) && !in_array($orderStatus[$v['order_id']], array(0, 1, 3, 4))) {
                            $v['status'] = 2;
                        }
                        $allOrder[$k] = $v;
                    }
                    baf_Common::dbModel('BadmintonSignup')->updateStatus($allOrder);
                }
            }
            //获取状态END
        }
    }

    /**
     * 分享
     * @throws Exception
     */
    public function shareAction()
    {
        $this->checkHash(false);
        baf_Redis::factory()->incr('7yundong:badminton:share_total');
        $this->readJson(baf_ResCode::msg());
    }

    /**
     * 登录流程
     * @param $userRes
     */
    private function loginProcess($userRes)
    {
        if (isset($userRes['status'])) {
            if ($userRes['status'] == '0201') {
                $this->unlockreadJson(baf_ResCode::msg(baf_ResCode::USERNAME_NOT_FOUND));
            }
            if ($userRes['status'] == '0222') {
                $this->unlockreadJson(baf_ResCode::msg(baf_ResCode::SMSCODE_ERR));
            }

            if ($userRes['status'] == SUCCESS_STATUS) {
                $user = array(
                    'user_id' => $userRes['user_id'],
                    'phone' => $userRes['phone'],
                    'nick_name' => $userRes['nick_name'],
                    'avatar' => $userRes['avatar'],
                );
                api_WxUser::setLoginCookie($user, LOGIN_TIME_LIMIT);
            } else {
                //出错提示信息
                if (isset($loginRes['msg'])) {
                    $this->unlockreadJson(baf_ResCode::msg(baf_ResCode::OTHER_ERR, $loginRes['msg']));
                } else {
                    $this->unlockreadJson(baf_ResCode::msg(baf_ResCode::SYSTEM_ERROR));
                }
            }
        } else {
            baf_Common::log('badminton_signup', 'DEBUG', 'loginfailed', $userRes);
            $this->unlockreadJson(baf_ResCode::msg(baf_ResCode::SYSTEM_ERROR));
        }
    }

    /**
     * 获取商品id
     * @param $type
     * @return int|mixed
     */
    public static function goodIds($type)
    {
        if(getenv('PAY_HOST')){
            $goods = array(
                '1' => baf_Common::getOption('badminton_goods_id_1', 54),
                '2' => baf_Common::getOption('badminton_goods_id_2', 55),
                '3' => baf_Common::getOption('badminton_goods_id_3', 56),
                '4' => baf_Common::getOption('badminton_goods_id_4', 59),
            );
        }else{
            $goods = array(
                '1' => baf_Common::getOption('badminton_goods_id_1', 1093),
                '2' => baf_Common::getOption('badminton_goods_id_2', 1094),
                '3' => baf_Common::getOption('badminton_goods_id_3', 1095),
                '4' => baf_Common::getOption('badminton_goods_id_4', 1100),
            );
        }
        return isset($goods[$type]) ? $goods[$type] : 0;
    }

    public static function goodsAmount($type)
    {
        $goods = array(
            '1' => 1,
            '2' => 1,
            '3' => 2,
            '4' => array(
                4=>350,
                )
        );
        return isset($goods[$type]) ? $goods[$type] : 0;
    }


    public static function goodsName($type)
    {
        $goods = array(
            '1' => '男子单打',
            '2' => '女子单打',
            '3' => '男子双打',
            '4' => '训练营',
        );
        return isset($goods[$type]) ? $goods[$type] : 0;
    }

    private function lock()
    {
        $lock = '7yundong:bmtlock:' . $this->lock_name;
        $isLock = baf_Redis::factory()->get($lock);
        if ($isLock) {
            $this->readJson(baf_ResCode::msg(baf_ResCode::SYSTEM_ERROR));
        } else {
            baf_Redis::factory()->set($lock, 1, 5);
        }
    }

    private function unlockreadJson($data)
    {
        $lock = '7yundong:bmtlock:' . $this->lock_name;
        baf_Redis::factory()->set($lock, 0, 1);
        $this->readJson($data);
    }
}