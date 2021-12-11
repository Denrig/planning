import { TYPES } from './roomTypes';
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
  createRoom({ commit }, payload) {
    commit(TYPES.ROOM_REQUEST);
    return this.$api.rooms
      .createRoom(payload)
      .then((response) => {
        commit(TYPES.SET_CURRENT_ROOM, response);
      })
      .catch((errors) => {
        commit(TYPES.ROOM_ERROR, errors);
      });
  },
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
    notifyRequestError(errors);
  },

  [TYPES.SET_CURRENT_ROOM](state, room) {
    state.roomLoading = false;
    state.currentRoom = room;
    notifySuccess('Your room is now open!');
  },
};
