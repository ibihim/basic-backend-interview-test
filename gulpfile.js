'use strict';

const gulp = require('gulp');
const lint = require('./tasks/lint');
const test = require('./tasks/test');

gulp.task('lint', lint);
gulp.task('test', test.mochaTests);

gulp.task('verify', [ 'lint', 'test' ]);
