const RoomsRepository = (axios) => ({
  createRoom(payload) {
    console.log(payload);
    return axios.post('v1/rooms', payload).then((resp) => resp.data);
  },

  getRoomByCode(code) {
    return axios.get(`v1/join_room/${code}`).then((resp) => resp.data);
  },

  joinRoom(payload) {
    return axios.post('v1/join_room', payload).then((resp) => resp.data);
  },

  getCurrentRoom(id) {
    return axios.get(`v1/rooms/${id}`).then((resp) => resp.data);
  },
});

export default RoomsRepository;
