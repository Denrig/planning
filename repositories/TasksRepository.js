const TasksRepository = (axios) => ({
  createTask(payload) {
    return axios.post(`v1/rooms/${payload.room_id}/tasks`, payload).then((response) => response.data)
  },

  getTasksForRoom(roomId) {
    return axios.get(`v1/rooms/${roomId}/tasks`).then((response) => response.data)
  }
})

export default TasksRepository