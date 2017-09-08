'use strict';

const moment = require('moment');
const _ = require('lodash/fp');

const ROOT = '../..';
const Neo = require(`${ ROOT }/models/Neo`);
const logger = require(`${ ROOT }/lib/utils/logger`);
const { getFeed, getNeo } = require(`${ ROOT }/lib/nasa/wrapper`);
const { DEFAULT_DATE_FORMAT } = require(`${ ROOT }/lib/constants`);
const { getNearEarthObjects } = require(`${ ROOT }/lib/utils`);

// TODO make executeable for cron job

const mapDataToParams = data => ({
    date: _.get('close_approach_data[0].close_approach_date', data),
    reference: _.get('neo_reference_id', data),
    name: _.get('name', data),
    speed: _.get('close_approach_data[0].relative_velocity.kilometers_per_hour', data),
    isHazardous: _.get('is_potentially_hazardous_asteroid', data)
});

const saveNeo      = neoParam => new Neo(neoParam).save();
const saveData     = _.pipe(mapDataToParams, _.tap(logger.debug), saveNeo);
const saveDataList = _.map(saveData);

const storeDatedNeos = datedNeos => {
    const storeNeosFromDateArrays = dates => {
        const neoList = datedNeos[ dates ];

        return saveDataList(neoList);
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

const storeEverything = async function () {
    // Most of the code bases uses currently Promises.
    // This part uses the new async await syntax as it
    // makes it easier to model the async complexity.
    try {
        const pageSize = 100;
        let page       = 0;
        let size       = 1;

        while (size > 0) {
            const neoResponse = await getNeo(page++, pageSize);
            const neoList     = getNearEarthObjects(neoResponse);

            size = neoList.length;
            _.map(saveData, neoList);
        }
    } catch (err) {
        logger.error(err);
    }
};

module.exports = {
    storeLastDays,
    storeEverything
};
