const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');

const { loaderRules } = require('./loaderRules.js');

const rootDir = path.join(__dirname, './');
const pathAlias = {
  srcClientDir: path.join(rootDir, 'src'),
  srcServerDir: path.join(rootDir, 'server'),
  buildDir: path.join(rootDir, 'build'),
};

const webEntry = { reactApp: [path.join(pathAlias.srcClientDir , 'index.js')] };
const nodeEntry = { nodeApp: [path.join(pathAlias.srcServerDir , 'index.js')] };

const getOutput = target => ({
  path: target === 'node' ? path.join(pathAlias.buildDir, 'server') : path.join(pathAlias.buildDir, 'client'),
  publicPath: target === 'node' ? path.join(pathAlias.buildDir, 'server') : path.join('src'), // used by webpackdevserver or express
  filename: '[name].js',
  chunkFilename: 'js/[name]-[hash].js',
});

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(pathAlias.srcClientDir, 'index.html'),
  filename: "index.html",
  inject: true
});

const MiniCssExtractPluginConfig = new MiniCssExtractPlugin({
  filename: 'css/[name]_[hash:base64].css',
  chunkFilename: 'css/[name]_[hash:base64].css',
});

const nodePlugins = env => [
];

const webPlugins = env => [
  new webpack.DefinePlugin({
    'process.env.APP_ENV': JSON.stringify(env),
    APP_ENV: JSON.stringify(env),
  }),
  HTMLWebpackPluginConfig,
  MiniCssExtractPluginConfig,
];

const getPlugins = (target, env) => (
  target === 'node' ? nodePlugins(env) : webPlugins(env)
);

const webpackConfigs = (mode, target, env) => ({
  entry:  target === 'node' ? nodeEntry : webEntry,
  output: getOutput(target),
  target,
  mode,
  externals: target === 'node' ? [nodeExternals({
    whitelist: ['react', 'react-dom', /^lodash/] // 'webpack/hot/dev-server', 
  })] : undefined,
  module: {
    rules: loaderRules(target, env),
  },
  plugins: getPlugins(target, env),
  node: {
    fs: 'empty', // dont use fs on browser.. use only by node.
  },
  ...target === 'web' ? {
    node: {
      fs: 'empty', // dont use fs on browser.. use only by node.
    },
    resolve: {
      modules: [
        'node_modules',
      ],
      // alias: {
      //   'react-dom': '@hot-loader/react-dom',
      // },
    },
    devtool: env === 'development' ? 'inline-source-map' : false,
  } : [],
});

module.exports = {
  webpackConfigs,
};