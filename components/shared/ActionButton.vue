<template lang="pug">
  .action-button
    .behind-container
      .tree
</template>
<script>
export default {
 
}
</script>
<style lang="scss">
  .action-button{
    display: flex;
    height: 240px;
    width: 240px;
    margin: 50px;
    transition: box-shadow .5s, height .5s, width .5s;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid red;

    .behind-container {
      align-self: flex-end;
      transform-origin: bottom;
      animation-duration: 1.5s;
      animation-fill-mode: forwards;
      position: relative;
      background-color: black;
      height: 80px;
      width: 100%;
      z-index: -1;
      bottom: -50px;
    }

    &:hover{
      box-shadow: 0 0 15px $black;
      height: 245px;
      width: 245px;

      .behind-container {
        animation-name: grow;
        animation-timing-function: ease;
      }
    }
  }
</style>