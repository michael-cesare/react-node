
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const rootDir = path.join(__dirname, './');
const pathAlias = {
  src: path.join(rootDir, 'src'),
  images: path.join(rootDir, 'src', 'static', 'images'),
  nodeModules: path.join(rootDir, 'node_modules'),
};

const cssLoaderClient = env => [
  {
    test: /\.css$/,
    include: /node_modules/,
    exclude: pathAlias.src,
    loaders: ['style-loader', 'css-loader'],
  },
  {
    test: /\.(sa|sc|c)ss$/,
    exclude: /node_modules/,
    include: pathAlias.src,
    use: [
      'style-loader', // creates style nodes from JS strings
      {
        loader: MiniCssExtractPlugin.loader, // minify and extract the required styles imports
        options: {
          sourceMap: env === 'development' ? 'eval-source-map' : 'eval', // true, none, eval, cheap-eval-source-map, cheap-module-eval-source-map, eval-source-map
          // by default it uses publicPath in webpackOptions.output
          //   publicPath: '/static/css/',
          minimize: { discardComments: { removeAll: true } },
          modules: true,
        },
      },
      {
        loader: 'css-modules-typescript-loader',
      },
      {
        loader: 'css-loader', // translates CSS into CommonJS
        options: {
          importLoaders: 3,
          minimize: true,
          import: true,
          modules: true,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          // parser: 'postcss-js',
          // sourceMap: 'inline',
        },
      },
      { loader: 'resolve-url-loader' },
      { loader: 'sass-loader' },
    ],
  }
];

const cssLoaderServer = env => [
  {
    test: /\.(sa|sc|c)ss$/,
    exclude: /node_modules/,
    use: [
      // 'style-loader',
      // {
      //   loader: MiniCssExtractPlugin.loader, // minify and extract the required styles imports
      //   options: {
      //     sourceMap: env === 'development' ? 'eval-source-map' : 'eval', // true, none, eval, cheap-eval-source-map, cheap-module-eval-source-map, eval-source-map
      //     minimize: { discardComments: { removeAll: true } },
      //   // by default it uses publicPath in webpackOptions.output
      //   //   publicPath: '/static/css/',
      //   },
      // },
      {
        loader: 'css-modules-typescript-loader',
      },
      {
        loader: 'css-loader', // translates CSS into CommonJS
        options: {
          importLoaders: 3,
          onlyLocals: true,
          import: true,
          modules: true,
        },
      },
      {
        loader: 'postcss-loader',
      },
      { loader: 'resolve-url-loader' },
      { loader: 'sass-loader' },
    ],
  },
];

const mediaLoader = [
  {
    test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
    use: {
      loader: 'url-loader',
      query: {
        limit: 40000,
        mimetype: 'application/octet-stream',
      },
    },
  },
  {
    test: /\.(wav|mp3|png|jpe?g|gif)$/,
    loader: 'file-loader',
  },
  {
    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)$/,
    use: {
      loader: 'file-loader',
      query: {
        // Inline images smaller than 10kb as data URIs
        limit: 40000,
        name: '[name].[ext]',
        // outputPath: 'fonts/'
      },
    },
    include: [
      pathAlias.images,
    ],
  },
  {
    test: /\.(woff(2)?|eot|ttf)$/,
    loader: 'file-loader',
    options: {
      onlyLocals: true,
    },
  },
];

const cssLoader = (env, renderType) => (renderType === 'ssr' ? cssLoaderServer(env) : cssLoaderClient(env));

const nodeRules = (env, target) => [
  {
    test: /\.(js|jsx|ts|tsx)?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          // caller: { target },
        },
      },
      {
        loader: "ts-loader"
      },
    ],
  },
  ...cssLoader(env, 'ssr'),
  {
    test: /\.txt$/,
    use: 'raw-loader',
  },
  {
    type: 'javascript/auto',
    test: /\.(json)$/,
    exclude: /(node_modules|bower_components)/,
    use: [
      {
        loader: 'json-loader',
        query: { name: '[name].[ext]' },
      },
    ],
  },
  {
    test: /\.(html)$/,
    exclude: /(node_modules|bower_components)/,
    use: [
      {
        loader: 'html-loader',
        options: { },
      },
    ],
  },
  {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    use: 'file-loader',
  },
  ...mediaLoader,
];

const webRules = (env, target) => [
  {
    test: /\.(js|jsx|ts|tsx)?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'react-hot-loader/webpack',
      },
      {
        loader: 'babel-loader',
        options: {
          // caller: { target },
        },
      },
      {
        loader: "ts-loader"
      },
    ],
  },
  ...cssLoader(env, 'csr'),
  {
    test: /\.txt$/,
    use: 'raw-loader',
  },
  {
    type: 'javascript/auto',
    test: /\.(json)$/,
    exclude: /(node_modules|bower_components)/,
    use: [
      {
        loader: 'json-loader',
        query: { name: '[name].[ext]' },
      },
    ],
  },
  {
    test: /\.(html)$/,
    exclude: /(node_modules|bower_components)/,
    use: [
      {
        loader: 'html-loader',
        options: { },
      },
    ],
  },
  ...mediaLoader,
];

const loaderRules = (target, env) => {
  return (target === 'node' ? nodeRules(env, target) : webRules(env, target))
};

module.exports = {
  loaderRules,
};
