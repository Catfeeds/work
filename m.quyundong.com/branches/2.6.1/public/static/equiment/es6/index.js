function msg(_hintMsg){
    var _msg = "<div style='font-size: 16px;padding: 10px; position: absolute;top:50%;left: 50%;background: rgba(10,10,10,0.7);z-index: 10005;color: white;transform: translate(-50%,50%);'>";
        _msg = _msg+_hintMsg+"</div>";
     document.getElementsByTagName("html")[0].insertAfter(_msg);
     console.log(document.getElementsByTagName("html")[0])
}
var app = new Vue({
  el: '#app',
  data: {
    initEqui:{
    	group_info:{group_price:0},
    	pic_list:[" "],
    	service_list:[],
    },
    pre:20, //参团人数百分比
    have_join:0, //已经参加人数
    tips:'后结束',
    sel_property:{
        pic:"",
        price:"0.01",
        mount:1,
        property:[{name:"",sel:{}}],
        goods_id:"",
        group_id:"",
        hint:["请选择"],
        origin_hint:["请选择"],
        pro:{} //商品id
    },//已选属性
  },
  beforeCreate(){
  	axios.get("/user/indexAction", {
		params: {
			ID: 123555
		}
	})
	.then((res)=>{
		let initEqui = res.data;
		let pre = initEqui.group_info.group_join_count/initEqui.group_info.group_count*100;
            pre = pre>20?(pre>100?100:pre):20;
        let have_join = pre>100?"已成团":initEqui.group_info.group_join_count+'人参与';
        this.pre = pre;
        this.have_join = have_join;

        // init time
        let now = Date.parse(new Date())/1000;
        let status = initEqui.group_info.is_group;
        let time = status==2 ? initEqui.group_info.start_time: initEqui.group_info.end_time;
        let tips = status ==2 ? '后开始拼团' : '后结束';
        this.tips = tips;

        // 时间计时器
        window.setInterval(()=>{
            now ++;
            let last = time - now;
            let h,i,s;
            if(last>0){
                h = parseInt(last / 3600);
            let hl = last % 3600;
                i = parseInt( hl / 60);
            let il = hl % 60;
                if(h<2) h = '0'+h;
                if(i.length<2) i = '0'+i;
                if(il.length<2) il = '0'+il;
                $('#start_time span').html(h + ':' + i + ':' + il );
                //this.time = h + ':' + i + ':' + il;
            }else{
                $('#start_time').remove();
            }
        }, 1000);
        let timer = setTimeout(function(){
            init();
        },500);

        // 属性选择初始化赋值 1 可选  2 已选  3 不能选
        for (let i = 0; i < initEqui.property_list.length; i++) {
            for (let j = 0; j < initEqui.property_list[i].list.length; j++) {
                initEqui.property_list[i].list[j].status = 1;
            }
        }

        // 初始化选择对象
        let sel_property = {property:[],hint:['请选择'],origin_hint:['请选择']};
        for (let i = 0; i < initEqui.property_list.length; i++) {
            sel_property.property.push({  name:initEqui.property_list[i].name,sel:{}  });
            sel_property.hint.push(initEqui.property_list[i].name);
            sel_property.origin_hint.push(initEqui.property_list[i].name);
        }
        sel_property.pic = initEqui.property_pic;
        sel_property.price = initEqui.price;
        sel_property.mount = 1;
        sel_property.goods_id = initEqui.goods_id;
        sel_property.group_id = initEqui.group_info?initEqui.group_info.group_id:"";
        this.sel_property = sel_property;

        this.initEqui = initEqui;
        console.log(this.initEqui);
	})
	.catch(function (error) {
		console.log(error);
	});
  },
  mounted(){

  },
  methods:{
    showEnsure(){
        $("#goods_ensure_bg").show();
        $(".goods-ensure-detail").animate({ bottom: 0 },function () {
            $("body").css({ height: '100%',overflow:"hidden"});
        });
        $(".goods-ensure-detail").css({
            bottom: 0,
        });
    },
    closeEnsure(){
        $("body").css({ height: 'auto',overflow:"auto"});
        $(".goods-ensure-detail").animate({ bottom: "-75%"},function () {
            $("#goods_ensure_bg").hide();
        })
    },
  	buyReady(buyStatus){
        $("#sel_goods_bg").show();
        $("body").css({ height: '100%',overflow:"hidden"});
        let timeout = setTimeout(function(){
            $(".sel-goods").css({transform: 'translateY(0%)' });
        },10);

        console.log(this.sel_property);
        if (this.sel_property.pro) {
            if (buyStatus==1) { //已选是单独购买价格
                this.sel_property.price = this.sel_property.pro.price;
                this.sel_property.group_id = "";
            }else if(buyStatus==2){ //当前已选是拼团价
                this.sel_property.price = this.sel_property.pro.group_price;
                this.sel_property.group_id = this.initEqui.group_info.group_id;
            }
        }else{ //首次选择
            if (buyStatus==1) { //已选是单独购买价格
                this.sel_property.price = this.initEqui.price;
                this.sel_property.group_id = "";
            }else if(buyStatus==2){ //当前已选是拼团价
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
    closeSel(e){
        $(".sel-goods").css({transform: 'translateY(105%)' });
        let timer = setTimeout(function () {
            $("#sel_goods_bg").hide();
            $("body").css({ height: 'auto',overflow:"auto"});
        },500);
    },
    stopPro(e){
       e.stopPropagation();
    },
    selProperty(item,index,i,status){//index=>所选属性下标  i=>属性项下标  status 1=>可选 2=>已选 3=>不可选
        if (status==3) { return ; }
        // let have_sel_id = this.sel_property.property[index].sel.cat_pro_value_id;
        // let goods_id = item.list[i].cat_pro_value_id
        if (status==2) { //已选再点就取消选择
            this.sel_property.property[index].sel = {};
            this.initEqui.property_list[index].list[i].status = 1;
        }else{
            this.sel_property.property[index].sel = item.list[i];
            this.initEqui.property_list[index].list[i].status = 2;
        }

        // 购买栏提示语改变
        let have_sel_property = this.sel_property.property;
        let hint = [];
        let assemble = [];//属性组合
        for(let i = 0; i < have_sel_property.length; i++) {
            if (have_sel_property[i].sel.value) {
                hint.push(have_sel_property[i].sel.value);
            }
            assemble.push(have_sel_property[i].sel.cat_pro_value_id);
        };
        if (hint.length>0) {
            hint.unshift('已选');
            this.sel_property.hint = hint;
        }else if (hint.length == 0) {
            this.sel_property.hint = this.sel_property.origin_hint;
        }


        let goods = this.initEqui.product_list;
        let can_sel_array = [];
        for (let l = 0; l < goods.length; l++) { //查找剩余可选组合
            let can_sel = true;
            for (let k = 0; k < assemble.length; k++) {
                if(assemble[k]!=goods[l].spe_list[k]&&assemble[k]){
                    can_sel = false;
                }
            }
            if (can_sel) {  can_sel_array.push(goods[l])  }
        }

        let initEqui = this.initEqui;
        // 属性选择初始化赋值 1 可选  2 已选  3 不能选
        for (let i = 0; i < initEqui.property_list.length; i++) {
            for (let j = 0; j < initEqui.property_list[i].list.length; j++) {
                for (let o = 0; o < can_sel_array.length; o++) {
                    if (initEqui.property_list[i].list[j].cat_pro_value_id==can_sel_array[o].spe_list[i]) {
                        if (initEqui.property_list[i].list[j].status !=2 ) {
                            initEqui.property_list[i].list[j].status = 1;
                        };
                        break ;
                    }else{
                        initEqui.property_list[i].list[j].status = 3;
                    }
                }
            }
        }

        // 通过属性组合查找对应商品
        for (let y = 0; y < goods.length; y++) {
            if(assemble.join(',')==goods[y].spe_list.join(',')){
                this.sel_property.pic = goods[y].pic;
                this.sel_property.price = this.sel_property.group_id?goods[y].group_price:goods[y].price;
                this.sel_property.pro = goods[y];
            }else{
                this.sel_property.pro = "";
            }
        };

    },
    chgMount(mount){
        let origin_mount = this.sel_property.mount + mount;
        this.sel_property.mount = origin_mount<=1?1:origin_mount;
    },
    goBuy(){ //确认购买
       console.log(this.sel_property);
       let property = this.sel_property.property;
       for (let i = 0; i < property.length; i++) {
           if(!property[i].sel.cat_pro_value_id){
            msg("请输入"+property[i].name);
            return ;
           }
       }
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
        autoplayDisableOnInteraction: false,
    });
}

