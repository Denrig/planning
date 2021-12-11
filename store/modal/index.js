import { handleModalState } from '~/utils/utils.js'

export const state = () => ({
  createRoomModal: false,
  createUserModal: false
})

export const getters = {
  createRoomModal: state => state.createRoomModal,
  createUserModal: state => state.createUserModal
}

export const mutations = {
  handleCreateRoomModalState(state, value) {
    handleModalState(value);
    state.createRoomModal = value;
  },

  handleCreateUserModalState(state, value) {
    handleModalState(value)
    state.createUserModal = value;
  }
}
