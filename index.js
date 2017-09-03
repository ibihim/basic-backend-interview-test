'use strict';

const logger = require('./lib/utils/logger');
const app = require('./app');

const DEFAULT_PORT = 8000;
const PORT = process.env.PORT || DEFAULT_PORT;

// TODO add winston
// TODO error listener
app.listen(PORT, () => logger.info(`Listening on port: ${ PORT }`));
