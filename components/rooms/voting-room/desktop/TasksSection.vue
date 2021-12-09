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
                  v-model="form.title",
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
    .title.h-100 {{ task.title }}
</template>
<script>
export default {
  name: 'TasksSection',

  data() {
    return {
      form: {},
      tasks: [
        {
          id: 1,
          title: 'Bartai titlu pentru taskuri',
        },
        {
          id: 2,
          title:
            'Bartai titlu pentru taskuri care e ceva mai lung in panina masii si a lui hristos',
        },
      ],
      addTaskEnabled: false,
    };
  },

  methods: {
    handleAddTask() {
      this.form.id = this.tasks.length + 1;
      this.tasks.unshift(this.form);
      this.form = {};
      this.addTaskEnabled = false;
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
