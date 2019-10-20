module.exports = [
  {
    entry: {
      "digitalmatrix.min": "./src/js/digitalmatrix.js"
    },
    output: {
      path: __dirname + "/lib",
      filename: "[name].js",
      library: "digitalmatrix",
      libraryTarget: "umd",
      umdNamedDefine: true
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"]
            }
          }
        }
      ]
    }
  }
];
