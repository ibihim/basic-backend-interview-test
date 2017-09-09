'use strict';

const _          = require('lodash/fp');
const moment     = require('moment');
const { expect } = require('chai');

const ROOT                    = '..';
const Neo                     = require(`${ ROOT }/models/Neo`);
const { DEFAULT_DATE_FORMAT } = require(`${ ROOT }/lib/constants`);
const { getNearEarthObjects } = require(`${ ROOT }/lib/utils`);
const neoCollection           = require(`${ ROOT }/tests/data`);

const DEFAULT_MONGO_URL = 'mongodb://localhost:27017/nasatest';
const MONGO_DB_URL      = process.env.MONGO_DB_URL || DEFAULT_MONGO_URL;

const getNeoReferenceId = _.get('neo_reference_id');
const disjointLists     = ([ listA, listB ]) =>
    expect(listA).to.not.have.members(listB);

const sameListAs = expectedList => foundList =>
    expect(foundList.sort()).to.eql(expectedList.sort());

const pickProperties = _.pick([ 'reference', 'name', 'speed', 'isHazardous' ]);

const sameNeoListAs = expectedList => foundList => {
    const cleanExpectedList = _.map(pickProperties, expectedList);
    const cleanFoundList    = _.map(pickProperties, foundList);

    sameListAs(cleanExpectedList)(cleanFoundList);
};

const sameNeoAs = expectedNeo => foundNeo => {
    const expectedNeoParamsToCheck = pickProperties(expectedNeo);
    const foundNeoParamsToCheck = pickProperties(foundNeo);

    expect(foundNeoParamsToCheck).to.deep.equal(expectedNeoParamsToCheck);
};

const checkListLength = expectedLength => list =>
    expect(list).to.have.lengthOf(expectedLength);

const daysGenerator = from => ({
    * [Symbol.iterator]() {
        while (true) {
            yield from;
            from.add(1, 'day');
        }
    }
});

const createFormattedDaysList = (from, to = moment().utc()) => {
    const arr = [];

    for (const day of daysGenerator(from.clone())) {
        if (day.isAfter(to)) {
            break;
        }

        arr.push(day.format(DEFAULT_DATE_FORMAT));
    }

    return arr;
};

const saveNeo    = params => new Neo(params).save();
const findNeo    = (params = {}) => Neo.find(params);
const removeNeos = () =>
    new Promise((resolve, reject) =>
        Neo.remove({}, err => err ? reject(err) : resolve(err))
    );

const fillDbWithNeos = () => Promise.all(
    neoCollection.map(saveNeo)
);

module.exports = {
    DEFAULT_MONGO_URL,
    MONGO_DB_URL,
    DEFAULT_DATE_FORMAT,
    getNearEarthObjects,
    getNeoReferenceId,
    disjointLists,
    sameListAs,
    sameNeoListAs,
    sameNeoAs,
    checkListLength,
    createFormattedDaysList,
    saveNeo,
    findNeo,
    removeNeos,
    fillDbWithNeos
};
