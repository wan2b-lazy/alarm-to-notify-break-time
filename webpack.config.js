const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    assetModuleFilename: "[name][ext][query]",
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "AlarmToNotifyBreakTime",
      template: "src/assets/index.html",
    }),
  ],

  target: "electron-main",

  resolve: {
    extensions: [".ts", "..."],
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: { presets: ["@babel/preset-env"] },
          },
        ],
      },
      {
        test: /\.mp3$/,
        type: "asset/resource",
      },
    ],
  },

  devServer: {
    static: "./dist/",
    open: true,
  },
};
