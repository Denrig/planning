import RoomsRepository from './RoomsRepository.js';

function apiFactory(axios) {
  return {
    rooms: RoomsRepository(axios),
  };
}

export default apiFactory;
