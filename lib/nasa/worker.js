'use strict';

const moment = require('moment');
const _ = require('lodash/fp');

const ROOT = '../..';
const Neo = require(`${ ROOT }/models/Neo`);
const logger = require(`${ ROOT }/lib/utils/logger`);
const { getFeed } = require(`${ ROOT }/lib/nasa/wrapper`);
const { DEFAULT_DATE_FORMAT } = require(`${ ROOT }/lib/constants`);
const { getNearEarthObjects } = require(`${ ROOT }/lib/utils`);

// TODO do I need to establish database connection here?
const db = require(`${ ROOT }/lib/db`);

// TODO verify string vs number
if (db.state() === 0) {

}
console.log(`db state: ${ db.state() }`);
console.log()
db.connectTo('mongodb://localhost:27017/nasa');

// TODO make executeable for cron job

const mapDataToParams = data => ({
    date: data.close_approach_data[0].close_approach_date,
    reference: data.neo_reference_id,
    name: data.name,
    speed: data.close_approach_data[0].relative_velocity.kilometers_per_hour,
    isHazardous: data.is_potentially_hazardous_asteroid
});
const saveParam = neoParam => new Neo(neoParam).save();
const saveData  = _.pipe(mapDataToParams, _.tap(logger.debug), saveParam);

const storeDatedNeos = datedNeos => {
    const saveDateKeysNeos = dateKey => {
        const neosData  = datedNeos[dateKey];
        const savedNeos = neosData.map(saveData);

        return Promise.all(savedNeos)
            .then(_.size)
            // TODO need to search for reference first or ignoring errors for duplicate keys
            .catch(logger.error);
    };

    return _.flatMap(saveDateKeysNeos, Object.keys(datedNeos)).length;
};

const storeLastDays = dayCount => {
    const todayInclusiveDayCount = dayCount - 1;
    const startDate = moment().utc()
                              .subtract(todayInclusiveDayCount, 'days')
                              .format(DEFAULT_DATE_FORMAT);

    return getFeed(startDate)
        .then(getNearEarthObjects)
        .then(storeDatedNeos)
        .catch(logger.error);
};

module.exports = {
    storeLastDays
};
