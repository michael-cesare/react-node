function isWebTarget(caller) {
  return Boolean(caller && caller.target === 'web')
}

function isWebpack(caller) {
  return Boolean(caller && caller.name === 'babel-loader')
}

module.exports = api => {
  const web = api.caller(isWebTarget)
  const webpack = api.caller(isWebpack)

  return {
    "presets": [
      [
        "@babel/env", {
          "debug": true,
          "useBuiltIns": web ? 'entry' : undefined,
          "corejs": web ? 'core-js@3' : false,
          "modules": webpack ? false : 'commonjs',
          "shippedProposals": web ? true: undefined,
          "loose": true,
          "targets": !web ? { node: 'current' } : {
            "esmodules": true,
            "browsers": "> 1%",
            "chrome": "58",
            "ie": "11",
          },
        },
      ],
      "@babel/react",
      "@babel/typescript",
    ],
    "plugins": [
      ["@babel/plugin-proposal-decorators", { "legacy": true }],
      ["@babel/plugin-proposal-class-properties", { "loose": true }],
      "@babel/plugin-proposal-object-rest-spread",
      "@babel/plugin-syntax-dynamic-import",
      "@babel/plugin-transform-runtime",
      "@babel/plugin-transform-modules-commonjs",
      "react-css-modules",
      "@loadable/babel-plugin",
    ],
    "env": {
      "development": {
        // "plugins": ["react-hot-loader/babel"],
      },
    },
    // "ignore": [
    //   "node_modules",
    //   "build"
    // ]
  }
}
