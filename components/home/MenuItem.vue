<template lang="pug">
  .menu-item(@click="handleItemClicked")
</template>
<script>
export default {
  methods: {
    handleItemClicked(){
      console.log("dasda")
    }
  }
}
</script>
<style lang="scss">
.menu-item{
    position: relative;
    transition: 0.5s;
      overflow: hidden;

    @include media(">=desktop"){
      width: 30vw;
      height: 400px;
      margin: 0 10px;
      border-radius: 20px 20px 0 0;
      background-color: red;

      &:hover {
        transform: translateY(-330px);
      }
    }

    @include media("<desktop") {
      background-color: blue;
      margin: 20px 0;
      height: 30vh;
      width: 80vw;
      border-radius: 20px 0 0 20px;
    }
}
</style>