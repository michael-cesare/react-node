
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const rootDir = path.join(__dirname, '.');
const pathAlias = {
  indexFile: 'index.html',
  bundleFile: 'appBundle.js',
  srcClient: path.join(rootDir, 'src',  'react-app'),
  publicPath: path.join(rootDir, 'src',  'react-app'),
  distDir: path.join(rootDir, 'build'),
};

const webEntry = {
  ReactApp: [path.join(pathAlias.srcClient , 'index.js')]
};

const getOutput = () => ({
  path: path.join(pathAlias.distDir, 'client'),
  filename: pathAlias.indexFile,
  publicPath: pathAlias.publicPath,
  chunkFilename: '[name]-[hash].js',
});

const loaderRules = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader"
    }
  },
  {
    test: /\.html$/,
    use: [
      {
        loader: "html-loader"
      }
    ]
  }
];

const getPlugins = [
  new HtmlWebPackPlugin({
    template: path.join(pathAlias.srcClient , 'index.html'),
    filename: "index.html",
    inject: true
  })
]

const moduleConfigs = {
  rules: loaderRules,
}

module.exports = {
  entry: webEntry,
  output: getOutput(),
  module: moduleConfigs,
  plugins: [].concat(getPlugins),
  node: {
    fs: 'empty', // dont use fs on browser.. use only by node.
  },
  devServer: {
    host: "localhost",
    port: 3031,
    hot: true,
    open: true,
    publicPath: pathAlias.publicPath,
    contentBase: path.join(pathAlias.distDir, 'client'),
    inline: true,
    disableHostCheck: true,
    historyApiFallback: true,
  }
};