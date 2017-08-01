<?php
/**
 * 会员卡（qyd_business库下面）
 * 
 * @author bumtime
 * @date 2017-01-11
 */
class UserCardModel extends AbstractModel
{
	/**
	 * 表名
	 *
	 * @var string
	 */
	protected $_table = 'gs_user_card';
	
	/**
	 * 主键
	 *
	 * @var string
	 */
	protected $_primary = 'id';
	
    /**
     * 修改会员卡数据(根据会员旧卡号来匹配)
     * 
     * 
     * @param array $arry  
     * @return array
     */
	public function editUserCard($arry) {
	    $return = [];
	    
	    if (empty($arry['venues_id']) || empty($arry['card_no']) || empty($arry['phone']) || empty($arry['card_no_old'])  || empty($arry['phone_old']) ) {
	        return $return;
	    }
	    
	    $card_info = $this->checkUserCard($arry['venues_id'], $arry['card_no_old']);
	 
	    if(!empty($card_info)){
	    	
	    	$update = [
	    			"card_no"			=>	$arry['card_no'],
	    			"card_mobile_phone"	=>	$arry['phone'],
	    			"cardholder"		=>	$arry['name']
	    	];

	    	if($arry['phone'] != $card_info['card_mobile_phone']){
	    		$update['owner_mobile'] =  $card_info['card_mobile_phone'];
	    		$update['card_status'] 	=  5;
	    		
	    		if($card_info['owner_mobile'] == $arry['phone']){	
	    			$update['owner_mobile'] = "";
	    			$update['card_status'] 	=  1;
	    		}
	    	}
	    	baf_Logger::log2File(__METHOD__.":".json_encode($update), 'UserCard_log');
	    	$return = $this->update($update, [ 'id' => $card_info['id'] ]);
	    }
	    return $return;
	}
	
	/**
	 * 检查会员卡数据
	 *
	 *
	 * @param int $venues_id  场馆id
	 * @param string $card_no  卡号
	 * 
	 * @return array
	 */
	public function checkUserCard($venues_id, $card_no){
		$return = [];
		if ($venues_id <= 0 || empty($card_no)) {
			return $return;
		}
		$sql ="SELECT `user_id`,`id`,`card_no`,`card_mobile_phone`, owner_mobile FROM ". $this->_table . " WHERE  `venues_id` =:venues_id AND (card_status =1 or card_status =5)   AND `card_no`=:card_no ";
		$bind = [
				':venues_id'	=>	$venues_id,
				':card_no'		=>	$card_no				
		];
		
		baf_Logger::log2File(__METHOD__.":".json_encode($bind), 'UserCard_log');
		$return = $this->fetchRow($sql, $bind);
		
		return $return;		
	}
	
	/**
	 * 修改会员卡数据(根据会员卡新卡号来匹配)
	 *
	 *
	 * @param int $id  卡Id
	 * @param int $venues_id  场馆id
	 * @return array
	 */
	public function saveUserCard($arry) {
		$return = [];

	    if (empty($arry['venues_id']) || empty($arry['card_no']) || empty($arry['phone']) ) {
	        return $return;
	    }
		$card_info = $this->checkUserCard($arry['venues_id'], $arry['card_no']);
		if(!empty($card_info)){
			$update = [
					"cardholder"		=>	$arry['name'],
					"card_mobile_phone"	=>	$arry['phone']
			];
			if($arry['phone'] != $card_info['card_mobile_phone']){
	    		$update['owner_mobile'] =  $card_info['card_mobile_phone'];
	    		$update['card_status'] 	=  5;
	    		
	    		if($card_info['owner_mobile'] == $arry['phone']){	
	    			$update['owner_mobile'] = "";
	    			$update['card_status'] 	=  1;
	    		}
	    	}
			baf_Logger::log2File(__METHOD__.":".json_encode($update), 'UserCard_log');
			$return = $this->update($update, [ 'id' => $card_info['id'] ]);
		}
		else{
			$insert = [
					"user_id"			=>	$arry['user_id'],
					"card_no"			=>	$arry['card_no'],
					"cardholder"		=>	$arry['name'],
					"card_mobile_phone"	=>	$arry['phone'],
					"venues_id"			=>	$arry['venues_id'],
				 	"cat_id"			=>	1,
					"balance"			=>	0,
					"rank"				=>	0,
					"card_status"		=>	1,
					"reg_time"			=>	time(),
					"last_update_time"	=>	time(),
					"reg_ip"			=>	helper_CoreHelper::getClientIp(),
					"description"		=>	'',					
					"gift_balance"		=>	0,
					"owner_mobile"		=>	''
			];
			baf_Logger::log2File(__METHOD__.":".json_encode($insert), 'UserCard_log');
			$return = $this->insert($insert);
		}
		return $return;
	}
	
	/**
	 * 删除会员卡数据
	 *
	 *
	 * @param int $id  卡Id
	 * @param int $venues_id  场馆id
	 * @return array
	 */
	public function delUserCard($arry) {
		$return = [];
	
		if (empty($arry['venues_id']) || empty($arry['card_no'])) {
			return $return;
		}
		$card_info = $this->checkUserCard($arry['venues_id'], $arry['card_no']);
		if(!empty($card_info)){
			$update = [
					"card_status"		=>	0,
					"last_update_time"	=>	time()
			];
			
			baf_Logger::log2File(__METHOD__.":".json_encode($update), 'UserCard_log');
			$return = $this->update($update, [ 'id' => $card_info['id'] ]);
		}
		
		return $return;
	}
	
}