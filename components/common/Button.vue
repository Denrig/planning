<template lang="pug">
  .button-wrapper
    .app-button(:class="{ animating: loading }" @click="handleClick" )
      slot(v-if="!success").text
      .checkmark-container(v-else)
        svg(x="0px" y="0px" xmlns="http://www.w3.org/2000/svg" stroke="white" fill="none" class="symbol" viewBox="0 0 25 30")
          path(d="M2,19.2C5.9,23.6,9.4,28,9.4,28L23,2")

</template>
<script>
export default {
  name: 'Button',

  data() {
    return {
      loading: false,
      success: false,
    };
  },
  methods: {
    handleClick() {
      this.loading = true;
      this.success = false;
      setTimeout(() => {
        this.loading = false;
        this.success = true;
      }, 2000);
    },
  },
};
</script>
<style lang="scss">
$squish-animation-time: 500ms;
$progress-animation-time: 2000ms;
.button-wrapper {
  position: relative;
}

.app-button {
  position: relative;

  &.animating {
    background-color: transparent;
    color: transparent;
    user-select: none;
    cursor: default;

     &::before,
     &::after {
        display: block;
      }
  }

  &.success .symbol {
    animation: checkmark .5s forwards;
  }

  &::before {
    content: "";
    display: none;
    position: absolute;
    background: $grey;
    inset: 0;
    border-radius: 20px;
    animation: squish $squish-animation-time cubic-bezier(0.26, 0.6, 0.46, 1.7);
    animation-fill-mode: forwards;
  }

  &::after {
    content: "";
    display: none;
    position: absolute;
    background-color: $white;
    left: 51%;
    right: 51%;
    top: 30%;
    bottom: 30%;
    border-radius: 20px;
    animation: progress $progress-animation-time $squish-animation-time;
    animation-iteration-count: infinite;
    animation-fill-mode: forwards;
  }
}
.symbol {
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dashoffset: 40.84104919433594;
  stroke-dasharray: 40.84104919433594;
  stroke-width: 3px;
  inset: 0;
  width: 40px;
  height: 40px;
  animation: checkmark .5s forwards;
}
</style>
