'use strict';

const _      = require('lodash/fp');
const moment = require('moment');
const expect = require('chai').expect;

const ROOT = '../../..';
const db = require(`${ ROOT }/lib/db`);
const { getFeed } = require(`${ ROOT }/lib/nasa/wrapper`);
const {
    getNearEarthObjects,
    getNeoReferenceId,
    saveNeo,
    findNeo,
    removeNeos,
    MONGO_DB_URL,
    DEFAULT_DATE_FORMAT
} = require(`${ ROOT }/tests/utils`);

const TODAY = moment().utc()
                      .format(DEFAULT_DATE_FORMAT);

const mapParams = params => ({
    date: params.date,
    reference: params.neo_reference_id,
    name: params.name,
    speed: params.speed,
    isHazardous: params.is_potentially_hazardous_asteroid
});

const prepareList = listGroupedByDate => {
    const neoList = listGroupedByDate[ TODAY ];
    const liftData = neo => _.extend({
        date: TODAY,
        speed: neo.close_approach_data[0].relative_velocity.kilometers_per_hour
    }, neo);

    return neoList.map(_.flow(liftData, mapParams));
};

const verifiedSave = params =>
    saveNeo(params).then(() => findNeo(params))
                   .then(neo => expect(getNeoReferenceId(neo)).to.equal(getNeoReferenceId(params)));

describe('Neo', () => {

    let neoList = [];

    before(done => {
        Promise.all([
                   getFeed(TODAY, TODAY),
                   db.connectTo(MONGO_DB_URL)
               ])
               .then(_.head)
               .then(getNearEarthObjects)
               .then(prepareList)
               .then(fetchedList => (neoList = fetchedList))
               .then(() => done())
               .catch(done);
    });

    after(done => {
        removeNeos()
            .then(() => db.closeConnection())
            .then(() => done())
            .catch(done);
    });

    it('should be able to store a NEO', (done) => {
        const params = _.head(neoList);

        verifiedSave(params)
            .then(() => done())
            .catch(done);
    });

    it('shouldn\'t contain multiple NEOs', (done) => {
        const params = _.head(neoList);

        verifiedSave(params)
            .then(() => saveNeo(params))
            .then(() => done(Error(
                `Shouldn't be possible to store model with reference=${ params.reference } twice!`
            )))
            .catch(() => done());
    });
});
