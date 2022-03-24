import Vue from 'vue';
import { TYPES } from './taskTypes';
import { notifyRequestError } from '~/utils/notificationsUtils.js';

export const state = () => ({
  tasks: [],
});

export const getters = {
  tasks: (state) => state.tasks,
  currentVotingTask: (state) => state.tasks.find((task) => task.is_current),
};

export const actions = {
  // Api Calls
  getTasksForRoom({ commit }, roomId) {
    return this.$api.tasks
      .getTasksForRoom(roomId)
      .then((tasks) => commit(TYPES.SET_TASKS, tasks))
      .catch((errors) => commit(TYPES.TASK_ERROR, errors));
  },

  createTask({ commit }, payload) {
    return this.$api.tasks
      .createTask(payload)
      .then(() => commit(TYPES.TASK_SUCCESS))
      .catch((errors) => commit(TYPES.TASK_ERROR, errors));
  },

  updateTask({ commit }, payload) {
    return this.$api.tasks
      .updateTask(payload)
      .then(() => commit(TYPES.TASK_SUCCESS))
      .catch((errors) => commit(TYPES.TASK_ERROR, errors));
  },

  searchTask({ commit }, payload) {
    return this.$api.tasks
      .searchTask(payload)
      .catch((errors) => {
        commit(TYPES.TASK_ERROR, errors);
        return Promise.reject(errors);
      });
  },

  destroyTasks({ commit }, roomId) {
    return this.$api.tasks
      .destroyAllTasks(roomId)
      .catch((errors) => {
        commit(TYPES.TASK_ERROR, errors);
        return Promise.reject(errors);
      });
  },
};

export const mutations = {
  [TYPES.TASK_REQUEST]() {
  },

  [TYPES.TASK_SUCCESS]() {
  },

  [TYPES.TASK_ERROR](_, errors) {
    notifyRequestError(this, errors.response);
  },

  [TYPES.SET_TASKS](state, tasks) {
    state.tasks = tasks;
  },

  [TYPES.ADD_TASK](state, task) {
    state.tasks.unshift(task);
  },

  [TYPES.UPDATE_TASK](state, task) {
    const index = state.tasks.findIndex((stateTask) => task.id === stateTask.id);
    if (index > -1) { Vue.set(state.tasks, index, task); }
  },
};
