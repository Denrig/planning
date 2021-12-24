const TYPES = {
  TASK_ADDED: 'TASK_ADDED',
};

export const WebSocketHandler = {
  execute(context, data) {
    const store = context.$store;
    switch (data.type) {
      case TYPES.TASK_ADDED:
        store.dispatch('task/addTask', data.task);
        break;
      default:
        console.log('Unknown');
    }
  },
};
