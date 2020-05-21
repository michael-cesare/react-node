import { IUser } from '../../common/interfaces/IUser';

export interface IUserRepo {
    find: (user:IUser) => Promise<IUser|null>,
    buildTable: () => Promise<void>,
    dropTable: () => Promise<void>,
    add: (user:IUser) => Promise<void>,
    delete: (user:IUser) => Promise<void>,
    addMock: () => Promise<void>,
};