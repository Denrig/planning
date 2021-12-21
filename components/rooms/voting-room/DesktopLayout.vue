<template lang="pug">
.desktop-layout
  .voting-stage
    .players-section
      Player(:user="{ voted: false }")
    TasksSection
  VotingBar
  //- .result
</template>
<script>
import VotingBar from "@/components/rooms/voting-room/desktop/VotingBar.vue";
import TasksSection from "@/components/rooms/voting-room/desktop/TasksSection.vue";
import Player from "@/components/users/Player.vue";

export default {
  name: "DesktopLayout",

  components: {
    VotingBar,
    TasksSection,
    Player,
  },
};
</script>
