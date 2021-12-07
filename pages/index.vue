<template lang="pug">
.home-page
  .menu-items-container
    MenuItem
    MenuItem
    MenuItem
</template>>

<script>
import MenuItem from '@/components/home/MenuItem.vue'
export default {
  components:{
    MenuItem
  }
}
</script>
<style lang="scss">
.home-page {
  display: flex;

  .menu-items-container {
      position: fixed;
      display: flex;
  }
}

@include media(">=desktop"){
  .home-page{
    flex-direction: column;

    .menu-items-container {
      justify-content: center;
      width: 100%;
      bottom: -330px;
    }
  } 
}

@include media("<desktop"){
.home-page .menu-items-container
   {
    flex-direction: column;
    right: 0;
    height: 100%;
  }
}
</style>
