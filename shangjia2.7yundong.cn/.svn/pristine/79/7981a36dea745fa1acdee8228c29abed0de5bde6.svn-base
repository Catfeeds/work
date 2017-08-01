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
			throw new InvalidArgumentException('开始日期参数有误');
		}
	
		if ($end_date && !helper_CoreHelper::isLawfulDate($end_date)) {
			throw new InvalidArgumentException('结束日期参数有误');
		}
	
		if ($start_date && $end_date && (strtotime($start_date) > strtotime($end_date))) {
			throw new InvalidArgumentException('开始日期不能大于结束日期');
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
			throw new InvalidArgumentException('开始日期参数有误');
		}
		
		if ($end_date && !helper_CoreHelper::isLawfulDate($end_date)) {
			throw new InvalidArgumentException('结束日期参数有误');
		}
		
		if ($start_date && $end_date && (strtotime($start_date) > strtotime($end_date))) {
			throw new InvalidArgumentException('开始日期不能大于结束日期');
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

	
}