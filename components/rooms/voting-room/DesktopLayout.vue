<template lang="pug">
.desktop-layout
  .voting-stage
    .players-section
      Player(v-for="player in players"
      :key="player.id"
      :user="player.user")
    TasksSection
  VotingBar
  //- .result
</template>
<script>
import { mapGetters } from 'vuex';
import VotingBar from '@/components/rooms/voting-room/desktop/VotingBar.vue';
import TasksSection from '@/components/rooms/voting-room/desktop/TasksSection.vue';
import Player from '@/components/users/Player.vue';

export default {
  name: 'DesktopLayout',

  components: {
    VotingBar,
    TasksSection,
    Player,
  },

  computed: mapGetters({
    currentRoom: 'room/currentRoom',
    players: 'room/players',
  }),
};
</script>
