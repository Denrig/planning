const UsersRepository = (axios) => ({
  getCurrentUser(userId) {
    return axios.get('v1/users', { headers: { userId: userId } }).then((resp) => resp.data);
  },

  createUser(payload) {
    return axios.post('v1/users', payload).then((resp) => resp.data)
  }
})

export default UsersRepository