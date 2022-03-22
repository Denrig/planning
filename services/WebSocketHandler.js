const TYPES = {
  TASK_ADDED: 'TASK_ADDED',
  PLAYER_JOINED: 'PLAYER_JOINED',
  PLAYER_LEFT: 'PLAYER_LEFT',
  PLAYER_VOTED: 'PLAYER_VOTED',
  PLAYER_CANCELED_VOTE: 'PLAYER_VOTE_CANCELED',
  DISPLAY_VOTES_CHANGED: 'DISPLAY_VOTES_CHANGED',
  TASK_UPDATED: 'TASK_UPDATED',
  ROOM_DELETED: 'ROOM_DELETED',
};

export const WebSocketHandler = {
  execute(context, data) {
    const store = context.$store;
    switch (data.type) {
      case TYPES.TASK_ADDED:
        store.dispatch('task/addTask', data.task);
        store.dispatch('voting/displayVotesChanged', false);
        break;
      case TYPES.TASK_UPDATED:
        store.commit('task/UPDATE_TASK', data.task);
        break;
      case TYPES.PLAYER_JOINED:
        store.dispatch('room/userAction', data);
        break;
      case TYPES.PLAYER_LEFT:
        store.dispatch('room/playerLeft', data);
        break;
      case TYPES.PLAYER_VOTED:
        store.dispatch('voting/playerVoted', data);
        break;
      case TYPES.PLAYER_CANCELED_VOTE:
        store.dispatch('voting/playerCanceledVote', data.user_id);
        break;
      case TYPES.DISPLAY_VOTES_CHANGED:
        store.dispatch('voting/displayVotesChanged', data.value);
        store.commit('voting/SET_VOTING_RESULTS', data.results || {});
        break;
      case TYPES.ROOM_DELETED:
        store.dispatch('room/notifyRoomDeleted');
      default:
        console.log('Unknown');
    }
  },
};
