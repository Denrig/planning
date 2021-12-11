import apiFactory from '~/repositories/index';

export default ({ $axios }, inject) => {
  const api = apiFactory($axios);
  inject('api', api);
};
