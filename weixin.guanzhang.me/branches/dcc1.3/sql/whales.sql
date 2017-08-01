#2016-04-08
use whale_report_db;

CREATE TABLE `court_light_detail` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `supplier_id` int(11) NOT NULL DEFAULT '0' COMMENT '商户id',
  `venue_id` int(11) NOT NULL DEFAULT '0' COMMENT '场馆id',
  `soms_court_id` char(32) NOT NULL DEFAULT '' COMMENT '馆掌场地id',
  `qyd_court_id` varchar(32) NOT NULL DEFAULT '' COMMENT '趣运动场地id',
  `court_name` varchar(50) NOT NULL DEFAULT '' COMMENT '场地名称',
  `line_codes` TEXT COMMENT '灯光线路编号,多个时用英文逗号隔开',
  `light_status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '灯光状态',
  `create_time` int(11) NOT NULL DEFAULT '0' COMMENT '操作时间',
  `create_by` varchar(50) NOT NULL DEFAULT '' COMMENT '操作人',
  `invalid` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否无效',
  `add_time` int(11) NOT NULL DEFAULT '0' COMMENT '入库时间',
  `last_update_time` int(11) NOT NULL DEFAULT '0' COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `supplier_id` (`supplier_id`) USING BTREE,
  KEY `venue_id` (`venue_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='灯光控制详情表';

CREATE TABLE `court_order_detail` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `supplier_id` int(11) NOT NULL DEFAULT '0' COMMENT '商户id',
  `venue_id` int(11) NOT NULL DEFAULT '0' COMMENT '场馆id',
  `order_id` char(32) NOT NULL DEFAULT '' COMMENT '订单id',
  `soms_court_id` char(32) NOT NULL DEFAULT '' COMMENT '馆掌场地id',
  `qyd_court_id` varchar(32) NOT NULL DEFAULT '' COMMENT '趣运动场地id',
  `court_name` varchar(50) NOT NULL DEFAULT '' COMMENT '场地名称',
  `price` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '价格',
  `begin_time` int(11) NOT NULL DEFAULT '0' COMMENT '开始时间',
  `end_time` int(11) NOT NULL DEFAULT '0' COMMENT '开始时间',
  `invalid` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否无效',
  `add_time` int(11) NOT NULL DEFAULT '0' COMMENT '入库时间',
  `last_update_time` int(11) NOT NULL DEFAULT '0' COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `supplier_id` (`supplier_id`) USING BTREE,
  KEY `venue_id` (`venue_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='订单详情表';

CREATE TABLE `goods_inventory` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `supplier_id` int(11) NOT NULL DEFAULT '0' COMMENT '商户id',
  `venue_id` int(11) NOT NULL DEFAULT '0' COMMENT '场馆id',
  `catalog_id` char(32) NOT NULL DEFAULT '' COMMENT '分类id',
  `catalog_name` varchar(50) NOT NULL DEFAULT '' COMMENT '分类名称',
  `goods_id` char(32) NOT NULL DEFAULT '' COMMENT '商品id',
  `goods_name` varchar(50) NOT NULL DEFAULT '' COMMENT '商品名称',
  `stock_count` int(11) NOT NULL DEFAULT '0' COMMENT '数量',
  `invalid` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否无效',
  `create_time` int(11) NOT NULL DEFAULT '0' COMMENT '变动时间',
  `add_time` int(11) NOT NULL DEFAULT '0' COMMENT '入库时间',
  `last_update_time` int(11) NOT NULL DEFAULT '0' COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `supplier_id` (`supplier_id`) USING BTREE,
  KEY `venue_id` (`venue_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='商品库存表';

CREATE TABLE `goods_order_detail` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `supplier_id` int(11) NOT NULL DEFAULT '0' COMMENT '商户id',
  `venue_id` int(11) NOT NULL DEFAULT '0' COMMENT '场馆id',
  `order_id` char(32) NOT NULL DEFAULT '' COMMENT '订单id',
  `order_code` char(32) NOT NULL DEFAULT '' COMMENT '订单编号',
  `catalog_id` char(32) NOT NULL DEFAULT '' COMMENT '分类id',
  `catalog_name` varchar(50) NOT NULL DEFAULT '' COMMENT '分类名称',
  `goods_id` char(32) NOT NULL DEFAULT '' COMMENT '商品id',
  `goods_code` varchar(32) NOT NULL DEFAULT '' COMMENT '商品编号',
  `goods_name` varchar(50) NOT NULL DEFAULT '' COMMENT '商品名称',
  `price` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '价格',
  `count` int(11) NOT NULL DEFAULT '0' COMMENT '数量',
  `invalid` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否无效',
  `add_time` int(11) NOT NULL DEFAULT '0' COMMENT '入库时间',
  `last_update_time` int(11) NOT NULL DEFAULT '0' COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `supplier_id` (`supplier_id`) USING BTREE,
  KEY `venue_id` (`venue_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='商品订单详情表';

CREATE TABLE `court_light_report` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `supplier_id` int(11) NOT NULL DEFAULT '0' COMMENT '商户id',
  `venue_id` int(11) NOT NULL DEFAULT '0' COMMENT '场馆id',
  `soms_court_id` char(32) NOT NULL DEFAULT '' COMMENT '馆掌场地id',
  `qyd_court_id` varchar(32) NOT NULL DEFAULT '' COMMENT '趣运动场地id',
  `court_name` varchar(50) NOT NULL DEFAULT '' COMMENT '场地名称',
  `date` int(11) NOT NULL DEFAULT '0' COMMENT '记录时间',
  `order_time_list` text COMMENT '订单场次时间',
  `light_time_list` text COMMENT '开灯时间',
  `light_time_total` int(11) NOT NULL DEFAULT '0' COMMENT '开灯时长',
  `order_time_total` int(11) NOT NULL DEFAULT '0' COMMENT '场次时长',
  `order_amount` int(11) NOT NULL DEFAULT '0' COMMENT '场次收入',
  `add_time` int(11) NOT NULL DEFAULT '0' COMMENT '入库时间',
  `last_update_time` int(11) NOT NULL DEFAULT '0' COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `venue_date` (`venue_id`,`date`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='场次订单开灯统计表';

CREATE TABLE `goods_sales_report` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `supplier_id` int(11) NOT NULL DEFAULT '0' COMMENT '商户id',
  `venue_id` int(11) NOT NULL DEFAULT '0' COMMENT '场馆id',
  `catalog_id` char(32) NOT NULL DEFAULT '' COMMENT '分类id',
  `catalog_name` varchar(50) NOT NULL DEFAULT '' COMMENT '分类名称',
  `goods_id` char(32) NOT NULL DEFAULT '' COMMENT '商品id',
  `goods_name` varchar(50) NOT NULL DEFAULT '' COMMENT '商品名称',
  `date` int(11) NOT NULL DEFAULT '0' COMMENT '记录时间',
  `sales_volume` int(11) NOT NULL DEFAULT '0' COMMENT '销量',
  `stock_count` int(11) NOT NULL DEFAULT '0' COMMENT '库存',
  `add_time` int(11) NOT NULL DEFAULT '0' COMMENT '入库时间',
  `last_update_time` int(11) NOT NULL DEFAULT '0' COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `venue_date` (`venue_id`,`date`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='商品销售库存统计表';

CREATE TABLE `orders` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `supplier_id` int(11) NOT NULL DEFAULT '0' COMMENT '商户id',
  `venue_id` int(11) NOT NULL DEFAULT '0' COMMENT '场馆id',
  `order_id` char(32) DEFAULT '' COMMENT '订单id',
  `order_code` varchar(50) NOT NULL DEFAULT '' COMMENT '编码',
  `qyd_order_code` varchar(50) NOT NULL DEFAULT '' COMMENT '趣运动订单编码',
  `order_status` TINYINT(2) NOT NULL DEFAULT -1 COMMENT '订单状态',
  `order_source` TINYINT(2) NOT NULL DEFAULT -1 COMMENT '订单来源',
  `order_type` TINYINT(2) NOT NULL DEFAULT -1 COMMENT '订单分类',
  `order_catalog` TINYINT(2) NOT NULL DEFAULT -1 COMMENT '订单类型',
  `order_source_detail` TINYINT(2) NOT NULL DEFAULT -1 COMMENT '订单类型',
  `pay_status` TINYINT(2) NOT NULL DEFAULT -1 COMMENT '支付状态',
  `pay_mode` TINYINT(2) NOT NULL DEFAULT -1 COMMENT '支付方式 PayMode',
  `payable_amount` decimal(10,2) NOT NULL DEFAULT 0.00 COMMENT '应付金额',
  `apay_amount` decimal(10,2) NOT NULL DEFAULT 0.00 COMMENT '实付金额',
  `gift_remain_pay_amount` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '会员卡赠送余额支付',
  `dingjin` decimal(10,2) NOT NULL DEFAULT 0.00 COMMENT '订金',
  `yajin` decimal(10,2) NOT NULL DEFAULT 0.00 COMMENT '押金',
  `customer_id` char(32) NOT NULL DEFAULT '' COMMENT '会员id',
  `member_card_no` varchar(50) NOT NULL DEFAULT '' COMMENT '会员卡号',
  `customer_mobile` varchar(20) NOT NULL DEFAULT '' COMMENT '顾客手机号',
  `customer_name` varchar(50) NOT NULL DEFAULT '' COMMENT '顾客姓名',
  `remark` varchar(4000) NOT NULL DEFAULT '' COMMENT '备注',
  `is_printed` tinyint(2) NOT NULL DEFAULT -1 COMMENT '是否已打印小票',
  `is_delete` tinyint(2) NOT NULL DEFAULT -1 COMMENT '是否被删除',
  `is_read` tinyint(2) NOT NULL DEFAULT -1 COMMENT '是否已读',
  `check_code` varchar(50) NOT NULL DEFAULT '' COMMENT '验证码',
  `is_valid_check_code` tinyint(2) NOT NULL DEFAULT -1 COMMENT '是否验证',
  `serial_number` varchar(50) NOT NULL DEFAULT '' COMMENT '序列号',
  `account_date` int(11) NOT NULL DEFAULT 0 COMMENT '记账日期',
  `extra_fee` decimal(10,2) NOT NULL DEFAULT 0.00 COMMENT '附加费',
  `extra_fee_remark` varchar(255) NOT NULL DEFAULT '' COMMENT '附加费说明',
  `create_by` varchar(50) NOT NULL DEFAULT '' COMMENT '订单创建人',
  `create_time` int(11) NOT NULL DEFAULT 0 COMMENT '创建时间',
  `last_modify_by` varchar(50) NOT NULL DEFAULT '' COMMENT '订单修改人',
  `last_modify_time` int(11) NOT NULL DEFAULT 0 COMMENT '修改时间',
  `plan_consume_begin_time` int(11) NOT NULL DEFAULT 0 COMMENT '开始消费时间',
  `plan_consume_time` int(11) NOT NULL DEFAULT 0 COMMENT '开始消费时间',
  `upload_time` int(11) NOT NULL DEFAULT 0 COMMENT '上传时间',
  `add_time` int(11) NOT NULL DEFAULT '0' COMMENT '插入时间',
  `last_update_time` int(11) NOT NULL DEFAULT '0' COMMENT '最后更新时间',
  `source_name` varchar(20) NOT NULL DEFAULT '' COMMENT '订单分类,对应Metadata.sourceName',
  PRIMARY KEY (`id`),
  KEY `venue_id` (`venue_id`) USING BTREE,
  KEY `supplier_id` (`supplier_id`) USING BTREE,
  KEY `order_id` (`order_id`) USING BTREE,
  KEY `account_date` (`account_date`) USING BTREE,
  KEY `source_name` (`source_name`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT '馆掌订单表';


#收入报表
CREATE TABLE `income_report` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `supplier_id` int(11) NOT NULL DEFAULT '0' COMMENT '商户id',
  `venue_id` int(11) NOT NULL DEFAULT '0' COMMENT '场馆id',
  `income_type` TINYINT(2) NOT NULL DEFAULT -1 COMMENT '收入分类1场地、2商品、3会员',
  `pay_type` TINYINT(2) NOT NULL DEFAULT -1 COMMENT '支付分类',
  `date` int(11) NOT NULL DEFAULT '0' COMMENT '统计时间',
  `amount` decimal(10,2) NOT NULL DEFAULT 0.00 COMMENT '总计费',
  `gift_amount` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '赠送余额支付',
  PRIMARY KEY (`id`),
  KEY `date_key` (`venue_id`,`date`,`income_type`,`pay_type`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# 场馆馆掌soms版本号对应表
CREATE TABLE `soms_version` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `venue_id` int(11) NOT NULL DEFAULT '0' COMMENT '场馆id',
  `soms_version` varchar(64) NOT NULL DEFAULT '' COMMENT '馆掌版本号',
  `is_new`  tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '是否是新版本',
  `add_time` int(11) NOT NULL DEFAULT '0' COMMENT '添加时间',
  `last_update_time` int(11) NOT NULL DEFAULT '0' COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `venue_id` (`venue_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT '场馆馆掌soms版本号对应表';



alter table `soms_version` add column `upgrade_date` int(11) NOT NULL DEFAULT '0' COMMENT '升级日期(0点时间)';
#2016-05-03
ALTER TABLE `orders` add column `pay_catalog_detail` TEXT COMMENT '支付分类详情';
ALTER TABLE `bs_wxuser_index` add column `mobile` varchar(20) DEFAULT '' COMMENT '电话号码';
#2016-05-05
ALTER TABLE `orders` modify column `pay_mode` int NOT NULL DEFAULT '-1' COMMENT '支付方式 PayMode';
ALTER TABLE `income_report` modify column `pay_type` int NOT NULL DEFAULT '-1' COMMENT '支付方式 PayMode';

#2016-08-01  新公众号绑定
CREATE TABLE `bs_wxuser_binding` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `venue_id` int(11) DEFAULT NULL COMMENT '场地ID',
  `wx_open_id` varchar(32) DEFAULT NULL COMMENT '微信ID',
  `status` int(11) DEFAULT NULL COMMENT '状态 (0解绑，1绑定)',
  `mobile` varchar(20) DEFAULT '' COMMENT '电话号码',
  `bind_date` int(11) DEFAULT NULL COMMENT '绑定日期',
  `valid_date` int(11) DEFAULT NULL COMMENT '有效日期',
  PRIMARY KEY (`id`),
  KEY `wx_open_id` (`wx_open_id`) USING BTREE,
  KEY `mobile` (`mobile`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='新公众号绑定表';
