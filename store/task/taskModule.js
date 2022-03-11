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
  // Websocket handlers
  addTask({ commit }, task) {
    commit(TYPES.ADD_TASK, task);
  },

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
};

export const mutations = {
  [TYPES.TASK_REQUEST]() {
  },

  [TYPES.TASK_SUCCESS]() {
  },

  [TYPES.TASK_ERROR](state, errors) {
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
    Vue.set(state.tasks, index, task);
  },
};
