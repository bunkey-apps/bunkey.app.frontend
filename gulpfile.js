const gulp = require('gulp');
const connect = require('gulp-connect');

gulp.task('serveProject', function() {
    connect.server({
        root: 'dist/',
        host: '0.0.0.0',
        port:  process.env.PORT || 5000,
        livereload: false,
        fallback: 'dist/index.html'
    });
})
