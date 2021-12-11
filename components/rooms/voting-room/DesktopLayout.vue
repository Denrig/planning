<template lang="pug">
.desktop-layout
  .voting-stage
    .players-section
      Player
    TasksSection
  VotingBar
  //- .result
</template>
<script>
import VotingBar from "@/components/rooms/voting-room/desktop/VotingBar.vue";
import TasksSection from "@/components/rooms/voting-room/desktop/TasksSection.vue";
import Player from "@/components/rooms/voting-room/Player.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "DesktopLayout",

  components: {
    VotingBar,
    TasksSection,
    Player,
  },

  computed: {
    ...mapGetters({
      currentUser: "user/currentUser",
    }),
  },

  methods: {
    checkCurrentUser() {
      if (!this.currentUser.id) {
      }
    },
  },
};
</script>
