<template>
  <div class="signup-msg-box" v-show='msg.show'>
   <div class="signup-msg-content">
    <div class='signup-msg-close' @click='close'>X</div>
    <div class="signup-msg-title">{{msg.title}}</div>
    <p class="signup-msg-p" v-for='item in msg.p'>{{item}}</p>
   </div>
  </div>
</template>

<script>

export default {

  name: 'SignupMsgBox',

  props:{
    msg:Object
  },
  methods:{
    close(){
      this.msg.show = false
    }
  }
}

</script>

<style lang="sass">
@import '../sass/base';
@import '../sass/signupMsgBox';

</style>
