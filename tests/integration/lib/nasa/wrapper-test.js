'use strict';

const moment = require('moment');
const expect = require('chai').expect;
const _ = require('lodash/fp');

const ROOT = '../../../..';
const { getNeo, getFeed } = require(`${ ROOT }/lib/nasa/wrapper`);
const {
    getNearEarthObjects,
    getNeoReferenceId,
    disjointLists,
    sameListAs,
    checkListLength,
    createFormattedDaysList
} = require(`${ ROOT }/tests/utils`);

const API_KEY = process.env.API_KEY;
const DATE_FORMAT = 'YYYY-MM-DD';

describe('wrapper', () => {

    before(() => expect(API_KEY, 'API_KEY is not set in ENV').to.not.be.empty);

    describe('for neo', () => {
        it('should return list of asteroids', (done) => {
            const DEFAULT_LENGTH = 10;
            const checkMinimalLength = checkListLength(DEFAULT_LENGTH);

            getNeo()
               .then(getNearEarthObjects)
               .then(checkMinimalLength)
               .then(() => done())
               .catch(done);
        });

        it('should return different pages of asteroids', (done) => {
            const firstPage = 0;
            const secondPage = 1;
            const pageSize = 10;


            const getNeoIdsFor = (page, size) => getNeo(page, size)
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
            const DAY_BEFORE_YESTERDAY = moment().utc()
                                                 .subtract(2, 'days');
            const expectedDaysList = createFormattedDaysList(DAY_BEFORE_YESTERDAY);

            getFeed(DAY_BEFORE_YESTERDAY.format(DATE_FORMAT))
                .then(getNearEarthObjects)
                .then(_.keys)
                .then(sameListAs(expectedDaysList))
                .then(() => done())
                .catch(done);

        });

        it('should return data for the last month', (done) => {
            const currentDate = moment().utc();
            const aMonthBefore = currentDate.subtract(1, 'month');
            const lastMonthAsInt = aMonthBefore.month();
            const startOfLastMonth = aMonthBefore.startOf('month').format(DATE_FORMAT);
            const endOfLastMonth = aMonthBefore.endOf('month').format(DATE_FORMAT);

            getFeed(startOfLastMonth, endOfLastMonth)
                .then(getNearEarthObjects)
                .then(_.keys)
                .then(_.map(dateString => moment(dateString).month()))
                .then(_.forEach(month => expect(month).to.equal(lastMonthAsInt)))
                .then(() => done())
                .catch(done);
        });
    });

});
