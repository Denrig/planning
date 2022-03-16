<template lang="pug">
.task-form-container
    b-container
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
                @click="handleCancelation"
              ) Cancel
            b-col
              input.app-button.w-100.create-task(type="submit" value="Add!")
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {

  data() {
    return {
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
      this.formatJiraId();
      const request = {
        ...this.form,
        room_id: this.currentRoom.id,
        jira_id: this.jiraId,
      };

      this.createTask(request).then(() => {
        this.resetForm();
        this.$emit('success');
      });
    },

    handleSearchTask() {
      this.formatJiraId();
      this.searchTask({ task_id: this.jiraId, room_id: this.currentRoom.id })
        .then((data) => { this.form = data; });
    },

    handleCancelation() {
      this.resetForm();
      this.$emit('cancel');
    },

    resetForm() {
      this.$set(this, 'form', {});
      this.jiraId = null;
    },

    validCardUrl(str) {
      const pattern = new RegExp('https://wolfpackdigital.atlassian.net/browse');
      return !!pattern.test(str);
    },

    formatJiraId() {
      if (this.validCardUrl(this.jiraId)) this.jiraId = this.jiraId.split('/').pop();
    },
  },
};
</script>
<style lang="scss">
  .task-form-container {
    .app-button {
      font-size: $medium-text;
      font-weight: $bold;
    }

    .create-task {
      background-color: $yellow;
      color: $black;
    }
  }
</style>
