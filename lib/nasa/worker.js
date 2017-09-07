'use strict';

const moment = require('moment');
const _ = require('lodash/fp');

const ROOT = '../..';
const Neo = require(`${ ROOT }/models/Neo`);
const logger = require(`${ ROOT }/lib/utils/logger`);
const { getFeed } = require(`${ ROOT }/lib/nasa/wrapper`);
const { DEFAULT_DATE_FORMAT } = require(`${ ROOT }/lib/constants`);
const { getNearEarthObjects } = require(`${ ROOT }/lib/utils`);

// TODO make executeable for cron job

const mapDataToParams = data => ({
    date: data.close_approach_data[0].close_approach_date,
    reference: data.neo_reference_id,
    name: data.name,
    speed: data.close_approach_data[0].relative_velocity.kilometers_per_hour,
    isHazardous: data.is_potentially_hazardous_asteroid
});

const saveNeo  = neoParam => new Neo(neoParam).save();
const saveData = _.pipe(mapDataToParams, _.tap(logger.debug), saveNeo);

const storeDatedNeos = datedNeos => {
    const storeNeosFromDateArrays = dates => {
        const neoList = datedNeos[ dates ];

        return neoList.map(saveData);
    };

    const storedNeoPromises = _.flatMap(storeNeosFromDateArrays, Object.keys(datedNeos));

    return Promise.all(storedNeoPromises)
                  .then(_.size)
                  .catch(logger.error);
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
