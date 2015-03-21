var gulp = require("gulp"),
    minifyCss = require("gulp-minify-css"),
    less = require("gulp-less"),
    watch = require("gulp-watch"),
    rename = require("gulp-rename" ),
    concat = require("gulp-concat" ),
    uglify = require("gulp-uglify" ),
    livereload = require("gulp-livereload" ),
    hbs = require('gulp-handlebars' );

var wrap = require('gulp-wrap');
var declare = require('gulp-declare');

gulp.task('templates', function(){
    gulp.src('./src/js/templates/*.hbs')
        .pipe(hbs())
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'Pager',
            noRedeclare: true // Avoid duplicate declarations
        }))
        .pipe(concat('Pager.templates.js'))
        .pipe(gulp.dest('dist/js/'));
});

gulp.task("css", function () {
    gulp.src("./css/pager.css")
        .pipe(minifyCss({keepBreaks:false}))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest("./dist/css"))
        .pipe(livereload());
});

gulp.task("less", function () {
    gulp.src(["./src/less/pager.less"])
        .pipe(less())
        .pipe(gulp.dest("./src/css"));
});

gulp.task("build-js", function () {
    gulp.src("./js/src/*.js")
        .pipe(concat("Pager.js"))
        .pipe(gulp.dest("./dist/js"))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest("./dist/js"));
});

gulp.task("reload", function (  ) {
    gulp.src("./examples/**/*.html").pipe(livereload());
    gulp.src("./spec-runner.html").pipe(livereload());
});

gulp.task("watch", function () {
    livereload.listen();

    gulp.watch("./css/basis.css", ["css"]);
    gulp.watch("./src/less/*.less", ["less"]);
    gulp.watch("./src/js/*.js", [ "build-js", "reload"]);
    gulp.watch("./examples/**/*.html", ["reload"]);
    gulp.watch("./tests/**/*.spec.js", ["reload"]);
    gulp.watch("./spec-runner.html", ["reload"]);
    gulp.watch("./src/js/templates/*.hbs", ["templates"]);
});

gulp.task("default", function() {
    gulp.start(["less", "css", "build-js", "templates", "watch"]);
});