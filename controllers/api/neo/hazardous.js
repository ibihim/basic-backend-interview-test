'use strict';

const express = require('express');
const router = express.Router();
const HttpStatus = require('http-status-codes');


// TODO move all Neo model logic to lib/neo
const ROOT = '../../..';
const Neo = require(`${ ROOT }/models/Neo`);

// TODO do i need to use .exec() at all???
const hazardousNeos = Neo.find({ isHazardous: true }).then();

// TODO pagination / HATEOAS
router.get('/', (req, res) =>
    res.status(HttpStatus.OK)
       .type('application/json')
       .json({ hello: 'world' }));

module.exports = router;
