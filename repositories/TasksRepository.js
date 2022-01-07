const TasksRepository = (axios) => ({
  createTask(payload) {
    return axios.post(`v1/rooms/${payload.room_id}/tasks`, payload).then((response) => response.data);
  },

  getTasksForRoom(roomId) {
    return axios.get(`v1/rooms/${roomId}/tasks`).then((response) => response.data);
  },

  vote(payload) {
    return axios.post('v1/votes', payload).then((response) => response.data);
  },

  cancelVote(payload) {
    return axios.delete('v1/votes', { data: payload }).then((response) => response.data);
  },
});

export default TasksRepository;
