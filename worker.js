'use strict';

const schedule = require('node-schedule');

const db                 = require('./lib/db');
const { findFastestNeo } = require('./lib/neo');
const logger             = require('./lib/utils/logger');
const {
          storeLastDays,
          storeEverything
      }    = require('./lib/nasa/worker');

// Start to fetch data from nasa every 3 days at 3 am
const CRON_SCHEDULE = '0 3 */3 * *';
const DAYS_TO_GET_AMOUNT = 3;

db.connect()
  .then(() => findFastestNeo({}))
  .then(neo => {
      // if there is no fastest NEO, there is an empty database
      if (!neo) {
          logger.info('starting to fetch all data from nasa neo api');
          storeEverything();
      } else {
          logger.info('database contains already data. won\'t fetch whole data');
      }
  })
  .then(() => {
      logger.info(`CRON JOB started. Schedule: ${ CRON_SCHEDULE }`);

      // CRON JOB - shouldn't run at the same time as DB fill up
      schedule.scheduleJob(CRON_SCHEDULE, () => {
          logger.info('fetching data...');
          storeLastDays(DAYS_TO_GET_AMOUNT);
      });
  })
  .catch(logger.error);
