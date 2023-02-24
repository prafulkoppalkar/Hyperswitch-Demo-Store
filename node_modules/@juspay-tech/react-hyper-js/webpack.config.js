const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { library } = require("webpack");

module.exports = {
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index.js",
    library: "@juspay/react-juspay-js",
    libraryTarget: "umd",
  },
  entry: "./src/Index.bs.js",
  plugins: [],
  devServer: {
    port: 3030, // you can change the port
  },
  externals: ["react", "react-dom"],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
