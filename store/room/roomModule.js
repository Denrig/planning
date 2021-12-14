import { TYPES } from './roomTypes';
import { STORAGE_KEYS } from '~/static/storage-keys';
import { StorageService } from '~/services/StorageService';
import { notifyRequestError, notifySuccess } from '~/utils/notificationsUtils.js';

export const state = () => ({
  rooms: [],
  currentRoom: {},
  roomLoading: false,
});

export const getters = {
  rooms: (state) => state.rooms,
  currentRoom: (state) => state.currentRoom,
};

export const actions = {
  createRoom({ commit, rootState }, payload) {
    commit(TYPES.ROOM_REQUEST);
    payload.user_id = rootState.user.currentUserId
    return this.$api.rooms
      .createRoom(payload)
      .then((response) => {
        commit(TYPES.SET_CURRENT_ROOM, response);
      })
      .catch((errors) => {
        commit(TYPES.ROOM_ERROR, errors);
        return Promise.reject(errors);
      });
  },

  getRoomByCode({ commit }, payload) {
    commit(TYPES.ROOM_REQUEST);

    return this.$api.rooms
      .getRoomByCode(payload)
      .then((response) => {
        commit(TYPES.SET_CURRENT_ROOM, response)
      })
      .catch((errors) => {
        commit(TYPES.ROOM_ERROR, errors);
        return Promise.reject(errors);
      })
  },

  joinRoom({ commit }, payload) {
    commit(TYPES.ROOM_REQUEST);
    return this.$api.rooms
      .joinRoom(payload)
      .then((response) => {
        commit(TYPES.ROOM_SUCCESS);
      })
      .catch((errors) => {
        commit(TYPES.ROOM_ERROR, errors);
      })
  }
};

export const mutations = {
  [TYPES.ROOM_REQUEST](state) {
    state.roomLoading = true;
  },

  [TYPES.ROOM_SUCCESS](state) {
    state.roomLoading = false;
  },

  [TYPES.ROOM_ERROR](state, errors) {
    state.roomLoading = false;
    notifyRequestError(this, errors.response);
  },

  [TYPES.SET_CURRENT_ROOM](state, room) {
    state.roomLoading = false;
    state.currentRoom = room;
    StorageService.saveToStorage(STORAGE_KEYS.SESSION_ID_KEY, room.id);
  },
};
