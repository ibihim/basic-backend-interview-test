'use strict';

const express = require('express');
const morgan = require('morgan');

const controllers = require('./controllers');
const logger = require('./lib/utils/logger');

const app = express();

app.use(morgan('common', logger));
app.use(controllers);

module.exports = app;
