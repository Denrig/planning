const TYPES = {
  TASK_ADDED: 'TASK_ADDED',
  PLAYER_JOINED: 'PLAYER_JOINED',
  PLAYER_VOTED: 'PLAYER_VOTED',
  PLAYER_CANCELED_VOTE: 'PLAYER_VOTE_CANCELED',
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
      case TYPES.PLAYER_VOTED:
        store.dispatch('voting/playerVoted', data);
        break;
      case TYPES.PLAYER_CANCELED_VOTE:
        store.dispatch('voting/playerCanceledVote', data.user_id);
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
