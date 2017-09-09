'use strict';

const request    = require('supertest');
const HttpStatus = require('http-status-codes');
const expect     = require('chai').expect;

const ROOT = '../../../../..';
const app = require(`${ ROOT }/app`);
const db = require(`${ ROOT }/lib/db`);
const {
    MONGO_DB_URL,
    fillDbWithNeos,
    removeNeos
} = require(`${ ROOT }/tests/utils`);

describe('fastest controller', () => {

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
            testName: 'should return the fastest hazardous asteroid',
            hazardousQuery: true,
            expectedResult: {
                date: "1994-04-13T00:00:00.000Z",
                isHazardous: true,
                name: "(1997 GD32)",
                reference: "3010077",
                speed: "88119.6612737317"
            }
        }, {
            testName: 'should return the fastest non hazardous asteroid',
            hazardousQuery: false,
            expectedResult: {
                date: "1996-01-29T00:00:00Z",
                reference: "3008375",
                name: "(1996 BT)",
                speed: "98860.8779642102",
                isHazardous: false
            }
        }
    ].forEach(({ testName, hazardousQuery, expectedResult }) => {
        it(testName, (done) => {
            const query = hazardousQuery ? '?hazardous=true' : '';

            request(app)
                .get(`/neo/fastest${ query }`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(HttpStatus.OK)
                .then(response => response.body)
                .then(({ name, isHazardous, reference, speed }) => {
                    expect(name).to.equal(expectedResult.name);
                    expect(isHazardous).to.equal(expectedResult.isHazardous);
                    expect(reference).to.equal(expectedResult.reference);
                    expect(speed).to.equal(expectedResult.speed);
                })
                .then(() => done())
                .catch(done);
        });
    });
});
