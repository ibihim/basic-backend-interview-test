'use strict';

const express    = require('express');
const router     = express.Router();
const HttpStatus = require('http-status-codes');

const ROOT        = '../../..';
const { findNeo } = require(`${ ROOT }/lib/neo`);

// TODO pagination / HATEOAS
router.get('/', (req, res) => {
    const respond = neos => res.status(HttpStatus.OK)
                       .type('application/json')
                       .json(neos);

    findNeo({ isHazardous: true }).then(respond)
        .catch(() => res.status(HttpStatus.INTERNAL_SERVER_ERROR));
});

module.exports = router;
