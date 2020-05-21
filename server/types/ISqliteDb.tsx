export interface ISqliteResult {
  error: string,
  data?: any,
};

export interface ISqliteDb {
  run: (query: string, ...args: any[]) => Promise<ISqliteResult>,
  get: (query: string, ...args: any[]) => Promise<ISqliteResult>,
  all: (query: string, ...args: any[]) => Promise<ISqliteResult>,
};