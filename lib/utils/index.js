'use strict';

const HttpStatus = require('http-status-codes');
const _          = require('lodash/fp');

const ROOT   = '../..';
const logger = require(`${ ROOT }/lib/utils/logger`);

const getNearEarthObjects = _.get('near_earth_objects');

const controllerOkHandler = res => obj => res.status(HttpStatus.OK)
                                             .type('application/json')
                                             .json(obj);

const controllerErrHandler = res => err => {
    logger.error(err);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR)
       .send('That didn\'t work! :(');
};

const isHazardousValidation = req => {
    const isHazardous = _.get('query.hazardous', req) === 'true';

    if (isHazardous) {
        return { isHazardous };
    } else {
        return {};
    }
};

const simpleQueryValidation = req => {
    const isHazardousParam = isHazardousValidation(req);

    // More validation here.

    return _.extend({}, isHazardousParam);
};

module.exports = {
    getNearEarthObjects,
    simpleQueryValidation,
    controllerOkHandler,
    controllerErrHandler
};
