<template lang="pug">
.task-form-container
    button.app-button.w-100.add-task(
      @click="handleFormState(true)",
      v-if="!addTaskEnabled"
    ) Add Task
    b-container(v-else)
      b-row.my-2
        b-col
          .input-wca.w-100
            input(
              type="string",
              v-model="jiraId",
              placeholder="Jira Card",
            )
            button.app-button(@click="handleSearchTask")
              BIcon(icon="search")
      ValidationObserver(v-slot="{ handleSubmit }")
        form(@submit.prevent="handleSubmit(handleAddTask)")
          b-row
            b-col
              ValidationProvider.input-group(
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
          b-row.my-2
            b-col
              .input-group
                textarea.w-100(
                  type="text",
                  v-model="form.description",
                  placeholder="Task's Description",
                )
          b-row.my-2
            b-col
              .input-group
                input.w-100(
                  type="string",
                  v-model="form.status"
                  placeholder="Status",
                )
            b-col
              .input-group
                select.w-100(
                  name="issueType"
                  v-model="form.issue_type"
                )
                  option(value="task") Task
                  option(value="bug") Bug
                  option(value="story") Story
          b-row
            b-col
              button.app-button.w-100.cancel-task(
                @click="handleFormState(false)"
              ) Cancel
            b-col
              input.app-button.w-100.create-task(type="submit" value="Add!")
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {

  data() {
    return {
      addTaskEnabled: false,
      form: {},
      jiraId: null,
    };
  },

  computed: mapGetters({ currentRoom: 'room/currentRoom' }),

  methods: {
    ...mapActions({
      createTask: 'task/createTask',
      searchTask: 'task/searchTask',
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

    handleSearchTask() {
      this.searchTask({ task_id: this.jiraId, room_id: this.currentRoom.id })
        .then((data) => { this.form = data; });
    },
  },
};
</script>

<style>
</style>
