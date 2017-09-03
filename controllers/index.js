'use strict';

const router = require('express').Router();
const main = require('./api/main');

router.use('/', main);

module.exports = router;
