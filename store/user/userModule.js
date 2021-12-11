import { TYPES } from './userTypes';
import { StorageService } from '~/services/StorageService';
import { notifyRequestError, notifySuccess } from '~/utils/notificationsUtils.js';

const USER_PROFILE_KEY = "userProfile"

export const state = () => ({
  currentUser: StorageService.getFromStorage(USER_PROFILE_KEY)
});

export const getters = {
  currentUser: (state) => state.currentUser,
};

export const actions = {
  createUser({ commit }, payload) {
    commit(TYPES.USER_REQUEST);
    return this.$api.users
      .createUser(payload)
      .then((response) => {
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
    StorageService.saveToStorage(SESSION_ID_KEY, user.id)
    notifySuccess(this, 'Your user is now open!');
  },
};
