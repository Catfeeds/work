var app = angular.module('APP',[])
	app.controller('CON',function($scope, cart){
		$scope.total = 0;
	 	$scope.cart_shop =localStorage.getItem("cart");//获取购物车
	 	$scope.allSel = false;
	 	if($scope.cart_shop){
	 		$scope.cart_shop = JSON.parse($scope.cart_shop).cart
	 	}
	 	console.log($scope.cart_shop.length)
	 	$scope.add = function(n){
	 		 n.mount = n.mount + 1;
	 		 cart.total($scope);
	 	}
	 	$scope.sub = function(n){
	 		n.mount = n.mount - 1;
	 		if(n.mount <= 1){
	 			n.mount = 1;
	 		}
	 		 cart.total($scope);
	 	}
	 	$scope.delete = function(pro,i){
	 		cart.cart_pro_delete(pro,i,$scope.cart_shop);
	 		cart.total($scope);
	 	}
	 	$scope.sel = function(pro){
	 		pro.sel = !pro.sel;
	 		cart.total($scope)
	 	}
	 	$scope.all_sel = function(){
	 		$scope.allSel = !$scope.allSel;
	 		if($scope.allSel){
	 			for(i=0;i<$scope.cart_shop.length;i++){
					$scope.cart_shop[i].sel = true;
				};
	 		}else{
	 			for(i=0;i<$scope.cart_shop.length;i++){
					$scope.cart_shop[i].sel = false;
				};
	 		}
	 		cart.total($scope)
	 	}
	})

	app.factory("cart",function(){
		var obj = {};
		obj.cart_pro_delete = function(i){
			if(confirm("确定删除该宝贝？")){
				var cart = localStorage.getItem("cart");
				var info = JSON.parse(cart);
				var index = $(this).closest('.cart_pro').index();
				info.cart.splice(index,1);
				var str = JSON.stringify(info);
				window.localStorage.setItem("cart",str);
				window.location.reload();
			}else{
				return false;
			};
		};
		obj.total = function(scope){
			scope.total = 0;
			for(i=0;i<scope.cart_shop.length;i++){
				if(scope.cart_shop[i].sel){
					scope.total = scope.total + parseInt(scope.cart_shop[i].mount)*parseInt(scope.cart_shop[i].price);
				}
			};
		};
		return obj;
	})

$(function () {
	// 后退
	$(function(){
		$(".back").click(function(){window.history.back(-1)})
	})
	
	// 头部列表
	var show = true;
	$("#ex_listMenu").on("touchstart",function(){
		if(show){$("#listMenu").show(500);show = false}else{
			$("#listMenu").hide(500);show = true
		}
	})

})