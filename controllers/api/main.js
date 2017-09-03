'use strict';

const express = require('express');
const router = express.Router();
const HttpStatus = require('http-status-codes');

router.get('/', (req, res) =>
    res.status(HttpStatus.OK)
       .type('application/json')
       .json({ hello: 'world' }));

module.exports = router;
