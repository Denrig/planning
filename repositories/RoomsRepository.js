const RoomsRepository = (axios) => ({
  // Rooms
  createRoom(payload) {
    return axios.post('v1/rooms', payload).then((resp) => resp.data);
  },

  getRoom(id) {
    return axios.get(`v1/rooms/${id}`).then((resp) => resp.data);
  },

  getRooms(params) {
    return axios.get('v1/rooms', { params });
  },

  deleteRoom(id) {
    return axios.delete(`v1/rooms/${id}`);
  },

  // Attendences
  getRoomByCode(code) {
    return axios.get(`v1/join_room/${code}`).then((resp) => resp.data);
  },

  joinRoom(payload) {
    return axios.post('v1/join_room', payload).then((resp) => resp.data);
  },

  leaveRoom(payload) {
    return axios.delete('v1/join_room', { data: payload }).then((resp) => resp.data);
  },
});

export default RoomsRepository;
