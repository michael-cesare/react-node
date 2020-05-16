import { createLogger, transports, format } from 'winston';

import envReader from '../envReader';
import { getTime, getDay, isEmpty } from './core';

const windowDefined = typeof window !== 'undefined' && window && window !== undefined && !isEmpty(window);
const loggerType = windowDefined ? 'react' : 'node';

let instance;

class NoLogger {
  constructor() {
    if (!instance) {
      const logger = this.initLogger();

      instance = logger;
    }
  }

  initLogger = () => this;

  hit = (msg) => {
  }

  info = (msg) => {
  }

  log = (msg) => {
  }

  debug = (msg) => {
  }
}

class CSRLogger {
  constructor() {
    if (!instance) {
      const logger = this.initLogger();

      instance = logger;
    }
  }

  initLogger = () => console;

  hit = (msg) => {
    instance.debug(`[HIT]${msg}`);
  }

  info = (msg) => {
    instance.info(msg);
  }

  log = (msg) => {
    instance.log(msg);
  }

  debug = (msg) => {
    instance.debug(msg);
  }
}

class SSRLogger {
  constructor() {
    if (!instance) {
      const logger = this.initLogger();

      instance = logger;
    }
  }

  initLogger = () => {
    const logLevel = envReader.LOG_LEVEL;
    // SSR react/node - log to winston
    const fileName = `errorLogs/${getDay()}.log`;
    const transportConfig = [
      new transports.Console({
        level: logLevel,
        localTime: true,
      }),
      new transports.File({
        name: 'error-file',
        filename: fileName,
        localTime: true,
        level: logLevel,
      }),
    ];

    const winLogger = createLogger({
      transports: transportConfig,
      format: format.combine(
        // customFormatter,
        format.timestamp({
          format: getTime,
        }),
        // format.splat(), <-- prints ugly staff
        format.simple(),
      ),
    });

    // SSR node
    return winLogger;
  }

  hit = (msg) => {
    instance.debug(`[HIT]${msg}`);
  }

  log = (msg) => {
    instance.info(msg);
  }

  info = (msg) => {
    instance.info(msg);
  }

  debug = (msg) => {
    instance.debug(msg);
  }
}

class LoggerFactory {
  static getLogger = (type) => {
    let logger;
    if (isEmpty(type)) {
      logger = new NoLogger();
    } else if (type === 'node') {
      // Node Logger
      logger = new SSRLogger();
    } else if (type === 'react') {
      // browser logger
      logger = new CSRLogger();
    } else {
      // fallback for any other value
      logger = new NoLogger();
    }

    return logger;
  };
}

const logger = LoggerFactory.getLogger(loggerType);

export default logger;
