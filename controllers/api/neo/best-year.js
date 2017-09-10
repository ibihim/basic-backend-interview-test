'use strict';

const router     = require('express').Router();
const HttpStatus = require('http-status-codes');

const ROOT                    = '../../..';
const { getYearWithMostNeos } = require(`${ ROOT }/lib/neo`);

router.get('/', (req, res) => {
    const isHazardous = req.query.hazardous === 'true';
    const respond = neos => res.status(HttpStatus.OK)
                               .type('application/json')
                               .json(neos);

    getYearWithMostNeos({ isHazardous })
        .then(respond)
        .catch(() => res.status(HttpStatus.INTERNAL_SERVER_ERROR));
});

module.exports = router;