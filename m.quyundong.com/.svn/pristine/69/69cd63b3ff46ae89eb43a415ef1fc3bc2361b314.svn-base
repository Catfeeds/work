CREATE TABLE `wx_activity_coupon` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `phone` varchar(16) NOT NULL DEFAULT '' COMMENT '手机号',
  `user_id` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '用户id',
  `coupon` varchar(32) NOT NULL DEFAULT '' COMMENT '优惠券号',
  `send_status` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否成功',
  `add_time` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '添加时间',
  `last_update_time` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `phone` (`phone`),
  KEY `user_id` (`user_id`),
  KEY `coupon` (`coupon`),
  KEY `send_status` (`send_status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='u趣码优惠券表';
