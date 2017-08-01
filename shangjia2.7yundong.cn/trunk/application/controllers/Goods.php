<?php
/**
 * 场地预订控制器
 *
 * @author bumtime
 * @date 2016-06-29
 */
class GoodsController extends BaseController
{
	
	/**
	 * 预订页
	 */
	public function indexAction()
	{	
		//检查是否开启了新场地
		if(helper_LoginHelper::isSite()){		
			$this->redirect('/goodslist/index');
		}
		
		//初始化
		$dateList = $hourList = $lockList = [];
		$goodsListNew  = [];
		
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


		//商品信息	
		$param = [
				'business_id'	=>	$id,
				'category_id'	=>	$cat_id,
				'book_date'		=>	$book_date,
				'utmSource'		=>	helper_VenuesHelper::getutmSource()
		];	
		$goodsList = $this->apiReturnInfo(Loader::api('Venues')->getBookingGoods($param));	
		
		baf_Logger::log2File('goods-'.';supplier_id:'.$supplier_id.';VenuesId:'.$id.';cat_id:'.$cat_id.';session:(user_name:'.json_encode($_SESSION['user_info']).'/venues_cat_id:'.$_SESSION['venues_cat_id'].')', 'goods_error');

		if(is_array($goodsList) && isset($goodsList['goods_list']))
		{
			//订单信息
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
					$lockList[$value['goods_id']] = $value;			
				}
			}

			//根据商品ID关联订单信息，将下单的信息合并
			foreach ($goodsList['goods_list'] as $key=>$value)
			{
				if(!empty($value['items']))
				{
					//将商品明细拆分成下级数组，方便前台输出
					foreach ($value['items'] as $key_li=>$value_li)
					{
						$tempList = explode(",", $value_li);
			
						unset($value['items'][$key_li]);
						$tips = substr($tempList[1], -3);
						$temp = intval($tempList[1]);
						//商品ID,时间,手机尾号,场地状态,价格
						$tempInfo = [
								'goods_id'		=>	isset($tempList[0]) ? $tempList[0] : "",
								'hour'			=>	$temp.$tips."-".($temp+1).$tips,
								'mobile_tail'	=>	isset($tempList[2]) ? $tempList[2] : "",
								'status'		=>	isset($tempList[3]) ? $tempList[3] : 0,
								'price'			=>	isset($tempList[4]) ? $tempList[4] : 0,
								'channel_price'	=>	isset($tempList[5]) ? $tempList[5] : 0,
						];
						
						//场地状态  0 空场   1锁定   2网络预订 3付款中   4会员预订
						//处理订单,合并数组
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
						//处理锁场,合并数组
						elseif(isset($tempList[3]) &&  1 == $tempList[3] && isset($lockList[$tempList[0]]))
						{
							//$value['items'][$key_li] 	=	$lockList[$tempList[0]];
							$tempInfo = array_merge($tempInfo, $lockList[$tempList[0]]);

						}						
						$value['items'][$key_li] = $tempInfo;								
					}
						
				}			
				
				$goodsListNew[$key] = [
						'course_name'	=>	$value['course_name'],
						'course_id'		=>	$value['course_id'],
						'item'			=>	$value['items']			
				];				

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
		}

		//管理员
		$adminList = helper_VenuesHelper::getProAdminList($supplier_id);
		unset($param);
		//赋值
		$dataList = [
				'catList'	=>	$cat_list,
				'adminList'	=>	$adminList,
				'dateList'	=>	$dateList,
				'hourList'	=>	$hourList,
				'goodsList'	=>	$goodsListNew,
				'cat_id'	=>	$cat_id,
				'book_date' =>	$book_date,
				'venues_id'	=>	$id,
				'sj_tip'	=>	'reserve'
		];

		$this->display('lockcourt', $dataList);
		
	}
	
	
	
	/**
	 * 锁定页
	 */
	public function lockAction()
	{
		//取值
		$goods_id		=	$this->getParam("goods_id");
		$is_on_sale		=	$this->getParam("is_on_sale");
		$locked_mobile	=	$this->getParam("locked_mobile", '');
		$locked_name	=	$this->getParam("locked_name", '');
		$cat_id			=	$this->getParam("cat_id", helper_VenuesHelper::getVenuesCatID());
	
		if(!$goods_id  || !$cat_id) {
			$this->errorOutput(baf_ErrorCode::ERR_PARAM);
		}

		//球馆ID
		$id	= helper_VenuesHelper::getCurrentVenuesId();

		//调用锁定接口
		$param = [			
				'goods_ids'		=>	is_array($goods_id) ? implode(",", $goods_id) : $goods_id,
				'locked'		=>	$is_on_sale,
				'business_id'	=>	$id,
				'category_id'	=>	$cat_id,
				'name'			=>	$locked_name,
				'phone'			=>	$locked_mobile
		];
		//写入日志
		$str_tip = $is_on_sale == 1  ? "锁定场次" : "解锁场次";
		helper_CoreHelper::addAdminLog($str_tip, $param);
		
		echo json_encode(Loader::api('Venues')->lockCourt($param));
		//$this->renderJSON(Loader::api('Venues')->lockCourt($param));
 
	}
	
	 
}