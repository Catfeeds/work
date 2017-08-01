<?php
/**
 * 会员统计控制器
 *
 * @author bumtime
 * @date 2016-08-15
 */
class MemberStatController extends BaseController
{
	const ONE_MONTH = 2678400; //86400*31 31天
	const ONE_YEAR  = 31622400; //366*3600*24
	
	/**
	 * 会员交易汇总
	 */
	public function memberTotalAction(){
		$now = time();
		$start_date = $this->getParam('startDate', date('Y-m-d',$now));
		$end_date = $this->getParam('endDate', date('Y-m-d',$now));
	
		//球馆ID
		$id	= helper_VenuesHelper::getCurrentVenuesId() ;
	
		if ($start_date && !helper_CoreHelper::isLawfulDate($start_date)) {
			throw new InvalidArgumentException('开始日期参数有误');
		}
	
		if ($end_date && !helper_CoreHelper::isLawfulDate($end_date)) {
			throw new InvalidArgumentException('结束日期参数有误');
		}
	
		if ($start_date && $end_date && (strtotime($start_date) > strtotime($end_date))) {
			throw new InvalidArgumentException('开始日期不能大于结束日期');
		}
		
		$start_time = strtotime($start_date);
		$end_time = strtotime($end_date." 23:59:59");
		if($end_time > $start_time + self::ONE_YEAR){
			$this->showMessage(array('title' => "error", 'message' =>"查询时间不能超过1年" ));
		}
			
		if(empty($id))
		{
			$data = [
					'title'		=> "提示页",
					'message'	=>	"暂无相关记录"
			];
			$this->showMessage($data);
		}
	
		//调用接口处理数据
		$param = [
				'venues_id'		=>	$id,
				'start_date'	=>	strtotime($start_date),
				'end_date'		=>	strtotime($end_date." 23:59:59")
		];

		$list = $this->apiReturnInfo(Loader::api('Stat')->getMembersTradingAllByCat($param));

		if(empty($list) || !is_array($list))
		{
			$list = [
					'total' => [],
					'list'	=> []
			];
		}
	
		$this->display('memberTotal', [
				'startDate'		=>	$start_date,
				'endDate'		=>	$end_date,
				'list'			=>	$list['list'],
				'total_info'	=>	$list['total']
		]);
	}
	
	/**
	 * 会员消费统计
	 */
	public function memberConsumeAction(){
		$now = time();
		$start_date = $this->getParam('startDate', date('Y-m-d',$now));
		$end_date = $this->getParam('endDate', date('Y-m-d',$now));
		$member_code = $this->getParam('member_code', "");//查询关键词
		$card_type = $this->getParam('card_type', "");//会员卡类型
		$currentPage = helper_CoreHelper::correctionPage($this->getParam('page', 1)); // 页码
		$pageSize = 15;
		
		//球馆ID
		$id	= helper_VenuesHelper::getCurrentVenuesId() ;
		
		if ($start_date && !helper_CoreHelper::isLawfulDate($start_date)) {
			throw new InvalidArgumentException('开始日期参数有误');
		}
		
		if ($end_date && !helper_CoreHelper::isLawfulDate($end_date)) {
			throw new InvalidArgumentException('结束日期参数有误');
		}
		
		if ($start_date && $end_date && (strtotime($start_date) > strtotime($end_date))) {
			throw new InvalidArgumentException('开始日期不能大于结束日期');
		}
		
		$start_time = strtotime($start_date);
		$end_time = strtotime($end_date." 23:59:59");
		if($end_time > $start_time + self::ONE_YEAR){
			$this->showMessage(array('title' => "error", 'message' =>"查询时间不能超过1年" ));
		}
		
		if(empty($id))
		{
			$data = [
					'title'		=> "提示页",
					'message'	=>	"暂无相关记录"		
			];
			$this->showMessage($data);
		}
		
		//调用接口处理数据
		/*$param = [
				'keywords'		=>	$member_code,
				'venues_id'		=>	$id,
				'start_date'	=>	strtotime($start_date),
				'end_date'		=>	strtotime($end_date." 23:59:59"),
				'page'			=>	$currentPage,
				'count'			=>	$pageSize,
		];*/
		$param = [
				'member_code'	=>	$member_code,
				'venues_id'		=>	$id,
				'start_date'	=>	strtotime($start_date),
				'end_date'		=>	strtotime($end_date." 23:59:59"),
				'page'			=>	$currentPage,
				'count'			=>	$pageSize,
				'card_type'		=>	$card_type
		];

		$list = $this->apiReturnInfo(Loader::api('Stat')->getMembersTradingCountList($param));

		if(empty($list) || !is_array($list))
		{
			$list = [
					'count' => 0,
					'list'	=> []
			];
		}
		
		$search = [
				'startDate'		=>		$start_date ,
				'endDate'		=>		$end_date ,
				'member_code' 	=>		$member_code,
				'card_type' 	=>		$card_type		
		];
		
		$page = array(
				'totalPage' => ceil($list['count'] / $pageSize),
				'currentPage' => $currentPage,
				'url' => '/MemberStat/memberConsume?'.http_build_query(array_filter($search)).'&page='
		);	
		
		//会员卡类型
		$cardTypeList = helper_StatHelper::getMembersCardType($id);

		$this->display('memberConsume', [
				'page' 			=>	$page,
				'startDate'		=>	$start_date,
				'endDate'		=>	$end_date,
				'member_code'	=>	$member_code,
				'card_type'		=>	$card_type,
				'list'			=>	$list['list'],
				'card_list'		=>	$cardTypeList
		]);

	}
	
	/**
	 * 会员交易明细
	 */
	public function memberDetailAction(){
		
		$now = time();
		$start_date = $this->getParam('startDate', date('Y-m-d',$now));
		$end_date = $this->getParam('endDate', date('Y-m-d',$now));
		$type = $this->getParam('type', 0);//1充值、2退费（充值提现）、3扣款（场次）、4退款（场次），5扣款（商品）、6退款（商品）,7扣款（人次），8退款（人次）
		$currentPage = helper_CoreHelper::correctionPage($this->getParam('page', 1)); // 页码
		$pageSize = 15;

		//球馆ID
		$id	= helper_VenuesHelper::getCurrentVenuesId() ;
		
		if ($start_date && !helper_CoreHelper::isLawfulDate($start_date)) {
			throw new InvalidArgumentException('开始日期参数有误');
		}
		
		if ($end_date && !helper_CoreHelper::isLawfulDate($end_date)) {
			throw new InvalidArgumentException('结束日期参数有误');
		}
		
		if ($start_date && $end_date && (strtotime($start_date) > strtotime($end_date))) {
			throw new InvalidArgumentException('开始日期不能大于结束日期');
		}
		
		$start_time = strtotime($start_date);
		$end_time = strtotime($end_date." 23:59:59");
		if($end_time > $start_time + self::ONE_MONTH){
			$this->showMessage(array('title' => "error", 'message' =>"查询时间不能超过31天" ));
		}
		
		if(empty($id))
		{	 
			$data = [
					'title'		=> "提示页",
					'message'	=>	"暂无相关记录"
		
			];
			$this->showMessage($data);	 
		}	

		//交易类型
		$member_trading_type = helper_StatHelper::MEMBER_TRADING_TYPE;
		
		//调用接口处理数据
		$param = [
				'venues_id'		=>		$id,
				'start_date'	=>		strtotime($start_date),
				'end_date'		=>		strtotime($end_date." 23:59:59"),
				'page' 			=>		$currentPage,
				'count' 		=>		$pageSize,
		];
		switch ($type)
		{
			case 0:
				$param['type'] =  "0";
				break;
				
			case 1:
			case 2:
				$param['type'] =  $type;
				break;
				
			case 3:
			case 5:
				$param['type'] =  "3,5,7";
				break;
				
			case 4:
			case 6:
				$param['type'] =  "4,6,8";
				break;							
		}
		
		$list = $this->apiReturnInfo(Loader::api('Stat')->getMembersTradingList($param));

		if(empty($list) || !is_array($list))
		{
			$list = [
					'count' => 0,
					'list'	=> []
			];
		}

		$search = [			
				'startDate'		=>		$start_date ,
				'endDate'		=>		$end_date ,
				'type' 			=>		$type
		];
		
		$page = array(
				'totalPage'		=> ceil($list['count'] / $pageSize),
				'currentPage'	=> $currentPage,
				'url'			=> '/MemberStat/memberDetail?'.http_build_query(array_filter($search)).'&page='
		);
		
		$cat_list  = helper_VenuesHelper::getCurrentCatList();
		
		$this->display('memberDetail', [
				'page'					=>	$page,
				'startDate'				=>	$start_date,
				'endDate'				=>	$end_date,
				'type'					=>	$type,
				'list'					=>	$list['list'],
				'member_trading_type'	=>	$member_trading_type
		]);
	}

	/**
	 * 导出会员交易明细
	 */
	public function exportMemberDetailAction()
	{
		
		$now = time();
		$start_date = $this->getParam('startDate', date('Y-m-d',$now - 6*86400));
		$end_date = $this->getParam('endDate', date('Y-m-d',$now));
		$type = $this->getParam('type', 0);//1充值、2退费（充值提现）、3扣款（场次）、4退款（场次），5扣款（商品）、6退款（商品）,7扣款（人次），8退款（人次）
		$currentPage = helper_CoreHelper::correctionPage($this->getParam('page', 1)); // 页码
		$pageSize = 15;

		//球馆ID
		$id	= helper_VenuesHelper::getCurrentVenuesId() ;
		
		if ($start_date && !helper_CoreHelper::isLawfulDate($start_date)) {
			throw new InvalidArgumentException('开始日期参数有误');
		}
		
		if ($end_date && !helper_CoreHelper::isLawfulDate($end_date)) {
			throw new InvalidArgumentException('结束日期参数有误');
		}
		
		if ($start_date && $end_date && (strtotime($start_date) > strtotime($end_date))) {
			throw new InvalidArgumentException('开始日期不能大于结束日期');
		}
		
		$start_time = strtotime($start_date);
		$end_time = strtotime($end_date);
		if($end_time > $start_time + self::ONE_MONTH){
			$this->showMessage(array('title' => "error", 'message' =>"查询时间不能超过31天" ));
		}
		
		if(empty($id))
		{
			$data = [
					'title'		=> "提示页",
					'message'	=>	"暂无相关记录"
		
			];
			$this->showMessage($data);
		}
		
		//交易类型
		$member_trading_type = helper_StatHelper::MEMBER_TRADING_TYPE;

		//调用接口处理数据
		$param = [
				'venues_id'		=>		$id,
				'start_date'	=>		strtotime($start_date),
				'end_date'		=>		strtotime($end_date." 23:59:59"),
				'page' 			=>		0,
				'page_size' 	=>		$pageSize,
		];
		switch ($type)
		{
			case 0:
				$param['type'] =  "0";
				break;
				
			case 1:
			case 2:
				$param['type'] =  $type;
				break;
				
			case 3:
				$param['type'] =  "3,5,7";
				break;
				
			case 4:
				$param['type'] =  "4,6,8";
				break;							
		}
		

		$list = $this->apiReturnInfo(Loader::api('Stat')->getMembersTradingList($param));

		if(empty($list) || !isset($list['list']) || empty($list['list']))
		{
			$data = [
					'title'		=> "提示页",
					'message'	=>	"暂无相关记录"
		
			];
			$this->showMessage($data);
		}	
	
		// 释放yaf的类加载机制
    	$yafLoader = Yaf_Loader::getInstance();
    	spl_autoload_unregister(array($yafLoader, 'autoload'));
    	
    	require_once APP_PATH.'/application/library/ext/phpexcel/PHPExcel.php';
    	 
    	$phpExcel = new PHPExcel();
    	$fileName = "会员交易明细_".date('Ymd', strtotime($start_date)).'_'.date('Ymd', strtotime($end_date)).".xlsx";
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
     	$phpExcel->getActiveSheet()->getColumnDimension('A')->setWidth(20);// 设置宽度
    	$phpExcel->getActiveSheet()->getColumnDimension('D')->setWidth(11);// 设置宽度 
    	$phpExcel->getActiveSheet()->getColumnDimension('E')->setWidth(20);// 设置宽度
    	$phpExcel->getActiveSheet()->getColumnDimension('F')->setWidth(11);// 设置宽度
    	
    	$index = 1;
    	$sheet->setCellValue("A{$index}", '交易时间');
    	$sheet->setCellValue("B{$index}", '交易类型');
    	$sheet->setCellValue("C{$index}", '订单类型');
    	$sheet->setCellValue("D{$index}", '会员类型 ');
    	$sheet->setCellValue("E{$index}", '会员名称');
    	$sheet->setCellValue("F{$index}", '会员卡号');
    	$sheet->setCellValue("G{$index}", '交易金额(元)');
    	$sheet->setCellValue("H{$index}", '操作人员');

    	foreach ($list['list'] as $key => $order) {
    		$index++;
    		$sheet->setCellValue("A{$index}", date('Y-m-d H:i:s', $order['create_time']));
    		$sheet->setCellValue("B{$index}", $order['type_name']);
    		$sheet->setCellValue("C{$index}", $order['order_catalog_name']);
    		$sheet->setCellValue("D{$index}", $order['member_type_name']);
    		$sheet->setCellValue("E{$index}", $order['mebmer_name']);
    		$sheet->setCellValue("F{$index}", $order['card_no']);
    		$sheet->setCellValue("G{$index}", abs($order['amount']));
    		$sheet->setCellValue("H{$index}", $order['create_by']);
    	
    		unset($list['list'][$key]); // 及时释放内存
    	}
    
    	           
    	
    	$objWriter = PHPExcel_IOFactory::createWriter($phpExcel, 'Excel2007');
    	$objWriter->save('php://output');
    	
    	// 类加载机制还回给yaf
    	spl_autoload_register(array($yafLoader, 'autoload'));
    	exit;
	}
	
	/**
	 * 导出会员交易汇总
	 */
	public function exportMemberTotalAction()
	{
		$now = time();
		$start_date = $this->getParam('startDate',date('Y-m-d',$now - 6*86400));
		$end_date = $this->getParam('endDate',date('Y-m-d',$now));
	
		//球馆ID
		$id	= helper_VenuesHelper::getCurrentVenuesId() ;
	
		if ($start_date && !helper_CoreHelper::isLawfulDate($start_date)) {
			$this->showMessage(array('title' => "error", 'message' =>"开始日期参数有误" ));
		}
	
		if ($end_date && !helper_CoreHelper::isLawfulDate($end_date)) {
			$this->showMessage(array('title' => "error", 'message' =>"结束日期参数有误" ));
		}
	
		if ($start_date && $end_date && (strtotime($start_date) > strtotime($end_date))) {
			$this->showMessage(array('title' => "error", 'message' =>"开始日期不能大于结束日期" ));
		}
		
		 $start_time = strtotime($start_date);
		 $end_time = strtotime($end_date);
		 if($end_time > $start_time + self::ONE_YEAR){
		 	$this->showMessage(array('title' => "error", 'message' =>"查询时间不能超过1年" ));
		 } 
	
		if(empty($id))
		{
			$data = [
					'title'		=> "提示页",
					'message'	=>	"暂无相关记录"
			];
			$this->showMessage($data);
		}
	
		//调用接口处理数据
		$param = [
				'venues_id'		=>	$id,
				'start_date'	=>	strtotime($start_date),
				'end_date'		=>	strtotime($end_date." 23:59:59")
		];

		$list = $this->apiReturnInfo(Loader::api('Stat')->getMembersTradingAllByCat($param));

		if(empty($list) || !is_array($list) || !isset($list['list']) || empty($list['list']))
		{
			$list = [
					'total' => [],
					'list'	=> []
			];
		}
			
		// 释放yaf的类加载机制
		$yafLoader = Yaf_Loader::getInstance();
		spl_autoload_unregister(array($yafLoader, 'autoload'));
			
		require_once APP_PATH.'/application/library/ext/phpexcel/PHPExcel.php';
	
		$phpExcel = new PHPExcel();
		$fileName = "会员交易汇总_".date('Ymd', strtotime($start_date)).'_'.date('Ymd', strtotime($end_date)).".xlsx";
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
		$phpExcel->getActiveSheet()->getColumnDimension('A')->setWidth(20);// 设置宽度


		$index = 1;
		$sheet->setCellValue("A{$index}", '会员类型');
		$sheet->setCellValue("B{$index}", '开卡人数');
		$sheet->setCellValue("C{$index}", '充值人数');
		$sheet->setCellValue("D{$index}", '充值金额 ');
		$sheet->setCellValue("E{$index}", '消费人数');
		$sheet->setCellValue("F{$index}", '消费金额');

		foreach ($list['list'] as $key => $order) {
			$index++;
			$sheet->setCellValue("A{$index}", $order['member_type_name']);
			$sheet->setCellValue("B{$index}", $order['open_card_count']);
			$sheet->setCellValue("C{$index}", $order['total_recharge_count']);
			$sheet->setCellValue("D{$index}", $order['total_recharge_amount']);
			$sheet->setCellValue("E{$index}", $order['total_apay_count']);
			$sheet->setCellValue("F{$index}", $order['total_apay_amount']);

			unset($list['list'][$key]); // 及时释放内存
		}
		
		
		$objWriter = PHPExcel_IOFactory::createWriter($phpExcel, 'Excel2007');
		$objWriter->save('php://output');
			
		// 类加载机制还回给yaf
		spl_autoload_register(array($yafLoader, 'autoload'));
		exit;
	}
		
	/**
	 * 导出会员消费统计
	 */
	public function exportMemberConsumeAction()
	{
		$now = time();
		$start_date = $this->getParam('startDate',date('Y-m-d',$now - 6*86400));
		$end_date = $this->getParam('endDate',date('Y-m-d',$now));
		$member_code = $this->getParam('member_code', "");//查询关键词
		$card_type = $this->getParam('card_type', "");//会员卡类型
		$currentPage = helper_CoreHelper::correctionPage($this->getParam('page', 1)); // 页码
		$pageSize = 5000;
		
		//球馆ID
		$id	= helper_VenuesHelper::getCurrentVenuesId() ;
		
		if ($start_date && !helper_CoreHelper::isLawfulDate($start_date)) {
			$this->showMessage(array('title' => "error", 'message' =>"开始日期参数有误" ));
		}
		
		if ($end_date && !helper_CoreHelper::isLawfulDate($end_date)) {
			$this->showMessage(array('title' => "error", 'message' =>"结束日期参数有误" ));
		}
		
		if ($start_date && $end_date && (strtotime($start_date) > strtotime($end_date))) {
			$this->showMessage(array('title' => "error", 'message' =>"开始日期不能大于结束日期" ));
		}
		
		 $start_time = strtotime($start_date);
		 $end_time = strtotime($end_date);
		 if($end_time > $start_time + self::ONE_YEAR){
		 $this->showMessage(array('title' => "error", 'message' =>"查询时间不能超过1年" ));
		 } 

		
		
		if(empty($id))
		{
			$data = [
					'title'		=> "提示页",
					'message'	=>	"暂无相关记录"
		
			];
			$this->showMessage($data);
		}
		
		//调用接口处理数据
		$param = [
				'member_code'	=>	$member_code,
				'venues_id'		=>	$id,
				'start_date'	=>	strtotime($start_date),
				'end_date'		=>	strtotime($end_date." 23:59:59"),
				'page'			=> 0,
				'count'			=>	$pageSize,
				'card_type'		=>	$card_type
		];
		

		$list = $this->apiReturnInfo(Loader::api('Stat')->getMembersTradingCountList($param));
		
		if(empty($list) || !is_array($list))
		{
			$data = [
					'title'		=> "提示页",
					'message'	=>	"暂无相关记录"
		
			];
			$this->showMessage($data);
		}
		else
		{
			$list = $list['list'];
		}
		
		//会员卡类型
		$cardTypeList = helper_StatHelper::getMembersCardType($id);
		
		// 释放yaf的类加载机制
		$yafLoader = Yaf_Loader::getInstance();
		spl_autoload_unregister(array($yafLoader, 'autoload'));
		 
		require_once APP_PATH.'/application/library/ext/phpexcel/PHPExcel.php';
	
		$phpExcel = new PHPExcel();
		$fileName = "会员消费统计_".date('Ymd', strtotime($start_date)).'_'.date('Ymd', strtotime($end_date)).".xlsx";
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
	 	$phpExcel->getActiveSheet()->getColumnDimension('B')->setWidth(20);// 设置宽度
		 
		$index = 1;
		$sheet->setCellValue("A{$index}", '会员类型');
		$sheet->setCellValue("B{$index}", '会员名称');
		$sheet->setCellValue("C{$index}", '会员卡号');
		$sheet->setCellValue("D{$index}", '交易次数 ');
		$sheet->setCellValue("E{$index}", '充值金额');
		$sheet->setCellValue("F{$index}", '充值赠送金额');
		$sheet->setCellValue("G{$index}", '消费金额');
		$sheet->setCellValue("H{$index}", '消费赠送金额');
		$sheet->setCellValue("I{$index}", '退款金额');
		$sheet->setCellValue("J{$index}", '退费金额');
/* 		$sheet->setCellValue("J{$index}", '剩余金额');
		$sheet->setCellValue("K{$index}", '剩余赠送金额');	 */	 		

		
		foreach ($list as $key => $order) {
			$index++;
			$temp = '';
			if ($order['member_card_catalog'] != '' && isset($cardTypeList[$order['member_card_catalog']]))
				$temp = $cardTypeList[$order['member_card_catalog']] ;
			
			$sheet->setCellValue("A{$index}", $temp);
			$sheet->setCellValue("B{$index}", $order['customer_name']);
			$sheet->setCellValue("C{$index}", $order['member_card_no']);
			$sheet->setCellValue("D{$index}", $order['order_count']);
			$sheet->setCellValue("E{$index}", $order['total_recharge_amount']);
			$sheet->setCellValue("F{$index}", $order['total_gift_amount']);
			$sheet->setCellValue("G{$index}", $order['total_apay_amount']);
			$sheet->setCellValue("H{$index}", $order['total_gift_remain_pay_amount']);
			$sheet->setCellValue("I{$index}", $order['total_return_apay_amount']);
			$sheet->setCellValue("J{$index}", $order['total_refund_rechage_amount']);	
		/* 	$sheet->setCellValue("J{$index}", $order['record_card_balance']);
			$sheet->setCellValue("K{$index}", $order['record_card_givebalance']); 		
		  */
			unset($list[$key]); // 及时释放内存
		}
		 
		$objWriter = PHPExcel_IOFactory::createWriter($phpExcel, 'Excel2007');
		$objWriter->save('php://output');
		 
		// 类加载机制还回给yaf
		spl_autoload_register(array($yafLoader, 'autoload'));
		exit;
	}
			
	/**
	 * 组合会员明细输出数据
	 */
	private  function makeMemberData($list, $id)
	{	
		//交易类型
		$member_trading_type = helper_StatHelper::MEMBER_TRADING_TYPE;
		$orderType = helper_StatHelper::ORDER_TYPE_MEMBER;
		if(empty($list) || !is_array($list))
		{
			$list = [
					'total_page'	=> 0,
					'list'			=> []
			];
		}
		else
		{
			if(isset($list['list']))
			{
				$order_code = [];
				foreach ($list['list'] as $key=>$value)
				{
					$order_code[] = $value['trans_no'];
				}
		
				$param_order = [
						'venues_id'		=>		$id,
						'order_code'	=>		implode(",", $order_code)
		
				];
				$order_list = $this->apiReturnInfo(Loader::api('Stat')->getOrderListByCode($param_order));
				$order_list_new = [];
				if(!empty($order_list) && is_array($order_list))
				{
					foreach ($order_list as $value)
					{
						$order_list_new[$value['order_code']] = $value;
					}
				}
				foreach ($list['list'] as $key=>$value)
				{
					$list['list'][$key]['op_user'] = isset($order_list_new[$value['trans_no']]['create_by']) ? $order_list_new[$value['trans_no']]['create_by'] : "" ;
					if(isset($order_list_new[$value['trans_no']]['order_catalog']) && isset($orderType[$order_list_new[$value['trans_no']]['order_catalog']] ))
					{
						$list['list'][$key]['order_catalog_name'] =   $orderType[$order_list_new[$value['trans_no']]['order_catalog']] ;
					}
					else if($value['trans_type'] == 1  || $value['trans_type'] == 2 )
					{
						$list['list'][$key]['order_catalog_name'] =  $orderType[2];
					}
					else
					{
						$list['list'][$key]['order_catalog_name'] = '';
					}
		
					$list['list'][$key]['type_name'] = isset($member_trading_type[$value['trans_type']]) ? $member_trading_type[$value['trans_type']] : "";
					//扣款，退款需要余额支付+赠送余额支付
					if(in_array($value['trans_type'], [3,4,5,6]))
						$list['list'][$key]['trans_money'] = $value['trans_money'] + $value['trans_givemoney'];
				}
		
			}
		}
		
		return $list;
	}

	
	
	
	/**
	 * 储值卡会员交易明细(DCC2.0)
	 */
	public function storedCardDetailAction(){
	
		$now = time();
		$start_date = $this->getParam('startDate', date('Y-m-d',$now));
		$end_date = $this->getParam('endDate', date('Y-m-d',$now));
		$type = $this->getParam('type', 0);//1消费、2退费、3清零、4充值、5提现
		$currentPage = helper_CoreHelper::correctionPage($this->getParam('page', 1)); // 页码
		$pageSize = 15;
		$export = $this->getParam('export', 0);

		//球馆ID
		$id	= helper_VenuesHelper::getCurrentVenuesId() ;
	
		if ($start_date && !helper_CoreHelper::isLawfulDate($start_date)) {
			throw new InvalidArgumentException('开始日期参数有误');
		}
	
		if ($end_date && !helper_CoreHelper::isLawfulDate($end_date)) {
			throw new InvalidArgumentException('结束日期参数有误');
		}
	
		if ($start_date && $end_date && (strtotime($start_date) > strtotime($end_date))) {
			throw new InvalidArgumentException('开始日期不能大于结束日期');
		}
	
		$start_time = strtotime($start_date);
		$end_time = strtotime($end_date." 23:59:59");
		if($end_time > $start_time + self::ONE_MONTH){
			$this->showMessage(array('title' => "error", 'message' =>"查询时间不能超过31天" ));
		}
	
		if(empty($id))
		{
			$data = [
					'title'		=> "提示页",
					'message'	=>	"暂无相关记录"
			];
			$this->showMessage($data);
		}

		//调用接口处理数据
		$param = [
				'venues_id'		=>		$id,
				'start_date'	=>		strtotime($start_date),
				'end_date'		=>		strtotime($end_date." 23:59:59"),
				'page' 			=>		$currentPage,
				'page_size' 	=>		$pageSize,
				'type' 			=>		$type
		];
		//导出不需要分页
		if($export == 1){
			unset($param['page_size']);
			unset($param['page']);
		}
	 
		$list = $this->apiReturnInfo(Loader::api('Stat')->getStoredCardLogList($param));
	
		if ($export == 1) {			
			$this->exportStoredCardDetail($start_date, $end_date, $list);
			exit;
		}
		
		if(empty($list) || !is_array($list))
		{
			$list = [
					'count'		=> 0,
					'list'		=> [],
					'type_list'	=> [],
					'user_list'	=> []
			];
		}
	
		$search = [
				'startDate'		=>		$start_date ,
				'endDate'		=>		$end_date ,
				'type' 			=>		$type
		];
	
		$page = array(
				'totalPage'		=> ceil($list['count'] / $pageSize),
				'currentPage'	=> $currentPage,
				'url'			=> '/MemberStat/storedCardDetail?'.http_build_query(array_filter($search)).'&page='
		);
		
		$userList = [];
		if(count($list['user_list'])>0){
			foreach ($list['user_list'] as $v){
				$userList[$v['account']] = $v['name'];
			}
		}
	
		$this->display('storedCardDetail', [
				'page'					=>	$page,
				'startDate'				=>	$start_date,
				'endDate'				=>	$end_date,
				'type'					=>	$type,
				'list'					=>	$list['list'],
				'type_list'				=>	$list['type_list'],
				'user_list'				=>	$userList
		]);
	}
	
	/**
	 * 场次卡会员交易明细(DCC2.0)
	 */
	public function countCardDetailAction(){
	
		$now = time();
		$start_date = $this->getParam('startDate', date('Y-m-d',$now));
		$end_date = $this->getParam('endDate', date('Y-m-d',$now));
		$type = $this->getParam('type', 0);//1消费、2退费、3清零、4充值、5提现
		$currentPage = helper_CoreHelper::correctionPage($this->getParam('page', 1)); // 页码
		$pageSize = 15;
		$export = $this->getParam('export', 0);
	
		//球馆ID
		$id	= helper_VenuesHelper::getCurrentVenuesId() ;
	
		if ($start_date && !helper_CoreHelper::isLawfulDate($start_date)) {
			throw new InvalidArgumentException('开始日期参数有误');
		}
	
		if ($end_date && !helper_CoreHelper::isLawfulDate($end_date)) {
			throw new InvalidArgumentException('结束日期参数有误');
		}
	
		if ($start_date && $end_date && (strtotime($start_date) > strtotime($end_date))) {
			throw new InvalidArgumentException('开始日期不能大于结束日期');
		}
	
		$start_time = strtotime($start_date);
		$end_time = strtotime($end_date." 23:59:59");
		if($end_time > $start_time + self::ONE_MONTH){
			$this->showMessage(array('title' => "error", 'message' =>"查询时间不能超过31天" ));
		}
	
		if(empty($id))
		{
			$data = [
					'title'		=> "提示页",
					'message'	=>	"暂无相关记录"
			];
			$this->showMessage($data);
		}
	
		//调用接口处理数据
		$param = [
				'venues_id'		=>		$id,
				'start_date'	=>		strtotime($start_date),
				'end_date'		=>		strtotime($end_date." 23:59:59"),
				'page' 			=>		$currentPage,
				'page_size' 	=>		$pageSize,
				'type' 			=>		$type
		];
		//导出不需要分页
		if($export == 1){
			unset($param['page']);
			unset($param['page_size']);
		}
		
		$list = $this->apiReturnInfo(Loader::api('Stat')->getCountCardLogList($param));
	
		if ($export == 1) {
			$this->exportCountCardDetail($start_date, $end_date, $list);
			exit;
		}
		
		if(empty($list) || !is_array($list))
		{
			$list = [
					'count' => 0,
					'list'	=> [],
					'type_list'	=> [],
					'user_list'	=> []
			];
		}
	
		$search = [
				'startDate'		=>		$start_date ,
				'endDate'		=>		$end_date ,
				'type' 			=>		$type
		];
	
		$page = array(
				'totalPage'		=> ceil($list['count'] / $pageSize),
				'currentPage'	=> $currentPage,
				'url'			=> '/MemberStat/countCardDetail?'.http_build_query(array_filter($search)).'&page='
		);
		
		$userList = [];
		if(count($list['user_list'])>0){
			foreach ($list['user_list'] as $v){
				$userList[$v['account']] = $v['name'];
			}
		}
		$cat_list  = helper_VenuesHelper::getCurrentCatList();
	
		$this->display('countCardDetail', [
				'page'					=>	$page,
				'startDate'				=>	$start_date,
				'endDate'				=>	$end_date,
				'type'					=>	$type,
				'list'					=>	$list['list'],
				'type_list'				=>	$list['type_list'],
				'user_list'				=>	$userList,
				'cat_list'				=>	$cat_list
		]);
	}

	/**
	 * 储值卡会员消费统计(DCC2.0)
	 */
	public function storedCardConsumeAction(){
		$now = time();
		$start_date = $this->getParam('startDate', date('Y-m-d',$now));
		$end_date = $this->getParam('endDate', date('Y-m-d',$now));
		$member_code = $this->getParam('member_code', "");//查询关键词
		$card_type = $this->getParam('card_type', "");//会员卡类型
		$currentPage = helper_CoreHelper::correctionPage($this->getParam('page', 1)); // 页码
		$pageSize = 15;
		$export = $this->getParam('export', 0);
	
		//球馆ID
		$id	= helper_VenuesHelper::getCurrentVenuesId() ;
	
		if ($start_date && !helper_CoreHelper::isLawfulDate($start_date)) {
			throw new InvalidArgumentException('开始日期参数有误');
		}
	
		if ($end_date && !helper_CoreHelper::isLawfulDate($end_date)) {
			throw new InvalidArgumentException('结束日期参数有误');
		}
	
		if ($start_date && $end_date && (strtotime($start_date) > strtotime($end_date))) {
			throw new InvalidArgumentException('开始日期不能大于结束日期');
		}
	
		$start_time = strtotime($start_date);
		$end_time = strtotime($end_date." 23:59:59");
		if($end_time > $start_time + self::ONE_YEAR){
			$this->showMessage(array('title' => "error", 'message' =>"查询时间不能超过1年" ));
		}
	
		if(empty($id))
		{
			$data = [
					'title'		=> "提示页",
					'message'	=>	"暂无相关记录"
			];
			$this->showMessage($data);
		}
	
		//调用接口处理数据
		$param = [
				'member_code'	=>	$member_code,
				'venues_id'		=>	$id,
				'start_date'	=>	strtotime($start_date),
				'end_date'		=>	strtotime($end_date." 23:59:59"),
				'page'			=>	$currentPage,
				'page_size'		=>	$pageSize,
				'card_type'		=>	$card_type
		];
		
		//导出不需要分页
		if($export == 1){
			unset($param['page']);
			unset($param['page_size']);
		}
	
		$list = $this->apiReturnInfo(Loader::api('Stat')->getStoredCardConsumeStat($param));
		
		$card_list = [];
		if(!empty($list) && isset($list['card_list'])){
			foreach ($list['card_list'] as $v ){
				$card_list[$v['code']] = $v['name'];
			}
		}
		
		//导出
		if ($export == 1) {
			$this->exportStoredCardConsume($start_date, $end_date, $list, $card_list);
			exit;
		}
		
		if(empty($list) || !is_array($list))
		{
			$list = [
					'count' 	=> 0,
					'list'		=> [],
					'card_list'	=> []
			];
		}
	
		$search = [
				'startDate'		=>		$start_date ,
				'endDate'		=>		$end_date ,
				'member_code' 	=>		$member_code,
				'card_type' 	=>		$card_type
		];
	
		$page = array(
				'totalPage' => ceil($list['count'] / $pageSize),
				'currentPage' => $currentPage,
				'url' => '/MemberStat/storedCardConsume?'.http_build_query(array_filter($search)).'&page='
		);

		$this->display('storedCardConsume', [
				'page' 			=>	$page,
				'startDate'		=>	$start_date,
				'endDate'		=>	$end_date,
				'member_code'	=>	$member_code,
				'card_type'		=>	$card_type,
				'list'			=>	$list['list'],
				'card_list'		=>	$card_list
		]);
	
	}
	
	/**
	 * 场次卡消费统计(DCC2.0)
	 */
	public function countCardConsumeAction(){
		$now = time();
		$start_date = $this->getParam('startDate', date('Y-m-d',$now));
		$end_date = $this->getParam('endDate', date('Y-m-d',$now));
		$member_code = $this->getParam('member_code', "");//查询关键词
		$card_type = $this->getParam('card_type', "");//会员卡类型
		$currentPage = helper_CoreHelper::correctionPage($this->getParam('page', 1)); // 页码
		$pageSize = 15;
		$export = $this->getParam('export', 0);
	
		//球馆ID
		$id	= helper_VenuesHelper::getCurrentVenuesId() ;
	
		if ($start_date && !helper_CoreHelper::isLawfulDate($start_date)) {
			throw new InvalidArgumentException('开始日期参数有误');
		}
	
		if ($end_date && !helper_CoreHelper::isLawfulDate($end_date)) {
			throw new InvalidArgumentException('结束日期参数有误');
		}
	
		if ($start_date && $end_date && (strtotime($start_date) > strtotime($end_date))) {
			throw new InvalidArgumentException('开始日期不能大于结束日期');
		}
	
		$start_time = strtotime($start_date);
		$end_time = strtotime($end_date." 23:59:59");
		if($end_time > $start_time + self::ONE_YEAR){
			$this->showMessage(array('title' => "error", 'message' =>"查询时间不能超过1年" ));
		}
	
		if(empty($id))
		{
			$data = [
					'title'		=> "提示页",
					'message'	=>	"暂无相关记录"
			];
			$this->showMessage($data);
		}
	
		//调用接口处理数据
		$param = [
				'member_code'	=>	$member_code,
				'venues_id'		=>	$id,
				'start_date'	=>	strtotime($start_date),
				'end_date'		=>	strtotime($end_date." 23:59:59"),
				'page'			=>	$currentPage,
				'page_size'		=>	$pageSize,
				'card_type'		=>	$card_type
		];
	
		//导出不需要分页
		if($export == 1){
			unset($param['page']);
			unset($param['page_size']);
		}
	
		$list = $this->apiReturnInfo(Loader::api('Stat')->getCountCardConsumeStat($param));
		
		$card_list = [];
		if(isset($list['card_list'])){
			foreach ($list['card_list'] as $v ){
				$card_list[$v['code']] = $v;
			}
		}
		
		//导出
		if ($export == 1) {
			$this->exportCountCardConsume($start_date, $end_date, $list, $card_list);
			exit;
		}
	
		if(empty($list) || !is_array($list))
		{
			$list = [
					'count' 	=> 0,
					'list'		=> [],
					'card_list'	=> []
			];
		}
	
		$search = [
				'startDate'		=>		$start_date ,
				'endDate'		=>		$end_date ,
				'member_code' 	=>		$member_code,
				'card_type' 	=>		$card_type
		];
	
		$page = array(
				'totalPage' => ceil($list['count'] / $pageSize),
				'currentPage' => $currentPage,
				'url' => '/MemberStat/countCardConsume?'.http_build_query(array_filter($search)).'&page='
		);
		
		
		$cat_list  = helper_VenuesHelper::getCurrentCatList();
		
		$this->display('countCardConsume', [
				'page' 			=>	$page,
				'startDate'		=>	$start_date,
				'endDate'		=>	$end_date,
				'member_code'	=>	$member_code,
				'card_type'		=>	$card_type,
				'list'			=>	$list['list'],
				'card_list'		=>	$card_list,
				'cat_list'		=>	$cat_list
		]);
	
	}

	/**
	 * 会员交易汇总(DCC2.0)
	 */
	public function cardTradingSummaryAction(){
		$now = time();
		$start_date = $this->getParam('startDate', date('Y-m-d',$now));
		$end_date = $this->getParam('endDate', date('Y-m-d',$now));
		$export = $this->getParam('export', 0);
	
		//球馆ID
		$id	= helper_VenuesHelper::getCurrentVenuesId() ;
	
		if ($start_date && !helper_CoreHelper::isLawfulDate($start_date)) {
			throw new InvalidArgumentException('开始日期参数有误');
		}
	
		if ($end_date && !helper_CoreHelper::isLawfulDate($end_date)) {
			throw new InvalidArgumentException('结束日期参数有误');
		}
	
		if ($start_date && $end_date && (strtotime($start_date) > strtotime($end_date))) {
			throw new InvalidArgumentException('开始日期不能大于结束日期');
		}
	
		$start_time = strtotime($start_date);
		$end_time = strtotime($end_date." 23:59:59");
		if($end_time > $start_time + self::ONE_YEAR){
			$this->showMessage(array('title' => "error", 'message' =>"查询时间不能超过1年" ));
		} 
			
		if(empty($id))
		{
			$data = [
					'title'		=> "提示页",
					'message'	=>	"暂无相关记录"
			];
			$this->showMessage($data);
		}
	
		//调用接口处理数据
		$param = [
				'venues_id'		=>	$id,
				'start_date'	=>	strtotime($start_date),
				'end_date'		=>	strtotime($end_date." 23:59:59")
		];
	
		$list = $this->apiReturnInfo(Loader::api('Stat')->getCardTradingSummary($param));
	
		if(empty($list) || !is_array($list))
		{
			$list = [
					'stored_card_list' => [],
					'stored_card_total'	=> ['total_recharge_amount_all'=>0, 'total_recharge_count_all' => 0, 'total_apay_sum_all' => 0, 'total_apay_count_all'=>0, 'total_apay_amount_all'=>0],
					'count_card_list' => [],
					'count_card_total'	=> ['total_recharge_amount_all'=>0, 'total_recharge_count_all' => 0, 'total_apay_sum_all' => 0 , 'total_apay_count_all'=>0],
			];
		}
	
		//合并两种会员数据
		$total = [];

		$total['total_recharge_count_all']	=  $list['stored_card_total']['total_recharge_count_all'] + $list['count_card_total']['total_recharge_count_all'];
		$total['total_recharge_amount_all']	=  $list['stored_card_total']['total_recharge_amount_all'] + $list['count_card_total']['total_recharge_amount_all'];		
		$total['total_apay_count_all']		=  $list['stored_card_total']['total_apay_count_all'] + $list['count_card_total']['total_apay_count_all'];		
		$total['total_apay_amount_all']		=  $list['stored_card_total']['total_apay_amount_all'] ;
		$total['total_apay_sum_all']		=  $list['count_card_total']['total_apay_sum_all'];
		
		if($export == 1){
			$this->exportCardTradingSummary($list, $total, $start_date, $end_date);
		}
		
		
		$this->display('cardTradingSummary', [
				'startDate'			=>	$start_date,
				'endDate'			=>	$end_date,
				'stored_card_list'	=>	$list['stored_card_list'],
				'stored_card_total'	=>	$list['stored_card_total'],
				'count_card_list'	=>	$list['count_card_list'],
				'count_card_total'	=>	$list['count_card_total'],
				'total'				=>	$total
		]);
	}	
	
	/**
	 * 导出储值卡会员交易明细导出(DCC2.0)
	 */
	private  function exportStoredCardDetail($start_date, $end_date, $list){
		// 释放yaf的类加载机制
		$yafLoader = Yaf_Loader::getInstance();
		spl_autoload_unregister(array($yafLoader, 'autoload'));
		 
		require_once APP_PATH.'/application/library/ext/phpexcel/PHPExcel.php';
		
		$phpExcel = new PHPExcel();
		$fileName = "储值卡会员交易明细_".date('Ymd', strtotime($start_date)).'_'.date('Ymd', strtotime($end_date)).".xlsx";
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
		$phpExcel->getActiveSheet()->getColumnDimension('A')->setWidth(20);// 设置宽度
		$phpExcel->getActiveSheet()->getColumnDimension('D')->setWidth(20);// 设置宽度
		$phpExcel->getActiveSheet()->getColumnDimension('E')->setWidth(20);// 设置宽度
		$phpExcel->getActiveSheet()->getColumnDimension('F')->setWidth(15);// 设置宽度
		$phpExcel->getActiveSheet()->getColumnDimension('J')->setWidth(200);// 设置宽度		 
		$index = 1;
		$sheet->setCellValue("A{$index}", '交易时间');
		$sheet->setCellValue("B{$index}", '交易类型');
		$sheet->setCellValue("C{$index}", '会员类型');
		$sheet->setCellValue("D{$index}", '会员名称');
		$sheet->setCellValue("E{$index}", '会员卡号');
		$sheet->setCellValue("F{$index}", '电话');
		$sheet->setCellValue("G{$index}", '交易金额(元)');
		$sheet->setCellValue("H{$index}", '余额');
		$sheet->setCellValue("I{$index}", '赠送余额');
		$sheet->setCellValue("J{$index}", '交易明细');
		$sheet->setCellValue("K{$index}", '操作人员');
	        
		if(!empty($list)){
			$type_list = $list['type_list'];
			$user_list = $list['user_list'];
			foreach ($list['list'] as $key => $order) {
				$index++;
				$sheet->setCellValue("A{$index}", date('Y-m-d H:i:s', $order['create_time']));
				$sheet->setCellValue("B{$index}", isset($type_list[$order['bill_type']]) ? $type_list[$order['bill_type']] : "");
				$sheet->setCellValue("C{$index}", $order['card_type_name']);
				$sheet->setCellValue("D{$index}", $order['card_name']);
				$sheet->setCellValue("E{$index}", $order['card_no']);
				$sheet->setCellValue("F{$index}", $order['phone']);
				$sheet->setCellValue("G{$index}", $order['balance']);
				$sheet->setCellValue("H{$index}", $order['next_amount']);
				$sheet->setCellValue("I{$index}", $order['next_amount_gift']);
				$sheet->setCellValue("J{$index}", $order['bill_reason']);
				$sheet->setCellValue("K{$index}", isset($user_list[$order['create_by']]) ? $user_list[$order['create_by']] : "");
			
				unset($list['list'][$key]); // 及时释放内存
			}
		}

		$objWriter = PHPExcel_IOFactory::createWriter($phpExcel, 'Excel2007');
		$objWriter->save('php://output'); 
		 
		// 类加载机制还回给yaf
		spl_autoload_register(array($yafLoader, 'autoload'));
		exit;
	}
	
	/**
	 * 导出场次卡会员交易明细(DCC2.0)
	 */
	private  function exportCountCardDetail($start_date, $end_date, $list){
		
		$cat_list  = helper_VenuesHelper::getCurrentCatList();
		
		// 释放yaf的类加载机制
		$yafLoader = Yaf_Loader::getInstance();
		spl_autoload_unregister(array($yafLoader, 'autoload'));
			
		require_once APP_PATH.'/application/library/ext/phpexcel/PHPExcel.php';
	
		$phpExcel = new PHPExcel();
		$fileName = "次卡会员交易明细_".date('Ymd', strtotime($start_date)).'_'.date('Ymd', strtotime($end_date)).".xlsx";
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
		$phpExcel->getActiveSheet()->getColumnDimension('A')->setWidth(20);// 设置宽度
		$phpExcel->getActiveSheet()->getColumnDimension('D')->setWidth(20);// 设置宽度
		$phpExcel->getActiveSheet()->getColumnDimension('E')->setWidth(20);// 设置宽度
		$phpExcel->getActiveSheet()->getColumnDimension('F')->setWidth(15);// 设置宽度
		$phpExcel->getActiveSheet()->getColumnDimension('G')->setWidth(20);// 设置宽度
		$phpExcel->getActiveSheet()->getColumnDimension('J')->setWidth(200);// 设置宽度
		$index = 1;
		$sheet->setCellValue("A{$index}", '交易时间');
		$sheet->setCellValue("B{$index}", '交易类型');
		$sheet->setCellValue("C{$index}", '次卡项目');
		$sheet->setCellValue("D{$index}", '次卡类型');
		$sheet->setCellValue("E{$index}", '会员名称');
		$sheet->setCellValue("F{$index}", '卡号');
		$sheet->setCellValue("G{$index}", '电话');
		$sheet->setCellValue("H{$index}", '交易金额');
		$sheet->setCellValue("I{$index}", '交易次数');
		$sheet->setCellValue("J{$index}", '交易明细');
		$sheet->setCellValue("K{$index}", '操作人员');
	
		 
		if(!empty($list)){
			$type_list = $list['type_list'];
			$user_list = $list['user_list'];
			foreach ($list['list'] as $key => $order) {
				$index++;
				$sheet->setCellValue("A{$index}", date('Y-m-d H:i:s', $order['create_time']));
				$sheet->setCellValue("B{$index}", isset($type_list[$order['bill_type']]) ? $type_list[$order['bill_type']] : "");
				$sheet->setCellValue("C{$index}", isset($cat_list[$order['card_sport_catalog']]) ?  $cat_list[$order['card_sport_catalog']]: "");
				$sheet->setCellValue("D{$index}", $order['card_type_name']);
				$sheet->setCellValue("E{$index}", $order['card_name']);
				$sheet->setCellValue("F{$index}", $order['card_no']);
				$sheet->setCellValue("G{$index}", $order['phone']);
				$sheet->setCellValue("H{$index}", $order['recharge_amount']);
				$sheet->setCellValue("I{$index}", $order['count']);
				$sheet->setCellValue("J{$index}", $order['bill_reason']);
				$sheet->setCellValue("K{$index}", isset($user_list[$order['create_by']]) ? $user_list[$order['create_by']] : "");
					
				unset($list['list'][$key]); // 及时释放内存
			}
		}
	
		$objWriter = PHPExcel_IOFactory::createWriter($phpExcel, 'Excel2007');
		$objWriter->save('php://output');
			
		// 类加载机制还回给yaf
		spl_autoload_register(array($yafLoader, 'autoload'));
		exit;
	}
		
	/**
	 * 导出储值卡消费统计(DCC2.0)
	 */
	private  function exportStoredCardConsume($start_date, $end_date, $list, $card_list){
		// 释放yaf的类加载机制
		$yafLoader = Yaf_Loader::getInstance();
		spl_autoload_unregister(array($yafLoader, 'autoload'));
			
		require_once APP_PATH.'/application/library/ext/phpexcel/PHPExcel.php';
	
		$phpExcel = new PHPExcel();
		$fileName = "储值卡消费统计_".date('Ymd', strtotime($start_date)).'_'.date('Ymd', strtotime($end_date)).".xlsx";
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
		$phpExcel->getActiveSheet()->getColumnDimension('A')->setWidth(20);// 设置宽度
		$phpExcel->getActiveSheet()->getColumnDimension('B')->setWidth(20);// 设置宽度
		$phpExcel->getActiveSheet()->getColumnDimension('C')->setWidth(20);// 设置宽度
		
		$index = 1;
		$sheet->setCellValue("A{$index}", '会员类型');
		$sheet->setCellValue("B{$index}", '会员名称');
		$sheet->setCellValue("C{$index}", '会员卡号');
		$sheet->setCellValue("D{$index}", '交易次数 ');
		$sheet->setCellValue("E{$index}", '充值金额');
		$sheet->setCellValue("F{$index}", '充值赠送金额');
		$sheet->setCellValue("G{$index}", '消费金额');
		$sheet->setCellValue("H{$index}", '消费赠送金额');
		$sheet->setCellValue("I{$index}", '退款金额');
		$sheet->setCellValue("J{$index}", '退费金额');
		

		if(!empty($list) && isset($list['list'])){
			foreach ($list['list'] as $key => $order) {
				$index++;

				$temp = isset($card_list[$order['card_type']]) ? $card_list[$order['card_type']] : '';
				
				$sheet->setCellValue("A{$index}", $temp);
				$sheet->setCellValue("B{$index}", $order['card_name']);
				$sheet->setCellValue("C{$index}", $order['card_no']);
				$sheet->setCellValue("D{$index}", $order['order_count']);
				$sheet->setCellValue("E{$index}", $order['total_recharge_amount']);
				$sheet->setCellValue("F{$index}", $order['total_gift_amount']);
				$sheet->setCellValue("G{$index}", $order['total_apay_amount']);
				$sheet->setCellValue("H{$index}", $order['total_gift_apay_amount']);
				$sheet->setCellValue("I{$index}", $order['total_return_apay_amount']);
				$sheet->setCellValue("J{$index}", $order['total_refund_rechage_amount']);	
				
				unset($list[$key]); // 及时释放内存
			}
		}
	
 
		$objWriter = PHPExcel_IOFactory::createWriter($phpExcel, 'Excel2007');
		$objWriter->save('php://output');
			
		// 类加载机制还回给yaf
		spl_autoload_register(array($yafLoader, 'autoload')); 
		exit;
	}
	
	/**
	 * 导出场次卡消费统计(DCC2.0)
	 */
	private  function exportCountCardConsume($start_date, $end_date, $list, $card_list){
 
		$cat_list  = helper_VenuesHelper::getCurrentCatList();
		// 释放yaf的类加载机制
		$yafLoader = Yaf_Loader::getInstance();
		spl_autoload_unregister(array($yafLoader, 'autoload'));
			
		require_once APP_PATH.'/application/library/ext/phpexcel/PHPExcel.php';
	
		$phpExcel = new PHPExcel();
		$fileName = "场次卡消费统计_".date('Ymd', strtotime($start_date)).'_'.date('Ymd', strtotime($end_date)).".xlsx";
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
		$phpExcel->getActiveSheet()->getColumnDimension('A')->setWidth(20);// 设置宽度
		$phpExcel->getActiveSheet()->getColumnDimension('B')->setWidth(20);// 设置宽度
		$phpExcel->getActiveSheet()->getColumnDimension('C')->setWidth(30);// 设置宽度
		$phpExcel->getActiveSheet()->getColumnDimension('D')->setWidth(20);// 设置宽度
		$phpExcel->getActiveSheet()->getColumnDimension('G')->setWidth(20);// 设置宽度

		
		$index = 1;
		$sheet->setCellValue("A{$index}", '会员类型');
		$sheet->setCellValue("B{$index}", '次卡项目');
		$sheet->setCellValue("C{$index}", '会员名称');
		$sheet->setCellValue("D{$index}", '次卡卡号');
		$sheet->setCellValue("E{$index}", '充值次数 ');
		$sheet->setCellValue("F{$index}", '消费次数');
		$sheet->setCellValue("G{$index}", '退回次数');
		$sheet->setCellValue("H{$index}", '充值金额');
		            
		if(!empty($list) && isset($list['list'])){
			foreach ($list['list'] as $key => $order) {
				$index++;

				$temp = isset($card_list[$order['card_type']]) && isset($card_list[$order['card_type']]['name']) ? $card_list[$order['card_type']]['name'] : '';
				$temp_cat = isset($card_list[$order['card_type']]) && isset($card_list[$order['card_type']]['sport_catalog']) && isset($cat_list[$card_list[$order['card_type']]['sport_catalog']]) ? $cat_list[$card_list[$order['card_type']]['sport_catalog']] : '' ;
				$sheet->setCellValue("A{$index}", $temp);
				$sheet->setCellValue("B{$index}", $temp_cat);
				$sheet->setCellValue("C{$index}", $order['card_name']);
				$sheet->setCellValue("D{$index}", $order['card_no']);
				$sheet->setCellValue("E{$index}", $order['total_recharge_count']);
				$sheet->setCellValue("F{$index}", $order['total_apay_count']);
				$sheet->setCellValue("G{$index}", $order['total_return_apay_count']);
				$sheet->setCellValue("H{$index}", $order['total_recharge_amount']);
				
				unset($list[$key]); // 及时释放内存
			}
		}
	

		$objWriter = PHPExcel_IOFactory::createWriter($phpExcel, 'Excel2007');
		$objWriter->save('php://output');
			
		// 类加载机制还回给yaf
		spl_autoload_register(array($yafLoader, 'autoload')); 
		exit;
	}
	
	/**
	 * 导出会员交易汇总(DCC2.0)
	 */
	private  function exportCardTradingSummary($list, $total, $start_date, $end_date) {
		
		// 释放yaf的类加载机制
		$yafLoader = Yaf_Loader::getInstance();
		spl_autoload_unregister(array($yafLoader, 'autoload'));
			
		require_once APP_PATH.'/application/library/ext/phpexcel/PHPExcel.php';
		
		$phpExcel = new PHPExcel();
		$fileName = "会员交易汇总_".date('Ymd', strtotime($start_date)).'_'.date('Ymd', strtotime($end_date)).".xlsx";
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
		
		//会员汇总
		$sheet = $phpExcel->setActiveSheetIndex(0);
		$phpExcel->getActiveSheet()->setTitle('会员汇总');
		
		$sheet = $sheet->mergeCells('A1:F1');
		$sheet->setCellValue("A1", '会员汇总');
		$sheet->getStyle('A1')->getFont()->setBold(true);
		$sheet->getStyle('A1')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
		
		$sheet->setCellValue("B2", '充值人数');
		$sheet->getStyle('B2')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
		
		$sheet->setCellValue("C2", '充值金额');
		$sheet->getStyle('C2')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
		
		$sheet->setCellValue("D2", '消费人数');
		$sheet->getStyle('D2')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
		
		$sheet->setCellValue("E2", '消费金额');
		$sheet->getStyle('E2')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
		
		$sheet->setCellValue("F2", '消费次数');
		$sheet->getStyle('F2')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
				
		$index = 3;
		$sheet->setCellValue("B{$index}", isset($total['total_recharge_count_all']) ? $total['total_recharge_count_all'] : 0);
		$sheet->setCellValue("C{$index}", isset($total['total_recharge_amount_all']) ? $total['total_recharge_amount_all'] : 0);
		$sheet->setCellValue("D{$index}", isset($total['total_apay_count_all']) ? $total['total_apay_count_all'] : 0);
		$sheet->setCellValue("E{$index}", isset($total['total_apay_amount_all']) ? $total['total_apay_amount_all'] : 0);
		$sheet->setCellValue("F{$index}", isset($total['total_apay_sum_all']) ? $total['total_apay_sum_all'] : 0);

		
		//储值卡
		$sheet2 = $phpExcel->createSheet();
		$sheet2->setTitle('储值卡汇总');
		
		$sheet2 = $sheet2->mergeCells('A1:E1');
		$sheet2->setCellValue("A1", '储值卡汇总');
		$sheet2->getStyle('A1')->getFont()->setBold(true);
		$sheet2->getStyle('A1')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
		
		$sheet2->setCellValue("B2", '充值人数');
		$sheet2->getStyle('B2')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
		
		$sheet2->setCellValue("C2", '充值金额');
		$sheet2->getStyle('C2')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
		
		$sheet2->setCellValue("D2", '消费人数');
		$sheet2->getStyle('D2')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
		
		$sheet2->setCellValue("E2", '消费金额');
		$sheet2->getStyle('E2')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);

				
		$index = 3;
		$sheet2->setCellValue("B{$index}", isset($list['stored_card_total']['total_recharge_count_all']) ? $list['stored_card_total']['total_recharge_count_all'] : 0);
		$sheet2->setCellValue("C{$index}", isset($list['stored_card_total']['total_recharge_amount_all']) ? $list['stored_card_total']['total_recharge_amount_all'] : 0);
		$sheet2->setCellValue("D{$index}", isset($list['stored_card_total']['total_apay_count_all']) ? $list['stored_card_total']['total_apay_count_all'] : 0);
		$sheet2->setCellValue("E{$index}", isset($list['stored_card_total']['total_apay_amount_all']) ? $list['stored_card_total']['total_apay_amount_all'] : 0);

		$index = 5;
		$sheet2->setCellValue("A{$index}", '会员类型');
		$sheet2->setCellValue("B{$index}", '开卡人数');
		$sheet2->setCellValue("C{$index}", '充值人数');
		$sheet2->setCellValue("D{$index}", '充值金额 ');
		$sheet2->setCellValue("E{$index}", '消费人数');
		$sheet2->setCellValue("F{$index}", '消费金额');
		      
		if(isset($list['stored_card_list'])){
			foreach ($list['stored_card_list'] as $key => $order) {
				$index++;
				$sheet2->setCellValue("A{$index}", $order['card_type_name']);
				$sheet2->setCellValue("B{$index}", $order['open_card_count']);
				$sheet2->setCellValue("C{$index}", $order['total_recharge_count']);
				$sheet2->setCellValue("D{$index}", $order['total_recharge_amount']);
				$sheet2->setCellValue("E{$index}", $order['total_apay_count']);
				$sheet2->setCellValue("F{$index}", $order['total_apay_amount']);
			
				unset($list['stored_card_list'][$key]); // 及时释放内存
			}
		}
		
		
		//场次卡
		$sheet3 = $phpExcel->createSheet();
		$sheet3->setTitle('场次卡汇总');
		
		$sheet3 = $sheet3->mergeCells('A1:G1');
		$sheet3->setCellValue("A1", '场次卡汇总');
		$sheet3->getStyle('A1')->getFont()->setBold(true);
		$sheet3->getStyle('A1')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
		
		$sheet3->setCellValue("B2", '充值人数');
		$sheet3->getStyle('B2')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
		
		$sheet3->setCellValue("C2", '充值金额');
		$sheet3->getStyle('C2')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
		
		$sheet3->setCellValue("D2", '消费人数');
		$sheet3->getStyle('D2')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
		
		$sheet3->setCellValue("E2", '消费金额');
		$sheet3->getStyle('E2')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
		
		
		$index = 3;
		$sheet3->setCellValue("B{$index}", isset($list['count_card_total']['total_recharge_count_all']) ?$list['count_card_total']['total_recharge_count_all'] : 0);
		$sheet3->setCellValue("C{$index}", isset($list['count_card_total']['total_recharge_amount_all']) ? $list['count_card_total']['total_recharge_amount_all'] : 0);
		$sheet3->setCellValue("D{$index}", isset($list['count_card_total']['total_apay_count_all']) ? $list['count_card_total']['total_apay_count_all'] : 0);
		$sheet3->setCellValue("E{$index}", isset($list['count_card_total']['total_apay_amount_all']) ? $list['count_card_total']['total_apay_amount_all'] : 0);
		
		$index = 5;
		$sheet3->setCellValue("A{$index}", '会员类型');
		$sheet3->setCellValue("B{$index}", '开卡人数');
		$sheet3->setCellValue("C{$index}", '充值人数');
		$sheet3->setCellValue("D{$index}", '充值金额 ');
		$sheet3->setCellValue("E{$index}", '消费人数');
		$sheet3->setCellValue("F{$index}", '消费金额');
		$sheet3->setCellValue("G{$index}", '消费次数');
				
		
		if(isset($list['count_card_list'])){
			foreach ($list['count_card_list'] as $key => $order) {
				$index++;
				$sheet3->setCellValue("A{$index}", $order['card_type_name']);
				$sheet3->setCellValue("B{$index}", $order['open_card_count']);
				$sheet3->setCellValue("C{$index}", $order['total_recharge_count']);
				$sheet3->setCellValue("D{$index}", $order['total_recharge_amount']);
				$sheet3->setCellValue("E{$index}", $order['total_recharge_sum']);
				$sheet3->setCellValue("F{$index}", $order['total_apay_count']);
				$sheet3->setCellValue("G{$index}", $order['total_apay_sum']);
				unset($list['count_card_list'][$key]); // 及时释放内存
			}
		}
		
		
		$objWriter = PHPExcel_IOFactory::createWriter($phpExcel, 'Excel2007');
		$objWriter->save('php://output');
			
		// 类加载机制还回给yaf
		spl_autoload_register(array($yafLoader, 'autoload'));
		exit;
	}
	
}