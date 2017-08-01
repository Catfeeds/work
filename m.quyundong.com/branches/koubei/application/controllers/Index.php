<?php
class IndexController extends DefaultController
{
    /**
     * 首页
     */
	public function indexAction()
	{
		$this->resetSomeSession();
		//设置默认城市ID
		$city_id = api_CoreHelper::getCookie('city_id');
		if (empty($city_id)){
			if(CHANNEL_SOURCE=='qqwallet'){
				$city_id = 76;
				$this->initCity($city_id);
			}else{
				//跳转选择城市页面
				$this->redirect('index/city');	
			}			
		}

//		$mobile = $this->getParam('mobile',1);
//		$handler = new ext_MobileDetect();
// 		if(!$handler->isMobile() &&  $mobile == 1){
// 			header('location:http://www.quyundong.com');//暂时关闭
// 		}
		$courtKey = '7yundong:court_category_list:'.$city_id;
        //获取分类
		$param = array('city_id' => $city_id, 'user_id' => $this->uid);
        $categoryList = array();
        $categoryVal = baf_Redis::factory()->get($courtKey);
        if($categoryVal){
           $categoryList = unserialize($categoryVal);
        }else{
            $res = api_Court::getIndex($param);
            if (is_array($res) && isset($res['status']) && $res['status'] == SUCCESS_STATUS) {
                $categoryList = $res['data']['categories'];
                baf_Redis::factory()->set($courtKey,serialize($categoryList),300);
            }
        }
        //场馆信息
		$venueRes = api_Court::getIndexVenues($param);
        $hotList = isset($venueRes['data']) ? $venueRes['data']:array();
        
        //调用获取页面标题、关键字和介绍
        $utm_sources = 'wap';
        if (CHANNEL_SOURCE) {
        	$utm_sources = CHANNEL_SOURCE;
        	if(!empty($categoryList)) $categoryList = $this->sortCategoryByChannel($categoryList);
        } else{
        	$utm_sources = api_CoreHelper::IsWenXinBrowser() ? 'weixin' : 'wap';
        }
		$this->setPageTitle(array('utm_source'=>$utm_sources));

		//登陆成功进去用户
		$url = baf_Base::base_url().'/user';
		$this->setReturnUrl($url);
		$this->_view->assign(array(
			'hot_list' 		=> $hotList,
			'category_list' => $categoryList,
			'index_falg'	=> 'index'
		));
	}


	public function tplAction(){
		$tpl = $this->getParam('tpl');
		Yaf_Dispatcher::getInstance()->autoRender(FALSE);
		$this->getView()->display('tpl/'.$tpl.'.html');
	}

	/**
	 * 设置当前城市
	 */
	public function cityAction(){
		//辽宁省体育局，只显示辽宁的城市，其它渠道独立显示开通城市暂不考虑 add by chenchao 2016-10-26
		$cid = (int) $this->getParam('cid',0);
		$redirect = '/index/getCity';
		if($cid>0) $redirect .= '?cid='.$cid;
		$this->redirect($redirect);
		return false;
		$param = array();
		if (in_array(CHANNEL_SOURCE,Config::$hideItem)){
			$param = array('channel_source' => CHANNEL_SOURCE);
		}
		$open_city = api_Court::cities($param);

		if(empty($open_city)){
			$open_city[] = array(
					'city_id' => 76,
					'city_name' =>'广州',
			);
		}

		//cid标识用于微信跳转到目标页面---bigticket
		$cid = (int) $this->getParam('cid',0);

		//调用获取页面标题、关键字和介绍
        $utm_sources = CHANNEL_SOURCE ? CHANNEL_SOURCE : 'wap';
		$this->setPageTitle(array('utm_source'=>$utm_sources));
		
		$this->_view->assign(array(
				'cid' => $cid,
				'open_city' => $open_city
		));
	}

	/**
	 * ajax获取城市数据
	 */
	public function getCityAction(){
		$res = baf_Common::initRes();
		$cid = (int) $this->getParam('cid',0);
		$param = array();
		if (in_array(CHANNEL_SOURCE,Config::$hideItem)){
			$param = array('channel_source' => CHANNEL_SOURCE);
		}
		$open_city = api_Court::cities($param);
		$hot = array();
		$lists = array();
		if(!empty($open_city)){
			foreach ($open_city as $k => $v) {
				if($v['is_hot']) $hot[] = array('id'=>$v['city_id'], 'name'=>$v['city_name'],'pinyin'=>!empty($v['pinyin']) ? $v['pinyin'] : '');
				$lists[] = array('id'=>$v['city_id'], 'name'=>$v['city_name'],'pinyin'=>!empty($v['pinyin']) ? $v['pinyin'] : '');
			}
		}
		$data = array(
				'hot' => $hot,
				'list' => $lists,
				'cid' => $cid
			);
		$utm_sources = CHANNEL_SOURCE ? CHANNEL_SOURCE : 'wap';
		$this->setPageTitle(array('utm_source'=>$utm_sources));
		
		Yaf_Dispatcher::getInstance()->autoRender(FALSE);

		$this->display('getcity' , array('data'=>$data));
	}

    /**
     * JS 切换城市
     *
     * @param city_id int 城市ID
     * @author chenchao
     * @return JSON
     */
	public function setCityAction(){
		$city_id = intval($this->getParam('city_id', 0));
        $city_name = $this->getParam('city_name');
        if ($city_id > 0){
            api_CoreHelper::setCookie('city_id', $city_id, 30*3600*24); //30天有效
            api_CoreHelper::setCookie('city_name', $city_name, 30*3600*24); //30天有效
            api_CoreHelper::setCookie('set_city', '1', 86400); //1天有效
            $this->readJson(baf_ResCode::msg(''));
        }else{
            $this->readJson(baf_ResCode::msg(baf_ResCode::SYSTEM_ERROR));
        }
	}

	private function resetSomeSession(){
		if(isset($_SESSION['hide_menu'])) unset($_SESSION['hide_menu']);
		if(isset($_SESSION['channel_source'])) unset($_SESSION['channel_source']);
	}

    public function searchAction(){

    	//调用获取页面标题、关键字和介绍
        $utm_sources = CHANNEL_SOURCE ? CHANNEL_SOURCE : 'wap';
		$this->setPageTitle(array('utm_source'=>$utm_sources));

        $search_text = $this->getParam('search_text','');
        $this->_view->assign(array(
            'search_text' => $search_text,
        ));
    }

	/**
	 * 场馆搜索
	 *
	 * @param  char
	 * @author dxw
	 * @return JSON
	 */

	public function searchApiAction(){
		$search_text = $this->getParam('search_text','');
        $page = $this->getParam('page',1);
		if(!$search_text){
			$this->readJson(baf_ResCode::msg());
		}
        //页码
		$searchParam = array(
			'search_text' => $search_text,
            'page'=>$page,
            'ver' => '2.3'
		);

		$resData = api_Court::searchBusiness($searchParam);
		if(isset($resData['status']) && $resData['status'] == SUCCESS_STATUS){
            $result = isset($resData['data']['businesses'])?$resData['data']['businesses']:array();
            $searchResult = array();
            $baseUrl = baf_Base::base_url();
            foreach($result as $k=>$v){
                $r['business_id'] = $v['business_id'];
                $r['name'] = $v['name'];
                $r['sub_region'] = $v['sub_region'];
                $r['address'] = $v['address'];
				$r['cid'] = $v['category_id'];
				//$r['is_support_club'] = $v['is_support_club'];
				$r['url'] = baf_CHtml::createUrl($baseUrl.'/court/detail?id='.$v['business_id'].'&cid='.$v['category_id']);
                $searchResult[] = $r;
            }
			$this->readJson(baf_ResCode::msg('',$searchResult));
		}else{
			$this->readJson(baf_ResCode::msg());
		}
	}

	/**
	 * 获取验证码
	 */
	public function getPhoneCodeAction(){
		Yaf_Dispatcher::getInstance()->autoRender(FALSE);
		if($_POST){
			$phone = $this->getParam('phone');
			$type = intval($this->getParam('type'));
			$this->checkHash(true);
			if (preg_match('/1[2345678]{1}\d{9}$/', $phone) == 0) {
				$this->readJson(baf_ResCode::msg(baf_ResCode::PHONE_ERROR));
			}
			if(!in_array($type, array(1,2,3,4,5,6,7))){
				$this->readJson(baf_ResCode::msg(baf_ResCode::GET_SMS_CODE_ERROR));
			}

			//获取验证码频率限制 60秒一次
            if(baf_Common::smsSendTimeLimit($phone)){
                $this->readJson(baf_ResCode::msg(baf_ResCode::GET_SMS_CODE_LIMIT));
            }
            
			$res = api_User::getSmsCode(array(
					'phone' => $phone,
					'type' => $type
			));
			if(isset($res['status']) && $res['status']=='0000'){
				//60内验证码只能获取一次
                baf_Common::setSmsSendTimeLimit($phone, 60);

				$this->readJson(baf_ResCode::msg());
			}else{
				$msg = isset($res['msg']) ? $res['msg'] : '操作失败';
				$status = isset($res['status']) ? $res['status'] : baf_ResCode::GET_SMS_CODE_ERROR;
				$this->readJson(array(
						'code' => $status,
						'msg' => $msg,
						'data' => (object) array()
				));
			}
		}
	}

	//更新渠道项目排序
	protected function sortCategoryByChannel($categoryList){
		$chennel = !empty($_REQUEST['utm_source']) ? $_REQUEST['utm_source'] : (!empty($_REQUEST['f']) ? $_REQUEST['f'] : ''); 
		if($categoryList && !empty($chennel) && isset(Config::$sortChannelCategory[$chennel])){
			$data = array();
			$sortData = array();
			foreach ($categoryList as $key => $value) {
				if(isset($value['category_id'])) $data[$value['category_id']] = $value;
			}
			$setting = Config::$sortChannelCategory[$chennel];
			//更新排序
			foreach ($setting as $k => $v) {
				if(isset($data[$v])){
					$sortData[] = $data[$v];
					unset($data[$v]);
				}				
			}
			//将剩余的数据合并
			if(!empty($data)) $sortData = array_merge($sortData, array_values($data));			
		}else{
			$sortData = $categoryList;
		}
		return $sortData;
	}
}
