<template lang="pug">
  .task(:class="{ 'current-task': task.is_current }" @click="handleSetCurrentTask")
    .title {{ task.text }}
    .d-flex.justify-content-around
      .status Status: {{ task.status }}
      .issue-type Issue Type: {{ task.issue_type }}
    .story-points(v-if="task.result") {{ task.result }}
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Task',
  props: {
    task: {
      type: Object,
      required: true,
    },
    isCurrent: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  computed: mapGetters({ currentRoom: 'room/currentRoom' }),

  methods: {
    ...mapActions({ updateTask: 'task/updateTask' }),

    handleSetCurrentTask() {
      this.updateTask({ task_id: this.task.id, room_id: this.currentRoom.id, is_current: true });
    },
  },

};
</script>

<style lang="scss">
.task {
  position: relative;
  margin: 10px;
  border-radius: 10px;
  border: 2px solid $grey;

  .title, .status, .issue-type {
    font-size: $medium-text;
    font-weight: $slim;
    padding: 10px;
  }

  .title {
    font-weight: $medium;
    border-bottom: 1px solid $grey;
  }

  .issue-type {
    border-left: 1px solid $grey;
    text-transform: capitalize;
  }

  .story-points {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;

    top: 0;
    right: 0;

    width: 20px;
    height: 20px;
    margin: 1px;
    border-radius: 100%;

    background-color: $pink;
    color: $white;
  }
}

.current-task {
  border: 2px solid $pink !important;
}
</style>
