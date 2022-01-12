import { handleModalState } from '~/utils/utils.js';

export const state = () => ({
  createRoomModal: false,
  userModal: false,
  roomsModal: true,
});

export const getters = {
  createRoomModal: (state) => state.createRoomModal,
  userModal: (state) => state.userModal,
  roomsModal: (state) => state.roomsModal,
};

export const mutations = {
  handleCreateRoomModalState(state, value) {
    handleModalState(value);
    state.createRoomModal = value;
  },

  handleUserModalState(state, value) {
    handleModalState(value);
    state.userModal = value;
  },

  handleRoomsModalState(state, value) {
    handleModalState(value);
    state.roomsModal = value;
  },
};
