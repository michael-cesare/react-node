const postCSSConfig = {
  plugins: [
    require('postcss-import'),
    require('precss'),
    require('postcss-mixins'),
    require('postcss-nested'),
   // require('postcss-scss'),  <-- this is not a plugin
    require('postcss-preset-env'), // <-- cssnext
    require('postcss-simple-vars'),
    require('postcss-custom-properties'),
    require('postcss-calc'),
    require('postcss-css-variables'),
    require('postcss-greyscale'),
    require('autoprefixer')
  ]
}

module.exports = postCSSConfig;