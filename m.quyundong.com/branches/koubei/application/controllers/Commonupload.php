<?php
/**
 * 通用上传
 *
 * @author [xieyunxia]
 * @date 2016.7.11
 */
class CommonuploadController extends DefaultController
{

    /**
     * 通用上传图片
     *
     * @author [xieyunxia]
     * @date 2016.7.11
     */
    public function commonUploadImageAction() {
        $userId = $this->uid;
        $fieldName  = 'file';

        if ($userId < 1) { // 参数错误
            $this->readJson(baf_ResCode::msg(baf_ErrorCode::NOT_LOGIN));
        }
        //黑名单
        $checkBlack = baf_Common::dbModel('CommentBlacklist','quyundong')->checkUserIsBlack($this->uid);
        if($checkBlack){
            return $this->readJson(baf_ResCode::msg(baf_ResCode::ERR_POST_FORBIDDEN));
        }
        if (!isset($_FILES[$fieldName])) {
            $this->readJson(baf_ResCode::msg(baf_ResCode::REGISTER_PARAM_ERR));
        }

        $fileName = '';
        $uploadFile = array();

        if (isset($_FILES[$fieldName])) {
            $fileName = $_FILES[$fieldName]['name'];
            $uploadFile = $_FILES[$fieldName];
        } elseif (isset($_FILES[$fieldName2])) {
            $fileName = $_FILES[$fieldName2]['name'];
            $uploadFile = $_FILES[$fieldName2];
        }

        // 获取图片后缀
        $postfix = substr($fileName, strrpos($fileName, '.')+1);

        if (!in_array($postfix, array('jpg', 'png', 'jpeg', 'gif'))) {
            $this->readJson(baf_ResCode::msg(baf_ResCode::UPLOAD_IMAGE_TYPE_ERROR));
        }

        //上传图片
        $uploadRes = (new api_ForumApi)->uploadImage($uploadFile);
        $this->readJson($uploadRes);
    }


}
