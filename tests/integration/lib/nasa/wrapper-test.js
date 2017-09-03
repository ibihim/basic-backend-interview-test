'use strict';

const moment = require('moment');
const expect = require('chai').expect;
const _ = require('lodash/fp');

const ROOT = '../../../..';
const { neo, feed } = require(`${ ROOT }/lib/nasa/wrapper`);

const API_KEY = process.env.API_KEY;
const DATE_FORMAT = 'YYYY-MM-DD';

const getNearEarthObjects = resObj => resObj.near_earth_objects;
const getNeoReferenceId = obj => obj.neo_reference_id;

const disjointLists = ([ listA, listB ]) => expect(listA).to.not.have.members(listB);
const sameListAs = listA => listB => expect(listB.sort()).to.eql(listA.sort());
const checkListLength = expectedLength => list => expect(list).to.have.lengthOf(expectedLength);

describe('wrapper', () => {

    before(() => expect(API_KEY, 'API_KEY is not set in ENV').to.not.be.empty);

    describe('for neo', () => {
        it('should return list of asteroids', (done) => {
            const DEFAULT_LENGTH = 10;
            const checkMinimalLength = checkListLength(DEFAULT_LENGTH);

            neo.get()
               .then(getNearEarthObjects)
               .then(checkMinimalLength)
               .then(() => done())
               .catch(done);
        });

        it('should return different pages of asteroids', (done) => {
            const firstPage = 0;
            const secondPage = 1;
            const pageSize = 10;


            const getNeoIdsFor = (page, size) => neo.get(page, size)
                                                    .then(getNearEarthObjects)
                                                    .then(_.tap(checkListLength(pageSize)))
                                                    .then(_.map(getNeoReferenceId));

            Promise.all([
                       getNeoIdsFor(firstPage, pageSize),
                       getNeoIdsFor(secondPage, pageSize)
                   ])
                   .then(disjointLists)
                   .then(() => done())
                   .catch(done);

        });
    });

    describe('for feed', () => {
        it('should return data of the last 3 days', (done) => {
            const subtractDays = dayCount =>
                moment().utc()
                        .subtract(dayCount, 'days')
                        .format(DATE_FORMAT);
            const TODAY = subtractDays(0);
            const YESTERDAY = subtractDays(1);
            const DAY_BEFORE_YESTERDAY = subtractDays(2);

            feed.get(DAY_BEFORE_YESTERDAY)
                .then(getNearEarthObjects)
                .then(_.keys)
                .then(sameListAs([ TODAY, YESTERDAY, DAY_BEFORE_YESTERDAY ]))
                .then(() => done())
                .catch(done);

        });

        it.skip('should return data for the last month', (done) => {
            const lastMonth = moment().utc().subtract(1, 'month').month();

            feed.get(lastMonth)
                .then(getNearEarthObjects)
                .then(_.keys)
                .then(sameListAs([ TODAY, YESTERDAY, DAY_BEFORE_YESTERDAY ]))
                .then(() => done())
                .catch(done);
        });
    });

});
