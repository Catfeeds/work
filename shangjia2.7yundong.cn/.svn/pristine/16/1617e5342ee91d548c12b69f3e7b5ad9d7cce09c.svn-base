<?php
/**
 * 此文件主要是用来测试
 * 
 * @author xiaoyanchun
 */
class TestController extends BaseController
{
    // 测试数据库连接
    public function testDbAction()
    {
        $sql = 'SELECT user_id FROM gs_users WHERE mobile_phone=:mobile_phone';
        $bind = array(':mobile_phone' => '15920133405');
        $row = Loader::modelSlave()->fetchOne($sql, $bind);
        var_dump($row);
        exit;
    }
    
    // 测试business数据库连接
    public function testDb2Action()
    {
        $sql = 'SELECT id FROM gs_user_card order by id asc limit 1';
        $row = Loader::businessModel()->fetchRow($sql);
        var_dump($row);
    }
    
    
    // 测试redis是否正常
    public function testRedisAction()
    {
        $redis = baf_Redis::factory();
        
        $cacheKey = 'shangjia_system_test_redis';
        $cacheValue = array('name' => 'angel', 'age' => '99');
        
        // 获取
        $value = $redis->getArrayValue($cacheKey, 600); // 10分钟
        echo 'get:'.json_encode($value).'<br/>';
        
        // 设置
        $set = $redis->setArrayValue($cacheKey, $cacheValue);
        echo 'set:'.intval($set).'<br/>';
        
        if (isset($_GET['delete']) && $_GET['delete']) {
            // 删除
            $del = $redis->delete($cacheKey);
            echo 'delete:'.$del;
        }
        
        exit;
    }
    
    // 测试发送短信
    public function testSendSmsAction()
    {
        $mobile = '15920133405';
        $content = '测试短信内容';
        
        $sendIsOk = Loader::api('Sms')->send($mobile, $content);
        
        if ($sendIsOk) {
            echo '发送短信成功';
        } else {
            echo '发送短信失败';
        }
        exit;
    }
    
    // 测试发送邮件
    public function testSendEmailAction() {
       
        if (IS_PRODUCT_ENVIRONMENT) {
            $ext = '正式环境';
        } else {
            $ext = '测试环境';
        }
        
        $subject = "测试发送邮件标题-{$ext}";
        $body = "<b>测试发送邮件内容-{$ext}</b>";
        
        $to = array(
            'xiaoyanchun@ningmi.net',
            //'lishiyuan@ningmi.net',
            //'duanlian@ningmi.net'
        );
        
        $isOk = ext_EMailer::send($subject, $body, $to);
        
        if ($isOk) {
            echo '发送邮件成功';
        } else {
            echo '发送邮件失败';
        }
        exit;
    }
    
    //取场馆所有分类
    public function testCatAction()
    {
    	$param['venues_id'] = 10;
    	$list	=	Loader::api('Venues')->getCategoriesListByVid($param);
    	echo json_encode($list);
    }
    
    //按日期读取场次商品数据信息
    public function testGoodsAction()
    {
    	$param['business_id']	=	10;
    	$param['category_id']	=	1;
    	
    	$list	=	Loader::api('Venues')->getBookingGoods($param);
    	echo json_encode($list);
    } 
    
    //按日期读取场次商品数据信息
    public function testGoodsLockAction()
    {
    	$param['goods_ids']		=	"76286832,76286833";
    	$param['locked']		=	0;
    	$param['business_id']	=	10;
    	$param['category_id']	=	1;
    	 
    	$list	=	Loader::api('Venues')->lockCourt($param);
    	echo json_encode($list);
    }
    
    //商家后台获取某日订单列表
    public function testOrderListAction()
    {
    	$param['cat_id']	=	1;
    	$param['venues_id']	=	10;
    
    	$list	=	Loader::api('Orders')->getOrderListbyDate($param);
    	echo json_encode($list);
    }
    
    //验证订单
    public function testCheckCodeAction()
    {
    	$param['suppliers_id']	=	10;
    	$param['code']			=	'458495';
    
    	$list	=	Loader::api('Business')->checkCode($param);
    	echo json_encode($list);
    }
    
    
     //通过接口发送推广短信
    public function testSMSAction()
    {
    	$param['suppliers_id']	=	38; 	
    	$param['category_id']	=	1;    	
    	$param['phone']			=	'18011995189';    	
     	$param['admin_name']	=	'张三';   
    	$param['admin_id']		=	3;    	
     	$param['business_id']	=	10;      
    
    	$list	=	Loader::api('Business')->sendSpreadSms($param);
    	echo json_encode($list);
    }
       
    
    //取场馆的管理员
    public function testAdminAction()
    {
    	$param['suppliers_id']	=	38;
    
    	$list	=	Loader::api('Business')->getAdminList($param);
    	echo json_encode($list);
    }
    
    public function testWeekAction()
    {
    	var_dump($this->getWeek("2016-07-31","2016-08-04")) ;
    }
    
    public function testFileAction(){
 
    	$this->display('../fixed/test');
    }
    
    /*  作用由起止日期算出其中的周
     *  @param start_date 开始日期
     *  @param end_date   结束日期
     *  @return 一个二维数组，其中一维为每周起止时间
     *  @author anngly
     *  @date 2013-06-08
     *  注意：end_date>state_date
     **/
     
    private function getWeek($startdate,$enddate)
    {
    	//参数不能为空
    	if(!empty($startdate) && !empty($enddate)){
    
    		//先把两个日期转为时间戳
    		$startdate=strtotime($startdate);
    		$enddate=strtotime($enddate);
    		//开始日期不能大于结束日期
    		if($startdate<=$enddate){
    			$end_date=strtotime("next monday",$enddate);
    			if(date("w",$startdate)==1){
    				$start_date=$startdate;
    			}else{
    				$start_date=strtotime("last monday",$startdate);
    			}
    			//计算时间差多少周
    			$countweek=($end_date-$start_date)/(7*24*3600);
    			for($i=0;$i<$countweek;$i++){
    				$sd=date("Y-m-d",$start_date);
    				$ed=strtotime("+ 6 days",$start_date);
    				$eed=date("Y-m-d",$ed);
    				$arr[]=array($sd,$eed);
    				$start_date=strtotime("+ 1 day",$ed);
    			}
    			return $arr;
    		}
    	}
    }
    
    public function checkInfoAction(){
        try{
            $redis = baf_Redis::factory();
    
            $cat_arr = array();
            $cat_arr = $redis->getArrayValue("shangjia:test");
            var_dump($cat_arr);
            if(empty($cat_arr)){
                $test_list  =[
                    'info' => "xdfefefe",
                    'num'  =>  "3430"
                ];
                //$temp = serialize($test_list);
                 
                $redis->setArrayValue("shangjia:test", $test_list, 1200 );
            }
        	
        	
    	}
    	catch(Exception $e){
    	    print_r($e->getMessage());
    	}
    }
    
   
    
}