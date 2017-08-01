
#商家结算记录表
CREATE TABLE `gs_suppliers_clearing_log` (
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增id',
	`suppliers_id` smallint(5) unsigned NOT NULL DEFAULT '0' COMMENT '商家ID',
	`cycle_start_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '结算周期的开始时间(0点时间)',
	`cycle_end_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '结算周期的结束时间(23:59:59时间)',
	`clearing_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '结算时间',
	`total_settle_amount` decimal(10,2) unsigned NOT NULL DEFAULT '0' COMMENT '总结算金额',
	`total_order_amount` decimal(10,2) unsigned NOT NULL DEFAULT '0' COMMENT '订单总金额',
	`order_count` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '订单数量',
	`status` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '状态(0未结算, 1已结算)',
	`add_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '添加时间',
	PRIMARY KEY (`id`),
	KEY `suppliers_id` (`suppliers_id`),
	UNIQUE KEY suppliers_cycle (`suppliers_id`, `cycle_start_time`, `cycle_end_time`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT '商家结算记录表';


#商家后台操作日志表
CREATE TABLE `gs_suppliers_admin_log` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `category` varchar(128) NOT NULL DEFAULT '' COMMENT '分类',
  `action` varchar(128) NOT NULL DEFAULT '' COMMENT '控制器',
  `suppliers_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '商家id',
  `user_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '用户id',
  `super_user_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '超级用户id',
  `ip` varchar(20)  NOT NULL DEFAULT '' COMMENT 'IP地址',
  `content` varchar(5000) NOT NULL DEFAULT '' COMMENT '内容',
  `add_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '添加时间',
   PRIMARY KEY (`id`),
   KEY `category` (`category`),
   KEY `suppliers_id` (`suppliers_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT '商家后台操作日志表';



# 所有商家用户
CREATE TABLE `gs_suppliers_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL DEFAULT '' COMMENT '用户名',
  `nickname` varchar(100) NOT NULL DEFAULT '' COMMENT '昵称',
  `password` varchar(50) NOT NULL DEFAULT '' COMMENT '密码',
  `email` varchar(100) NOT NULL DEFAULT '' COMMENT '邮箱',
  `remark` varchar(255) NOT NULL DEFAULT '' COMMENT '备注',
  `status` tinyint(4) unsigned NOT NULL DEFAULT '0' COMMENT '状态',
  `suppliers_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '球馆商ID',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `suppliers_headquarters_id` smallint(5) unsigned DEFAULT '0' COMMENT '总店商家ID',
  PRIMARY KEY (`id`),
  KEY `suppliers_id` (`suppliers_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='商家用户表';



#商家账号迁移到gs_suppliers_users
INSERT INTO gs_suppliers_users ( `username`, `nickname`, `password`, `email`, `remark`, `status`, `suppliers_id`, `create_time`, `update_time`, `suppliers_headquarters_id` )
  SELECT `username`, `nickname`, `password`, `email`, `remark`, `status`, `suppliers_id`, `create_time`, `update_time`, `suppliers_headquarters_id` FROM gs_admin_user AS a WHERE suppliers_id != 0 OR suppliers_headquarters_id != 0




#配置是否：商家后台报表、会员管理、 新版场地管理 20170112
ALTER TABLE `gs_suppliers` ADD `is_report` TINYINT(1)  UNSIGNED NOT NULL DEFAULT '0' COMMENT '是否开启商家后台报表' AFTER `is_yuliu`;
ALTER TABLE `gs_suppliers` ADD `is_member` TINYINT(1)  UNSIGNED NOT NULL DEFAULT '0' COMMENT '是否开启会员管理' AFTER `is_report`;
ALTER TABLE `gs_suppliers` ADD `is_site` TINYINT(1)  UNSIGNED NOT NULL DEFAULT '0' COMMENT '是否开启场地管理' AFTER `is_member`;

#根据线上灰度测试用户开启相关的商家报表 20170112
UPDATE `gs_suppliers` SET `is_report` =1 WHERE `suppliers_id` IN(SELECT suppliers_id FROM `gs_suppliers_users` WHERE id IN (941,30,4189,11,2364,50,2365,36,2541,817,2313,884,1738,2028,4130,4243,2474,4208,4283,147,4259,726,1514,36,2541,2288,5962,938))


#商品锁定信息表 20170113
CREATE TABLE `gs_goods_locked_info` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `goods_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '商品Id,来源于gs_goods表',
  `locked_name` varchar(20) NOT NULL COMMENT '锁定客户名称',
  `locked_mobile` varchar(15) NOT NULL COMMENT '锁定客户电话',
  `venues_id` int(11) NOT NULL DEFAULT '0' COMMENT '场馆id',
  `cat_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '分类Id',
  `card_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '会员卡Id,来源于DDC库中member_card',
  `book_date` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '预订时间',
  `utm_medium` varchar(16) NOT NULL DEFAULT '' COMMENT '来源平台',
  `start_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '起始时间',
  `end_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '结束时间',
  `add_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '添加时间',
  PRIMARY KEY (`id`),
  KEY `goods_id` (`goods_id`),
  KEY `venues_id` (`venues_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='商品锁定信息表';

#增加来源，1为馆掌，2为商家后台 20170113
ALTER TABLE `gs_soms_locked` ADD `source_type` TINYINT(1)  UNSIGNED NOT NULL DEFAULT '1' COMMENT '来源，1为馆掌，2为商家后台' AFTER `status`;
ALTER TABLE `gs_soms_locked` ADD `card_id` INT(4)  UNSIGNED NOT NULL DEFAULT '0' COMMENT '会员卡Id,来源于DDC库中member_card' AFTER `source_type`;


#锁定表 20170120
ALTER TABLE `gs_soms_locked` ADD `customer` VARCHAR(32)  NOT NULL DEFAULT '' COMMENT '客户名称' AFTER `source_type`;
ALTER TABLE `gs_soms_locked` ADD `customer_phone` VARCHAR(18)  NOT NULL DEFAULT '' COMMENT '客户电话' AFTER `customer`;
ALTER TABLE `gs_soms_locked` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

