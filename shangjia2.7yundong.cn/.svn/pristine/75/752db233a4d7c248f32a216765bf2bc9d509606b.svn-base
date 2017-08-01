<?php 

/**
 * 场地管理
 *
 * @author bumtime
 * @date 2017-01-10
 * 
 */
class GoodslistController extends BaseController
{

	/**
	 *  场地管理
	 */
	public function indexAction()
	{
		//检查是否开启了新场地
		if(!helper_LoginHelper::isSite()){
			$this->redirect('/goods/index');
		}
		
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
	 * 场地管理显示（9天内）（ajax）
	 */
	public function getGoodsConfigAction() 
	{	
		$goodsListNew =	$dateList =	$hourList = $cardList = [];
		
		//默认当天
		$book_date 	= $this->getParam("book_date", date("Y-m-d"));
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
		 		
		//球馆ID
		$id				= helper_VenuesHelper::getCurrentVenuesId() ;
		//球馆商ID
		$supplier_id	= helper_LoginHelper::getCurrentSuppliersId();		
		
		//card_id列表
		$card_id_list = [];
		
		//取新版的场地状态
		$goods_stat_list = [];
		$param = [
				'venues_id'		=>	$id,
				'cat_id'		=>	$cat_id,
				'book_date'		=>	$book_date,
				'utm_medium'	=>	helper_VenuesHelper::getutmSource(),
				'type'			=>	1
		];
		$goodsListAll = $this->apiReturnInfo(Loader::api('Venues')->getBookedGoods($param));

		if(!empty($goodsListAll)){
			//9天内
			if(!empty($goodsListAll["goods_list"])){
				foreach ($goodsListAll["goods_list"] as $value){
					$goods_stat_list[$value['goods_id']][] = $value;
					if(intval($value['card_id']) > 0){
						$card_id_list[] = $value['card_id'];
					}
				}
			}	
			
			if(!empty($card_id_list)){
				$card_id_list = array_unique($card_id_list);
			}
		}

		//处理会员卡数据
		if(count($card_id_list) > 0){
			$param = [
					'venues_id'		=>	$id,
					'card_id'		=>	implode(",", $card_id_list)
			];
			$card_list = $this->apiReturnInfo(Loader::api('Stat')->getCardListByCardId($param));
			if(count($card_list) > 0){
				foreach ($card_list as $value){
					$cardList[$value['id']]['card_number'] = $value['card_number']; 
					$cardList[$value['id']]['name'] = $value['name'];
					$cardList[$value['id']]['phone'] = $value['phone'];
				}
			}
		}

		//取场地商品及场馆相关数据
		$param = [
				'business_id'	=>	$id,
				'category_id'	=>	$cat_id,
				'book_date'		=>	$book_date,
				'utmSource'		=>	helper_VenuesHelper::getutmSource()
		];
		$goodsList = $this->apiReturnInfo(Loader::api('Venues')->getBookingGoods($param));

		//重新组合场地信息，处理锁场信息、订单信息
		if(is_array($goodsList) && isset($goodsList['goods_list']))
		{
			//取该天所有订单信息
			$param  = [
					'cat_id'	=>	$cat_id,
					'venues_id'	=>	$id,
					'book_date'	=>	strtotime($book_date)
			];
			$orderListTemp = $this->apiReturnInfo(Loader::api('Orders')->getOrderListbyDate($param));
		
			//锁定信息            处理 $lockList数组
			if(!empty($goodsList['lock_list']))
			{
				foreach ($goodsList['lock_list'] as $value)
				{
					$lockList[$value['goods_id']][] = $value;
				}
			}
			
			//日期信息
			foreach ($goodsList['date_list'] as $key=>$value)
			{
				//$value += 24*3600;
				$dateList[$key]['name']			=	helper_CoreHelper::getWeekName($value);
				$dateList[$key]['date_week']	=	date("m-d", $value);
				$dateList[$key]['date']			=	date("Y-m-d", $value);
			}
			//时间信息
			$hourList 	=	$goodsList['hour_list'];
			$half_tip = substr($hourList[0], -2);//开始时间是整点还是半点
		
			//根据商品ID关联订单信息，将下单的信息合并
			foreach ($goodsList['goods_list'] as $key=>$value)
			{
				if(!empty($value['items']))
				{
					//将商品明细拆分成下级数组，方便前台输出
					foreach ($value['items'] as $key_li=>$value_li)
					{
						//$value_li （商品ID,时间,手机尾号,场地状态,价格）
						$tempList = explode(",", $value_li);
						unset($value['items'][$key_li]);
		
						$temp = intval($tempList[1]);	
						$tempInfo = [
								'goods_id'		=>	isset($tempList[0]) ? $tempList[0] : "",
								'hour'			=>	$temp.":".$half_tip."-".($temp+1).":".$half_tip,
								'mobile_tail'	=>	isset($tempList[2]) ? $tempList[2] : "",
								'status'		=>	isset($tempList[3]) ? $tempList[3] : 0,
								'price'			=>	isset($tempList[4]) ? $tempList[4] : 0,
								'channel_price'	=>	isset($tempList[5]) ? $tempList[5] : 0,
						];
		
						//场地状态  0 空场   1锁定   2网络预订 3付款中   4会员预订
						//处理订单信息,合并数组
						if(isset($tempList[3]) &&  $tempList[3] > 1 )
						{
							if(!empty($orderListTemp))
							{
								foreach($orderListTemp as $value_order)
								{
									if(isset($value_order['goods_ids']) && strpos($value_order['goods_ids'], $tempList[0]) !== false )
									{
										//$value['items'][$key_li] 	=	$value_order;
										$tempInfo = array_merge($tempInfo, $value_order);
									}
								}
							}
						}
						//处理锁场信息,合并数组
						elseif(isset($tempList[3]) &&  1 == $tempList[3] && isset($lockList[$tempList[0]]))
						{
							//处理新版锁场，支持半点场，会员场，普通锁场（已用中间表锁场的）
							$member_temp = [];
							if(isset($tempInfo['goods_id']) && isset($goods_stat_list[$tempInfo['goods_id']])){
								foreach ($goods_stat_list[$tempInfo['goods_id']] as $v_key=>$vt){
									$member_temp[$v_key]['card_id'] =  $vt['card_id'];
									$member_temp[$v_key]['card_no'] =  intval($vt['card_id']) > 0 ? (isset($cardList[$vt['card_id']]['card_number']) ? $cardList[$vt['card_id']]['card_number'] : "") : "";
									$member_temp[$v_key]['name'] =  $vt['customer'];
									$member_temp[$v_key]['phone'] =  $vt['customer_phone'];
									$member_temp[$v_key]['start_time'] =  date("H:i", $vt['start_time']);
									$member_temp[$v_key]['goods_id'] =  $tempInfo['goods_id'];
									$member_temp[$v_key]['end_time'] =  date("H:i", $vt['end_time']);
									
									if(substr(date("H:i", $vt['start_time']), -2) == $half_tip && substr(date("H:i", $vt['end_time']), -2) == $half_tip){
										$member_temp[$v_key]['half_tips'] = 0;
									}else{
										$member_temp[$v_key]['half_tips'] = substr(date("H:i", $vt['start_time']), -2) == $half_tip ? 1 : 2 ;
									}	
								}
								$tempInfo['m_info'] = $member_temp;
							}
							//兼容旧版锁场（没用中间表锁场的）
							else{		 
								 //$tempInfo = array_merge($tempInfo, $lockList[$tempList[0]]);
								 $member_temp[0]['card_id'] =  0;
								 $member_temp[0]['card_no'] =  "";
								 $member_temp[0]['name'] =  $lockList[$tempInfo['goods_id']][0]['name'];
								 $member_temp[0]['phone'] = $lockList[$tempInfo['goods_id']][0]['phone'];
								 $member_temp[0]['start_time'] =  0;
								 $member_temp[0]['goods_id'] =  $tempInfo['goods_id'];
								 $member_temp[0]['end_time'] =  0;
								 $member_temp[0]['half_tips'] = 0;
								 
								$tempInfo['m_info'] = $member_temp;
							}				
						}					
						$value['items'][$key_li] = $tempInfo;
					}	
				}
		
				$goodsListNew[$key] = [
						'course_name'	=>	$value['course_name'],
						'course_id'		=>	$value['course_id'],
						'course_number'	=>	$value['course_number'],
						'item'			=>	$value['items']
				];
			}
		}
		
		//取管理员
		$adminList = helper_VenuesHelper::getProAdminList($supplier_id);
		
		//场地配置信息
		$config_info = helper_VenuesHelper::getShowConfig($supplier_id);

		//处理会员卡
		if(!empty($goodsListAll["goods_list_later"])){
			foreach ($goodsListAll["goods_list_later"] as &$vg){
				$vg['start_time'] = date("H:i", $vg['start_time']);
				$vg['end_time'] = date("H:i", $vg['end_time']);
				$vg['book_date'] = date("Y-m-d", $vg['book_date']);
				$vg['card_no'] =  intval($vg['card_id']) > 0 ? (isset($cardList[$vg['card_id']]['card_number']) ? $cardList[$vg['card_id']]['card_number'] : "") : "";
				$vg['name']    =  $vg['customer'];
				$vg['phone']   =  $vg['customer_phone'];
				unset($vg['customer']);
				unset($vg['customer_phone']);
			}
		}

		unset($param);
		//赋值
		$dataList = [
				'catList'			=>	$cat_list,
				'adminList'			=>	$adminList,
				'dateList'			=>	$dateList,
				'hourList'			=>	$hourList,
				'goodsList'			=>	$goodsListNew,//9天内
				'goodsListLater'	=>	isset($goodsListAll["goods_list_later"]) ? $goodsListAll["goods_list_later"] : [] ,//9天外
				'venuesConfig'		=>	[
						'cat_id'		=>	$cat_id,
						'book_date' 	=>	$book_date,
						'venues_id'		=>	$id,
						'utm_medium'	=>	'reserve',//预留渠道
						'member_display'=>	$config_info['is_show_name'],  //会员显示
						'order_display'	=>	$config_info['is_merge'] //订单显示
				]
				
		];
		
		$this->successOutput($dataList);
	}
	
	
	/**
	 * 场地管理显示(9天后)（ajax）
	 */
	public function getGoodsConfigLaterAction()
	{
		$dateList  = $cardList = $hourListNew =  [];

		//默认当天
		$book_date 	= $this->getParam("book_date", date("Y-m-d"));
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
		 
		//球馆ID
		$id				= helper_VenuesHelper::getCurrentVenuesId() ;
		//球馆商ID
		$supplier_id	= helper_LoginHelper::getCurrentSuppliersId();
	
		//card_id列表
		$card_id_list = [];
 
		
		//取新版的场地状态
		$goods_stat_list = [];
		$param = [
				'venues_id'		=>	$id,
				'cat_id'		=>	$cat_id,
				'book_date'		=>	$book_date,
				'utm_medium'	=>	helper_VenuesHelper::getutmSource(),
				'type'			=> 2
		];
		$goodsListAll = $this->apiReturnInfo(Loader::api('Venues')->getBookedGoods($param));
		


		if(!empty($goodsListAll)){
			//9天后
			if(!empty($goodsListAll["goods_list_later"])){
				foreach ($goodsListAll["goods_list_later"] as $value2){
					if(intval($value2['card_id']) > 0){
						$card_id_list[] = $value2['card_id'];
					}

					$goods_stat_list[] =[
							"id"=> $value2['id'],
							"course_number"=> $value2['course_number'],
							"hour"=> $value2['hour'],
							"start_time"=> date("H:i", $value2['start_time']),
							"end_time"=> date("H:i", $value2['end_time']),
							"card_id"=> $value2['card_id'],
							"book_date"=> date("Y-m-d", $value2['book_date']),
							"status"=> $value2['status'],
							"name"=> $value2['customer'],
							"phone"=> $value2['customer_phone']
					];
				}
			}
			if(!empty($card_id_list)){
				$card_id_list = array_unique($card_id_list);
			}
		}

		//处理会员卡数据
		if(count($card_id_list) > 0){
			$param = [
					'venues_id'		=>	$id,
					'card_id'		=>	implode(",", $card_id_list)
			];
			$card_list = $this->apiReturnInfo(Loader::api('Stat')->getCardListByCardId($param));
			if(count($card_list) > 0){
				foreach ($card_list as $value){
					$cardList[$value['id']]['card_number'] = $value['card_number'];
					$cardList[$value['id']]['name'] = $value['name'];
					$cardList[$value['id']]['phone'] = $value['phone'];
				}
			}
		}
		
		//处理会员卡
		if(!empty($goods_stat_list)){
			foreach ($goods_stat_list as &$vg){
				$vg['card_no'] =  intval($vg['card_id']) > 0 ? (isset($cardList[$vg['card_id']]['card_number']) ? $cardList[$vg['card_id']]['card_number'] : "") : "";
			}
		}
				
		//取管理员
		$adminList = helper_VenuesHelper::getProAdminList($supplier_id);
	
		//场地配置信息
		$config_info = helper_VenuesHelper::getShowConfig($supplier_id);
	
		unset($param);
		//处理hour时间
		$hourList =	 helper_VenuesHelper::getServiceTime($cat_id);
		
		$w = date("w", strtotime($book_date));
		if(!empty($hourList) && isset($hourList[$w]) && isset($hourList[$w][0]) && isset($hourList[$w][1])){
			$start = intval($hourList[$w][0]);
			$end =  intval($hourList[$w][1]);
			$tip = substr($hourList[$w][0], -3);
			 
			$time_list = [];
			for($i=$start; $i<$end; $i++){
				$hourListNew[] = $i . $tip;
			}
		}
		
		//处理当前日期	
		$dateList = helper_CoreHelper::get9DayTime(date("Y-m-d"));
	    if(!empty($dateList)){
			foreach ($dateList as &$d_value){
				$d_value['name'] = helper_CoreHelper::getWeekName(strtotime($d_value['date']));
			}
		}
	
		//赋值
		$dataList = [
				'catList'			=>	$cat_list,
				'adminList'			=>	$adminList,
				'dateList'			=>	$dateList,
				'hourList'			=>	$hourListNew,
				'courseList'		=>	helper_VenuesHelper::getCourses($cat_id),
				'goodsListLater'	=>	$goods_stat_list ,//9天外
				'venuesConfig'		=>	[
						'cat_id'		=>	$cat_id,
						'book_date' 	=>	$book_date,
						'venues_id'		=>	$id,
						'utm_medium'	=>	'reserve',//预留渠道
						'member_display'=>	$config_info['is_show_name'],  //会员显示
						'order_display'	=>	$config_info['is_merge'] //订单显示
				]
	
		];
	
		$this->successOutput($dataList);
	}
	
	
	/**
	 * 换场（9天内）（ajax）
	 */
	public function changeGoodsAction(){
		//默认当天
		$book_date 	= $this->getParam("book_date", date("Y-m-d"));
		$data		= $this->getParam('data');
		// 分类ID
		$cat_id 	= (int)$this->getParam("cat_id", helper_VenuesHelper::getVenuesCatID());	
		//球馆ID
		$venues_id	= helper_VenuesHelper::getCurrentVenuesId() ;
		//球馆商ID
		$supplier_id= helper_LoginHelper::getCurrentSuppliersId();

		//验证
		if(empty($cat_id)){
			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "项目分类参数不能为空");
			exit;
		}
		
		if(empty($data)){
			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "data参数不能为空");
			exit;
		}
		
		$data_list = json_decode($data, true);
		if (json_last_error() > 0) {
			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "data参数中的json格式不对");
			exit;
		}
		if(count($data_list) != 2 || empty($data_list[0]) || empty($data_list[1])){
			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "data参数中的json元素不对");
			exit;
		}

		baf_Logger::log2File('VenuesId:'.$venues_id.';cat_id:'.$cat_id.';data:'.$data, 'GoodsListChang_info');
		
		$order_list = $goods_id_lock_list = $goods_id_unlock_list = $goods_id_order_list = $goods_id_order_unset = [];
	
		//检查重复值
		$goods_repeat = $this->checkRepertData($data_list[0], $data_list[1]);

		$list_new = $data_list[1];
		$now = time();
		foreach ($data_list[0] as $key=>$value){
			
			if(empty($goods_repeat)){
				//对换数据
				$temp = $value['goods_id'];
				$temp_after = $list_new[$key]['goods_id'];
				
				$card_id = $value["card_id"];
				$phone = $value["phone"];
				$name = $value["name"];
				$order_id = $value['order_id'];
				
				$value['card_id'] = $list_new[$key]['card_id'];
				$value['phone'] = $list_new[$key]['phone'];
				$value['name'] = $list_new[$key]['name'];
				$value['order_id'] = $list_new[$key]['order_id'];
				
				$list_new[$key]['card_id'] = $card_id;
				$list_new[$key]['phone'] = $phone;
				$list_new[$key]['name'] = $name;
				$list_new[$key]['order_id'] = $order_id;
		
				//锁场换空场
				if($value['status'] == 1 && $list_new[$key]['status'] == 0){
	
					$status= $value['status'];
					$list_new[$key]['status_new'] = $status;
					$value['status_new'] = $list_new[$key]['status'];
					
					$goods_id_unlock_list[$temp][] = $value;
					$goods_id_lock_list[$temp_after][] = $list_new[$key];
					
				}
				//锁场换锁场
				else if($value['status'] == 1 && $list_new[$key]['status'] == 1){
		 
					$status= $value['status'];
					$list_new[$key]['status_new'] = $status;
					$value['status_new'] = $list_new[$key]['status'];
					
					$goods_id_lock_list[$temp][] = $value;
					$goods_id_lock_list[$temp_after][] = $list_new[$key];
					
				}
				//锁场换订单
				else if($value['status'] == 1 && $list_new[$key]['status'] == 2){
	
					$status= $value['status'];
					$list_new[$key]['status_new'] = $status;
					$value['status_new'] = $list_new[$key]['status'];
					
					$order_list[$temp][] = $value;
					$goods_id_lock_list[$temp_after][] = $list_new[$key];	
					
					//涉及订单与锁场互换，锁场信息中间表需要直接删掉
					$goods_id_order_list[$temp][] = [
							"goods_id"=> $value['goods_id'],
							"start_time"=> $value['start_time'],
							"end_time"=> $value['end_time']					
					];

				}
				//订单换空场
				else if($value['status'] == 2 && $list_new[$key]['status'] == 0){
					
					$status= $value['status'];
					$list_new[$key]['status_new'] = $status;
					$value['status_new'] = $list_new[$key]['status'];
					$order_list[$temp_after][] = $list_new[$key];
					//直接解掉订单
					$goods_id_order_unset[$temp][] = [
							"goods_id"=> $value['goods_id'],
							"start_time"=> $value['start_time'],
							"end_time"=> $value['end_time']	
					];
			
				}
				//订单换锁场
				else if($value['status'] == 2 && $list_new[$key]['status'] == 1){
					
					$status= $value['status'];
					$list_new[$key]['status_new'] = $status;
					$value['status_new'] = $list_new[$key]['status'];
					
					$goods_id_lock_list[$temp][] = $value;
					$order_list[$temp_after][] = $list_new[$key];
					//涉及订单与锁场互换，锁场信息中间表需要直接删掉
					$goods_id_order_list[$list_new[$key]['goods_id']][] = [
							"goods_id"=> $list_new[$key]['goods_id'],
							"start_time"=> $list_new[$key]['start_time'],
							"end_time"=> $list_new[$key]['end_time']
					];
					
				}
				//订单换订单
				else if($value['status'] == 2 && $list_new[$key]['status'] == 2){
						
					$status= $value['status'];
					$list_new[$key]['status_new'] = $status;
					$value['status_new'] = $list_new[$key]['status'];
					
					$order_list[$temp][] = $list_new[$key];
					$order_list[$temp_after][] = $value;
				}	
			}
			else{
				//换场跟自己有重叠情况（锁场）
				if($value['status'] == 1){
					$status= $value['status'];
					$list_new[$key]['status_new'] = $status;
					$value['status_new'] = $list_new[$key]['status'];

					if(!isset($goods_repeat[$value['goods_id']. "_" .$value['start_time']. "_" .$value['end_time']]))
					{
						$goods_id_unlock_list[$value['goods_id']][] = $value;
					}
	
					$list_new[$key]['card_id'] = $value["card_id"];
					$list_new[$key]['phone'] = $value["phone"];
					$list_new[$key]['name'] =  $value["name"];			
					$goods_id_lock_list[$list_new[$key]['goods_id']][] = $list_new[$key];
					
				}
				//换场跟自己有重叠情况（订单）
				elseif ($value['status'] == 2){
					$order_id= $value['order_id'];
					$value['order_id'] = $list_new[$key]['order_id'];
					$list_new[$key]['order_id'] = $order_id;
						
					if(!isset($goods_repeat[$value['goods_id']. "_" .$value['start_time']. "_" .$value['end_time']]))
					{
						$goods_id_order_unset[$value['goods_id']][] = [
								"goods_id"=> $value['goods_id'],
								"start_time"=> $value['start_time'],
								"end_time"=> $value['end_time']
						];
					}
					
					$order_list[$list_new[$key]['goods_id']][] = $list_new[$key];
				}
					
			}
		}


		//调用订单接口
		if(!empty($order_list) > 0){
			baf_Logger::log2File('VenuesId:'.$venues_id.';cat_id:'.$cat_id.';order_list:'.json_encode($order_list), 'GoodsListChang_info');
			$order_info = [];
			foreach ($order_list as $key=>$value){
				foreach ($value as $vv){
					$order_info[$vv['order_id']][] = $vv['goods_id']; 
					//删除订单所在的场次中间表（good_locked_info）
					$goods_id_order_list[$vv['goods_id']][] = [
							"goods_id"=> $vv['goods_id'],
							"start_time"=> $vv['start_time'],
							"end_time"=> $vv['end_time']
					];
				}
			}
			
			//重新组合订单数据
			if(!empty($order_info)){
				$order_info_new = [];
				foreach ($order_info as $key=>$info_value){
					$order_info_new[] = [
							"order_id" => $key, 
							"goods_id" => implode(",", array_unique($info_value))
					];
					
				}
				
				$param = [];
				$param['replace_json_content'] = json_encode($order_info_new);
				$info = Loader::api('Orders')->replaceOrderGoods($param);	
				
				if(!empty($info['status']) && $info['status'] != "0000"){
					$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, $info['msg']);
					exit;
				}
			} 
		} 
		


		 //调用换场接口
		$param['data']	= json_encode([$goods_id_lock_list, $goods_id_unlock_list]);		
		baf_Logger::log2File('VenuesId:'.$venues_id.';cat_id:'.$cat_id.';lock_list_unlock_list:'.$param['data'], 'GoodsListChang_info');
		
		if(!empty($param['data']))
		{
			$param['venues_id']		= $venues_id;
			$param['cat_id']		= $cat_id;
			$param['utm_medium']	= helper_VenuesHelper::getutmSource();//操作请求来源
			$param['book_date']		= $book_date;
			$param['lock_data'] 	= json_encode($goods_id_order_list); //直接去掉中间表信息，锁场与订单之间互换才会有值
			$param['unset_order_data'] 	= json_encode($goods_id_order_unset); //直接释放原订单的场次
			
			baf_Logger::log2File('VenuesId:'.$venues_id.';cat_id:'.$cat_id.';lock_data:'.$param['lock_data'], 'GoodsListChang_info');
			baf_Logger::log2File('VenuesId:'.$venues_id.';cat_id:'.$cat_id.';unset_order_data:'.$param['unset_order_data'], 'GoodsListChang_info');
			
			$info = Loader::api('Venues')->changeGoodsInfo($param);
		}
		
		$this->renderJSON($info);
		
	}
	
	
	/**
	 * 换场（9天后）（ajax）
	 */
	public function changeGoodsLaterAction(){
		//默认当天
		$book_date 	= $this->getParam("book_date", date("Y-m-d"));
		$data		= $this->getParam("data");
		// 分类ID
		$cat_id 	= (int)$this->getParam("cat_id", helper_VenuesHelper::getVenuesCatID());	
		//球馆ID
		$venues_id	= helper_VenuesHelper::getCurrentVenuesId() ;
		//球馆商ID
		$supplier_id= helper_LoginHelper::getCurrentSuppliersId();
		
		
		//验证
		if(empty($cat_id)){
			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "项目分类参数不能为空");
			exit;
		}
		
		if(empty($data)){
			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "data参数不能为空");
			exit;
		}
		
		$data_list = json_decode($data, true);
		if (json_last_error() > 0) {
			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "data参数中的json格式不对");
			exit;
		}
		if(count($data_list) != 2 || empty($data_list[0]) || empty($data_list[1])){
			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "data参数中的json元素不对");
			exit;
		}

		$goods_id_lock_list = $goods_id_unlock_list = [];

		$list_new = $data_list[1];
		$now = time();


		//检查重复值
		$goods_repeat = $this->checkRepertDataLater($data_list[0], $data_list[1]);
		
		foreach ($data_list[0] as $key=>$value){
			//正常情况
			if(empty($goods_repeat)){
				//对换数据
				$temp = $value['course_number'];
				$temp_after = $list_new[$key]['course_number'];
					
				$card_id = $value["card_id"];
				$phone = $value["phone"];
				$name = $value["name"];
				
				$value['card_id'] = $list_new[$key]['card_id'];
				$value['phone'] = $list_new[$key]['phone'];
				$value['name'] = $list_new[$key]['name'];
				
				$list_new[$key]['card_id'] = $card_id;
				$list_new[$key]['phone'] = $phone;
				$list_new[$key]['name'] = $name;
				
				//锁场换空场
				if($value['status'] == 1 && $list_new[$key]['status'] == 0){
				
					$status= $value['status'];
					$list_new[$key]['status_new'] = $status;
					$value['status_new'] = $list_new[$key]['status'];
				
					$goods_id_unlock_list[$temp][] = $value;
					$goods_id_lock_list[$temp_after][] = $list_new[$key];
				
				}
				//锁场换锁场
				else if($value['status'] == 1 && $list_new[$key]['status'] == 1){
				
					$status= $value['status'];
					$list_new[$key]['status_new'] = $status;
					$value['status_new'] = $list_new[$key]['status'];
				
					$goods_id_lock_list[$temp][] = $value;
					$goods_id_lock_list[$temp_after][] = $list_new[$key];
				}
			}
			//换场跟自己有重叠情况
			else{

				$status= $value['status'];
				$list_new[$key]['status_new'] = $status;
				$value['status_new'] = $list_new[$key]['status'];
				
				if(!isset($goods_repeat[$value['course_number']. "_" .$value['start_time']. "_" .$value['end_time']]))
				{
					$goods_id_unlock_list[$value['course_number']][] = $value;
				}
				 
				$list_new[$key]['card_id'] = $value["card_id"];
				$list_new[$key]['phone'] = $value["phone"];
				$list_new[$key]['name'] =  $value["name"];
				
				$goods_id_lock_list[$list_new[$key]['course_number']][] = $list_new[$key];			 
			}	
		}
	

		 //调用换场接口
		$param['data']	= json_encode([$goods_id_lock_list, $goods_id_unlock_list]);		
		
		if(!empty($param['data']))
		{
			$param['venues_id']		= $venues_id;
			$param['cat_id']		= $cat_id;
			$param['utm_medium']	= helper_VenuesHelper::getutmSource();//操作请求来源
			$param['book_date']		= $book_date;
		
			$info = Loader::api('Venues')->changeGoodsLaterInfo($param);
		}
		
		$this->renderJSON($info);
	
	}
	

	/**
	 * 场地预订（9天内）（ajax）
	 * 20170116
	 */
	public function bookGoodsAction()
	{
		//默认当天
		$book_date 	=	$this->getParam("book_date", date("Y-m-d"));
		$card_no	=	$this->getParam("card_no", '');
		$phone		=	$this->getParam("phone", '');
		$name		=	$this->getParam("name", '');		
		$data		=	$this->getParam('data');//goods_id start_time end_time
		$cat_id		=	$this->getParam("cat_id", '');		
		
		//球馆ID
		$venues_id	= helper_VenuesHelper::getCurrentVenuesId() ;
		
		//验证
		if(!empty($phone)){
			/* $this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "手机不能为空");
			exit;
		}else{ */
			if(!baf_Common::isMobile($phone)){
				$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "手机格式不对");
				exit;
			}
		}
		//验证
		if(empty($cat_id)){
			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "项目分类参数不能为空");
			exit;
		}
		//验证
		if(empty($data)){
			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "data参数不能为空");
			exit;
		}
			
		$data_list = json_decode($data, true);
		if (json_last_error() > 0) {
			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "data参数中的json格式不对");
			exit;
		}
		
		foreach($data_list as $key=>$value){
			if ( empty($value['start_time'])  || empty($value['end_time']) || empty($value['goods_id'])) {
				$this->errorOutput( baf_ErrorCode::ERR_NO_PARAMETERS, '类型参数不对！');
				exit;
			}
		}
		//验证会员卡ID
		$card_id = 0;
		if(!empty($card_no)){
			$param = [
					'venues_id' 	=>	$venues_id,
					'card_number' 	=>	$card_no
			];	
			$info = Loader::api('Stat')->checkCard($param);
			if(!empty($info) && !empty($info['data'])){
				$card_id = $info['data']['id'] ?: 0;
			}
		}
		
		if(!empty($data_list)){
			$param = [];
			$param['data']			= $data;
			$param['venues_id']		= $venues_id;
			$param['cat_id']		= $cat_id;
			$param['utm_medium']	= helper_VenuesHelper::getutmSource();//操作请求来源
			$param['book_date']		= $book_date;
			$param['card_id']		= $card_id;
			$param['name'] 			= $name;
			$param['phone']			= $phone;
			
			$info = Loader::api('Venues')->bookedGoods($param);	
		}
		
		$this->renderJSON($info);
 
	}
	
	
	/**
	 * 场地预订（9天后）（ajax）
	 * 20170116
	 */
	public function bookGoodsLaterAction()
	{
		//默认当天
		$book_date 	=	$this->getParam("book_date", date("Y-m-d"));
		$card_no	=	$this->getParam("card_no", '');
		$phone		=	$this->getParam("phone", '');
		$name		=	$this->getParam("name", '');
		$data		=	$this->getParam('data');//course_number start_time  end_time
		$cat_id		=	$this->getParam("cat_id", '');
	
		//球馆ID
		$venues_id	= helper_VenuesHelper::getCurrentVenuesId() ;
	
		//验证
		if(!empty($phone)){
			if(!baf_Common::isMobile($phone)){
				$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "手机格式不对");
				exit;
			}
		}
		//验证
		if(empty($cat_id)){
			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "项目分类参数不能为空");
			exit;
		}
		//验证
		if(empty($data)){
			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "data参数不能为空");
			exit;
		}
			
		$data_list = json_decode($data, true);
		if (json_last_error() > 0) {
			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "data参数中的json格式不对");
			exit;
		}
	
		foreach($data_list as $key=>$value){
			if ( empty($value['start_time'])  || empty($value['end_time']) || empty($value['course_number'])) {
				$this->errorOutput( baf_ErrorCode::ERR_NO_PARAMETERS, '类型参数不对！');
				exit;
			}
		}
		
		//验证会员卡ID
		$card_id = 0;
		if(!empty($card_no)){
			$param = [
					'venues_id' 	=>	$venues_id,
					'card_number' 	=>	$card_no
			];
			$info = Loader::api('Stat')->checkCard($param);
			if(!empty($info) && !empty($info['data'])){
				$card_id = $info['data']['id'] ?: 0;
			}
		}
	
		if(!empty($data_list)){
			$param = [];
			$param['data']			= $data;
			$param['venues_id']		= $venues_id;
			$param['cat_id']		= $cat_id;
			$param['utm_medium']	= helper_VenuesHelper::getutmSource();//操作请求来源
			$param['book_date']		= $book_date;
			$param['card_id']		= $card_id;
			$param['name'] 			= $name;
			$param['phone']			= $phone;
				
			$info = Loader::api('Venues')->bookedGoodsLater($param);
		}
	
		$this->renderJSON($info);
	
	}
	
	
	/**
	 * 场地解锁（9天内）（ajax）
	 * 20170117
	 */
	public function unBookGoodsInfoAction()
	{
		//默认当天
		$book_date 	=	$this->getParam("book_date", date("Y-m-d"));
		$data		=	$this->getParam('data');//course_number start_time  end_time
		$cat_id		=	$this->getParam("cat_id", '');	
	
		//验证
		if(empty($cat_id)){
			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "项目分类参数不能为空");
			exit;
		}
		//验证
		if(empty($data)){
			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "data参数不能为空");
			exit;
		}
			
		$data_list = json_decode($data, true);
		if (json_last_error() > 0) {
			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "data参数中的json格式不对");
			exit;
		}
		if(empty($data_list)){
			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "data参数解析后不能为空");
			exit;
		}
	
		//球馆ID
		$venues_id	= helper_VenuesHelper::getCurrentVenuesId() ;
		
		foreach($data_list as $key=>$value){
			if ( empty($value['start_time'])  || empty($value['end_time']) || empty($value['goods_id'])) {
				$this->errorOutput( baf_ErrorCode::ERR_NO_PARAMETERS, 'data中参数的不能为空');
				exit;
			}
		}		
	
		if(!empty($data_list)){
			$param = [];
			$param['data']			= $data;
			$param['venues_id']		= $venues_id;
			$param['cat_id']		= $cat_id;
			$param['book_date']		= $book_date;
			$param['utm_medium']	= helper_VenuesHelper::getutmSource();//操作请求来源
	
			$info = Loader::api('Venues')->unBookedGoods($param);
		}
	
		$this->renderJSON($info);
	
	}

	
	/**
	 * 场地解锁（9天后）（ajax）
	 * 20170117
	 */
	public function unBookGoodsLaterAction()
	{
		$book_date 	=	$this->getParam("book_date", date("Y-m-d"));
		$cat_id		=	$this->getParam("cat_id", '');
		$data		=	$this->getParam('data'); //course_number start_time  end_time		

		//验证
		if(empty($cat_id)){
			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "项目分类参数不能为空");
			exit;
		}

		if(empty($data)){
			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "data参数不能为空");
			exit;
		}
			
		$data_list = json_decode($data, true);
		if (json_last_error() > 0) {
			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "data参数中的json格式不对");
			exit;
		}
		if(empty($data_list)){
			$this->errorOutput(baf_ErrorCode::ERR_UNKNOWN, "data参数解析后不能为空");
			exit;
		}
	
		
		//球馆ID
		$venues_id	= helper_VenuesHelper::getCurrentVenuesId() ;

		if(!empty($data_list)){
			$param = [];
			$param['data']			= $data;
			$param['venues_id']		= $venues_id;
			$param['cat_id']		= $cat_id;
			$param['book_date']		= $book_date;
			$param['utm_medium']	= helper_VenuesHelper::getutmSource();//操作请求来源
		
			$info = Loader::api('Venues')->unBookedGoodsLater($param);
		}
		
		$this->renderJSON($info);
	
	}
	
	private function checkRepertData($old, $new){
		$repeat_arr = $old_goods = $new_goods = [];

		foreach ($old as $key=>$o){
			$old_goods[$key]['goods_id'] = $o['goods_id'];
			$old_goods[$key]['start_time'] = $o['start_time'];
			$old_goods[$key]['end_time'] = $o['end_time'];
		}
		foreach ($new as $key=>$n){
			$new_goods[$key]['goods_id'] = $n['goods_id'];
			$new_goods[$key]['start_time'] = $n['start_time'];
			$new_goods[$key]['end_time'] = $n['end_time'];
		}

		for($i=0; $i<count($old_goods); $i++){
			for($j=0; $j<count($new_goods); $j++){
				if($old_goods[$i]['goods_id'] == $new_goods[$j]['goods_id'] && $old_goods[$i]['start_time'] == $new_goods[$j]['start_time'] && $old_goods[$i]['end_time'] == $new_goods[$j]['end_time']){
					$repeat_arr[$new_goods[$j]['goods_id']. "_" .$new_goods[$j]['start_time']. "_" .$new_goods[$j]['end_time']] = [
						'goods_id' => $new_goods[$j]['goods_id'],
						'start_time' => $new_goods[$j]['start_time'],
						'end_time' => $new_goods[$j]['end_time']
					];
				}
				
			}
		}
		// 获取重复数据的数组
		return $repeat_arr;	
		
	}
	
	private function checkRepertDataLater($old, $new){
		$repeat_arr = $old_goods = $new_goods = [];
	
		foreach ($old as $key=>$o){
			$old_goods[$key]['course_number'] = $o['course_number'];
			$old_goods[$key]['start_time'] = $o['start_time'];
			$old_goods[$key]['end_time'] = $o['end_time'];
		}
		foreach ($new as $key=>$n){
			$new_goods[$key]['course_number'] = $n['course_number'];
			$new_goods[$key]['start_time'] = $n['start_time'];
			$new_goods[$key]['end_time'] = $n['end_time'];
		}

		for($i=0; $i<count($old_goods); $i++){
			for($j=0; $j<count($new_goods); $j++){
				if($old_goods[$i]['course_number'] == $new_goods[$j]['course_number'] && $old_goods[$i]['start_time'] == $new_goods[$j]['start_time'] && $old_goods[$i]['end_time'] == $new_goods[$j]['end_time']){
					$repeat_arr[$new_goods[$j]['course_number']. "_" .$new_goods[$j]['start_time']. "_" .$new_goods[$j]['end_time']] = [
						'course_number' => $new_goods[$j]['course_number'],
						'start_time' => $new_goods[$j]['start_time'],
						'end_time' => $new_goods[$j]['end_time']
					];
				}
				
			}
		}
		// 获取重复数据的数组
		return $repeat_arr;	
	}
}
?>