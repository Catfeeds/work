<?php
/**
 * 请求订单api相关的接口
 * 
 * @author bumtime
 * @date 2016-06-29
 * 
 */
class api_OrdersApi extends api_Base
{    
    /**
     * api 秘钥
     * 
     * @var string
     */
    protected $apiKey = 'orderapi4a33b88e37e2e2934f493458';
    
    /**
     * 正式环境的api地址
     *
     * @var string
     */
    protected $apiProductUrl = 'http://order.api.7yundong.cn/';
    
    /**
     * 开发环境的api地址
     *
     * @var string
     */
    protected $apiDevelopmentUrl = 'http://order.api.qydw.net/';
    

    /**
     * 按当天取订单列表
     * http://order.api.qydw.net/shangjia/order/order_list?cat_id=1&book_date=1467043200&action=shangjia_get_order_list&client_time=1467265303&venues_id=10&api_sign=43b650ca84971b0370f29efcb7410573
     *
     * @author bumtime
 	 * @date 2016-06-29
	 * 
     * @param  array $param 参数数组（venues_id：场馆ID，cat_id：项目分类ID，book_date：默认日期（当天0点时间戳））
     * @return array 接口数据
     */
    public  function getOrderListbyDate(array $params)
    {
/*     	$arryReturn = [];
    	if(!$arry['venues_id'] || !$arry['cat_id'] || !$arry['book_date']) return false;
 	
    	//相关参数
    	//$param['action']	=	"shangjia_get_order_list";
    	$param['cat_id']	=	$arry['cat_id'];
    	$param['venues_id']	=	$arry['venues_id'];
    	$param['book_date']	=	$arry['book_date']; */
	
    	$paths = "shangjia/order/order_list";
        $response = $this->requestGet($params, $paths);

        if (!is_array($response) || $response['status'] != '0000') {
            baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($params). "，response:" . json_encode($response), 'Orders_api_error');
        }

    	return $response;
    	
    }
    
    /**
     * 获取场馆新支付订单
     * http://order.api.qydw.net/shangjia/order/order_newOrderRemind?request_time=1468207200&suppliers_id=38&api_sign=8fa6a2dfbcb720b3702a3550fbd0ccd4
     *
     * @author bumtime
     * @date 2016-07-12
     *
     * @param  array $param 参数数组（suppliers_id：场馆商ID，request_time：当天时间戳）
     * @return array 接口数据
     */
    public  function getOrderPayListByTime(array $params)
    {
    	$paths = "shangjia/order/order_newOrderRemind";
        $response = $this->requestGet($params, $paths);

        if (!is_array($response) || $response['status'] != '0000') {
            baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($params). "，response:" . json_encode($response), 'Orders_api_error');
        }

    	return $response;
    }
    
    /**
     * 获取场馆新退款订单
     * http://order.api.qydw.net/shangjia/order/order_newRefundRemind?request_time=1438207200&suppliers_id=38&api_sign=4d898a9e69ac971a308a82506347ba6c
     *
     * @author bumtime
     * @date 2016-07-12
     *
     * @param  array $param 参数数组（suppliers_id：场馆商ID，request_time：当天时间戳）
     * @return array 接口数据
     */
    public  function getOrderRefundListByTime(array $params)
    {
    	$paths = "shangjia/order/order_newRefundRemind";
        $response = $this->requestPost($params, $paths);

        if (!is_array($response) || $response['status'] != '0000') {
            baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($params). "，response:" . json_encode($response), 'Orders_api_error');
        }

    	return $response;
    
    }
  
    
    /**
     * 获取场馆某一条结算记录的订单列表
     * 
     * @param array $params
     * @return mixed
     * @author xiaoyanchun
     */
    public function getClearingLogOrders(array $params) {
        
        $path = 'shangjia/bill/clearing_log_orders';
        $response = $this->requestGet($params, $path);

        if (!is_array($response) || $response['status'] != '0000') {
            baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($params). "，response:" . json_encode($response), 'Orders_api_error');
        }
        
        return $response;
    }
    
    /**
     * 获取场馆未结算订单信息
     *
     * @param array $params
     * @return mixed
     * @author xiaoyanchun
     */
    public function getUnsettledOrderInfo(array $params) {
    
        $path = 'shangjia/bill/unsettled_info';
        $response = $this->requestGet($params, $path);

        if (!is_array($response) || $response['status'] != '0000') {
            baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($params). "，response:" . json_encode($response), 'Orders_api_error');
        }
    
        return $response;
    }
    

    /**
     * 获取场馆未结算订单信息明细
     * http://order.api.qydw.net/shangjia/bill/not_settled_info?suppliers_id=38&client_time=1470449020&start_time=1469980843&end_time=1470499243&api_sign=11bf7c87dca9906d6334cdb550547276
     *
     * @author bumtime
     * @date 2016-08-06
     *
     * @param  array $param 参数数组（suppliers_id：场馆商ID，start_time：开始时间， end_time：结束时间）
     * @return array 接口数据
     */
    public function getUnsettledOrderInfoList(array $params) {
    
    	$path = 'shangjia/bill/not_settled_info';
        $response = $this->requestGet($params, $path);

        if (!is_array($response) || $response['status'] != '0000') {
            baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($params). "，response:" . json_encode($response), 'Orders_api_error');
        }
    
    	return $response;
    }

    /**
     * 根据消费日期查询总结算金额
     */
    public function getTotalSettlePrice($venues_id,$start_time,$end_time){
        $path = 'shangjia/guanzhang/get_total_settle_price';

        if (empty($venues_id) || empty($start_time) || empty($end_time)) {
            baf_Logger::log2File(__METHOD__ . '参数出错:venues_id:' . $venues_id . ';start_time:' . $start_time. ';end_time:' . $end_time, 'Orders_api_error');
            return [];
        }
        // 相关参数
        $param = [
            'venues_id' => $venues_id,
            'start_time' => $start_time,
            'end_time' => $end_time,
        ];
        $response = $this->requestGet($param, $path);
        if (!is_array($response) || $response['status'] != '0000' || empty($response['data'])) {
            baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Orders_api_error');
            return [];
        }
        return $response['data'];
    }

    /**
     * 验证订单卖品
     * @param $order_id
     * @return false|string
     */
    public function verifySaleGoods($order_id) {

        $path = 'shangjia/order/verify_sale';
        $params = array('order_id' => $order_id);
        $response = $this->requestGet($params, $path);

        if (!is_array($response) || $response['status'] != '0000') {
            baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($params). "，response:" . json_encode($response), 'Orders_api_error');
        }

        return $response;
    }
    
    
    /**
     * 添加下单
     *
     * @author bumtime
     * @date 2016-10-17
     *
     * @param  array $param 
     * @return array 接口数据
     */
    public function InsertOrder($param)
    {
    	if (empty($param['goods_ids']) || empty($param['user_id']) || empty($param['phone_encode'])) {
    		baf_Logger::log2File(__METHOD__.'参数出错' . json_encode($params) , 'Orders_api_error');
    	}
    	
    	$path = 'index';
    	$params = [
    			'action'		=> 'insert_order_field',
    			'goods_ids'		=> $param['goods_ids'],
    			'goods_number'	=> $param['goods_number'],
    			'order_type'	=> 0,
    			'user_id'		=> $param['user_id'],
    			'phone_encode'	=> $param['phone_encode'],
    			'ver' 			=> '2.0',
    			'utm_medium'	=> $param['utm_medium'],
    			'utm_source'	=> $param['utm_source'],
    			'user_name'		=> $param['user_name']
    	];

    	$response = $this->requestGet($params, $path);
  
    	if (!is_array($response) || $response['status'] != '0000') {
    		baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($params). "，response:" . json_encode($response), 'Orders_api_error');
    	}

    	return $response;
    }
       
    
    /**
     *  预留订单重发短信
     *
     * @author bumtime
     * @date 2016-10-17
     *
     * @param  array $param
     * @return array 接口数据
     */
    public function orderResendSms($param) 
    {
    	if (empty($param['order_id'])) {
    		baf_Logger::log2File(__METHOD__.'参数出错' . json_encode($params) , 'Orders_api_error');
    	}
    	$path = '/shangjia/order/resend_sms';
        $params = [
        		'order_id' => $param['order_id']  		
        ];
        $response = $this->requestGet($params, $path);

        if (!is_array($response) || $response['status'] != '0000') {
            baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($params). "，response:" . json_encode($response), 'Orders_api_error');
        }

        return $response;
    }
    
    
    /**
     * 取消下单
     *
     * @author bumtime
     * @date 2016-10-17
     *
     * @param  array $param
     * @return array 接口数据
     */
    public function cancelOrder($param)
    {
    	if (empty($param['order_id']) || empty($param['user_id'])) {
    		baf_Logger::log2File(__METHOD__.'参数出错' . json_encode($params) , 'Orders_api_error');
    	}
    	 
    	$path = 'index';
    	$params = [
    			'action'		=> 'cancel_order',
    			'user_id'		=> $param['user_id'],
    			'order_id'		=> $param['order_id']
    	];
    	$response = $this->requestGet($params, $path);
    
    	if (!is_array($response) || $response['status'] != '0000') {
    		baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($params). "，response:" . json_encode($response), 'Orders_api_error');
    	}
    
    	return $response;
    }
    
    
    /**
     * 取发票订单
     *
     * @author bumtime
     * @date 2016-12-15
     *
     * @param  array $param
     * @return array 接口数据
     */
    public function invoiceOrder($param)
    {
    	if (empty($param['venues_id'])) {
    		baf_Logger::log2File(__METHOD__.'参数出错' . json_encode($params) , 'Orders_api_error');
    	}
    
    	$path = 'shangjia/bill/invoiceOrderList';
    	$params = [
    			'venues_id'		=> $param['venues_id'],
    			'start_date'	=> $param['start_date'],
    			'end_date'		=> $param['end_date']
    	];
    	$response = $this->requestGet($params, $path);
    
    	if (!is_array($response) || $response['status'] != '0000') {
    		baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($params). "，response:" . json_encode($response), 'Orders_api_error');
    	}
    
    	return $response;
    }
    
    
    /**
     * 更新订单明细详情
     *
     * @author bumtime
     * @date 2017-01-21
     *
     * @param  array $param
     * @return array 接口数据
     */
    public function replaceOrderGoods($param)
    {
    	if (empty($param['replace_json_content']) ) {
    		baf_Logger::log2File(__METHOD__.'参数出错' . json_encode($param) , 'Orders_api_error');
    	}
    
    	$path = 'shangjia/order/replaceOrderGoods';
    	$params = [
    			'replace_json_content'	=> $param['replace_json_content']
    	];
    	$response = $this->requestGet($params, $path);

    	if (!is_array($response) || $response['status'] != '0000') {
    		baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($params). "，response:" . json_encode($response), 'Orders_api_error');
    	}
    
    	return $response;
    }
    
    /**
         * 读取球局列表
         *
         * @author chenchao
         * @date 2017-02-10
         *
         * @param  array $param
         */
        public function getCourtJoinList($param)
        {
            if (empty($param['suppliers_id'])) {
                baf_Logger::log2File(__METHOD__.'参数出错' . json_encode($param) , 'Orders_api_error');
            }
        
            $path = 'shangjia/order/getShangjiaCourtJoinList';
            $response = $this->requestGet($param, $path);

            if (!is_array($response) || $response['status'] != '0000') {
                baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Orders_api_error');
            }
        
            return $response;
        }

        /**
         * 读取球局参与人员信息
         *
         * @author chenchao
         * @date 2017-02-10
         *
         * @param  array $param
         */
        public function getCourtJoinInfo($param)
        {
            if (empty($param['cj_order_id'])) {
                baf_Logger::log2File(__METHOD__.'参数出错' . json_encode($param) , 'Orders_api_error');
            }
        
            $path = 'shangjia/order/getShangjiaCourtJoinInfo';
            $response = $this->requestGet($param, $path);

            if (!is_array($response) || $response['status'] != '0000') {
                baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Orders_api_error');
            }
        
            return $response;
        }

        /**
         * 读取球局参与人员信息
         *
         * @author chenchao
         * @date 2017-02-10
         *
         * @param  array $param
         */
        public function getCourtJoinShare($param)
        {
            if (empty($param['cj_order_id'])) {
                baf_Logger::log2File(__METHOD__.'参数出错' . json_encode($param) , 'Orders_api_error');
            }
        
            $path = 'shangjia/order/getShangjiaCourtJoinInfo';
            $response = $this->requestGet($param, $path);

            if (!is_array($response) || $response['status'] != '0000') {
                baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Orders_api_error');
            }
        
            return $response;
        }

        /**
         * 取消球局
         *
         * @author chenchao
         * @date 2017-02-10
         *
         * @param  array $param
         */
        public function cancelCourtJoin($param)
        {
            if (empty($param['cj_order_id'])) {
                baf_Logger::log2File(__METHOD__.'参数出错' . json_encode($param) , 'Orders_api_error');
            }
        
            $path = 'shangjia/order/cancelCourtJoin';
            $response = $this->requestGet($param, $path);

            if (!is_array($response) || $response['status'] != '0000') {
                baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Orders_api_error');
            }
        
            return $response;
        }

        /**
         * 添加球局
         *
         * @author chenchao
         * @date 2017-02-10
         *
         * @param  array $param
         */
        public function addCourtJoin($param)
        {
            if (empty($param['user_id']) || empty($param['phone']) || empty($param['course_id']) || empty($param['start_time']) || empty($param['end_time']) || empty($param['field_capacity']) ) {
                baf_Logger::log2File(__METHOD__.'参数出错' . json_encode($param) , 'Orders_api_error');
            }
        
            $path = 'index';
            $params = [
                    'action'        => 'insert_order_shangjia_court_join',
                    'phone'         => $param['phone'],
                    'course_id'     => $param['course_id'],
                    'order_type'    => $param['order_type'],
                    'user_id'       => $param['user_id'],
                    'start_time'    => $param['start_time'],
                    'end_time'      => $param['end_time'],
                    'field_capacity'=> $param['field_capacity'],
                    'is_refund'     => $param['is_refund'],
                    'unit_price'    => $param['unit_price'],
                    'week_cycle'    => $param['week_cycle'],
                    'description'   => $param['description'],
                    'ver'           => '2.0',
                    'utm_medium'    => 'court_join',
                    'utm_source'    => helper_VenuesHelper::getutmSource()
            ];
            $response = $this->requestGet($params, $path);

            if (!is_array($response) || $response['status'] != '0000') {
                baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($params). "，response:" . json_encode($response), 'Orders_api_error');
            }
        
            return $response;
        } 

        /**
         * 修改球局
         *
         * @author chenchao
         * @date 2017-02-14
         *
         * @param  array $param
         */
        public function updateCourtJoin($param)
        {
            if (empty($param['cj_order_id']) || empty($param['course_id']) || empty($param['field_capacity']) ) {
                baf_Logger::log2File(__METHOD__.'参数出错' . json_encode($param) , 'Orders_api_error');
            }

            $path = 'shangjia/order/updateCourtJoin';
            $response = $this->requestGet($param, $path);

            if (!is_array($response) || $response['status'] != '0000') {
                baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Orders_api_error');
            }
        
            return $response;
        }  

        /**
         * 修改固定球局
         *
         * @author chenchao
         * @date 2017-02-22
         *
         * @param  array $param
         */
        public function updateFixedCourtJoin($param)
        {
            if (empty($param['id']) || empty($param['suppliers_id']) ) {
                baf_Logger::log2File(__METHOD__.'参数出错' . json_encode($param) , 'Orders_api_error');
            }

            $path = 'shangjia/order/updateFixedCourtJoin';
            $response = $this->requestGet($param, $path);

            if (!is_array($response) || $response['status'] != '0000') {
                baf_Logger::log2File(__METHOD__ . "接口出错：param：". json_encode($param). "，response:" . json_encode($response), 'Orders_api_error');
            }
        
            return $response;
        }  
        

}