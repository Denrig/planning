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
                name="taskTitle",
                v-slot="{ errors, invalid, dirty }",
                tag="div"
              )
                input.w-100(
                  type="string",
                  v-model="form.text",
                  placeholder="Task's title",
                  :class="{ invalid: invalid && dirty }"
                )
          b-row
            b-col
              button.app-button.w-100.cancel-task(
                @click="handleFormState(false)"
              ) Cancel
            b-col
              button.app-button.w-100.create-task(@click="handleAddTask") Add!
  .task(v-for="task in tasks", :key="task.id")
    .title.h-100 {{ task.text }}
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
    }),
  },

  methods: {
    ...mapActions({
      createTask: 'task/createTask',
    }),

    handleAddTask() {
      this.form.room_id = this.currentRoom.id;
      this.createTask(this.form).then(() => {
        this.from = {};
        this.addTaskEnabled = false;
      });
    },

    handleFormState(value) {
      this.addTaskEnabled = value;
    },
  },
};
</script>
<style lang="scss">
.tasks-section {
  overflow: scroll;

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

  .task {
    margin: 10px;
    max-height: 150px;
    border-radius: 10px;
    box-shadow: inset 0 0 5px 2px $light-grey;

    .title {
      font-size: $big-text;
      font-weight: $medium;
      padding: 10px;
    }
  }
}
</style>
