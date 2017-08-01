<template>
  <div id="wrapper">
    <!-- header -->
    <section id="loading" class="loading" :class="{ 'hide' : loadingHide }" data-venue-id='{{ venuesId }}'>
      <div class="loading-icon" style="background-image:url(/static/images/loading.png)"></div>
    </section>
    <!-- main view -->
    <router-view
      class="view"
      keep-alive
      transition
      transition-mode="out-in" :body-width='bodyWidth'>
    </router-view>
    <!-- error -->
    <section id='errorMsg' class='wxr-error-msg' :class="{ 'hide' : errorHide ,'show' : errorShow}">
      {{ errorMsg }}
    </section>
  </div>
</template>

<script>

export default {

  name: 'App',
  data () {
    return {
      loadingHide:false,
      baseFetchUrl:'/wxreport',
      venueId:document.body.dataset.venueId,
      errorHide:true,
      errorShow:false,
      errorMsg:'',
      bodyWidth:null
    }
  },
  ready(){
    this.mobileResponsive()
    this.loadingHide = true
  },
  methods: {
    mobileResponsive(){
      
        let windowWidth = document.body.clientWidth;
        let designWidth = document.body.getAttribute("data-design-width") || 640;
        let designdpr = document.body.getAttribute("data-design-dpr") || 2;
        let setFontSize = () => {
          windowWidth = document.body.clientWidth;
          this.$set('bodyWidth',windowWidth)
          if(windowWidth > designWidth){
            windowWidth = designWidth;
          }
          document.getElementsByTagName('html')[0].style.fontSize = (100/(designWidth/designdpr)) * windowWidth + "px";
        }

        
        setTimeout(setFontSize,100);

        window.addEventListener('resize',setFontSize);

        
      },
    showErrorShow(msg){
      this.errorMsg = msg
      this.errorHide = false
      setTimeout(
        ()=>{ 
          this.errorShow = true 
          setTimeout(
            ()=>{ 
              this.errorMsg = ''
              this.errorShow = false 
              setTimeout(
                ()=>{
                  this.errorHide = true
                }
              ,100)
            }
          ,1000)
        }
      ,0)
    }
  }

  ,
  filters:{
    
  }
}

</script>

<style lang="sass">
@import '../sass/normalize';
@import '../sass/common';

  .wxr-error-msg{
    width:2rem;
    font-size: 16px;
    text-align: center;
    top:50%;
    left:50%;
    background-color: #fff;
    padding:0.2rem;
    opacity: 0;
    transition:all 0.1s linear 0s;
    /* border:1px solid #ccc; */
    box-shadow: 0px 0px 2px 2px rgba(0,0,0,0.1);
    border-radius: 5px;
    transform:translate3d(-50%,-50%,0px) scale(3);
    position: fixed;
    &.show{
      opacity: 1;
      transform:translate3d(-50%,-50%,0px) scale(1);
    }
  }
</style>
