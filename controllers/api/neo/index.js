'use strict';

const router = require('express').Router();

const ROOT = '../../..';
const hazardous = require(`${ ROOT }/controllers/api/neo/hazardous`);
const fastest   = require(`${ ROOT }/controllers/api/neo/fastest`);

router.use('/hazardous', hazardous);
router.use('/fastest', fastest);

module.exports = router;
