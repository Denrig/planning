import Vue from 'vue';
import { TYPES } from './roomTypes';
import { STORAGE_KEYS } from '~/static/storage-keys';
import { StorageService } from '~/services/StorageService';
import { notifyRequestError, notifySuccess } from '~/utils/notificationsUtils.js';

export const state = () => ({
  rooms: [],
  currentRoom: {},
  players: [],
  roomLoading: false,
  showVotes: false,
});

export const getters = {
  rooms: (state) => state.rooms,
  currentRoom: (state) => state.currentRoom,
  players: (state) => state.players,
  getPlayer: (state) => (id) => state.players.find((player) => player.id === id),
};

export const actions = {
  createRoom({ commit, rootState }, payload) {
    commit(TYPES.ROOM_REQUEST);
    payload.user_id = rootState.user.currentUserId;
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
        commit(TYPES.SET_CURRENT_ROOM, response);
      })
      .catch((errors) => {
        commit(TYPES.ROOM_ERROR, errors);
        return Promise.reject(errors);
      });
  },

  joinRoom({ commit }, payload) {
    commit(TYPES.ROOM_REQUEST);
    return this.$api.rooms
      .joinRoom(payload)
      .then(() => {
        commit(TYPES.ROOM_SUCCESS);
      })
      .catch((errors) => {
        commit(TYPES.ROOM_ERROR, errors);
      });
  },

  getCurrentRoom({ commit }) {
    return this.$api.rooms
      .getCurrentRoom(StorageService.getFromStorage(STORAGE_KEYS.SESSION_ID_KEY))
      .then((response) => {
        commit(TYPES.SET_CURRENT_ROOM, response);
        commit(TYPES.SET_PLAYERS, response.players);
        commit('task/SET_TASKS', response.tasks, { root: true });
      })
      .catch((errors) => {
        commit(TYPES.ROOM_ERROR, errors);
        return Promise.reject(errors);
      });
  },

  addUserToRoom({ commit }, user) {
    commit(TYPES.ADD_USER_TO_ROOM, user);
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
    notifyRequestError(this, errors.response);
  },

  [TYPES.SET_CURRENT_ROOM](state, room) {
    state.roomLoading = false;
    state.currentRoom = room;
    StorageService.saveToStorage(STORAGE_KEYS.SESSION_ID_KEY, room.id);
  },

  [TYPES.ADD_USER_TO_ROOM](state, user) {
    state.players.push(user);
  },

  [TYPES.SET_PLAYERS](state, players) {
    state.players = players;
  },

  [TYPES.PLAYER_VOTED](state, data) {
    const user = state
      .players
      .find((player) => player.id === data.vote.user_id);

    Vue.set(user, 'voted', data.voted);
    Vue.set(user, 'vote', data.vote.vote);
  },

  [TYPES.CLEAR_VOTES](state) {
    state.players.forEach((player) => {
      Vue.set(player, 'voted', false);
      Vue.set(player, 'vote', null);
    });
  },
};
