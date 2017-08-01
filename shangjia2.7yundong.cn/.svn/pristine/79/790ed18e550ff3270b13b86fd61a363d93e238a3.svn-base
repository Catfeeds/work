<?php
/**
 * 推广控制器
*
* @author bumtime
* @date 2016-06-29
*/
class PromoteController extends BaseController
{

	/**
	 * 发送推广短信
	 */
	public function sendAction()
	{		
		//取值

		$phone		=	trim($this->getParam("phone"));
		$cat_id		=	$this->getParam("cat_id", 0);
		$admin_name	=	$this->getParam("admin_name", "");
		$admin_id	=	$this->getParam("admin_id", 0);
		$send_type	=	$this->getParam("type", 0);
		

		if(!$phone || !$cat_id) {
			$this->errorOutput(baf_ErrorCode::ERR_PARAM);
		} 
		if(!baf_Common::isMobile($phone)){
			$this->errorOutput(baf_ErrorCode::ERR_CHECK_PHONE);
		}
		if(!in_array($send_type, [0, 1]))
		{
			$this->errorOutput(baf_ErrorCode::ERR_SEND_TYPE_EMPTY);
		}
		if($send_type == 1 && (empty($admin_id) || empty($admin_name)) )
		{
			$this->errorOutput(baf_ErrorCode::ERR_ADMIN_EMPTY);
		}
	
		//球馆ID
		$id				= helper_VenuesHelper::getCurrentVenuesId();
		//球馆商ID
		$suppliers_id	= helper_LoginHelper::getCurrentSuppliersId();

		//调用接口
		$param = [
				'suppliers_id'	=>	$suppliers_id,
				'category_id'	=>	$cat_id,
				'phone'			=>	$phone,
				'admin_name'	=>	$admin_name,
				'admin_id'		=>	$admin_id,
				'business_id'	=>	$id,
				'type'			=>	$send_type
		];

		helper_CoreHelper::addAdminLog("发送推广短信", $param);
		
		//$this->renderJSON(Loader::api('Business')->sendSpreadSms($param));
		echo json_encode(Loader::api('Business')->sendSpreadSms($param));
	}
}