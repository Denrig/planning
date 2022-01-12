<template lang="pug">
  .rooms-list-page
    RoomsTable

</template>
<script>
import Button from '@/components/common/Button.vue';
import RoomsTable from '@/components/rooms/RoomsTable.vue';

export default {

  components: {
    Button,
    RoomsTable,
  },

  data() {
    return {
      headers: [{
        text: 'Header 1',
        value: 'header_1',
      },
      ],
    };
  },
};
</script>
<style lang="scss">
.rooms-list-page {
  height: 100vh;
}
</style>
