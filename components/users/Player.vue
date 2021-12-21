<template lang="pug">
.player-wrapper(:class="{ voted: user.voted }")
  .player
    img.avatar(src="@/assets/images/characters/character-1.png")
    .name Marius
  .vote-display.active(ref="vote-display")
    .circle
      span 5
    .handle
</template>
<script>
export default {
  name: "Player",

  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
<style lang="scss">
</style>
