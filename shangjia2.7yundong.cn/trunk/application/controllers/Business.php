<?php
/**
 * ddc2.0新报表 
 * 营业报表
 */
class BusinessController extends BaseController
{
    const ONE_MONTH  = 2678400; //86400*31 31天
    const ONE_YEAR   = 31622400; //366*3600*24     
    const DEFALULT_FRONT = "趣运动";//多前台区域为空时，默认赋值

    public function indexAction()
    { //默认Action

        $this->display('index', ['test' => 'OK']);
    }

    /**
     * 营业收入明细
     * 馆掌4.1.0版本增加：时间卡，人次票，人次票等收入统计
     * wiki:http://wiki.qyddev.com/pages/viewpage.action?pageId=16649265
     * @author chenchao 
     * @date 2017-04-26
     */
    public function incomeDetailV2Action()
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
        $count = $this->getParam('count', 10);
        $export = $this->getParam('export', 0);
        $mutilFrontType = $this->getParam('mutilFrontType', "");

        $startTime = strtotime($startDate);
        $endTime = strtotime($endDate." 23:59:59");

        if($endTime > $startTime + self::ONE_MONTH){
            $this->showMessage(array('title' => "error", 'message' =>"查询时间不能超过31天" ));
        }

        $venuesId = helper_VenuesHelper::getCurrentVenuesId();
        $param = [
            "venues_id" => $venuesId,
            "account_type" => (int)$accountType,
            "start_date" => $startTime,
            "end_date" => $endTime,
            "order_type" => $orderType,
            //"operator" => $orderType,
            "income_type" => $incomeType,
            "pay_mode" => $payMode,
            "order_code" => $orderCode,
            "create_by" => $operator,
            'category_id' => $catId,
            'mutil_front_type'=>$mutilFrontType        		
        ];
        if ($export != 1) {            //不导出有分页
            $param["page"] = $page;
            $param["count"] = $count;
        }
        $payableAmountTotal = $apayAmountTotal = 0;
        $payModeTotal = [];
        foreach (helper_StatHelper::PAY_MODE AS $k => $v) {
            $payModeTotal[$k] = 0;
        }
        $res = Loader::api('Stat')->getIncomeDealListV2($param);

        $list = [];
        $business_type = []; //子业务 
        $time_card_type = []; //时间卡
        $store_card_type = []; //储值卡
        $person_count_card_type = [];//人次卡
        $count_ticket_type = [];//新版人次票
        $count_card_type = []; //场次卡
        $count_ticket_old_type = []; //旧版人次票
        $goods_category = []; //卖品
  
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

        $time_card_type = isset($res['timeCardType']) ? $res['timeCardType'] : array();
        $store_card_type = isset($res['storeCardType']) ? $res['storeCardType'] : array();
        $person_count_card_type = isset($res['personCountCardType']) ? $res['personCountCardType'] : array();
        $count_ticket_type = isset($res['countTicketType']) ? $res['countTicketType'] : array();
        $count_card_type = isset($res['countCardType']) ? $res['countCardType'] : array();
        //$count_ticket_old_type = isset($res['countTicketOldType']) ? $res['countTicketOldType'] : array();
        $goods_category = isset($res['goodsCategory']) ? $res['goodsCategory'] : array();  
             
        //项目分类
        $cat_list = helper_VenuesHelper::getCurrentCatList();
        
        $business_type = array(
        		'1'=>$cat_list,
        		'2'=>[],//$goods_category,
        		'3'=>$store_card_type,
        		'4'=>$count_ticket_type,//array_merge($count_ticket_type, $count_ticket_old_type),
        		'5'=>$count_card_type,
        		'7'=>$person_count_card_type,
        		'8'=>$time_card_type,
        		'9'=>[['Code'=>90, 'Name'=>'出租'], ['Code'=>91, 'Name'=>'回收']]
        );

        $business_type_child = array(
        		'1'=>['1'=>'订单收款','4'=>'订单退款'],
        		'2'=>['1'=>'订单收款','4'=>'订单退款'],
        		'3'=>['3'=>'储值卡充值','5'=>'储值卡退费'],
        		'4'=>['40'=>'人次票销售', '41'=>'人次票退款'],
        		'5'=>['2'=>'场次卡充值'],
        		'7'=>['70'=>'人次卡开卡', '71'=>'人次票充值'],
        		'8'=>['80'=>'时间卡开卡', '81'=>'时间卡充值'],
        		'9'=>['90'=>'订单收款','91'=>'订单退款'],
        );
        
         
        $operatorArea = isset($res['operatorArea']) ? $res['operatorArea'] : [] ;
        if ($export == 1) {
            $this->exportIncomeDetail($startDate, $endDate, $list, $business_type, $operatorArea);
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
            'cat_list' => $cat_list,
            'business_type' => $business_type,
        	'business_type_child' => $business_type_child,
            'operator_area' => isset($res['operatorArea']) ? $res['operatorArea'] : [],
            'mutilFrontType' => $mutilFrontType
        ]);
    }

    /**
     * 营业日结
     * @author bumtime
     * @date 20170511
     */
    public function businessV2Action()
    {
    	$now = time();
    	$startDate = $this->getParam('startDate', date('Y-m-d', $now)." 00:00");
    	$endDate = $this->getParam('endDate', date('Y-m-d', $now)." 23:59");
    	$accountType = $this->getParam('accountType', 2);
    	$hideMemberCharge = $this->getParam('hideMemberCharge', 0);
    	$export = $this->getParam('export', 0);
    
    	$payType = [
    			'0'  => '现金', //	启用	　	　
    			'2'  => '银行卡', //	启用	　	　
    			'10' => '支付宝', //	启用	　	2015/11/28 14:26
    			'8'  => '微信', //	启用	　	2015/11/26 14:26
    			'12' => '支票', //	启用	　	2015/11/30 14:26
    			'9'  => '团购券', //	启用	　	2015/11/27 14:26
    			'11' => '代金券', //	启用	　	2015/11/29 14:26
    			'1'  => '储值卡',
    			'3'  => '次卡',
    			'4'	 => '赠送余额',
    			'7'  => '趣运动'
    	];
    	$payTypeNot = [1,3,4,7];
    	$incomeType = helper_StatHelper::INCOME_ORDER_TYPE_NEW;
    	if ($hideMemberCharge == 1) {
    		unset($incomeType[3]);
    	}
    	$start_time = strtotime($startDate);
    	$end_time = strtotime($endDate);
    	if($end_time > $start_time + self::ONE_YEAR){
    		$this->showMessage(array('title' => "error", 'message' =>"查询时间不能超过1年" ));
    	}
    
    	$cat_list  = helper_VenuesHelper::getCurrentCatList();
    	$cat_list_key = array_keys($cat_list);
    	$venuesId = helper_VenuesHelper::getCurrentVenuesId();
    	
    	//取stat数据
    	$res = Loader::api('Stat')->getDayReportNew($venuesId, $start_time, $end_time, $accountType);
    	$list = isset($res['list']) ? $res['list'] : [];
    	$multiple_list = isset($res['multiple_total']) ? $res['multiple_total'] : [];

    	 
    	//图表横坐标
    	$chartArr = [];
    	$start_time_info = strtotime(date("Y-m-d", strtotime($startDate)));
    	$end_time_info = strtotime(date("Y-m-d", strtotime($endDate)));
    	for ($i = $start_time_info; $i <= $end_time_info; $i += 86400) {
    		$chartArr[$i] = 0;
    	}
    	//场地支付方式合计
    	$courseList = array_fill_keys($cat_list_key, array_fill_keys(array_keys($payType), ['payable_amount'=>0, 'apay_amount'=>0, 'gift_amount'=>0]));
    	//人次票支付方式合计
    	$ticketList = array_fill_keys(array_keys($payType), ['payable_amount'=>0, 'apay_amount'=>0, 'gift_amount'=>0]);
    	//卖品支付方式合计
    	$sellGoodsList = array_fill_keys(array_keys($payType), ['payable_amount'=>0, 'apay_amount'=>0, 'gift_amount'=>0]);
    	//租赁支付方式合计
    	$rentGoodsList =  array_fill_keys(array_keys($payType), ['payable_amount'=>0, 'apay_amount'=>0, 'gift_amount'=>0]);
    	//总计
    	$totalList  = [
    			'total'		=> 0,
    			'cash_total'=> 0,
    			'card_total'=> 0
    	];
    	//会员卡支付方式合计
    	$cardList = [
    			1=>array_fill_keys(array_keys($payType), ['payable_amount'=>0, 'apay_amount'=>0, 'gift_amount'=>0]),//储值卡
    			2=>array_fill_keys(array_keys($payType), ['payable_amount'=>0, 'apay_amount'=>0, 'gift_amount'=>0]),//场次卡
    			3=>array_fill_keys(array_keys($payType), ['payable_amount'=>0, 'apay_amount'=>0, 'gift_amount'=>0]),//人次卡
    			4=>array_fill_keys(array_keys($payType), ['payable_amount'=>0, 'apay_amount'=>0, 'gift_amount'=>0]) //时间卡	
    	];
		//会员卡统计
    	$cardTotal = [
    			1=>0,//储值卡
    			2=>0,//场次卡
    			3=>0,//人次卡
    			4=>0 //时间卡
    	];
    	//各项总数汇总
    	$typeTotal = [
    			'courseTotal'		=> array_fill_keys($cat_list_key, 0),
    			'ticketTotal'		=> 0,
    			'sellGoodsTotal'	=> 0,
    			'rentGoodsTotal' 	=> 0,
    			'cardTotal' 		=> $cardTotal
    	];
   
    	$payListTotal =  array_fill_keys(array_keys($payType), ['payable_amount'=>0, 'apay_amount'=>0, 'gift_amount'=>0]);//各个支付方式总计
 
    	foreach ($list AS $l) {

    		 //旧订单数据，包括1场地收入，2商品收入，3会员充值，4人次票收入，5次卡充值, 41新版人次票，7人次卡，8时间卡， 9租赁 
    		switch ($l['income_type']) {
    			case 2: //商品   				
	    				$sellGoodsList[$l['pay_mode']]['payable_amount'] += $l['payable_amount'];
	    				$sellGoodsList[$l['pay_mode']]['apay_amount'] += $l['apay_amount'];
	    				$sellGoodsList[1]['gift_amount'] += $l['gift_amount'];
	    				
	    				$typeTotal['sellGoodsTotal'] += $l['apay_amount'] + $l['gift_amount'];	    				
	    				break;
    			case 9: //租赁
    					$rentGoodsList[$l['pay_mode']]['payable_amount'] += $l['payable_amount'];
	    				$rentGoodsList[$l['pay_mode']]['apay_amount'] += $l['apay_amount'];
	    				$rentGoodsList[1]['gift_amount'] += $l['gift_amount'];
	    				
	    				$typeTotal['rentGoodsTotal']+= $l['apay_amount'] + $l['gift_amount'];	
    					break;
    			case 3://储值卡充值
    					$cardList[1][$l['pay_mode']]['payable_amount'] += $l['payable_amount'];
    					$cardList[1][$l['pay_mode']]['apay_amount'] += $l['apay_amount'];
    					 
    					$typeTotal['cardTotal'][1] += 0; //$l['apay_amount']+ $l['gift_amount'];
    					break;
    			case 4://人次票
    			case 41:
    					if($l['pay_mode'] != 7){
	    					$ticketList[$l['pay_mode']]['payable_amount'] += $l['payable_amount'];
	    					$ticketList[$l['pay_mode']]['apay_amount'] += $l['apay_amount'];
	    					$ticketList[1]['gift_amount'] += $l['gift_amount'];
	    					
	    					$typeTotal['ticketTotal'] += $l['apay_amount']+ $l['gift_amount'];
    					}
    					break;  
    			case 5://场次卡
    					$cardList[2][$l['pay_mode']]['payable_amount'] += $l['payable_amount'];
    					$cardList[2][$l['pay_mode']]['apay_amount'] += $l['apay_amount'];
    					
    					$typeTotal['cardTotal'][2] += $l['apay_amount']+ $l['gift_amount'];
    					break;
    			case 7://人次卡
    					$cardList[3][$l['pay_mode']]['payable_amount'] += $l['payable_amount'];
    					$cardList[3][$l['pay_mode']]['apay_amount'] += $l['apay_amount'];    
    					
    					$typeTotal['cardTotal'][3] += $l['apay_amount']+ $l['gift_amount'];
    					break; 
    			case 8://时间卡
    					$cardList[4][$l['pay_mode']]['payable_amount'] += $l['payable_amount'];
    					$cardList[4][$l['pay_mode']]['apay_amount'] += $l['apay_amount'];
    					
    					$typeTotal['cardTotal'][4] += $l['apay_amount']+ $l['gift_amount'];
    					break;   
    			//其他是场次，场次由1+项目ID组成标识		
    			default:
    				$pre_tip = substr($l['income_type'], 0, 1);
    				$tip = substr($l['income_type'], 1, strlen($l['income_type']));
    				
    				if($pre_tip == "1"){			  
    				   if (!in_array($tip, array_keys($cat_list)) && $l['pay_mode'] != 7){	
    				       
    				        if(isset($courseList[$tip])){
    				            $courseList[$tip][$l['pay_mode']]['payable_amount'] += $l['payable_amount'];
    				            $courseList[$tip][$l['pay_mode']]['apay_amount'] += $l['apay_amount'];
    				            $courseList[$tip][1]['gift_amount'] += $l['gift_amount']; 
    				        }else{
    				            //初始化
    				            $courseList[$tip] = array_fill_keys(array_keys($payType), ['payable_amount'=>0, 'apay_amount'=>0, 'gift_amount'=>0]);
    				            $typeTotal['courseTotal'][0] = 0;
    				            //统计当次的值
    				            $courseList[$tip][$l['pay_mode']]['payable_amount'] += $l['payable_amount'];
    				            $courseList[$tip][$l['pay_mode']]['apay_amount'] += $l['apay_amount'];
    				            $courseList[$tip][1]['gift_amount'] += $l['gift_amount'];        
    				        }
    				        	
    				        if(isset($typeTotal['courseTotal'][$tip])){
    				            $typeTotal['courseTotal'][$tip] += $l['apay_amount']+ $l['gift_amount'];
    				        }
    				    }else{
        					foreach ($cat_list as $key=>$c){
        						if($tip == $key && $l['pay_mode'] != 7){
    	    						$courseList[$key][$l['pay_mode']]['payable_amount'] += $l['payable_amount'];
    	    						$courseList[$key][$l['pay_mode']]['apay_amount'] += $l['apay_amount'];
    	    						$courseList[$key][1]['gift_amount'] += $l['gift_amount'];
    	    						
    	    						$typeTotal['courseTotal'][$key] += $l['apay_amount']+ $l['gift_amount'];
    	    					}//兼容删掉旧项目后的数据问题,直接赋值消费项目为0进行统计，显示为其他
        					}
    				    }
    				}    				
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

    		//按支付方式统计总额
    		if(isset($payListTotal[$l['pay_mode']])){
    			
    			$payListTotal[$l['pay_mode']]['payable_amount'] += $l['payable_amount'];
    			$payListTotal[$l['pay_mode']]['apay_amount'] += $l['apay_amount'];
    			$payListTotal[$l['pay_mode']]['gift_amount'] += $l['gift_amount'];	
    			
    			if(!in_array($l['pay_mode'], $payTypeNot)){
    				$totalList['cash_total'] += $l['apay_amount'] + $l['gift_amount'];
    			}
    			if(in_array($l['pay_mode'], [1])){
    				$totalList['card_total'] += $l['apay_amount'] + $l['gift_amount'];
    			}
    			//过滤趣运动价，后面用结算价,过滤掉储值卡充值
    			if($l['pay_mode'] != 7 && $l['income_type'] != 3 )
    				$totalList['total'] += $l['apay_amount'] + $l['gift_amount'];
    		}    		
    	}
    	 
    	//取趣运动总价
    	$venues_income = $ticket_income = 0;
    	$venues_income_settle = $ticket_income_settle = 0;
    	$params = [
    			'venues_id'		=> $venuesId,
    			'start_time'	=> $start_time,
    			'end_time'		=> $end_time,
    			'type'          => $accountType
    	];
    	$total_price = Loader::api('Orders')->getOrderSettlePriceByDate($params);
  
    	//场次
    	if(isset($total_price['field_type'])){
    		foreach ($total_price['field_type'] as $v){
    			$venues_income += $v['goods_amount'];
    			$venues_income_settle += $v['settle_amount'];
    			//场次,换成趣运动结算价
    			if(isset($courseList[$v['cat_id']])){
	    			$courseList[$v['cat_id']][7]['payable_amount'] += $v['goods_amount'];
	    			$courseList[$v['cat_id']][7]['apay_amount'] += $v['settle_amount'];
	    				
	    			$typeTotal['courseTotal'][$v['cat_id']] += $v['settle_amount'];
    			}
    		}
    	} 
    	//人次票
    	if(isset($total_price['person_type'])){
    		foreach ($total_price['person_type'] as $v){
    			$ticket_income += $v['goods_amount'];
    			$ticket_income_settle += $v['settle_amount'];
    			
    			$ticketList[7]['payable_amount'] += $v['goods_amount'];
	    		$ticketList[7]['apay_amount'] += $v['settle_amount'];
	    		$typeTotal['ticketTotal'] += $v['settle_amount'];
    		}
    	}
    	 
    	//按天明细，添加到图表
    	if(isset($total_price['income_list'])){
    		foreach ($total_price['income_list'] as $v){
    			foreach ($chartArr as $kc=>$vc){
	    			 if($kc == $v['book_date']){
	    			 	$chartArr[$kc] += $v['settle_amount'];
	    			 }
	    		}
    		}
    	}
    	
    	$totalList['total'] += $venues_income_settle + $ticket_income_settle;
    	$payListTotal[7]['payable_amount'] = $venues_income + $ticket_income;
    	$payListTotal[7]['apay_amount'] = $venues_income_settle + $ticket_income_settle;

 
    	//导出
    	if ($export == 1) {
    		$this->exportBusiness( date("Y-m-d", strtotime($startDate)) , date("Y-m-d", strtotime($endDate)), $courseList, $sellGoodsList, $rentGoodsList, $ticketList, $cardList, $payListTotal, $typeTotal, $cat_list, $totalList);
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
    			'chartX' => $chartX,
    			'chartY' => array_values($chartArr),
    			'multiple_list' => $multiple_list,
    			'courseList' => $courseList,
    			'ticketList' => $ticketList,
    			'sellGoodsList' => $sellGoodsList,
    			'rentGoodsList' => $rentGoodsList,
    			'catList' => $cat_list,
    			'payTypeNot' => $payTypeNot,
    			'cardList' => $cardList,
    			'payListTotal' => $payListTotal,
    			'totalList' => $totalList,
    			'typeTotal' => $typeTotal	
    	]);
    }

    /**
     * 总店统计汇总
     * @author bumtime
     * @date 20170513
     */
    public function totalV2Action()
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

    	$list = [];
    	$incomeTotal = 0;
    	$memberIncomeTotal = 0;
    	$pieTotal = $pieIncomeTotal = [];
    	
    	$venuesList = helper_VenuesHelper::getCurrentVenuesList(); //['17929'=>'终极柿贰零', '17926'=>'仙德瑞拉场馆'];
    	foreach ($venuesList AS $venuesId => $name) {
    		
    		$incomeVenueTotal = 0;//每个场馆营业收入
    		$venues_income = $ticket_income = 0;
    		//取趣运动相关售价与结算价
	    	$params = [
	    			'venues_id'		=> $venuesId,
	    			'start_time'	=> $start_time,
	    			'end_time'		=> strtotime($endDate." 23:59:59"),
	    			'type'          => $account_type
	    	];
	    	$total_price = Loader::api('Orders')->getOrderSettlePriceByDate($params);	
	    	
	    	//场次
			if(isset($total_price['field_type'])){
				foreach ($total_price['field_type'] as $v){
					
					$venues_income += $v['settle_amount'];
				}
			}

			//人次票
			if(isset($total_price['person_type'])){
				foreach ($total_price['person_type'] as $v){
					$ticket_income += $v['settle_amount'];
				}
			}
			//输出值
    		$list[$venuesId] = [
    				'venues_name'		=>	$name,
    				'venues_id'			=>	$venuesId,
    				'venues_income'		=>	$venues_income,
    				'goods_income'		=>	0,
    				'ticket_income'		=>	$ticket_income,
    				'store_card_income' =>	0,
    				'count_card_income'	=>	0,
    				'rent_goods_income'	=>	0,
    				'person_card_income'=>	0,
    				'time_card_income'	=>	0,
    				'sell_total'		=>	$venues_income + $ticket_income
    		];
    		$incomeVenueTotal += $venues_income + $ticket_income;
    		$incomeTotal += $venues_income + $ticket_income;
    		$pieTotal[$venuesId] = ['value' => $incomeVenueTotal, 'name' => $name];
    		$pieIncomeTotal[$venuesId][0] = ['value' => $incomeVenueTotal, 'name' => '场地收入'];
    		$pieIncomeTotal[$venuesId][1] = ['value' => 0, 'name' => '卖品收入'];
    		$pieIncomeTotal[$venuesId][2] = ['value' => $ticket_income, 'name' => '售票收入'];   		
    	}
     
    	
    	//取馆掌相关数据
    	$end_time = strtotime($endDate." 23:59:59");
    	$statList = Loader::api('Stat')->getTotalReportNew(implode(',', array_keys($venuesList)), $start_time, $end_time, $account_type);
 
    	foreach ($statList AS $k => $v) {

    		$list[$v['venues_id']]['venues_income'] += $v['venues_income'];
    		$list[$v['venues_id']]['goods_income'] += $v['goods_income'];
    		$list[$v['venues_id']]['ticket_income'] += $v['ticket_income'];
    		$list[$v['venues_id']]['rent_goods_income'] += $v['rent_goods_income'];
    		
    		$list[$v['venues_id']]['store_card_income'] += $v['store_card_income'];
    		$list[$v['venues_id']]['count_card_income'] += $v['count_card_income'];
    		$list[$v['venues_id']]['person_card_income'] += $v['person_card_income'];
    		$list[$v['venues_id']]['time_card_income'] += $v['time_card_income'];   		
    		
    		$income = $v['venues_income'] + $v['goods_income'] + $v['ticket_income'] + $v['rent_goods_income'];
    		$list[$v['venues_id']]['sell_total'] += $income;
    
    		$incomeTotal += $income;
    		$memberIncomeTotal += $v['store_card_income'] + $v['count_card_income'] + $v['person_card_income'] + $v['time_card_income'];
    		$pieTotal[$v['venues_id']]['value'] += $income;
    		$pieIncomeTotal[$v['venues_id']][0]['value'] += $v['venues_income'];
    		$pieIncomeTotal[$v['venues_id']][1]['value'] += $v['goods_income'] + $v['rent_goods_income'];
    		$pieIncomeTotal[$v['venues_id']][2]['value'] += $v['ticket_income'];
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
     * 人次票统计
     * 
     * @author bumtime
     * @date 20170516
     * 
     */
    public function timeTicketV2Action()
    {  	 
    	$venues_id = helper_VenuesHelper::getCurrentVenuesId();
    	$start_date = trim($this->getParam('startDate', date('Y-m-d')));
    	$end_date = trim($this->getParam('endDate', date('Y-m-d')));
    	$export = $this->getParam('export', 0);
    	
    	$start_time = strtotime($start_date);
    	$end_time = strtotime($end_date. " 23:59:59");
    	if ($end_time > $start_time + self::ONE_MONTH) {
    		$this->showMessage(array('title' => "error", 'message' => "查询时间不能超过31天"));
    	}
    
    	$data = Loader::api('Stat')->getTimeTicketReportNew($venues_id, $start_time, $end_time);
    	
    	$cat_list = helper_VenuesHelper::getCurrentCatList();
    
    	$total_payable_amount = $total_apay_amount = 0;   	
    	$pay_mode_total = array_fill_keys(array_keys(helper_StatHelper::PAY_MODE),0);
    	
    	$list = isset($data['list']) && !empty($data['list']) ? $data['list'] : [] ;
    	if(!empty($data['priceSummary']) && is_array($data['priceSummary'])){
    		foreach($data['priceSummary'] AS $key=>$d){
    			$total_payable_amount += $d['payable_amount'];
    			$total_apay_amount += $d['apay_amount'];
    			$pay_mode_total[$key] = $d['apay_amount'];
    			$pay_mode_total[4] += $d['gift_amount'];
    		}	
    	}
    	
    	if ($export == 1) {
    		$this->exportTimeTicket($start_date, $end_date, $list, $pay_mode_total, $total_payable_amount, $total_apay_amount, $cat_list);
    		exit;
    	}   	 
     
    	$this->display('timeTicke', [
    				'startDate' => $start_date,
    				'endDate' => $end_date,
    				'list' =>  $list,
    				'total_payable_amount' => $total_payable_amount,
    				'total_apay_amount' => $total_apay_amount,
    				'pay_mode_total' => $pay_mode_total,
    				'cat_list' => $cat_list
    		]);    	 
    }
    
    /**
     * 导出人次票统计
     *  
     * @author bumtime
     * @date 20170516
     * 
     */
    private function exportTimeTicket($start_date, $end_date, $list, $pay_mode_total, $total_payable_amount, $total_apay_amount, $cat_list)
    {
    	$pay_mod_list = helper_StatHelper::PAY_MODE;
    
    	// 释放yaf的类加载机制
    	$yafLoader = Yaf_Loader::getInstance();
    	spl_autoload_unregister(array($yafLoader, 'autoload'));
    
    	require_once APP_PATH . '/application/library/ext/phpexcel/PHPExcel.php';
    
    	$phpExcel = new PHPExcel();
    	$fileName = "人次票统计_" . $start_date . '_' . $end_date . ".xlsx";
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
    	$sheet->mergeCells('A1:F1');
    	$sheet->mergeCells('A2:F2');
    	$sheet->getColumnDimension('A')->setWidth(40);// 设置宽度
    	$sheet->getColumnDimension('B')->setWidth(20);// 设置宽度

    	for ($i=1;$i<=3;$i++){
    		$sheet->getStyle("A{$i}")->applyFromArray(
    				array(
    					'alignment' => array(
    						'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER
    						)
    				)
    		);
    	}
    	$sheet->setCellValue("A1", "应收合计：". number_format($total_payable_amount, 2). " 实收合计：". number_format($total_apay_amount, 2));
    	$price_deal = '';
    	foreach ( $pay_mode_total AS $k => $v) {
    		$price_deal .= '' . $pay_mod_list[$k] . ' : ' . number_format($v, 2) . ' ';
    	}
    
    	$sheet->setCellValue("A2", $price_deal);
    
    	$index = 3;
    	$sheet->setCellValue("A{$index}", '消费项目');
    	$sheet->setCellValue("B{$index}", '人次票类型');
    	$sheet->setCellValue("C{$index}", '单价');
    	$sheet->setCellValue("D{$index}", '数量');
    	$sheet->setCellValue("E{$index}", '应收金额');
    	$sheet->setCellValue("F{$index}", '实收金额');
    
    	foreach ($list as $key => $val) {
    		$index++;
    		
    		$str = "";
    		if(empty($val['consume_category'])){
    			$str = "全项目通用";
    		}else{
    			$cat_temp = explode(",", $val['consume_category']);
    			foreach($cat_temp as $ct){
    				foreach($cat_list as $k=>$info){
    					if("[".$k."]" == $ct)
    						$str .= $info.",";
    				}
    			}
    			$str = substr($str, 0, -1);
    		}
    		
    		$sheet->setCellValue("A{$index}", $str);
    		$sheet->setCellValue("B{$index}", $val['goods_name']);
    		$sheet->setCellValue("C{$index}", $val['price']);
    		$sheet->setCellValue("D{$index}", $val['count']);
    		$sheet->setCellValue("E{$index}", $val['payable_amount']);
    		$sheet->setCellValue("F{$index}", $val['apay_amount']. ($val['discount'] ? '(订单优惠'. $val['discount'] .'元)' : ''));
    		/* $sheet->getStyle("F{$index}")->applyFromArray(
    				array(
    						'alignment' => array(
    								'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT
    						)
    				)
    		); */
    
    		unset($list[$key]); // 及时释放内存
    	}
    
     	$objWriter = PHPExcel_IOFactory::createWriter($phpExcel, 'Excel2007');
    	$objWriter->save('php://output'); 
    
    	// 类加载机制还回给yaf
    	spl_autoload_register(array($yafLoader, 'autoload'));
    	exit;
    }
    
 
    /**
     * 导出收入明细
     */
    private function exportIncomeDetail($starDate, $endDate, $list, $business_type, $operator_area)
    {
    	ini_set("memory_limit", "800M");
    	set_time_limit(0);
    	$cat_list = helper_VenuesHelper::getCurrentCatList();

    	$tlist =helper_StatHelper::INCOME_TYPE_NEW;
    	
    	$pay_mode_list = helper_StatHelper::PAY_MODE;   	
    	
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
        $sheet->setCellValue("A{$index}", '收款时间');
        $sheet->setCellValue("B{$index}", '消费时间');
        $sheet->setCellValue("C{$index}", '前台');
        $sheet->setCellValue("D{$index}", '业务');       
        $sheet->setCellValue("E{$index}", '子业务');
        $sheet->setCellValue("F{$index}", '业务操作');
        $sheet->setCellValue("G{$index}", '支付方式');
        $sheet->setCellValue("H{$index}", '应付金额');
        $sheet->setCellValue("I{$index}", '实付金额');
        $sheet->setCellValue("J{$index}", '交易明细');
        $sheet->setCellValue("K{$index}", '顾客信息');        
        $sheet->setCellValue("L{$index}", '订单号');
        $sheet->setCellValue("M{$index}", '操作员');

        
        $sheet->getColumnDimension('A')->setWidth(20);// 设置宽度
        $sheet->getColumnDimension('B')->setWidth(20);// 设置宽度
        $sheet->getColumnDimension('C')->setWidth(15);// 设置宽度
        $sheet->getColumnDimension('E')->setWidth(20);// 设置宽度
        $sheet->getColumnDimension('F')->setWidth(20);// 设置宽度
        $sheet->getColumnDimension('J')->setWidth(50);// 设置宽度
        $sheet->getColumnDimension('K')->setWidth(50);// 设置宽度
        $sheet->getColumnDimension('L')->setWidth(25);// 设置宽度

        foreach ($list as $key => $val) {
            $index++;
            $sheet->setCellValueExplicit("A{$index}", date("Y-m-d H:i:s", $val['pay_time']));
            $sheet->setCellValueExplicit("B{$index}", date("Y-m-d H:i:s", $val['consume_time']));
            
            $front_type = "";
            foreach($operator_area AS $value){
            	if ($val['mutil_front_type'] == $value['Code']){
            		$front_type = $value['Name'];
            		break;
            	}
            }  
            $sheet->setCellValue("C{$index}", $front_type);
            
            $order_type_list = helper_StatHelper::ORDER_TYPE_NEW;
            $order_type =  isset($order_type_list[$val['order_type']]) ? $order_type_list[$val['order_type']] : '';
            $sheet->setCellValue("D{$index}", $order_type);
            
            $cat_info = "";
            if(isset($business_type[$val['order_type']]) && !empty($business_type[$val['order_type']])){
            	foreach($business_type[$val['order_type']] AS $key=>$value){
            		if ($val['order_type'] == 1){
            			$cat_value = $key;
            			$cat_name = $value;
            		} else {
            			$cat_value = $value['Code'];
            			$cat_name = $value['Name'];
            		}
            		if ($val['category_id'] == $cat_value){
            			$cat_info = $cat_name;
            			break;
            		}
            	}
            }
            $sheet->setCellValue("E{$index}", $cat_info);

           	$income_type = isset($tlist[$val['income_type']]) ? $tlist[$val['income_type']] : "";
            $sheet->setCellValue("F{$index}", $income_type);
            

            $sheet->setCellValue("G{$index}",  $pay_mode_list[$val['pay_mode']]);
            $sheet->setCellValue("H{$index}", $val['payable_amount']);
            $sheet->setCellValue("I{$index}", $val['pay_mode'] == 3 ? 0 : $val['apay_amount']);
            
            $detail ="" ;
            if(!empty($val['detail'])){
            	//相同的人次票合并显示
            	$result = array();      		
            	foreach($val['detail'] as $val1){
            		foreach($val1 as $val2){
	            		if(empty($val2['begin_time'])){
	            			$key = $val2['name'];
	            			if(!isset($result[$key])){
	            				$result[$key] = $val2;
	            			}else{
	            				$result[$key]['count'] += 1;
	            			}
	            		}
            		}
            	}
            	if(!empty($result)){
            		foreach($result as $d){
            			if($val['order_type'] == 9 && $val['income_type']==90){
            				$detail = "{$d['name']} 租金{$d['price']}(元) 押金".intval(($val['apay_amount']-$d['price']*$d['count'])/$d['count'])."(元) x{$d['count']}";
            			}elseif($val['order_type'] == 9 && $val['income_type']==91){
            				$detail = "{$d['name']} 押金".abs($val['apay_amount'])."(元) x{$d['count']}";
            			}else{
            				$detail = "{$d['name']} {$d['price']}(元) x{$d['count']}";
            			}
            		}
            	}
            	else{
            		foreach($val['detail'] as $val_all){
            			foreach($val_all as $d){
            				if(!empty($d['begin_time'])){
            					//场地详情
            					$detail = $d['name'].' '.date('Y-m-d  H:i',$d['begin_time']).'-'.date('H:i',$d['end_time']).' '.$d['price'].'(元)';
            				}
            			}
            		}
            	}
            
            }else if($val['order_type'] == 7){
            	$detail =  "充值次数:".$val['value_info']."次";
            }else if($val['order_type'] == 8){
            	$detail = "续费时间:". floor($val['value_info']/3600/24)."天";
            }else if($val['order_type'] == 3  && $val['apay_amount']>0 ){
            	$detail = "余额充值:".$val['apay_amount']."元"." ";
            	$detail .= "赠送余额充值:".$val['extra_fee']."元";
            }else if($val['order_type'] == 3  && $val['apay_amount'] < 0){
            	$detail = "余额退费:".$val['apay_amount']."元"." ";
            	$detail .= "赠送余额退费:".$val['extra_fee']."元";
            }else if($val['order_type'] == 5 ){
            	$detail = "充值金额:".$val['apay_amount']."元";
            } 
            $sheet->setCellValue("J{$index}", $detail);
            $sheet ->getStyle("J{$index}")->getAlignment()->setWrapText(true);//自动换行
            
            $customer_info = "";
            if (!empty($val['customer_name'])){
            	$customer_info .= '姓名:'.$val['customer_name']." ";
            }
            if (!empty($val['customer_phone'])){
            	$customer_info .= '联系方式:'.$val['customer_phone']." ";
            }
            if (!empty($val['customer_no'])){
            	$customer_info .= '卡号:'.$val['customer_no'];
            }
            $sheet->setCellValue("K{$index}", $customer_info);
            $sheet ->getStyle("K{$index}")->getAlignment()->setWrapText(true);//自动换行
            
            $sheet->setCellValue("L{$index}", $val['order_code']);
            $sheet->setCellValue("M{$index}", $val['create_by']);

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
     * 导出execl营业日结
     *
     * @author bumtime
     * @date 2016-09-12
     * @param $params (startDate, endDate, list)
     */
    private function exportBusiness($startDate, $endDate, $courseList, $sellGoodsList, $rentGoodsList, $ticketList, $cardList, $payListTotal, $typeTotal, $catList, $totalList)
    {
    	try{

    		// 释放yaf的类加载机制
    		$yafLoader = Yaf_Loader::getInstance();
    		spl_autoload_unregister(array($yafLoader, 'autoload'));
    		 
    		require_once APP_PATH . '/application/library/ext/phpexcel/PHPExcel.php';
    	
    		 
    		$phpExcel = new PHPExcel();
    		$fileName = "营业日结_" . $startDate . '_' . $endDate . ".xlsx";
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
    		
    
    		$sheet = $sheet->mergeCells('A1:N1');
    		$sheet->setCellValue("A1", '日结营业情况报表');
    		$sheet->getStyle('A1')->getFont()->setBold(true);
    		$sheet->getStyle('A1')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
    	
    		$sheet = $sheet->mergeCells('A2:B3');
    		$sheet->setCellValue("A2", '业务');
    		$sheet->getStyle('A2')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
    		$sheet->getStyle('A2')->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
    		
    		$sheet = $sheet->mergeCells('C2:C3');
    		$sheet->setCellValue("C2", '营业额');
    		$sheet->getStyle('C2')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
    
    		$sheet = $sheet->mergeCells('D2:J2');
    		$sheet->setCellValue("D2", '现款');
    		$sheet->getStyle('D2')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
    	 
    		$sheet = $sheet->mergeCells('K2:L2');
    		$sheet->setCellValue("K2", '储值卡');
    		$sheet->getStyle('K2')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
    	
    		$sheet = $sheet->mergeCells('M2:N2');
    		$sheet->setCellValue("M2", '趣运动');
    		$sheet->getStyle('M2')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
    	
    		$index = 3;
    		$sheet->setCellValue("D{$index}", '现金');
    		$sheet->setCellValue("E{$index}", '银行卡');
    		$sheet->setCellValue("F{$index}", '支付宝');
    		$sheet->setCellValue("G{$index}", '微信');
    		$sheet->setCellValue("H{$index}", '支票');
    		$sheet->setCellValue("I{$index}", '团购券');
    		$sheet->setCellValue("J{$index}", '代金券');
    		$sheet->setCellValue("K{$index}", '余额');
    		$sheet->setCellValue("L{$index}", '赠送余额');
    		$sheet->setCellValue("M{$index}", '销售');
    		$sheet->setCellValue("N{$index}", '结算');
    
    		
    		$sheet = $sheet->mergeCells('A4:A8');
    		$sheet->setCellValue("A4", '场地');
    		$sheet->getStyle('A4')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
    		$sheet->getStyle('A4')->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
    		
    		$sheet->setCellValue("A9", '售票');  
    		$sheet->getStyle('A9')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
    		$sheet->getStyle('A9')->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
    		
    		$sheet = $sheet->mergeCells('A10:A11');
    		$sheet->setCellValue("A10", '卖品');
    		$sheet->getStyle('A10')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
    		$sheet->getStyle('A10')->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
    		
    		$sheet = $sheet->mergeCells('A12:A15');
    		$sheet->setCellValue("A12", '会员充值');
    		$sheet->getStyle('A12')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
    		$sheet->getStyle('A12')->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
    		
    		$sheet = $sheet->mergeCells('A16:B16');
    		$sheet->setCellValue("A16", '合计');
    		$sheet->getStyle('A16')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
    		$sheet->getStyle('A16')->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
 
    		   		
    		$index = 4;
    		foreach ($courseList as $k => $val) {
    			$sheet->setCellValue("B{$index}", $catList[$k]);
    			$sheet->setCellValue("C{$index}", $typeTotal['courseTotal'][$k]);	
    			$sheet->setCellValue("D{$index}", $val[0]['apay_amount']);
    			$sheet->setCellValue("E{$index}", $val[2]['apay_amount']);
    			$sheet->setCellValue("F{$index}", $val[10]['apay_amount']);
    			$sheet->setCellValue("G{$index}", $val[8]['apay_amount']);
    			$sheet->setCellValue("H{$index}", $val[12]['apay_amount']);
    			$sheet->setCellValue("I{$index}", $val[9]['apay_amount']);
    			$sheet->setCellValue("J{$index}", $val[11]['apay_amount']);

    			$sheet->setCellValue("K{$index}", $val[1]['apay_amount']);
    			$sheet->setCellValue("L{$index}", $val[1]['gift_amount']);
    			$sheet->setCellValue("M{$index}", $val[7]['payable_amount']);
    			$sheet->setCellValue("N{$index}", $val[7]['apay_amount']);
	    		
	    		$index ++;
    		}
    		//人次票
    		$index =9;
    		$sheet->setCellValue("B{$index}", '人次票');
    		$sheet->setCellValue("C{$index}", $typeTotal['ticketTotal']);
    		$sheet->setCellValue("D{$index}", $ticketList[0]['apay_amount']);
    		$sheet->setCellValue("E{$index}", $ticketList[2]['apay_amount']);
    		$sheet->setCellValue("F{$index}", $ticketList[10]['apay_amount']);
    		$sheet->setCellValue("G{$index}", $ticketList[8]['apay_amount']);
    		$sheet->setCellValue("H{$index}", $ticketList[12]['apay_amount']);
    		$sheet->setCellValue("I{$index}", $ticketList[9]['apay_amount']);
    		$sheet->setCellValue("J{$index}", $ticketList[11]['apay_amount']);	
    		$sheet->setCellValue("K{$index}", $ticketList[1]['apay_amount']);
    		$sheet->setCellValue("L{$index}", $ticketList[1]['gift_amount']);
    		$sheet->setCellValue("M{$index}", $ticketList[7]['payable_amount']);
    		$sheet->setCellValue("N{$index}", $ticketList[7]['apay_amount']);

    		$index =10;
    		//卖品 售卖
    		$sheet->setCellValue("B{$index}", '售卖');
    		$sheet->setCellValue("C{$index}", $typeTotal['sellGoodsTotal']);
    		$sheet->setCellValue("D{$index}", $sellGoodsList[0]['apay_amount']);
    		$sheet->setCellValue("E{$index}", $sellGoodsList[2]['apay_amount']);
    		$sheet->setCellValue("F{$index}", $sellGoodsList[10]['apay_amount']);
    		$sheet->setCellValue("G{$index}", $sellGoodsList[8]['apay_amount']);
    		$sheet->setCellValue("H{$index}", $sellGoodsList[12]['apay_amount']);
    		$sheet->setCellValue("I{$index}", $sellGoodsList[9]['apay_amount']);
    		$sheet->setCellValue("J{$index}", $sellGoodsList[11]['apay_amount']);
    		$sheet->setCellValue("K{$index}", $sellGoodsList[1]['apay_amount']);
    		$sheet->setCellValue("L{$index}", $sellGoodsList[1]['gift_amount']);
    		$sheet->setCellValue("M{$index}", $sellGoodsList[7]['payable_amount']);
    		$sheet->setCellValue("N{$index}", $sellGoodsList[7]['apay_amount']);
    		
    		$index =11;
    		//卖品 租赁
    		$sheet->setCellValue("B{$index}", '租赁');
    		$sheet->setCellValue("C{$index}", $typeTotal['rentGoodsTotal']);
    		$sheet->setCellValue("D{$index}", $rentGoodsList[0]['apay_amount']);
    		$sheet->setCellValue("E{$index}", $rentGoodsList[2]['apay_amount']);
    		$sheet->setCellValue("F{$index}", $rentGoodsList[10]['apay_amount']);
    		$sheet->setCellValue("G{$index}", $rentGoodsList[8]['apay_amount']);
    		$sheet->setCellValue("H{$index}", $rentGoodsList[12]['apay_amount']);
    		$sheet->setCellValue("I{$index}", $rentGoodsList[9]['apay_amount']);
    		$sheet->setCellValue("J{$index}", $rentGoodsList[11]['apay_amount']);
    		$sheet->setCellValue("K{$index}", $rentGoodsList[1]['apay_amount']);
    		$sheet->setCellValue("L{$index}", $rentGoodsList[1]['gift_amount']);
    		$sheet->setCellValue("M{$index}", $rentGoodsList[7]['payable_amount']);
    		$sheet->setCellValue("N{$index}", $rentGoodsList[7]['apay_amount']);
    		
    		$index =12;
    		//会员卡
    		$sheet->setCellValue("B{$index}", '储值卡');
    		$sheet->setCellValue("C{$index}", $typeTotal['cardTotal'][1]);
    		$sheet->setCellValue("D{$index}", $cardList[1][0]['apay_amount']);
    		$sheet->setCellValue("E{$index}", $cardList[1][2]['apay_amount']);
    		$sheet->setCellValue("F{$index}", $cardList[1][10]['apay_amount']);
    		$sheet->setCellValue("G{$index}", $cardList[1][8]['apay_amount']);
    		$sheet->setCellValue("H{$index}", $cardList[1][12]['apay_amount']);
    		$sheet->setCellValue("I{$index}", $cardList[1][9]['apay_amount']);
    		$sheet->setCellValue("J{$index}", $cardList[1][11]['apay_amount']);
    		$sheet->setCellValue("K{$index}", $cardList[1][1]['apay_amount']);
    		$sheet->setCellValue("L{$index}", $cardList[1][1]['gift_amount']);
    		$sheet->setCellValue("M{$index}", $cardList[1][7]['payable_amount']);
    		$sheet->setCellValue("N{$index}", $cardList[1][7]['apay_amount']);
    		
    		$index =13;
    		//会员卡
    		$sheet->setCellValue("B{$index}", '场次卡');
    		$sheet->setCellValue("C{$index}", $typeTotal['cardTotal'][2]);
    		$sheet->setCellValue("D{$index}", $cardList[2][0]['apay_amount']);
    		$sheet->setCellValue("E{$index}", $cardList[2][2]['apay_amount']);
    		$sheet->setCellValue("F{$index}", $cardList[2][10]['apay_amount']);
    		$sheet->setCellValue("G{$index}", $cardList[2][8]['apay_amount']);
    		$sheet->setCellValue("H{$index}", $cardList[2][12]['apay_amount']);
    		$sheet->setCellValue("I{$index}", $cardList[2][9]['apay_amount']);
    		$sheet->setCellValue("J{$index}", $cardList[2][11]['apay_amount']);
    		$sheet->setCellValue("K{$index}", $cardList[2][1]['apay_amount']);
    		$sheet->setCellValue("L{$index}", $cardList[2][1]['gift_amount']);
    		$sheet->setCellValue("M{$index}", $cardList[2][7]['payable_amount']);
    		$sheet->setCellValue("N{$index}", $cardList[2][7]['apay_amount']);
    		
    		$index =14;
    		//会员卡
    		$sheet->setCellValue("B{$index}", '时间卡');
    		$sheet->setCellValue("C{$index}", $typeTotal['cardTotal'][4]);
    		$sheet->setCellValue("D{$index}", $cardList[4][0]['apay_amount']);
    		$sheet->setCellValue("E{$index}", $cardList[4][2]['apay_amount']);
    		$sheet->setCellValue("F{$index}", $cardList[4][10]['apay_amount']);
    		$sheet->setCellValue("G{$index}", $cardList[4][8]['apay_amount']);
    		$sheet->setCellValue("H{$index}", $cardList[4][12]['apay_amount']);
    		$sheet->setCellValue("I{$index}", $cardList[4][9]['apay_amount']);
    		$sheet->setCellValue("J{$index}", $cardList[4][11]['apay_amount']);
    		$sheet->setCellValue("K{$index}", $cardList[4][1]['apay_amount']);
    		$sheet->setCellValue("L{$index}", $cardList[4][1]['gift_amount']);
    		$sheet->setCellValue("M{$index}", $cardList[4][7]['payable_amount']);
    		$sheet->setCellValue("N{$index}", $cardList[4][7]['apay_amount']);
    		
    		$index =15;
    		//会员卡
    		$sheet->setCellValue("B{$index}", '人次卡');
    		$sheet->setCellValue("C{$index}", $typeTotal['cardTotal'][3]);
    		$sheet->setCellValue("D{$index}", $cardList[3][0]['apay_amount']);
    		$sheet->setCellValue("E{$index}", $cardList[3][2]['apay_amount']);
    		$sheet->setCellValue("F{$index}", $cardList[3][10]['apay_amount']);
    		$sheet->setCellValue("G{$index}", $cardList[3][8]['apay_amount']);
    		$sheet->setCellValue("H{$index}", $cardList[3][12]['apay_amount']);
    		$sheet->setCellValue("I{$index}", $cardList[3][9]['apay_amount']);
    		$sheet->setCellValue("J{$index}", $cardList[3][11]['apay_amount']);
    		$sheet->setCellValue("K{$index}", $cardList[3][1]['apay_amount']);
    		$sheet->setCellValue("L{$index}", $cardList[3][1]['gift_amount']);
    		$sheet->setCellValue("M{$index}", $cardList[3][7]['payable_amount']);
    		$sheet->setCellValue("N{$index}", $cardList[3][7]['apay_amount']);
    		
    		
    		$index =16;
    		//合计
    		$sheet->setCellValue("C{$index}", $totalList['total']);
    		$sheet->setCellValue("D{$index}", $payListTotal[0]['apay_amount']);
    		$sheet->setCellValue("E{$index}", $payListTotal[2]['apay_amount']);
    		$sheet->setCellValue("F{$index}", $payListTotal[10]['apay_amount']);
    		$sheet->setCellValue("G{$index}", $payListTotal[8]['apay_amount']);
    		$sheet->setCellValue("H{$index}", $payListTotal[12]['apay_amount']);
    		$sheet->setCellValue("I{$index}", $payListTotal[9]['apay_amount']);
    		$sheet->setCellValue("J{$index}", $payListTotal[11]['apay_amount']);
    		   		
    		$sheet->setCellValue("K{$index}", $payListTotal[1]['apay_amount']);
    		$sheet->setCellValue("L{$index}", $payListTotal[1]['gift_amount']);
    		$sheet->setCellValue("M{$index}", $payListTotal[7]['payable_amount']);
    		$sheet->setCellValue("N{$index}", $payListTotal[7]['apay_amount']);
    			
    
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
    
}