<template lang="pug">
.voting-room.h-100
  #exit-button.position-fixed(@click="handleLeaveRoom")
    BIcon(icon="door-open-fill" font-scale="1.5")
  DesktopLayout(v-if="true")
  MobileLayout(v-else)
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import DesktopLayout from '@/components/rooms/voting-room/DesktopLayout.vue';
import MobileLayout from '@/components/rooms/voting-room/MobileLayout.vue';
import { WebSocketHandler } from '@/services/WebSocketHandler';

export default {
  components: {
    DesktopLayout,
    MobileLayout,
  },

  computed: mapGetters({
    isDesktop: 'layout/isDesktop',
    currentRoom: 'room/currentRoom',
    currentUserId: 'user/currentUserId',
    currentTask: 'task/currentVotingTask',
  }),

  mounted() {
    this.getCurrentUser()
      .then(() => this.getCurrentRoom())
      .then(() => this.subscribeToCable())
      .then(() => this.getVotesForTask(this.currentTask?.id))
      .catch(() => {
        this.$router.push('/');
      });
  },

  channels: {
    RoomChannel: {
      received(data) {
        WebSocketHandler.execute(this, data);
      },
    },
  },

  methods: {
    ...mapActions({
      initLayoutModule: 'layout/initLayoutModule',
      getCurrentRoom: 'room/getCurrentRoom',
      getCurrentUser: 'user/getCurrentUser',
      getVotesForTask: 'voting/getVotesForTask',
      clearLocalStorage: 'room/clearLocalStorage',
      leaveRoom: 'room/leaveRoom',
    }),

    subscribeToCable() {
      this.$cable.subscribe({
        channel: 'RoomChannel',
        id: this.currentRoom.id,
      });
    },

    handleLeaveRoom() {
      this.leaveRoom({
        room_id: this.currentRoom.id,
        user_id: this.currentUserId,
      }).then(() => {
        this.clearLocalStorage();
        this.$router.push('/');
      });
    },
  },
};
</script>
<style lang="scss">
#exit-button {
  cursor: pointer;
  z-index: 100;
  top: 0.2rem;
  left: 0.2rem;
}
</style>
