'use strict';

const router = require('express').Router();
const HttpStatus = require('http-status-codes');

const ROOT = '../../..';
const Neo = require(`${ ROOT }/models/Neo`);

router.get('/', (req, res) => {
    const isHazardous = req.query.hazardous || false;
    const respond = neos => res.status(HttpStatus.OK)
                       .type('application/json')
                       .json(neos);


    Neo.findOne({ isHazardous })
       .sort({ speed: -1 })
       .then(respond);
});

module.exports = router;
