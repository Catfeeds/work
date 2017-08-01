<template>
  <ul class="sc-container clearfix">
    <li class="sc-label" v-for="key in SignupCheckData.list">
      <label for={{key.id}}><input checked  id={{key.id}} type="radio"  name="signup"><em></em>{{key.type}}</label>
    </li>
  </ul>
</template>

<script>
export default {

  name: 'SignupForm',
  props:{
    SignupCheckData:Object,
    // selected:Number
  },
  // data () {
  //   return {
  //    checked:false
  //   }
  // },
  // watch:{
  //   'checked'(){
  //     this.SignupCheckData.status = false;
  //   }
  // }
}

</script>

<style lang="sass">
  .sc-container{
    padding:0.1rem 0.2rem 0.2rem;
    margin:0 -0.2rem;
    border-bottom:1px dashed #000;
    li{
      /*float: left;
      width:33.333%;*/
      min-height:0.24rem;
      font-size:0.13rem;
      text-align: left;
      label{
        em{
          display: inline-block;
          width:0.12rem;
          height:0.12rem;
          border:2px solid #000;
          border-radius:3px;
          background-color:#fff;
          vertical-align: text-bottom;
          margin-right: 0.06rem;
        }
        small{
          padding-left:1.5em;
          color:#f00;
        }
      }
      input{
        display: none;
        &:checked{
          &+em{
            background-color:#ffeb01;
          }
        }
      }
    }
  }
</style>
