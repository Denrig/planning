<template lang="pug">
  .rooms-list-page
    CustomTable(:headers="headers" :data="[1,2,3,4]" :loading="true")
      td.table-column 2

</template>
<script>
import Button from '@/components/common/Button.vue';
import CustomTable from '@/components/common/CustomTable.vue';

export default {

  components: {
    Button,
    CustomTable,
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
