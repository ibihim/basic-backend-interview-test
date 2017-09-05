'use strict';

const ROOT = '../../..';
const worker = require(`${ ROOT }/lib/nasa/worker`);

describe('worker', () => {
    it('should be possible to store the last 3 days', (done) => {
        worker.grabDays(3)
            .then();
    });
});
