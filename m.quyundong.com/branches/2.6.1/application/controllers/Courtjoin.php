<?php 
class CourtjoinController extends DefaultController
{
	public function indexAction(){
		return false;
	}

	/*
	* 获取球局详情
	*
	*/
	public function DetailAction()
	{
	    // 读取未支付订单
	    $params = array();
        $params['cj_order_id'] = (int) $this->getParam('id', 0); // 球局id
        if($params['cj_order_id']<1) $this->redirectMessage('缺少球局参数');
        $params['user_id'] = $this->uid;
        $params['ver'] = '2.1';
	    $info = api_Order::getCourtJoinInfo($params);
	    $list = array();
	    if (!empty($info['status']) && $info['status'] == SUCCESS_STATUS && !empty($info['data'])){
	    	$list = $info['data'];

	    	//统计球局浏览次数
	    	$param = array();
	    	$param['cj_order_id'] = $params['cj_order_id'];
	    	$countInfo = api_Order::courtJoinViewCount($param);
	    	if (empty($countInfo['status']) || $countInfo['status'] != SUCCESS_STATUS) {
	    		//失败记录log
	    		baf_Common::log('count_court_join_err','ERR','courtJoinViewCount error', array('param'=>$param, 'res'=>$countInfo, 'url'=>$this->redirectUrl()));
	    	}
	    }else{
	       //失败提示
	    	baf_Common::log('court_join_err','ERR','getCourtJoinInfo error', array('param'=>$params, 'res'=>$info, 'url'=>$this->redirectUrl()));
			$this->redirectMessage('未找到球局');
	    }

	    $this->_view->assign(array(
	        'list' => $list,
	        'courtJoinInfo' => !empty($list['court_join_info']) ? $list['court_join_info'] : array(),
	        'venuesInfo' => !empty($list['venues_info']) ? $list['venues_info'] : array()
	    ));
	}
	
	/*
	* 球局详情介绍
	*
	* @author lishiyuan
	*/
	public function InstructionAction(){
		$ruleId = intval($this->getParam('rule_id',0));
		$description = '';
		$res = api_Order::getCourtJoinDesc(array('rule_id'=>$ruleId));
		if(isset($res['status']) && $res['status']=='0000'){
			$description = isset($res['data']['description']) ? $res['data']['description'] : '';
		}else{
			baf_Common::log('court_join_err','ERR','getCourtJoinDesc error', array('rule_id'=>$ruleId, 'res'=>$res, 'url'=>$this->redirectUrl()));
		}
		$this->_view->assign(array(
				'description' => $description
			));

	    $this->render('instruction');
	}

	/*
	 * 获取球局状态
	 *
	 */
	protected function courtJoinStatusAction()
	{
	    // 读取未支付订单
	    $params = array();
	    $params['cj_order_id'] = (int) $this->getParam('cj_order_id', 0); // 球局id
	 
	    $info = api_Order::getCourtJoinInfo($params);
        
	    if (isset($info['status']) && ($info['status'] == SUCCESS_STATUS) && isset($info['data']) && !empty($info['data'])){
	        $list = $info['data'];
	        if((int)$list['courtjoin_info']['status'] > 1){
	            $this->readJson(baf_ResCode::msg(baf_ResCode::SYSTEM_ERROR));
	        }
	    }else{
	        $this->readJson(baf_ResCode::msg(baf_ResCode::SYSTEM_ERROR));
	    }
	
	    $this->readJson(baf_ResCode::msg(baf_ResCode::SUCCESS));
	}

	/**
	 * 首页球局宣传页面
	 * @author wuchunhua 2016-09-19
	 */
	public function propagandaAction()
	{
		$title = "趣运动球局";
		$this->_view->assign(array('title'=>$title));
	}

	/**
	 * ajax获取球局详情的分页
	 * @author wuchunhua 2016-09-19
	 * @return [type] [description]
	 */
	public function getCjmsAction()
	{
		$params = array();
		$params['cj_order_id'] = (int) $this->getParam('id', 0); // 球局id
		$params['page'] = (int) $this->getParam('page', 1);

		if($params['cj_order_id']<1){
			$this->readJson(array('code'=>3036,'msg'=>'缺少球局参数！'));
		}

		$cjm_info = api_Order::getCourtJoinMessage($params);
 		$data = array();
 		if (!empty($cjm_info['status']) && $cjm_info['status'] == SUCCESS_STATUS && !empty($cjm_info['data']) && isset($cjm_info['data']['list']) && !empty($cjm_info['data']['list'])) {
 			$data['code'] = '0000';
 			$data['msg'] = 'success';
 			$data['data'] = $cjm_info['data']['list'];
 		}else{
 			//失败记录Log
	    	baf_Common::log('court_join_message','ERR','getCourtJoinMessage error', array('param'=>$params, 'res'=>$cjm_info, 'url'=>$this->redirectUrl()));
	    	$this->readJson(array('code'=>3036,'msg'=>'获取留言失败！'));
 		}

 		$this->readJson($data);
	}

}