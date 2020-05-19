const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const LoadablePlugin = require('@loadable/webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CrudeTimingPlugin = require('./webpackFiles/crudeTimingPlugin');
const { loaderRules } = require('./loaderRules');
const {
  APP_ENV, SITE_HOST, SITE_PORT,
  LOG_LEVEL, API_BASE_URL, BASE_URL,
  SERVER,
} = require('./envReader');


const rootDir = path.join(__dirname, './');
const pathAlias = {
  srcClientDir: path.join(rootDir, 'src'),
  srcServerDir: path.join(rootDir, 'server'),
  buildDir: path.join(rootDir, 'build'),
  staticDir: path.join(rootDir, 'src', 'static'),
};

const webEntry = { ReactApp: [path.join(pathAlias.srcClientDir , 'index.tsx')] };
const nodeEntry = { NodeApp: [path.join(pathAlias.srcServerDir , 'index.tsx')] };

const terserMinify = env => new TerserPlugin({
  cache: true,
  parallel: 4,
  sourceMap: env === 'development' ? 'cheap-eval-source-map' : 'eval', // false, none, eval, cheap-eval-source-map, cheap-module-eval-source-map, eval-source-map , inline-cheap-source-map
  // test: /\.js(\?.*)?$/i,
  test: /^(?!.*(venders).*)\.js(\?.*)?$/i,
  output: {
    comments: false,
  },
  terserOptions: {
    parse: {
      ecma: 8,
    },
    compress: {
      ecma: 5,
      warnings: false,
      comparisons: false,
      inline: 2,
      passes: 3,
    },
    module: false,
    mangle: {
      safari10: true,
      ie8: true,
    },
    output: {
      beautify: true,
      ecma: 5,
      comments: false,
      ascii_only: true,
    },
    toplevel: false,
    keep_fnames: false,
  },
});

const getOutput = target => ({
  path: target === 'node' ? path.join(pathAlias.buildDir, 'server') : path.join(pathAlias.buildDir, 'client'),
  publicPath: target === 'node' ? path.join(pathAlias.buildDir, 'server') : '/client/', // used by webpackdevserver or express
  filename: '[name].js',
  chunkFilename: 'js/[name]-[hash].js',
});

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(pathAlias.srcClientDir, 'index.html'),
  filename: "index.html",
  inject: true
});

const MiniCssExtractPluginConfig = new MiniCssExtractPlugin({
  filename: 'css/[name]_[hash].css',
  chunkFilename: 'css/[name]_[hash].css',
});

const devPlugins = env => (env === 'development' ? [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
] : []);

const varDefinePlugin = new webpack.DefinePlugin({
  APP_ENV: JSON.stringify(APP_ENV),
  SITE_HOST: JSON.stringify(SITE_HOST),
  SITE_PORT: JSON.stringify(SITE_PORT),
  LOG_LEVEL: JSON.stringify(LOG_LEVEL),
  API_BASE_URL: JSON.stringify(API_BASE_URL),
  BASE_URL: JSON.stringify(BASE_URL),
  SERVER: JSON.stringify(SERVER),
});

const nodePlugins = env => [
  // env === 'development' ? new BundleAnalyzerPlugin() : {},
  varDefinePlugin,
  new LoadablePlugin(),
];

const webPlugins = env => [
  new webpack.optimize.OccurrenceOrderPlugin(),
  ...devPlugins(env),
  varDefinePlugin,
  new LoadablePlugin(),
  // env === 'development' ? new BundleAnalyzerPlugin() : {},
  env === 'development' ? new CrudeTimingPlugin() : () => {},
  HTMLWebpackPluginConfig,
  MiniCssExtractPluginConfig,
  new CopyWebpackPlugin({
    patterns: [
    {
      from: pathAlias.staticDir,
      to: path.join(pathAlias.buildDir, 'static'),
    },
  ]}),
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
        test: /[\\/]node_modules[\\/]/,
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
      minimizer: [terserMinify], // uncomment only to TEST default by webpack. however terser seems faster
      usedExports: true,
      minimize: false,
      namedModules: true, // default for mode development and disable for mode production
      nodeEnv: 'development',
    }
    : {
      splitChunks: getSplitChunks(target),
      minimizer: [terserMinify],
      usedExports: true,
      minimize: true,
      namedModules: false,
      nodeEnv: 'production',
    }
);

const webpackConfigs = (mode, target, env) => ({
  entry:  target === 'node' ? nodeEntry : webEntry,
  output: getOutput(target),
  target,
  mode,
  externals: target === 'node' ? [
    nodeExternals({
      whitelist: [
        // /^@loadable\/component$/,
        // /^react$/,
        // /^react-dom$/,
        // /^core-js$/,
        // /^commonjs$/,
        // /^lodash$/,
        // /^lodash.debounce$/,
      ],
    }),
  ] : {
    // react: "React",
    // "react-dom": "ReactDOM"
  },
  module: {
    rules: loaderRules(target, env),
  },
  node: target === 'web' ? {
    fs: 'empty', // dont use fs on browser.. use only by node.
  } : {},
  devtool: env === 'development' ? 'cheap-source-map' : 'eval',  // 'cheap-source-map', 'eval', 'eval-source-map'
  resolve: {
    modules: target === 'web' ? [
      path.resolve(pathAlias.srcClientDir),
      'node_modules',
    ] : [],
    // alias: {
    //   'react-dom': '@hot-loader/react-dom',
    // },
    extensions: [".ts", ".tsx", '.js', '.jsx', '.json']
  },
  plugins: target === 'node' ? nodePlugins(env) : webPlugins(env),
  optimization: getOptimization(target, env),
});

module.exports = {
  webpackConfigs,
};