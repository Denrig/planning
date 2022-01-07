<template lang="pug">
.player-wrapper(:class="{ voted: user.voted }")
  .player
    img.avatar(src="@/assets/images/characters/character-1.png")
    .name {{user.name}}
  .vote-display(:class="{ active: showVotes && user.voted === true }" ref="vote-display")
    .circle
      span {{ user.vote }}
    .handle
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Player',
  props: {
    userId: {
      type: String,
      default: null,
    },
  },
  computed: {
    ...mapGetters({
      showVotes: 'voting/showVotes',
      player: 'room/getPlayer',
    }),

    user() {
      return this.player(this.userId);
    },
  },
};
</script>
<style lang="scss">
</style>
