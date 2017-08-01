<template>
  <div class="signup">
    <div class="signup-title">报名表</div>
    <Signup-form></Signup-form>
    <!-- <Signup-confirm-order></Signup-confirm-order> -->
  </div>
</template>

<script>

import SignupForm from './SignupForm.vue'
// import SignupConfirmOrder from './SignupConfirmOrder.vue'
export default {

  name: 'Signup',

  components: {
    SignupForm
  },
  props:{
    bodyWidth:Number
  },
}

</script>

<style lang="sass">
  #wrapper{
    height:100%;
  }
  .signup{
    min-height:100%;
    background:#fff url(/static/vue-h5-signup/images/bgs.png) no-repeat;
    background-size:100% 100%;
    margin: 0 0.1rem;
    color: #000000;
    .signup-title{
      padding:0.18rem 0;
      font-size: 0.22rem;
    }
  }
</style>
