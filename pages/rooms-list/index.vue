<template lang="pug">
  .rooms-list-page
    CustomTable(:headers="headers")

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
      {
        text: 'Header 1',
        value: 'header_1',
      }, {
        text: 'Header 1',
        value: 'header_1',
      }, {
        text: 'Header 1',
        value: 'header_1',
      }, {
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
