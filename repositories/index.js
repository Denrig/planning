import RoomsRepository from './RoomsRepository.js';
import UsersRepository from './UsersRepository.js';

function apiFactory(axios) {
  return {
    rooms: RoomsRepository(axios),
    users: UsersRepository(axios)
  };
}

export default apiFactory;
