const moduleResolver = require("./config/moduleResolver");

/**
 * NOTE @monitz87: __dirname is necessary here because of
 * a bug in babel (see https://github.com/babel/babel/issues/8909)
 */
module.exports = {
  babelrcRoots: [__dirname, `${__dirname}/packages/*`],
  plugins: [
    "@babel/proposal-export-default-from",
    "@babel/proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread",
    "babel-plugin-styled-components",
    moduleResolver("src")
  ]
};
