import { IUser } from '../../common/interfaces/IUser';
import { ICoreService } from '../types/ICoreService';
import { IUserRepo } from '../types/IUserRepo';
import logger from '../../util/logger';

class CoreService implements ICoreService {
  private userRepo: IUserRepo;

  constructor(userRepo:IUserRepo) {
    this.userRepo = userRepo;
  }

  findUser = async (user: IUser) => {
    logger.hit('[CoreService][findUser]');
    const userFound: IUser = await this.userRepo.find(user);

    logger.hit('[CoreService][findUser]' + JSON.stringify(userFound));
    return userFound;
  };

  dropTables = async () => {
    logger.hit('[CoreService][dropTables]');
    await this.userRepo.dropTable();
  };

  buildTables = async () => {
    logger.hit('[CoreService][buildTables]');
    await this.userRepo.buildTable();
  };

  addUser = async (user: IUser) => {
    logger.hit('[CoreService][addUser]');
    await this.userRepo.add(user);
  };

  addMockData = async () => {
    logger.hit('[CoreService][addMockData]');
    await this.userRepo.addMock();
  };
}

export default CoreService;
