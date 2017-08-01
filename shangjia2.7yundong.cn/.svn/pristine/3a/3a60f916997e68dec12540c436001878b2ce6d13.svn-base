<?php
/**
 * 统计助手类
 *
 */
class helper_StatHelper
{
    //支付方式
    const PAY_MODE = [
        '0' =>'现金', //	启用	　	　
        '1' => '储值卡', //	启用	界面上显示是储值卡	　
        '2' => '银行卡', //	启用	　	　
        '3' => '次卡', //	启用	　	　
        '4' => '赠送余额', //	启用	（仅在sm_order.pay_catalog_details 中有效。）	　
        //'5' => '白条', //	禁用	未启用	　
        //'6' => '储值卡', //	禁用	未启用	　
        '7' => '趣运动', //	启用	　	　
        '8' => '微信', //	启用	　	2015/11/26 14:26
        '9' => '团购券', //	启用	　	2015/11/27 14:26
        '10' => '支付宝', //	启用	　	2015/11/28 14:26
        '11' => '代金券', //	启用	　	2015/11/29 14:26
        '12' => '支票', //	启用	　	2015/11/30 14:26
        //'100' => '赠送会员卡', //	禁用
        // '999' => '多种支付',    //启用	 	2016/05/03 10:30
    ];
    //收款类型
    const INCOME_TYPE = [
        '1' => '订单收款',
        '2' => '次卡充值',
        '3' => '会员卡充值',
        '4' => '订单退款',
        '5' => '退费',
    ];
    //收款类型
    const INCOME_TYPE_NEW = [
    		'1' => '订单收款',
    		'2' => '场次卡充值',
    		'3' => '储值卡充值',
    		'4' => '订单退款',
    		'5' => '储值卡退费',
    		'70' => '人次卡开卡',
    		'71' => '人次卡充值',
    		//'60' => '人次票销售',//旧版
    		'40' => '人次票销售',//新版
    		'41' => '人次票退款',//新版
    		'80' => '时间卡开卡', 
    		'81' => '时间卡充值',
    		'90' => '订单收款',
    		'91' => '订单退款',
    ];
    
    //订单类型
    const ORDER_TYPE = [
        '1' => '场地',
        '2' => '商品',
        '3' => '会员',
        '4' => '人次票',
    ];
    
    //订单类型
    const ORDER_TYPE_NEW = [
    		'1' => '场地',
    		'2' => '卖品',// 商品
    		'3' => '储值卡',
    		'4' => '售票',//人次票（含新旧两版）4新版,6为旧版人次票
    		'5' => '场次卡',//以前次卡
    		'7' => '人次卡',
    		'8' => '时间卡',
    		'9' => '租赁'
    
    ];
     
    //会员交易类型(1充值、2退费（充值提现）、3扣款（场次）、4退款（场次），5扣款（商品）、6退款（商品）,7扣款（人次），8退款（人次）)
    const MEMBER_TRADING_TYPE = [
    		'1' => '充值',
    		'2' => '退费',
    		'3' => '扣款',
    		'4' => '退款',
    		'5' => '扣款',
    		'6' => '退款',
    		'7' => '扣款',
    		'8' => '退款'  	
    ];
    //日结统计分类
    const INCOME_ORDER_TYPE = [
        '1' => '场地',
        '2' => '商品',
        '3' => '储值卡充值',
        '5' => '次卡充值',
        '4' => '人次票',
    ];
    
    //日结统计分类  	//旧订单数据，包括1场地收入，2商品收入，3会员充值，4人次票收入，5次卡充值, 41新版人次票，7人次卡，8时间卡， 21租赁
    const INCOME_ORDER_TYPE_NEW = [
    		'1' => '场地',
    		'2' => '卖品',
    		'3' => '会员充值',
    		'4' => '售票',
    ];
    
    //订单类型
    const ORDER_TYPE_MEMBER = [
    		'1' => '商品',
    		'2' => '会员',
    		'3' => '场地',
    		'6' => '人次票'
    ];

    /**
     * 取场馆的会员卡类型(redis)
     *
     * @author bumtime
     * @date 2016-08-15
     *
     * @param  array $param 参数数组（venues_id：场馆ID）
     * @return array 接口数据
     */
    public  static function getMembersCardType($venues_id)
    {

    	$redis = baf_Redis::factory();
    	$cacheKey = 'venues_member_card_type:' . $venues_id ;
    	$cardTypeList = $redis->getArrayValue($cacheKey);
    	 if (empty($cardTypeList)) { 
    		//场馆列表
    		try {
    			//管理员
    			$param = [ 'venues_id'	=>	$venues_id ];
    			$repList = Loader::api('Stat')->getMembersCardType($param);
    			$cardTypeList = isset($repList['data']) ? $repList['data'] : [];
    			 
    		} catch (Exception $e) {
    			baf_Logger::log2File('Stat.api取场馆会员卡列表出错venues_id:'.$venues_id. ' error: '. $e->getMessage(), 'Stat_api_error');
    		}
    		 if (!empty($adminList)) {
    			$redis->setArrayValue($cacheKey, $cardTypeList, 600);
    		}
    	} 
    	return empty($cardTypeList) ? [] : $cardTypeList;
    }
}
