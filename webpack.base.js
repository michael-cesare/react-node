const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CrudeTimingPlugin = require('./webpackFiles/crudeTimingPlugin');
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
  // env === 'development' ? new BundleAnalyzerPlugin() : {},
];

const webPlugins = env => [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env.APP_ENV': JSON.stringify(env),
    APP_ENV: JSON.stringify(env),
  }),
  // env === 'development' ? new BundleAnalyzerPlugin() : {},
  env === 'development' ? new CrudeTimingPlugin() : () => {},
  HTMLWebpackPluginConfig,
  MiniCssExtractPluginConfig,
];

const chuckName = (module, prefix) => {
  // get the name. E.g. node_modules/packageName/not/this/part.js
  const moduleMatch = module && module.context && module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
  const found = (moduleMatch && moduleMatch.length > 0);
  const packageName = found ? moduleMatch[1] : module.identifier().split('/').reduceRight(item => item);
  const p = (prefix && prefix.length > 0) ? `${prefix}_` : '';

  // npm package names are URL-safe, but some servers don't like @ symbols
  return `${p}${packageName.replace('@', '')}`;
};

const getSplitChunks = target => ({
  chunks: 'async',
  maxInitialRequests: 3,
  maxAsyncRequests: 5,
  minSize: 0,
  cacheGroups: {
    // No need for node_modules vendor chunk on the server-side
    ...target !== 'node' && {
      vendor: {
        test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
        priority: -10,
        name: module => chuckName(module, 'vender'),
        chunks: 'all',
      },
    },
    // ADD application chucks only - no node_moduels here
    commons: {
      test: /!([\\/]node_modules[\\/])/,
      priority: -20,
      name: module => chuckName(module, 'commons'),
      chunks: 'initial', 
    },
    // all the rest , including React custom components and shared chucks
    default: {
      minChunks: 2,
      priority: -30,
      reuseExistingChunk: true,
    },
  },
});

const getOptimization = (target, env) => (
  env === 'development'
    ? {
      splitChunks: getSplitChunks(target),
      // minimizer: [terserMinify], // uncomment only to TEST
      minimize: false,
      nodeEnv: env,
    }
    : {
      splitChunks: getSplitChunks(target),
      minimizer: [terserMinify],
      nodeEnv: 'production',
    }
);

const webpackConfigs = (mode, target, env) => ({
  entry:  target === 'node' ? nodeEntry : webEntry,
  output: getOutput(target),
  target,
  mode,
  // externals: target === 'node' ? [nodeExternals({
  //   whitelist: ['react', 'react-dom', /^lodash/] // 'webpack/hot/dev-server', 
  // })] : undefined,
  module: {
    rules: loaderRules(target, env),
  },
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
  plugins: target === 'node' ? nodePlugins(env) : webPlugins(env),
  optimization: getOptimization(target, env),
});

module.exports = {
  webpackConfigs,
};