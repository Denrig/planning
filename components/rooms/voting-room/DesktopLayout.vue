<template lang="pug">
.desktop-layout
  .voting-stage
    .players-section
    TasksSection
  VotingBar
  //- .result
</template>
<script>
import VotingBar from "@/components/rooms/voting-room/desktop/VotingBar.vue";
import TasksSection from "@/components/rooms/voting-room/desktop/TasksSection.vue";

export default {
  name: "DesktopLayout",
  components: {
    VotingBar,
    TasksSection,
  },
};
</script>