<template lang="pug">
.voting-room.h-100
  CreateUserModal
  DesktopLayout(v-if="true")
  MobileLayout(v-else)
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import DesktopLayout from "@/components/rooms/voting-room/DesktopLayout.vue";
import MobileLayout from "@/components/rooms/voting-room/MobileLayout.vue";
import CreateUserModal from "@/components/rooms/voting-room/CreateUserModal.vue";

export default {
  components: {
    DesktopLayout,
    MobileLayout,
    CreateUserModal,
  },

  watch: {
    isDesktop(value) {
      console.log(value);
    },
  },

  computed: {
    ...mapGetters({
      isDesktop: "layout/isDesktop",
    }),
  },

  mounted() {
    this.initLayoutModule();
  },

  methods: {
    ...mapActions({
      initLayoutModule: "layout/initLayoutModule",
    }),
  },
};
</script>
<style lang="scss">
</style>
