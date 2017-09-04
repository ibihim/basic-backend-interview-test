'use strict';

const ROOT = '../..';
const logger = require(`${ ROOT }/lib/utils/logger`);

const mongoose = require('mongoose');

mongoose.Promise = Promise;

// close connection handling on app termination
const INTERRUPT_CALL   = 'SIGINT';
const onConnClosed     = () => {
    logger.info('[mongo-event] SIGINT: Mongoose disconnected through app termination');
    process.exit(0);
};
const onAppTermination = () => mongoose.connection.close(onConnClosed);

process.on(INTERRUPT_CALL, onAppTermination);

// announce mongo events
const shareEvent = eventName => [
    eventName,
    eventData => {
        const eventMsg = `[mongo-event] ${ eventName } occurred`;

        if (eventName === 'error') {
            logger.error(eventMsg);
        } else {
            logger.info(eventMsg);
        }

        eventData ? logger.info(eventData) : '';
    }
];

mongoose.connection.on(...shareEvent('connected'));
mongoose.connection.on(...shareEvent('disconnected'));
mongoose.connection.on(...shareEvent('error'));

module.exports = mongoose;
