'use strict';

const router = require('express').Router();

const ROOT                     = '../../..';
const { findFastestNeo }       = require(`${ ROOT }/lib/neo`);
const {
          controllerErrHandler,
          controllerOkHandler,
          simpleQueryValidation
      } = require(`${ ROOT }/lib/utils`);

router.get('/', (req, res) => {
    findFastestNeo(simpleQueryValidation(req))
        .then(controllerOkHandler(res))
        .catch(controllerErrHandler(res));
});

module.exports = router;
