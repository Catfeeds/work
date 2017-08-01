<?php
/**
 * @author [xieyunxia]
 * 2016.6.21
 */
class ActivitycommonController extends DefaultController
{
    /**
     * 活动首页接口
     * @author RedBo
     * @date   2016-06-23
     */
    public function IndexAction()
    {
       $query_str = $_SERVER['QUERY_STRING'];
       $this->redirect('/activitycommon/detail?'.$query_str);
    }

    /**
     * 活动验证 验证活动的状态：是否过期、是否已经报名
     *
     * @author RedBo
     * @date   2016-06-30
     * @modify by 谢云霞
     * @date   2016-07-14
     */
    public function CheckstatusAction()
    {
        $act_id    = $this->getParam('id');
        $clint_time= $this->getParam('client_time');
        $action = $this->getParam('action');
        if(!$act_id) {
            $this->readJson(baf_ResCode::msg(baf_ResCode::PARAM_ERR));
        }
        # 先对活动进行判断
        $param['act_id'] = $act_id;
        if(empty($action) && $action !='preview')
           $param['is_online'] = 1;
        $data = baf_Common::dbModel('ActivityCommon','quyundong')->getOne($param);
        if(empty($data)) {
            $this->readJson(baf_ResCode::msg(baf_ResCode::PARAM_ERR));
        }

        $time     = time();
        $actLimit = $data['act_limit'];
        $actPrice = '';
        $cData=array();
        $url = baf_Base::base_url().'/commoncomment/index?actid='.$data['act_id'];
        
        // 判断活动是否已过期
        if($data['act_end_time'] < $time && (!$data['venues_id'] || $data['is_need_comment_intime'])  || !$this->uid && $data['act_end_time'] < $time) {
            $this->readJson(baf_ResCode::msg(baf_ResCode::ERR_ACT_FAILED));
        }

        //判断活动是否已开始
        if($data['act_start_time'] > $time) {
            $this->readJson(baf_ResCode::msg(baf_ResCode::ERR_ACT_NO_START));
        }

        $number = 0;
        //线下活动，判断用户是否已经评论和跳转至评论，有可能用户未登录
        if($data['venues_id'] > 0) {
            $number = baf_Common::dbModel('ActivityCommon','quyundong')->getUserActOrderCount($act_id,$this->uid);//获取用户线下活动参与情况,返回该活动该用户已报名数量
        }
        // 线上活动
        if($this->uid > 0 && !$data['venues_id']) {
            if($data['is_need_userinfo'] ||$data['is_need_card']) {
                $param = ['user_id' => $this->uid, 'act_id' => $act_id];
                $number = baf_Common::dbModel('ActivityCommon','quyundong')->getUserofflineAactjoinCount($param);//获取线上活动该用户参与次数
            }
        }
        if($number>0){
            $hascomment=baf_Common::dbModel('CommonComment','quyundong')->checkExists(array('user_id' => $this->uid, 'relation_id' => $act_id,'comment_type'=>0));//判断是否已经评论过
            if(!$data['venues_id']&&$actLimit > 0 && $data['is_need_comment']&& !$hascomment) {//线上活动，已参与数量  >= 限制人数
                # 有活动人数限制显示剩余数量
                $joinnum = 0;
                $joinnum = baf_Common::dbModel('ActivityCommon','quyundong')->getActivityJoinInfo($data);
                if($joinnum >= $actLimit)
                    $this->readJson(baf_ResCode::msg(baf_ResCode::ERR_NO_MORE_SEAT)); // 名额已经满
            }
            if($data['is_need_comment']&&!$hascomment){//需要评论，并且没有评论
            $cData['comment'] =  1;
            $cData['redirect_url']  =  $url;
            $this->readJson(baf_ResCode::msg(baf_ResCode:: SUCCESS,$cData));
            }else if($data['is_need_comment']&&$hascomment){//需要评论，并且有评论
                $cData['comment'] =  $data['is_comment_onlyone']?0:1;
                $cData['redirect_url']  =  $data['is_comment_onlyone']?'':$url;
                if($data['is_comment_onlyone']){//是否只能评论一次
                    $this->readJson(baf_ResCode::msg(baf_ResCode:: ERR_HAS_COMMENT,$cData));//返回已经评论过
                }else{
                    $this->readJson(baf_ResCode::msg(baf_ResCode:: SUCCESS,$cData));//跳转至评论
                }
            }
            $this->readJson(baf_ResCode::msg(baf_ResCode:: ERR_ALREADY_JOIN,$cData));//线下活动不需要评论，未打开评论按钮
        }
        if($data['venues_id']>0&&$actLimit > 0) {//线下活动，已参与数量  >= 限制人数
            # 有活动人数限制显示剩余数量
            $joinnum = 0;
            $joinnum = baf_Common::dbModel('ActivityCommon','quyundong')->getActivityJoinInfo($data);
            if($joinnum >= $actLimit)
                $this->readJson(baf_ResCode::msg(baf_ResCode::ERR_NO_MORE_SEAT)); // 名额已经满
        }
        if($data['act_end_time'] < $time) {
            $this->readJson(baf_ResCode::msg(baf_ResCode::ERR_ACT_FAILED));
        }
        if(($data['is_need_userinfo'] || $data['is_need_card'] || $data['venues_id'] > 0 ) ) {//并且未参与的
            $param                       = [];
            $param['t']                  = time();
            $param['act_id']             = $data['act_id'];
            $param['act_name']           = $data['act_name'];
            $param['act_price']          = $data['act_price'];
            $param['act_limit']          = $data['act_limit'];
            $param['h']                  = md5(implode($param).ENCODE_KEY);
            $url                         = http_build_query($param);
            $url                         = baf_Base::base_url().'/activitycommon/confirmact?'.$url;
            $this->readJson(baf_ResCode::msg(baf_ResCode:: SUCCESS,array('redirect_url'=>$url)));
        } else if(!$data['is_need_comment']) {//线上活动，不需要评论
            $this->readJson(baf_ResCode::msg(baf_ResCode::ACT_ONLY_SHOW));
        } else {
            $url                         = baf_Base::base_url().'/commoncomment/index?actid='.$data['act_id'];
            $this->readJson(baf_ResCode::msg(baf_ResCode:: SUCCESS,array('redirect_url'=>$url,'comment'=>1)));
        }

    }

    /**
     * 活动详情页面
     *
     * @author RedBo
     * @date   2016-06-23
     * @param int $actId
     * @modify by 谢云霞
     * @date   2016-07-14
     * @return
     */
     public function DetailAction()
     {

        $ismsm  = (int)$this->getParam('ismsm',0);
        if($ismsm){
            // 是否已登录---屏蔽处理未支付订单
    		$userId = $this->uid;

    		if ($userId < 1) {
    			// 登陆后的回调地址
    			$this->setReturnUrl($this->redirectUrl());
    			// 没有登陆跳转到登陆页面
    			$this->redirect('/login/qucklogin');
    		}
    		$this->setReturnUrl($this->redirectUrl());//设置当前地址为referer
        }
        $actId  = (int)$this->getParam('id',0);
        $action = $this->getParam('action');
        if(!$actId) {
            $this->redirectMessage('活动ID 参数不能为空！');
        }
        api_CoreHelper::setCookie('channel_source', 'activity_'.$actId, 86400);

        $param = ['act_id' => $actId];
        // 如果活动不是测试
        if(empty($action) && $action !='preview')
            $param['is_online'] = 1;
        $data = baf_Common::dbModel('ActivityCommon','quyundong')->getOne($param);
        if(!$data) {
            $this->redirectMessage('抱歉,没有找到你想要的活动！');
        } else {
            $groId    = $data['gro_id'];
            $actPrice = $data['act_price'];
            $actLimit = $data['act_limit'];
            $joinInfo = [];
            if($groId) {
                $groData = baf_Common::dbModel('ActivityCommon','quyundong')
                         ->getActivityGroup($groId);
            }

            // 有活动限制显示剩余数量
            if($actLimit > 0)
            {
                $joinnum              = baf_Common::dbModel('ActivityCommon','quyundong')->getActivityJoinInfo($data);
                $joinInfo['remain']   = $actLimit - $joinnum;
                $joinInfo['limitNum'] = $actLimit;
            }
        }



        // 设置活动阅读次数
        baf_Common::dbModel('ActivityCommon','quyundong')->changeActReadNum($actId);

        // 设置页面标题
        $this->setPageTitle(array('title'=>$data['act_name']));

        // 获取组内活动id
        if(count($groData)>1&&$data['is_unicom_comment']){
            $actId='';
            foreach ($groData as $k => $v) {
                $actId .= $v['act_id'].',';
            }
            $actId=trim($actId,',');
        }
        $count = baf_Common::dbModel('CommonComment','quyundong')->getCount(array('relation_id'=>$actId,'comment_type'=>0,'page'=>1,'page_size'=>5,'is_unicom_comment'=>$data['is_unicom_comment']));

        $this->_view->assign(array(
            'data'   => $data,
            'join'   => $joinInfo,
            'grodata'=> $groData,
            'act_id'=>$actId,
            'count'=>$count
        ));
    }


    	/**
    	* 常态活动提交订单页
    	*
    	* @param int $act_id 活动id
    	* @return
    	*/
    	public function confirmactAction()
    	{

    		$act_id     = intval($this->getParam('act_id')); // 活动id
    		$act_name   = $this->getParam('act_name'); // 商品名称
    		$act_price  = $this->getParam('act_price'); // 商品价格
    		$act_limit  = $this->getParam('act_limit'); // 商品数量
    		$t          = $this->getParam('t'); // 时间戳 用于验证
    		$h          = $this->getParam('h'); // 验证安全性的加密串

    	    // 验证数据是否一致(即来源是否正确)
    		$hac = md5($t.$act_id.$act_name.$act_price.$act_limit.ENCODE_KEY);
    		if ($hac != $h) {
    			// 数据验证失败
    			$this->redirectMessage('数据验证失败');
    		}

    		// 是否已登录---屏蔽处理未支付订单
    		$userId = $this->uid;

    		if ($userId < 1) {
    			// 登陆后的回调地址
    			$this->setReturnUrl($this->redirectUrl());
    			// 没有登陆跳转到登陆页面
    			$this->redirect('/login/qucklogin');
    		}
    		$this->setReturnUrl($this->redirectUrl());//设置当前地址为referer

    		// 获取人次商品信息
    		extract($this->getActData($act_id));
    		if(!$actdata){
    			throw new Exception("活动已下线", 1);
    		}
    		$goodsId=isset($actdata['goods_id'])?$actdata['goods_id']:'0';
    		$limitNum=$plimit;
    		if($actdata['venues_id']>0 && ($actdata['act_limit']-$osum)<$plimit || $plimit<1 ){
    			$limitNum=$actdata['act_limit']-$osum;
    		}
    		$this->setPageTitle(array('title'=>'确认订单-趣运动'));
    		$this->_view->assign(array(
    				'mobile' => api_CoreHelper::getCookie('phone'),
    				'limitNum' =>$limitNum,
    				'data' => $actdata,
    				't'=>$t,
    		));
    	}

    	/**
    	 * 常态活动报名方法
    	 * @param int $act_id 活动id
     	 * @return
    	 */
    	public function signupAction()
    	{
    		$this->checkHash(false);
    		$act_id = $this->getParam('act_id', 0);
    		$phone = $this->getParam('phone', '');
            $name = $this->getParam('name', false);
    		$card = $this->getParam('card', false);
    		$number = $this->getParam('number', '1');
    		$coupon_id = $this->getParam('coupon_id', 0);
            $ticket_type = $this->getParam('ticket_type', 1);
            $address = trim($this->getParam('address', ''));
    		extract($this->getActData($act_id));

    		if($number==='') $number=1;
    		//1、验证活动时间，2、验证活动人数，3、根据活动设置验证提交信息
    		if (time()>$actdata['act_end_time']  || $number<1 ) {
                $this->readJson(baf_ResCode::msg(baf_ResCode::ERR_ACT_FAILED));
            }
    		if(time()<$actdata['act_start_time']){
    			$this->readJson(baf_ResCode::msg(baf_ResCode::ERR_ACT_NO_START));
    		}
    		if($actdata['venues_id']>0){
                $surplus=$actdata['act_limit']-$osum;
                if($surplus<1){
                    $this->readJson(baf_ResCode::msg(baf_ResCode::ERR_NO_MORE_SEAT));
                }
                if($surplus<$number || $plimit>0&&$plimit<$number){
                    $this->readJson(baf_ResCode::msg(baf_ResCode::ERR_OUT_NUMBER_SEAT));
                }
    		}
            $search=array();
    		if($actdata['is_need_userinfo']){
                $search=$phone;
                foreach ($phone as $k => $v) {
                    if (!baf_Base::is_mobile_new($v)) {
                        $this->readJson( baf_ResCode::msg(baf_ResCode::PHONE_ERROR));
                    }
                    if (!$name[$k]) {
                        $this->readJson(baf_ResCode::msg(baf_ResCode::ERR_NAME_EMPTY));
                    }
                    foreach ($phone as $kk => $vv) {
                        if($k!=$kk&&$v==$vv){
                            $errRst=baf_ResCode::msg(baf_ResCode::ERR_IDCARD_REPEAT);
                            $errRst['msg']='手机号不可以重复';
                            $this->readJson($errRst);
                        }
                    }
                }
    		}
    		if($actdata['is_need_card']){
                $search=$card;
                try {
                    foreach ($card as $k => $v) {
                        if (!baf_Base::checkIdCard($v)) {
                            $this->readJson(baf_ResCode::msg(baf_ResCode::ERR_IDCARD));
                        }
                        foreach ($card as $kk => $vv) {
                            if($k!=$kk&&$v==$vv){
                                $errRst=baf_ResCode::msg(baf_ResCode::ERR_IDCARD_REPEAT);
                                $errRst['msg']='身份证不可以重复';
                                $this->readJson($errRst);
                            }
                        }
                    }
                } catch (Exception $e) {//当身份证乱输入的时候，比如身份证中出生1980年3月40日
                    $this->readJson(baf_ResCode::msg(baf_ResCode::ERR_IDCARD));
                }

    		}
            if($actdata['is_need_address'] && empty($address)){
                $errRst=baf_ResCode::msg(baf_ResCode::ERR_IDCARD_REPEAT);
                $errRst['msg']='地址不能为空';
                $this->readJson($errRst);
            }

            $checkbool=false;
            $insertUser=false;
            if($actdata['is_need_card'] || $actdata['is_need_userinfo']) {
                foreach ($search as $k => $v) {
                    $searchArr = array(
                        'act_id' => $act_id,
                        'phone'=>isset($phone[$k])?$phone[$k]:'',
                        'name'=>isset($name[$k])?$name[$k]:'',
                        'card'=>isset($card[$k])?$card[$k]:'',
                        'user_id'=>$this->uid,
                        'venues_id'=>$actdata['venues_id'],
                        'is_need_userinfo'=>$actdata['is_need_userinfo'],
                        'is_need_card'=>$actdata['is_need_card'],
                    );
                    $exits=baf_Common::dbModel('ActivitySignupCommon','quyundong')->checkExists($searchArr);

                    $redirect_url= baf_Base::base_url() .'/activitycommon/detail?id=' . $act_id;
                    if ($exits == 'no' || !empty($exits)) {
                        $res='';
                        if($actdata['venues_id']>0){
                            $res=baf_ResCode::msg(baf_ResCode::ERR_ALREADY_SIGNUP, array('redirect_url' => $redirect_url));
                        }else{
                            $res = baf_ResCode::msg(baf_ResCode::ERR_ALREADY_JOIN, array('redirect_url' => $redirect_url));
                        }
                        $this->readJson($res);
                    }
                    //准备报名用户的插入数据
                    if(isset($phone[$k])&&$phone[$k] || isset($name[$k])&&$name[$k] || isset($card[$k])&&$card[$k]){
                        $insertUser[] = array(
                            'phone'=>isset($phone[$k])?$phone[$k]:'',
                            'name'=>isset($name[$k])?$name[$k]:'',
                            'card'=>isset($card[$k])?$card[$k]:'',
                        );
                    }
                }
    		}else{
                $searchArr = array(
                        'act_id' => $act_id,
                        'user_id'=>$this->uid,
                        'venues_id'=>$actdata['venues_id'],
                        'is_need_userinfo'=>$actdata['is_need_userinfo'],
                        'is_need_card'=>$actdata['is_need_card'],
                    );
                $exits=baf_Common::dbModel('ActivitySignupCommon','quyundong')->checkExists($searchArr);
                $redirect_url= baf_Base::base_url() .'/activitycommon/detail?id=' . $act_id;
                if ($exits == 'no' || !empty($exits)) {
                    $res='';
                    if($actdata['venues_id']>0){
                        $res=baf_ResCode::msg(baf_ResCode::ERR_ALREADY_SIGNUP, array('redirect_url' => $redirect_url));
                    }else{
                        $res = baf_ResCode::msg(baf_ResCode::ERR_ALREADY_JOIN, array('redirect_url' => $redirect_url));
                    }
                    $this->readJson($res);
                }
            }
            //报名信息
            $insertData = array(
                        'venues_id' => $actdata['venues_id'],
                        'user_id'   => $this->uid,
                        'open_id'   => api_WxApi::$token['openid'],
                        'order_id'  => 0,
                        'add_time'  => time(),
                        'number'    => $number,
                        'act_id'    => $act_id,
                        'address'   => $address
                    );
            //下单
            // 4微信用户   5手机网站用户
            $from = api_CoreHelper::IsWenXinBrowser() ? 4 : 5;
    		if($actdata['venues_id']==0){
    			$signup_id = baf_Common::dbModel('ActivitySignupCommon','quyundong')->insert($insertData);
    			if (!$signup_id) {
    				baf_Common::log('activitySignupCommon_failed', 'DEBUG', 'sql_err', $insertData);
    				$this->readJson(baf_ResCode::msg(baf_ResCode::ERR_SIGNUP_FAILED));
                }
                if(!empty($insertUser)){
                    foreach ($insertUser as $k => $v) {
        				$insertUser[$k]['signup_id']=$signup_id;
        			}
                    if(!baf_Common::dbModel('ActivitySignupUser','quyundong')->addUser($insertUser)){
                        if(baf_Common::dbModel('ActivitySignupCommon','quyundong')->delete($signup_id))
                            baf_Common::log('activitySignupCommon_failed', 'DEBUG', 'sql_err', array('id'=>$signup_id));
                        baf_Common::log('activitySignupCommon_failed', 'DEBUG', 'sql_err',$insertUser);
                        $this->readJson(baf_ResCode::msg(baf_ResCode::ERR_SIGNUP_FAILED));
                    }
                }
                if($actdata['is_need_comment']){
                    $redirect_url = baf_Base::base_url() . '/commoncomment/index?actid=' . $act_id;
                }
				$this->readJson(baf_ResCode::msg('', array('redirect_url' => $redirect_url)));

    		}

            $orderParam = array(
                'goods_ids' => $actdata['goods_id'],
                'user_id' => $this->uid,
                'coupon_id' => $coupon_id?intval($coupon_id):0,
                'ticket_type'=>$ticket_type,
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
                    $delOParam = array(
                        'order_id' => $orderRes['data']['order_id'],
                        'user_id' => $this->uid,
                    );
    				$insertData['order_id'] = $orderRes['data']['order_id'];
                    $signup_id = baf_Common::dbModel('ActivitySignupCommon','quyundong')->insert($insertData);
        			if (!$signup_id) {
                        baf_Common::log('activitySignupCommon_failed', 'DEBUG', 'sql_err', $insertData);

    					api_Order::orderCancel($delOParam);
    					$this->readJson(baf_ResCode::msg(baf_ResCode::ERR_SIGNUP_FAILED));
                    }
                    if(!empty($insertUser)){
                        foreach ($insertUser as $k => $v) {
            				$insertUser[$k]['signup_id']=$signup_id;
            			}
                        if(!baf_Common::dbModel('ActivitySignupUser','quyundong')->addUser($insertUser)){
                            api_Order::orderCancel($delOParam);
                            if(baf_Common::dbModel('ActivitySignupCommon','quyundong')->delete($signup_id))
                                baf_Common::log('activitySignupCommon_failed', 'DEBUG', 'sql_err', array('id'=>$signup_id));
                            baf_Common::log('activitySignupCommon_failed', 'DEBUG', 'sql_err',$insertUser);
                            $this->readJson(baf_ResCode::msg(baf_ResCode::ERR_SIGNUP_FAILED));
                        }
                    }

					$payUrl = baf_Base::base_url() . '/order/pay/?id=' . $orderRes['data']['order_id'];
					$this->readJson(baf_ResCode::msg('', array('redirect_url' => $payUrl)));
    			} else {
    				baf_Common::log('activitySignupCommon_failed', 'DEBUG', 'insert_err', $orderRes);
    			}
    			if ($orderRes['status'] == '0308') {
    				$this->readJson(baf_ResCode::msg(baf_ResCode::COURT_ORDERED));
    			} else {
    				$msg = isset($orderRes['msg']) && $orderRes['msg'] ? $orderRes['msg'] : '下单失败';
    				$this->readJson(baf_ResCode::msg(baf_ResCode::OTHER_ERR, $msg));
    			}
    		} else {
    			$this->readJson(baf_ResCode::msg(baf_ResCode::SYSTEM_ERROR));
    		}
    	}

        /**
    	 * 获得活动数据
    	 * @param $act_id 活动ID
    	 * @return array(goods=>商品,actdata=>活动,osum=>参与人数,plimt=>一次限购)
    	 */
    	private function getActData($act_id)
    	{
            $param = ['act_id' => $act_id,'is_online' => 1];
    		$actdata = baf_Common::dbModel('ActivityCommon','quyundong')->getOne($param);
    		$response['data']='';
    		$osum['number']='';
    		$plimit='';
    		if($actdata['goods_id']){
    			$goods_id=$actdata['goods_id'];
    			$osum= baf_Common::dbModel('ActivityCommon','quyundong')->getOrderGoodsSum(array(':goods_id'=>$goods_id));
                $response = api_Court::getPersonInfo(array('goods_id' => $goods_id));
                $plimit= isset($response['data']['limit_number'])? $response['data']['limit_number'] : 0;
    		}
    		return array('actdata'=>$actdata,'osum'=>$osum['number'],'plimit'=>$plimit);
    	}
}
