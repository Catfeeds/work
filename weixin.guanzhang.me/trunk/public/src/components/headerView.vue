<template>
	<div class="header">
		<div class="left"><i onclick="history.back(-1);" class="icon-back"></i></div>
		<div class="center">{{item.title}}</div>
		<div class="right" onclick="location.href='{{item.url}}'">{{item.rightVal}}</div>
	</div>
</template>

<script>
	export default {
  	name: 'HeaderView',
    props: {
      item:Object
    }
	}	
</script>

<style lang="sass">
.header{
  width: 100%;
  height: 44*0.01rem;
  background-color:#3c89d7;
  text-align: center;
  line-height: 44*0.01rem;
  position: relative;
  font-size:15*0.01rem;
  font-family: "Microsoft YaHei", "Helvetica Neue", Helvetica, STHeiTi, sans-serif;
  padding:0;
  .center{
    padding:0 50*0.01rem;
    position: relative;
    color:#fff;
  }
  .left,.right{
    height: 44*0.01rem;
    position: absolute;
    top:0;
    z-index: 99;
    font-size: 0;
  }
  .left{
    left:0;
    width: 50*0.01rem;
  }
  .right{
    right:15*0.01rem;
    font-size: 15*0.01rem;
    color:#fff;
  }
  .icon-back{
    display: inline-block;
    width: 15*0.01rem;
    height: 15*0.01rem;
    border-bottom:2*0.01rem solid #fff;
    border-left:2*0.01rem solid #fff;
    position: absolute;
    top:50%;
    left:50%;
    margin-left:-8*0.01rem;
    margin-top:-8*0.01rem;
    transform:rotate(45deg);
    -webkit-transform:rotate(45deg);
  }
}
</style>