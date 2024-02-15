const gulp = require("gulp");
const scss = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();

gulp.task("browser-sync", function (done) {
    browserSync.init({
        server: {
            baseDir: 'app'
        }
    });
    done();
});

gulp.task("compile", function () {
    return gulp.src("app/scss/**/*.scss")
    .pipe(scss())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task("watch", gulp.series("compile", "browser-sync", function () {
    gulp.watch("app/scss/**/*.scss", gulp.series("compile"));
    gulp.watch('app/*.html').on('change', browserSync.reload);
}));