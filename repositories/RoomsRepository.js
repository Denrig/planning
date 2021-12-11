const RooomsRepository = (axios) => ({
  createRoom(payload) {
    return axios.post('v1/rooms', payload).then((resp) => resp.data);
  },
});

export default RooomsRepository;
