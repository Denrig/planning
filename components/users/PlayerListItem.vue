<template lang="pug">
  .player-list-item.d-flex.m-2.justify-content-around.align-items-center
    img(:src="playerImage")
    .name {{ player.name }}
    span.kick-button(
      @click="kickPlayer"
    ) &times;
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'PlayerListItem',

  props: {
    player: {
      type: Object,
      required: true,
      default: () => {},
    },
  },

  computed: {
    ...mapGetters({
      currentUserId: 'user/currentUserId',
      currentRoom: 'room/currentRoom',
    }),

    playerImage() {
      return this.player.character_image ? `/characters/${this.player.character_image}` : '';
    },

    displayKickButton() {
      return this.player.id !== this.currentUserId;
    },
  },
  methods: {
    ...mapActions({
      leveRoom: 'room/leaveRoom',
    }),

    kickPlayer() {
      if (confirm('Do you want to kick this player?')) {
        this.leveRoom({
          user_id: this.player.id,
          room_id: this.currentRoom.id,
        });
      }
    },
  },
};
</script>

<style lang="scss">
.player-list-item {
  border-radius: 24px;
  border: 1px solid black;

  img {
    height: 100px;
    width: 80px;
  }
}
</style>
