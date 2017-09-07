'use strict';

const _          = require('lodash/fp');
const expect     = require('chai').expect;
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

const nullSpeedNeo = { speed: '0' };
const compareNeoSpeed = (fastestNeo, currentNeo) =>
    fastestNeo.speed < currentNeo.speed
        ? currentNeo
        : fastestNeo;

describe('fastest controller', () => {

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
            testName: 'should return the fastest hazardous asteroid',
            isHazardous: true
        },
        {
            testName: 'should return the fastest non hazardous asteroid',
            isHazardous: false
        }
    ].forEach(({ testName, isHazardous }) => {
        it(testName, (done) => {
            const query           = isHazardous ? '?hazardous=true' : '';
            const filterHazardous = _.filter(neo => neo.isHazardous === isHazardous);
            const reduceToFastest = _.reduce(compareNeoSpeed, nullSpeedNeo);
            const pickProperties  = _.pick([ 'reference', 'name', 'speed', 'isHazardous' ]);

            const pickFastestAsteroid = _.pipe(filterHazardous, reduceToFastest, pickProperties);
            const fastestAsteroid = pickFastestAsteroid(storedNeos);

            request(app)
                .get(`/neo/fastest${ query }`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(HttpStatus.OK)
                .then(_.get('body'))
                .then(neo => expect(pickProperties(neo)).to.deep.equal(fastestAsteroid))
                .then(() => done())
                .catch(done);
        });
    });
});
