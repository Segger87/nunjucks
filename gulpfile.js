const gulp = require("gulp");
const nunjucks = require("gulp-nunjucks");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
const paths = {
  dist: "./test/dist"
};

nunjucks.configure;

gulp.task("sass", () =>
  gulp
    .src("test/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError)) // Using gulp-sass
    .pipe(gulp.dest("test/dist/css"))
    .pipe(browserSync.stream())
);

gulp.task("default", () =>
  gulp
    .src("test/**/*.html")
    .pipe(
      nunjucks.compile({
        title: "Playing with Nunjucks",
        dinner: "cheese",
        animals: "TURTLES",
        items: ["item 1", "item 2", "item 3"]
      })
    )
    .pipe(gulp.dest(paths.dist))
);

gulp.task(
  "serve",
  () =>
    browserSync.init({
      server: "./test/dist"
    }),
  gulp.watch("test/scss/**/*.scss", gulp.series("sass")),
  // gulp.watch("test/**/*.html", gulp.series("default")),
  gulp.watch("test/*.html").on("change", browserSync.reload)
);

gulp.task("run", gulp.parallel("sass", "serve"));
