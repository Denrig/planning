import { handleModalState } from '~/utils/utils.js'

export const state = () => ({
  createRoomModal: false,
  addTaskModal: false
})

export const getters = {
  createRoomModal: state => state.createRoomModal,
  addTaskModal: state => state.addTaskModal
}

export const mutations = {
  handleCreateRoomModalState(state, value) {
    handleModalState(value);
    state.createRoomModal = value;
  },

  handleAddTaskModalState(state, value) {
    handleModalState(value)
    state.addTaskModal = value;
  }
}
