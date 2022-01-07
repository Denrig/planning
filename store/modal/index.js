import { handleModalState } from '~/utils/utils.js';

export const state = () => ({
  createRoomModal: false,
  userModal: false,
});

export const getters = {
  createRoomModal: (state) => state.createRoomModal,
  userModal: (state) => state.userModal,
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
};
