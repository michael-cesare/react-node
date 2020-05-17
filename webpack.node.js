// require('@babel/register');

const envReader = require('./envReader');
const { webpackConfigs } = require('./webpack.base');

const { mode, APP_ENV } = envReader;
const target = 'node';
console.info(`[webpack.server][node] APP_ENV:${APP_ENV}, mode:${mode}`);
const webpackConfig = webpackConfigs(mode, target, APP_ENV);

module.exports =  {
  ...webpackConfig,
};
