const TYPES = {
  TASK_ADDED: 'TASK_ADDED',
  VOTING_ENDED: 'VOTING_ENDED',
  PLAYER_JOINED: 'PLAYER_JOINED',
};

export const WebSocketHandler = {
  execute(context, data) {
    const store = context.$store;
    switch (data.type) {
      case TYPES.TASK_ADDED:
        store.dispatch('task/addTask', data.task);
        break;
      case TYPES.PLAYER_JOINED:
        store.dispatch('room/addUserToRoom', data.user);
        break;
      case TYPES.VOTING_ENDED:
        break;
      default:
        console.log('Unknown');
    }
  },

  currentVoteRequest(store) {
    return {
      user_id: store.getters['user/currentUserId'],
      room_id: store.getters['room/currentRoom'].id,
      vote: store.state.room.currentVote,
    };
  },
};
