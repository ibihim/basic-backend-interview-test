'use strict';

const moment = require('moment');
const { getFeed } = require('./wrapper');

const getNeosFromLast3Days = () => {
    const twoDaysAgo = moment().utc()
                               .subtract(2, 'days');

    getFeed(twoDaysAgo);
};
