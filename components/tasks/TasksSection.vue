<template lang="pug">
.tasks-section
  TaskForm
  .task.current-task
    .title.h-100 {{ currentTask.text }}
    .story-points(v-if="currentTask.result") {{currentTask.result}}
  .task(v-for="task in otherTasks" :key="task.id" @click="handleSetCurrentTask(task)" )
    .title.h-100 {{ task.text }}
    .story-points(v-if="task.result") {{task.result}}
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import TaskForm from '@/components/tasks/TaskForm.vue';

export default {
  name: 'TasksSection',

  components: {
    TaskForm,
  },

  data() {
    return {
      form: {},
    };
  },

  computed: {
    ...mapGetters({
      currentRoom: 'room/currentRoom',
      tasks: 'task/tasks',
      currentVotingTask: 'task/currentVotingTask',
    }),

    otherTasks() {
      return this.tasks.filter((task) => !task.is_current);
    },

    currentTask() {
      return this.currentVotingTask || {};
    },
  },

  watch: {
    currentTask() {
      document.getElementsByClassName('current-task')[0].scrollIntoView({ block: 'center' });
    },
  },

  methods: {
    ...mapActions({ updateTask: 'task/updateTask' }),

    handleSetCurrentTask(task) {
      this.updateTask({ task_id: task.id, room_id: this.currentRoom.id, is_current: true });
    },
  },
};
</script>
<style lang="scss">
.tasks-section {
  overflow: scroll;
  height: 50%;
  .task-form-container {
    .app-button {
      font-size: $medium-text;
      font-weight: $bold;
    }
    .add-task {
      margin: 15px 0;
      background-color: $yellow;
      color: $black;
    }
    .create-task {
      background-color: $yellow;
      color: $black;
    }
  }

  .current-task {
    box-shadow: inset 0 0 5px 2px $pink !important;
  }

  .task {
    display: flex;
    align-items: center;
    margin: 10px;
    max-height: 150px;
    border-radius: 10px;
    box-shadow: inset 0 0 5px 2px $light-grey;

    .title {
      font-size: $medium-text;
      font-weight: $medium;
      padding: 10px;
    }

    .story-points {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;

      width: 20px;
      height: 20px;
      margin: 0 10px;
      border-radius: 100%;

      background-color: $pink;
      color: $white;
    }
  }
}
</style>
