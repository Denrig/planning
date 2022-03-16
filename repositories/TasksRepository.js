const TasksRepository = (axios) => ({

  // Tasks

  createTask(payload) {
    return axios.post(`v1/rooms/${payload.room_id}/tasks`, payload).then((response) => response.data);
  },

  updateTask(payload) {
    return axios.patch(`v1/rooms/${payload.room_id}/tasks/${payload.task_id}`, payload).then((response) => response.data);
  },

  getTasksForRoom(roomId) {
    return axios.get(`v1/rooms/${roomId}/tasks`).then((response) => response.data);
  },

  searchTask(payload) {
    return axios.get(`v1/rooms/${payload.room_id}/tasks/${payload.task_id}`).then((response) => response.data);
  },

  // Votes

  vote(payload) {
    return axios.post('v1/votes', payload).then((response) => response.data);
  },

  cancelVote(payload) {
    return axios.delete('v1/votes', { data: payload }).then((response) => response.data);
  },

  displayVotes(payload) {
    return axios.patch(`v1/votes/${payload.id}`, payload).then((response) => response.data);
  },

  getVotesForTask(taskId) {
    return axios.get(`v1/votes?task_id=${taskId}`).then((response) => response.data);
  },
});

export default TasksRepository;
