'use strict';

const request    = require('supertest');
const HttpStatus = require('http-status-codes');
const _          = require('lodash/fp');

const ROOT = '../../../../..';
const app = require(`${ ROOT }/app`);
const db = require(`${ ROOT }/lib/db`);
const worker = require(`${ ROOT }/lib/nasa/worker`);
const {
    MONGO_DB_URL,
    findNeo,
    removeNeos,
    sameNeoListAs
} = require(`${ ROOT }/tests/utils`);

describe('hazardous controller', () => {

    let storedNeos;

    before(done => {
        db.connectTo(MONGO_DB_URL)
            .then(() => worker.storeLastDays(5))
            .then(() => findNeo({ isHazardous: true }))
            .then(foundNeos => (storedNeos = foundNeos))
            .then(() => done())
            .catch(done);
    });

    after(done => {
        removeNeos()
            .then(() => db.closeConnection())
            .then(() => done())
            .catch(done);
    });

    it('should return a list of hazardous asteroids', (done) => {
        request(app)
            .get('/neo/hazardous')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(HttpStatus.OK)
            .then(_.get('body'))
            .then(sameNeoListAs(storedNeos))
            .then(() => done())
            .catch(done);
    });
});
