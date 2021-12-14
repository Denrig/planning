const RooomsRepository = (axios) => ({
  createRoom(payload) {
    return axios.post('v1/rooms', payload).then((resp) => resp.data);
  },

  getRoomByCode(code) {
    return axios.get(`v1/rooms/${code}`).then((resp) => resp.data);
  },

  joinRoom(payload) {
    return axios.post('v1/join_room', payload).then((resp) => resp.data);
  }
});

export default RooomsRepository;
