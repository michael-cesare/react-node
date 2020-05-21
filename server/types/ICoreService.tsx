import { IUser } from '../../common/interfaces/IUser';

export interface ICoreService {
    findUser: (user:IUser) => Promise<IUser|null>,
    buildTables: () => Promise<void>,
    dropTables: () => Promise<void>,
    addUser: (user:IUser) => Promise<void>,
    addMockData: () => Promise<void>,
};