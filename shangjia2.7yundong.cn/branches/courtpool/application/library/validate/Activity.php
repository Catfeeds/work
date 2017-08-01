<?php
/**
 * 活动验证类
 * 
 * @author chenchao
 * @date 2017-02-11
 */
class validate_Activity extends validate_Validate
{
    /**
     * 验证规则
     *
     * @var array
     */
    protected $rule = [
        'course_id'  => ['require'],
        'start_time'  => ['require'],
        'end_time'  => ['require'],
        'field_capacity'  => ['require'],
        //'field_num'  => ['require'],
        'unit_price'  => ['require'],
        'user_id'  => ['require'],
        'phone'  => ['require'],
        'is_refund'  => ['require'],
        'week_cycle'  => ['require'],
    ];

    /**
     * 验证失败的消息
     *
     * @var array
     */
    protected $message  =   [
        'course_id.require' => '请选择场次',
        'start_time.require' => '请选择开始时间',
        'end_time.require' => '请选择结束时间',
        'field_capacity.require' => '请选择可加入人数',
        //'field_num.require' => '请选择场次',
        'unit_price.require' => '请输入价格',
        'user_id.require' => '场馆用户必须关联',
        'phone.require' => '场馆用户电话不能为空',
        'is_refund.require' => '是否退款不能为空',
        'week_cycle.require' => '是否固定活动不能为空',
    ];

    /**
     * 自定义验证参数
     */
    public function checkParams(array $post,$validateHelper,$new=true){
        if (!$validateHelper instanceof validate_Helper){
            return [];
        }
        $params = [];
        $params['course_id'] = isset($post['course_id']) ? $post['course_id'] : '';
        $params['start_time'] = isset($post['start_time']) ? $post['start_time'] : '';
        $params['end_time'] = isset($post['end_time']) ? $post['end_time'] : '';
        $params['field_capacity'] = isset($post['field_capacity']) ? $post['field_capacity'] : '';
        //$params['field_num'] = isset($post['field_num']) ? $post['field_num'] : '';
        $params['unit_price'] = isset($post['unit_price']) ? $post['unit_price'] : 10;
        $params['user_id'] = isset($post['user_id']) ? $post['user_id'] : '';
        $params['phone'] = isset($post['phone']) ? $post['phone'] : '';
        $params['order_type'] = 13;
        $params['description'] = isset($post['description']) ? $post['description'] : '';
        $params['is_refund'] = isset($post['is_refund']) ? $post['is_refund'] : '0';
        $params['week_cycle'] = isset($post['week_cycle']) ? $post['week_cycle'] : '0';

        if(!$this->batch()->check($params)){
            $validateHelper->setErrors($this->getError());
        }
        /*
        if(empty($params['course_id']) || empty($params['password'])){
            $validateHelper->setError('tips_error', '商家账号密码必填!');
        }*/

        return  $params ;
    }
    
}