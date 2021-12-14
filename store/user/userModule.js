import { TYPES } from './userTypes';
import { STORAGE_KEYS } from '~/static/storage-keys';
import { StorageService } from '~/services/StorageService';
import { notifyRequestError, notifySuccess } from '~/utils/notificationsUtils.js';

export const state = () => ({
  currentUserId: null,
  currentUser: {},
});

export const getters = {
  currentUser: (state) => state.currentUser,
  currentUserId: (state) => state.currentUserId,
};

export const actions = {
  getCurrentUser({ state, commit }) {
    commit(TYPES.USER_REQUEST);
    return this.$api.users
      .getCurrentUser(state.currentUserId)
      .then((response) => {
        commit(TYPES.SET_CURRENT_USER, response);
      })
      .catch((errors) => {
        commit(TYPES.USER_ERROR, errors);
      });
  },

  createUser({ commit }, payload) {
    commit(TYPES.USER_REQUEST);
    return this.$api.users
      .createUser(payload)
      .then((response) => {
        notifySuccess(this, 'Welcome to the party!');
        commit(TYPES.SET_CURRENT_USER, response);
      })
      .catch((errors) => {
        commit(TYPES.USER_ERROR, errors);
        return Promise.reject(errors);
      });
  },

  updateUser({ commit }, payload) {
    commit(TYPES.USER_REQUEST);
    return this.$api.users
      .updateUser(payload)
      .then((response) => {
        notifySuccess(this, 'Your info is saved! We got you!');
        commit(TYPES.SET_CURRENT_USER, response);
      })
      .catch((errors) => {
        commit(TYPES.USER_ERROR, errors);
        return Promise.reject(errors);
      });
  },
};

export const mutations = {
  [TYPES.USER_REQUEST](state) {
    state.userLoading = true;
  },

  [TYPES.USER_SUCCESS](state) {
    state.userLoading = false;
  },

  [TYPES.USER_ERROR](state, errors) {
    state.userLoading = false;
    notifyRequestError(this, errors.response);
  },

  [TYPES.SET_CURRENT_USER](state, user) {
    state.userLoading = false;
    state.currentUser = user;
    StorageService.saveToStorage(STORAGE_KEYS.USER_ID_KEY, user.id);
  },

  setCurrentUserId(state) {
    state.currentUserId = StorageService.getFromStorage(STORAGE_KEYS.USER_ID_KEY);
  },
};
