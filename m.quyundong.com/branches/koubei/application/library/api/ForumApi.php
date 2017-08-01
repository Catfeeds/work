<?php
/**
 * 请求社区系统相关的接口
 *
 * @author xiaoyanchun
 * @modify xieyunxia
 */
class api_ForumApi extends api_Base
{
    /**
     * api 秘钥
     *
     * @var string
     */
    protected $apiKey = '4b111cc14a33b88e37e2e2934f493458';


    /**
     * 上传图片
     *
     * @param array $file (即：$_FILES['uploadedfile'])
     * @return string json字符串
     * @author xieyunxia
     */
    public function uploadImage(array $file){
        //API参数
        $param = array();
        $param['client_time'] = CURRENT_TIMESTAMP;
        $param['action'] = 'post_image_bytype';
        $param['type'] 	 = substr( $file['name'], strrpos( $file['name'], '.')+1);

        if (class_exists('\CURLFile',false)) {
            $postData = array('uploadedfile' => new CURLFile($file['tmp_name']));
        } else {
            $postData = array('uploadedfile' => '@' . realpath($file['tmp_name']));
        }

        $param['api_sign'] = api_Base::sign($param);
        $response = baf_Http::httpPost(FORUM_IMG_API_URL.http_build_query($param), $postData);

        return $response;
    }

    /**
     * 删除图片附件
     *
     * @param string $attachId 附件id(例如: 2015071437564088042775130814.jpg)
     * @return string json字符串
     * @author xiaoyanchun
     * @modify xieyunxia
     */
    public function deleteImage($attachId) {
        $params = array();
        $params['action'] = 'del_image';
        $params['attach_id'] = $attachId;

        return baf_Http::httpGet(FORUM_IMG_API_URL.http_build_query($params));
    }

}
