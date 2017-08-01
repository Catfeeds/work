<?php

/**
 * 场馆控制器
 */
class VenuesController extends BaseController
{
    /**
     * 切换当前的venues
     * 把venues的信息存放到session里面
     */
    public function switchVenuesAction()
    {
        try {
            $venues_id = intval($this->getParam('venues_id'));
            helper_VenuesHelper::switchVenues($venues_id);
      
            /*
            $referer = ! empty ( $_SERVER ['HTTP_REFERER'] ) ? $_SERVER ['HTTP_REFERER'] : '';
            //寫log
            $logContent = json_encode ( array (
					'venues_id' => $venues_id,
					'session' => $_SESSION,
					'http_referer'=>$referer
			));
            
                      
            if (false === strpos($referer,'switchVenues')){
            	$url = $referer;
            } 
            baf_Logger::log2File($logContent, 'switch_venues');
            */
            $url = "/goods/index";
            $this->redirect($url);

        } catch (Exception $e) {
            throw $e;
        }
    }
    
    /**
     * 检查打包下单
     * 
     */
    public function checkGroupGoodsAction()
    { 
    	//取值
    	$goods_ids 		= $this->getParam("goods_id");
    
    	$book_date 		= $this->getParam("book_date");
    	//场馆ID
    	$business_id	= helper_VenuesHelper::getCurrentVenuesId();
    	//项目ID
    	$category_id	= helper_VenuesHelper::getVenuesCatID();
    	
    	if(empty($goods_ids) || $book_date == "") {
    		$data = [
    				"status"	=>	baf_ErrorCode::ERR_PARAM,
    				"msg"		=>	"请先选择场次",
    				"data"		=>	[]
    		];
    		echo json_encode($data);
    		exit;
    	}
    	
    	//调用接口
    	$param = [
    			'goods_ids'	=>	implode(",", $goods_ids),
    			'venues_id'	=>	$business_id,
    			'cat_id'	=>	$category_id,
    			'book_date'	=>	$book_date
    	];
    
    	$list = Loader::api('Venues')->checkGoodsGroup($param);
    	
    	echo json_encode($list);
    }
}