import { TYPES } from './userTypes';
import { StorageService } from '~/services/StorageService';
import { notifyRequestError, notifySuccess } from '~/utils/notificationsUtils.js';

const USER_ID_KEY = "userId"

export const state = () => ({
  currentUserId: null,
  currentUser: {}
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
      .then(response => {
        commit(TYPES.SET_CURRENT_USER, response)
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
        notifySuccess(this, 'Welcome to the party!')
        commit(TYPES.SET_CURRENT_USER, response);
      })
      .catch((errors) => {
        commit(TYPES.USER_ERROR, errors);
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
    notifyRequestError(this, errors);
  },

  [TYPES.SET_CURRENT_USER](state, user) {
    state.userLoading = false;
    state.currentUser = user;
    StorageService.saveToStorage(USER_ID_KEY, user.id)
  },

  setCurrentUserId(state) {
    state.currentUserId = StorageService.getFromStorage(USER_ID_KEY);
  }
};
