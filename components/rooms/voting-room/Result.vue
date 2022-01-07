<template lang="pug">
  .result
    BarChart(:data="Object.values(this.votingResults)" :labels="Object.keys(this.votingResults)")
</template>
<script>
import { mapGetters } from 'vuex';
import BarChart from '@/components/common/BarChart.vue';

export default {
  components: {
    BarChart,
  },
  computed: mapGetters({ votingResults: 'voting/votingResults' }),
};
</script>
<style lang="scss">
.result {
  width: 100%;
  height: 200px;
}
</style>
