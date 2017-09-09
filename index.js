'use strict';

const db     = require('./lib/db');
const logger = require('./lib/utils/logger');
const app    = require('./app');

const DEFAULT_NODE_PORT = 8000;
const PORT = process.env.PORT || DEFAULT_NODE_PORT;

db.connect()
  .then(() =>
    app.listen(PORT, () => logger.info(`[app-event] Listening on port: ${ PORT }`))
  )
  .catch(logger.error);
