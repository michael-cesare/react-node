import express from 'express';

import SqliteDb from '../util/sqldb';
import UserService from '../services/coreService';
import UserRepo from '../repositories/userRepo';
import asyncMiddleware from '../middleware/asyncMiddleware';
import logger from '../../util/logger';
import { IUser, mapUser } from '../../common/interfaces/IUser';

import {
  loginEndpoint,
  tokenValidateEndpoint,
  tokenRenewEndpoint,
} from '../../common/endpoints';

const userRouter = express.Router();
const apiTimeout = 5 * 100000;

// ToDo - this should be in IOC, Not like this
const initCoreService = () => {
  const db = new SqliteDb(SQLITESOURCE);
  const userRepo = new UserRepo(db);
  const userServ = new UserService(userRepo);

  return userServ;
};

const loginUser = async (req: any, res: any, next: any) => {
  logger.log('[loginUser] hit');
  req.setTimeout(apiTimeout, () => {
    const err: any = new Error('Request Timeout');
    err.status = 408;
    next(err);
  });

  const { body } = req;
  // const parseBody = JSON.parse(body);
  console.log('Got body:', body);
  const user:IUser = mapUser(body);
  console.log('user:', JSON.stringify(user));
  const serv = initCoreService();
  // ToDo - change to JWT
  const result = await serv.findUser(user)
  const token = '123'; // some fake token
  const rtn = { user: result, token };

  res.json(rtn);
};

const validateToken = async (req: any, res: any, next: any) => {
  logger.log('[validateToken] hit');
  req.setTimeout(apiTimeout, () => {
    const err: any = new Error('Request Timeout');
    err.status = 408;
    next(err);
  });

  const { body } = req;
  // const parseBody = JSON.parse(body);
  console.log('Got body:', body);
  const token = body.token;
  // ToDo - validate JWT
  const fakeToken = '123'; // some fake token
  const isEqual = token == fakeToken;
  const rtn = { isValid: isEqual };

  res.json(rtn);
  res.end();
};


userRouter.post('/' + loginEndpoint, asyncMiddleware(loginUser));
userRouter.post('/' + tokenValidateEndpoint, asyncMiddleware(validateToken));

export default userRouter;
