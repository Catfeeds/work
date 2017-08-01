<template>
  <div class="component-venue-business">
    <component-common-title :item='item'></component-common-title>
    <component-commontable :head='head' :venuedata=venueBusinessData></component-commontable>

  </div>
</template>

<script>
import ComponentCommonTitle from './ComponentCommonTitle.vue';
import ComponentCommontable from './ComponentCommontable.vue';

export default {

  name: 'ComponentVenueBusiness',

  components: {
    ComponentCommonTitle,
    ComponentCommontable
  },

  data () {
    return {
      item: {title:"场馆经营情况"},
      head:["","场地","商品"],
    }
  },
  props:{
    venueBusinessData:Array
  },
  methods: {
    
  },
  filters:{
    
  }
}

</script>

<style lang="sass">
.component-venue-business{
  margin:0 0.15rem;
}
</style>
