'use strict';

const moment = require('moment');

const ROOT = '../../..';
const worker = require(`${ ROOT }/lib/nasa/worker`);
const { createFormattedDaysList } = require(`${ ROOT }/tests/utils`);


describe.skip('worker', () => {
    it('should be possible to store the last 3 days', (done) => {
        const twoDaysAgo = moment().utc()
                                   .subtract(2, 'days');
        const last3DaysList = createFormattedDaysList(twoDaysAgo);
        worker.grabLastDays(3)
           .then();
    });
});
