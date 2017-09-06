'use strict';

const express = require('express');
const router = express.Router();
const HttpStatus = require('http-status-codes');

// TODO move all Neo model logic to lib/neo
const ROOT = '../../..';
const Neo = require(`${ ROOT }/models/Neo`);

// TODO pagination / HATEOAS
router.get('/', (req, res) => {
    const respond = neos => res.status(HttpStatus.OK)
                       .type('application/json')
                       .json(neos);

    // TODO clean up all .exec()!
    Neo.find({ isHazardous: true }).then(respond);
});

module.exports = router;
