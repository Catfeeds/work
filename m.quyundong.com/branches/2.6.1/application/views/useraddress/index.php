<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>地址管理</title>
	<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
	<link rel="stylesheet" type="text/css" href="/static/equiment/plugin/bootstrap/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="/static/equiment/css/picker.css?v=2">
	<link rel="stylesheet" type="text/css" href="/static/equiment/css/address.css">
	

	<script type="text/javascript" src='/static/equiment/plugin/vue.min.js'></script>
	<script type="text/javascript" src="/static/equiment/plugin/city.js?v=1"></script>
	<script type="text/javascript" src="/static/equiment/plugin/picker.min.js?v=1"></script>
	<script type="text/javascript" src="/static/equiment/plugin/jquery-2.1.1.min.js"></script>
	<script type="text/javascript" src="/static/js/commom.js"></script>
	<script>
		loading(true);
        var offWidth = window.screen.width/30;
        document.getElementsByTagName("html")[0].style.fontSize = offWidth + 'px';
    </script>
</head>
<body>
	<div class="bg" id="address">
		<!-- head -->
	    <div class="head">
	        <div class="glyphicon glyphicon-menu-left" onclick="<?php echo !$isSelect ? 'javascript:history.go(-1);' : 'javascript:parent.closeAddress();';?>"></div>
	        <div >场地管理</div>
	        <div><img src="/static/equiment/images/share-1.5x.png" style="display: none;"></div>
	    </div>

	    <div class="content">
	    	<div class="address">
	    		<?php
				if($addressList){
					foreach($addressList as $value){
	    		?>
		    	<div class="send-address" v-on:click="<?php echo !$isSelect ? 'editAddress' : 'selectAddress'?>({id:<?=$value['delivery_id']?>,consignee:'<?=$value['consignee']?>',mobile:<?=$value['mobile']?>,area:'<?=$value['province'].','.$value['city'].','.$value['area']?>',address:'<?=$value['detail_address']?>',is_default:<?=$value['is_default']?>,area_title:'<?=$value['province_city_area']?>'})">
					<div>
						<div><?php if($value['is_default']){?><span class="default">默认</span><?php }?> <?=$value['consignee']?> <?=$value['mobile']?></div>
						<div><?=$value['address']?></div>
					</div>
					<div class="glyphicon glyphicon-menu-right"></div>
				</div>
				<?php }}?>
			</div>
			<div class="new-address">
				<div class="add-btn" v-on:click="addAddress">新建收货地址</div>
			</div>
	    </div>
		
		<!-- 添加地址 -->
	    <div class="add-address" v-if="showAdd">
		    <div class="head">
		        <div class="glyphicon glyphicon-menu-left" v-on:click="closeEdit"></div>
		        <div >{{title}}</div>
		        <div><img src="" style="display: none;"></div>
		    </div>
		    <div class="add-address-content">
		    	<input type="text" id="consignee" name="consignee" placeholder="姓名" v-model="consignee">
		    	<input type="text" id="mobile" name="mobile" placeholder="手机号码" v-model="mobile">
		    	<div class="sel-city" v-on:click="showPick" style="color: #757575">
		    		<div>{{area_title?'':'所属城市'}} <strong id="area_title">{{area_title}}</strong></div>
		    		<div><div class="glyphicon glyphicon-menu-right"></div></div>
		    	</div>
		    	<input type="text" id="address" name="address" placeholder="详细地址" v-model="address">
		    </div>
		    	
		    <div>
		    	<div class="radio">
		    		<div class="ins" v-bind:style=" setDefault?'border-color:#5B75F2':'' " v-on:click="haveSelDefault">
		    			<div class="have-sel" v-bind:style=" setDefault?'background:#5B75F2':'' "></div>
		    		</div>
		    		<span>设为默认</span>
		    	</div>
		    </div>
		    <div class="save-address">
				<div class="add-btn" v-on:click="submitAddress()" v-bind:style="isNew?'margin:0 auto;':'margin:0 1rem;'">保存地址</div>
				<div class="del-btn" v-bind:style="isNew ? 'display:none;' : ''" v-on:click="deleteAddress()">删除地址</div>
			</div>
	    </div>
	</div>
</body>
<!-- <script type="text/javascript" src='/static/equiment/js/address.js'></script> -->
<script type="text/javascript">
	
    var app = new Vue({
		el: '#address',
		data: {
			id:0,
			isNew:true,
			showAdd: false,
			setDefault: true,
			consignee:"",
			area:"",
			is_default:1,
			mobile:"",
			address:"",
			area_default:"",
			area_title:""
		},
		mounted:function(){
			loading(false);
		},
		methods: {
			submitAddress:function(){
				if(this.isNew){
					this.addPost();
				}else{
					this.editPost();
				}
			},
			addPost:function(){
				var u = navigator.userAgent;
	            var device = "";
	            if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
	                  device
	            } else if (u.indexOf('iPhone') > -1) {
	                  device = "iphone"
	            }
				if(!this.consignee){
					device == "iphone"?alert("请填写收货人姓名"):msg('请填写收货人姓名',1500);
					return false;
				}
				if(!this.mobile){
					device == "iphone"?alert("请填写手机号"):msg('请填写手机号',1500);
					return false;
				}
				if(!this.area){
					device == "iphone"?alert("请选择地区"):msg('请选择地区',1500);
					return false;
				}
				if(!this.address){
					device == "iphone"?alert("请填写详细地址"):msg('请填写详细地址',1500);
					return false;
				}

				var param = {
					consignee:this.consignee,
					mobile:this.mobile,
					province:this.area[0],
					city:this.area[1],
					area:this.area[2],
					address:this.address,
					is_default:this.is_default
				}
				console.log(param);
				$.ajax({
					method:'post',
					url:'/user/addDeliverAddress',
					data:param,
					dataType:'json',
					success:function(res){
						if(res.status=='0000'){
							window.location.reload();
						}else{
							var msg = res.msg ? res.msg : '系统错误';
							alert(msg);
						}
					},
					error:function(){
						alert('系统异常');
					}
				});
			},
			editPost:function(){
				if(!this.id){
					device == "iphone"?alert("缺少id"):msg('缺少id',1500);
					return false;
				}
				if(!this.consignee){
					device == "iphone"?alert("请填写收货人姓名"):msg('请填写收货人姓名',1500);
					return false;
				}
				if(!this.mobile){
					device == "iphone"?alert("请填写手机号"):msg('请填写手机号',1500);
					return false;
				}
				console.log(this.area,this.area_default)
				if(!this.area && this.area_default){
					this.area = this.area_default.split(',');
					console.log(this.area);
				}
				if(!this.area){
					device == "iphone"?alert("请选择地区"):msg('请选择地区',1500);
					return false;
				}
				if(!this.address){
					device == "iphone"?alert("请填写详细地址"):msg('请填写详细地址',1500);
					return false;
				}

				var param = {
					id:this.id,
					consignee:this.consignee,
					mobile:this.mobile,
					province:this.area[0],
					city:this.area[1],
					area:this.area[2],
					address:this.address,
					is_default:this.is_default
				}
				console.log(param);
				$.ajax({
					method:'post',
					url:'/user/editDeliverAddress',
					data:param,
					dataType:'json',
					success:function(res){
						if(res.status=='0000'){
							window.location.reload();
						}else{
							var msg = res.msg ? res.msg : '系统错误';
							alert(msg);
						}
					},
					error:function(){
						alert('系统异常');
					}
				});
			},
			addAddress: function addAddress(submit) {
				this.title = '添加地址';
				this.showAdd = true;
				this.isNew = true;
			},
			editAddress:function(model){
				this.area = '';
				this.title = '编辑地址';
				this.isNew = false;
				this.showAdd = true;
				this.consignee = model.consignee;
				this.mobile = model.mobile;
				this.address = model.address;
				this.setDefault = model.is_default;
				this.id = model.id;
				this.area_default = model.area;
				this.area_title = model.area_title;
			},
			deleteAddress:function(){
				var param = {
					id:this.id
				}
				if(confirm('确定要删除吗?')){
					$.ajax({
						method:'post',
						url:'/user/removeDeliverAddress',
						data:param,
						dataType:'json',
						success:function(res){
							if(res.status=='0000'){
								window.location.reload();
							}else{
								var msg = res.msg ? res.msg : '系统错误';
								alert(msg);
							}
						},
						error:function(){
							alert('系统异常');
						}
					});
				}
			},
			selectAddress:function(model){
				parent.selectAddress(model); 
			},
			closeEdit:function(){
				this.showAdd = false;
			},
			haveSelDefault: function haveSelDefault() {
				this.setDefault = !this.setDefault;
				var val = this.setDefault ? 1 : 0;
				this.is_default = val;
			},
			showPick: function(){
				var _this = this;
				new Picker({
		            "title": '请选择',//标题(可选)
		            "defaultValue": "广东省 广州市 天河区",//默认值-多个以空格分开（可选）
		            "data": cityData,//数据(必传)
		            "keys": {
		                "id": "area_id",
		                "value": "area_name",
		                "childData": "sub_area"//最多3级联动
		            },//数组内的键名称(必传，id、text、data)
		            "callBack": function (code,val) {
		            	_this.area = code;
		            	_this.area_title = val.join(" ");
		                //$('#area_title').html(val.join(' '));
		            }
		        });
			}
		}
	});
</script>
</html>