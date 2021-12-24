<template lang="pug">
.player-wrapper(:class="{ voted: user.voted }")
  .player
    img.avatar(src="@/assets/images/characters/character-1.png")
    .name {{user.name}}
  .vote-display(ref="vote-display")
    .circle
      span
    .handle
</template>
<script>
export default {
  name: 'Player',

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
