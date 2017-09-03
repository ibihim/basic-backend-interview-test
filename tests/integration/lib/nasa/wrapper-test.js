'use strict';

const expect = require('chai').expect;
const _ = require('lodash/fp');

const ROOT = '../../../..';
const { neo } = require(`${ ROOT }/lib/nasa/wrapper`);

const getNearEarthObjects = _.pick('near_earth_objects');
const checkNeoListLength = expectedLength => neos =>
    expect(neos).to.have.lengthOf.above(expectedLength);

describe('wrapper', () => {
    it('should return list of asteroids', (done) => {
        const minimalExpectedAmountOfAsteroids = 100;
        const checkMinimalLength = checkNeoListLength(minimalExpectedAmountOfAsteroids);

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

        const pickId = _.pick('neo_reference_id');
        const disjointLists = ([ listA, listB ]) =>
            expect(listA).to.not.have.members(listB);

        const getNeoIdsFor = (page, size) => neo.get(page, size)
            .then(getNearEarthObjects)
            .then(_.tap(checkNeoListLength(pageSize)))
            .then(_.map(pickId));

        Promise.all([
            getNeoIdsFor(firstPage, pageSize),
            getNeoIdsFor(secondPage, pageSize)
        ])
            .then(disjointLists)
            .then(() => done)
            .catch(done);

    });
});
