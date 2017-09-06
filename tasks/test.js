'use strict';

const gulp  = require('gulp');
const mocha = require('gulp-mocha');

const ROOT = '..';
require(`${ ROOT }/lib/utils/logger`).level = 'error';

const reporter  = 'nyan';
const timeout   = 10000;
const srcDir    = 'tests/**/*-test.js';
const readFalse = { read: false };
const mochaConf = { reporter, timeout };

module.exports = {
    mochaTests: () =>
        gulp.src(srcDir, readFalse)
            .pipe(mocha(mochaConf))
};
