'use strict';

const _          = require('lodash/fp');
const request    = require('supertest');
const HttpStatus = require('http-status-codes');

const ROOT = '../../../../..';
const app = require(`${ ROOT }/app`);
const db = require(`${ ROOT }/lib/db`);
const worker = require(`${ ROOT }/lib/nasa/worker`);
const {
          MONGO_DB_URL,
          findNeo,
          removeNeos
      } = require(`${ ROOT }/tests/utils`);

describe('best year controller', () => {

    let storedNeos;

    before(done => {
        db.connectTo(MONGO_DB_URL)
          .then(() => worker.storeLastDays(5))
          .then(() => findNeo())
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

    [
        {
            testName: 'should return the year with most hazardous asteroids',
            isHazardous: true
        },
        {
            testName: 'should return the year with most non hazardous asteroids',
            isHazardous: false
        }
    ].forEach(({ testName, isHazardous }) => {
        it(testName, (done) => {
            const query = isHazardous ? '?hazardous=true' : '';

            request(app)
                .get(`/neo/best-year${ query }`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(HttpStatus.OK)
                .then(_.get('body'))
                .then(console.log)
                .then(() => done())
                .catch(done);
        });
    });
});
