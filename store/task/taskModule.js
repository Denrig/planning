import { TYPES } from './taskTypes';
import { notifyRequestError } from '~/utils/notificationsUtils.js';

export const state = () => ({
  tasks: [],
  taskLoading: false,
});

export const getters = {
  tasks: (state) => state.tasks,
};

export const actions = {
  getTasksForRoom({ commit }, roomId) {
    return this.$api.tasks
      .getTasksForRoom(roomId)
      .then((tasks) => commit(TYPES.SET_TASKS, tasks))
      .catch((errors) => commit(TYPES.TASK_ERROR, errors));
  },

  createTasksForRoom({ commit }, payload) {
    return this.$api.tasks
      .createTask(payload)
      .then(() => commit(TYPES.TASK_SUCCESS))
      .catch((errors) => commit(TYPES.TASK_ERROR, errors));
  },
  addTask({ commit }, task) {
    commit(TYPES.ADD_TASK, task);
  },
};

export const mutations = {
  [TYPES.TASK_REQUEST](state) {
    state.taskLoading = true;
  },

  [TYPES.TASK_SUCCESS](state) {
    state.taskLoading = false;
  },

  [TYPES.TASK_ERROR](state, errors) {
    state.taskLoading = false;
    notifyRequestError(this, errors.response);
  },

  [TYPES.SET_TASKS](state, tasks) {
    state.taskLoading = false;
    state.tasks = tasks;
  },
  [TYPES.ADD_TASK](state, task) {
    state.tasks.unshift(task);
  },
};
