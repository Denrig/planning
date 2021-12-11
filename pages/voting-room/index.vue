<template lang="pug">
.voting-room.h-100
  UserModal
  DesktopLayout(v-if="true")
  MobileLayout(v-else)
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import DesktopLayout from "@/components/rooms/voting-room/DesktopLayout.vue";
import MobileLayout from "@/components/rooms/voting-room/MobileLayout.vue";
import UserModal from "@/components/rooms/voting-room/UserModal.vue";

export default {
  components: {
    DesktopLayout,
    MobileLayout,
    UserModal,
  },

  computed: {
    ...mapGetters({
      isDesktop: "layout/isDesktop",
    }),
  },

  created() {
    this.setCurrentUserId();
  },

  mounted() {
    this.initLayoutModule();
  },

  methods: {
    ...mapActions({
      initLayoutModule: "layout/initLayoutModule",
    }),
    ...mapMutations({
      setCurrentUserId: "user/setCurrentUserId",
    }),
  },
};
</script>
<style lang="scss">
</style>
