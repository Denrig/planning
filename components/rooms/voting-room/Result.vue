<template lang="pug">
  .result
    BarChart(
      :data="Object.values(this.votingResults)"
      :labels="Object.keys(this.votingResults)"
      :options="{onClick: onChartClick}"
    )
    .action-pannel.w-100
      button.app-button(@click="changeDisplayVotes(true)") Show Votes
      button.app-button(@click="changeDisplayVotes(false)") Clear Votes
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import BarChart from '@/components/common/BarChart.vue';
import { notifySuccess } from '~/utils/notificationsUtils.js';

export default {
  components: {
    BarChart,
  },

  computed: mapGetters({
    votingResults: 'voting/votingResults',
    currentRoom: 'room/currentRoom',
    currentTask: 'task/currentVotingTask',
  }),

  methods: {
    ...mapActions({
      changeDisplayVotes: 'voting/changeDisplayVotes',
      updateTask: 'task/updateTask',
    }),

    onChartClick(c, i) {
      if (!i[0]) return;
      const request = {
        room_id: this.currentRoom.id,
        task_id: this.currentTask.id,
        result: i[0]._model.label,
      };

      this.updateTask(request).then(() => {
        notifySuccess(this, 'Task updated!');
      });
    },
  },
};
</script>
<style lang="scss">
.result {
  width: 100%;
  height: 50%;
  .action-pannel {
    display: flex;
    .app-button {
      width: 100%;
    }
    .app-button:first-of-type {
      border-radius: 20px 0 0 20px;
      border-right: 1px solid $white;
    }
    .app-button:nth-of-type(2) {
      border-radius: 0 20px 20px 0;
    }
  }
}
</style>
