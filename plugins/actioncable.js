import Vue from 'vue';
import ActionCableVue from 'actioncable-vue';

Vue.use(ActionCableVue, {
  debug: true,
  debugLevel: 'error',
  connectionUrl: 'ws://localhost:5000/cable', // or function which returns a string with your JWT appended to your server URL as a query parameter
  connectImmediately: true,
});
