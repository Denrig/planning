<template lang="pug">
.tasks-section
  .task-form-container
    button.app-button.w-100.add-task(
      @click="handleFormState(true)",
      v-if="!addTaskEnabled"
    ) Add Task
    ValidationObserver(v-slot="{ handleSubmit }", v-else)
      form(@submit.prevent="handleSubmit(handleAddTask)")
        b-container
          b-row
            b-col
              ValidationProvider.input-group.text(
                rules="required",
                name="title",
                v-slot="{ errors, invalid, dirty }",
                tag="div"
              )
                input.w-100(
                  type="string",
                  v-model="form.text",
                  placeholder="Task's title",
                  :class="{ invalid: errors[0] }"
                )
                span.error {{errors[0]}}
          b-row
            b-col
              button.app-button.w-100.cancel-task(
                @click="handleFormState(false)"
              ) Cancel
            b-col
              input.app-button.w-100.create-task(type="submit" value="Add!")
  .task.current-task
    .title.h-100 {{ currentTask.text }}
    .story-points(v-if="currentTask.result") {{currentTask.result}}
  .task(v-for="task in otherTasks" :key="task.id" @click="handleSetCurrentTask(task)" )
    .title.h-100 {{ task.text }}
    .story-points(v-if="task.result") {{task.result}}
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'TasksSection',

  data() {
    return {
      form: {},
      addTaskEnabled: false,
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
    ...mapActions({
      createTask: 'task/createTask',
      updateTask: 'task/updateTask',

    }),

    handleAddTask() {
      this.form.room_id = this.currentRoom.id;
      this.createTask(this.form).then(() => {
        this.addTaskEnabled = false;
      });
    },

    handleFormState(value) {
      this.addTaskEnabled = value;
      this.$set(this, 'form', {});
    },

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
