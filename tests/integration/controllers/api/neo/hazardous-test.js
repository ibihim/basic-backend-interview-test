'use strict';

const request    = require('supertest');
const HttpStatus = require('http-status-codes');
const _          = require('lodash/fp');

const ROOT = '../../../../..';
const app = require(`${ ROOT }/app`);
const db = require(`${ ROOT }/lib/db`);
const {
    MONGO_DB_URL,
    fillDbWithNeos,
    removeNeos,
    sameNeoListAs
} = require(`${ ROOT }/tests/utils`);

const expected = [
    {
        _id: "59b3d541d46a77235155f2e8",
        isHazardous: true,
        name: "(1979 XB)",
        reference: "3012393",
        speed: "82895.208318495"
    },
    {
        _id: "59b3d541d46a77235155f2fa",
        isHazardous: true,
        name: "(1994 NE)",
        reference: "3005942",
        speed: "58926.4591259354",
    },
    {
        _id: "59b3d541d46a77235155f2fb",
        isHazardous: true,
        name: "000000000",
        reference: "0000000",
        speed: "1.0000000"
    },
    {
        _id: "59b3d541d46a77235155f314",
        isHazardous: true,
        name: "(1997 GD32)",
        reference: "3010077",
        speed: "88119.6612737317"
    }
];

describe('hazardous controller', () => {

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

    it('should return a list of hazardous asteroids', (done) => {
        request(app)
            .get('/neo/hazardous')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(HttpStatus.OK)
            .then(_.get('body'))
            .then(sameNeoListAs(expected))
            .then(() => done())
            .catch(done);
    });
});
