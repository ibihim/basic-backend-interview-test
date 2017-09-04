'use strict';

const expect = require('chai').expect;

const DEFAULT_MONGO_URL   = 'mongodb://mongodb:27017/nasatest';
const MONGO_DB_URL        = process.env.MONGO_DB_URL || DEFAULT_MONGO_URL;
const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD';

const firstElement        = arr => arr[0];
const getNearEarthObjects = resObj => resObj.near_earth_objects;
const getNeoReferenceId   = obj => obj.neo_reference_id;

const disjointLists       = ([ listA, listB ]) =>
    expect(listA).to.not.have.members(listB);

const sameListAs          = listA => listB =>
    expect(listB.sort()).to.eql(listA.sort());

const checkListLength     = expectedLength => list =>
    expect(list).to.have.lengthOf(expectedLength);

module.exports = {
    DEFAULT_MONGO_URL,
    MONGO_DB_URL,
    DEFAULT_DATE_FORMAT,
    firstElement,
    getNearEarthObjects,
    getNeoReferenceId,
    disjointLists,
    sameListAs,
    checkListLength
};
