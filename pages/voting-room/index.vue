<template lang="pug">
.voting-room.h-100
  DesktopLayout(v-if="true")
  MobileLayout(v-else)
</template>
<script>
import DesktopLayout from "@/components/rooms/voting-room/DesktopLayout.vue";
import MobileLayout from "@/components/rooms/voting-room/MobileLayout.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    DesktopLayout,
    MobileLayout,
  },

  watch: {
    isDesktop: function (value) {
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
