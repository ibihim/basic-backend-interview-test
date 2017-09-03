'use strict';

const winston = require('winston');

require('winston-daily-rotate-file');

const Logger = winston.Logger;
const { Console, DailyRotateFile } = winston.transports;


const logger = new Logger({
    transports: [
        new DailyRotateFile({
            level: 'info',
            filename: './logs/log',
            handleExceptions: true,
            json: true,
            colorize: false,
            datePattern: 'yyyy-MM-dd.',
            prepend: true
        }),
        new Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ]
});

module.exports = logger;
module.exports.stream = {
    write: logger.info
};
