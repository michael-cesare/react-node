const fs = require('fs');
const dotenv = require('dotenv');

const { isEmpty } = require('./util/core');

const APP_ENV = process.env && process.env.APP_ENV ? process.env.APP_ENV : 'development';
const envConfig = dotenv.parse(fs.readFileSync('.env'));
for (const k in envConfig) {
    if (k) {
        process.env[k] = envConfig[k];
    }
}

const mode = (APP_ENV === 'development') ? 'development' : 'production';

module.exports = {
    APP_ENV,
    mode,
    SITE_HOST: process.env.SITE_HOST,
    SITE_PORT: process.env.SITE_PORT,
    LOG_LEVEL: isEmpty(process.env.LOG_LEVEL) ? 'debug' : process.env.LOG_LEVEL,
};