import express from 'express';

import SqliteDb from '../util/sqldb';
import UserService from '../services/coreService';
import UserRepo from '../repositories/userRepo';
import asyncMiddleware from '../middleware/asyncMiddleware';
import logger from '../../util/logger';

import {
  resetDBEndpoint,
} from '../../common/endpoints';

const migrationRouter = express.Router();
const apiTimeout = 5 * 100000;

// ToDo - this should be in IOC, Not like this
const initCoreService = () => {
  const db = new SqliteDb(SQLITESOURCE);
  const userRepo = new UserRepo(db);
  const userServ = new UserService(userRepo);

  return userServ;
};

const resetDatabaseTables = async (req: any, res: any, next: any) => {
  logger.log('[resetDatabaseTables] hit');
  req.setTimeout(apiTimeout, () => {
    const err: any = new Error('Request Timeout');
    err.status = 408;
    next(err);
  });

  const serv = initCoreService();
  await serv.dropTables();
  await serv.buildTables();
  await serv.addMockData();

  const rtn = { test: 'ready'};

  res.json(rtn);
};

migrationRouter.get('/' + resetDBEndpoint, asyncMiddleware(resetDatabaseTables));

export default migrationRouter;
