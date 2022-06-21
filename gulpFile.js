const { dest, parallel, watch, src, } = require("gulp");
const browserSync = require("browser-sync").create();
const webpack = require("webpack-stream");
const concat = require("gulp-concat");
const plumber = require("gulp-plumber");

const paths = {
  js: {
    from: "./src/js/*.js",
    to: "./dist/js/",
  },
  buildLibrary: {
    from: "./src/js/Slety.js",
    to: "./dist/js/",
  },
  html: {
    from: "./src/*.html",
    to: "./dist/",
  },
};

const js = () => {
  const res = src(paths.js.from)
    .pipe(plumber())
    .pipe(webpack({ mode: "development", }))
    .pipe(concat("main.js"))
    .pipe(dest(paths.js.to))
    .pipe(browserSync.stream());

  return res;
};

const buildLibrary = () => {
  const res = src(paths.buildLibrary.from)
    .pipe(plumber())
    .pipe(webpack({
      mode: "production",
      output: {
        filename: "Slety.js",
        library: "Slety",
        libraryTarget: "umd",
      },
    }))
    .pipe(concat("Slety.js"))
    .pipe(dest(paths.buildLibrary.to))
    .pipe(browserSync.stream());

  return res;
};

const html = () => {
  const res = src(paths.html.from)
    .pipe(dest(paths.html.to))
    .pipe(browserSync.stream());

  return res;
};

const watching = () => {
  watch(paths.js.from, parallel(js));
  watch(paths.buildLibrary.from, parallel(buildLibrary));
  watch(paths.html.from, parallel(html));
};

browserSync.init({ server: { baseDir: "./dist/", }, });

const buildFunc = () => parallel(js, buildLibrary, html);
const defaultFunc = () => parallel(buildFunc(), watching);

exports.build = buildFunc();
exports.default = defaultFunc();