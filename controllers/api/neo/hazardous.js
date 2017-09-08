'use strict';

const express    = require('express');
const router     = express.Router();
const HttpStatus = require('http-status-codes');

const ROOT        = '../../..';
const { findNeo } = require(`${ ROOT }/lib/neo`);

// TODO pagination / HATEOAS
router.get('/', (req, res) => {
    // TODO this will explode like shit, PAGINATION!!!!
    const respond = neos => res.status(HttpStatus.OK)
                       .type('application/json')
                       .json(neos);

    // TODO clean up all .exec()!
    findNeo({ isHazardous: true }).then(respond);
});

module.exports = router;
