'use strict';

const router = require('express').Router();

const ROOT = '../../..';
const hazardous = require(`${ ROOT }/controllers/api/neo/hazardous`);
const fastest   = require(`${ ROOT }/controllers/api/neo/fastest`);
const bestYear  = require(`${ ROOT }/controllers/api/neo/best-year`);
const bestMonth = require(`${ ROOT }/controllers/api/neo/best-month`);

router.use('/hazardous', hazardous);
router.use('/fastest', fastest);
router.use('/best-year', bestYear);
router.use('/best-month', bestMonth);

module.exports = router;
