/*订单表*/
ALTER TABLE orders ADD  pay_time INT UNSIGNED NOT NULL DEFAULT '0' COMMENT '支付时间（收款时间）';
ALTER TABLE orders ADD  operate_area_id VARCHAR(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '多前台区域ID';
ALTER TABLE orders ADD  operate_area_name VARCHAR(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '多前台区域名称';
ALTER TABLE orders ADD  member_card_catalog VARCHAR(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '会员卡类型';
ALTER TABLE orders ADD  consume_category_id VARCHAR(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '消费项目ID';
ALTER TABLE orders ADD  consume_category_name VARCHAR(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '消费项目名称';

ALTER TABLE `orders` ADD INDEX(`order_code`);
ALTER TABLE `orders` ADD INDEX(`member_card_no`);


/*库存表*/
ALTER TABLE goods_inventory ADD  unit_price	DECIMAL(10,2)  NOT NULL DEFAULT 0.00 COMMENT '单价';
ALTER TABLE goods_inventory ADD  cost_price	DECIMAL(10,2)  NOT NULL DEFAULT 0.00 COMMENT '成本价';
ALTER TABLE goods_inventory ADD  `is_delete` TINYINT(1) UNSIGNED NOT NULL DEFAULT '0' COMMENT '（1为已删除，0为正常）';


/*删除记录日志表*/
CREATE TABLE `data_delete_log` (                                                                                                                                                            
                   `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,                                                                                                                                            
                   `venues_id` INT(10) UNSIGNED NOT NULL DEFAULT '0' COMMENT '场馆ID',                                                                                                                     
                   `supplier_id` INT(10) UNSIGNED NOT NULL DEFAULT '0' COMMENT '商家ID',                                                                                                                   
                   `model_type` SMALLINT(5) UNSIGNED NOT NULL DEFAULT '0' COMMENT '数据上传类型（商品：14000；储值会员卡类型：15001；次卡类型： 15002；商品类别：15003）',   
                   `source_id` VARCHAR(32) NOT NULL COMMENT '数据记录ID（商品：商品ID；储值会员卡类型：储值卡类型ID；次卡类型： 商品ID；商品类别：商品类别ID）',  
                   `delete_by` VARCHAR(16) NOT NULL COMMENT '删除操作人',                                                                                                                               
                   `delete_time` INT(10) UNSIGNED NOT NULL DEFAULT '0' COMMENT '删除时间',                                                                                                               
                   `add_time` INT(10) UNSIGNED NOT NULL DEFAULT '0' COMMENT '入库时间',                                                                                                                  
                   `remark` VARCHAR(256) NOT NULL COMMENT '备注',                                                                                                                                          
                   PRIMARY KEY (`id`),                                                                                                                                                                       
                   KEY `source_id` (`source_id`),                                                                                                                                                            
                   KEY `model_type` (`model_type`)                                                                                                                                                           
                 ) ENGINE=MYISAM  DEFAULT CHARSET=utf8  COMMENT='删除数据记录日志';    
                 
/*商品出入库表*/                 
CREATE TABLE `goods_inventory_log` (                                                                                                                        
                       `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,                                                                                                         
                       `supplier_id` INT(11) NOT NULL DEFAULT '0' COMMENT '商户id',                                                                                            
                       `venue_id` INT(11) NOT NULL DEFAULT '0' COMMENT '场馆id',                                                                                               
                       `catalog_code` CHAR(32) NOT NULL DEFAULT '' COMMENT '分类code',                                                                                         
                       `catalog_name` VARCHAR(50) NOT NULL DEFAULT '' COMMENT '分类名称',                                                                                    
                       `goods_id` CHAR(32) NOT NULL DEFAULT '' COMMENT '商品id',                                                                                               
                       `goods_name` VARCHAR(50) NOT NULL DEFAULT '' COMMENT '商品名称',                                                                                      
                       `stock_count` INT(11) NOT NULL DEFAULT '0' COMMENT '库存数量',                                                                                        
                       `incr_stock_count` MEDIUMINT(8) NOT NULL DEFAULT '0' COMMENT '入库数量',                                                                              
                       `decr_stock_count` MEDIUMINT(8) NOT NULL DEFAULT '0' COMMENT '出库数量',                                                                              
                       `operator` VARCHAR(50) NOT NULL COMMENT '操作人',                                                                                                      
                       `operate_type` TINYINT(1) UNSIGNED NOT NULL DEFAULT '0' COMMENT '操作类型（1、商品入库 2、商品销售 3、商品退单 4、库存调整）',  
                       `create_time` INT(11) UNSIGNED NOT NULL DEFAULT '0' COMMENT '创建时间',                                                                               
                       `remark` TEXT COMMENT '备注',                                                                                                                           
                       `add_time` INT(11) UNSIGNED NOT NULL DEFAULT '0' COMMENT '入库时间',                                                                                  
                       PRIMARY KEY (`id`),                                                                                                                                       
                       KEY `idx_supplier_id` (`supplier_id`) USING BTREE,                                                                                                        
                       KEY `idx_venue_id` (`venue_id`) USING BTREE                                                                                                               
                     ) ENGINE=MYISAM  DEFAULT CHARSET=utf8 COMMENT='商品出入库表';     
                     

/*会员交易记录表*/
CREATE TABLE `members_trading_log` (                                                                                                       
                       `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,                                                                                           
                       `order_id` VARCHAR(32) NOT NULL DEFAULT '' COMMENT '交易单号ID',                                                                     
                       `order_code` VARCHAR(50) NOT NULL COMMENT '交易单号',                                                                                
                       `qyd_order_code` VARCHAR(32) NOT NULL DEFAULT '' COMMENT '趣运动订单号',                                                           
                       `type` TINYINT(1) NOT NULL DEFAULT '0' COMMENT '1充值、2退费（提现）、3扣款（场地预订）、4退款（场地预订）',  
                       `order_catalog` INT(10) UNSIGNED NOT NULL DEFAULT '0' COMMENT '订单类型（ 场次订单：1；普通商品：3；人次票：6）',  
                       `card_no` VARCHAR(50) NOT NULL DEFAULT '' COMMENT '会员卡号',                                                                        
                       `mebmer_name` VARCHAR(128) NOT NULL DEFAULT '' COMMENT '会员名称',                                                                   
                       `member_type_id` VARCHAR(50) NOT NULL DEFAULT '0' COMMENT '会员卡类型，来源于场馆会员类表code',                           
                       `qyd_customer_id` INT(10) UNSIGNED NOT NULL DEFAULT '0' COMMENT '趣运动会员ID',                                                     
                       `amount` DECIMAL(10,2) NOT NULL DEFAULT '0.00' COMMENT '交易金额',                                                                   
                       `amount_gift` DECIMAL(10,2) NOT NULL DEFAULT '0.00' COMMENT '交易赠送金额',                                                        
                       `venues_id` INT(10) UNSIGNED NOT NULL DEFAULT '0' COMMENT '场馆ID',                                                                    
                       `supplier_id` INT(10) UNSIGNED NOT NULL DEFAULT '0' COMMENT '商户id',                                                                  
                       `create_by` VARCHAR(50) NOT NULL DEFAULT '' COMMENT '操作人员',                                                                      
                       `create_time` INT(10) UNSIGNED NOT NULL COMMENT '交易时间',                                                                          
                       `add_time` INT(10) UNSIGNED NOT NULL DEFAULT '0' COMMENT '入库时间',                                                                 
                       `last_modify_time` INT(10) UNSIGNED NOT NULL DEFAULT '0' COMMENT '修改时间',                                                         
                       PRIMARY KEY (`id`),                                                                                                                      
                       KEY `venues_id` (`venues_id`),                                                                                                           
                       KEY `supplier_id` (`supplier_id`),                                                                                                       
                       KEY `type` (`type`),                                                                                                                     
                       KEY `create_time` (`create_time`)                                                                                                        
                     ) ENGINE=MYISAM DEFAULT CHARSET=utf8 COMMENT='会员交易记录表';    


/*场馆次卡商品*/                        
CREATE TABLE `venues_card_count_good` (                                                                     
                          `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,                                                            
                          `code` VARCHAR(40) NOT NULL COMMENT '馆掌guid',                                                         
                          `name` VARCHAR(40) NOT NULL COMMENT '会员卡类型',                                                    
                          `full_name` VARCHAR(64) NOT NULL COMMENT '全称',                                                        
                          `price` DECIMAL(10,2) NOT NULL COMMENT '价格',                                                          
                          `count_value` INT(11) NOT NULL DEFAULT '0' COMMENT '次数',                                              
                          `sport_catalog` TINYINT(1) UNSIGNED NOT NULL DEFAULT '0' COMMENT '所属运动项目ID,同步趣运动',  
                          `venues_id` INT(11) NOT NULL DEFAULT '0' COMMENT '场馆ID',                                              
                          `supplier_id` INT(10) UNSIGNED NOT NULL DEFAULT '0' COMMENT '商家ID',                                   
                          `status` VARCHAR(20) NOT NULL COMMENT '商品状态',                                                     
                          `display_sort` INT(11) NOT NULL DEFAULT '0' COMMENT '排序',                                             
                          `remark` TEXT NOT NULL COMMENT '备注',                                                                  
                          `is_delete` INT(10) UNSIGNED NOT NULL DEFAULT '0' COMMENT '（1为已删除，0为正常）',             
                          `create_user` VARCHAR(50) NOT NULL COMMENT '创建人员',                                                
                          `create_time` INT(10) UNSIGNED NOT NULL DEFAULT '0' COMMENT '创建时间',                               
                          `last_modify_by` VARCHAR(50) NOT NULL COMMENT '修改人员',                                             
                          `last_modify_time` INT(11) UNSIGNED NOT NULL DEFAULT '0' COMMENT '修改时间',                          
                          `add_time` INT(11) UNSIGNED NOT NULL DEFAULT '0' COMMENT '添加时间',                                  
                          PRIMARY KEY (`id`),                                                                                       
                          KEY `venues_id` (`venues_id`),                                                                            
                          KEY `code` (`code`),                                                                                      
                          KEY `supplier_id` (`supplier_id`)                                                             
                        ) ENGINE=MYISAM  DEFAULT CHARSET=utf8 COMMENT='场馆次卡商品';
                        
/*场馆会员卡类型*/                        
CREATE TABLE `venues_card_type` (                                                                   
                    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,                                                    
                    `code` VARCHAR(40) NOT NULL COMMENT '馆掌guid',                                                 
                    `name` VARCHAR(40) NOT NULL COMMENT '会员卡类型',                                            
                    `display_sort` INT(11) NOT NULL DEFAULT '0' COMMENT '排序',                                     
                    `venues_id` INT(11) NOT NULL DEFAULT '0' COMMENT '场馆ID',                                      
                    `supplier_id` INT(10) UNSIGNED NOT NULL DEFAULT '0' COMMENT '商家ID',                           
                    `remark` TEXT NOT NULL COMMENT '备注',                                                          
                    `is_delete` TINYINT(1) UNSIGNED NOT NULL DEFAULT '0' COMMENT '（1为已删除，0为正常）',  
                    `create_time` INT(11) UNSIGNED NOT NULL DEFAULT '0' COMMENT '创建时间',                       
                    `create_user` VARCHAR(50) NOT NULL COMMENT '创建人员',                                        
                    `last_modify_time` INT(10) UNSIGNED NOT NULL DEFAULT '0' COMMENT '修改时间',                  
                    `last_modify_by` VARCHAR(50) NOT NULL COMMENT '修改人员',                                     
                    `add_time` INT(11) UNSIGNED NOT NULL DEFAULT '0' COMMENT '入库时间',                          
                    PRIMARY KEY (`id`),                                                                               
                    KEY `venues_id` (`venues_id`),                                                                    
                    KEY `code` (`code`),                                                                              
                    KEY `supplier_id` (`supplier_id`)                                                     
                  ) ENGINE=MYISAM  DEFAULT CHARSET=utf8 COMMENT='场馆会员卡类型';
                  
/*场馆商品分类*/                    
CREATE TABLE `venues_goods_category` (                                                                                              
                         `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,                                                                                    
                         `code` VARCHAR(40) NOT NULL COMMENT '对应馆掌guid',                                                                           
                         `name` VARCHAR(40) NOT NULL COMMENT '会员卡类型',                                                                            
                         `parent_id` VARCHAR(32) NOT NULL COMMENT '父节点',                                                                             
                         `venues_id` INT(11) NOT NULL DEFAULT '0' COMMENT '场馆ID',                                                                      
                         `supplier_id` INT(10) UNSIGNED NOT NULL DEFAULT '0' COMMENT '商家ID',                                                           
                         `remark` TEXT NOT NULL COMMENT '备注',                                                                                          
                         `display_sort` INT(11) NOT NULL DEFAULT '0' COMMENT '排序',                                                                     
                         `is_active` INT(11) NOT NULL DEFAULT '0' COMMENT '是否有效',                                                                  
                         `is_delete` TINYINT(1) UNSIGNED NOT NULL DEFAULT '0' COMMENT '是否删除（1为已删除，0为正常）',                      
                         `last_modify_time` INT(11) UNSIGNED NOT NULL DEFAULT '0' COMMENT '修改时间',                                                  
                         `last_modify_by` VARCHAR(50) NOT NULL COMMENT '修改人员',                                                                     
                         `create_time` INT(10) UNSIGNED NOT NULL DEFAULT '0' COMMENT '创建时间',                                                       
                         `create_user` VARCHAR(50) NOT NULL COMMENT '创建人员',                                                                        
                         `add_time` INT(11) UNSIGNED NOT NULL DEFAULT '0' COMMENT '入库时间',                                                          
                         PRIMARY KEY (`id`),                                                                                                               
                         KEY `venues_id` (`venues_id`),                                                                                                    
                         KEY `code` (`code`),                                                                                                              
                         KEY `supplier_id` (`supplier_id`)                                                                                     
                       ) ENGINE=MYISAM  DEFAULT CHARSET=utf8 COMMENT='场馆商品分类';                    
                       
 
 

/*会员交易流水表修改*/                       
ALTER TABLE `members_trading_log` CHANGE `type` `type` TINYINT(1) NOT NULL DEFAULT '0' COMMENT '1充值、2退费（充值提现）、3扣款（场次）、4退款（场次），5扣款（商品）、6退款（商品）,7扣款（人次），8退款（人次）';
ALTER TABLE `members_trading_log` CHANGE `order_catalog` `order_catalog` TINYINT(1) NOT NULL DEFAULT '0' COMMENT '订单类型（ 场次订单：1；普通商品：3；人次票：6）'; 

ALTER TABLE `orders` CHANGE `consume_category_id` `count_card_catalog` VARCHAR(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '次卡商品类型', CHANGE `consume_category_name` `consume_category` VARCHAR(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '消费项目ID';                

ALTER TABLE `venues_card_count_good` CHANGE `is_delete` `is_delete` TINYINT(1) NOT NULL DEFAULT '0' COMMENT '（1为已删除，0为正常）'; 

/*会员卡信息基本表*/
CREATE TABLE `members_card` (                                                                                                  
                `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,                                                                               
                `venues_id` INT(10) UNSIGNED NOT NULL DEFAULT '0' COMMENT '场馆ID',                                                        
                `supplier_id` INT(10) UNSIGNED NOT NULL DEFAULT '0' COMMENT '商户id',                                                      
                `qyd_customer_id` INT(10) UNSIGNED NOT NULL DEFAULT '0' COMMENT '趣运动会员ID',                                         
                `username` VARCHAR(30) NOT NULL DEFAULT '' COMMENT '会员姓名',                                                           
                `mobile` CHAR(11) NOT NULL DEFAULT '' COMMENT '手机',                                                                      
                `card_number` VARCHAR(20) NOT NULL DEFAULT '' COMMENT '卡号',                                                              
                `id_card` VARCHAR(20) NOT NULL DEFAULT '' COMMENT '身份证',                                                               
                `account_type` TINYINT(1) UNSIGNED NOT NULL DEFAULT '0' COMMENT '会员类型（1，储蓄卡会员；2，次卡会员）',  
                `card_catalog` VARCHAR(32) NOT NULL DEFAULT '' COMMENT '分别对应（会员卡类型表code，次卡类型表code)',       
                `is_active` TINYINT(1) UNSIGNED NOT NULL DEFAULT '0' COMMENT '是否有效',                                                 
                `create_by` VARCHAR(50) NOT NULL DEFAULT '' COMMENT '操作人员',                                                          
                `create_time` INT(10) UNSIGNED NOT NULL COMMENT '交易时间',                                                              
                `last_modify_by` VARCHAR(50) NOT NULL DEFAULT '' COMMENT '修改人员',                                                     
                `last_modify_time` INT(10) UNSIGNED NOT NULL DEFAULT '0' COMMENT '修改时间',                                             
                `add_time` INT(10) UNSIGNED NOT NULL DEFAULT '0' COMMENT '入库时间',                                                     
                PRIMARY KEY (`id`),                                                                                                          
                KEY `venues_id` (`venues_id`),                                                                                               
                KEY `supplier_id` (`supplier_id`)                                                                                            
              ) ENGINE=MYISAM DEFAULT CHARSET=utf8 COMMENT='会员卡信息基本表';     
                                           
 /*会员卡次卡详情表*/  
 CREATE TABLE `members_card_count_detail` (                                                  
                             `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,                                            
                             `member_id` INT(10) UNSIGNED NOT NULL DEFAULT '0' COMMENT '对应会员卡表ID',         
                             `stand_count` INT(5) UNSIGNED NOT NULL DEFAULT '0' COMMENT '标准次数',                
                             `remain_count` INT(5) UNSIGNED NOT NULL DEFAULT '0' COMMENT '剩余次数',               
                             PRIMARY KEY (`id`),                                                                       
                             KEY `member_id` (`member_id`)                                                             
                           ) ENGINE=MYISAM  DEFAULT CHARSET=utf8 COMMENT='会员卡次卡详情表';  
  /*会员储存卡详情*/                                          
 CREATE TABLE `members_card_detail` (                                                                   
                       `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,                                                       
                       `member_id` INT(10) UNSIGNED NOT NULL COMMENT '对应会员卡表ID',                                
                       `avail_remain` DECIMAL(10,2) DEFAULT NULL COMMENT '可用余额',                                    
                       `lock_remain` DECIMAL(10,2) DEFAULT NULL COMMENT '冻结余额',                                     
                       `gift_remain` DECIMAL(10,2) DEFAULT NULL COMMENT '赠送金额',                                     
                       PRIMARY KEY (`id`),                                                                                  
                       KEY `member_id` (`member_id`)                                                                        
                     ) ENGINE=MYISAM  DEFAULT CHARSET=utf8  COMMENT='会员储存卡详情'; 
                      
 /*会员卡挂失log*/                       
 CREATE TABLE `members_card_lose_log` (                                                                         
                         `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,                                                               
                         `card_id` INT(10) UNSIGNED NOT NULL DEFAULT '0' COMMENT 'members_card表ID',                                 
                         `card_no` VARCHAR(32) NOT NULL DEFAULT '' COMMENT '新的会员卡号',                                      
                         `card_no_old` VARCHAR(32) NOT NULL DEFAULT '' COMMENT '旧的会员卡号',                                  
                         `create_time` INT(11) NOT NULL DEFAULT '0' COMMENT '创建时间（对应于DCC上来的LastModifyTime）',  
                         `create_By` VARCHAR(32) NOT NULL DEFAULT '' COMMENT '创建人（对应于DCC上来的LastModifyBy）',      
                         PRIMARY KEY (`id`),                                                                                          
                         KEY `card_id` (`card_id`)                                                                                    
                       ) ENGINE=MYISAM DEFAULT CHARSET=utf8 COMMENT='会员卡挂失log';       
                       
 
 #20160918
 ALTER TABLE `members_trading_log`  ADD  `pay_mode` SMALLINT(3) NOT NULL DEFAULT '0' COMMENT '0现金、1会员储值卡、2银行卡、3次卡、4赠送余额支付、5白条、6储值卡、7趣运动、8微信支付、9团购卷、10支付宝、11代金卷、12支票、100赠送会员卡、999多种混合的支付方式';     
 ALTER TABLE `members_trading_log`  ADD  `pay_catalog_detail` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '支付方式json(c:支付方式类型；m:支付金额；t:支付时间戳)';     
 ALTER TABLE `members_trading_log`  ADD  gift_remain_pay_amount	DECIMAL(10,2)  NOT NULL DEFAULT 0.00 COMMENT '赠送余额支付金额 '; 
 
 #20161014
 CREATE TABLE `venues_time_ticket_goods` (                                                                   
                            `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,                                                            
                            `goods_id` VARCHAR(40) NOT NULL COMMENT '馆掌guid',                                                     
                            `sport_catalog` TINYINT(3) UNSIGNED NOT NULL DEFAULT '0' COMMENT '所属运动项目ID,同步趣运动',  
                            `code` VARCHAR(40) NOT NULL COMMENT '编码',                                                             
                            `full_name` VARCHAR(64) NOT NULL COMMENT '全称',                                                        
                            `simple_name` VARCHAR(32) NOT NULL COMMENT '简称',                                                      
                            `price` DECIMAL(10,2) NOT NULL COMMENT '价格',                                                          
                            `status` VARCHAR(20) NOT NULL COMMENT '商品状态',                                                     
                            `venues_id` INT(11) NOT NULL DEFAULT '0' COMMENT '场馆ID',                                              
                            `supplier_id` INT(10) UNSIGNED NOT NULL DEFAULT '0' COMMENT '商家ID',                                   
                            `goods_catalog` VARCHAR(32) NOT NULL COMMENT '商品类别',                                              
                            `remark` TEXT NOT NULL COMMENT '备注',                                                                  
                            `is_delete` TINYINT(1) NOT NULL DEFAULT '0' COMMENT '（1为已删除，0为正常）',                   
                            `create_user` VARCHAR(50) NOT NULL COMMENT '创建人员',                                                
                            `create_time` INT(10) UNSIGNED NOT NULL DEFAULT '0' COMMENT '创建时间',                               
                            `last_modify_by` VARCHAR(50) NOT NULL COMMENT '修改人员',                                             
                            `last_modify_time` INT(11) UNSIGNED NOT NULL DEFAULT '0' COMMENT '修改时间',                          
                            `add_time` INT(11) UNSIGNED NOT NULL DEFAULT '0' COMMENT '添加时间',                                  
                            PRIMARY KEY (`id`),                                                                                       
                            KEY `venues_id` (`venues_id`),                                                                            
                            KEY `goods_id` (`goods_id`),                                                                              
                            KEY `venues_id_2` (`venues_id`,`supplier_id`)                                                             
                          ) ENGINE=MYISAM  DEFAULT CHARSET=utf8 COMMENT='场馆人次票商品';
 #20161107  会员流水增加消费时间                       
ALTER TABLE `members_trading_log` ADD `account_date` INT UNSIGNED NOT NULL DEFAULT '0' COMMENT '消费时间' AFTER `last_modify_time`; 
  
#20161108  人次票明细增加消费项目
ALTER TABLE `goods_order_detail` ADD `consume_category` VARCHAR(2) NOT NULL DEFAULT '' COMMENT '消费项目ID' AFTER `count`; 


#将订单的消费时间更新到会员流水的消费时间
UPDATE members_trading_log m, orders o SET  m.account_date = o.account_date WHERE m.order_code = o.order_code ;    

#将订单的储值会员卡类型更新到会员流水的会员卡类型
UPDATE members_trading_log m, orders o SET  m.`member_type_id` = o.`member_card_catalog` WHERE m.order_code = o.order_code AND o.`member_card_catalog` != '' ; 
#将订单的次卡会员卡类型更新到会员流水的会员卡类型
UPDATE members_trading_log m, orders o SET  m.`member_type_id` = o.`member_card_catalog` WHERE m.order_code = o.order_code AND o.`count_card_catalog` != '' ;     

SELECT COUNT(*) FROM members_trading_log m, orders o WHERE m.order_code = o.order_code AND o.`member_card_catalog` == '' AND  o.`count_card_catalog` == '' ;
SELECT COUNT(*) FROM members_trading_log m, orders o WHERE m.order_code = o.order_code AND o.`count_card_catalog` != '' ; 

                                                                    