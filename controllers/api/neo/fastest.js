'use strict';

const router = require('express').Router();
const HttpStatus = require('http-status-codes');

const ROOT               = '../../..';
const { findFastestNeo } = require(`${ ROOT }/lib/neo`);

router.get('/', (req, res) => {
    const isHazardous = req.query.hazardous === 'true';
    const respond = neos => res.status(HttpStatus.OK)
                       .type('application/json')
                       .json(neos);


    findFastestNeo({ isHazardous }).then(respond);
});

module.exports = router;
