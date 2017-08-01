<?php

/**
 * 场地相关统计页
 */
class VenuestatController extends BaseController
{
    const ONE_MONTH = 2678400; //86400*31 31天
    public $time_Ticke_pay_mod_map = array(
        0   => 'cash',
        1   => 'member_card',
        2   => 'bank_card',
        3   => 'ci_card',
    	4	=> 'gift_remain_pay_amount',
        7   => 'quyundong',
        8   => 'weixin_pay',
        9   => 'groupbuy_coupon',
        10  => 'alipay',
        11  => 'cash_coupon',
        12  => 'cheque',
        // 999 => 'multi_pay'
    );

    public function indexAction()
    { //默认Action

        $this->display('index', ['test' => 'OK']);
    }
    
    /**
     * 多项目统计表
     */
    public function venueConsumeAction()
    {
        $now = time();
        $startDate = $this->getParam('startDate', date('Y-m-d', $now));
        $endDate = $this->getParam('endDate', date('Y-m-d', $now));
        $accountType = $this->getParam('accountType', 2);
        $export = $this->getParam('export', 0);
        $start_time = strtotime($startDate);
        $end_time = strtotime($endDate. " 23:59:59");
        if ($end_time > $start_time + self::ONE_MONTH) {
            $this->showMessage(array('title' => "error", 'message' => "查询时间不能超过31天"));
        }

        $venuesId = helper_VenuesHelper::getCurrentVenuesId();
        $payMode = helper_StatHelper::PAY_MODE;

        $cat_list = helper_VenuesHelper::getCurrentCatList();
        
        $consumeList = [];
        $initConsumeList = [
            'category_name' => '',
            'order_count' => 0,
            'payable_amount' => 0,
            'apay_amount' => 0,
            'back_amount' => 0,
            'cut_amount' => 0,
            'pay_mode_list' => array_fill_keys(array_keys($payMode), 0),
        ];
        $list = Loader::api('Stat')->getVenueConsumeReport($venuesId, $start_time, $end_time, $accountType);

        foreach ($list AS $l) {
            $c = isset($consumeList[$l['category_id']]) ? $consumeList[$l['category_id']] : $initConsumeList;
            $c['category_name'] = $l['category_id'] != '' ? $cat_list[$l['category_id']]  : $l['category_name'];
            $c['order_count'] += $l['order_count'];
            //$c['payable_amount'] += $l['payable_amount'];
            
            if ($l['pay_mode'] == 3) {
            	$l['apay_amount'] = 0;
            }
            if($l['pay_status'] != 3){
            	$c['payable_amount'] += $l['payable_amount'];
            	$c['apay_amount'] += $l['apay_amount'];
            	
             	if($l['pay_mode'] == 1){
                    $c['pay_mode_list'][4] += $l['gift_amount'];
                    $c['pay_mode_list'][$l['pay_mode']] += $l['apay_amount'] - $l['gift_amount'];
                }else{
                    $c['pay_mode_list'][$l['pay_mode']] += $l['apay_amount'];
                }
            }
            else{
            	$c['back_amount'] += $l['apay_amount'];
            }
            $c['cut_amount'] += $l['payable_amount'] - $l['apay_amount'];
            //不算次卡支付
           /*  if ($l['pay_mode'] != 3) {
                if ($l['pay_status'] != 3) {
                    $c['apay_amount'] += $l['apay_amount'];
                } else {
                    $c['back_amount'] += $l['apay_amount'];
                }
                $c['cut_amount'] += $l['payable_amount'] - $l['apay_amount'];
            }
            if ($l['pay_status'] != 3) {
                if($l['pay_mode'] == 1){
                    $c['pay_mode_list'][4] += $l['gift_amount'];
                    $c['pay_mode_list'][$l['pay_mode']] += $l['apay_amount'] - $l['gift_amount'];
                }else{
                    $c['pay_mode_list'][$l['pay_mode']] += $l['apay_amount'];
                }
            } */
            $consumeList[$l['category_id']] = $c;
        }

        if ($export == 1) {
            $this->exportVenueConsume($startDate, $endDate, $consumeList,$payMode);
            exit;
        }

        $this->display('venueConsume', [
            'startDate' => $startDate,
            'endDate' => $endDate,
            'accountType' => $accountType,
            'payMode' => $payMode,
            'consumeList' => $consumeList,
        ]);
    }

    /**
     * 导出多项目统计表
     * @param $starDate
     * @param $endDate
     * @param $list
     * @throws PHPExcel_Exception
     * @throws PHPExcel_Reader_Exception
     */
    private function exportVenueConsume($starDate, $endDate, $list,$payMode)
    {
        // 释放yaf的类加载机制
        $yafLoader = Yaf_Loader::getInstance();
        spl_autoload_unregister(array($yafLoader, 'autoload'));

        require_once APP_PATH . '/application/library/ext/phpexcel/PHPExcel.php';

        $phpExcel = new PHPExcel();
        $fileName = "多项目统计表_" . $starDate . '_' . $endDate . ".xlsx";
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
        $sheet->mergeCells("A1:B1");
        $sheet->setCellValue("A1", '项目分类');
        $sheet->getStyle('A1')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
        $sheet->mergeCells("C1:F1");
        $sheet->setCellValue("C1", '收入金额');
        $sheet->getStyle('C1')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
        $endCode = chr(ord("F") + count($payMode));
        $sheet->mergeCells("G1:".$endCode."1");
        $sheet->setCellValue("G1", '收款方式');
        $sheet->getStyle('G1')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);

        $sheet->getColumnDimension('D')->setWidth(12);// 设置宽度
        
        
        $index = 2;
        $sheet->setCellValue("A{$index}", '消费项目');
        $sheet->setCellValue("B{$index}", '订单数量');
        $sheet->setCellValue("C{$index}", '应收金额');
        $sheet->setCellValue("D{$index}", '优惠/赠送(-)');
        $sheet->setCellValue("E{$index}", '退款退费(-)');
        $sheet->setCellValue("F{$index}", '实收金额');
        $asciiCode = ord("G");
        foreach($payMode AS $m){
            $sheet->setCellValue(chr($asciiCode) . "{$index}", $m);
            $asciiCode++;
        }

        foreach ($list as $key => $val) {
            $index++;
            $sheet->setCellValue("A{$index}", $val['category_name']);
            $sheet->setCellValue("B{$index}", $val['order_count']);
            $sheet->setCellValue("C{$index}", $val['payable_amount']);
            $sheet->setCellValue("D{$index}", $val['cut_amount']);
            $sheet->setCellValue("E{$index}", $val['back_amount']);
            $sheet->setCellValue("F{$index}", $val['apay_amount']);
            $asciiCode = ord("G");
            foreach($payMode AS $k => $m){
                $sheet->setCellValue(chr($asciiCode) . "{$index}", $val['pay_mode_list'][$k]);
                $asciiCode++;
            }

            unset($list[$key]); // 及时释放内存
        }

        $objWriter = PHPExcel_IOFactory::createWriter($phpExcel, 'Excel2007');
        $objWriter->save('php://output');

        // 类加载机制还回给yaf
        spl_autoload_register(array($yafLoader, 'autoload'));
        exit;
    }

    /**
     * 人次票统计
     */
    public function timeTicketAction()
    {
        try {
            $venues_id = helper_VenuesHelper::getCurrentVenuesId();
            $start_date = trim($this->getParam('startDate', date('Y-m-d')));
            $end_date = trim($this->getParam('endDate', date('Y-m-d')));
            $page = intval($this->getParam('page')) ?: 1;
            $count = 20;
            
            $start_time = strtotime($start_date);
	        $end_time = strtotime($end_date. " 23:59:59");
	        if ($end_time > $start_time + self::ONE_MONTH) {
	            $this->showMessage(array('title' => "error", 'message' => "查询时间不能超过31天"));
	        }

            $data = Loader::api('Stat')->getTimeTicketReport($venues_id, $start_date, $end_date);
            
            $cat_list = helper_VenuesHelper::getCurrentCatList();
            $total_page = !empty($data['count']) &&  $data['count'] > 0 ? ceil($data['count'] / $count) : 0; // 共几页

            $total_payable_amount = $total_apay_amount = 0;
            $pay_mode_total = array_fill_keys(array_keys(helper_StatHelper::PAY_MODE),0);
            if(!empty($data['priceSummary']) && is_array($data['priceSummary'])){
                foreach($data['priceSummary'] AS $d){
                    $total_payable_amount += $d['payable_amount'];
                    $total_apay_amount += $d['apay_amount'];
                    $pay_mode_total[$d['pay_mode']] = $d['apay_amount'];
                }
            }
          
			 $list = !empty($data['list']) && is_array($data['list']) ? $data['list'] : [] ;
			/*if(!empty($data['list']) && is_array($data['list'])){
				foreach($data['list'] as $value){
					if(!isset($list[$value['goods_id']])){
						$temp = [
								"consume_category" => $value['consume_category'],
								"goods_name" => $value['goods_name'],
								"count" => 1,
								"price" => $value['price'],
								"payable_amount" => $value['payable_amount'],
								"apay_amount" => $value['apay_amount'],
								"discount" =>  $value['discount']
						];
						
						$list[$value['goods_id']] = $temp;

					}
					else{
						$list[$value['goods_id']]['count'] ++ ;
						$list[$value['goods_id']]['payable_amount'] += $value['payable_amount'] ;
						$list[$value['goods_id']]['apay_amount'] += $value['apay_amount'] ;
						$list[$value['goods_id']]['discount'] +=  $value['discount'];
					}
					
				}
			}  */
			 
            $this->display('timeTicke', [
                'startDate' => $start_date,
                'endDate' => $end_date,
                'list' => $list,
                'total_payable_amount' => $total_payable_amount,
                'total_apay_amount' => $total_apay_amount,
                'pay_mode_total' => $pay_mode_total,
                'cat_list' => $cat_list,
                'total_page' => $total_page,
                'page' => $page,
                'total_number' => isset($data['count']) ? $data['count'] : 0,
                'pay_mod_map' => $this->time_Ticke_pay_mod_map
            ]);
        } catch (Exception $e) {
            $this->showMessage(array('title' => "出现异常", 'message' => $e->getMessage()));
        }
    }

    /**
     * 导出人次票统计
     * @throws Exception
     * @throws PHPExcel_Exception
     * @throws PHPExcel_Reader_Exception
     */
    public function exportTimeTicketAction()
    {
        $venues_id = helper_VenuesHelper::getCurrentVenuesId();
        $start_date = trim($this->getParam('startDate', date('Y-m-d')));
        $end_date = trim($this->getParam('endDate', date('Y-m-d')));

        $data = Loader::api('Stat')->getTimeTicketReport($venues_id, $start_date, $end_date);
    
        $list = !empty($data['list']) && is_array($data['list']) ? $data['list'] : [] ;
        /* if(!empty($data['list']) && is_array($data['list'])){
        	foreach($data['list'] as $value){
        		if(!isset($list[$value['goods_id']])){
        			$temp = [
        					"consume_category" => $value['consume_category'],
        					"goods_name" => $value['goods_name'],
        					"count" => 1,
        					"price" => $value['price'],
        					"payable_amount" => $value['payable_amount'],
        					"apay_amount" => $value['apay_amount'],
        					"discount" =>  $value['discount']
        			];
        
        			$list[$value['goods_id']] = $temp;
        
        		}
        		else{
        			$list[$value['goods_id']]['count'] ++ ;
        			$list[$value['goods_id']]['payable_amount'] += $value['payable_amount'] ;
        			$list[$value['goods_id']]['apay_amount'] += $value['apay_amount'] ;
        			$list[$value['goods_id']]['discount'] +=  $value['discount'];
        		}
        			
        	}
        } */
  
        $total_payable_amount = $total_apay_amount = 0;
        $pay_mode_total = array_fill_keys(array_keys(helper_StatHelper::PAY_MODE),0);
        $price_summary = $data['priceSummary'];   
        if(!empty($data['priceSummary']) && is_array($data['priceSummary'])){
        	foreach($data['priceSummary'] AS $d){
        		$total_payable_amount += $d['payable_amount'];
        		$total_apay_amount += $d['apay_amount'];
        		$pay_mode_total[$d['pay_mode']] = $d['apay_amount'];
        	}
        }
   
        $cat_list = helper_VenuesHelper::getCurrentCatList();
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
        $sheet->getColumnDimension('A')->setWidth(30);// 设置宽度
        $sheet->getColumnDimension('B')->setWidth(30);// 设置宽度
        $sheet->getColumnDimension('C')->setWidth(20);// 设置宽度
        $sheet->getColumnDimension('D')->setWidth(20);// 设置宽度
        $sheet->getColumnDimension('E')->setWidth(30);// 设置宽度
        $sheet->getColumnDimension('F')->setWidth(30);// 设置宽度
        for ($i=1;$i<3;$i++){
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
            $sheet->setCellValue("A{$index}", !empty($cat_list[$val['consume_category']]) ? $cat_list[$val['consume_category']] : '');
            $sheet->setCellValue("B{$index}", $val['goods_name']);
            $sheet->setCellValue("C{$index}", $val['price']);
            $sheet->setCellValue("D{$index}", $val['count']);
            $sheet->setCellValue("E{$index}", $val['payable_amount']);
            $sheet->setCellValue("F{$index}", $val['apay_amount']. ($val['discount'] ? '(订单优惠'. $val['discount'] .'元)' : ''));
            $sheet->getStyle("F{$index}")->applyFromArray(
                array(
                    'alignment' => array(
                        'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT
                    )
                )
            );

            unset($list[$key]); // 及时释放内存
        }

        $objWriter = PHPExcel_IOFactory::createWriter($phpExcel, 'Excel2007');
        $objWriter->save('php://output');

        // 类加载机制还回给yaf
        spl_autoload_register(array($yafLoader, 'autoload'));
        exit;
    }


}

