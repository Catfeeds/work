<?php
/**
 * 柠檬榜活动
* 
* @author bigticket
*/
    
class CoachController extends DefaultController {
    public $cacheKey;
    
    /**
     * 申请 for 安卓
     * @author bigticket
     */
    public function SubmitInfoAndroidAction(){   
        $data = (object) array(); 
        $arr['phone'] = $this->getParam('phone', '');
        $arr['name'] = $this->getParam('name', '');
        $arr['sex'] = $this->getParam('sex', 0);
        $arr['img_url'] = $this->getParam('img_url', '');
        if (empty($arr['phone']) || empty($arr['name'])){
            $this->readJson(baf_ResCode::msg(baf_ResCode::PARAM_ERR),$data);
        }
        $check = $this->checkExist($arr['phone']);
        if(!$check){
            $this->readJson(baf_ResCode::msg(baf_ResCode::COACH_RECRUIT_EXIST),$data);
        }

        $res = api_User::CoachRecruit($arr);
        baf_FileLog::log2File(json_encode($res),'CoachRecruitError');
        if($res == '0024'){
            $this->readJson(baf_ResCode::msg(baf_ResCode::PARAM_ERR),$data);
        }
        	
        if(isset($res['status']) && $res['status'] == '-14'){
            $this->readJson(baf_ResCode::msg(baf_ResCode::COACH_RECRUIT_EXIST),$data);
        }
        	
        if(isset($res['status']) && $res['status'] == SUCCESS_STATUS){
            $this->readJson(baf_ResCode::msg(1,array('success_url'=>M_HOST.'static/coachsuccess.html')));
        }
        else{
            $this->readJson(baf_ResCode::msg(baf_ResCode::COACH_RECRUIT_EXIST),$data);
        }
    }
    
    
    /**
     * 申请
     * @author bigticket
    */
	public function SubmitInfoAction(){	
	    $data = $this->getParam('fromData', '');
        
        if (!empty( $data ) && is_string( $data ) && in_array($data [0], array('[','{'))) {
            $data_arr = json_decode($data, true);
            
            if (!empty($data_arr) && is_array($data_arr)){
                foreach($data_arr AS $key=>$v){
                    if ($key == 'imagebase64'){
                       $avatar =  $v;
                    } else if ($key == 'imagebase64Len'){
                        $avatar_length = $v;
                    } else {
                        $arr[$key] = $v;
                    }
                }
            }
            baf_FileLog::log2File($data,'CoachRecruit');
            
            if (empty($avatar) || empty($arr['phone']) || empty($arr['name'])){
                $this->readJson(baf_ResCode::msg(baf_ResCode::PARAM_ERR));
            }
            if ($avatar_length != strlen($avatar)){
                $this->readJson(baf_ResCode::msg(baf_ResCode::NMB_UPLOAD_AVATAR));
            }
            $check = $this->checkExist($arr['phone']);
            if(!$check){
                $this->readJson(baf_ResCode::msg(baf_ResCode::COACH_RECRUIT_EXIST));
            }
            
            //保存头像
            $basePath = APP_PATH;
            $hostPath = api_CoreHelper::getHostInfo();
           
            $filePath = "/uploads/nmb/";
			$tplFile = CURRENT_TIMESTAMP.'_'.rand(1, 1000).'.png';
            //base64图片保存
            $img = base64_decode($avatar);

            file_put_contents($basePath.$filePath.$tplFile, $img);
            $avatar_url = $hostPath.$filePath.$tplFile;
           
            $param['user_id'] = 0;
            $param['action'] = 'post_image_bytype';
            $param['client_time'] = CURRENT_TIMESTAMP;
            $param['type'] = 'png';
            
            if (class_exists('\CURLFile',false)) {
                $uploadFile = array('uploadedfile' => new CURLFile($basePath.$filePath.$tplFile));
            } else {
                $uploadFile = array('uploadedfile' => '@' . realpath($basePath.$filePath.$tplFile));
            }
                        
            $param['api_sign'] = api_Base::sign($param);            
            $resUpload = baf_Http::httpPost(FORUM_IMG_API_URL.http_build_query($param), $uploadFile);
            if(isset($resUpload['status']) && $resUpload['status'] == SUCCESS_STATUS){
                $arr['img_url'] = $resUpload['data']['image_url'];
            }
            else{
                $this->readJson(baf_ResCode::msg(baf_ResCode::UPLOAD_ERR));    
            }
            
			$res = api_User::CoachRecruit($arr);
			baf_FileLog::log2File(json_encode($res),'CoachRecruitError');
			if($res == '0024'){
			    $this->readJson(baf_ResCode::msg(baf_ResCode::PARAM_ERR));
			}
			
			if(isset($res['status']) && $res['status'] == '-14'){
			    $this->readJson(baf_ResCode::msg(baf_ResCode::COACH_RECRUIT_EXIST));
			}
			
            if(isset($res['status']) && $res['status'] == SUCCESS_STATUS){
			    $this->readJson(baf_ResCode::msg());
			}
			else{
			    $this->readJson(baf_ResCode::msg(baf_ResCode::COACH_RECRUIT_EXIST));
			}            
            
        } else {
            $this->readJson(baf_ResCode::msg(baf_ResCode::PARAM_ERR));
        }	    
	}
	
	/**
	 * 检查是否已提交了申请
	 * @author bigticket
	 */
	public function CheckPhoneAction(){	    
	    $phone = $this->getParam('phone', '');
	
	    if (!empty( $phone )) {	   
	        $check = $this->checkExist($phone);
	        	
	        if($check){
	            $this->readJson(baf_ResCode::msg());
	        }
	        else{
	            $this->readJson(baf_ResCode::msg(baf_ResCode::COACH_RECRUIT_EXIST));
	        }
	
	    } else {
	        $this->readJson(baf_ResCode::msg(baf_ResCode::PARAM_ERR));
	    }
	}
	
	/**
	 * 
	 */
	private function checkExist($phone){
	    if(empty($phone)) return true;
	    $this->cacheKey = 'CoachRecruit_'.$phone;
	     
	    $token = $this->cache()->get ( $this->cacheKey );
	    if ($token == 1) {
	        return false;
	    }
	     
	    $arr['phone'] = $phone;
	    $arr['check'] = 'phone';
	    $res = api_User::CoachRecruit($arr);
	    if($res == '0024'){
	        return true;
	    }
	    
	    if(isset($res['status']) && $res['status'] == '-14'){
	        $this->cache()->set ( $this->cacheKey, 1, 7200 ); // 120分钟
	        return false;	        
	    }
	    return true;
	}
}
