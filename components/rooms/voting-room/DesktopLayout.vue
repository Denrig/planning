<template lang="pug">
.desktop-layout
  .voting-stage
    .code {{currentRoom.name}} - {{currentRoom.code}}
    .players-section
      Player(v-for="player in players"
      :key="player.id"
      :userId="player.id")
    .right
      TasksSection
      Result
  VotingBar
</template>
<script>
import { mapGetters } from 'vuex';
import VotingBar from '@/components/rooms/voting-room/desktop/VotingBar.vue';
import TasksSection from '@/components/tasks/TasksSection.vue';
import Player from '@/components/users/Player.vue';
import Result from '@/components/rooms/voting-room/Result.vue';

export default {
  name: 'DesktopLayout',

  components: {
    VotingBar,
    TasksSection,
    Player,
    Result,
  },

  computed: mapGetters({
    currentRoom: 'room/currentRoom',
    players: 'room/players',
  }),

};
</script>
<style lang="scss">
.code {
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;

  height: 30px;
  background-color: $yellow;

  font-weight: $bold;
  text-transform: uppercase;
}
</style>
