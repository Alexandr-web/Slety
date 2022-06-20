const path = require("path");
const build = {
  entry: "./src/TestFramework.js",
  output: {
    filename: "TestFramework.js",
    library: {
      name: "TestFramework",
      type: "commonjs",
      export: "default",
    },
    path: path.resolve(__dirname, "./dist/"),
  },
  mode: "production",
};
const dev = {
  entry: "./src/main.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "./dist/dev/")
  },
  mode: "development",
}

module.exports = [build, dev];