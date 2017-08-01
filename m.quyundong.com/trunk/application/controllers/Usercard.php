<?php

/**
 * 用户场馆会员卡
 *
 * @author xiaosibo
 * @date   2015-04-21
 */
class UserCardController extends UserBaseController
{
    /**
     * 会员卡列表
     *
     * @return void
     * @author xiaosibo
     */
    public function indexAction()
    {
        // 读取会员卡列表
        $from = $this->getParam('from', '');
        $login = $this->getParam('login', '');        
        $param = array(
            'user_id' => $this->uid,
            'phone' => api_CoreHelper::getCookie('phone') ? api_CoreHelper::getCookie('phone') : api_WxUser::$phone,
            'ver' => '2.1',
        );
        if(!empty($_SESSION['wechat_id'])){
        	$wechatInfo = api_WxApi::appId();
        	if(!empty($wechatInfo['venues_id'])) $param['venues_id'] = $wechatInfo['venues_id'];
        }
        $cardRes = api_UserCard::getCardList($param);

        $cardList = array();
        if (is_array($cardRes) && isset($cardRes['status']) && $cardRes['status'] == SUCCESS_STATUS) {
            if (isset($cardRes['data']['list'])) {
                $cardList = $cardRes['data']['list'];
            }
        }

        $this->setPageTitle(array('utm_source'=>CHANNEL_SOURCE));

        $this->_view->assign(array(
                'cardList' => $cardList,
                'from' => $from,
                'login' => $login,
            )
        );
    }

    /**
     * 消费记录
     */
    public function translistAction()
    {
        $venue_id = (int)$this->getParam('venue_id', '');
        $login = $this->getParam('login', '');
        $mobile = $this->getParam('mobile', '');
        $card_no = $this->getParam('card_no', '');
        $param = array(
            'user_id' => $this->uid, 
            'venues_id' => $venue_id, 
            'phone' => api_CoreHelper::getCookie('phone') ? (string)api_CoreHelper::getCookie('phone') : (string)api_WxUser::$phone,
            'ver' => '2.1',
        );
        $cardRes = api_UserCard::getCardList($param);
        $cardList = array();
        if (is_array($cardRes) && isset($cardRes['status']) && $cardRes['status'] == SUCCESS_STATUS) {
            if (isset($cardRes['data']['list'])) {
                $cardList = $cardRes['data']['list'];
            }
        }
        $balance = 0;
        $mark = false;
        if (is_array($cardList)) {
            foreach ($cardList as $v) {
            	//&& $v['card_mobile_phone'] == $mobile
                if ($v['venues_id'] == $venue_id && $v['card_no'] == $card_no ) {
                    $balance = floatval($v['balance']);
                    $mark = true;
                    $mobile = $v['card_mobile_phone'];
                    break;
                }
            }
        }
        $this->setPageTitle(array('utm_source'=>CHANNEL_SOURCE));

        $this->_view->assign(
            array(
                'balance' => $balance,
                'login' => $login,
                'mark' => $mark,
                'mobile'=>$mobile,
            )
        );
    }

    /**
     * 消费记录
     */
    public function translistApiAction()
    {
        $param['venue_id'] = (int)$this->getParam('venue_id', '');
        $param['mobile'] = $this->getParam('mobile', '');
        $param['card_no'] = $this->getParam('card_no', '');
        $param['user_id'] = $this->uid;
        $param['page'] = $this->getParam('page', '1');
        $transRes = api_UserCard::cardConsume($param);
        $data = array();
        if (isset($transRes['status']) && $transRes['status'] == '0000') {
            if (!empty($transRes['data'])) {
                $lists = array();
                if(isset($transRes['data']['list']) && !empty($transRes['data']['list'])){
                    $lists = $transRes['data']['list'];
                }
                if(!empty($lists)){
                    foreach ($lists as $k => $card) {
                        if ($card['type'] == 6) {
                            $card['money'] = $card['money'];
                        } else if ($card['type'] == 7) {
                            $card['money'] = '-' . $card['money'];
                        }
                        $data[$k] = $card;
                    }    
                }
                
            }
            $res = array(
                'status' => '0000',
                'msg' => '',
                'data' => $data,
            );
        } else {
            $res = array(
                'status' => baf_ErrorCode::ERR_SYTEM_BUSY,
                'msg' => '读取失败',
                'data' => array(),
            );
        }
        $this->readJson($res);
    }

    /**
     * 会员卡详情
     *
     * @return void
     * @author xiaosibo
     */
    public function detailAction()
    {
        $cno = $this->getParam('cno'); // 场馆会员卡的卡号

        $venues_id = $this->getParam('venues_id'); // 场馆会员卡的卡号

        if (!$cno || !$venues_id) {
            $this->redirectMessage('缺少请求参数');
        }

        $cardParam = array('card_no' => $cno, 'user_id' => $this->uid, 'venues_id' => $venues_id);

        // 读取会员卡信息
        $res = api_UserCard::getCardDetail($cardParam);

        $cardInfo = array();
        if (is_array($res) && isset($res['status']) && $res['status'] == SUCCESS_STATUS) {
            $cardInfo = $res['data'];
        } else {
            // 读取会员卡失败
            $this->redirectMessage((isset($res['msg']) && $res['msg']) ? $res['msg'] : '网络繁忙，请稍后重试');
        }

        if (empty($cardInfo)) {
            $this->redirectMessage('会员卡不存在');
        }

        if ($this->uid > 0
            && $cardInfo['user_id'] > 0
            && $cardInfo['card_mobile_phone']
            && $cardInfo['card_mobile_phone'] != api_CoreHelper::getCookie('phone')
        ) {
            $this->redirectMessage('sorry,会员卡功能暂未开放');
            $this->redirectMessage('该会员卡的预留手机为' . api_CoreHelper::mobileHidden($cardInfo['card_mobile_phone']) . '用这个号码注册登录后才能使用该会员卡');
        }
        $categories = isset($cardInfo['venues_list']) ? $cardInfo['venues_list'] : array();
        $this->setPageTitle(array('title'=>'会员卡详情-趣运动'));
        $this->_view->assign(array(
            'cardInfo' => $cardInfo,
            'categories' => $categories
        ));
    }
}