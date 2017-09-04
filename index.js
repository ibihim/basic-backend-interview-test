'use strict';

const logger = require('./lib/utils/logger');
const db = require('./lib/db');
const app = require('./app');

const DEFAULT_NODE_PORT = 8000;
const PORT = process.env.PORT || DEFAULT_NODE_PORT;

const DEFAULT_MONGO_URL = 'mongodb://mongodb:27017/nasa';
const MONGO_DB_URL = process.env.MONGO_DB_URL || DEFAULT_MONGO_URL;

db.connectTo(MONGO_DB_URL)
  .then(() =>
      app.listen(PORT, () => logger.info(`[app-event] Listening on port: ${ PORT }`))
  )
  .catch(logger.error);
