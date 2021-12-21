import RoomsRepository from './RoomsRepository.js';
import TasksRepository from './TasksRepository.js';
import UsersRepository from './UsersRepository.js';

function apiFactory(axios) {
  return {
    rooms: RoomsRepository(axios),
    users: UsersRepository(axios),
    tasks: TasksRepository(axios),
  };
}

export default apiFactory;
