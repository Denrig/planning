import { handleModalState } from '~/utils/utils.js'

export const state = () => ({
  createRoomModal: false
})

export const getters = {
  createRoomModal: state => state.createRoomModal
}

export const mutations = {
  handleCreateRoomModalState(state, value){
    handleModalState(value);
    state.createRoomModal = value;
  }
}
