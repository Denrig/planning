<template lang="pug">
.voting-room.h-100
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

  computed: {
    ...mapGetters({
      isDesktop: 'layout/isDesktop',
      currentRoom: 'room/currentRoom',
      currentUserId: 'user/currentUserId',
      currentTask: 'task/currentVotingTask',
    }),
  },

  channels: {
    RoomChannel: {
      received(data) {
        WebSocketHandler.execute(this, data);
      },
    },
  },

  mounted() {
    this.getCurrentRoom()
      .then(() => this.getVotesForTask(this.currentTask?.id))
      .then(() => this.subscribeToCable())
      .catch(() => {
        this.$router.push('/');
      });
  },

  created() {
    if (!this.currentUserId) this.$router.push('/');
  },

  methods: {
    ...mapActions({
      initLayoutModule: 'layout/initLayoutModule',
      getCurrentRoom: 'room/getCurrentRoom',
      getCurrentUser: 'user/getCurrentUser',
      getVotesForTask: 'voting/getVotesForTask',
    }),

    subscribeToCable() {
      this.$cable.subscribe({
        channel: 'RoomChannel',
        id: this.currentRoom.id,
      });
    },
  },
};
</script>
