'use strict';

const express = require('express');
const router  = express.Router();

const ROOT                     = '../../..';
const { findNeo }              = require(`${ ROOT }/lib/neo`);
const {
          controllerErrHandler,
          controllerOkHandler
      } = require(`${ ROOT }/lib/utils`);

// TODO pagination / HATEOAS
router.get('/', (req, res) => {
    findNeo({ isHazardous: true }).then(controllerOkHandler(res))
                                  .catch(controllerErrHandler(res));
});

module.exports = router;
