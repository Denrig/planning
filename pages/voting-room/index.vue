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
      currentUser: 'user/currentUser',
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
    this.getCurrentUser();
    this.getCurrentRoom().then(() => this.subscribeToCable());
    this.initLayoutModule();
  },

  methods: {
    ...mapActions({
      initLayoutModule: 'layout/initLayoutModule',
      getCurrentRoom: 'room/getCurrentRoom',
      getCurrentUser: 'user/getCurrentUser',
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
