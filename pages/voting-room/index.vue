<template lang="pug">
.voting-room.h-100
  button#menu-button.position-absolute(v-b-toggle.sidebar-1)
    BIcon(icon="card-checklist" font-scale="1.5")
  b-sidebar#sidebar-1.p-1(shadow)
    button.app-button.w-100(@click="handleLeaveRoom") Leave Room
    PlayerListItem(v-for="player in players" :player="player")
    button.app-button.w-100(@click="destroyTasks(currentRoom.id)") Clear tasks lists!
  DesktopLayout(v-if="true")
  MobileLayout(v-else)
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import DesktopLayout from '@/components/rooms/voting-room/DesktopLayout.vue';
import MobileLayout from '@/components/rooms/voting-room/MobileLayout.vue';
import { WebSocketHandler } from '@/services/WebSocketHandler';
import PlayerListItem from '@/components/users/PlayerListItem.vue';

export default {
  components: {
    DesktopLayout,
    MobileLayout,
    PlayerListItem,
  },

  computed: mapGetters({
    isDesktop: 'layout/isDesktop',
    currentRoom: 'room/currentRoom',
    currentUserId: 'user/currentUserId',
    currentTask: 'task/currentVotingTask',
    players: 'room/players',
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
      clearLocalStorage: 'room/clearLocalStorage',
      getCurrentUser: 'user/getCurrentUser',
      getVotesForTask: 'voting/getVotesForTask',
      leaveRoom: 'room/leaveRoom',
      destroyTasks: 'task/destroyTasks',
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
#menu-button {
  cursor: pointer;
  z-index: 100;
  top: 0.2rem;
  left: 0.2rem;
  background-color: transparent;
  border: none;
  color: $black;
}
</style>
