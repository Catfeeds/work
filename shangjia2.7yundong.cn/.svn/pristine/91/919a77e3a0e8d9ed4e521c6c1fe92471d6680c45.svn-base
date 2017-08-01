<?php
/**
 * 报表控制器
 * 
 * @author xiaoyanchun
 * @date 2016-07-04
 */
class ReportController extends BaseController
{
	const  SUPLIERS_ID = 47;
	const ONE_MONTH  = 2678400; //86400*31 31天
	
    /**
     * 结算记录
     * 
     * @author xiaoyanchun
     */
    public function clearingLogAction() {
        $suppliersId = helper_LoginHelper::getCurrentSuppliersId(); // 商家id
        $search = [];
        $defalut_time = date("Y-m-d", mktime(0,0,0,date("m")-1,date("d"),date("Y")));
        $search['start_date'] = trim($this->getParam('start_date', $defalut_time));  // 开始日期
        $search['end_date']   = trim($this->getParam('end_date', date("Y-m-d", time())));    // 结束日期
      
        $currentPage = helper_CoreHelper::correctionPage($this->getParam('page', 1)); // 页码

        if ($search['start_date'] && !helper_CoreHelper::isLawfulDate($search['start_date'])) {
            throw new InvalidArgumentException('开始日期参数有误');
        }
        
        if ($search['end_date'] && !helper_CoreHelper::isLawfulDate($search['end_date'])) {
            throw new InvalidArgumentException('结束日期参数有误');
        }
        
        if ($search['start_date'] && $search['end_date'] && (strtotime($search['start_date']) > strtotime($search['end_date']))) {
            throw new InvalidArgumentException('开始日期不能大于结束日期');
        }
        
        $start_time = strtotime($search['start_date']);
        $end_time = strtotime($search['end_date']);
        
        if($end_time > $start_time + self::ONE_MONTH){
        	$this->showMessage(array('title' => "error", 'message' =>"查询时间不能超过31天" ));
        }
        
        //特别说明： 由于市场同学与场馆馆长谈判需要。把 广州  RSL七号羽毛球馆  商家ID：47 限制趣运动结算 查询日期 最早为： 2016-09-05
        //=============================================start=================================================
        if($suppliersId == self::SUPLIERS_ID){
        	 if($search['start_date'] && strtotime($search['start_date']) < strtotime("2016-09-05")){
        	 	$search['start_date'] = "2016-09-05";
        	 }
        	 if ($search['start_date'] && $search['end_date'] && (strtotime($search['start_date']) > strtotime($search['end_date']))) {
        	 	$search['end_date'] = "2016-10-05";
        	 }	 
        }
        //=============================================end===================================================

        $field = 'id, cycle_start_time, cycle_end_time, clearing_time, total_settle_amount, status, order_count ';
        $where = [
            'suppliers_id' => $suppliersId,
        ];
         
        if ($search['start_date'] && $search['end_date']) {
            $startTime = strtotime($search['start_date']);
            $endTime = strtotime($search['end_date']) + 86400 - 1;
            
            $addSql = " ((cycle_start_time >= '{$startTime}' AND cycle_start_time <= '{$endTime}') "  // 结算开始时间在区间内
                 . " OR (cycle_end_time >= '{$startTime}' AND cycle_end_time <= '{$endTime}') "    // 结算结算时间在区间内
                 . " OR (cycle_start_time <= '{$startTime}' AND cycle_end_time >= '{$endTime}' ) " // 结算时间区间包含搜索时间区间
                 . " OR (cycle_start_time >= '{$startTime}' AND cycle_end_time <= '{$endTime}' )) "; // 结算时间区间在搜索时间区间内
            $where[] = $addSql;
        }       
        
        // 分页获取结算记录
        $pageData = Loader::modelSlave('suppliersClearingLog')->getPage($field, $where, ' cycle_start_time DESC ', $currentPage);
        
        // 获取未结算总额订单
        $params = [];
        $params['suppliers_id'] = $suppliersId;
        $params['start_date'] = $search['start_date'];
        $params['end_date'] = $search['end_date'];
        $res = Loader::api('Orders')->getUnsettledOrderInfo($params);
        
        $unsettledOrderInfo = [];
        if (is_array($res) && isset($res['status']) && $res['status'] == '0000') {
        	$unsettledOrderInfo = $res['data'];
        	unset($res);
        }
        
     
        //查找未结算的订单明细
        $unsettledOrderInfoList = [];
        $temp = 0;
        $temp_count = 0;
        $arry_date_list  = helper_CoreHelper::getWeekListByTime();
        if(!empty($arry_date_list))
        {
			$start_time = strtotime($arry_date_list[0][0]);
			$end_time   = isset($arry_date_list[1][1]) ? strtotime($arry_date_list[1][1]." 23:59:59") : strtotime($arry_date_list[0][1]." 23:59:59");	
 
	        //查找未结算的订单明细
	        $params = [];
	        $params['suppliers_id'] = $suppliersId;
	        $params['start_time'] = $start_time;
	        $params['end_time'] = $end_time;

	        $res = Loader::api('Orders')->getUnsettledOrderInfoList($params);
	        $unsettledOrderInfoListTemp = [];
	        if (is_array($res) && isset($res['status']) && $res['status'] == '0000') {
	        	$unsettledOrderInfoListTemp = $res['data'];
	        	unset($res);
	        }

	        //处理未结算组合
	        foreach ($arry_date_list as $value_date)
	        {
	        	foreach ($unsettledOrderInfoListTemp as $value)
	        	{
	        		if($value['book_date'] >= strtotime($value_date[0]) && $value['book_date']<= strtotime($value_date[1]." 23:59:59"))
	        		{
	        			$temp += $value['settle_price'];
	        		}
	        
	        	}

	        	$unsettledOrderInfoList[strtotime($value_date[0]).strtotime($value_date[1]." 23:59:59")] = number_format($temp, 2, '.', '');
	        	$temp = 0;
	        }
	        
	        //更新未预算的数据
			if(!empty($unsettledOrderInfoList))
			{
		        foreach ($pageData['list'] as $key => $value)
		        {
		        	if(isset($unsettledOrderInfoList[$value['cycle_start_time'].$value['cycle_end_time']]) && $value['status'] == 0)
		        		$pageData['list'][$key]['total_settle_amount'] = $unsettledOrderInfoList[$value['cycle_start_time'].$value['cycle_end_time']];
		        }
			}
	            
        }
      
 
        $page = array(
            'totalPage' => $pageData['total_page'],
            'currentPage' => $currentPage,
            'url' => '/report/clearingLog?'.http_build_query(array_filter($search)).'&page='
        );
        
        $this->setTitle('结算记录');
        $this->display('clearingLog', [
            'page' => $page,
            'search' => $search,
            'clearingLogList' => $pageData['list'],
            'unsettledOrderInfo' => $unsettledOrderInfo,
        	'unsettledOrderInfoList' => $unsettledOrderInfoList
        ]);
    }
    
    /**
     * 导出结算记录
     * 
     * @author xiaoyanchun
     */
    public function exportClearingLogAction() {
        $suppliersId = helper_LoginHelper::getCurrentSuppliersId(); // 商家id
        $startDate = trim($this->getParam('start_date', ''));  // 开始日期
        $endDate   = trim($this->getParam('end_date', ''));    // 结束日期
        
        if ($startDate && !helper_CoreHelper::isLawfulDate($startDate)) {
            throw new InvalidArgumentException('开始日期参数有误');
        }
        
        if ($endDate && !helper_CoreHelper::isLawfulDate($endDate)) {
            throw new InvalidArgumentException('结束日期参数有误');
        }
        
        if ($startDate && $endDate) {
            $startTime = strtotime($startDate);
            $endTime   = strtotime($endDate);
            
            if ($startTime > $endTime) {
                throw new InvalidArgumentException('开始日期不能大于结束日期');
            }
            
            if ($endTime - $startTime > 86400 * 180) {
                throw new InvalidArgumentException('时间跨度不能超过180天');
            } 
        }
        
        //特别说明： 由于市场同学与场馆馆长谈判需要。把 广州  RSL七号羽毛球馆  商家ID：47 限制趣运动结算 查询日期 最早为： 2016-09-05
        //=============================================start=================================================
        if($suppliersId == self::SUPLIERS_ID){
        	if($startDate && strtotime($startDate) < strtotime("2016-09-05")){
        		$startDate = "2016-09-05";
        	}
        	if ($startDate && $endDate && (strtotime($startDate) > strtotime($endDate))) {
        		$endDate = "2016-10-05";
        	}
        }
        //=============================================end===================================================
        
        // 获取结算订单列表
        $params                 = [];
        $params['suppliers_id'] = $suppliersId;
        $params['start_date']   = $startDate;
        $params['end_date']     = $endDate;
        $params['un_consume']   = 1;
        $this->exportToExcel($params);
        
        // 获取结算记录
       /*  $list = Loader::modelSlave('suppliersClearingLog')->getTimeRangeList($suppliersId, $startDate, $endDate);
       
       
        if (empty($list)) {
            throw new Exception('没有结算记录，不能进行导出');
        }

        // 释放yaf的类加载机制
        $yafLoader = Yaf_Loader::getInstance();
        spl_autoload_unregister(array($yafLoader, 'autoload'));
        
        require_once APP_PATH.'/application/library/ext/phpexcel/PHPExcel.php';
         
        $phpExcel = new PHPExcel();
        
        if ($startDate && $endDate) {
            $fileName = "结算记录_{$startDate}_{$endDate}.xlsx";
        } else {
            $fileName = "结算记录.xlsx";
        }
        
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
        $phpExcel->getActiveSheet()->getColumnDimension('B')->setWidth(30);// 设置宽度
        
        $index = 1;
        $sheet->setCellValue("A{$index}", '结算时间');
        $sheet->setCellValue("B{$index}", '结算周期');
        $sheet->setCellValue("C{$index}", '结算状态');
        $sheet->setCellValue("D{$index}", '结算金额');
 
        foreach ($list as $key => $row) {
            $index++;
            
            $sheet->setCellValue("A{$index}", date('Y-m-d', $row['clearing_time']));
            $sheet->setCellValue("B{$index}", date('Y-m-d', $row['cycle_start_time']).'至'.date('Y-m-d', $row['cycle_end_time']));
            $sheet->setCellValue("C{$index}", $row['status'] == 1 ? '已结算' : '未结算');
            $sheet->setCellValue("D{$index}", $row['total_settle_amount']);

            unset($list[$key]); // 及时释放内存
        }
        
        $objWriter = PHPExcel_IOFactory::createWriter($phpExcel, 'Excel2007');
        $objWriter->save('php://output');
        
        // 类加载机制还回给yaf
        spl_autoload_register(array($yafLoader, 'autoload'));
        exit; */
    }
    
    /**
     * 查看单次结算订单明细
     * 
     * @author xiaoyanchun
     * edit by bumtime 20160801
     *  
     */
    public function showClearingOrderAction() {
        $id = (int) $this->getParam('id', 0);
        $suppliersId = helper_LoginHelper::getCurrentSuppliersId(); // 商家id
        $currentPage = helper_CoreHelper::correctionPage($this->getParam('page', 1)); // 页码
        
        if ($id < 1) {  
			$data = [
        			'title'		=> "提示页",
        			'message'	=>	"结算记录不存在"
        
        	];
        	$this->showMessage($data);
        }
        
        // 获取结算记录
        $log = Loader::modelSlave('suppliersClearingLog')->find($id);
        

        if (empty($log)) {
            //throw new InvalidArgumentException('结算记录不存在');
			$data = [
        			'title'		=> "提示页",
        			'message'	=>	"结算记录不存在"
        
        	];
        	$this->showMessage($data);
        }
        
       /*  if ($log['order_count'] < 1) {
			$data = [
        			'title'		=> "提示页",
        			'message'	=>	"该结算记录没有订单信息"
        
        	];
        	$this->showMessage($data);
        } */
        
        $search = [
        			
        	'start_date' 	=>	date("Y-m-d", $log['cycle_start_time']),
        	'end_date'		=>	date("Y-m-d", $log['cycle_end_time']),
            'un_consume'    =>  $this->getParam('un_consume', 0)
        		
        ];

        $orderList = $this->getClearingOrderList($search['start_date'], $search['end_date'], $search['un_consume'], $suppliersId, $currentPage);
        

        if (empty($orderList)) {
        	$data = [
        			'title'		=> "提示页",
        			'message'	=>	"暂无相关记录"
        
        	];
        	$this->showMessage($data);
        }
        
        $search ['id'] = $id;
        $page = array(
        		'totalPage'		=>	$orderList['page_count'],
        		'currentPage'	=>	$currentPage,
        		'url'			=>	'/report/showClearingOrder?'.http_build_query(array_filter($search)).'&page='
        );
        // 禁用layout
        $this->getView()->disableLayout();
        $this->setTitle('查看结算订单');
        $this->display('showClearingOrder', [
        		'orderList' => $orderList['list'],
        		'search' => $search,
        		'page' => $page
       		
        ]);
        
       
    }
    
    /**
     * 佣金报表
     * 
     * @author xiaoyanchun
     */
    public function spreadAccountAction() {
        $suppliersId = helper_LoginHelper::getCurrentSuppliersId(); // 商家id
        $search = [];
        $search['admin_id']   = (int) $this->getParam('admin_id', 0);     // 管理员id
        $search['start_date'] = trim($this->getParam('start_date', ''));  // 开始日期
        $search['end_date']   = trim($this->getParam('end_date', ''));    // 结束日期
        $currentPage = helper_CoreHelper::correctionPage($this->getParam('page', 1)); // 页码
        
        if ($search['start_date'] && !helper_CoreHelper::isLawfulDate($search['start_date'])) {
            throw new InvalidArgumentException('开始日期参数有误');
        }
        
        if ($search['end_date'] && !helper_CoreHelper::isLawfulDate($search['end_date'])) {
            throw new InvalidArgumentException('结束日期参数有误');
        }
        
        $search['start_date'] = $search['start_date'] ?: date('Y-m-d', strtotime("-1 month"));
        $search['end_date'] = $search['end_date'] ?: date('Y-m-d', time());   
        $spreadAccountModel = Loader::modelSlave('SuppliersSpreadAccount');
        
        // 分页获取数据
        $pageData = $spreadAccountModel->getPageSpreadAccount($search, $suppliersId, $currentPage);
        $page = array(
            'totalPage' => $pageData['total_page'],
            'currentPage' => $currentPage,
            'url' => '/report/spreadAccount?'.http_build_query(array_filter($search)).'&page='
        );

        //场地管理员
        $supplierAdminArr = Loader::modelSlave('SuppliersAdmin')->getSuppliersAdminArr($suppliersId);
        
        //这段时间内二次落单次数
        $secondCount = $spreadAccountModel->getSecondOrderCount($suppliersId, $search['start_date'], $search['end_date']);

        //统计每个管理员的佣金信息
        $orderAumontList = $spreadAccountModel->getAdminTotalAmount($suppliersId, $search['start_date'], $search['end_date']);
        
        $this->setTitle('佣金报表');

        $this->display('spreadAccount', [
            'spreadAccountList' => $pageData['list'],
            'page' => $page,
            'search' => $search,
            'supplierAdminArr' => $supplierAdminArr,
            'secondCount' => $secondCount,
            'orderAumontList' => $orderAumontList,
            'showNewLog' => helper_VenuesHelper::showSpreadLogNew($suppliersId),
        ]);
    }
    
    /**
     * 推广记录
     * 
     * @author xiaoyanchun
     */
    public function spreadLogAction() {
        $suppliersId = helper_LoginHelper::getCurrentSuppliersId(); // 商家id
        $search = [];
        $search['admin_id']   = (int) $this->getParam('admin_id', 0);     // 管理员id
        $search['start_date'] = trim($this->getParam('start_date', ''));  // 开始日期
        $search['end_date']   = trim($this->getParam('end_date', ''));    // 结束日期
        $currentPage = helper_CoreHelper::correctionPage($this->getParam('page', 1)); // 页码
        
        if ($search['start_date'] && !helper_CoreHelper::isLawfulDate($search['start_date'])) {
            throw new InvalidArgumentException('开始日期参数有误');
        }
        
        if ($search['end_date'] && !helper_CoreHelper::isLawfulDate($search['end_date'])) {
            throw new InvalidArgumentException('结束日期参数有误');
        }
        
        $search['start_date'] = $search['start_date'] ?: date('Y-m-d', strtotime("-1 month"));
        $search['end_date']  = $search['end_date'] ?: date('Y-m-d', time());
        $startTime = strtotime($search['start_date']);
        $endTime   = strtotime($search['end_date']) + 86400;

        $field = ' admin_name, phone, order_time, add_time ,last_update_time';
        $where = [
            'suppliers_id' => $suppliersId,
            'last_update_time >= :start_time' => $startTime,
            'last_update_time <= :end_time' => $endTime,
        ];
        
        if ($search['admin_id'] > 0) {
            $where['suppliers_admin_id'] = $search['admin_id'];
        }
        // 分页获取数据
        $pageData = Loader::modelSlave('SuppliersSpreadLog')->getPage($field, $where, ' add_time DESC ', $currentPage);
        
        //场地管理员
        $supplierAdminArr = Loader::modelSlave('SuppliersAdmin')->getSuppliersAdminArr($suppliersId);
        
        $page = array(
            'totalPage' => $pageData['total_page'],
            'currentPage' => $currentPage,
            'url' => '/report/spreadLog?'.http_build_query(array_filter($search)).'&page='
        );

        $this->setTitle('推广记录');

        $this->display('spreadLog', [
            'supplierAdminArr' => $supplierAdminArr,
            'spreadLogList' => $pageData['list'],
            'search' => $search,
            'page' => $page,
            'showNewLog' => helper_VenuesHelper::showSpreadLogNew($suppliersId),
        ]);
    }


    /**
     * 推广记录(新)
     *
     * @author zhuangsheng
     */
    public function spreadLogNewAction() {
        $suppliersId = helper_LoginHelper::getCurrentSuppliersId(); // 商家id
        $search = [];
        $search['admin_id']   = (int) $this->getParam('admin_id', 0);     // 管理员id
        $search['start_date'] = trim($this->getParam('start_date', ''));  // 开始日期
        $search['end_date']   = trim($this->getParam('end_date', ''));    // 结束日期
        $spread_return = trim($this->getParam('spread_return', ''));  //是否分佣
        $currentPage = helper_CoreHelper::correctionPage($this->getParam('page', 1)); // 页码

        if ($search['start_date'] && !helper_CoreHelper::isLawfulDate($search['start_date'])) {
            throw new InvalidArgumentException('开始日期参数有误');
        }

        if ($search['end_date'] && !helper_CoreHelper::isLawfulDate($search['end_date'])) {
            throw new InvalidArgumentException('结束日期参数有误');
        }

        $search['start_date'] = $search['start_date'] ?: date('Y-m-d', strtotime("-1 month"));
        $search['end_date']   = $search['end_date'] ?: date('Y-m-d', time());
        $startTime = strtotime($search['start_date']);
        $endTime   = strtotime($search['end_date']) + 86400;

        $field = ' id, spread_admin_id, spread_phone, spread_time , spread_type, order_add_time';
        $where = [
            'spread_suppliers_id' => $suppliersId,
            'spread_time >= :start_time' => $startTime,
            'spread_time <= :end_time' => $endTime,
        ];
        if ($search['admin_id'] > 0) {
            $where['spread_admin_id'] = $search['admin_id'];
        }
        // 分页获取数据
        $pageData = Loader::modelSlave('SuppliersSpreadLogNew')->getPage($field, $where, ' add_time DESC ', $currentPage);
        $logAccount = [];
        if($pageData['total_item'] > 0){
            $log_ids = array_column($pageData['list'],'id');
            $logAccount = Loader::modelSlave('SuppliersSpreadAccount')->getSpreadLogAccount($log_ids,SuppliersSpreadAccountModel::SPREAD_NEW);
            if($spread_return){
                foreach($pageData['list'] AS $k=>$v){
                    if($spread_return == 1 && !isset($logAccount[$v['id']])){
                        unset($pageData['list'][$k]);
                    }
                    if($spread_return == 2 && isset($logAccount[$v['id']])){
                        unset($pageData['list'][$k]);
                    }
                }
            }
        }
        //场地管理员
        $supplierAdminArr = Loader::modelSlave('SuppliersAdmin')->getSuppliersAdminArr($suppliersId);

        $page = array(
            'totalPage' => $pageData['total_page'],
            'currentPage' => $currentPage,
            'url' => '/report/spreadLogNew?'.http_build_query(array_filter($search)).'&page='
        );
        $this->setTitle('推广记录');

        $this->display('spreadLogNew', [
            'supplierAdminArr' => $supplierAdminArr,
            'spreadLogList' => $pageData['list'],
            'logAccount' => $logAccount,
            'spread_return' => $spread_return,
            'search' => $search,
            'page' => $page,
        ]);
    }
    
    /**
     * 发票订单
     *
     * @author bumtime
     * @date 20161215
     * 
     */
    public function invoiceOrderAction(){
    	$search = [];
    	
    	//场馆ID
		$venues_id	= helper_VenuesHelper::getCurrentVenuesId();
		
    	$defalut_time = date("Y-m-d", mktime(0,0,0,date("m")-1,date("d"),date("Y")));
    	$search['start_date'] = trim($this->getParam('start_date', $defalut_time));  // 开始日期
    	$search['end_date']   = trim($this->getParam('end_date', date("Y-m-d", time())));    // 结束日期
    	$start_time = strtotime($search['start_date']);
    	$end_time = strtotime($search['end_date']);
    	
    	$export   = $this->getParam('export');
    	
    	$currentPage = helper_CoreHelper::correctionPage($this->getParam('page', 1)); // 页码
    	
    	if ($search['start_date'] && !helper_CoreHelper::isLawfulDate($search['start_date'])) {
    		throw new InvalidArgumentException('开始日期参数有误');
    	}
    	
    	if ($search['end_date'] && !helper_CoreHelper::isLawfulDate($search['end_date'])) {
    		throw new InvalidArgumentException('结束日期参数有误');
    	}
    	
    	if ($search['start_date'] && $search['end_date'] && $start_time > $end_time) {
    		throw new InvalidArgumentException('开始日期不能大于结束日期');
    	}
    	
    	if($end_time > $start_time + self::ONE_MONTH){
    		$this->showMessage(array('title' => "error", 'message' =>"查询时间不能超过31天" ));
    	}
    	
    	$search = [		 
    			'start_date' 	=>	$search['start_date'],
    			'end_date'		=>	$search['end_date']
    	];
    	$end_time = strtotime($search['end_date']." 23:59:59");
    	$orderList = $this->getInvoiceOrderList($start_time, $end_time, $venues_id, $currentPage);  	
    	
    	if (empty($orderList)) {
    		$data = [
    				'title'		=> "提示页",
    				'message'	=>	"暂无相关记录"
    	
    		];
    		$this->showMessage($data);
    	}
    	
    	
    	//导出
    	if ($export == 1) {
    		$this->exportInvoiceOrder($search['start_date'], $search['end_date'], $orderList);
    		exit;
    	}
    	
    	$page = array(
    			'totalPage'		=>	$orderList['page_count'],
    			'currentPage'	=>	$currentPage,
    			'url'			=>	'/report/invoiceOrderOrder?'.http_build_query(array_filter($search)).'&page='
    	);
    	// 禁用layout
    	$this->getView()->disableLayout();
    	$this->setTitle('查看发票订单');
    	$this->display('invoiceOrder', [
    			'orderList' 	=>	$orderList['list'],
    			'search' 		=>	$search,
    			'page' 			=>	$page,
    			'count'			=>	$orderList['count'],
    			'total'			=>	$orderList['total']	 
    	]);

    }
    
    /**
     * 导出execl结算记录
     *
     * @author xiaoyanchun
     * 
     * @param $params (start_date, end_date, suppliers_id)
     */
    
    private function exportToExcel($params)
    {
    	$res = Loader::api('Orders')->getClearingLogOrders($params);
    
    	$orderList = [];
    	if (is_array($res) && isset($res['status']) && $res['status'] == '0000') {
    		$orderList = $res['data'];
    		unset($res);
    	/*	
            if (empty($orderList)) {
                throw new Exception('没有未结算的订单');
            }*/
    	}
    	 
    	if (empty($orderList)) {
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
    	$fileName = "结算订单_".$params['start_date'].'_'.$params['end_date'].".xlsx";
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
    	$phpExcel->getActiveSheet()->getColumnDimension('H')->setWidth(55);// 设置宽度
    	$phpExcel->getActiveSheet()->getColumnDimension('I')->setWidth(55);// 设置宽度
    	$phpExcel->getActiveSheet()->getColumnDimension('M')->setWidth(55);// 设置宽度

        $phpExcel->getActiveSheet()->mergeCells('A1:M1');
        $phpExcel->getActiveSheet()->mergeCells('A2:M2');
        $phpExcel->getActiveSheet()->mergeCells('A3:M3');
        for ($i=1;$i<4;$i++){
            $phpExcel->getActiveSheet()->getStyle("A{$i}")->applyFromArray(
                array(
                    'alignment' => array(
                        'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER
                    )
                )
            );
        }

        $sheet->setCellValue("A1", '趣运动结算');
        $sheet->setCellValue("A2", '结算日期：'. date('m月d日', strtotime($params['start_date'])).'-'.date('m月d日', strtotime($params['end_date'])));

    	$index = 4;
    	$sheet->setCellValue("A{$index}", '订单编号');
    	$sheet->setCellValue("B{$index}", '手机尾号');
    	$sheet->setCellValue("C{$index}", '订单金额');
    	$sheet->setCellValue("D{$index}", '场地结算');
    	$sheet->setCellValue("E{$index}", '商品结算');
    	$sheet->setCellValue("F{$index}", '结算总金额');
    	$sheet->setCellValue("G{$index}", '项目分类');
    	$sheet->setCellValue("H{$index}", '场次信息');
    	$sheet->setCellValue("I{$index}", '商品信息');
    	$sheet->setCellValue("J{$index}", '订单状态');
    	$sheet->setCellValue("K{$index}", '是否结算');
    	$sheet->setCellValue("L{$index}", '下单时间');
    	$sheet->setCellValue("M{$index}", '订单备注');

        $orderTotalAmonut = 0; // 订单总金额
        $orderSettledTotalAmount = 0; // 结算总金额
        $orderUnsettledTotalAmount = 0; // 未结算总金额
        $orderCount = 0; // 订单总数
        $orderUnsettledCount = 0; // 未结算订单数

                                        
                                        
    	foreach ($orderList as $key => $order) {
    		$index++;

            $orderCount = $orderCount+1;
            $orderTotalAmonut += $order['amount'];
            $orderSettledTotalAmount += $order['total_s_amount'];
            if ($order['account_status'] == '未结算'){
                $orderUnsettledTotalAmount += $order['total_s_amount'];
                $orderUnsettledCount = $orderUnsettledCount+1;
            }


    		$sheet->setCellValueExplicit("A{$index}", $order['sn']);
    		$sheet->setCellValue("B{$index}", $order['mobile']);
    		$sheet->setCellValue("C{$index}", $order['amount']);
	
    		$temp = isset($order['utm_medium'] ) && ($order['utm_medium'] == helper_VenuesHelper::getutmMedium()) ? $order['third_amount'] :  $order['amount'];
    		$sheet->setCellValue("C{$index}", $temp);
    		
    		$sheet->setCellValue("D{$index}", $order['base_s_amount']);
    		$sheet->setCellValue("E{$index}", $order['sale_s_amount']);
    		$sheet->setCellValue("F{$index}", $order['total_s_amount']);
    		$sheet->setCellValue("G{$index}", $order['cat']);
    	
    		$sheet->setCellValue("H{$index}", implode("\n", $order['court_info']));
    		$phpExcel->getActiveSheet()->getStyle("H{$index}")->getAlignment()->setWrapText(true);

            $sheet->setCellValue("I{$index}", implode("\n", $order['sale_info']));
            $phpExcel->getActiveSheet()->getStyle("I{$index}")->getAlignment()->setWrapText(true);
    	
    		$sheet->setCellValue("J{$index}", $order['order_status']);
    		$sheet->setCellValue("K{$index}", $order['account_status']);
    		$sheet->setCellValue("L{$index}", date('Y-m-d H:i', $order['add_time']));
    		$sheet->setCellValue("M{$index}", $order['remark']);
            $phpExcel->getActiveSheet()->getStyle("M{$index}")->getAlignment()->setWrapText(true);

    		unset($orderList[$key]); // 及时释放内存
    	}

        $sheet->setCellValue("A3", "订单总金额：". number_format($orderTotalAmonut, 2). "  结算总金额：". number_format($orderSettledTotalAmount, 2). "  未结算金额：". number_format($orderUnsettledTotalAmount, 2).
                                   "  订单总数：". $orderCount. "  未结算订单：". $orderUnsettledCount);

        $objWriter = PHPExcel_IOFactory::createWriter($phpExcel, 'Excel2007');
    	$objWriter->save('php://output');
    	
    	// 类加载机制还回给yaf
    	spl_autoload_register(array($yafLoader, 'autoload'));
    	exit;
    }

    
    /**
     * 处理结算订单明细记录
     * 
     * @author bumtime
     * @date 2016-08-01
     *
     * @param  string  $start_date		开始时间
     * @param  string  $end_date		结束时间
     * @param  int  $suppliersId		商家ID
     * @param  int  $currentPage		当前页码
     * 
     * @return array 明细记录
     */
    private function getClearingOrderList($start_date, $end_date, $un_consume, $suppliersId, $currentPage)
    {
    	$orderList = [];
        $redis = baf_Redis::factory();
    	$cacheKey = 'getClearingOrderList:' . $suppliersId . '_' . $start_date. '_' . $end_date;
    	if(!empty($suppliersId) &&  !empty($start_date) && !empty($end_date)){
    		$orderList = $redis->getArrayValue($cacheKey);
    	}  
    	//为空就重新取值
    	if(empty($orderList)){
    		// 获取结算订单列表
            $params                 = [];
            $params['suppliers_id'] = $suppliersId;
            $params['start_date']   = $start_date;
            $params['end_date']     = $end_date;
            $params['un_consume']   = $un_consume;

	    	$res = Loader::api('Orders')->getClearingLogOrders($params);	

	    	if (is_array($res) && isset($res['status']) && $res['status'] == '0000') {
	    		$orderList = $res['data'];
	    		unset($res);
	    		$redis->setArrayValue($cacheKey, $orderList, 600);
	    	}
	    	
    	}
    	//按分页取值
    	$page_size = 15;
    	$start =  $currentPage == 1 ?  0  : (abs($currentPage - 1)) *  $page_size;
    	$list = !empty($orderList) ? array_slice($orderList, $start, $page_size) : [];

		return [
				'page_count'	=>	count($orderList) > 0 ? ceil(count($orderList) / $page_size) : 0,
				'list'			=>	$list	
		]; 	
    
    }
    
    /**
     * 处理发票订单明细记录
     *
     * @author bumtime
     * @date 2016-12-15
     *
     * @param  string  $start_date		开始时间
     * @param  string  $end_date		结束时间
     * @param  int     $venues_id		球馆ID
     * @param  int     $currentPage		当前页码
     *
     * @return array 明细记录
     */
    private function getInvoiceOrderList($start_date, $end_date, $venues_id, $currentPage)
    {
    	$arryInfo = [
    			'list'	=>	[],
    			'count'	=>	0,
    			'total'	=>	0
    	];
    	
    	$redis = baf_Redis::factory();
    	$cacheKey = 'getInvoiceOrderList:' . $venues_id . '_' . $start_date. '_' . $end_date;
    	if(!empty($venues_id) &&  !empty($start_date) && !empty($end_date)){
    		$arryInfo = $redis->getArrayValue($cacheKey);
    	}
    
    	//为空就重新取值
    	if(!isset($arryInfo['count'])){
    		// 获取结算订单列表
    		$params = [];
    		$params['venues_id'] 	= $venues_id;
    		$params['start_date']   = $start_date;
    		$params['end_date']     = $end_date;
    		
    		$invoice_amount	=	0;
    		$count			=	0;

    		$arryOrderSn = [];
    		$res = Loader::api('Orders')->invoiceOrder($params);
    		if (is_array($res) && isset($res['status']) && $res['status'] == '0000') {
    			$orderList = $res['data'];
    			foreach ($orderList as $v){
    				//按订单统计，过滤掉明细
    				if(!in_array($v['sn'], $arryOrderSn)){
	    				$invoice_amount += $v['total_s_amount'] - $v['sale_s_amount'];
	    				$count += 1;
	    				$arryOrderSn[] = $v['sn'];
    				}
    			}
				$arryInfo = [
						'list'=>$orderList, 
						'count'=>$count, 
						'total'=>$invoice_amount	
				];
    			unset($res);
    			$redis->setArrayValue($cacheKey, $arryInfo, 600);
    		}
    
    	}
    	//按分页取值
    	$page_size = 20;
    	$start =  $currentPage == 1 ?  0  : (abs($currentPage - 1)) *  $page_size;
    	$list = !empty($arryInfo['list']) ? array_slice($arryInfo['list'], $start, $page_size) : [];
    
    	return [
    			'page_count'	=>	count($arryInfo['list']) > 0 ? ceil(count($arryInfo['list']) / $page_size) : 0,
    			'list'			=>	$arryInfo['list'],
    			'count'			=>	$arryInfo['count'],
    			'total'			=>	$arryInfo['total']
    	];
    
    }

    
    /**
     * 导出发票订单明细记录
     *
     * @author bumtime
     * @date 2016-12-26
     *
     * @param  string  $start_date		开始时间
     * @param  string  $end_date		结束时间
     * @param  array   $list		列表
     *
     * @return array 明细记录
     */
    private function exportInvoiceOrder($start_date, $end_date, $list) {
    	
    	
    	// 释放yaf的类加载机制
    	$yafLoader = Yaf_Loader::getInstance();
    	spl_autoload_unregister(array($yafLoader, 'autoload'));
    	
    	 
    	require_once APP_PATH.'/application/library/ext/phpexcel/PHPExcel.php';
    	 
    	$phpExcel = new PHPExcel();
    	$fileName = "发票订单_".$start_date.'_'.$end_date.".xlsx";
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
    	$phpExcel->getActiveSheet()->getColumnDimension('C')->setWidth(20);// 设置宽度
    	$phpExcel->getActiveSheet()->getColumnDimension('K')->setWidth(55);// 设置宽度
    	$phpExcel->getActiveSheet()->getColumnDimension('L')->setWidth(55);// 设置宽度
    	$phpExcel->getActiveSheet()->getColumnDimension('M')->setWidth(55);// 设置宽度
    	

    	$phpExcel->getActiveSheet()->mergeCells('A1:M1');
    	$phpExcel->getActiveSheet()->mergeCells('A2:M2');
    	
    	
     	$sheet->setCellValue("A1", '发票订单明细');
    	$sheet->setCellValue("A2", '结算日期：'. date('m月d日', strtotime($start_date)).'-'.date('m月d日', strtotime($end_date)));

    	$sheet->getStyle('A1')->getFont()->setBold(true);
    	$sheet->getStyle('A1')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
    	
    	$sheet->getStyle('A2')->getFont()->setBold(true);
    	$sheet->getStyle('A2')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
    	
    	$index = 3;
        $sheet->setCellValue("A{$index}", '总订单数:');
    	$sheet->setCellValue("B{$index}", $list['count']);
    	$sheet->setCellValue("C{$index}", '总发票金额:');
    	$sheet->setCellValue("D{$index}", $list['total']); 
    	 
    
    	$index = 4;
    	$sheet->setCellValue("A{$index}", '开票时间');
    	$sheet->setCellValue("B{$index}", '发票金额');
    	$sheet->setCellValue("C{$index}", '订单编号');
    	$sheet->setCellValue("D{$index}", '手机尾号');
    	$sheet->setCellValue("E{$index}", '预定方式');
    	$sheet->setCellValue("F{$index}", '订单金额');
    	$sheet->setCellValue("G{$index}", '场地结算');
    	$sheet->setCellValue("H{$index}", '商品结算');
    	$sheet->setCellValue("I{$index}", '结算总金额');
    	$sheet->setCellValue("J{$index}", '项目分类');
    	$sheet->setCellValue("K{$index}", '场次信息');
    	$sheet->setCellValue("L{$index}", '商品信息');
    	$sheet->setCellValue("M{$index}", '订单备注');
    	
    	foreach ($list['list'] as $key => $row) {
    		$index++;

    		$sheet->setCellValueExplicit("A{$index}", date("Y-m-d H:i:s", $row['apply_time']));
    		$sheet->setCellValue("B{$index}", number_format($row['total_s_amount'] - $row['sale_s_amount'], 2));
    		$sheet->setCellValue("C{$index}", $row['sn']);
    		$sheet->setCellValue("D{$index}", $row['mobile']);
    		$sheet->setCellValue("E{$index}", isset($row['utm_medium'] ) && ($row['utm_medium'] == helper_VenuesHelper::getutmMedium()) ? "预留" : "趣运动");
    		$sheet->setCellValue("F{$index}", isset($row['utm_medium'] ) && ($row['utm_medium'] == helper_VenuesHelper::getutmMedium()) ? number_format($row['third_amount'], 2) :  number_format($row['amount'], 2));
    		$sheet->setCellValue("G{$index}", number_format($row['base_s_amount'], 2));
    		$sheet->setCellValue("H{$index}", number_format($row['sale_s_amount'], 2));
    		$sheet->setCellValue("I{$index}", $row['total_s_amount']);   	
    		$sheet->setCellValue("J{$index}", $row['cat']);		
    		$sheet->setCellValue("K{$index}", isset($row['court_info']) && !empty($row['court_info']) ? implode("<br/>", $row['court_info']) : "");
    		$sheet->setCellValue("L{$index}", isset($row['sale_info']) && !empty($row['sale_info']) ? implode("<br/>", $row['sale_info']) : "");
    		$sheet->setCellValue("M{$index}", $row['remark']);


    		unset($list['list'][$key]); // 及时释放内存
    	}  
        $objWriter = PHPExcel_IOFactory::createWriter($phpExcel, 'Excel2007');
    	$objWriter->save('php://output'); 
    	
    	// 类加载机制还回给yaf
    	spl_autoload_register(array($yafLoader, 'autoload'));
    	exit;
    }
}