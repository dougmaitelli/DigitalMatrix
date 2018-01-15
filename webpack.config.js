const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = [
  {
    entry: {
      digitalmatrix: "./src/js/digitalmatrix.js",
      "digitalmatrix.min": "./src/js/digitalmatrix.js"
    },
    devtool: "source-map",
    output: {
      path: __dirname + "/lib",
      filename: "[name].js",
      library: "digitalmatrix",
      libraryTarget: "umd",
      umdNamedDefine: true
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["env"]
            }
          }
        }
      ]
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        include: /\.min\.js$/,
        minimize: true
      })
    ]
  },
  {
    entry: {
      "app.bundle": "./src/js/app.js",
      "app.bundle.min": "./src/js/app.js"
    },
    devtool: "source-map",
    output: {
      path: __dirname + "/build",
      filename: "[name].js"
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [{ loader: "style-loader" }, { loader: "css-loader" }]
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/,
          use: {
            loader: "url-loader"
          }
        },
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["env"]
            }
          }
        }
      ]
    },
    plugins: [
      /*new webpack.optimize.UglifyJsPlugin({
        include: /\.min\.js$/,
        minimize: true
      }),*/
      new HtmlWebpackPlugin({
        chunks: ["app.bundle.min"],
        template: "./src/index.html"
      })
    ],
    devServer: {
      inline: true
    }
  }
];
