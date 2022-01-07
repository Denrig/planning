<template lang="pug">
.desktop-layout
  .voting-stage
    .code {{currentRoom.code}}
    .players-section
      Player(v-for="player in players"
      :key="player.id"
      :userId="player.id")
    .right
      TasksSection
      .actions-pannel
        button.app-button(@click="changeDisplayVotes(true)") Show Votes
        button.app-button(@click="changeDisplayVotes(false)") Clear Votes
  VotingBar
  //- .result
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
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

  methods: mapActions({ changeDisplayVotes: 'voting/changeDisplayVotes' }),
};
</script>
<style lang="scss">
.code {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: calc(50% - 100px);

  width: 100px;
  height: 30px;
  background-color: $yellow;

  font-weight: $bold;
  text-transform: uppercase;
}
.actions-pannel {
  height: 200px;
  margin-top: auto;
  .app-button{
    width: 100%;
    margin: 10px 0;
  }
}
</style>
