'use strict';

const moment = require('moment');
const expect = require('chai').expect;

const ROOT = '../../..';
const db = require(`${ ROOT }/lib/db`);
const Neo = require(`${ ROOT }/models/neo`);
const { getFeed } = require(`${ ROOT }/lib/nasa/wrapper`);
const {
    firstElement,
    getNearEarthObjects,
    getNeoReferenceId,
    MONGO_DB_URL,
    DEFAULT_DATE_FORMAT
} = require(`${ ROOT }/tests/utils`);

const TODAY = moment().utc()
                      .format(DEFAULT_DATE_FORMAT);

const saveNeo = params => new Neo(params).save();
const findNeo = params => Neo.find(params).exec();
const verifiedSave = params =>
    saveNeo(params).then(() => findNeo(params))
                   .then(neo =>
                       expect(getNeoReferenceId(neo)).to.equal(getNeoReferenceId(params))
                   );

describe('Neo', () => {

    let neoList = [];

    before(done => {
        Promise.all([
                   getFeed(TODAY, TODAY),
                   db.connectTo(MONGO_DB_URL)
               ])
               .then(firstElement)
               .then(getNearEarthObjects)
               .then(fetchedList => (neoList = fetchedList))
               .then(() => done())
               .catch(done);
    });

    it('should be able to store a NEO', (done) => {
        const params = firstElement((neoList));

        verifiedSave(params)
            .then(() => done())
            .catch(done);
    });

    it('shouldn\'t contain multiple NEOs', (done) => {
        const params = firstElement((neoList));

        verifiedSave(params)
            .then(() => saveNeo(params))
            .then(() => done(Error(
                `Shouldn't be possible to store model with reference=${ params.reference } twice!`
            )))
            .catch(() => done());
    });
});
