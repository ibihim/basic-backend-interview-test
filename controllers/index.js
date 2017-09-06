'use strict';

const router = require('express').Router();

const ROOT = require('..');
const main = require(`./api/main`);
const neo = require(`./api/neo`);

router.use('/', main);
router.use('/neo', neo);

module.exports = router;
