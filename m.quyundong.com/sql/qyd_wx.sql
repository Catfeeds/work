#add by bigticket 201504-08    微信后台支持多关键字设置
ALTER TABLE `wx_keywords`
MODIFY COLUMN `keyword`  varchar(512) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '关键字' AFTER `id`,
ADD COLUMN `rule`  varchar(64) NOT NULL DEFAULT '' COMMENT '规则' AFTER `keyword`;


#add by bigticket 201504-13  微信兑券统计
CREATE TABLE `wx_exchange_coupon_count` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `open_id` varchar(64) NOT NULL DEFAULT '' COMMENT '微信open_id',
  `count` tinyint(2) NOT NULL DEFAULT '0' COMMENT '发送总数',
  `add_time` int(11) NOT NULL DEFAULT '0' COMMENT '添加时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `open_id` (`open_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='微信兑券统计表';