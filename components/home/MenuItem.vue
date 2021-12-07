<template lang="pug">
  .menu-item(@click="handleItemClicked" :style="{ backgroundColor: backgroundColor }")
    .header
      slot(name="header")
    .content
      slot(name="content")
</template>
<script>
export default {
  props: {
    backgroundColor: {
      type: String,
      required: false,
      default: '#FFF'
    },
  },

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
    font-family: $main-font;
    color: $white;

    .header{
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 25%;
      width: 100%;
      font-size: $bigger-text;
      font-weight: $bold;
      span {
        margin: 0 15px;
      }
    }

    .content{
      position: relative;
      width: 100%;
      height: 75%;
      padding: 10px;
            font-size: $medium-text;
    }

    @include media(">=desktop"){
      width: 30vw;
      height: 400px;
      margin: 0 10px;
      border-radius: 20px 20px 0 0;
      background-color: red;

      &:hover {
        transform: translateY(-300px);
      }
    }

    @include media("<desktop") {
      background-color: blue;
      margin: 30px 0;
      height: 25vh;
      width: 80vw;
      border-radius: 20px 0 0 20px;

      .header {
        border-top-left-radius: 20px;
      }

      .content {
        border-bottom-left-radius: 20px;
      }
    }
}
</style>