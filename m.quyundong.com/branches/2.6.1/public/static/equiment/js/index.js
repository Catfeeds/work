alert("浏览器快跑起来")
var app = new Vue({
    el: '#app',
    data: {
        initEqui: {
            group_info: { group_price: 0 },
            pic_list: [" "],
            service_list: []
        },
        pre: 20, //参团人数百分比
        have_join: 0, //已经参加人数
        tips: '后结束',
        sel_property: {
            pic: "",
            price: "0.01",
            mount: 1,
            property: [{ name: "", sel: {} }],
            goods_id: "",
            group_id: "",
            hint: ["请选择"],
            origin_hint: ["请选择"],
            pro: {} //商品id
        } //已选属性
    },
    beforeCreate: function() {
        var _this = this;
        axios.get("/equiment/getGoodsData", {
            params: {
                id: goodsId
            }
        }).then(function (res) {
            if(res.data.status!='0000'){
                var msg = res.data.msg ? res.data.msg : '系统繁忙';
                return;
            }
            var initEqui = res.data.data;
            var pre = initEqui.group_info.group_join_count / initEqui.group_info.group_count * 100;
            pre = pre > 20 ? pre > 100 ? 100 : pre : 20;
            var have_join = pre >= 100 ? "已成团" : initEqui.group_info.group_join_count + '人参与';
            _this.pre = pre;
            _this.have_join = have_join;

            // init time
            var now = Date.parse(new Date()) / 1000;
            var status = initEqui.group_info.is_group;
            var time = status == 2 ? initEqui.group_info.start_time : initEqui.group_info.end_time;
            var tips = status == 2 ? '后开始拼团' : '后结束';
            _this.tips = tips;
            // 时间计时器
            window.setInterval(function () {
                now++;
                var last = time - now;
                var h = void 0,
                    i = void 0,
                    s = void 0;
                if (last > 0) {
                    h = parseInt(last / 3600);
                    var hl = last % 3600;
                    i = parseInt(hl / 60);
                    var il = hl % 60;
                    if (h < 2) h = '0' + h;
                    if (i.length < 2) i = '0' + i;
                    if (il.length < 2) il = '0' + il;
                    $('#start_time span').html(h + ':' + i + ':' + il);
                    //this.time = h + ':' + i + ':' + il;
                } else {
                    $('#start_time').remove();
                }
            }, 1000);
            var timer = setTimeout(function () {
                init();
            }, 500);

            // 属性选择初始化赋值 1 可选  2 已选  3 不能选
            for (var i = 0; i < initEqui.property_list.length; i++) {
                for (var j = 0; j < initEqui.property_list[i].list.length; j++) {
                    initEqui.property_list[i].list[j].status = 1;
                }
            }

            // 初始化选择对象
            var sel_property = { property: [], hint: ['请选择'], origin_hint: ['请选择'] };
            for (var _i = 0; _i < initEqui.property_list.length; _i++) {
                sel_property.property.push({ name: initEqui.property_list[_i].name, sel: {} });
                sel_property.hint.push(initEqui.property_list[_i].name);
                sel_property.origin_hint.push(initEqui.property_list[_i].name);
            }
            sel_property.pic = initEqui.property_pic;
            sel_property.price = initEqui.price;
            sel_property.mount = 1;
            sel_property.goods_id = initEqui.goods_id;
            sel_property.group_id = initEqui.group_info ? initEqui.group_info.group_id : "";
            _this.sel_property = sel_property;

            _this.initEqui = initEqui;

        }).catch(function (error) {
            console.log(error);
        });

    },
    updated: function() {
    },

    methods: {
        showEnsure: function() {
            $("#goods_ensure_bg").show();
            $(".goods-ensure-detail").animate({ bottom: 0 }, function () {
                $("body").css({ height: '100%', overflow: "hidden" });
            });
        },
        closeEnsure: function() {
            $("body").css({ height: 'auto', overflow: "auto" });
            $(".goods-ensure-detail").animate({ bottom: "-75%" }, function () {
                $("#goods_ensure_bg").hide();
            });
        },
        buyReady: function(buyStatus) {
            $("#sel_goods_bg").show();
            $("body").css({ height: '100%', overflow: "hidden" });
            var timeout = setTimeout(function () {
                $(".sel-goods").css({ transform: 'translateY(0%)' });
            }, 10);

            if (this.sel_property.pro) {
                if (buyStatus == 1) {
                    //已选是单独购买价格
                    this.sel_property.price = this.sel_property.pro.price;
                    this.sel_property.group_id = "";
                } else if (buyStatus == 2) {
                    //当前已选是拼团价
                    this.sel_property.price = this.sel_property.pro.group_price;
                    this.sel_property.group_id = this.initEqui.group_info.group_id;
                }
            } else {
                //首次选择
                if (buyStatus == 1) {
                    //已选是单独购买价格
                    this.sel_property.price = this.initEqui.price;
                    this.sel_property.group_id = "";
                } else if (buyStatus == 2) {
                    //当前已选是拼团价
                    this.sel_property.price = this.initEqui.group_info.group_price;
                    this.sel_property.group_id = this.initEqui.group_info.group_id;
                }
            }

            // if (buyStatus==1) { //已选是单独购买价格
            //     this.sel_property.price = this.initEqui.price;
            //     this.sel_property.group_id = "";
            // }else if(buyStatus==2){ //当前已选是拼团价
            //     this.sel_property.price = this.initEqui.group_info.group_price;
            //     this.sel_property.group_id = this.initEqui.group_info.group_id;
            // }
        },
        closeSel: function(e) {
            $(".sel-goods").css({ transform: 'translateY(105%)' });
            var timer = setTimeout(function () {
                $("#sel_goods_bg").hide();
                $("body").css({ height: 'auto', overflow: "auto" });
            }, 500);
        },
        stopPro: function(e) {
            e.stopPropagation();
        },
        selProperty: function(item, index, i, status) {
            //index=>所选属性下标  i=>属性项下标  status 1=>可选 2=>已选 3=>不可选
            if (status == 3) {
                return;
            }
            // let have_sel_id = this.sel_property.property[index].sel.cat_pro_value_id;
            // let goods_id = item.list[i].cat_pro_value_id
            if (status == 2) {
                //已选再点就取消选择
                this.sel_property.property[index].sel = {};
                this.initEqui.property_list[index].list[i].status = 1;
            } else {
                this.sel_property.property[index].sel = item.list[i];
                this.initEqui.property_list[index].list[i].status = 2;
            }

            // 购买栏提示语改变
            var have_sel_property = this.sel_property.property;
            var hint = [];
            var assemble = []; //属性组合
            for (var _i2 = 0; _i2 < have_sel_property.length; _i2++) {
                if (have_sel_property[_i2].sel.value) {
                    hint.push(have_sel_property[_i2].sel.value);
                }
                assemble.push(have_sel_property[_i2].sel.cat_pro_value_id);
            };
            if (hint.length > 0) {
                hint.unshift('已选');
                this.sel_property.hint = hint;
            } else if (hint.length == 0) {
                this.sel_property.hint = this.sel_property.origin_hint;
            }

            var goods = this.initEqui.product_list;
            var can_sel_array = [];
            for (var l = 0; l < goods.length; l++) {
                //查找剩余可选组合
                var can_sel = true; //默认可选
                for (var k = 0; k < assemble.length; k++) {
                    if (assemble[k] != goods[l].spe_list[k] && assemble[k] ) {
                        can_sel = false;
                    }
                }
                if (can_sel) {
                    can_sel_array.push(goods[l]);
                }
            }

            var initEqui = this.initEqui;
            // 属性选择初始化赋值 1 可选  2 已选  3 不能选
            for (var _i3 = 0; _i3 < initEqui.property_list.length; _i3++) {
                for (var j = 0; j < initEqui.property_list[_i3].list.length; j++) {
                    for (var o = 0; o < can_sel_array.length; o++) {
                        if (initEqui.property_list[_i3].list[j].cat_pro_value_id == can_sel_array[o].spe_list[_i3]) {
                            if (initEqui.property_list[_i3].list[j].status != 2) {
                                initEqui.property_list[_i3].list[j].status = 1;
                            };
                            break;
                        } else {
                            initEqui.property_list[_i3].list[j].status = 3;
                        }
                    }
                }
            }

            // 通过属性组合查找对应商品
            for (var y = 0; y < goods.length; y++) {
                if (assemble.join(',') == goods[y].spe_list.join(',')) {
                    this.sel_property.pic = goods[y].pic;
                    this.sel_property.price = this.sel_property.group_id ? goods[y].group_price : goods[y].price;
                    this.sel_property.pro = goods[y];
                    break;
                } else {
                    this.sel_property.pro = "";
                }
            };
        },
        chgMount: function(mount) {
            var origin_mount = this.sel_property.mount + mount;
            this.sel_property.mount = origin_mount <= 1 ? 1 : origin_mount;
        },
        goBuy: function() {
            //确认购买
            var u = navigator.userAgent;
            var device = "";
            if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
                  device
            } else if (u.indexOf('iPhone') > -1) {
                  device = "iphone"
            }

            var property = this.sel_property.property;
            for (var i = 0; i < property.length; i++) {
                if (!property[i].sel.cat_pro_value_id) {
                    if (device=="iphone") {
                        alert("请选择"+property[i].name)
                    }else{
                        msg("请选择" + property[i].name,1500);
                    } 
                    return;
                }
            }

            if(parseInt(this.sel_property.pro.stock)<this.sel_property.mount){
                console.log(parseInt(this.sel_property.pro.stock),this.sel_property.mount)
                if (device=="iphone") {
                    alert("库存不足，剩余库存："+this.sel_property.pro.stock)
                }else{
                    msg("库存不足，剩余库存："+this.sel_property.pro.stock,1500);
                } 
                return ;
            }


            var params = {
                goods_id:this.sel_property.goods_id,
                group_id:this.sel_property.group_id?this.sel_property.group_id:0,
                mount:this.sel_property.mount,
                pro:this.sel_property.pro,
                name:this.initEqui.name,
                sel_property:this.sel_property.hint
            }

            window.localStorage.setItem("pro", JSON.stringify(params));

            var esc = encodeURIComponent;
            var queryData = {
                    goods_id:params.goods_id,
                    group_id:params.group_id,
                    pro_id:params.pro.pro_id,
                    number:params.mount
                };

            var query = Object.keys(queryData)
                .map(k => esc(k) + '=' + esc(queryData[k]))
                .join('&');
            window.location.href = '/order/confirmGoodsOrder?'+query;

        }
    }
});
function init(argument) {
    // banner
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        paginationClickable: true,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: 2500,
        autoplayDisableOnInteraction: false
    });
}