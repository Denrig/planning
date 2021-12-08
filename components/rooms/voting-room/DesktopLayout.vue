<template lang="pug">
.desktop-layout
  .voting-stage
    .players-section
    .tasks-section
  VotingBar
  //- .result
</template>
<script>
import VotingBar from "@/components/rooms/voting-room/VotingBar.vue"
export default {
  name: 'DesktopLayout',
  components:{
    VotingBar
  }
}
</script>