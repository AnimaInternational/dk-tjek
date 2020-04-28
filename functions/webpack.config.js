const path = require("path");
const nodeExternals = require("webpack-node-externals");

const { NODE_ENV = "production" } = process.env;

module.exports = {
  entry: {
    subscriptions: "./src/functions/subscriptions/index.ts",
  },
  devtool: "inline-source-map",
  mode: NODE_ENV,
  target: "node",
  watch: NODE_ENV === "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    libraryTarget: "umd",
    globalObject: "this",
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
    modules: ["node_modules"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  externals: [nodeExternals()],
};
