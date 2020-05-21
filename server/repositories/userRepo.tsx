
import md5 from 'md5';
import { IUser, mapUser } from '../../common/interfaces/IUser';
import { IUserRepo } from '../types/IUserRepo';
import { ISqliteDb } from '../types/ISqliteDb';
import { isEmpty } from '../../util/core';
import logger from '../../util/logger';

class UserRepo implements IUserRepo {
  private readonly sqliteDb: ISqliteDb;

  constructor(sqliteDb:ISqliteDb) {
    this.sqliteDb = sqliteDb;
  }

  add = async (user:IUser) => {
    const query = 'INSERT INTO users (name, username, email, password, groupName) VALUES (?,?,?,?,?);';
    const params = [user.name, user.username, user.email, md5(user.password), user.groupName];
    await this.sqliteDb.run(query, params);
  }

  addMock = async () => {
    const query = 'INSERT INTO users (name, username, email, password, groupName) VALUES (?,?,?,?,?);';
    await this.sqliteDb.run(query, ["mock admin","admin","admin@example.com", md5("admin123"), 'admin']);
    await this.sqliteDb.run(query, ["mock user","user","user@example.com", md5("user123"), 'gambler']);
    await this.sqliteDb.run(query, ["mock gambler","gambler","gambler@example.com", md5("gambler123"), 'gambler']);
    await this.sqliteDb.run(query, ["mock sales","sales","sales@example.com", md5("sales123"), 'sales']);
    await this.sqliteDb.run(query, ["mock sales2","sales2","sales2@example.com", md5("sales123"), 'sales']);
  }

  find = async (user:IUser) => {
    const query = `
      SELECT id, name, username, email, groupName
      FROM users
      WHERE username == ?
      AND password == ?
      LIMIT 1;
    `;

    const result = await this.sqliteDb.get(query, [user.username, md5(user.password)]);

    logger.hit('[userRepo][find]' + user.username + ' data:'+ JSON.stringify(result));
    const foundUser:IUser = mapUser(result.data);

    return foundUser;
  }

  delete = async (user:IUser) => {
    const query = `
      DELETE FROM users
      WHERE username == '${user.username}';
    `;

    await this.sqliteDb.run(query);
  }

  dropTable = async () => {
    const query = `DROP TABLE IF EXISTS users;`;

    await this.sqliteDb.run(query);
  }

  buildTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name text,
      username text UNIQUE,
      groupName text,
      email text UNIQUE,
      password text,
      CONSTRAINT email_unique UNIQUE (email),
      CONSTRAINT username_unique UNIQUE (username)
      )
    `;

    await this.sqliteDb.run(query);
  };
};

export default UserRepo;
