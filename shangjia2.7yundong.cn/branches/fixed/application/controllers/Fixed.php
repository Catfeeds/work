<?php

/**
 * 固定场控制器
 *
 * @author gaojia
 * @date 2016-07-04
 */
class FixedController extends BaseController
{
	/**
	 * 分页获取固定场列表
	 * @return [type] [description]
	 */
	public function indexAction() { //默认Action

		// 场馆ID
		$venues_id	= helper_VenuesHelper::getCurrentVenuesId() ;
			
		// 分类ID
		$cat_id = (int)$this->getParam("cat_id", helper_VenuesHelper::getVenuesCatID());
		$cat_list  = helper_VenuesHelper::getCurrentCatList();
		$cat_keys = array_keys($cat_list);
        if ( !in_array($cat_id, $cat_keys) ){
            //当前分类，默认为第一个分类
            $cat_id = empty($cat_keys) ? 1 : $cat_keys[0];
        }
		
		// 设置当前分类
		helper_VenuesHelper::setVenuesCatID($cat_id);

		$page = $this->getParam("page", 1);	// 当前第几页
		$page_size = 15;	// 每页显示多少条数据

		$customer  = $this->getParam("customer-name", "");
		$customer_phone  = $this->getParam("customer-phone", "");

		$list = Loader::api('Venues')->getFixedCourtPageList($venues_id, $cat_id, $page, $page_size, $customer, $customer_phone);
		$data = $list['list'];

		$total_number = $list['total_number'];	// 数据总条数
		$total_page = ceil($total_number/$page_size);

		// 场地数据
		$courseList = helper_VenuesHelper::getCourses($cat_id);
		// 营业时间
		$timeList = helper_VenuesHelper::getServiceTime($cat_id);

		$time_arr = [];
		$serviceTimeList = [];
		$str = '';
		$time_start = '';
		$time_end = '';
		
		foreach($timeList AS $k_time=>$v_time){
			$time_start = substr($v_time[0],-3);
			$start = intval($v_time[0]);
			$end = intval($v_time[1]);
			$time_arr = [];
			$str = '';
			for($i=$start;$i<=$end;$i++){
				$time_arr[] = $i.$time_start;
				$str .= $i.$time_start.",";
			}
			$serviceTimeList[] = implode(',',$time_arr);
		}
		
		$this->setTitle('固定场设置');

		$this->display('lockfixed', [
			'data' => $data,
			'cat_list' => $cat_list,
			'courseList' => $courseList,
			'cat_id'	=> $cat_id,
			'customer' => $customer,
			'customer_phone' => $customer_phone,
			'page' => $page,
			'page_size' => $page_size,
			'total_page' => $total_page,
			'serviceTimeList' => $serviceTimeList,
			'total_number' =>	$total_number
		]);
	}

	/**
	 * 更新对应ID的固定场
	 * @return [type] [description]
	 */
	public function updateFixedCourtAction(){

		$api_VenuesApi = new api_VenuesApi();

		$lock_id = $this->getParam("lock_id");

		$start_time = strtotime($this->getParam("start_time"));
		$end_time = strtotime($this->getParam("end_time"));
		$week = $this->getParam("week");
		$start_hour = $this->getParam("start_hour");
		$end_hour = $this->getParam("end_hour");
		$course_id = $this->getParam("course");
		$customer = $this->getParam("customer", "");
		$customer_phone = $this->getParam("customer_phone", "");
		
		$course_list[] = array();
		for($i=0; $i<count($week);$i++){
			$course_list[$i]['week'] = $week[$i];
			$course_list[$i]['start_hour'] = $start_hour[$i];
			$course_list[$i]['end_hour'] = $end_hour[$i];
			$course_list[$i]['course_id'] = $course_id[$i];
		}

		$course_list = json_encode($course_list);

		$update = $api_VenuesApi->updateFixedCourt($lock_id, $course_list, $customer, $customer_phone, $start_time, $end_time);

		helper_CoreHelper::addAdminLog('固定场修改', array(
                    'lock_id' => $lock_id,
                    'start_time' => $start_time,
                    'end_time' => $end_time,
                    'course_list' => $course_list,
                    'customer' => $customer,
                    'customer_phone' => $customer_phone
            ));

		if( isset($update) ){
            $this->redirect('/fixed/index');
		}else{
			return false;
		}
		
	}

	/**
	 * 删除对应ID的固定场
	 * @return [type] [description]
	 */
	public function delFixedCourtAction(){

		$api_VenuesApi = new api_VenuesApi();
		
		$id = $this->getParam("id");
		$del = $api_VenuesApi->delFixedCourt($id);

		helper_CoreHelper::addAdminLog('固定场删除', array(
                    'id' => $id,
            ));

		if( isset($del) ){
		    $this->redirect('/fixed/index');
		}else{
			return false;
		}
		
	}

	/**
	 * 查询固定场是否有冲突
	 * @return [type] [description]
	 */
	public function checkLockedAction(){
			
		// 场馆ID
		$venues_id	= helper_VenuesHelper::getCurrentVenuesId() ;
		
		// 分类ID
		$cat_id	= (int)$this->getParam("cat_id", helper_VenuesHelper::getVenuesCatID());

		$lock_id = $this->getParam("lock_id");
		$lock_cycle = $this->getParam("lock_cycle");
		$start_time = strtotime($this->getParam("start_time"));
		$end_time = strtotime($this->getParam("end_time"));
		$week = $this->getParam("week");
		$start_hour = $this->getParam("start_hour");
		$end_hour = $this->getParam("end_hour");
		$course_id = $this->getParam("course");
		$course_list[] = array();
		for($i=0; $i<count($week);$i++){
			$course_list[$i]['week'] = $week[$i];
			$course_list[$i]['start_hour'] = $start_hour[$i];
			$course_list[$i]['end_hour'] = $end_hour[$i];
			$course_list[$i]['course_id'] = $course_id[$i];
		}
		$course_list = json_encode($course_list);
		
		$api_VenuesApi = new api_VenuesApi();
		
		$arr = $api_VenuesApi->checkLocked($venues_id, $cat_id, $lock_cycle, $start_time, $end_time, $course_list, $lock_id);

		echo json_encode($arr);

	}

	/**
	 * 锁定场地
	 * @return [type] [description]
	 */
	public function lockedCourtAction(){

		$api_VenuesApi = new api_VenuesApi();
		
		// 场馆ID
		$venues_id	= helper_VenuesHelper::getCurrentVenuesId();
		
		// 分类ID
		$cat_id	= (int)$this->getParam("cat_id", helper_VenuesHelper::getVenuesCatID());
		
		$lock_cycle = $this->getParam("book_cycle");
		$start_time = strtotime($this->getParam("start_time"));
		$end_time = strtotime($this->getParam("end_time"));
		$week = $this->getParam("week");
		$start_hour = $this->getParam("start_hour");
		$end_hour = $this->getParam("end_hour");
		$course_id = $this->getParam("course");
		$customer = $this->getParam("customer", "");
		$customer_phone = $this->getParam("customer_phone", "");
		
		$course_list[] = array();
		if($course_id == ""){
			$this->redirect('/fixed/index');
		}else{
			for($i=0; $i<count($week);$i++){
				$course_list[$i]['week'] = $week[$i];
				$course_list[$i]['start_hour'] = $start_hour[$i];
				$course_list[$i]['end_hour'] = $end_hour[$i];
				$course_list[$i]['course_id'] = $course_id[$i];
			}
			$course_list = json_encode($course_list);
			$insert = $api_VenuesApi->lockedCourt($venues_id, $cat_id, $lock_cycle, $start_time, $end_time, $course_list, $customer, $customer_phone);
		}
		
		helper_CoreHelper::addAdminLog('固定场插入', array(
                    'venues_id' => $venues_id,
                    'cat_id' => $cat_id,
                    'lock_cycle' => $lock_cycle,
                    'start_time' => $start_time,
                    'end_time' => $end_time,
                    'customer' => $customer,
                    'customer_phone' => $customer_phone,
                    'course_list' => $course_list
            ));

		if( isset($insert) ){
			$this->redirect('/fixed/index');
		}else{
			return false;
		}
		
	}


	/**
	 * 取场馆固定场相关信息
	 * add by bumtime 
	 * 20161227
	 */
	public function getLockedCourtConfigAction(){
		$cat_list_new = $lock_court_list_new  = $serviceTimeList = $courseList =  [];
		$info = [];
		// 场馆ID
		$venues_id	= helper_VenuesHelper::getCurrentVenuesId() ;		
		// 分类ID
		$cat_id = (int)$this->getParam("cat_id", helper_VenuesHelper::getVenuesCatID());
		//新版传卡id
		$card_id = intval($this->getParam("card_id"));
		//旧版传卡号
		$card_no = $this->getParam("card_no");
		
		$is_add = intval($this->getParam("is_add")); //1为新增
	 
	/* 	if(empty($cat_id)){
			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "项目分类不能为空");
			exit;
		} 
	 
		if("" == $phone){
			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "请输入手机号");
			exit;
		}
		else{
			if(!baf_Common::isMobile($phone)){
				$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "请输入正确的手机号");
				exit;
			}
		}*/
		if(empty($card_id) && empty($card_no) && empty($is_add)){
			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "卡号不能为空");
			exit;
		}
		
		if(empty($is_add)){
			if(!empty($card_id)){
				//旧版会员卡传数据需要先取会员id
				$param = [
						'venues_id' => $venues_id,
						'card_id'	=> $card_id
				];	
				$card_list = Loader::api('Stat')->getCardListByCardId($param);
				if(!empty($card_list['data']) && isset($card_list['data']) && isset($card_list['data'][0]) && isset($card_list['data'][0]['id']))
				{
					$card_id =  $card_list['data'][0]['id'];
				}
				else{
					$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "该会员卡不存在");
					exit;
				}
	
			}
			else{
				//旧版会员卡传数据需要先取会员id
				$param = [
						'venues_id' => $venues_id,
						'card_no'	=> $card_no
				];
				$card_list = Loader::api('Stat')->getCardListByCardNo($param);
				if(!empty($card_list['data']) && isset($card_list['data']['list']) && isset($card_list['data']['list'][0]) && isset($card_list['data']['list'][0]['id']))
				{
					$card_id = $card_list['data']['list'][0]['id'];
				}
				else{
					$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "该会员卡不存在");
					exit;
				}
			}
			//取该卡号下的所有固定场列表
			$param = [
					'venues_id' => $venues_id, 
					'card_id'	=> $card_id	
			];
			
			$lock_court_list = Loader::api('Venues')->getFixedCourtList($param);
			
			//取该手机下的所有固定场列表
			if(isset($lock_court_list['data'])){
				foreach ($lock_court_list['data'] as $key=>$value){
					$value['start_time'] =  date("Y-m-d", $value['start_time']);
					$value['end_time'] =  date("Y-m-d", $value['end_time']);
				 	if(!empty($value['court_list'])){
						foreach ($value['court_list'] as $key2=>$v){							 
							$v['start_hour'] = date('H:i', strtotime(date('Y-m-d')) + $v['start_hour']);
							$v['end_hour'] = date('H:i', strtotime(date('Y-m-d')) + $v['end_hour']);
							$value['court_list'][$key2] = $v;
						}
					} 
					$lock_court_list_new[$key] = $value;
				}
			}
		}

		//项目分类
		$cat_list  = helper_VenuesHelper::getCurrentCatList();
		
		if(!empty($cat_list)){
			foreach ($cat_list as $key=>$value){
				$cat_list_new[] = [
						"cat_id"=>$key,
						"cat_name"=>$value
				];
		
				// 场地数据
				$courseList[$key] = helper_VenuesHelper::getCourses($key);
					
				// 营业时间
				$temp = helper_VenuesHelper::getServiceTime($key);
		
				foreach($temp AS $k_time=>$v_time){
					$time_start = substr($v_time[0],-3);
					$start = intval($v_time[0]);
					$end = intval($v_time[1]);
					$time_arr = [];
					for($i=$start;$i<$end;$i++){
						$time_arr[] = $i<10 ? "0".$i.$time_start : $i.$time_start;
					}
					$serviceTimeList[$key][] = implode(',',$time_arr);
				}
			}
		}
	 
 	
		//该手机号下的所有固定场列表
		$info['lock_court_list'] = $lock_court_list_new;
		
		//该场馆的场地数据
		$info['course_list'] = $courseList;
		//该场馆的营业时间数据
		$info['time_list'] = $serviceTimeList;
		//该场馆的项目分类
		$info['cat_list'] = $cat_list_new;
		//该场馆的项目分类
		$info['card_id'] = $card_id;
		
		$this->successOutput($info);
 
	}
	
	/**
	 * 场馆固定场删除
	 * add by bumtime
	 * 20161227
	 */
	public function delLockedCourtAction(){
	
		$id = $this->getParam("lock_id");
		// 场馆ID
		$venues_id	= helper_VenuesHelper::getCurrentVenuesId() ;
		
		if(empty($id)){
			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "固定场ID不能为空");
			exit;
		}
		
		//取该手机下的所有固定场列表
		$param = [
				'venues_id' => $venues_id,
				'lock_id'	=> $id
		];
			
		$del = Loader::api('Venues')->delLockedCourtById($param);
		
		helper_CoreHelper::addAdminLog('会员卡-固定场删除', array(
				'id' => $id,
		));
		

		$this->renderJSON($del);
		
	}
	
	/**
	 * 场馆固定场保存
	 * add by bumtime
	 * 20161227
	 */
	public function editLockedCourtAction(){
		
		$venues_id	= helper_VenuesHelper::getCurrentVenuesId();
		//分类ID
		//$cat_id	= (int)$this->getParam("cat_id", helper_VenuesHelper::getVenuesCatID());
		
		$customer = $this->getParam("name", "");
		$customer_phone = $this->getParam("phone", "");
		$card_id = $this->getParam("card_id", 0);

		$data = $this->getParam("data", "");		

		if(empty($data)){
			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "场地相关的信息不能为空");
			exit;
		}
		$course_list[] = $insert_list = $update_list  = [];
		//处理固定场
		$data_list = json_decode($data, true);
		if (json_last_error() > 0) {
			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "data参数中的json格式不对");
			exit;
		}

		if(!empty($data_list)){
			foreach ($data_list as $value){
				$start_time = strtotime($value['start_time']);
				$end_time = strtotime($value['end_time']);
				
				//验证
				if ( empty($value['cat_id'])  || empty($value['start_time']) || empty($value['end_time']) || empty($value['lock_court_list'])) {
					$this->errorOutput( baf_ErrorCode::ERR_NO_PARAMETERS, '固定场所有参数不能为空！');
					exit;
				}
				if (($end_time - $start_time)  < 7 * 3600 * 24 ) {
					$this->errorOutput( baf_ErrorCode::ERR_NO_PARAMETERS, '开始时间必须小于结束时间,并且两个时间要大于7天！');
					exit;
				}
				foreach ($value['lock_court_list'] as $v){
					if ( empty($v['start_hour'])  || empty($v['end_hour']) || empty($v['course_id'])) {
						$this->errorOutput( baf_ErrorCode::ERR_NO_PARAMETERS, '固定场所有参数不能为空！');
						exit;
					}
					
					if (!in_array($v['week'], [0, 1, 2, 3, 4, 5, 6, 7]) ) {
						$this->errorOutput( baf_ErrorCode::ERR_NO_PARAMETERS, '星期的值必须为0--7');
						exit;
					}
				}
				
				if(isset($value['id']) && $value['id'] > 0){
					$update_list[] = $value;
				}else{
					$insert_list[] = $value;
				}
			}
			
			if(!empty($update_list)){
				
			   //检查固定场
				/*  $param = [
						"venues_id"			=>	$venues_id,
						"data"				=>	json_encode($update_list)
				];
				$info = Loader::api('Venues')->checkLockedCourtBatch($param);	
			

				//有冲突则删除原来的固定场
				 if(!empty($info['data'])){
					foreach ($info['data'] as $value){	
						if(!empty($value['lock_id'])){
							$del =  Loader::api('Venues')->delFixedCourt($value['lock_id']);
							helper_CoreHelper::addAdminLog('会员卡-替换固定场，删除旧固定场', array(
									'id' => $value['lock_id']
							));
						}
					}				
				}  */
				
				$param = [
						"venues_id"			=>	$venues_id,
						"customer_phone"	=>	$customer_phone,
						"customer"			=>	$customer,
						"card_id"			=>	$card_id,
						"data"				=>	json_encode($update_list)
				];
				
				$insert = Loader::api('Venues')->updateLockedCourtBatch($param);
				helper_CoreHelper::addAdminLog('会员卡-固定场编辑', $param);
			}
			if(!empty($insert_list)){
				
				//检查固定场
				/* $param = [
						"venues_id"			=>	$venues_id,
						"data"				=>	json_encode($insert_list)
				];
				$info = Loader::api('Venues')->checkLockedCourtBatch($param);		

				//有冲突则删除原来的固定场(此处的locked_id作了别名，跟上面的lock_id名称不一样)
				if(!empty($info['data'])){
					foreach ($info['data'] as $value){	
						$del =  Loader::api('Venues')->delFixedCourt($value['locked_id']);
						helper_CoreHelper::addAdminLog('会员卡-替换固定场，删除旧固定场', array(
								'id' => $value['locked_id']
						));
					}				     				
				}  */
				
				$param = [
						"venues_id"			=>	$venues_id,
						"customer_phone"	=>	$customer_phone,
						"customer"			=>	$customer,
						"card_id"			=>	$card_id,
						"data"				=>	json_encode($insert_list)				
				];
				$insert = Loader::api('Venues')->lockedCourtBatch($param);
				helper_CoreHelper::addAdminLog('会员卡-固定场添加', $param);
			}
		}
		
		$this->renderJSON($insert);
		
	}
	
	/**
	 * 检查固定场
	 * add by bumtime
	 * 20161227
	 */
	public function checkLockedCourtAction(){
	
		$venues_id	= helper_VenuesHelper::getCurrentVenuesId();
		//分类ID
		$cat_id	= (int)$this->getParam("cat_id", helper_VenuesHelper::getVenuesCatID());
		
		//course_list json
		/* [{"cat_id":1,"start_time":"2016-08-12","end_time":"2026-08-12","week":1,"start_hour":"17:00","end_hour":"18:00","course_id":797,"lock_cycle":1},
		{"cat_id":1,"start_time":"2016-08-12","end_time":"2026-08-12","week":1,"start_hour":"18:00","end_hour":"19:00","course_id":792,"lock_cycle":1}] */
		$data = $this->getParam("data", "");
	
		if(empty($data)){
			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "场地相关的信息不能为空");
			exit;
		}
		$data_list = json_decode($data, true);
		if (json_last_error() > 0) {
			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "data参数中的json格式不对");
			exit;
		}
		if(!empty($data_list)){
			foreach ($data_list as $value){
				$start_time = strtotime($value['start_time']);
				$end_time = strtotime($value['end_time']);
		
				//验证
				if ( empty($value['cat_id'])  || empty($value['start_time']) || empty($value['end_time']) || empty($value['lock_court_list'])) {
					$this->errorOutput( baf_ErrorCode::ERR_NO_PARAMETERS, '固定场所有参数不能为空！');
					exit;
				}
				if (($end_time - $start_time)  < 7 * 3600 * 24 ) {
					$this->errorOutput( baf_ErrorCode::ERR_NO_PARAMETERS, '开始时间必须小于结束时间,并且两个时间要大于7天！');
					exit;
				}
				 
				foreach ($value['lock_court_list'] as $v){
					if ( empty($v['start_hour'])  || empty($v['end_hour']) || empty($v['course_id'])) {
						$this->errorOutput( baf_ErrorCode::ERR_NO_PARAMETERS, '固定场所有参数不能为空！');
						exit;
					}
						
					if (!in_array($v['week'], [0, 1, 2, 3, 4, 5, 6, 7]) ) {
						$this->errorOutput( baf_ErrorCode::ERR_NO_PARAMETERS, '星期的值必须为0--7');
						exit;
					}
				}
				 
			}
		}
			

		//处理固定场
		$param = [
				"venues_id"			=>	$venues_id,
				"data"				=>	$data
		];
		
		$check = Loader::api('Venues')->checkLockedCourtBatch($param);
		
		helper_CoreHelper::addAdminLog('会员卡-固定场检查', $param);
		if(!empty($check['data'])){
			$check['status'] = baf_ErrorCode::ERR_DIF_DATA_CHECK;
			$check['msg'] =  baf_ErrorCode::msg(baf_ErrorCode::ERR_DIF_DATA_CHECK);
		}

		$this->renderJSON($check);
	
	}

}