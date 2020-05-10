const HtmlWebPackPlugin = require("html-webpack-plugin");

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
    template: "./src/index.html",
    filename: "./index.html"
  })
]

const moduleConfigs = {
  rules: loaderRules,
}

module.exports = {
  module: moduleConfigs,
  plugins: [].concat(getPlugins),
  node: {
    fs: 'empty', // dont use fs on browser.. use only by node.
  },
};