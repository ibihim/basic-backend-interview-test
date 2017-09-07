'use strict';

const logger = require('../lib/utils/logger');

before(() => (logger.level = 'error'));
