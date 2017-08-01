<?php 

/**
 * @author  gaojia
 */
class CommentController extends BaseController
{
	/**
	 * 评论列表
	 */
	public function indexAction(){

		// 场馆ID
		$business_id	= helper_VenuesHelper::getCurrentVenuesId() ;
		// 分类ID
		$cat_id	= (int)$this->getParam("cat_id", helper_VenuesHelper::getVenuesCatID());
		// 项目分类
		$cat_list = helper_VenuesHelper::getCurrentCatList();
		// 当前分类，默认为第一个分类
		$cat_list && !$cat_id && $cat_id = array_keys($cat_list)[0];
		// 设置当前分类
		helper_VenuesHelper::setVenuesCatID($cat_id);
		
		$page = (int)$this->getParam("page") > 1 ? $this->getParam("page") : 1;	// 当前第几页
		$count = 10;		// 一页显示多少条

		$search = [];
		$defalut_time = date("Y-m-d", mktime(0,0,0,date("m")-1,date("d"),date("Y")));
		$search['start_date'] = trim($this->getParam('start_date', $defalut_time));  // 开始日期
		$search['end_date']   = trim($this->getParam('end_date', date("Y-m-d", time())));    // 结束日期
		$start_time = strtotime($search['start_date']);
		$end_time = strtotime($search['end_date']. ' 23:59:59');
		$api_UsersApi = new api_UsersApi();
		$list = $api_UsersApi->manageCommentList($business_id, $page, $count, $start_time, $end_time);

		$comments = $list['comments'];		// 评论列表
		$total_count = $list['total_count'];		// 总共多少条
		$total_page = ceil($total_count/$count);

		$is_reply = helper_VenuesHelper::getVenuesField('is_reply');	// 判断该商家是否可以回复评论，0表示被禁言，1表示可回复

		$this->setTitle('评论管理');

		$this->display('comment',[
			'page' => $page,
			'cat_id' => $cat_id,
			'cat_list' => $cat_list,
			'comments' => $comments,
			'total_count' => $total_count,
			'total_page' => $total_page,
			'search' => $search,
			'is_reply' => $is_reply
		]);
	}

	/**
	 * 评论回复
	 */
	public function formAction(){

		$comment_id = (int)$this->getParam("comment_id");	// 评论ID
		$author_id = helper_LoginHelper::getCurrentSuppliersId(); // 商家id
		$remark = $this->getParam("remark");			// 回复内容
		$is_author = (int)$this->getParam("is_author",1);	// 回复类型 1-商家，2客服
		$reply_ip = helper_CoreHelper::getClientIp();	// IP

		$api_UsersApi = new api_UsersApi();
		$set_comments = $api_UsersApi->setCommentReply($comment_id, $author_id, $remark, $is_author, $reply_ip);

		helper_CoreHelper::addAdminLog('评论回复', array(
			'comment_id' => $comment_id,
			'author_id' => $author_id,
			'remark' => $remark,
			'is_author' => $is_author,
			'reply_ip' => $reply_ip
		));

		if( isset($set_comments) ){
			$search = [];
			$defalut_time = date("Y-m-d", mktime(0,0,0,date("m")-1,date("d"),date("Y")));
			$search['start_date'] = trim($this->getParam('form_start_data', $defalut_time));  // 开始日期
			$search['end_date']   = trim($this->getParam('form_end_data', date("Y-m-d", time())));    // 结束日期
			$page = $this->getParam('form_page') ? $this->getParam('form_page') : 1 ;
			
			$this->redirect('/comment/index?start_date='.$search['start_date'].'&end_date='.$search['end_date'].'&page='.$page);
		}else{
			return false;
		}

	}

}


 ?>