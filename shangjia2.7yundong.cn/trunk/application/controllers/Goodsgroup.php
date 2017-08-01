<?php

/**
 * 场次打包控制器
 *
 * @author xiaoyanchun
 * @date 2016-06-24
 */
class GoodsGroupController extends BaseController
{
    /**
     * 打包页面首页
     */
    public function indexAction()
    {
        try {
            $api_VenuesApi = new api_VenuesApi();

            //球馆ID
            $venues_id = helper_VenuesHelper::getCurrentVenuesId();   
            // // 分类ID
            $cat_id = (int)$this->getParam("cat_id", helper_VenuesHelper::getVenuesCatID());
            $cat_list  = helper_VenuesHelper::getCurrentCatList();
            if ( !array_key_exists($cat_id, $cat_list)){
            	//当前分类，默认为第一个分类
            	$cat_id = array_keys($cat_list)[0];
            }
            

            // 设置当前分类
            helper_VenuesHelper::setVenuesCatID($cat_id);
            
            $book_date    = trim($this->getParam('book_date')) ?: date('Y-m-d', time());
            $book_time    = strtotime($book_date);
            $current_week = date('w', $book_time);

            // 获取book数据
            $book_response = $api_VenuesApi->getBookingGoods(array(
                                                                 'business_id' => $venues_id,
                                                                 'category_id' => $cat_id,
                                                                 'book_date'   => $book_date,
            													 'utmSource'   => helper_VenuesHelper::getutmSource()
                                                             ));

            if (!is_array($book_response) || $book_response['status'] != '0000') {
                $course_list = $date_list = $hour_list = $lock_list = $order_list = array();
            }else{
                $course_list = $book_response['data']['goods_list'];
                $date_list   = $book_response['data']['date_list'];
                $hour_list   = $book_response['data']['hour_list'];
                $lock_list   = $book_response['data']['lock_list'];
                $order_list  = isset($book_response['data']['order_list']) ? $book_response['data']['order_list'] : array();
            }

            // 查询今天所有打包的场次
            $goods_group_list = array();
            $goods_group_data = $api_VenuesApi->getGoodsGroupList($venues_id, $cat_id, $book_date);
            if ($goods_group_data) {
                $_goods_group_list = $goods_group_data['list'];
                foreach ($_goods_group_list as $_goods_group) {
                    $goods_group_list[$_goods_group['group_id']] = $_goods_group;
                }
            }

            $this->display('index',
                           compact('course_list', 'date_list', 'hour_list', 'lock_list', 'order_list',
                                   'goods_group_list', 'current_week', 'book_time', 'venues_info',
                                   'cat_id', 'cat_list'
                           ));

        } catch (Exception $e) {
            throw $e;
        }
    }

    // 打包场次
    public function bindGoodsGroupAction()
    {
        try {
            $api_VenuesApi = new api_VenuesApi();
            
            //球馆ID
            $venues_id		= helper_VenuesHelper::getCurrentVenuesId() ;
   
            $cat_id    = intval($this->getParam('cat_id'));
            $goods_ids = array_filter($this->getParam('goods_ids'));

            $data = $api_VenuesApi->bindGoodsGroup($venues_id, $cat_id, implode(',', $goods_ids));
            helper_CoreHelper::addAdminLog('场次打包', array(
                'param' => array(
                    'venues_id' => $venues_id,
                    'cat_id'    => $cat_id,
                    'goods_ids' => $goods_ids
                ),
                'result' => $data
            ));
            $this->successOutput($data);

        } catch (Exception $e) {
            $this->errorOutput($e->getCode(), $e->getMessage());
        }
    }

    // 解绑打包场次
    public function unbindGoodsGroupAction()
    {
        try {
            $api_VenuesApi = new api_VenuesApi();

            $goods_group_id = intval($this->getParam('goods_group_id'));

            $result = $api_VenuesApi->unbindGoodsGroup($goods_group_id);

            helper_CoreHelper::addAdminLog('解绑打包场次', array(
                'param' => array(
                    'goods_group_id' => $goods_group_id,
                ),
                'result' => $result
            ));
            $this->successOutput();

        } catch (Exception $e) {
            $this->errorOutput($e->getCode(), $e->getMessage());
        }
    }


    /**
     * 打包设置
     */
    public function settingAction()
    {
        try {
            //球馆ID
            $venues_id = helper_VenuesHelper::getCurrentVenuesId();
            // // 分类ID
            $cat_id = (int)$this->getParam("cat_id", helper_VenuesHelper::getVenuesCatID());
            $cat_list  = helper_VenuesHelper::getCurrentCatList();
            if ( !array_key_exists($cat_id, $cat_list)){
            	//当前分类，默认为第一个分类
            	$cat_id = array_keys($cat_list)[0];            	
            }
            
            
            // 设置当前分类
            helper_VenuesHelper::setVenuesCatID($cat_id);
            $week      = intval($this->getParam('week'));

            $course_list = helper_VenuesHelper::getCourses($cat_id);

            $hour_list = array();
            if ($cat_id){
                $_hour_section = helper_VenuesHelper::getServiceTime($cat_id);
                if (isset($_hour_section[$week])){
                    $hour_section = $_hour_section[$week];
                    for ($hour_i = intval($hour_section[0]); $hour_i<intval($hour_section[1]); $hour_i++){
                        $suffix = explode(':', $hour_section[0])[1];
                        $hour_list[] = $hour_i. ':'. $suffix;
                    }
                }
            }

            // 获取设置数据
            $goods_group_setting_list = $_goods_group_setting_list = array();
            $goods_group_setting_data = Loader::api('Venues')->getGoodsGroupSettingList($venues_id, $cat_id, $week);
            $goods_group_setting_data && $_goods_group_setting_list = $goods_group_setting_data['list'];
            foreach ($_goods_group_setting_list as $setting) {
                $goods_group_setting_list[$setting['course_id']] = $setting;
            }

            $this->display('setting', compact(
                'course_list', 'hour_list', 'goods_group_setting_list', 'week', 'cat_id', 'venues_info', 'cat_list'
            ));

        } catch (Exception $e) {
            throw $e;
        }
    }

    /**
     * 编辑场次打包配置
     */
    public function editGoodsGroupSettingAction()
    {
        try {

            $venues_id   = helper_VenuesHelper::getCurrentVenuesId();
            $cat_id      = intval($this->getParam('cat_id'));
            $week        = intval($this->getParam('week'));
            $course_name = trim($this->getParam('course_name'));
            $course_id   = intval($this->getParam('course_id'));
            $hour        = array_filter($this->getParam('hour'));
            $goods_group_data = trim($this->getParam('goods_group_data'));

            $edit_setting_result = Loader::api('Venues')->editGoodsGroupSetting($venues_id, $cat_id, $course_id, $course_name, implode(',', $hour), $week);
            $batch_bind_result = array();
            if ($goods_group_data && json_decode($goods_group_data)){
                $batch_bind_result = Loader::api('Venues')->batchBindGoodsGroup($venues_id, $cat_id, $goods_group_data);
            }

            helper_CoreHelper::addAdminLog('编辑场次打包配置', array(
                'param' => array(
                    'venues_id'        => $venues_id,
                    'cat_id'           => $cat_id,
                    'week'             => $week,
                    'course_name'      => $course_name,
                    'course_id'        => $course_id,
                    'hour'             => $hour,
                    'goods_group_data' => $goods_group_data,
                ),
                'result' => array(
                    'edit_setting_result' => $edit_setting_result,
                    'batch_bind_result'   => $batch_bind_result,
                )
            ));
            $this->successOutput();

        } catch (Exception $e) {
            $this->errorOutput($e->getCode(), $e->getMessage());
        }
    }

    /**
     * 删除场次打包设置
     */
    public function deleteGoodsGroupSettingAction()
    {
        try {

            $venues_id       = helper_VenuesHelper::getCurrentVenuesId();
            $cat_id          = intval($this->getParam('cat_id'));
            $week            = intval($this->getParam('week'));
            $course_id       = intval($this->getParam('course_id'));
            $hour            = trim($this->getParam('hour'));
            $goods_group_ids = trim($this->getParam('goods_group_ids'));

            $delete_setting_result = Loader::api('Venues')->deleteGoodsGroupSetting($venues_id, $cat_id, $course_id, $hour, $week);
            $batch_unbind_result = array();
            if ($goods_group_ids){
                $batch_unbind_result = Loader::api('Venues')->batchUnbindGoodsGroup($goods_group_ids);
            }

            helper_CoreHelper::addAdminLog('删除场次打包设置', array(
                'param' => array(
                    'venues_id'        => $venues_id,
                    'cat_id'           => $cat_id,
                    'week'             => $week,
                    'course_id'        => $course_id,
                    'hour'             => $hour,
                    'goods_group_ids' => $goods_group_ids,
                ),
                'result' => array(
                    'delete_setting_result' => $delete_setting_result,
                    'batch_unbind_result'   => $batch_unbind_result,
                )
            ));
            $this->successOutput();

        } catch (Exception $e) {
            $this->errorOutput($e->getCode(), $e->getMessage());
        }
    }

    /**
     * 根据场地信息(course_id, week, hour)获取从当前时间起的场次
     */
    public function getBookGoodsByCourtAction()
    {
        try{
            $list = array();

            $venues_id = helper_VenuesHelper::getCurrentVenuesId();
            $cat_id    = intval($this->getParam('cat_id'));
            $course_id = intval($this->getParam('course_id'));
            $week      = intval($this->getParam('week'));
            $hour      = trim($this->getParam('hour'));

            $data = Loader::api('Venues')->getBookGoodsByCourt($venues_id, $cat_id, $course_id, $hour, $week);
            foreach ($data['goods_list'] as $goods){
                $list[$goods['book_date']][] = $goods['goods_id'];
            }
            $list = array_values($list);
            $this->successOutput(compact('list'));

        }catch (Exception $e){
            $this->errorOutput($e->getCode(), $e->getMessage());
        }
    }

    /**
     * 根据场地信息(course_id, week, hour)获取从当前时间起的打包列表
     */
    public function getGoodsGroupIdsByCourtAction()
    {
        try{
            $goods_group_ids = '';

            $venues_id = helper_VenuesHelper::getCurrentVenuesId();
            $cat_id    = intval($this->getParam('cat_id'));
            $course_id = intval($this->getParam('course_id'));
            $week      = intval($this->getParam('week'));
            $hour      = trim($this->getParam('hour'));

            $data = Loader::api('Venues')->getGoodsGroupListByCourt($venues_id, $cat_id, $course_id, $hour, $week);
            foreach ($data['goods_group_list'] as $goods_group){
                $goods_group_ids_arr[] = $goods_group['group_id'];
            }
            !empty($goods_group_ids_arr) && $goods_group_ids = implode(',', $goods_group_ids_arr);


            $this->successOutput(compact('goods_group_ids'));

        }catch (Exception $e){
            $this->errorOutput($e->getCode(), $e->getMessage());
        }
    }

}