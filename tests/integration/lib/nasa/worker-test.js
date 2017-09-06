'use strict';

const expect = require('chai').expect;

const ROOT = '../../../..';
const db = require(`${ ROOT }/lib/db`);
const worker = require(`${ ROOT }/lib/nasa/worker`);
const { 
    MONGO_DB_URL,
    removeNeos
} = require(`${ ROOT }/tests/utils`);

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
        worker.storeLastDays(3)
            .then(count => {
                expect(count).to.be.at.least(1);
            })
            .then(() => done())
            .catch(done);
    });
});
