'use strict';

const router = require('express').Router();

const main = require('./api/main');
const neo = require('./api/neo');

router.use('/', main);
router.use('/neo', neo);

module.exports = router;
