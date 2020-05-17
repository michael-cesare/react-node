
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const rootDir = path.join(__dirname, './');
const pathAlias = {
  src: path.join(rootDir, 'src'),
  images: path.join(rootDir, 'src', 'static', 'images'),
  nodeModules: path.join(rootDir, 'node_modules'),
};

const cssLoader = {
  nodeModules: { // load styles from node module, such as react-slick
    test: /\.css$/,
    include: /node_modules/,
    exclude: pathAlias.src,
    loaders: ['style-loader', 'css-loader'],
  },
  ssr: {
    test: /\.(css|scss)$/,
    loader: 'css-loader/locals',
  },
  csr: { // load src styles
    test: /\.(css|scss)$/,
    exclude: /(node_modules)/,
    include: pathAlias.src,
    use: [
      'style-loader', // creates style nodes from JS strings
      MiniCssExtractPlugin.loader, // minify and extract the required styles imports
      {
        loader: 'css-loader', // translates CSS into CommonJS
        options: {
          minimize: true,
          sourceMap: true,
        },
      },
      {
        loader: 'postcss-loader',
      },
      {
        loader: 'resolve-url-loader',
      },
      {
        loader: 'sass-loader',
      },
    ],
  },
};

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

const nodeRules = [
  {
    test: /\.ts(x?)$/,
    exclude: /node_modules/,
    use: [
      {
        loader: "ts-loader"
      }
    ]
  },
  {
    test: /\.(js|jsx)$/,
    // we do not want anything from node_modules to be compiled
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
    },
  },
  { ...cssLoader.ssr },
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

const webRules = [
  {
    test: /\.(js|jsx|file)$/,
    // we do not want anything from node_modules to be compiled
    exclude: /(node_modules)/,
    use: {
      loader: 'babel-loader',
    },
  },
  { ...cssLoader.nodeModules },
  { ...cssLoader.csr },
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

const loaderRules = target => ([
  ...target === 'node' ? nodeRules : webRules,
]);

module.exports = {
  loaderRules,
};
