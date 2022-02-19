const RoomsRepository = (axios) => ({
  createRoom(payload) {
    return axios.post('v1/rooms', payload).then((resp) => resp.data);
  },

  getRoomByCode(code) {
    return axios.get(`v1/join_room/${code}`).then((resp) => resp.data);
  },

  joinRoom(payload) {
    return axios.post('v1/join_room', payload).then((resp) => resp.data);
  },

  leaveRoom(payload) {
    return axios.delete('v1/join_room', { data: payload }).then((resp) => resp.data);
  },

  getCurrentRoom(id) {
    return axios.get(`v1/rooms/${id}`).then((resp) => resp.data);
  },

  getRooms(params) {
    return axios.get('v1/rooms', { params });
  },
});

export default RoomsRepository;
