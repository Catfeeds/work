<?php
/**
 * 会员卡管理
 *
 * @author bumtime
 * @date 2016-12-22
 */
class UsercardController extends BaseController
{
	
	/**
	 * 会员管理
	 */
	public function indexAction()
	{	
		$cat_id = 0 ;
		$cat_list  = helper_VenuesHelper::getCurrentCatList();
		
		$cat_keys = array_keys($cat_list);
		if ( !in_array($cat_id, $cat_keys) ){
			//当前分类，默认为第一个分类
			$cat_id = empty($cat_keys) ? 1 : $cat_keys[0];
		}
		// 设置当前分类
		helper_VenuesHelper::setVenuesCatID($cat_id);
		
		
		//赋值
		$dataList = [
				"cat_id" =>$cat_id
		];
		 
		$this->display('index', $dataList);
	}
	
	/**
	 * 取会员卡列表（ajax）
	 */
	public function getListAction() {

		$keyword = $this->getParam("keyword", "");
		$sort_key = $this->getParam("sort_key", "id");
		$sort_value = $this->getParam("sort_value", "DESC");
		$page = intval($this->getParam("page", 1));
		$page_size = $this->getParam("page_size", 20);
		$type = $this->getParam("type", 1);
		
		//球馆ID
		$id	= helper_VenuesHelper::getCurrentVenuesId() ;
		
		// 相关参数
		$param = [
				'venues_id' 	=>	$id,
				'keyword'		=>	$keyword,
				'page'			=>	$page,
				'page_size' 	=>	$page_size,
				'sort_key'		=>	$sort_key,
				'sort_value'	=>	$sort_value,
				'type'			=>	$type
		];
		
		$cardList = Loader::api('Stat')->getUserCardList($param);
		$page_count = 0;
		if(isset($cardList['data']) && isset($cardList['data']['count']) && $cardList['data']['count'] > 0){
			$page_count =  ceil($cardList['data']['count']/ $page_size);	
		}
		
		$cardList['data']['page_count'] = $page_count;
		$cardList['data']['page'] = (0 == $page_count) ? 0 : $page;
		
		$this->renderJSON($cardList);
	}
	
	/**
	 * 取会员卡列表(按关键词，下拉模糊效果)（ajax）
	 */
	public function getListByKeyAction() {
	 
	
		$keyword = $this->getParam("keyword", "");
		$type = $this->getParam("type", 1);
	
		//球馆ID
		$id	= helper_VenuesHelper::getCurrentVenuesId() ;
		
		// 相关参数
		$param = [
				'venues_id' 	=>	$id,
				'keyword'		=>	$keyword,
				'type'			=>	$type
		];
	
		$cardList = Loader::api('Stat')->getUserCardListByKey($param);
	 
		$this->renderJSON($cardList);
	}
	
	
	/**
	 * 导出会员卡
	 */
	public function exportAction() {
		
		$keyword = $this->getParam("keyword", "");
		$sort_key = $this->getParam("sort_key", "id");
		$sort_value = $this->getParam("sort_value", "DESC");
		$page = intval($this->getParam("page", 1));
		$page_size = $this->getParam("page_size", 20);
		$type = $this->getParam("type", 1);
		
		//球馆ID
		$id	= helper_VenuesHelper::getCurrentVenuesId() ;
		
		// 相关参数
		$param = [
				'venues_id' 	=>	$id,
				'keyword'		=>	$keyword,
				'page'			=>	$page,
				'page_size' 	=>	1000,
				'sort_key'		=>	$sort_key,
				'sort_value'	=>	$sort_value,
				'type'			=>	$type 
		];
		
		$cardList = Loader::api('Stat')->getUserCardList($param);
		
		if(empty($cardList["data"]["list"])){
			$data = [
					'title'		=> "提示页",
					'message'	=>	"暂无相关记录"
			];
			$this->showMessage($data);
			exit;
		}
		
		// 释放yaf的类加载机制
		$yafLoader = Yaf_Loader::getInstance();
		spl_autoload_unregister(array($yafLoader, 'autoload'));
		
		require_once APP_PATH . '/application/library/ext/phpexcel/PHPExcel.php';
		
		$phpExcel = new PHPExcel();
		$fileName = "会员卡_" . date("Y-m-d") . ".xlsx";
		$file = iconv('UTF-8', 'GB2312', $fileName);
		
	 	header("Pragma: public");
		header("Expires: 0");
		header("Cache-Control:must-revalidate, post-check=0, pre-check=0");
		header("Content-Type:application/force-download");
		header("Content-Type:application/vnd.ms-execl");
		header("Content-Type:application/octet-stream");
		header("Content-Type:application/download");
		header('Content-Disposition:attachment;filename="' . $file . '"');
		header("Content-Transfer-Encoding:binary"); 
		
		$sheet = $phpExcel->setActiveSheetIndex(0);
		$index = 1;
		$sheet->setCellValue("A{$index}", '会员卡号');
		$sheet->setCellValue("B{$index}", '会员姓名');
		$sheet->setCellValue("C{$index}", '手机号码');
		
		$sheet->getColumnDimension('A')->setWidth(20);// 设置宽度
		$sheet->getColumnDimension('B')->setWidth(20);// 设置宽度
		$sheet->getColumnDimension('C')->setWidth(20);// 设置宽度
 
		foreach ($cardList["data"]["list"] as $key => $val) {
			$index++;
			$sheet->setCellValue("A{$index}", $val['card_number']);
			$sheet->setCellValue("B{$index}", $val['name']);
			$sheet->setCellValue("C{$index}", $val['phone']);
			unset($cardList["data"]["list"][$key]); // 及时释放内存	
		}
		
	  	$objWriter = PHPExcel_IOFactory::createWriter($phpExcel, 'Excel2007');
		$objWriter->save('php://output'); 
		
		// 类加载机制还回给yaf
		spl_autoload_register(array($yafLoader, 'autoload'));
		exit;
	}
	
		
	/**
	 * 编辑会员卡（ajax）
	 */
	public function editAction() {
		
		$card_no = $this->getParam("card_no", "");
		$phone = $this->getParam("phone", "");
		$name = $this->getParam("name", "");
		$card_id = $this->getParam("card_id", "");
		
		//验证
		if(empty($card_id)){
			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "请输入会员卡号Id");
			exit;
		}
		
		if(empty($card_no)){
			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "请输入会员卡号");
			exit;
		}
		else if(baf_Common::isCheckSpace($card_no)){
			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "会员卡号不能录入空格");
			exit;
		}
		else if(mb_strlen($card_no) > 20){
			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "会员卡号最多只能20个字符");
			exit;
		}
		
		if(!empty($name) && mb_strlen($name) > 20){
			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "姓名最多只能20个字符");
			exit;
		}else if(!empty($name) && baf_Common::isCheckSpace($card_no)){
			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "姓名不能录入空格");
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
		}
		
		//球馆ID
		$id	= helper_VenuesHelper::getCurrentVenuesId() ;
		
		// 相关参数
		$param = [
				'venues_id' 	=>	$id,
				'card_id'		=>	$card_id,
				'card_number' 	=>	$card_no,
				'phone'			=>	$phone,
				'name'			=>	$name
		];
		
		$info = Loader::api('Stat')->editCard($param);

		//返回旧手机号
		if(!empty($info['data'])){
			if(!empty($info['data']['phone'])){
				//处理固定场信息
				$param = [
						'venues_id' 			=>	$id,
						'customer_phone'		=>	$phone,
						'customer'				=>	$name,
						'old_customer_phone'	=>	$info['data']['phone']
				];	
				Loader::api('Venues')->updateLockedCourtInfo($param);	
				
				//处理9天后信息（后面跟场地那边再处理）
				
				//修改bussiness库的会员卡信息
				$arryCard = [
						"venues_id"		=>	$id,
						"card_no"		=>	$card_no,
						"phone"			=>	$phone,
						"name"			=>	$name,
						"card_no_old"	=>	$info['data']['card_number'],
						"phone_old"		=>	$info['data']['phone']
						
				];
				$userModel = Loader::businessModel('UserCard');
				$affected = $userModel->editUserCard($arryCard);

			}
		}
		helper_CoreHelper::addAdminLog('编辑会员卡', $param);

		$this->renderJSON($info);
	}
	
	/**
	 * 检查会员卡（ajax）
	 */
	public function checkAction() {
	
		$card_no = $this->getParam("card_no", "");
	
		//验证
		if(empty($card_no)){
			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "请输入会员卡号");
			exit;
		}	
	
		//球馆ID
		$id	= helper_VenuesHelper::getCurrentVenuesId() ;
	
		// 相关参数
		$param = [
				'venues_id' 	=>	$id,
				'card_number' 	=>	$card_no
		];
	
		$info = Loader::api('Stat')->checkCard($param);
	
		helper_CoreHelper::addAdminLog('检查会员卡', $param);
	
		$this->renderJSON($info);
	}
	
	/**
	 * 添加会员卡（ajax）
	 */
	public function addAction() {
	
		$card_no = $this->getParam("card_no", "");
		$phone = $this->getParam("phone", "");
		$name = $this->getParam("name", "");
		$data = $this->getParam("data", "");
	
		//验证
		if(empty($card_no)){
			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "请输入会员卡号");
			exit;
		}
		else if(baf_Common::isCheckSpace($card_no)){
			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "会员卡号不能录入空格");
			exit;
		}
		else if(mb_strlen($card_no) > 20){
			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "会员卡号最多只能20个字符");
			exit;
		}
		
		if(!empty($name) && mb_strlen($name) > 20){
			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "姓名最多只能20个字符");
			exit;
		}else if(!empty($name) && baf_Common::isCheckSpace($name)){
			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "姓名不能录入空格");
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
		}
		
		//处理固定场
		if(!empty($data))
		{
			/* $this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "data数据不能为空");
			exit; */
			$data_list = json_decode($data, true);
			if (json_last_error() > 0) {
				$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "data参数中的json格式不对");
				exit;
			}
			foreach($data_list as $key=>$value){
				$start_time = strtotime($value['start_time']);
				$end_time = strtotime($value['end_time']);
			
				if ( empty($value['cat_id'])  || empty($value['start_time']) || empty($value['end_time']) || empty($value['lock_court_list'])) {
					$this->errorOutput( baf_ErrorCode::ERR_NO_PARAMETERS, 'data参数中固定场所有参数不能为空！');
					exit;
				}
				if (($end_time - $start_time)  < 7 * 3600 * 24 ) {
					$this->errorOutput( baf_ErrorCode::ERR_NO_PARAMETERS, '开始时间必须小于结束时间,并且两个时间要大于7天！');
					exit;
				}
			
				foreach ($value['lock_court_list'] as $vc){
					if ( empty($vc['start_hour'])  || empty($vc['end_hour']) || empty($vc['course_id'])) {
						$this->errorOutput( baf_ErrorCode::ERR_NO_PARAMETERS, 'data参数中lock_court_list所有参数不能为空！');
						exit;
					}
			
					if (!in_array($vc['week'], [0, 1, 2, 3, 4, 5, 6, 7]) ) {
						$this->errorOutput( baf_ErrorCode::ERR_NO_PARAMETERS, '星期的值必须为0--7');
						exit;
					}
				}
			}
		}
		
		
	
		//球馆ID
		$id	= helper_VenuesHelper::getCurrentVenuesId() ;
		
		//添加会员卡
		$param = [
				'venues_id' 	=>	$id,
				"card_number"	=>	$card_no,
				"phone"			=>	$phone,
				"name"			=>	$name
		];
	
		$info = Loader::api('Stat')->addCard($param);
			 
		if(!empty($info['data']) && intval($info['data']) > 0)
		{
			helper_CoreHelper::addAdminLog('添加会员卡', $param);
			//修改到bussniss库
			$userCardModel = Loader::businessModel('UserCard');
			$userModel = Loader::modelMaster('QydUser');
			$userData = $userModel->getUserInfo($phone);
			$arry =[
					"user_id"			=>	!empty($userData['user_id']) ? $userData['user_id'] : 0,
					"card_no"			=>	$card_no,
					"name"				=>	$name,
					"phone"				=>	$phone,
					"venues_id"			=>	$id
			];
			$strReturn = $userCardModel->saveUserCard($arry);
	
			if(!empty($data)){
				//插入固定场
				$param = [
						"venues_id"			=>	$id,
						"customer_phone"	=>	$phone,
						"customer"			=>	$name,
						"card_id"			=>	$info['data'],
						"data"				=>	$data
				]; 
					
				$info = Loader::api('Venues')->lockedCourtBatch($param);
				helper_CoreHelper::addAdminLog('会员卡-固定场插入', $param);
			}
		}
		else{
			$this->errorOutput( baf_ErrorCode::ERR_NO_PARAMETERS, !empty($info['msg']) ? $info['msg'] : "会员卡添加失败");
			exit;
		}
		
				 
		$this->renderJSON($info);
	}
	
	
	/**
	 * 删除会员卡（ajax）
	 */
	public function delAction() {
	
		$card_id = $this->getParam("card_id", "");

		//验证
		if(empty($card_id)){
			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "参数出错了，请联系管理员");
			exit;
		}
		//球馆ID
		$id	= helper_VenuesHelper::getCurrentVenuesId();	

		$param = [
				'venues_id' 	=>	$id,
				'id'			=>	$card_id
		];
		
		$info = Loader::api('Stat')->delCard($param);
		
		
		if(!empty($info['data']) && !empty($info['data']['phone']) && !empty($info['data']['card_number'])){

			//修改到bussniss库
			$arryCard = [
					"venues_id"		=>	$id,
					"card_no"		=>	$info['data']['card_number']	
			];
			$userModel = Loader::businessModel('UserCard');
			$affected = $userModel->delUserCard($arryCard);
			
			//删除固定场
			$param = [
					'venues_id' 	=>	$id,
					'card_id'		=>	$card_id
			];

			Loader::api('Venues')->delLockedCourtByCardId($param);

		}

		helper_CoreHelper::addAdminLog('删除会员卡', $param);
		
		$this->renderJSON($info);
	}
	
	
	/**
	 * 导入会员卡（ajax）
	 */
	public function importAction() {
		 
		if(empty($_FILES['csvfile'])){
			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "请选择要导入的CSV文件");
			exit;
		}
		
		//默认1M
		if($_FILES['csvfile']['size'] > 1*1024*1024){
			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "CSV文件过大，请分拆后再上传");
			exit;
		}
			
		//文件验证
		$fileName = $_FILES['csvfile']['tmp_name'];
		$fileInfo = pathinfo($_FILES['csvfile']['name']);
		if(!in_array(strtolower($fileInfo['extension']), array('csv'))){
			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "文件格式和模板不同，请按照模板格式修改");
			exit;
		}
		
		//解析csv
		$result = $this->handelCsv($fileName); 
		$strLen = count($result);
		if($strLen == 0){
			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "请检查导入的CSV文件里面的数据是否正确");
			exit;
		}			
		 
		//处理值
		$params = [];
		$paramTemp = [];
		$tips = "";
		for ($i = 1; $i < $strLen; $i++) { 
			if(empty($result[$i][0])){
				$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "CSV里面的值有问题");
				exit;
			}
			$paramTemp['card_number'] = mb_convert_encoding($result[$i][0], "UTF-8", "GBK");
			$paramTemp['name'] = !empty($result[$i][1]) ? mb_convert_encoding($result[$i][1], "UTF-8", "GBK") : "" ;
			$paramTemp['phone'] = !empty($result[$i][2]) ? $result[$i][2] : "" ;
			
			if(empty($paramTemp['card_number'])){
				$tips .= "会员卡号：不能为空 ; 会员姓名: ". $paramTemp['name'] ."; 手机号码: ". $paramTemp['phone'];
			}
			else if(baf_Common::isCheckSpace($paramTemp['card_number'])){
				$tips .= "会员卡号：会员卡号不能录入空格 ; 会员姓名: ". $paramTemp['name'] ."; 手机号码: ". $paramTemp['phone'];
			}else if(mb_strlen($paramTemp['card_number']) > 20){
				$tips .= "会员卡号：会员卡号最多只能20个字符; 会员姓名: ". $paramTemp['name'] ."; 手机号码: ". $paramTemp['phone'];
			}
			
			if(!empty($paramTemp['name']) && mb_strlen($paramTemp['name']) > 20){
				$tips .= "会员卡号：" . $paramTemp['card_number'] . "; 会员姓名: 姓名最多只能20个字符; 手机号码: ". $paramTemp['phone'];
			}else if(!empty($paramTemp['name']) && baf_Common::isCheckSpace($paramTemp['name'])){
				$tips .= "会员卡号：" . $paramTemp['card_number'] . "; 会员姓名: 姓名不能录入空格; 手机号码: ". $paramTemp['phone'];
			}			
			
			if(empty($paramTemp['phone'])){
				$tips .= "会员卡号：" . $paramTemp['card_number'] . " ; 会员姓名: ". $paramTemp['name'] ."; 手机号码: 不能为空";
			}
			else{
				if(!baf_Common::isMobile($paramTemp['phone'])){
					$tips .= "会员卡号：" . $paramTemp['card_number'] . " ; 会员姓名: ". $paramTemp['name'] ."; 手机号码: 手机不正确";
				}			
			}
			
			if(!empty($tips)){
				$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, $tips);
				exit;
			}
			
			$params[] = $paramTemp;
		}
		
		//球馆ID
		$id		= helper_VenuesHelper::getCurrentVenuesId();

		// 相关参数
		$param = [
				'venues_id' 	=>	$id,
				'data'			=>	json_encode($params)
		];

		$info = Loader::api('Stat')->importCard($param);
		helper_CoreHelper::addAdminLog('importAction批量导入会员卡', $param);
		
		//修改到bussniss库
		$userCardModel = Loader::businessModel('UserCard');
		$userModel = Loader::modelMaster('QydUser');
		if(!empty($params)){
			foreach ($params as $value){
				$userModel->getUserInfo($value['phone']);
				$arry =[
						"user_id"			=>	!empty($info['user_id']) ? $info['user_id'] : 0,
						"card_no"			=>	$value['card_number'],
						"name"				=>	$value['name'],
						"phone"				=>	$value['phone'],
						"venues_id"			=>	$id
				];
				
				$userCardModel->saveUserCard($arry);
			}
		}
		
		$this->renderJSON($info);
		
	}
	
	
	/**
	 * 导入会员卡（表单，兼容不支持ajax）
	 */
	public function importFormAction() {
	
		//是否ajax提交
		$is_ajax = $this->getParam("is_ajax", "");
	
		if(empty($_FILES['csvfile']) || empty($_FILES['csvfile']['tmp_name'])){
			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "请选择要导入的CSV文件");
			exit;
		}
	
		//文件验证
		$fileName = $_FILES['csvfile']['tmp_name'];
		$fileInfo = pathinfo($_FILES['csvfile']['name']);
		if(!in_array(strtolower($fileInfo['extension']), array('csv'))){
			$this->showMessage(array('title' => "会员卡导入", 'message' =>"文件格式和模板不同，请按照模板格式修改"));
		}
		//默认1M
		if($_FILES['csvfile']['size'] > 1*1024*1024){
			$this->showMessage(array('title' => "会员卡导入", 'message' =>"CSV文件过大，请分拆后再上传"));
		}
	
		//解析csv
		$result = $this->handelCsv($fileName);
		$strLen = count($result);
		if($strLen == 0){
			$this->showMessage(array('title' => "会员卡导入", 'message' =>"请检查导入的CSV文件里面的数据是否正确"));
		}
	
		//处理值
		$params = [];
		$paramTemp = [];
		$tips = "";
		for ($i = 1; $i < $strLen; $i++) {
			if(empty($result[$i][0])){
				$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "CSV里面的值有问题");
				exit;
			}
			$paramTemp['card_number'] = mb_convert_encoding($result[$i][0], "UTF-8", "GBK");
			$paramTemp['name'] = !empty($result[$i][1]) ? mb_convert_encoding($result[$i][1], "UTF-8", "GBK") : "" ;
			$paramTemp['phone'] = !empty($result[$i][2]) ? $result[$i][2] : "" ;
					
			if(empty($paramTemp['card_number'])){
				$tips .= "会员卡号：不能为空 ; 会员姓名: ". $paramTemp['name'] ."; 手机号码: ". $paramTemp['phone'];
			}
			else if(baf_Common::isCheckSpace($paramTemp['card_number'])){
				$tips .= "会员卡号：会员卡号不能录入空格 ; 会员姓名: ". $paramTemp['name'] ."; 手机号码: ". $paramTemp['phone'];
			}else if(mb_strlen($paramTemp['card_number']) > 20){
				$tips .= "会员卡号：会员卡号最多只能20个字符; 会员姓名: ". $paramTemp['name'] ."; 手机号码: ". $paramTemp['phone'];
			}
			
			if(!empty($paramTemp['name']) && mb_strlen($paramTemp['name']) > 20){
				$tips .= "会员卡号：" . $paramTemp['card_number'] . "; 会员姓名: 姓名最多只能20个字符; 手机号码: ". $paramTemp['phone'];
			}else if(!empty($paramTemp['name']) && baf_Common::isCheckSpace($paramTemp['name'])){
				$tips .= "会员卡号：" . $paramTemp['card_number'] . "; 会员姓名: 姓名不能录入空格; 手机号码: ". $paramTemp['phone'];
			}			
			
			if(empty($paramTemp['phone'])){
				$tips .= "会员卡号：" . $paramTemp['card_number'] . " ; 会员姓名: ". $paramTemp['name'] ."; 手机号码: 不能为空";
			}
			else{
				if(!baf_Common::isMobile($paramTemp['phone'])){
					$tips .= "会员卡号：" . $paramTemp['card_number'] . " ; 会员姓名: ". $paramTemp['name'] ."; 手机号码: 手机不正确";
				}			
			}
			
			if(!empty($tips)){
				$this->showMessage(array('title' => "会员卡导入", 'message' =>$tips));
			}
				
			$params[] = $paramTemp;
		}
	
		//球馆ID
		$id		= helper_VenuesHelper::getCurrentVenuesId();
	
		// 相关参数
		$param = [
				'venues_id' 	=>	$id,
				'data'			=>	json_encode($params)
		];

		$info = Loader::api('Stat')->importCard($param);
		helper_CoreHelper::addAdminLog('importAction批量导入会员卡', $param);
		
		//修改到bussniss库
		$userCardModel = Loader::businessModel('UserCard');
		$userModel = Loader::modelMaster('QydUser');
		if(!empty($params)){
			foreach ($params as $value){
				$userModel->getUserInfo($value['phone']);
				$arry =[
						"user_id"			=>	!empty($info['user_id']) ? $info['user_id'] : 0,
						"card_no"			=>	$value['card_number'],
						"name"				=>	$value['name'],
						"phone"				=>	$value['phone'],
						"venues_id"			=>	$id
				];
				
				$userCardModel->saveUserCard($arry);
			}
		}
 	
		$this->showMessage(array('title' => "会员卡导入", 'message' =>"会员卡导入成功"));
		 
	}
	
	/**
	 * 下载CSV模板
	 */
	public function downCsvAction(){
		$fileName = "temp/user_card.csv";
		header("Content-Type:application/force-download");
		header('Content-Type: application/octet-stream');
		header("Content-Type:application/download");
		header('Content-Disposition: attachment; filename=user_card.csv' );
		header('Content-Transfer-Encoding: binary');

		readfile($fileName); 
		
		
		// 释放yaf的类加载机制
	/*	$yafLoader = Yaf_Loader::getInstance();
		spl_autoload_unregister(array($yafLoader, 'autoload'));
		
		require_once APP_PATH . '/application/library/ext/phpexcel/PHPExcel.php';
		
		$phpExcel = new PHPExcel();
		$fileName = "user_card.csv";
		$file = iconv('UTF-8', 'GB2312', $fileName);
		
	 	header("Pragma: public");
		header("Expires: 0");
		header("Cache-Control:must-revalidate, post-check=0, pre-check=0");
		header("Content-Type:application/force-download");
		//header("Content-Type:application/vnd.ms-execl");
		header("Content-Type:application/octet-stream");
		header("Content-Type:application/download");
		header('Content-Disposition:attachment;filename=""');
		header("Content-Transfer-Encoding:binary"); 
		
		$sheet = $phpExcel->setActiveSheetIndex(0);
		$index = 1;
		$sheet->setCellValue("A{$index}", '会员卡号');
		$sheet->setCellValue("B{$index}", '会员姓名');
		$sheet->setCellValue("C{$index}", '手机号码');
		
		$sheet->getColumnDimension('A')->setWidth(20);// 设置宽度
		$sheet->getColumnDimension('B')->setWidth(20);// 设置宽度
		$sheet->getColumnDimension('C')->setWidth(20);// 设置宽度
		
	  	$objWriter = PHPExcel_IOFactory::createWriter($phpExcel, 'Excel2007');
		$objWriter->save('php://output'); 
		
		// 类加载机制还回给yaf
		spl_autoload_register(array($yafLoader, 'autoload'));
		exit;*/
		
	}
	
	/**
	 * 处理CSV
	 */
	private function handelCsv($fileName) {
		$list = [];
		$n = 0;
		if (($handle = fopen($fileName, "r")) !== FALSE) {
			while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
				$num = count($data);
				for ($i = 0; $i < $num; $i++) {
					$list[$n][$i] = $data[$i];
				}
				$n++;
			}
			fclose($handle);
		}
		
		return $list;
	}
	
	
}