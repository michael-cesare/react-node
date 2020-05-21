import sqlite3 from 'sqlite3';
import { ISqliteDb, ISqliteResult } from '../types/ISqliteDb';

class SqliteDB implements ISqliteDb {
  private db: any;

  constructor(dbFilePath) {
    this.db = new sqlite3.Database(dbFilePath, (err) => {
      if (err) {
        console.log('Could not connect to database', err)
      } else {
        console.log('Connected to database')
      }
    })
  }

  get(query: string, params = []) : Promise<ISqliteResult> {
    return new Promise((resolve, reject) => {
      this.db.get(query, params, (err, row) => {
        if (err) {
          console.log('Error' + err + ' running sql ' + query)
          const queryResult: ISqliteResult = {
            error: err,
            data: null,
          };
          reject(queryResult)
        } else {
          const queryResult: ISqliteResult = {
            error: '',
            data: row,
          };
          resolve(queryResult)
        }
      })
    })
  }

  all(query: string, params = []) : Promise<ISqliteResult> {
    return new Promise((resolve, reject) => {
      this.db.all(query, params, (err, rows) => {
        if (err) {
          console.log('Error' + err + ' running sql ' + query)
          const queryResult: ISqliteResult = {
            error: err,
            data: null,
          };
          reject(queryResult)
        } else {
          const queryResult: ISqliteResult = {
            error: '',
            data: rows,
          };
          resolve(queryResult)
        }
      })
    })
  }

  run(sql: string, params = []) : Promise<ISqliteResult> {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, (err, row) => {
        if (err) {
          console.log('Error' + err + ' running sql ' + sql)
          const queryResult: ISqliteResult = {
            error: err,
            data: null,
          };
          reject(queryResult)
        } else {
          const queryResult: ISqliteResult = {
            error: '',
            data: row,
          };
          resolve(queryResult)
        }
      })
    })
  }
}

export default SqliteDB;
