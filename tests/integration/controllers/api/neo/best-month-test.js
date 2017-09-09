'use strict';

const request    = require('supertest');
const HttpStatus = require('http-status-codes');

const ROOT = '../../../../..';
const app = require(`${ ROOT }/app`);
const db = require(`${ ROOT }/lib/db`);
const {
          MONGO_DB_URL,
          fillDbWithNeos,
          removeNeos
      } = require(`${ ROOT }/tests/utils`);

describe('best month controller', () => {

    before(done => {
        db.connectTo(MONGO_DB_URL)
          .then(() => fillDbWithNeos())
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
            testName: 'should return the month with most hazardous asteroids',
            isHazardous: true,
            expectedResult: { month: 8, year: 1915, count: 2 }
        },
        {
            testName: 'should return the month with most non hazardous asteroids',
            isHazardous: false,
            expectedResult: { month: 10, year: 1991, count: 3 }
        }
    ].forEach(({ testName, isHazardous, expectedResult }) => {
        it(testName, (done) => {
            const query = isHazardous ? '?hazardous=true' : '';

            request(app)
                .get(`/neo/best-month${ query }`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(
                    HttpStatus.OK,
                    expectedResult,
                    done
                );
        });
    });
});
