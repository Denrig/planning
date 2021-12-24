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
    this.getCurrentRoom();
    this.initLayoutModule();
    this.subscribeToCable();
  },

  methods: {
    ...mapActions({
      initLayoutModule: 'layout/initLayoutModule',
      getCurrentRoom: 'room/getCurrentRoom',
    }),

    subscribeToCable() {
      this.$cable.subscribe({
        channel: 'RoomChannel',
        id: '0d51565c-9e03-4ad7-8f25-7614cb4171e7',
      });
    },
  },
};
</script>
