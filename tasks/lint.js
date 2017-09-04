'use strict';

const gulp   = require('gulp');
const eslint = require('gulp-eslint');

const srcDir = [ '**/*.js', '!node_modules/**' ];

module.exports = () =>
    gulp.src(srcDir)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
