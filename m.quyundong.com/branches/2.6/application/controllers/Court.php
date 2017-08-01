<?php

class CourtController extends DefaultController
{

    /**
     * 场馆列表
     * 1.条件待完善
     *
     * @param bid int 场馆ID
     * @param cid int 项目分类ID
     * @author chenchao
     */
    public function indexAction()
    {
        //设置默认城市ID
        $city_id = api_CoreHelper::getCookie('city_id');
        //cid标识用于微信跳转到目标页面---bigticket
        $cid = (int)$this->getParam('cid', 0);
        $rid = (int)$this->getParam('rid', 0); //增加区域ID
        if ($city_id < 1) {
            //寻球当没有城市时，跳转选择城市 add by chenchao 2017-01-12
            if (in_array(CHANNEL_SOURCE, ExtendConfig::$xunqiu)){
                //跳转选择城市页面
                $this->redirect('/index/getCity?cid=' . $cid . '&utm_source='. CHANNEL_SOURCE);
                exit;
            }
            $city_id = $this->getParam('city_id', '76');
        }
        if (api_CoreHelper::IsWenXinBrowser() && $cid && empty($city_id)) {
            //跳转选择城市页面
            $this->redirect('index/city?cid=' . $cid);
            exit;
        } else {
            $city_id = api_CoreHelper::getCityId();
        }

        $cid = $this->getParam('cid', '1');

        //获取分类
        $courtKey = '7yundong:court_category_list:' . $city_id;
        $param = array('city_id' => $city_id, 'user_id' => $this->uid);
        $category_list = array();
        $categoryVal = baf_Redis::factory()->get($courtKey);
        if ($categoryVal) {
            $category_list = unserialize($categoryVal);
        } else {
            $res = api_Court::getIndex($param);
            if (is_array($res) && isset($res['status']) && $res['status'] == SUCCESS_STATUS) {
                $category_list = $res['data']['categories'];
                baf_Redis::factory()->set($courtKey, serialize($category_list), 300);
            }
        }
        if (!empty($category_list) && is_array($category_list)) {
            foreach ($category_list AS $cv) {
                if ($cv['category_id'] == $cid) {
                    $category_name = $cv['category_name'];
                    break;
                }
            }
        }
		$region_list = $this->_get_regions($city_id);
		if (!empty($region_list) && is_array($region_list)) {
            foreach ($region_list AS $cv) {
                if ($cv['region_id'] == $rid) {
                    $region_name = $cv['region_name'];
                    break;
                }
            }
        }

        //调用获取页面标题、关键字和介绍
        $utm_sources = CHANNEL_SOURCE ? CHANNEL_SOURCE : 'wap';
        $this->setPageTitle(array('utm_source'=>$utm_sources));

        $this->_view->assign(array(
            'category_name' => isset($category_name) ? $category_name : '',
            'category_id' => $cid,
            'category_list' => $this->_get_cate(),//搜索项目分类
            'region_list' => $region_list,//搜索城区列表
			'region_id' => $rid,//区域ID
			'region_name' => isset($region_name) ? $region_name : '',//区域名称
        ));
    }

    /**
     * 场馆详情
     */
    public function detailAction()
    {

        $id = $this->getParam('id');
        $cid = intval($this->getParam('cid', '1'));
        $from = $this->getParam('from', '0');    //来源
        $said = intval($this->getParam('said', '0'));    //管理员ID
        $usecard = $this->getParam('card');

        //具体信息详情
        $res = $this->_getDetail($id, $cid);
        if (empty($res)) {
            $this->display('detail-dis', array());
            exit;
        }
        // 场馆的相册
        $gallParam = array('business_id' => $id,'category_id'=>$cid);
        $galleryArr = $this->_getCourtGallery($gallParam);

        /**
         * 因为相册的图片的第一张,是场馆第一张相片,
         * 场馆第一张相片如果没有上传的话, 会返回如下的数据记录，所以需要清除
         *
         * [data] => Array
         * (
         * [0] => Array
         * (
         * [id] => 1
         * [img_url] =>
         * [thumb_url] =>
         * )
         * )
         */
        if (!empty($galleryArr)) {
            foreach ($galleryArr as $key => $img) {
                // 删除图片为空的记录
                if (empty($img['img_url'])) {
                    unset($galleryArr[$key]);
                    continue;
                }
            }
        }
        //获取三条评论
        $commentParam = array(
            'business_id' => $id,
            'page' => '1',
            'count' => '3',
            'ver' => '1.1',
        );
        $commArr = $this->_getNewCommnet($commentParam);
        //获取圈子信息
        $topicParam = array(
            'venues_id' => $id,
        );
        $topicArr = array();
        if(!in_array(UTM_SOURCE,Config::$source4Nothing)){
            $topicArr = $this->_hot_topic($topicParam);
        }        

        if ($from > 0) {
            //记录来源统计
            api_CoreHelper::setCookie('dfrom', $from, 86400 * 2);
            //是否扫描推广
            if ($from == '11' && $said > 0) {
                //写Cookie
                api_CoreHelper::setCookie('said', $said, 86400 * 2); //二天有效,二天过后，无效
                api_CoreHelper::setCookie('category_id', $cid, 86400 * 2);
                api_CoreHelper::setCookie('business_id', $id, 86400 * 2);
            }
        } else {
            $from = api_CoreHelper::getCookie('dfrom'); //读取来源 add by chenchao
        }

        //调用获取页面标题、关键字和介绍
        $venues_name = '';
        if (isset($res['name'])) {
            $venues_name = $res['name'];
        }
        $utm_sources = 'wap';
        if (CHANNEL_SOURCE) {
            $utm_sources = CHANNEL_SOURCE;
        } elseif (api_CoreHelper::IsWenXinBrowser()){//微信渠道
            $utm_sources = 'weixin';
        }
        $this->setPageTitle(array('utm_source'=>$utm_sources, 'venues_name'=>$venues_name));

        $assignData = array(
            'detail' => $res,
            'from' => $from,
            'cid' => $cid,
            'galleryArr' => $galleryArr,
            'comArr' => $commArr,
            'topicArr' => $topicArr,
            'wxGroupQrCode' => api_Venues::getVenuesQrcode($id),
            'param_share' => (isset($_GET['share']) && !empty($_GET['share'])) ? 1 : 0
        );

        if ($usecard) {
            $assignData['card'] = 1; //标记从会员卡进入
        }
        $this->display('detail',$assignData);
        exit;
    }

    /**
     * 场馆名片页
     */
    public function viewAction()
    {
        $id = $this->getParam('id');
        $cid = intval($this->getParam('cid', '1'));
        $from = $this->getParam('from', '0');    //来源
        $said = intval($this->getParam('said', '0'));    //管理员ID
        $res = $this->_getDetail($id, $cid);
        if (empty($res)) {
            $this->display('detail-dis', array());
            exit;
        }
        if(!isset($_GET['wechat_id']) || empty($_SESSION['wechat_id'])) $_SESSION['channel_source'] = 'venuecard';//设置来源渠道标识 优先使用公众号来源
        $_SESSION['hide_menu'] = 1;//隐藏头标题
        // 获取场馆的相册数据
        $galleryRes = api_Court::getCourtGallery(array('business_id' => $id, 'category_id' => $cid, 'page' => 1, 'count' => 5));

        // 场馆的相册
        $galleryArr = array();
        if (is_array($galleryRes) && isset($galleryRes['status']) && $galleryRes['status'] == SUCCESS_STATUS) {
            $galleryArr = $galleryRes['data'];
        }

        if (!empty($galleryArr)) {
            foreach ($galleryArr as $key => $img) {
                // 删除图片为空的记录
                if (empty($img['img_url'])) {
                    unset($galleryArr[$key]);
                    continue;
                }
            }
        }

        //获取三条评论
        $commentParam = array(
            'business_id' => $id,
            'page' => '1',
            'count' => '3',
            'ver' => '1.1',
        );

        $commArr = $this->_getNewCommnet($commentParam);
        //获取圈子信息
        $topicParam = array(
            'venues_id' => $id,
        );
        $topicArr = $this->_hot_topic($topicParam);

        if ($from > 0) {
            //记录来源统计
            api_CoreHelper::setCookie('dfrom', $from, 86400 * 2);
            //是否扫描推广
            if ($from == '11' && $said > 0) {
                //写Cookie
                api_CoreHelper::setCookie('said', $said, 86400 * 2); //二天有效,二天过后，无效
                api_CoreHelper::setCookie('category_id', $cid, 86400 * 2);
                api_CoreHelper::setCookie('business_id', $id, 86400 * 2);
            }
        } else {
            $from = api_CoreHelper::getCookie('dfrom'); //读取来源 add by chenchao
        }

        //调用获取页面标题、关键字和介绍
        $venues_name = '';
        if (isset($res['name'])) {
            $venues_name = $res['name'];
        }
        $utm_sources = 'wap';
        if (CHANNEL_SOURCE) {
            $utm_sources = CHANNEL_SOURCE;
        } else if (api_CoreHelper::IsWenXinBrowser()){//微信渠道
            $utm_sources = 'weixin';
        }
        $this->setPageTitle(array('utm_source'=>$utm_sources, 'venues_name'=>$venues_name));

        $this->_view->assign(array(
            'detail' => $res,
            'from' => $from,
            'cid' => $cid,
            'galleryArr' => $galleryArr,
            'comArr' => $commArr,
            'topicArr' => $topicArr,
        ));
    }

    /**
     * 选择场次页面
     *
     * @param bid int 场馆ID
     * @param cid int 项目分类ID
     * @param t 预订日期
     *
     * @author chenchao
     */
    public function bookAction()
    {
        $businessId = $this->getParam('bid');
        $catId = $this->getParam('cid', '1');
        $datetime = (int)$this->getParam('t');
        $utm_source = $this->getParam('utm_source');
        if (!$datetime) $datetime = CURRENT_TIMESTAMP;

        $cno = $this->getCourtMemberNumber($businessId, $catId); // 获取当前场馆的会员卡号
        $cardInfo = $this->getCourtMemberCardInfo($cno, $businessId);
        $usecard = $this->getParam('card');//标识从会员卡进入
        $date_now = strtotime(date('Y-m-d', time()));//现在日期
        $data_book = strtotime(date('Y-m-d', $datetime)); //订场日期
        $t = intval(($data_book - $date_now) / 86400);
        if ($t > 6 || $t < 0) $this->redirectMessage('场馆只开放一周内的场地预定哦');
        $_SESSION['current_venuesid'] = $businessId;//存储最新操作的场馆venues_id
        //读取预订场次信息
        $book = $this->_getBookByDay($businessId, $datetime, $catId);
        $relayDenied = false;
        if(isset($book['data']['is_relay']) && $book['data']['is_relay']==1 && (isset($_REQUEST['utm_source']) || isset($_REQUEST['f'])) && in_array(CHANNEL_SOURCE, Config::$relayDenied)){
            $relayDenied = true;
        }
        //处理结果
        $bookAble = array();
        $book_arr = array();
        if (is_array($book) && isset($book['status']) && $book['status'] == SUCCESS_STATUS) {
            if (!empty($book['data'])) {
                $book_arr = $book['data'];
            } else {
                $book_arr['start_hour'] = '9';
                $book_arr['end_hour'] = '23';
                $book_arr['promote_message'] = '';
                $book_arr['business_id'] = $businessId;
                $book_arr['category_id'] = $catId;
            }
        } else {
            $book_arr['start_hour'] = '9';
            $book_arr['end_hour'] = '23';
            $book_arr['promote_message'] = '';
            $book_arr['business_id'] = $businessId;
            $book_arr['category_id'] = $catId;
        }


        $due_order_id = '0';

        //调用获取页面标题、关键字和介绍
        $venues_name = '';
        if (isset($book_arr['name'])) {
            $venues_name = $book_arr['name'];
        }
        $utm_sourcess = 'wap';
        if (CHANNEL_SOURCE) {
            $utm_sourcess = CHANNEL_SOURCE;
        } else if (api_CoreHelper::IsWenXinBrowser()){//微信渠道
            $utm_sourcess = 'weixin';
        }
        $this->setPageTitle(array('utm_source'=>$utm_sourcess, 'venues_name'=>$venues_name));
        
        //页面不缓存
        header("Cache-Control:no-cache,must-revalidate,no-store"); //这个no-store加了之后，Firefox下有效
        header("Pragma:no-cache");
        header("Expires:-1");

        // 是否是当前场馆的会员
        $isUserCard = isset($book_arr['is_card_user']) ? $book_arr['is_card_user'] : 0;
        $isCardOrder = isset($book_arr['is_card_order']) ? $book_arr['is_card_order'] : 0;

        //外部来源不支持会员卡订场
        if (in_array(UTM_SOURCE, Config::$source4Nothing) || !$isCardOrder || CHANNEL_SOURCE=='qqwallet') {
            $isUserCard = 0;
            $cardInfo = array();
        }

        //获取后台配置的活动文字
        $promoteTip = '';
        if (CURRENT_TIMESTAMP >= strtotime('2015-11-19 00:00:00') && CURRENT_TIMESTAMP < strtotime('2015-12-01 00:00:00')) {
            $promoteTip = api_CoreHelper::getOption('promote_tip');
        }

        //注册、登录返回地址
        $this->setReturnUrl($this->redirectUrl());
        //获取未支付订单数
        if ($this->uid) {
            $param = array('user_id' => $this->uid, 'ver' => '1.1');
            $due = api_Order::orderDueCount($param);
            if (isset($due['status']) && $due['status'] == SUCCESS_STATUS) {
                $due_data = $due['data'];
            }
        }
        //获取最新活动
        $actParams = array(
            'business_id' => $businessId,
            'category_id' => $catId,
            'ver' => '1.1',
        );
        //获取最新的活动
        $actRes = api_Court::groundInfo($actParams);
        if (isset($actRes['status']) && $actRes['status'] == SUCCESS_STATUS) {
            $last_act = isset($actRes['businesses']['act_list'][0]) ? $actRes['businesses']['act_list'][0] : '';
        }
        //echo json_encode($book_arr);exit;
        $assignData = array(
            'book_arr' => $book_arr,
            'datetime' => $datetime,
            'uid' => $this->uid,
            'due_order_id' => $due_order_id,
            'businessId' => $businessId,
            'catId' => $catId,
            'isUserCard' => $isUserCard,
            'cardInfo' => $cardInfo,
            'promoteTip' => $promoteTip,
            'due_data' => isset($due_data) ? $due_data : '',
            'last_act' => isset($last_act['act_name']) ? $last_act['act_name'] : '',
            'utm_source' => isset($utm_source) ? $utm_source : '',
            'relayDenied' => $relayDenied
        );
        if ($usecard) {
            $assignData['card'] = 1; //标记从会员卡进入
        }
        $_SESSION['back_item_url'] = $this->redirectUrl();
        $this->_view->assign($assignData);
    }

    /**
     * 未支付订单
     */
    public function getOrderDueAction(){
        if($this->uid){
            $param = array('user_id' => $this->uid, 'ver' => '1.1');
            $due = api_Order::orderDueCount($param);
            if (isset($due['status']) && $due['status'] == SUCCESS_STATUS) {
                if(isset($due['data']['order']['goods_list'][0]['book_date']) && !empty($due['data']['order']['goods_list'][0]['book_date'])){
                    $due['data']['book_date'] = strtotime($due['data']['order']['goods_list'][0]['book_date']);
                }
                $this->readJson(baf_ResCode::msg('', $due['data']));
            }else{
                $this->readJson(baf_ResCode::msg(baf_ResCode::SYSTEM_ERROR));
            }
        }else{
            $this->readJson(baf_ResCode::msg(baf_ResCode::NOT_LOGIN));
        }
        return false;//关闭视图显示
    }

    /**
     * 场馆列表
     * 1.由前端JS读取
     * 2.条件待完善
     *
     * @param bid int 场馆ID
     * @param cid int 项目分类ID
     * @param page int 页码
     *
     * @author chenchao
     */
    public function getNextAction()
    {
        $page = (int)$this->getParam('page');
        $cid = (int)$this->getParam('category_id', '1');

        if ($page < 1) {
            $page = 2;
        }
        //读取信息
        $param = array(
            'city_id' => api_CoreHelper::getCityId(),
            'category_id' => $cid,
            'count' => 20,
            'page' => $page,
            'sort' => 0,
            'ver' => '2.3'
        );
        if ($this->uid) {
            $param['user_id'] = $this->uid;
        }
        if ($this->getParam('region_id')) {
            $param['region_id'] = $this->getParam('region_id', '0');
        }
        if ($this->getParam('sort')) {
            $param['sort'] = (int)$this->getParam('sort', '0');
        }

        $res = $this->_getCourt($param);
        //价格显示取整
        if (!empty($res)) {
            foreach ($res['businesses'] AS $key => $v) {
                $res['businesses'][$key]['promote_price'] = intval($v['promote_price']);
                $res['businesses'][$key]['price'] = intval($v['price']);
            }
        }
        $this->readJson(baf_ResCode::msg('', $res));
    }


    /**
     * 分页获取相册的数据
     *
     * @return sting
     * @author xiaosibo
     */
    public function getGalleryPageAction()
    {
        $id = (int)$this->getParam('id');   // 场馆id
        $cid = (int)$this->getParam('cid');  // 场馆分类id
        $page = (int)$this->getParam('page'); // 页码

        if ($page < 2) {
            $page = 2;
        }

        // 获取场馆的相册数据
        $galleryRes = api_Court::getCourtGallery(array('business_id' => $id, 'category_id' => $cid, 'page' => $page, 'count' => 5));

        if (is_array($galleryRes) && isset($galleryRes['status']) && $galleryRes['status'] == SUCCESS_STATUS) {
            $this->readJson(baf_ResCode::msg('', $galleryRes['data']));
        } elseif (is_string($galleryRes) && $galleryRes == '0024') {
            $this->readJson(baf_ResCode::msg(baf_ResCode::OTHER_ERR, '参数错误'));
        } else {
            $this->readJson(baf_ResCode::msg(baf_ResCode::SYSTEM_ERROR));
        }
    }

    /**
     * 场馆地图
     */
    public function mapAction()
    {
        $business_id = (int)$this->getParam('id', '');
        $category_id = (int)$this->getParam('cid', '');
        $is_park = (int)$this->getParam('is_park', '');//1 返回停车场地图， 0 返回场馆地图
        if (!$business_id || !$category_id) {
            $this->redirect("/index");
            exit;
        }
        //场馆
        $venuesParam = array(
            'business_id' => $business_id,
            'category_id' => $category_id,
        );
        $venuesInfo = $this->_get_venuesMap($venuesParam);

        //停车场信息
        $parkInfo = array();
        if ($is_park) {//获取停车场地图信息
            $parkParam = array('business_id' => $business_id);
            $parkInfo = $this->_get_parklist($parkParam);//停车场
        }
        $mapInfo = array(
            'parkInfo' => $parkInfo,
            'venuesInfo' => $venuesInfo,
        );

        //调用获取页面标题、关键字和介绍
        $utm_sources = CHANNEL_SOURCE ? CHANNEL_SOURCE : 'wap';
        $this->setPageTitle(array('utm_source'=>$utm_sources,'venues_name'=>!empty($venuesInfo['name']) ? $venuesInfo['name'] : ''));

        $this->_view->assign(array(
            'mapInfo' => $mapInfo,
        ));
    }

    public function commentAction()
    {
        $business_id = (int)$this->getParam('business_id', '');
        if (!$business_id) {
            $this->redirect("/index");
            exit;
        }

        //调用获取页面标题、关键字和介绍
        $utm_sources = CHANNEL_SOURCE ? CHANNEL_SOURCE : 'wap';
        $this->setPageTitle(array('utm_source'=>$utm_sources));

        $this->_view->assign(array(
            'business_id' => $business_id
        ));
    }

    /**
     * 评论列表
     *
     * @author dxw
     */
    public function getCommentApiAction()
    {

        $business_id = (int)$this->getParam('business_id', '');
        $page = (int)$this->getParam('page', '1');
        $count = (int)$this->getParam('count', '20');

        if (!$business_id || $business_id < 1) {
            $this->readJson(baf_ResCode::msg(baf_ErrorCode::ERR_PARAM));
        }
        $comParam = array(
            'business_id' => $business_id,
            'page' => $page,
            'count' => $count,
            'ver' => '1.1',
        );
        $comRes = api_Court::getComments($comParam);
        if (isset($comRes) && isset($comRes['status']) && $comRes['status'] == SUCCESS_STATUS) {
            $this->readJson(baf_ResCode::msg('', $comRes['comments']));
        } else {
            $this->readJson(baf_ResCode::msg());
        }
    }

    /**
     * 场馆信息
     * @param bid int 场馆ID
     * @param datetime 预订日期
     * @param cid 分类ID
     * @author chenchao
     */
    private function _getDetail($businessId, $categoryId = '1')
    {
        $param = array(
            'category_id' => $categoryId,
            'business_id' => $businessId,
            'ver' => '1.1',
        	'user_id' => $this->uid	
        );
        //读取场馆信息
        $res = api_Court::groundInfo($param);
        if (is_array($res) && isset($res['status']) && $res['status'] == SUCCESS_STATUS) {

            $res['businesses']['price_desc'] = str_replace("\r\n", '<br/>', $res['businesses']['price_desc']);

            //读取场地剩数量
            $book = api_Court::getBookingSum($param);

            if (isset($book['status']) && $book['status'] == SUCCESS_STATUS) {
                $res['businesses']['book'] = $book['data'];
            } else {
                $res['businesses']['book'] = array();
            }
            return $res['businesses'];
        }
        return '';
    }


    /**
     * 场馆列表
     * @param bid int 场馆ID
     * @param datetime 预订日期
     * @param cid 分类ID
     * @author chenchao
     */
    private function _getCourt($param)
    {
        //读取缓存信息
        /* $courtKey = 'court_' . $param['city_id'] . '_' . $param['category_id'] . $param['count'] . $param['page'];
         $resCache = $this->cache()->get($courtKey);


         if (!empty($resCache) && is_array($resCache)) {
             //return $resCache;
         }*/
        //读取接口信息
        $res = api_Court::groundList($param);
        if (is_array($res) && isset($res['status']) && $res['status'] == SUCCESS_STATUS) {
            //$this->cache()->set($courtKey, $res['data'], 30); //300s
            return $res['data'];
        }
        return '';
    }


    /**
     * 读取一天时间的场地信息
     *
     * @param bid int 场馆ID
     * @param datetime 预订日期
     * @param cid 分类ID
     * @author chenchao
     */
    private function _getBookByDay($bid, $datetime, $cid = '1')
    {
        if (empty($datetime)) {
            $datetime = CURRENT_TIMESTAMP;
        }
        $param = array(
            'category_id' => $cid,
            'business_id' => $bid,
            'user_id' => $this->uid
        );

        $param['book_date'] = date('Y-m-d', $datetime);
        //$param['end_date']		= date('Y-m-d',$datetime);
        if (UTM_SOURCE) $param['utm_medium'] = UTM_SOURCE;
        $param['utm_source'] = CHANNEL_SOURCE ? CHANNEL_SOURCE : '' ;//来源渠道
        return api_Court::getVenueBookingDate($param);//新接口
    }


    /**
     * 获取最新三条评论
     */
    private function _getNewCommnet($comParam)
    {

        $comRes = api_Court::getComments($comParam);
        $comArr = array();
        if (isset($comRes) && isset($comRes['status']) && $comRes['status'] == SUCCESS_STATUS) {
            $comArr = !empty($comRes['comments']) ? $comRes['comments'] : array();
        } else {
        }
        return $comArr;
    }

    /**
     * 场馆相册
     * author dxw
     */

    private function _getCourtGallery($gallParam)
    {

        $galleryRes = api_Court::getCourtGallery($gallParam);
        $galleryArr = array();
        // 场馆的相册
        if (is_array($galleryRes) && isset($galleryRes['status']) && $galleryRes['status'] == SUCCESS_STATUS) {
            $galleryArr = $galleryRes['data'];
        } else {
        }
        return $galleryArr;

    }

    /**
     * 获取热门圈子
     */
    private function _hot_topic($topicParam)
    {

        $topicRes = api_Court::hot_topic($topicParam);
        $topicArr = array();

        if (is_array($topicRes) && isset($topicRes['status']) && $topicRes['status'] == SUCCESS_STATUS) {
            $topicArr = $topicRes['data'];
        } else {
        }
        return $topicArr;
    }

    /**
     * 获取停车场
     *
     */
    private function _get_parklist($parkParam)
    {

        $aprkRes = api_Court::getParkList($parkParam);
        $aprkResArr = array();

        if (is_array($aprkRes) && isset($aprkRes['status']) && $aprkRes['status'] == SUCCESS_STATUS) {
            $aprkResArr = $aprkRes['data'];
        } else {
        }
        return $aprkResArr;
    }

    /**
     * 获取场馆地图
     */
    private function _get_venuesMap($venuesParam)
    {

        $Res = api_Court::groundInfo($venuesParam);
        $ResArr = array();
        if (is_array($Res) && isset($Res['status']) && $Res['status'] == SUCCESS_STATUS) {
            $ResArr['name'] = $Res['businesses']['name'];
            $ResArr['address'] = $Res['businesses']['address'];
            $ResArr['latitude'] = $Res['businesses']['latitude'];
            $ResArr['longitude'] = $Res['businesses']['longitude'];
        }
        return $ResArr;
    }

    /**
     * 获取场馆列表的项目分类
     */
    private function _get_cate()
    {
        //设置默认城市ID
        $city_id = api_CoreHelper::getCookie('city_id');
        if ($city_id < 1) {
            $city_id = $this->getParam('city_id', '76');
        }
        //获取分类
        $courtKey = '7yundong:court_category_list:' . $city_id;
        $param = array('city_id' => $city_id, 'user_id' => $this->uid);
        $category_list = array();
        $categoryVal = baf_Redis::factory()->get($courtKey);
        if ($categoryVal) {
            $category_list = unserialize($categoryVal);
        } else {
            $res = api_Court::getIndex($param);
            if (is_array($res) && isset($res['status']) && $res['status'] == SUCCESS_STATUS) {
                $category_list = $res['data']['categories'];
                baf_Redis::factory()->set($courtKey, serialize($category_list), 300);
            }
        }
        return $category_list;
        /*
        $cate_list = array();
        $res = api_Court::getCate();
        if ($res && $res['status'] == SUCCESS_STATUS) {
            $cate_list = $res['data'];
        }
        return $cate_list;
        */
    }

    /**
     * 获取场馆列表的区域列表
     */
    private function _get_regions($cityId)
    {
        $regionData = array();
        if (!$cityId) return false;
        $data = api_City::getRegionList($cityId);
        if (!empty($data['status']) && $data['status'] == '0000') {
            $regionData = $data['data'];
        }
        if (!empty($regionData)) {
            // 将“所有区域”添加到前面
            array_unshift($regionData, array(
                'region_id' => '0',
                'region_name' => '所有区域'
            ));
        }
        return $regionData;
    }

    /**
     * 设置城市cookie--未使用
     */
    private  function _setCityCookie($city_id){
        if($city_id) return false;
        api_CoreHelper::setCookie('city_id', $city_id, 86400 * 2);
        $open_city = api_Court::cities(array());

        if(!empty($open_city)){
            foreach ($open_city as $value){
                if($value['city_id'] == $city_id){
                    $city_name = $value['city_name'];
                    break;
                }
            }
        }
        api_CoreHelper::setCookie('city_name', $city_name, 86400 * 2);
    }
}