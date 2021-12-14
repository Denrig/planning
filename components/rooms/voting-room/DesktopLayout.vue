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
import { mapActions, mapGetters, mapMutations } from "vuex";
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

  computed: {
    ...mapGetters({
      currentUserId: "user/currentUserId",
    }),
  },

  created() {
    this.checkCurrentUser();
  },

  methods: {
    ...mapMutations({
      handleUserModalState: "modal/handleUserModalState",
    }),
    ...mapActions({
      getCurrentUser: "user/getCurrentUser",
    }),

    checkCurrentUser() {
      if (!this.currentUserId) {
        this.handleUserModalState(true);
      } else {
        this.getCurrentUser();
      }
    },
  },
};
</script>
