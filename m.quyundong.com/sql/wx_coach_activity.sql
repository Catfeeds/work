/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : qyd_weixin

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2015-07-23 15:18:28
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for wx_coach_activity
-- ----------------------------
DROP TABLE IF EXISTS `wx_coach_activity`;
CREATE TABLE `wx_coach_activity` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
  `open_id` varchar(64) NOT NULL DEFAULT '' COMMENT '活动发起人',
  `nickname` varchar(64) NOT NULL DEFAULT '' COMMENT '发起人',
  `create_time` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `is_end` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '结束标识',
  `is_cashed` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '兑换标识',
  PRIMARY KEY (`id`),
  KEY `open_id` (`open_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='约练预热活动';

-- ----------------------------
-- Table structure for wx_coach_activity_result
-- ----------------------------
DROP TABLE IF EXISTS `wx_coach_activity_result`;
CREATE TABLE `wx_coach_activity_result` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
  `aid` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '活动id',
  `open_id` varchar(64) NOT NULL DEFAULT '' COMMENT 'openid',
  `money` decimal(3,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '金额',
  PRIMARY KEY (`id`),
  KEY `aid` (`aid`) USING BTREE,
  KEY `open_id` (`open_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='约练预热砍价结果表';
