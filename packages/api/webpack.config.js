const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  target: "node",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [new CleanWebpackPlugin()]
};
