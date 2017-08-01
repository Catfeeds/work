<?php
/**
 * 球局-活动
 */
class ActivityController extends BaseController
{
	/**
	 * 活动首页
	 * @author chenchao
	 * @date 2017-02-12
	 */
    public function indexAction() { //默认Action
		$this->display('index');
    }

    /**
	 * 活动列表
	 * @author chenchao
	 * @date 2017-02-12
	 */
    public function courtJoinListAction() { //默认Action
		//读取正在进行中的球局
		$page = intval($this->getParam("page", 1));
		$status = $this->getParam("status", 0);
		$start_time = $this->getParam("start_time", "-1");
		$end_time = $this->getParam("end_time", "-1");
		
		//球馆商ID
		$supplier_id	= helper_LoginHelper::getCurrentSuppliersId();
		//读取关连用户信息
		$user = Loader::modelSlave('SuppliersCourtJoinUsers')->getUserInfo($supplier_id);
		if (empty($user)){
			//跳转绑定流程
			$this->errorOutput(baf_ErrorCode::ERR_NO_USER);
			exit;
		}

		//如果有传开始与结束时间
		if (!empty($start_time) && !empty($end_time) && $start_time > 0 && $end_time > 0){
			$param = [
			    'suppliers_id' 	=>	$supplier_id,
				'status' 	=>	$status,
				'page' 	=>	$page,
				'start_time' => strtotime($start_time),
				'end_time' => (strtotime($end_time)+86399)
			];
		} else {
			$param = [
				'suppliers_id' 	=>	$supplier_id,
				'status' 	=>	$status,
				'page' 	=>	$page
			];
		}
        $res = Loader::api('Orders')->getCourtJoinList($param);

        if (is_array($res) && $res['status'] == '0000'){
        	$cat_list  = helper_VenuesHelper::getCurrentCatList();
        	if (isset($res['data']['list'])){
	        	foreach ($res['data']['list'] as $key => $value) {
	        		foreach ($cat_list as $k => $cv) {
	        			if ($k == $value['cat_id']){
	        				$res['data']['list'][$key]['cat_name'] = $cv;
	        				break;
	        			}
	        		}
	        		if (isset($value['book_date'])){
	        			$res['data']['list'][$key]['book_date'] = date('Y-m-d', $value['book_date']);
	        		}
	        		if ($status == 2){
	        			$res['data']['list'][$key]['start_time'] = date('H:i', $value['start_time']);
	        			$res['data']['list'][$key]['end_time'] = date('H:i', ($value['end_time'] ));
	        		} else {
	        			$res['data']['list'][$key]['start_time'] = date('Y-m-d H:i', $value['start_time']);
	        			$res['data']['list'][$key]['end_time'] = date('Y-m-d H:i', ($value['end_time'] ));
	        		}
	        		
	        	}
        	}
        }

        echo json_encode($res);
        exit;
    }

    /**
	 * 球局详情
	 * @author chenchao
	 * @date 2017-02-12
	 */
    public function courtJoinInfoAction() {
		//读取正在进行中的球局
		$cj_order_id = intval($this->getParam("cj_order_id", 0));

		$param = [
			'cj_order_id' 	=>	$cj_order_id
		];
        $res = Loader::api('Orders')->getCourtJoinInfo($param);
        echo json_encode($res);
        exit;
    }

    /**
	 * 发起球局
	 * @author chenchao
	 * @date 2017-02-13
	 */
    public function addCourtJoinAction() {
		//验证数是否合法
		$validateHelper = new validate_Helper();
        if ($this->getRequest()->isPost()) { //$this->getRequest()->isPost()
             // 创建验证器进行验证
            $validate = Loader::validate('Activity');
            $param = $this->getParams();
            //球馆商ID
			$supplier_id	= helper_LoginHelper::getCurrentSuppliersId();
			//读取关连用户信息
			$user = Loader::modelSlave('SuppliersCourtJoinUsers')->getUserInfo($supplier_id);
			if (!empty($user)){
				$param['user_id'] = $user['user_id'];
	            $param['phone'] = $user['phone'];
	            $param['order_type'] = '13';
	            $param['start_time'] = strtotime($param['start_time']);
	            $param['end_time'] = (strtotime($param['end_time']) - 3600); //结束时间减1个小时
	            //test
	            /*
	            $param['course_id'] = '24691';
	            $param['start_time'] = strtotime('2017-02-22 13:00');
	            $param['end_time'] = (strtotime('2017-02-22 14:00') - 3600);
	            $param['field_capacity'] = '6';
	            $param['unit_price'] = '11';
	            $param['is_refund'] = '1';
	        	$param['week_cycle'] = '0';
	        	$param['cat_id'] = '11';
				$param['description'] = '123';*/
	           
	            $params =  $validate->checkParams($param, $validateHelper);
	            
	            $errors = $validateHelper->getErrors();
	            //var_dump($errors);exit;
	            if(empty($errors)){
	            	$order_api = new api_OrdersApi();
			        $res = $order_api->addCourtJoin($params);
			        echo json_encode($res);
			        exit;
	            } else {
	            	$this->errorOutput(baf_ErrorCode::ERR_NO_USER, $errors);
					exit;
	            }
			} else {
				$this->errorOutput(baf_ErrorCode::ERR_NO_USER);
				exit;
			}
        } else{
        	//项目分类
			$cat_list  = helper_VenuesHelper::getCurrentCatList();
			$courseList = $serviceTimeList = $cat_list_new = [];
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
						for($i=$start;$i<=$end;$i++){
							$time_arr[] = $i<10 ? "0".$i.$time_start : $i.$time_start;
						}
						$serviceTimeList[$key][] = implode(',',$time_arr);
					}
				}
			}
			//该场馆的场地数据
			$info['course_list'] = $courseList;
			//该场馆的营业时间数据
			$info['time_list'] = $serviceTimeList;
			//该场馆的项目分类
			$info['cat_list'] = $cat_list_new;

			$this->successOutput($info);
        }
	
    }

    /**
	 * 修改球局信息
	 * @author chenchao
	 * @date 2017-02-13
	 */
    public function editCourtJoinAction() {
    	$cj_order_id = intval($this->getParam("cj_order_id", 0));
        if ($this->getRequest()->isPost()) {//
            $param = $this->getParams();
            //球馆商ID
			$supplier_id	= helper_LoginHelper::getCurrentSuppliersId();
			//读取关连用户信息
			//$user = Loader::modelSlave('SuppliersCourtJoinUsers')->getUserInfo($supplier_id);
            //$param['user_id'] = $user['user_id'];
            //$param['phone'] = $user['phone'];
            $param['cj_order_id'] = $cj_order_id;//'59922'
            /* test
            $param['course_id'] = '24690,24691';
            $param['field_capacity'] = '6';
            $param['description'] = '235e123ee';*/
            if ($param['field_capacity'] < 1 || empty($param['course_id']) || $param['cj_order_id'] < 1){
            	$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, '参数不能为空');
				exit;
            }
            $res = Loader::api('Orders')->updateCourtJoin($param);
            echo json_encode($res);
        } else{
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
						for($i=$start;$i<=$end;$i++){
							$time_arr[] = $i<10 ? "0".$i.$time_start : $i.$time_start;
						}
						$serviceTimeList[$key][] = implode(',',$time_arr);
					}
				}
			}
			//该场馆的场地数据
			$info['course_list'] = $courseList;
			//该场馆的营业时间数据
			$info['time_list'] = $serviceTimeList;
			//该场馆的项目分类
			$info['cat_list'] = $cat_list_new;

			$param = [
				'cj_order_id' 	=>	$cj_order_id
			];
	        $res = Loader::api('Orders')->getCourtJoinShare($param);
	        if (is_array($res) && $res['status'] == '0000'){
				$info['court_join_info'] = $res['data']['court_join_info'];
				$this->successOutput($info);
			} else {
				echo json_encode($res);
				exit;
			}	
        }
	
    }
    
    /**
	 * 取消球局
	 * @author chenchao
	 * @date 2017-02-13
	 */
    public function cancelCourtJoinAction() {
    	$cj_order_id = intval($this->getParam("cj_order_id", 0));
		$param = [
			'cj_order_id' 	=>	$cj_order_id
		];
        $res = Loader::api('Orders')->cancelCourtJoin($param);
        echo json_encode($res);
        exit;
    }

    /**
	 * 读取商家趣运动用户信息
	 * @author chenchao
	 * @date 2017-02-14
	*/
    public function userAction() {
    	//球馆商ID
		$supplier_id	= helper_LoginHelper::getCurrentSuppliersId();
		//读取关连用户信息
		$user = Loader::modelSlave('SuppliersCourtJoinUsers')->getUserInfo($supplier_id);
		if (empty($user)){
			$this->errorOutput(baf_ErrorCode::ERR_NO_USER);
			exit;
		} else {
			$this->successOutput($user);
		}
    }

    /**
	 * 商家与用户关联绑定
	 * @author chenchao
	 * @date 2017-02-14
	*/
    public function bindUserAction() {
    	//球馆商ID
		$supplier_id	= helper_LoginHelper::getCurrentSuppliersId();
		$phone = $this->getParam("phone", '');
		$sms_code = $this->getParam("sms_code", '');
		if (empty($phone) || empty($sms_code)){
			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, '参数不能为空');
			exit;
		}
		//读取关连用户信息
		$user = Loader::modelMaster('SuppliersCourtJoinUsers')->getUserInfo($supplier_id);
		if (empty($user)){
			//登录
			$info = Loader::api('Users')->phoneQuckLogin(array('phone'=>$phone, 'sms_code'=>$sms_code));

			if (is_array($info) && $info['status'] == '0000' && isset($info['user_id'])){
				//绑定
				$now = time();
				$params = [
					'suppliers_id' => $supplier_id,
					'user_id'    => $info['user_id'],
					'phone'  => $phone,
					'add_time' => $now,
					'last_update_time' => $now
				];

				$ins_id = Loader::modelMaster('SuppliersCourtJoinUsers')->insert($params);
				if ($ins_id){
					$user['user_id'] = $info['user_id'];
					$user['phone'] = $phone;
					$this->successOutput($user);
				} else {
					$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, '绑定失败');
					exit;
				}
			} else {
				$msg = '验证手机号出错';
				if (is_array($info) && isset($info['msg'])){
					$msg = $info['msg'];
				}
				$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, $msg);
				exit;
			}
		} else {
			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, '不能重复绑定');
			exit;
		}
    }

    /**
	 * 发送验证码
	 * @author chenchao
	 * @date 2017-02-14
	*/
    public function sendSmsAction() {
    	$phone = $this->getParam("phone", '');
    	if (!empty($phone)){
    		$res = Loader::api('Qyd')->sendSmsCode($phone, '1');
    		if ($res){
    			$this->successOutput();
				exit;
    		} else {
    			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, '验证码发送失败');
				exit;
    		}
    	} else {
    		$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, '手机号码不能为空');
			exit;
    	}
    }

	/**
	 * 活动结算
	 * @author chenchao
	 * @date 2017-02-19
	 */
	public function amountAction()
	{
		$this->display('amount');
	}

	/**
	 * 活动结算导出
	 * @author chenchao
	 * @date 2017-02-19
	 */
	public function exportAmountListAction()
	{
		//商家ID
		$suppliers_id	= helper_LoginHelper::getCurrentSuppliersId();
		if(!$suppliers_id) {
			$this->errorOutput(baf_ErrorCode::ERR_PARAM);
		}

		$params = $this->getParams();
		if (empty($params['start_time']) || empty($params['end_time'])){
			$this->errorOutput(baf_ErrorCode::ERR_PARAM);
		}
		$params['status'] = '3';
		$params['page'] = '1';
		$params['suppliers_id'] = $suppliers_id;
		$params['start_time'] = strtotime($params['start_time']);
		$params['end_time'] = strtotime($params['end_time']) + 86399;
		//读取列表
		$res = Loader::api('Orders')->getCourtJoinList($params);
		
		$page_count = 0;
		$data = array();
        if (is_array($res) && $res['status'] == '0000'){
        	if (isset($res['status']['data']['page_count']) && $res['status']['data']['page_count'] > 1){
        		$page_count = $res['status']['data']['page_count'];
        	}
        	if (isset($res['status']['data']['list']) && !empty($res['status']['data']['list'])){
        		$page_count = $res['status']['data']['page_count'];
        		$data = $res['status']['data']['list'];
        	}
        }
        
        if ($page_count > 1){
        	for ($i=2; $i <= $page_count; $i++) { 
        		$params['page'] = $i;
        		$list = Loader::api('Orders')->getCourtJoinList($param);
        		if (isset($list['status']['data']['list']) && !empty($list['status']['data']['list'])){
	        		$data = array_merge($data, $list['status']['data']['list']);
	        	}
        	}
        }
        $cat_list  = helper_VenuesHelper::getCurrentCatList();
		// 释放yaf的类加载机制
    	$yafLoader = Yaf_Loader::getInstance();
    	spl_autoload_unregister(array($yafLoader, 'autoload'));
    	
    	require_once APP_PATH.'/application/library/ext/phpexcel/PHPExcel.php';
    	 
    	$phpExcel = new PHPExcel();
    	$fileName = "结算订单_".date('Y-m-d', $params['start_time']).'_'.date('Y-m-d', $params['end_time']).".xls";
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

        $phpExcel->getActiveSheet()->mergeCells('A1:M1');
        $phpExcel->getActiveSheet()->mergeCells('A2:M2');
        for ($i=1;$i<3;$i++){
            $phpExcel->getActiveSheet()->getStyle("A{$i}")->applyFromArray(
                array(
                    'alignment' => array(
                        'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER
                    )
                )
            );
        }

        $sheet->setCellValue("A1", '活动结算列表');
        $sheet->setCellValue("A2", '日期：'. date('m月d日', $params['start_time']).'-'.date('m月d日', $params['end_time']));

    	$index = 3;
    	$sheet->setCellValue("A{$index}", '项目');
    	$sheet->setCellValue("B{$index}", '日期');
    	$sheet->setCellValue("C{$index}", '参与人数');
    	$sheet->setCellValue("D{$index}", '人均费用');
    	$sheet->setCellValue("E{$index}", '活动收入');
    	$sheet->setCellValue("F{$index}", '结算金额');
                                                   
    	foreach ($data as $key => $val) {
    		$index++;
    		$join_num = $val['join_num'] - $val['left_join_num'];
    		$cat_name = '';
	        	
	        foreach ($cat_list as $k => $cv) {
	        	if ($k == $val['cat_id']){
	        		$cat_name = $cv;
	        		break;
	        	}
	        }
        	
    		$sheet->setCellValue("A{$index}", $cat_name);
    		$sheet->setCellValue("B{$index}", date('Y-m-d', $val['book_date']));
    		$sheet->setCellValue("C{$index}", $join_num);
    		$sheet->setCellValue("D{$index}", $val['unit_price']);
    		$sheet->setCellValue("E{$index}", ($val['unit_price'] * $join_num));
    		$sheet->setCellValue("F{$index}", $val['settle_amount']);

    		unset($data[$key]); // 及时释放内存
    	}

        $objWriter = PHPExcel_IOFactory::createWriter($phpExcel, 'Excel2007');
    	$objWriter->save('php://output');
    	
    	// 类加载机制还回给yaf
    	spl_autoload_register(array($yafLoader, 'autoload'));
    	exit;
	}


	/**
	 * 修改固定球局信息
	 * @author chenchao
	 * @date 2017-02-22
	 */
    public function editFixedCourtJoinAction() {
    	$cj_order_id = intval($this->getParam("id", 0));
    	$is_delete = intval($this->getParam("is_delete", 0));
    	
        $param = $this->getParams();
        //球馆商ID
		$supplier_id	= helper_LoginHelper::getCurrentSuppliersId();
        $param['id'] = $cj_order_id;
        $param['suppliers_id'] = $supplier_id;
        $param['is_delete'] = $is_delete;
        /* test
        $param['suppliers_id'] = '299';
        $param['is_delete'] = 0;
        $param['week_day'] = 4;
        $param['unit_price'] = '1.00';
        $param['field_capacity'] = 6;
        $param['is_refund'] = 1;
        $param['start_time'] = '10:00';
        $param['end_time'] = '11:00';
        $param['id'] = 7;
        $param['course_id'] = 7;
        $param['description'] = '123';*/

        if (!empty($param['end_time'])){
        	$param['end_time'] = date('H:i', (strtotime(date('Y-m-d', time()) . ' ' . $param['end_time']) - 3600));
        }
        
        if ($param['id'] < 1){
            $this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, '参数不能为空');
			exit;
        }
        $res = Loader::api('Orders')->updateFixedCourtJoin($param);
        echo json_encode($res);
    }

    
}