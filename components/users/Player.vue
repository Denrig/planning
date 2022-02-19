<template lang="pug">
.player-wrapper(:class="{ voted: user.voted }")

  .player
    img.avatar(:src="userImage")
    .d-flex.justify-content-center
      .name {{user.name}}
      span.kick-button(
        v-if="displayKickButton"
        @click="kickPlayer"
      ) &times;
  .vote-display(:class="{ active: userVoted }" ref="vote-display")
    .circle
      span {{ user.vote }}
    .handle
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

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
      currentRoom: 'room/currentRoom',
      currentUserId: 'user/currentUserId',
    }),

    displayKickButton() {
      return this.userId !== this.currentUserId;
    },

    user() {
      return this.player(this.userId);
    },

    userVoted() {
      return this.showVotes && this.user.voted === true;
    },

    userImage() {
      return this.user.character_image ? `/characters/${this.user.character_image}` : '';
    },
  },

  methods: {
    ...mapActions({
      leveRoom: 'room/leaveRoom',
    }),

    kickPlayer() {
      if (confirm('Do you want to kick this player?')) {
        this.leveRoom({
          user_id: this.userId,
          room_id: this.currentRoom.id,
        });
      }
    },
  },
};
</script>
