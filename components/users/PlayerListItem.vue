<template lang="pug">
  .player-list-item.d-flex.m-2.justify-content-around.align-items-center
    .name {{ player.name }}
    span.kick-button(
      v-if="displayKickButton"
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

<style>

</style>
