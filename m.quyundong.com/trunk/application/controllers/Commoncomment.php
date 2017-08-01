<?php
/**
 * 评论
 * @author [xieyunxia]
 */
class CommoncommentController extends DefaultController {
	/**
	 * [indexAction 评论页]
	 *
	 * @param [type] $id [订单id]
	 * @param [int] $actid [活动id]
	 */
	public function IndexAction(){
		
		$actid=$this->getParam('actid',0);
		if($actid<1){
			$error=baf_ResCode::msg(baf_ResCode::PARAM_ERR);
		}
		$error=$this->getActStatus(array('act_id'=>$actid));
		if(is_object($error['data'])){
			$error['data']=array();
		}
		$this->setPageTitle(array('title'=>'评论'));
		$this->getView()->assign(array('error'=>$error,'act_id'=>$actid));
	}
	
    /**
	 * [getActStatus 判断该用户是否能够进行本次活动评论]
	 *
	 * @param [array] $param [参数]
	 */
    private function getActStatus($param='')
    {
    	// 是否已登录---屏蔽处理未支付订单
		$userId = $this->uid;

		if ($userId < 1) {
			// 登陆后的回调地址
			$this->setReturnUrl($this->redirectUrl());
			// 没有登陆跳转到登陆页面
			return  baf_ResCode::msg(baf_ResCode::SUCCESS,array('redirect_url'=>'/login/qucklogin'));
		}
		$this->setReturnUrl($this->redirectUrl());//设置当前地址为referer
		
		$act_id=isset($param['act_id'])?$param['act_id']:0;
        if(!$act_id) {
            return baf_ResCode::msg(baf_ResCode::PARAM_ERR);
        }
        // 先对活动进行判断
        $param['act_id'] = $act_id;
        $param['is_online'] = 1;
        $data = baf_Common::dbModel('ActivityCommon','quyundong')->getOne($param);
		//活动不存在
        if(empty($data)){
			return baf_ResCode::msg(baf_ResCode::ACTIVITY_OFFLINE);
		 }

        $time = time();

        // 判断时间是否开始或过期
        if( $data['act_start_time'] > $time) {
            return  baf_ResCode::msg(baf_ResCode::ERR_ACT_NO_START);
        }
		if(($data['venues_id']==0 || $data['is_need_comment_intime']) && $time > $data['act_end_time']){
			return  baf_ResCode::msg(baf_ResCode::ERR_ACT_FAILED);
		}
		$url = '/activitycommon/detail?id='.$act_id;
		//判断是否需要评论
		if(!$data['is_need_comment']){
			if($this->isAjax){
				return  baf_ResCode::msg(baf_ResCode::SUCCESS,array('redirect_url'=>$url));
			}
			$this->redirect($url);
		}
		//检查是否在黑名单
        $checkBlack = baf_Common::dbModel('CommentBlacklist','quyundong')->checkUserIsBlack($this->uid);
        if($checkBlack){
            return baf_ResCode::msg(baf_ResCode::ERR_POST_FORBIDDEN);
        }
		//判断是否需要报名，否-可能为纯评论的，是-判断是否已经报名了
		$exits=0;
		if($data['venues_id']>0 || $data['is_need_userinfo'] || $data['is_need_card']){
			$exits=baf_Common::dbModel('ActivitySignupCommon','quyundong')->checkExists(array('user_id'=>$this->uid,'act_id'=>$act_id,'venues_id'=>$data['venues_id']));
			if(!$exits){
	            $param                       = [];
	            $param['t']                  = time();
	            $param['act_id']             = $data['act_id'];
	            $param['act_name']           = $data['act_name'];
	            $param['act_price']          = $data['act_price'];
	            $param['act_limit']          = $data['act_limit'];
	            $param['h']                  = md5(implode($param).ENCODE_KEY);
	            $url                         = http_build_query($param);
	            $url                         = '/activitycommon/confirmact?'.$url;
	            if($this->isAjax){
					return  baf_ResCode::msg(baf_ResCode::SUCCESS,array('redirect_url'=>$url));
				}
				$this->redirect($url);
			}
		}
		//判断是否多评论
		if($data['is_comment_onlyone']){
			//判断是否评论过
			$param=array('relation_id'=>$act_id,'user_id'=>$this->uid,'is_show'=>1,'comment_type'=>0);
			if(baf_Common::dbModel('CommonComment','quyundong')->checkExists($param)){
				return  baf_ResCode::msg(baf_ResCode::ERR_ALREADY_JOIN);
			}
		}
		$data['id']=$data['act_id'];
		$data['comment_type']=0;
		return baf_ResCode::msg(baf_ResCode::SUCCESS,$data);
    }
	/**
	 * [addCommentAction 添加评论]
	 *
	 * @return [json] [状态]
	 */
	public function AddCommentAction(){
		$content=$this->getParam('comment',false);//评论内容
		$id=$this->getParam('id',0);//关联ID
		$images=$this->getParam('images',array());//图片
		$type=$this->getParam('type',0);//评论类型

		$insertImage=array();
		$error=$this->getActStatus(array('act_id'=>$id));
		if(!is_object($error['data']) && isset($error['data']['redirect_url']) || $error['code'] != '0000'){
			$this->readJson($error);
		}
		if(empty($error['data'])){
			$this->readJson(baf_ResCode::msg(baf_ResCode::ACCESS_DENIED));
		}

		//常规检查
		$this->checkComment($error['data']);
		
		$insertImage=array();
		//检查提交的图片是否为空地址
		if(!empty($images)&&is_array($images))
		foreach ($images as $k => $v) {
			switch ($v) {
				case $v['thumb_url']=='':
				case $v['image_url']=='':
				case $v['attach_id']=='':
					unset($images[$k]);
					break;
				default:
					break;
			}
			if(!isset($images[$k])) continue;
			//准备图片数据
			$v['url']=$v['image_url'];
			unset($v['image_url']);
			$v['type']=1;
			$v['add_time']=CURRENT_TIMESTAMP;
			$insertImage[]=$v;
		}

		//插入评论
		$insertData = array(
			'user_id' => $this->uid,
			'comment_type' => $type,
			'add_time' => CURRENT_TIMESTAMP,
			'relation_id' => $id,
			'content' => $content,
			'ip_address' => baf_Base::Clientip(),
		);
		
		$this->doAddComment($insertData,$insertImage);
		$this->readJson(baf_ResCode::msg(baf_ResCode::SUCCESS,array('redirect_url'=>'/activitycommon/detail?id='.$id.'&comment=1')));
	}
	/**
	 * [checkComment 常规检查]
	 * @param  [array] $data [评论条件]
	 * @return [json]              [返回json报错，或者不返回]
	 */
	private function checkComment($data)
	{
		$content=$this->getParam('comment',false);//评论内容
		$id=$this->getParam('id',0);//关联ID
		$type=$this->getParam('type',0);//评论类型

		//检查用户是否满足发评论的条件
		if(empty($data) || !$id || $data['id']!=$id || $type!=$data['comment_type'] || empty($content))
			$this->readJson(baf_ResCode::msg(baf_ResCode::ACCESS_DENIED));

		//检查长度
		$length = baf_Base::strLength($content);
        if($length > 140){
            $this->readJson(baf_ResCode::msg(baf_ResCode::ERR_LENGTH_EXCEEDED));
        }
		//检查是否在黑名单
        $checkBlack = baf_Common::dbModel('CommentBlacklist','quyundong')->checkUserIsBlack($this->uid);
        if($checkBlack){
            $this->readJson(baf_ResCode::msg(baf_ResCode::ERR_POST_FORBIDDEN));
        }
        //检测敏感词
        if($content){
            $checkSensitive = baf_Common::dbModel('CommentBlacklist','quyundong')->sensitiveContent($content);
            if($checkSensitive){
                $this->readJson(baf_ResCode::msg(baf_ResCode::ERR_CONTENT_ILLEGAL));
            }
        }
	}
	/**
	 * [doAddComment 添加评论到数据表中]
	 * @param  [type] $insertData  [评论表内容]
	 * @param  [type] $insertImage [评论附件表内容]
	 * @return [json]              [返回json报错，或者不返回]
	 */
	private function doAddComment($insertData,$insertImage=array())
	{   
		if(empty($insertData)) $this->readJson(baf_ResCode::msg(baf_ResCode::ACCESS_DENIED));
		$comment_id = baf_Common::dbModel('CommonComment','quyundong')->addComment($insertData);
		if($comment_id==-1) $this->readJson(baf_ResCode::msg(baf_ResCode::ERR_COMMENT_OVER_LIMIT));
		if(!$comment_id){
			baf_Common::log('commonCommnet_failed', 'DEBUG', 'sql_err', $insertData);
			$this->readJson(baf_ResCode::msg(baf_ResCode::ACCESS_DENIED));
		}
		//插入图片
		if(!empty($insertImage)){
			foreach ($insertImage as $k => $v) {
				$insertImage[$k]['comment_id']=$comment_id;
			}
			if(!baf_Common::dbModel('CommentAttachment','quyundong')->addAttachment($insertImage)){
				if(!baf_Common::dbModel('CommonCommnet','quyundong')->delComment($comment_id))
					baf_Common::log('commonCommnet_failed', 'DEBUG', 'sql_err', array('id'=>$comment_id));
				baf_Common::log('commonCommnet_failed', 'DEBUG', 'sql_err', $insertImage);
				$this->readJson(baf_ResCode::msg(baf_ResCode::ACCESS_DENIED));
			}
		}
	}
	/**
	 * [addCommentAction 获得评论列表]
	 *
	 * @param relation_id [intval] [活动id]
	 * @param id [intval] [最后一个评论id]
	 * @param page_size [intval] [一次取page_size条数据]
	 * @param comment_type [intval] [评论类型(0活动评论 1场馆评论)]
	 * @return [json] [状态]
	 */
	public function GetCommentListAction()
	{
		$param['page']       = (int) $this->getParam('page', 1); // 分页码
        $param['page']       = max(1, $param['page']);
        $param['page_size']      = (int) $this->getParam('page_size', 20); // 每页显示的数量
        $param['page_size']      = min(max(1, $param['page_size']), 10); // 每页的记录数最小为1， 最大为100
		$param['relation_id']       = $this->getParam('relation_id', false);
		$param['comment_type']       = (int) $this->getParam('comment_type', 0);
		$param['is_unicom_comment']       = strrpos($param['relation_id'],',')?1:0;
		$data = baf_ResCode::msg(baf_ResCode::SUCCESS);
		//取得评论
		$data['count'] = baf_Common::dbModel('CommonComment','quyundong')->getCount($param);
		$data['data'] = $data['count']>0?baf_Common::dbModel('CommonComment','quyundong')->getConmentList($param):array();
		$data['page_size'] =$param['page_size'];
		$data['total_page'] = ceil($data['count']/$data['page_size']);
		$data['current_page']=$param['page'];
		$user_ids['user_ids']='';
		$comment_ids='';
		//循环评论列表，处理数据
		if(empty($data['data'])){ echo json_encode($data); die;}
		foreach ($data['data'] as $k => $v) {
			$user_ids['user_ids'] .= $v['user_id'].',';//为获得评论用户信息准备的查询条件
			$comment_ids .= $v['id'].',';//为获得评论图片附件准备的查询条件
		}
		//获得用户信息
		$users = api_User::useridToInfo($user_ids);
		//获得图片资源数据
		$attas = baf_Common::dbModel('CommentAttachment','quyundong')->getAttaList(trim($comment_ids,','));

		foreach ($data['data'] as $k => $v) {
			$data['data'][$k]['add_time']=baf_Common::tranTime($v['add_time']);
			$data['data'][$k]['images']=array();
			if(!empty($attas))
			foreach ($attas as $ki => $vi) {
				if($vi['comment_id']==$v['id']){
					$data['data'][$k]['images'][]=$vi;
				}
			}
			if(!empty($users['data']))
			foreach ($users['data'] as $ku => $vu) {
				if($vu['user_id']==$v['user_id']){
					$data['data'][$k]['nick_name']=$vu['nick_name'];
					$data['data'][$k]['avatar']=$vu['avatar'];
				}
			}
		}
		echo json_encode($data);die;
	}
}
