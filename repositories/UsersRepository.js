const UsersRepository = (axios) => ({
  getCurrentUser(userId) {
    return axios.get(`v1/users/${userId}`).then((resp) => resp.data);
  },

  createUser(payload) {
    return axios.post('v1/users', payload).then((resp) => resp.data);
  },

  updateUser(payload) {
    return axios.patch(`v1/users/${payload.user.id}`, payload).then((resp) => resp.data);
  },
});

export default UsersRepository;
