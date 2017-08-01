<template>
  <div class="component-bussines-char">
    <component-common-title :item='item'></component-common-title>
    <component-business-data :business-char-data='businessCharData'></component-business-data>
  </div>
</template>

<script>
import ComponentCommonTitle from './ComponentCommonTitle.vue';
import ComponentBusinessData from './ComponentBusinessData.vue';

export default {

  name: 'ComponentBusinessChar',

  components: {
    ComponentCommonTitle,
    ComponentBusinessData
  },
  props:{
    businessCharData:Array
  },
  data () {
    return {
      item: {title:"营收同比(最近七天)"}
    }
  },
  methods: {
    
  },
  filters:{
    
  }
}

</script>

<style lang="sass">
.component-bussines-char{
  margin-top:0.4rem;
  .component-common-title{
     margin:0 0.15rem;
  }
}
</style>
