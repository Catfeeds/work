
(function (window, document, Math) {

var cityData = [
    {
        "area_id": "110000",
        "area_name": "北京市",
        "parent_id": "0",
        "level": "1",
        "sub_area": [
            {
                "area_id": "110100",
                "area_name": "市辖区",
                "parent_id": "110000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "110101",
                        "area_name": "东城区",
                        "parent_id": "110100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "110102",
                        "area_name": "西城区",
                        "parent_id": "110100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "110105",
                        "area_name": "朝阳区",
                        "parent_id": "110100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "110106",
                        "area_name": "丰台区",
                        "parent_id": "110100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "110107",
                        "area_name": "石景山区",
                        "parent_id": "110100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "110108",
                        "area_name": "海淀区",
                        "parent_id": "110100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "110109",
                        "area_name": "门头沟区",
                        "parent_id": "110100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "110111",
                        "area_name": "房山区",
                        "parent_id": "110100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "110112",
                        "area_name": "通州区",
                        "parent_id": "110100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "110113",
                        "area_name": "顺义区",
                        "parent_id": "110100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "110114",
                        "area_name": "昌平区",
                        "parent_id": "110100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "110115",
                        "area_name": "大兴区",
                        "parent_id": "110100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "110116",
                        "area_name": "怀柔区",
                        "parent_id": "110100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "110117",
                        "area_name": "平谷区",
                        "parent_id": "110100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "110118",
                        "area_name": "密云区",
                        "parent_id": "110100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "110119",
                        "area_name": "延庆区",
                        "parent_id": "110100",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            }
        ]
    },
    {
        "area_id": "120000",
        "area_name": "天津市",
        "parent_id": "0",
        "level": "1",
        "sub_area": [
            {
                "area_id": "120100",
                "area_name": "市辖区",
                "parent_id": "120000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "120101",
                        "area_name": "和平区",
                        "parent_id": "120100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "120102",
                        "area_name": "河东区",
                        "parent_id": "120100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "120103",
                        "area_name": "河西区",
                        "parent_id": "120100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "120104",
                        "area_name": "南开区",
                        "parent_id": "120100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "120105",
                        "area_name": "河北区",
                        "parent_id": "120100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "120106",
                        "area_name": "红桥区",
                        "parent_id": "120100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "120110",
                        "area_name": "东丽区",
                        "parent_id": "120100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "120111",
                        "area_name": "西青区",
                        "parent_id": "120100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "120112",
                        "area_name": "津南区",
                        "parent_id": "120100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "120113",
                        "area_name": "北辰区",
                        "parent_id": "120100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "120114",
                        "area_name": "武清区",
                        "parent_id": "120100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "120115",
                        "area_name": "宝坻区",
                        "parent_id": "120100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "120116",
                        "area_name": "滨海新区",
                        "parent_id": "120100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "120117",
                        "area_name": "宁河区",
                        "parent_id": "120100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "120118",
                        "area_name": "静海区",
                        "parent_id": "120100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "120119",
                        "area_name": "蓟州区",
                        "parent_id": "120100",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            }
        ]
    },
    {
        "area_id": "130000",
        "area_name": "河北省",
        "parent_id": "0",
        "level": "1",
        "sub_area": [
            {
                "area_id": "130100",
                "area_name": "石家庄市",
                "parent_id": "130000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "130101",
                        "area_name": "市辖区",
                        "parent_id": "130100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130102",
                        "area_name": "长安区",
                        "parent_id": "130100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130104",
                        "area_name": "桥西区",
                        "parent_id": "130100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130105",
                        "area_name": "新华区",
                        "parent_id": "130100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130107",
                        "area_name": "井陉矿区",
                        "parent_id": "130100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130108",
                        "area_name": "裕华区",
                        "parent_id": "130100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130109",
                        "area_name": "藁城区",
                        "parent_id": "130100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130110",
                        "area_name": "鹿泉区",
                        "parent_id": "130100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130111",
                        "area_name": "栾城区",
                        "parent_id": "130100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130121",
                        "area_name": "井陉县",
                        "parent_id": "130100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130123",
                        "area_name": "正定县",
                        "parent_id": "130100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130125",
                        "area_name": "行唐县",
                        "parent_id": "130100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130126",
                        "area_name": "灵寿县",
                        "parent_id": "130100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130127",
                        "area_name": "高邑县",
                        "parent_id": "130100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130128",
                        "area_name": "深泽县",
                        "parent_id": "130100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130129",
                        "area_name": "赞皇县",
                        "parent_id": "130100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130130",
                        "area_name": "无极县",
                        "parent_id": "130100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130131",
                        "area_name": "平山县",
                        "parent_id": "130100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130132",
                        "area_name": "元氏县",
                        "parent_id": "130100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130133",
                        "area_name": "赵县",
                        "parent_id": "130100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130183",
                        "area_name": "晋州市",
                        "parent_id": "130100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130184",
                        "area_name": "新乐市",
                        "parent_id": "130100",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "130200",
                "area_name": "唐山市",
                "parent_id": "130000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "130201",
                        "area_name": "市辖区",
                        "parent_id": "130200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130202",
                        "area_name": "路南区",
                        "parent_id": "130200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130203",
                        "area_name": "路北区",
                        "parent_id": "130200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130204",
                        "area_name": "古冶区",
                        "parent_id": "130200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130205",
                        "area_name": "开平区",
                        "parent_id": "130200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130207",
                        "area_name": "丰南区",
                        "parent_id": "130200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130208",
                        "area_name": "丰润区",
                        "parent_id": "130200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130209",
                        "area_name": "曹妃甸区",
                        "parent_id": "130200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130223",
                        "area_name": "滦县",
                        "parent_id": "130200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130224",
                        "area_name": "滦南县",
                        "parent_id": "130200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130225",
                        "area_name": "乐亭县",
                        "parent_id": "130200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130227",
                        "area_name": "迁西县",
                        "parent_id": "130200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130229",
                        "area_name": "玉田县",
                        "parent_id": "130200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130281",
                        "area_name": "遵化市",
                        "parent_id": "130200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130283",
                        "area_name": "迁安市",
                        "parent_id": "130200",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "130300",
                "area_name": "秦皇岛市",
                "parent_id": "130000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "130301",
                        "area_name": "市辖区",
                        "parent_id": "130300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130302",
                        "area_name": "海港区",
                        "parent_id": "130300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130303",
                        "area_name": "山海关区",
                        "parent_id": "130300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130304",
                        "area_name": "北戴河区",
                        "parent_id": "130300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130306",
                        "area_name": "抚宁区",
                        "parent_id": "130300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130321",
                        "area_name": "青龙满族自治县",
                        "parent_id": "130300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130322",
                        "area_name": "昌黎县",
                        "parent_id": "130300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130324",
                        "area_name": "卢龙县",
                        "parent_id": "130300",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "130400",
                "area_name": "邯郸市",
                "parent_id": "130000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "130401",
                        "area_name": "市辖区",
                        "parent_id": "130400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130402",
                        "area_name": "邯山区",
                        "parent_id": "130400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130403",
                        "area_name": "丛台区",
                        "parent_id": "130400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130404",
                        "area_name": "复兴区",
                        "parent_id": "130400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130406",
                        "area_name": "峰峰矿区",
                        "parent_id": "130400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130421",
                        "area_name": "邯郸县",
                        "parent_id": "130400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130423",
                        "area_name": "临漳县",
                        "parent_id": "130400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130424",
                        "area_name": "成安县",
                        "parent_id": "130400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130425",
                        "area_name": "大名县",
                        "parent_id": "130400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130426",
                        "area_name": "涉县",
                        "parent_id": "130400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130427",
                        "area_name": "磁县",
                        "parent_id": "130400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130428",
                        "area_name": "肥乡县",
                        "parent_id": "130400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130429",
                        "area_name": "永年县",
                        "parent_id": "130400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130430",
                        "area_name": "邱县",
                        "parent_id": "130400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130431",
                        "area_name": "鸡泽县",
                        "parent_id": "130400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130432",
                        "area_name": "广平县",
                        "parent_id": "130400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130433",
                        "area_name": "馆陶县",
                        "parent_id": "130400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130434",
                        "area_name": "魏县",
                        "parent_id": "130400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130435",
                        "area_name": "曲周县",
                        "parent_id": "130400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130481",
                        "area_name": "武安市",
                        "parent_id": "130400",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "130500",
                "area_name": "邢台市",
                "parent_id": "130000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "130501",
                        "area_name": "市辖区",
                        "parent_id": "130500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130502",
                        "area_name": "桥东区",
                        "parent_id": "130500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130503",
                        "area_name": "桥西区",
                        "parent_id": "130500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130521",
                        "area_name": "邢台县",
                        "parent_id": "130500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130522",
                        "area_name": "临城县",
                        "parent_id": "130500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130523",
                        "area_name": "内丘县",
                        "parent_id": "130500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130524",
                        "area_name": "柏乡县",
                        "parent_id": "130500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130525",
                        "area_name": "隆尧县",
                        "parent_id": "130500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130526",
                        "area_name": "任县",
                        "parent_id": "130500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130527",
                        "area_name": "南和县",
                        "parent_id": "130500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130528",
                        "area_name": "宁晋县",
                        "parent_id": "130500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130529",
                        "area_name": "巨鹿县",
                        "parent_id": "130500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130530",
                        "area_name": "新河县",
                        "parent_id": "130500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130531",
                        "area_name": "广宗县",
                        "parent_id": "130500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130532",
                        "area_name": "平乡县",
                        "parent_id": "130500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130533",
                        "area_name": "威县",
                        "parent_id": "130500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130534",
                        "area_name": "清河县",
                        "parent_id": "130500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130535",
                        "area_name": "临西县",
                        "parent_id": "130500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130581",
                        "area_name": "南宫市",
                        "parent_id": "130500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130582",
                        "area_name": "沙河市",
                        "parent_id": "130500",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "130600",
                "area_name": "保定市",
                "parent_id": "130000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "130601",
                        "area_name": "市辖区",
                        "parent_id": "130600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130602",
                        "area_name": "竞秀区",
                        "parent_id": "130600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130606",
                        "area_name": "莲池区",
                        "parent_id": "130600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130607",
                        "area_name": "满城区",
                        "parent_id": "130600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130608",
                        "area_name": "清苑区",
                        "parent_id": "130600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130609",
                        "area_name": "徐水区",
                        "parent_id": "130600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130623",
                        "area_name": "涞水县",
                        "parent_id": "130600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130624",
                        "area_name": "阜平县",
                        "parent_id": "130600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130626",
                        "area_name": "定兴县",
                        "parent_id": "130600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130627",
                        "area_name": "唐县",
                        "parent_id": "130600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130628",
                        "area_name": "高阳县",
                        "parent_id": "130600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130629",
                        "area_name": "容城县",
                        "parent_id": "130600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130630",
                        "area_name": "涞源县",
                        "parent_id": "130600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130631",
                        "area_name": "望都县",
                        "parent_id": "130600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130632",
                        "area_name": "安新县",
                        "parent_id": "130600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130633",
                        "area_name": "易县",
                        "parent_id": "130600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130634",
                        "area_name": "曲阳县",
                        "parent_id": "130600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130635",
                        "area_name": "蠡县",
                        "parent_id": "130600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130636",
                        "area_name": "顺平县",
                        "parent_id": "130600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130637",
                        "area_name": "博野县",
                        "parent_id": "130600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130638",
                        "area_name": "雄县",
                        "parent_id": "130600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130681",
                        "area_name": "涿州市",
                        "parent_id": "130600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130683",
                        "area_name": "安国市",
                        "parent_id": "130600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130684",
                        "area_name": "高碑店市",
                        "parent_id": "130600",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "130700",
                "area_name": "张家口市",
                "parent_id": "130000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "130701",
                        "area_name": "市辖区",
                        "parent_id": "130700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130702",
                        "area_name": "桥东区",
                        "parent_id": "130700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130703",
                        "area_name": "桥西区",
                        "parent_id": "130700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130705",
                        "area_name": "宣化区",
                        "parent_id": "130700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130706",
                        "area_name": "下花园区",
                        "parent_id": "130700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130708",
                        "area_name": "万全区",
                        "parent_id": "130700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130709",
                        "area_name": "崇礼区",
                        "parent_id": "130700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130722",
                        "area_name": "张北县",
                        "parent_id": "130700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130723",
                        "area_name": "康保县",
                        "parent_id": "130700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130724",
                        "area_name": "沽源县",
                        "parent_id": "130700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130725",
                        "area_name": "尚义县",
                        "parent_id": "130700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130726",
                        "area_name": "蔚县",
                        "parent_id": "130700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130727",
                        "area_name": "阳原县",
                        "parent_id": "130700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130728",
                        "area_name": "怀安县",
                        "parent_id": "130700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130730",
                        "area_name": "怀来县",
                        "parent_id": "130700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130731",
                        "area_name": "涿鹿县",
                        "parent_id": "130700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130732",
                        "area_name": "赤城县",
                        "parent_id": "130700",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "130800",
                "area_name": "承德市",
                "parent_id": "130000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "130801",
                        "area_name": "市辖区",
                        "parent_id": "130800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130802",
                        "area_name": "双桥区",
                        "parent_id": "130800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130803",
                        "area_name": "双滦区",
                        "parent_id": "130800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130804",
                        "area_name": "鹰手营子矿区",
                        "parent_id": "130800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130821",
                        "area_name": "承德县",
                        "parent_id": "130800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130822",
                        "area_name": "兴隆县",
                        "parent_id": "130800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130823",
                        "area_name": "平泉县",
                        "parent_id": "130800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130824",
                        "area_name": "滦平县",
                        "parent_id": "130800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130825",
                        "area_name": "隆化县",
                        "parent_id": "130800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130826",
                        "area_name": "丰宁满族自治县",
                        "parent_id": "130800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130827",
                        "area_name": "宽城满族自治县",
                        "parent_id": "130800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130828",
                        "area_name": "围场满族蒙古族自治县",
                        "parent_id": "130800",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "130900",
                "area_name": "沧州市",
                "parent_id": "130000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "130901",
                        "area_name": "市辖区",
                        "parent_id": "130900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130902",
                        "area_name": "新华区",
                        "parent_id": "130900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130903",
                        "area_name": "运河区",
                        "parent_id": "130900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130921",
                        "area_name": "沧县",
                        "parent_id": "130900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130922",
                        "area_name": "青县",
                        "parent_id": "130900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130923",
                        "area_name": "东光县",
                        "parent_id": "130900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130924",
                        "area_name": "海兴县",
                        "parent_id": "130900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130925",
                        "area_name": "盐山县",
                        "parent_id": "130900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130926",
                        "area_name": "肃宁县",
                        "parent_id": "130900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130927",
                        "area_name": "南皮县",
                        "parent_id": "130900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130928",
                        "area_name": "吴桥县",
                        "parent_id": "130900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130929",
                        "area_name": "献县",
                        "parent_id": "130900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130930",
                        "area_name": "孟村回族自治县",
                        "parent_id": "130900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130981",
                        "area_name": "泊头市",
                        "parent_id": "130900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130982",
                        "area_name": "任丘市",
                        "parent_id": "130900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130983",
                        "area_name": "黄骅市",
                        "parent_id": "130900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "130984",
                        "area_name": "河间市",
                        "parent_id": "130900",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "131000",
                "area_name": "廊坊市",
                "parent_id": "130000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "131001",
                        "area_name": "市辖区",
                        "parent_id": "131000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "131002",
                        "area_name": "安次区",
                        "parent_id": "131000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "131003",
                        "area_name": "广阳区",
                        "parent_id": "131000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "131022",
                        "area_name": "固安县",
                        "parent_id": "131000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "131023",
                        "area_name": "永清县",
                        "parent_id": "131000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "131024",
                        "area_name": "香河县",
                        "parent_id": "131000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "131025",
                        "area_name": "大城县",
                        "parent_id": "131000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "131026",
                        "area_name": "文安县",
                        "parent_id": "131000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "131028",
                        "area_name": "大厂回族自治县",
                        "parent_id": "131000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "131081",
                        "area_name": "霸州市",
                        "parent_id": "131000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "131082",
                        "area_name": "三河市",
                        "parent_id": "131000",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "131100",
                "area_name": "衡水市",
                "parent_id": "130000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "131101",
                        "area_name": "市辖区",
                        "parent_id": "131100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "131102",
                        "area_name": "桃城区",
                        "parent_id": "131100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "131103",
                        "area_name": "冀州区",
                        "parent_id": "131100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "131121",
                        "area_name": "枣强县",
                        "parent_id": "131100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "131122",
                        "area_name": "武邑县",
                        "parent_id": "131100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "131123",
                        "area_name": "武强县",
                        "parent_id": "131100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "131124",
                        "area_name": "饶阳县",
                        "parent_id": "131100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "131125",
                        "area_name": "安平县",
                        "parent_id": "131100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "131126",
                        "area_name": "故城县",
                        "parent_id": "131100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "131127",
                        "area_name": "景县",
                        "parent_id": "131100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "131128",
                        "area_name": "阜城县",
                        "parent_id": "131100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "131182",
                        "area_name": "深州市",
                        "parent_id": "131100",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "139000",
                "area_name": "省直辖县级行政区划",
                "parent_id": "130000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "139001",
                        "area_name": "定州市",
                        "parent_id": "139000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "139002",
                        "area_name": "辛集市",
                        "parent_id": "139000",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            }
        ]
    },
    {
        "area_id": "140000",
        "area_name": "山西省",
        "parent_id": "0",
        "level": "1",
        "sub_area": [
            {
                "area_id": "140100",
                "area_name": "太原市",
                "parent_id": "140000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "140101",
                        "area_name": "市辖区",
                        "parent_id": "140100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140105",
                        "area_name": "小店区",
                        "parent_id": "140100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140106",
                        "area_name": "迎泽区",
                        "parent_id": "140100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140107",
                        "area_name": "杏花岭区",
                        "parent_id": "140100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140108",
                        "area_name": "尖草坪区",
                        "parent_id": "140100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140109",
                        "area_name": "万柏林区",
                        "parent_id": "140100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140110",
                        "area_name": "晋源区",
                        "parent_id": "140100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140121",
                        "area_name": "清徐县",
                        "parent_id": "140100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140122",
                        "area_name": "阳曲县",
                        "parent_id": "140100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140123",
                        "area_name": "娄烦县",
                        "parent_id": "140100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140181",
                        "area_name": "古交市",
                        "parent_id": "140100",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "140200",
                "area_name": "大同市",
                "parent_id": "140000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "140201",
                        "area_name": "市辖区",
                        "parent_id": "140200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140202",
                        "area_name": "城区",
                        "parent_id": "140200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140203",
                        "area_name": "矿区",
                        "parent_id": "140200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140211",
                        "area_name": "南郊区",
                        "parent_id": "140200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140212",
                        "area_name": "新荣区",
                        "parent_id": "140200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140221",
                        "area_name": "阳高县",
                        "parent_id": "140200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140222",
                        "area_name": "天镇县",
                        "parent_id": "140200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140223",
                        "area_name": "广灵县",
                        "parent_id": "140200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140224",
                        "area_name": "灵丘县",
                        "parent_id": "140200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140225",
                        "area_name": "浑源县",
                        "parent_id": "140200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140226",
                        "area_name": "左云县",
                        "parent_id": "140200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140227",
                        "area_name": "大同县",
                        "parent_id": "140200",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "140300",
                "area_name": "阳泉市",
                "parent_id": "140000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "140301",
                        "area_name": "市辖区",
                        "parent_id": "140300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140302",
                        "area_name": "城区",
                        "parent_id": "140300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140303",
                        "area_name": "矿区",
                        "parent_id": "140300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140311",
                        "area_name": "郊区",
                        "parent_id": "140300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140321",
                        "area_name": "平定县",
                        "parent_id": "140300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140322",
                        "area_name": "盂县",
                        "parent_id": "140300",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "140400",
                "area_name": "长治市",
                "parent_id": "140000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "140401",
                        "area_name": "市辖区",
                        "parent_id": "140400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140402",
                        "area_name": "城区",
                        "parent_id": "140400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140411",
                        "area_name": "郊区",
                        "parent_id": "140400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140421",
                        "area_name": "长治县",
                        "parent_id": "140400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140423",
                        "area_name": "襄垣县",
                        "parent_id": "140400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140424",
                        "area_name": "屯留县",
                        "parent_id": "140400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140425",
                        "area_name": "平顺县",
                        "parent_id": "140400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140426",
                        "area_name": "黎城县",
                        "parent_id": "140400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140427",
                        "area_name": "壶关县",
                        "parent_id": "140400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140428",
                        "area_name": "长子县",
                        "parent_id": "140400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140429",
                        "area_name": "武乡县",
                        "parent_id": "140400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140430",
                        "area_name": "沁县",
                        "parent_id": "140400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140431",
                        "area_name": "沁源县",
                        "parent_id": "140400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140481",
                        "area_name": "潞城市",
                        "parent_id": "140400",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "140500",
                "area_name": "晋城市",
                "parent_id": "140000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "140501",
                        "area_name": "市辖区",
                        "parent_id": "140500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140502",
                        "area_name": "城区",
                        "parent_id": "140500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140521",
                        "area_name": "沁水县",
                        "parent_id": "140500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140522",
                        "area_name": "阳城县",
                        "parent_id": "140500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140524",
                        "area_name": "陵川县",
                        "parent_id": "140500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140525",
                        "area_name": "泽州县",
                        "parent_id": "140500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140581",
                        "area_name": "高平市",
                        "parent_id": "140500",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "140600",
                "area_name": "朔州市",
                "parent_id": "140000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "140601",
                        "area_name": "市辖区",
                        "parent_id": "140600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140602",
                        "area_name": "朔城区",
                        "parent_id": "140600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140603",
                        "area_name": "平鲁区",
                        "parent_id": "140600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140621",
                        "area_name": "山阴县",
                        "parent_id": "140600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140622",
                        "area_name": "应县",
                        "parent_id": "140600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140623",
                        "area_name": "右玉县",
                        "parent_id": "140600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140624",
                        "area_name": "怀仁县",
                        "parent_id": "140600",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "140700",
                "area_name": "晋中市",
                "parent_id": "140000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "140701",
                        "area_name": "市辖区",
                        "parent_id": "140700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140702",
                        "area_name": "榆次区",
                        "parent_id": "140700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140721",
                        "area_name": "榆社县",
                        "parent_id": "140700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140722",
                        "area_name": "左权县",
                        "parent_id": "140700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140723",
                        "area_name": "和顺县",
                        "parent_id": "140700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140724",
                        "area_name": "昔阳县",
                        "parent_id": "140700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140725",
                        "area_name": "寿阳县",
                        "parent_id": "140700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140726",
                        "area_name": "太谷县",
                        "parent_id": "140700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140727",
                        "area_name": "祁县",
                        "parent_id": "140700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140728",
                        "area_name": "平遥县",
                        "parent_id": "140700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140729",
                        "area_name": "灵石县",
                        "parent_id": "140700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140781",
                        "area_name": "介休市",
                        "parent_id": "140700",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "140800",
                "area_name": "运城市",
                "parent_id": "140000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "140801",
                        "area_name": "市辖区",
                        "parent_id": "140800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140802",
                        "area_name": "盐湖区",
                        "parent_id": "140800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140821",
                        "area_name": "临猗县",
                        "parent_id": "140800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140822",
                        "area_name": "万荣县",
                        "parent_id": "140800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140823",
                        "area_name": "闻喜县",
                        "parent_id": "140800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140824",
                        "area_name": "稷山县",
                        "parent_id": "140800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140825",
                        "area_name": "新绛县",
                        "parent_id": "140800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140826",
                        "area_name": "绛县",
                        "parent_id": "140800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140827",
                        "area_name": "垣曲县",
                        "parent_id": "140800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140828",
                        "area_name": "夏县",
                        "parent_id": "140800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140829",
                        "area_name": "平陆县",
                        "parent_id": "140800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140830",
                        "area_name": "芮城县",
                        "parent_id": "140800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140881",
                        "area_name": "永济市",
                        "parent_id": "140800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140882",
                        "area_name": "河津市",
                        "parent_id": "140800",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "140900",
                "area_name": "忻州市",
                "parent_id": "140000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "140901",
                        "area_name": "市辖区",
                        "parent_id": "140900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140902",
                        "area_name": "忻府区",
                        "parent_id": "140900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140921",
                        "area_name": "定襄县",
                        "parent_id": "140900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140922",
                        "area_name": "五台县",
                        "parent_id": "140900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140923",
                        "area_name": "代县",
                        "parent_id": "140900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140924",
                        "area_name": "繁峙县",
                        "parent_id": "140900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140925",
                        "area_name": "宁武县",
                        "parent_id": "140900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140926",
                        "area_name": "静乐县",
                        "parent_id": "140900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140927",
                        "area_name": "神池县",
                        "parent_id": "140900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140928",
                        "area_name": "五寨县",
                        "parent_id": "140900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140929",
                        "area_name": "岢岚县",
                        "parent_id": "140900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140930",
                        "area_name": "河曲县",
                        "parent_id": "140900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140931",
                        "area_name": "保德县",
                        "parent_id": "140900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140932",
                        "area_name": "偏关县",
                        "parent_id": "140900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "140981",
                        "area_name": "原平市",
                        "parent_id": "140900",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "141000",
                "area_name": "临汾市",
                "parent_id": "140000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "141001",
                        "area_name": "市辖区",
                        "parent_id": "141000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "141002",
                        "area_name": "尧都区",
                        "parent_id": "141000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "141021",
                        "area_name": "曲沃县",
                        "parent_id": "141000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "141022",
                        "area_name": "翼城县",
                        "parent_id": "141000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "141023",
                        "area_name": "襄汾县",
                        "parent_id": "141000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "141024",
                        "area_name": "洪洞县",
                        "parent_id": "141000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "141025",
                        "area_name": "古县",
                        "parent_id": "141000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "141026",
                        "area_name": "安泽县",
                        "parent_id": "141000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "141027",
                        "area_name": "浮山县",
                        "parent_id": "141000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "141028",
                        "area_name": "吉县",
                        "parent_id": "141000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "141029",
                        "area_name": "乡宁县",
                        "parent_id": "141000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "141030",
                        "area_name": "大宁县",
                        "parent_id": "141000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "141031",
                        "area_name": "隰县",
                        "parent_id": "141000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "141032",
                        "area_name": "永和县",
                        "parent_id": "141000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "141033",
                        "area_name": "蒲县",
                        "parent_id": "141000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "141034",
                        "area_name": "汾西县",
                        "parent_id": "141000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "141081",
                        "area_name": "侯马市",
                        "parent_id": "141000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "141082",
                        "area_name": "霍州市",
                        "parent_id": "141000",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "141100",
                "area_name": "吕梁市",
                "parent_id": "140000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "141101",
                        "area_name": "市辖区",
                        "parent_id": "141100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "141102",
                        "area_name": "离石区",
                        "parent_id": "141100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "141121",
                        "area_name": "文水县",
                        "parent_id": "141100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "141122",
                        "area_name": "交城县",
                        "parent_id": "141100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "141123",
                        "area_name": "兴县",
                        "parent_id": "141100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "141124",
                        "area_name": "临县",
                        "parent_id": "141100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "141125",
                        "area_name": "柳林县",
                        "parent_id": "141100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "141126",
                        "area_name": "石楼县",
                        "parent_id": "141100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "141127",
                        "area_name": "岚县",
                        "parent_id": "141100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "141128",
                        "area_name": "方山县",
                        "parent_id": "141100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "141129",
                        "area_name": "中阳县",
                        "parent_id": "141100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "141130",
                        "area_name": "交口县",
                        "parent_id": "141100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "141181",
                        "area_name": "孝义市",
                        "parent_id": "141100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "141182",
                        "area_name": "汾阳市",
                        "parent_id": "141100",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            }
        ]
    },
    {
        "area_id": "150000",
        "area_name": "内蒙古自治区",
        "parent_id": "0",
        "level": "1",
        "sub_area": [
            {
                "area_id": "150100",
                "area_name": "呼和浩特市",
                "parent_id": "150000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "150101",
                        "area_name": "市辖区",
                        "parent_id": "150100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150102",
                        "area_name": "新城区",
                        "parent_id": "150100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150103",
                        "area_name": "回民区",
                        "parent_id": "150100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150104",
                        "area_name": "玉泉区",
                        "parent_id": "150100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150105",
                        "area_name": "赛罕区",
                        "parent_id": "150100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150121",
                        "area_name": "土默特左旗",
                        "parent_id": "150100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150122",
                        "area_name": "托克托县",
                        "parent_id": "150100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150123",
                        "area_name": "和林格尔县",
                        "parent_id": "150100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150124",
                        "area_name": "清水河县",
                        "parent_id": "150100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150125",
                        "area_name": "武川县",
                        "parent_id": "150100",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "150200",
                "area_name": "包头市",
                "parent_id": "150000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "150201",
                        "area_name": "市辖区",
                        "parent_id": "150200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150202",
                        "area_name": "东河区",
                        "parent_id": "150200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150203",
                        "area_name": "昆都仑区",
                        "parent_id": "150200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150204",
                        "area_name": "青山区",
                        "parent_id": "150200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150205",
                        "area_name": "石拐区",
                        "parent_id": "150200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150206",
                        "area_name": "白云鄂博矿区",
                        "parent_id": "150200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150207",
                        "area_name": "九原区",
                        "parent_id": "150200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150221",
                        "area_name": "土默特右旗",
                        "parent_id": "150200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150222",
                        "area_name": "固阳县",
                        "parent_id": "150200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150223",
                        "area_name": "达尔罕茂明安联合旗",
                        "parent_id": "150200",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "150300",
                "area_name": "乌海市",
                "parent_id": "150000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "150301",
                        "area_name": "市辖区",
                        "parent_id": "150300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150302",
                        "area_name": "海勃湾区",
                        "parent_id": "150300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150303",
                        "area_name": "海南区",
                        "parent_id": "150300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150304",
                        "area_name": "乌达区",
                        "parent_id": "150300",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "150400",
                "area_name": "赤峰市",
                "parent_id": "150000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "150401",
                        "area_name": "市辖区",
                        "parent_id": "150400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150402",
                        "area_name": "红山区",
                        "parent_id": "150400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150403",
                        "area_name": "元宝山区",
                        "parent_id": "150400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150404",
                        "area_name": "松山区",
                        "parent_id": "150400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150421",
                        "area_name": "阿鲁科尔沁旗",
                        "parent_id": "150400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150422",
                        "area_name": "巴林左旗",
                        "parent_id": "150400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150423",
                        "area_name": "巴林右旗",
                        "parent_id": "150400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150424",
                        "area_name": "林西县",
                        "parent_id": "150400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150425",
                        "area_name": "克什克腾旗",
                        "parent_id": "150400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150426",
                        "area_name": "翁牛特旗",
                        "parent_id": "150400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150428",
                        "area_name": "喀喇沁旗",
                        "parent_id": "150400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150429",
                        "area_name": "宁城县",
                        "parent_id": "150400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150430",
                        "area_name": "敖汉旗",
                        "parent_id": "150400",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "150500",
                "area_name": "通辽市",
                "parent_id": "150000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "150501",
                        "area_name": "市辖区",
                        "parent_id": "150500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150502",
                        "area_name": "科尔沁区",
                        "parent_id": "150500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150521",
                        "area_name": "科尔沁左翼中旗",
                        "parent_id": "150500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150522",
                        "area_name": "科尔沁左翼后旗",
                        "parent_id": "150500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150523",
                        "area_name": "开鲁县",
                        "parent_id": "150500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150524",
                        "area_name": "库伦旗",
                        "parent_id": "150500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150525",
                        "area_name": "奈曼旗",
                        "parent_id": "150500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150526",
                        "area_name": "扎鲁特旗",
                        "parent_id": "150500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150581",
                        "area_name": "霍林郭勒市",
                        "parent_id": "150500",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "150600",
                "area_name": "鄂尔多斯市",
                "parent_id": "150000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "150601",
                        "area_name": "市辖区",
                        "parent_id": "150600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150602",
                        "area_name": "东胜区",
                        "parent_id": "150600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150603",
                        "area_name": "康巴什区",
                        "parent_id": "150600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150621",
                        "area_name": "达拉特旗",
                        "parent_id": "150600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150622",
                        "area_name": "准格尔旗",
                        "parent_id": "150600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150623",
                        "area_name": "鄂托克前旗",
                        "parent_id": "150600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150624",
                        "area_name": "鄂托克旗",
                        "parent_id": "150600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150625",
                        "area_name": "杭锦旗",
                        "parent_id": "150600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150626",
                        "area_name": "乌审旗",
                        "parent_id": "150600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150627",
                        "area_name": "伊金霍洛旗",
                        "parent_id": "150600",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "150700",
                "area_name": "呼伦贝尔市",
                "parent_id": "150000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "150701",
                        "area_name": "市辖区",
                        "parent_id": "150700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150702",
                        "area_name": "海拉尔区",
                        "parent_id": "150700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150703",
                        "area_name": "扎赉诺尔区",
                        "parent_id": "150700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150721",
                        "area_name": "阿荣旗",
                        "parent_id": "150700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150722",
                        "area_name": "莫力达瓦达斡尔族自治旗",
                        "parent_id": "150700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150723",
                        "area_name": "鄂伦春自治旗",
                        "parent_id": "150700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150724",
                        "area_name": "鄂温克族自治旗",
                        "parent_id": "150700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150725",
                        "area_name": "陈巴尔虎旗",
                        "parent_id": "150700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150726",
                        "area_name": "新巴尔虎左旗",
                        "parent_id": "150700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150727",
                        "area_name": "新巴尔虎右旗",
                        "parent_id": "150700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150781",
                        "area_name": "满洲里市",
                        "parent_id": "150700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150782",
                        "area_name": "牙克石市",
                        "parent_id": "150700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150783",
                        "area_name": "扎兰屯市",
                        "parent_id": "150700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150784",
                        "area_name": "额尔古纳市",
                        "parent_id": "150700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150785",
                        "area_name": "根河市",
                        "parent_id": "150700",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "150800",
                "area_name": "巴彦淖尔市",
                "parent_id": "150000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "150801",
                        "area_name": "市辖区",
                        "parent_id": "150800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150802",
                        "area_name": "临河区",
                        "parent_id": "150800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150821",
                        "area_name": "五原县",
                        "parent_id": "150800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150822",
                        "area_name": "磴口县",
                        "parent_id": "150800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150823",
                        "area_name": "乌拉特前旗",
                        "parent_id": "150800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150824",
                        "area_name": "乌拉特中旗",
                        "parent_id": "150800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150825",
                        "area_name": "乌拉特后旗",
                        "parent_id": "150800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150826",
                        "area_name": "杭锦后旗",
                        "parent_id": "150800",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "150900",
                "area_name": "乌兰察布市",
                "parent_id": "150000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "150901",
                        "area_name": "市辖区",
                        "parent_id": "150900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150902",
                        "area_name": "集宁区",
                        "parent_id": "150900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150921",
                        "area_name": "卓资县",
                        "parent_id": "150900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150922",
                        "area_name": "化德县",
                        "parent_id": "150900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150923",
                        "area_name": "商都县",
                        "parent_id": "150900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150924",
                        "area_name": "兴和县",
                        "parent_id": "150900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150925",
                        "area_name": "凉城县",
                        "parent_id": "150900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150926",
                        "area_name": "察哈尔右翼前旗",
                        "parent_id": "150900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150927",
                        "area_name": "察哈尔右翼中旗",
                        "parent_id": "150900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150928",
                        "area_name": "察哈尔右翼后旗",
                        "parent_id": "150900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150929",
                        "area_name": "四子王旗",
                        "parent_id": "150900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "150981",
                        "area_name": "丰镇市",
                        "parent_id": "150900",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "152200",
                "area_name": "兴安盟",
                "parent_id": "150000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "152201",
                        "area_name": "乌兰浩特市",
                        "parent_id": "152200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "152202",
                        "area_name": "阿尔山市",
                        "parent_id": "152200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "152221",
                        "area_name": "科尔沁右翼前旗",
                        "parent_id": "152200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "152222",
                        "area_name": "科尔沁右翼中旗",
                        "parent_id": "152200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "152223",
                        "area_name": "扎赉特旗",
                        "parent_id": "152200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "152224",
                        "area_name": "突泉县",
                        "parent_id": "152200",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "152500",
                "area_name": "锡林郭勒盟",
                "parent_id": "150000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "152501",
                        "area_name": "二连浩特市",
                        "parent_id": "152500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "152502",
                        "area_name": "锡林浩特市",
                        "parent_id": "152500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "152522",
                        "area_name": "阿巴嘎旗",
                        "parent_id": "152500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "152523",
                        "area_name": "苏尼特左旗",
                        "parent_id": "152500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "152524",
                        "area_name": "苏尼特右旗",
                        "parent_id": "152500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "152525",
                        "area_name": "东乌珠穆沁旗",
                        "parent_id": "152500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "152526",
                        "area_name": "西乌珠穆沁旗",
                        "parent_id": "152500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "152527",
                        "area_name": "太仆寺旗",
                        "parent_id": "152500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "152528",
                        "area_name": "镶黄旗",
                        "parent_id": "152500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "152529",
                        "area_name": "正镶白旗",
                        "parent_id": "152500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "152530",
                        "area_name": "正蓝旗",
                        "parent_id": "152500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "152531",
                        "area_name": "多伦县",
                        "parent_id": "152500",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "152900",
                "area_name": "阿拉善盟",
                "parent_id": "150000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "152921",
                        "area_name": "阿拉善左旗",
                        "parent_id": "152900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "152922",
                        "area_name": "阿拉善右旗",
                        "parent_id": "152900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "152923",
                        "area_name": "额济纳旗",
                        "parent_id": "152900",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            }
        ]
    },
    {
        "area_id": "210000",
        "area_name": "辽宁省",
        "parent_id": "0",
        "level": "1",
        "sub_area": [
            {
                "area_id": "210100",
                "area_name": "沈阳市",
                "parent_id": "210000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "210101",
                        "area_name": "市辖区",
                        "parent_id": "210100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210102",
                        "area_name": "和平区",
                        "parent_id": "210100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210103",
                        "area_name": "沈河区",
                        "parent_id": "210100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210104",
                        "area_name": "大东区",
                        "parent_id": "210100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210105",
                        "area_name": "皇姑区",
                        "parent_id": "210100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210106",
                        "area_name": "铁西区",
                        "parent_id": "210100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210111",
                        "area_name": "苏家屯区",
                        "parent_id": "210100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210112",
                        "area_name": "浑南区",
                        "parent_id": "210100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210113",
                        "area_name": "沈北新区",
                        "parent_id": "210100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210114",
                        "area_name": "于洪区",
                        "parent_id": "210100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210115",
                        "area_name": "辽中区",
                        "parent_id": "210100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210123",
                        "area_name": "康平县",
                        "parent_id": "210100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210124",
                        "area_name": "法库县",
                        "parent_id": "210100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210181",
                        "area_name": "新民市",
                        "parent_id": "210100",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "210200",
                "area_name": "大连市",
                "parent_id": "210000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "210201",
                        "area_name": "市辖区",
                        "parent_id": "210200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210202",
                        "area_name": "中山区",
                        "parent_id": "210200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210203",
                        "area_name": "西岗区",
                        "parent_id": "210200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210204",
                        "area_name": "沙河口区",
                        "parent_id": "210200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210211",
                        "area_name": "甘井子区",
                        "parent_id": "210200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210212",
                        "area_name": "旅顺口区",
                        "parent_id": "210200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210213",
                        "area_name": "金州区",
                        "parent_id": "210200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210214",
                        "area_name": "普兰店区",
                        "parent_id": "210200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210224",
                        "area_name": "长海县",
                        "parent_id": "210200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210281",
                        "area_name": "瓦房店市",
                        "parent_id": "210200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210283",
                        "area_name": "庄河市",
                        "parent_id": "210200",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "210300",
                "area_name": "鞍山市",
                "parent_id": "210000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "210301",
                        "area_name": "市辖区",
                        "parent_id": "210300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210302",
                        "area_name": "铁东区",
                        "parent_id": "210300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210303",
                        "area_name": "铁西区",
                        "parent_id": "210300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210304",
                        "area_name": "立山区",
                        "parent_id": "210300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210311",
                        "area_name": "千山区",
                        "parent_id": "210300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210321",
                        "area_name": "台安县",
                        "parent_id": "210300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210323",
                        "area_name": "岫岩满族自治县",
                        "parent_id": "210300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210381",
                        "area_name": "海城市",
                        "parent_id": "210300",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "210400",
                "area_name": "抚顺市",
                "parent_id": "210000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "210401",
                        "area_name": "市辖区",
                        "parent_id": "210400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210402",
                        "area_name": "新抚区",
                        "parent_id": "210400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210403",
                        "area_name": "东洲区",
                        "parent_id": "210400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210404",
                        "area_name": "望花区",
                        "parent_id": "210400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210411",
                        "area_name": "顺城区",
                        "parent_id": "210400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210421",
                        "area_name": "抚顺县",
                        "parent_id": "210400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210422",
                        "area_name": "新宾满族自治县",
                        "parent_id": "210400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210423",
                        "area_name": "清原满族自治县",
                        "parent_id": "210400",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "210500",
                "area_name": "本溪市",
                "parent_id": "210000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "210501",
                        "area_name": "市辖区",
                        "parent_id": "210500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210502",
                        "area_name": "平山区",
                        "parent_id": "210500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210503",
                        "area_name": "溪湖区",
                        "parent_id": "210500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210504",
                        "area_name": "明山区",
                        "parent_id": "210500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210505",
                        "area_name": "南芬区",
                        "parent_id": "210500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210521",
                        "area_name": "本溪满族自治县",
                        "parent_id": "210500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210522",
                        "area_name": "桓仁满族自治县",
                        "parent_id": "210500",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "210600",
                "area_name": "丹东市",
                "parent_id": "210000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "210601",
                        "area_name": "市辖区",
                        "parent_id": "210600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210602",
                        "area_name": "元宝区",
                        "parent_id": "210600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210603",
                        "area_name": "振兴区",
                        "parent_id": "210600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210604",
                        "area_name": "振安区",
                        "parent_id": "210600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210624",
                        "area_name": "宽甸满族自治县",
                        "parent_id": "210600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210681",
                        "area_name": "东港市",
                        "parent_id": "210600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210682",
                        "area_name": "凤城市",
                        "parent_id": "210600",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "210700",
                "area_name": "锦州市",
                "parent_id": "210000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "210701",
                        "area_name": "市辖区",
                        "parent_id": "210700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210702",
                        "area_name": "古塔区",
                        "parent_id": "210700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210703",
                        "area_name": "凌河区",
                        "parent_id": "210700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210711",
                        "area_name": "太和区",
                        "parent_id": "210700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210726",
                        "area_name": "黑山县",
                        "parent_id": "210700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210727",
                        "area_name": "义县",
                        "parent_id": "210700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210781",
                        "area_name": "凌海市",
                        "parent_id": "210700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210782",
                        "area_name": "北镇市",
                        "parent_id": "210700",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "210800",
                "area_name": "营口市",
                "parent_id": "210000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "210801",
                        "area_name": "市辖区",
                        "parent_id": "210800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210802",
                        "area_name": "站前区",
                        "parent_id": "210800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210803",
                        "area_name": "西市区",
                        "parent_id": "210800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210804",
                        "area_name": "鲅鱼圈区",
                        "parent_id": "210800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210811",
                        "area_name": "老边区",
                        "parent_id": "210800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210881",
                        "area_name": "盖州市",
                        "parent_id": "210800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210882",
                        "area_name": "大石桥市",
                        "parent_id": "210800",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "210900",
                "area_name": "阜新市",
                "parent_id": "210000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "210901",
                        "area_name": "市辖区",
                        "parent_id": "210900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210902",
                        "area_name": "海州区",
                        "parent_id": "210900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210903",
                        "area_name": "新邱区",
                        "parent_id": "210900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210904",
                        "area_name": "太平区",
                        "parent_id": "210900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210905",
                        "area_name": "清河门区",
                        "parent_id": "210900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210911",
                        "area_name": "细河区",
                        "parent_id": "210900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210921",
                        "area_name": "阜新蒙古族自治县",
                        "parent_id": "210900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "210922",
                        "area_name": "彰武县",
                        "parent_id": "210900",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "211000",
                "area_name": "辽阳市",
                "parent_id": "210000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "211001",
                        "area_name": "市辖区",
                        "parent_id": "211000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "211002",
                        "area_name": "白塔区",
                        "parent_id": "211000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "211003",
                        "area_name": "文圣区",
                        "parent_id": "211000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "211004",
                        "area_name": "宏伟区",
                        "parent_id": "211000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "211005",
                        "area_name": "弓长岭区",
                        "parent_id": "211000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "211011",
                        "area_name": "太子河区",
                        "parent_id": "211000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "211021",
                        "area_name": "辽阳县",
                        "parent_id": "211000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "211081",
                        "area_name": "灯塔市",
                        "parent_id": "211000",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "211100",
                "area_name": "盘锦市",
                "parent_id": "210000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "211101",
                        "area_name": "市辖区",
                        "parent_id": "211100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "211102",
                        "area_name": "双台子区",
                        "parent_id": "211100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "211103",
                        "area_name": "兴隆台区",
                        "parent_id": "211100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "211104",
                        "area_name": "大洼区",
                        "parent_id": "211100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "211122",
                        "area_name": "盘山县",
                        "parent_id": "211100",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "211200",
                "area_name": "铁岭市",
                "parent_id": "210000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "211201",
                        "area_name": "市辖区",
                        "parent_id": "211200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "211202",
                        "area_name": "银州区",
                        "parent_id": "211200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "211204",
                        "area_name": "清河区",
                        "parent_id": "211200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "211221",
                        "area_name": "铁岭县",
                        "parent_id": "211200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "211223",
                        "area_name": "西丰县",
                        "parent_id": "211200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "211224",
                        "area_name": "昌图县",
                        "parent_id": "211200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "211281",
                        "area_name": "调兵山市",
                        "parent_id": "211200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "211282",
                        "area_name": "开原市",
                        "parent_id": "211200",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "211300",
                "area_name": "朝阳市",
                "parent_id": "210000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "211301",
                        "area_name": "市辖区",
                        "parent_id": "211300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "211302",
                        "area_name": "双塔区",
                        "parent_id": "211300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "211303",
                        "area_name": "龙城区",
                        "parent_id": "211300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "211321",
                        "area_name": "朝阳县",
                        "parent_id": "211300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "211322",
                        "area_name": "建平县",
                        "parent_id": "211300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "211324",
                        "area_name": "喀喇沁左翼蒙古族自治县",
                        "parent_id": "211300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "211381",
                        "area_name": "北票市",
                        "parent_id": "211300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "211382",
                        "area_name": "凌源市",
                        "parent_id": "211300",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "211400",
                "area_name": "葫芦岛市",
                "parent_id": "210000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "211401",
                        "area_name": "市辖区",
                        "parent_id": "211400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "211402",
                        "area_name": "连山区",
                        "parent_id": "211400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "211403",
                        "area_name": "龙港区",
                        "parent_id": "211400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "211404",
                        "area_name": "南票区",
                        "parent_id": "211400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "211421",
                        "area_name": "绥中县",
                        "parent_id": "211400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "211422",
                        "area_name": "建昌县",
                        "parent_id": "211400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "211481",
                        "area_name": "兴城市",
                        "parent_id": "211400",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            }
        ]
    },
    {
        "area_id": "220000",
        "area_name": "吉林省",
        "parent_id": "0",
        "level": "1",
        "sub_area": [
            {
                "area_id": "220100",
                "area_name": "长春市",
                "parent_id": "220000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "220101",
                        "area_name": "市辖区",
                        "parent_id": "220100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220102",
                        "area_name": "南关区",
                        "parent_id": "220100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220103",
                        "area_name": "宽城区",
                        "parent_id": "220100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220104",
                        "area_name": "朝阳区",
                        "parent_id": "220100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220105",
                        "area_name": "二道区",
                        "parent_id": "220100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220106",
                        "area_name": "绿园区",
                        "parent_id": "220100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220112",
                        "area_name": "双阳区",
                        "parent_id": "220100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220113",
                        "area_name": "九台区",
                        "parent_id": "220100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220122",
                        "area_name": "农安县",
                        "parent_id": "220100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220182",
                        "area_name": "榆树市",
                        "parent_id": "220100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220183",
                        "area_name": "德惠市",
                        "parent_id": "220100",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "220200",
                "area_name": "吉林市",
                "parent_id": "220000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "220201",
                        "area_name": "市辖区",
                        "parent_id": "220200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220202",
                        "area_name": "昌邑区",
                        "parent_id": "220200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220203",
                        "area_name": "龙潭区",
                        "parent_id": "220200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220204",
                        "area_name": "船营区",
                        "parent_id": "220200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220211",
                        "area_name": "丰满区",
                        "parent_id": "220200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220221",
                        "area_name": "永吉县",
                        "parent_id": "220200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220281",
                        "area_name": "蛟河市",
                        "parent_id": "220200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220282",
                        "area_name": "桦甸市",
                        "parent_id": "220200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220283",
                        "area_name": "舒兰市",
                        "parent_id": "220200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220284",
                        "area_name": "磐石市",
                        "parent_id": "220200",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "220300",
                "area_name": "四平市",
                "parent_id": "220000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "220301",
                        "area_name": "市辖区",
                        "parent_id": "220300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220302",
                        "area_name": "铁西区",
                        "parent_id": "220300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220303",
                        "area_name": "铁东区",
                        "parent_id": "220300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220322",
                        "area_name": "梨树县",
                        "parent_id": "220300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220323",
                        "area_name": "伊通满族自治县",
                        "parent_id": "220300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220381",
                        "area_name": "公主岭市",
                        "parent_id": "220300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220382",
                        "area_name": "双辽市",
                        "parent_id": "220300",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "220400",
                "area_name": "辽源市",
                "parent_id": "220000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "220401",
                        "area_name": "市辖区",
                        "parent_id": "220400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220402",
                        "area_name": "龙山区",
                        "parent_id": "220400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220403",
                        "area_name": "西安区",
                        "parent_id": "220400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220421",
                        "area_name": "东丰县",
                        "parent_id": "220400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220422",
                        "area_name": "东辽县",
                        "parent_id": "220400",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "220500",
                "area_name": "通化市",
                "parent_id": "220000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "220501",
                        "area_name": "市辖区",
                        "parent_id": "220500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220502",
                        "area_name": "东昌区",
                        "parent_id": "220500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220503",
                        "area_name": "二道江区",
                        "parent_id": "220500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220521",
                        "area_name": "通化县",
                        "parent_id": "220500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220523",
                        "area_name": "辉南县",
                        "parent_id": "220500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220524",
                        "area_name": "柳河县",
                        "parent_id": "220500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220581",
                        "area_name": "梅河口市",
                        "parent_id": "220500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220582",
                        "area_name": "集安市",
                        "parent_id": "220500",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "220600",
                "area_name": "白山市",
                "parent_id": "220000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "220601",
                        "area_name": "市辖区",
                        "parent_id": "220600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220602",
                        "area_name": "浑江区",
                        "parent_id": "220600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220605",
                        "area_name": "江源区",
                        "parent_id": "220600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220621",
                        "area_name": "抚松县",
                        "parent_id": "220600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220622",
                        "area_name": "靖宇县",
                        "parent_id": "220600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220623",
                        "area_name": "长白朝鲜族自治县",
                        "parent_id": "220600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220681",
                        "area_name": "临江市",
                        "parent_id": "220600",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "220700",
                "area_name": "松原市",
                "parent_id": "220000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "220701",
                        "area_name": "市辖区",
                        "parent_id": "220700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220702",
                        "area_name": "宁江区",
                        "parent_id": "220700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220721",
                        "area_name": "前郭尔罗斯蒙古族自治县",
                        "parent_id": "220700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220722",
                        "area_name": "长岭县",
                        "parent_id": "220700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220723",
                        "area_name": "乾安县",
                        "parent_id": "220700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220781",
                        "area_name": "扶余市",
                        "parent_id": "220700",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "220800",
                "area_name": "白城市",
                "parent_id": "220000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "220801",
                        "area_name": "市辖区",
                        "parent_id": "220800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220802",
                        "area_name": "洮北区",
                        "parent_id": "220800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220821",
                        "area_name": "镇赉县",
                        "parent_id": "220800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220822",
                        "area_name": "通榆县",
                        "parent_id": "220800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220881",
                        "area_name": "洮南市",
                        "parent_id": "220800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "220882",
                        "area_name": "大安市",
                        "parent_id": "220800",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "222400",
                "area_name": "延边朝鲜族自治州",
                "parent_id": "220000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "222401",
                        "area_name": "延吉市",
                        "parent_id": "222400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "222402",
                        "area_name": "图们市",
                        "parent_id": "222400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "222403",
                        "area_name": "敦化市",
                        "parent_id": "222400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "222404",
                        "area_name": "珲春市",
                        "parent_id": "222400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "222405",
                        "area_name": "龙井市",
                        "parent_id": "222400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "222406",
                        "area_name": "和龙市",
                        "parent_id": "222400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "222424",
                        "area_name": "汪清县",
                        "parent_id": "222400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "222426",
                        "area_name": "安图县",
                        "parent_id": "222400",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            }
        ]
    },
    {
        "area_id": "230000",
        "area_name": "黑龙江省",
        "parent_id": "0",
        "level": "1",
        "sub_area": [
            {
                "area_id": "230100",
                "area_name": "哈尔滨市",
                "parent_id": "230000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "230101",
                        "area_name": "市辖区",
                        "parent_id": "230100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230102",
                        "area_name": "道里区",
                        "parent_id": "230100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230103",
                        "area_name": "南岗区",
                        "parent_id": "230100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230104",
                        "area_name": "道外区",
                        "parent_id": "230100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230108",
                        "area_name": "平房区",
                        "parent_id": "230100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230109",
                        "area_name": "松北区",
                        "parent_id": "230100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230110",
                        "area_name": "香坊区",
                        "parent_id": "230100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230111",
                        "area_name": "呼兰区",
                        "parent_id": "230100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230112",
                        "area_name": "阿城区",
                        "parent_id": "230100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230113",
                        "area_name": "双城区",
                        "parent_id": "230100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230123",
                        "area_name": "依兰县",
                        "parent_id": "230100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230124",
                        "area_name": "方正县",
                        "parent_id": "230100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230125",
                        "area_name": "宾县",
                        "parent_id": "230100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230126",
                        "area_name": "巴彦县",
                        "parent_id": "230100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230127",
                        "area_name": "木兰县",
                        "parent_id": "230100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230128",
                        "area_name": "通河县",
                        "parent_id": "230100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230129",
                        "area_name": "延寿县",
                        "parent_id": "230100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230183",
                        "area_name": "尚志市",
                        "parent_id": "230100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230184",
                        "area_name": "五常市",
                        "parent_id": "230100",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "230200",
                "area_name": "齐齐哈尔市",
                "parent_id": "230000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "230201",
                        "area_name": "市辖区",
                        "parent_id": "230200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230202",
                        "area_name": "龙沙区",
                        "parent_id": "230200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230203",
                        "area_name": "建华区",
                        "parent_id": "230200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230204",
                        "area_name": "铁锋区",
                        "parent_id": "230200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230205",
                        "area_name": "昂昂溪区",
                        "parent_id": "230200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230206",
                        "area_name": "富拉尔基区",
                        "parent_id": "230200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230207",
                        "area_name": "碾子山区",
                        "parent_id": "230200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230208",
                        "area_name": "梅里斯达斡尔族区",
                        "parent_id": "230200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230221",
                        "area_name": "龙江县",
                        "parent_id": "230200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230223",
                        "area_name": "依安县",
                        "parent_id": "230200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230224",
                        "area_name": "泰来县",
                        "parent_id": "230200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230225",
                        "area_name": "甘南县",
                        "parent_id": "230200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230227",
                        "area_name": "富裕县",
                        "parent_id": "230200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230229",
                        "area_name": "克山县",
                        "parent_id": "230200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230230",
                        "area_name": "克东县",
                        "parent_id": "230200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230231",
                        "area_name": "拜泉县",
                        "parent_id": "230200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230281",
                        "area_name": "讷河市",
                        "parent_id": "230200",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "230300",
                "area_name": "鸡西市",
                "parent_id": "230000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "230301",
                        "area_name": "市辖区",
                        "parent_id": "230300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230302",
                        "area_name": "鸡冠区",
                        "parent_id": "230300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230303",
                        "area_name": "恒山区",
                        "parent_id": "230300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230304",
                        "area_name": "滴道区",
                        "parent_id": "230300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230305",
                        "area_name": "梨树区",
                        "parent_id": "230300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230306",
                        "area_name": "城子河区",
                        "parent_id": "230300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230307",
                        "area_name": "麻山区",
                        "parent_id": "230300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230321",
                        "area_name": "鸡东县",
                        "parent_id": "230300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230381",
                        "area_name": "虎林市",
                        "parent_id": "230300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230382",
                        "area_name": "密山市",
                        "parent_id": "230300",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "230400",
                "area_name": "鹤岗市",
                "parent_id": "230000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "230401",
                        "area_name": "市辖区",
                        "parent_id": "230400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230402",
                        "area_name": "向阳区",
                        "parent_id": "230400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230403",
                        "area_name": "工农区",
                        "parent_id": "230400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230404",
                        "area_name": "南山区",
                        "parent_id": "230400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230405",
                        "area_name": "兴安区",
                        "parent_id": "230400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230406",
                        "area_name": "东山区",
                        "parent_id": "230400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230407",
                        "area_name": "兴山区",
                        "parent_id": "230400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230421",
                        "area_name": "萝北县",
                        "parent_id": "230400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230422",
                        "area_name": "绥滨县",
                        "parent_id": "230400",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "230500",
                "area_name": "双鸭山市",
                "parent_id": "230000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "230501",
                        "area_name": "市辖区",
                        "parent_id": "230500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230502",
                        "area_name": "尖山区",
                        "parent_id": "230500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230503",
                        "area_name": "岭东区",
                        "parent_id": "230500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230505",
                        "area_name": "四方台区",
                        "parent_id": "230500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230506",
                        "area_name": "宝山区",
                        "parent_id": "230500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230521",
                        "area_name": "集贤县",
                        "parent_id": "230500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230522",
                        "area_name": "友谊县",
                        "parent_id": "230500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230523",
                        "area_name": "宝清县",
                        "parent_id": "230500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230524",
                        "area_name": "饶河县",
                        "parent_id": "230500",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "230600",
                "area_name": "大庆市",
                "parent_id": "230000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "230601",
                        "area_name": "市辖区",
                        "parent_id": "230600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230602",
                        "area_name": "萨尔图区",
                        "parent_id": "230600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230603",
                        "area_name": "龙凤区",
                        "parent_id": "230600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230604",
                        "area_name": "让胡路区",
                        "parent_id": "230600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230605",
                        "area_name": "红岗区",
                        "parent_id": "230600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230606",
                        "area_name": "大同区",
                        "parent_id": "230600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230621",
                        "area_name": "肇州县",
                        "parent_id": "230600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230622",
                        "area_name": "肇源县",
                        "parent_id": "230600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230623",
                        "area_name": "林甸县",
                        "parent_id": "230600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230624",
                        "area_name": "杜尔伯特蒙古族自治县",
                        "parent_id": "230600",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "230700",
                "area_name": "伊春市",
                "parent_id": "230000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "230701",
                        "area_name": "市辖区",
                        "parent_id": "230700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230702",
                        "area_name": "伊春区",
                        "parent_id": "230700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230703",
                        "area_name": "南岔区",
                        "parent_id": "230700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230704",
                        "area_name": "友好区",
                        "parent_id": "230700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230705",
                        "area_name": "西林区",
                        "parent_id": "230700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230706",
                        "area_name": "翠峦区",
                        "parent_id": "230700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230707",
                        "area_name": "新青区",
                        "parent_id": "230700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230708",
                        "area_name": "美溪区",
                        "parent_id": "230700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230709",
                        "area_name": "金山屯区",
                        "parent_id": "230700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230710",
                        "area_name": "五营区",
                        "parent_id": "230700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230711",
                        "area_name": "乌马河区",
                        "parent_id": "230700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230712",
                        "area_name": "汤旺河区",
                        "parent_id": "230700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230713",
                        "area_name": "带岭区",
                        "parent_id": "230700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230714",
                        "area_name": "乌伊岭区",
                        "parent_id": "230700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230715",
                        "area_name": "红星区",
                        "parent_id": "230700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230716",
                        "area_name": "上甘岭区",
                        "parent_id": "230700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230722",
                        "area_name": "嘉荫县",
                        "parent_id": "230700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230781",
                        "area_name": "铁力市",
                        "parent_id": "230700",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "230800",
                "area_name": "佳木斯市",
                "parent_id": "230000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "230801",
                        "area_name": "市辖区",
                        "parent_id": "230800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230803",
                        "area_name": "向阳区",
                        "parent_id": "230800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230804",
                        "area_name": "前进区",
                        "parent_id": "230800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230805",
                        "area_name": "东风区",
                        "parent_id": "230800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230811",
                        "area_name": "郊区",
                        "parent_id": "230800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230822",
                        "area_name": "桦南县",
                        "parent_id": "230800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230826",
                        "area_name": "桦川县",
                        "parent_id": "230800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230828",
                        "area_name": "汤原县",
                        "parent_id": "230800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230881",
                        "area_name": "同江市",
                        "parent_id": "230800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230882",
                        "area_name": "富锦市",
                        "parent_id": "230800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230883",
                        "area_name": "抚远市",
                        "parent_id": "230800",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "230900",
                "area_name": "七台河市",
                "parent_id": "230000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "230901",
                        "area_name": "市辖区",
                        "parent_id": "230900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230902",
                        "area_name": "新兴区",
                        "parent_id": "230900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230903",
                        "area_name": "桃山区",
                        "parent_id": "230900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230904",
                        "area_name": "茄子河区",
                        "parent_id": "230900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "230921",
                        "area_name": "勃利县",
                        "parent_id": "230900",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "231000",
                "area_name": "牡丹江市",
                "parent_id": "230000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "231001",
                        "area_name": "市辖区",
                        "parent_id": "231000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "231002",
                        "area_name": "东安区",
                        "parent_id": "231000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "231003",
                        "area_name": "阳明区",
                        "parent_id": "231000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "231004",
                        "area_name": "爱民区",
                        "parent_id": "231000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "231005",
                        "area_name": "西安区",
                        "parent_id": "231000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "231025",
                        "area_name": "林口县",
                        "parent_id": "231000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "231081",
                        "area_name": "绥芬河市",
                        "parent_id": "231000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "231083",
                        "area_name": "海林市",
                        "parent_id": "231000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "231084",
                        "area_name": "宁安市",
                        "parent_id": "231000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "231085",
                        "area_name": "穆棱市",
                        "parent_id": "231000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "231086",
                        "area_name": "东宁市",
                        "parent_id": "231000",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "231100",
                "area_name": "黑河市",
                "parent_id": "230000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "231101",
                        "area_name": "市辖区",
                        "parent_id": "231100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "231102",
                        "area_name": "爱辉区",
                        "parent_id": "231100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "231121",
                        "area_name": "嫩江县",
                        "parent_id": "231100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "231123",
                        "area_name": "逊克县",
                        "parent_id": "231100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "231124",
                        "area_name": "孙吴县",
                        "parent_id": "231100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "231181",
                        "area_name": "北安市",
                        "parent_id": "231100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "231182",
                        "area_name": "五大连池市",
                        "parent_id": "231100",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "231200",
                "area_name": "绥化市",
                "parent_id": "230000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "231201",
                        "area_name": "市辖区",
                        "parent_id": "231200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "231202",
                        "area_name": "北林区",
                        "parent_id": "231200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "231221",
                        "area_name": "望奎县",
                        "parent_id": "231200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "231222",
                        "area_name": "兰西县",
                        "parent_id": "231200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "231223",
                        "area_name": "青冈县",
                        "parent_id": "231200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "231224",
                        "area_name": "庆安县",
                        "parent_id": "231200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "231225",
                        "area_name": "明水县",
                        "parent_id": "231200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "231226",
                        "area_name": "绥棱县",
                        "parent_id": "231200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "231281",
                        "area_name": "安达市",
                        "parent_id": "231200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "231282",
                        "area_name": "肇东市",
                        "parent_id": "231200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "231283",
                        "area_name": "海伦市",
                        "parent_id": "231200",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "232700",
                "area_name": "大兴安岭地区",
                "parent_id": "230000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "232721",
                        "area_name": "呼玛县",
                        "parent_id": "232700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "232722",
                        "area_name": "塔河县",
                        "parent_id": "232700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "232723",
                        "area_name": "漠河县",
                        "parent_id": "232700",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            }
        ]
    },
    {
        "area_id": "310000",
        "area_name": "上海市",
        "parent_id": "0",
        "level": "1",
        "sub_area": [
            {
                "area_id": "310100",
                "area_name": "市辖区",
                "parent_id": "310000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "310101",
                        "area_name": "黄浦区",
                        "parent_id": "310100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "310104",
                        "area_name": "徐汇区",
                        "parent_id": "310100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "310105",
                        "area_name": "长宁区",
                        "parent_id": "310100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "310106",
                        "area_name": "静安区",
                        "parent_id": "310100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "310107",
                        "area_name": "普陀区",
                        "parent_id": "310100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "310109",
                        "area_name": "虹口区",
                        "parent_id": "310100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "310110",
                        "area_name": "杨浦区",
                        "parent_id": "310100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "310112",
                        "area_name": "闵行区",
                        "parent_id": "310100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "310113",
                        "area_name": "宝山区",
                        "parent_id": "310100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "310114",
                        "area_name": "嘉定区",
                        "parent_id": "310100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "310115",
                        "area_name": "浦东新区",
                        "parent_id": "310100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "310116",
                        "area_name": "金山区",
                        "parent_id": "310100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "310117",
                        "area_name": "松江区",
                        "parent_id": "310100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "310118",
                        "area_name": "青浦区",
                        "parent_id": "310100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "310120",
                        "area_name": "奉贤区",
                        "parent_id": "310100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "310151",
                        "area_name": "崇明区",
                        "parent_id": "310100",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            }
        ]
    },
    {
        "area_id": "320000",
        "area_name": "江苏省",
        "parent_id": "0",
        "level": "1",
        "sub_area": [
            {
                "area_id": "320100",
                "area_name": "南京市",
                "parent_id": "320000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "320101",
                        "area_name": "市辖区",
                        "parent_id": "320100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320102",
                        "area_name": "玄武区",
                        "parent_id": "320100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320104",
                        "area_name": "秦淮区",
                        "parent_id": "320100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320105",
                        "area_name": "建邺区",
                        "parent_id": "320100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320106",
                        "area_name": "鼓楼区",
                        "parent_id": "320100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320111",
                        "area_name": "浦口区",
                        "parent_id": "320100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320113",
                        "area_name": "栖霞区",
                        "parent_id": "320100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320114",
                        "area_name": "雨花台区",
                        "parent_id": "320100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320115",
                        "area_name": "江宁区",
                        "parent_id": "320100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320116",
                        "area_name": "六合区",
                        "parent_id": "320100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320117",
                        "area_name": "溧水区",
                        "parent_id": "320100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320118",
                        "area_name": "高淳区",
                        "parent_id": "320100",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "320200",
                "area_name": "无锡市",
                "parent_id": "320000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "320201",
                        "area_name": "市辖区",
                        "parent_id": "320200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320205",
                        "area_name": "锡山区",
                        "parent_id": "320200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320206",
                        "area_name": "惠山区",
                        "parent_id": "320200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320211",
                        "area_name": "滨湖区",
                        "parent_id": "320200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320213",
                        "area_name": "梁溪区",
                        "parent_id": "320200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320214",
                        "area_name": "新吴区",
                        "parent_id": "320200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320281",
                        "area_name": "江阴市",
                        "parent_id": "320200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320282",
                        "area_name": "宜兴市",
                        "parent_id": "320200",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "320300",
                "area_name": "徐州市",
                "parent_id": "320000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "320301",
                        "area_name": "市辖区",
                        "parent_id": "320300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320302",
                        "area_name": "鼓楼区",
                        "parent_id": "320300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320303",
                        "area_name": "云龙区",
                        "parent_id": "320300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320305",
                        "area_name": "贾汪区",
                        "parent_id": "320300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320311",
                        "area_name": "泉山区",
                        "parent_id": "320300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320312",
                        "area_name": "铜山区",
                        "parent_id": "320300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320321",
                        "area_name": "丰县",
                        "parent_id": "320300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320322",
                        "area_name": "沛县",
                        "parent_id": "320300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320324",
                        "area_name": "睢宁县",
                        "parent_id": "320300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320381",
                        "area_name": "新沂市",
                        "parent_id": "320300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320382",
                        "area_name": "邳州市",
                        "parent_id": "320300",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "320400",
                "area_name": "常州市",
                "parent_id": "320000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "320401",
                        "area_name": "市辖区",
                        "parent_id": "320400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320402",
                        "area_name": "天宁区",
                        "parent_id": "320400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320404",
                        "area_name": "钟楼区",
                        "parent_id": "320400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320411",
                        "area_name": "新北区",
                        "parent_id": "320400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320412",
                        "area_name": "武进区",
                        "parent_id": "320400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320413",
                        "area_name": "金坛区",
                        "parent_id": "320400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320481",
                        "area_name": "溧阳市",
                        "parent_id": "320400",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "320500",
                "area_name": "苏州市",
                "parent_id": "320000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "320501",
                        "area_name": "市辖区",
                        "parent_id": "320500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320505",
                        "area_name": "虎丘区",
                        "parent_id": "320500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320506",
                        "area_name": "吴中区",
                        "parent_id": "320500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320507",
                        "area_name": "相城区",
                        "parent_id": "320500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320508",
                        "area_name": "姑苏区",
                        "parent_id": "320500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320509",
                        "area_name": "吴江区",
                        "parent_id": "320500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320581",
                        "area_name": "常熟市",
                        "parent_id": "320500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320582",
                        "area_name": "张家港市",
                        "parent_id": "320500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320583",
                        "area_name": "昆山市",
                        "parent_id": "320500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320585",
                        "area_name": "太仓市",
                        "parent_id": "320500",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "320600",
                "area_name": "南通市",
                "parent_id": "320000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "320601",
                        "area_name": "市辖区",
                        "parent_id": "320600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320602",
                        "area_name": "崇川区",
                        "parent_id": "320600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320611",
                        "area_name": "港闸区",
                        "parent_id": "320600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320612",
                        "area_name": "通州区",
                        "parent_id": "320600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320621",
                        "area_name": "海安县",
                        "parent_id": "320600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320623",
                        "area_name": "如东县",
                        "parent_id": "320600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320681",
                        "area_name": "启东市",
                        "parent_id": "320600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320682",
                        "area_name": "如皋市",
                        "parent_id": "320600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320684",
                        "area_name": "海门市",
                        "parent_id": "320600",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "320700",
                "area_name": "连云港市",
                "parent_id": "320000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "320701",
                        "area_name": "市辖区",
                        "parent_id": "320700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320703",
                        "area_name": "连云区",
                        "parent_id": "320700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320706",
                        "area_name": "海州区",
                        "parent_id": "320700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320707",
                        "area_name": "赣榆区",
                        "parent_id": "320700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320722",
                        "area_name": "东海县",
                        "parent_id": "320700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320723",
                        "area_name": "灌云县",
                        "parent_id": "320700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320724",
                        "area_name": "灌南县",
                        "parent_id": "320700",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "320800",
                "area_name": "淮安市",
                "parent_id": "320000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "320801",
                        "area_name": "市辖区",
                        "parent_id": "320800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320803",
                        "area_name": "淮安区",
                        "parent_id": "320800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320804",
                        "area_name": "淮阴区",
                        "parent_id": "320800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320812",
                        "area_name": "清江浦区",
                        "parent_id": "320800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320813",
                        "area_name": "洪泽区",
                        "parent_id": "320800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320826",
                        "area_name": "涟水县",
                        "parent_id": "320800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320830",
                        "area_name": "盱眙县",
                        "parent_id": "320800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320831",
                        "area_name": "金湖县",
                        "parent_id": "320800",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "320900",
                "area_name": "盐城市",
                "parent_id": "320000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "320901",
                        "area_name": "市辖区",
                        "parent_id": "320900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320902",
                        "area_name": "亭湖区",
                        "parent_id": "320900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320903",
                        "area_name": "盐都区",
                        "parent_id": "320900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320904",
                        "area_name": "大丰区",
                        "parent_id": "320900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320921",
                        "area_name": "响水县",
                        "parent_id": "320900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320922",
                        "area_name": "滨海县",
                        "parent_id": "320900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320923",
                        "area_name": "阜宁县",
                        "parent_id": "320900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320924",
                        "area_name": "射阳县",
                        "parent_id": "320900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320925",
                        "area_name": "建湖县",
                        "parent_id": "320900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "320981",
                        "area_name": "东台市",
                        "parent_id": "320900",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "321000",
                "area_name": "扬州市",
                "parent_id": "320000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "321001",
                        "area_name": "市辖区",
                        "parent_id": "321000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "321002",
                        "area_name": "广陵区",
                        "parent_id": "321000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "321003",
                        "area_name": "邗江区",
                        "parent_id": "321000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "321012",
                        "area_name": "江都区",
                        "parent_id": "321000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "321023",
                        "area_name": "宝应县",
                        "parent_id": "321000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "321081",
                        "area_name": "仪征市",
                        "parent_id": "321000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "321084",
                        "area_name": "高邮市",
                        "parent_id": "321000",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "321100",
                "area_name": "镇江市",
                "parent_id": "320000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "321101",
                        "area_name": "市辖区",
                        "parent_id": "321100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "321102",
                        "area_name": "京口区",
                        "parent_id": "321100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "321111",
                        "area_name": "润州区",
                        "parent_id": "321100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "321112",
                        "area_name": "丹徒区",
                        "parent_id": "321100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "321181",
                        "area_name": "丹阳市",
                        "parent_id": "321100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "321182",
                        "area_name": "扬中市",
                        "parent_id": "321100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "321183",
                        "area_name": "句容市",
                        "parent_id": "321100",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "321200",
                "area_name": "泰州市",
                "parent_id": "320000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "321201",
                        "area_name": "市辖区",
                        "parent_id": "321200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "321202",
                        "area_name": "海陵区",
                        "parent_id": "321200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "321203",
                        "area_name": "高港区",
                        "parent_id": "321200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "321204",
                        "area_name": "姜堰区",
                        "parent_id": "321200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "321281",
                        "area_name": "兴化市",
                        "parent_id": "321200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "321282",
                        "area_name": "靖江市",
                        "parent_id": "321200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "321283",
                        "area_name": "泰兴市",
                        "parent_id": "321200",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "321300",
                "area_name": "宿迁市",
                "parent_id": "320000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "321301",
                        "area_name": "市辖区",
                        "parent_id": "321300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "321302",
                        "area_name": "宿城区",
                        "parent_id": "321300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "321311",
                        "area_name": "宿豫区",
                        "parent_id": "321300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "321322",
                        "area_name": "沭阳县",
                        "parent_id": "321300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "321323",
                        "area_name": "泗阳县",
                        "parent_id": "321300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "321324",
                        "area_name": "泗洪县",
                        "parent_id": "321300",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            }
        ]
    },
    {
        "area_id": "330000",
        "area_name": "浙江省",
        "parent_id": "0",
        "level": "1",
        "sub_area": [
            {
                "area_id": "330100",
                "area_name": "杭州市",
                "parent_id": "330000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "330101",
                        "area_name": "市辖区",
                        "parent_id": "330100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330102",
                        "area_name": "上城区",
                        "parent_id": "330100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330103",
                        "area_name": "下城区",
                        "parent_id": "330100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330104",
                        "area_name": "江干区",
                        "parent_id": "330100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330105",
                        "area_name": "拱墅区",
                        "parent_id": "330100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330106",
                        "area_name": "西湖区",
                        "parent_id": "330100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330108",
                        "area_name": "滨江区",
                        "parent_id": "330100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330109",
                        "area_name": "萧山区",
                        "parent_id": "330100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330110",
                        "area_name": "余杭区",
                        "parent_id": "330100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330111",
                        "area_name": "富阳区",
                        "parent_id": "330100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330122",
                        "area_name": "桐庐县",
                        "parent_id": "330100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330127",
                        "area_name": "淳安县",
                        "parent_id": "330100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330182",
                        "area_name": "建德市",
                        "parent_id": "330100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330185",
                        "area_name": "临安市",
                        "parent_id": "330100",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "330200",
                "area_name": "宁波市",
                "parent_id": "330000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "330201",
                        "area_name": "市辖区",
                        "parent_id": "330200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330203",
                        "area_name": "海曙区",
                        "parent_id": "330200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330204",
                        "area_name": "江东区",
                        "parent_id": "330200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330205",
                        "area_name": "江北区",
                        "parent_id": "330200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330206",
                        "area_name": "北仑区",
                        "parent_id": "330200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330211",
                        "area_name": "镇海区",
                        "parent_id": "330200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330212",
                        "area_name": "鄞州区",
                        "parent_id": "330200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330225",
                        "area_name": "象山县",
                        "parent_id": "330200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330226",
                        "area_name": "宁海县",
                        "parent_id": "330200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330281",
                        "area_name": "余姚市",
                        "parent_id": "330200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330282",
                        "area_name": "慈溪市",
                        "parent_id": "330200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330283",
                        "area_name": "奉化市",
                        "parent_id": "330200",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "330300",
                "area_name": "温州市",
                "parent_id": "330000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "330301",
                        "area_name": "市辖区",
                        "parent_id": "330300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330302",
                        "area_name": "鹿城区",
                        "parent_id": "330300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330303",
                        "area_name": "龙湾区",
                        "parent_id": "330300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330304",
                        "area_name": "瓯海区",
                        "parent_id": "330300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330305",
                        "area_name": "洞头区",
                        "parent_id": "330300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330324",
                        "area_name": "永嘉县",
                        "parent_id": "330300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330326",
                        "area_name": "平阳县",
                        "parent_id": "330300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330327",
                        "area_name": "苍南县",
                        "parent_id": "330300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330328",
                        "area_name": "文成县",
                        "parent_id": "330300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330329",
                        "area_name": "泰顺县",
                        "parent_id": "330300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330381",
                        "area_name": "瑞安市",
                        "parent_id": "330300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330382",
                        "area_name": "乐清市",
                        "parent_id": "330300",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "330400",
                "area_name": "嘉兴市",
                "parent_id": "330000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "330401",
                        "area_name": "市辖区",
                        "parent_id": "330400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330402",
                        "area_name": "南湖区",
                        "parent_id": "330400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330411",
                        "area_name": "秀洲区",
                        "parent_id": "330400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330421",
                        "area_name": "嘉善县",
                        "parent_id": "330400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330424",
                        "area_name": "海盐县",
                        "parent_id": "330400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330481",
                        "area_name": "海宁市",
                        "parent_id": "330400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330482",
                        "area_name": "平湖市",
                        "parent_id": "330400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330483",
                        "area_name": "桐乡市",
                        "parent_id": "330400",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "330500",
                "area_name": "湖州市",
                "parent_id": "330000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "330501",
                        "area_name": "市辖区",
                        "parent_id": "330500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330502",
                        "area_name": "吴兴区",
                        "parent_id": "330500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330503",
                        "area_name": "南浔区",
                        "parent_id": "330500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330521",
                        "area_name": "德清县",
                        "parent_id": "330500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330522",
                        "area_name": "长兴县",
                        "parent_id": "330500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330523",
                        "area_name": "安吉县",
                        "parent_id": "330500",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "330600",
                "area_name": "绍兴市",
                "parent_id": "330000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "330601",
                        "area_name": "市辖区",
                        "parent_id": "330600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330602",
                        "area_name": "越城区",
                        "parent_id": "330600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330603",
                        "area_name": "柯桥区",
                        "parent_id": "330600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330604",
                        "area_name": "上虞区",
                        "parent_id": "330600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330624",
                        "area_name": "新昌县",
                        "parent_id": "330600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330681",
                        "area_name": "诸暨市",
                        "parent_id": "330600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330683",
                        "area_name": "嵊州市",
                        "parent_id": "330600",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "330700",
                "area_name": "金华市",
                "parent_id": "330000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "330701",
                        "area_name": "市辖区",
                        "parent_id": "330700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330702",
                        "area_name": "婺城区",
                        "parent_id": "330700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330703",
                        "area_name": "金东区",
                        "parent_id": "330700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330723",
                        "area_name": "武义县",
                        "parent_id": "330700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330726",
                        "area_name": "浦江县",
                        "parent_id": "330700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330727",
                        "area_name": "磐安县",
                        "parent_id": "330700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330781",
                        "area_name": "兰溪市",
                        "parent_id": "330700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330782",
                        "area_name": "义乌市",
                        "parent_id": "330700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330783",
                        "area_name": "东阳市",
                        "parent_id": "330700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330784",
                        "area_name": "永康市",
                        "parent_id": "330700",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "330800",
                "area_name": "衢州市",
                "parent_id": "330000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "330801",
                        "area_name": "市辖区",
                        "parent_id": "330800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330802",
                        "area_name": "柯城区",
                        "parent_id": "330800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330803",
                        "area_name": "衢江区",
                        "parent_id": "330800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330822",
                        "area_name": "常山县",
                        "parent_id": "330800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330824",
                        "area_name": "开化县",
                        "parent_id": "330800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330825",
                        "area_name": "龙游县",
                        "parent_id": "330800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330881",
                        "area_name": "江山市",
                        "parent_id": "330800",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "330900",
                "area_name": "舟山市",
                "parent_id": "330000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "330901",
                        "area_name": "市辖区",
                        "parent_id": "330900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330902",
                        "area_name": "定海区",
                        "parent_id": "330900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330903",
                        "area_name": "普陀区",
                        "parent_id": "330900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330921",
                        "area_name": "岱山县",
                        "parent_id": "330900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "330922",
                        "area_name": "嵊泗县",
                        "parent_id": "330900",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "331000",
                "area_name": "台州市",
                "parent_id": "330000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "331001",
                        "area_name": "市辖区",
                        "parent_id": "331000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "331002",
                        "area_name": "椒江区",
                        "parent_id": "331000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "331003",
                        "area_name": "黄岩区",
                        "parent_id": "331000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "331004",
                        "area_name": "路桥区",
                        "parent_id": "331000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "331021",
                        "area_name": "玉环县",
                        "parent_id": "331000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "331022",
                        "area_name": "三门县",
                        "parent_id": "331000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "331023",
                        "area_name": "天台县",
                        "parent_id": "331000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "331024",
                        "area_name": "仙居县",
                        "parent_id": "331000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "331081",
                        "area_name": "温岭市",
                        "parent_id": "331000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "331082",
                        "area_name": "临海市",
                        "parent_id": "331000",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "331100",
                "area_name": "丽水市",
                "parent_id": "330000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "331101",
                        "area_name": "市辖区",
                        "parent_id": "331100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "331102",
                        "area_name": "莲都区",
                        "parent_id": "331100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "331121",
                        "area_name": "青田县",
                        "parent_id": "331100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "331122",
                        "area_name": "缙云县",
                        "parent_id": "331100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "331123",
                        "area_name": "遂昌县",
                        "parent_id": "331100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "331124",
                        "area_name": "松阳县",
                        "parent_id": "331100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "331125",
                        "area_name": "云和县",
                        "parent_id": "331100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "331126",
                        "area_name": "庆元县",
                        "parent_id": "331100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "331127",
                        "area_name": "景宁畲族自治县",
                        "parent_id": "331100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "331181",
                        "area_name": "龙泉市",
                        "parent_id": "331100",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            }
        ]
    },
    {
        "area_id": "340000",
        "area_name": "安徽省",
        "parent_id": "0",
        "level": "1",
        "sub_area": [
            {
                "area_id": "340100",
                "area_name": "合肥市",
                "parent_id": "340000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "340101",
                        "area_name": "市辖区",
                        "parent_id": "340100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340102",
                        "area_name": "瑶海区",
                        "parent_id": "340100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340103",
                        "area_name": "庐阳区",
                        "parent_id": "340100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340104",
                        "area_name": "蜀山区",
                        "parent_id": "340100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340111",
                        "area_name": "包河区",
                        "parent_id": "340100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340121",
                        "area_name": "长丰县",
                        "parent_id": "340100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340122",
                        "area_name": "肥东县",
                        "parent_id": "340100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340123",
                        "area_name": "肥西县",
                        "parent_id": "340100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340124",
                        "area_name": "庐江县",
                        "parent_id": "340100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340181",
                        "area_name": "巢湖市",
                        "parent_id": "340100",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "340200",
                "area_name": "芜湖市",
                "parent_id": "340000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "340201",
                        "area_name": "市辖区",
                        "parent_id": "340200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340202",
                        "area_name": "镜湖区",
                        "parent_id": "340200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340203",
                        "area_name": "弋江区",
                        "parent_id": "340200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340207",
                        "area_name": "鸠江区",
                        "parent_id": "340200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340208",
                        "area_name": "三山区",
                        "parent_id": "340200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340221",
                        "area_name": "芜湖县",
                        "parent_id": "340200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340222",
                        "area_name": "繁昌县",
                        "parent_id": "340200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340223",
                        "area_name": "南陵县",
                        "parent_id": "340200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340225",
                        "area_name": "无为县",
                        "parent_id": "340200",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "340300",
                "area_name": "蚌埠市",
                "parent_id": "340000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "340301",
                        "area_name": "市辖区",
                        "parent_id": "340300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340302",
                        "area_name": "龙子湖区",
                        "parent_id": "340300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340303",
                        "area_name": "蚌山区",
                        "parent_id": "340300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340304",
                        "area_name": "禹会区",
                        "parent_id": "340300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340311",
                        "area_name": "淮上区",
                        "parent_id": "340300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340321",
                        "area_name": "怀远县",
                        "parent_id": "340300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340322",
                        "area_name": "五河县",
                        "parent_id": "340300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340323",
                        "area_name": "固镇县",
                        "parent_id": "340300",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "340400",
                "area_name": "淮南市",
                "parent_id": "340000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "340401",
                        "area_name": "市辖区",
                        "parent_id": "340400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340402",
                        "area_name": "大通区",
                        "parent_id": "340400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340403",
                        "area_name": "田家庵区",
                        "parent_id": "340400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340404",
                        "area_name": "谢家集区",
                        "parent_id": "340400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340405",
                        "area_name": "八公山区",
                        "parent_id": "340400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340406",
                        "area_name": "潘集区",
                        "parent_id": "340400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340421",
                        "area_name": "凤台县",
                        "parent_id": "340400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340422",
                        "area_name": "寿县",
                        "parent_id": "340400",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "340500",
                "area_name": "马鞍山市",
                "parent_id": "340000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "340501",
                        "area_name": "市辖区",
                        "parent_id": "340500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340503",
                        "area_name": "花山区",
                        "parent_id": "340500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340504",
                        "area_name": "雨山区",
                        "parent_id": "340500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340506",
                        "area_name": "博望区",
                        "parent_id": "340500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340521",
                        "area_name": "当涂县",
                        "parent_id": "340500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340522",
                        "area_name": "含山县",
                        "parent_id": "340500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340523",
                        "area_name": "和县",
                        "parent_id": "340500",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "340600",
                "area_name": "淮北市",
                "parent_id": "340000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "340601",
                        "area_name": "市辖区",
                        "parent_id": "340600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340602",
                        "area_name": "杜集区",
                        "parent_id": "340600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340603",
                        "area_name": "相山区",
                        "parent_id": "340600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340604",
                        "area_name": "烈山区",
                        "parent_id": "340600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340621",
                        "area_name": "濉溪县",
                        "parent_id": "340600",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "340700",
                "area_name": "铜陵市",
                "parent_id": "340000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "340701",
                        "area_name": "市辖区",
                        "parent_id": "340700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340705",
                        "area_name": "铜官区",
                        "parent_id": "340700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340706",
                        "area_name": "义安区",
                        "parent_id": "340700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340711",
                        "area_name": "郊区",
                        "parent_id": "340700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340722",
                        "area_name": "枞阳县",
                        "parent_id": "340700",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "340800",
                "area_name": "安庆市",
                "parent_id": "340000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "340801",
                        "area_name": "市辖区",
                        "parent_id": "340800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340802",
                        "area_name": "迎江区",
                        "parent_id": "340800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340803",
                        "area_name": "大观区",
                        "parent_id": "340800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340811",
                        "area_name": "宜秀区",
                        "parent_id": "340800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340822",
                        "area_name": "怀宁县",
                        "parent_id": "340800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340824",
                        "area_name": "潜山县",
                        "parent_id": "340800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340825",
                        "area_name": "太湖县",
                        "parent_id": "340800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340826",
                        "area_name": "宿松县",
                        "parent_id": "340800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340827",
                        "area_name": "望江县",
                        "parent_id": "340800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340828",
                        "area_name": "岳西县",
                        "parent_id": "340800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "340881",
                        "area_name": "桐城市",
                        "parent_id": "340800",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "341000",
                "area_name": "黄山市",
                "parent_id": "340000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "341001",
                        "area_name": "市辖区",
                        "parent_id": "341000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "341002",
                        "area_name": "屯溪区",
                        "parent_id": "341000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "341003",
                        "area_name": "黄山区",
                        "parent_id": "341000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "341004",
                        "area_name": "徽州区",
                        "parent_id": "341000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "341021",
                        "area_name": "歙县",
                        "parent_id": "341000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "341022",
                        "area_name": "休宁县",
                        "parent_id": "341000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "341023",
                        "area_name": "黟县",
                        "parent_id": "341000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "341024",
                        "area_name": "祁门县",
                        "parent_id": "341000",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "341100",
                "area_name": "滁州市",
                "parent_id": "340000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "341101",
                        "area_name": "市辖区",
                        "parent_id": "341100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "341102",
                        "area_name": "琅琊区",
                        "parent_id": "341100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "341103",
                        "area_name": "南谯区",
                        "parent_id": "341100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "341122",
                        "area_name": "来安县",
                        "parent_id": "341100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "341124",
                        "area_name": "全椒县",
                        "parent_id": "341100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "341125",
                        "area_name": "定远县",
                        "parent_id": "341100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "341126",
                        "area_name": "凤阳县",
                        "parent_id": "341100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "341181",
                        "area_name": "天长市",
                        "parent_id": "341100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "341182",
                        "area_name": "明光市",
                        "parent_id": "341100",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "341200",
                "area_name": "阜阳市",
                "parent_id": "340000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "341201",
                        "area_name": "市辖区",
                        "parent_id": "341200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "341202",
                        "area_name": "颍州区",
                        "parent_id": "341200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "341203",
                        "area_name": "颍东区",
                        "parent_id": "341200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "341204",
                        "area_name": "颍泉区",
                        "parent_id": "341200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "341221",
                        "area_name": "临泉县",
                        "parent_id": "341200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "341222",
                        "area_name": "太和县",
                        "parent_id": "341200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "341225",
                        "area_name": "阜南县",
                        "parent_id": "341200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "341226",
                        "area_name": "颍上县",
                        "parent_id": "341200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "341282",
                        "area_name": "界首市",
                        "parent_id": "341200",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "341300",
                "area_name": "宿州市",
                "parent_id": "340000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "341301",
                        "area_name": "市辖区",
                        "parent_id": "341300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "341302",
                        "area_name": "埇桥区",
                        "parent_id": "341300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "341321",
                        "area_name": "砀山县",
                        "parent_id": "341300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "341322",
                        "area_name": "萧县",
                        "parent_id": "341300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "341323",
                        "area_name": "灵璧县",
                        "parent_id": "341300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "341324",
                        "area_name": "泗县",
                        "parent_id": "341300",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "341500",
                "area_name": "六安市",
                "parent_id": "340000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "341501",
                        "area_name": "市辖区",
                        "parent_id": "341500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "341502",
                        "area_name": "金安区",
                        "parent_id": "341500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "341503",
                        "area_name": "裕安区",
                        "parent_id": "341500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "341504",
                        "area_name": "叶集区",
                        "parent_id": "341500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "341522",
                        "area_name": "霍邱县",
                        "parent_id": "341500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "341523",
                        "area_name": "舒城县",
                        "parent_id": "341500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "341524",
                        "area_name": "金寨县",
                        "parent_id": "341500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "341525",
                        "area_name": "霍山县",
                        "parent_id": "341500",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "341600",
                "area_name": "亳州市",
                "parent_id": "340000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "341601",
                        "area_name": "市辖区",
                        "parent_id": "341600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "341602",
                        "area_name": "谯城区",
                        "parent_id": "341600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "341621",
                        "area_name": "涡阳县",
                        "parent_id": "341600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "341622",
                        "area_name": "蒙城县",
                        "parent_id": "341600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "341623",
                        "area_name": "利辛县",
                        "parent_id": "341600",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "341700",
                "area_name": "池州市",
                "parent_id": "340000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "341701",
                        "area_name": "市辖区",
                        "parent_id": "341700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "341702",
                        "area_name": "贵池区",
                        "parent_id": "341700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "341721",
                        "area_name": "东至县",
                        "parent_id": "341700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "341722",
                        "area_name": "石台县",
                        "parent_id": "341700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "341723",
                        "area_name": "青阳县",
                        "parent_id": "341700",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "341800",
                "area_name": "宣城市",
                "parent_id": "340000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "341801",
                        "area_name": "市辖区",
                        "parent_id": "341800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "341802",
                        "area_name": "宣州区",
                        "parent_id": "341800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "341821",
                        "area_name": "郎溪县",
                        "parent_id": "341800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "341822",
                        "area_name": "广德县",
                        "parent_id": "341800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "341823",
                        "area_name": "泾县",
                        "parent_id": "341800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "341824",
                        "area_name": "绩溪县",
                        "parent_id": "341800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "341825",
                        "area_name": "旌德县",
                        "parent_id": "341800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "341881",
                        "area_name": "宁国市",
                        "parent_id": "341800",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            }
        ]
    },
    {
        "area_id": "350000",
        "area_name": "福建省",
        "parent_id": "0",
        "level": "1",
        "sub_area": [
            {
                "area_id": "350100",
                "area_name": "福州市",
                "parent_id": "350000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "350101",
                        "area_name": "市辖区",
                        "parent_id": "350100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350102",
                        "area_name": "鼓楼区",
                        "parent_id": "350100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350103",
                        "area_name": "台江区",
                        "parent_id": "350100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350104",
                        "area_name": "仓山区",
                        "parent_id": "350100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350105",
                        "area_name": "马尾区",
                        "parent_id": "350100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350111",
                        "area_name": "晋安区",
                        "parent_id": "350100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350121",
                        "area_name": "闽侯县",
                        "parent_id": "350100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350122",
                        "area_name": "连江县",
                        "parent_id": "350100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350123",
                        "area_name": "罗源县",
                        "parent_id": "350100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350124",
                        "area_name": "闽清县",
                        "parent_id": "350100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350125",
                        "area_name": "永泰县",
                        "parent_id": "350100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350128",
                        "area_name": "平潭县",
                        "parent_id": "350100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350181",
                        "area_name": "福清市",
                        "parent_id": "350100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350182",
                        "area_name": "长乐市",
                        "parent_id": "350100",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "350200",
                "area_name": "厦门市",
                "parent_id": "350000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "350201",
                        "area_name": "市辖区",
                        "parent_id": "350200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350203",
                        "area_name": "思明区",
                        "parent_id": "350200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350205",
                        "area_name": "海沧区",
                        "parent_id": "350200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350206",
                        "area_name": "湖里区",
                        "parent_id": "350200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350211",
                        "area_name": "集美区",
                        "parent_id": "350200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350212",
                        "area_name": "同安区",
                        "parent_id": "350200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350213",
                        "area_name": "翔安区",
                        "parent_id": "350200",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "350300",
                "area_name": "莆田市",
                "parent_id": "350000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "350301",
                        "area_name": "市辖区",
                        "parent_id": "350300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350302",
                        "area_name": "城厢区",
                        "parent_id": "350300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350303",
                        "area_name": "涵江区",
                        "parent_id": "350300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350304",
                        "area_name": "荔城区",
                        "parent_id": "350300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350305",
                        "area_name": "秀屿区",
                        "parent_id": "350300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350322",
                        "area_name": "仙游县",
                        "parent_id": "350300",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "350400",
                "area_name": "三明市",
                "parent_id": "350000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "350401",
                        "area_name": "市辖区",
                        "parent_id": "350400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350402",
                        "area_name": "梅列区",
                        "parent_id": "350400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350403",
                        "area_name": "三元区",
                        "parent_id": "350400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350421",
                        "area_name": "明溪县",
                        "parent_id": "350400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350423",
                        "area_name": "清流县",
                        "parent_id": "350400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350424",
                        "area_name": "宁化县",
                        "parent_id": "350400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350425",
                        "area_name": "大田县",
                        "parent_id": "350400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350426",
                        "area_name": "尤溪县",
                        "parent_id": "350400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350427",
                        "area_name": "沙县",
                        "parent_id": "350400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350428",
                        "area_name": "将乐县",
                        "parent_id": "350400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350429",
                        "area_name": "泰宁县",
                        "parent_id": "350400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350430",
                        "area_name": "建宁县",
                        "parent_id": "350400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350481",
                        "area_name": "永安市",
                        "parent_id": "350400",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "350500",
                "area_name": "泉州市",
                "parent_id": "350000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "350501",
                        "area_name": "市辖区",
                        "parent_id": "350500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350502",
                        "area_name": "鲤城区",
                        "parent_id": "350500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350503",
                        "area_name": "丰泽区",
                        "parent_id": "350500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350504",
                        "area_name": "洛江区",
                        "parent_id": "350500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350505",
                        "area_name": "泉港区",
                        "parent_id": "350500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350521",
                        "area_name": "惠安县",
                        "parent_id": "350500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350524",
                        "area_name": "安溪县",
                        "parent_id": "350500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350525",
                        "area_name": "永春县",
                        "parent_id": "350500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350526",
                        "area_name": "德化县",
                        "parent_id": "350500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350527",
                        "area_name": "金门县",
                        "parent_id": "350500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350581",
                        "area_name": "石狮市",
                        "parent_id": "350500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350582",
                        "area_name": "晋江市",
                        "parent_id": "350500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350583",
                        "area_name": "南安市",
                        "parent_id": "350500",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "350600",
                "area_name": "漳州市",
                "parent_id": "350000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "350601",
                        "area_name": "市辖区",
                        "parent_id": "350600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350602",
                        "area_name": "芗城区",
                        "parent_id": "350600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350603",
                        "area_name": "龙文区",
                        "parent_id": "350600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350622",
                        "area_name": "云霄县",
                        "parent_id": "350600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350623",
                        "area_name": "漳浦县",
                        "parent_id": "350600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350624",
                        "area_name": "诏安县",
                        "parent_id": "350600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350625",
                        "area_name": "长泰县",
                        "parent_id": "350600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350626",
                        "area_name": "东山县",
                        "parent_id": "350600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350627",
                        "area_name": "南靖县",
                        "parent_id": "350600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350628",
                        "area_name": "平和县",
                        "parent_id": "350600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350629",
                        "area_name": "华安县",
                        "parent_id": "350600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350681",
                        "area_name": "龙海市",
                        "parent_id": "350600",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "350700",
                "area_name": "南平市",
                "parent_id": "350000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "350701",
                        "area_name": "市辖区",
                        "parent_id": "350700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350702",
                        "area_name": "延平区",
                        "parent_id": "350700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350703",
                        "area_name": "建阳区",
                        "parent_id": "350700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350721",
                        "area_name": "顺昌县",
                        "parent_id": "350700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350722",
                        "area_name": "浦城县",
                        "parent_id": "350700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350723",
                        "area_name": "光泽县",
                        "parent_id": "350700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350724",
                        "area_name": "松溪县",
                        "parent_id": "350700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350725",
                        "area_name": "政和县",
                        "parent_id": "350700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350781",
                        "area_name": "邵武市",
                        "parent_id": "350700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350782",
                        "area_name": "武夷山市",
                        "parent_id": "350700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350783",
                        "area_name": "建瓯市",
                        "parent_id": "350700",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "350800",
                "area_name": "龙岩市",
                "parent_id": "350000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "350801",
                        "area_name": "市辖区",
                        "parent_id": "350800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350802",
                        "area_name": "新罗区",
                        "parent_id": "350800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350803",
                        "area_name": "永定区",
                        "parent_id": "350800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350821",
                        "area_name": "长汀县",
                        "parent_id": "350800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350823",
                        "area_name": "上杭县",
                        "parent_id": "350800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350824",
                        "area_name": "武平县",
                        "parent_id": "350800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350825",
                        "area_name": "连城县",
                        "parent_id": "350800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350881",
                        "area_name": "漳平市",
                        "parent_id": "350800",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "350900",
                "area_name": "宁德市",
                "parent_id": "350000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "350901",
                        "area_name": "市辖区",
                        "parent_id": "350900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350902",
                        "area_name": "蕉城区",
                        "parent_id": "350900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350921",
                        "area_name": "霞浦县",
                        "parent_id": "350900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350922",
                        "area_name": "古田县",
                        "parent_id": "350900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350923",
                        "area_name": "屏南县",
                        "parent_id": "350900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350924",
                        "area_name": "寿宁县",
                        "parent_id": "350900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350925",
                        "area_name": "周宁县",
                        "parent_id": "350900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350926",
                        "area_name": "柘荣县",
                        "parent_id": "350900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350981",
                        "area_name": "福安市",
                        "parent_id": "350900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "350982",
                        "area_name": "福鼎市",
                        "parent_id": "350900",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            }
        ]
    },
    {
        "area_id": "360000",
        "area_name": "江西省",
        "parent_id": "0",
        "level": "1",
        "sub_area": [
            {
                "area_id": "360100",
                "area_name": "南昌市",
                "parent_id": "360000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "360101",
                        "area_name": "市辖区",
                        "parent_id": "360100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360102",
                        "area_name": "东湖区",
                        "parent_id": "360100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360103",
                        "area_name": "西湖区",
                        "parent_id": "360100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360104",
                        "area_name": "青云谱区",
                        "parent_id": "360100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360105",
                        "area_name": "湾里区",
                        "parent_id": "360100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360111",
                        "area_name": "青山湖区",
                        "parent_id": "360100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360112",
                        "area_name": "新建区",
                        "parent_id": "360100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360121",
                        "area_name": "南昌县",
                        "parent_id": "360100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360123",
                        "area_name": "安义县",
                        "parent_id": "360100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360124",
                        "area_name": "进贤县",
                        "parent_id": "360100",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "360200",
                "area_name": "景德镇市",
                "parent_id": "360000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "360201",
                        "area_name": "市辖区",
                        "parent_id": "360200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360202",
                        "area_name": "昌江区",
                        "parent_id": "360200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360203",
                        "area_name": "珠山区",
                        "parent_id": "360200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360222",
                        "area_name": "浮梁县",
                        "parent_id": "360200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360281",
                        "area_name": "乐平市",
                        "parent_id": "360200",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "360300",
                "area_name": "萍乡市",
                "parent_id": "360000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "360301",
                        "area_name": "市辖区",
                        "parent_id": "360300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360302",
                        "area_name": "安源区",
                        "parent_id": "360300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360313",
                        "area_name": "湘东区",
                        "parent_id": "360300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360321",
                        "area_name": "莲花县",
                        "parent_id": "360300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360322",
                        "area_name": "上栗县",
                        "parent_id": "360300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360323",
                        "area_name": "芦溪县",
                        "parent_id": "360300",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "360400",
                "area_name": "九江市",
                "parent_id": "360000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "360401",
                        "area_name": "市辖区",
                        "parent_id": "360400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360402",
                        "area_name": "濂溪区",
                        "parent_id": "360400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360403",
                        "area_name": "浔阳区",
                        "parent_id": "360400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360421",
                        "area_name": "九江县",
                        "parent_id": "360400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360423",
                        "area_name": "武宁县",
                        "parent_id": "360400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360424",
                        "area_name": "修水县",
                        "parent_id": "360400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360425",
                        "area_name": "永修县",
                        "parent_id": "360400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360426",
                        "area_name": "德安县",
                        "parent_id": "360400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360428",
                        "area_name": "都昌县",
                        "parent_id": "360400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360429",
                        "area_name": "湖口县",
                        "parent_id": "360400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360430",
                        "area_name": "彭泽县",
                        "parent_id": "360400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360481",
                        "area_name": "瑞昌市",
                        "parent_id": "360400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360482",
                        "area_name": "共青城市",
                        "parent_id": "360400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360483",
                        "area_name": "庐山市",
                        "parent_id": "360400",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "360500",
                "area_name": "新余市",
                "parent_id": "360000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "360501",
                        "area_name": "市辖区",
                        "parent_id": "360500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360502",
                        "area_name": "渝水区",
                        "parent_id": "360500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360521",
                        "area_name": "分宜县",
                        "parent_id": "360500",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "360600",
                "area_name": "鹰潭市",
                "parent_id": "360000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "360601",
                        "area_name": "市辖区",
                        "parent_id": "360600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360602",
                        "area_name": "月湖区",
                        "parent_id": "360600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360622",
                        "area_name": "余江县",
                        "parent_id": "360600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360681",
                        "area_name": "贵溪市",
                        "parent_id": "360600",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "360700",
                "area_name": "赣州市",
                "parent_id": "360000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "360701",
                        "area_name": "市辖区",
                        "parent_id": "360700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360702",
                        "area_name": "章贡区",
                        "parent_id": "360700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360703",
                        "area_name": "南康区",
                        "parent_id": "360700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360721",
                        "area_name": "赣县",
                        "parent_id": "360700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360722",
                        "area_name": "信丰县",
                        "parent_id": "360700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360723",
                        "area_name": "大余县",
                        "parent_id": "360700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360724",
                        "area_name": "上犹县",
                        "parent_id": "360700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360725",
                        "area_name": "崇义县",
                        "parent_id": "360700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360726",
                        "area_name": "安远县",
                        "parent_id": "360700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360727",
                        "area_name": "龙南县",
                        "parent_id": "360700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360728",
                        "area_name": "定南县",
                        "parent_id": "360700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360729",
                        "area_name": "全南县",
                        "parent_id": "360700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360730",
                        "area_name": "宁都县",
                        "parent_id": "360700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360731",
                        "area_name": "于都县",
                        "parent_id": "360700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360732",
                        "area_name": "兴国县",
                        "parent_id": "360700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360733",
                        "area_name": "会昌县",
                        "parent_id": "360700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360734",
                        "area_name": "寻乌县",
                        "parent_id": "360700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360735",
                        "area_name": "石城县",
                        "parent_id": "360700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360781",
                        "area_name": "瑞金市",
                        "parent_id": "360700",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "360800",
                "area_name": "吉安市",
                "parent_id": "360000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "360801",
                        "area_name": "市辖区",
                        "parent_id": "360800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360802",
                        "area_name": "吉州区",
                        "parent_id": "360800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360803",
                        "area_name": "青原区",
                        "parent_id": "360800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360821",
                        "area_name": "吉安县",
                        "parent_id": "360800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360822",
                        "area_name": "吉水县",
                        "parent_id": "360800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360823",
                        "area_name": "峡江县",
                        "parent_id": "360800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360824",
                        "area_name": "新干县",
                        "parent_id": "360800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360825",
                        "area_name": "永丰县",
                        "parent_id": "360800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360826",
                        "area_name": "泰和县",
                        "parent_id": "360800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360827",
                        "area_name": "遂川县",
                        "parent_id": "360800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360828",
                        "area_name": "万安县",
                        "parent_id": "360800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360829",
                        "area_name": "安福县",
                        "parent_id": "360800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360830",
                        "area_name": "永新县",
                        "parent_id": "360800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360881",
                        "area_name": "井冈山市",
                        "parent_id": "360800",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "360900",
                "area_name": "宜春市",
                "parent_id": "360000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "360901",
                        "area_name": "市辖区",
                        "parent_id": "360900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360902",
                        "area_name": "袁州区",
                        "parent_id": "360900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360921",
                        "area_name": "奉新县",
                        "parent_id": "360900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360922",
                        "area_name": "万载县",
                        "parent_id": "360900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360923",
                        "area_name": "上高县",
                        "parent_id": "360900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360924",
                        "area_name": "宜丰县",
                        "parent_id": "360900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360925",
                        "area_name": "靖安县",
                        "parent_id": "360900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360926",
                        "area_name": "铜鼓县",
                        "parent_id": "360900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360981",
                        "area_name": "丰城市",
                        "parent_id": "360900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360982",
                        "area_name": "樟树市",
                        "parent_id": "360900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "360983",
                        "area_name": "高安市",
                        "parent_id": "360900",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "361000",
                "area_name": "抚州市",
                "parent_id": "360000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "361001",
                        "area_name": "市辖区",
                        "parent_id": "361000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "361002",
                        "area_name": "临川区",
                        "parent_id": "361000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "361021",
                        "area_name": "南城县",
                        "parent_id": "361000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "361022",
                        "area_name": "黎川县",
                        "parent_id": "361000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "361023",
                        "area_name": "南丰县",
                        "parent_id": "361000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "361024",
                        "area_name": "崇仁县",
                        "parent_id": "361000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "361025",
                        "area_name": "乐安县",
                        "parent_id": "361000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "361026",
                        "area_name": "宜黄县",
                        "parent_id": "361000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "361027",
                        "area_name": "金溪县",
                        "parent_id": "361000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "361028",
                        "area_name": "资溪县",
                        "parent_id": "361000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "361029",
                        "area_name": "东乡县",
                        "parent_id": "361000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "361030",
                        "area_name": "广昌县",
                        "parent_id": "361000",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "361100",
                "area_name": "上饶市",
                "parent_id": "360000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "361101",
                        "area_name": "市辖区",
                        "parent_id": "361100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "361102",
                        "area_name": "信州区",
                        "parent_id": "361100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "361103",
                        "area_name": "广丰区",
                        "parent_id": "361100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "361121",
                        "area_name": "上饶县",
                        "parent_id": "361100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "361123",
                        "area_name": "玉山县",
                        "parent_id": "361100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "361124",
                        "area_name": "铅山县",
                        "parent_id": "361100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "361125",
                        "area_name": "横峰县",
                        "parent_id": "361100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "361126",
                        "area_name": "弋阳县",
                        "parent_id": "361100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "361127",
                        "area_name": "余干县",
                        "parent_id": "361100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "361128",
                        "area_name": "鄱阳县",
                        "parent_id": "361100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "361129",
                        "area_name": "万年县",
                        "parent_id": "361100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "361130",
                        "area_name": "婺源县",
                        "parent_id": "361100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "361181",
                        "area_name": "德兴市",
                        "parent_id": "361100",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            }
        ]
    },
    {
        "area_id": "370000",
        "area_name": "山东省",
        "parent_id": "0",
        "level": "1",
        "sub_area": [
            {
                "area_id": "370100",
                "area_name": "济南市",
                "parent_id": "370000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "370101",
                        "area_name": "市辖区",
                        "parent_id": "370100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370102",
                        "area_name": "历下区",
                        "parent_id": "370100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370103",
                        "area_name": "市中区",
                        "parent_id": "370100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370104",
                        "area_name": "槐荫区",
                        "parent_id": "370100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370105",
                        "area_name": "天桥区",
                        "parent_id": "370100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370112",
                        "area_name": "历城区",
                        "parent_id": "370100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370113",
                        "area_name": "长清区",
                        "parent_id": "370100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370124",
                        "area_name": "平阴县",
                        "parent_id": "370100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370125",
                        "area_name": "济阳县",
                        "parent_id": "370100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370126",
                        "area_name": "商河县",
                        "parent_id": "370100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370181",
                        "area_name": "章丘市",
                        "parent_id": "370100",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "370200",
                "area_name": "青岛市",
                "parent_id": "370000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "370201",
                        "area_name": "市辖区",
                        "parent_id": "370200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370202",
                        "area_name": "市南区",
                        "parent_id": "370200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370203",
                        "area_name": "市北区",
                        "parent_id": "370200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370211",
                        "area_name": "黄岛区",
                        "parent_id": "370200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370212",
                        "area_name": "崂山区",
                        "parent_id": "370200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370213",
                        "area_name": "李沧区",
                        "parent_id": "370200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370214",
                        "area_name": "城阳区",
                        "parent_id": "370200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370281",
                        "area_name": "胶州市",
                        "parent_id": "370200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370282",
                        "area_name": "即墨市",
                        "parent_id": "370200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370283",
                        "area_name": "平度市",
                        "parent_id": "370200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370285",
                        "area_name": "莱西市",
                        "parent_id": "370200",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "370300",
                "area_name": "淄博市",
                "parent_id": "370000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "370301",
                        "area_name": "市辖区",
                        "parent_id": "370300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370302",
                        "area_name": "淄川区",
                        "parent_id": "370300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370303",
                        "area_name": "张店区",
                        "parent_id": "370300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370304",
                        "area_name": "博山区",
                        "parent_id": "370300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370305",
                        "area_name": "临淄区",
                        "parent_id": "370300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370306",
                        "area_name": "周村区",
                        "parent_id": "370300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370321",
                        "area_name": "桓台县",
                        "parent_id": "370300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370322",
                        "area_name": "高青县",
                        "parent_id": "370300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370323",
                        "area_name": "沂源县",
                        "parent_id": "370300",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "370400",
                "area_name": "枣庄市",
                "parent_id": "370000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "370401",
                        "area_name": "市辖区",
                        "parent_id": "370400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370402",
                        "area_name": "市中区",
                        "parent_id": "370400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370403",
                        "area_name": "薛城区",
                        "parent_id": "370400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370404",
                        "area_name": "峄城区",
                        "parent_id": "370400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370405",
                        "area_name": "台儿庄区",
                        "parent_id": "370400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370406",
                        "area_name": "山亭区",
                        "parent_id": "370400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370481",
                        "area_name": "滕州市",
                        "parent_id": "370400",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "370500",
                "area_name": "东营市",
                "parent_id": "370000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "370501",
                        "area_name": "市辖区",
                        "parent_id": "370500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370502",
                        "area_name": "东营区",
                        "parent_id": "370500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370503",
                        "area_name": "河口区",
                        "parent_id": "370500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370505",
                        "area_name": "垦利区",
                        "parent_id": "370500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370522",
                        "area_name": "利津县",
                        "parent_id": "370500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370523",
                        "area_name": "广饶县",
                        "parent_id": "370500",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "370600",
                "area_name": "烟台市",
                "parent_id": "370000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "370601",
                        "area_name": "市辖区",
                        "parent_id": "370600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370602",
                        "area_name": "芝罘区",
                        "parent_id": "370600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370611",
                        "area_name": "福山区",
                        "parent_id": "370600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370612",
                        "area_name": "牟平区",
                        "parent_id": "370600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370613",
                        "area_name": "莱山区",
                        "parent_id": "370600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370634",
                        "area_name": "长岛县",
                        "parent_id": "370600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370681",
                        "area_name": "龙口市",
                        "parent_id": "370600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370682",
                        "area_name": "莱阳市",
                        "parent_id": "370600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370683",
                        "area_name": "莱州市",
                        "parent_id": "370600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370684",
                        "area_name": "蓬莱市",
                        "parent_id": "370600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370685",
                        "area_name": "招远市",
                        "parent_id": "370600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370686",
                        "area_name": "栖霞市",
                        "parent_id": "370600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370687",
                        "area_name": "海阳市",
                        "parent_id": "370600",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "370700",
                "area_name": "潍坊市",
                "parent_id": "370000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "370701",
                        "area_name": "市辖区",
                        "parent_id": "370700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370702",
                        "area_name": "潍城区",
                        "parent_id": "370700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370703",
                        "area_name": "寒亭区",
                        "parent_id": "370700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370704",
                        "area_name": "坊子区",
                        "parent_id": "370700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370705",
                        "area_name": "奎文区",
                        "parent_id": "370700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370724",
                        "area_name": "临朐县",
                        "parent_id": "370700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370725",
                        "area_name": "昌乐县",
                        "parent_id": "370700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370781",
                        "area_name": "青州市",
                        "parent_id": "370700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370782",
                        "area_name": "诸城市",
                        "parent_id": "370700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370783",
                        "area_name": "寿光市",
                        "parent_id": "370700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370784",
                        "area_name": "安丘市",
                        "parent_id": "370700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370785",
                        "area_name": "高密市",
                        "parent_id": "370700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370786",
                        "area_name": "昌邑市",
                        "parent_id": "370700",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "370800",
                "area_name": "济宁市",
                "parent_id": "370000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "370801",
                        "area_name": "市辖区",
                        "parent_id": "370800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370811",
                        "area_name": "任城区",
                        "parent_id": "370800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370812",
                        "area_name": "兖州区",
                        "parent_id": "370800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370826",
                        "area_name": "微山县",
                        "parent_id": "370800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370827",
                        "area_name": "鱼台县",
                        "parent_id": "370800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370828",
                        "area_name": "金乡县",
                        "parent_id": "370800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370829",
                        "area_name": "嘉祥县",
                        "parent_id": "370800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370830",
                        "area_name": "汶上县",
                        "parent_id": "370800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370831",
                        "area_name": "泗水县",
                        "parent_id": "370800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370832",
                        "area_name": "梁山县",
                        "parent_id": "370800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370881",
                        "area_name": "曲阜市",
                        "parent_id": "370800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370883",
                        "area_name": "邹城市",
                        "parent_id": "370800",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "370900",
                "area_name": "泰安市",
                "parent_id": "370000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "370901",
                        "area_name": "市辖区",
                        "parent_id": "370900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370902",
                        "area_name": "泰山区",
                        "parent_id": "370900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370911",
                        "area_name": "岱岳区",
                        "parent_id": "370900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370921",
                        "area_name": "宁阳县",
                        "parent_id": "370900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370923",
                        "area_name": "东平县",
                        "parent_id": "370900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370982",
                        "area_name": "新泰市",
                        "parent_id": "370900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "370983",
                        "area_name": "肥城市",
                        "parent_id": "370900",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "371000",
                "area_name": "威海市",
                "parent_id": "370000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "371001",
                        "area_name": "市辖区",
                        "parent_id": "371000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371002",
                        "area_name": "环翠区",
                        "parent_id": "371000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371003",
                        "area_name": "文登区",
                        "parent_id": "371000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371082",
                        "area_name": "荣成市",
                        "parent_id": "371000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371083",
                        "area_name": "乳山市",
                        "parent_id": "371000",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "371100",
                "area_name": "日照市",
                "parent_id": "370000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "371101",
                        "area_name": "市辖区",
                        "parent_id": "371100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371102",
                        "area_name": "东港区",
                        "parent_id": "371100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371103",
                        "area_name": "岚山区",
                        "parent_id": "371100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371121",
                        "area_name": "五莲县",
                        "parent_id": "371100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371122",
                        "area_name": "莒县",
                        "parent_id": "371100",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "371200",
                "area_name": "莱芜市",
                "parent_id": "370000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "371201",
                        "area_name": "市辖区",
                        "parent_id": "371200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371202",
                        "area_name": "莱城区",
                        "parent_id": "371200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371203",
                        "area_name": "钢城区",
                        "parent_id": "371200",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "371300",
                "area_name": "临沂市",
                "parent_id": "370000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "371301",
                        "area_name": "市辖区",
                        "parent_id": "371300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371302",
                        "area_name": "兰山区",
                        "parent_id": "371300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371311",
                        "area_name": "罗庄区",
                        "parent_id": "371300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371312",
                        "area_name": "河东区",
                        "parent_id": "371300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371321",
                        "area_name": "沂南县",
                        "parent_id": "371300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371322",
                        "area_name": "郯城县",
                        "parent_id": "371300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371323",
                        "area_name": "沂水县",
                        "parent_id": "371300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371324",
                        "area_name": "兰陵县",
                        "parent_id": "371300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371325",
                        "area_name": "费县",
                        "parent_id": "371300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371326",
                        "area_name": "平邑县",
                        "parent_id": "371300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371327",
                        "area_name": "莒南县",
                        "parent_id": "371300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371328",
                        "area_name": "蒙阴县",
                        "parent_id": "371300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371329",
                        "area_name": "临沭县",
                        "parent_id": "371300",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "371400",
                "area_name": "德州市",
                "parent_id": "370000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "371401",
                        "area_name": "市辖区",
                        "parent_id": "371400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371402",
                        "area_name": "德城区",
                        "parent_id": "371400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371403",
                        "area_name": "陵城区",
                        "parent_id": "371400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371422",
                        "area_name": "宁津县",
                        "parent_id": "371400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371423",
                        "area_name": "庆云县",
                        "parent_id": "371400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371424",
                        "area_name": "临邑县",
                        "parent_id": "371400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371425",
                        "area_name": "齐河县",
                        "parent_id": "371400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371426",
                        "area_name": "平原县",
                        "parent_id": "371400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371427",
                        "area_name": "夏津县",
                        "parent_id": "371400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371428",
                        "area_name": "武城县",
                        "parent_id": "371400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371481",
                        "area_name": "乐陵市",
                        "parent_id": "371400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371482",
                        "area_name": "禹城市",
                        "parent_id": "371400",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "371500",
                "area_name": "聊城市",
                "parent_id": "370000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "371501",
                        "area_name": "市辖区",
                        "parent_id": "371500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371502",
                        "area_name": "东昌府区",
                        "parent_id": "371500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371521",
                        "area_name": "阳谷县",
                        "parent_id": "371500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371522",
                        "area_name": "莘县",
                        "parent_id": "371500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371523",
                        "area_name": "茌平县",
                        "parent_id": "371500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371524",
                        "area_name": "东阿县",
                        "parent_id": "371500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371525",
                        "area_name": "冠县",
                        "parent_id": "371500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371526",
                        "area_name": "高唐县",
                        "parent_id": "371500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371581",
                        "area_name": "临清市",
                        "parent_id": "371500",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "371600",
                "area_name": "滨州市",
                "parent_id": "370000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "371601",
                        "area_name": "市辖区",
                        "parent_id": "371600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371602",
                        "area_name": "滨城区",
                        "parent_id": "371600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371603",
                        "area_name": "沾化区",
                        "parent_id": "371600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371621",
                        "area_name": "惠民县",
                        "parent_id": "371600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371622",
                        "area_name": "阳信县",
                        "parent_id": "371600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371623",
                        "area_name": "无棣县",
                        "parent_id": "371600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371625",
                        "area_name": "博兴县",
                        "parent_id": "371600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371626",
                        "area_name": "邹平县",
                        "parent_id": "371600",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "371700",
                "area_name": "菏泽市",
                "parent_id": "370000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "371701",
                        "area_name": "市辖区",
                        "parent_id": "371700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371702",
                        "area_name": "牡丹区",
                        "parent_id": "371700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371703",
                        "area_name": "定陶区",
                        "parent_id": "371700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371721",
                        "area_name": "曹县",
                        "parent_id": "371700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371722",
                        "area_name": "单县",
                        "parent_id": "371700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371723",
                        "area_name": "成武县",
                        "parent_id": "371700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371724",
                        "area_name": "巨野县",
                        "parent_id": "371700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371725",
                        "area_name": "郓城县",
                        "parent_id": "371700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371726",
                        "area_name": "鄄城县",
                        "parent_id": "371700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "371728",
                        "area_name": "东明县",
                        "parent_id": "371700",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            }
        ]
    },
    {
        "area_id": "410000",
        "area_name": "河南省",
        "parent_id": "0",
        "level": "1",
        "sub_area": [
            {
                "area_id": "410100",
                "area_name": "郑州市",
                "parent_id": "410000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "410101",
                        "area_name": "市辖区",
                        "parent_id": "410100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410102",
                        "area_name": "中原区",
                        "parent_id": "410100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410103",
                        "area_name": "二七区",
                        "parent_id": "410100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410104",
                        "area_name": "管城回族区",
                        "parent_id": "410100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410105",
                        "area_name": "金水区",
                        "parent_id": "410100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410106",
                        "area_name": "上街区",
                        "parent_id": "410100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410108",
                        "area_name": "惠济区",
                        "parent_id": "410100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410122",
                        "area_name": "中牟县",
                        "parent_id": "410100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410181",
                        "area_name": "巩义市",
                        "parent_id": "410100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410182",
                        "area_name": "荥阳市",
                        "parent_id": "410100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410183",
                        "area_name": "新密市",
                        "parent_id": "410100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410184",
                        "area_name": "新郑市",
                        "parent_id": "410100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410185",
                        "area_name": "登封市",
                        "parent_id": "410100",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "410200",
                "area_name": "开封市",
                "parent_id": "410000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "410201",
                        "area_name": "市辖区",
                        "parent_id": "410200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410202",
                        "area_name": "龙亭区",
                        "parent_id": "410200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410203",
                        "area_name": "顺河回族区",
                        "parent_id": "410200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410204",
                        "area_name": "鼓楼区",
                        "parent_id": "410200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410205",
                        "area_name": "禹王台区",
                        "parent_id": "410200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410211",
                        "area_name": "金明区",
                        "parent_id": "410200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410212",
                        "area_name": "祥符区",
                        "parent_id": "410200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410221",
                        "area_name": "杞县",
                        "parent_id": "410200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410222",
                        "area_name": "通许县",
                        "parent_id": "410200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410223",
                        "area_name": "尉氏县",
                        "parent_id": "410200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410225",
                        "area_name": "兰考县",
                        "parent_id": "410200",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "410300",
                "area_name": "洛阳市",
                "parent_id": "410000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "410301",
                        "area_name": "市辖区",
                        "parent_id": "410300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410302",
                        "area_name": "老城区",
                        "parent_id": "410300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410303",
                        "area_name": "西工区",
                        "parent_id": "410300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410304",
                        "area_name": "瀍河回族区",
                        "parent_id": "410300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410305",
                        "area_name": "涧西区",
                        "parent_id": "410300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410306",
                        "area_name": "吉利区",
                        "parent_id": "410300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410311",
                        "area_name": "洛龙区",
                        "parent_id": "410300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410322",
                        "area_name": "孟津县",
                        "parent_id": "410300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410323",
                        "area_name": "新安县",
                        "parent_id": "410300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410324",
                        "area_name": "栾川县",
                        "parent_id": "410300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410325",
                        "area_name": "嵩县",
                        "parent_id": "410300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410326",
                        "area_name": "汝阳县",
                        "parent_id": "410300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410327",
                        "area_name": "宜阳县",
                        "parent_id": "410300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410328",
                        "area_name": "洛宁县",
                        "parent_id": "410300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410329",
                        "area_name": "伊川县",
                        "parent_id": "410300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410381",
                        "area_name": "偃师市",
                        "parent_id": "410300",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "410400",
                "area_name": "平顶山市",
                "parent_id": "410000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "410401",
                        "area_name": "市辖区",
                        "parent_id": "410400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410402",
                        "area_name": "新华区",
                        "parent_id": "410400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410403",
                        "area_name": "卫东区",
                        "parent_id": "410400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410404",
                        "area_name": "石龙区",
                        "parent_id": "410400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410411",
                        "area_name": "湛河区",
                        "parent_id": "410400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410421",
                        "area_name": "宝丰县",
                        "parent_id": "410400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410422",
                        "area_name": "叶县",
                        "parent_id": "410400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410423",
                        "area_name": "鲁山县",
                        "parent_id": "410400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410425",
                        "area_name": "郏县",
                        "parent_id": "410400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410481",
                        "area_name": "舞钢市",
                        "parent_id": "410400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410482",
                        "area_name": "汝州市",
                        "parent_id": "410400",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "410500",
                "area_name": "安阳市",
                "parent_id": "410000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "410501",
                        "area_name": "市辖区",
                        "parent_id": "410500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410502",
                        "area_name": "文峰区",
                        "parent_id": "410500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410503",
                        "area_name": "北关区",
                        "parent_id": "410500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410505",
                        "area_name": "殷都区",
                        "parent_id": "410500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410506",
                        "area_name": "龙安区",
                        "parent_id": "410500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410522",
                        "area_name": "安阳县",
                        "parent_id": "410500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410523",
                        "area_name": "汤阴县",
                        "parent_id": "410500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410526",
                        "area_name": "滑县",
                        "parent_id": "410500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410527",
                        "area_name": "内黄县",
                        "parent_id": "410500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410581",
                        "area_name": "林州市",
                        "parent_id": "410500",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "410600",
                "area_name": "鹤壁市",
                "parent_id": "410000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "410601",
                        "area_name": "市辖区",
                        "parent_id": "410600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410602",
                        "area_name": "鹤山区",
                        "parent_id": "410600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410603",
                        "area_name": "山城区",
                        "parent_id": "410600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410611",
                        "area_name": "淇滨区",
                        "parent_id": "410600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410621",
                        "area_name": "浚县",
                        "parent_id": "410600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410622",
                        "area_name": "淇县",
                        "parent_id": "410600",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "410700",
                "area_name": "新乡市",
                "parent_id": "410000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "410701",
                        "area_name": "市辖区",
                        "parent_id": "410700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410702",
                        "area_name": "红旗区",
                        "parent_id": "410700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410703",
                        "area_name": "卫滨区",
                        "parent_id": "410700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410704",
                        "area_name": "凤泉区",
                        "parent_id": "410700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410711",
                        "area_name": "牧野区",
                        "parent_id": "410700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410721",
                        "area_name": "新乡县",
                        "parent_id": "410700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410724",
                        "area_name": "获嘉县",
                        "parent_id": "410700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410725",
                        "area_name": "原阳县",
                        "parent_id": "410700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410726",
                        "area_name": "延津县",
                        "parent_id": "410700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410727",
                        "area_name": "封丘县",
                        "parent_id": "410700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410728",
                        "area_name": "长垣县",
                        "parent_id": "410700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410781",
                        "area_name": "卫辉市",
                        "parent_id": "410700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410782",
                        "area_name": "辉县市",
                        "parent_id": "410700",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "410800",
                "area_name": "焦作市",
                "parent_id": "410000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "410801",
                        "area_name": "市辖区",
                        "parent_id": "410800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410802",
                        "area_name": "解放区",
                        "parent_id": "410800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410803",
                        "area_name": "中站区",
                        "parent_id": "410800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410804",
                        "area_name": "马村区",
                        "parent_id": "410800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410811",
                        "area_name": "山阳区",
                        "parent_id": "410800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410821",
                        "area_name": "修武县",
                        "parent_id": "410800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410822",
                        "area_name": "博爱县",
                        "parent_id": "410800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410823",
                        "area_name": "武陟县",
                        "parent_id": "410800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410825",
                        "area_name": "温县",
                        "parent_id": "410800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410882",
                        "area_name": "沁阳市",
                        "parent_id": "410800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410883",
                        "area_name": "孟州市",
                        "parent_id": "410800",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "410900",
                "area_name": "濮阳市",
                "parent_id": "410000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "410901",
                        "area_name": "市辖区",
                        "parent_id": "410900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410902",
                        "area_name": "华龙区",
                        "parent_id": "410900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410922",
                        "area_name": "清丰县",
                        "parent_id": "410900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410923",
                        "area_name": "南乐县",
                        "parent_id": "410900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410926",
                        "area_name": "范县",
                        "parent_id": "410900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410927",
                        "area_name": "台前县",
                        "parent_id": "410900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "410928",
                        "area_name": "濮阳县",
                        "parent_id": "410900",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "411000",
                "area_name": "许昌市",
                "parent_id": "410000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "411001",
                        "area_name": "市辖区",
                        "parent_id": "411000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411002",
                        "area_name": "魏都区",
                        "parent_id": "411000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411023",
                        "area_name": "许昌县",
                        "parent_id": "411000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411024",
                        "area_name": "鄢陵县",
                        "parent_id": "411000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411025",
                        "area_name": "襄城县",
                        "parent_id": "411000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411081",
                        "area_name": "禹州市",
                        "parent_id": "411000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411082",
                        "area_name": "长葛市",
                        "parent_id": "411000",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "411100",
                "area_name": "漯河市",
                "parent_id": "410000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "411101",
                        "area_name": "市辖区",
                        "parent_id": "411100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411102",
                        "area_name": "源汇区",
                        "parent_id": "411100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411103",
                        "area_name": "郾城区",
                        "parent_id": "411100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411104",
                        "area_name": "召陵区",
                        "parent_id": "411100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411121",
                        "area_name": "舞阳县",
                        "parent_id": "411100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411122",
                        "area_name": "临颍县",
                        "parent_id": "411100",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "411200",
                "area_name": "三门峡市",
                "parent_id": "410000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "411201",
                        "area_name": "市辖区",
                        "parent_id": "411200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411202",
                        "area_name": "湖滨区",
                        "parent_id": "411200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411203",
                        "area_name": "陕州区",
                        "parent_id": "411200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411221",
                        "area_name": "渑池县",
                        "parent_id": "411200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411224",
                        "area_name": "卢氏县",
                        "parent_id": "411200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411281",
                        "area_name": "义马市",
                        "parent_id": "411200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411282",
                        "area_name": "灵宝市",
                        "parent_id": "411200",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "411300",
                "area_name": "南阳市",
                "parent_id": "410000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "411301",
                        "area_name": "市辖区",
                        "parent_id": "411300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411302",
                        "area_name": "宛城区",
                        "parent_id": "411300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411303",
                        "area_name": "卧龙区",
                        "parent_id": "411300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411321",
                        "area_name": "南召县",
                        "parent_id": "411300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411322",
                        "area_name": "方城县",
                        "parent_id": "411300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411323",
                        "area_name": "西峡县",
                        "parent_id": "411300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411324",
                        "area_name": "镇平县",
                        "parent_id": "411300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411325",
                        "area_name": "内乡县",
                        "parent_id": "411300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411326",
                        "area_name": "淅川县",
                        "parent_id": "411300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411327",
                        "area_name": "社旗县",
                        "parent_id": "411300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411328",
                        "area_name": "唐河县",
                        "parent_id": "411300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411329",
                        "area_name": "新野县",
                        "parent_id": "411300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411330",
                        "area_name": "桐柏县",
                        "parent_id": "411300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411381",
                        "area_name": "邓州市",
                        "parent_id": "411300",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "411400",
                "area_name": "商丘市",
                "parent_id": "410000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "411401",
                        "area_name": "市辖区",
                        "parent_id": "411400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411402",
                        "area_name": "梁园区",
                        "parent_id": "411400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411403",
                        "area_name": "睢阳区",
                        "parent_id": "411400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411421",
                        "area_name": "民权县",
                        "parent_id": "411400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411422",
                        "area_name": "睢县",
                        "parent_id": "411400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411423",
                        "area_name": "宁陵县",
                        "parent_id": "411400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411424",
                        "area_name": "柘城县",
                        "parent_id": "411400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411425",
                        "area_name": "虞城县",
                        "parent_id": "411400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411426",
                        "area_name": "夏邑县",
                        "parent_id": "411400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411481",
                        "area_name": "永城市",
                        "parent_id": "411400",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "411500",
                "area_name": "信阳市",
                "parent_id": "410000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "411501",
                        "area_name": "市辖区",
                        "parent_id": "411500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411502",
                        "area_name": "浉河区",
                        "parent_id": "411500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411503",
                        "area_name": "平桥区",
                        "parent_id": "411500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411521",
                        "area_name": "罗山县",
                        "parent_id": "411500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411522",
                        "area_name": "光山县",
                        "parent_id": "411500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411523",
                        "area_name": "新县",
                        "parent_id": "411500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411524",
                        "area_name": "商城县",
                        "parent_id": "411500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411525",
                        "area_name": "固始县",
                        "parent_id": "411500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411526",
                        "area_name": "潢川县",
                        "parent_id": "411500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411527",
                        "area_name": "淮滨县",
                        "parent_id": "411500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411528",
                        "area_name": "息县",
                        "parent_id": "411500",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "411600",
                "area_name": "周口市",
                "parent_id": "410000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "411601",
                        "area_name": "市辖区",
                        "parent_id": "411600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411602",
                        "area_name": "川汇区",
                        "parent_id": "411600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411621",
                        "area_name": "扶沟县",
                        "parent_id": "411600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411622",
                        "area_name": "西华县",
                        "parent_id": "411600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411623",
                        "area_name": "商水县",
                        "parent_id": "411600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411624",
                        "area_name": "沈丘县",
                        "parent_id": "411600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411625",
                        "area_name": "郸城县",
                        "parent_id": "411600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411626",
                        "area_name": "淮阳县",
                        "parent_id": "411600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411627",
                        "area_name": "太康县",
                        "parent_id": "411600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411628",
                        "area_name": "鹿邑县",
                        "parent_id": "411600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411681",
                        "area_name": "项城市",
                        "parent_id": "411600",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "411700",
                "area_name": "驻马店市",
                "parent_id": "410000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "411701",
                        "area_name": "市辖区",
                        "parent_id": "411700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411702",
                        "area_name": "驿城区",
                        "parent_id": "411700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411721",
                        "area_name": "西平县",
                        "parent_id": "411700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411722",
                        "area_name": "上蔡县",
                        "parent_id": "411700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411723",
                        "area_name": "平舆县",
                        "parent_id": "411700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411724",
                        "area_name": "正阳县",
                        "parent_id": "411700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411725",
                        "area_name": "确山县",
                        "parent_id": "411700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411726",
                        "area_name": "泌阳县",
                        "parent_id": "411700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411727",
                        "area_name": "汝南县",
                        "parent_id": "411700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411728",
                        "area_name": "遂平县",
                        "parent_id": "411700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "411729",
                        "area_name": "新蔡县",
                        "parent_id": "411700",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "419000",
                "area_name": "省直辖县级行政区划",
                "parent_id": "410000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "419001",
                        "area_name": "济源市",
                        "parent_id": "419000",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            }
        ]
    },
    {
        "area_id": "420000",
        "area_name": "湖北省",
        "parent_id": "0",
        "level": "1",
        "sub_area": [
            {
                "area_id": "420100",
                "area_name": "武汉市",
                "parent_id": "420000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "420101",
                        "area_name": "市辖区",
                        "parent_id": "420100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420102",
                        "area_name": "江岸区",
                        "parent_id": "420100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420103",
                        "area_name": "江汉区",
                        "parent_id": "420100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420104",
                        "area_name": "硚口区",
                        "parent_id": "420100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420105",
                        "area_name": "汉阳区",
                        "parent_id": "420100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420106",
                        "area_name": "武昌区",
                        "parent_id": "420100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420107",
                        "area_name": "青山区",
                        "parent_id": "420100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420111",
                        "area_name": "洪山区",
                        "parent_id": "420100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420112",
                        "area_name": "东西湖区",
                        "parent_id": "420100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420113",
                        "area_name": "汉南区",
                        "parent_id": "420100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420114",
                        "area_name": "蔡甸区",
                        "parent_id": "420100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420115",
                        "area_name": "江夏区",
                        "parent_id": "420100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420116",
                        "area_name": "黄陂区",
                        "parent_id": "420100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420117",
                        "area_name": "新洲区",
                        "parent_id": "420100",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "420200",
                "area_name": "黄石市",
                "parent_id": "420000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "420201",
                        "area_name": "市辖区",
                        "parent_id": "420200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420202",
                        "area_name": "黄石港区",
                        "parent_id": "420200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420203",
                        "area_name": "西塞山区",
                        "parent_id": "420200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420204",
                        "area_name": "下陆区",
                        "parent_id": "420200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420205",
                        "area_name": "铁山区",
                        "parent_id": "420200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420222",
                        "area_name": "阳新县",
                        "parent_id": "420200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420281",
                        "area_name": "大冶市",
                        "parent_id": "420200",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "420300",
                "area_name": "十堰市",
                "parent_id": "420000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "420301",
                        "area_name": "市辖区",
                        "parent_id": "420300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420302",
                        "area_name": "茅箭区",
                        "parent_id": "420300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420303",
                        "area_name": "张湾区",
                        "parent_id": "420300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420304",
                        "area_name": "郧阳区",
                        "parent_id": "420300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420322",
                        "area_name": "郧西县",
                        "parent_id": "420300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420323",
                        "area_name": "竹山县",
                        "parent_id": "420300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420324",
                        "area_name": "竹溪县",
                        "parent_id": "420300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420325",
                        "area_name": "房县",
                        "parent_id": "420300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420381",
                        "area_name": "丹江口市",
                        "parent_id": "420300",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "420500",
                "area_name": "宜昌市",
                "parent_id": "420000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "420501",
                        "area_name": "市辖区",
                        "parent_id": "420500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420502",
                        "area_name": "西陵区",
                        "parent_id": "420500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420503",
                        "area_name": "伍家岗区",
                        "parent_id": "420500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420504",
                        "area_name": "点军区",
                        "parent_id": "420500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420505",
                        "area_name": "猇亭区",
                        "parent_id": "420500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420506",
                        "area_name": "夷陵区",
                        "parent_id": "420500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420525",
                        "area_name": "远安县",
                        "parent_id": "420500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420526",
                        "area_name": "兴山县",
                        "parent_id": "420500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420527",
                        "area_name": "秭归县",
                        "parent_id": "420500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420528",
                        "area_name": "长阳土家族自治县",
                        "parent_id": "420500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420529",
                        "area_name": "五峰土家族自治县",
                        "parent_id": "420500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420581",
                        "area_name": "宜都市",
                        "parent_id": "420500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420582",
                        "area_name": "当阳市",
                        "parent_id": "420500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420583",
                        "area_name": "枝江市",
                        "parent_id": "420500",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "420600",
                "area_name": "襄阳市",
                "parent_id": "420000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "420601",
                        "area_name": "市辖区",
                        "parent_id": "420600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420602",
                        "area_name": "襄城区",
                        "parent_id": "420600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420606",
                        "area_name": "樊城区",
                        "parent_id": "420600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420607",
                        "area_name": "襄州区",
                        "parent_id": "420600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420624",
                        "area_name": "南漳县",
                        "parent_id": "420600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420625",
                        "area_name": "谷城县",
                        "parent_id": "420600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420626",
                        "area_name": "保康县",
                        "parent_id": "420600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420682",
                        "area_name": "老河口市",
                        "parent_id": "420600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420683",
                        "area_name": "枣阳市",
                        "parent_id": "420600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420684",
                        "area_name": "宜城市",
                        "parent_id": "420600",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "420700",
                "area_name": "鄂州市",
                "parent_id": "420000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "420701",
                        "area_name": "市辖区",
                        "parent_id": "420700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420702",
                        "area_name": "梁子湖区",
                        "parent_id": "420700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420703",
                        "area_name": "华容区",
                        "parent_id": "420700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420704",
                        "area_name": "鄂城区",
                        "parent_id": "420700",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "420800",
                "area_name": "荆门市",
                "parent_id": "420000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "420801",
                        "area_name": "市辖区",
                        "parent_id": "420800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420802",
                        "area_name": "东宝区",
                        "parent_id": "420800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420804",
                        "area_name": "掇刀区",
                        "parent_id": "420800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420821",
                        "area_name": "京山县",
                        "parent_id": "420800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420822",
                        "area_name": "沙洋县",
                        "parent_id": "420800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420881",
                        "area_name": "钟祥市",
                        "parent_id": "420800",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "420900",
                "area_name": "孝感市",
                "parent_id": "420000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "420901",
                        "area_name": "市辖区",
                        "parent_id": "420900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420902",
                        "area_name": "孝南区",
                        "parent_id": "420900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420921",
                        "area_name": "孝昌县",
                        "parent_id": "420900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420922",
                        "area_name": "大悟县",
                        "parent_id": "420900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420923",
                        "area_name": "云梦县",
                        "parent_id": "420900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420981",
                        "area_name": "应城市",
                        "parent_id": "420900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420982",
                        "area_name": "安陆市",
                        "parent_id": "420900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "420984",
                        "area_name": "汉川市",
                        "parent_id": "420900",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "421000",
                "area_name": "荆州市",
                "parent_id": "420000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "421001",
                        "area_name": "市辖区",
                        "parent_id": "421000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "421002",
                        "area_name": "沙市区",
                        "parent_id": "421000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "421003",
                        "area_name": "荆州区",
                        "parent_id": "421000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "421022",
                        "area_name": "公安县",
                        "parent_id": "421000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "421023",
                        "area_name": "监利县",
                        "parent_id": "421000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "421024",
                        "area_name": "江陵县",
                        "parent_id": "421000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "421081",
                        "area_name": "石首市",
                        "parent_id": "421000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "421083",
                        "area_name": "洪湖市",
                        "parent_id": "421000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "421087",
                        "area_name": "松滋市",
                        "parent_id": "421000",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "421100",
                "area_name": "黄冈市",
                "parent_id": "420000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "421101",
                        "area_name": "市辖区",
                        "parent_id": "421100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "421102",
                        "area_name": "黄州区",
                        "parent_id": "421100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "421121",
                        "area_name": "团风县",
                        "parent_id": "421100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "421122",
                        "area_name": "红安县",
                        "parent_id": "421100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "421123",
                        "area_name": "罗田县",
                        "parent_id": "421100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "421124",
                        "area_name": "英山县",
                        "parent_id": "421100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "421125",
                        "area_name": "浠水县",
                        "parent_id": "421100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "421126",
                        "area_name": "蕲春县",
                        "parent_id": "421100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "421127",
                        "area_name": "黄梅县",
                        "parent_id": "421100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "421181",
                        "area_name": "麻城市",
                        "parent_id": "421100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "421182",
                        "area_name": "武穴市",
                        "parent_id": "421100",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "421200",
                "area_name": "咸宁市",
                "parent_id": "420000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "421201",
                        "area_name": "市辖区",
                        "parent_id": "421200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "421202",
                        "area_name": "咸安区",
                        "parent_id": "421200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "421221",
                        "area_name": "嘉鱼县",
                        "parent_id": "421200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "421222",
                        "area_name": "通城县",
                        "parent_id": "421200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "421223",
                        "area_name": "崇阳县",
                        "parent_id": "421200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "421224",
                        "area_name": "通山县",
                        "parent_id": "421200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "421281",
                        "area_name": "赤壁市",
                        "parent_id": "421200",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "421300",
                "area_name": "随州市",
                "parent_id": "420000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "421301",
                        "area_name": "市辖区",
                        "parent_id": "421300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "421303",
                        "area_name": "曾都区",
                        "parent_id": "421300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "421321",
                        "area_name": "随县",
                        "parent_id": "421300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "421381",
                        "area_name": "广水市",
                        "parent_id": "421300",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "422800",
                "area_name": "恩施土家族苗族自治州",
                "parent_id": "420000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "422801",
                        "area_name": "恩施市",
                        "parent_id": "422800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "422802",
                        "area_name": "利川市",
                        "parent_id": "422800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "422822",
                        "area_name": "建始县",
                        "parent_id": "422800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "422823",
                        "area_name": "巴东县",
                        "parent_id": "422800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "422825",
                        "area_name": "宣恩县",
                        "parent_id": "422800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "422826",
                        "area_name": "咸丰县",
                        "parent_id": "422800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "422827",
                        "area_name": "来凤县",
                        "parent_id": "422800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "422828",
                        "area_name": "鹤峰县",
                        "parent_id": "422800",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "429000",
                "area_name": "省直辖县级行政区划",
                "parent_id": "420000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "429004",
                        "area_name": "仙桃市",
                        "parent_id": "429000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "429005",
                        "area_name": "潜江市",
                        "parent_id": "429000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "429006",
                        "area_name": "天门市",
                        "parent_id": "429000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "429021",
                        "area_name": "神农架林区",
                        "parent_id": "429000",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            }
        ]
    },
    {
        "area_id": "430000",
        "area_name": "湖南省",
        "parent_id": "0",
        "level": "1",
        "sub_area": [
            {
                "area_id": "430100",
                "area_name": "长沙市",
                "parent_id": "430000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "430101",
                        "area_name": "市辖区",
                        "parent_id": "430100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430102",
                        "area_name": "芙蓉区",
                        "parent_id": "430100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430103",
                        "area_name": "天心区",
                        "parent_id": "430100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430104",
                        "area_name": "岳麓区",
                        "parent_id": "430100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430105",
                        "area_name": "开福区",
                        "parent_id": "430100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430111",
                        "area_name": "雨花区",
                        "parent_id": "430100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430112",
                        "area_name": "望城区",
                        "parent_id": "430100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430121",
                        "area_name": "长沙县",
                        "parent_id": "430100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430124",
                        "area_name": "宁乡县",
                        "parent_id": "430100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430181",
                        "area_name": "浏阳市",
                        "parent_id": "430100",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "430200",
                "area_name": "株洲市",
                "parent_id": "430000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "430201",
                        "area_name": "市辖区",
                        "parent_id": "430200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430202",
                        "area_name": "荷塘区",
                        "parent_id": "430200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430203",
                        "area_name": "芦淞区",
                        "parent_id": "430200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430204",
                        "area_name": "石峰区",
                        "parent_id": "430200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430211",
                        "area_name": "天元区",
                        "parent_id": "430200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430221",
                        "area_name": "株洲县",
                        "parent_id": "430200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430223",
                        "area_name": "攸县",
                        "parent_id": "430200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430224",
                        "area_name": "茶陵县",
                        "parent_id": "430200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430225",
                        "area_name": "炎陵县",
                        "parent_id": "430200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430281",
                        "area_name": "醴陵市",
                        "parent_id": "430200",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "430300",
                "area_name": "湘潭市",
                "parent_id": "430000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "430301",
                        "area_name": "市辖区",
                        "parent_id": "430300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430302",
                        "area_name": "雨湖区",
                        "parent_id": "430300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430304",
                        "area_name": "岳塘区",
                        "parent_id": "430300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430321",
                        "area_name": "湘潭县",
                        "parent_id": "430300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430381",
                        "area_name": "湘乡市",
                        "parent_id": "430300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430382",
                        "area_name": "韶山市",
                        "parent_id": "430300",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "430400",
                "area_name": "衡阳市",
                "parent_id": "430000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "430401",
                        "area_name": "市辖区",
                        "parent_id": "430400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430405",
                        "area_name": "珠晖区",
                        "parent_id": "430400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430406",
                        "area_name": "雁峰区",
                        "parent_id": "430400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430407",
                        "area_name": "石鼓区",
                        "parent_id": "430400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430408",
                        "area_name": "蒸湘区",
                        "parent_id": "430400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430412",
                        "area_name": "南岳区",
                        "parent_id": "430400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430421",
                        "area_name": "衡阳县",
                        "parent_id": "430400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430422",
                        "area_name": "衡南县",
                        "parent_id": "430400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430423",
                        "area_name": "衡山县",
                        "parent_id": "430400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430424",
                        "area_name": "衡东县",
                        "parent_id": "430400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430426",
                        "area_name": "祁东县",
                        "parent_id": "430400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430481",
                        "area_name": "耒阳市",
                        "parent_id": "430400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430482",
                        "area_name": "常宁市",
                        "parent_id": "430400",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "430500",
                "area_name": "邵阳市",
                "parent_id": "430000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "430501",
                        "area_name": "市辖区",
                        "parent_id": "430500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430502",
                        "area_name": "双清区",
                        "parent_id": "430500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430503",
                        "area_name": "大祥区",
                        "parent_id": "430500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430511",
                        "area_name": "北塔区",
                        "parent_id": "430500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430521",
                        "area_name": "邵东县",
                        "parent_id": "430500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430522",
                        "area_name": "新邵县",
                        "parent_id": "430500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430523",
                        "area_name": "邵阳县",
                        "parent_id": "430500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430524",
                        "area_name": "隆回县",
                        "parent_id": "430500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430525",
                        "area_name": "洞口县",
                        "parent_id": "430500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430527",
                        "area_name": "绥宁县",
                        "parent_id": "430500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430528",
                        "area_name": "新宁县",
                        "parent_id": "430500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430529",
                        "area_name": "城步苗族自治县",
                        "parent_id": "430500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430581",
                        "area_name": "武冈市",
                        "parent_id": "430500",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "430600",
                "area_name": "岳阳市",
                "parent_id": "430000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "430601",
                        "area_name": "市辖区",
                        "parent_id": "430600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430602",
                        "area_name": "岳阳楼区",
                        "parent_id": "430600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430603",
                        "area_name": "云溪区",
                        "parent_id": "430600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430611",
                        "area_name": "君山区",
                        "parent_id": "430600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430621",
                        "area_name": "岳阳县",
                        "parent_id": "430600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430623",
                        "area_name": "华容县",
                        "parent_id": "430600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430624",
                        "area_name": "湘阴县",
                        "parent_id": "430600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430626",
                        "area_name": "平江县",
                        "parent_id": "430600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430681",
                        "area_name": "汨罗市",
                        "parent_id": "430600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430682",
                        "area_name": "临湘市",
                        "parent_id": "430600",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "430700",
                "area_name": "常德市",
                "parent_id": "430000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "430701",
                        "area_name": "市辖区",
                        "parent_id": "430700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430702",
                        "area_name": "武陵区",
                        "parent_id": "430700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430703",
                        "area_name": "鼎城区",
                        "parent_id": "430700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430721",
                        "area_name": "安乡县",
                        "parent_id": "430700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430722",
                        "area_name": "汉寿县",
                        "parent_id": "430700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430723",
                        "area_name": "澧县",
                        "parent_id": "430700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430724",
                        "area_name": "临澧县",
                        "parent_id": "430700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430725",
                        "area_name": "桃源县",
                        "parent_id": "430700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430726",
                        "area_name": "石门县",
                        "parent_id": "430700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430781",
                        "area_name": "津市市",
                        "parent_id": "430700",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "430800",
                "area_name": "张家界市",
                "parent_id": "430000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "430801",
                        "area_name": "市辖区",
                        "parent_id": "430800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430802",
                        "area_name": "永定区",
                        "parent_id": "430800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430811",
                        "area_name": "武陵源区",
                        "parent_id": "430800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430821",
                        "area_name": "慈利县",
                        "parent_id": "430800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430822",
                        "area_name": "桑植县",
                        "parent_id": "430800",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "430900",
                "area_name": "益阳市",
                "parent_id": "430000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "430901",
                        "area_name": "市辖区",
                        "parent_id": "430900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430902",
                        "area_name": "资阳区",
                        "parent_id": "430900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430903",
                        "area_name": "赫山区",
                        "parent_id": "430900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430921",
                        "area_name": "南县",
                        "parent_id": "430900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430922",
                        "area_name": "桃江县",
                        "parent_id": "430900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430923",
                        "area_name": "安化县",
                        "parent_id": "430900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "430981",
                        "area_name": "沅江市",
                        "parent_id": "430900",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "431000",
                "area_name": "郴州市",
                "parent_id": "430000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "431001",
                        "area_name": "市辖区",
                        "parent_id": "431000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "431002",
                        "area_name": "北湖区",
                        "parent_id": "431000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "431003",
                        "area_name": "苏仙区",
                        "parent_id": "431000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "431021",
                        "area_name": "桂阳县",
                        "parent_id": "431000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "431022",
                        "area_name": "宜章县",
                        "parent_id": "431000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "431023",
                        "area_name": "永兴县",
                        "parent_id": "431000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "431024",
                        "area_name": "嘉禾县",
                        "parent_id": "431000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "431025",
                        "area_name": "临武县",
                        "parent_id": "431000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "431026",
                        "area_name": "汝城县",
                        "parent_id": "431000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "431027",
                        "area_name": "桂东县",
                        "parent_id": "431000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "431028",
                        "area_name": "安仁县",
                        "parent_id": "431000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "431081",
                        "area_name": "资兴市",
                        "parent_id": "431000",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "431100",
                "area_name": "永州市",
                "parent_id": "430000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "431101",
                        "area_name": "市辖区",
                        "parent_id": "431100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "431102",
                        "area_name": "零陵区",
                        "parent_id": "431100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "431103",
                        "area_name": "冷水滩区",
                        "parent_id": "431100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "431121",
                        "area_name": "祁阳县",
                        "parent_id": "431100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "431122",
                        "area_name": "东安县",
                        "parent_id": "431100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "431123",
                        "area_name": "双牌县",
                        "parent_id": "431100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "431124",
                        "area_name": "道县",
                        "parent_id": "431100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "431125",
                        "area_name": "江永县",
                        "parent_id": "431100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "431126",
                        "area_name": "宁远县",
                        "parent_id": "431100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "431127",
                        "area_name": "蓝山县",
                        "parent_id": "431100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "431128",
                        "area_name": "新田县",
                        "parent_id": "431100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "431129",
                        "area_name": "江华瑶族自治县",
                        "parent_id": "431100",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "431200",
                "area_name": "怀化市",
                "parent_id": "430000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "431201",
                        "area_name": "市辖区",
                        "parent_id": "431200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "431202",
                        "area_name": "鹤城区",
                        "parent_id": "431200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "431221",
                        "area_name": "中方县",
                        "parent_id": "431200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "431222",
                        "area_name": "沅陵县",
                        "parent_id": "431200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "431223",
                        "area_name": "辰溪县",
                        "parent_id": "431200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "431224",
                        "area_name": "溆浦县",
                        "parent_id": "431200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "431225",
                        "area_name": "会同县",
                        "parent_id": "431200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "431226",
                        "area_name": "麻阳苗族自治县",
                        "parent_id": "431200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "431227",
                        "area_name": "新晃侗族自治县",
                        "parent_id": "431200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "431228",
                        "area_name": "芷江侗族自治县",
                        "parent_id": "431200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "431229",
                        "area_name": "靖州苗族侗族自治县",
                        "parent_id": "431200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "431230",
                        "area_name": "通道侗族自治县",
                        "parent_id": "431200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "431281",
                        "area_name": "洪江市",
                        "parent_id": "431200",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "431300",
                "area_name": "娄底市",
                "parent_id": "430000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "431301",
                        "area_name": "市辖区",
                        "parent_id": "431300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "431302",
                        "area_name": "娄星区",
                        "parent_id": "431300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "431321",
                        "area_name": "双峰县",
                        "parent_id": "431300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "431322",
                        "area_name": "新化县",
                        "parent_id": "431300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "431381",
                        "area_name": "冷水江市",
                        "parent_id": "431300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "431382",
                        "area_name": "涟源市",
                        "parent_id": "431300",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "433100",
                "area_name": "湘西土家族苗族自治州",
                "parent_id": "430000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "433101",
                        "area_name": "吉首市",
                        "parent_id": "433100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "433122",
                        "area_name": "泸溪县",
                        "parent_id": "433100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "433123",
                        "area_name": "凤凰县",
                        "parent_id": "433100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "433124",
                        "area_name": "花垣县",
                        "parent_id": "433100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "433125",
                        "area_name": "保靖县",
                        "parent_id": "433100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "433126",
                        "area_name": "古丈县",
                        "parent_id": "433100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "433127",
                        "area_name": "永顺县",
                        "parent_id": "433100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "433130",
                        "area_name": "龙山县",
                        "parent_id": "433100",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            }
        ]
    },
    {
        "area_id": "440000",
        "area_name": "广东省",
        "parent_id": "0",
        "level": "1",
        "sub_area": [
            {
                "area_id": "440100",
                "area_name": "广州市",
                "parent_id": "440000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "440101",
                        "area_name": "市辖区",
                        "parent_id": "440100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440103",
                        "area_name": "荔湾区",
                        "parent_id": "440100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440104",
                        "area_name": "越秀区",
                        "parent_id": "440100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440105",
                        "area_name": "海珠区",
                        "parent_id": "440100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440106",
                        "area_name": "天河区",
                        "parent_id": "440100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440111",
                        "area_name": "白云区",
                        "parent_id": "440100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440112",
                        "area_name": "黄埔区",
                        "parent_id": "440100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440113",
                        "area_name": "番禺区",
                        "parent_id": "440100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440114",
                        "area_name": "花都区",
                        "parent_id": "440100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440115",
                        "area_name": "南沙区",
                        "parent_id": "440100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440117",
                        "area_name": "从化区",
                        "parent_id": "440100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440118",
                        "area_name": "增城区",
                        "parent_id": "440100",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "440200",
                "area_name": "韶关市",
                "parent_id": "440000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "440201",
                        "area_name": "市辖区",
                        "parent_id": "440200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440203",
                        "area_name": "武江区",
                        "parent_id": "440200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440204",
                        "area_name": "浈江区",
                        "parent_id": "440200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440205",
                        "area_name": "曲江区",
                        "parent_id": "440200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440222",
                        "area_name": "始兴县",
                        "parent_id": "440200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440224",
                        "area_name": "仁化县",
                        "parent_id": "440200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440229",
                        "area_name": "翁源县",
                        "parent_id": "440200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440232",
                        "area_name": "乳源瑶族自治县",
                        "parent_id": "440200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440233",
                        "area_name": "新丰县",
                        "parent_id": "440200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440281",
                        "area_name": "乐昌市",
                        "parent_id": "440200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440282",
                        "area_name": "南雄市",
                        "parent_id": "440200",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "440300",
                "area_name": "深圳市",
                "parent_id": "440000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "440301",
                        "area_name": "市辖区",
                        "parent_id": "440300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440303",
                        "area_name": "罗湖区",
                        "parent_id": "440300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440304",
                        "area_name": "福田区",
                        "parent_id": "440300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440305",
                        "area_name": "南山区",
                        "parent_id": "440300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440306",
                        "area_name": "宝安区",
                        "parent_id": "440300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440307",
                        "area_name": "龙岗区",
                        "parent_id": "440300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440308",
                        "area_name": "盐田区",
                        "parent_id": "440300",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "440400",
                "area_name": "珠海市",
                "parent_id": "440000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "440401",
                        "area_name": "市辖区",
                        "parent_id": "440400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440402",
                        "area_name": "香洲区",
                        "parent_id": "440400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440403",
                        "area_name": "斗门区",
                        "parent_id": "440400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440404",
                        "area_name": "金湾区",
                        "parent_id": "440400",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "440500",
                "area_name": "汕头市",
                "parent_id": "440000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "440501",
                        "area_name": "市辖区",
                        "parent_id": "440500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440507",
                        "area_name": "龙湖区",
                        "parent_id": "440500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440511",
                        "area_name": "金平区",
                        "parent_id": "440500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440512",
                        "area_name": "濠江区",
                        "parent_id": "440500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440513",
                        "area_name": "潮阳区",
                        "parent_id": "440500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440514",
                        "area_name": "潮南区",
                        "parent_id": "440500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440515",
                        "area_name": "澄海区",
                        "parent_id": "440500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440523",
                        "area_name": "南澳县",
                        "parent_id": "440500",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "440600",
                "area_name": "佛山市",
                "parent_id": "440000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "440601",
                        "area_name": "市辖区",
                        "parent_id": "440600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440604",
                        "area_name": "禅城区",
                        "parent_id": "440600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440605",
                        "area_name": "南海区",
                        "parent_id": "440600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440606",
                        "area_name": "顺德区",
                        "parent_id": "440600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440607",
                        "area_name": "三水区",
                        "parent_id": "440600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440608",
                        "area_name": "高明区",
                        "parent_id": "440600",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "440700",
                "area_name": "江门市",
                "parent_id": "440000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "440701",
                        "area_name": "市辖区",
                        "parent_id": "440700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440703",
                        "area_name": "蓬江区",
                        "parent_id": "440700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440704",
                        "area_name": "江海区",
                        "parent_id": "440700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440705",
                        "area_name": "新会区",
                        "parent_id": "440700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440781",
                        "area_name": "台山市",
                        "parent_id": "440700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440783",
                        "area_name": "开平市",
                        "parent_id": "440700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440784",
                        "area_name": "鹤山市",
                        "parent_id": "440700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440785",
                        "area_name": "恩平市",
                        "parent_id": "440700",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "440800",
                "area_name": "湛江市",
                "parent_id": "440000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "440801",
                        "area_name": "市辖区",
                        "parent_id": "440800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440802",
                        "area_name": "赤坎区",
                        "parent_id": "440800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440803",
                        "area_name": "霞山区",
                        "parent_id": "440800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440804",
                        "area_name": "坡头区",
                        "parent_id": "440800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440811",
                        "area_name": "麻章区",
                        "parent_id": "440800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440823",
                        "area_name": "遂溪县",
                        "parent_id": "440800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440825",
                        "area_name": "徐闻县",
                        "parent_id": "440800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440881",
                        "area_name": "廉江市",
                        "parent_id": "440800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440882",
                        "area_name": "雷州市",
                        "parent_id": "440800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440883",
                        "area_name": "吴川市",
                        "parent_id": "440800",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "440900",
                "area_name": "茂名市",
                "parent_id": "440000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "440901",
                        "area_name": "市辖区",
                        "parent_id": "440900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440902",
                        "area_name": "茂南区",
                        "parent_id": "440900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440904",
                        "area_name": "电白区",
                        "parent_id": "440900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440981",
                        "area_name": "高州市",
                        "parent_id": "440900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440982",
                        "area_name": "化州市",
                        "parent_id": "440900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "440983",
                        "area_name": "信宜市",
                        "parent_id": "440900",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "441200",
                "area_name": "肇庆市",
                "parent_id": "440000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "441201",
                        "area_name": "市辖区",
                        "parent_id": "441200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "441202",
                        "area_name": "端州区",
                        "parent_id": "441200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "441203",
                        "area_name": "鼎湖区",
                        "parent_id": "441200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "441204",
                        "area_name": "高要区",
                        "parent_id": "441200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "441223",
                        "area_name": "广宁县",
                        "parent_id": "441200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "441224",
                        "area_name": "怀集县",
                        "parent_id": "441200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "441225",
                        "area_name": "封开县",
                        "parent_id": "441200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "441226",
                        "area_name": "德庆县",
                        "parent_id": "441200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "441284",
                        "area_name": "四会市",
                        "parent_id": "441200",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "441300",
                "area_name": "惠州市",
                "parent_id": "440000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "441301",
                        "area_name": "市辖区",
                        "parent_id": "441300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "441302",
                        "area_name": "惠城区",
                        "parent_id": "441300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "441303",
                        "area_name": "惠阳区",
                        "parent_id": "441300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "441322",
                        "area_name": "博罗县",
                        "parent_id": "441300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "441323",
                        "area_name": "惠东县",
                        "parent_id": "441300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "441324",
                        "area_name": "龙门县",
                        "parent_id": "441300",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "441400",
                "area_name": "梅州市",
                "parent_id": "440000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "441401",
                        "area_name": "市辖区",
                        "parent_id": "441400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "441402",
                        "area_name": "梅江区",
                        "parent_id": "441400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "441403",
                        "area_name": "梅县区",
                        "parent_id": "441400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "441422",
                        "area_name": "大埔县",
                        "parent_id": "441400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "441423",
                        "area_name": "丰顺县",
                        "parent_id": "441400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "441424",
                        "area_name": "五华县",
                        "parent_id": "441400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "441426",
                        "area_name": "平远县",
                        "parent_id": "441400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "441427",
                        "area_name": "蕉岭县",
                        "parent_id": "441400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "441481",
                        "area_name": "兴宁市",
                        "parent_id": "441400",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "441500",
                "area_name": "汕尾市",
                "parent_id": "440000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "441501",
                        "area_name": "市辖区",
                        "parent_id": "441500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "441502",
                        "area_name": "城区",
                        "parent_id": "441500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "441521",
                        "area_name": "海丰县",
                        "parent_id": "441500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "441523",
                        "area_name": "陆河县",
                        "parent_id": "441500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "441581",
                        "area_name": "陆丰市",
                        "parent_id": "441500",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "441600",
                "area_name": "河源市",
                "parent_id": "440000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "441601",
                        "area_name": "市辖区",
                        "parent_id": "441600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "441602",
                        "area_name": "源城区",
                        "parent_id": "441600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "441621",
                        "area_name": "紫金县",
                        "parent_id": "441600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "441622",
                        "area_name": "龙川县",
                        "parent_id": "441600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "441623",
                        "area_name": "连平县",
                        "parent_id": "441600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "441624",
                        "area_name": "和平县",
                        "parent_id": "441600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "441625",
                        "area_name": "东源县",
                        "parent_id": "441600",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "441700",
                "area_name": "阳江市",
                "parent_id": "440000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "441701",
                        "area_name": "市辖区",
                        "parent_id": "441700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "441702",
                        "area_name": "江城区",
                        "parent_id": "441700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "441704",
                        "area_name": "阳东区",
                        "parent_id": "441700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "441721",
                        "area_name": "阳西县",
                        "parent_id": "441700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "441781",
                        "area_name": "阳春市",
                        "parent_id": "441700",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "441800",
                "area_name": "清远市",
                "parent_id": "440000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "441801",
                        "area_name": "市辖区",
                        "parent_id": "441800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "441802",
                        "area_name": "清城区",
                        "parent_id": "441800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "441803",
                        "area_name": "清新区",
                        "parent_id": "441800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "441821",
                        "area_name": "佛冈县",
                        "parent_id": "441800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "441823",
                        "area_name": "阳山县",
                        "parent_id": "441800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "441825",
                        "area_name": "连山壮族瑶族自治县",
                        "parent_id": "441800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "441826",
                        "area_name": "连南瑶族自治县",
                        "parent_id": "441800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "441881",
                        "area_name": "英德市",
                        "parent_id": "441800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "441882",
                        "area_name": "连州市",
                        "parent_id": "441800",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "441900",
                "area_name": "东莞市",
                "parent_id": "440000",
                "level": "2",
                "sub_area": []
            },
            {
                "area_id": "442000",
                "area_name": "中山市",
                "parent_id": "440000",
                "level": "2",
                "sub_area": []
            },
            {
                "area_id": "445100",
                "area_name": "潮州市",
                "parent_id": "440000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "445101",
                        "area_name": "市辖区",
                        "parent_id": "445100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "445102",
                        "area_name": "湘桥区",
                        "parent_id": "445100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "445103",
                        "area_name": "潮安区",
                        "parent_id": "445100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "445122",
                        "area_name": "饶平县",
                        "parent_id": "445100",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "445200",
                "area_name": "揭阳市",
                "parent_id": "440000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "445201",
                        "area_name": "市辖区",
                        "parent_id": "445200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "445202",
                        "area_name": "榕城区",
                        "parent_id": "445200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "445203",
                        "area_name": "揭东区",
                        "parent_id": "445200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "445222",
                        "area_name": "揭西县",
                        "parent_id": "445200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "445224",
                        "area_name": "惠来县",
                        "parent_id": "445200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "445281",
                        "area_name": "普宁市",
                        "parent_id": "445200",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "445300",
                "area_name": "云浮市",
                "parent_id": "440000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "445301",
                        "area_name": "市辖区",
                        "parent_id": "445300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "445302",
                        "area_name": "云城区",
                        "parent_id": "445300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "445303",
                        "area_name": "云安区",
                        "parent_id": "445300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "445321",
                        "area_name": "新兴县",
                        "parent_id": "445300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "445322",
                        "area_name": "郁南县",
                        "parent_id": "445300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "445381",
                        "area_name": "罗定市",
                        "parent_id": "445300",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            }
        ]
    },
    {
        "area_id": "450000",
        "area_name": "广西壮族自治区",
        "parent_id": "0",
        "level": "1",
        "sub_area": [
            {
                "area_id": "450100",
                "area_name": "南宁市",
                "parent_id": "450000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "450101",
                        "area_name": "市辖区",
                        "parent_id": "450100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450102",
                        "area_name": "兴宁区",
                        "parent_id": "450100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450103",
                        "area_name": "青秀区",
                        "parent_id": "450100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450105",
                        "area_name": "江南区",
                        "parent_id": "450100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450107",
                        "area_name": "西乡塘区",
                        "parent_id": "450100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450108",
                        "area_name": "良庆区",
                        "parent_id": "450100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450109",
                        "area_name": "邕宁区",
                        "parent_id": "450100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450110",
                        "area_name": "武鸣区",
                        "parent_id": "450100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450123",
                        "area_name": "隆安县",
                        "parent_id": "450100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450124",
                        "area_name": "马山县",
                        "parent_id": "450100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450125",
                        "area_name": "上林县",
                        "parent_id": "450100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450126",
                        "area_name": "宾阳县",
                        "parent_id": "450100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450127",
                        "area_name": "横县",
                        "parent_id": "450100",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "450200",
                "area_name": "柳州市",
                "parent_id": "450000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "450201",
                        "area_name": "市辖区",
                        "parent_id": "450200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450202",
                        "area_name": "城中区",
                        "parent_id": "450200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450203",
                        "area_name": "鱼峰区",
                        "parent_id": "450200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450204",
                        "area_name": "柳南区",
                        "parent_id": "450200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450205",
                        "area_name": "柳北区",
                        "parent_id": "450200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450206",
                        "area_name": "柳江区",
                        "parent_id": "450200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450222",
                        "area_name": "柳城县",
                        "parent_id": "450200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450223",
                        "area_name": "鹿寨县",
                        "parent_id": "450200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450224",
                        "area_name": "融安县",
                        "parent_id": "450200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450225",
                        "area_name": "融水苗族自治县",
                        "parent_id": "450200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450226",
                        "area_name": "三江侗族自治县",
                        "parent_id": "450200",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "450300",
                "area_name": "桂林市",
                "parent_id": "450000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "450301",
                        "area_name": "市辖区",
                        "parent_id": "450300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450302",
                        "area_name": "秀峰区",
                        "parent_id": "450300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450303",
                        "area_name": "叠彩区",
                        "parent_id": "450300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450304",
                        "area_name": "象山区",
                        "parent_id": "450300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450305",
                        "area_name": "七星区",
                        "parent_id": "450300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450311",
                        "area_name": "雁山区",
                        "parent_id": "450300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450312",
                        "area_name": "临桂区",
                        "parent_id": "450300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450321",
                        "area_name": "阳朔县",
                        "parent_id": "450300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450323",
                        "area_name": "灵川县",
                        "parent_id": "450300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450324",
                        "area_name": "全州县",
                        "parent_id": "450300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450325",
                        "area_name": "兴安县",
                        "parent_id": "450300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450326",
                        "area_name": "永福县",
                        "parent_id": "450300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450327",
                        "area_name": "灌阳县",
                        "parent_id": "450300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450328",
                        "area_name": "龙胜各族自治县",
                        "parent_id": "450300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450329",
                        "area_name": "资源县",
                        "parent_id": "450300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450330",
                        "area_name": "平乐县",
                        "parent_id": "450300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450331",
                        "area_name": "荔浦县",
                        "parent_id": "450300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450332",
                        "area_name": "恭城瑶族自治县",
                        "parent_id": "450300",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "450400",
                "area_name": "梧州市",
                "parent_id": "450000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "450401",
                        "area_name": "市辖区",
                        "parent_id": "450400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450403",
                        "area_name": "万秀区",
                        "parent_id": "450400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450405",
                        "area_name": "长洲区",
                        "parent_id": "450400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450406",
                        "area_name": "龙圩区",
                        "parent_id": "450400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450421",
                        "area_name": "苍梧县",
                        "parent_id": "450400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450422",
                        "area_name": "藤县",
                        "parent_id": "450400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450423",
                        "area_name": "蒙山县",
                        "parent_id": "450400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450481",
                        "area_name": "岑溪市",
                        "parent_id": "450400",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "450500",
                "area_name": "北海市",
                "parent_id": "450000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "450501",
                        "area_name": "市辖区",
                        "parent_id": "450500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450502",
                        "area_name": "海城区",
                        "parent_id": "450500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450503",
                        "area_name": "银海区",
                        "parent_id": "450500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450512",
                        "area_name": "铁山港区",
                        "parent_id": "450500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450521",
                        "area_name": "合浦县",
                        "parent_id": "450500",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "450600",
                "area_name": "防城港市",
                "parent_id": "450000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "450601",
                        "area_name": "市辖区",
                        "parent_id": "450600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450602",
                        "area_name": "港口区",
                        "parent_id": "450600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450603",
                        "area_name": "防城区",
                        "parent_id": "450600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450621",
                        "area_name": "上思县",
                        "parent_id": "450600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450681",
                        "area_name": "东兴市",
                        "parent_id": "450600",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "450700",
                "area_name": "钦州市",
                "parent_id": "450000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "450701",
                        "area_name": "市辖区",
                        "parent_id": "450700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450702",
                        "area_name": "钦南区",
                        "parent_id": "450700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450703",
                        "area_name": "钦北区",
                        "parent_id": "450700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450721",
                        "area_name": "灵山县",
                        "parent_id": "450700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450722",
                        "area_name": "浦北县",
                        "parent_id": "450700",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "450800",
                "area_name": "贵港市",
                "parent_id": "450000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "450801",
                        "area_name": "市辖区",
                        "parent_id": "450800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450802",
                        "area_name": "港北区",
                        "parent_id": "450800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450803",
                        "area_name": "港南区",
                        "parent_id": "450800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450804",
                        "area_name": "覃塘区",
                        "parent_id": "450800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450821",
                        "area_name": "平南县",
                        "parent_id": "450800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450881",
                        "area_name": "桂平市",
                        "parent_id": "450800",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "450900",
                "area_name": "玉林市",
                "parent_id": "450000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "450901",
                        "area_name": "市辖区",
                        "parent_id": "450900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450902",
                        "area_name": "玉州区",
                        "parent_id": "450900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450903",
                        "area_name": "福绵区",
                        "parent_id": "450900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450921",
                        "area_name": "容县",
                        "parent_id": "450900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450922",
                        "area_name": "陆川县",
                        "parent_id": "450900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450923",
                        "area_name": "博白县",
                        "parent_id": "450900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450924",
                        "area_name": "兴业县",
                        "parent_id": "450900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "450981",
                        "area_name": "北流市",
                        "parent_id": "450900",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "451000",
                "area_name": "百色市",
                "parent_id": "450000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "451001",
                        "area_name": "市辖区",
                        "parent_id": "451000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "451002",
                        "area_name": "右江区",
                        "parent_id": "451000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "451021",
                        "area_name": "田阳县",
                        "parent_id": "451000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "451022",
                        "area_name": "田东县",
                        "parent_id": "451000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "451023",
                        "area_name": "平果县",
                        "parent_id": "451000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "451024",
                        "area_name": "德保县",
                        "parent_id": "451000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "451026",
                        "area_name": "那坡县",
                        "parent_id": "451000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "451027",
                        "area_name": "凌云县",
                        "parent_id": "451000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "451028",
                        "area_name": "乐业县",
                        "parent_id": "451000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "451029",
                        "area_name": "田林县",
                        "parent_id": "451000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "451030",
                        "area_name": "西林县",
                        "parent_id": "451000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "451031",
                        "area_name": "隆林各族自治县",
                        "parent_id": "451000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "451081",
                        "area_name": "靖西市",
                        "parent_id": "451000",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "451100",
                "area_name": "贺州市",
                "parent_id": "450000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "451101",
                        "area_name": "市辖区",
                        "parent_id": "451100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "451102",
                        "area_name": "八步区",
                        "parent_id": "451100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "451103",
                        "area_name": "平桂区",
                        "parent_id": "451100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "451121",
                        "area_name": "昭平县",
                        "parent_id": "451100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "451122",
                        "area_name": "钟山县",
                        "parent_id": "451100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "451123",
                        "area_name": "富川瑶族自治县",
                        "parent_id": "451100",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "451200",
                "area_name": "河池市",
                "parent_id": "450000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "451201",
                        "area_name": "市辖区",
                        "parent_id": "451200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "451202",
                        "area_name": "金城江区",
                        "parent_id": "451200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "451221",
                        "area_name": "南丹县",
                        "parent_id": "451200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "451222",
                        "area_name": "天峨县",
                        "parent_id": "451200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "451223",
                        "area_name": "凤山县",
                        "parent_id": "451200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "451224",
                        "area_name": "东兰县",
                        "parent_id": "451200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "451225",
                        "area_name": "罗城仫佬族自治县",
                        "parent_id": "451200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "451226",
                        "area_name": "环江毛南族自治县",
                        "parent_id": "451200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "451227",
                        "area_name": "巴马瑶族自治县",
                        "parent_id": "451200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "451228",
                        "area_name": "都安瑶族自治县",
                        "parent_id": "451200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "451229",
                        "area_name": "大化瑶族自治县",
                        "parent_id": "451200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "451281",
                        "area_name": "宜州市",
                        "parent_id": "451200",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "451300",
                "area_name": "来宾市",
                "parent_id": "450000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "451301",
                        "area_name": "市辖区",
                        "parent_id": "451300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "451302",
                        "area_name": "兴宾区",
                        "parent_id": "451300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "451321",
                        "area_name": "忻城县",
                        "parent_id": "451300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "451322",
                        "area_name": "象州县",
                        "parent_id": "451300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "451323",
                        "area_name": "武宣县",
                        "parent_id": "451300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "451324",
                        "area_name": "金秀瑶族自治县",
                        "parent_id": "451300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "451381",
                        "area_name": "合山市",
                        "parent_id": "451300",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "451400",
                "area_name": "崇左市",
                "parent_id": "450000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "451401",
                        "area_name": "市辖区",
                        "parent_id": "451400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "451402",
                        "area_name": "江州区",
                        "parent_id": "451400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "451421",
                        "area_name": "扶绥县",
                        "parent_id": "451400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "451422",
                        "area_name": "宁明县",
                        "parent_id": "451400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "451423",
                        "area_name": "龙州县",
                        "parent_id": "451400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "451424",
                        "area_name": "大新县",
                        "parent_id": "451400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "451425",
                        "area_name": "天等县",
                        "parent_id": "451400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "451481",
                        "area_name": "凭祥市",
                        "parent_id": "451400",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            }
        ]
    },
    {
        "area_id": "460000",
        "area_name": "海南省",
        "parent_id": "0",
        "level": "1",
        "sub_area": [
            {
                "area_id": "460100",
                "area_name": "海口市",
                "parent_id": "460000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "460101",
                        "area_name": "市辖区",
                        "parent_id": "460100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "460105",
                        "area_name": "秀英区",
                        "parent_id": "460100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "460106",
                        "area_name": "龙华区",
                        "parent_id": "460100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "460107",
                        "area_name": "琼山区",
                        "parent_id": "460100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "460108",
                        "area_name": "美兰区",
                        "parent_id": "460100",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "460200",
                "area_name": "三亚市",
                "parent_id": "460000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "460201",
                        "area_name": "市辖区",
                        "parent_id": "460200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "460202",
                        "area_name": "海棠区",
                        "parent_id": "460200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "460203",
                        "area_name": "吉阳区",
                        "parent_id": "460200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "460204",
                        "area_name": "天涯区",
                        "parent_id": "460200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "460205",
                        "area_name": "崖州区",
                        "parent_id": "460200",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "460300",
                "area_name": "三沙市",
                "parent_id": "460000",
                "level": "2",
                "sub_area": []
            },
            {
                "area_id": "460400",
                "area_name": "儋州市",
                "parent_id": "460000",
                "level": "2",
                "sub_area": []
            },
            {
                "area_id": "469000",
                "area_name": "省直辖县级行政区划",
                "parent_id": "460000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "469001",
                        "area_name": "五指山市",
                        "parent_id": "469000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "469002",
                        "area_name": "琼海市",
                        "parent_id": "469000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "469005",
                        "area_name": "文昌市",
                        "parent_id": "469000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "469006",
                        "area_name": "万宁市",
                        "parent_id": "469000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "469007",
                        "area_name": "东方市",
                        "parent_id": "469000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "469021",
                        "area_name": "定安县",
                        "parent_id": "469000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "469022",
                        "area_name": "屯昌县",
                        "parent_id": "469000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "469023",
                        "area_name": "澄迈县",
                        "parent_id": "469000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "469024",
                        "area_name": "临高县",
                        "parent_id": "469000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "469025",
                        "area_name": "白沙黎族自治县",
                        "parent_id": "469000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "469026",
                        "area_name": "昌江黎族自治县",
                        "parent_id": "469000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "469027",
                        "area_name": "乐东黎族自治县",
                        "parent_id": "469000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "469028",
                        "area_name": "陵水黎族自治县",
                        "parent_id": "469000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "469029",
                        "area_name": "保亭黎族苗族自治县",
                        "parent_id": "469000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "469030",
                        "area_name": "琼中黎族苗族自治县",
                        "parent_id": "469000",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            }
        ]
    },
    {
        "area_id": "500000",
        "area_name": "重庆市",
        "parent_id": "0",
        "level": "1",
        "sub_area": [
            {
                "area_id": "500100",
                "area_name": "市辖区",
                "parent_id": "500000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "500101",
                        "area_name": "万州区",
                        "parent_id": "500100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "500102",
                        "area_name": "涪陵区",
                        "parent_id": "500100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "500103",
                        "area_name": "渝中区",
                        "parent_id": "500100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "500104",
                        "area_name": "大渡口区",
                        "parent_id": "500100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "500105",
                        "area_name": "江北区",
                        "parent_id": "500100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "500106",
                        "area_name": "沙坪坝区",
                        "parent_id": "500100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "500107",
                        "area_name": "九龙坡区",
                        "parent_id": "500100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "500108",
                        "area_name": "南岸区",
                        "parent_id": "500100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "500109",
                        "area_name": "北碚区",
                        "parent_id": "500100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "500110",
                        "area_name": "綦江区",
                        "parent_id": "500100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "500111",
                        "area_name": "大足区",
                        "parent_id": "500100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "500112",
                        "area_name": "渝北区",
                        "parent_id": "500100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "500113",
                        "area_name": "巴南区",
                        "parent_id": "500100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "500114",
                        "area_name": "黔江区",
                        "parent_id": "500100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "500115",
                        "area_name": "长寿区",
                        "parent_id": "500100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "500116",
                        "area_name": "江津区",
                        "parent_id": "500100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "500117",
                        "area_name": "合川区",
                        "parent_id": "500100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "500118",
                        "area_name": "永川区",
                        "parent_id": "500100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "500119",
                        "area_name": "南川区",
                        "parent_id": "500100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "500120",
                        "area_name": "璧山区",
                        "parent_id": "500100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "500151",
                        "area_name": "铜梁区",
                        "parent_id": "500100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "500152",
                        "area_name": "潼南区",
                        "parent_id": "500100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "500153",
                        "area_name": "荣昌区",
                        "parent_id": "500100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "500154",
                        "area_name": "开州区",
                        "parent_id": "500100",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "500200",
                "area_name": "县",
                "parent_id": "500000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "500228",
                        "area_name": "梁平县",
                        "parent_id": "500200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "500229",
                        "area_name": "城口县",
                        "parent_id": "500200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "500230",
                        "area_name": "丰都县",
                        "parent_id": "500200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "500231",
                        "area_name": "垫江县",
                        "parent_id": "500200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "500232",
                        "area_name": "武隆县",
                        "parent_id": "500200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "500233",
                        "area_name": "忠县",
                        "parent_id": "500200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "500235",
                        "area_name": "云阳县",
                        "parent_id": "500200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "500236",
                        "area_name": "奉节县",
                        "parent_id": "500200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "500237",
                        "area_name": "巫山县",
                        "parent_id": "500200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "500238",
                        "area_name": "巫溪县",
                        "parent_id": "500200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "500240",
                        "area_name": "石柱土家族自治县",
                        "parent_id": "500200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "500241",
                        "area_name": "秀山土家族苗族自治县",
                        "parent_id": "500200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "500242",
                        "area_name": "酉阳土家族苗族自治县",
                        "parent_id": "500200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "500243",
                        "area_name": "彭水苗族土家族自治县",
                        "parent_id": "500200",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            }
        ]
    },
    {
        "area_id": "510000",
        "area_name": "四川省",
        "parent_id": "0",
        "level": "1",
        "sub_area": [
            {
                "area_id": "510100",
                "area_name": "成都市",
                "parent_id": "510000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "510101",
                        "area_name": "市辖区",
                        "parent_id": "510100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510104",
                        "area_name": "锦江区",
                        "parent_id": "510100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510105",
                        "area_name": "青羊区",
                        "parent_id": "510100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510106",
                        "area_name": "金牛区",
                        "parent_id": "510100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510107",
                        "area_name": "武侯区",
                        "parent_id": "510100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510108",
                        "area_name": "成华区",
                        "parent_id": "510100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510112",
                        "area_name": "龙泉驿区",
                        "parent_id": "510100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510113",
                        "area_name": "青白江区",
                        "parent_id": "510100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510114",
                        "area_name": "新都区",
                        "parent_id": "510100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510115",
                        "area_name": "温江区",
                        "parent_id": "510100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510116",
                        "area_name": "双流区",
                        "parent_id": "510100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510121",
                        "area_name": "金堂县",
                        "parent_id": "510100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510124",
                        "area_name": "郫县",
                        "parent_id": "510100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510129",
                        "area_name": "大邑县",
                        "parent_id": "510100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510131",
                        "area_name": "蒲江县",
                        "parent_id": "510100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510132",
                        "area_name": "新津县",
                        "parent_id": "510100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510181",
                        "area_name": "都江堰市",
                        "parent_id": "510100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510182",
                        "area_name": "彭州市",
                        "parent_id": "510100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510183",
                        "area_name": "邛崃市",
                        "parent_id": "510100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510184",
                        "area_name": "崇州市",
                        "parent_id": "510100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510185",
                        "area_name": "简阳市",
                        "parent_id": "510100",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "510300",
                "area_name": "自贡市",
                "parent_id": "510000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "510301",
                        "area_name": "市辖区",
                        "parent_id": "510300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510302",
                        "area_name": "自流井区",
                        "parent_id": "510300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510303",
                        "area_name": "贡井区",
                        "parent_id": "510300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510304",
                        "area_name": "大安区",
                        "parent_id": "510300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510311",
                        "area_name": "沿滩区",
                        "parent_id": "510300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510321",
                        "area_name": "荣县",
                        "parent_id": "510300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510322",
                        "area_name": "富顺县",
                        "parent_id": "510300",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "510400",
                "area_name": "攀枝花市",
                "parent_id": "510000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "510401",
                        "area_name": "市辖区",
                        "parent_id": "510400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510402",
                        "area_name": "东区",
                        "parent_id": "510400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510403",
                        "area_name": "西区",
                        "parent_id": "510400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510411",
                        "area_name": "仁和区",
                        "parent_id": "510400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510421",
                        "area_name": "米易县",
                        "parent_id": "510400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510422",
                        "area_name": "盐边县",
                        "parent_id": "510400",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "510500",
                "area_name": "泸州市",
                "parent_id": "510000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "510501",
                        "area_name": "市辖区",
                        "parent_id": "510500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510502",
                        "area_name": "江阳区",
                        "parent_id": "510500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510503",
                        "area_name": "纳溪区",
                        "parent_id": "510500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510504",
                        "area_name": "龙马潭区",
                        "parent_id": "510500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510521",
                        "area_name": "泸县",
                        "parent_id": "510500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510522",
                        "area_name": "合江县",
                        "parent_id": "510500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510524",
                        "area_name": "叙永县",
                        "parent_id": "510500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510525",
                        "area_name": "古蔺县",
                        "parent_id": "510500",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "510600",
                "area_name": "德阳市",
                "parent_id": "510000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "510601",
                        "area_name": "市辖区",
                        "parent_id": "510600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510603",
                        "area_name": "旌阳区",
                        "parent_id": "510600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510623",
                        "area_name": "中江县",
                        "parent_id": "510600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510626",
                        "area_name": "罗江县",
                        "parent_id": "510600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510681",
                        "area_name": "广汉市",
                        "parent_id": "510600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510682",
                        "area_name": "什邡市",
                        "parent_id": "510600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510683",
                        "area_name": "绵竹市",
                        "parent_id": "510600",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "510700",
                "area_name": "绵阳市",
                "parent_id": "510000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "510701",
                        "area_name": "市辖区",
                        "parent_id": "510700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510703",
                        "area_name": "涪城区",
                        "parent_id": "510700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510704",
                        "area_name": "游仙区",
                        "parent_id": "510700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510705",
                        "area_name": "安州区",
                        "parent_id": "510700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510722",
                        "area_name": "三台县",
                        "parent_id": "510700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510723",
                        "area_name": "盐亭县",
                        "parent_id": "510700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510725",
                        "area_name": "梓潼县",
                        "parent_id": "510700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510726",
                        "area_name": "北川羌族自治县",
                        "parent_id": "510700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510727",
                        "area_name": "平武县",
                        "parent_id": "510700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510781",
                        "area_name": "江油市",
                        "parent_id": "510700",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "510800",
                "area_name": "广元市",
                "parent_id": "510000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "510801",
                        "area_name": "市辖区",
                        "parent_id": "510800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510802",
                        "area_name": "利州区",
                        "parent_id": "510800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510811",
                        "area_name": "昭化区",
                        "parent_id": "510800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510812",
                        "area_name": "朝天区",
                        "parent_id": "510800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510821",
                        "area_name": "旺苍县",
                        "parent_id": "510800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510822",
                        "area_name": "青川县",
                        "parent_id": "510800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510823",
                        "area_name": "剑阁县",
                        "parent_id": "510800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510824",
                        "area_name": "苍溪县",
                        "parent_id": "510800",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "510900",
                "area_name": "遂宁市",
                "parent_id": "510000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "510901",
                        "area_name": "市辖区",
                        "parent_id": "510900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510903",
                        "area_name": "船山区",
                        "parent_id": "510900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510904",
                        "area_name": "安居区",
                        "parent_id": "510900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510921",
                        "area_name": "蓬溪县",
                        "parent_id": "510900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510922",
                        "area_name": "射洪县",
                        "parent_id": "510900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "510923",
                        "area_name": "大英县",
                        "parent_id": "510900",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "511000",
                "area_name": "内江市",
                "parent_id": "510000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "511001",
                        "area_name": "市辖区",
                        "parent_id": "511000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511002",
                        "area_name": "市中区",
                        "parent_id": "511000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511011",
                        "area_name": "东兴区",
                        "parent_id": "511000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511024",
                        "area_name": "威远县",
                        "parent_id": "511000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511025",
                        "area_name": "资中县",
                        "parent_id": "511000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511028",
                        "area_name": "隆昌县",
                        "parent_id": "511000",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "511100",
                "area_name": "乐山市",
                "parent_id": "510000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "511101",
                        "area_name": "市辖区",
                        "parent_id": "511100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511102",
                        "area_name": "市中区",
                        "parent_id": "511100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511111",
                        "area_name": "沙湾区",
                        "parent_id": "511100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511112",
                        "area_name": "五通桥区",
                        "parent_id": "511100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511113",
                        "area_name": "金口河区",
                        "parent_id": "511100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511123",
                        "area_name": "犍为县",
                        "parent_id": "511100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511124",
                        "area_name": "井研县",
                        "parent_id": "511100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511126",
                        "area_name": "夹江县",
                        "parent_id": "511100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511129",
                        "area_name": "沐川县",
                        "parent_id": "511100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511132",
                        "area_name": "峨边彝族自治县",
                        "parent_id": "511100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511133",
                        "area_name": "马边彝族自治县",
                        "parent_id": "511100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511181",
                        "area_name": "峨眉山市",
                        "parent_id": "511100",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "511300",
                "area_name": "南充市",
                "parent_id": "510000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "511301",
                        "area_name": "市辖区",
                        "parent_id": "511300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511302",
                        "area_name": "顺庆区",
                        "parent_id": "511300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511303",
                        "area_name": "高坪区",
                        "parent_id": "511300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511304",
                        "area_name": "嘉陵区",
                        "parent_id": "511300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511321",
                        "area_name": "南部县",
                        "parent_id": "511300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511322",
                        "area_name": "营山县",
                        "parent_id": "511300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511323",
                        "area_name": "蓬安县",
                        "parent_id": "511300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511324",
                        "area_name": "仪陇县",
                        "parent_id": "511300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511325",
                        "area_name": "西充县",
                        "parent_id": "511300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511381",
                        "area_name": "阆中市",
                        "parent_id": "511300",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "511400",
                "area_name": "眉山市",
                "parent_id": "510000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "511401",
                        "area_name": "市辖区",
                        "parent_id": "511400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511402",
                        "area_name": "东坡区",
                        "parent_id": "511400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511403",
                        "area_name": "彭山区",
                        "parent_id": "511400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511421",
                        "area_name": "仁寿县",
                        "parent_id": "511400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511423",
                        "area_name": "洪雅县",
                        "parent_id": "511400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511424",
                        "area_name": "丹棱县",
                        "parent_id": "511400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511425",
                        "area_name": "青神县",
                        "parent_id": "511400",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "511500",
                "area_name": "宜宾市",
                "parent_id": "510000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "511501",
                        "area_name": "市辖区",
                        "parent_id": "511500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511502",
                        "area_name": "翠屏区",
                        "parent_id": "511500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511503",
                        "area_name": "南溪区",
                        "parent_id": "511500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511521",
                        "area_name": "宜宾县",
                        "parent_id": "511500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511523",
                        "area_name": "江安县",
                        "parent_id": "511500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511524",
                        "area_name": "长宁县",
                        "parent_id": "511500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511525",
                        "area_name": "高县",
                        "parent_id": "511500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511526",
                        "area_name": "珙县",
                        "parent_id": "511500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511527",
                        "area_name": "筠连县",
                        "parent_id": "511500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511528",
                        "area_name": "兴文县",
                        "parent_id": "511500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511529",
                        "area_name": "屏山县",
                        "parent_id": "511500",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "511600",
                "area_name": "广安市",
                "parent_id": "510000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "511601",
                        "area_name": "市辖区",
                        "parent_id": "511600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511602",
                        "area_name": "广安区",
                        "parent_id": "511600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511603",
                        "area_name": "前锋区",
                        "parent_id": "511600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511621",
                        "area_name": "岳池县",
                        "parent_id": "511600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511622",
                        "area_name": "武胜县",
                        "parent_id": "511600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511623",
                        "area_name": "邻水县",
                        "parent_id": "511600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511681",
                        "area_name": "华蓥市",
                        "parent_id": "511600",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "511700",
                "area_name": "达州市",
                "parent_id": "510000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "511701",
                        "area_name": "市辖区",
                        "parent_id": "511700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511702",
                        "area_name": "通川区",
                        "parent_id": "511700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511703",
                        "area_name": "达川区",
                        "parent_id": "511700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511722",
                        "area_name": "宣汉县",
                        "parent_id": "511700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511723",
                        "area_name": "开江县",
                        "parent_id": "511700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511724",
                        "area_name": "大竹县",
                        "parent_id": "511700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511725",
                        "area_name": "渠县",
                        "parent_id": "511700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511781",
                        "area_name": "万源市",
                        "parent_id": "511700",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "511800",
                "area_name": "雅安市",
                "parent_id": "510000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "511801",
                        "area_name": "市辖区",
                        "parent_id": "511800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511802",
                        "area_name": "雨城区",
                        "parent_id": "511800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511803",
                        "area_name": "名山区",
                        "parent_id": "511800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511822",
                        "area_name": "荥经县",
                        "parent_id": "511800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511823",
                        "area_name": "汉源县",
                        "parent_id": "511800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511824",
                        "area_name": "石棉县",
                        "parent_id": "511800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511825",
                        "area_name": "天全县",
                        "parent_id": "511800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511826",
                        "area_name": "芦山县",
                        "parent_id": "511800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511827",
                        "area_name": "宝兴县",
                        "parent_id": "511800",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "511900",
                "area_name": "巴中市",
                "parent_id": "510000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "511901",
                        "area_name": "市辖区",
                        "parent_id": "511900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511902",
                        "area_name": "巴州区",
                        "parent_id": "511900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511903",
                        "area_name": "恩阳区",
                        "parent_id": "511900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511921",
                        "area_name": "通江县",
                        "parent_id": "511900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511922",
                        "area_name": "南江县",
                        "parent_id": "511900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "511923",
                        "area_name": "平昌县",
                        "parent_id": "511900",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "512000",
                "area_name": "资阳市",
                "parent_id": "510000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "512001",
                        "area_name": "市辖区",
                        "parent_id": "512000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "512002",
                        "area_name": "雁江区",
                        "parent_id": "512000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "512021",
                        "area_name": "安岳县",
                        "parent_id": "512000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "512022",
                        "area_name": "乐至县",
                        "parent_id": "512000",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "513200",
                "area_name": "阿坝藏族羌族自治州",
                "parent_id": "510000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "513201",
                        "area_name": "马尔康市",
                        "parent_id": "513200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "513221",
                        "area_name": "汶川县",
                        "parent_id": "513200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "513222",
                        "area_name": "理县",
                        "parent_id": "513200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "513223",
                        "area_name": "茂县",
                        "parent_id": "513200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "513224",
                        "area_name": "松潘县",
                        "parent_id": "513200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "513225",
                        "area_name": "九寨沟县",
                        "parent_id": "513200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "513226",
                        "area_name": "金川县",
                        "parent_id": "513200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "513227",
                        "area_name": "小金县",
                        "parent_id": "513200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "513228",
                        "area_name": "黑水县",
                        "parent_id": "513200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "513230",
                        "area_name": "壤塘县",
                        "parent_id": "513200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "513231",
                        "area_name": "阿坝县",
                        "parent_id": "513200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "513232",
                        "area_name": "若尔盖县",
                        "parent_id": "513200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "513233",
                        "area_name": "红原县",
                        "parent_id": "513200",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "513300",
                "area_name": "甘孜藏族自治州",
                "parent_id": "510000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "513301",
                        "area_name": "康定市",
                        "parent_id": "513300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "513322",
                        "area_name": "泸定县",
                        "parent_id": "513300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "513323",
                        "area_name": "丹巴县",
                        "parent_id": "513300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "513324",
                        "area_name": "九龙县",
                        "parent_id": "513300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "513325",
                        "area_name": "雅江县",
                        "parent_id": "513300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "513326",
                        "area_name": "道孚县",
                        "parent_id": "513300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "513327",
                        "area_name": "炉霍县",
                        "parent_id": "513300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "513328",
                        "area_name": "甘孜县",
                        "parent_id": "513300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "513329",
                        "area_name": "新龙县",
                        "parent_id": "513300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "513330",
                        "area_name": "德格县",
                        "parent_id": "513300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "513331",
                        "area_name": "白玉县",
                        "parent_id": "513300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "513332",
                        "area_name": "石渠县",
                        "parent_id": "513300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "513333",
                        "area_name": "色达县",
                        "parent_id": "513300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "513334",
                        "area_name": "理塘县",
                        "parent_id": "513300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "513335",
                        "area_name": "巴塘县",
                        "parent_id": "513300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "513336",
                        "area_name": "乡城县",
                        "parent_id": "513300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "513337",
                        "area_name": "稻城县",
                        "parent_id": "513300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "513338",
                        "area_name": "得荣县",
                        "parent_id": "513300",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "513400",
                "area_name": "凉山彝族自治州",
                "parent_id": "510000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "513401",
                        "area_name": "西昌市",
                        "parent_id": "513400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "513422",
                        "area_name": "木里藏族自治县",
                        "parent_id": "513400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "513423",
                        "area_name": "盐源县",
                        "parent_id": "513400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "513424",
                        "area_name": "德昌县",
                        "parent_id": "513400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "513425",
                        "area_name": "会理县",
                        "parent_id": "513400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "513426",
                        "area_name": "会东县",
                        "parent_id": "513400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "513427",
                        "area_name": "宁南县",
                        "parent_id": "513400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "513428",
                        "area_name": "普格县",
                        "parent_id": "513400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "513429",
                        "area_name": "布拖县",
                        "parent_id": "513400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "513430",
                        "area_name": "金阳县",
                        "parent_id": "513400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "513431",
                        "area_name": "昭觉县",
                        "parent_id": "513400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "513432",
                        "area_name": "喜德县",
                        "parent_id": "513400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "513433",
                        "area_name": "冕宁县",
                        "parent_id": "513400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "513434",
                        "area_name": "越西县",
                        "parent_id": "513400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "513435",
                        "area_name": "甘洛县",
                        "parent_id": "513400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "513436",
                        "area_name": "美姑县",
                        "parent_id": "513400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "513437",
                        "area_name": "雷波县",
                        "parent_id": "513400",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            }
        ]
    },
    {
        "area_id": "520000",
        "area_name": "贵州省",
        "parent_id": "0",
        "level": "1",
        "sub_area": [
            {
                "area_id": "520100",
                "area_name": "贵阳市",
                "parent_id": "520000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "520101",
                        "area_name": "市辖区",
                        "parent_id": "520100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520102",
                        "area_name": "南明区",
                        "parent_id": "520100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520103",
                        "area_name": "云岩区",
                        "parent_id": "520100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520111",
                        "area_name": "花溪区",
                        "parent_id": "520100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520112",
                        "area_name": "乌当区",
                        "parent_id": "520100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520113",
                        "area_name": "白云区",
                        "parent_id": "520100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520115",
                        "area_name": "观山湖区",
                        "parent_id": "520100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520121",
                        "area_name": "开阳县",
                        "parent_id": "520100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520122",
                        "area_name": "息烽县",
                        "parent_id": "520100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520123",
                        "area_name": "修文县",
                        "parent_id": "520100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520181",
                        "area_name": "清镇市",
                        "parent_id": "520100",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "520200",
                "area_name": "六盘水市",
                "parent_id": "520000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "520201",
                        "area_name": "钟山区",
                        "parent_id": "520200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520203",
                        "area_name": "六枝特区",
                        "parent_id": "520200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520221",
                        "area_name": "水城县",
                        "parent_id": "520200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520222",
                        "area_name": "盘县",
                        "parent_id": "520200",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "520300",
                "area_name": "遵义市",
                "parent_id": "520000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "520301",
                        "area_name": "市辖区",
                        "parent_id": "520300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520302",
                        "area_name": "红花岗区",
                        "parent_id": "520300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520303",
                        "area_name": "汇川区",
                        "parent_id": "520300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520304",
                        "area_name": "播州区",
                        "parent_id": "520300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520322",
                        "area_name": "桐梓县",
                        "parent_id": "520300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520323",
                        "area_name": "绥阳县",
                        "parent_id": "520300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520324",
                        "area_name": "正安县",
                        "parent_id": "520300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520325",
                        "area_name": "道真仡佬族苗族自治县",
                        "parent_id": "520300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520326",
                        "area_name": "务川仡佬族苗族自治县",
                        "parent_id": "520300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520327",
                        "area_name": "凤冈县",
                        "parent_id": "520300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520328",
                        "area_name": "湄潭县",
                        "parent_id": "520300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520329",
                        "area_name": "余庆县",
                        "parent_id": "520300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520330",
                        "area_name": "习水县",
                        "parent_id": "520300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520381",
                        "area_name": "赤水市",
                        "parent_id": "520300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520382",
                        "area_name": "仁怀市",
                        "parent_id": "520300",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "520400",
                "area_name": "安顺市",
                "parent_id": "520000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "520401",
                        "area_name": "市辖区",
                        "parent_id": "520400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520402",
                        "area_name": "西秀区",
                        "parent_id": "520400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520403",
                        "area_name": "平坝区",
                        "parent_id": "520400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520422",
                        "area_name": "普定县",
                        "parent_id": "520400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520423",
                        "area_name": "镇宁布依族苗族自治县",
                        "parent_id": "520400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520424",
                        "area_name": "关岭布依族苗族自治县",
                        "parent_id": "520400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520425",
                        "area_name": "紫云苗族布依族自治县",
                        "parent_id": "520400",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "520500",
                "area_name": "毕节市",
                "parent_id": "520000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "520501",
                        "area_name": "市辖区",
                        "parent_id": "520500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520502",
                        "area_name": "七星关区",
                        "parent_id": "520500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520521",
                        "area_name": "大方县",
                        "parent_id": "520500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520522",
                        "area_name": "黔西县",
                        "parent_id": "520500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520523",
                        "area_name": "金沙县",
                        "parent_id": "520500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520524",
                        "area_name": "织金县",
                        "parent_id": "520500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520525",
                        "area_name": "纳雍县",
                        "parent_id": "520500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520526",
                        "area_name": "威宁彝族回族苗族自治县",
                        "parent_id": "520500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520527",
                        "area_name": "赫章县",
                        "parent_id": "520500",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "520600",
                "area_name": "铜仁市",
                "parent_id": "520000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "520601",
                        "area_name": "市辖区",
                        "parent_id": "520600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520602",
                        "area_name": "碧江区",
                        "parent_id": "520600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520603",
                        "area_name": "万山区",
                        "parent_id": "520600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520621",
                        "area_name": "江口县",
                        "parent_id": "520600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520622",
                        "area_name": "玉屏侗族自治县",
                        "parent_id": "520600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520623",
                        "area_name": "石阡县",
                        "parent_id": "520600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520624",
                        "area_name": "思南县",
                        "parent_id": "520600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520625",
                        "area_name": "印江土家族苗族自治县",
                        "parent_id": "520600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520626",
                        "area_name": "德江县",
                        "parent_id": "520600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520627",
                        "area_name": "沿河土家族自治县",
                        "parent_id": "520600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "520628",
                        "area_name": "松桃苗族自治县",
                        "parent_id": "520600",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "522300",
                "area_name": "黔西南布依族苗族自治州",
                "parent_id": "520000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "522301",
                        "area_name": "兴义市",
                        "parent_id": "522300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "522322",
                        "area_name": "兴仁县",
                        "parent_id": "522300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "522323",
                        "area_name": "普安县",
                        "parent_id": "522300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "522324",
                        "area_name": "晴隆县",
                        "parent_id": "522300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "522325",
                        "area_name": "贞丰县",
                        "parent_id": "522300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "522326",
                        "area_name": "望谟县",
                        "parent_id": "522300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "522327",
                        "area_name": "册亨县",
                        "parent_id": "522300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "522328",
                        "area_name": "安龙县",
                        "parent_id": "522300",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "522600",
                "area_name": "黔东南苗族侗族自治州",
                "parent_id": "520000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "522601",
                        "area_name": "凯里市",
                        "parent_id": "522600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "522622",
                        "area_name": "黄平县",
                        "parent_id": "522600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "522623",
                        "area_name": "施秉县",
                        "parent_id": "522600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "522624",
                        "area_name": "三穗县",
                        "parent_id": "522600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "522625",
                        "area_name": "镇远县",
                        "parent_id": "522600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "522626",
                        "area_name": "岑巩县",
                        "parent_id": "522600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "522627",
                        "area_name": "天柱县",
                        "parent_id": "522600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "522628",
                        "area_name": "锦屏县",
                        "parent_id": "522600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "522629",
                        "area_name": "剑河县",
                        "parent_id": "522600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "522630",
                        "area_name": "台江县",
                        "parent_id": "522600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "522631",
                        "area_name": "黎平县",
                        "parent_id": "522600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "522632",
                        "area_name": "榕江县",
                        "parent_id": "522600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "522633",
                        "area_name": "从江县",
                        "parent_id": "522600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "522634",
                        "area_name": "雷山县",
                        "parent_id": "522600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "522635",
                        "area_name": "麻江县",
                        "parent_id": "522600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "522636",
                        "area_name": "丹寨县",
                        "parent_id": "522600",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "522700",
                "area_name": "黔南布依族苗族自治州",
                "parent_id": "520000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "522701",
                        "area_name": "都匀市",
                        "parent_id": "522700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "522702",
                        "area_name": "福泉市",
                        "parent_id": "522700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "522722",
                        "area_name": "荔波县",
                        "parent_id": "522700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "522723",
                        "area_name": "贵定县",
                        "parent_id": "522700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "522725",
                        "area_name": "瓮安县",
                        "parent_id": "522700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "522726",
                        "area_name": "独山县",
                        "parent_id": "522700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "522727",
                        "area_name": "平塘县",
                        "parent_id": "522700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "522728",
                        "area_name": "罗甸县",
                        "parent_id": "522700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "522729",
                        "area_name": "长顺县",
                        "parent_id": "522700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "522730",
                        "area_name": "龙里县",
                        "parent_id": "522700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "522731",
                        "area_name": "惠水县",
                        "parent_id": "522700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "522732",
                        "area_name": "三都水族自治县",
                        "parent_id": "522700",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            }
        ]
    },
    {
        "area_id": "530000",
        "area_name": "云南省",
        "parent_id": "0",
        "level": "1",
        "sub_area": [
            {
                "area_id": "530100",
                "area_name": "昆明市",
                "parent_id": "530000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "530101",
                        "area_name": "市辖区",
                        "parent_id": "530100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530102",
                        "area_name": "五华区",
                        "parent_id": "530100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530103",
                        "area_name": "盘龙区",
                        "parent_id": "530100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530111",
                        "area_name": "官渡区",
                        "parent_id": "530100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530112",
                        "area_name": "西山区",
                        "parent_id": "530100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530113",
                        "area_name": "东川区",
                        "parent_id": "530100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530114",
                        "area_name": "呈贡区",
                        "parent_id": "530100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530122",
                        "area_name": "晋宁县",
                        "parent_id": "530100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530124",
                        "area_name": "富民县",
                        "parent_id": "530100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530125",
                        "area_name": "宜良县",
                        "parent_id": "530100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530126",
                        "area_name": "石林彝族自治县",
                        "parent_id": "530100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530127",
                        "area_name": "嵩明县",
                        "parent_id": "530100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530128",
                        "area_name": "禄劝彝族苗族自治县",
                        "parent_id": "530100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530129",
                        "area_name": "寻甸回族彝族自治县",
                        "parent_id": "530100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530181",
                        "area_name": "安宁市",
                        "parent_id": "530100",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "530300",
                "area_name": "曲靖市",
                "parent_id": "530000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "530301",
                        "area_name": "市辖区",
                        "parent_id": "530300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530302",
                        "area_name": "麒麟区",
                        "parent_id": "530300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530303",
                        "area_name": "沾益区",
                        "parent_id": "530300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530321",
                        "area_name": "马龙县",
                        "parent_id": "530300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530322",
                        "area_name": "陆良县",
                        "parent_id": "530300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530323",
                        "area_name": "师宗县",
                        "parent_id": "530300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530324",
                        "area_name": "罗平县",
                        "parent_id": "530300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530325",
                        "area_name": "富源县",
                        "parent_id": "530300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530326",
                        "area_name": "会泽县",
                        "parent_id": "530300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530381",
                        "area_name": "宣威市",
                        "parent_id": "530300",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "530400",
                "area_name": "玉溪市",
                "parent_id": "530000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "530401",
                        "area_name": "市辖区",
                        "parent_id": "530400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530402",
                        "area_name": "红塔区",
                        "parent_id": "530400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530403",
                        "area_name": "江川区",
                        "parent_id": "530400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530422",
                        "area_name": "澄江县",
                        "parent_id": "530400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530423",
                        "area_name": "通海县",
                        "parent_id": "530400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530424",
                        "area_name": "华宁县",
                        "parent_id": "530400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530425",
                        "area_name": "易门县",
                        "parent_id": "530400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530426",
                        "area_name": "峨山彝族自治县",
                        "parent_id": "530400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530427",
                        "area_name": "新平彝族傣族自治县",
                        "parent_id": "530400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530428",
                        "area_name": "元江哈尼族彝族傣族自治县",
                        "parent_id": "530400",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "530500",
                "area_name": "保山市",
                "parent_id": "530000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "530501",
                        "area_name": "市辖区",
                        "parent_id": "530500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530502",
                        "area_name": "隆阳区",
                        "parent_id": "530500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530521",
                        "area_name": "施甸县",
                        "parent_id": "530500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530523",
                        "area_name": "龙陵县",
                        "parent_id": "530500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530524",
                        "area_name": "昌宁县",
                        "parent_id": "530500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530581",
                        "area_name": "腾冲市",
                        "parent_id": "530500",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "530600",
                "area_name": "昭通市",
                "parent_id": "530000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "530601",
                        "area_name": "市辖区",
                        "parent_id": "530600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530602",
                        "area_name": "昭阳区",
                        "parent_id": "530600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530621",
                        "area_name": "鲁甸县",
                        "parent_id": "530600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530622",
                        "area_name": "巧家县",
                        "parent_id": "530600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530623",
                        "area_name": "盐津县",
                        "parent_id": "530600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530624",
                        "area_name": "大关县",
                        "parent_id": "530600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530625",
                        "area_name": "永善县",
                        "parent_id": "530600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530626",
                        "area_name": "绥江县",
                        "parent_id": "530600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530627",
                        "area_name": "镇雄县",
                        "parent_id": "530600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530628",
                        "area_name": "彝良县",
                        "parent_id": "530600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530629",
                        "area_name": "威信县",
                        "parent_id": "530600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530630",
                        "area_name": "水富县",
                        "parent_id": "530600",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "530700",
                "area_name": "丽江市",
                "parent_id": "530000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "530701",
                        "area_name": "市辖区",
                        "parent_id": "530700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530702",
                        "area_name": "古城区",
                        "parent_id": "530700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530721",
                        "area_name": "玉龙纳西族自治县",
                        "parent_id": "530700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530722",
                        "area_name": "永胜县",
                        "parent_id": "530700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530723",
                        "area_name": "华坪县",
                        "parent_id": "530700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530724",
                        "area_name": "宁蒗彝族自治县",
                        "parent_id": "530700",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "530800",
                "area_name": "普洱市",
                "parent_id": "530000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "530801",
                        "area_name": "市辖区",
                        "parent_id": "530800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530802",
                        "area_name": "思茅区",
                        "parent_id": "530800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530821",
                        "area_name": "宁洱哈尼族彝族自治县",
                        "parent_id": "530800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530822",
                        "area_name": "墨江哈尼族自治县",
                        "parent_id": "530800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530823",
                        "area_name": "景东彝族自治县",
                        "parent_id": "530800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530824",
                        "area_name": "景谷傣族彝族自治县",
                        "parent_id": "530800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530825",
                        "area_name": "镇沅彝族哈尼族拉祜族自治县",
                        "parent_id": "530800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530826",
                        "area_name": "江城哈尼族彝族自治县",
                        "parent_id": "530800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530827",
                        "area_name": "孟连傣族拉祜族佤族自治县",
                        "parent_id": "530800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530828",
                        "area_name": "澜沧拉祜族自治县",
                        "parent_id": "530800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530829",
                        "area_name": "西盟佤族自治县",
                        "parent_id": "530800",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "530900",
                "area_name": "临沧市",
                "parent_id": "530000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "530901",
                        "area_name": "市辖区",
                        "parent_id": "530900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530902",
                        "area_name": "临翔区",
                        "parent_id": "530900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530921",
                        "area_name": "凤庆县",
                        "parent_id": "530900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530922",
                        "area_name": "云县",
                        "parent_id": "530900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530923",
                        "area_name": "永德县",
                        "parent_id": "530900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530924",
                        "area_name": "镇康县",
                        "parent_id": "530900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530925",
                        "area_name": "双江拉祜族佤族布朗族傣族自治县",
                        "parent_id": "530900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530926",
                        "area_name": "耿马傣族佤族自治县",
                        "parent_id": "530900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "530927",
                        "area_name": "沧源佤族自治县",
                        "parent_id": "530900",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "532300",
                "area_name": "楚雄彝族自治州",
                "parent_id": "530000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "532301",
                        "area_name": "楚雄市",
                        "parent_id": "532300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "532322",
                        "area_name": "双柏县",
                        "parent_id": "532300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "532323",
                        "area_name": "牟定县",
                        "parent_id": "532300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "532324",
                        "area_name": "南华县",
                        "parent_id": "532300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "532325",
                        "area_name": "姚安县",
                        "parent_id": "532300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "532326",
                        "area_name": "大姚县",
                        "parent_id": "532300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "532327",
                        "area_name": "永仁县",
                        "parent_id": "532300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "532328",
                        "area_name": "元谋县",
                        "parent_id": "532300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "532329",
                        "area_name": "武定县",
                        "parent_id": "532300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "532331",
                        "area_name": "禄丰县",
                        "parent_id": "532300",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "532500",
                "area_name": "红河哈尼族彝族自治州",
                "parent_id": "530000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "532501",
                        "area_name": "个旧市",
                        "parent_id": "532500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "532502",
                        "area_name": "开远市",
                        "parent_id": "532500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "532503",
                        "area_name": "蒙自市",
                        "parent_id": "532500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "532504",
                        "area_name": "弥勒市",
                        "parent_id": "532500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "532523",
                        "area_name": "屏边苗族自治县",
                        "parent_id": "532500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "532524",
                        "area_name": "建水县",
                        "parent_id": "532500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "532525",
                        "area_name": "石屏县",
                        "parent_id": "532500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "532527",
                        "area_name": "泸西县",
                        "parent_id": "532500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "532528",
                        "area_name": "元阳县",
                        "parent_id": "532500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "532529",
                        "area_name": "红河县",
                        "parent_id": "532500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "532530",
                        "area_name": "金平苗族瑶族傣族自治县",
                        "parent_id": "532500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "532531",
                        "area_name": "绿春县",
                        "parent_id": "532500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "532532",
                        "area_name": "河口瑶族自治县",
                        "parent_id": "532500",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "532600",
                "area_name": "文山壮族苗族自治州",
                "parent_id": "530000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "532601",
                        "area_name": "文山市",
                        "parent_id": "532600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "532622",
                        "area_name": "砚山县",
                        "parent_id": "532600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "532623",
                        "area_name": "西畴县",
                        "parent_id": "532600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "532624",
                        "area_name": "麻栗坡县",
                        "parent_id": "532600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "532625",
                        "area_name": "马关县",
                        "parent_id": "532600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "532626",
                        "area_name": "丘北县",
                        "parent_id": "532600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "532627",
                        "area_name": "广南县",
                        "parent_id": "532600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "532628",
                        "area_name": "富宁县",
                        "parent_id": "532600",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "532800",
                "area_name": "西双版纳傣族自治州",
                "parent_id": "530000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "532801",
                        "area_name": "景洪市",
                        "parent_id": "532800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "532822",
                        "area_name": "勐海县",
                        "parent_id": "532800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "532823",
                        "area_name": "勐腊县",
                        "parent_id": "532800",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "532900",
                "area_name": "大理白族自治州",
                "parent_id": "530000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "532901",
                        "area_name": "大理市",
                        "parent_id": "532900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "532922",
                        "area_name": "漾濞彝族自治县",
                        "parent_id": "532900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "532923",
                        "area_name": "祥云县",
                        "parent_id": "532900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "532924",
                        "area_name": "宾川县",
                        "parent_id": "532900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "532925",
                        "area_name": "弥渡县",
                        "parent_id": "532900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "532926",
                        "area_name": "南涧彝族自治县",
                        "parent_id": "532900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "532927",
                        "area_name": "巍山彝族回族自治县",
                        "parent_id": "532900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "532928",
                        "area_name": "永平县",
                        "parent_id": "532900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "532929",
                        "area_name": "云龙县",
                        "parent_id": "532900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "532930",
                        "area_name": "洱源县",
                        "parent_id": "532900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "532931",
                        "area_name": "剑川县",
                        "parent_id": "532900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "532932",
                        "area_name": "鹤庆县",
                        "parent_id": "532900",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "533100",
                "area_name": "德宏傣族景颇族自治州",
                "parent_id": "530000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "533102",
                        "area_name": "瑞丽市",
                        "parent_id": "533100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "533103",
                        "area_name": "芒市",
                        "parent_id": "533100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "533122",
                        "area_name": "梁河县",
                        "parent_id": "533100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "533123",
                        "area_name": "盈江县",
                        "parent_id": "533100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "533124",
                        "area_name": "陇川县",
                        "parent_id": "533100",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "533300",
                "area_name": "怒江傈僳族自治州",
                "parent_id": "530000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "533301",
                        "area_name": "泸水市",
                        "parent_id": "533300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "533323",
                        "area_name": "福贡县",
                        "parent_id": "533300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "533324",
                        "area_name": "贡山独龙族怒族自治县",
                        "parent_id": "533300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "533325",
                        "area_name": "兰坪白族普米族自治县",
                        "parent_id": "533300",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "533400",
                "area_name": "迪庆藏族自治州",
                "parent_id": "530000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "533401",
                        "area_name": "香格里拉市",
                        "parent_id": "533400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "533422",
                        "area_name": "德钦县",
                        "parent_id": "533400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "533423",
                        "area_name": "维西傈僳族自治县",
                        "parent_id": "533400",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            }
        ]
    },
    {
        "area_id": "540000",
        "area_name": "西藏自治区",
        "parent_id": "0",
        "level": "1",
        "sub_area": [
            {
                "area_id": "540100",
                "area_name": "拉萨市",
                "parent_id": "540000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "540101",
                        "area_name": "市辖区",
                        "parent_id": "540100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540102",
                        "area_name": "城关区",
                        "parent_id": "540100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540103",
                        "area_name": "堆龙德庆区",
                        "parent_id": "540100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540121",
                        "area_name": "林周县",
                        "parent_id": "540100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540122",
                        "area_name": "当雄县",
                        "parent_id": "540100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540123",
                        "area_name": "尼木县",
                        "parent_id": "540100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540124",
                        "area_name": "曲水县",
                        "parent_id": "540100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540126",
                        "area_name": "达孜县",
                        "parent_id": "540100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540127",
                        "area_name": "墨竹工卡县",
                        "parent_id": "540100",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "540200",
                "area_name": "日喀则市",
                "parent_id": "540000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "540202",
                        "area_name": "桑珠孜区",
                        "parent_id": "540200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540221",
                        "area_name": "南木林县",
                        "parent_id": "540200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540222",
                        "area_name": "江孜县",
                        "parent_id": "540200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540223",
                        "area_name": "定日县",
                        "parent_id": "540200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540224",
                        "area_name": "萨迦县",
                        "parent_id": "540200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540225",
                        "area_name": "拉孜县",
                        "parent_id": "540200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540226",
                        "area_name": "昂仁县",
                        "parent_id": "540200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540227",
                        "area_name": "谢通门县",
                        "parent_id": "540200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540228",
                        "area_name": "白朗县",
                        "parent_id": "540200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540229",
                        "area_name": "仁布县",
                        "parent_id": "540200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540230",
                        "area_name": "康马县",
                        "parent_id": "540200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540231",
                        "area_name": "定结县",
                        "parent_id": "540200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540232",
                        "area_name": "仲巴县",
                        "parent_id": "540200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540233",
                        "area_name": "亚东县",
                        "parent_id": "540200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540234",
                        "area_name": "吉隆县",
                        "parent_id": "540200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540235",
                        "area_name": "聂拉木县",
                        "parent_id": "540200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540236",
                        "area_name": "萨嘎县",
                        "parent_id": "540200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540237",
                        "area_name": "岗巴县",
                        "parent_id": "540200",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "540300",
                "area_name": "昌都市",
                "parent_id": "540000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "540302",
                        "area_name": "卡若区",
                        "parent_id": "540300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540321",
                        "area_name": "江达县",
                        "parent_id": "540300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540322",
                        "area_name": "贡觉县",
                        "parent_id": "540300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540323",
                        "area_name": "类乌齐县",
                        "parent_id": "540300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540324",
                        "area_name": "丁青县",
                        "parent_id": "540300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540325",
                        "area_name": "察雅县",
                        "parent_id": "540300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540326",
                        "area_name": "八宿县",
                        "parent_id": "540300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540327",
                        "area_name": "左贡县",
                        "parent_id": "540300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540328",
                        "area_name": "芒康县",
                        "parent_id": "540300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540329",
                        "area_name": "洛隆县",
                        "parent_id": "540300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540330",
                        "area_name": "边坝县",
                        "parent_id": "540300",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "540400",
                "area_name": "林芝市",
                "parent_id": "540000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "540402",
                        "area_name": "巴宜区",
                        "parent_id": "540400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540421",
                        "area_name": "工布江达县",
                        "parent_id": "540400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540422",
                        "area_name": "米林县",
                        "parent_id": "540400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540423",
                        "area_name": "墨脱县",
                        "parent_id": "540400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540424",
                        "area_name": "波密县",
                        "parent_id": "540400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540425",
                        "area_name": "察隅县",
                        "parent_id": "540400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540426",
                        "area_name": "朗县",
                        "parent_id": "540400",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "540500",
                "area_name": "山南市",
                "parent_id": "540000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "540501",
                        "area_name": "市辖区",
                        "parent_id": "540500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540502",
                        "area_name": "乃东区",
                        "parent_id": "540500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540521",
                        "area_name": "扎囊县",
                        "parent_id": "540500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540522",
                        "area_name": "贡嘎县",
                        "parent_id": "540500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540523",
                        "area_name": "桑日县",
                        "parent_id": "540500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540524",
                        "area_name": "琼结县",
                        "parent_id": "540500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540525",
                        "area_name": "曲松县",
                        "parent_id": "540500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540526",
                        "area_name": "措美县",
                        "parent_id": "540500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540527",
                        "area_name": "洛扎县",
                        "parent_id": "540500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540528",
                        "area_name": "加查县",
                        "parent_id": "540500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540529",
                        "area_name": "隆子县",
                        "parent_id": "540500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540530",
                        "area_name": "错那县",
                        "parent_id": "540500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "540531",
                        "area_name": "浪卡子县",
                        "parent_id": "540500",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "542400",
                "area_name": "那曲地区",
                "parent_id": "540000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "542421",
                        "area_name": "那曲县",
                        "parent_id": "542400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "542422",
                        "area_name": "嘉黎县",
                        "parent_id": "542400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "542423",
                        "area_name": "比如县",
                        "parent_id": "542400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "542424",
                        "area_name": "聂荣县",
                        "parent_id": "542400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "542425",
                        "area_name": "安多县",
                        "parent_id": "542400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "542426",
                        "area_name": "申扎县",
                        "parent_id": "542400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "542427",
                        "area_name": "索县",
                        "parent_id": "542400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "542428",
                        "area_name": "班戈县",
                        "parent_id": "542400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "542429",
                        "area_name": "巴青县",
                        "parent_id": "542400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "542430",
                        "area_name": "尼玛县",
                        "parent_id": "542400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "542431",
                        "area_name": "双湖县",
                        "parent_id": "542400",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "542500",
                "area_name": "阿里地区",
                "parent_id": "540000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "542521",
                        "area_name": "普兰县",
                        "parent_id": "542500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "542522",
                        "area_name": "札达县",
                        "parent_id": "542500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "542523",
                        "area_name": "噶尔县",
                        "parent_id": "542500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "542524",
                        "area_name": "日土县",
                        "parent_id": "542500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "542525",
                        "area_name": "革吉县",
                        "parent_id": "542500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "542526",
                        "area_name": "改则县",
                        "parent_id": "542500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "542527",
                        "area_name": "措勤县",
                        "parent_id": "542500",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            }
        ]
    },
    {
        "area_id": "610000",
        "area_name": "陕西省",
        "parent_id": "0",
        "level": "1",
        "sub_area": [
            {
                "area_id": "610100",
                "area_name": "西安市",
                "parent_id": "610000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "610101",
                        "area_name": "市辖区",
                        "parent_id": "610100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610102",
                        "area_name": "新城区",
                        "parent_id": "610100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610103",
                        "area_name": "碑林区",
                        "parent_id": "610100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610104",
                        "area_name": "莲湖区",
                        "parent_id": "610100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610111",
                        "area_name": "灞桥区",
                        "parent_id": "610100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610112",
                        "area_name": "未央区",
                        "parent_id": "610100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610113",
                        "area_name": "雁塔区",
                        "parent_id": "610100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610114",
                        "area_name": "阎良区",
                        "parent_id": "610100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610115",
                        "area_name": "临潼区",
                        "parent_id": "610100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610116",
                        "area_name": "长安区",
                        "parent_id": "610100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610117",
                        "area_name": "高陵区",
                        "parent_id": "610100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610122",
                        "area_name": "蓝田县",
                        "parent_id": "610100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610124",
                        "area_name": "周至县",
                        "parent_id": "610100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610125",
                        "area_name": "户县",
                        "parent_id": "610100",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "610200",
                "area_name": "铜川市",
                "parent_id": "610000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "610201",
                        "area_name": "市辖区",
                        "parent_id": "610200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610202",
                        "area_name": "王益区",
                        "parent_id": "610200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610203",
                        "area_name": "印台区",
                        "parent_id": "610200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610204",
                        "area_name": "耀州区",
                        "parent_id": "610200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610222",
                        "area_name": "宜君县",
                        "parent_id": "610200",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "610300",
                "area_name": "宝鸡市",
                "parent_id": "610000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "610301",
                        "area_name": "市辖区",
                        "parent_id": "610300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610302",
                        "area_name": "渭滨区",
                        "parent_id": "610300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610303",
                        "area_name": "金台区",
                        "parent_id": "610300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610304",
                        "area_name": "陈仓区",
                        "parent_id": "610300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610322",
                        "area_name": "凤翔县",
                        "parent_id": "610300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610323",
                        "area_name": "岐山县",
                        "parent_id": "610300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610324",
                        "area_name": "扶风县",
                        "parent_id": "610300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610326",
                        "area_name": "眉县",
                        "parent_id": "610300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610327",
                        "area_name": "陇县",
                        "parent_id": "610300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610328",
                        "area_name": "千阳县",
                        "parent_id": "610300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610329",
                        "area_name": "麟游县",
                        "parent_id": "610300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610330",
                        "area_name": "凤县",
                        "parent_id": "610300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610331",
                        "area_name": "太白县",
                        "parent_id": "610300",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "610400",
                "area_name": "咸阳市",
                "parent_id": "610000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "610401",
                        "area_name": "市辖区",
                        "parent_id": "610400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610402",
                        "area_name": "秦都区",
                        "parent_id": "610400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610403",
                        "area_name": "杨陵区",
                        "parent_id": "610400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610404",
                        "area_name": "渭城区",
                        "parent_id": "610400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610422",
                        "area_name": "三原县",
                        "parent_id": "610400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610423",
                        "area_name": "泾阳县",
                        "parent_id": "610400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610424",
                        "area_name": "乾县",
                        "parent_id": "610400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610425",
                        "area_name": "礼泉县",
                        "parent_id": "610400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610426",
                        "area_name": "永寿县",
                        "parent_id": "610400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610427",
                        "area_name": "彬县",
                        "parent_id": "610400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610428",
                        "area_name": "长武县",
                        "parent_id": "610400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610429",
                        "area_name": "旬邑县",
                        "parent_id": "610400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610430",
                        "area_name": "淳化县",
                        "parent_id": "610400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610431",
                        "area_name": "武功县",
                        "parent_id": "610400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610481",
                        "area_name": "兴平市",
                        "parent_id": "610400",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "610500",
                "area_name": "渭南市",
                "parent_id": "610000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "610501",
                        "area_name": "市辖区",
                        "parent_id": "610500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610502",
                        "area_name": "临渭区",
                        "parent_id": "610500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610503",
                        "area_name": "华州区",
                        "parent_id": "610500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610522",
                        "area_name": "潼关县",
                        "parent_id": "610500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610523",
                        "area_name": "大荔县",
                        "parent_id": "610500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610524",
                        "area_name": "合阳县",
                        "parent_id": "610500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610525",
                        "area_name": "澄城县",
                        "parent_id": "610500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610526",
                        "area_name": "蒲城县",
                        "parent_id": "610500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610527",
                        "area_name": "白水县",
                        "parent_id": "610500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610528",
                        "area_name": "富平县",
                        "parent_id": "610500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610581",
                        "area_name": "韩城市",
                        "parent_id": "610500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610582",
                        "area_name": "华阴市",
                        "parent_id": "610500",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "610600",
                "area_name": "延安市",
                "parent_id": "610000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "610601",
                        "area_name": "市辖区",
                        "parent_id": "610600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610602",
                        "area_name": "宝塔区",
                        "parent_id": "610600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610603",
                        "area_name": "安塞区",
                        "parent_id": "610600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610621",
                        "area_name": "延长县",
                        "parent_id": "610600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610622",
                        "area_name": "延川县",
                        "parent_id": "610600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610623",
                        "area_name": "子长县",
                        "parent_id": "610600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610625",
                        "area_name": "志丹县",
                        "parent_id": "610600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610626",
                        "area_name": "吴起县",
                        "parent_id": "610600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610627",
                        "area_name": "甘泉县",
                        "parent_id": "610600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610628",
                        "area_name": "富县",
                        "parent_id": "610600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610629",
                        "area_name": "洛川县",
                        "parent_id": "610600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610630",
                        "area_name": "宜川县",
                        "parent_id": "610600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610631",
                        "area_name": "黄龙县",
                        "parent_id": "610600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610632",
                        "area_name": "黄陵县",
                        "parent_id": "610600",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "610700",
                "area_name": "汉中市",
                "parent_id": "610000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "610701",
                        "area_name": "市辖区",
                        "parent_id": "610700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610702",
                        "area_name": "汉台区",
                        "parent_id": "610700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610721",
                        "area_name": "南郑县",
                        "parent_id": "610700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610722",
                        "area_name": "城固县",
                        "parent_id": "610700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610723",
                        "area_name": "洋县",
                        "parent_id": "610700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610724",
                        "area_name": "西乡县",
                        "parent_id": "610700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610725",
                        "area_name": "勉县",
                        "parent_id": "610700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610726",
                        "area_name": "宁强县",
                        "parent_id": "610700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610727",
                        "area_name": "略阳县",
                        "parent_id": "610700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610728",
                        "area_name": "镇巴县",
                        "parent_id": "610700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610729",
                        "area_name": "留坝县",
                        "parent_id": "610700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610730",
                        "area_name": "佛坪县",
                        "parent_id": "610700",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "610800",
                "area_name": "榆林市",
                "parent_id": "610000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "610801",
                        "area_name": "市辖区",
                        "parent_id": "610800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610802",
                        "area_name": "榆阳区",
                        "parent_id": "610800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610803",
                        "area_name": "横山区",
                        "parent_id": "610800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610821",
                        "area_name": "神木县",
                        "parent_id": "610800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610822",
                        "area_name": "府谷县",
                        "parent_id": "610800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610824",
                        "area_name": "靖边县",
                        "parent_id": "610800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610825",
                        "area_name": "定边县",
                        "parent_id": "610800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610826",
                        "area_name": "绥德县",
                        "parent_id": "610800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610827",
                        "area_name": "米脂县",
                        "parent_id": "610800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610828",
                        "area_name": "佳县",
                        "parent_id": "610800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610829",
                        "area_name": "吴堡县",
                        "parent_id": "610800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610830",
                        "area_name": "清涧县",
                        "parent_id": "610800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610831",
                        "area_name": "子洲县",
                        "parent_id": "610800",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "610900",
                "area_name": "安康市",
                "parent_id": "610000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "610901",
                        "area_name": "市辖区",
                        "parent_id": "610900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610902",
                        "area_name": "汉滨区",
                        "parent_id": "610900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610921",
                        "area_name": "汉阴县",
                        "parent_id": "610900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610922",
                        "area_name": "石泉县",
                        "parent_id": "610900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610923",
                        "area_name": "宁陕县",
                        "parent_id": "610900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610924",
                        "area_name": "紫阳县",
                        "parent_id": "610900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610925",
                        "area_name": "岚皋县",
                        "parent_id": "610900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610926",
                        "area_name": "平利县",
                        "parent_id": "610900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610927",
                        "area_name": "镇坪县",
                        "parent_id": "610900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610928",
                        "area_name": "旬阳县",
                        "parent_id": "610900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "610929",
                        "area_name": "白河县",
                        "parent_id": "610900",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "611000",
                "area_name": "商洛市",
                "parent_id": "610000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "611001",
                        "area_name": "市辖区",
                        "parent_id": "611000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "611002",
                        "area_name": "商州区",
                        "parent_id": "611000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "611021",
                        "area_name": "洛南县",
                        "parent_id": "611000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "611022",
                        "area_name": "丹凤县",
                        "parent_id": "611000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "611023",
                        "area_name": "商南县",
                        "parent_id": "611000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "611024",
                        "area_name": "山阳县",
                        "parent_id": "611000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "611025",
                        "area_name": "镇安县",
                        "parent_id": "611000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "611026",
                        "area_name": "柞水县",
                        "parent_id": "611000",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            }
        ]
    },
    {
        "area_id": "620000",
        "area_name": "甘肃省",
        "parent_id": "0",
        "level": "1",
        "sub_area": [
            {
                "area_id": "620100",
                "area_name": "兰州市",
                "parent_id": "620000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "620101",
                        "area_name": "市辖区",
                        "parent_id": "620100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "620102",
                        "area_name": "城关区",
                        "parent_id": "620100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "620103",
                        "area_name": "七里河区",
                        "parent_id": "620100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "620104",
                        "area_name": "西固区",
                        "parent_id": "620100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "620105",
                        "area_name": "安宁区",
                        "parent_id": "620100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "620111",
                        "area_name": "红古区",
                        "parent_id": "620100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "620121",
                        "area_name": "永登县",
                        "parent_id": "620100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "620122",
                        "area_name": "皋兰县",
                        "parent_id": "620100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "620123",
                        "area_name": "榆中县",
                        "parent_id": "620100",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "620200",
                "area_name": "嘉峪关市",
                "parent_id": "620000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "620201",
                        "area_name": "市辖区",
                        "parent_id": "620200",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "620300",
                "area_name": "金昌市",
                "parent_id": "620000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "620301",
                        "area_name": "市辖区",
                        "parent_id": "620300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "620302",
                        "area_name": "金川区",
                        "parent_id": "620300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "620321",
                        "area_name": "永昌县",
                        "parent_id": "620300",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "620400",
                "area_name": "白银市",
                "parent_id": "620000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "620401",
                        "area_name": "市辖区",
                        "parent_id": "620400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "620402",
                        "area_name": "白银区",
                        "parent_id": "620400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "620403",
                        "area_name": "平川区",
                        "parent_id": "620400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "620421",
                        "area_name": "靖远县",
                        "parent_id": "620400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "620422",
                        "area_name": "会宁县",
                        "parent_id": "620400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "620423",
                        "area_name": "景泰县",
                        "parent_id": "620400",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "620500",
                "area_name": "天水市",
                "parent_id": "620000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "620501",
                        "area_name": "市辖区",
                        "parent_id": "620500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "620502",
                        "area_name": "秦州区",
                        "parent_id": "620500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "620503",
                        "area_name": "麦积区",
                        "parent_id": "620500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "620521",
                        "area_name": "清水县",
                        "parent_id": "620500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "620522",
                        "area_name": "秦安县",
                        "parent_id": "620500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "620523",
                        "area_name": "甘谷县",
                        "parent_id": "620500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "620524",
                        "area_name": "武山县",
                        "parent_id": "620500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "620525",
                        "area_name": "张家川回族自治县",
                        "parent_id": "620500",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "620600",
                "area_name": "武威市",
                "parent_id": "620000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "620601",
                        "area_name": "市辖区",
                        "parent_id": "620600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "620602",
                        "area_name": "凉州区",
                        "parent_id": "620600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "620621",
                        "area_name": "民勤县",
                        "parent_id": "620600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "620622",
                        "area_name": "古浪县",
                        "parent_id": "620600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "620623",
                        "area_name": "天祝藏族自治县",
                        "parent_id": "620600",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "620700",
                "area_name": "张掖市",
                "parent_id": "620000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "620701",
                        "area_name": "市辖区",
                        "parent_id": "620700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "620702",
                        "area_name": "甘州区",
                        "parent_id": "620700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "620721",
                        "area_name": "肃南裕固族自治县",
                        "parent_id": "620700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "620722",
                        "area_name": "民乐县",
                        "parent_id": "620700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "620723",
                        "area_name": "临泽县",
                        "parent_id": "620700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "620724",
                        "area_name": "高台县",
                        "parent_id": "620700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "620725",
                        "area_name": "山丹县",
                        "parent_id": "620700",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "620800",
                "area_name": "平凉市",
                "parent_id": "620000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "620801",
                        "area_name": "市辖区",
                        "parent_id": "620800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "620802",
                        "area_name": "崆峒区",
                        "parent_id": "620800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "620821",
                        "area_name": "泾川县",
                        "parent_id": "620800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "620822",
                        "area_name": "灵台县",
                        "parent_id": "620800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "620823",
                        "area_name": "崇信县",
                        "parent_id": "620800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "620824",
                        "area_name": "华亭县",
                        "parent_id": "620800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "620825",
                        "area_name": "庄浪县",
                        "parent_id": "620800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "620826",
                        "area_name": "静宁县",
                        "parent_id": "620800",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "620900",
                "area_name": "酒泉市",
                "parent_id": "620000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "620901",
                        "area_name": "市辖区",
                        "parent_id": "620900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "620902",
                        "area_name": "肃州区",
                        "parent_id": "620900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "620921",
                        "area_name": "金塔县",
                        "parent_id": "620900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "620922",
                        "area_name": "瓜州县",
                        "parent_id": "620900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "620923",
                        "area_name": "肃北蒙古族自治县",
                        "parent_id": "620900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "620924",
                        "area_name": "阿克塞哈萨克族自治县",
                        "parent_id": "620900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "620981",
                        "area_name": "玉门市",
                        "parent_id": "620900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "620982",
                        "area_name": "敦煌市",
                        "parent_id": "620900",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "621000",
                "area_name": "庆阳市",
                "parent_id": "620000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "621001",
                        "area_name": "市辖区",
                        "parent_id": "621000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "621002",
                        "area_name": "西峰区",
                        "parent_id": "621000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "621021",
                        "area_name": "庆城县",
                        "parent_id": "621000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "621022",
                        "area_name": "环县",
                        "parent_id": "621000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "621023",
                        "area_name": "华池县",
                        "parent_id": "621000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "621024",
                        "area_name": "合水县",
                        "parent_id": "621000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "621025",
                        "area_name": "正宁县",
                        "parent_id": "621000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "621026",
                        "area_name": "宁县",
                        "parent_id": "621000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "621027",
                        "area_name": "镇原县",
                        "parent_id": "621000",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "621100",
                "area_name": "定西市",
                "parent_id": "620000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "621101",
                        "area_name": "市辖区",
                        "parent_id": "621100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "621102",
                        "area_name": "安定区",
                        "parent_id": "621100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "621121",
                        "area_name": "通渭县",
                        "parent_id": "621100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "621122",
                        "area_name": "陇西县",
                        "parent_id": "621100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "621123",
                        "area_name": "渭源县",
                        "parent_id": "621100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "621124",
                        "area_name": "临洮县",
                        "parent_id": "621100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "621125",
                        "area_name": "漳县",
                        "parent_id": "621100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "621126",
                        "area_name": "岷县",
                        "parent_id": "621100",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "621200",
                "area_name": "陇南市",
                "parent_id": "620000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "621201",
                        "area_name": "市辖区",
                        "parent_id": "621200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "621202",
                        "area_name": "武都区",
                        "parent_id": "621200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "621221",
                        "area_name": "成县",
                        "parent_id": "621200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "621222",
                        "area_name": "文县",
                        "parent_id": "621200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "621223",
                        "area_name": "宕昌县",
                        "parent_id": "621200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "621224",
                        "area_name": "康县",
                        "parent_id": "621200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "621225",
                        "area_name": "西和县",
                        "parent_id": "621200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "621226",
                        "area_name": "礼县",
                        "parent_id": "621200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "621227",
                        "area_name": "徽县",
                        "parent_id": "621200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "621228",
                        "area_name": "两当县",
                        "parent_id": "621200",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "622900",
                "area_name": "临夏回族自治州",
                "parent_id": "620000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "622901",
                        "area_name": "临夏市",
                        "parent_id": "622900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "622921",
                        "area_name": "临夏县",
                        "parent_id": "622900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "622922",
                        "area_name": "康乐县",
                        "parent_id": "622900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "622923",
                        "area_name": "永靖县",
                        "parent_id": "622900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "622924",
                        "area_name": "广河县",
                        "parent_id": "622900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "622925",
                        "area_name": "和政县",
                        "parent_id": "622900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "622926",
                        "area_name": "东乡族自治县",
                        "parent_id": "622900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "622927",
                        "area_name": "积石山保安族东乡族撒拉族自治县",
                        "parent_id": "622900",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "623000",
                "area_name": "甘南藏族自治州",
                "parent_id": "620000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "623001",
                        "area_name": "合作市",
                        "parent_id": "623000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "623021",
                        "area_name": "临潭县",
                        "parent_id": "623000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "623022",
                        "area_name": "卓尼县",
                        "parent_id": "623000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "623023",
                        "area_name": "舟曲县",
                        "parent_id": "623000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "623024",
                        "area_name": "迭部县",
                        "parent_id": "623000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "623025",
                        "area_name": "玛曲县",
                        "parent_id": "623000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "623026",
                        "area_name": "碌曲县",
                        "parent_id": "623000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "623027",
                        "area_name": "夏河县",
                        "parent_id": "623000",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            }
        ]
    },
    {
        "area_id": "630000",
        "area_name": "青海省",
        "parent_id": "0",
        "level": "1",
        "sub_area": [
            {
                "area_id": "630100",
                "area_name": "西宁市",
                "parent_id": "630000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "630101",
                        "area_name": "市辖区",
                        "parent_id": "630100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "630102",
                        "area_name": "城东区",
                        "parent_id": "630100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "630103",
                        "area_name": "城中区",
                        "parent_id": "630100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "630104",
                        "area_name": "城西区",
                        "parent_id": "630100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "630105",
                        "area_name": "城北区",
                        "parent_id": "630100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "630121",
                        "area_name": "大通回族土族自治县",
                        "parent_id": "630100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "630122",
                        "area_name": "湟中县",
                        "parent_id": "630100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "630123",
                        "area_name": "湟源县",
                        "parent_id": "630100",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "630200",
                "area_name": "海东市",
                "parent_id": "630000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "630202",
                        "area_name": "乐都区",
                        "parent_id": "630200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "630203",
                        "area_name": "平安区",
                        "parent_id": "630200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "630222",
                        "area_name": "民和回族土族自治县",
                        "parent_id": "630200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "630223",
                        "area_name": "互助土族自治县",
                        "parent_id": "630200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "630224",
                        "area_name": "化隆回族自治县",
                        "parent_id": "630200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "630225",
                        "area_name": "循化撒拉族自治县",
                        "parent_id": "630200",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "632200",
                "area_name": "海北藏族自治州",
                "parent_id": "630000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "632221",
                        "area_name": "门源回族自治县",
                        "parent_id": "632200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "632222",
                        "area_name": "祁连县",
                        "parent_id": "632200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "632223",
                        "area_name": "海晏县",
                        "parent_id": "632200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "632224",
                        "area_name": "刚察县",
                        "parent_id": "632200",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "632300",
                "area_name": "黄南藏族自治州",
                "parent_id": "630000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "632321",
                        "area_name": "同仁县",
                        "parent_id": "632300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "632322",
                        "area_name": "尖扎县",
                        "parent_id": "632300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "632323",
                        "area_name": "泽库县",
                        "parent_id": "632300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "632324",
                        "area_name": "河南蒙古族自治县",
                        "parent_id": "632300",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "632500",
                "area_name": "海南藏族自治州",
                "parent_id": "630000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "632521",
                        "area_name": "共和县",
                        "parent_id": "632500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "632522",
                        "area_name": "同德县",
                        "parent_id": "632500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "632523",
                        "area_name": "贵德县",
                        "parent_id": "632500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "632524",
                        "area_name": "兴海县",
                        "parent_id": "632500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "632525",
                        "area_name": "贵南县",
                        "parent_id": "632500",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "632600",
                "area_name": "果洛藏族自治州",
                "parent_id": "630000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "632621",
                        "area_name": "玛沁县",
                        "parent_id": "632600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "632622",
                        "area_name": "班玛县",
                        "parent_id": "632600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "632623",
                        "area_name": "甘德县",
                        "parent_id": "632600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "632624",
                        "area_name": "达日县",
                        "parent_id": "632600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "632625",
                        "area_name": "久治县",
                        "parent_id": "632600",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "632626",
                        "area_name": "玛多县",
                        "parent_id": "632600",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "632700",
                "area_name": "玉树藏族自治州",
                "parent_id": "630000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "632701",
                        "area_name": "玉树市",
                        "parent_id": "632700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "632722",
                        "area_name": "杂多县",
                        "parent_id": "632700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "632723",
                        "area_name": "称多县",
                        "parent_id": "632700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "632724",
                        "area_name": "治多县",
                        "parent_id": "632700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "632725",
                        "area_name": "囊谦县",
                        "parent_id": "632700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "632726",
                        "area_name": "曲麻莱县",
                        "parent_id": "632700",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "632800",
                "area_name": "海西蒙古族藏族自治州",
                "parent_id": "630000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "632801",
                        "area_name": "格尔木市",
                        "parent_id": "632800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "632802",
                        "area_name": "德令哈市",
                        "parent_id": "632800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "632821",
                        "area_name": "乌兰县",
                        "parent_id": "632800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "632822",
                        "area_name": "都兰县",
                        "parent_id": "632800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "632823",
                        "area_name": "天峻县",
                        "parent_id": "632800",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            }
        ]
    },
    {
        "area_id": "640000",
        "area_name": "宁夏回族自治区",
        "parent_id": "0",
        "level": "1",
        "sub_area": [
            {
                "area_id": "640100",
                "area_name": "银川市",
                "parent_id": "640000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "640101",
                        "area_name": "市辖区",
                        "parent_id": "640100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "640104",
                        "area_name": "兴庆区",
                        "parent_id": "640100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "640105",
                        "area_name": "西夏区",
                        "parent_id": "640100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "640106",
                        "area_name": "金凤区",
                        "parent_id": "640100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "640121",
                        "area_name": "永宁县",
                        "parent_id": "640100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "640122",
                        "area_name": "贺兰县",
                        "parent_id": "640100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "640181",
                        "area_name": "灵武市",
                        "parent_id": "640100",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "640200",
                "area_name": "石嘴山市",
                "parent_id": "640000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "640201",
                        "area_name": "市辖区",
                        "parent_id": "640200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "640202",
                        "area_name": "大武口区",
                        "parent_id": "640200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "640205",
                        "area_name": "惠农区",
                        "parent_id": "640200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "640221",
                        "area_name": "平罗县",
                        "parent_id": "640200",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "640300",
                "area_name": "吴忠市",
                "parent_id": "640000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "640301",
                        "area_name": "市辖区",
                        "parent_id": "640300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "640302",
                        "area_name": "利通区",
                        "parent_id": "640300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "640303",
                        "area_name": "红寺堡区",
                        "parent_id": "640300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "640323",
                        "area_name": "盐池县",
                        "parent_id": "640300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "640324",
                        "area_name": "同心县",
                        "parent_id": "640300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "640381",
                        "area_name": "青铜峡市",
                        "parent_id": "640300",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "640400",
                "area_name": "固原市",
                "parent_id": "640000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "640401",
                        "area_name": "市辖区",
                        "parent_id": "640400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "640402",
                        "area_name": "原州区",
                        "parent_id": "640400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "640422",
                        "area_name": "西吉县",
                        "parent_id": "640400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "640423",
                        "area_name": "隆德县",
                        "parent_id": "640400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "640424",
                        "area_name": "泾源县",
                        "parent_id": "640400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "640425",
                        "area_name": "彭阳县",
                        "parent_id": "640400",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "640500",
                "area_name": "中卫市",
                "parent_id": "640000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "640501",
                        "area_name": "市辖区",
                        "parent_id": "640500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "640502",
                        "area_name": "沙坡头区",
                        "parent_id": "640500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "640521",
                        "area_name": "中宁县",
                        "parent_id": "640500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "640522",
                        "area_name": "海原县",
                        "parent_id": "640500",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            }
        ]
    },
    {
        "area_id": "650000",
        "area_name": "新疆维吾尔自治区",
        "parent_id": "0",
        "level": "1",
        "sub_area": [
            {
                "area_id": "650100",
                "area_name": "乌鲁木齐市",
                "parent_id": "650000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "650101",
                        "area_name": "市辖区",
                        "parent_id": "650100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "650102",
                        "area_name": "天山区",
                        "parent_id": "650100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "650103",
                        "area_name": "沙依巴克区",
                        "parent_id": "650100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "650104",
                        "area_name": "新市区",
                        "parent_id": "650100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "650105",
                        "area_name": "水磨沟区",
                        "parent_id": "650100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "650106",
                        "area_name": "头屯河区",
                        "parent_id": "650100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "650107",
                        "area_name": "达坂城区",
                        "parent_id": "650100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "650109",
                        "area_name": "米东区",
                        "parent_id": "650100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "650121",
                        "area_name": "乌鲁木齐县",
                        "parent_id": "650100",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "650200",
                "area_name": "克拉玛依市",
                "parent_id": "650000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "650201",
                        "area_name": "市辖区",
                        "parent_id": "650200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "650202",
                        "area_name": "独山子区",
                        "parent_id": "650200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "650203",
                        "area_name": "克拉玛依区",
                        "parent_id": "650200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "650204",
                        "area_name": "白碱滩区",
                        "parent_id": "650200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "650205",
                        "area_name": "乌尔禾区",
                        "parent_id": "650200",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "650400",
                "area_name": "吐鲁番市",
                "parent_id": "650000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "650402",
                        "area_name": "高昌区",
                        "parent_id": "650400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "650421",
                        "area_name": "鄯善县",
                        "parent_id": "650400",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "650422",
                        "area_name": "托克逊县",
                        "parent_id": "650400",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "650500",
                "area_name": "哈密市",
                "parent_id": "650000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "650502",
                        "area_name": "伊州区",
                        "parent_id": "650500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "650521",
                        "area_name": "巴里坤哈萨克自治县",
                        "parent_id": "650500",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "650522",
                        "area_name": "伊吾县",
                        "parent_id": "650500",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "652300",
                "area_name": "昌吉回族自治州",
                "parent_id": "650000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "652301",
                        "area_name": "昌吉市",
                        "parent_id": "652300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "652302",
                        "area_name": "阜康市",
                        "parent_id": "652300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "652323",
                        "area_name": "呼图壁县",
                        "parent_id": "652300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "652324",
                        "area_name": "玛纳斯县",
                        "parent_id": "652300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "652325",
                        "area_name": "奇台县",
                        "parent_id": "652300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "652327",
                        "area_name": "吉木萨尔县",
                        "parent_id": "652300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "652328",
                        "area_name": "木垒哈萨克自治县",
                        "parent_id": "652300",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "652700",
                "area_name": "博尔塔拉蒙古自治州",
                "parent_id": "650000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "652701",
                        "area_name": "博乐市",
                        "parent_id": "652700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "652702",
                        "area_name": "阿拉山口市",
                        "parent_id": "652700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "652722",
                        "area_name": "精河县",
                        "parent_id": "652700",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "652723",
                        "area_name": "温泉县",
                        "parent_id": "652700",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "652800",
                "area_name": "巴音郭楞蒙古自治州",
                "parent_id": "650000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "652801",
                        "area_name": "库尔勒市",
                        "parent_id": "652800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "652822",
                        "area_name": "轮台县",
                        "parent_id": "652800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "652823",
                        "area_name": "尉犁县",
                        "parent_id": "652800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "652824",
                        "area_name": "若羌县",
                        "parent_id": "652800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "652825",
                        "area_name": "且末县",
                        "parent_id": "652800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "652826",
                        "area_name": "焉耆回族自治县",
                        "parent_id": "652800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "652827",
                        "area_name": "和静县",
                        "parent_id": "652800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "652828",
                        "area_name": "和硕县",
                        "parent_id": "652800",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "652829",
                        "area_name": "博湖县",
                        "parent_id": "652800",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "652900",
                "area_name": "阿克苏地区",
                "parent_id": "650000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "652901",
                        "area_name": "阿克苏市",
                        "parent_id": "652900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "652922",
                        "area_name": "温宿县",
                        "parent_id": "652900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "652923",
                        "area_name": "库车县",
                        "parent_id": "652900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "652924",
                        "area_name": "沙雅县",
                        "parent_id": "652900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "652925",
                        "area_name": "新和县",
                        "parent_id": "652900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "652926",
                        "area_name": "拜城县",
                        "parent_id": "652900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "652927",
                        "area_name": "乌什县",
                        "parent_id": "652900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "652928",
                        "area_name": "阿瓦提县",
                        "parent_id": "652900",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "652929",
                        "area_name": "柯坪县",
                        "parent_id": "652900",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "653000",
                "area_name": "克孜勒苏柯尔克孜自治州",
                "parent_id": "650000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "653001",
                        "area_name": "阿图什市",
                        "parent_id": "653000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "653022",
                        "area_name": "阿克陶县",
                        "parent_id": "653000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "653023",
                        "area_name": "阿合奇县",
                        "parent_id": "653000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "653024",
                        "area_name": "乌恰县",
                        "parent_id": "653000",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "653100",
                "area_name": "喀什地区",
                "parent_id": "650000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "653101",
                        "area_name": "喀什市",
                        "parent_id": "653100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "653121",
                        "area_name": "疏附县",
                        "parent_id": "653100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "653122",
                        "area_name": "疏勒县",
                        "parent_id": "653100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "653123",
                        "area_name": "英吉沙县",
                        "parent_id": "653100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "653124",
                        "area_name": "泽普县",
                        "parent_id": "653100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "653125",
                        "area_name": "莎车县",
                        "parent_id": "653100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "653126",
                        "area_name": "叶城县",
                        "parent_id": "653100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "653127",
                        "area_name": "麦盖提县",
                        "parent_id": "653100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "653128",
                        "area_name": "岳普湖县",
                        "parent_id": "653100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "653129",
                        "area_name": "伽师县",
                        "parent_id": "653100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "653130",
                        "area_name": "巴楚县",
                        "parent_id": "653100",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "653131",
                        "area_name": "塔什库尔干塔吉克自治县",
                        "parent_id": "653100",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "653200",
                "area_name": "和田地区",
                "parent_id": "650000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "653201",
                        "area_name": "和田市",
                        "parent_id": "653200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "653221",
                        "area_name": "和田县",
                        "parent_id": "653200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "653222",
                        "area_name": "墨玉县",
                        "parent_id": "653200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "653223",
                        "area_name": "皮山县",
                        "parent_id": "653200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "653224",
                        "area_name": "洛浦县",
                        "parent_id": "653200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "653225",
                        "area_name": "策勒县",
                        "parent_id": "653200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "653226",
                        "area_name": "于田县",
                        "parent_id": "653200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "653227",
                        "area_name": "民丰县",
                        "parent_id": "653200",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "654000",
                "area_name": "伊犁哈萨克自治州",
                "parent_id": "650000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "654002",
                        "area_name": "伊宁市",
                        "parent_id": "654000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "654003",
                        "area_name": "奎屯市",
                        "parent_id": "654000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "654004",
                        "area_name": "霍尔果斯市",
                        "parent_id": "654000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "654021",
                        "area_name": "伊宁县",
                        "parent_id": "654000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "654022",
                        "area_name": "察布查尔锡伯自治县",
                        "parent_id": "654000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "654023",
                        "area_name": "霍城县",
                        "parent_id": "654000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "654024",
                        "area_name": "巩留县",
                        "parent_id": "654000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "654025",
                        "area_name": "新源县",
                        "parent_id": "654000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "654026",
                        "area_name": "昭苏县",
                        "parent_id": "654000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "654027",
                        "area_name": "特克斯县",
                        "parent_id": "654000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "654028",
                        "area_name": "尼勒克县",
                        "parent_id": "654000",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "654200",
                "area_name": "塔城地区",
                "parent_id": "650000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "654201",
                        "area_name": "塔城市",
                        "parent_id": "654200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "654202",
                        "area_name": "乌苏市",
                        "parent_id": "654200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "654221",
                        "area_name": "额敏县",
                        "parent_id": "654200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "654223",
                        "area_name": "沙湾县",
                        "parent_id": "654200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "654224",
                        "area_name": "托里县",
                        "parent_id": "654200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "654225",
                        "area_name": "裕民县",
                        "parent_id": "654200",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "654226",
                        "area_name": "和布克赛尔蒙古自治县",
                        "parent_id": "654200",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "654300",
                "area_name": "阿勒泰地区",
                "parent_id": "650000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "654301",
                        "area_name": "阿勒泰市",
                        "parent_id": "654300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "654321",
                        "area_name": "布尔津县",
                        "parent_id": "654300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "654322",
                        "area_name": "富蕴县",
                        "parent_id": "654300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "654323",
                        "area_name": "福海县",
                        "parent_id": "654300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "654324",
                        "area_name": "哈巴河县",
                        "parent_id": "654300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "654325",
                        "area_name": "青河县",
                        "parent_id": "654300",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "654326",
                        "area_name": "吉木乃县",
                        "parent_id": "654300",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            },
            {
                "area_id": "659000",
                "area_name": "自治区直辖县级行政区划",
                "parent_id": "650000",
                "level": "2",
                "sub_area": [
                    {
                        "area_id": "659001",
                        "area_name": "石河子市",
                        "parent_id": "659000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "659002",
                        "area_name": "阿拉尔市",
                        "parent_id": "659000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "659003",
                        "area_name": "图木舒克市",
                        "parent_id": "659000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "659004",
                        "area_name": "五家渠市",
                        "parent_id": "659000",
                        "level": "3",
                        "sub_area": []
                    },
                    {
                        "area_id": "659006",
                        "area_name": "铁门关市",
                        "parent_id": "659000",
                        "level": "3",
                        "sub_area": []
                    }
                ]
            }
        ]
    },
    {
        "area_id": "710000",
        "area_name": "台湾省",
        "parent_id": "0",
        "level": "1",
        "sub_area": []
    },
    {
        "area_id": "810000",
        "area_name": "香港特别行政区",
        "parent_id": "0",
        "level": "1",
        "sub_area": []
    },
    {
        "area_id": "820000",
        "area_name": "澳门特别行政区",
        "parent_id": "0",
        "level": "1",
        "sub_area": []
    }
];
    if ( typeof module != 'undefined' && module.exports ) {
        module.exports = cityData;
    } else {
        window.cityData = cityData;
    }

})(window, document, Math);