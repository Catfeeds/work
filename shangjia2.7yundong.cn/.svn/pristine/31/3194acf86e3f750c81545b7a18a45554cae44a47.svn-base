<?php

/**
 * 统计页
 */
class StatController extends BaseController
{
    const ONE_MONTH  = 2678400; //86400*31 31天
    const ONE_YEAR   = 31622400; //366*3600*24     
    const DEFALULT_FRONT = "趣运动";//多前台区域为空时，默认赋值

    public function indexAction()
    { //默认Action

        $this->display('index', ['test' => 'OK']);
    }

    /**
     * 总店统计汇总
     */
    public function totalAction()
    {
        $now = time();
        $startDate = $this->getParam('startDate', date('Y-m-d', $now));
        $endDate = $this->getParam('endDate', date('Y-m-d', $now));
        $account_type = $this->getParam('account_type', 2);
        $start_time = strtotime($startDate);
        $end_time = strtotime($endDate);
        if($end_time > $start_time + self::ONE_MONTH){
            $this->showMessage(array('title' => "error", 'message' =>"查询时间不能超过31天" ));
        }

        $venuesList = helper_VenuesHelper::getCurrentVenuesList();
        $list = [];
        $incomeTotal = 0;
        $memberIncomeTotal = 0;
        $pieTotal = $pieIncomeTotal = [];
        foreach ($venuesList AS $venuesId => $name) {
            $total_price = Loader::api('Orders')->getTotalSettlePrice($venuesId, $start_time, $end_time);
            $venues_income = isset($total_price['total_settle_price']) ? $total_price['total_settle_price'] : 0;
            $list[$venuesId] = [
                'venues_id' => $venuesId,
                'venues_income' => $venues_income,
                'member_income' => 0,
                'goods_income' => 0,
                'venues_name' => $name,
                'total' => $venues_income,
            ];
            $incomeTotal += $venues_income;
            $pieTotal[$venuesId] = ['value' => $venues_income, 'name' => $name];
            $pieIncomeTotal[$venuesId][0] = ['value' => $venues_income, 'name' => '场地收入'];
            $pieIncomeTotal[$venuesId][1] = ['value' => 0, 'name' => '商品收入'];
        }
        $statList = Loader::api('Stat')->getTotalReport(implode(',', array_keys($venuesList)), $start_time, $end_time, $account_type);
        foreach ($statList AS $k => $v) {
            $list[$v['venues_id']]['venues_income'] += $v['venues_income'];
            $list[$v['venues_id']]['goods_income'] += $v['goods_income'];
            $list[$v['venues_id']]['member_income'] += $v['member_income'];
            $income = $v['venues_income'] + $v['goods_income'];
            $list[$v['venues_id']]['total'] += $income;

            $incomeTotal += $income;
            $memberIncomeTotal += $v['member_income'];
            $pieTotal[$v['venues_id']]['value'] += $income;
            $pieIncomeTotal[$v['venues_id']][0]['value'] += $v['venues_income'];
            $pieIncomeTotal[$v['venues_id']][1]['value'] += $v['goods_income'];
        }

        $this->display('total', [
            'startDate' => $startDate,
            'endDate' => $endDate,
            'accountType' => $account_type,
            'list' => $list,
            'incomeTotal' => $incomeTotal,
            'memberIncomeTotal' => $memberIncomeTotal,
            'pieTotal' => json_encode(array_values($pieTotal)),
            'pieIncomeTotal' => json_encode($pieIncomeTotal),
        ]);
    }

    /**
     * 营业日结
     */
    public function businessAction()
    {
        $now = time();
        $startDate = $this->getParam('startDate', date('Y-m-d', $now));
        $endDate = $this->getParam('endDate', date('Y-m-d', $now));
        $accountType = $this->getParam('accountType', 2);
        $hideMemberCharge = $this->getParam('hideMemberCharge', 0);
        $export = $this->getParam('export', 0);

        $payType = [
            '0' => '现金', //	启用	　	　
            '2' => '银行卡', //	启用	　	　
            '10' => '支付宝', //	启用	　	2015/11/28 14:26
            '8' => '微信', //	启用	　	2015/11/26 14:26
            '12' => '支票', //	启用	　	2015/11/30 14:26
            '9' => '团购券', //	启用	　	2015/11/27 14:26
            '11' => '代金券', //	启用	　	2015/11/29 14:26
        ];
        $incomeType = helper_StatHelper::INCOME_ORDER_TYPE;
        if ($hideMemberCharge == 1) {
            unset($incomeType[3]);
        }
        $start_time = strtotime($startDate);
        $end_time = strtotime($endDate);
        if($end_time > $start_time + self::ONE_YEAR){
            $this->showMessage(array('title' => "error", 'message' =>"查询时间不能超过1年" ));
        } 

        $venuesId = helper_VenuesHelper::getCurrentVenuesId();
        $res = Loader::api('Stat')->getDayReport($venuesId, $start_time, strtotime($endDate. " 23:59:59"), $accountType);
        
        $list = isset($res['list']) ? $res['list'] : [];
        $multiple_list = isset($res['MultipleTotal']) ? $res['MultipleTotal'] : [];
   
        //取趣运动总价
        $end_time = strtotime($endDate);
        $total_price = Loader::api('Orders')->getTotalSettlePrice($venuesId, $start_time, $end_time, $accountType);
    
        $chartArr = [];
        for ($i = $start_time; $i <= $end_time; $i += 86400) {
            $chartArr[$i] = 0;
        }

        $incomeStat = [
            ["payable_amount" => 0, "apay_amount" => 0], //现款收入
            ["payable_amount" => 0, "apay_amount" => 0, "gift_amount" => 0], //会员收入
            ["payable_amount" => 0, "apay_amount" => 0], //合作收入
            ["payable_amount" => 0, "apay_amount" => 0], //营业合计
        ];
        $businessStat = array_fill_keys(array_keys($incomeType), $incomeStat);
        $incomeTypeArr = array_fill_keys(array_keys(helper_StatHelper::INCOME_ORDER_TYPE), ["payable_amount" => 0, "apay_amount" => 0]);
        $cashIncomeValue = $incomeTypeArr;
        array_push($cashIncomeValue, ["payable_amount" => 0, "apay_amount" => 0]);
        $cashIncome = array_fill_keys(array_keys($payType), $cashIncomeValue);
        foreach ($list AS $l) {
            if (isset($cashIncome[$l['pay_mode']][$l['income_type']])) {
                $cashIncome[$l['pay_mode']][$l['income_type']]['payable_amount'] += $l['payable_amount'];
                $cashIncome[$l['pay_mode']][$l['income_type']]['apay_amount'] += $l['apay_amount'];
                $cashIncome[$l['pay_mode']][6]['payable_amount'] += $l['payable_amount'];
                $cashIncome[$l['pay_mode']][6]['apay_amount'] += $l['apay_amount'];
            }
            if (isset($businessStat[$l['income_type']])) {
                $temp = [
                    ["payable_amount" => 0, "apay_amount" => 0], //现款收入
                    ["payable_amount" => 0, "apay_amount" => 0, "gift_amount" => 0], //会员收入
                    ["payable_amount" => 0, "apay_amount" => 0], //合作收入
                    ["payable_amount" => 0, "apay_amount" => 0], //营业合计
                ];
                switch ($l['pay_mode']) {
                    case 1: //会员收入
                        $temp[1]['payable_amount'] += $l['payable_amount'];
                        $temp[1]['apay_amount'] += $l['apay_amount'];
                        $temp[1]['gift_amount'] += $l['gift_amount'];
                        break;
                    case 7:
                        /*趣运动价通过接口直接获取
                        $temp[2]['payable_amount'] += $l['payable_amount'];
                        $temp[2]['apay_amount'] += $l['apay_amount'];
                        */
                        break;
                    default:
                        $temp[0]['payable_amount'] += $l['payable_amount'];
                        $temp[0]['apay_amount'] += $l['apay_amount'];
                }
                for ($i = 0; $i < 3; $i++) {
                    $temp[3]['payable_amount'] += $temp[$i]['payable_amount'];
                    $gift_amount = 0;
                    if($i == 1){
                        $gift_amount = $temp[$i]['gift_amount'];
                    }
                    $temp[3]['apay_amount'] += $temp[$i]['apay_amount'] + $gift_amount;
                }
                foreach ($businessStat[$l['income_type']] AS $k => $v) {
                    $v['payable_amount'] += $temp[$k]['payable_amount'];
                    $v['apay_amount'] += $temp[$k]['apay_amount'];
                    if ($k == 1) {
                        $v['gift_amount'] += $temp[$k]['gift_amount'];
                    }
                    // 储值卡充值不再计算进入营业额统计
                    if ($l['income_type'] == 3 && $k == 3){
                        $v['payable_amount'] = 0;
                        $v['apay_amount']    = 0;
                    }

                    $businessStat[$l['income_type']][$k] = $v;
                }
                 
                //收款时间返回的时间含有年月日时分秒，需要转成年月日
                if($accountType == 1)
                {
                	$l['account_date'] = strtotime(date("Y-m-d", $l['account_date'])) ;
                }
                //按天统计营业总额
                if (isset($chartArr[$l['account_date']])) {
                	
                    /*
                    if ($hideMemberCharge && $l['pay_mode'] == 1) {
                        continue;
                    }
                    */
                    if($l['pay_mode'] != 7){
                    	// 储值卡充值不再计算进入营业额统计
                        if ($l['income_type'] != 3){
                            $chartArr[$l['account_date']] += $l['apay_amount'] + $l['gift_amount'];
                        }
                    }
                }
            }
        }
        if (!empty($total_price)) {
            $businessStat[1][2]['payable_amount'] = $total_price['total_original_price'];
            $businessStat[1][2]['apay_amount'] = $total_price['total_settle_price'];
            $businessStat[1][3]['payable_amount'] += $total_price['total_original_price'];
            $businessStat[1][3]['apay_amount'] += $total_price['total_settle_price'];
            $businessStat[2][2]['payable_amount'] = isset($total_price['total_sale_amount']) ? $total_price['total_sale_amount']: 0;
            $businessStat[2][2]['apay_amount'] = isset($total_price['total_sale_settle_price']) ? $total_price['total_sale_settle_price']: 0;
            $businessStat[2][3]['payable_amount'] += isset($total_price['total_sale_amount']) ? $total_price['total_sale_amount'] : 0;
            $businessStat[2][3]['apay_amount'] += isset($total_price['total_sale_settle_price']) ? $total_price['total_sale_settle_price'] : 0;

            foreach ($chartArr AS $k => $l) {
                if (isset($total_price['list'][$k])) {
                    $chartArr[$k] += $total_price['list'][$k]['total_settle_price'] + $total_price['list'][$k]['total_sale_settle_price'];
                }
            }
        }
        foreach ($incomeStat AS $k => $v) {
            foreach ($incomeType AS $i => $c) {
                $v['payable_amount'] += $businessStat[$i][$k]['payable_amount'];
                $v['apay_amount'] += $businessStat[$i][$k]['apay_amount'];
                if ($k == 1) {
                    $v['gift_amount'] += $businessStat[$i][$k]['gift_amount'];
                }
                $incomeStat[$k] = $v;
            }
        }
        array_push($businessStat, $incomeStat);

        //导出
        if ($export == 1) {
        	$this->exportBusiness($startDate, $endDate, $businessStat, $incomeType, $cashIncome, $payType, $multiple_list);
        	exit;
        }      
        
        $chartX = [];
        foreach (array_keys($chartArr) AS $v) {
            $chartX[] = date("m-d", $v);
        }
        $this->display('business', [
            'startDate' => $startDate,
            'endDate' => $endDate,
            'accountType' => $accountType,
            'hideMemberCharge' => $hideMemberCharge,
            'payType' => $payType,
            'incomeType' => $incomeType,
            'cashIncome' => $cashIncome,
            'businessStat' => $businessStat,
            'incomeStat' => $incomeStat,
            'chartX' => $chartX,
            'chartY' => array_values($chartArr),
        	'multiple_list' => $multiple_list
        ]);
    }

    /**
     * 多前台收入明细
     */
    public function frontAction()
    {
        $now = time();
        $startDate = $this->getParam('startDate', date('Y-m-d', $now));
        $endDate = $this->getParam('endDate', date('Y-m-d', $now));
        $statTimeType = $this->getParam('statTimeType', 2);
        $area = $this->getParam('area', '-1');
        $operator = $this->getParam('operator', '');
        $currentPage = helper_CoreHelper::correctionPage($this->getParam('page', 1)); // 页码
        $count = $this->getParam('count', 20);
        $export = $this->getParam('export', 0);
  
        
        $venuesId = helper_VenuesHelper::getCurrentVenuesId();
  		// 相关参数
		$param = [
				'venues_id' => $venuesId,
				'start_date' => strtotime($startDate),
				'end_date' => strtotime($endDate." 23:59:59"),
				'page' => $currentPage,
				'count' => $count,
				'account_type' => $statTimeType,
				'operate_area' => $area,
				'create_by' => $operator
		];
		
		$start_time = strtotime($startDate);
		$end_time = strtotime($endDate);
		if($end_time > $start_time + self::ONE_MONTH){
			$this->showMessage(array('title' => "error", 'message' =>"查询时间不能超过31天" ));
		}
		
		if ($export == 1) {
			//不导出有分页
			unset($param["page"]);
			unset($param["count"]);
		}
		
        $list = Loader::api('Stat')->getMultipleOrderList($param); 
        
        $showList = isset($list['list']) ? $list['list'] : [] ;
        
        if ($export == 1) {
        	$this->exportFrontList($startDate, $endDate, $showList);
        	exit;
        }
       
        $total_number = isset($list['totalNum']) ? $list['totalNum'] : 0;
 
        $search = [
        		'venues_id' => $venuesId,
        		'startDate' => $startDate,
        		'endDate' => $endDate,
        		'statTimeType' => $statTimeType,
        		'area' => $area,
        		'operator' => $operator       		
        ];

        $page = array(
        		'totalPage' => ceil($total_number / $count),
        		'currentPage' => $currentPage,
        		'url' => '/Stat/front?'.http_build_query($search).'&page='
        );
     
        
        $pay_mode_list = $pay_mode_list_new = [];
        $total_info = [
        		'payable_amount' => 0,
        		'apay_amount' => 0
        ];
        if(isset($list['payModeList']) && !empty($list['payModeList'])){
        	$pay_mode_list = $list['payModeList'];
        	foreach ($pay_mode_list as $value){
        		$total_info['payable_amount'] += $value['payable_amount'];
        		$total_info['apay_amount'] += $value['apay_amount'];
        		if($value['pay_mode'] == 1){
        			$pay_mode_list_new[4] = $value['gift_amount'];
        			$pay_mode_list_new[1] = $value['apay_amount'] - $value['gift_amount'];
        		}
        		else if($value['pay_mode'] == 3){
        			$pay_mode_list_new[$value['pay_mode']] = 0;
        		}else{
        			$pay_mode_list_new[$value['pay_mode']] = $value['apay_amount'];
        		}		
        	}
        }
        
       /*  if (isset($list['list']) && is_array($list['list'])) {
        	$sortList = [];
        	foreach ($list['payModeList'] AS $v) {
        		$pm = intval($v['pay_mode']);
        		//会员卡支付
        		if($pm == 1){
        			$payModeTotal[$pm] += $v['apay_amount'] - $v['gift_amount'];
        			$payModeTotal[4] += $v['gift_amount'];
        		}elseif($pm === 3){
        			$payModeTotal[$pm] += 0;
        		}else{
        			$payModeTotal[$pm] += $v['apay_amount'];
        		}
        		if($pm !== 3){
        			$apayAmountTotal += $v['apay_amount'];
        		}
        		$payableAmountTotal += $v['payable_amount'];
        	}
        	$list =  $list['list'];
        } */
       
        $this->display('front', [
            'startDate' => $startDate,
            'endDate' => $endDate,
            'statTimeType' => $statTimeType,
            'area' => $area,
            'operator' => $operator,
        	'page' => $page,
        	'list' => $showList,
        	'pay_mode_list'=>  $pay_mode_list_new,
        	'operat_area_list'=>  isset($list['operatAreas']) ? $list['operatAreas'] : [],
        	'operators_list'=>  isset($list['operators']) ? $list['operators'] : [],
        	'total_info' => $total_info
        ]);
    }

    /**
     * 收入明细
     */
    public function incomeDetailAction()
    {
        $now = time();
        $startDate = $this->getParam('startDate', date('Y-m-d', $now));
        $endDate = $this->getParam('endDate', date('Y-m-d', $now));
        $accountType = $this->getParam('accountType', 2);
        $orderType = $this->getParam('orderType', 0);
        $incomeType = $this->getParam('incomeType', 0);
        $catId = $this->getParam('catId', 0);
        $payMode = $this->getParam('payMode', -1);
        $orderCode = $this->getParam('orderCode', '');
        $operator = $this->getParam('operator', '');
        $page = $this->getParam('page', 1);
        $count = $this->getParam('count', 20);
        $export = $this->getParam('export', 0);

        $startTime = strtotime($startDate);
        $endTime = strtotime($endDate." 23:59:59");

        if($endTime > $startTime + self::ONE_MONTH){
            $this->showMessage(array('title' => "error", 'message' =>"查询时间不能超过31天" ));
        } 


        $venuesId = helper_VenuesHelper::getCurrentVenuesId();
        $param = [
            "venues_id" => $venuesId,
            "account_type" => $accountType,
            "start_date" => $startTime,
            "end_date" => $endTime,
            "order_type" => $orderType,
            //"operator" => $orderType,
            "income_type" => $incomeType,
            "pay_mode" => $payMode,
            "order_code" => $orderCode,
            "create_by" => $operator,
            'category_id' => $catId,
        ];
        if ($export != 1) {
            //不导出有分页
            $param["page"] = $page;
            $param["count"] = $count;
        }
        $payableAmountTotal = $apayAmountTotal = 0;
        $payModeTotal = [];
        foreach (helper_StatHelper::PAY_MODE AS $k => $v) {
            $payModeTotal[$k] = 0;
        }
        $res = Loader::api('Stat')->getIncomeDealList($param);

        $list = [];
        if (isset($res['list']) && is_array($res['list'])) {
            $sortList = [];
            foreach ($res['payModeList'] AS $v) {
                $pm = intval($v['pay_mode']);
                //会员卡支付
                if($pm == 1){
                    $payModeTotal[$pm] += $v['apay_amount'] - $v['gift_amount'];
                    $payModeTotal[4] += $v['gift_amount'];
                }elseif($pm === 3){
                    $payModeTotal[$pm] += 0;
                }else{
                    $payModeTotal[$pm] += $v['apay_amount'];
                }
                if($pm !== 3){
                    $apayAmountTotal += $v['apay_amount'];
                }
                $payableAmountTotal += $v['payable_amount'];
            }
            $list =  $res['list'];
        }
        if ($export == 1) {
            $this->exportIncomeDetail($startDate, $endDate, $list);
            exit;
        }

        $total_number = isset($res['totalNum']) ? $res['totalNum'] : 0;
        $this->display('incomeDetail', [
            'list' => $list,
            'startDate' => $startDate,
            'endDate' => $endDate,
            'accountType' => $accountType,
            'operators' => isset($res['operators']) ? $res['operators'] : [],
            'operator' => $operator,
            'orderType' => $orderType,
            'incomeType' => $incomeType,
            'catId' => $catId,
            'payMode' => $payMode,
            'orderCode' => $orderCode,
            'payModeTotal' => $payModeTotal,
            'payableAmountTotal' => $payableAmountTotal,
            'apayAmountTotal' => $apayAmountTotal,
            'total_number' => isset($res['totalNum']) ? $res['totalNum'] : 0,
            'total_page' => ceil($total_number / $count),
            'page' => $page,
            'cat_list' => helper_VenuesHelper::getCurrentCatList(),
        ]);
    }

    /**
     * 导出收入明细
     */
    private function exportIncomeDetail($starDate, $endDate, $list)
    {
    	ini_set("memory_limit", "800M");
    	set_time_limit(0);

    	$cat_list = helper_VenuesHelper::getCurrentCatList();
        // 释放yaf的类加载机制
        $yafLoader = Yaf_Loader::getInstance();
        spl_autoload_unregister(array($yafLoader, 'autoload'));

        require_once APP_PATH . '/application/library/ext/phpexcel/PHPExcel.php';
        
        $cacheMethod = PHPExcel_CachedObjectStorageFactory::cache_in_memory_gzip;
        $cacheSettings = [
        		'memoryCacheSize'  => '800M'
        ];
        PHPExcel_Settings::setCacheStorageMethod($cacheMethod, $cacheSettings);

        $phpExcel = new PHPExcel();
        $fileName = "营业收入明细统计_" . $starDate . '_' . $endDate . ".xlsx";
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
        $sheet->setCellValue("A{$index}", '消费时间');
        $sheet->setCellValue("B{$index}", '订单类型');
        $sheet->setCellValue("C{$index}", '消费项目');
        $sheet->setCellValue("D{$index}", '收款类型');
        $sheet->setCellValue("E{$index}", '支付方式');
        $sheet->setCellValue("F{$index}", '顾客姓名');
        $sheet->setCellValue("G{$index}", '应付金额');
        $sheet->setCellValue("H{$index}", '实付金额');
        $sheet->setCellValue("I{$index}", '优惠金额');
        $sheet->setCellValue("J{$index}", '操作员');
        $sheet->setCellValue("K{$index}", '订单号');
        $sheet->setCellValue("L{$index}", '明细');

        
        $sheet->getColumnDimension('A')->setWidth(20);// 设置宽度
        $sheet->getColumnDimension('E')->setWidth(15);// 设置宽度
        $sheet->getColumnDimension('E')->setWidth(15);// 设置宽度
        $sheet->getColumnDimension('K')->setWidth(25);// 设置宽度
        $sheet->getColumnDimension('L')->setWidth(130);// 设置宽度
        
        $order_type = helper_StatHelper::ORDER_TYPE;
        $income_type = helper_StatHelper::INCOME_TYPE;
        $pay_mode = helper_StatHelper::PAY_MODE;
        $temp = "";
        
        foreach ($list as $key => $val) {
            $index++;
            $sheet->setCellValueExplicit("A{$index}", date("Y-m-d H:i:s", $val['consume_time']));
            $sheet->setCellValue("B{$index}", $order_type[$val['order_type']]);
            
            if($val['order_type'] == 4){
            	if($val['category_id_all'] != ""){
            		$arry_temp = explode(";", $val['category_id_all']);
            		foreach($arry_temp as $value){
            			$temp .=  isset($cat_list[$value]) ? $cat_list[$value]." " : '';
            		}
            	}
            }
            else{
            	$temp = isset($cat_list[$val['category_id']]) ? $cat_list[$val['category_id']] : '';
            }
          
            
            $sheet->setCellValue("C{$index}", $temp);
            $sheet->setCellValue("D{$index}", $income_type[$val['income_type']]);
            $sheet->setCellValue("E{$index}", $pay_mode[$val['pay_mode']]);

            $sheet->setCellValue("F{$index}", $val['customer_name']);
            $sheet->setCellValue("G{$index}", $val['payable_amount']);
            $sheet->setCellValue("H{$index}", $val['apay_amount']);
            $sheet->setCellValue("I{$index}", $val['payable_amount'] - $val['apay_amount']);
            $sheet->setCellValue("J{$index}", $val['create_by']);
            $sheet->setCellValue("K{$index}", $val['order_code']);
            $detail = '';
            if (!empty($val['detail'])) {
                foreach ($val['detail'] AS $val_all) {
                	foreach ($val_all AS $d) {
	                    if (!empty($d['begin_time'])) {
	                        //场地详情
	                        $detail .= "\"".$d['name'] . ' ' . date('Y-m-d  H:i', $d['begin_time']) . '-' . date('H:i', $d['end_time']) . ' ' . $d['price'] . "(元)\n";
	                    } else {
	                        //商品详情
	                        $detail .= $d['name']  . ' ' . $d['price'] . '(元) x' . $d['count']."\n";
	                    }
                	}
                }
            }
            $sheet->setCellValue("L{$index}", $detail);
            $sheet ->getStyle("L{$index}")->getAlignment()->setWrapText(true);//自动换行

            unset($list[$key]); // 及时释放内存
            $temp = "";
        }

        $objWriter = PHPExcel_IOFactory::createWriter($phpExcel, 'Excel2007');
        $objWriter->save('php://output'); 

        // 类加载机制还回给yaf
        spl_autoload_register(array($yafLoader, 'autoload'));
        exit;
    }


    /**
     * 商品交易汇总
     */
    public function goodsDealSummaryAction()
    {
        try {
            $list = array();
            $sale_price_total = $profit_total = 0;

            $venues_id = helper_VenuesHelper::getCurrentVenuesId();
            $start_date = trim($this->getParam('start_date', date('Y-m-d')));
            $end_date = trim($this->getParam('end_date', date('Y-m-d')));

            $start_time = strtotime($start_date);
            $end_time = strtotime($end_date);
            if($end_time > $start_time + self::ONE_YEAR){
            	$this->showMessage(array('title' => "error", 'message' =>"查询时间不能超过1年" ));
            }
    
            $response = Loader::api('Stat')->getGoodsDealSummary($venues_id, $start_date, $end_date);
            if ($response['status'] == '0000') {
                $list = $response['data']['list'];
                $sale_price_total = $response['data']['sale_price_total'];
                $profit_total = $response['data']['profit_total'];
            } else {
                $this->showMessage(array('title' => "Stat::getGoodsDealSummary接口返回错误信息", 'message' => $response['msg']));
            }

            $this->display('goodsDealSummary', [
                'start_date' => $start_date,
                'end_date' => $end_date,
                'list' => $list,
                'sale_price_total' => $sale_price_total,
                'profit_price_total' => $profit_total,
            ]);
        } catch (Exception $e) {
            $this->showMessage(array('title' => "出现异常", 'message' => $e->getMessage()));
        }

    }

    /**
     * 商品收入统计数据
     */
    public function goodsIncomeAction()
    {
        try {
            $list = array();

            $venues_id = helper_VenuesHelper::getCurrentVenuesId();
            $start_date = trim($this->getParam('start_date', date('Y-m-d')));
            $end_date = trim($this->getParam('end_date', date('Y-m-d')));
            $goods_name = trim($this->getParam('goods_name'));

           $start_time = strtotime($start_date);
            $end_time = strtotime($end_date);
            if($end_time > $start_time + self::ONE_YEAR){
            	$this->showMessage(array('title' => "error", 'message' =>"查询时间不能超过1年" ));
            }
            
            $response = Loader::api('Stat')->getGoodsIncomeList($venues_id, $start_date, $end_date, $goods_name);
            if ($response['status'] == '0000') {
                $list = $response['data']['list'];
            } else {
                $this->showMessage(array('title' => "Stat::getGoodsIncomeList接口返回错误信息", 'message' => $response['msg']));
            }

            $this->display('goodsIncome', [
                'start_date' => $start_date,
                'end_date' => $end_date,
                'goods_name' => $goods_name,
                'list' => $list
            ]);
        } catch (Exception $e) {
            $this->showMessage(array('title' => "出现异常", 'message' => $e->getMessage()));
        }

    }

    /**
     * 导出商品收入统计数据
     */
    public function exportGoodsIncomeAction()
    {
        try {
            $list = array();

            $venues_id = helper_VenuesHelper::getCurrentVenuesId();
            $start_date = trim($this->getParam('start_date', date('Y-m-d', strtotime('-3 days'))));
            $end_date = trim($this->getParam('end_date', date('Y-m-d')));

            $start_time = strtotime($start_date);
            $end_time = strtotime($end_date);
            if($end_time > $start_time + self::ONE_YEAR){
            	$this->showMessage(array('title' => "error", 'message' =>"查询时间不能超过1年" ));
            } 
          
            $response = Loader::api('Stat')->getGoodsIncomeList($venues_id, $start_date, $end_date);
            if ($response['status'] == '0000') {
                $list = $response['data']['list'];
            } else {
                $this->showMessage(array('title' => "Stat::getGoodsIncomeList接口返回错误信息", 'message' => $response['msg']));
            }

            // 释放yaf的类加载机制
            $yafLoader = Yaf_Loader::getInstance();
            spl_autoload_unregister(array($yafLoader, 'autoload'));

            require_once APP_PATH . '/application/library/ext/phpexcel/PHPExcel.php';

            $phpExcel = new PHPExcel();
            $fileName = "商品收入统计_" . $start_date . '_' . $end_date . ".xlsx";
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
            $phpExcel->getActiveSheet()->getColumnDimension('B')->setWidth(25);// 设置宽度
            $phpExcel->getActiveSheet()->getColumnDimension('I')->setWidth(11);// 设置宽度
            

            $index = 1;
            $sheet->setCellValue("A{$index}", '商品类型');
            $sheet->setCellValue("B{$index}", '商品名称');
            $sheet->setCellValue("C{$index}", '销售数量');
            $sheet->setCellValue("D{$index}", '成本价');
            $sheet->setCellValue("E{$index}", '单价');
            $sheet->setCellValue("F{$index}", '现金收入');
            $sheet->setCellValue("G{$index}", '会员收入');
            $sheet->setCellValue("H{$index}", '其他收入');
            $sheet->setCellValue("I{$index}", '销售额(元)');
            $sheet->setCellValue("J{$index}", '盈利');
            $sheet->setCellValue("K{$index}", '库存');

            foreach ($list as $key => $val) {
                $index++;
                $sheet->setCellValueExplicit("A{$index}", $val['catalog_name']);
                $sheet->setCellValue("B{$index}", $val['goods_name']);
                $sheet->setCellValue("C{$index}", $val['sale_count']);
                $sheet->setCellValue("D{$index}", $val['cost_price']);
                $sheet->setCellValue("E{$index}", $val['unit_price']);
                $sheet->setCellValue("F{$index}", $val['cash_price']);
                $sheet->setCellValue("G{$index}", $val['member_card_price']);
                $sheet->setCellValue("H{$index}", $val['other_price']);
                $sheet->setCellValue("I{$index}", $val['sale_price']);
                $sheet->setCellValue("J{$index}", $val['profit']);
                $sheet->setCellValue("K{$index}", $val['stock_count']);

                unset($list[$key]); // 及时释放内存
            }

            $objWriter = PHPExcel_IOFactory::createWriter($phpExcel, 'Excel2007');
            $objWriter->save('php://output');

            // 类加载机制还回给yaf
            spl_autoload_register(array($yafLoader, 'autoload'));
            exit;

        } catch (Exception $e) {
            $this->showMessage(array('title' => "出现异常", 'message' => $e->getMessage()));
        }

    }

    /**
     * 导出商品汇总数据
     */
    public function exportGoodsDealSummaryAction()
    {
        try {
            $list = array();

            $venues_id = helper_VenuesHelper::getCurrentVenuesId();
            $start_date = trim($this->getParam('start_date', date('Y-m-d', strtotime('-3 days'))));
            $end_date = trim($this->getParam('end_date', date('Y-m-d')));

            $start_time = strtotime($start_date);
            $end_time = strtotime($end_date);
            if($end_time > $start_time + self::ONE_YEAR){
            	$this->showMessage(array('title' => "error", 'message' =>"查询时间不能超过1年" ));
            }
            
            $response = Loader::api('Stat')->getGoodsDealSummary($venues_id, $start_date, $end_date);
            if ($response['status'] == '0000') {
                $list = $response['data']['list'];
            } else {
                $this->showMessage(array('title' => "Stat::getGoodsDealSummary接口返回错误信息", 'message' => $response['msg']));
            }

            // 释放yaf的类加载机制
            $yafLoader = Yaf_Loader::getInstance();
            spl_autoload_unregister(array($yafLoader, 'autoload'));

            require_once APP_PATH . '/application/library/ext/phpexcel/PHPExcel.php';

            $phpExcel = new PHPExcel();
            $fileName = "商品交易汇总_" . $start_date . '_' . $end_date . ".xlsx";
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
            $sheet->setCellValue("A{$index}", '商品类型');
            $sheet->setCellValue("B{$index}", '销售金额');
            $sheet->setCellValue("C{$index}", '销售个数');
            $sheet->setCellValue("D{$index}", '实现盈利');

            foreach ($list as $key => $val) {
                $index++;
                $sheet->setCellValueExplicit("A{$index}", $val['catalog_name']);
                $sheet->setCellValue("B{$index}", $val['sale_price']);
                $sheet->setCellValue("C{$index}", $val['sale_count']);
                $sheet->setCellValue("D{$index}", $val['profit']);

                unset($list[$key]); // 及时释放内存
            }

            $objWriter = PHPExcel_IOFactory::createWriter($phpExcel, 'Excel2007');
            $objWriter->save('php://output');

            // 类加载机制还回给yaf
            spl_autoload_register(array($yafLoader, 'autoload'));
            exit;

        } catch (Exception $e) {
            $this->showMessage(array('title' => "出现异常", 'message' => $e->getMessage()));
        }

    }

    // -------------------------------------------------------------------------------------------------------------------
    /**
     * 商品交易明细
     * @author  gaojia
     */
    public function goodsDetailAction()
    {

        $venues_id = helper_VenuesHelper::getCurrentVenuesId();        // 场馆ID
        $now = time();
        $start_date = trim($this->getParam('startDate', date('Y-m-d')));
        $end_date = trim($this->getParam('endDate', date('Y-m-d')));

        $order_code = $this->getParam('order_code', '');        // 订单号
        $goods_name = $this->getParam('goods_name', '');        // 商品名
        $operator = $this->getParam('operator', '');        // 操作人
        $page = (int)$this->getParam("page") > 1 ? $this->getParam("page") : 1;    // 当前第几页
        $count = 20; // 不设置，默认20条每页

        $start_time = strtotime($start_date);
        $end_time = strtotime($end_date);
        if($end_time > $start_time + self::ONE_MONTH){
        	$this->showMessage(array('title' => "error", 'message' =>"查询时间不能超过31天" ));
        }
        
        $api_StatApi = new api_StatApi();
        $data = $api_StatApi->getCommodityDetail($venues_id, $start_date, $end_date, $order_code, $goods_name, $operator, $page, $count);
        $list = $data['data']['list'];
        $total_number = $data['data']['count'];        // 总条数
        $total_page = ceil($total_number / $count);        // 共几页

        $this->display('goodsDetail', [
            'startDate' => $start_date,
            'endDate' => $end_date,
            'list' => $list,
            'page' => $page,
            'total_number' => $total_number,
            'total_page' => $total_page,
            'order_code' => $order_code,
            'goods_name' => $goods_name,
            'operator' => $operator,
        ]);

    }

    /**
     * 商品出入库统计
     */
    public function goodsInventoryLogAction(){
        $venues_id = helper_VenuesHelper::getCurrentVenuesId();        // 场馆ID
        $start_date = trim($this->getParam('startDate', date('Y-m-d')));
        $end_date = trim($this->getParam('endDate', date('Y-m-d')));
        $goods_name = trim($this->getParam('goods_name'));
        $operator = trim($this->getParam('operator'));
        $page = intval($this->getParam('page')) ?: 1;

        $count = 20;
        $total_number = 0;
        $total_page = 0;
        $list = array();

        $start_time = strtotime($start_date);
        $end_time = strtotime($end_date);
        if($end_time > $start_time + self::ONE_MONTH){
        	$this->showMessage(array('title' => "error", 'message' =>"查询时间不能超过31天" ));
        }
        
        $api_StatApi = new api_StatApi();
        $data = $api_StatApi->getGoodsInventoryLog($venues_id, $start_date, $end_date, $goods_name, $operator, $page, $count);
        if ($data['status'] == '0000') {
            $list = $data['data']['list'];
            $total_number = $data['data']['count'];        // 总条数
            $total_page = ceil($total_number / $count);        // 共几页
        } else {
            $this->showMessage(array('title' => "Stat::getGoodsInventoryLog接口返回错误信息", 'message' => $data['msg']));
        }

        $this->display('goodsInventoryLog', [
            'startDate' => $start_date,
            'endDate' => $end_date,
            'list' => $list,
            'page' => $page,
            'total_number' => $total_number,
            'total_page' => $total_page,
            'goods_name' => $goods_name,
            'operator' => $operator,
        ]);
    }

    /**
     * 导出商品出入库统计
     */
    public function exportGoodsInventoryLogAction()
    {
        try {
            $list = array();

            $venues_id = helper_VenuesHelper::getCurrentVenuesId();
            $start_date = trim($this->getParam('start_date', date('Y-m-d', strtotime('-3 days'))));
            $end_date = trim($this->getParam('end_date', date('Y-m-d')));

            $start_time = strtotime($start_date);
            $end_time = strtotime($end_date);
            if($end_time > $start_time + self::ONE_MONTH){
            	$this->showMessage(array('title' => "error", 'message' =>"查询时间不能超过31天" ));
            }
            
            $response = Loader::api('Stat')->getGoodsInventoryLog($venues_id, $start_date, $end_date);
            if ($response['status'] == '0000') {
                $list = $response['data']['list'];
            } else {
                $this->showMessage(array('title' => "Stat::getGoodsInventoryLog接口返回错误信息", 'message' => $response['msg']));
            }

            // 释放yaf的类加载机制
            $yafLoader = Yaf_Loader::getInstance();
            spl_autoload_unregister(array($yafLoader, 'autoload'));

            require_once APP_PATH . '/application/library/ext/phpexcel/PHPExcel.php';

            $phpExcel = new PHPExcel();
            $fileName = "商品出入库统计_" . $start_date . '_' . $end_date . ".xlsx";
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
            
            $index = 1;
            $sheet->setCellValue("A{$index}", '时间');
            $sheet->setCellValue("B{$index}", '商品名称');
            $sheet->setCellValue("C{$index}", '进库数量');
            $sheet->setCellValue("D{$index}", '出库数量');
            $sheet->setCellValue("E{$index}", '剩余库存');
            $sheet->setCellValue("F{$index}", '操作人员');

            foreach ($list as $key => $val) {
                $index++;
                $sheet->setCellValueExplicit("A{$index}", date('Y-m-d H:i:s', $val['operate_time']));
                $sheet->setCellValue("B{$index}", $val['goods_name']);
                $sheet->setCellValue("C{$index}", $val['incr_stock_count']);
                $sheet->setCellValue("D{$index}", $val['decr_stock_count']);
                $sheet->setCellValue("E{$index}", $val['stock_count']);
                $sheet->setCellValue("F{$index}", $val['operator']);

                unset($list[$key]); // 及时释放内存
            }

            $objWriter = PHPExcel_IOFactory::createWriter($phpExcel, 'Excel2007');
            $objWriter->save('php://output');

            // 类加载机制还回给yaf
            spl_autoload_register(array($yafLoader, 'autoload'));
            exit;

        } catch (Exception $e) {
            $this->showMessage(array('title' => "出现异常", 'message' => $e->getMessage()));
        }
    }

    /**
     * 导出商品记录
     * @author gaojia
     */
    public function exportGoodsDetailLogAction()
    {

        $venues_id = helper_VenuesHelper::getCurrentVenuesId();        // 场馆ID
        $startDate = trim($this->getParam('startDate', ''));        // 开始日期
        $endDate = trim($this->getParam('endDate', ''));        // 结束日期

        if ($startDate && !helper_CoreHelper::isLawfulDate($startDate)) {
            $this->showMessage(array('title' => "error", 'message' =>"开始日期参数有误" ));
        }

        if ($endDate && !helper_CoreHelper::isLawfulDate($endDate)) {
            $this->showMessage(array('title' => "error", 'message' =>"结束日期参数有误" ));
        }

        if ($startDate && $endDate) {
            $startTime = strtotime($startDate);
            $endTime = strtotime($endDate);

            if ($startTime > $endTime) {
                $this->showMessage(array('title' => "error", 'message' =>"开始日期不能大于结束日期" ));
            }
        }
        
        $start_time = strtotime($startDate);
        $end_time = strtotime($endDate);
        if($end_time > $start_time + self::ONE_MONTH){
        	$this->showMessage(array('title' => "error", 'message' =>"查询时间不能超过31天" ));
        }       

        // 获取结算订单列表
        $params = [];
        $params['venues_id'] = $venues_id;
        $params['start_date'] = $startDate;
        $params['end_date'] = $endDate;

        $this->exportToExcel($params);

    }

    /**
     * 导出execl商品交易明细
     * @author gaojia
     * @param $params (start_date, end_date, venues_id)
     */
    private function exportToExcel($params)
    {

        $venues_id = $params['venues_id'];
        $start_date = $params['start_date'];
        $end_date = $params['end_date'];

        $api_StatApi = new api_StatApi();
        $res = $api_StatApi->getCommodityDetail($venues_id, $start_date, $end_date);

        $commodityList = [];

        if (is_array($res) && isset($res['status']) && $res['status'] == '0000') {
            $commodityList = $res['data']['list'];
            unset($res);
        }

        // 释放yaf的类加载机制
        $yafLoader = Yaf_Loader::getInstance();
        spl_autoload_unregister(array($yafLoader, 'autoload'));

        require_once APP_PATH . '/application/library/ext/phpexcel/PHPExcel.php';

        $phpExcel = new PHPExcel();
        $fileName = "商品交易明细_" . $params['start_date'] . '_' . $params['end_date'] . ".xlsx";
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
        $phpExcel->getActiveSheet()->getColumnDimension('B')->setWidth(35);// 设置宽度
        $phpExcel->getActiveSheet()->getColumnDimension('C')->setWidth(15);// 设置宽度
        $phpExcel->getActiveSheet()->getColumnDimension('D')->setWidth(15);// 设置宽度
        $phpExcel->getActiveSheet()->getColumnDimension('G')->setWidth(20);// 设置宽度

        $index = 1;
        $sheet->setCellValue("A{$index}", '消费时间');
        $sheet->setCellValue("B{$index}", '订单号');
        $sheet->setCellValue("C{$index}", '商品类型');
        $sheet->setCellValue("D{$index}", '商品名称');
        $sheet->setCellValue("E{$index}", '销售数量');
        $sheet->setCellValue("F{$index}", '单价');
        $sheet->setCellValue("G{$index}", '顾客姓名');
        $sheet->setCellValue("H{$index}", '支付方式');
        $sheet->setCellValue("I{$index}", '应付金额');
        $sheet->setCellValue("J{$index}", '实付金额');
        $sheet->setCellValue("K{$index}", '操作员');

        $pay_category = array(
            '0' => '现金',
            '1' => '会员卡',
            '2' => '银行卡',
            '3' => '次卡',
            '4' => '赠送余额支付',
            '5' => '白条',
            '6' => '储值卡',
            '7' => '趣运动',
            '8' => '微信支付',
            '9' => '团购券',
            '10' => '支付宝',
            '11' => '代金卷',
            '12' => '支票',
            '100' => '赠送会员卡',
            '999' => '多种混合的支付方式'
        );

        foreach ($commodityList AS $key => $val) {
            $index++;
            $sheet->setCellValueExplicit("A{$index}", date('Y-m-d H:i', $val['consume_time']));
            $sheet->setCellValue("B{$index}", $val['order_code']);
            $sheet->setCellValue("C{$index}", $val['catalog_name']);
            $sheet->setCellValue("D{$index}", $val['goods_name']);
            $sheet->setCellValue("E{$index}", $val['count']);

            // $sheet->setCellValue("E{$index}", implode("\n", $order['court_info']));
            // $phpExcel->getActiveSheet()->getStyle("E{$index}")->getAlignment()->setWrapText(true);

            $sheet->setCellValue("F{$index}", $val['price']);
            $sheet->setCellValue("G{$index}", $val['customer_name']);

            foreach ($pay_category AS $k => $v) {
                if ($val['pay_mode'] == $k) {
                    $sheet->setCellValue("H{$index}", $v);
                }
            }

            $sheet->setCellValue("I{$index}", $val['payable_amount']);
            $sheet->setCellValue("J{$index}", $val['apay_amount']);
            $sheet->setCellValue("K{$index}", $val['create_by']);

            unset($commodityList[$key]); // 及时释放内存
        }

        $objWriter = PHPExcel_IOFactory::createWriter($phpExcel, 'Excel2007');
        $objWriter->save('php://output');

        // 类加载机制还回给yaf
        spl_autoload_register(array($yafLoader, 'autoload'));
        exit;

    }

    
    /**
     * 导出execl营业日结
     * 
     * @author bumtime
     * @date 2016-09-12
     * @param $params (startDate, endDate, list)
     */ 
    private function exportBusiness($start_date, $end_date, $businessStat, $show_type, $cashIncome, $pay_type, $multiple_list)
    {
    	try{
    		// 释放yaf的类加载机制
    		$yafLoader = Yaf_Loader::getInstance();
    		spl_autoload_unregister(array($yafLoader, 'autoload'));
    	
    		require_once APP_PATH . '/application/library/ext/phpexcel/PHPExcel.php';
    	
    		$phpExcel = new PHPExcel();
    		$fileName = "营业日结_" . $start_date . '_' . $end_date . ".xlsx";
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
    		
    		//日结营业情况报表
    		$sheet = $phpExcel->setActiveSheetIndex(0);	
    		$phpExcel->getActiveSheet()->setTitle('日结营业情况报表');
    		
    		$sheet = $sheet->mergeCells('A1:K1');
    		$sheet->setCellValue("A1", '日结营业情况报表');
    		$sheet->getStyle('A1')->getFont()->setBold(true);
    		$sheet->getStyle('A1')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
    		
    		$sheet = $sheet->mergeCells('C2:D2');
    		$sheet->setCellValue("C2", '现款收入');
    		$sheet->getStyle('C2')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
    		
    		$sheet = $sheet->mergeCells('E2:G2');
    		$sheet->setCellValue("E2", '会员消费');
    		$sheet->getStyle('E2')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
    		
    		$sheet = $sheet->mergeCells('H2:I2');
    		$sheet->setCellValue("H2", '合作收入');
    		$sheet->getStyle('H2')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
    		
    		$sheet = $sheet->mergeCells('J2:K2');
    		$sheet->setCellValue("J2", '营业额统计');
    		$sheet->getStyle('J2')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);    		
    		
    		
    		$index = 3;
    		$sheet->setCellValue("B{$index}", '业务');
    		$sheet->setCellValue("C{$index}", '应收合计');
    		$sheet->setCellValue("D{$index}", '实收合计');
    		$sheet->setCellValue("E{$index}", '应收付款');
    		$sheet->setCellValue("F{$index}", '余额支付');
            $sheet->setCellValue("G{$index}", '赠送余额支付');
    		$sheet->setCellValue("H{$index}", '应收合计');
    		$sheet->setCellValue("I{$index}", '实收合计');
    		$sheet->setCellValue("J{$index}", '应收合计');
    		$sheet->setCellValue("K{$index}", '实收合计');
    		
    		$index = 4;
            array_push($show_type,"合计");
            foreach ($show_type as $k => $val) {
                $sheet->setCellValue("B{$index}", $val);
                $sheet->setCellValue("C{$index}", $businessStat[$k][0]['payable_amount']);
                $sheet->setCellValue("D{$index}", $businessStat[$k][0]['apay_amount']);
                $sheet->setCellValue("E{$index}", $businessStat[$k][1]['payable_amount']);
                $sheet->setCellValue("F{$index}", $businessStat[$k][1]['apay_amount']);
                $sheet->setCellValue("G{$index}", $businessStat[$k][1]['gift_amount']);
                $sheet->setCellValue("H{$index}", $businessStat[$k][2]['payable_amount']);
                $sheet->setCellValue("I{$index}", $businessStat[$k][2]['apay_amount']);
                $sheet->setCellValue("J{$index}", $businessStat[$k][3]['payable_amount']);
                $sheet->setCellValue("K{$index}", $businessStat[$k][3]['apay_amount']);
                $index++;
            }    		
    		
            //现款收入统计表
    		$sheet2 = $phpExcel->createSheet();
    		$sheet2->setTitle('现款收入统计表');
    		
    		$index = 1;
            $sheet2 = $sheet2->mergeCells('A1:N1');
            $sheet2->setCellValue("A1", '现款收入统计表');
            $sheet2->getStyle('A1')->getFont()->setBold(true);
            $sheet2->getStyle('A1')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);

            // 输出: 场地		商品		储值卡充值		次卡充值		人次票		合计
            $col = "A";
            $income_order_type = helper_StatHelper::INCOME_ORDER_TYPE;
            array_push($income_order_type, "合计");
            foreach($income_order_type AS $v) {
                $_col = chr(ord($col)+2);
                $__col = chr(ord($col)+3);
                $sheet2 = $sheet2->mergeCells("{$_col}2:{$__col}2");
                $sheet2->setCellValue("{$_col}2", $v);
                $sheet2->getStyle("{$_col}2")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
                $col = $_col;
            }

            // 输出：业务	应收合计	实收合计	应收合计	实收合计	应收合计	实收合计	应收合计	实收合计	应收合计	实收合计	应收合计	实收合计
            $start_col = "B";
            $sheet2->setCellValue("{$start_col}3", "业务");
            foreach ($income_order_type as $val){
                $_col = chr(ord($start_col)+1);
                $__col = chr(ord($start_col)+2);
                $sheet2->setCellValue("{$_col}3", "应收合计");
                $sheet2->setCellValue("{$__col}3", "实收合计");
                $start_col = $__col;
            }

            // 输出对应的数据：现金	0	11	0	0	0	0	0	0	0	0	0	11
            $index = 4;
            foreach($pay_type AS $k => $v){
                $sheet2->setCellValue("B{$index}", $v);
                $start_col = "B";
                foreach ($cashIncome[$k] AS $c){
                    $_col = chr(ord($start_col)+1);
                    $__col = chr(ord($start_col)+2);
                    $sheet2->setCellValue("{$_col}{$index}", $c['payable_amount']);
                    $sheet2->setCellValue("{$__col}{$index}", $c['apay_amount']);
                    $start_col = $__col;
                }
                $index++;
            }         
            
            //多平台汇总
            $sheet3 = $phpExcel->createSheet();
            $sheet3->setTitle('多前台汇总');
         
            $sheet3 = $sheet3->mergeCells('A1:G1');
            $sheet3->setCellValue("A1", '多前台汇总');
            $sheet3->getStyle('A1')->getFont()->setBold(true);
            $sheet3->getStyle('A1')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
            
            $index = 2;
            $sheet3->setCellValue("B{$index}", '所在区域');
            $sheet3->setCellValue("C{$index}", '营业总收入');
            $sheet3->setCellValue("D{$index}", '场地收入');
            $sheet3->setCellValue("E{$index}", '会员收入');
            $sheet3->setCellValue("F{$index}", '商品收入');
            $sheet3->setCellValue("G{$index}", '会员消费');
            
            $index = 3;
            foreach ($multiple_list as $k => $value) {
            	$sheet3->setCellValue("B{$index}", !empty($value['operate_area_name']) ? $value['operate_area_name'] : $this::DEFALULT_FRONT);
            	$sheet3->setCellValue("C{$index}", $value['amount_total']);
            	$sheet3->setCellValue("D{$index}", $value['amount_course_total']);
            	$sheet3->setCellValue("E{$index}", $value['amount_member_total']);
            	$sheet3->setCellValue("F{$index}", $value['amount_goods_total']);
            	$sheet3->setCellValue("G{$index}", $value['amount_member_pay_total']);
            	$index++;
            }

            $objWriter = PHPExcel_IOFactory::createWriter($phpExcel, 'Excel2007');
    		$objWriter->save('php://output');
    	
    		// 类加载机制还回给yaf
    		spl_autoload_register(array($yafLoader, 'autoload'));
    		exit;
    	}
    	catch (Exception $e) {
            $this->showMessage(array('title' => "出现异常", 'message' => $e->getMessage()));
        }
    }

    /**
     * 导出execl多前台收入
     *
     * @author bumtime
     * @date 2016-10-25
     * @param $params (startDate, endDate, list)
     */
    private function exportFrontList($start_date, $end_date, $list)
    {
    	
    	$order_type = helper_StatHelper::ORDER_TYPE;
    	$income_type = helper_StatHelper::INCOME_TYPE;
    	$pay_mode = helper_StatHelper::PAY_MODE;

    	// 释放yaf的类加载机制
    	$yafLoader = Yaf_Loader::getInstance();
    	spl_autoload_unregister(array($yafLoader, 'autoload'));
    	
    	require_once APP_PATH . '/application/library/ext/phpexcel/PHPExcel.php';
    	
    	$phpExcel = new PHPExcel();
    	$fileName = "多前台收入_" . $start_date . '_' . $end_date . ".xlsx";
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
    	$phpExcel->getActiveSheet()->getColumnDimension('C')->setWidth(15);// 设置宽度
    	$phpExcel->getActiveSheet()->getColumnDimension('D')->setWidth(15);// 设置宽度
    	
    	$index = 1;
    	$sheet->setCellValue("A{$index}", '收款时间');
    	$sheet->setCellValue("B{$index}", '所在区域');
    	$sheet->setCellValue("C{$index}", '订单类型');
    	$sheet->setCellValue("D{$index}", '收款类型');
    	$sheet->setCellValue("E{$index}", '应付金额');
    	$sheet->setCellValue("F{$index}", '实付金额');
    	$sheet->setCellValue("G{$index}", '支付方式');
    	$sheet->setCellValue("H{$index}", '操作员');
    	
    
    	foreach ($list as $key => $val) {
    		$index++;

    		$temp = ($val['operate_area_name'] !="") ? $val['operate_area_name'] : $this::DEFALULT_FRONT;
    		$sheet->setCellValueExplicit("A{$index}", date('Y-m-d H:i', $val['pay_time']));
    		$sheet->setCellValue("B{$index}", $temp);
    		
    		foreach ($order_type as $k => $v) {
    			if ($val['order_type'] == $k) {
    				$sheet->setCellValue("C{$index}", $v);
    			
    			}
    		}
    		
    		foreach ($income_type as $k => $v) {
    			if ($val['income_type'] == $k) {
    				$sheet->setCellValue("D{$index}", $v);
    			
    			}
    		}
    		
    		$sheet->setCellValue("E{$index}", $val['payable_amount']);
    		$sheet->setCellValue("F{$index}", $val['apay_amount']);
	
    		foreach ($pay_mode as $k => $v) {
    			if ($val['pay_mode'] == $k) {
    				$sheet->setCellValue("G{$index}", $v);
    			
    			}
    		}
    	
    		$sheet->setCellValue("H{$index}", $val['create_by']);
    	
    		unset($list[$key]); // 及时释放内存
    	}
    	
    	$objWriter = PHPExcel_IOFactory::createWriter($phpExcel, 'Excel2007');
    	$objWriter->save('php://output');
    	
    	// 类加载机制还回给yaf
    	spl_autoload_register(array($yafLoader, 'autoload'));
    	exit;
    }
}