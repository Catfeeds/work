<?php
/**
 * app web view入口
 *  
 * @author bigticket
 */
class AppwebviewController extends DefaultController {
    
    /**
     * 月卡首页
     * 
     * @author bigticket
    */
    public function MonCardIndexAction(){
        $this->_view->assign(array(
            'content' => 'monCardIndex'
        ));
	}
	
	/**
	 * 月卡帮助页面
	 *
	 * @author bigticket
	 */
	public function MonCardHelpAction(){
	   $this->_view->assign(array(
	       'content' => 'monCardHelp'
	   ));
	}
	
	/**
	 * 月卡介绍页面
	 *
	 * @author bigticket
	 */
	public function MoncardIntroduceAction()
	{
	   $this->render('moncardintroduce');
	}
	
	/**
	 * 课程介绍
	 *
	 * @author bigticket
	 */
	public function CourseIntroAction(){
	  
	    $courseId = (int) $this->getParam('id', '0'); // 课程id
	    $courseInfo = array();
	    
	    if ($courseId > 0) {
	        $cacheKey = "appwebview:course_info_{$courseId}";
	        $redis =baf_Redis::factory();
	        // 读取缓存
	        $cacheCourse = unserialize($redis->get($cacheKey));
	        if ($cacheCourse && is_array($cacheCourse)) { // 有缓存，则读取缓存
	            $courseInfo = $cacheCourse;
	           
	        } else {
	            // 读取课程信息
	            $res = api_MonCard ::getCourseInfo(array('course_id' => $courseId));
	            if (isset($res['status']) && $res['status'] == SUCCESS_STATUS && !empty($res['data'])) {
	                $courseInfo = $res['data'];
	                // 设置缓存
	                $redis->set($cacheKey, serialize($courseInfo), 20*60); // 20分钟
	            }
	        }
	    }

	    $this->_view->assign(array(
	        'courseInfo' => $courseInfo
	    ));
	}
	
	/**
	 * 场馆介绍
	 *
	 * @author bigticket
	 */
	public function VenuesIntroAction(){
	    $venuesId   = (int) $this->getParam('venues_id'); // 场馆id
	    $categoryId = (int) $this->getParam('category_id'); // 场馆分类id
	    
	    $venuesInfo = array();
	    
	    if ($venuesId > 0 && $categoryId > 0) {
	        $cacheKey = "appwebview:venues_mini_info_{$venuesId}_{$categoryId}";
	         $redis =baf_Redis::factory();
	        // 读取缓存
	        $cacheVenues = unserialize($redis->get($cacheKey));
	        
	        if ($cacheVenues && is_array($cacheVenues)) { // 有缓存，则读取缓存
	            $venuesInfo = $cacheVenues;
	        } else {
	            // 读取场馆信息
	            $res = api_MonCard::getVenuesMiniInfo(array('venues_id' => $venuesId, 'category_id' => $categoryId));
	            if (isset($res['status']) && $res['status'] == SUCCESS_STATUS && !empty($res['data'])) {
	                $venuesInfo = $res['data'];
	                // 设置缓存
	               $redis->set($cacheKey, serialize($venuesInfo), 20*60); // 20分钟
                }
	        }
	    }
	    
	    
	    $this->_view->assign(array(
	        'venuesInfo' => $venuesInfo
	    ));
	}

	/**
	 * 一元购
	 *
	 * @author bigticket
	 */
	public function ActiveAction(){	    
	    $this->render('active');
	}

	/**
	 * 教练帮助页面
	 *
	 * @author bigticket
	 */
	public function CoachQaAction(){
	   $this->_view->assign(array(
	       'content' => 'qa'
	   ));
	}

	/**
	 * 教练
	 *
	 * @author bigticket
	 */
	public function CoachProtocolAction(){
	   $this->_view->assign(array(
	       'content' => 'protocol'
	   ));
	}

	/**
	 * 全场半价
	 *
	 * @author wgx
	 */
	public function BanjiaAction(){
	   $this->render('banjia');
	}

	/**
	 * 全场半价
	 *
	 * @author wgx
	 */
	public function ShenzhenAction(){
	   $this->render('shenzhen');
	}

	/**
	 * 全场半价
	 *
	 * @author wgx
	 */
	public function ClubAction(){
	   $this->render('club');
	}

	/**
	 * 全场半价
	 *
	 * @author wgx
	 */
	public function ShanghaiAction(){
	   $this->render('shanghai');
	}

	//
	public function TuanAction(){
	   $this->render('tuan');
	}
	
	/**
	 * 全场半价
	 *
	 * @author wgx
	 */
	public function GuangzhouAction(){
	   $this->render('guangzhou');
	}
    

	/**
	 * 全场半价
	 *
	 * @author wgx
	 */
	public function BeijingAction(){
	   $this->render('beijing');
	}
	
	/**
	 * 全场半价
	 *
	 * @author wgx
	 */
	public function PromotionAction(){
	   $this->render('promotion');
	}

	/**
	 * 全场半价
	 *
	 * @author wgx
	 */
	public function SzAction(){
	   $this->render('sz');
	}
    
  /**
   * 全场半价
   *
   * @author wgx
   */
  public function TjAction(){
     $this->render('tj');
  }
  
  
  /**
   * 获取趣运动的教练详情
   */
  public function CoachInfoAction(){
      $user_id = (int) $this->getParam('coach_id',0);
      $param = array(
          'coach_id' => $user_id,
          'ver'=>'1.1'
      );
      
      $res = api_User::GetCoachInfo($param);
      $TimeArr = api_Coach::CoachBespeakTime($param);   //先调用coach.api的测试
    
      if (isset($TimeArr['status']) && $TimeArr['status'] == SUCCESS_STATUS) {
          if(!empty($TimeArr['data'])){
              $BespeakTime = $TimeArr['data'];
          }
      }
      if (isset($res['status']) && $res['status'] == SUCCESS_STATUS) {
          if(!empty($res['data'])){
              $list = $res['data'];
          }
      }

    // echo json_encode($list);exit;
      $list['coach_bespeak_time']=$BespeakTime;
      $this->_view->assign(array(
          'list' => $list
      ));
  }
  
  /**
   * 获取趣运动的教练详情(教练版的预览)
   */
  public function CoachPreviewAction(){
    
      $user_id = (int) $this->getParam('coach_id',0);
      $param = array(
          'coach_id' => $user_id,
      );
      $array = array(
          'user_id' => $user_id,
      );
     
      
      $res = api_Coach::GetCoachPreview($array);
      $TimeArr = api_Coach::CoachBespeakTime($param);   //先调用coach.api的测试
   
      if (isset($TimeArr['status']) && $TimeArr['status'] == SUCCESS_STATUS) {
          if(!empty($TimeArr['data'])){
              $BespeakTime = $TimeArr['data'];
          }
      }
      if (isset($res['status']) && $res['status'] == SUCCESS_STATUS) {
          if(!empty($res['data'])){
              $list = $res['data'];
          }
      }

	if ( !isset($list) || empty($list)) {
		$this->redirectMessage('获取教练信息失败');
		exit;
    }


      $list['coach_bespeak_time'] = (isset($BespeakTime) && !empty($BespeakTime)) ? $BespeakTime : array();
    // echo json_encode($list);exit;
      $this->_view->assign(array(
          'list' => $list
      ));
  }
    
    /**
     * 分享订单的h5页面
     * 
     * @author xiaoyanchun
     */
    public function ShareOrderAction()
    {
        $orderId = (int)$this->getParam('id'); // 订单id

        $orderInfo = array();
        
        if ($orderId > 0) {
            $redis =baf_Redis::factory();
            $cacheKey = "appwebview:shareOrder:{$orderId}";
            
            // 读取缓存
            $cacheData = unserialize($redis->get($cacheKey));
            if ($cacheData && is_array($cacheData)) { // 有缓存，则读取缓存
                $orderInfo = $cacheData;
            } else {
                // 读取场馆信息
                $res = api_Order::getOrderInfo(array('order_id' => $orderId, 'ver' => '1.3'));
                if (isset($res['status']) && $res['status'] == SUCCESS_STATUS) {
                    $orderInfo = !empty($res['data']) ? $res['data'] : array();
                    // 设置缓存
                    $redis->set($cacheKey, serialize($orderInfo), 20 * 60); // 20分钟
                }
            }
        }
        
        $this->_view->assign(array(
            'orderInfo' => $orderInfo
        ));
    }
    
    
    /**
     * 用户等级页
     */
    public function userGradeAction(){
    	
    }
    
    /**
     * 会员等级介绍页
     */
    public function userGradeIntroAction(){
    	
    }
    
    /**
     * 近期运动记录
     */
    public function sportRecordAction(){
    	
    }
    
    /**
     *   约练退款说明
     */
    public function CoachRefundAction(){
    
        $this->render('coachrefund');
    }

    /**
     * 打卡分享H5页面 
     * @author wuchunhua
 	 * @date 2016-06-24
     * @return [type] [description]
     */
    public function shareSigninAction()
    {
    	$si_id = (int)$this->getParam('si_id'); // 打卡id
    	if($si_id<1) $this->redirectMessage('参数缺失');
    	$signinInfo = array();

    	if ($si_id > 0) {
	        $cacheKey = "appwebview:sign_in_info_{$si_id}";
	        $redis =baf_Redis::factory();
	        // 读取缓存
	        $cacheSignin = unserialize($redis->get($cacheKey));
	          
	        if ($cacheSignin && is_array($cacheSignin)) { // 有缓存，则读取缓存
	            $signinInfo = $cacheSignin;
	        }else{
	            // 读取打卡的信息
	            $res = api_User::getSigninInfo(array('si_id' => $si_id));
	            if (isset($res['status']) && $res['status'] == SUCCESS_STATUS && !empty($res['data'])) {
	                $signinInfo = $res['data'];
	                // 设置缓存
	               $redis->set($cacheKey, serialize($signinInfo), 20*60); // 20分钟
                }else{
                	$msg = !empty($res['msg']) ? $res['msg'] : '系统繁忙';
                	$this->redirectMessage($msg);
                }
	        }
	    }

	    //输出信息
	    $this->_view->assign(array(
	        'signinInfo' => $signinInfo
	    ));
    }

    /**
     * 打卡的规则说明
     * @param  string $value [description]
     * @return [type]        [description]
     */
    public function signinRuleAction()
    {
    	$this->render('signinrule');
    }

    public function pageViewAction(){
    	$id = $this->getParam('id');
    	if($this->uid > 0){
	    	switch ($id) {
				case 'balance':
					$this->redirect('/user/balance');
					exit;
					break;
				case 'coupon':				
					$this->redirect('/Coupon/Index');
					exit;
					break;
				case 'myorder':
					$this->redirect('/myorder');
					exit;
					break;
				case 'rule':
					$this->redirect('/user/bRule');
					exit;
					break;
				case 'myorderall':
					$this->redirect('/myorder/index?type=0');
					exit;
					break;	
				default:
					# code...
					break;
			}
    	}
    	
    	$this->_view->assign(array('id'=>$id));
    }

    /**
     * 退换说明
     */
    public function exchangeInfoAction(){

    }

    /**
     * 折扣卡说明
     */
    public function discountInfoAction(){

    }

    /**
     * 发票规则
     */
    public function invoiceRuleAction(){

    }

    /**
     * 微信绑定流程
     * @return [type] [description]
     */
    public function bindwxAction(){

    }

    /**
     * 拼团说明
     * @return [type] [description]
     */
    public function groupBuyAction(){

    }
}
