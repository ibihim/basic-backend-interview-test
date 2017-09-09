'use strict';

const _ = require('lodash/fp');
const { expect } = require('chai');

const ROOT = '../../../..';
const db = require(`${ ROOT }/lib/db`);
const worker = require(`${ ROOT }/lib/nasa/worker`);
const {
    MONGO_DB_URL,
    removeNeos
} = require(`${ ROOT }/tests/utils`);


// debug
const Neo = require(`${ ROOT }/models/Neo`);


describe('worker', () => {

    before(done => {
        db.connectTo(MONGO_DB_URL)
            .then(() => done())
            .catch(done);
    });

    after(done => {
        removeNeos()
            .then(() => db.closeConnection())
            .then(() => done())
            .catch(done);
    });

    it('should be possible to store the last 3 days', (done) => {
        const verifyStoredNeosCount = count =>
            Neo.find({}).exec()
               .then(found => expect(found).to.have.length(count));

        worker.storeLastDays(3)
            .then(_.tap(count => expect(count).to.be.at.least(1)))
            .then(verifyStoredNeosCount)
            .then(() => done())
            .catch(done);
    });
});
