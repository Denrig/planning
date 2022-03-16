<template lang="pug">
.tasks-section
  div(v-show="activeTab === 1")
    button.app-button.w-100.add-task(@click="changeTab(2)") Add Task
    Task(:task="currentTask")
    Task(v-for="task in otherTasks" :key="task.id" :task="task")
  TaskForm(
    v-show="activeTab === 2"
    @cancel="changeTab(1)"
    @success="changeTab(1)"
  )
</template>
<script>
import { mapGetters } from 'vuex';
import TaskForm from '@/components/tasks/TaskForm.vue';
import Task from '@/components/tasks/Task.vue';

export default {
  name: 'TasksSection',

  components: {
    TaskForm,
    Task,
  },

  data() {
    return {
      activeTab: 1,
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
      document.getElementsByClassName('current-task')[0]?.scrollIntoView({ block: 'center' });
    },
  },

  methods: {
    changeTab(value) {
      this.activeTab = value;
    },
  },
};
</script>
<style lang="scss">
.tasks-section {
  overflow: scroll;
  height: 50%;

  .add-task {
      margin: 15px 0;
      background-color: $yellow;
      color: $black;
  }
}
</style>
