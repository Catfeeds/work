<template>
  <div class="component-common-title">
    <div class="component-common-title-inner">{{ item.title }}
      <span>?</span>
    </div>
  </div>
</template>

<script>

export default {

  name: 'ComponentCommonTitle',

  props: {
    item: Object,
  }
}

</script>

<style lang="sass">
  @import '../sass/base';

  .component-common-title{
    font-size: pxToRem(30px);
    color:#555;
    text-align: left;
    margin-top:0.4rem;
    .component-common-title-inner{
      display: inline-block;
      padding-bottom: pxToRem(20px);
      border-bottom: 1px solid #555;
      position: relative;
    }
    span{
      font-size: pxToRem(24px);
      position: absolute;
      display: inline-block;
      width: pxToRem(28px);
      height: pxToRem(28px);
      line-height: pxToRem(28px);
      border-radius: 50%;
      border:1px solid #555;
      text-align: center;
      right:pxToRem(-48px);
      top:pxToRem(4px);
    }
  }
</style>
