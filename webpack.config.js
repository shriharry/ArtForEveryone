const path = require("path");
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: "./src/client/index.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
  },
  mode: "development",
  resolve: { extensions: [".js", ".jsx", ".json", ".ts"] },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    static: ['./public'],
    open: true,
    hot: true,
    liveReload: true,
  },
  plugins: [
    new Dotenv()
  ]
};
