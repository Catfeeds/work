<?php
class CourtpoolController extends DefaultController
{
	//===========================1.9.7==========================================
	/**
	 * 拼场列表
	 * 
	 * ver 1.9.7+
	 */
	public function listAction(){		
		$param = array(
			'city_id' => api_CoreHelper::getCookie('city_id'),//城市id
			'cat_id' => 1, //暂只开通羽毛球
			'date_time' => $this->getParam('date_time') ? $this->getParam('date_time') : date('Y-m-d')	//指定日期
		);
		if(!$param['city_id'] || $this->getParam('city_id')){
			$cityId = intval($this->getParam('city_id'));
			$cityId = $this->setCity($cityId);//记录城市id
			$param['city_id'] = $cityId;
		}
		if($param['city_id']<1) $this->redirectMessage('未选择城市');
		if( $this->getParam('from') =='app'){
			$_SESSION['in_app'] = 1;
			$_SESSION['app_user_id'] = $this->getParam('user_id');
			$_SESSION['app_device_id'] = $this->getParam('device_id');
		}
		
		//API获取拼场列表2.0
		$param['action'] = 'court_pool_list';
		$courtPools = api_Court::venusApiPut($param);
// 		print_r($courtPools);	
		//日期列表
		$date_list = array();
		if ( isset($courtPools['date_list']) && !empty($courtPools['date_list']) ){
			$is_checked = 0;//是否有默认选中
			foreach (  $courtPools['date_list'] as $uninx_time ){
				$cur = '';
				if ( $is_checked == 0 && date('Y-m-d', $uninx_time) == $param['date_time'] ){
					$is_checked = 1;
					$cur = 'cur';
				}
				$date_list[] = array(
					'is_checked'=> $cur,
					'date_name' => date('m月d日', $uninx_time),
					'week_name' => api_CoreHelper::getWeek(date('w', $uninx_time)),
					'go_url'	=> '/courtpool/list?date_time='.date('Y-m-d', $uninx_time),
				);
			}
			if ( $is_checked == 0 && isset($date_list[0]['is_checked']) ){
				$date_list[0]['is_checked'] = 'cur';
			}
		}
		
		//场馆列表
		$venus_list = array();
		if ( isset($courtPools['lists']) && !empty($courtPools['lists']) ){
			foreach (  $courtPools['lists'] as $venus ){
				if ( isset($venus['court_pools']) && !empty($venus['court_pools']) ){
					foreach ( $venus['court_pools'] as $key => $pools ){
						if ( !empty($pools) ){
							$start_hour = intval(date('H', $pools['start_time']));
							$day_icon = 'day-dpr2x.png';
							if ( $start_hour > 18 ) {$day_icon = 'night-dpr2x.png';}
							
							$venus['court_pools'][$key]['start_hour'] = $start_hour;
							$venus['court_pools'][$key]['day_icon'] = $day_icon;
						}
					}
				}
				$venus_list[] = $venus;
			}
		}
// 		print_r($venus_list);	
		//分页参数
		$ajax_page = array();
		if ( isset($courtPools['page_data']) && !empty($courtPools['page_data']) ){
			$page_data = $courtPools['page_data'];
			$ajax_page['current_page'] = $page_data['current_page'];
			$ajax_page['total_page'] = $page_data['total_page'];
			$ajax_page['url'] = '';
			if( isset($page_data['total_page']) && $page_data['total_page'] > 1 ){
				$ajax_page['url'] = '/courtpool/ajaxvenuslist?date_time='.$param['date_time'];
			}
			$ajax_page['url'] = '/courtpool/ajaxvenuslist?date_time='.$param['date_time'];
		}
		
		//print_r($venus_list);exit;
		unset($courtPools);
		
		$this->_view->assign(array(
			'date_list' => $date_list,
			'venus_list' => $venus_list,
			'ajax_page'	=> $ajax_page
		));
		
		
	}

	/**
	 * 拼场详情
	 * 
	 * ver 1.9.7+
	 */
	public function detailAction(){
		$param = array();
		$param['court_pool_id'] = intval($this->getParam('id'));
		$param['user_id'] = intval($this->uid);
		
		if($param['court_pool_id'] < 1){ $this->redirectMessage('拼场不存在'); }
		
		//注册、登录返回地址
		$this->setReturnUrl( $this->redirectUrl() );
		
		//sesion记录地址
		$_SESSION['back_item_url'] = $this->redirectUrl();
		$user_list = array();
		$ajax_page = array();
		
		//API获取拼场详情2.0
		$param['action'] = 'court_pool_info';
		$venus_data = api_Court::venusApiPut($param);
// 		print_r($venus_data);
		if(!empty($venus_data) ){
			
			$start_hour = intval(date('H', $venus_data['start_time']));
			$day_icon = 'day-dpr2x.png';
			if ( $start_hour > 18 ) {$day_icon = 'night-dpr2x.png';}
			$venus_data['start_hour'] = $start_hour;	//小时
			$venus_data['day_icon'] = $day_icon;		//图标
			
			$venus_data['date_time'] 	= date('Y-m-d', $venus_data['start_time'] );
			$venus_data['start_time'] 	= date('m月d日 H:i', $venus_data['start_time'] );	//开始时间
			$venus_data['end_time'] 	= date('H:i', $venus_data['end_time'] );	//结束时间
			
			//拼场提示文字
			$court_pool_tips = $venus_data['court_pool_tips'];//拼场状态   1:拼场中 2:开场 4:完成 5:取消
			$currentNum = intval($venus_data['current_num']);	//获取已加入人数
			$lastNum = intval($venus_data['last_num']);			//获取剩余可加入人数
			switch ( intval($venus_data['court_pool_status']) ){
				case 4: $court_pool_tips = '已完成，请参与其他拼场'; break;
				case 5: $court_pool_tips = '<span style="color:#ff850b">本场取消，请参与其他拼场</span>'; break;
				case 3: $court_pool_tips = '即将开始'; break;
				default:
					if($currentNum == 0){
						if($lastNum > 0){
							$court_pool_tips = '赶快点击加入吧';
						}
						else{
							$court_pool_tips = '<span style="color:#ff850b">暂无场地，请参与其他拼场</span>';
						}
					}
					else{
						if($lastNum==0){
							$court_pool_tips = '<span style="color:#ff850b">没有位置了，请参与其他拼场</span>';
						}
						else{
							if($currentNum<4){
								$needNum = 4 - $currentNum;
								$court_pool_tips = '再有'.$needNum.'名球友即可开场';
							}
							elseif($currentNum>=4){
								if($lastNum>=3){
									$court_pool_tips = '拼场成功，加入即可打球';
								}
								elseif($lastNum>0 && $lastNum<3){
									$court_pool_tips = '拼场成功，仅剩<span style="color:#ff850b">'.$lastNum.'</span>个空位';
								}
							}
						}
					}
					break;
			}
			$venus_data['court_pool_tips'] = !empty($court_pool_tips) ? $court_pool_tips : $venus_data['court_pool_tips'];
			
			
			//API获取.本场球友列表
			$api_param = array();
			$api_param['court_pool_id'] = $venus_data['court_pool_id'];
			$api_param['user_id'] = $param['user_id'];
			$api_param['action'] = 'court_pool_user_list';
			$api_user = api_Court::venusApiPut($api_param);
			if ( isset($api_user['list']) && !empty($api_user['list']) ){
				foreach ( $api_user['list'] as $value ){
					if (empty($value['avatar'])){
						$value['avatar'] = 'http://api.7yundong.cn/uploads/avatar/avatar.png';
					}
					$user_list[] = $value;
				}
			}
			//分页参数
			if ( isset($api_user['page_data']) && !empty($api_user['page_data']) ){
				$page_data = $api_user['page_data'];
				$ajax_page['current_page'] = $page_data['current_page'];
				$ajax_page['total_page'] = $page_data['total_page'];
				$ajax_page['url'] = '';
				if( isset($page_data['total_page']) && $page_data['total_page'] > 1 ){
					$ajax_page['url'] = '/courtpool/ajaxjoinuser?court_pool_id='.$venus_data['court_pool_id'].'&user_id='.$param['user_id'];
				}
				//$ajax_page['url'] = '/courtpool/ajaxjoinuser?court_pool_id='.$venus_data['court_pool_id'].'&user_id='.$param['user_id'];
			}
			
		}
		
		$this->_view->assign( array(
			'venus_data'=> $venus_data,
			'user_id' 	=> $this->uid,
			'user_list' => $user_list,
			'ajax_page' => $ajax_page,
		));
	}
	
	/*
	* ajax.获取拼场(球馆)列表2.0
	* 
	* 分页
	*/
	public function ajaxvenuslistAction(){
		try {
			$res = (object)array();
			$res->status = '0000';
			$res->msg = "success";
			$res->data = array();
			$data = array();
				
			$param = array();
			$param['city_id'] = api_CoreHelper::getCookie('city_id');//城市id
			$param['cat_id'] = 1;//暂只开通羽毛球
			$param['date_time'] = $this->getParam('date_time') ? $this->getParam('date_time') : date('Y-m-d');//指定日期
			$param['page'] = max( intval($this->getParam('page')), 1 );
			
			//API获取拼场详情2.0
			$param['action'] = 'court_pool_list';
// 			$param['static'] = '1';
			$venus_list = api_Court::venusApiPut($param);
			
			if ( isset($venus_list['lists']) && !empty($venus_list['lists']) ){
				foreach (  $venus_list['lists'] as $venus ){
					if ( isset($venus['court_pools']) && !empty($venus['court_pools']) ){
						foreach ( $venus['court_pools'] as $key => $pools ){
							if ( !empty($pools) ){
								$start_hour = intval(date('H', $pools['start_time']));
								$day_icon = 'day-dpr2x.png';
								if ( $start_hour > 18 ) {$day_icon = 'night-dpr2x.png';}
									
								$venus['court_pools'][$key]['start_hour'] = $start_hour;
								$venus['court_pools'][$key]['day_icon'] = $day_icon;
							}
						}
					}
					$data[] = $venus;
				}
				
				
				
			}
			$res->data = $data;
		}
		catch (Exception $e){
			$res->status = '-13';
			$res->msg = $e->getMessage();
		}
		echo json_encode($res); exit;
		
	}
	
	/*
	 * ajax.获取拼场用户列表2.0
	 * 
	 * 
	 */
	public function ajaxjoinuserAction(){
		try {
			$res = (object)array();
			$res->status = '0000';
			$res->msg = "success";
			$res->data = array();
			$data = array();
			$param = array();
			$param['court_pool_id'] = $this->getParam('court_pool_id');	//
			$param['user_id'] = $this->getParam('user_id');				//用于判定交手次数
			$param['page'] = max( intval($this->getParam('page')), 1 );	//
			
			//API获取拼场详情2.0
			$param['action'] = 'court_pool_user_list';
			// 		$param['static'] = '1';
			$join_user = api_Court::venusApiPut($param);
			if ( isset($join_user['list']) && !empty($join_user['list']) ){
				foreach ( $join_user['list'] as $value ){
					if (empty($value['avatar'])){
						$value['avatar'] = 'http://api.7yundong.cn/uploads/avatar/avatar.png';
					}
					$data[] = $value;
				}
			}
			$res->data = $data;
		}
		catch (Exception $e){
			$res->status = '-13';
			$res->msg = $e->getMessage();
		}
		echo json_encode($res); exit;
		
	}
	
	//===========================1.9.6==========================================
	
	/**
	 * 拼场列表
	 */
	public function indexAction(){
		$param = array(
			'city_id' => api_CoreHelper::getCookie('city_id'),
			'cat_id' => 1, //暂只开通羽毛球
			'date_time' => $this->getParam('date_time') ? $this->getParam('date_time') : date('Y-m-d')	
		);
		if(!$param['city_id'] || $this->getParam('city_id')){
			$cityId = intval($this->getParam('city_id'));
			$cityId = $this->setCity($cityId);
			$param['city_id'] = $cityId;
		}
		if($param['city_id']<1) $this->redirectMessage('未选择城市');
		$from = $this->getParam('from');
		if($from=='app'){
			$_SESSION['in_app'] = 1;
			$_SESSION['app_user_id'] = $this->getParam('user_id');
			$_SESSION['app_device_id'] = $this->getParam('device_id');
		}
		
		$courtPools = array();
		$res = api_Court::getCourtPoolList($param);
		if(isset($res['status']) && $res['status']=='0000'){
			$courtPools = isset($res['data']) ? $res['data'] : array();
		}
		$this->_view->assign(array(
			'courtPools' => $courtPools
		));
	}
	
	/**
	 * 设置城市
	 * @param unknown $cityId
	 * @return number
	 */
	protected function setCity($cityId){
		$inCity = false;
		$open_city = array();
		if($cityId>0){
			$open_city = api_Court::cities(array());
			if($open_city){
				foreach($open_city as $v){
					if(isset($v['city_id']) && $v['city_id']==$cityId){
						$cityId = $v['city_id'];
						$cityName = $v['city_name'];
						$inCity = true;
						break;
					}
				}
			}
		}
			
		
		if(!$inCity){
			$cityId = 76;
			$cityName = '广州';
		}
		api_CoreHelper::setCookie('city_id', $cityId, 30*3600*24); //30天有效
		api_CoreHelper::setCookie('city_name', $cityName, 30*3600*24); //30天有效
		return $cityId;
	}
	
	
	/**
	 * 拼场详情
	 */
	public function viewAction(){
		$id = intval($this->getParam('id'));
		if($id<1){
			$this->redirectMessage('拼场不存在');
		}
		//注册、登录返回地址
		$this->setReturnUrl($this->redirectUrl());
		$param = array(
			'court_pool_id' => $id,
			'user_id' => $this->uid	
		);
		$courtPoolInfo = array();
		$res = api_Court::getCourtPoolInfo($param);
		
		if(isset($res['status']) && $res['status']=='0000'){
			$courtPoolInfo = isset($res['data']) ? $res['data'] : array();
			if($courtPoolInfo && in_array($courtPoolInfo['court_pool_status'], array(2,3)) && $courtPoolInfo['start_time'] <= CURRENT_TIMESTAMP+1800 && $courtPoolInfo['start_time']>CURRENT_TIMESTAMP){
				$courtPoolInfo['court_pool_status'] = 6;
			}
		}
		$_SESSION['back_item_url'] = $this->redirectUrl();
		$this->_view->assign(array(
				'courtPoolInfo' => $courtPoolInfo,
				'userId' => $this->uid,
				'joinStatus' => array(
						0 => '加入',
						1 => '已加入',
						2 => '即将开始'
				),
				'courtPoolStatus' => array(
						0 => '未开始',
						1 => '拼场中',
						2 => '已开场',
						3 => '已满',
						4 => '已完成',
						5 => '已取消',
						6 => '即将开始' //额外定义的显示状态
				)
		));
	}
	
	
	/**
	 * 新手指引
	 */
	public function guideAction(){
		//直接自动引入视图
		$res = api_Court::getCourtPoolSetting();
		$conf = array();
		if(isset($res['status']) && $res['status']=='0000'){
			$conf = isset($res['data']) ? $res['data'] : array();
		}
		$this->_view->assign(
			array('conf' => $conf)
		);
	}
	
	/**
	 * 拼场2.0 新手指引
	 */
	public function helpAction(){
		if( $this->getParam('from') =='app'){
			$_SESSION['in_app'] = 1;
		}
	}
	
	/**
	 * 测评
	 */
	public function assessAction(){		
		//直接自动引入视图
		if($_POST){
			$total = $this->getParam('total');
			$questions = $this->getParam('questions');	
			$respon = array('status'=>0, 'msg' => '');
			if(isset($_SESSION['in_app']) && $_SESSION['app_user_id']) $this->uid = $_SESSION['app_user_id'];
			try {
			$param = array(
							'user_id' => $this->uid ? $this->uid : 0,
							'cat_id' => 1,
							'score' => $total,
							'content' => $questions ? json_encode($questions) : '',
							'device_id' => isset($_SESSION['app_device_id']) ? $_SESSION['app_device_id'] : ''
					);
			
					$res = api_User::addSportEvaluation($param);
					if(isset($res['status'])){
						$status = $res['status']=='0000' ? 1 : 0;
						$respon = array('status'=>$status, 'msg' => $res['msg']);
					}else{
						$respon = array('status'=>0, 'msg' => 'faild');
					}
			}catch(Exception $e){
				$respon = array('status'=>0, 'msg' => 'faild');
			}
			$this->readJson($respon);
		}
	}
	
}