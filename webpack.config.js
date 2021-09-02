const fs = require("fs");
const glob = require("glob");
const path = require("path");

const sourceDirPath = path.resolve(__dirname, "src/main/resources/react/");

function getEntries() {
  return fs
    .readdirSync(sourceDirPath)
    .filter((file) => file.match(/.*\.jsx$/))
    .map((fileName) => {
      return {
        name: fileName.split(".")[0],
        path: sourceDirPath + "/" + fileName,
      };
    })
    .reduce((memo, file) => {
      memo[file.name] = file.path;
      return memo;
    }, {});
}

module.exports = {
  entry: getEntries,
  devtool: "source-map",
  cache: true,
  output: {
    path: __dirname,
    filename: "./src/main/resources/static/resource/react/[name].bundle.js",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "src/main/resources"),
    },
    port: 7999,
  },
  mode: "none",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
};
